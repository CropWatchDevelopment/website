import { describe, expect, it } from 'vitest';
import {
	articleSchema,
	breadcrumbSchema,
	faqSchema,
	organizationSchema,
	productSchema,
	serializeJsonLd,
	videoSchema,
	websiteSchema
} from './schema';
import { SITE_ORIGIN, absUrl } from './site';

const ORG_ID = `${SITE_ORIGIN}/#organization`;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}([+-]\d{2}:\d{2}|Z))?$/;

describe('absUrl', () => {
	it('maps the root path to the origin with its trailing slash', () => {
		expect(absUrl('/')).toBe(`${SITE_ORIGIN}/`);
	});

	it('makes site-relative paths absolute and trims trailing slashes', () => {
		expect(absUrl('/pricing')).toBe(`${SITE_ORIGIN}/pricing`);
		expect(absUrl('/pricing/')).toBe(`${SITE_ORIGIN}/pricing`);
	});
});

describe('organizationSchema', () => {
	const org = organizationSchema();

	it('uses the stable organization @id', () => {
		expect(org['@id']).toBe(ORG_ID);
	});

	it('uses an absolute https logo URL', () => {
		expect(String(org.logo)).toMatch(/^https:\/\//);
	});

	it('contains no placeholder domains or undefined values', () => {
		const json = serializeJsonLd(org);
		expect(json).not.toContain('example.com');
		expect(json).not.toContain('undefined');
	});
});

describe('websiteSchema', () => {
	it('references the organization by its stable @id', () => {
		expect(websiteSchema().publisher).toEqual({ '@id': ORG_ID });
	});
});

describe('breadcrumbSchema', () => {
	const crumbs = breadcrumbSchema([
		{ name: 'ホーム', path: '/' },
		{ name: '製品', path: '/pricing' },
		{ name: '交換用センサー', path: '/replacement-sensors' }
	]);
	const items = crumbs.itemListElement as Array<Record<string, unknown>>;

	it('numbers positions starting at one, sequentially', () => {
		expect(items.map((i) => i.position)).toEqual([1, 2, 3]);
	});

	it('uses absolute canonical item URLs', () => {
		for (const item of items) {
			expect(String(item.item)).toMatch(new RegExp(`^${SITE_ORIGIN}`));
		}
	});

	it('derives its @id from the current (last) page', () => {
		expect(crumbs['@id']).toBe(`${SITE_ORIGIN}/replacement-sensors#breadcrumb`);
	});
});

describe('productSchema', () => {
	it('omits offers entirely when no public price exists', () => {
		const p = productSchema({ name: 'X', description: 'Y' });
		expect(p).not.toHaveProperty('offers');
		expect(serializeJsonLd(p)).not.toContain('undefined');
	});

	it('emits url and a stable #product @id from path', () => {
		const p = productSchema({ name: 'X', description: 'Y', path: '/replacement-sensors' });
		expect(p.url).toBe(`${SITE_ORIGIN}/replacement-sensors`);
		expect(p['@id']).toBe(`${SITE_ORIGIN}/replacement-sensors#product`);
	});

	it('references the organization as manufacturer', () => {
		const p = productSchema({ name: 'X', description: 'Y' });
		expect(p.manufacturer).toEqual({ '@id': ORG_ID });
	});

	it('emits a JPY Offer with a decimal-string price', () => {
		const p = productSchema({ name: 'X', description: 'Y', price: 33000 });
		const offer = p.offers as Record<string, unknown>;
		expect(offer['@type']).toBe('Offer');
		expect(offer.priceCurrency).toBe('JPY');
		expect(String(offer.price)).toMatch(/^\d+(\.\d+)?$/);
	});

	it('emits an AggregateOffer for ranged pricing, highPrice optional', () => {
		const p = productSchema({ name: 'X', description: 'Y', lowPrice: 308000 });
		const offer = p.offers as Record<string, unknown>;
		expect(offer['@type']).toBe('AggregateOffer');
		expect(String(offer.lowPrice)).toMatch(/^\d+(\.\d+)?$/);
		expect(offer).not.toHaveProperty('highPrice');
		expect(offer.priceCurrency).toBe('JPY');
	});
});

describe('articleSchema', () => {
	const article = articleSchema({
		title: 'HACCP義務化とは？',
		description: 'desc',
		path: '/column/haccp-gimuka',
		datePublished: '2026-06-10'
	});

	it('uses valid ISO 8601 dates and defaults dateModified to datePublished', () => {
		expect(String(article.datePublished)).toMatch(ISO_DATE);
		expect(article.dateModified).toBe(article.datePublished);
	});

	it('anchors @id and mainEntityOfPage to the canonical URL', () => {
		expect(article['@id']).toBe(`${SITE_ORIGIN}/column/haccp-gimuka#article`);
		expect(article.mainEntityOfPage).toBe(`${SITE_ORIGIN}/column/haccp-gimuka`);
	});

	it('attributes author and publisher to the organization @id', () => {
		expect(article.author).toEqual({ '@id': ORG_ID });
		expect(article.publisher).toEqual({ '@id': ORG_ID });
	});
});

describe('videoSchema', () => {
	const video = videoSchema({
		name: 'センサーの設置',
		description: '設置手順のデモ動画',
		path: '/help',
		thumbnailUrl: '/assets/og/cropwatch-og.png',
		uploadDate: '2026-07-01T09:00:00+09:00',
		duration: 'PT2M14S',
		embedUrl: 'https://www.youtube-nocookie.com/embed/abc123'
	});

	it('includes the Google-required properties', () => {
		expect(video.name).toBeTruthy();
		expect(Array.isArray(video.thumbnailUrl)).toBe(true);
		expect(String(video.uploadDate)).toMatch(ISO_DATE);
	});

	it('makes relative thumbnails absolute', () => {
		expect((video.thumbnailUrl as string[])[0]).toBe(`${SITE_ORIGIN}/assets/og/cropwatch-og.png`);
	});

	it('uses an ISO 8601 duration', () => {
		expect(String(video.duration)).toMatch(/^PT(\d+H)?(\d+M)?(\d+S)?$/);
	});

	it('drops undefined optionals (e.g. contentUrl) from the serialized output', () => {
		const json = serializeJsonLd(video);
		expect(json).not.toContain('contentUrl');
		expect(json).not.toContain('undefined');
	});
});

describe('faqSchema', () => {
	it('maps Q&A pairs into Question/Answer entities', () => {
		const faq = faqSchema([{ q: 'Q1', a: 'A1' }]);
		const entities = faq.mainEntity as Array<Record<string, unknown>>;
		expect(entities).toHaveLength(1);
		expect(entities[0]['@type']).toBe('Question');
	});
});

describe('serializeJsonLd', () => {
	it('escapes “</script>” so it cannot close the script element', () => {
		const json = serializeJsonLd({ name: 'x</script><script>alert(1)</script>' });
		expect(json).not.toContain('</script>');
		expect(json).toContain('\\u003c/script>');
	});

	it('round-trips back to the same value through JSON.parse', () => {
		const data = { name: '温度<センサー>', nested: { list: [1, 2, 3] } };
		expect(JSON.parse(serializeJsonLd(data))).toEqual(data);
	});
});
