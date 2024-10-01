/** @type {import('./$types').PageLoad} */
import getDirectusInstance from '$lib/directus';
import { readItem, readItems, readSingleton } from '@directus/sdk';

export async function load({ fetch }) {
    try {
        const directus = getDirectusInstance(fetch);
        const callout = await directus.request(readItems('Callouts_Section', {
            fields: ['*', "Callouts.*"],  // Fetch all fields from Callouts_Section and related Callout items
            deep: { Callout: '*' }
        }));

        const testimonials = await directus.request(readItems('Testimonial_section', {
            fields: ['*', "testimonials.*"],  // Fetch all fields from Callouts_Section and related Callout items
            deep: { testimonials: '*' }
        }));

        const prices = await directus.request(readItems('prices', {
            fields: ['*']
        }));

        return {
            callout,
            testimonials,
            prices
        };
    } catch (error) {
        return {
            callout: [],
        }
    }
}
