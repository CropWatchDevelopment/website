/** @type {import('./$types').PageLoad} */
import getDirectusInstance from '$lib/directus';
import { readItem, readItems, readSingleton } from '@directus/sdk';
import { locale, locales } from 'svelte-i18n';

export async function load({ fetch, request }) {
    try {
        const directus = getDirectusInstance(fetch);

        const lang = request.headers.get('accept-language')?.split(',')[0]
        let languageCode = 'en-US';
        switch (lang) {
            case 'es':
                languageCode = 'es-ES';
                break;
            case 'en':
                languageCode = 'en-US';
                break;
            case 'ja':
                languageCode = 'ja-JP';
                break;
            default:
                languageCode = 'en-US';
                break;
        }
        console.log(lang);

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

        const slides = await directus.request(
            readItems('slides', {
                fields: ['*', { translations: ['*'] }],
                filter: {
                    status: {
                        _in: ['published']
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

        const callouts = await directus.request(
            readItems('callouts', {
                fields: ['*', { translations: ['*'] }],
                filter: {
                    status: {
                        _in: ['published']
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

        const pricing = await directus.request(
            readItems('pricing', {
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

        const pricingSection = await directus.request(
            readItems('pricing_section', {
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

        const cta = await directus.request(
            readItems('callToAction', {
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
            testimonials: testimonials,
            pricing: pricing,
            pricingSection: pricingSection,
            slides,
            cta,
        };
    } catch (error) {
        return {
            callout: [],
        }
    }
}
