<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate, replaceState } from '$app/navigation';
	import Seo from '$lib/components/Seo.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { breadcrumbSchema, productSchema } from '$lib/seo/schema';
	import { absUrl } from '$lib/seo/site';

	/* ══════════════════════════════════════════════════════════════════
	   料金の設定値（すべて税込・円）- ここを編集すれば表全体が変わります。
	   業種タブごとに 基本料金 / センサー月額 / 手動記録1回あたりの分数 /
	   既定値 を設定できます。comingSoon: true のタブは「準備中」カードを
	   表示します。
	   ══════════════════════════════════════════════════════════════════ */
	type Sector = {
		label: string;
		icon: string;
		/** センサーの表示名（明細テーブルに出ます） */
		sensorLabel: string;
		/** 月額基本料金（1拠点あたり） */
		baseFee: number;
		/** センサー1台あたりの月額利用料 */
		sensorFee: number;
		/** 手動で1台を1回記録するのにかかる分数（移動+読み取り+記入） */
		minutesPerCheck: number;
		/** 既定値: 1拠点あたりのセンサー台数 */
		defaultCount: number;
		/** 既定値: 1日の記録回数 */
		defaultChecks: number;
		/** 既定値: 拠点数 */
		defaultLocations: number;
		/** 月額に含まれる機能（ヒーローの説明文と「含まれるもの」欄に出ます） */
		included: string[];
		/** 含まれない機能（「含まれるもの」欄に打ち消しで出ます） */
		excluded: string[];
		/** 機器1台あたりの購入価格（税込・初回のみ）。未定なら null（「お見積もり」表示） */
		deviceUnitPrice: number | null;
		comingSoon?: boolean;
	};
	const SECTORS: Record<string, Sector> = {
		'cold-chain': {
			label: 'コールドチェーン',
			icon: 'ac_unit',
			sensorLabel: '温湿度センサー利用料',
			baseFee: 16500,
			sensorFee: 880,
			minutesPerCheck: 3,
			defaultCount: 10,
			defaultChecks: 3,
			defaultLocations: 1,
			included: [
				'ユーザー数無制限',
				'アラート通知',
				'自動レポート',
				'CSVダウンロード',
				'API利用',
				'データ保存2年間'
			],
			excluded: [],
			deviceUnitPrice: 33000
		},
		livestock: {
			label: '畜産・養鶏',
			icon: 'pets',
			sensorLabel: '温湿度・CO₂センサー利用料',
			baseFee: 5500,
			sensorFee: 880,
			minutesPerCheck: 15,
			defaultCount: 4,
			defaultChecks: 3,
			defaultLocations: 3,
			included: ['ユーザー数無制限', 'アラート通知（ルールは3件まで）'],
			excluded: ['自動レポート', 'API利用'],
			// 畜産・養鶏向けの機器はコールドチェーンの1台価格 +10,000円
			deviceUnitPrice: 43000
		},
		agriculture: {
			label: '農業・ハウス',
			icon: 'eco',
			sensorLabel: '',
			baseFee: 0,
			sensorFee: 0,
			minutesPerCheck: 0,
			defaultCount: 0,
			defaultChecks: 0,
			defaultLocations: 0,
			// 準備中のため現状は非表示。公開時は畜産・養鶏と同じ制限（ルール3件まで・
			// レポート/APIなし）で案内する。
			included: ['ユーザー数無制限', 'アラート通知（ルールは3件まで）'],
			excluded: ['自動レポート', 'API利用'],
			// 農業向けの機器価格は未定（決まったら数値を入れる）
			deviceUnitPrice: null,
			comingSoon: true
		}
	};
	/** 時給の既定値: 地域別最低賃金の全国加重平均（令和7年度）。 */
	const DEFAULT_HOURLY_WAGE = 1121;
	/** 「1日あたり」の計算に使う年間日数（月あたりは30日）。 */
	const DAYS_PER_YEAR = 360;

	/** 導入費用の概算（初回のみ・税込）。センサー・ゲートウェイ・初期導入
	    サポートをまとめた1拠点あたりの価格で、機器単体の価格は表示しません。
	    1台あたりの価格は業種ごとに SECTORS の deviceUnitPrice で設定。
	    最安の最低構成（コールドチェーン・センサー1台）の価格はProduct
	    構造化データ（AggregateOfferのlowPrice）にも使われます。 */
	/** ゲートウェイ + 初期導入サポートのセット分 */
	const DEVICE_BASE_PRICE = 275000;
	const DEVICE_MIN_PRICE = SECTORS['cold-chain'].deviceUnitPrice! + DEVICE_BASE_PRICE;
	/* ══════════════════════════════════════════════════════════════════ */

	const SECTOR_IDS = Object.keys(SECTORS);
	let sector = $state('cold-chain');
	const cfg = $derived(SECTORS[sector]);

	let count = $state(SECTORS['cold-chain'].defaultCount);
	let checksPerDay = $state(SECTORS['cold-chain'].defaultChecks);
	let locations = $state(SECTORS['cold-chain'].defaultLocations);
	let minutesPerCheck = $state(SECTORS['cold-chain'].minutesPerCheck);
	let wage = $state(DEFAULT_HOURLY_WAGE);

	function selectSector(id: string) {
		sector = id;
		// 業種ごとの現実的な既定値に戻す。
		count = SECTORS[id].defaultCount;
		checksPerDay = SECTORS[id].defaultChecks;
		locations = SECTORS[id].defaultLocations;
		minutesPerCheck = SECTORS[id].minutesPerCheck;
	}

	// ── 共有用URL: すべての入力値をクエリパラメータと同期する ──
	// 例: /pricing?sector=livestock&units=4&checks=2&loc=2&min=30&wage=1200
	// URLをそのままメール等で送れば、受け取った人に同じ計算結果が表示される。
	let urlSyncReady = $state(false);

	onMount(() => {
		printDate = new Date().toLocaleDateString('ja-JP', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
		const sp = new URL(window.location.href).searchParams;
		const requested = sp.get('sector');
		if (requested && SECTORS[requested]) selectSector(requested);
		const readNum = (key: string, apply: (v: number) => void, min: number, max: number) => {
			const raw = sp.get(key);
			if (raw === null) return;
			const v = Number(raw);
			if (Number.isFinite(v) && v >= min && v <= max) apply(v);
		};
		readNum('units', (v) => (count = Math.floor(v)), 1, 1001);
		readNum('checks', (v) => (checksPerDay = Math.floor(v)), 1, 24);
		readNum('loc', (v) => (locations = Math.floor(v)), 1, 100);
		readNum('min', (v) => (minutesPerCheck = Math.floor(v)), 1, 60);
		readNum('wage', (v) => (wage = v), 0, 1000000);
	});

	// replaceState はルーター初期化後でないと呼べないため、
	// 初回ナビゲーション完了(afterNavigate)を待ってから同期を開始する。
	afterNavigate(() => (urlSyncReady = true));


	const safeCount = $derived(Number.isFinite(count) && count >= 1 ? Math.floor(count) : 1);
	const safeChecks = $derived(
		Number.isFinite(checksPerDay) && checksPerDay >= 1 ? Math.floor(checksPerDay) : 1
	);
	const safeLocations = $derived(
		Number.isFinite(locations) && locations >= 1 ? Math.floor(locations) : 1
	);
	const safeMinutes = $derived(
		Number.isFinite(minutesPerCheck) && minutesPerCheck >= 1 ? Math.floor(minutesPerCheck) : 1
	);
	const safeWage = $derived(Number.isFinite(wage) && wage > 0 ? wage : 0);

	/** 全拠点の合計センサー台数 */
	const totalCount = $derived(safeCount * safeLocations);

	/** 1拠点あたり1,001台以上はボリューム価格の個別見積もり（計算結果の金額は表示しない） */
	const volumePrice = $derived(safeCount >= 1001);

	// ── 導入費用の概算（1拠点あたり・初回のみ）── 「1拠点あたりのセンサー台数」に連動。
	// 機器価格が未定の業種（deviceUnitPrice: null）は null → 「お見積もり」表示。
	const deviceSetPrice = $derived(
		cfg.deviceUnitPrice === null ? null : safeCount * cfg.deviceUnitPrice + DEVICE_BASE_PRICE
	);

	// ── CropWatch のランニングコスト ──
	const baseFeeTotal = $derived(cfg.baseFee * safeLocations);
	const sensorFeeTotal = $derived(cfg.sensorFee * totalCount);
	const monthly = $derived(baseFeeTotal + sensorFeeTotal);
	const yearly = $derived(monthly * 12);
	const daily = $derived(Math.round(yearly / DAYS_PER_YEAR));
	const dailyPerUnit = $derived(Math.round(yearly / DAYS_PER_YEAR / Math.max(totalCount, 1)));

	// ── 手動記録の人件費（毎日、全台数を1回ずつ記録する場合） ──
	const manualHoursPerMonth = $derived((totalCount * safeChecks * safeMinutes * 30) / 60);
	const manualMonthly = $derived(Math.round(manualHoursPerMonth * safeWage));
	const manualYearly = $derived(manualMonthly * 12);

	// ── 比較 ──
	const savingsMonthly = $derived(manualMonthly - monthly);
	const savingsYearly = $derived(savingsMonthly * 12);

	const yen = (v: number) => (v < 0 ? '-' : '') + '¥' + Math.abs(v).toLocaleString('ja-JP');
	const num = (v: number) => v.toLocaleString('ja-JP');
	/** 軸ラベル用の短い金額表記（¥550万 / ¥1.2億） */
	const yenCompact = (v: number) =>
		v >= 1e8
			? `¥${(v / 1e8).toLocaleString('ja-JP', { maximumFractionDigits: 1 })}億`
			: v >= 1e4
				? `¥${Math.round(v / 1e4).toLocaleString('ja-JP')}万`
				: `¥${Math.round(v).toLocaleString('ja-JP')}`;

	// ── ROI（投資回収）ラインチャート ──
	// 導入費用（概算）+ 月額の累計と、手書き記録の人件費の累計を比較する。
	/** 全拠点分の導入費用の概算（1拠点あたりの概算 × 拠点数）。
	    機器価格未定の業種は0だが、その業種は準備中でROI自体を表示しない。 */
	const roiInitial = $derived((deviceSetPrice ?? 0) * safeLocations);
	/** 投資回収までの月数（手書きのほうが安い条件では null） */
	const breakEvenMonths = $derived(savingsMonthly > 0 ? roiInitial / savingsMonthly : null);
	/** 横軸の月数: 基本3年。回収がその先なら回収点が入るところまで延長（最長10年） */
	const roiMonths = $derived(
		breakEvenMonths === null
			? 36
			: Math.min(120, Math.max(36, Math.ceil((breakEvenMonths * 1.25) / 6) * 6))
	);
	const cwAt = (m: number) => roiInitial + monthly * m;
	const manualAt = (m: number) => manualMonthly * m;
	/** 上端を 1/2/2.5/5×10^k のきりのよい値に切り上げる */
	function niceCeil(v: number) {
		if (v <= 0) return 1;
		const exp = Math.pow(10, Math.floor(Math.log10(v)));
		const f = v / exp;
		return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * exp;
	}
	const roiMaxY = $derived(niceCeil(Math.max(cwAt(roiMonths), manualAt(roiMonths))));

	// 描画ジオメトリ（コンテナ幅に追従）
	let chartW = $state(0);
	const CHART_H = 260;
	const PAD = { top: 18, right: 18, bottom: 30, left: 60 };
	const plotW = $derived(Math.max(chartW - PAD.left - PAD.right, 0));
	const plotH = CHART_H - PAD.top - PAD.bottom;
	const xAt = (m: number) => PAD.left + (m / roiMonths) * plotW;
	const yAt = (v: number) => PAD.top + plotH - (v / roiMaxY) * plotH;
	// 狭い画面では目盛りを間引く（ラベルの重なり防止）
	const xTickStep = $derived(
		roiMonths <= 42 ? (chartW < 480 ? 12 : 6) : chartW < 480 ? 24 : 12
	);
	const xTicks = $derived(
		Array.from({ length: Math.floor(roiMonths / xTickStep) + 1 }, (_, i) => i * xTickStep)
	);
	const yTicks = $derived([0, 1, 2, 3, 4].map((i) => (roiMaxY / 4) * i));
	const monthLabel = (m: number) =>
		m === 0 ? '導入時' : m % 12 === 0 ? `${m / 12}年` : `${m}ヶ月`;

	// ホバー/フォーカス: 最寄りの月にスナップして両系列の値を出す
	let hoverMonth = $state<number | null>(null);

	// ── 印刷（お客様レビュー用の仮見積もり）──
	/** 印刷時はROIの数値表を開いた状態にする（閉じたdetailsは印刷されないため） */
	let roiTableOpen = $state(false);
	/** 印刷ヘッダーに出す出力日（クライアントでのみ確定） */
	let printDate = $state('');
	function roiMove(e: PointerEvent) {
		const rect = (e.currentTarget as SVGRectElement).getBoundingClientRect();
		const m = Math.round(((e.clientX - rect.left - PAD.left) / Math.max(plotW, 1)) * roiMonths);
		hoverMonth = Math.max(0, Math.min(roiMonths, m));
	}

	const shareQuery = $derived(
		new URLSearchParams({
			sector,
			// 手入力で1,001を超えても、共有URLは受け取り側の上限(1001)に収める
			units: String(Math.min(safeCount, 1001)),
			checks: String(safeChecks),
			loc: String(safeLocations),
			min: String(safeMinutes),
			wage: String(safeWage)
		}).toString()
	);
	/** メール共有用は常に本番URL（localhostを配らないため）。 */
	const shareUrl = $derived(`${absUrl('/pricing')}?${shareQuery}`);
	const mailtoHref = $derived(
		'mailto:?subject=' +
			encodeURIComponent('CropWatch 料金シミュレーション') +
			'&body=' +
			encodeURIComponent(`CropWatchの料金シミュレーション結果です。\n${shareUrl}`)
	);

	// 入力が変わるたびにアドレスバーのURLも更新（履歴は汚さない）。
	$effect(() => {
		if (!urlSyncReady) return;
		const url = `${window.location.pathname}?${shareQuery}`;
		try {
			replaceState(url, {});
		} catch {
			// ルーター未初期化のタイミングでは次回の入力変更で同期される
		}
	});

	let copied = $state(false);
	async function copyShareLink() {
		try {
			await navigator.clipboard.writeText(shareUrl);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {
			// クリップボードが使えない環境ではアドレスバーからコピーしてもらう
			prompt('このURLをコピーしてください', shareUrl);
		}
	}

	const title = '料金｜温湿度センサーの月額・人件費比較シミュレーション｜CropWatch 日本';
	const description =
		'CropWatchの料金シミュレーション。センサー台数・記録回数・拠点数・時給を入力すると、月額のランニングコストと、手書き記録の人件費との比較をその場で計算します。基本料金16,500円+1台あたり880円（税込）。ユーザー数無制限・アラート・レポート・API込み。';

	const ld = [
		breadcrumbSchema([
			{ name: 'ホーム', path: '/' },
			{ name: '料金', path: '/pricing' }
		]),
		// 最低構成価格つきのProduct（AggregateOfferがあることでリッチリザルト対象になる）
		productSchema({
			name: 'CropWatch センサー導入セット',
			description:
				'温湿度センサー・LoRaWAN™ゲートウェイ・初期導入サポートをまとめた導入セット。センサー1台から、台数に応じた概算価格を表示します。',
			category: '環境監視機器',
			lowPrice: DEVICE_MIN_PRICE,
			offerUrl: '/pricing'
		})
	];
</script>

<Seo {title} {description} />
<JsonLd data={ld} />

<!-- 印刷時（Ctrl+P含む）はROIの数値表を開いた状態で出力する -->
<svelte:window onbeforeprint={() => (roiTableOpen = true)} />

<div class="crumb"><div class="wrap crumb__in">
	<a href="/">ホーム</a><span class="material-symbols-rounded">chevron_right</span>
	<b>料金</b>
</div></div>

<section class="pagehero">
	<div class="wrap pagehero__in" data-reveal>
		<p class="eyebrow"><span class="material-symbols-rounded">payments</span> 料金</p>
		<h1>台数を入れるだけの、かんたん料金シミュレーション</h1>
		<p class="hero__kicker">
			{#if cfg.comingSoon}
				{cfg.label}向けの料金は現在準備中です。他の業種を選ぶと、その場で計算できます。
			{:else}
				月額は<b>基本料金 {yen(cfg.baseFee)} + 1台あたり {yen(cfg.sensorFee)}</b>（すべて税込）。
				{cfg.included.join('・')}が追加料金なしで含まれます。{#if cfg.excluded.length}{cfg.excluded.join('・')}は含まれません。{/if}
			{/if}
		</p>
	</div>
</section>

<section class="section">
	<div class="wrap pr-wrap">
		<!-- 印刷専用ヘッダー（画面では非表示） -->
		<div class="print-head">
			<img src="/cropwatch_icons/cropwatch_static.svg" alt="" class="print-head__logo" />
			<div class="print-head__tx">
				<b>CropWatch 日本</b>
				<span>料金シミュレーション（概算お見積もり）</span>
			</div>
			<div class="print-head__meta">
				{#if printDate}<span>出力日: {printDate}</span>{/if}
				<span>{cfg.label} / センサー{num(safeCount)}台 × {num(safeLocations)}拠点</span>
			</div>
		</div>

		<!-- 業種タブ -->
		<div class="pr-tabs" role="tablist" aria-label="業種で選ぶ" data-reveal>
			{#each SECTOR_IDS as id (id)}
				{@const s = SECTORS[id]}
				<button
					type="button"
					id="sector-{id}"
					class="pr-tab"
					class:is-active={sector === id}
					role="tab"
					aria-selected={sector === id}
					onclick={() => selectSector(id)}
				>
					<span class="material-symbols-rounded">{s.icon}</span>
					<span>{s.label}</span>
					{#if s.comingSoon}<span class="pr-tab__soon">準備中</span>{/if}
				</button>
			{/each}
		</div>

		{#if cfg.comingSoon}
			<div class="pr-soon" id="pr-coming-soon" data-reveal>
				<span class="material-symbols-rounded">{cfg.icon}</span>
				<h2>{cfg.label}向けの料金は準備中です。</h2>
				<p>
					ハウス・露地・土壌向けのプランを準備しています。現場の内容をお聞かせいただければ、
					先行して具体的なお見積もりをご案内します。
				</p>
				<a href="/contact" class="btn btn--accent btn--lg"
					>相談してみる <span class="material-symbols-rounded">arrow_forward</span></a
				>
			</div>
		{:else}
			<!-- 入力（数値アップダウン） -->
			<div class="pr-count" data-reveal>
				<div class="pr-field">
					<label class="pr-count__label" for="sensor-count">1拠点あたりのセンサー台数</label>
					<div class="pr-count__ctrl">
						<button
							type="button"
							class="pr-count__btn"
							aria-label="1台減らす"
							onclick={() => (count = Math.max(1, safeCount - 1))}
							disabled={safeCount <= 1}
						>
							<span class="material-symbols-rounded">remove</span>
						</button>
						<input
							id="sensor-count"
							type="number"
							min="1"
							max="1001"
							step="1"
							inputmode="numeric"
							bind:value={count}
						/>
						<span class="pr-count__unit">台</span>
						<button
							type="button"
							class="pr-count__btn"
							aria-label="1台増やす"
							onclick={() => (count = Math.min(1001, safeCount + 1))}
						>
							<span class="material-symbols-rounded">add</span>
						</button>
					</div>
				</div>

				<div class="pr-field">
					<label class="pr-count__label" for="checks-count">1日の記録回数</label>
					<div class="pr-count__ctrl">
						<button
							type="button"
							class="pr-count__btn"
							aria-label="1回減らす"
							onclick={() => (checksPerDay = Math.max(1, safeChecks - 1))}
							disabled={safeChecks <= 1}
						>
							<span class="material-symbols-rounded">remove</span>
						</button>
						<input
							id="checks-count"
							type="number"
							min="1"
							max="24"
							step="1"
							inputmode="numeric"
							bind:value={checksPerDay}
						/>
						<span class="pr-count__unit">回/日</span>
						<button
							type="button"
							class="pr-count__btn"
							aria-label="1回増やす"
							onclick={() => (checksPerDay = Math.min(24, safeChecks + 1))}
						>
							<span class="material-symbols-rounded">add</span>
						</button>
					</div>
				</div>

				<div class="pr-field">
					<label class="pr-count__label" for="minutes-count">記録1回あたりの時間</label>
					<div class="pr-count__ctrl">
						<button
							type="button"
							class="pr-count__btn"
							aria-label="1分減らす"
							onclick={() => (minutesPerCheck = Math.max(1, safeMinutes - 1))}
							disabled={safeMinutes <= 1}
						>
							<span class="material-symbols-rounded">remove</span>
						</button>
						<input
							id="minutes-count"
							type="number"
							min="1"
							max="60"
							step="1"
							inputmode="numeric"
							bind:value={minutesPerCheck}
						/>
						<span class="pr-count__unit">分/台</span>
						<button
							type="button"
							class="pr-count__btn"
							aria-label="1分増やす"
							onclick={() => (minutesPerCheck = Math.min(60, safeMinutes + 1))}
						>
							<span class="material-symbols-rounded">add</span>
						</button>
					</div>
					<p class="pr-field__hint">
						移動・読み取り・システムへの記入までを含めた、1台あたりの時間です。
					</p>
				</div>

				<div class="pr-field">
					<label class="pr-count__label" for="locations-count">拠点数</label>
					<div class="pr-count__ctrl">
						<button
							type="button"
							class="pr-count__btn"
							aria-label="1拠点減らす"
							onclick={() => (locations = Math.max(1, safeLocations - 1))}
							disabled={safeLocations <= 1}
						>
							<span class="material-symbols-rounded">remove</span>
						</button>
						<input
							id="locations-count"
							type="number"
							min="1"
							max="100"
							step="1"
							inputmode="numeric"
							bind:value={locations}
						/>
						<span class="pr-count__unit">拠点</span>
						<button
							type="button"
							class="pr-count__btn"
							aria-label="1拠点増やす"
							onclick={() => (locations = Math.min(100, safeLocations + 1))}
						>
							<span class="material-symbols-rounded">add</span>
						</button>
					</div>
				</div>

				<div class="pr-field">
					<label class="pr-count__label" for="wage-input">時給（人件費の計算用）</label>
					<div class="pr-count__ctrl">
						<span class="pr-count__unit">¥</span>
						<input
							id="wage-input"
							class="pr-wage"
							type="number"
							min="0"
							step="1"
							inputmode="numeric"
							bind:value={wage}
						/>
						<span class="pr-count__unit">/時</span>
					</div>
					<p class="pr-field__hint">既定値は地域別最低賃金の全国加重平均（{yen(DEFAULT_HOURLY_WAGE)}）です。</p>
				</div>
			</div>

			<!-- 印刷専用: 入力フォームの代わりに出す「ご入力条件」の表。
			     画面の入力欄（.pr-count）は印刷時に非表示になる -->
			<div class="print-inputs">
				<h2>ご入力条件</h2>
				<table>
					<tbody>
						<tr>
							<th>業種</th>
							<td>{cfg.label}</td>
							<th>1拠点あたりのセンサー台数</th>
							<td>{num(safeCount)}台</td>
						</tr>
						<tr>
							<th>拠点数</th>
							<td>{num(safeLocations)}拠点</td>
							<th>合計センサー台数</th>
							<td>{num(totalCount)}台</td>
						</tr>
						<tr>
							<th>1日の記録回数</th>
							<td>{safeChecks}回/日</td>
							<th>記録1回あたりの時間</th>
							<td>{safeMinutes}分/台</td>
						</tr>
						<tr>
							<th>時給（人件費の計算用）</th>
							<td>{yen(safeWage)}/時</td>
							<th>出力日</th>
							<td>{printDate}</td>
						</tr>
					</tbody>
				</table>
			</div>

			{#if volumePrice}
				<!-- 1,001台以上: 金額は出さず、ボリューム価格の個別見積もりへ誘導 -->
				<div class="pr-soon" id="pr-volume" data-reveal>
					<span class="material-symbols-rounded">support_agent</span>
					<h2>この規模には、ボリューム価格をご用意しています。</h2>
					<p>
						1,001台以上の大規模導入は、構成に合わせた特別価格を個別にお見積もりします。
						台数とご利用環境をお聞かせください。
					</p>
					<a href="/contact" class="btn btn--accent btn--lg"
						>ボリューム価格を問い合わせる <span class="material-symbols-rounded">arrow_forward</span></a
					>
				</div>
			{:else}
			<!-- 月額（メインの答え） -->
			<div class="pr-hero" data-reveal>
				<span class="pr-hero__label">CropWatch のランニングコスト（月額・税込）</span>
				<strong class="pr-hero__value">{yen(monthly)}<small>/月</small></strong>
				<div class="pr-hero__subs">
					<span><b>{yen(daily)}</b> /日</span>
					<span><b>{yen(dailyPerUnit)}</b> /日・1台</span>
					<span><b>{yen(yearly)}</b> /年間</span>
				</div>
			</div>

			<!-- 手書き記録との比較 -->
			<div class="pr-compare" data-reveal>
				<h2 class="pr-card__title">
					<span class="material-symbols-rounded">compare_arrows</span> 手書き記録と比べると
				</h2>
				<div class="pr-compare__grid">
					<div class="pr-compare__col">
						<span class="pr-compare__label">手書き記録の人件費</span>
						<b class="pr-compare__value">{yen(manualMonthly)}<small>/月</small></b>
						<span class="pr-compare__note">
							{num(totalCount)}台 × {safeChecks}回/日 × {safeMinutes}分 ×
							時給{yen(safeWage)}（月{num(Math.round(manualHoursPerMonth))}時間分）
						</span>
					</div>
					<div class="pr-compare__col">
						<span class="pr-compare__label">CropWatch</span>
						<b class="pr-compare__value">{yen(monthly)}<small>/月</small></b>
						<span class="pr-compare__note">
							自動で10分ごとに記録。記録の抜けや書き間違いもゼロに。
						</span>
					</div>
					<div class="pr-compare__col pr-compare__col--result" class:is-negative={savingsMonthly < 0}>
						<span class="pr-compare__label">差額（節約できる金額）</span>
						<b class="pr-compare__value">{yen(savingsMonthly)}<small>/月</small></b>
						<span class="pr-compare__note">
							{#if savingsMonthly >= 0}
								年間で約 {yen(savingsYearly)} の削減。記録作業ゼロで、監査対応の記録が自動で残ります。
							{:else}
								この規模では手書きのほうが安く見えますが、記録漏れゼロ・24時間の異常通知・
								監査対応の自動記録という価値が加わります。
							{/if}
						</span>
					</div>
				</div>
				<p class="pr-note">
					手書き記録は、1台あたり{safeMinutes}分（移動・読み取り・記入を含む）×
					毎日{safeChecks}回、月30日として計算しています。
				</p>
			</div>

			<!-- ROI: 投資回収ラインチャート -->
			<div class="pr-roi" data-reveal>
				<h2 class="pr-card__title">
					<span class="material-symbols-rounded">show_chart</span> 投資回収（ROI）の見通し
				</h2>
				<p class="pr-roi__sub">
					導入費用の概算（{yen(roiInitial)}）と月額を合わせた累計費用を、手書き記録の人件費の累計と比べたものです。
				</p>
				<div class="pr-roi__legend">
					<span><i class="roi-key roi-key--manual"></i>手書き記録の人件費（累計）</span>
					<span><i class="roi-key roi-key--cw"></i>CropWatch（導入費用+月額の累計）</span>
				</div>
				<div
					class="pr-roi__chart"
					role="img"
					aria-label="累計費用の推移。CropWatchは導入費用{yen(roiInitial)}から始まり月{yen(monthly)}ずつ、手書き記録は月{yen(manualMonthly)}ずつ増えます。数値は下の表でも確認できます。"
					bind:clientWidth={chartW}
				>
					{#if chartW > 0}
						<svg
						width={chartW}
						height={CHART_H}
						viewBox="0 0 {chartW} {CHART_H}"
						aria-hidden="true"
					>
							{#each yTicks as t (t)}
								<line x1={PAD.left} x2={chartW - PAD.right} y1={yAt(t)} y2={yAt(t)} class="roi-grid" />
								<text x={PAD.left - 8} y={yAt(t) + 3.5} text-anchor="end" class="roi-tick"
									>{yenCompact(t)}</text
								>
							{/each}
							{#each xTicks as m (m)}
								<text x={xAt(m)} y={CHART_H - 8} text-anchor="middle" class="roi-tick"
									>{monthLabel(m)}</text
								>
							{/each}
							{#if hoverMonth !== null}
								<line
									x1={xAt(hoverMonth)}
									x2={xAt(hoverMonth)}
									y1={PAD.top}
									y2={PAD.top + plotH}
									class="roi-cross"
								/>
							{/if}
							<line
								x1={xAt(0)}
								y1={yAt(manualAt(0))}
								x2={xAt(roiMonths)}
								y2={yAt(manualAt(roiMonths))}
								class="roi-line roi-line--manual"
							/>
							<line
								x1={xAt(0)}
								y1={yAt(cwAt(0))}
								x2={xAt(roiMonths)}
								y2={yAt(cwAt(roiMonths))}
								class="roi-line roi-line--cw"
							/>
							{#if breakEvenMonths !== null && breakEvenMonths <= roiMonths}
								<circle
									cx={xAt(breakEvenMonths)}
									cy={yAt(cwAt(breakEvenMonths))}
									r="4.5"
									class="roi-be"
								/>
								<text
									x={xAt(breakEvenMonths) + (breakEvenMonths > roiMonths * 0.6 ? -10 : 10)}
									y={Math.max(yAt(cwAt(breakEvenMonths)) - 12, PAD.top + 12)}
									text-anchor={breakEvenMonths > roiMonths * 0.6 ? 'end' : 'start'}
									class="roi-be-label">約{Math.ceil(breakEvenMonths)}ヶ月で投資回収</text
								>
							{/if}
							{#if hoverMonth !== null}
								<circle
									cx={xAt(hoverMonth)}
									cy={yAt(manualAt(hoverMonth))}
									r="4"
									class="roi-dot roi-dot--manual"
								/>
								<circle
									cx={xAt(hoverMonth)}
									cy={yAt(cwAt(hoverMonth))}
									r="4"
									class="roi-dot roi-dot--cw"
								/>
							{/if}
							<!-- ホバーは補助情報（同じ数値は下の表にある）。svelteのa11y警告のみ抑止 -->
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<rect
								x="0"
								y="0"
								width={chartW}
								height={CHART_H}
								fill="transparent"
								onpointermove={roiMove}
								onpointerleave={() => (hoverMonth = null)}
							/>
						</svg>
						{#if hoverMonth !== null}
							<div
								class="roi-tip"
								class:roi-tip--flip={hoverMonth > roiMonths * 0.55}
								style="left:{xAt(hoverMonth)}px; top:{PAD.top}px;"
							>
								<b class="roi-tip__t">{hoverMonth === 0 ? '導入時' : `${hoverMonth}ヶ月後`}</b>
								<div class="roi-tip__row">
									<i class="roi-key roi-key--manual"></i>
									<b>{yen(manualAt(hoverMonth))}</b>
									<span>手書き記録</span>
								</div>
								<div class="roi-tip__row">
									<i class="roi-key roi-key--cw"></i>
									<b>{yen(cwAt(hoverMonth))}</b>
									<span>CropWatch</span>
								</div>
								{#if manualAt(hoverMonth) - cwAt(hoverMonth) > 0}
									<div class="roi-tip__diff">差額 {yen(manualAt(hoverMonth) - cwAt(hoverMonth))}</div>
								{/if}
							</div>
						{/if}
					{/if}
				</div>
				<p class="pr-note">
					{#if breakEvenMonths !== null}
						手書き記録との差額（月{yen(savingsMonthly)}）により、導入費用は約{Math.ceil(
							breakEvenMonths
						)}ヶ月で回収できる計算です。
					{:else}
						この条件では手書き記録のほうが安いため、費用面での回収ラインはありません。
					{/if}
				</p>
				<details class="pr-roi__table" bind:open={roiTableOpen}>
					<summary>数値を表で見る</summary>
					<div class="pr-roi__tablewrap">
						<table>
							<thead>
								<tr><th>経過</th><th>手書き記録</th><th>CropWatch</th><th>差額</th></tr>
							</thead>
							<tbody>
								{#each xTicks as m (m)}
									<tr>
										<th>{monthLabel(m)}</th>
										<td>{yen(manualAt(m))}</td>
										<td>{yen(cwAt(m))}</td>
										<td>{yen(manualAt(m) - cwAt(m))}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</details>
			</div>
			{/if}

			<!-- 月額に含まれるもの / 含まれないもの（業種プランごと） -->
			<div class="pr-includes" data-reveal>
				<span class="pr-includes__label">
					<span class="material-symbols-rounded">fact_check</span>
					{cfg.label}プランの月額に含まれるもの:
				</span>
				<ul class="pr-includes__list">
					{#each cfg.included as f (f)}
						<li class="pr-includes__item">
							<span class="material-symbols-rounded">check_circle</span>{f}
						</li>
					{/each}
					{#each cfg.excluded as f (f)}
						<li class="pr-includes__item pr-includes__item--out">
							<span class="material-symbols-rounded">cancel</span>{f}
						</li>
					{/each}
				</ul>
			</div>

		{/if}

		<!-- 仕切り + 導入費用の概算 -->
		<div class="pr-divider" role="separator" aria-label="導入費用の概算（初回のみ）">
			<span class="pr-divider__chip">
				<span class="material-symbols-rounded">sell</span> 導入費用の概算（初回のみ）
			</span>
		</div>

		<div id="pr-devices" class="pr-devices" data-reveal>
			<div class="pr-device">
				<span class="pr-device__ic"><span class="material-symbols-rounded">inventory_2</span></span>
				<div class="pr-device__tx">
					<b>導入セット（センサー{num(safeCount)}台）</b>
					<p>
						温湿度センサー{num(safeCount)}台・ゲートウェイ・初期導入サポート込みの、
						1拠点あたりの概算です。センサー1台からご利用いただけます。
					</p>
				</div>
				{#if volumePrice || deviceSetPrice === null}
					<strong class="pr-device__price pr-device__price--contact">お見積もり</strong>
				{:else}
					<strong class="pr-device__price">{yen(deviceSetPrice)}<small>税込・初回のみ・概算</small></strong>
				{/if}
			</div>
		</div>

		<p class="pr-note" data-reveal>
			導入費用は、「1拠点あたりのセンサー台数」に合わせて計算した概算（税込・初回のみ）です。機器の構成と価格は業種により異なります。正式な金額は個別にお見積もりします。
			CO₂センサー・土壌センサーなど他の機器はお問い合わせください。
		</p>

		<div class="pr-cta" data-reveal>
			<a href="/contact" class="btn btn--accent btn--lg"
				>見積もりを依頼する <span class="material-symbols-rounded">arrow_forward</span></a
			>
			<a href="/technology" class="btn btn--ghost btn--lg">CropWatch の強みを見る</a>
		</div>

		<div class="pr-share" data-reveal>
			<span class="pr-share__label">
				<span class="material-symbols-rounded">share</span>
				この計算結果を共有:
			</span>
			<button type="button" class="btn btn--ghost" onclick={copyShareLink}>
				<span class="material-symbols-rounded">{copied ? 'check' : 'content_copy'}</span>
				{copied ? 'コピーしました' : 'リンクをコピー'}
			</button>
			<button
				type="button"
				class="btn btn--ghost"
				onclick={() => {
					roiTableOpen = true;
					window.print();
				}}
			>
				<span class="material-symbols-rounded">print</span>
				印刷する
			</button>
		</div>

		<!-- 印刷専用フッター（画面では非表示） -->
		<p class="print-foot">
			<span class="print-foot__star">★</span>
			本書の金額はすべて概算の仮お見積もりです。正式なお見積もりではありません。
			正式な金額は、構成とご利用環境の確認後に別途ご案内します。
		</p>
	</div>
</section>

<style>
	/* ── ヒーロー背景: ごく薄いアイソメトリックのブロック柄 ── */
	.pagehero {
		position: relative;
		overflow: hidden;
	}
	.pagehero::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cg fill='none' stroke='%232c6cb7' stroke-width='1.5'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34'/%3E%3C/g%3E%3C/svg%3E");
		background-size: 63px 112.5px;
		opacity: 0.05;
		mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.35));
		-webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.35));
	}
	.pagehero__in {
		position: relative;
	}

	.pr-wrap {
		max-width: 880px;
	}

	/* ── 業種タブ ── */
	.pr-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-bottom: 24px;
	}
	.pr-tab {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font: inherit;
		font-size: 14px;
		font-weight: 700;
		color: var(--cw-ink);
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: 999px;
		padding: 10px 18px;
		cursor: pointer;
		box-shadow: var(--web-shadow-card);
		transition: border-color 0.18s ease, background 0.18s ease, color 0.18s ease;
	}
	.pr-tab .material-symbols-rounded {
		font-size: 19px;
		color: var(--web-accent);
	}
	.pr-tab:hover {
		border-color: var(--web-border-strong);
	}
	.pr-tab.is-active {
		background: var(--web-primary);
		border-color: var(--web-primary);
		color: #fff;
	}
	.pr-tab.is-active .material-symbols-rounded {
		color: #fff;
	}
	.pr-tab__soon {
		font-size: 10.5px;
		font-weight: 700;
		letter-spacing: 0.05em;
		color: var(--cw-gold-500, #f2a516);
		background: color-mix(in srgb, var(--cw-gold-400, #ffbb34) 18%, transparent);
		border: 1px solid color-mix(in srgb, var(--cw-gold-500, #f2a516) 40%, transparent);
		border-radius: 999px;
		padding: 2px 8px;
	}
	.pr-tab.is-active .pr-tab__soon {
		color: #fff;
		background: rgba(255, 255, 255, 0.16);
		border-color: rgba(255, 255, 255, 0.35);
	}

	/* ── 準備中カード ── */
	.pr-soon {
		text-align: center;
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: 18px;
		box-shadow: var(--web-shadow-card);
		padding: clamp(36px, 6vw, 64px) 22px;
		display: grid;
		justify-items: center;
		gap: 14px;
	}
	.pr-soon > .material-symbols-rounded {
		font-size: 44px;
		color: var(--web-accent);
	}
	.pr-soon h2 {
		margin: 0;
		font-size: clamp(20px, 2.6vw, 26px);
	}
	.pr-soon p {
		margin: 0;
		max-width: 44ch;
		font-size: 14.5px;
		line-height: 1.9;
		color: var(--web-muted);
	}

	/* ── 入力 ── */
	.pr-count {
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: 18px;
		box-shadow: var(--web-shadow-card);
		padding: 22px 24px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px 26px;
	}
	.pr-field {
		display: grid;
		gap: 10px;
		align-content: start;
	}
	.pr-field__hint {
		margin: 0;
		font-size: 12px;
		line-height: 1.7;
		color: var(--web-muted);
	}
	.pr-count__label {
		font-size: 14px;
		font-weight: 700;
		color: var(--cw-ink);
	}
	.pr-count__ctrl {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.pr-count__btn {
		width: 42px;
		height: 42px;
		display: grid;
		place-items: center;
		border-radius: 12px;
		border: 1px solid var(--web-border-strong);
		background: var(--web-bg-soft);
		color: var(--cw-ink);
		cursor: pointer;
		transition: background 0.15s ease, border-color 0.15s ease;
	}
	.pr-count__btn:hover:not(:disabled) {
		background: var(--web-primary-soft);
		border-color: var(--web-primary);
		color: var(--web-primary);
	}
	.pr-count__btn:disabled {
		opacity: 0.4;
		cursor: default;
	}
	.pr-count__ctrl input {
		width: 92px;
		text-align: center;
		font-family: var(--cw-font-mono);
		font-size: 19px;
		font-weight: 700;
		color: var(--cw-ink);
		padding: 8px 6px;
		border: 1px solid var(--web-border-strong);
		border-radius: 12px;
		background: #fff;
		-moz-appearance: textfield;
		appearance: textfield;
	}
	.pr-count__ctrl input.pr-wage {
		width: 116px;
	}
	.pr-count__ctrl input::-webkit-outer-spin-button,
	.pr-count__ctrl input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.pr-count__ctrl input:focus-visible {
		outline: 2px solid var(--web-primary);
		outline-offset: 1px;
	}
	.pr-count__unit {
		font-size: 14px;
		font-weight: 700;
		color: var(--web-muted);
	}

	/* ── 月額ヒーロー ── */
	.pr-hero {
		margin-top: 18px;
		background: var(--web-accent-soft);
		border: 1px solid color-mix(in srgb, var(--web-accent) 30%, transparent);
		border-radius: 18px;
		padding: 22px 26px;
		display: grid;
		gap: 6px;
	}
	.pr-hero__label {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.06em;
		color: var(--cw-emerald-700, #0a7a4d);
	}
	.pr-hero__value {
		font-family: var(--cw-font-mono);
		font-size: clamp(34px, 5vw, 46px);
		font-weight: 800;
		line-height: 1.05;
		color: var(--cw-emerald-700, #0a7a4d);
	}
	.pr-hero__value small {
		font-size: 16px;
		font-weight: 700;
	}
	.pr-hero__subs {
		display: flex;
		flex-wrap: wrap;
		gap: 6px 22px;
		margin-top: 4px;
		font-size: 13px;
		color: var(--cw-ink);
	}
	.pr-hero__subs b {
		font-family: var(--cw-font-mono);
	}

	/* ── 手書き比較 ── */
	.pr-compare {
		margin-top: 22px;
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: 18px;
		box-shadow: var(--web-shadow-card);
		padding: 22px 24px;
	}
	.pr-compare__grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 14px;
	}
	.pr-compare__col {
		background: var(--web-bg-soft);
		border: 1px solid var(--web-border);
		border-radius: 14px;
		padding: 16px 18px;
		display: grid;
		gap: 6px;
		align-content: start;
	}
	.pr-compare__label {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: var(--web-muted);
	}
	.pr-compare__value {
		font-family: var(--cw-font-mono);
		font-size: clamp(20px, 2.6vw, 26px);
		font-weight: 800;
		color: var(--cw-ink);
		line-height: 1.1;
	}
	.pr-compare__value small {
		font-size: 12px;
		font-weight: 700;
		color: var(--web-muted);
	}
	.pr-compare__note {
		font-size: 12px;
		line-height: 1.7;
		color: var(--web-muted);
	}
	.pr-compare__col--result {
		background: var(--web-accent-soft);
		border-color: color-mix(in srgb, var(--web-accent) 30%, transparent);
	}
	.pr-compare__col--result .pr-compare__label,
	.pr-compare__col--result .pr-compare__value {
		color: var(--cw-emerald-700, #0a7a4d);
	}
	.pr-compare__col--result.is-negative {
		background: var(--web-bg-soft);
		border-color: var(--web-border-strong);
	}
	.pr-compare__col--result.is-negative .pr-compare__label,
	.pr-compare__col--result.is-negative .pr-compare__value {
		color: var(--cw-ink);
	}

	/* ── 見出し・注記（比較カードで使用） ── */
	.pr-card__title {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 17px;
		margin: 0 0 14px;
		color: var(--cw-ink);
	}
	.pr-card__title .material-symbols-rounded {
		font-size: 21px;
		color: var(--web-accent);
	}
	.pr-note {
		margin: 12px 0 0;
		font-size: 12.5px;
		line-height: 1.8;
		color: var(--web-muted);
	}
	/* ── 仕切り + 機器価格 ── */
	.pr-divider {
		display: flex;
		align-items: center;
		gap: 18px;
		margin: 36px 0 22px;
	}
	.pr-divider::before,
	.pr-divider::after {
		content: '';
		flex: 1;
		height: 2px;
		border-radius: 2px;
	}
	.pr-divider::before {
		background: linear-gradient(90deg, transparent, var(--web-border-strong));
	}
	.pr-divider::after {
		background: linear-gradient(90deg, var(--web-border-strong), transparent);
	}
	.pr-divider__chip {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		font-size: 13.5px;
		font-weight: 800;
		letter-spacing: 0.04em;
		color: var(--web-primary);
		background: var(--web-primary-soft);
		border: 1px solid color-mix(in srgb, var(--web-primary) 30%, transparent);
		border-radius: 999px;
		padding: 8px 16px;
		white-space: nowrap;
	}
	.pr-divider__chip .material-symbols-rounded {
		font-size: 18px;
	}
	.pr-device {
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: 16px;
		box-shadow: var(--web-shadow-card);
		padding: 18px 20px;
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 12px 16px;
	}
	.pr-device > * {
		min-width: 0;
	}
	.pr-device__ic {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: 12px;
		background: var(--web-primary-soft);
		color: var(--web-primary);
	}
	.pr-device__ic .material-symbols-rounded {
		font-size: 24px;
	}
	.pr-device__tx b {
		font-size: 15px;
		color: var(--cw-ink);
	}
	.pr-device__tx p {
		margin: 6px 0 0;
		font-size: 12.5px;
		line-height: 1.7;
		color: var(--web-muted);
	}
	.pr-device__price {
		font-family: var(--cw-font-mono);
		font-size: 22px;
		font-weight: 800;
		color: var(--cw-ink);
	}
	.pr-device__price small {
		display: block;
		margin-top: 2px;
		font-size: 11px;
		font-weight: 700;
		color: var(--web-muted);
		white-space: nowrap;
	}
	.pr-device__price--contact {
		font-family: inherit;
		font-size: 18px;
		color: var(--web-primary);
	}

	/* ── ROI（投資回収）ラインチャート ── */
	.pr-roi {
		margin-top: 22px;
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: 18px;
		box-shadow: var(--web-shadow-card);
		padding: 22px 24px;
	}
	.pr-roi__sub {
		margin: -6px 0 12px;
		font-size: 13px;
		line-height: 1.8;
		color: var(--web-muted);
	}
	.pr-roi__legend {
		display: flex;
		flex-wrap: wrap;
		gap: 6px 18px;
		margin-bottom: 6px;
		font-size: 12.5px;
		font-weight: 700;
		color: var(--web-muted);
	}
	.pr-roi__legend span {
		display: inline-flex;
		align-items: center;
		gap: 7px;
	}
	.roi-key {
		display: inline-block;
		width: 16px;
		height: 0;
		border-top: 2px solid;
		border-radius: 2px;
	}
	.roi-key--cw {
		border-color: var(--cw-emerald-500);
	}
	.roi-key--manual {
		border-color: var(--cw-sapphire-500);
	}
	.pr-roi__chart {
		position: relative;
	}
	.pr-roi__chart svg {
		display: block;
	}
	.roi-grid {
		stroke: var(--cw-gray-200);
		stroke-width: 1;
	}
	.roi-tick {
		font-size: 11px;
		fill: var(--web-muted);
	}
	.roi-line {
		fill: none;
		stroke-width: 2;
		stroke-linecap: round;
	}
	.roi-line--cw {
		stroke: var(--cw-emerald-500);
	}
	.roi-line--manual {
		stroke: var(--cw-sapphire-500);
	}
	.roi-cross {
		stroke: var(--cw-gray-300);
		stroke-width: 1;
	}
	.roi-be {
		fill: var(--cw-emerald-500);
		stroke: var(--web-surface);
		stroke-width: 2;
	}
	.roi-be-label {
		font-size: 12px;
		font-weight: 700;
		fill: var(--cw-ink);
	}
	.roi-dot {
		stroke: var(--web-surface);
		stroke-width: 2;
	}
	.roi-dot--cw {
		fill: var(--cw-emerald-500);
	}
	.roi-dot--manual {
		fill: var(--cw-sapphire-500);
	}
	.roi-tip {
		position: absolute;
		transform: translateX(12px);
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: 10px;
		box-shadow: var(--web-shadow-card);
		padding: 10px 12px;
		pointer-events: none;
		white-space: nowrap;
		z-index: 2;
	}
	.roi-tip--flip {
		transform: translateX(calc(-100% - 12px));
	}
	.roi-tip__t {
		display: block;
		font-size: 11.5px;
		color: var(--web-muted);
		margin-bottom: 6px;
	}
	.roi-tip__row {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 12.5px;
	}
	.roi-tip__row + .roi-tip__row {
		margin-top: 4px;
	}
	.roi-tip__row b {
		font-family: var(--cw-font-mono);
		font-size: 13px;
		color: var(--cw-ink);
	}
	.roi-tip__row span {
		color: var(--web-muted);
		font-size: 11.5px;
	}
	.roi-tip__diff {
		margin-top: 6px;
		padding-top: 6px;
		border-top: 1px dashed var(--web-border);
		font-size: 12px;
		font-weight: 700;
		color: var(--cw-emerald-600);
	}
	.pr-roi__table {
		margin-top: 10px;
	}
	.pr-roi__table summary {
		font-size: 12.5px;
		font-weight: 700;
		color: var(--web-muted);
		cursor: pointer;
	}
	.pr-roi__tablewrap {
		overflow-x: auto;
	}
	.pr-roi__table table {
		width: 100%;
		min-width: 420px;
		margin-top: 10px;
		border-collapse: collapse;
		font-size: 12.5px;
	}
	.pr-roi__table th,
	.pr-roi__table td {
		padding: 6px 10px;
		border-bottom: 1px solid var(--web-border);
		text-align: right;
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}
	.pr-roi__table thead th {
		color: var(--web-muted);
		font-size: 11.5px;
	}
	.pr-roi__table tbody th {
		text-align: left;
		color: var(--web-muted);
		font-weight: 700;
	}

	/* ── 月額に含まれるもの ── */
	.pr-includes {
		margin-top: 14px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px 12px;
	}
	.pr-includes__label {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
		font-weight: 700;
		color: var(--web-muted);
	}
	.pr-includes__label .material-symbols-rounded {
		font-size: 17px;
		color: var(--web-accent);
	}
	.pr-includes__list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.pr-includes__item {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 12.5px;
		font-weight: 700;
		color: var(--cw-ink);
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: 999px;
		padding: 6px 12px;
	}
	.pr-includes__item .material-symbols-rounded {
		font-size: 16px;
		color: var(--web-accent);
	}
	.pr-includes__item--out {
		color: var(--web-muted);
		background: var(--web-bg-soft);
	}
	.pr-includes__item--out .material-symbols-rounded {
		color: var(--web-muted);
	}

	.pr-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
		margin-top: 24px;
	}
	.pr-share {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px 14px;
		margin-top: 18px;
		padding-top: 18px;
		border-top: 1px dashed var(--web-border);
	}
	.pr-share__label {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 13px;
		font-weight: 700;
		color: var(--web-muted);
	}
	.pr-share__label .material-symbols-rounded {
		font-size: 18px;
	}

	/* ── 印刷（お客様レビュー用の仮見積もり） ── */
	.print-head,
	.print-foot,
	.print-inputs {
		display: none;
	}
	@media print {
		/* サイトのヘッダー/フッター/パンくず/操作UIは印刷しない */
		:global(header.hdr),
		:global(footer.ftr) {
			display: none !important;
		}
		.crumb,
		.pagehero,
		.pr-tabs,
		.pr-cta,
		.pr-share,
		.pr-count {
			display: none !important;
		}
		/* スクロール連動の出現アニメーションを無効化（未表示のまま印刷されるのを防ぐ） */
		[data-reveal] {
			opacity: 1 !important;
			transform: none !important;
			transition: none !important;
		}
		/* CropWatchの印刷用ヘッダー */
		.print-head {
			display: flex;
			align-items: center;
			gap: 14px;
			padding-bottom: 14px;
			margin-bottom: 18px;
			border-bottom: 2px solid var(--cw-ink);
		}
		.print-head__logo {
			width: 46px;
			height: auto;
		}
		.print-head__tx b {
			display: block;
			font-size: 18px;
			color: var(--cw-ink);
		}
		.print-head__tx span {
			font-size: 12px;
			color: var(--web-muted);
		}
		.print-head__meta {
			margin-left: auto;
			display: grid;
			gap: 2px;
			justify-items: end;
			font-size: 11.5px;
			color: var(--web-muted);
		}
		/* 入力フォームの代わりの「ご入力条件」レポート表 */
		.print-inputs {
			display: block;
			break-inside: avoid;
			margin-bottom: 16px;
		}
		.print-inputs h2 {
			margin: 0 0 8px;
			font-size: 14px;
			color: var(--cw-ink);
		}
		.print-inputs table {
			width: 100%;
			border-collapse: collapse;
			font-size: 12px;
		}
		.print-inputs th,
		.print-inputs td {
			border: 1px solid var(--web-border);
			padding: 6px 10px;
			text-align: left;
		}
		.print-inputs th {
			width: 24%;
			background: var(--web-bg-soft);
			color: var(--web-muted);
			font-weight: 700;
		}
		.print-inputs td {
			width: 26%;
			color: var(--cw-ink);
			font-weight: 700;
			font-variant-numeric: tabular-nums;
		}

		/* ★つきの注記フッター */
		.print-foot {
			display: flex;
			align-items: flex-start;
			gap: 8px;
			margin-top: 20px;
			padding-top: 12px;
			border-top: 1px solid var(--web-border);
			font-size: 11.5px;
			line-height: 1.8;
			color: var(--web-muted);
		}
		.print-foot__star {
			font-size: 13px;
			line-height: 1.6;
			color: var(--cw-ink);
		}
		/* 小さいカードだけ途中改ページを避ける。背の高いカード（入力・比較・ROI）に
		   指定すると、1ページに収まらないとき丸ごと次ページへ飛んだり末尾が切れたり
		   するため、あえて分割を許す */
		.pr-hero,
		.pr-device,
		.pr-includes {
			break-inside: avoid;
		}
		/* 数値表はトグルUIを隠してそのまま表として出す */
		.pr-roi__table summary {
			display: none;
		}
		/* 画面幅で測ったSVGを印刷幅に収める（viewBoxがあるので比率ごと縮小される） */
		.pr-roi__chart svg {
			max-width: 100%;
			height: auto;
		}
		/* 余白と縮尺を詰めて、なるべく少ないページ数に収める */
		:global(.section) {
			padding-block: 8px;
		}
		.pr-wrap {
			zoom: 0.88;
		}
		.pr-compare,
		.pr-roi,
		.pr-includes {
			margin-top: 14px;
		}
	}

	/* screen限定: 印刷時はA4の紙幅(約700px)でこのモバイル用1カラムが発動して
	   縦に伸びてしまうため、画面表示のときだけ適用する */
	@media screen and (max-width: 720px) {
		.pr-count {
			grid-template-columns: 1fr;
		}
		.pr-compare__grid {
			grid-template-columns: 1fr;
		}
		.pr-device {
			grid-template-columns: auto 1fr;
		}
		.pr-device__price {
			grid-column: 1 / -1;
		}
		.pr-compare {
			padding: 18px 16px;
		}
	}
</style>
