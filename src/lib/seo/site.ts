// Shared site-level SEO constants for cropwatch.co.jp (the Japanese site).
// Kept in one place so titles, canonicals, OG tags, structured data and the
// sitemap all agree on the origin and brand strings.

export const SITE_ORIGIN = 'https://cropwatch.co.jp';
export const SITE_NAME = 'CropWatch 日本';
// Katakana fallback for Google's "site name" selection (WebSite.alternateName).
export const SITE_ALT_NAME = 'クロップウォッチ';

// Legal entity + contact details (source: /legal/privacy-policy and /contact).
export const ORG = {
	legalName: '合同会社クロップウォッチ',
	name: SITE_NAME,
	alternateName: SITE_ALT_NAME,
	description:
		'コールドチェーン・スマート農業・スマート畜産向けの産業用ワイヤレス環境監視。LoRaWAN™センサーで温度・湿度・CO₂を見える化し、記録の自動化とHACCP対応を支援します。',
	url: SITE_ORIGIN,
	// Google's logo guidelines want a crawlable raster (SVG unsupported), min 112px.
	logo: `${SITE_ORIGIN}/cropwatch_icons/icon-512x512.png`,
	// Customer-facing number shown on the contact page.
	telephone: '+81-80-4284-3390',
	email: 'sayaka@cropwatch.io',
	address: {
		postalCode: '881-0027',
		region: '宮崎県',
		locality: '西都市',
		street: '南方806-5'
	},
	// Official profiles that identify the brand entity (strengthens the knowledge
	// panel where brand-search sitelinks appear). Add ONLY real, verified URLs —
	// a wrong sameAs hurts. Paste the official Japan profile URLs below:
	sameAs: [
		'https://cropwatch.io',
		'https://line.me/R/ti/p/@122akgbd', // LINE公式アカウント（lin.ee/@122akgbd は404だった）
		'https://www.youtube.com/@cropwatch4407', // YouTube
		'https://www.linkedin.com/company/71224776' // LinkedIn
		// TODO: add when ready —
		// 'https://x.com/XXXXXXX'            (X / Twitter)
		// 'https://www.facebook.com/XXXXXXX' (Facebook)
	]
} as const;

// Default social-share image (1200x630). Falls back here when a page sets none.
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/assets/og/cropwatch-og.png`;

// Absolute URL for a path on this site (root stays '/'; trailing slash trimmed).
export function absUrl(pathname: string): string {
	const path = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
	return SITE_ORIGIN + path;
}
