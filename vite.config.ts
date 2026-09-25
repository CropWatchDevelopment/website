import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
	// The browser-mode (vitest-browser-svelte) project from the template was
	// dropped along with its vulnerable @vitest/browser 3.x chain: no
	// *.svelte.{test,spec} files exist. Re-add it via @vitest/browser-playwright
	// (vitest 5) if component tests are ever written.
	test: {
		environment: 'node',
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
