/** @type {import('./$types').PageLoad} */
import getDirectusInstance from '$lib/directus';
import { readItem, readItems } from '@directus/sdk';
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
    try {
        const directus = getDirectusInstance(fetch);

        const languageCode = 'ja-JP';
        const slug = params.slug;

        const pageData = await directus.request(
            readItems('page', {
                fields: ['*', { translations: ['*'] }],
                filter: {
                    slug: {
                        _eq: slug
                    },
                },
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
            }
            )
        );

        if (pageData.length === 0) {
            error(404, 'Page not found');
        }

        if (pageData[0].translations.length === 0) {
            return {
                status: 404,
                error: new Error('Page translation not found'),
            };
        }

        return pageData[0].translations[0];
    } catch (error) {
        console.error(error);
    }
}