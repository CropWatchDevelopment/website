/** @type {import('./$types').PageLoad} */
import getDirectusInstance from '$lib/directus';
import { readItem, readItems, readSingleton } from '@directus/sdk';

export async function load({ fetch }) {
    const directus = getDirectusInstance(fetch);
    const callout = await directus.request(readSingleton('Callout', {
        fields: ['*']
    }));
    return {
        callout
    };
}