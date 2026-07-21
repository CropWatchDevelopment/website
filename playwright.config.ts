import { defineConfig } from '@playwright/test';

// PREVIEW_PORT lets e2e run when the default 4173 is taken (e.g. by another
// repo's `vite preview` on the same machine).
const port = Number(process.env.PREVIEW_PORT ?? 4173);

export default defineConfig({
	webServer: {
		command: `npm run build && npm run preview -- --port ${port}`,
		port
	},
	testDir: 'e2e'
});
