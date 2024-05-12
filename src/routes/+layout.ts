import { browser } from '$app/environment'
import { locale, waitLocale } from 'svelte-i18n'
import type { LayoutLoad } from './$types'
import '$lib/i18n' // Import to initialize. Important :)

export const load: LayoutLoad = async () => {
	if (browser) {
		console.log('setting language to', window.navigator.language);
		await locale.set(window.navigator.language);
	}
	await waitLocale().then(() => {
		console.log('language set');
	});
}