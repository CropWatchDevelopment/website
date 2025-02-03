// svelte.config.js
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter(),
        csp: {
            directives: {
                'script-src': [
                    'self',
                    'https://www.google.com/recaptcha/api.js',
                    'https://www.gstatic.com' // Allow scripts loaded from gstatic
                ]
            },
            reportOnly: {
                'script-src': [
                    'self',
                    'https://www.google.com/recaptcha/api.js',
                    'https://www.gstatic.com'
                ],
                'report-uri': ['/']
            },
            mode: 'auto'
        }
    }
};

export default config;
