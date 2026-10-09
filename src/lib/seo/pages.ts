// Registry of the site's static public pages. Single source for
// /sitemap.xml and /llms.txt (コラム and ニュース come from their own content
// manifests). pages.test.ts fails if a public route is missing from here.
//
// When a page's content changes materially: update its `summary` and bump
// `lastmod` (YYYY-MM-DD). Keep `summary` in sync with the page's meta
// description.

export type LlmsSection = 'main' | 'support' | 'legal';

export type PageEntry = {
	path: string;
	title: string; // short page name for llms.txt
	summary: string; // one-line summary for llms.txt (mirrors the meta description)
	section: LlmsSection;
	lastmod: string;
	priority: string;
	changefreq: 'weekly' | 'monthly' | 'yearly';
};

// Default content date. Kept stable across rebuilds so <lastmod> doesn't churn
// on every deploy.
const LASTMOD = '2026-07-05';

export const PAGES: PageEntry[] = [
	{
		path: '/',
		title: 'ホーム',
		summary:
			'コールドチェーンの温度監視、スマート農業、スマート畜産・養鶏IoT。冷蔵庫・冷凍庫から鶏舎・ハウスまで、同じセンサーと同じ画面で見える化する、置くだけのワイヤレス温度・環境監視システム。',
		section: 'main',
		lastmod: LASTMOD,
		priority: '1.0',
		changefreq: 'weekly'
	},
	{
		path: '/cold-chain',
		title: 'コールドチェーン（冷蔵・冷凍の温度監視）',
		summary:
			'電池駆動のLoRaWAN®センサーが冷蔵庫・冷凍庫の温度・湿度を10分ごとに自動記録し、スマホやPCから遠隔監視。HACCP対応の温度記録の自動化、ISO/IEC 17025校正証明書つき。',
		section: 'main',
		lastmod: LASTMOD,
		priority: '0.9',
		changefreq: 'monthly'
	},
	{
		path: '/agriculture',
		title: 'スマート農業（ハウス・露地の環境モニタリング）',
		summary:
			'ハウス栽培・施設園芸・露地・果樹の温度・湿度・CO₂・土壌をワイヤレスセンサーで見える化し、霜・高温・乾燥を早めに通知。電池式・配線工事なし。',
		section: 'main',
		lastmod: LASTMOD,
		priority: '0.9',
		changefreq: 'monthly'
	},
	{
		path: '/livestock',
		title: 'スマート畜産・養鶏（鶏舎・畜舎の環境監視）',
		summary:
			'鶏舎・畜舎の温度・湿度を10分ごとに自動送信し、暑熱ストレスや換気不良を早期に発見。LoRaWAN®で配線工事なし、ISO/IEC 17025校正証明書つき。',
		section: 'main',
		lastmod: LASTMOD,
		priority: '0.9',
		changefreq: 'monthly'
	},
	{
		path: '/pricing',
		title: '料金',
		summary:
			'月額は1シートあたり800円（税込880円）、最低3シートから。ユーザー数無制限・アラート通知・API込み。自動レポート（無制限）は月額3,500円（税込3,850円）のオプション。人件費との比較シミュレーションつき。',
		section: 'main',
		lastmod: '2026-07-21',
		priority: '0.8',
		changefreq: 'monthly'
	},
	{
		path: '/technology',
		title: '技術・設計',
		summary:
			'8か国・18メーカーの部品、2つのセンサーによる測定値の検証、その場で交換できる電池・センサー・ケース、記録を守るFRAMメモリ、二重の番犬機能など、センサー基板の設計。',
		section: 'main',
		lastmod: LASTMOD,
		priority: '0.7',
		changefreq: 'monthly'
	},
	{
		path: '/replacement-sensors',
		title: '交換用センサー',
		summary:
			'校正済みの交換用センサーモジュール。だれでも60秒で交換でき、1台ごとにISO/IEC 17025の校正証明書つき。温度・湿度・CO₂・土壌など。',
		section: 'main',
		lastmod: LASTMOD,
		priority: '0.7',
		changefreq: 'monthly'
	},
	{
		path: '/replacement-case',
		title: '交換用ケース',
		summary:
			'すべてのセンサーが入る防塵・防水（IP66）ケース。冷凍庫の霜・鶏舎の洗浄・畑の直射日光やホコリから中身を守ります。',
		section: 'main',
		lastmod: LASTMOD,
		priority: '0.7',
		changefreq: 'monthly'
	},
	{
		path: '/testimonials',
		title: 'お客様の声・導入事例',
		summary:
			'宮崎・シーガイアのガーデンビュッフェ「パインテラス」やTK-EBISUの養鶏など、飲食・ホテル・倉庫・農業・畜産の導入事例。',
		section: 'main',
		lastmod: LASTMOD,
		priority: '0.6',
		changefreq: 'monthly'
	},
	{
		path: '/contact',
		title: 'お問い合わせ・無料デモ',
		summary:
			'お問い合わせ・無料デモのご予約。見守りたい場所をお聞かせいただければ、最適なセンサー・受信機・通知の設定をご提案します。',
		section: 'main',
		lastmod: LASTMOD,
		priority: '0.8',
		changefreq: 'yearly'
	},
	{
		path: '/help',
		title: 'ヘルプ・使い方ガイド',
		summary:
			'センサーの設置、通知の設定、記録のダウンロード、センサーの交換、よくあるトラブルの解決方法を動画つきで解説。',
		section: 'support',
		lastmod: LASTMOD,
		priority: '0.6',
		changefreq: 'monthly'
	},
	{
		path: '/column',
		title: 'コラム',
		summary:
			'HACCP義務化、冷蔵庫の温度記録の自動化、鶏舎の暑熱対策、スマート農業やLoRaWAN®の基礎など、温度監視に役立つ記事の一覧。',
		section: 'support',
		lastmod: LASTMOD,
		priority: '0.7',
		changefreq: 'weekly'
	},
	{
		path: '/legal',
		title: '法的情報',
		summary: 'プライバシーポリシー、サービス利用規約（EULA）、クッキーポリシーの一覧。',
		section: 'legal',
		lastmod: '2026-07-30',
		priority: '0.2',
		changefreq: 'yearly'
	},
	{
		path: '/legal/privacy-policy',
		title: 'プライバシーポリシー',
		summary: '個人情報の取扱い、利用目的、管理・保護、開示請求への対応。',
		section: 'legal',
		lastmod: LASTMOD,
		priority: '0.2',
		changefreq: 'yearly'
	},
	{
		path: '/legal/terms-of-service',
		title: '利用規約・クッキーポリシー',
		summary: 'クッキーの利用方針および利用者の権利。',
		section: 'legal',
		lastmod: LASTMOD,
		priority: '0.2',
		changefreq: 'yearly'
	},
	{
		path: '/legal/EULA',
		title: 'サービス利用規約（EULA）',
		summary: '合同会社クロップウォッチが提供するサービスの利用規約。',
		section: 'legal',
		lastmod: LASTMOD,
		priority: '0.2',
		changefreq: 'yearly'
	}
];
