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
		title: 'LoRaWAN®とは？農業・畜産での使い方',
		description:
			'LoRaWAN®の仕組みと特長（長距離・省電力・免許不要の920MHz）を解説。農業のハウスや畜産の鶏舎など、電波が届きにくい現場でのワイヤレス温度監視での使い方を紹介します。',
		category: 'スマート農業',
		datePublished: '2026-07-03',
		readMinutes: 5,
		keywords: ['LoRaWAN®とは', 'LoRaWAN® 農業', '920MHz', 'ワイヤレス 温度監視'],
		targetHref: '/technology',
		targetLabel: 'CropWatchの技術を見る'
	},
	{
		slug: 'reitoko-ondo-kanshi',
		title: '−40℃の冷凍庫を温度監視するには？センサー選び5つのポイント',
		description:
			'業務用冷凍庫・プレハブ冷凍庫・急速冷凍庫の温度監視で失敗しないために。測定範囲、低温での精度と校正、金属の壁を越える無線、霜・結露への強さ、霜取り運転を考えたアラート設定の5点を解説します。',
		category: 'コールドチェーン',
		datePublished: '2026-10-10',
		readMinutes: 7,
		keywords: ['冷凍庫 温度監視', '冷凍庫 温度センサー', '−40℃ 温度センサー', '急速冷凍庫 温度管理', 'プレハブ冷凍庫'],
		targetHref: '/cold-chain',
		targetLabel: '冷蔵・冷凍の温度監視を見る'
	},
	{
		slug: 'haccp-ondo-kiroku-wifi-nashi',
		title: 'Wi-FiがなくてもHACCPの温度記録は自動化できる？5つの方法を比較',
		description:
			'厨房や倉庫にWi-Fiがない、冷凍庫の中まで電波が届かない。そんな現場でHACCPの温度記録を自動化する方法を、手書き・USBロガー・Wi-Fi・LTE・LoRaWAN®の5つで比較し、記録すべき項目とあわせて解説します。',
		category: 'コールドチェーン',
		datePublished: '2026-10-10',
		readMinutes: 7,
		keywords: ['HACCP 温度記録 自動化', 'Wi-Fiなし 温度監視', '温度ロガー 比較', 'LoRaWAN® 温度センサー'],
		targetHref: '/cold-chain',
		targetLabel: '温度記録の自動化を見る'
	},
	{
		slug: 'shimo-taisaku-ondo-alert',
		title: '霜害を防ぐ温度アラートの使い方｜ハウス・露地・果樹園',
		description:
			'霜は晴れて風のない明け方に、地面や作物の近くから冷え込みます。霜が降りやすい条件、作物の高さで測る理由、余裕をもったしきい値の決め方、暖房機の停止にも気づける夜間アラートの使い方を解説します。',
		category: 'スマート農業',
		datePublished: '2026-10-10',
		readMinutes: 6,
		keywords: ['霜対策', '霜害 対策', '霜 アラート', 'ハウス 温度 通知', '果樹 霜'],
		targetHref: '/agriculture',
		targetLabel: 'スマート農業の環境監視を見る'
	}
];

export const columnBySlug = (slug: string): Column | undefined =>
	COLUMNS.find((c) => c.slug === slug);
