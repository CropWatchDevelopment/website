/**
 * The demo's pretend sign-in.
 *
 * There is no account, no token and no server round-trip — the login screen
 * exists so a prospect sees the real entry flow, and this flag just remembers
 * that they got through it. sessionStorage (not localStorage) so closing the
 * tab resets the demo to the login screen.
 */

export const DEMO_USERNAME = 'demo';
export const DEMO_PASSWORD = 'demo';

/** Set only by the no-JavaScript form fallback in login/+page.server.ts. */
export const DEMO_COOKIE = 'cw_demo';

const STORAGE_KEY = 'cropwatch.demo.signedIn';

export function isDemoSignedIn(): boolean {
	if (typeof window === 'undefined') return false;
	try {
		if (window.sessionStorage.getItem(STORAGE_KEY) === 'true') return true;
	} catch {
		// Private-mode / storage-blocked browsers: fail open so the demo still runs.
		return true;
	}
	return document.cookie.split('; ').includes(`${DEMO_COOKIE}=1`);
}

export function signInDemo(): void {
	if (typeof window === 'undefined') return;
	try {
		window.sessionStorage.setItem(STORAGE_KEY, 'true');
	} catch {
		/* nothing to persist to; the demo works either way */
	}
}

export function signOutDemo(): void {
	if (typeof window === 'undefined') return;
	try {
		window.sessionStorage.removeItem(STORAGE_KEY);
	} catch {
		/* nothing to clear */
	}
}
