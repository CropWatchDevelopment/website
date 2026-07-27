<!--
  Port of CropWatch's SoilDisplay (cw_soil_data): KPI stat cards for soil
  temperature and moisture, latest-reading cards for EC and pH, and the
  searchable telemetry table.

  Dropped from the original: the combined-sensor placeholders (air quality,
  VPD, PPFD, DLI). In the app those render permanently empty because the
  hardware that feeds them has not shipped; a demo showing four blank charts
  would read as a broken product rather than a forthcoming one.
-->
<script lang="ts">
	import { CwCard, CwDataTable, CwStatCard, type CwColumnDef } from '@cropwatchdevelopment/cwui';
	import { cwDataTableLabels, cwStatCardLabels } from '../../cwui-labels';
	import { computeStatsNewestFirst } from '../../compute-stats';
	import { createClientTableLoader } from '../../table-loader';

	interface SoilRow {
		id: string;
		created_at: string;
		temperature_c: number;
		moisture: number;
		ec: number;
		ph: number;
	}

	let {
		latestData,
		historicalData,
		loading
	}: {
		latestData: Record<string, number | string> | null;
		historicalData: Record<string, number | string>[];
		loading: boolean;
	} = $props();

	function toSoilRows(raw: Record<string, number | string>[]): SoilRow[] {
		return raw.map((row, i) => ({
			id: String(`${row.created_at}-${i}`),
			created_at: String(row.created_at ?? ''),
			temperature_c: Number(row.temperature_c) || 0,
			moisture: Number(row.moisture) || 0,
			ec: Number(row.ec) || 0,
			ph: Number(row.ph) || 0
		}));
	}

	let columns = $derived<CwColumnDef<SoilRow>[]>([
		{ key: 'created_at', header: '日時', sortable: true, width: '13.5rem' },
		{ key: 'temperature_c', header: '温度', sortable: true, width: '8rem' },
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
		ec: Number(latestData?.ec) || 0,
		ph: Number(latestData?.ph) || 0
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

	// Re-key the table when the row set changes so CwDataTable re-runs loadData
	// for the new range instead of showing stale rows.
	let rowSetKey = $derived(
		`${rows.length}:${rows[0]?.id ?? ''}:${rows[rows.length - 1]?.id ?? ''}`
	);

	let tableLoading = $state(false);

	const loadTableData = createClientTableLoader<SoilRow>(() => rows, {
		reverse: true,
		searchText: (r) =>
			[new Date(r.created_at).toLocaleString('ja-JP'), r.temperature_c, r.moisture, r.ec, r.ph]
				.map(String)
				.join(' '),
		onLoadingChange: (value) => (tableLoading = value)
	});
</script>

<div class="soil-display">
	<div class="kpi-grid">
		<CwStatCard
			title="温度"
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

		<CwCard title="EC" subtitle="最新の測定値" elevated>
			<p class="kpi-value">{latest.ec.toFixed(2)}<span>mS/cm</span></p>
		</CwCard>

		{#if latest.ph > 0}
			<CwCard title="pH" subtitle="最新の測定値" elevated>
				<p class="kpi-value">{latest.ph.toFixed(1)}</p>
			</CwCard>
		{/if}
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

	/* Mirrors .kpi-value from CropWatch's displays/display-shared.css. */
	.kpi-value {
		margin: 0;
		font-size: 2rem;
		font-weight: var(--cw-font-bold);
		line-height: 1.2;
		color: var(--cw-text-primary);
	}

	.kpi-value span {
		margin-left: 0.35rem;
		font-size: 0.9rem;
		font-weight: var(--cw-font-medium);
		color: var(--cw-text-muted);
	}
</style>
