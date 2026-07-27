import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { DEMO_COOKIE, DEMO_PASSWORD, DEMO_USERNAME } from '../demo-session';

/**
 * No-JavaScript fallback for the demo's pretend sign-in.
 *
 * The normal path is client-side: the page's onsubmit handler cancels the
 * native submit and navigates. This action only runs when that handler is not
 * there yet (a click landing before hydration) or at all (JS disabled), and it
 * exists so the form is a POST rather than a GET — a GET would put the typed
 * credentials in the URL, which is a bad habit to ship on a login screen even
 * when the credentials are the published word "demo".
 *
 * There is no account and no authentication here; the cookie is a flag saying
 * "this visitor has been through the login screen", nothing more.
 */
export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const username = String(form.get('username') ?? '').trim();
		const password = String(form.get('password') ?? '');

		if (username !== DEMO_USERNAME || password !== DEMO_PASSWORD) {
			return fail(400, {
				error: `デモ用のユーザー名とパスワードはどちらも「${DEMO_USERNAME}」です。`,
				username
			});
		}

		cookies.set(DEMO_COOKIE, '1', {
			path: '/demo',
			httpOnly: false,
			sameSite: 'lax',
			secure: request.url.startsWith('https://'),
			maxAge: 60 * 60 * 8
		});

		redirect(303, '/demo');
	}
};
