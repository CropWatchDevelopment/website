export type SitemapLink = {
	labelKey: string;
	href: string;
};

export type SitemapSection = {
	headingKey: string;
	links: SitemapLink[];
};

export const sitemapSections: SitemapSection[] = [
	{
		headingKey: 'sitemap.sections.primary.heading',
		links: [
			{ labelKey: 'header.navigation.home', href: '/' },
			{ labelKey: 'header.navigation.products', href: '/products/cw-air-th' },
			{ labelKey: 'header.navigation.case_studies', href: '/case-studies' },
			{ labelKey: 'header.navigation.about', href: '/about' },
			{ labelKey: 'header.navigation.contact', href: '/contact' }
		]
	},
	{
		headingKey: 'sitemap.sections.resources.heading',
		links: [
			{ labelKey: 'header.utility.system_status', href: 'https://stats.uptimerobot.com/1Z6H85HuHq' },
			{ labelKey: 'header.utility.ui_app', href: 'https://app.cropwatch.io/' },
			{ labelKey: 'sitemap.links.lorawan', href: '/technology/lorawan' },
			{ labelKey: 'sitemap.links.case_study_archive', href: '/case-studies' }
		]
	},
	{
		headingKey: 'sitemap.sections.support.heading',
		links: [
			{ labelKey: 'common.actions.contact', href: '/contact' },
			{ labelKey: 'sitemap.links.pricing', href: '/#pricing' },
			{ labelKey: 'sitemap.links.faq', href: '/faq' },
			{ labelKey: 'sitemap.links.sitemap', href: '/sitemap' }
		]
	},
	{
		headingKey: 'sitemap.sections.legal.heading',
		links: [
			{ labelKey: 'sitemap.links.terms', href: '/legal/terms-of-service' },
			{ labelKey: 'sitemap.links.privacy', href: '/legal/privacy-policy' },
			{ labelKey: 'sitemap.links.robots', href: '/robots.txt' }
		]
	}
];

export const sitemapLinks: SitemapLink[] = sitemapSections.flatMap((section) => section.links);
