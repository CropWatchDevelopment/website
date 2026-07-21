// コラム (blog) article manifest. One entry per article; the index page,
// each article page, and the sitemap all read from here so metadata stays in
// one place. Article bodies live in src/routes/column/<slug>/+page.svelte and
// render inside <ColumnArticle {column}>.

export type Column = {
	slug: string;
	title: string; // used for <title>, H1 and the card
	description: string; // meta description + card summary
	category: string; // topical cluster label (コールドチェーン / スマート農業 / スマート畜産)
	datePublished: string; // ISO date (YYYY-MM-DD)
	dateModified?: string;
	readMinutes: number;
	keywords: string[];
	targetHref: string; // the money page this article funnels to
	targetLabel: string; // CTA label
};

export const COLUMNS: Column[] = [
	{
		slug: 'haccp-gimuka',
		title: 'HACCP義務化とは？飲食店の温度管理の始め方',
		description:
			'2021年に完全義務化されたHACCP。飲食店や小規模事業者が最初に取り組むべき冷蔵庫・冷凍庫の温度管理と記録の残し方を、IoTでの自動化まで含めて分かりやすく解説します。',
		category: 'コールドチェーン',
		datePublished: '2026-06-10',
		readMinutes: 6,
		keywords: ['HACCP義務化', 'HACCP 温度管理', '飲食店 温度記録', '冷蔵庫 温度管理'],
		targetHref: '/cold-chain',
		targetLabel: 'コールドチェーンの温度監視を見る'
	},
	{
		slug: 'reizoko-ondo-kiroku-jidoka',
		title: '冷蔵庫の温度記録を自動化する方法',
		description:
			'手書きの温度チェック表をやめ、冷蔵庫・冷凍庫の温度記録を自動化する方法を解説。IoT温度センサーと温度データロガーの選び方、遠隔監視とアラートで記録漏れをなくす手順を紹介します。',
		category: 'コールドチェーン',
		datePublished: '2026-06-17',
		readMinutes: 5,
		keywords: ['冷蔵庫 温度記録 自動化', '温度データロガー', '遠隔温度監視', '温度監視システム'],
		targetHref: '/cold-chain',
		targetLabel: '温度記録の自動化を見る'
	},
	{
		slug: 'keisha-shonetsu-taisaku',
		title: '鶏舎の暑熱対策｜夏場の温度管理を見える化する',
		description:
			'夏場の鶏舎は35℃を超えると被害が拡大します。暑熱ストレスを防ぐ換気・温度管理の考え方と、養鶏IoTセンサーで鶏舎内の温度・湿度を24時間見える化する暑熱対策を解説します。',
		category: 'スマート畜産',
		datePublished: '2026-06-24',
		readMinutes: 6,
		keywords: ['鶏舎 暑熱対策', '養鶏IoT', '鶏舎 温度管理', 'スマート畜産'],
		targetHref: '/livestock',
		targetLabel: '畜産・養鶏の環境監視を見る'
	},
	{
		slug: 'smart-nogyo-toha',
		title: 'スマート農業とは？IoTセンサー導入の基礎',
		description:
			'スマート農業の意味と、農業IoTセンサーで何ができるのかを基礎から解説。ハウス・施設園芸の温度・湿度・CO₂・土壌の見える化と、遠隔監視を始めるための第一歩を紹介します。',
		category: 'スマート農業',
		datePublished: '2026-07-01',
		readMinutes: 6,
		keywords: ['スマート農業とは', '農業IoT', '施設園芸', 'ハウス 温度管理'],
		targetHref: '/agriculture',
		targetLabel: 'スマート農業の環境監視を見る'
	},
	{
		slug: 'cold-chain-toha',
		title: 'コールドチェーンとは？5つの温度帯と品質管理',
		description:
			'コールドチェーン（低温物流）の意味と、食品を守る5つの温度帯を解説。生産から輸送・保管・販売まで温度を切らさないための温度管理と、IoTによる遠隔監視の役割を紹介します。',
		category: 'コールドチェーン',
		datePublished: '2026-07-02',
		readMinutes: 5,
		keywords: ['コールドチェーンとは', '5つの温度帯', '低温物流', '温度管理'],
		targetHref: '/cold-chain',
		targetLabel: 'コールドチェーンの温度監視を見る'
	},
	{
		slug: 'lorawan-toha',
		title: 'LoRaWAN™とは？農業・畜産での使い方',
		description:
			'LoRaWAN™の仕組みと特長（長距離・省電力・免許不要の920MHz）を解説。農業のハウスや畜産の鶏舎など、電波が届きにくい現場でのワイヤレス温度監視での使い方を紹介します。',
		category: 'スマート農業',
		datePublished: '2026-07-03',
		readMinutes: 5,
		keywords: ['LoRaWAN™とは', 'LoRaWAN™ 農業', '920MHz', 'ワイヤレス 温度監視'],
		targetHref: '/technology',
		targetLabel: 'CropWatchの技術を見る'
	}
];

export const columnBySlug = (slug: string): Column | undefined =>
	COLUMNS.find((c) => c.slug === slug);
