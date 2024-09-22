/** @type {import('./$types').PageLoad} */
import getDirectusInstance from '$lib/directus';
import { readItem, readItems } from '@directus/sdk';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
    const post_id = params.post_id;
    if (!post_id) {
        throw error(404, 'Post Not Found!')
    }
    const directus = getDirectusInstance(fetch);
    const article = await directus.request(readItem('articles', post_id));
    return {
        article
    };
}