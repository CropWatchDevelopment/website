<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { breadcrumbSchema, faqSchema } from '$lib/seo/schema';
	import RelatedLinks from '$lib/components/RelatedLinks.svelte';

	const related = [
		{ href: '/livestock', label: 'スマート畜産・養鶏', sub: '鶏舎・畜舎の温度監視' },
		{ href: '/cold-chain', label: 'コールドチェーン温度監視', sub: '冷蔵庫・冷凍庫の遠隔監視' },
		{ href: '/column/smart-nogyo-toha', label: 'スマート農業とは？', sub: 'コラム' },
		{ href: '/column/lorawan-toha', label: 'LoRaWANとは？', sub: 'コラム' }
	];

	const title =
		'スマート農業のIoT環境モニタリング｜ハウス・露地・土壌の温度・湿度・CO₂を遠隔監視｜CropWatch 日本';
	const description =
		'スマート農業を支える農業IoTの環境モニタリング。ハウス栽培・施設園芸・露地・果樹の温度・湿度・CO₂・土壌の状態をワイヤレスセンサーでまとめて見える化し、霜・高温・乾燥を早めに通知。ビニールハウスの遠隔監視も電池式・配線工事なしで実現します。';

	const faq = [
		{
			q: '離れた畑でも使えますか？',
			a: 'はい。電波は見通しで最大15kmまで届くため、母屋から離れた畑やハウスも1台の受信機でつなげます。'
		},
		{
			q: 'スマート農業やIoTの導入は初めてでも使えますか？',
			a: 'はい。専門知識がなくても、センサーを置くだけで温度・湿度・CO₂などの環境データの記録が始まります。スマート農業の第一歩として、まずはハウス1棟からでも導入できます。'
		},
		{
			q: 'ビニールハウスの温度を離れた場所から確認できますか？',
			a: 'はい。測定データはクラウドに送信され、スマートフォンやPCからビニールハウスの温度・湿度を遠隔監視できます。異常があればメールで通知します。'
		},
		{
			q: 'むずかしい設定は必要ですか？',
			a: 'いりません。センサーを置くだけで自動的に記録が始まります。通知の条件は画面でかんたんに設定できます。'
		},
		{
			q: '雨や直射日光に当たっても大丈夫ですか？',
			a: '頑丈な防塵・防水ケース（IP66）に入っており、屋外でも安心して使えます。'
		}
	];

	const ld = [
		breadcrumbSchema([
			{ name: 'ホーム', path: '/' },
			{ name: '農業・ハウスの監視', path: '/agriculture' }
		]),
		faqSchema(faq)
		// CW-AIR-THC のProduct構造化データは出さない: 価格未公表のためoffersを
		// 付けられず、Search Consoleの「offers/review/aggregateRating」警告に
		// なるだけ。価格を公開したら productSchema({ price, offerUrl }) で復活。
	];
</script>

<Seo {title} {description} />
<JsonLd data={ld} />

<div class="crumb">
	<div class="wrap crumb__in">
		<a href="/">ホーム</a><span class="material-symbols-rounded">chevron_right</span>
		<span>製品</span><span class="material-symbols-rounded">chevron_right</span>
		<b>農業・ハウスの監視</b>
	</div>
</div>

<!-- ═══ ヒーロー（現場写真バックドロップ） ═══ -->
<section class="ag-hero">
	<div class="ag-hero__bg" style="background-image:url('/assets/photos/agri-hero.webp')"></div>
	<div class="ag-hero__scrim"></div>

	<div class="wrap ag-hero__inner">
		<div class="ag-hero__copy" data-reveal>
			<span class="ag-eyebrow"
				><span class="ag-dot"></span> スマート農業・ハウスの環境モニタリング</span
			>
			<h1><span class="ag-hl">空気から土壌まで、作物の環境を自動で監視</span></h1>
			<p class="ag-kicker">霧の夜も、猛暑の日も。<b>危険な環境変化を、早めに知らせます。</b></p>
			<p class="ag-lead">
				ハウス・施設園芸・露地・果樹園の空気・光・土壌の状態を、配線不要・バッテリー稼働の無線センサーで自動監視。霜・高温・乾燥などのサインを早めに通知し、大切な作物を守ります。
			</p>
			<div class="ag-tags">
				<span class="ag-tag"><span class="material-symbols-rounded">yard</span>ハウス栽培</span>
				<span class="ag-tag"><span class="material-symbols-rounded">potted_plant</span>露地</span>
				<span class="ag-tag"><span class="material-symbols-rounded">forest</span>果樹</span>
				<span class="ag-tag"><span class="material-symbols-rounded">grass</span>土壌管理</span>
			</div>
			<div class="ag-hero__ctas">
				<a href="/contact" class="btn btn--accent btn--lg"
					>無料デモを予約する <span class="material-symbols-rounded">arrow_forward</span></a
				>
				<a href="#sensor" class="btn btn--outline-light btn--lg">推奨センサーを見る</a>
			</div>
		</div>

		<!-- ライブ・ダッシュボードパネル -->
		<aside class="ag-panel" data-reveal>
			<div class="ag-panel__head">
				<span class="ag-panel__pulse"></span> ハウスA ・ リアルタイム
				<span class="ag-panel__ok">正常</span>
			</div>
			<ul class="ag-panel__reads">
				<li>
					<span class="material-symbols-rounded fill" style="color:#e0763b">device_thermostat</span>
					<span class="ag-panel__lab">気温</span>
					<span class="ag-panel__val">22.4<i>°C</i></span>
				</li>
				<li>
					<span class="material-symbols-rounded fill" style="color:#0ea5e9"
						>humidity_percentage</span
					>
					<span class="ag-panel__lab">湿度</span>
					<span class="ag-panel__val">68<i>%RH</i></span>
				</li>
				<li>
					<span class="material-symbols-rounded fill" style="color:#0e9960">co2</span>
					<span class="ag-panel__lab">CO₂</span>
					<span class="ag-panel__val">620<i>ppm</i></span>
				</li>
				<li>
					<span class="material-symbols-rounded fill" style="color:#2c6cb7">water_drop</span>
					<span class="ag-panel__lab">土壌水分</span>
					<span class="ag-panel__val">42<i>%</i></span>
				</li>
			</ul>
			<div class="ag-panel__foot">
				<span class="material-symbols-rounded">schedule</span> 15分ごとに自動更新・どこからでも確認
			</div>
		</aside>
	</div>

	<!-- 実績ストリップ -->
	<div class="wrap ag-hero__statwrap">
		<div class="ag-stats" data-reveal>
			<div><b>いつでも確認</b><span>現場の状態を、手元で確認</span></div>
			<div><b>配線不要</b><span>電源のない畑でも</span></div>
			<div><b>堅牢設計</b><span>防塵・防水対応</span></div>
			<div><b>最長10年</b><span>バッテリーのみで稼働</span></div>
		</div>
	</div>
</section>

<!-- 何が測れる -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent">
				<span class="material-symbols-rounded">layers</span> 土・空気・光
			</p>
			<h2>作物の生育環境を、一台で見守る</h2>
			<p>土中環境から空気・光の状態まで。作物の生育環境を幅広く見守ります。</p>
		</div>
		<div class="boxgrid boxgrid--3">
			<div class="box" data-reveal="0">
				<span class="box__ic box__ic--gold"
					><span class="material-symbols-rounded">grass</span></span
				>
				<h3>土壌</h3>
				<p>土の水分・温度を把握。かん水のタイミングや根の環境づくりに役立ちます。</p>
			</div>
			<div class="box" data-reveal="1">
				<span class="box__ic"><span class="material-symbols-rounded">air</span></span>
				<h3>空気</h3>
				<p>気温・湿度・二酸化炭素を監視。むれ・乾燥・換気の状態が分かります。</p>
			</div>
			<div class="box" data-reveal="2">
				<span class="box__ic box__ic--accent"
					><span class="material-symbols-rounded">wb_sunny</span></span
				>
				<h3>光</h3>
				<p>作物が受ける光の量を計測。日々の生育管理の目安になります。</p>
			</div>
		</div>
	</div>
</section>

<!-- 早期通知 -->
<section class="section section--soft">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent">
				<span class="material-symbols-rounded">notifications_active</span> 正しいデータで正確な判断を
			</p>
			<h2>農業に必要なデータを提供</h2>
		</div>
		<div class="boxgrid boxgrid--3">
			<div class="box" data-reveal="0">
				<span class="box__ic box__ic--gold"
					><span class="material-symbols-rounded">water_drop</span></span
				>
				<h3>結露に強い温湿度センサー</h3>
				<p>
					高湿度や結露により、センサーが濡れても、乾けば測定状態が戻りやすい<a
						class="extlink"
						href="https://sensirion.com/"
						target="_blank"
						rel="noopener noreferrer">センシリオン</a
					>製センサーを採用。湿度100%付近で停滞するリスクを抑え、農業現場の温湿度変化を安定して記録します。
				</p>
			</div>
			<div class="box" data-reveal="1">
				<span class="box__ic box__ic--gold"
					><span class="material-symbols-rounded">ac_unit</span></span
				>
				<h3>交換可能なセンサー</h3>
				<p>
					万が一の故障時も、本体ごと交換は不要。必要なセンサー部だけを交換でき、コストを抑えながら長く使い続けられます。また、測定したい項目が変わった場合も、用途に合わせてセンサーを追加できます。
				</p>
			</div>
			<div class="box" data-reveal="2">
				<span class="box__ic box__ic--gold"
					><span class="material-symbols-rounded">local_fire_department</span></span
				>
				<h3>作物に必要な光を見える化</h3>
				<p>
					PPFDで「今どれくらい光合成に使える光が届いているか」を確認し、DLIで「1日に受け取った光合成に使える光の合計量」を確認できます。光不足や強すぎる日差しに気づきやすくなり、栽培管理の見直しに役立ちます。
				</p>
			</div>
		</div>
	</div>
</section>

<!-- カバー範囲 split -->
<section class="section">
	<div class="wrap split">
		<div data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">cell_tower</span> 配線いらず</p>
			<h2>1台の受信機で、農場全体を。</h2>
			<p class="split__lead">
				電波（<a
					class="extlink"
					href="https://lora-alliance.org/"
					target="_blank"
					rel="noopener noreferrer">LoRaWAN</a
				>）は見通しで最大15kmまで届きます。1台の受信機で、複数のハウスや離れた畑、倉庫までまとめてつなげます。通信費も工事も抑えられます。
			</p>
			<ul class="checklist">
				<li><span class="material-symbols-rounded">check</span> 複数のハウス・畑をまとめて監視</li>
				<li><span class="material-symbols-rounded">check</span> 携帯回線の通信費がかからない</li>
				<li><span class="material-symbols-rounded">check</span> ケーブルの埋設工事が不要</li>
			</ul>
		</div>
		<div class="split__media" data-reveal>
			<img
				src="/assets/photos/agri-openfield.webp"
				alt="露地の畑を見渡す位置に設置されたCropWatchの受信機とセンサー"
			/>
		</div>
	</div>
</section>

<!-- 現場ショーケース -->
<section class="section section--soft">
	<div class="wrap">
		<div class="ag-show__head" data-reveal>
			<p class="ag-kicker2">
				<span class="material-symbols-rounded">photo_camera</span> 導入の現場
			</p>
			<h2>作物の育つ場所で、使われています。</h2>
			<p class="ag-show__sub">
				ハウスから露地、育苗まで。全国の生産者の現場で、CropWatchが環境を見守っています。
			</p>
		</div>
		<div class="ag-showcase" data-reveal>
			<figure class="ag-showcase__lead">
				<img
					src="/assets/photos/agri-sunset.webp"
					alt="夕暮れの露地畑に設置されたCropWatchセンサー"
				/>
				<figcaption>
					<b>露地の畑を見守る</b><span>朝夕の冷え込みや日中の高温を早期に把握</span>
				</figcaption>
			</figure>
			<figure>
				<img
					src="/assets/photos/agri-greenhouse.webp"
					alt="ピーマンを栽培するハウスに設置されたCropWatchセンサー"
				/>
				<figcaption><b>ハウス・施設園芸</b><span>むれ・乾燥・CO₂を見える化</span></figcaption>
			</figure>
			<figure>
				<img
					src="/assets/photos/agri-planting.webp"
					alt="マルチを張った露地畑での定植・育苗の様子"
				/>
				<figcaption>
					<b>定植・育苗期の管理</b><span>地温と土壌水分で活着をサポート</span>
				</figcaption>
			</figure>
		</div>
	</div>
</section>

<!-- 推奨センサー -->
<section class="section scroll-pad" id="sensor">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">sensors</span> 提供センサー</p>
			<h2>土壌＋空気＋光を、ひとつのデバイスで</h2>
		</div>
		<dl class="specs" data-reveal style="max-width:760px;margin-inline:auto">
			<div class="spec-row">
				<dt>空気センサー</dt>
				<dd>CW-AIR-THC（温度・湿度・CO₂）</dd>
			</div>
			<div class="spec-row">
				<dt>土壌センサー</dt>
				<dd>土の水分・温度</dd>
			</div>
			<div class="spec-row">
				<dt>光センサー</dt>
				<dd>作物が受ける光の量</dd>
			</div>
			<div class="spec-row">
				<dt>耐環境性</dt>
				<dd>防塵・防水ケース（IP66）／屋外設置対応</dd>
			</div>
			<div class="spec-row">
				<dt>電池寿命</dt>
				<dd>
					最長5年（交換可能）
					<br />
					<small
						>※バッテリー寿命は、使用環境や測定・送信間隔、通信状況などによって異なります。</small
					>
				</dd>
			</div>
			<div class="spec-row">
				<dt>通信</dt>
				<dd>
					<a
						class="extlink"
						href="https://lora-alliance.org/"
						target="_blank"
						rel="noopener noreferrer">LoRaWAN</a
					>（電波）／受信機1台で最大15km
				</dd>
			</div>
		</dl>
	</div>
</section>

<!-- FAQ -->
<section class="section section--soft">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">quiz</span> よくあるご質問</p>
			<h2>農業・ハウスの監視 Q&amp;A</h2>
		</div>
		<div class="faq" data-reveal>
			{#each faq as item}
				<details>
					<summary>{item.q} <span class="material-symbols-rounded">add</span></summary>
					<p>{item.a}</p>
				</details>
			{/each}
		</div>
	</div>
</section>

<RelatedLinks links={related} />

<section class="closing">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold" style="justify-content:center">
			<span class="material-symbols-rounded">waving_hand</span> まずはお気軽に
		</p>
		<h2>次の判断を、データで支えませんか。</h2>
		<p>
			ハウスや畑の様子をお聞かせください。土壌・空気・光のセンサーと受信機、通知の設定をご提案します。
		</p>
		<div class="closing__ctas">
			<a href="/contact" class="btn btn--accent btn--lg">無料デモを予約する</a>
		</div>
	</div>
</section>

<style>
	/* ══════════════════════════════════════════════════════════
	   Agriculture page — lush "in-the-field" green identity.
	   Shares the site chrome, tokens & body type (same site);
	   its own photographic hero + emerald/gold palette. Third
	   sibling to cold-chain (navy) and livestock (earth).
	   ══════════════════════════════════════════════════════════ */

	/* ═══ Hero (photographic backdrop) ═══ */
	.ag-hero {
		position: relative;
		overflow: hidden;
		padding: 54px 0 30px;
	}
	.ag-hero__bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center 42%;
	}
	.ag-hero__scrim {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(
				96deg,
				rgba(5, 26, 17, 0.94) 0%,
				rgba(8, 42, 27, 0.88) 32%,
				rgba(13, 80, 52, 0.55) 62%,
				rgba(13, 80, 52, 0.28) 100%
			),
			linear-gradient(180deg, transparent 50%, rgba(3, 18, 11, 0.62) 100%);
	}
	.ag-hero__inner {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1.18fr 0.82fr;
		gap: 32px;
		align-items: center;
	}
	.ag-hero__statwrap {
		position: relative;
		z-index: 1;
	}
	.ag-eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 6px 13px;
		border-radius: 999px;
		background: rgba(220, 255, 235, 0.12);
		border: 1px solid rgba(220, 255, 235, 0.28);
		color: #d8ffe9;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.1em;
	}
	.ag-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #34d399;
		box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.25);
		flex: none;
	}
	.ag-hero__copy h1 {
		margin: 16px 0 0;
		font-size: clamp(1.85rem, 3.6vw, 2.65rem);
		line-height: 1.18;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: #fff;
		text-shadow: 0 2px 18px rgba(0, 0, 0, 0.4);
	}
	.ag-hl {
		color: #fcd34d;
	}
	.ag-kicker {
		margin: 14px 0 0;
		font-size: clamp(0.95rem, 1.15vw, 1.05rem);
		line-height: 1.6;
		color: rgba(240, 255, 246, 0.96);
	}
	.ag-kicker b {
		color: #fff;
		font-weight: 800;
		box-shadow: inset 0 -0.5em 0 rgba(252, 211, 77, 0.28);
	}
	.ag-lead {
		margin: 12px 0 0;
		font-size: clamp(0.9rem, 1.05vw, 0.98rem);
		line-height: 1.85;
		color: rgba(226, 245, 234, 0.9);
		max-width: 48ch;
	}
	.ag-lead b {
		color: #fff;
		font-weight: 700;
	}
	.ag-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 18px;
	}
	.ag-tag {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 5px 11px;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: #eafff2;
		font-size: 12px;
		font-weight: 600;
	}
	.ag-tag .material-symbols-rounded {
		font-size: 15px;
		color: #fcd34d;
	}
	.ag-hero__ctas {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 14px;
		margin-top: 22px;
	}

	/* live-dashboard glass panel */
	.ag-panel {
		justify-self: end;
		width: 100%;
		max-width: 340px;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.6);
		border-radius: 20px;
		padding: 18px 20px;
		box-shadow: 0 30px 55px -24px rgba(0, 0, 0, 0.7);
	}
	.ag-panel__head {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 11.5px;
		font-weight: 800;
		letter-spacing: 0.06em;
		color: #0e7a4f;
	}
	.ag-panel__pulse {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #34d399;
		box-shadow: 0 0 0 4px rgba(52, 211, 153, 0.22);
	}
	.ag-panel__ok {
		margin-left: auto;
		font-size: 10.5px;
		font-weight: 800;
		letter-spacing: 0.04em;
		color: #0e9960;
		background: #e6f6ec;
		padding: 2px 9px;
		border-radius: 999px;
	}
	.ag-panel__reads {
		list-style: none;
		margin: 12px 0 0;
		padding: 0;
	}
	.ag-panel__reads li {
		display: grid;
		grid-template-columns: 24px 1fr auto;
		align-items: center;
		gap: 10px;
		padding: 12px 2px;
		border-top: 1px solid var(--web-border);
	}
	.ag-panel__reads li:first-child {
		border-top: 0;
	}
	.ag-panel__reads .material-symbols-rounded {
		font-size: 21px;
	}
	.ag-panel__lab {
		font-size: 13px;
		font-weight: 700;
		color: var(--web-heading);
	}
	.ag-panel__val {
		font-family: var(--cw-font-mono);
		font-size: 17px;
		font-weight: 700;
		color: var(--cw-ink);
		white-space: nowrap;
	}
	.ag-panel__val i {
		font-style: normal;
		font-size: 11px;
		color: var(--web-muted);
		margin-left: 2px;
	}
	.ag-panel__foot {
		display: flex;
		align-items: center;
		gap: 7px;
		margin-top: 6px;
		padding-top: 12px;
		border-top: 1px solid var(--web-border);
		font-size: 11.5px;
		font-weight: 600;
		color: var(--web-muted);
	}
	.ag-panel__foot .material-symbols-rounded {
		font-size: 16px;
		color: #0e7a4f;
	}

	/* stats strip (green dark glass, over the photo) */
	.ag-stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		margin-top: 34px;
		border: 1px solid rgba(200, 240, 215, 0.22);
		border-radius: 16px;
		overflow: hidden;
		background: rgba(4, 22, 14, 0.5);
		backdrop-filter: blur(3px);
	}
	.ag-stats > div {
		padding: 14px 16px;
		text-align: center;
		border-right: 1px solid rgba(200, 240, 215, 0.16);
	}
	.ag-stats > div:last-child {
		border-right: none;
	}
	.ag-stats b {
		display: block;
		font-family: var(--cw-font-mono);
		font-size: clamp(19px, 2.8vw, 25px);
		font-weight: 700;
		color: #fff;
	}
	.ag-stats span {
		font-size: 11px;
		color: rgba(215, 240, 225, 0.75);
		margin-top: 3px;
		display: block;
	}

	/* ═══ 現場ショーケース — bento ═══ */
	.ag-show__head {
		max-width: 780px;
		margin: 0 auto 30px;
		text-align: center;
	}
	.ag-kicker2 {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin: 0;
		font-size: 12.5px;
		font-weight: 800;
		letter-spacing: 0.14em;
		color: #0e9960;
	}
	.ag-kicker2 .material-symbols-rounded {
		font-size: 18px;
	}
	.ag-show__head h2 {
		margin: 12px 0 0;
		font-size: clamp(26px, 3.4vw, 36px);
	}
	.ag-show__sub {
		margin: 14px 0 0;
		font-size: 16px;
		line-height: 1.9;
		color: var(--web-muted);
	}
	.ag-showcase {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 16px;
		height: clamp(400px, 48vw, 560px);
	}
	.ag-showcase figure {
		position: relative;
		margin: 0;
		border-radius: 18px;
		overflow: hidden;
		border: 1px solid var(--web-border);
		box-shadow: var(--web-shadow-card);
	}
	.ag-showcase__lead {
		grid-row: 1 / span 2;
	}
	.ag-showcase img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.ag-showcase figcaption {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 26px 16px 12px;
		background: linear-gradient(180deg, transparent, rgba(3, 18, 11, 0.86));
	}
	.ag-showcase figcaption b {
		display: block;
		font-size: 14px;
		color: #fff;
	}
	.ag-showcase figcaption span {
		font-size: 12px;
		color: rgba(230, 255, 240, 0.82);
	}

	/* ═══ Responsive ═══ */
	@media (max-width: 900px) {
		.ag-hero {
			padding: 40px 0 26px;
		}
		.ag-hero__inner {
			grid-template-columns: 1fr;
			gap: 24px;
		}
		.ag-panel {
			justify-self: stretch;
			max-width: 420px;
		}
		.ag-hero__scrim {
			background: linear-gradient(
				180deg,
				rgba(5, 26, 17, 0.84) 0%,
				rgba(8, 42, 27, 0.74) 50%,
				rgba(4, 20, 12, 0.88) 100%
			);
		}
	}
	@media (max-width: 760px) {
		.ag-showcase {
			grid-template-columns: 1fr;
			grid-template-rows: none;
			height: auto;
		}
		.ag-showcase__lead {
			grid-row: auto;
		}
		.ag-showcase figure {
			height: 240px;
		}
	}
	@media (max-width: 600px) {
		.ag-stats {
			grid-template-columns: 1fr 1fr;
		}
		.ag-stats > div:nth-child(2) {
			border-right: none;
		}
		.ag-stats > div:nth-child(1),
		.ag-stats > div:nth-child(2) {
			border-bottom: 1px solid rgba(200, 240, 215, 0.16);
		}
	}
</style>
