<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { breadcrumbSchema } from '$lib/seo/schema';

	/* ══════════════════════════════════════════════════════════════════
	   料金の設定値（すべて税込・円）- ここを編集すれば表全体が変わります。
	   ══════════════════════════════════════════════════════════════════ */
	/** 月額基本料金 */
	const BASE_FEE_MONTHLY = 16500;
	/** センサー1台あたりの月額利用料 */
	const SENSOR_FEE_MONTHLY = 880;
	/** 初期導入費（設置・設定サポート） */
	const INITIAL_SETUP_FEE = 165000;
	/** 温湿度センサー本体 1台あたり */
	const SENSOR_UNIT_PRICE = 33000;
	/** ゲートウェイ本体（1拠点1台） */
	const GATEWAY_UNIT_PRICE = 110000;
	/** 「1日あたり」の計算に使う年間日数 */
	const DAYS_PER_YEAR = 360;
	/** 数量プリセット（参考ボタン） */
	const PRESETS = [1, 5, 10, 30, 100];
	/* ══════════════════════════════════════════════════════════════════ */

	let count = $state(5);

	const safeCount = $derived(Number.isFinite(count) && count >= 1 ? Math.floor(count) : 1);

	const sensorFeeTotal = $derived(SENSOR_FEE_MONTHLY * safeCount);
	const monthly = $derived(BASE_FEE_MONTHLY + sensorFeeTotal);
	const yearly = $derived(monthly * 12);
	const daily = $derived(Math.round(yearly / DAYS_PER_YEAR));
	const dailyPerUnit = $derived(Math.round(yearly / DAYS_PER_YEAR / safeCount));

	const sensorHwTotal = $derived(SENSOR_UNIT_PRICE * safeCount);
	const initialTotal = $derived(INITIAL_SETUP_FEE + sensorHwTotal + GATEWAY_UNIT_PRICE);

	const yen = (v: number) => '¥' + v.toLocaleString('ja-JP');

	function step(delta: number) {
		count = Math.min(1000, Math.max(1, safeCount + delta));
	}

	const title = '料金｜温湿度センサーの月額・初期費用シミュレーション｜CropWatch 日本';
	const description =
		'CropWatchの料金シミュレーション。温湿度センサーの台数を入力すると、月額のランニングコストと初期費用をその場で計算します。基本料金16,500円+1台あたり880円（税込）。ユーザー数無制限・アラート・レポート・API込み。';

	const ld = breadcrumbSchema([
		{ name: 'ホーム', path: '/' },
		{ name: '料金', path: '/pricing' }
	]);
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
			月額は<b>基本料金 {yen(BASE_FEE_MONTHLY)} + 1台あたり {yen(SENSOR_FEE_MONTHLY)}</b>（すべて税込）。
			ユーザー数無制限・アラート通知・自動レポート・API利用まで、追加料金なしで含まれます。
		</p>
	</div>
</section>

<section class="section">
	<div class="wrap pr-wrap">
		<!-- 台数入力（数値アップダウン） -->
		<div class="pr-count" data-reveal>
			<label class="pr-count__label" for="sensor-count">温湿度センサーの台数</label>
			<div class="pr-count__ctrl">
				<button
					type="button"
					class="pr-count__btn"
					aria-label="1台減らす"
					onclick={() => step(-1)}
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
					onclick={() => step(1)}
				>
					<span class="material-symbols-rounded">add</span>
				</button>
			</div>
			<div class="pr-count__presets" role="group" aria-label="台数プリセット">
				{#each PRESETS as p (p)}
					<button
						type="button"
						class="pr-preset"
						class:is-active={safeCount === p}
						onclick={() => (count = p)}>{p}台</button
					>
				{/each}
			</div>
		</div>

		<!-- 月額（メインの答え） -->
		<div class="pr-hero" data-reveal>
			<span class="pr-hero__label">ランニングコスト（月額・税込）</span>
			<strong class="pr-hero__value">{yen(monthly)}<small>/月</small></strong>
			<div class="pr-hero__subs">
				<span><b>{yen(daily)}</b> /日</span>
				<span><b>{yen(dailyPerUnit)}</b> /日・1台</span>
				<span><b>{yen(yearly)}</b> /年間</span>
			</div>
		</div>

		<!-- 明細テーブル -->
		<div class="pr-tables">
			<div class="pr-card" data-reveal>
				<h2 class="pr-card__title">
					<span class="material-symbols-rounded">autorenew</span> 毎月のご利用料金
				</h2>
				<div class="pr-scroll">
					<table class="pr-table">
						<thead>
							<tr><th>項目</th><th>単価（税込）</th><th>数量</th><th>金額</th></tr>
						</thead>
						<tbody>
							<tr>
								<td>基本料金</td>
								<td>{yen(BASE_FEE_MONTHLY)}</td>
								<td>1式</td>
								<td>{yen(BASE_FEE_MONTHLY)}</td>
							</tr>
							<tr>
								<td>温湿度センサー利用料</td>
								<td>{yen(SENSOR_FEE_MONTHLY)}/台</td>
								<td>{safeCount}台</td>
								<td>{yen(sensorFeeTotal)}</td>
							</tr>
						</tbody>
						<tfoot>
							<tr>
								<th colspan="3">ランニングコスト（月）</th>
								<th>{yen(monthly)}</th>
							</tr>
						</tfoot>
					</table>
				</div>
				<p class="pr-note">
					年間 {yen(yearly)}（1日あたり約 {yen(daily)}、1台1日あたり約 {yen(dailyPerUnit)}）。
				</p>
			</div>
		</div>

		<p class="pr-fine" data-reveal>
			表示はすべて税込です。CO₂センサーや土壌センサーなど、他のセンサーの料金はお問い合わせください。
		</p>

		<div class="pr-cta" data-reveal>
			<a href="/contact" class="btn btn--accent btn--lg"
				>見積もりを依頼する <span class="material-symbols-rounded">arrow_forward</span></a
			>
			<a href="/technology" class="btn btn--ghost btn--lg">CropWatch の強みを見る</a>
		</div>
	</div>
</section>

<style>
	.pr-wrap {
		max-width: 880px;
	}

	/* ── 台数入力 ── */
	.pr-count {
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: 18px;
		box-shadow: var(--web-shadow-card);
		padding: 22px 24px;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 16px 26px;
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
		width: 96px;
		text-align: center;
		font-family: var(--cw-font-mono);
		font-size: 20px;
		font-weight: 700;
		color: var(--cw-ink);
		padding: 8px 6px;
		border: 1px solid var(--web-border-strong);
		border-radius: 12px;
		background: #fff;
		-moz-appearance: textfield;
		appearance: textfield;
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
		font-size: 15px;
		font-weight: 700;
		color: var(--web-muted);
	}
	.pr-count__presets {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-left: auto;
	}
	.pr-preset {
		font: inherit;
		font-size: 13px;
		font-weight: 700;
		color: var(--cw-ink);
		background: var(--web-bg-soft);
		border: 1px solid var(--web-border);
		border-radius: 999px;
		padding: 7px 14px;
		cursor: pointer;
		transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
	}
	.pr-preset:hover {
		border-color: var(--web-border-strong);
	}
	.pr-preset.is-active {
		background: var(--web-primary);
		border-color: var(--web-primary);
		color: #fff;
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

	/* ── 明細テーブル ── */
	.pr-tables {
		display: grid;
		gap: 22px;
		margin-top: 22px;
	}
	/* グリッドアイテムはmin-width:autoのままだと内側のテーブル幅より
	   縮めなくなり、スマホで横スクロールを起こす。 */
	.pr-tables > * {
		min-width: 0;
	}
	.pr-card {
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: 18px;
		box-shadow: var(--web-shadow-card);
		padding: 22px 24px;
	}
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
	.pr-scroll {
		overflow-x: auto;
	}
	.pr-table {
		width: 100%;
		min-width: 460px;
		border-collapse: collapse;
		font-size: 14px;
	}
	.pr-table th,
	.pr-table td {
		padding: 11px 12px;
		text-align: right;
		white-space: nowrap;
		border-bottom: 1px solid var(--web-border);
	}
	.pr-table th:first-child,
	.pr-table td:first-child {
		text-align: left;
		white-space: normal;
	}
	.pr-table thead th {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: var(--web-muted);
		background: var(--web-bg-soft);
	}
	.pr-table td {
		color: var(--cw-ink);
	}
	.pr-table td:last-child {
		font-family: var(--cw-font-mono);
		font-weight: 700;
	}
	.pr-table tfoot th {
		font-size: 15px;
		font-weight: 800;
		color: var(--cw-ink);
		background: var(--web-primary-soft);
		border-bottom: none;
	}
	.pr-table tfoot th:last-child {
		font-family: var(--cw-font-mono);
		color: var(--web-primary);
	}
	.pr-note {
		margin: 12px 0 0;
		font-size: 12.5px;
		line-height: 1.8;
		color: var(--web-muted);
	}
	.pr-fine {
		margin: 18px 0 0;
		font-size: 12.5px;
		line-height: 1.8;
		color: var(--web-muted);
	}
	.pr-cta {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
		margin-top: 24px;
	}

	@media (max-width: 600px) {
		.pr-count__presets {
			margin-left: 0;
		}
		.pr-card {
			padding: 18px 16px;
		}
	}
</style>
