export type SitemapLink = {
	label: string;
	href: string;
};

export type SitemapSection = {
	heading: string;
	links: SitemapLink[];
};

export const sitemapSections: SitemapSection[] = [
	{
		heading: '主要ページ',
		links: [
			{ label: 'ホーム', href: '/' },
			{ label: '製品', href: '/products/cw-air-th' },
			{ label: '導入事例', href: '/case-studies' },
			{ label: '会社情報', href: '/about' },
			{ label: 'お問い合わせ', href: '/contact' }
		]
	},
	{
		heading: 'リソース & ツール',
		links: [
			{ label: 'システムステータス', href: 'https://stats.uptimerobot.com/1Z6H85HuHq' },
			{ label: 'UI アプリ', href: 'https://app.cropwatch.io/' },
			{ label: 'LoRaWAN テクノロジー概要', href: '/technology/lorawan' },
			{ label: '導入事例アーカイブ', href: '/case-studies' }
		]
	},
	{
		heading: 'サポート & ヘルプ',
		links: [
			{ label: 'お問い合わせ', href: '/contact' },
			{ label: '料金の概要', href: '/#pricing' },
			{ label: 'よくある質問', href: '/faq' },
			{ label: 'サイトマップ', href: '/sitemap' }
		]
	},
	{
		heading: '法務・コンプライアンス',
		links: [
			{ label: '利用規約', href: '/legal/terms-of-service' },
			{ label: 'プライバシーポリシー', href: '/legal/privacy-policy' },
			{ label: 'robots.txt', href: '/robots.txt' }
		]
	}
];

export const sitemapLinks: SitemapLink[] = sitemapSections.flatMap((section) => section.links);
