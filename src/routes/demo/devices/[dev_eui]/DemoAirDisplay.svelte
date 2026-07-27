<!--
  Port of CropWatch's AirDisplay (cw_air_data): KPI stat cards, the reading
  density heatmap with its metric toggle, and the searchable telemetry table.

  Dropped from the original: the per-row notes dialogs (they write to a real
  account) and the wind compass (no weather station in the demo fleet).
-->
<script lang="ts">
	import {
		CwCard,
		CwDataTable,
		CwHeatmap,
		CwStatCard,
		type CwColumnDef,
		type CwHeatmapDataPoint,
		type CwStatCardData
	} from '@cropwatchdevelopment/cwui';
	import { cwDataTableLabels, cwHeatmapLabels, cwStatCardLabels } from '../../cwui-labels';
	import { computeStatsNewestFirst } from '../../compute-stats';
	import { createClientTableLoader } from '../../table-loader';

	interface AirRow {
		id: string;
		created_at: string;
		temperature_c: number;
		humidity: number;
		co2: number;
	}

	// `latestData` is part of the app's DeviceDisplayProps contract and is passed
	// in by the page, but every figure here is computed from the loaded range —
	// so it is accepted and deliberately not destructured.
	let {
		historicalData,
		loading
	}: {
		latestData?: Record<string, number | string> | null;
		historicalData: Record<string, number | string>[];
		loading: boolean;
	} = $props();

	const HEATMAP_FALLBACK_DAYS = 1;
	const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

	// Same presence rule as the app: a device without a CO2 sensor still stores 0
	// on every row, so "any value > 0 in the loaded range" is the only reliable
	// signal that the column is real.
	let co2Values = $derived(
		historicalData
			.map((row) => Number(row.co2))
			.filter((value) => Number.isFinite(value) && value > 0)
	);
	let hasCo2 = $derived(co2Values.length > 0);

	let columns = $derived<CwColumnDef<AirRow>[]>([
		{ key: 'created_at', header: '日時', sortable: true, width: '13.5rem' },
		{ key: 'temperature_c', header: '温度', sortable: true, width: '8rem' },
		{ key: 'humidity', header: '湿度', sortable: true, width: '9rem' },
		...(hasCo2 ? [{ key: 'co2', header: 'CO₂', sortable: true, width: '9rem' } as const] : [])
	]);

	// The Air stat cards render even with no history, so keep the app's all-zero
	// placeholder instead of computeStats' empty object.
	const EMPTY_STATS: CwStatCardData = {
		min: 0,
		max: 0,
		avg: 0,
		median: 0,
		stdDev: 0,
		count: 0,
		lastReading: 0,
		trend: 'up'
	};

	function toAirRows(raw: Record<string, number | string>[]): AirRow[] {
		return raw.map((row, i) => ({
			id: String(`${row.created_at}-${i}`),
			created_at: String(row.created_at ?? ''),
			temperature_c: Number(row.temperature_c) || 0,
			humidity: Number(row.humidity) || 0,
			co2: Number(row.co2) || 0
		}));
	}

	// Oldest-first, matching the app: the heatmap and the table both read this,
	// and the table loader reverses it back to newest-first for display.
	let rows = $derived(
		toAirRows(historicalData).sort(
			(a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
		)
	);

	// Stats read `historicalData` directly, which is newest-first — hence
	// computeStatsNewestFirst, so the headline figure is the current reading and
	// not the oldest one in the range.
	let latestTemperature = $derived(
		historicalData.length
			? computeStatsNewestFirst(historicalData.map((row) => Number(row.temperature_c) || 0))
			: EMPTY_STATS
	);
	let latestHumidity = $derived(
		historicalData.length
			? computeStatsNewestFirst(historicalData.map((row) => Number(row.humidity) || 0))
			: EMPTY_STATS
	);
	let latestCo2 = $derived(co2Values.length ? computeStatsNewestFirst(co2Values) : EMPTY_STATS);

	type HeatmapMetricKey = 'temperature' | 'humidity' | 'co2';
	interface HeatmapMetric {
		key: HeatmapMetricKey;
		label: string;
		unit: string;
		colors: [string, string, string];
		value: (row: AirRow) => number | null;
	}

	let heatmapMetrics = $derived.by<HeatmapMetric[]>(() => {
		const metrics: HeatmapMetric[] = [
			{
				key: 'temperature',
				label: '温度',
				unit: '°C',
				colors: ['#06b6d4', '#a3e635', '#f97316'],
				value: (row) => row.temperature_c
			},
			{
				key: 'humidity',
				label: '湿度',
				unit: '%',
				colors: ['#bae6fd', '#38bdf8', '#1d4ed8'],
				value: (row) => row.humidity
			}
		];
		if (hasCo2) {
			metrics.push({
				key: 'co2',
				label: 'CO₂',
				unit: 'ppm',
				colors: ['#84cc16', '#f59e0b', '#dc2626'],
				value: (row) => (row.co2 > 0 ? row.co2 : null)
			});
		}
		return metrics;
	});

	let selectedMetric = $state<HeatmapMetricKey>('temperature');
	// Fall back to the first metric when the selection is unavailable (e.g. CO2
	// was selected then dropped out of the data). `heatmapMetrics` always has ≥1.
	let activeMetric = $derived(
		heatmapMetrics.find((metric) => metric.key === selectedMetric) ?? heatmapMetrics[0]
	);

	let heatmapSeries = $derived<CwHeatmapDataPoint[]>(
		rows.flatMap((row) => {
			const value = activeMetric.value(row);
			return value === null ? [] : [{ timestamp: row.created_at, value }];
		})
	);

	let heatmapDays = $derived.by(() => {
		const timestamps = rows.map((row) => new Date(row.created_at).getTime());
		if (timestamps.length === 0) return HEATMAP_FALLBACK_DAYS;
		return Math.max(
			HEATMAP_FALLBACK_DAYS,
			Math.ceil((Math.max(...timestamps) - Math.min(...timestamps)) / MILLISECONDS_PER_DAY) + 1
		);
	});

	// Re-key the table when the row set changes so CwDataTable re-runs loadData
	// for the new range instead of showing stale rows.
	let rowSetKey = $derived(
		`${rows.length}:${rows[0]?.id ?? ''}:${rows[rows.length - 1]?.id ?? ''}`
	);

	let tableLoading = $state(false);

	const loadTableData = createClientTableLoader<AirRow>(() => rows, {
		reverse: true,
		searchText: (row) =>
			[
				new Date(row.created_at).toLocaleString('ja-JP'),
				row.temperature_c.toFixed(2),
				row.humidity.toFixed(2),
				...(hasCo2 ? [String(row.co2)] : [])
			].join(' '),
		onLoadingChange: (value) => (tableLoading = value)
	});
</script>

<div class="air-display">
	<div class="kpi-grid">
		<CwStatCard
			title="温度"
			stats={latestTemperature}
			unit="°C"
			accentColor="var(--cw-danger-500)"
			labels={cwStatCardLabels()}
		/>
		<CwStatCard
			title="湿度"
			stats={latestHumidity}
			unit="%"
			accentColor="var(--cw-info-500)"
			labels={cwStatCardLabels()}
		/>
		{#if hasCo2}
			<CwStatCard
				title="CO₂"
				stats={latestCo2}
				unit="ppm"
				accentColor="purple"
				labels={cwStatCardLabels()}
			/>
		{/if}
	</div>

	{#if !loading && rows.length > 0}
		<CwCard title={activeMetric.label} subtitle="測定値の分布" elevated>
			<div class="heatmap-metric-toggle">
				{#each heatmapMetrics as metric (metric.key)}
					<button
						type="button"
						class="heatmap-metric-toggle__button"
						class:is-active={activeMetric.key === metric.key}
						onclick={() => (selectedMetric = metric.key)}
					>
						{metric.label}
					</button>
				{/each}
			</div>
			<CwHeatmap
				data={heatmapSeries}
				days={heatmapDays}
				unit={activeMetric.unit}
				title={activeMetric.label}
				colors={activeMetric.colors}
				labels={cwHeatmapLabels()}
			/>
		</CwCard>

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
					{#snippet cell(row: AirRow, col: CwColumnDef<AirRow>, defaultValue: string)}
						{#if col.key === 'created_at'}
							{new Date(row.created_at).toLocaleString('ja-JP')}
						{:else if col.key === 'temperature_c'}
							{row.temperature_c.toFixed(2)} °C
						{:else if col.key === 'humidity'}
							{row.humidity.toFixed(1)} %
						{:else if col.key === 'co2'}
							{row.co2.toFixed(0)} ppm
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
	.air-display {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.kpi-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 1rem;
	}

	.heatmap-metric-toggle {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		margin-bottom: 0.75rem;
	}

	.heatmap-metric-toggle__button {
		border: 1px solid var(--cw-border-default);
		background: transparent;
		color: var(--cw-text-secondary);
		border-radius: var(--cw-radius-full);
		padding: 0.25rem 0.75rem;
		font-size: var(--cw-text-sm);
		font-family: inherit;
		cursor: pointer;
	}

	.heatmap-metric-toggle__button:hover {
		color: var(--cw-text-primary);
		border-color: var(--cw-border-strong);
	}

	.heatmap-metric-toggle__button.is-active {
		background: var(--cw-bg-elevated);
		border-color: var(--cw-primary-500);
		color: var(--cw-text-primary);
	}
</style>
