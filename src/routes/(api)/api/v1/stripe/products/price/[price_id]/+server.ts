import { STRIPE_SECRET_KEY_LIVE } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import Stripe from 'stripe';

export async function GET({params}) {
    // ... endpoint logic
    var stripe = new Stripe(STRIPE_SECRET_KEY_LIVE);

    if(!params.price_id) {
        throw error(400, 'No product price id provided');
    }

    const price = await stripe.prices.retrieve(params.price_id);
    return json(price);
}