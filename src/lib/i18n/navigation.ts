import { derived } from 'svelte/store';
import { page } from '$app/stores';
import { DEFAULT_LOCALE, NON_DEFAULT_PREFIXES, type AppLocale } from './index';

const EXTERNAL = /^(https?:)?\/\//i;

export function localePath(path: string, lang: AppLocale | string | undefined): string {
	if (!path || typeof path !== 'string') return path;
	if (EXTERNAL.test(path) || path.startsWith('mailto:') || path.startsWith('tel:')) return path;
	if (path.startsWith('#') || path.startsWith('?')) return path;

	const canonical = path.startsWith('/') ? path : `/${path}`;
	const effective: string = lang || DEFAULT_LOCALE;
	if (!NON_DEFAULT_PREFIXES.includes(effective)) return canonical;
	if (canonical === '/') return `/${effective}`;
	return `/${effective}${canonical}`;
}

export const loc = derived(page, ($page) => {
	const lang = (($page.data as { lang?: AppLocale })?.lang ?? DEFAULT_LOCALE) as AppLocale;
	return (path: string) => localePath(path, lang);
});
