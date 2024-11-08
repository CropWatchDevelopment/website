import type { Config } from 'tailwindcss';
const svelteUx = require('svelte-ux/plugins/tailwind.cjs');

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/svelte-ux/**/*.{svelte,js}'
	],

	theme: {
		extend: {},
		fontFamily: {
			awesome: ['"font-awesome"'],
		},
	},

	plugins: [
		require('@tailwindcss/typography'),
		svelteUx,
	]
} as Config;
