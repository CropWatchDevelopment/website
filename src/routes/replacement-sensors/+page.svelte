<script lang="ts">
import { onMount } from 'svelte';
import { initSensorViewer, SENSORS } from '$lib/sensors3d';
import Seo from '$lib/components/Seo.svelte';
import JsonLd from '$lib/components/JsonLd.svelte';
import { breadcrumbSchema, productSchema } from '$lib/seo/schema';
import '$lib/styles/sensors3d.css';

// 最初のセンサーはサーバー側でも描画（実データ／JSなしでも見える）。
// ビューアはタブ操作に合わせてこの内容を差し替えます。
const first = SENSORS[0];
onMount(() => initSensorViewer());

const title = '交換用センサー｜自分で60秒で交換・校正証明書つき｜CropWatch 日本';
const description =
	'校正済みで、すぐ使える交換用センサーモジュール。業者を呼ばず、だれでも60秒で交換できます。1台ごとにISO/IEC 17025の校正証明書つき。温度・湿度・CO₂・土壌など用途に合わせて選べます。';

const ld = [
	breadcrumbSchema([
		{ name: 'ホーム', path: '/' },
		{ name: '交換用センサー', path: '/replacement-sensors' }
	]),
	productSchema({
		name: 'CropWatch 交換用センサーモジュール',
		description:
			'ユーザー自身が60秒で交換できる校正済みセンサーモジュール。温度・湿度・CO₂・土壌に対応し、1台ごとにISO/IEC 17025の校正証明書が付属します。',
		category: '交換用センサー'
	})
];
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=change_circle,construction"
	/>
</svelte:head>

<Seo {title} {description} />
<JsonLd data={ld} />

<div class="crumb"><div class="wrap crumb__in">
	<a href="/">ホーム</a><span class="material-symbols-rounded">chevron_right</span>
	<span>製品</span><span class="material-symbols-rounded">chevron_right</span>
	<b>交換用センサー</b>
</div></div>

<!-- 交換が安全な理由 -->
<section class="section section--navy section--tight">
	<div class="wrap">
		<div class="section__head" data-reveal><p class="eyebrow" style="color:var(--cw-sapphire-300)"><span class="material-symbols-rounded">security</span> 交換しても安心</p><h2 style="color:#fff">交換できるセンサーで、長く続けられる環境モニタリングを</h2></div>
		<div class="boxgrid boxgrid--3">
			<div class="box" data-reveal="0" style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.14)"><span class="box__ic box__ic--accent"><span class="material-symbols-outlined" style="font-size:48px">change_circle</span></span><h3 style="color:#fff">自分で交換できる設計</h3><p style="color:var(--web-on-ink-muted)">センサー部はお客様自身で交換できるため、必要なタイミングでスムーズに交換できます。</p></div>
			<div class="box" data-reveal="1" style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.14)"><span class="box__ic box__ic--accent"><span class="material-symbols-outlined" style="font-size:48px">construction</span></span><h3 style="color:#fff">交換時の負担を軽減</h3><p style="color:var(--web-on-ink-muted)">本体をそのまま活用し、必要なセンサー部だけを交換。停止時間や交換コストを大幅に抑えます。</p></div>
			<div class="box" data-reveal="2" style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.14)"><span class="box__ic box__ic--accent"><svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M12 39c-2.7-3.8-5-7.2-5-10a5 5 0 0 1 10 0c0 2.8-2.3 6.2-5 10Z" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><circle cx="12" cy="29" r="1.5" fill="currentColor"/><path d="M37 18c-2.7-3.8-5-7.2-5-10a5 5 0 0 1 10 0c0 2.8-2.3 6.2-5 10Z" stroke="currentColor" stroke-width="2.8" stroke-linejoin="round"/><circle cx="37" cy="8" r="1.5" fill="currentColor"/><path d="M16.5 34.5c8 1 19.5-.5 19.5-6 0-6.5-18.5-4-18.5-10 0-3.8 6.5-5.4 13.5-6.5" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-dasharray="3.5 4.5"/></svg></span><h3 style="color:#fff">長期運用を支える</h3><p style="color:var(--web-on-ink-muted)">センサーの劣化や測定項目の変更にも対応し、継続したデータ収集を支えます。</p></div>
		</div>
	</div>
</section>

<!-- モジュール一覧（3Dビューア） -->
<section class="section section--tint" id="sensorTypes">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent"><span class="material-symbols-rounded">view_in_ar</span> 4つのモジュール、ひとつの仕組み</p>
			<h2>設定不要でかんたん交換</h2>
			<p>交換用センサーは取り付けるだけで使用でき、お客様による設定作業は必要ありません。</p>
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
		<h2>必要なときに、すぐ交換できる安心を</h2>
		<p>予備のセンサーを用意しておくことで、長期間の使用による劣化や故障にもすぐ対応できます。</p>
		<div class="closing__ctas">
			<a href="/contact" class="btn btn--accent btn--lg">センサーを注文する</a>
		</div>
	</div>
</section>
