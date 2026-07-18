import { alternatesFor } from '$lib/seo/alternates';
import { absUrl } from '$lib/seo/site';
import { COLUMNS } from '$lib/content/columns';
import { listNews } from '$lib/server/news';

export const prerender = true;

// Date of the current content set. Bumped when pages change materially; kept
// stable across rebuilds so <lastmod> doesn't churn on every deploy.
const STATIC_LASTMOD = '2026-07-05';

type Entry = { path: string; lastmod: string; priority: string; changefreq: string };

const STATIC_ENTRIES: Entry[] = [
	{ path: '/', lastmod: STATIC_LASTMOD, priority: '1.0', changefreq: 'weekly' },
	{ path: '/cold-chain', lastmod: STATIC_LASTMOD, priority: '0.9', changefreq: 'monthly' },
	{ path: '/agriculture', lastmod: STATIC_LASTMOD, priority: '0.9', changefreq: 'monthly' },
	{ path: '/livestock', lastmod: STATIC_LASTMOD, priority: '0.9', changefreq: 'monthly' },
	{ path: '/technology', lastmod: STATIC_LASTMOD, priority: '0.7', changefreq: 'monthly' },
	{ path: '/replacement-sensors', lastmod: STATIC_LASTMOD, priority: '0.7', changefreq: 'monthly' },
	{ path: '/replacement-case', lastmod: STATIC_LASTMOD, priority: '0.7', changefreq: 'monthly' },
	{ path: '/testimonials', lastmod: STATIC_LASTMOD, priority: '0.6', changefreq: 'monthly' },
	{ path: '/help', lastmod: STATIC_LASTMOD, priority: '0.6', changefreq: 'monthly' },
	{ path: '/contact', lastmod: STATIC_LASTMOD, priority: '0.8', changefreq: 'yearly' },
	{ path: '/column', lastmod: STATIC_LASTMOD, priority: '0.7', changefreq: 'weekly' },
	{ path: '/legal/privacy-policy', lastmod: STATIC_LASTMOD, priority: '0.2', changefreq: 'yearly' },
	{ path: '/legal/terms-of-service', lastmod: STATIC_LASTMOD, priority: '0.2', changefreq: 'yearly' },
	{ path: '/legal/EULA', lastmod: STATIC_LASTMOD, priority: '0.2', changefreq: 'yearly' }
];

const NEWS = listNews();
const NEWS_ENTRIES: Entry[] = [
	{
		path: '/news',
		lastmod: NEWS[0]?.date ?? STATIC_LASTMOD,
		priority: '0.6',
		changefreq: 'weekly'
	},
	...NEWS.map((n) => ({
		path: `/news/${n.id}`,
		lastmod: n.date,
		priority: '0.5',
		changefreq: 'yearly'
	}))
];

const COLUMN_ENTRIES: Entry[] = COLUMNS.map((c) => ({
	path: `/column/${c.slug}`,
	lastmod: c.dateModified ?? c.datePublished,
	priority: '0.6',
	changefreq: 'yearly'
}));

function urlBlock({ path, lastmod, priority, changefreq }: Entry): string {
	const alts = alternatesFor('ja', path);
	const hreflang = (alts ?? [])
		.map((a) => `\n\t\t<xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`)
		.join('');
	return `\t<url>
\t\t<loc>${absUrl(path)}</loc>
\t\t<lastmod>${lastmod}</lastmod>
\t\t<changefreq>${changefreq}</changefreq>
\t\t<priority>${priority}</priority>${hreflang}
\t</url>`;
}

export function GET() {
	const entries = [...STATIC_ENTRIES, ...COLUMN_ENTRIES, ...NEWS_ENTRIES];
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map(urlBlock).join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
