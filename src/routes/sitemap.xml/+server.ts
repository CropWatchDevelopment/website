import type { RequestHandler } from './$types';

// Prerendered so the Vercel adapter emits a static /sitemap.xml asset.
export const prerender = true;

const SITE = 'https://cropwatch.io';

// Public, indexable routes. Keep this list in sync as pages are added.
const ROUTES: { path: string; changefreq: string; priority: string }[] = [
	{ path: '/', changefreq: 'monthly', priority: '1.0' },
	{ path: '/home', changefreq: 'monthly', priority: '0.9' },
	{ path: '/agriculture', changefreq: 'monthly', priority: '0.8' },
	{ path: '/livestock', changefreq: 'monthly', priority: '0.8' },
	{ path: '/cold-chain', changefreq: 'monthly', priority: '0.8' },
	{ path: '/replacement-sensors', changefreq: 'monthly', priority: '0.6' },
	{ path: '/replacement-case', changefreq: 'monthly', priority: '0.6' },
	{ path: '/contact', changefreq: 'monthly', priority: '0.7' },
	{ path: '/news', changefreq: 'weekly', priority: '0.5' }
];

export const GET: RequestHandler = () => {
	const urls = ROUTES.map(
		({ path, changefreq, priority }) =>
			`  <url>\n    <loc>${SITE}${path}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
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
