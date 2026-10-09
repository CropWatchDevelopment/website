import { listNews } from '$lib/server/news';
import { PAGES } from '$lib/seo/pages';
import type { RequestHandler } from './$types';

// Prerendered so the Vercel adapter emits a static /sitemap.xml asset.
export const prerender = true;

const SITE = 'https://cropwatch.io';

type Entry = { path: string; changefreq: string; priority: string; lastmod?: string };

// Static pages come from the shared registry (also feeds /llms.txt).
const ROUTES: Entry[] = [
	...PAGES,
	// One entry per news article (static/news/*.json), newest first.
	...listNews().map((n) => ({
		path: `/news/${n.id}`,
		changefreq: 'yearly',
		priority: '0.4',
		lastmod: n.date
	}))
];

export const GET: RequestHandler = () => {
	const urls = ROUTES.map(
		({ path, changefreq, priority, lastmod }) =>
			`  <url>\n    <loc>${SITE}${path}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
	).join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
