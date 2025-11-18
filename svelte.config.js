import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex()],
	kit: {
		adapter: adapter({

			images: {
				sizes: [640, 828, 1200, 1920, 3840],
				formats: ['image/avif', 'image/webp'],
				minimumCacheTTL: 300,
				domains: ['cropwatch.io', 'website-iilojvva6-crop-watch-team.vercel.app'],
			},
		}),

	},
	vitePlugin: {
		inspector: {
			toggleKeyCombo: 'alt-x',
		},
	},
	extensions: ['.svelte', '.svx']
};

export default config;
