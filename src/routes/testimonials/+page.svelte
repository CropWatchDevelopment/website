<script lang="ts">
import Seo from '$lib/components/Seo.svelte';
import JsonLd from '$lib/components/JsonLd.svelte';
import { breadcrumbSchema } from '$lib/seo/schema';

const title = 'お客様の声・導入事例｜温度監視・スマート農業・スマート畜産｜CropWatch 日本';
const description =
	'CropWatch（クロップウォッチ）を導入したお客様の声・導入事例。宮崎・シーガイアのガーデンビュッフェ「パインテラス」やTK-EBISUの養鶏をはじめ、飲食・ホテル・倉庫・農業・畜産の現場で、温度監視と記録の手間がどう変わったかをご紹介します。';

const testimonialsLd = breadcrumbSchema([
	{ name: 'ホーム', path: '/' },
	{ name: 'お客様の声', path: '/testimonials' }
]);

type Who = { icon?: string; initial?: string; name: string; role: string };
type Testimonial = {
	href: string;
	tag: { icon: string; label: string };
	img: string;
	biz: string;
	loc: string;
	quote: string;
	chips: string[];
	who: Who;
	caseStudy?: boolean; // shows the "導入事例" badge (a real, named customer)
	view?: 'tall' | 'wide' | 'dwide'; // 'tall' = 2-column hero (tall side photo); 'wide' (default) = standard card (wide banner photo on top); 'dwide' = double-wide (spans 2 columns, banner photo on top)
};

const TESTIMONIALS: Testimonial[] = [
	{
		href: '/cold-chain',
		tag: { icon: 'restaurant', label: '飲食・ホテル' },
		img: '/assets/photos/seagaia.webp',
		biz: 'ガーデンビュッフェ「パインテラス」',
		loc: '宮崎市・シーガイア',
		quote:
			'宮崎の旬を主役にしたガーデンビュッフェ。サラダバーや作りたての料理を支える冷蔵・冷凍庫の温度を、CropWatch のワイヤレスセンサーが24時間自動で記録します。基準を外れればすぐに通知し、HACCP対応の記録も置くだけで残ります。',
		chips: ['冷蔵・冷凍監視', 'HACCP対応記録', '異常通知'],
		who: {
			icon: 'apartment',
			name: 'シェラトン・グランデ・オーシャンリゾート',
			role: 'フェニックス・シーガイア・リゾート ／ 宮崎'
		},
		caseStudy: true,
		view: 'dwide'
	},
	{
		href: '/livestock',
		tag: { icon: 'pets', label: '畜産・養鶏' },
		img: '/assets/photos/poultry.webp',
		biz: 'ティケイ・エビス株式会社（TK-EBISU）',
		loc: '宮崎県都城市',
		quote:
			'宮崎・都城で種鶏の飼育・ふ化からペットフード・食品まで手がけるエビスグループの一社。鶏舎の温度・湿度を CropWatch のワイヤレスセンサーが24時間見守り、暑さや換気の異常を早めにお知らせ。電池式・配線不要で、長い鶏舎も端から端までカバーします。',
		chips: ['鶏舎の温度・湿度監視', '暑熱・換気アラート', '電池式・配線不要'],
		who: { icon: 'egg', name: 'エビスグループ', role: '種鶏・ふ化 ／ ペットフード ／ 食品' },
		caseStudy: true
	},
	{
		href: '/agriculture',
		tag: { icon: 'eco', label: '農業・ハウス' },
		img: '/assets/photos/agriculture-peppers.webp',
		biz: 'やまもと農園',
		loc: '施設園芸（キュウリ）',
		quote:
			'キュウリのハウス栽培。土壌のEC（電気伝導度）・地温・水分と、空気中のCO₂・温度・湿度を CropWatch が同時に見える化します。かん水や追肥、換気・CO₂施用のタイミングを、勘ではなくデータで判断できるようになりました。',
		chips: ['土壌EC', '地温・土壌水分', 'CO₂・温度・湿度'],
		who: { initial: '山', name: '山本 直樹 様', role: 'やまもと農園 ／ キュウリ（施設園芸）' }
	},
	{
		href: '/cold-chain',
		tag: { icon: 'warehouse', label: '倉庫・物流' },
		img: '/assets/photos/coldchain-door.webp',
		biz: '城北ロジスティクス',
		loc: '冷蔵・冷凍倉庫',
		quote:
			'複数の冷蔵倉庫をひとつの画面で見られるようになり、巡回の手間が大きく減りました。報告書もそのまま出せるので、月次のまとめが早いです。',
		chips: ['複数拠点を一元監視', '帳票出力', '巡回削減'],
		who: { initial: '高', name: '高橋 物流 様', role: '城北ロジスティクス ／ 倉庫管理' },
		view: 'tall'
	},
	{
		href: '/replacement-sensors',
		tag: { icon: 'verified', label: '検査・監査対応' },
		img: '/assets/imagery/device-detail.webp',
		biz: 'メディカルフーズ',
		loc: '品質保証部',
		quote:
			'センサーごとに校正証明書（ISO/IEC 17025）が画面から出せるので、監査の準備時間が半分以下になりました。書類を探し回らなくていいんです。',
		chips: ['ISO/IEC 17025 校正', '証明書ダウンロード', '監査準備を短縮'],
		who: { initial: '伊', name: '伊藤 由美 様', role: 'メディカルフーズ ／ 品質保証部' }
	},
	{
		href: '/technology',
		tag: { icon: 'restaurant_menu', label: '飲食・店舗' },
		img: '/assets/imagery/device-side-view.webp',
		biz: 'ビストロ・ノルド',
		loc: 'レストラン（厨房）',
		quote:
			'機器が一時的に止まっても自動で復旧してくれるので、忙しい時間帯でも気にしなくて済みます。記録作業がなくなり、接客に集中できています。',
		chips: ['自動復旧（番犬機能）', '記録の自動化', '通知'],
		who: { initial: '中', name: '中村 翔 様', role: 'ビストロ・ノルド ／ 店長' }
	},
	{
		href: '/cold-chain',
		tag: { icon: 'storefront', label: '飲食・小売' },
		img: '/assets/photos/JA_Saito.webp',
		biz: 'JA 宮崎中央（フレッシュマート）',
		loc: 'スーパーマーケット（生鮮売場）',
		quote:
			'複数店舗の冷蔵ショーケースとバックヤードの冷凍庫を、店舗ごとに見て回るのが大変でした。CropWatch を入れてからは全店の温度をひとつの画面で確認でき、基準を外れた売場だけにすぐ気づけます。開店前の温度チェックも記録が自動で残るので、担当者による差もなくなりました。',
		chips: ['売場ケースの温度監視', '複数店舗を一元管理', '帳票出力'],
		who: { initial: '佐', name: '佐藤 健 様', role: 'フレッシュマート ／ 店舗運営部' },
		view: 'dwide'
	}
];
</script>

<Seo {title} {description} />
<JsonLd data={testimonialsLd} />

<div class="crumb"><div class="wrap crumb__in">
	<a href="/">ホーム</a><span class="material-symbols-rounded">chevron_right</span>
	<b>お客様の声</b>
</div></div>

<section class="section section--soft">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">reviews</span> 導入事例・お客様の声</p>
			<h2>どの現場でも、「見える」と「残る」を。</h2>
			<p>業種は違っても、求めることは同じ。手間を減らし、確かな記録を残すこと。</p>
		</div>

		<div class="tgrid">
			{#each TESTIMONIALS as t, i (t.biz + t.href)}
				<a class="tcard" class:tcard--tall={t.view === 'tall'} class:tcard--dwide={t.view === 'dwide'} href={t.href} data-reveal={i % 3}>
					<div class="tphoto" style="background-image:url('{t.img}')">
						<span class="tcard__tag"><span class="material-symbols-rounded">{t.tag.icon}</span> {t.tag.label}</span>
						{#if t.caseStudy}
							<span class="tcard__feat"><span class="material-symbols-rounded">star</span> 導入事例</span>
						{/if}
					</div>

					<div class="tcard__body">
						<div class="tcard__id">
							<b class="tcard__biz">{t.biz}</b>
							<span class="tcard__loc"><span class="material-symbols-rounded">location_on</span> {t.loc}</span>
						</div>

						<p class="tcard__quote">{t.quote}</p>

						<div class="tcard__chips">
							{#each t.chips as c (c)}
								<span>{c}</span>
							{/each}
						</div>

						<div class="who">
							<span class="who__av">
								{#if t.who.icon}<span class="material-symbols-rounded">{t.who.icon}</span>{:else}{t.who.initial}{/if}
							</span>
							<span class="who__meta"><b>{t.who.name}</b><span>{t.who.role}</span></span>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<section class="closing">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold" style="justify-content:center">
			<span class="material-symbols-rounded">waving_hand</span> まずはお気軽に
		</p>
		<h2>あなたの現場でも、見てみませんか。</h2>
		<p>20分ほどのデモで、画面・通知・残る記録のサンプルをご覧いただけます。</p>
		<div class="closing__ctas">
			<a href="/contact" class="btn btn--accent btn--lg">無料デモを予約する</a>
			<a href="/sectors" class="btn btn--outline-light btn--lg">業種から探す</a>
		</div>
	</div>
</section>

<style>
	/* ── Testimonial grid ───────────────────────────────────── */
	.tgrid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
		margin-top: 28px;
	}
	.tcard {
		display: flex;
		flex-direction: column;
		background: #fff;
		border: 1px solid var(--web-border);
		border-radius: 20px;
		overflow: hidden;
		box-shadow: var(--web-shadow-card);
		transition:
			transform 0.25s var(--jp-ease),
			box-shadow 0.25s var(--jp-ease);
	}
	.tcard:hover {
		transform: translateY(-4px);
		box-shadow: var(--web-shadow-raised);
	}

	/* Tall layout (view: 'tall'): 2-column hero card with a tall side photo, spans 2 columns on wide screens */
	.tcard--tall {
		grid-column: span 2;
		flex-direction: row;
	}
	.tcard--tall .tphoto {
		flex: 1 1 46%;
		height: auto;
		min-height: 300px;
		border-radius: 0;
	}
	.tcard--tall .tcard__body {
		flex: 1 1 54%;
	}
	.tcard--tall .tcard__quote {
		font-size: 16px;
	}

	/* Double-wide layout (view: 'dwide'): standard banner-on-top card that spans 2 columns */
	.tcard--dwide {
		grid-column: span 2;
	}
	.tcard--dwide .tphoto {
		height: 240px;
	}
	.tcard--dwide .tcard__quote {
		font-size: 16px;
	}

	/* ── Photo + tags ── */
	.tphoto {
		position: relative;
		height: 178px;
		background-size: cover;
		background-position: center;
		border-bottom: 1px solid var(--web-border);
	}
	.tcard__tag {
		position: absolute;
		left: 12px;
		bottom: 12px;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 12.5px;
		font-weight: 700;
		color: #fff;
		background: color-mix(in srgb, var(--cw-ink, #0b1730) 64%, transparent);
		backdrop-filter: blur(2px);
		border-radius: 999px;
		padding: 5px 11px;
	}
	.tcard__tag .material-symbols-rounded {
		font-size: 16px;
	}
	.tcard__feat {
		position: absolute;
		right: 12px;
		top: 12px;
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 12px;
		font-weight: 800;
		color: var(--cw-ink);
		background: var(--web-gold);
		border-radius: 999px;
		padding: 5px 11px;
		box-shadow: 0 6px 16px -8px rgba(242, 165, 22, 0.8);
	}
	.tcard__feat .material-symbols-rounded {
		font-size: 15px;
	}

	/* ── Body ── */
	.tcard__body {
		display: flex;
		flex-direction: column;
		padding: 22px 24px 22px;
	}
	.tcard__id {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.tcard__biz {
		font-size: 16.5px;
		font-weight: 800;
		color: var(--web-heading);
		line-height: 1.4;
	}
	.tcard__loc {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 12.5px;
		font-weight: 600;
		color: var(--web-muted);
	}
	.tcard__loc .material-symbols-rounded {
		font-size: 15px;
		color: var(--web-primary);
	}
	.tcard__quote {
		font-size: 15px;
		line-height: 1.9;
		color: var(--web-text);
		margin: 14px 0 0;
		font-weight: 500;
	}
	.tcard__chips {
		display: flex;
		flex-wrap: wrap;
		gap: 7px;
		margin: 16px 0 0;
	}
	.tcard__chips span {
		font-size: 12px;
		font-weight: 700;
		color: var(--web-primary);
		background: color-mix(in srgb, var(--web-primary) 9%, transparent);
		border: 1px solid color-mix(in srgb, var(--web-primary) 16%, transparent);
		border-radius: 999px;
		padding: 4px 11px;
	}

	/* ── Source / person ── */
	.who {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-top: 18px;
		padding-top: 18px;
		border-top: 1px solid var(--web-border);
	}
	.who__av {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		flex: none;
		background: linear-gradient(180deg, var(--cw-sapphire-500), var(--cw-sapphire-700));
		color: #fff;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 800;
		font-size: 17px;
	}
	.who__av .material-symbols-rounded {
		font-size: 22px;
	}
	.who__meta b {
		display: block;
		font-size: 14px;
		color: var(--web-heading);
		line-height: 1.4;
	}
	.who__meta span {
		font-size: 12.5px;
		color: var(--web-muted);
	}

	@media (max-width: 1000px) {
		.tgrid {
			grid-template-columns: repeat(2, 1fr);
		}
		.tcard--tall {
			grid-column: span 2;
		}
	}
	@media (max-width: 760px) {
		.tgrid {
			grid-template-columns: 1fr;
		}
		.tcard--dwide {
			grid-column: auto;
		}
		.tcard--dwide .tphoto {
			height: 178px;
		}
		.tcard--tall {
			grid-column: auto;
			flex-direction: column;
		}
		.tcard--tall .tphoto,
		.tcard--tall .tcard__body {
			flex: none;
		}
		.tcard--tall .tphoto {
			min-height: 0;
			height: 178px;
		}
	}
</style>
