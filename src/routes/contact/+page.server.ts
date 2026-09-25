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
		const botFailure = await rejectAutomatedSubmission();
		if (botFailure) return botFailure;

		const data = await request.formData();
		// FormData entries can be File objects; only accept text fields (a File
		// would otherwise stringify to "[object File]").
		const get = (k: string) => {
			const v = data.get(k);
			return typeof v === 'string' ? v.trim() : '';
		};

		const recaptchaFailure = await rejectFailedRecaptcha(get('g-recaptcha-response'), url.hostname);
		if (recaptchaFailure) return recaptchaFailure;

		// Mirror the form's required fields server-side.
		const required = [get('first'), get('last'), get('email'), get('company'), data.get('consent')];
		if (required.some((v) => !v)) {
			return fail(400, { error: 'Please complete all required fields.' });
		}

		return sendLeadEmail(get);
	}
};

// Bot check first. Fail OPEN if the check itself throws: a BotID hiccup
// must never silently swallow a real lead (that was the whole bug here).
async function rejectAutomatedSubmission() {
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
	return null;
}

// reCAPTCHA Enterprise, same setup as cropwatch.co.jp and the app. The
// shared site key is an ENTERPRISE key: tokens must be assessed via the
// Enterprise API - the classic siteverify endpoint always rejects them
// with invalid-input-response. Config gaps fail open (like BotID above)
// so a misconfigured env never eats a real lead; a present-but-bad
// token is rejected.
async function rejectFailedRecaptcha(recaptchaToken: string, expectedHostname: string) {
	if (!env.PRIVATE_RECAPTCHA_PROJECT_ID || !env.PRIVATE_RECAPTCHA_API_KEY) {
		console.error('[contact] PRIVATE_RECAPTCHA_* env vars missing; skipping reCAPTCHA check.');
		return null;
	}
	if (!recaptchaToken) {
		return fail(400, {
			error: 'The security check did not complete. Please reload the page and try again.'
		});
	}
	const verdict = await verifyRecaptcha(recaptchaToken, expectedHostname);
	if (!verdict.ok) {
		console.warn('[contact] reCAPTCHA rejected submission', { reason: verdict.reason });
		return fail(400, {
			error: 'Security verification failed. Please try again, or email kevin@cropwatch.io directly.'
		});
	}
	return null;
}

async function sendLeadEmail(get: (k: string) => string) {
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

	const first = get('first');
	const last = get('last');
	const email = get('email');
	const company = get('company');

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

type RecaptchaVerificationResult = { ok: boolean; reason?: string };

type RecaptchaAssessment = {
	tokenProperties?: {
		valid?: boolean;
		invalidReason?: string;
		action?: string;
		hostname?: string;
		createTime?: string;
	};
	riskAnalysis?: { score?: number; reasons?: string[] };
	error?: { message?: string };
};

const normalizeHostname = (h: string) =>
	h
		.trim()
		.toLowerCase()
		.replace(/^www\./, '');

/** Why an otherwise well-formed assessment should be rejected, or null to accept. */
function assessmentRejection(assessment: RecaptchaAssessment, expectedHostname: string) {
	const props = assessment.tokenProperties ?? {};
	const score = assessment.riskAnalysis?.score ?? 0;
	const gotHostname = normalizeHostname(props.hostname ?? '');
	const createdAt = Date.parse(props.createTime ?? '');
	const age = Date.now() - createdAt;
	const tokenStale = Number.isNaN(createdAt) || age < 0 || age > RECAPTCHA_TOKEN_MAX_AGE_MS;

	// Ordered checks; the first failing one names the rejection reason.
	const checks: Array<[boolean, string]> = [
		[!props.valid, `token_invalid:${props.invalidReason ?? 'unknown'}`],
		[props.action !== RECAPTCHA_ACTION, `action_mismatch:${props.action ?? 'missing'}`],
		[score < RECAPTCHA_MIN_SCORE, `score_too_low:${score.toFixed(2)}`],
		[
			!gotHostname || gotHostname !== normalizeHostname(expectedHostname),
			`hostname_mismatch:${props.hostname ?? 'missing'}`
		],
		[tokenStale, `token_expired_or_invalid:${props.createTime ?? 'missing'}`]
	];
	return checks.find(([failed]) => failed)?.[1] ?? null;
}

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

		const assessment: RecaptchaAssessment = await response.json();
		const reason = assessmentRejection(assessment, expectedHostname);
		return reason ? { ok: false, reason } : { ok: true };
	} catch (error) {
		console.error('[contact] reCAPTCHA assessment request failed', error);
		return { ok: false, reason: 'verification_request_failed' };
	}
}
