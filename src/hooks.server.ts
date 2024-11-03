// hooks.server.ts
import type { Handle } from '@sveltejs/kit'
import { locale } from 'svelte-i18n'

export const handle: Handle = async ({ event, resolve }) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const lang = event.request.headers.get('accept-language')?.split(',')[0]
    if (lang) {
        locale.set(lang)
    }
    return resolve(event)
}