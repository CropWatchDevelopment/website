/** @type {import('./$types').PageLoad} */
import { page } from '$app/stores';
import getDirectusInstance from '$lib/directus';
import { readItems } from '@directus/sdk';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
    try {
        const directus = getDirectusInstance(fetch);

        const languageCode = 'ja-JP';
        const slug = params.slug;

        // Fetch all items and filter in JavaScript
        const allPageData = await directus.request(
            readItems('page', {
                fields: ['*', { translations: ['*'] }],
                deep: {
                    translations: {
                        _filter: {
                            _and: [
                                {
                                    languages_code: { _eq: languageCode },
                                },
                            ],
                        },
                    },
                }
            })
        );

        // Filter results based on the 'categories' array containing the 'slug'
        let pageData = allPageData.filter(page => page.categories && page.categories.includes(slug));
        pageData = pageData.sort((a, b) => a.order - b.order);

        if (pageData.length === 0) {
            throw error(404, 'Page not found');
        }

        return { pages: pageData };
    } catch (err) {
        console.error(err);
        throw error(500, 'Failed to load page data');
    }
}
