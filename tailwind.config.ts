import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@cropwatchdevelopment/cwui/**/*.{html,js,svelte,ts}',
		'./node_modules/svelte-ux/**/*.{svelte,js}',
	],
	safelist: [
		'bg-success',
		'bg-warning-600',
		'bg-danger-500',
		'text-white',
		'fill-current',
		'text-3xl',
		'absolute',
	],
	  
	theme: {
		extend: {
			colors: {
				success: '#10b981', // Emerald-500 color
				warning: {
					600: '#d97706' // Amber-600 color
				},
				danger: {
					500: '#ef4444' // Red-500 color
				}
			}
		}
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;
