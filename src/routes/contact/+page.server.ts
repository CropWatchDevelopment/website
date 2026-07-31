import { fail, type Actions } from '@sveltejs/kit';
import { checkBotId } from 'botid/server';
import { env } from '$env/dynamic/private';
import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';
import nodemailer from 'nodemailer';

// The rest of the .io site is prerendered (see +layout.ts), but this route runs
// a server action to send mail, so it must opt out and be served as a function.
export const prerender = false;

const TO = 'kevin@cropwatch.io';

const RECAPTCHA_ACTION = 'contact_form';
const RECAPTCHA_MIN_SCORE = 0.5;
const RECAPTCHA_TOKEN_MAX_AGE_MS = 2 * 60 * 1000;

export const actions: Actions = {
	default: async ({ request, url }) => {
		// Bot check first. Fail OPEN if the check itself throws: a BotID hiccup
		// must never silently swallow a real lead (that was the whole bug here).
		try {
			const { isBot } = await checkBotId();
			if (isBot) {
				return fail(403, {
					error:
						'Your submission looked automated. If this is a mistake, email kevin@cropwatch.io directly.'
				});
			}
		} catch (err) {
			console.error('[contact] BotID check errored, letting submission through:', err);
		}

		const data = await request.formData();
		const get = (k: string) => (data.get(k) ?? '').toString().trim();

		// reCAPTCHA Enterprise, same setup as cropwatch.co.jp and the app. The
		// shared site key is an ENTERPRISE key: tokens must be assessed via the
		// Enterprise API - the classic siteverify endpoint always rejects them
		// with invalid-input-response. Config gaps fail open (like BotID above)
		// so a misconfigured env never eats a real lead; a present-but-bad
		// token is rejected.
		const recaptchaToken = get('g-recaptcha-response');
		if (!env.PRIVATE_RECAPTCHA_PROJECT_ID || !env.PRIVATE_RECAPTCHA_API_KEY) {
			console.error('[contact] PRIVATE_RECAPTCHA_* env vars missing; skipping reCAPTCHA check.');
		} else if (!recaptchaToken) {
			return fail(400, {
				error: 'The security check did not complete. Please reload the page and try again.'
			});
		} else {
			const verdict = await verifyRecaptcha(recaptchaToken, url.hostname);
			if (!verdict.ok) {
				console.warn('[contact] reCAPTCHA rejected submission', { reason: verdict.reason });
				return fail(400, {
					error:
						'Security verification failed. Please try again, or email kevin@cropwatch.io directly.'
				});
			}
		}

		const first = get('first');
		const last = get('last');
		const email = get('email');
		const company = get('company');
		const consent = data.get('consent');

		// Mirror the form's required fields server-side.
		if (!first || !last || !email || !company || !consent) {
			return fail(400, { error: 'Please complete all required fields.' });
		}

		const host = env.PRIVATE_EMAIL_HOST;
		const port = Number(env.PRIVATE_EMAIL_PORT || 587);
		const user = env.PRIVATE_EMAIL_USERNAME;
		const pass = env.PRIVATE_EMAIL_PASSWORD;

		if (!host || !user || !pass) {
			// Most likely cause if it works locally but not on Vercel: the
			// PRIVATE_EMAIL_* vars aren't set in the project's environment.
			console.error('[contact] Missing PRIVATE_EMAIL_* env vars in this environment.');
			return fail(500, {
				error: 'Email is not configured right now. Please email kevin@cropwatch.io directly.'
			});
		}

		const transporter = nodemailer.createTransport({
			host,
			port,
			secure: port === 465, // 465 = implicit TLS; 587 negotiates STARTTLS
			auth: { user, pass }
		});

		const body = [
			`Name:     ${first} ${last}`,
			`Email:    ${email}`,
			`Phone:    ${get('phone') || '-'}`,
			`Company:  ${company}`,
			`Role:     ${get('role') || '-'}`,
			`Industry: ${get('industry') || '-'}`,
			`Sites:    ${get('sites') || '-'}`,
			'',
			'Message:',
			get('message') || '(none)'
		].join('\n');

		try {
			await transporter.sendMail({
				from: `"CropWatch Website" <${user}>`,
				to: TO,
				replyTo: `"${first} ${last}" <${email}>`,
				subject: `Demo request - ${company} (${first} ${last})`,
				text: body
			});
		} catch (err) {
			console.error('[contact] sendMail failed:', err);
			return fail(502, {
				error: 'We could not send your request just now. Please email kevin@cropwatch.io directly.'
			});
		}

		return { success: true };
	}
};

type RecaptchaVerificationResult = { ok: boolean; reason?: string };

async function verifyRecaptcha(
	token: string,
	expectedHostname: string
): Promise<RecaptchaVerificationResult> {
	const verificationUrl = `https://recaptchaenterprise.googleapis.com/v1/projects/${env.PRIVATE_RECAPTCHA_PROJECT_ID}/assessments?key=${env.PRIVATE_RECAPTCHA_API_KEY}`;

	try {
		const response = await fetch(verificationUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				event: {
					token,
					siteKey: PUBLIC_RECAPTCHA_SITE_KEY,
					expectedAction: RECAPTCHA_ACTION
				}
			}),
			signal: AbortSignal.timeout(7000)
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('[contact] reCAPTCHA assessment request rejected', {
				status: response.status,
				errorText: errorText?.slice(0, 500)
			});
			return { ok: false, reason: `assessment_request_rejected:${response.status}` };
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
		if (assessment.tokenProperties.action !== RECAPTCHA_ACTION) {
			return {
				ok: false,
				reason: `action_mismatch:${assessment.tokenProperties.action ?? 'missing'}`
			};
		}
		const score = assessment.riskAnalysis?.score ?? 0;
		if (score < RECAPTCHA_MIN_SCORE) {
			return { ok: false, reason: `score_too_low:${score.toFixed(2)}` };
		}
		const normalize = (h: string) => h.trim().toLowerCase().replace(/^www\./, '');
		const gotHostname = normalize(assessment.tokenProperties.hostname ?? '');
		if (!gotHostname || gotHostname !== normalize(expectedHostname)) {
			return {
				ok: false,
				reason: `hostname_mismatch:${assessment.tokenProperties.hostname ?? 'missing'}`
			};
		}
		const createdAt = Date.parse(assessment.tokenProperties.createTime ?? '');
		const age = Date.now() - createdAt;
		if (Number.isNaN(createdAt) || age < 0 || age > RECAPTCHA_TOKEN_MAX_AGE_MS) {
			return {
				ok: false,
				reason: `token_expired_or_invalid:${assessment.tokenProperties.createTime ?? 'missing'}`
			};
		}
		return { ok: true };
	} catch (error) {
		console.error('[contact] reCAPTCHA assessment request failed', error);
		return { ok: false, reason: 'verification_request_failed' };
	}
}
