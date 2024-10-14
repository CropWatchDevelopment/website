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
	() => import('./nodes/10'),
	() => import('./nodes/11')
];

export const server_loads = [];

export const dictionary = {
		"/": [~3],
		"/about-us": [4],
		"/blog": [~5],
		"/blog/[post_id]": [~6],
		"/contact-us": [7],
		"/page/[lang]/[slug]": [~8,[2]],
		"/shop/cart": [9],
		"/shop/products": [10],
		"/shop/products/[product_id]": [11]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';