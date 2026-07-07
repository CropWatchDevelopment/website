// Shared site-level SEO constants for cropwatch.co.jp (the Japanese site).
// Kept in one place so titles, canonicals, OG tags, structured data and the
// sitemap all agree on the origin and brand strings.
//
// NOTE: this is the ONLY file in the SEO toolkit that legitimately differs
// between the .io and .co.jp deploy branches - `schema.ts` and `JsonLd.svelte`
// are byte-identical copies (like src/lib/seo/alternates.ts). Keep them in sync.

export const SITE_ORIGIN = 'https://cropwatch.co.jp';
export const SITE_NAME = 'CropWatch 日本';
// Katakana fallback for Google's "site name" selection (WebSite.alternateName).
export const SITE_ALT_NAME = 'クロップウォッチ';
export const SITE_LANG = 'ja';

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
	address?: OrgAddress;
	contact: { type: string; areaServed: string; availableLanguage: string[] };
	sameAs: string[];
}

// Publisher identity for the .co.jp entity.
// Address + phone: sourced from the published /legal/privacy-policy page (the
// legal source of truth), NOT the stale seagaia constants (which had 881-0001 /
// 4282). TODO(confirm): `email` and `sameAs` below still need a quick check.
export const ORG: Org = {
	legalName: '合同会社クロップウォッチ',
	name: SITE_NAME,
	alternateName: SITE_ALT_NAME,
	description:
		'コールドチェーン・スマート農業・スマート畜産向けの産業用ワイヤレス環境監視。LoRaWANセンサーで温度・湿度・CO₂を見える化し、記録の自動化とHACCP対応を支援します。',
	url: SITE_ORIGIN,
	// Google's logo guidelines want a crawlable raster (SVG unsupported), min 112px.
	logo: `${SITE_ORIGIN}/cropwatch_icons/icon-512x512.png`,
	telephone: '+81-80-4284-3390', // /legal/privacy-policy: 080-4284-3390
	email: 'sayaka@cropwatch.io', // TODO(confirm): correct public JP contact address
	address: {
		country: 'JP',
		postalCode: '881-0027', // /legal/privacy-policy
		region: '宮崎県',
		locality: '西都市',
		street: '南方806-5'
	},
	contact: { type: 'sales', areaServed: 'JP', availableLanguage: ['ja'] },
	// Add ONLY real, verified URLs - a wrong sameAs hurts. TODO(confirm) each.
	sameAs: [
		'https://cropwatch.io',
		'https://lin.ee/@122akgbd', // LINE 公式アカウント
		'https://www.youtube.com/@cropwatch4407',
		'https://www.linkedin.com/company/71224776'
	]
};

// Absolute URL for a path on this site (root stays '/'; trailing slash trimmed).
export function absUrl(pathname: string): string {
	const path = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
	return SITE_ORIGIN + path;
}
