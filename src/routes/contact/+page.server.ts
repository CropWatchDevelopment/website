import {
	PRIVATE_EMAIL_HOST,
	PRIVATE_EMAIL_PASSWORD,
	PRIVATE_EMAIL_PORT,
	PRIVATE_EMAIL_USERNAME,
	PRIVATE_RECAPTCHA_API_KEY,
	PRIVATE_RECAPTCHA_PROJECT_ID
} from '$env/static/private';
import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';
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
		const phone = getString(formData, 'phone');
		const industry = getString(formData, 'industry');
		const sites = getString(formData, 'sites');

		if (!PRIVATE_RECAPTCHA_PROJECT_ID || !PRIVATE_RECAPTCHA_API_KEY) {
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
					`Phone: ${phone ?? 'Not provided'}`,
					`Industry: ${industry ?? 'Not provided'}`,
					`Sites to monitor: ${sites ?? 'Not provided'}`,
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
	// このサイトキーは reCAPTCHA Enterprise キーのため、旧来の
	// secret + siteverify では常に invalid-input-response になる。
	// CropWatchアプリと同じアセスメントAPIで検証する。
	const verificationUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/${PRIVATE_RECAPTCHA_PROJECT_ID}/assessments?key=${PRIVATE_RECAPTCHA_API_KEY}`;

	try {
		const response = await fetch(verificationUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				event: {
					token,
					siteKey: PUBLIC_RECAPTCHA_SITE_KEY,
					expectedAction: action,
					...(clientIp ? { userIpAddress: clientIp } : {})
				}
			}),
			signal: AbortSignal.timeout(7000)
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('reCAPTCHA assessment request rejected', {
				status: response.status,
				errorText: errorText?.slice(0, 500)
			});
			return {
				ok: false,
				reason: `assessment_request_rejected:${response.status}`
			};
		}

		const assessment: {
			tokenProperties?: {
				valid?: boolean;
				invalidReason?: string;
				action?: string;
				hostname?: string;
				createTime?: string;
			};
			riskAnalysis?: { score?: number; reasons?: string[] };
			error?: { message?: string };
		} = await response.json();

		if (!assessment.tokenProperties?.valid) {
			return {
				ok: false,
				reason: `token_invalid:${assessment.tokenProperties?.invalidReason ?? 'unknown'}`
			};
		}

		if (assessment.tokenProperties.action !== action) {
			return {
				ok: false,
				reason: `action_mismatch:${assessment.tokenProperties.action ?? 'missing'}`
			};
		}

		const score = assessment.riskAnalysis?.score ?? 0;
		if (score < minScore) {
			return {
				ok: false,
				reason: `score_too_low:${score.toFixed(2)}`
			};
		}

		const normalizedExpectedHostname = normalizeHostname(expectedHostname);
		const normalizedResultHostname = normalizeHostname(assessment.tokenProperties.hostname ?? '');
		if (!normalizedResultHostname || normalizedResultHostname !== normalizedExpectedHostname) {
			return {
				ok: false,
				reason: `hostname_mismatch:${assessment.tokenProperties.hostname ?? 'missing'}`
			};
		}

		if (!isRecaptchaTokenFresh(assessment.tokenProperties.createTime)) {
			return {
				ok: false,
				reason: `token_expired_or_invalid:${assessment.tokenProperties.createTime ?? 'missing'}`
			};
		}

		return { ok: true };
	} catch (error) {
		console.error('reCAPTCHA assessment request failed', error);
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
