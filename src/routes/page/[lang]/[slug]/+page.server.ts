/** @type {import('./$types').PageLoad} */
import getDirectusInstance from '$lib/directus';
import { readItem, readItems, readSingleton } from '@directus/sdk';

export async function load({ fetch, params }) {
    const pageSlug: string = params.slug;
    const lang: string = params.lang;

    try {
        const directus = getDirectusInstance(fetch);

        const languageCode = lang;

        const page = await directus.request(
            readItems('page', {
                filter: {
                    slug: {
                        _eq: pageSlug,
                    }
                },
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
            }
            )
        );

        if (!page || page.length === 0) {
            throw new Error('Page not found');
        }

        console.log(page);
        return {
            page: page[0]
        };
    } catch (error) {
        return {
            error: 'error',
        }
    }
}