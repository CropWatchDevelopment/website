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
			defaultCount: 3,
			defaultChecks: 2,
			defaultLocations: 1
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
			defaultLocations: 3
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
			comingSoon: true
		}
	};
	/** 時給の既定値: 地域別最低賃金の全国加重平均（令和7年度）。 */
	const DEFAULT_HOURLY_WAGE = 1121;
	/** 「1日あたり」の計算に使う年間日数（月あたりは30日）。 */
	const DAYS_PER_YEAR = 360;

	/** 機器のご購入価格（初回のみ・税込）。Product構造化データにも使われます。 */
	const DEVICES = [
		{
			icon: 'sensors',
			name: '温湿度センサー',
			model: 'CW-AIR-TH',
			price: 33000,
			desc: 'ISO/IEC 17025 の校正証明書つき。センサー部はご自身で交換できます。',
			schemaDesc:
				'冷蔵庫・冷凍庫向けの電池駆動LoRaWAN温湿度センサー。1台ごとにISO/IEC 17025の校正証明書が付属し、センサー部はユーザー自身で交換できます。'
		},
		{
			icon: 'router',
			name: 'ゲートウェイ',
			model: null,
			price: 110000,
			desc: '1拠点に1台。厚い壁や離れた建物のセンサーもまとめて収容します。',
			schemaDesc:
				'CropWatchセンサーのデータをクラウドへ送るLoRaWANゲートウェイ。1拠点1台で建物全体のセンサーを収容します。'
		},
		{
			icon: 'construction',
			name: '初期導入費',
			model: null,
			price: 165000,
			desc: '設置・設定・立ち上げサポート（初回のみ）。',
			schemaDesc: null // サービスのためProduct構造化データは出さない
		}
	];
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
		const sp = new URL(window.location.href).searchParams;
		const requested = sp.get('sector');
		if (requested && SECTORS[requested]) selectSector(requested);
		const readNum = (key: string, apply: (v: number) => void, min: number, max: number) => {
			const raw = sp.get(key);
			if (raw === null) return;
			const v = Number(raw);
			if (Number.isFinite(v) && v >= min && v <= max) apply(v);
		};
		readNum('units', (v) => (count = Math.floor(v)), 1, 1000);
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

	const shareQuery = $derived(
		new URLSearchParams({
			sector,
			units: String(safeCount),
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
		// 機器価格つきのProduct（offersがあることでリッチリザルト対象になる）
		...DEVICES.filter((d) => d.schemaDesc).map((d) =>
			productSchema({
				name: `CropWatch ${d.name}${d.model ? ` (${d.model})` : ''}`,
				description: d.schemaDesc!,
				...(d.model ? { sku: d.model } : {}),
				category: '環境監視機器',
				price: d.price,
				offerUrl: '/pricing'
			})
		)
	];
</script>

<Seo {title} {description} />
<JsonLd data={ld} />

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
				ユーザー数無制限・アラート通知・自動レポート・API利用まで、追加料金なしで含まれます。
			{/if}
		</p>
	</div>
</section>

<section class="section">
	<div class="wrap pr-wrap">
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
							max="1000"
							step="1"
							inputmode="numeric"
							bind:value={count}
						/>
						<span class="pr-count__unit">台</span>
						<button
							type="button"
							class="pr-count__btn"
							aria-label="1台増やす"
							onclick={() => (count = Math.min(1000, safeCount + 1))}
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

		{/if}

		<!-- 仕切り + 機器価格 -->
		<div class="pr-divider" role="separator" aria-label="機器価格">
			<span class="pr-divider__chip">
				<span class="material-symbols-rounded">sell</span> 機器のご購入価格
			</span>
		</div>

		<div class="pr-devices" data-reveal>
			{#each DEVICES as d (d.name)}
				<div class="pr-device">
					<span class="pr-device__ic"><span class="material-symbols-rounded">{d.icon}</span></span>
					<div class="pr-device__tx">
						<b>{d.name}</b>
						{#if d.model}<span class="pr-device__model">{d.model}</span>{/if}
						<p>{d.desc}</p>
					</div>
					<strong class="pr-device__price">{yen(d.price)}<small>税込</small></strong>
				</div>
			{/each}
		</div>
		<p class="pr-note" data-reveal>
			機器価格はいずれも初回のみのお支払いです。CO₂センサー・土壌センサーなど他の機器の価格はお問い合わせください。
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
		</div>
	</div>
</section>

<style>
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
	.pr-devices {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 14px;
	}
	.pr-devices > * {
		min-width: 0;
	}
	.pr-device {
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: 16px;
		box-shadow: var(--web-shadow-card);
		padding: 18px 20px;
		display: grid;
		grid-template-rows: auto 1fr auto;
		justify-items: start;
		gap: 12px;
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
	.pr-device__model {
		display: inline-block;
		margin-left: 8px;
		font-family: var(--cw-font-mono);
		font-size: 11.5px;
		font-weight: 700;
		color: var(--web-muted);
		background: var(--web-bg-soft);
		border: 1px solid var(--web-border);
		border-radius: 999px;
		padding: 2px 8px;
		vertical-align: middle;
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
		margin-left: 6px;
		font-size: 11px;
		font-weight: 700;
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

	@media (max-width: 720px) {
		.pr-count {
			grid-template-columns: 1fr;
		}
		.pr-compare__grid {
			grid-template-columns: 1fr;
		}
		.pr-devices {
			grid-template-columns: 1fr;
		}
		.pr-compare {
			padding: 18px 16px;
		}
	}
</style>
