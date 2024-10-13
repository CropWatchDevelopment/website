export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10')
];

export const server_loads = [];

export const dictionary = {
		"/": [~2],
		"/about-us": [3],
		"/blog": [~4],
		"/blog/[post_id]": [~5],
		"/contact-us": [6],
		"/page/[lang]/[slug]": [~7],
		"/shop/cart": [8],
		"/shop/products": [9],
		"/shop/products/[product_id]": [10]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';