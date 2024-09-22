/** @type {import('./$types').PageLoad} */
import getDirectusInstance from '$lib/directus';
import { readItems } from '@directus/sdk';

export async function load({ fetch }) {
    const directus = getDirectusInstance(fetch);
    const articles = await directus.request(readItems('articles'));
    return {
        articles
    };
}