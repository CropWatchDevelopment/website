// svelte.config.js
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			images: {
				sizes: [640, 828, 1200, 1920, 3840],
				formats: ['image/avif', 'image/webp'],
				minimumCacheTTL: 300,
				domains: ['cropwatch.io', 'website-five-weld-27.vercel.app'],
				preprocess: true,
				optimize: true,
				webp: true,
				avif: true,
				placeholder: 'blur',
				quality: 80,
				progressive: true,
				inlineBelow: 10000,
				defaultSize: 640,
				defaultFormat: 'image/webp',
				defaultPlaceholder: 'blur',
				defaultQuality: 80,
				defaultProgressive: true,
				defaultWebp: true,
				defaultAvif: true,
				defaultInlineBelow: 10000,
				defaultPreprocess: true,
				defaultOptimize: true,
				defaultDomains: ['cropwatch.io', 'website-five-weld-27.vercel.app'],
				defaultMinimumCacheTTL: 300
			}
		}),
		// csp: {
		// 	// SvelteKit will automatically inject hashes for its own inline scripts.
		// 	// Your custom inline script in app.html has been manually hashed.
		// 	mode: 'hash',
		// 	directives: {
		// 		"default-src": ["'self'"],
		// 		"object-src": ["'none'"],
		// 		"script-src": [
		// 			"'self'",
		// 			// Keep the hash for your inline script:
		// 			"sha256-cIhBwbyaGWCMI6AQsYFg/Lrir4C0+i8QHpjN9iSRJaw=",
		// 			"https://www.googletagmanager.com/gtag/js",
		// 			"https://www.google.com/recaptcha/api.js",
		// 			"https://www.gstatic.com"
		// 		]
		// 		// You can also define other directives (like style-src, img-src, etc.) as needed.
		// 	},
		// 	reportOnly: {
		// 		// Report-only version of your CSP directives:
		// 		"default-src": ["'self'"],
		// 		"object-src": ["'none'"],
		// 		"script-src": [
		// 			"'self'",
		// 			"sha256-cIhBwbyaGWCMI6AQsYFg/Lrir4C0+i8QHpjN9iSRJaw=",
		// 			"https://www.googletagmanager.com/gtag/js",
		// 			"https://www.google.com/recaptcha/api.js",
		// 			"https://www.gstatic.com"
		// 		],
		// 		"report-uri": ["/"]
		// 	}
		// }
	}
};

export default config;
