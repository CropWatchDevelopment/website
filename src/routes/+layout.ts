import '$lib/i18n';
import { locale, waitLocale } from 'svelte-i18n';
import { DEFAULT_LOCALE, NON_DEFAULT_PREFIXES, type AppLocale } from '$lib/i18n';

function detectLang(pathname: string): AppLocale {
	const first = pathname.split('/')[1];
	if (first && NON_DEFAULT_PREFIXES.includes(first)) return first as AppLocale;
	return DEFAULT_LOCALE;
}

function canonicalPathFor(pathname: string): string {
	const first = pathname.split('/')[1];
	if (first && NON_DEFAULT_PREFIXES.includes(first)) {
		return pathname.slice(first.length + 1) || '/';
	}
	return pathname;
}

export const load = async ({ url }) => {
	const lang = detectLang(url.pathname);
	locale.set(lang);
	await waitLocale(lang);
	return {
		lang,
		canonicalPath: canonicalPathFor(url.pathname)
	};
};
