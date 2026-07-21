import { expect, test } from '@playwright/test';

// Server-rendered JSON-LD checks: fetch the raw HTML (no client JS) and assert
// each representative route ships the schema.org entities it should — and no
// more. Routes and expectations mirror the route-to-schema matrix in the
// structured-data implementation notes.

/** Pull every ld+json payload out of raw HTML and parse it. */
function extractJsonLd(html: string): Record<string, unknown>[] {
	const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(
		(m) => m[1]
	);
	return blocks.flatMap((raw) => {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [parsed];
	});
}

const CASES: Array<{ path: string; types: string[]; absent?: string[] }> = [
	{ path: '/', types: ['Organization', 'WebSite'], absent: ['BreadcrumbList'] },
	{ path: '/technology', types: ['BreadcrumbList'] },
	{ path: '/replacement-sensors', types: ['BreadcrumbList', 'Product'] },
	{ path: '/pricing', types: ['BreadcrumbList', 'Product'] },
	{ path: '/cold-chain', types: ['BreadcrumbList', 'FAQPage'], absent: ['Product'] },
	{ path: '/column/haccp-gimuka', types: ['BreadcrumbList', 'BlogPosting'] },
	{ path: '/legal/privacy-policy', types: ['BreadcrumbList'] },
	{ path: '/contact', types: ['BreadcrumbList'] }
];

for (const { path, types, absent = [] } of CASES) {
	test(`SSR JSON-LD on ${path}`, async ({ request }) => {
		const res = await request.get(path);
		expect(res.ok()).toBe(true);
		const html = await res.text();

		const entities = extractJsonLd(html);
		const found = entities.map((e) => e['@type']);
		for (const type of types) expect(found).toContain(type);
		for (const type of absent) expect(found).not.toContain(type);

		// Every payload must be valid JSON with no leaked "undefined" and no
		// raw "</script>" inside a value (escaped as < by serializeJsonLd).
		expect(html).not.toMatch(/<script type="application\/ld\+json">[^<]*undefined/);

		// BreadcrumbList sanity: sequential one-based positions, absolute items.
		for (const bc of entities.filter((e) => e['@type'] === 'BreadcrumbList')) {
			const items = bc.itemListElement as Array<{ position: number; item: string }>;
			items.forEach((item, i) => {
				expect(item.position).toBe(i + 1);
				expect(item.item).toMatch(/^https:\/\/cropwatch\.co\.jp/);
			});
		}
	});
}
