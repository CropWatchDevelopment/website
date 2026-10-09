import { describe, expect, it } from 'vitest';
import { COLUMNS } from '$lib/content/columns';
import { PAGES } from './pages';

// Every public +page.svelte must be listed in pages.ts (static pages) or
// columns.ts (コラム articles), so /sitemap.xml and /llms.txt stay complete.
// Dynamic routes ([id] etc.) are fed from their own content and are skipped.
const ROUTE_FILES = Object.keys(import.meta.glob('/src/routes/**/+page.svelte'));
const EXCLUDED = [/^\/demo(\/|$)/, /^\/403$/, /^\/api(\/|$)/, /\[/];
const SEPARATE_REGISTRY = ['/news']; // index page is emitted from the news files

const routePath = (file: string) =>
	file
		.replace(/^\/src\/routes/, '')
		.replace(/\/\+page\.svelte$/, '')
		.replace(/\/\([^)]+\)/g, '') || '/';

const publicRoutes = ROUTE_FILES.map(routePath).filter(
	(p) => !EXCLUDED.some((re) => re.test(p)) && !SEPARATE_REGISTRY.includes(p)
);

describe('SEO page registry', () => {
	const registered = new Set([...PAGES.map((p) => p.path), ...COLUMNS.map((c) => `/column/${c.slug}`)]);

	it('finds the route files', () => {
		expect(publicRoutes.length).toBeGreaterThan(10);
	});

	it.each(publicRoutes)('%s is listed in pages.ts or columns.ts', (path) => {
		expect(registered.has(path)).toBe(true);
	});

	it('has no entries for routes that no longer exist', () => {
		const routes = new Set(publicRoutes);
		for (const p of PAGES) expect(routes.has(p.path), p.path).toBe(true);
	});

	it('has unique paths, ISO lastmod dates and non-empty summaries', () => {
		expect(new Set(PAGES.map((p) => p.path)).size).toBe(PAGES.length);
		for (const p of PAGES) {
			expect(p.lastmod, p.path).toMatch(/^\d{4}-\d{2}-\d{2}$/);
			expect(p.summary.length, p.path).toBeGreaterThan(10);
		}
	});
});
