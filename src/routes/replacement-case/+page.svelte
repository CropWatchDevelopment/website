<script lang="ts">
import { onMount } from 'svelte';

// Load Babylon.js + the CW-AIR-TH 3D viewer (static/assets/device.js) on the
// client only, after the <canvas> is in the DOM. device.js is an IIFE that
// reads #deviceCanvas, loads the STL, and falls back to a procedural
// enclosure if the model can't be fetched.
onMount(() => {
	let cancelled = false;

	const loadScript = (src: string) =>
		new Promise<void>((resolve, reject) => {
			const existing = document.querySelector<HTMLScriptElement>(`script[data-cw3d="${src}"]`);
			if (existing) {
				resolve();
				return;
			}
			const s = document.createElement('script');
			s.src = src;
			s.async = false;
			s.dataset.cw3d = src;
			s.onload = () => resolve();
			s.onerror = () => reject(new Error(`failed to load ${src}`));
			document.head.appendChild(s);
		});

	(async () => {
		try {
			await loadScript('https://cdn.babylonjs.com/babylon.js');
			await loadScript('https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js');
			if (cancelled) return;
			// device.js is an IIFE; (re)append so it runs against this page's canvas.
			const dev = document.createElement('script');
			dev.src = '/assets/device.js';
			dev.async = false;
			document.body.appendChild(dev);
		} catch {
			// Viewer is optional; the loader text simply remains if Babylon is blocked.
		}
	})();

	return () => {
		cancelled = true;
	};
});
</script>

<svelte:head>
	<title>交換用ケース｜頑丈な防塵防水（IP66）ケース・3Dで見る｜CropWatch 日本</title>
	<meta
		name="description"
		content="CropWatchのすべてのセンサーが入る、頑丈な防塵・防水（IP66）ケース。冷凍庫の霜・鶏舎の洗浄・畑の直射日光やホコリから中身を守ります。3Dで回転させて確認できます。校正済みモジュールはそのまま装着可能。"
	/>
</svelte:head>

<div class="crumb"><div class="wrap crumb__in">
	<a href="/">ホーム</a><span class="material-symbols-rounded">chevron_right</span>
	<a href="/sectors">製品</a><span class="material-symbols-rounded">chevron_right</span>
	<b>交換用ケース</b>
</div></div>

<section class="hero">
	<div class="wrap hero__grid">
		<div class="hero__media" data-reveal>
			<div class="stage">
				<span class="stage__badge"><span class="material-symbols-rounded">view_in_ar</span> 3D</span>
				<div class="stage__loader" id="stageLoader">3Dを読み込み中…</div>
				<canvas id="deviceCanvas"></canvas>
				<span class="stage__hint"><span class="material-symbols-rounded">drag_pan</span> ドラッグで回転 ・ スクロールで拡大</span>
			</div>
		</div>
		<div class="hero__copy" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">deployed_code</span> 交換用ケース（CW-CASE）</p>
			<h1>過酷な現場から、<br><span class="hl">中身を守る頑丈なケース。</span></h1>
			<p class="hero__kicker">冷凍庫の霜も、鶏舎の洗浄も、畑の直射日光も。<span class="u">中の電子部品をしっかり守ります。</span></p>
			<p class="hero__lead">CropWatch のすべてのセンサーが収まる<b>防塵・防水（IP66）ケース</b>。割れたり傷んだりしても、<b>校正済みのモジュールはそのまま新しいケースへ</b>。マウスのドラッグで、3Dでぐるりと確認できます。</p>
			<div class="spec-chips">
				<span><span class="material-symbols-rounded">water_drop</span> 防塵防水 IP66</span>
				<span><span class="material-symbols-rounded">wb_sunny</span> 紫外線に強い</span>
				<span><span class="material-symbols-rounded">cleaning_services</span> 水洗いOK</span>
				<span><span class="material-symbols-rounded">cached</span> 工具いらず</span>
			</div>
			<div class="hero__ctas">
				<a href="/contact" class="btn btn--accent btn--lg">見積もりを依頼する <span class="material-symbols-rounded">arrow_forward</span></a>
				<a href="/replacement-sensors" class="btn btn--ghost btn--lg"><span class="material-symbols-rounded">cable</span> センサーを見る</a>
			</div>
			<p class="hero__micro"><span class="material-symbols-rounded">verified</span> 取り付け方法やアンテナの選び方もご提案します。</p>
		</div>
	</div>
</section>

<!-- 環境 -->
<section class="section section--soft section--tight">
	<div class="wrap">
		<div class="section__head" data-reveal><p class="eyebrow eyebrow--accent"><span class="material-symbols-rounded">shield</span> どんな場所でも</p><h2>1つのケースで、あらゆる環境に。</h2></div>
		<div class="boxgrid boxgrid--3">
			<div class="box" data-reveal="0"><span class="box__ic"><span class="material-symbols-rounded">ac_unit</span></span><h3>冷凍庫に強い</h3><p>霜や結露をしっかり防ぎ、低温でも安定して動きます。</p></div>
			<div class="box" data-reveal="1"><span class="box__ic"><span class="material-symbols-rounded">water_drop</span></span><h3>水洗いできる</h3><p>鶏舎や厨房の洗浄にも対応。清潔を保ちやすい設計です。</p></div>
			<div class="box" data-reveal="2"><span class="box__ic box__ic--gold"><span class="material-symbols-rounded">wb_sunny</span></span><h3>屋外でも安心</h3><p>紫外線・ホコリに強く、畑や屋外でも長く使えます。</p></div>
		</div>
	</div>
</section>

<!-- modular split -->
<section class="section">
	<div class="wrap split">
		<div data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">extension</span> 入れ替えできる設計</p>
			<h2>ケースを替えても、校正はそのまま。</h2>
			<p class="split__lead">ケースが割れたり、傷んだりしても、校正済みのセンサーを失うことはありません。新しいケースにモジュールを移すだけで、そのまま使い続けられます。</p>
			<ul class="checklist">
				<li><span class="material-symbols-rounded">check</span> 校正済みモジュールをそのまま移せる</li>
				<li><span class="material-symbols-rounded">check</span> 工具なしで開け閉めできる</li>
				<li><span class="material-symbols-rounded">check</span> 取り付け・アンテナの選択肢も豊富</li>
			</ul>
		</div>
		<div class="split__media" data-reveal>
			<img src="/assets/imagery/device-side-view.webp" alt="CropWatchのセンサーケース" />
		</div>
	</div>
</section>

<!-- specs -->
<section class="section section--soft scroll-pad" id="spec">
	<div class="wrap">
		<div class="section__head" data-reveal><p class="eyebrow"><span class="material-symbols-rounded">description</span> 仕様</p><h2>CW-CASE のスペック</h2></div>
		<dl class="specs" data-reveal style="max-width:760px;margin-inline:auto">
			<div class="spec-row"><dt>防塵・防水</dt><dd>IP66</dd></div>
			<div class="spec-row"><dt>材質</dt><dd>紫外線に強い樹脂</dd></div>
			<div class="spec-row"><dt>対応環境</dt><dd>冷凍庫・鶏舎・厨房・屋外</dd></div>
			<div class="spec-row"><dt>開閉</dt><dd>工具不要のワンタッチ</dd></div>
			<div class="spec-row"><dt>対応モジュール</dt><dd>すべてのCropWatchセンサー</dd></div>
		</dl>
	</div>
</section>

<!-- 関連 -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal><h2>あわせてどうぞ</h2></div>
		<div class="boxgrid boxgrid--2" style="max-width:820px;margin-inline:auto">
			<a class="box" href="/replacement-sensors" data-reveal="0"><span class="box__ic"><span class="material-symbols-rounded">cable</span></span><h3>交換用センサー</h3><p>温度・湿度・CO₂・土壌など。校正証明書つきで、自分で交換できます。</p></a>
			<a class="box" href="/technology" data-reveal="1"><span class="box__ic box__ic--accent"><span class="material-symbols-rounded">pets</span></span><h3>番犬機能</h3><p>万一機器が止まっても自動で復旧。監視が途切れない仕組みです。</p></a>
		</div>
	</div>
</section>

<section class="closing">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold" style="justify-content:center"><span class="material-symbols-rounded">inventory_2</span> 予備の備えに</p>
		<h2>新しいケースが必要ですか？</h2>
		<p>設置環境をお聞かせください。最適な取り付け方法やアンテナの選び方をご提案します。</p>
		<div class="closing__ctas">
			<a href="/contact" class="btn btn--accent btn--lg">見積もりを依頼する</a>
			<a href="/replacement-sensors" class="btn btn--outline-light btn--lg">交換用センサー</a>
		</div>
	</div>
</section>

<style>
	.stage { position: relative; background: radial-gradient(circle at 50% 30%, #f0f5ff, var(--web-bg-soft)); border: 1px solid var(--web-border); border-radius: 24px; overflow: hidden; box-shadow: var(--web-shadow-card); aspect-ratio: 1 / 1; }
	.stage canvas { width: 100%; height: 100%; display: block; outline: none; touch-action: none; }
	.stage__badge { position: absolute; top: 16px; left: 16px; z-index: 2; display: inline-flex; align-items: center; gap: 6px; background: var(--web-primary); color: #fff; font-size: 13px; font-weight: 700; padding: 6px 13px; border-radius: 9999px; }
	.stage__badge .material-symbols-rounded { font-size: 17px; }
	.stage__hint { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); z-index: 2; display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,.9); border: 1px solid var(--web-border); color: var(--web-muted); font-size: 13px; padding: 7px 14px; border-radius: 9999px; }
	.stage__hint .material-symbols-rounded { font-size: 17px; }
	.stage__loader { position: absolute; inset: 0; z-index: 1; display: flex; align-items: center; justify-content: center; color: var(--web-muted); font-size: 15px; }
</style>
