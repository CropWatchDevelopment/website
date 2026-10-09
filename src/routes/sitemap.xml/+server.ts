import { alternatesFor } from '$lib/seo/alternates';
import { absUrl } from '$lib/seo/site';
import { COLUMNS } from '$lib/content/columns';
import { listNews } from '$lib/server/news';
import { PAGES } from '$lib/seo/pages';

export const prerender = true;

type Entry = { path: string; lastmod: string; priority: string; changefreq: string };

// Fallback lastmod for /news when there are no articles.
const STATIC_LASTMOD = PAGES[0].lastmod;

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
	const entries: Entry[] = [...PAGES, ...COLUMN_ENTRIES, ...NEWS_ENTRIES];
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
