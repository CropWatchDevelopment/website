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
	href: string; // related CropWatch sector page (internal)
	link?: string; // the customer's own website (external); omit to hide the button
	tag: { icon: string; label: string };
	img: string;
	biz: string;
	loc: string;
	quote: string;
	chips: string[];
	who: Who;
	caseStudy?: boolean; // shows the "導入事例" badge (a real, named customer)
};

const TESTIMONIALS: Testimonial[] = [
	{
		href: '/cold-chain',
		link: 'https://seagaia.co.jp/',
		tag: { icon: 'restaurant', label: '飲食・ホテル' },
		img: '/assets/photos/seagaia.webp',
		biz: 'フェニックス・シーガイア・リゾート',
		loc: '宮崎県宮崎市',
		quote:
			'ホテル厨房内のドロワー冷蔵庫、ストッカー、業務用冷蔵庫、プレハブ冷凍庫などから、温度・湿度データを自動で収集。Wi-Fiが届かない地下や奥まった場所でも、安定した温度管理を実現しています。取得したデータは社内の共通ファイルへ自動反映され、確認・記録・入力作業を大幅に削減。異常時にはメールやパトランプで通知し、設備の不具合や温度異常への迅速な対応につなげています。',
		chips: ['冷蔵・冷凍監視', 'HACCP対応記録', '異常通知'],
		who: {
			icon: 'apartment',
			name: 'シェラトン・グランデ・オーシャンリゾート',
			role: 'フェニックス・シーガイア・リゾート ／ 宮崎'
		},
		caseStudy: true
	},
	{
		href: 'https://ebisu-g.com/group/tk-ebisu/',
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
		who: { initial: '高', name: '高橋 物流 様', role: '城北ロジスティクス ／ 倉庫管理' }
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
		link: 'https://www.jafoods-miyazaki.jp/',
		tag: { icon: 'storefront', label: '食品製造・加工' },
		img: '/assets/photos/JA_Saito.webp',
		biz: 'JAフーズみやざき',
		loc: '宮崎県西都市',
		quote:
			'保管庫のモニタリングに加え、ブランチャーや短時間で-40℃まで冷却するトンネルフリーザーなど、保管設備から製造工程までの温度データを自動で収集。設備ごとの温度変化を一つのシステムで継続的に管理し、異常時には即座に対応できる体制を整えています。また、毎週自動で配信されるレポートにより、データの整理・可視化や異常箇所の確認にかかる手間を大幅に削減。過去の記録もすぐに確認・提出でき、監査対応の負担も軽減しています。',
		chips: ['売場ケースの温度監視', '複数店舗を一元管理', '帳票出力'],
		who: { initial: '佐', name: '佐藤 健 様', role: 'フレッシュマート ／ 店舗運営部' }
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
				<article class="tcard" data-reveal={i % 2}>
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

						<div class="tcard__actions">
							{#if t.link}
								<a
									class="btn btn--ghost tcard__site"
									href={t.link}
									target="_blank"
									rel="noopener noreferrer"
								>
									公式サイトを見る
									<span class="material-symbols-rounded">open_in_new</span>
								</a>
							{/if}
							<a class="tcard__rel" href={t.href}>
								関連製品を見る
								<span class="material-symbols-rounded">arrow_forward</span>
							</a>
						</div>
					</div>
				</article>
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
		</div>
	</div>
</section>

<style>
	/* ── Testimonial grid ───────────────────────────────────── */
	.tgrid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 24px;
		margin-top: 28px;
	}
	/* The card is not a link - only the buttons in its footer are. It therefore
	   gets no hover lift, which would promise a click the card doesn't accept. */
	.tcard {
		display: flex;
		flex-direction: column;
		background: #fff;
		border: 1px solid var(--web-border);
		border-radius: 20px;
		overflow: hidden;
		box-shadow: var(--web-shadow-card);
	}

	/* ── Photo + tags ── */
	.tphoto {
		position: relative;
		height: 200px;
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
		flex: 1;
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
		margin: 16px 0 18px;
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
	/* margin-top:auto keeps the attribution pinned to the card bottom, so the
	   rule above it lines up across a row of uneven-length quotes. */
	.who {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-top: auto;
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

	/* ── Footer actions ── */
	/* min-height reserves the button's height even when a card has no link, so
	   the attribution rows stay aligned across a row of mixed cards. */
	.tcard__actions {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 10px 16px;
		min-height: 38px;
		margin-top: 18px;
	}
	.tcard__site {
		padding: 0.6rem 1.15rem;
		font-size: 13.5px;
	}
	.tcard__site .material-symbols-rounded {
		font-size: 17px;
	}
	/* Secondary to the website button: a plain link, not a second filled button,
	   so the two actions don't compete. */
	.tcard__rel {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 13px;
		font-weight: 700;
		color: var(--web-primary);
		transition: color 0.15s var(--jp-ease);
	}
	.tcard__rel .material-symbols-rounded {
		font-size: 16px;
		transition: transform 0.15s var(--jp-ease);
	}
	.tcard__rel:hover {
		color: var(--web-primary-hover);
	}
	.tcard__rel:hover .material-symbols-rounded {
		transform: translateX(2px);
	}
	.tcard__site:focus-visible,
	.tcard__rel:focus-visible {
		outline: 2px solid var(--web-primary);
		outline-offset: 2px;
		border-radius: 999px;
	}

	/* Below the 1140px desktop tier the grid is a single column, so cards run
	   wide and the photo reads as a banner rather than a letterbox strip. */
	@media (max-width: 1140px) {
		.tgrid {
			grid-template-columns: 1fr;
		}
		.tphoto {
			height: 240px;
		}
	}
	@media (max-width: 600px) {
		.tphoto {
			height: 178px;
		}
	}
</style>
