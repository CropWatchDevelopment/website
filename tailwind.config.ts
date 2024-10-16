import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
		fontFamily: {
			awesome: ['"font-awesome"'],
		  },
	},

	plugins: [require('@tailwindcss/typography')]
} as Config;
