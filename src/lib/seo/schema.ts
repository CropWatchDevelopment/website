// JSON-LD (schema.org) builders. Each returns a plain object that <JsonLd>
// serialises into a <script type="application/ld+json"> tag. Keeping these as
// pure functions makes them trivial to unit-test and reuse across routes.

import { ORG, SITE_ALT_NAME, SITE_NAME, SITE_ORIGIN, absUrl } from './site';

type Json = Record<string, unknown>;

/**
 * Serialise a schema object (or array) for a <script type="application/ld+json">
 * element. `<` is escaped so a value containing "</script>" can never close the
 * script element early. JSON.stringify drops `undefined` properties, so
 * builders may leave optional fields undefined.
 */
export function serializeJsonLd(data: unknown): string {
	return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** Site-wide publisher identity. Rendered once in the root layout. */
export function organizationSchema(): Json {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': `${SITE_ORIGIN}/#organization`,
		name: ORG.name,
		alternateName: ORG.alternateName,
		legalName: ORG.legalName,
		description: ORG.description,
		url: ORG.url,
		logo: ORG.logo,
		image: ORG.logo,
		email: ORG.email,
		telephone: ORG.telephone,
		address: {
			'@type': 'PostalAddress',
			addressCountry: 'JP',
			postalCode: ORG.address.postalCode,
			addressRegion: ORG.address.region,
			addressLocality: ORG.address.locality,
			streetAddress: ORG.address.street
		},
		contactPoint: {
			'@type': 'ContactPoint',
			telephone: ORG.telephone,
			email: ORG.email,
			contactType: 'sales',
			areaServed: 'JP',
			availableLanguage: ['ja']
		},
		sameAs: ORG.sameAs
	};
}

/** WebSite entity (helps Google understand the site name in results). */
export function websiteSchema(): Json {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${SITE_ORIGIN}/#website`,
		name: SITE_NAME,
		alternateName: SITE_ALT_NAME,
		url: SITE_ORIGIN,
		inLanguage: 'ja',
		publisher: { '@id': `${SITE_ORIGIN}/#organization` }
	};
}

export type Crumb = { name: string; path: string };

/**
 * Breadcrumb trail. Pass paths as site-relative (e.g. '/cold-chain'), ordered
 * from the site root to the current page (the last item is the current page
 * and provides the list's stable `@id`).
 */
export function breadcrumbSchema(items: Crumb[]): Json {
	const current = items[items.length - 1];
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		...(current ? { '@id': `${absUrl(current.path)}#breadcrumb` } : {}),
		itemListElement: items.map((c, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: c.name,
			item: absUrl(c.path)
		}))
	};
}

export type Faq = { q: string; a: string };

/** FAQPage from on-page Q&A. `a` should be plain text (no markup). */
export function faqSchema(items: Faq[]): Json {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a }
		}))
	};
}

export type ProductInput = {
	name: string;
	description: string;
	/** Root-relative canonical page for this product (gives it url + stable @id). */
	path?: string;
	image?: string;
	sku?: string;
	category?: string;
	/**
	 * Public list price (tax included). When present an Offer is emitted, which
	 * makes the Product eligible for Google's product rich results and clears
	 * the Search Console "offers/review/aggregateRating" warning. Only set it
	 * for prices that are actually published on the site.
	 */
	price?: number;
	/**
	 * Published price range (tax included). When lowPrice is present an
	 * AggregateOffer is emitted instead of a single Offer - use for set/tiered
	 * pricing where the page shows a starting or ranged price for a product
	 * line. highPrice is optional (omit for open-ended "from" pricing).
	 */
	lowPrice?: number;
	highPrice?: number;
	/** Number of offers covered by the low/high range. */
	offerCount?: number;
	/** ISO 4217 currency for `price`. Defaults to JPY on this site. */
	priceCurrency?: string;
	/** Root-relative page where the product can be bought/quoted (Offer.url). */
	offerUrl?: string;
};

/** A CropWatch hardware product (sensor, case, etc.). */
export function productSchema(p: ProductInput): Json {
	const out: Json = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: p.name,
		description: p.description,
		brand: { '@type': 'Brand', name: 'CropWatch' },
		manufacturer: { '@id': `${SITE_ORIGIN}/#organization` }
	};
	if (p.path) {
		out['@id'] = `${absUrl(p.path)}#product`;
		out.url = absUrl(p.path);
	}
	if (p.image) out.image = p.image;
	if (p.sku) out.sku = p.sku;
	if (p.category) out.category = p.category;
	if (p.lowPrice !== undefined) {
		out.offers = {
			'@type': 'AggregateOffer',
			lowPrice: String(p.lowPrice),
			...(p.highPrice !== undefined ? { highPrice: String(p.highPrice) } : {}),
			priceCurrency: p.priceCurrency ?? 'JPY',
			availability: 'https://schema.org/InStock',
			...(p.offerCount ? { offerCount: p.offerCount } : {}),
			...(p.offerUrl ? { url: absUrl(p.offerUrl) } : {})
		};
	} else if (p.price !== undefined) {
		out.offers = {
			'@type': 'Offer',
			price: String(p.price),
			priceCurrency: p.priceCurrency ?? 'JPY',
			availability: 'https://schema.org/InStock',
			...(p.offerUrl ? { url: absUrl(p.offerUrl) } : {})
		};
	}
	return out;
}

export type ArticleInput = {
	title: string;
	description: string;
	path: string;
	datePublished: string;
	dateModified?: string;
	image?: string;
};

/** A コラム (blog) article. */
export function articleSchema(a: ArticleInput): Json {
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		'@id': `${absUrl(a.path)}#article`,
		headline: a.title,
		description: a.description,
		mainEntityOfPage: absUrl(a.path),
		url: absUrl(a.path),
		inLanguage: 'ja',
		datePublished: a.datePublished,
		dateModified: a.dateModified ?? a.datePublished,
		image: a.image ?? undefined,
		author: { '@id': `${SITE_ORIGIN}/#organization` },
		publisher: { '@id': `${SITE_ORIGIN}/#organization` }
	};
}

export type VideoInput = {
	name: string;
	description: string;
	/** Root-relative page the video is embedded on (its preferred landing page). */
	path: string;
	/** Thumbnail image URL (absolute, or root-relative on this site). */
	thumbnailUrl: string;
	/** Real original publication date, ISO 8601 with timezone (e.g. '2026-07-01T09:00:00+09:00'). */
	uploadDate: string;
	/** ISO 8601 duration, e.g. 'PT2M14S'. */
	duration?: string;
	/** Embeddable player URL (e.g. https://www.youtube-nocookie.com/embed/ID). */
	embedUrl?: string;
	/** Direct URL to the video file bytes - never the HTML page URL. */
	contentUrl?: string;
};

/**
 * A video that is the primary content of its page (demo, install guide, etc.).
 * Do NOT emit this for decorative loops or placeholder players: `name`,
 * `thumbnailUrl` and `uploadDate` are required by Google and must describe a
 * video visitors can actually play on the page.
 */
export function videoSchema(v: VideoInput): Json {
	return {
		'@context': 'https://schema.org',
		'@type': 'VideoObject',
		'@id': `${absUrl(v.path)}#video`,
		name: v.name,
		description: v.description,
		thumbnailUrl: [v.thumbnailUrl.startsWith('http') ? v.thumbnailUrl : absUrl(v.thumbnailUrl)],
		uploadDate: v.uploadDate,
		duration: v.duration,
		embedUrl: v.embedUrl,
		contentUrl: v.contentUrl,
		url: absUrl(v.path),
		inLanguage: 'ja',
		publisher: { '@id': `${SITE_ORIGIN}/#organization` }
	};
}
