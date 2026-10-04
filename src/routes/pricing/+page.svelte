<script lang="ts">
	import { flushSync, onMount } from 'svelte';
	import { afterNavigate, replaceState } from '$app/navigation';
	import Seo from '$lib/components/Seo.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { productSchema } from '$lib/seo/schema';
	import { absUrl } from '$lib/seo/site';

	/* ══════════════════════════════════════════════════════════════════
	   料金の設定値（すべて税抜・円）- ここを編集すれば表全体が変わります。
	   業種タブごとに シート月額 / 手動記録1回あたりの分数 /
	   既定値 を設定できます。comingSoon: true のタブは「準備中」カードを
	   表示します。
	   ══════════════════════════════════════════════════════════════════ */
	type Sector = {
		label: string;
		icon: string;
		/** センサーの表示名（明細テーブルに出ます） */
		sensorLabel: string;
		/** 1シート（センサー1台分の利用枠）あたりの月額利用料（税抜） */
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
		/** 機器1台あたりの購入価格（税抜・初回のみ）。未定なら null（「お見積もり」表示） */
		deviceUnitPrice: number | null;
		/** 導入セットに含まれるセンサーの表示名（導入費用カードに出ます） */
		deviceLabel: string;
		/** 導入費用の注記の末尾に出す、機器構成に関する案内文 */
		deviceNote: string;
		/** 節約額の下に出す、通知で守れるもの（ひと目で読める短い言葉） */
		saveLine: string;
		comingSoon?: boolean;
	};
	/**
	 * 1契約あたりの最低シート数。シート = センサー1台をつなぐ月額の利用枠。
	 * センサーは1台から買えるが、月額は最低この数のシート分になる。
	 */
	const MIN_SEATS = 3;
	/** 消費税率。価格はすべて税抜で持ち、表示時に（税込 ¥…）を添える。 */
	const TAX_RATE_PERCENT = 10;
	const SECTORS: Record<string, Sector> = {
		'cold-chain': {
			label: 'コールドチェーン',
			icon: 'ac_unit',
			sensorLabel: '温湿度センサー利用料',
			sensorFee: 800,
			minutesPerCheck: 3,
			defaultCount: 10,
			defaultChecks: 3,
			defaultLocations: 1,
			included: [
				'10分ごとの自動記録',
				'スマホ・PCで確認',
				'プッシュ通知',
				'メール通知',
				'ユーザー数無制限',
				'CSVダウンロード',
				'API利用',
				'データ保存2年間',
				'複数拠点の一括管理'
			],
			excluded: [],
			deviceUnitPrice: 32000,
			deviceLabel: '温湿度センサー',
			deviceNote: 'CO₂センサー・土壌センサーなど他の機器はお問い合わせください。',
			saveLine: '食品ロスを防ぐ'
		},
		livestock: {
			label: '畜産・養鶏',
			icon: 'pets',
			sensorLabel: '温湿度・CO₂センサー利用料',
			sensorFee: 800,
			minutesPerCheck: 10,
			defaultCount: 2,
			defaultChecks: 3,
			defaultLocations: 3,
			// 料金・機能ともコールドチェーンと同一プラン（機器のみCO₂つきで異なる）。
			included: [
				'10分ごとの自動記録',
				'スマホ・PCで確認',
				'プッシュ通知',
				'メール通知',
				'ユーザー数無制限',
				'CSVダウンロード',
				'API利用',
				'データ保存2年間',
				'複数拠点の一括管理'
			],
			excluded: [],
			// 畜産・養鶏向けの機器はコールドチェーンの1台価格 +6,000円（CO₂センサー分）
			deviceUnitPrice: 39000,
			deviceLabel: '温湿度・CO₂センサー',
			deviceNote:
				'温湿度センサーのみ（CO₂なし）のご利用をご希望の場合は、個別にお見積もりしますのでお問い合わせください。',
			saveLine: '鶏の熱中症を防ぐ'
		},
		agriculture: {
			label: '農業・ハウス',
			icon: 'eco',
			sensorLabel: '',
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
			deviceLabel: '温湿度センサー',
			deviceNote: 'CO₂センサー・土壌センサーなど他の機器はお問い合わせください。',
			saveLine: '',
			comingSoon: true
		}
	};
	/** 時給の既定値: 地域別最低賃金の全国加重平均（令和7年度）。 */
	const DEFAULT_HOURLY_WAGE = 1121;
	/** 「1日あたり」の計算に使う年間日数（月あたりは30日）。 */
	const DAYS_PER_YEAR = 360;

	/** 自動レポート（オプション）の月額（税抜）。1契約あたり。 */
	const REPORT_FEE = 3500;
	/** SMS通知（オプション）の1通あたりの料金（税抜） */
	const SMS_FEE = 20;
	/** SMS通数の既定値・上限（月あたり） */
	const DEFAULT_SMS = 20;
	const MAX_SMS = 10000;
	/** 1拠点あたりのゲートウェイ・初期導入サポートの概算価格（税抜） */
	const DEVICE_BASE_PRICE = 100000;

	/** 税込金額（1円未満切り捨て）。整数演算なので 800 → 880 のように誤差が出ない。 */
	const withTax = (v: number) => Math.floor((v * (100 + TAX_RATE_PERCENT)) / 100);

	/** 構造化データ用の最低構成価格（センサー1台 + ゲートウェイ、税込） */
	const DEVICE_MIN_PRICE = withTax(SECTORS['cold-chain'].deviceUnitPrice! + DEVICE_BASE_PRICE);
	/* ══════════════════════════════════════════════════════════════════ */

	const SECTOR_IDS = Object.keys(SECTORS);
	let sector = $state('cold-chain');
	const cfg = $derived(SECTORS[sector]);

	let count = $state(SECTORS['cold-chain'].defaultCount);
	let checksPerDay = $state(SECTORS['cold-chain'].defaultChecks);
	let locations = $state(SECTORS['cold-chain'].defaultLocations);
	let minutesPerCheck = $state(SECTORS['cold-chain'].minutesPerCheck);
	let wage = $state(DEFAULT_HOURLY_WAGE);
	let report = $state(false);
	let smsOn = $state(false);
	let smsCount = $state(DEFAULT_SMS);

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
		report = sp.get('report') === '1';
		readNum(
			'sms',
			(v) => {
				smsOn = true;
				smsCount = Math.floor(v);
			},
			1,
			MAX_SMS
		);
	});

	// replaceState はルーター初期化後でないと呼べないため、
	// 初回ナビゲーション完了(afterNavigate)を待ってから同期を開始する。
	afterNavigate(() => (urlSyncReady = true));

	const safeCount = $derived(Number.isFinite(count) && count >= 1 ? Math.floor(count) : 1);
	const safeSms = $derived(
		Number.isFinite(smsCount) && smsCount >= 1 ? Math.min(Math.floor(smsCount), MAX_SMS) : 1
	);
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
	/** 月額で請求するシート数: センサー台数。ただし最低 MIN_SEATS。 */
	const seats = $derived(Math.max(MIN_SEATS, totalCount));

	/** 1拠点あたり1,001台以上はボリューム価格の個別見積もり（計算結果の金額は表示しない） */
	const volumePrice = $derived(safeCount >= 1001);

	// ── 導入費用の概算（1拠点あたり・初回のみ）── 「1拠点あたりのセンサー台数」に連動。
	// 機器価格が未定の業種（deviceUnitPrice: null）は null → 「お見積もり」表示。
	const deviceSetPrice = $derived(
		cfg.deviceUnitPrice === null ? null : safeCount * cfg.deviceUnitPrice + DEVICE_BASE_PRICE
	);
	/** 内訳: センサー本体（全拠点分）とゲートウェイ（全拠点分） */
	const sensorDeviceTotal = $derived((cfg.deviceUnitPrice ?? 0) * totalCount);
	const gatewayTotal = $derived(DEVICE_BASE_PRICE * safeLocations);

	// ── CropWatch のランニングコスト（税抜で計算し、表示時に税込を添える） ──
	const sensorFeeTotal = $derived(cfg.sensorFee * seats);
	const reportFeeTotal = $derived(report ? REPORT_FEE : 0);
	const smsFeeTotal = $derived(smsOn ? SMS_FEE * safeSms : 0);
	const monthlyExTax = $derived(sensorFeeTotal + reportFeeTotal + smsFeeTotal);
	/** 実際に支払う月額（税込）。手書き記録との比較・ROI はこちらを使う。 */
	const monthly = $derived(withTax(monthlyExTax));
	const yearlyExTax = $derived(monthlyExTax * 12);
	const dailyExTax = $derived(Math.round(yearlyExTax / DAYS_PER_YEAR));
	const dailyPerUnitExTax = $derived(
		Math.round(yearlyExTax / DAYS_PER_YEAR / Math.max(totalCount, 1))
	);

	// ── 手動記録の人件費（毎日、全台数を1回ずつ記録する場合） ──
	const manualHoursPerMonth = $derived((totalCount * safeChecks * safeMinutes * 30) / 60);
	const manualMonthly = $derived(Math.round(manualHoursPerMonth * safeWage));
	const manualYearly = $derived(manualMonthly * 12);

	// ── 比較 ──
	const savingsMonthly = $derived(manualMonthly - monthly);
	const savingsYearly = $derived(savingsMonthly * 12);

	const yen = (v: number) => (v < 0 ? '-' : '') + '¥' + Math.abs(v).toLocaleString('ja-JP');
	/** 文字列用: 「¥32,000（税込 ¥35,200）」 */
	const yenTax = (v: number) => `${yen(v)}（税込 ${yen(withTax(v))}）`;
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
	const roiInitial = $derived(withTax((deviceSetPrice ?? 0) * safeLocations));
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
	const xTickStep = $derived(roiMonths <= 42 ? (chartW < 480 ? 12 : 6) : chartW < 480 ? 24 : 12);
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
	/** beforeprint直後にブラウザが印刷用スナップショットを取るため、Svelteの
	    非同期更新を待たずに open 属性を同期反映させる */
	function openRoiTableForPrint() {
		flushSync(() => (roiTableOpen = true));
	}
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
			wage: String(safeWage),
			...(report ? { report: '1' } : {}),
			...(smsOn ? { sms: String(safeSms) } : {})
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
		'CropWatchの料金シミュレーション。センサー台数・記録回数・拠点数・時給を入力すると、月額のランニングコストと、手書き記録の人件費との比較をその場で計算します。月額は1シートあたり800円（税込880円）、最低3シートから。ユーザー数無制限・アラート通知・API込み、自動レポート（無制限）は月額3,500円（税込3,850円）のオプション。';

	// 最低構成価格つきのProduct（AggregateOfferがあることでリッチリザルト対象になる）。
	// lowPrice はシミュレーターの表示と同じ定数から導出している。
	const ld = productSchema({
		name: 'CropWatch センサー導入セット',
		description:
			'温湿度センサー・LoRaWAN®ゲートウェイ・初期導入サポートをまとめた導入セット。センサー3台から、台数に応じた概算価格を表示します。',
		path: '/pricing',
		category: '環境監視機器',
		lowPrice: DEVICE_MIN_PRICE,
		offerUrl: '/pricing'
	});
</script>

<Seo {title} {description} />
<JsonLd data={ld} />

<!-- 印刷時（Ctrl+P含む）はROIの数値表を開いた状態で出力する -->
<svelte:window onbeforeprint={openRoiTableForPrint} />

<Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '料金' }]} />

<!-- 価格表示: 税抜の金額に（税込 ¥…）を添える -->
{#snippet taxed(v: number)}{yen(v)}<small class="pr-tax">（税込 {yen(withTax(v))}）</small
	>{/snippet}

<section class="pagehero">
	<div class="wrap pagehero__in" data-reveal>
		<p class="eyebrow"><span class="material-symbols-rounded">payments</span> 料金</p>
		<h1>費用対効果（ROI）の試算</h1>
		<p class="hero__kicker">
			高い信頼性が求められる現場のために設計された、産業グレードのセンサー。<br />
			リアルタイム監視とアラートで、<span class="u">時間と商品のロス</span>を防ぎます。
		</p>
		<p class="pr-hero-sub">台数を入れるだけで、月額料金とコスト削減の目安がわかります。</p>
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

		<!-- 価格の目安（業種タブに連動） -->
		{#if !cfg.comingSoon}
			<ul class="pr-prices" aria-label="{cfg.label}の価格" data-reveal>
				<li>
					<span class="pr-prices__label">センサー本体</span>
					<b class="pr-prices__value">
						{#if cfg.deviceUnitPrice === null}お見積もり{:else}{yen(cfg.deviceUnitPrice)}<small
								>/台</small
							>{/if}
					</b>
					{#if cfg.deviceUnitPrice !== null}
						<span class="pr-prices__tax">（税込 {yen(withTax(cfg.deviceUnitPrice))}）</span>
					{/if}
					<ul class="pr-prices__perks">
						<li>
							<span class="material-symbols-rounded fill" aria-hidden="true">verified</span
							>ISO17025認証3点温度校正証明書付き
						</li>
						<li>
							<span class="material-symbols-rounded fill" aria-hidden="true">shield</span
							>3年間のハードウェア保証
						</li>
					</ul>
				</li>
				<li>
					<span class="pr-prices__label">月額利用料</span>
					<b class="pr-prices__value">{yen(cfg.sensorFee)}<small>/シート・月</small></b>
					<span class="pr-prices__tax">（税込 {yen(withTax(cfg.sensorFee))}）</span>
					<div class="pr-prices__foot">
						<span class="pr-prices__foot-label">最低{MIN_SEATS}シートの月額</span>
						<b class="pr-prices__foot-value"
							>{@render taxed(cfg.sensorFee * MIN_SEATS)}<small>/月</small></b
						>
					</div>
				</li>
				<li class="pr-prices__min">
					<span class="pr-prices__label">最低契約数</span>
					<b class="pr-prices__value">{MIN_SEATS}<small>シートから</small></b>
					<span class="pr-prices__note">センサーは1台からOK</span>
					<!-- シートの説明: 「センサー3台」と誤解されないよう、短い文と例で見せる -->
					<div class="pr-prices__foot">
						<b class="pr-seatmini__q">「シート」とは？</b>
						<span class="pr-seatmini__a">センサー1台につき1シートの、月ごとの利用枠です。</span>
						<ul class="pr-seatmini__ex" aria-label="例">
							<li>1台 → <b>3シート</b></li>
							<li>2台 → <b>3シート</b></li>
							<li>5台 → <b>5シート</b></li>
						</ul>
					</div>
				</li>
			</ul>
		{/if}

		<!-- ① 条件を入れる -->
		<h2 class="pr-step pr-step--input"><span class="pr-step__n">1</span>条件を入れる</h2>
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
			<!-- 入力: センサー台数 / 手書き記録（比較用） -->
			<div class="pr-count" data-reveal>
				<div class="pr-card">
					<span class="pr-card__label">センサーの台数</span>
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
								autofocus
								id="sensor-count"
								type="number"
								min="1"
								max="1001"
								step="1"
								inputmode="numeric"
								bind:value={count}
							/>
							<button
								type="button"
								class="pr-count__btn"
								aria-label="1台増やす"
								onclick={() => (count = Math.min(1001, safeCount + 1))}
							>
								<span class="material-symbols-rounded">add</span>
							</button>
							<span class="pr-count__unit">台</span>
						</div>
						<p class="pr-field__hint pr-field__hint--full">
							センサーは1台からOK。月額は最低{MIN_SEATS}シート分です。
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
							<button
								type="button"
								class="pr-count__btn"
								aria-label="1拠点増やす"
								onclick={() => (locations = Math.min(100, safeLocations + 1))}
							>
								<span class="material-symbols-rounded">add</span>
							</button>
							<span class="pr-count__unit">拠点</span>
						</div>
					</div>
				</div>

				<div class="pr-card">
					<span class="pr-card__label">いまの手書き記録（比較用）</span>
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
							<button
								type="button"
								class="pr-count__btn"
								aria-label="1回増やす"
								onclick={() => (checksPerDay = Math.min(24, safeChecks + 1))}
							>
								<span class="material-symbols-rounded">add</span>
							</button>
							<span class="pr-count__unit">回/日</span>
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
							<button
								type="button"
								class="pr-count__btn"
								aria-label="1分増やす"
								onclick={() => (minutesPerCheck = Math.min(60, safeMinutes + 1))}
							>
								<span class="material-symbols-rounded">add</span>
							</button>
							<span class="pr-count__unit">分/台</span>
						</div>
					</div>
					<div class="pr-field">
						<label class="pr-count__label" for="wage-input">時給</label>
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
					</div>
					<p class="pr-field__hint">
						1回の時間は移動・読み取り・記入を含みます。時給の既定値は地域別最低賃金の全国加重平均（{yen(
							DEFAULT_HOURLY_WAGE
						)}）です。
					</p>
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
							<th>自動レポート</th>
							<td>{report ? `あり ${yenTax(REPORT_FEE)}/月` : 'なし'}</td>
						</tr>
						<tr>
							<th>SMS通知</th>
							<td>{smsOn ? `${num(safeSms)}通/月 ${yenTax(smsFeeTotal)}/月` : 'なし'}</td>
							<th>月額のシート数</th>
							<td>{num(seats)}シート</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- ② 月々の費用と節約額 -->
			<h2 class="pr-step"><span class="pr-step__n">2</span>月々の費用と削減効果</h2>
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
						>ボリューム価格を問い合わせる <span class="material-symbols-rounded">arrow_forward</span
						></a
					>
				</div>
			{:else}
				<div class="pr-result" data-reveal>
					<div class="pr-result__main">
						<div class="pr-result__col">
							<span class="pr-result__label">CropWatch の月額</span>
							<strong class="pr-result__value">{yen(monthlyExTax)}<small> /月</small></strong>
							<span class="pr-result__tax">（税込 {yen(monthly)}）</span>
							<!-- 内訳: 文章ではなく「項目 / 金額」の行で見せる -->
							<dl class="pr-receipt">
								<div>
									<dt>
										シート <span class="pr-receipt__qty">{num(seats)}</span>
										{#if seats > totalCount}
											<small class="pr-receipt__why"
												>センサー{num(totalCount)}台・最低{MIN_SEATS}シート</small
											>
										{/if}
									</dt>
									<dd>{@render taxed(sensorFeeTotal)}</dd>
								</div>
								{#if report}
									<div>
										<dt>レポート</dt>
										<dd>{@render taxed(REPORT_FEE)}</dd>
									</div>
								{/if}
								{#if smsOn}
									<div>
										<dt>SMS <span class="pr-receipt__qty">{num(safeSms)}通</span></dt>
										<dd>{@render taxed(smsFeeTotal)}</dd>
									</div>
								{/if}
							</dl>
							<ul class="pr-tiles">
								<li><span>1日あたり総額</span><b>{@render taxed(dailyExTax)}</b></li>
								<li><span>1台1日あたり</span><b>{@render taxed(dailyPerUnitExTax)}</b></li>
								<li><span>1年総額</span><b>{@render taxed(yearlyExTax)}</b></li>
							</ul>
						</div>
						<div class="pr-result__col pr-result__col--save" class:is-negative={savingsMonthly < 0}>
							{#if savingsMonthly >= 0}
								<span class="pr-result__label">手書き記録より</span>
								<strong class="pr-result__value"
									>{yen(savingsMonthly)}<small> /月のコスト減</small></strong
								>
								<div class="pr-yearsave">
									<span>1年で</span>
									<b>{yen(savingsYearly)}</b>
									<span>のコスト減</span>
								</div>
								<ul class="pr-pills">
									<li>
										<span class="material-symbols-rounded fill">check_circle</span>記録の手間ゼロ
									</li>
									{#if cfg.saveLine}
										<li>
											<span class="material-symbols-rounded fill">notifications_active</span
											>{cfg.saveLine}
										</li>
									{/if}
									<li>
										<span class="material-symbols-rounded fill">fact_check</span>監査がスムーズに
									</li>
									<li><span class="material-symbols-rounded fill">bolt</span>異常にすぐ気づく</li>
								</ul>
							{:else}
								<span class="pr-result__label">手書き記録との差額</span>
								<strong class="pr-result__value">{yen(savingsMonthly)}<small> /月</small></strong>
								<ul class="pr-pills">
									<li>
										<span class="material-symbols-rounded fill">check_circle</span>記録もれゼロ
									</li>
									<li>
										<span class="material-symbols-rounded fill">notifications_active</span
										>24時間アラート
									</li>
									<li>
										<span class="material-symbols-rounded fill">verified</span>監査用の記録が残る
									</li>
								</ul>
							{/if}
						</div>
					</div>
					<div class="pr-bars">
						<div class="pr-bar">
							<span>手書き記録</span>
							<span class="pr-bar__track"
								><i
									class="pr-bar__fill pr-bar__fill--manual"
									style="width:{(manualMonthly / Math.max(manualMonthly, monthly, 1)) * 100}%"
								></i></span
							>
							<b>{yen(manualMonthly)}</b>
						</div>
						<div class="pr-bar">
							<span>CropWatch</span>
							<span class="pr-bar__track"
								><i
									class="pr-bar__fill pr-bar__fill--cw"
									style="width:{(monthly / Math.max(manualMonthly, monthly, 1)) * 100}%"
								></i></span
							>
							<b>{@render taxed(monthlyExTax)}</b>
						</div>
					</div>
					<!-- 手書き記録の計算式: 文章ではなく式で見せる -->
					<p class="pr-formula">
						<span class="pr-formula__label">手書きの計算</span>
						<span class="pr-formula__eq">
							<b>{num(totalCount)}台</b> × <b>{safeChecks}回/日</b> × <b>{safeMinutes}分</b> ×
							<b>{yen(safeWage)}/時</b> × <b>30日</b> =
							<b>{num(Math.round(manualHoursPerMonth))}時間/月</b>
						</span>
					</p>
				</div>
			{/if}

			<!-- 月額に含まれる機能 + 自動レポート（オプション） -->
			<div class="pr-plan" data-reveal>
				<div class="pr-card pr-includes">
					<span class="pr-card__label pr-card__label--lg"
						>月額利用料に含まれる機能</span
					>
					<ul class="pr-includes__list">
						{#each cfg.included as f (f)}
							<li class="pr-includes__item">
								<span class="material-symbols-rounded fill">check_circle</span>{f}
							</li>
						{/each}
						<!-- オプション: チェックを入れたときだけ緑のチェックになる -->
						<li class="pr-includes__item" class:pr-includes__item--opt={!smsOn}>
							<span class="material-symbols-rounded" class:fill={smsOn}
								>{smsOn ? 'check_circle' : 'radio_button_unchecked'}</span
							>SMS通知{#if !smsOn}<span class="pr-includes__tag">オプション</span>{/if}
						</li>
						<li class="pr-includes__item" class:pr-includes__item--opt={!report}>
							<span class="material-symbols-rounded" class:fill={report}
								>{report ? 'check_circle' : 'radio_button_unchecked'}</span
							>自動レポート{#if !report}<span class="pr-includes__tag">オプション</span>{/if}
						</li>
						{#each cfg.excluded as f (f)}
							<li class="pr-includes__item pr-includes__item--out">
								<span class="material-symbols-rounded">cancel</span>{f}
							</li>
						{/each}
					</ul>
				</div>
				<div class="pr-options">
					<label class="pr-option" class:is-on={report} for="report-option">
						<span class="pr-option__head">
							<input id="report-option" type="checkbox" bind:checked={report} />
							<b>自動レポートを追加</b>
							<span class="pr-option__tag">無制限</span>
							<span class="pr-option__price">+{@render taxed(REPORT_FEE)}<small>/月</small></span>
						</span>
						<span class="pr-option__desc"
							>レポート費用はセンサーの台数に関係なく、ご契約ごとの定額です。1台でも100台でも月額費用は変わらず、追加料金なしで各センサーのレポートを作成できます。</span
						>
					</label>
					<div class="pr-option" class:is-on={smsOn}>
						<label class="pr-option__head" for="sms-option">
							<input id="sms-option" type="checkbox" bind:checked={smsOn} />
							<b>SMS通知を追加</b>
							<span class="pr-option__price">{@render taxed(SMS_FEE)}<small>/通</small></span>
						</label>
						<span class="pr-option__desc"
							>異常をショートメッセージでもお知らせ。メールやプッシュ通知に加えて、より確実に異常を把握できます。</span
						>
						<div class="pr-field">
							<label class="pr-count__label" for="sms-count">月あたりの通数（目安）</label>
							<div class="pr-count__ctrl">
								<button
									type="button"
									class="pr-count__btn"
									aria-label="10通減らす"
									onclick={() => (smsCount = Math.max(1, safeSms - 10))}
									disabled={!smsOn || safeSms <= 1}
								>
									<span class="material-symbols-rounded">remove</span>
								</button>
								<input
									id="sms-count"
									type="number"
									min="1"
									max={MAX_SMS}
									step="1"
									inputmode="numeric"
									disabled={!smsOn}
									bind:value={smsCount}
								/>
								<button
									type="button"
									class="pr-count__btn"
									aria-label="10通増やす"
									onclick={() => (smsCount = Math.min(MAX_SMS, safeSms + 10))}
									disabled={!smsOn}
								>
									<span class="material-symbols-rounded">add</span>
								</button>
								<span class="pr-count__unit">通</span>
							</div>
						</div>
						{#if smsOn}
							<span class="pr-option__sum"
								>{num(safeSms)}通 × {yen(SMS_FEE)} = <b>{@render taxed(smsFeeTotal)}</b>/月</span
							>
						{/if}
					</div>
				</div>
			</div>
		{/if}

		<!-- ③ 導入費用と投資回収（ROI）の見通し -->
		<h2 class="pr-step"><span class="pr-step__n">3</span>導入費用と投資回収（ROI）の見通し</h2>
		<div class="pr-invest">
			<div id="pr-devices" class="pr-card pr-device" data-reveal>
				<span class="pr-card__label">導入費用の概算（初回のみ）</span>
				{#if volumePrice || deviceSetPrice === null}
					<strong class="pr-device__total pr-device__total--contact">お見積もり</strong>
				{:else}
					<dl class="pr-device__lines">
						<div>
							<dt>
								{cfg.deviceLabel}
								<small>1台 {@render taxed(cfg.deviceUnitPrice ?? 0)} × {num(totalCount)}台</small>
							</dt>
							<dd>{@render taxed(sensorDeviceTotal)}</dd>
						</div>
						<div>
							<dt>
								ゲートウェイ・初期導入サポート
								<small>1拠点 {@render taxed(DEVICE_BASE_PRICE)} × {num(safeLocations)}拠点</small>
							</dt>
							<dd><span class="pr-badge">概算</span>{@render taxed(gatewayTotal)}</dd>
						</div>
						<div class="pr-device__sum">
							<dt>合計</dt>
							<dd>
								{yen(deviceSetPrice * safeLocations)}<span class="pr-device__tax"
									>（税込 {yen(withTax(deviceSetPrice * safeLocations))}）</span
								>
							</dd>
						</div>
					</dl>
				{/if}
				<p class="pr-field__hint">
					センサーは1台からご購入いただけます。交通費・設置費および設置に必要な備品は、現地状況により異なるため含まれておりません。ゲートウェイは標準タイプを使用した場合の価格です。
				</p>
			</div>

			<!-- ROI: 投資回収ラインチャート -->
			<div class="pr-card pr-roi" data-reveal>
				<div class="pr-roi__head">
					<span class="pr-card__label">累計費用の比較</span>
					<b class="pr-roi__payback">
						{#if breakEvenMonths !== null}
							約{Math.ceil(breakEvenMonths)}ヶ月で投資回収します。
						{:else}
							この条件では回収ラインはありません
						{/if}
					</b>
				</div>
				<div class="pr-roi__legend">
					<span><i class="roi-key roi-key--manual"></i>手書き記録の人件費（累計）</span>
					<span><i class="roi-key roi-key--cw"></i>CropWatch（導入費用+月額の累計・税込）</span>
				</div>
				<div
					class="pr-roi__chart"
					role="img"
					aria-label="累計費用の推移。CropWatchは導入費用{yen(roiInitial)}から始まり月{yen(
						monthly
					)}ずつ、手書き記録は月{yen(manualMonthly)}ずつ増えます。数値は下の表でも確認できます。"
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
								<line
									x1={PAD.left}
									x2={chartW - PAD.right}
									y1={yAt(t)}
									y2={yAt(t)}
									class="roi-grid"
								/>
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
									<div class="roi-tip__diff">
										差額 {yen(manualAt(hoverMonth) - cwAt(hoverMonth))}
									</div>
								{/if}
							</div>
						{/if}
					{/if}
				</div>
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
		</div>

		<div class="pr-actions" data-reveal>
			<div class="pr-cta">
				<a href="/contact" class="btn btn--accent btn--lg"
					>見積もりを依頼する <span class="material-symbols-rounded">arrow_forward</span></a
				>
				<a href="/technology" class="btn btn--ghost btn--lg">CropWatch の強みを見る</a>
			</div>
			<div class="pr-share">
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
						openRoiTableForPrint();
						window.print();
					}}
				>
					<span class="material-symbols-rounded">print</span>
					印刷する
				</button>
			</div>
		</div>

		<!-- 印刷専用フッター（画面では非表示） -->
		<p class="print-foot">
			<span class="print-foot__star">★</span>
			本書の金額はすべて概算の仮お見積もりです。正式なお見積もりではありません。 正式な金額は、構成とご利用環境の確認後に別途ご案内します。
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
	/* 料金ページだけ、ヘッダーを本文と同じ幅（--jp-maxw）にそろえる。
	   サイト共通の .pagehero__in は 860px で中央寄せのため、左端がずれて詰まって見える。 */
	.pagehero__in {
		position: relative;
		max-width: var(--jp-maxw);
	}
	.pr-hero-sub {
		margin: 8px 0 0;
		font-size: 14.5px;
		color: var(--web-muted);
	}

	.pr-wrap {
		display: grid;
		gap: 16px;
	}

	/* ── ステップ見出し（1 条件 / 2 結果 / 3 導入費用） ── */
	.pr-step {
		display: flex;
		align-items: center;
		gap: 12px;
		margin: 32px 0 2px;
		font-size: clamp(19px, 2.4vw, 22px);
		color: var(--cw-ink);
	}
	.pr-step--input {
		margin-top: 16px;
	}

	/* ── 価格の目安（ページ上部） ── */
	.pr-prices {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 16px;
	}
	.pr-prices li {
		display: grid;
		gap: 2px;
		align-content: start;
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: 16px;
		box-shadow: var(--web-shadow-card);
		padding: 18px 22px;
	}
	.pr-prices__label {
		font-size: 13px;
		font-weight: 700;
		color: var(--web-muted);
	}
	.pr-prices__value {
		font-family: var(--cw-font-mono);
		font-size: clamp(26px, 3.4vw, 32px);
		font-weight: 800;
		line-height: 1.2;
		color: var(--cw-ink);
	}
	.pr-prices__value small {
		font-family: var(--cw-font-family);
		font-size: 14px;
		font-weight: 700;
		color: var(--web-muted);
	}
	.pr-prices__note {
		font-size: 12.5px;
		color: var(--web-muted);
	}
	/* センサー本体カードの付帯（校正証明書・保証）。親 .pr-prices li のカード装飾は打ち消す */
	.pr-prices .pr-prices__perks {
		list-style: none;
		margin: 8px 0 0;
		padding: 10px 0 0;
		border-top: 1px dashed var(--web-border);
		display: grid;
		gap: 6px;
	}
	.pr-prices .pr-prices__perks li {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 0;
		border: 0;
		border-radius: 0;
		background: none;
		box-shadow: none;
		font-size: 14px;
		font-weight: 700;
		color: var(--cw-ink);
	}
	.pr-prices__perks .material-symbols-rounded {
		font-size: 18px;
		color: var(--web-accent);
	}
	/* カード下部（点線の下）: 3シートの月額・シートの説明 */
	.pr-prices__foot {
		margin-top: 8px;
		padding-top: 10px;
		border-top: 1px dashed var(--web-border-strong);
		display: grid;
		gap: 4px;
	}
	.pr-prices__foot-label {
		font-size: 13px;
		font-weight: 700;
		color: var(--web-muted);
	}
	.pr-prices__foot-value {
		font-family: var(--cw-font-mono);
		font-size: 20px;
		font-weight: 800;
		color: var(--cw-ink);
	}
	.pr-prices__foot-value small {
		font-family: var(--cw-font-family);
		font-size: 13px;
		color: var(--web-muted);
	}
	.pr-seatmini__q {
		font-size: 14px;
		color: var(--cw-ink);
	}
	.pr-seatmini__a {
		font-size: 13px;
		line-height: 1.6;
		color: var(--cw-ink);
	}
	.pr-prices .pr-seatmini__ex {
		list-style: none;
		margin: 4px 0 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.pr-prices .pr-seatmini__ex li {
		display: inline-flex;
		gap: 4px;
		padding: 3px 10px;
		border: 0;
		border-radius: 999px;
		background: #fff;
		box-shadow: none;
		font-size: 12.5px;
		color: var(--web-muted);
	}
	.pr-seatmini__ex b {
		color: var(--cw-ink);
	}
	.pr-prices__tax {
		font-size: 14px;
		font-weight: 700;
		color: var(--cw-ink);
	}
	/* 税込の添え書き（snippet taxed）。数字の後ろに小さく続ける */
	.pr-tax {
		margin-left: 2px;
		font-family: var(--cw-font-family);
		font-size: 0.78em;
		font-weight: 700;
		color: var(--web-muted);
		white-space: nowrap;
	}

	.pr-prices__min {
		border-color: color-mix(in srgb, var(--cw-gold-500, #f2a516) 45%, transparent) !important;
		background: color-mix(in srgb, var(--cw-gold-400, #ffbb34) 10%, #fff) !important;
	}
	.pr-step__n {
		flex: none;
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: var(--cw-ink);
		color: #fff;
		font-size: 16px;
	}

	/* ── 共通カード ── */
	.pr-card {
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: 16px;
		box-shadow: var(--web-shadow-card);
		padding: 22px 24px;
		display: grid;
		gap: 14px;
		align-content: start;
		min-width: 0;
	}
	.pr-card__label {
		font-size: 13px;
		font-weight: 700;
		color: var(--web-muted);
	}
	.pr-card__label--lg {
		font-size: 17px;
	}

	/* ── 業種タブ ── */
	.pr-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
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
		transition:
			border-color 0.18s ease,
			background 0.18s ease,
			color 0.18s ease;
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
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
		align-items: stretch;
	}
	.pr-field {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 8px 12px;
	}
	.pr-field__hint--full {
		flex-basis: 100%;
	}
	.pr-field__hint {
		margin: 0;
		font-size: 12px;
		line-height: 1.7;
		color: var(--web-muted);
	}
	.pr-count__label {
		font-size: 15px;
		font-weight: 700;
		color: var(--cw-ink);
	}
	.pr-count__ctrl {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.pr-count__btn {
		width: 44px;
		height: 44px;
		display: grid;
		place-items: center;
		border-radius: 12px;
		border: 1px solid var(--web-border-strong);
		background: var(--web-bg-soft);
		color: var(--cw-ink);
		cursor: pointer;
		transition:
			background 0.15s ease,
			border-color 0.15s ease;
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
		width: 80px;
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
	.pr-count__btn + .pr-count__unit {
		min-width: 3em;
	}
	.pr-count__ctrl input.pr-wage {
		width: 116px;
	}
	.pr-count__ctrl input::-webkit-outer-spin-button,
	.pr-count__ctrl input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.pr-count__ctrl input:disabled {
		color: var(--web-muted);
		background: var(--web-bg-soft);
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

	/* ── 結果: 月額と節約額 ── */
	.pr-result {
		background: var(--web-accent-soft);
		border: 1px solid color-mix(in srgb, var(--web-accent) 30%, transparent);
		border-radius: 20px;
		padding: clamp(20px, 3vw, 28px) clamp(18px, 3vw, 32px);
		display: grid;
		gap: 22px;
	}
	.pr-result__main {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px 32px;
	}
	.pr-result__col {
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
	}
	/* タグは列の下端（グラフのすぐ上）にそろえる */
	.pr-result__col--save .pr-pills {
		margin-top: auto;
		padding-top: 12px;
	}
	.pr-result__col--save {
		border-left: 1px solid color-mix(in srgb, var(--web-accent) 30%, transparent);
		padding-left: 32px;
	}
	.pr-result__label {
		font-size: 14px;
		font-weight: 700;
		color: var(--cw-ink);
	}
	.pr-result__value {
		font-family: var(--cw-font-mono);
		font-size: clamp(34px, 5vw, 46px);
		font-weight: 800;
		line-height: 1.15;
		color: var(--cw-ink);
	}
	.pr-result__value small {
		font-family: var(--cw-font-family);
		font-size: 16px;
		font-weight: 700;
		color: var(--web-muted);
	}
	.pr-result__tax {
		font-size: 16px;
		font-weight: 700;
		color: var(--web-muted);
	}
	.pr-receipt__why {
		display: block;
		font-size: 12.5px;
		font-weight: 400;
		color: var(--web-muted);
	}
	.pr-result__col--save .pr-result__label,
	.pr-result__col--save .pr-result__value,
	.pr-result__col--save .pr-result__value small {
		color: var(--cw-emerald-700, #0a7a4d);
	}
	.pr-result__col--save.is-negative .pr-result__label,
	.pr-result__col--save.is-negative .pr-result__value {
		color: var(--cw-ink);
	}
	/* 内訳（項目 / 金額の行） */
	.pr-receipt {
		margin: 10px 0 0;
		display: grid;
		max-width: 440px;
	}
	.pr-receipt > div {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 12px;
		padding: 6px 0;
		border-bottom: 1px dashed color-mix(in srgb, var(--web-accent) 35%, transparent);
		font-size: 16px;
	}
	.pr-receipt dt {
		font-weight: 700;
		color: var(--cw-ink);
	}
	.pr-receipt__qty {
		margin-left: 4px;
		font-family: var(--cw-font-mono);
		font-weight: 700;
		color: var(--web-muted);
	}
	.pr-receipt dd {
		margin: 0;
		text-align: right;
		font-family: var(--cw-font-mono);
		font-size: 17px;
		font-weight: 800;
		color: var(--cw-ink);
	}
	/* 1日 / 1台1日あたり / 1年 の数字タイル */
	.pr-tiles {
		list-style: none;
		margin: 14px 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 8px;
	}
	.pr-tiles li {
		display: grid;
		gap: 2px;
		padding: 10px 12px;
		border-radius: 12px;
		background: #fff;
		min-width: 0;
	}
	.pr-tiles span {
		font-size: 15px;
		font-weight: 700;
		color: var(--web-muted);
	}
	.pr-tiles .pr-tax {
		display: block;
		margin: 0;
		white-space: normal;
		overflow-wrap: anywhere;
	}
	.pr-tiles b {
		font-family: var(--cw-font-mono);
		font-size: 18px;
		font-weight: 800;
		color: var(--cw-ink);
		overflow-wrap: anywhere;
	}
	/* 1年の節約額 */
	.pr-yearsave {
		margin-top: 10px;
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 4px 10px;
		padding: 12px 16px;
		border-radius: 14px;
		background: #fff;
		font-size: 16px;
		font-weight: 700;
		color: var(--cw-emerald-700, #0a7a4d);
	}
	.pr-yearsave b {
		font-family: var(--cw-font-mono);
		font-size: 28px;
		font-weight: 800;
		line-height: 1.2;
	}
	/* ひと目でわかる短いタグ */
	.pr-pills {
		list-style: none;
		margin: 12px 0 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.pr-pills li {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 6px 14px 6px 10px;
		border-radius: 999px;
		background: #fff;
		font-size: 15px;
		font-weight: 700;
		color: var(--cw-ink);
	}
	.pr-pills .material-symbols-rounded {
		font-size: 20px;
		color: var(--web-accent);
	}
	/* 手書き記録の計算式 */
	.pr-formula {
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 4px 12px;
		font-size: 14px;
		color: var(--web-muted);
	}
	.pr-formula__label {
		font-weight: 700;
	}
	.pr-formula__eq b {
		font-family: var(--cw-font-mono);
		color: var(--cw-ink);
	}
	.pr-bars {
		display: grid;
		gap: 10px;
	}
	.pr-bar {
		display: grid;
		grid-template-columns: 6.5em minmax(0, 1fr) auto;
		align-items: center;
		gap: 12px;
		font-size: 14px;
		color: var(--cw-ink);
	}
	.pr-bar b {
		font-family: var(--cw-font-mono);
		text-align: right;
		min-width: 6.5em;
	}
	.pr-bar__track {
		height: 14px;
		border-radius: 99px;
		background: #fff;
		overflow: hidden;
	}
	.pr-bar__fill {
		display: block;
		height: 100%;
		border-radius: 99px;
		transition: width 0.25s ease;
	}
	.pr-bar__fill--manual {
		background: var(--cw-gray-400);
	}
	.pr-bar__fill--cw {
		background: var(--cw-sapphire-500);
	}

	/* ── 含まれる機能 + 自動レポート（オプション） ── */
	.pr-plan {
		display: grid;
		grid-template-columns: 3fr 2fr;
		gap: 16px;
		align-items: stretch;
	}
	.pr-includes__list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 10px 20px;
	}
	.pr-includes__item {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 15px;
		color: var(--cw-ink);
	}
	.pr-includes__item .material-symbols-rounded {
		font-size: 20px;
		color: var(--web-accent);
	}
	.pr-includes__item--opt {
		color: var(--web-muted);
	}
	.pr-includes__item--opt .material-symbols-rounded {
		color: var(--cw-gray-400);
	}
	.pr-includes__tag {
		margin-left: 2px;
		font-size: 11px;
		font-weight: 700;
		padding: 1px 8px;
		border-radius: 999px;
		color: #7a4f00;
		background: color-mix(in srgb, var(--cw-gold-400, #ffbb34) 22%, #fff);
	}
	.pr-includes__item--out {
		color: var(--web-muted);
		text-decoration: line-through;
	}
	.pr-includes__item--out .material-symbols-rounded {
		color: var(--web-muted);
	}
	.pr-options {
		display: grid;
		gap: 16px;
		align-content: start;
	}
	.pr-option__sum {
		font-size: 14px;
		color: var(--cw-ink);
	}
	.pr-option__sum b {
		font-family: var(--cw-font-mono);
		color: var(--cw-emerald-700, #0a7a4d);
	}
	.pr-option {
		display: grid;
		gap: 10px;
		align-content: center;
		padding: 22px 24px;
		border-radius: 16px;
		border: 2px solid var(--web-border-strong);
		background: var(--web-surface);
		cursor: pointer;
		transition:
			border-color 0.15s ease,
			background 0.15s ease;
	}
	div.pr-option {
		cursor: auto;
	}
	.pr-option__head {
		cursor: pointer;
	}
	.pr-option.is-on {
		border-color: var(--web-accent);
		background: var(--web-accent-soft);
	}
	.pr-option__head {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 12px;
		font-size: 16px;
		color: var(--cw-ink);
	}
	.pr-option__head input {
		width: 22px;
		height: 22px;
		margin: 0;
		accent-color: var(--cw-emerald-600);
		cursor: pointer;
	}
	.pr-option__tag {
		font-size: 12px;
		font-weight: 700;
		padding: 2px 10px;
		border-radius: 999px;
		color: var(--cw-emerald-700, #0a7a4d);
		background: var(--web-accent-soft);
		border: 1px solid color-mix(in srgb, var(--web-accent) 35%, transparent);
	}
	.pr-option__price {
		margin-left: auto;
		font-family: var(--cw-font-mono);
		font-weight: 800;
		color: var(--cw-emerald-700, #0a7a4d);
	}
	.pr-option__price small {
		font-size: 12px;
		color: var(--web-muted);
	}
	.pr-option__desc {
		font-size: 14px;
		line-height: 1.7;
		color: var(--web-muted);
	}

	/* ── 導入費用 + ROI ── */
	.pr-invest {
		display: grid;
		grid-template-columns: 2fr 3fr;
		gap: 16px;
		align-items: stretch;
	}
	.pr-device__lines {
		margin: 0;
		display: grid;
	}
	.pr-device__lines > div {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
		padding: 10px 0;
		border-bottom: 1px solid var(--web-border);
	}
	.pr-device__lines dt {
		display: grid;
		font-size: 14.5px;
		font-weight: 700;
		color: var(--cw-ink);
	}
	.pr-device__lines dt small {
		font-size: 12.5px;
		font-weight: 400;
		color: var(--web-muted);
	}
	.pr-device__lines dd {
		margin: 0;
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: var(--cw-font-mono);
		font-size: 16px;
		font-weight: 700;
		color: var(--cw-ink);
		flex-wrap: wrap;
		justify-content: flex-end;
		text-align: right;
	}
	.pr-device__lines .pr-device__sum {
		border-bottom: 0;
		padding-bottom: 0;
		align-items: baseline;
	}
	.pr-device__sum dd {
		display: grid;
		justify-items: end;
		gap: 2px;
		font-size: 30px;
		font-weight: 800;
		line-height: 1.15;
	}
	.pr-device__tax {
		font-family: var(--cw-font-family);
		font-size: 15px;
		font-weight: 700;
		color: var(--web-muted);
	}
	.pr-device__total--contact {
		font-size: 24px;
		color: var(--web-primary);
	}
	.pr-badge {
		display: inline-flex;
		align-items: center;
		font-family: var(--cw-font-family);
		font-size: 11px;
		font-weight: 700;
		line-height: 1;
		padding: 4px 8px;
		border-radius: 999px;
		color: #7a4f00;
		background: color-mix(in srgb, var(--cw-gold-400, #ffbb34) 22%, #fff);
		border: 1px solid color-mix(in srgb, var(--cw-gold-500, #f2a516) 45%, transparent);
	}

	/* ── ROI（投資回収）ラインチャート ── */
	.pr-roi__head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 4px 12px;
	}
	.pr-roi__payback {
		font-size: 19px;
		color: var(--cw-emerald-700, #0a7a4d);
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
		border-color: var(--cw-sapphire-500);
	}
	.roi-key--manual {
		border-top-style: dashed;
		border-color: var(--cw-gray-400);
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
		stroke: var(--cw-sapphire-500);
		stroke-width: 2.5;
	}
	.roi-line--manual {
		stroke: var(--cw-gray-400);
		stroke-width: 2.5;
		stroke-dasharray: 6 5;
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
	.roi-dot {
		stroke: var(--web-surface);
		stroke-width: 2;
	}
	.roi-dot--cw {
		fill: var(--cw-sapphire-500);
	}
	.roi-dot--manual {
		fill: var(--cw-gray-400);
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

	.pr-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		margin-top: 24px;
		padding-top: 24px;
		border-top: 1px solid var(--web-border);
	}
	.pr-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
	}
	.pr-share {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px 14px;
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
		:global(footer.ftr),
		:global(.crumb) {
			display: none !important;
		}
		.pagehero,
		.pr-tabs,
		.pr-step--input,
		.pr-actions,
		.pr-options,
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
		.pr-result,
		.pr-device,
		.pr-includes {
			break-inside: avoid;
		}
		.pr-plan {
			grid-template-columns: 1fr;
		}
		/* 数値表はトグルUIを隠してそのまま表として出す */
		.pr-roi__table summary {
			display: none;
		}
		/* 保険: JSのopen反映が間に合わない場合でも、対応ブラウザでは
		   閉じたdetailsの中身（数値表）を印刷時に強制表示する */
		.pr-roi__table::details-content {
			content-visibility: visible !important;
			height: auto !important;
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
		.pr-step {
			margin-top: 16px;
		}
	}

	/* 2カラムの組み合わせは、タブレット縦（〜980px）で縦積みにする */
	@media screen and (max-width: 980px) {
		.pr-count,
		.pr-plan,
		.pr-invest {
			grid-template-columns: 1fr;
		}
	}

	/* screen限定: 印刷時はA4の紙幅(約700px)でこのモバイル用1カラムが発動して
	   縦に伸びてしまうため、画面表示のときだけ適用する */
	@media screen and (max-width: 720px) {
		.pr-result__main {
			grid-template-columns: 1fr;
		}
		.pr-result__col--save {
			border-left: 0;
			padding-left: 0;
			padding-top: 18px;
			border-top: 1px solid color-mix(in srgb, var(--web-accent) 30%, transparent);
		}
		.pr-card {
			padding: 18px 16px;
		}
	}
	@media screen and (max-width: 600px) {
		.pr-prices,
		.pr-includes__list {
			grid-template-columns: 1fr;
		}
		/* 内訳・導入費用の行は、項目名の下に金額を右寄せで置く */
		.pr-receipt > div,
		.pr-device__lines > div {
			flex-direction: column;
			align-items: stretch;
			gap: 2px;
		}
		.pr-device__lines .pr-device__sum {
			flex-direction: row;
			align-items: baseline;
		}
		.pr-tiles .pr-tax {
			font-size: 11px;
		}
		.pr-tiles li {
			padding: 8px;
		}
		.pr-tiles b {
			font-size: 15px;
		}
		.pr-bar {
			grid-template-columns: 5.5em minmax(0, 1fr) auto;
			gap: 8px;
		}
		.pr-bar b {
			min-width: 0;
		}
	}
</style>
