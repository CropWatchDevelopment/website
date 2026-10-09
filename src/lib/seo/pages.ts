// Registry of the site's static public pages. Single source for
// /sitemap.xml and /llms.txt (news comes from static/news/*.json).
// pages.test.ts fails if a public route is missing from here.
//
// When a page's content changes materially: update its `summary` (keep it in
// line with the page's meta description) and set/bump `lastmod` (YYYY-MM-DD).

export type LlmsSection = 'main' | 'support' | 'legal';

export type PageEntry = {
	path: string;
	title: string; // short page name for llms.txt
	summary: string; // one-line summary for llms.txt (mirrors the meta description)
	section: LlmsSection;
	lastmod?: string; // emitted as <lastmod> when set
	priority: string;
	changefreq: 'weekly' | 'monthly' | 'yearly';
};

export const PAGES: PageEntry[] = [
	{
		path: '/',
		title: 'Choose your sector',
		summary:
			'Find the right CropWatch monitoring solution: cold-chain and refrigeration for restaurants, hotels and schools; agriculture and greenhouses for farms; climate monitoring for poultry and livestock.',
		section: 'main',
		priority: '1.0',
		changefreq: 'monthly'
	},
	{
		path: '/home',
		title: 'CropWatch overview',
		summary:
			'Rugged wireless temperature and humidity sensors with audit-ready software. User-replaceable, ISO/IEC 17025 certified, dual-sensor verified. Unlimited users, rules, API and reports at no extra cost.',
		section: 'main',
		priority: '0.9',
		changefreq: 'monthly'
	},
	{
		path: '/cold-chain',
		title: 'Cold chain and refrigeration monitoring',
		summary:
			'Wireless walk-in cooler and freezer temperature monitoring with HACCP-ready logs for restaurants, hotels, schools, grocery and cold storage.',
		lastmod: '2026-10-10',
		section: 'main',
		priority: '0.8',
		changefreq: 'monthly'
	},
	{
		path: '/agriculture',
		title: 'Agriculture and greenhouse monitoring',
		summary:
			'Soil moisture, soil temperature and EC; air temperature, humidity and CO2; calculated VPD, PPFD and DLI for greenhouses, fields, orchards and vineyards.',
		lastmod: '2026-10-10',
		section: 'main',
		priority: '0.8',
		changefreq: 'monthly'
	},
	{
		path: '/livestock',
		title: 'Poultry and livestock monitoring',
		summary:
			'Wireless temperature, CO2, humidity and ammonia (NH3) monitoring for poultry houses, barns and livestock sheds. Catch heat stress and poor ventilation early.',
		lastmod: '2026-10-10',
		section: 'main',
		priority: '0.8',
		changefreq: 'monthly'
	},
	{
		path: '/pricing',
		title: 'Pricing and savings calculator',
		summary:
			'What CropWatch costs and what it saves: compares manual clipboard logging against automated monitoring for your number of units and logging frequency.',
		lastmod: '2026-10-10',
		section: 'main',
		priority: '0.7',
		changefreq: 'monthly'
	},
	{
		path: '/replacement-sensors',
		title: 'Replacement sensors',
		summary:
			'Pre-calibrated, user-replaceable sensor modules that swap in under a minute, each with a per-serial ISO/IEC 17025 calibration certificate.',
		section: 'main',
		priority: '0.6',
		changefreq: 'monthly'
	},
	{
		path: '/contact',
		title: 'Contact and book a demo',
		summary:
			'Book a demo or talk to sales and support. We map the sensors, gateways and alerts for your site and show you the audit trail it produces.',
		section: 'main',
		priority: '0.7',
		changefreq: 'monthly'
	},
	{
		path: '/news',
		title: 'News and updates',
		summary: 'Product news, certifications and field stories from CropWatch.',
		section: 'support',
		priority: '0.5',
		changefreq: 'weekly'
	},
	{
		path: '/legal',
		title: 'Legal information',
		summary: 'Privacy Policy, Service Terms of Use and Cookie Policy.',
		section: 'legal',
		priority: '0.2',
		changefreq: 'yearly'
	},
	{
		path: '/legal/privacy-policy',
		title: 'Privacy Policy',
		summary: 'How personal information is handled, used, managed and protected.',
		section: 'legal',
		priority: '0.2',
		changefreq: 'yearly'
	},
	{
		path: '/legal/terms-of-service',
		title: 'Cookie Policy',
		summary: 'Cookie use in CropWatch services and the controls available to users.',
		section: 'legal',
		priority: '0.2',
		changefreq: 'yearly'
	},
	{
		path: '/legal/EULA',
		title: 'Service Terms of Use (EULA)',
		summary: 'Service Terms of Use for cloud services provided by CropWatch, LLC.',
		section: 'legal',
		priority: '0.2',
		changefreq: 'yearly'
	}
];
