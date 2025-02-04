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
            }
        }),
        csp: {
            directives: {
                'script-src': [
                    'self',
                    'https://www.googletagmanager.com/gtag/js',
                    'https://www.google.com/recaptcha/api.js',
                    'https://www.gstatic.com'
                ]
            },
            reportOnly: {
                'script-src': [
                    'self',
                    'https://www.google.com/recaptcha/api.js',
                    'https://www.googletagmanager.com/gtag/js',
                    'https://www.gstatic.com'
                ],
                'report-uri': ['/']
            },
            mode: 'auto'
        }
    }
};

export default config;
