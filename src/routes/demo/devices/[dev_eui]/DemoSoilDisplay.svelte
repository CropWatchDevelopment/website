<!--
  Port of CropWatch's current SoilDisplay (cw_soil_data, CWUI 0.1.115), same
  composition and order:

    KPI cards (soil temperature + moisture stats, EC and pH latest readings)
    → 空気質 line chart (CO₂ / air temperature / air humidity)
    → VPD matrix | PPFD gauge + DLI card
    → soil telemetry table.

  In the app the air-quality, VPD, PPFD and DLI panels wait for the combined
  sensor and render empty. Here they are fed by the demo's cucumber-house probe
  (see demo-data.ts), so the page shows what a fully reporting house looks like.
-->
<script lang="ts">
	import {
		CwCard,
		CwDataTable,
		CwDliCard,
		CwPPFDChart,
		CwResponsiveLineChart,
		CwStatCard,
		CwVPDChart,
		metricColor,
		type CwColumnDef,
		type CwResponsiveLineSeries
	} from '@cropwatchdevelopment/cwui';
	import {
		cwDataTableLabels,
		cwDliCardLabels,
		cwPpfdChartLabels,
		cwResponsiveLineChartLabels,
		cwStatCardLabels,
		cwVpdChartLabels
	} from '../../cwui-labels';
	import { computeStatsNewestFirst } from '../../compute-stats';
	import { createClientTableLoader } from '../../table-loader';

	interface SoilRow {
		id: string;
		created_at: string;
		temperature_c: number;
		moisture: number;
		ec: number;
	}

	let {
		latestData,
		historicalData,
		loading,
		dliToday,
		dliHistory
	}: {
		latestData: Record<string, number | string> | null;
		historicalData: Record<string, number | string>[];
		loading: boolean;
		/** Today's accumulated DLI (mol/m²/day), up to the device's clock. */
		dliToday: number;
		/** Daily DLI totals, oldest first. */
		dliHistory: { date: string; value: number }[];
	} = $props();

	// Greenhouse cucumber targets: VPD 0.8-1.2 kPa through the day, midday PPFD
	// 500-1,000 µmol/m²/s, and a DLI of 20-30 mol/m²/day for a full day's light.
	const CROP_NAME = 'きゅうり';
	const VPD_TARGET_MIN = 0.8;
	const VPD_TARGET_MAX = 1.2;
	const PPFD_TARGET_MIN = 500;
	const PPFD_TARGET_MAX = 1000;
	const DLI_TARGET_MIN = 20;
	const DLI_TARGET_MAX = 30;

	function num(value: number | string | undefined): number | null {
		const n = Number(value);
		return value === undefined || !Number.isFinite(n) ? null : n;
	}

	function toSoilRows(raw: Record<string, number | string>[]): SoilRow[] {
		return raw.map((row, i) => ({
			id: String(`${row.created_at}-${i}`),
			created_at: String(row.created_at ?? ''),
			temperature_c: Number(row.temperature_c) || 0,
			moisture: Number(row.moisture) || 0,
			ec: Number(row.ec) || 0
		}));
	}

	let columns = $derived<CwColumnDef<SoilRow>[]>([
		{ key: 'created_at', header: '日時', sortable: true, width: '13.5rem' },
		{ key: 'temperature_c', header: '土壌温度', sortable: true, width: '8rem' },
		{ key: 'moisture', header: '土壌水分', sortable: true, width: '9rem' },
		{ key: 'ec', header: 'EC (mS/cm)', sortable: true, width: '9rem' }
	]);

	// Oldest-first for the table (its loader reverses back to newest-first).
	let rows = $derived(
		toSoilRows(historicalData).sort(
			(a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
		)
	);

	let latest = $derived({
		ec: num(latestData?.ec),
		ph: num(latestData?.ph),
		airTemperature: num(latestData?.air_temperature_c),
		airHumidity: num(latestData?.air_humidity),
		ppfd: num(latestData?.ppfd),
		at: typeof latestData?.created_at === 'string' ? latestData.created_at : undefined
	});

	// `historicalData` is newest-first, so the headline figure comes from the front.
	let temperatureStats = $derived(
		computeStatsNewestFirst(historicalData.map((row) => Number(row.temperature_c) || 0))
	);
	let soilMoistureStats = $derived(
		computeStatsNewestFirst(historicalData.map((row) => Number(row.moisture) || 0))
	);

	/**
	 * Same three series and ids as the app's air-quality chart. The app passes
	 * CSS variables as colors, which the chart can't resolve when it draws the
	 * lines (they come out grey; unnoticed in the app because the chart is
	 * always empty there), so these use CWUI's metric palette instead.
	 */
	let airSeries = $derived.by<CwResponsiveLineSeries[]>(() => {
		const series = (
			id: string,
			column: string,
			label: string,
			unit: string,
			color: string,
			decimals: number
		): CwResponsiveLineSeries => ({
			id,
			label,
			unit,
			color,
			decimals,
			data: historicalData
				.map((row) => ({ t: new Date(String(row.created_at)).getTime(), v: num(row[column]) }))
				.reverse()
		});
		return [
			series('co2', 'co2', 'CO₂', 'ppm', metricColor('co2').color, 0),
			series(
				'air_temperature',
				'air_temperature_c',
				'気温',
				'°C',
				metricColor('air_temperature').color,
				1
			),
			series('air_humidity', 'air_humidity', '湿度', '%', metricColor('air_humidity').color, 1)
		];
	});

	// Re-key the table when the row set changes so CwDataTable re-runs loadData
	// for the new range instead of showing stale rows.
	let rowSetKey = $derived(
		`${rows.length}:${rows[0]?.id ?? ''}:${rows[rows.length - 1]?.id ?? ''}`
	);

	let tableLoading = $state(false);

	const loadTableData = createClientTableLoader<SoilRow>(() => rows, {
		reverse: true,
		searchText: (r) =>
			[new Date(r.created_at).toLocaleString('ja-JP'), r.temperature_c, r.moisture, r.ec]
				.map(String)
				.join(' '),
		onLoadingChange: (value) => (tableLoading = value)
	});
</script>

<div class="soil-display">
	<div class="kpi-grid">
		<CwStatCard
			title="土壌温度"
			stats={temperatureStats}
			unit="°C"
			accentColor="var(--cw-danger-500)"
			labels={cwStatCardLabels()}
		/>
		<CwStatCard
			title="土壌水分"
			stats={soilMoistureStats}
			unit="%"
			accentColor="var(--cw-info-500)"
			labels={cwStatCardLabels()}
		/>
		<CwCard title="EC" subtitle="最新の読み取り" elevated>
			<p class="kpi-value">
				{latest.ec === null ? '—' : latest.ec.toFixed(2)}<span>mS/cm</span>
			</p>
		</CwCard>
		{#if latest.ph !== null}
			<CwCard title="pH" subtitle="最新の読み取り" elevated>
				<p class="kpi-value">{latest.ph.toFixed(1)}</p>
			</CwCard>
		{/if}
	</div>

	<CwResponsiveLineChart
		locale="ja-JP"
		labels={cwResponsiveLineChartLabels()}
		series={airSeries}
		title="空気質"
		subtitle="CO₂・気温・湿度"
		ranges={[]}
		showLegendStats={false}
		theme="dark"
		showThemeToggle={false}
		height={360}
	/>

	<div class="chart-pair">
		<CwVPDChart
			locale="ja-JP"
			labels={cwVpdChartLabels()}
			airTemperatureC={latest.airTemperature}
			relativeHumidity={latest.airHumidity}
			targetMin={VPD_TARGET_MIN}
			targetMax={VPD_TARGET_MAX}
		/>
		<div class="chart-pair__stack">
			<CwPPFDChart
				locale="ja-JP"
				labels={cwPpfdChartLabels()}
				current={latest.ppfd}
				plant={CROP_NAME}
				targetMin={PPFD_TARGET_MIN}
				targetMax={PPFD_TARGET_MAX}
				{dliToday}
				updatedAt={latest.at}
			/>
			<CwDliCard
				locale="ja-JP"
				labels={cwDliCardLabels()}
				value={dliToday}
				history={dliHistory}
				cropName={CROP_NAME}
				targetMin={DLI_TARGET_MIN}
				targetMax={DLI_TARGET_MAX}
			/>
		</div>
	</div>

	{#if !loading && rows.length > 0}
		<CwCard title="土壌テレメトリ" subtitle="検索・並べ替え可能" elevated>
			{#key rowSetKey}
				<CwDataTable
					labels={cwDataTableLabels()}
					{columns}
					loadData={loadTableData}
					loading={tableLoading}
					rowKey="id"
					searchable
				>
					{#snippet cell(row: SoilRow, col: CwColumnDef<SoilRow>, defaultValue: string)}
						{#if col.key === 'created_at'}
							{new Date(row.created_at).toLocaleString('ja-JP')}
						{:else if col.key === 'temperature_c'}
							{row.temperature_c.toFixed(2)} °C
						{:else if col.key === 'moisture'}
							{row.moisture.toFixed(1)} %
						{:else if col.key === 'ec'}
							{row.ec.toFixed(2)}
						{:else}
							{defaultValue}
						{/if}
					{/snippet}
				</CwDataTable>
			{/key}
		</CwCard>
	{:else if !loading}
		<CwCard title="データなし" elevated>
			<p>選択した期間のデータがありません。</p>
		</CwCard>
	{/if}
</div>

<style>
	.soil-display {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.kpi-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 1rem;
	}

	/* Card titles stay on one line so the KPI row doesn't go ragged. */
	.soil-display :global(.cw-card__title),
	.soil-display :global(.cw-stat-card__title) {
		white-space: nowrap;
	}

	/* From the app's display-shared.css. */
	.kpi-value {
		margin: 0 0 0.75rem;
		font-size: clamp(1.45rem, 2.1vw, 2rem);
		font-weight: 700;
		color: var(--cw-text-primary);
	}

	.kpi-value span {
		margin-left: 0.35rem;
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--cw-text-muted);
	}

	/* Mobile-first single column; the VPD matrix and the PPFD+DLI stack pair up
	   once there is room. */
	.chart-pair {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		align-items: stretch;
	}

	/* Grid items must shrink below content width so the VPD matrix's own
	   horizontal scroll engages instead of overflowing the page. */
	.chart-pair > :global(*) {
		min-width: 0;
	}

	.chart-pair__stack {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-width: 0;
	}

	/* DLI grows to meet the VPD's bottom edge on desktop; no-op when stacked. */
	.chart-pair__stack > :global(:last-child) {
		flex: 1;
	}

	@media (min-width: 64rem) {
		.chart-pair {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		}
	}
</style>
