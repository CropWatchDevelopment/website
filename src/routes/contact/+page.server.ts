import {
	PRIVATE_EMAIL_HOST,
	PRIVATE_EMAIL_PASSWORD,
	PRIVATE_EMAIL_PORT,
	PRIVATE_EMAIL_USERNAME,
	PRIVATE_GOOGLE_RECAPTCHA_SECRET_KEY
} from '$env/static/private';
import { fail } from '@sveltejs/kit';
import { checkBotId } from 'botid/server';
import nodemailer from 'nodemailer';
import type { Actions } from './$types';

const CONTACT_RECIPIENTS = {
	to: 'sayaka@cropwatch.io',
	cc: 'kevin@cropwatch.io'
};

const RECAPTCHA_ACTION = 'contact_form';
const RECAPTCHA_MIN_SCORE = 0.5;
const RECAPTCHA_TOKEN_MAX_AGE_MS = 2 * 60 * 1000;

export const actions: Actions = {
	default: async ({ request, getClientAddress, url }) => {
		const verification = await checkBotId();
		if (verification.isBot) {
			return fail(403, { message: 'Access denied.' });
		}

		const formData = await request.formData();
		const clientIp = getClientAddress();
		const recaptchaToken = getString(formData, 'g-recaptcha-response');
		const firstName = getString(formData, 'firstName');
		const lastName = getString(formData, 'lastName');
		const email = getString(formData, 'email');
		const company = getString(formData, 'company');
		const message = getString(formData, 'message');

		if (!PRIVATE_GOOGLE_RECAPTCHA_SECRET_KEY) {
			return fail(500, { message: 'reCAPTCHA configuration missing.' });
		}
		if (!recaptchaToken || !firstName || !lastName || !email || !company || !message) {
			return fail(400, { message: 'Invalid form submission.' });
		}

		const recaptchaVerification = await verifyRecaptcha(
			recaptchaToken,
			clientIp,
			RECAPTCHA_ACTION,
			RECAPTCHA_MIN_SCORE,
			url.hostname
		);
		if (!recaptchaVerification.ok) {
			console.warn('reCAPTCHA verification failed', {
				reason: recaptchaVerification.reason,
				clientIp,
				hostname: url.hostname
			});
			return fail(400, { message: 'reCAPTCHA verification failed.' });
		}

		const transporter = nodemailer.createTransport({
			host: PRIVATE_EMAIL_HOST,
			port: Number(PRIVATE_EMAIL_PORT),
			secure: Number(PRIVATE_EMAIL_PORT) === 465,
			auth: {
				user: PRIVATE_EMAIL_USERNAME,
				pass: PRIVATE_EMAIL_PASSWORD
			}
		});

		const fullName = `${firstName} ${lastName}`.trim();

		try {
			await transporter.sendMail({
				from: `"${fullName || 'CropWatch Contact'}" <admin@cropwatch.io>`,
				replyTo: email,
				to: CONTACT_RECIPIENTS.to,
				cc: CONTACT_RECIPIENTS.cc,
				subject: '📧❗ Message sent from CropWatch.io Website!',
				text: [
					`Sender name: ${fullName || 'Not provided'}`,
					`Sender email: ${email}`,
					`Company: ${company}`,
					'--- Message ---',
					message
				].join('\n')
			});
		} catch (err) {
			console.error('Email sending error', err);
			return fail(500, { message: 'Failed to send email.' });
		}

		return { success: true };
	}
};

function getString(formData: FormData, key: string) {
	const value = formData.get(key);
	return typeof value === 'string' && value.trim().length > 0 ? value.trim() : null;
}

type RecaptchaVerificationResult = {
	ok: boolean;
	reason?: string;
};

async function verifyRecaptcha(
	token: string,
	clientIp: string | null,
	action: string,
	minScore: number,
	expectedHostname: string
): Promise<RecaptchaVerificationResult> {
	const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';
	const params = new URLSearchParams();
	params.append('secret', PRIVATE_GOOGLE_RECAPTCHA_SECRET_KEY);
	params.append('response', token);
	if (clientIp) {
		params.append('remoteip', clientIp);
	}

	try {
		const recaptchaResponse = await fetch(verificationUrl, {
			method: 'POST',
			body: params,
			signal: AbortSignal.timeout(7000)
		});

		if (!recaptchaResponse.ok) {
			return {
				ok: false,
				reason: `verification_request_rejected:${recaptchaResponse.status}`
			};
		}

		const recaptchaResult: {
			success: boolean;
			score?: number;
			action?: string;
			hostname?: string;
			challenge_ts?: string;
			['error-codes']?: string[];
		} = await recaptchaResponse.json();

		if (!recaptchaResult.success) {
			return {
				ok: false,
				reason: `google_unsuccessful:${(recaptchaResult['error-codes'] ?? []).join(',') || 'unknown'}`
			};
		}

		const score = recaptchaResult.score ?? 0;
		if (score < minScore) {
			return {
				ok: false,
				reason: `score_too_low:${score.toFixed(2)}`
			};
		}

		if (recaptchaResult.action !== action) {
			return {
				ok: false,
				reason: `action_mismatch:${recaptchaResult.action ?? 'missing'}`
			};
		}

		const normalizedExpectedHostname = normalizeHostname(expectedHostname);
		const normalizedResultHostname = normalizeHostname(recaptchaResult.hostname ?? '');
		if (!normalizedResultHostname || normalizedResultHostname !== normalizedExpectedHostname) {
			return {
				ok: false,
				reason: `hostname_mismatch:${recaptchaResult.hostname ?? 'missing'}`
			};
		}

		if (!isRecaptchaTokenFresh(recaptchaResult.challenge_ts)) {
			return {
				ok: false,
				reason: `token_expired_or_invalid:${recaptchaResult.challenge_ts ?? 'missing'}`
			};
		}

		return { ok: true };
	} catch (error) {
		console.error('reCAPTCHA verification request failed', error);
		return {
			ok: false,
			reason: 'verification_request_failed'
		};
	}
}

function normalizeHostname(hostname: string) {
	return hostname
		.trim()
		.toLowerCase()
		.replace(/^www\./, '');
}

function isRecaptchaTokenFresh(challengeTimestamp?: string) {
	if (!challengeTimestamp) {
		return false;
	}

	const challengeTs = Date.parse(challengeTimestamp);
	if (Number.isNaN(challengeTs)) {
		return false;
	}

	const tokenAgeMs = Date.now() - challengeTs;
	return tokenAgeMs >= 0 && tokenAgeMs <= RECAPTCHA_TOKEN_MAX_AGE_MS;
}
