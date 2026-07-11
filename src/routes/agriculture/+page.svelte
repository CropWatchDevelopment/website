<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { breadcrumbSchema, faqSchema, productSchema } from '$lib/seo/schema';
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
		faqSchema(faq),
		productSchema({
			name: 'CropWatch 農業向け 環境モニタリングセンサー CW-AIR-THC',
			description:
				'スマート農業向けの農業IoT環境センサー。ハウス・施設園芸・露地の温度・湿度・CO₂・土壌の状態をLoRaWANで遠隔監視し、霜・高温・乾燥を早期に通知します。',
			image: 'https://cropwatch.co.jp/assets/photos/greenhouse-peppers.webp',
			category: 'スマート農業 / 農業IoT'
		})
	];
</script>

<Seo {title} {description} />
<JsonLd data={ld} />

<div class="crumb"><div class="wrap crumb__in">
	<a href="/">ホーム</a><span class="material-symbols-rounded">chevron_right</span>
	<b>農業・ハウスの監視</b>
</div></div>

<section class="hero">
	<div class="wrap hero__grid">
		<div class="hero__copy" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">eco</span> スマート農業・ハウスの環境モニタリング</p>
			<h1>スマート農業を、置くだけで。<br><span class="hl">畑とハウスの環境をまとめて見守る。</span></h1>
			<p class="hero__kicker">霧の夜も、猛暑の日も。<span class="u">作物が危ないサインを、先に教えます。</span></p>
			<p class="hero__lead">ハウス・施設園芸・露地・果樹園の<b>温度・湿度・二酸化炭素・土壌の状態</b>を、農業IoTのワイヤレスセンサーで自動監視。<b>霜・高温・乾燥のサインを早めに通知</b>し、大切な作物を守ります。1台の受信機で、離れたハウスや畑までまとめてカバーできます。</p>
			<p class="hero__for"><span class="lab"><span class="material-symbols-rounded">groups</span>こんな現場に</span><span class="t">ハウス栽培</span><span class="t">露地</span><span class="t">果樹</span><span class="t">土壌管理</span></p>
			<ul class="hero__points">
				<li><span class="material-symbols-rounded">check</span><span class="pt"><b>霧・高温・乾燥を早めに通知</b><span>危険な変化を察知してお知らせし、対策の時間を確保できます。</span></span></li>
				<li><span class="material-symbols-rounded">check</span><span class="pt"><b>ハウスも畑も1台でカバー</b><span>電波は見通しで最大15km。複数のハウスや離れた畑もつなげます。</span></span></li>
				<li><span class="material-symbols-rounded">check</span><span class="pt"><b>配線工事は不要</b><span>電池式・ワイヤレスで、電源のない畑にも置くだけで使えます。</span></span></li>
			</ul>
			<div class="hero__ctas">
				<a href="/contact" class="btn btn--accent btn--lg">無料デモを予約する <span class="material-symbols-rounded">arrow_forward</span></a>
				<a href="#sensor" class="btn btn--ghost btn--lg">推奨センサーを見る</a>
			</div>
			<p class="hero__micro"><span class="material-symbols-rounded">verified</span> ハウスや畑の様子に合わせてご提案します。ご相談は無料です。</p>
		</div>
		<div class="hero__media" data-reveal>
			<img src="/assets/photos/greenhouse-peppers.webp" alt="ハウス栽培の環境を監視するCropWatchセンサー" />
			<div class="hero__chip"><span class="dot"></span><div><b>ハウスA</b><span>22.4 ℃ ・ 68 %RH ・ 正常</span></div></div>
		</div>
	</div>
</section>

<!-- 何が測れる -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent"><span class="material-symbols-rounded">layers</span> 土・空気・光</p>
			<h2>作物の生育に関わる要素を、ひとつに。</h2>
			<p>1つの数値だけでなく、根の周りから空気の状態まで。育成環境を幅広く見守ります。</p>
		</div>
		<div class="boxgrid boxgrid--3">
			<div class="box" data-reveal="0"><span class="box__ic box__ic--gold"><span class="material-symbols-rounded">grass</span></span><h3>土壌</h3><p>土の水分・温度を把握。かん水のタイミングや根の環境づくりに役立ちます。</p></div>
			<div class="box" data-reveal="1"><span class="box__ic"><span class="material-symbols-rounded">air</span></span><h3>空気</h3><p>気温・湿度・二酸化炭素を監視。むれ・乾燥・換気の状態が分かります。</p></div>
			<div class="box" data-reveal="2"><span class="box__ic box__ic--accent"><span class="material-symbols-rounded">wb_sunny</span></span><h3>光</h3><p>作物が受ける光の量を計測。日々の生育管理の目安になります。</p></div>
		</div>
	</div>
</section>

<!-- 早期通知 -->
<section class="section section--soft">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent"><span class="material-symbols-rounded">notifications_active</span> 早めの一手</p>
			<h2>こんなサインを、見逃しません。</h2>
		</div>
		<div class="boxgrid boxgrid--3">
			<div class="box" data-reveal="0"><span class="box__ic box__ic--gold"><span class="material-symbols-rounded">ac_unit</span></span><h3>霜・冷え込み</h3><p>夜間に気温が下がりすぎると通知。対策の時間を確保できます。</p></div>
			<div class="box" data-reveal="1"><span class="box__ic box__ic--gold"><span class="material-symbols-rounded">local_fire_department</span></span><h3>高温</h3><p>ハウス内の温度上がりすぎを早めに察知し、換気の判断を助けます。</p></div>
			<div class="box" data-reveal="2"><span class="box__ic box__ic--gold"><span class="material-symbols-rounded">water_drop</span></span><h3>乾燥</h3><p>湿度や土壌の乾きを把握し、かん水のタイミングを逃しません。</p></div>
		</div>
	</div>
</section>

<!-- カバー範囲 split -->
<section class="section">
	<div class="wrap split">
		<div data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">cell_tower</span> 配線いらず</p>
			<h2>1台の受信機で、農場全体を。</h2>
			<p class="split__lead">電波（LoRaWAN）は見通しで最大15kmまで届きます。1台の受信機で、複数のハウスや離れた畑、倉庫までまとめてつなげます。通信費も工事も抑えられます。</p>
			<ul class="checklist">
				<li><span class="material-symbols-rounded">check</span> 複数のハウス・畑をまとめて監視</li>
				<li><span class="material-symbols-rounded">check</span> 携帯回線の通信費がかからない</li>
				<li><span class="material-symbols-rounded">check</span> ケーブルの埋設工事が不要</li>
			</ul>
		</div>
		<div class="split__media" data-reveal>
			<img src="/assets/imagery/greenhouse.webp" alt="ハウス栽培の環境を監視する様子" />
		</div>
	</div>
</section>

<!-- 現場ギャラリー -->
<section class="section section--soft">
	<div class="wrap">
		<div class="section__head" data-reveal><p class="eyebrow"><span class="material-symbols-rounded">image</span> 導入の現場</p><h2>作物の育つ場所で使われています。</h2></div>
		<div class="gallery">
			<figure data-reveal="0"><img src="/assets/photos/greenhouse-peppers.webp" alt="ピーマンのハウス" /><figcaption><b>ピーマンのハウス</b><span>温度・湿度・CO₂を監視</span></figcaption></figure>
			<figure data-reveal="1"><img src="/assets/photos/greenhouse-cucumber.webp" alt="きゅうりのハウス" /><figcaption><b>きゅうりのハウス</b><span>むれ・乾燥を早期に察知</span></figcaption></figure>
			<figure data-reveal="2"><img src="/assets/photos/field-soybean.webp" alt="露地の大豆畑" /><figcaption><b>露地の畑</b><span>霜・高温のサインを通知</span></figcaption></figure>
		</div>
	</div>
</section>

<!-- 推奨センサー -->
<section class="section scroll-pad" id="sensor">
	<div class="wrap">
		<div class="section__head" data-reveal><p class="eyebrow"><span class="material-symbols-rounded">sensors</span> 推奨センサー</p><h2>土壌＋空気＋光を、ひとつの仕組みで</h2></div>
		<dl class="specs" data-reveal style="max-width:760px;margin-inline:auto">
			<div class="spec-row"><dt>空気センサー</dt><dd>CW-AIR-THC（温度・湿度・CO₂）</dd></div>
			<div class="spec-row"><dt>土壌センサー</dt><dd>土の水分・温度</dd></div>
			<div class="spec-row"><dt>光センサー</dt><dd>作物が受ける光の量</dd></div>
			<div class="spec-row"><dt>電池寿命</dt><dd>最長10年（交換可能）</dd></div>
			<div class="spec-row"><dt>通信</dt><dd>LoRaWAN（電波）／受信機1台で最大15km</dd></div>
		</dl>
	</div>
</section>

<!-- FAQ -->
<section class="section section--soft">
	<div class="wrap">
		<div class="section__head" data-reveal><p class="eyebrow"><span class="material-symbols-rounded">quiz</span> よくあるご質問</p><h2>農業・ハウスの監視 Q&amp;A</h2></div>
		<div class="faq" data-reveal>
			<details><summary>離れた畑でも使えますか？ <span class="material-symbols-rounded">add</span></summary><p>はい。電波は見通しで最大15kmまで届くため、母屋から離れた畑やハウスも1台の受信機でつなげます。</p></details>
			<details><summary>スマート農業やIoTの導入は初めてでも使えますか？ <span class="material-symbols-rounded">add</span></summary><p>はい。専門知識がなくても、センサーを置くだけで温度・湿度・CO₂などの環境データの記録が始まります。スマート農業の第一歩として、まずはハウス1棟からでも導入できます。</p></details>
			<details><summary>ビニールハウスの温度を離れた場所から確認できますか？ <span class="material-symbols-rounded">add</span></summary><p>はい。測定データはクラウドに送信され、スマートフォンやPCからビニールハウスの温度・湿度を遠隔監視できます。異常があればメールで通知します。</p></details>
			<details><summary>むずかしい設定は必要ですか？ <span class="material-symbols-rounded">add</span></summary><p>いりません。センサーを置くだけで自動的に記録が始まります。通知の条件は画面でかんたんに設定できます。</p></details>
			<details><summary>雨や直射日光に当たっても大丈夫ですか？ <span class="material-symbols-rounded">add</span></summary><p>頑丈な防塵・防水ケース（IP66）に入っており、屋外でも安心して使えます。</p></details>
		</div>
	</div>
</section>

<RelatedLinks links={related} />

<section class="closing">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold" style="justify-content:center"><span class="material-symbols-rounded">waving_hand</span> まずはお気軽に</p>
		<h2>次の判断を、データで支えませんか。</h2>
		<p>ハウスや畑の様子をお聞かせください。土壌・空気・光のセンサーと受信機、通知の設定をご提案します。</p>
		<div class="closing__ctas">
			<a href="/contact" class="btn btn--accent btn--lg">無料デモを予約する</a>
		</div>
	</div>
</section>
