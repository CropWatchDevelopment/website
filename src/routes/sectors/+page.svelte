<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { breadcrumbSchema } from '$lib/seo/schema';

	const title =
		'業種から探す｜コールドチェーン温度監視・スマート農業・スマート畜産｜CropWatch 日本';
	const description =
		'あなたの業種に合ったCropWatchの温度監視・環境モニタリングをお選びください。飲食・ホテル・工場・倉庫のコールドチェーン、スマート農業・ハウス、スマート畜産・養鶏。同じセンサーと同じ画面で、現場に合わせてご提案します。';

	const ld = breadcrumbSchema([
		{ name: 'ホーム', path: '/' },
		{ name: '業種から探す', path: '/sectors' }
	]);
</script>

<Seo {title} {description} />
<JsonLd data={ld} />

<div class="crumb"><div class="wrap crumb__in">
	<a href="/">ホーム</a><span class="material-symbols-rounded">chevron_right</span>
	<b>業種から探す</b>
</div></div>

<section class="pagehero">
	<div class="wrap pagehero__in" data-reveal>
		<p class="eyebrow"><span class="material-symbols-rounded">category</span> 業種から探す</p>
		<h1>あなたの現場に、ぴったりの監視を。</h1>
		<p class="hero__kicker">迷ったら、ここから。<span class="u">業種を選ぶだけで、合う製品が見つかります。</span></p>
		<p>CropWatch は、<b>同じセンサーと同じ画面</b>で、冷蔵庫から畑まで見守ります。やることはどの業種も同じで、「置く・送る・確認する」だけ。まずはあてはまる業種をお選びください。</p>
		<p class="pagehero__note"><span class="material-symbols-rounded">check_circle</span> どの業種も、追加費用なし・1台から始められます。</p>
	</div>
</section>

<section class="section">
	<div class="wrap">
		<a class="sector" href="/cold-chain" data-reveal>
			<div class="sector__img" style="background-image:url('/assets/photos/sector-coldchain.webp')"></div>
			<div class="sector__body">
				<p class="eyebrow"><span class="material-symbols-rounded">ac_unit</span> 冷蔵・冷凍</p>
				<h2>飲食・ホテル・倉庫のコールドチェーン温度監視</h2>
				<p>冷蔵庫・冷凍庫・ショーケースの温度を24時間自動で遠隔監視。温度が外れたらすぐ通知し、HACCP対応の記録が自動で残ります。</p>
				<div class="sector__tags"><span>飲食店</span><span>ホテル</span><span>冷蔵倉庫</span><span>学校給食</span><span>HACCP温度管理</span></div>
				<span class="btn btn--primary">くわしく見る <span class="material-symbols-rounded">arrow_forward</span></span>
			</div>
		</a>

		<a class="sector" href="/agriculture" data-reveal>
			<div class="sector__img" style="background-image:url('/assets/photos/sector-agriculture.webp')"></div>
			<div class="sector__body">
				<p class="eyebrow"><span class="material-symbols-rounded">eco</span> 農業・ハウス</p>
				<h2>スマート農業：ハウス・露地・土壌の環境監視</h2>
				<p>農業IoTで土壌・空気・光の状態をまとめて見守り、霜・高温・乾燥のサインを早めに通知。1台の受信機で農場全体をカバーします。</p>
				<div class="sector__tags"><span>ハウス栽培</span><span>施設園芸</span><span>露地</span><span>果樹</span><span>土壌</span></div>
				<span class="btn btn--primary">くわしく見る <span class="material-symbols-rounded">arrow_forward</span></span>
			</div>
		</a>

		<a class="sector" href="/livestock" data-reveal>
			<div class="sector__img" style="background-image:url('/assets/photos/sector-livestock.webp')"></div>
			<div class="sector__body">
				<p class="eyebrow"><span class="material-symbols-rounded">pets</span> 畜産・養鶏</p>
				<h2>スマート畜産：鶏舎・畜舎・酪農の環境監視</h2>
				<p>養鶏IoTで温度・湿度・二酸化炭素・アンモニアを見守り、暑熱対策や換気の異常を早めに通知。長い鶏舎も端から端まで把握できます。</p>
				<div class="sector__tags"><span>養鶏IoT</span><span>畜舎</span><span>酪農</span><span>暑熱対策</span></div>
				<span class="btn btn--primary">くわしく見る <span class="material-symbols-rounded">arrow_forward</span></span>
			</div>
		</a>
	</div>
</section>

<!-- 共通の安心 -->
<section class="section section--soft">
	<div class="wrap">
		<div class="section__head" data-reveal><p class="eyebrow"><span class="material-symbols-rounded">verified_user</span> どの業種でも共通</p><h2>選ばれる、4つの安心。</h2></div>
		<div class="boxgrid boxgrid--4">
			<a class="box" href="/replacement-sensors" data-reveal="0"><span class="box__ic"><span class="material-symbols-rounded">cached</span></span><h3>自分で交換できる</h3><p>だれでも60秒で交換。業者は不要です。</p></a>
			<a class="box" href="/replacement-sensors" data-reveal="1"><span class="box__ic box__ic--accent"><span class="material-symbols-rounded">workspace_premium</span></span><h3>校正証明書つき</h3><p>ISO/IEC 17025 で校正済み。検査に使えます。</p></a>
			<a class="box" href="/replacement-sensors" data-reveal="2"><span class="box__ic"><span class="material-symbols-rounded">fact_check</span></span><h3>二重チェック</h3><p>2つのセンサーで確認。まちがいを残しません。</p></a>
			<a class="box" href="/technology" data-reveal="3"><span class="box__ic box__ic--accent"><span class="material-symbols-rounded">pets</span></span><h3>番犬機能</h3><p>止まっても自動で復旧。監視が途切れません。</p></a>
		</div>
	</div>
</section>

<section class="closing">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold" style="justify-content:center"><span class="material-symbols-rounded">waving_hand</span> 迷ったら</p>
		<h2>どの監視が合うか、ご相談ください。</h2>
		<p>現場の様子をお聞かせいただければ、最適なセンサーと構成をご提案します。</p>
		<div class="closing__ctas">
			<a href="/contact" class="btn btn--accent btn--lg">無料デモを予約する</a>
			<a href="/" class="btn btn--outline-light btn--lg">ホームへ戻る</a>
		</div>
	</div>
</section>

<style>
	.sector { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid var(--web-border); border-radius: 24px; overflow: hidden; box-shadow: var(--web-shadow-card); background: #fff; margin-bottom: 28px; }
	.sector:nth-child(even) .sector__img { order: 2; }
	.sector__img { min-height: 340px; background-size: cover; background-position: center; }
	.sector__body { padding: 44px 42px; }
	.sector__body h2 { font-size: clamp(24px,3vw,30px); line-height: 1.45; margin: 14px 0 0; }
	.sector__body p { font-size: 16px; color: var(--web-muted); line-height: 1.9; margin: 14px 0 0; }
	.sector__tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 20px 0 26px; }
	.sector__tags span { background: var(--web-primary-soft); color: var(--web-primary); font-size: 13.5px; font-weight: 600; padding: 6px 13px; border-radius: 9999px; }
	@media (max-width: 820px){ .sector{grid-template-columns:1fr;} .sector:nth-child(even) .sector__img{order:0;} .sector__img{min-height:220px;} .sector__body{padding:32px 26px;} }
</style>
