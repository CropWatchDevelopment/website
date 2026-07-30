<!--
  Port of CropWatch's SoilDisplay (cw_soil_data), full composition: KPI stat
  cards for soil temperature and moisture, latest-reading cards for EC and pH,
  the combined-sensor visualizations (air quality, VPD, PPFD, DLI), and the
  searchable telemetry table.

  The app renders the combined-sensor block permanently empty — the hardware
  feeding it has not shipped, so every one of those charts sits in its no-data
  state. The demo supplies the series instead, so the page shows what a fully
  reporting device looks like. Same components, same order, same layout as the
  original; only the data is fabricated.
-->
<script lang="ts">
	import {
		CwCard,
		CwDataTable,
		CwPPFDChart,
		CwStatCard,
		CwVPDChart,
		DliCard,
		metricColor,
		type CwColumnDef
	} from '@cropwatchdevelopment/cwui';
	import {
		cwDataTableLabels,
		cwDliCardLabels,
		cwPpfdChartLabels,
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
		dliHistory,
		ppfdReading
	}: {
		latestData: Record<string, number | string> | null;
		historicalData: Record<string, number | string>[];
		loading: boolean;
		/** Today's accumulated DLI (mol/m²/day). */
		dliToday: number;
		/** Daily DLI totals, oldest first. */
		dliHistory: { date: string; value: number }[];
		/**
		 * PPFD for the gauge, anchored to solar noon so the demo never shows a
		 * zeroed "too low" gauge after dark, plus the time it was taken from.
		 */
		ppfdReading: { value: number; at: string };
	} = $props();

	// Target bands for a leafy greenhouse crop. The PPFD band brackets the
	// modelled solar-noon peak — the gauge is anchored to noon, so a band set for
	// a daily *average* would read "too high" every time.
	const PPFD_TARGET_MIN = 450;
	const PPFD_TARGET_MAX = 850;
	const DLI_TARGET_MIN = 14;
	const DLI_TARGET_MAX = 28;
	const VPD_TARGET_MIN = 0.8;
	const VPD_TARGET_MAX = 1.2;

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
		{ key: 'ec', header: '土壌EC (mS/cm)', sortable: true, width: '9rem' }
	]);

	// Oldest-first for the table (its loader reverses back to newest-first).
	let rows = $derived(
		toSoilRows(historicalData).sort(
			(a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
		)
	);

	let latest = $derived({
		airTemperature: Number(latestData?.air_temperature) || 0,
		airHumidity: Number(latestData?.air_humidity) || 0
	});

	// `historicalData` is newest-first, so the headline figure has to be taken
	// from the front. (The app's SoilDisplay computes these over the unsorted
	// rows without that override, which makes its stat cards report the oldest
	// reading in the range as "last" — worth fixing upstream.)
	let temperatureStats = $derived(
		computeStatsNewestFirst(historicalData.map((row) => Number(row.temperature_c) || 0))
	);
	let soilMoistureStats = $derived(
		computeStatsNewestFirst(historicalData.map((row) => Number(row.moisture) || 0))
	);
	let ecStats = $derived(computeStatsNewestFirst(historicalData.map((row) => Number(row.ec) || 0)));

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

		<!-- EC uses the same stat card as temperature and moisture. Its accent
		     comes from metricColor so the card matches the EC line in the chart
		     above rather than picking an unrelated hue. -->
		<CwStatCard
			title="土壌EC"
			stats={ecStats}
			unit="mS/cm"
			accentColor={metricColor('ec').color}
			labels={cwStatCardLabels()}
		/>
	</div>

	<!-- Combined-sensor visualizations. The VPD matrix and the PPFD+DLI stack
	     pair up on desktop and stack on mobile.

	     The app also puts an 空気質 line chart here (CO₂ / air temperature /
	     humidity). It is left out: the device page already carries a time-series
	     chart directly above these cards, and a second one reads as a duplicate
	     of it. The air readings still feed the VPD matrix below. -->
	<div class="chart-pair">
		<CwVPDChart
			labels={cwVpdChartLabels()}
			airTemperatureC={latest.airTemperature}
			relativeHumidity={latest.airHumidity}
			targetMin={VPD_TARGET_MIN}
			targetMax={VPD_TARGET_MAX}
		/>
		<div class="chart-pair__stack">
			<CwPPFDChart
				labels={cwPpfdChartLabels()}
				current={ppfdReading.value}
				targetMin={PPFD_TARGET_MIN}
				targetMax={PPFD_TARGET_MAX}
				{dliToday}
				updatedAt={ppfdReading.at || undefined}
			/>
			<DliCard
				labels={cwDliCardLabels()}
				value={dliToday}
				history={dliHistory}
				targetMin={DLI_TARGET_MIN}
				targetMax={DLI_TARGET_MAX}
			/>
		</div>
	</div>

	{#if !loading && rows.length > 0}
		<CwCard title="測定データ" subtitle="検索・並べ替えができます" elevated>
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

	/* Card titles stay on one line. The soil/air prefixes made these long enough
	   to wrap, which pushed each card's value down by a line and left the row
	   ragged. */
	.soil-display :global(.cw-card__title),
	.soil-display :global(.cw-stat-card__title) {
		white-space: nowrap;
	}

	/* Mirrors SoilDisplay's .chart-pair. Mobile-first single column; the VPD
	   matrix and the PPFD+DLI stack sit side by side once there is room. */
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
	/* .kpi-value is gone with the EC/pH latest-reading cards — every KPI in this
	   display is a CwStatCard now. */
</style>
