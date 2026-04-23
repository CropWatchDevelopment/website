import { init, register } from 'svelte-i18n';

export const DEFAULT_LOCALE = 'ja';
export const SUPPORTED_LOCALES = ['ja', 'en', 'es', 'it'] as const;
export type AppLocale = (typeof SUPPORTED_LOCALES)[number];
export const NON_DEFAULT_PREFIXES: readonly string[] = ['en', 'es', 'it'];

register('en', () => import('./locales/en.json'));
register('ja', () => import('./locales/ja.json'));
register('it', () => import('./locales/it.json'));
register('es', () => import('./locales/es.json'));

init({
	fallbackLocale: DEFAULT_LOCALE,
	initialLocale: DEFAULT_LOCALE
});
