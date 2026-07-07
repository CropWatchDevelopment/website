// Shared site-level SEO constants for cropwatch.io (the US / global English site).
// Kept in one place so titles, canonicals, OG tags, structured data and the
// sitemap all agree on the origin and brand strings.
//
// NOTE: this is the ONLY file in the SEO toolkit that legitimately differs
// between the .io and .co.jp deploy branches — `schema.ts` and `JsonLd.svelte`
// are byte-identical copies (like src/lib/seo/alternates.ts). Keep them in sync.

export const SITE_ORIGIN = 'https://cropwatch.io';
export const SITE_NAME = 'CropWatch';
export const SITE_ALT_NAME = 'CropWatch';
export const SITE_LANG = 'en';

// Default social-share image (1200x630). Only consumed by future OG helpers, not
// by JSON-LD. No dedicated asset exists yet, so this falls back to the logo.
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/cropwatch_icons/icon-512x512.png`;

interface OrgAddress {
	country: string;
	postalCode: string;
	region: string;
	locality: string;
	street: string;
}

interface Org {
	legalName?: string;
	name: string;
	alternateName?: string;
	description: string;
	url: string;
	logo: string;
	telephone: string;
	email: string;
	address?: OrgAddress; // omit when no confirmed postal address (US has none yet)
	contact: { type: string; areaServed: string; availableLanguage: string[] };
	sameAs: string[];
}

// Publisher identity for the .io entity. No US postal address is published on the
// site, so `address` is intentionally omitted — organizationSchema() drops the
// PostalAddress node when it's undefined (Organization is still valid without it).
export const ORG: Org = {
	name: SITE_NAME,
	description:
		'Industrial-grade wireless environmental monitoring for cold chain, smart agriculture and smart livestock. LoRaWAN sensors track temperature, humidity, CO2 and more, automating records and HACCP compliance.',
	url: SITE_ORIGIN,
	// Google's logo guidelines want a crawlable raster (SVG unsupported), min 112px.
	logo: `${SITE_ORIGIN}/cropwatch_icons/icon-512x512.png`,
	telephone: '+1-978-381-3105',
	email: 'sales@cropwatch.io',
	contact: { type: 'sales', areaServed: 'US', availableLanguage: ['en'] },
	// Official brand profiles that identify the entity. Add ONLY real, verified
	// URLs — a wrong sameAs hurts. TODO(confirm): verify these represent the .io
	// (US/global) entity before relying on them.
	sameAs: [
		'https://www.linkedin.com/company/71224776',
		'https://www.youtube.com/@cropwatch4407',
		'https://cropwatch.co.jp'
	]
};

// Absolute URL for a path on this site (root stays '/'; trailing slash trimmed).
export function absUrl(pathname: string): string {
	const path = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
	return SITE_ORIGIN + path;
}
