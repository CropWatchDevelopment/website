/** @type {import('./$types').PageLoad} */
import getDirectusInstance from '$lib/directus';
import { readItem, readItems, readUser } from '@directus/sdk';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
    try {
        const directus = getDirectusInstance(fetch);
        const pageData = await directus.request(readItem('news_posts', params.id));

        if (!pageData || pageData.length === 0) {
            error(404, 'No items found');
        }

        const user = await getUsername(pageData.user_created);
        pageData.author = user.first_name;
        pageData.author_image = user.avatar;

        return {
            posts: pageData,
        }
    } catch (error) {
        console.error(error);
    }
}

async function getUsername(id: string) {
    if (!id) {
        return 'anonymous author';
    }
    const directus = getDirectusInstance(fetch);
    const user = await directus.request(readUser(id, {
        fields: ['*'],
    }));
    return user;
}