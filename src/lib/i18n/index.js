// src/lib/i18n/index.ts
import { browser } from '$app/environment'
import { addMessages, getLocaleFromNavigator, init, register } from 'svelte-i18n';
import en from '$lib/i18n/locales/en.json';
import ja from '$lib/i18n/locales/ja.json';

const defaultLocale = 'ja'


// addMessages('en', en);
// addMessages('en-US', en);
// addMessages('ja', ja);
register('en-US', () => import('$lib/i18n/locales/en.json'))
register('en', () => import('$lib/i18n/locales/en.json'))
register('ja', () => import('$lib/i18n/locales/ja.json'))

console.log('loading languages')
await init({
	fallbackLocale: 'ja',
	initialLocale: browser ? window.navigator.language : defaultLocale,
})