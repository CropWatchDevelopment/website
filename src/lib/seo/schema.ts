// JSON-LD (schema.org) builders. Each returns a plain object that <JsonLd>
// serialises into a <script type="application/ld+json"> tag. Pure functions →
// trivial to reuse across routes and SSR/prerender-safe (no browser APIs).
//
// This file is LOCALE-NEUTRAL and intended to be byte-identical on both the .io
// and .co.jp branches — every site-specific value comes from ./site.ts. Keep the
// two copies in sync (see the note in site.ts).

import { ORG, SITE_ALT_NAME, SITE_LANG, SITE_NAME, SITE_ORIGIN, absUrl } from './site';

type Json = Record<string, unknown>;

const ORG_ID = `${SITE_ORIGIN}/#organization`;
const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

/** Site-wide publisher identity. Rendered once in the root layout. */
export function organizationSchema(): Json {
	const out: Json = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': ORG_ID,
		name: ORG.name,
		// undefined keys are dropped by JSON.stringify, so optional fields vanish.
		alternateName: ORG.alternateName,
		legalName: ORG.legalName,
		description: ORG.description,
		url: ORG.url,
		logo: ORG.logo,
		image: ORG.logo,
		email: ORG.email,
		telephone: ORG.telephone,
		contactPoint: {
			'@type': 'ContactPoint',
			telephone: ORG.telephone,
			email: ORG.email,
			contactType: ORG.contact.type,
			areaServed: ORG.contact.areaServed,
			availableLanguage: ORG.contact.availableLanguage
		},
		sameAs: ORG.sameAs
	};
	// Only emit a PostalAddress when a confirmed address exists (the .io entity
	// has none published yet; Organization is valid without it).
	if (ORG.address) {
		out.address = {
			'@type': 'PostalAddress',
			addressCountry: ORG.address.country,
			postalCode: ORG.address.postalCode,
			addressRegion: ORG.address.region,
			addressLocality: ORG.address.locality,
			streetAddress: ORG.address.street
		};
	}
	return out;
}

/** WebSite entity (helps Google understand the site name in results). */
export function websiteSchema(): Json {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': WEBSITE_ID,
		name: SITE_NAME,
		alternateName: SITE_ALT_NAME,
		url: SITE_ORIGIN,
		inLanguage: SITE_LANG,
		publisher: { '@id': ORG_ID }
	};
}

export type Crumb = { name: string; path?: string };

/**
 * Breadcrumb trail. Pass paths as site-relative (e.g. '/cold-chain'). Omit
 * `path` on the current page (and on name-only parents like Japan's 製品) — those
 * crumbs render without an `item`, matching Google's breadcrumb guidance.
 */
export function breadcrumbSchema(items: Crumb[]): Json {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((c, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: c.name,
			...(c.path ? { item: absUrl(c.path) } : {})
		}))
	};
}

export type ProductInput = {
	name: string;
	description: string;
	image?: string;
	sku?: string;
	category?: string;
	url?: string;
};

/**
 * A CropWatch hardware product (sensor, gateway, case). Deliberately carries NO
 * offers/review/aggregateRating: without a real price or genuine third-party
 * ratings a Product is valid markup but not rich-result eligible, and fabricated
 * self-serving ratings are against Google's policy.
 */
export function productSchema(p: ProductInput): Json {
	const out: Json = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: p.name,
		description: p.description,
		brand: { '@type': 'Brand', name: 'CropWatch' },
		manufacturer: { '@id': ORG_ID }
	};
	if (p.image) out.image = p.image;
	if (p.sku) out.sku = p.sku;
	if (p.category) out.category = p.category;
	if (p.url) out.url = absUrl(p.url);
	return out;
}

export type VideoInput = {
	name: string;
	description: string;
	thumbnailUrl: string | string[];
	uploadDate: string; // ISO 8601 — REQUIRED by Google. Only emit when set.
	embedUrl?: string;
	contentUrl?: string;
	duration?: string; // ISO 8601 duration, e.g. PT2M30S
};

/** A VideoObject for an on-page video (e.g. a YouTube embed). */
export function videoObjectSchema(v: VideoInput): Json {
	const out: Json = {
		'@context': 'https://schema.org',
		'@type': 'VideoObject',
		name: v.name,
		description: v.description,
		thumbnailUrl: v.thumbnailUrl,
		uploadDate: v.uploadDate
	};
	if (v.embedUrl) out.embedUrl = v.embedUrl;
	if (v.contentUrl) out.contentUrl = v.contentUrl;
	if (v.duration) out.duration = v.duration;
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

/**
 * A blog/column article. Shipped ready but currently UNWIRED — neither site has
 * live article content yet (.io /news is a stub, .co.jp has no column route).
 */
export function articleSchema(a: ArticleInput): Json {
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: a.title,
		description: a.description,
		mainEntityOfPage: absUrl(a.path),
		url: absUrl(a.path),
		inLanguage: SITE_LANG,
		datePublished: a.datePublished,
		dateModified: a.dateModified ?? a.datePublished,
		...(a.image ? { image: a.image } : {}),
		author: { '@id': ORG_ID },
		publisher: { '@id': ORG_ID }
	};
}
