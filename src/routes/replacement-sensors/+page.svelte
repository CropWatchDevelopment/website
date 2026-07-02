<script lang="ts">
import { onMount } from 'svelte';
import { initSensorViewer, SENSORS } from '$lib/sensors3d';
import '$lib/styles/sensors3d.css';

// 最初のセンサーはサーバー側でも描画（実データ／JSなしでも見える）。
// ビューアはタブ操作に合わせてこの内容を差し替えます。
const first = SENSORS[0];
onMount(() => initSensorViewer());
</script>

<svelte:head>
	<title>交換用センサー｜自分で60秒で交換・校正証明書つき｜CropWatch 日本</title>
	<meta
		name="description"
		content="校正済みで、すぐ使える交換用センサーモジュール。業者を呼ばず、だれでも60秒で交換できます。1台ごとにISO/IEC 17025の校正証明書つき。温度・湿度・CO₂・土壌など用途に合わせて選べます。"
	/>
</svelte:head>

<div class="crumb"><div class="wrap crumb__in">
	<a href="/">ホーム</a><span class="material-symbols-rounded">chevron_right</span>
	<a href="/sectors">製品</a><span class="material-symbols-rounded">chevron_right</span>
	<b>交換用センサー</b>
</div></div>

<!-- 交換が安全な理由 -->
<section class="section section--navy section--tight">
	<div class="wrap">
		<div class="section__head" data-reveal><p class="eyebrow" style="color:var(--cw-sapphire-300)"><span class="material-symbols-rounded">security</span> 交換しても安心</p><h2 style="color:#fff">新しいモジュールは、使う前に自分を証明します。</h2></div>
		<div class="boxgrid boxgrid--3">
			<div class="box" data-reveal="0" style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.14)"><span class="box__ic box__ic--accent"><span class="material-symbols-rounded">fact_check</span></span><h3 style="color:#fff">二重チェック</h3><p style="color:var(--web-on-ink-muted)">2つのセンサーがたがいに確認。合わない値は記録しません。</p></div>
			<div class="box" data-reveal="1" style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.14)"><span class="box__ic box__ic--accent"><span class="material-symbols-rounded">pets</span></span><h3 style="color:#fff">番犬機能</h3><p style="color:var(--web-on-ink-muted)">万一固まっても自動で復旧。監視が途切れません。</p></div>
			<div class="box" data-reveal="2" style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.14)"><span class="box__ic box__ic--accent"><span class="material-symbols-rounded">workspace_premium</span></span><h3 style="color:#fff">校正済み</h3><p style="color:var(--web-on-ink-muted)">工場で校正してから出荷。証明書つきで届きます。</p></div>
		</div>
	</div>
</section>

<!-- モジュール一覧（3Dビューア） -->
<section class="section section--tint" id="sensorTypes">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent"><span class="material-symbols-rounded">view_in_ar</span> 4つのモジュール、ひとつの仕組み</p>
			<h2>モジュールを選ぶ。使い方は同じ。</h2>
			<p>どのセンサーも、同じケース・同じソケット・同じ画面。現場に合わせて種類を混ぜても、どれもご自分で交換できます。ドラッグしてぐるっと見てみてください。</p>
		</div>
		<div class="v3d" data-reveal>
			<div class="v3d-tabs" id="v3dTabs"></div>
			<div class="v3d-stage">
				<span class="v3d-stage__badge"><span class="material-symbols-rounded">view_in_ar</span> 3Dで見る</span>
				<canvas id="v3dCanvas"></canvas>
				<div class="v3d__status" id="v3dStatus"></div>
				<span class="v3d-stage__hint"><span class="material-symbols-rounded">drag_pan</span> ドラッグで回転・スクロールで拡大</span>
			</div>
			<div class="v3d-panel" id="v3dPanel">
				<span class="v3d-panel__tag" data-tag>{first.tag}</span>
				<h3 data-name>{first.name}</h3>
				<p class="v3d-panel__blurb" data-blurb>{first.blurb}</p>
				<div class="v3d-measures" data-measures>
					{#each first.measures as m (m)}<span class="v3d-chip">{m}</span>{/each}
				</div>
				<dl class="v3d-specs" data-specs>
					{#each first.specs as [k, v] (k)}<div class="v3d-spec"><dt>{k}</dt><dd>{v}</dd></div>{/each}
				</dl>
			</div>
		</div>
		<p style="text-align:center;margin-top:26px;font-size:13px;color:var(--web-muted)" data-reveal>
			4つのモジュールはすべて校正済み・2つのセンサーで二重チェック。1台ごとに ISO/IEC 17025 の校正証明書が付きます。
		</p>
	</div>
</section>

<!-- FAQ -->
<section class="section section--soft">
	<div class="wrap">
		<div class="section__head" data-reveal><p class="eyebrow"><span class="material-symbols-rounded">quiz</span> よくあるご質問</p><h2>交換用センサー Q&amp;A</h2></div>
		<div class="faq" data-reveal>
			<details><summary>交換のあとに校正し直す必要はありますか？ <span class="material-symbols-rounded">add</span></summary><p>いりません。モジュールは工場で校正済みのまま届き、そのまま使えます。証明書もモジュールごとに付いています。</p></details>
			<details><summary>違う種類のモジュールに付け替えられますか？ <span class="material-symbols-rounded">add</span></summary><p>はい。同じケース・同じ受信機・同じ画面で使えるので、現場に合わせて種類を変えられます。</p></details>
			<details><summary>予備を置いておけますか？ <span class="material-symbols-rounded">add</span></summary><p>もちろんです。予備をストックしておけば、寿命がきてもすぐに差し替えて監視を続けられます。</p></details>
		</div>
	</div>
</section>

<section class="closing">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold" style="justify-content:center"><span class="material-symbols-rounded">inventory_2</span> 予備の備えに</p>
		<h2>棚に1つ、予備を。</h2>
		<p>お使いの台数をお聞かせください。交換用モジュールと、定期的な再校正のスケジュールをご提案します。</p>
		<div class="closing__ctas">
			<a href="/contact" class="btn btn--accent btn--lg">見積もりを依頼する</a>
			<a href="/replacement-case" class="btn btn--outline-light btn--lg">交換用ケースを見る</a>
		</div>
	</div>
</section>
