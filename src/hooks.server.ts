import type { Handle } from '@sveltejs/kit';

const LANG_PREFIX = /^\/(en|es|it)(\/.*)?$/;

function detectLang(pathname: string): string {
	const match = pathname.match(LANG_PREFIX);
	return match ? match[1] : 'ja';
}

export const handle: Handle = async ({ event, resolve }) => {
	const lang = detectLang(event.url.pathname);
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%cw.lang%', lang)
	});
};
