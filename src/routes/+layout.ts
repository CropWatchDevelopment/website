import '$lib/i18n' // Import to initialize. Important :)
import { locale, waitLocale } from 'svelte-i18n'
import type { LayoutLoad } from './$types'
import { browser } from '$app/environment'

export const load: LayoutLoad = async () => {
	if (browser) {
		console.log('setting language')
		locale.set(window.navigator.language)
	}
	await waitLocale()
}