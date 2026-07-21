<script lang="ts">
	import { onMount } from 'svelte';
	import Seo from '$lib/components/Seo.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { productSchema } from '$lib/seo/schema';

	interface Sensor {
		id: string;
		icon: string;
		name: string;
		tag: string;
		blurb: string;
		measures: string[];
		specs: [string, string][];
	}

	const SENSORS: Sensor[] = [
		{
			id: 'th',
			icon: 'thermostat',
			name: '温度・湿度（食品対応）',
			tag: 'CW-AIR-TH',
			blurb:
				'冷蔵・冷凍設備や食品保管環境に適した標準センサー。気温・相対湿度を測定し、2系統のセンサーで測定値を照合。安定した温湿度管理を支えます。',
			measures: ['温度', '湿度', '露点'],
			specs: [
				['温度測定範囲', '−40〜+85℃'],
				['湿度測定範囲', '0%〜100% (結露)'],
				['精度', '±0.48℃ / ±1.8%RH'],
				['年間ドリフト', 'typ. <0.01℃/y'],
				['チェック機能', '2系統センサーで測定値を確認']
			]
		},
		{
			id: 'co2',
			icon: 'cloud',
			name: 'CO₂・温度・湿度',
			tag: 'CW-AIR-THC',
			blurb:
				'空気の状態を、ひとつのセンサーで。NDIR方式のCO₂に加えて温度・湿度も測定。ハウスのVPD算出や、鶏舎の換気アラートに使えます。',
			measures: ['CO₂', '温度', '湿度', 'VPD'],
			specs: [
				['CO₂測定範囲', '400〜5,000ppm'],
				['精度', '測定範囲により異なる'],
				['CO₂測定方式', 'NDIR'],
				['温度測定範囲', '−40〜+85℃'],
				['湿度測定範囲', '0%〜100% (結露)'],
				['精度', '±0.2℃ / ±1.8%RH'],
				['算出値', 'VPD（kPa）']
			]
		},
		{
			id: 'ppfd',
			icon: 'wb_sunny',
			name: 'PPFD（光合成有効光量子束密度）',
			tag: 'CW-PPFD',
			blurb:
				'農業・栽培環境向けの光センサー。植物が光合成に利用できる光の量（PPFD）を測定。さらに、1日に植物へ届いた光の合計量を示すDLI（日積算光量）も本体で算出。日々の光環境を把握し、補光管理や栽培環境の見直しに活用できます。',
			measures: ['PPFD', 'DLI'],
			specs: [
				['波長範囲', '350〜1000nm（PAR）'],
				['測定値', 'PPFD µmol/m²/s'],
				['算出値', 'DLI mol/m²/日']
			]
		},
		{
			id: 'soil',
			icon: 'grass',
			name: '土壌センサー',
			tag: 'CW-SS-TME',
			blurb:
				'頑丈な地中プローブで、土壌の中の状態を見える化。土壌水分・地温・EC（電気伝導度）を測定し、かん水や施肥の判断に活用できます。',
			measures: ['土壌水分', '地温', 'EC'],
			specs: [
				['土壌水分量（VWC）', '測定値から算出'],
				['土壌水分', '0〜100%（±8%）'],
				['土壌EC', '0〜3.0 mS/cm（±20%）'],
				['', '3.0〜8.0 mS/cm（±40%）'],
				['地温', '-20℃〜70℃'],
				['プローブ', 'ステンレス・IP68']
			]
		}
	];

	let active = $state(SENSORS[0]);

	// 旧3Dビューア時代の ?sensor= ディープリンクを引き続き尊重する。
	onMount(() => {
		const requested = new URL(window.location.href).searchParams.get('sensor');
		const match = SENSORS.find((s) => s.id === requested);
		if (match) active = match;
	});

	const title = '交換用センサー｜自分で60秒で交換・校正証明書つき｜CropWatch 日本';
	const description =
		'校正済みで、すぐ使える交換用センサーモジュール。業者を呼ばず、だれでも60秒で交換できます。1台ごとにISO/IEC 17025の校正証明書つき。温度・湿度・CO₂・土壌など用途に合わせて選べます。';

	// ページ上に価格を表示していないため offers は出さない（見積もりベース）。
	// 価格をこのページに公開したら price/offerUrl を追加する。
	const ld = productSchema({
		name: 'CropWatch 交換用センサーモジュール',
		description:
			'ユーザー自身が60秒で交換できる校正済みセンサーモジュール。温度・湿度・CO₂・土壌に対応し、1台ごとにISO/IEC 17025の校正証明書が付属します。',
		path: '/replacement-sensors',
		category: '交換用センサー'
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=change_circle,construction"
	/>
</svelte:head>

<Seo {title} {description} />
<JsonLd data={ld} />

<Breadcrumbs
	items={[{ label: 'ホーム', href: '/' }, { label: '製品' }, { label: '交換用センサー' }]}
/>

<!-- 交換が安全な理由 -->
<section class="section section--navy section--tight">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow" style="color:var(--cw-sapphire-300)">
				<span class="material-symbols-rounded">security</span> 交換しても安心
			</p>
			<h2 style="color:#fff">交換できるセンサーで、長く続けられる環境モニタリングを</h2>
		</div>
		<div class="boxgrid boxgrid--3">
			<div
				class="box"
				data-reveal="0"
				style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.14)"
			>
				<span class="box__ic box__ic--accent"
					><span class="material-symbols-outlined" style="font-size:48px">change_circle</span></span
				>
				<h3 style="color:#fff">自分で交換できる設計</h3>
				<p style="color:var(--web-on-ink-muted)">
					センサー部はお客様自身で交換できるため、必要なタイミングでスムーズに交換できます。
				</p>
			</div>
			<div
				class="box"
				data-reveal="1"
				style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.14)"
			>
				<span class="box__ic box__ic--accent"
					><span class="material-symbols-outlined" style="font-size:48px">construction</span></span
				>
				<h3 style="color:#fff">交換時の負担を軽減</h3>
				<p style="color:var(--web-on-ink-muted)">
					本体をそのまま活用し、必要なセンサー部だけを交換。停止時間や交換コストを大幅に抑えます。
				</p>
			</div>
			<div
				class="box"
				data-reveal="2"
				style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.14)"
			>
				<span class="box__ic box__ic--accent"
					><svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true"
						><path
							d="M12 39c-2.7-3.8-5-7.2-5-10a5 5 0 0 1 10 0c0 2.8-2.3 6.2-5 10Z"
							stroke="currentColor"
							stroke-width="2.8"
							stroke-linejoin="round"
						/><circle cx="12" cy="29" r="1.5" fill="currentColor" /><path
							d="M37 18c-2.7-3.8-5-7.2-5-10a5 5 0 0 1 10 0c0 2.8-2.3 6.2-5 10Z"
							stroke="currentColor"
							stroke-width="2.8"
							stroke-linejoin="round"
						/><circle cx="37" cy="8" r="1.5" fill="currentColor" /><path
							d="M16.5 34.5c8 1 19.5-.5 19.5-6 0-6.5-18.5-4-18.5-10 0-3.8 6.5-5.4 13.5-6.5"
							stroke="currentColor"
							stroke-width="2.8"
							stroke-linecap="round"
							stroke-dasharray="3.5 4.5"
						/></svg
					></span
				>
				<h3 style="color:#fff">長期運用を支える</h3>
				<p style="color:var(--web-on-ink-muted)">
					センサーの劣化や測定項目の変更にも対応し、継続したデータ収集を支えます。
				</p>
			</div>
		</div>
	</div>
</section>

<!-- モジュール一覧 -->
<section class="section section--tint" id="sensorTypes">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent">
				<span class="material-symbols-rounded">sensors</span> 4つのモジュール、ひとつの仕組み
			</p>
			<h2>設定不要でかんたん交換</h2>
			<p>交換用センサーは取り付けるだけで使用でき、お客様による設定作業は必要ありません。</p>
		</div>
		<div class="picker" data-reveal>
			<div class="picker-tabs">
				{#each SENSORS as s (s.id)}
					<button
						type="button"
						class="picker-tab"
						class:is-active={active.id === s.id}
						aria-pressed={active.id === s.id}
						onclick={() => (active = s)}
					>
						<span class="picker-tab__ic"
							><span class="material-symbols-rounded">{s.icon}</span></span
						>
						<span class="picker-tab__tx"><b>{s.name}</b><span>{s.tag}</span></span>
					</button>
				{/each}
			</div>
			<div class="picker-panel">
				<span class="picker-panel__tag">{active.tag}</span>
				<h3>{active.name}</h3>
				<p class="picker-panel__blurb">{active.blurb}</p>
				<div class="picker-measures">
					{#each active.measures as m (m)}<span class="picker-chip">{m}</span>{/each}
				</div>
				<dl class="picker-specs">
					{#each active.specs as [k, v], i (i)}<div class="picker-spec">
							<dt>{k}</dt>
							<dd>{v}</dd>
						</div>{/each}
				</dl>
			</div>
		</div>
	</div>
</section>

<!-- FAQ -->
<section class="section section--soft">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">quiz</span> よくあるご質問</p>
			<h2>交換用センサー Q&amp;A</h2>
		</div>
		<div class="faq" data-reveal>
			<details>
				<summary
					>交換のあとに校正し直す必要はありますか？ <span class="material-symbols-rounded">add</span
					></summary
				>
				<p>
					いりません。モジュールは工場で校正済みのまま届き、そのまま使えます。証明書もモジュールごとに付いています。
				</p>
			</details>
			<details>
				<summary
					>違う種類のモジュールに付け替えられますか？ <span class="material-symbols-rounded"
						>add</span
					></summary
				>
				<p>
					はい。同じケース・同じ受信機・同じ画面で使えるので、現場に合わせて種類を変えられます。
				</p>
			</details>
			<details>
				<summary>予備を置いておけますか？ <span class="material-symbols-rounded">add</span></summary
				>
				<p>
					もちろんです。予備をストックしておけば、寿命がきてもすぐに差し替えて監視を続けられます。
				</p>
			</details>
		</div>
	</div>
</section>

<section class="closing">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold" style="justify-content:center">
			<span class="material-symbols-rounded">inventory_2</span> 予備の備えに
		</p>
		<h2>必要なときに、すぐ交換できる安心を</h2>
		<p>予備のセンサーを用意しておくことで、長期間の使用による劣化や故障にもすぐ対応できます。</p>
		<div class="closing__ctas">
			<a href="/contact" class="btn btn--accent btn--lg">センサーを注文する</a>
		</div>
	</div>
</section>

<style>
	.picker {
		display: grid;
		grid-template-columns: 340px 1fr;
		gap: 22px;
		align-items: start;
	}
	.picker-tabs {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.picker-tab {
		display: flex;
		align-items: center;
		gap: 13px;
		text-align: left;
		cursor: pointer;
		font-family: inherit;
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: var(--cw-radius-xl);
		padding: 14px 15px;
		box-shadow: var(--web-shadow-card);
		transition:
			border-color 0.18s,
			transform 0.18s,
			background 0.18s;
	}
	.picker-tab:hover {
		transform: translateX(3px);
		border-color: var(--web-border-strong);
	}
	.picker-tab.is-active {
		border-color: var(--web-primary);
		background: var(--web-primary-soft);
	}
	.picker-tab__ic {
		display: grid;
		place-items: center;
		width: 42px;
		height: 42px;
		flex: none;
		border-radius: var(--cw-radius-lg);
		background: var(--web-accent-soft);
		color: var(--web-accent);
	}
	.picker-tab.is-active .picker-tab__ic {
		background: var(--web-primary);
		color: #fff;
	}
	.picker-tab__ic .material-symbols-rounded {
		font-size: 24px;
	}
	.picker-tab__tx b {
		display: block;
		font-size: 14px;
		color: var(--cw-ink);
		line-height: 1.2;
	}
	.picker-tab__tx span {
		font-size: 12px;
		color: var(--web-muted);
		font-family: var(--cw-font-mono);
	}

	.picker-panel {
		display: flex;
		flex-direction: column;
		gap: 14px;
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: var(--web-radius-card);
		box-shadow: var(--web-shadow-card);
		padding: 24px 26px;
	}
	.picker-panel__tag {
		align-self: flex-start;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.05em;
		font-family: var(--cw-font-mono);
		color: var(--web-primary);
		background: var(--web-primary-soft);
		padding: 5px 11px;
		border-radius: 9999px;
	}
	.picker-panel h3 {
		font-size: 1.25rem;
		margin: 0;
		line-height: 1.25;
	}
	.picker-panel__blurb {
		font-size: 14px;
		color: var(--web-muted);
		line-height: 1.7;
		margin: 0;
	}
	.picker-measures {
		display: flex;
		flex-wrap: wrap;
		gap: 7px;
	}
	.picker-chip {
		font-size: 12px;
		font-weight: 600;
		color: var(--web-accent);
		background: var(--web-accent-soft);
		border: 1px solid color-mix(in srgb, var(--web-accent) 28%, transparent);
		border-radius: 9999px;
		padding: 5px 11px;
	}
	.picker-specs {
		display: grid;
		gap: 0;
		margin: 4px 0 0;
	}
	.picker-spec {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		padding: 9px 0;
		border-bottom: 1px solid var(--web-border);
	}
	.picker-spec dt {
		font-size: 12.5px;
		color: var(--web-muted);
		font-weight: 600;
	}
	.picker-spec dd {
		font-size: 12.5px;
		color: var(--cw-ink);
		font-weight: 600;
		font-family: var(--cw-font-mono);
		margin: 0;
		text-align: right;
	}

	@media (max-width: 720px) {
		.picker {
			grid-template-columns: 1fr;
		}
		.picker-tabs {
			flex-direction: row;
			overflow-x: auto;
		}
		.picker-tab {
			min-width: 220px;
		}
		.picker-panel {
			padding: 20px 18px;
		}
	}
</style>
