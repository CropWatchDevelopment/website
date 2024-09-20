import { STRIPE_SECRET_KEY_LIVE } from '$env/static/private';
import { json } from '@sveltejs/kit';
import Stripe from 'stripe';

export async function GET(event) {
    // ... endpoint logic
    var stripe = new Stripe(STRIPE_SECRET_KEY_LIVE);

    const products = await stripe.products.list();
    return json(products);
}