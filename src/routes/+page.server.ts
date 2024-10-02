/** @type {import('./$types').PageLoad} */
import getDirectusInstance from '$lib/directus';
import { readItem, readItems, readSingleton } from '@directus/sdk';

export async function load({ fetch }) {
    try {
        const directus = getDirectusInstance(fetch);

        const languageCode = 'ja-JP';

        const callout = await directus.request(
            readItems('callout_section', {
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

        const callouts = await directus.request(
            readItems('callouts', {
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

        const testimonial_section = await directus.request(
            readItems('testimonial_section', {
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

        const testimonials = await directus.request(
            readItems('testimonial', {
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

        return {
            callout,
            callouts,
            testimonial_section: testimonial_section,
            testimonials: testimonials
        };
    } catch (error) {
        return {
            callout: [],
        }
    }
}
