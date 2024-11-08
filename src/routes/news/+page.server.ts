/** @type {import('./$types').PageLoad} */
import getDirectusInstance from '$lib/directus';
import { readItem, readItems, readUser } from '@directus/sdk';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
    try {
        const directus = getDirectusInstance(fetch);
        const pageData = await directus.request(readItems('news_posts'));

        if (!pageData || pageData.length === 0) {
            error(404, 'No items found');
        }

        for (let i = 0; i < pageData.length; i++) {
            const post = pageData[i];
            const user = await getUsername(post.user_created);
            pageData[i].author = user.first_name;
            pageData[i].author_image = user.avatar;
        }

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