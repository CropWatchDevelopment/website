import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex()],
	kit: {
		// Inline all page CSS into the prerendered HTML (the global bundle is
		// ~70KB raw, well under this cap) so first paint never waits on a
		// render-blocking stylesheet request.
		inlineStyleThreshold: 131072,
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
