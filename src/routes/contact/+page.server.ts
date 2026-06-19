import { fail, type Actions } from '@sveltejs/kit';
import { checkBotId } from 'botid/server';
import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';

// The rest of the .io site is prerendered (see +layout.ts), but this route runs
// a server action to send mail, so it must opt out and be served as a function.
export const prerender = false;

const TO = 'kevin@cropwatch.io';

export const actions: Actions = {
	default: async ({ request }) => {
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
