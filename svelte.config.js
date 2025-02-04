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
                domains: ['cropwatch.io','website-five-weld-27.vercel.app'],
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
                defaultDomains: ['cropwatch.io','website-five-weld-27.vercel.app'],
                defaultMinimumCacheTTL: 300
            }
        }),
        csp: {
			// mode: 'hash' tells SvelteKit to use content hashes for inline scripts that it controls.
			mode: 'hash',
			directives: {
				'script-src': [
					'self',
					'https://www.googletagmanager.com/gtag/js',
					'https://www.google.com/recaptcha/api.js',
					'https://www.gstatic.com',
					'sha256-cIhBwbyaGWCMI6AQsYFg/Lrir4C0+i8QHpjN9iSRJaw='
				]
			},
			reportOnly: {
				'script-src': [
					'self',
					'https://www.google.com/recaptcha/api.js',
					'https://www.googletagmanager.com/gtag/js',
					'https://www.gstatic.com',
					'sha256-cIhBwbyaGWCMI6AQsYFg/Lrir4C0+i8QHpjN9iSRJaw='
				],
				'report-uri': ['/']
			}
		}
    }
};

export default config;
