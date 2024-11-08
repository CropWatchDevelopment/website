/** @type {import('./$types').PageLoad} */
import getDirectusInstance from '$lib/directus';
import { readItem, readItems, readSingleton } from '@directus/sdk';

export async function load({ fetch }) {
    try {
        const directus = getDirectusInstance(fetch);
        const news = await directus.request(readItems('news_posts'));
        

        return {
            news: news || [],
        };
    } catch (error) {
        return {
            callout: [],
        }
    }
}
