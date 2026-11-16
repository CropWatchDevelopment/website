<!--
  Port of CropWatch's current SoilDisplay (cw_soil_data, CWUI 0.1.118), same
  composition and order:

    above / below ground panel (light strip, air readings, soil readings)
    → crop targets card (day or night targets by the sun at the location)
    → VPD matrix | PPFD gauge + DLI card
    → 履歴 table.

  What the demo leaves out: the AI growing advice card (it needs a daily
  report from cw-ai-services), the "set a crop" notice (the demo sensor has
  one) and the user's unit preferences (the demo is metric). The boards
  CropWatch ships do not measure pH, so there is no pH anywhere.

  The app ticks `now` every minute; the demo passes the device's clock in,
  which for the cucumber house is frozen at 13:00 (see demo-data.ts).
-->
<script lang="ts">
	import {
		CwAboveBelowChart,
		CwCard,
		CwChip,
		CwDataTable,
		CwDliCard,
		CwPPFDChart,
		CwVPDChart,
		type CwColumnDef
	} from '@cropwatchdevelopment/cwui';
	import {
		cropTarget,
		vaporPressureDeficit,
		type CropTypeDetailDto,
		type DayPeriod
	} from '../../agronomy/crop-targets';
	import {
		dayLightProfile,
		isDaylight,
		lightEndsAt,
		lightShareSoFar,
		ppfdTargetForHour
	} from '../../agronomy/light-targets';
	import type { Coordinates } from '../../agronomy/solar';
	import {
		cwAboveBelowChartLabels,
		cwDataTableLabels,
		cwPpfdChartLabels,
		cwVpdChartLabels
	} from '../../cwui-labels';
	import { labelFor } from '../../sensor-labels';
	import {
		dliToday,
		fieldSeries,
		latestReading,
		SOIL_FIELDS,
		toSoilRows,
		type LatestReading,
		type SoilField,
		type SoilRow
	} from '../../soil-readings';
	import { createClientTableLoader } from '../../table-loader';
	import {
		buildCropTargetRows,
		formatReading,
		targetStatusLabel,
		targetStatusTone
	} from './soil-crop-targets';
	import { buildSoilLight, buildSoilPanel, soilPanelSubtitle } from './soil-panel';

	let {
		latestData,
		historicalData,
		loading,
		crop = null,
		coordinates = null,
		now,
		dliHistory = []
	}: {
		latestData: Record<string, number | string> | null;
		/** Newest first, as the API returns it. */
		historicalData: Record<string, number | string>[];
		loading: boolean;
		crop?: CropTypeDetailDto | null;
		coordinates?: Coordinates | null;
		/** The device's clock (ms). */
		now: number;
		/** Daily DLI totals of the complete days before today, oldest first. */
		dliHistory?: { date: string; value: number }[];
	} = $props();

	const LOCALE = 'ja-JP';

	/** Digits per field in the history table (the app's defaultFractionDigits). */
	function tableDigits(field: SoilField): number {
		return labelFor(field).format === 'integer' ? 0 : 2;
	}

	let nowDate = $derived(new Date(now));
	let lightProfile = $derived(dayLightProfile(nowDate, coordinates));
	let period = $derived<DayPeriod>(isDaylight(nowDate, coordinates) ? 'day' : 'night');
	let cropName = $derived(crop?.name_ja ?? '');

	// ---- Derived state ---------------------------------------------------------

	let rows = $derived(toSoilRows(historicalData));
	// The panel and the charts read oldest-first; the history is newest-first.
	let chronologicalRows = $derived([...rows].reverse());
	let latest = $derived(
		Object.fromEntries(
			SOIL_FIELDS.map((field) => [field, latestReading(rows, field, latestData)])
		) as Record<SoilField, LatestReading | null>
	);
	// Air and light fields get table columns only on devices that report them.
	let reportedExtras = $derived(
		(['co2', 'air_temperature_c', 'air_humidity', 'ppfd'] as const).filter((field) =>
			rows.some((row) => row[field] !== null)
		)
	);

	let panel = $derived(buildSoilPanel({ rows: chronologicalRows, latest, crop, period }));

	// ---- Columns ---------------------------------------------------------------

	let columns = $derived<CwColumnDef<SoilRow>[]>([
		{ key: 'created_at', header: '日時', sortable: true, width: '13.5rem' },
		{ key: 'temperature_c', header: '土壌温度', sortable: true, width: '9rem' },
		{ key: 'moisture', header: '土壌水分', sortable: true, width: '9rem' },
		{ key: 'ec', header: 'EC (mS/cm)', sortable: true, width: '9rem' },
		...reportedExtras.map((field) => ({
			key: field,
			header: labelFor(field).label,
			sortable: true,
			width: '9rem'
		}))
	]);

	// Re-key the table when the row set changes so CwDataTable re-runs loadData
	// for the new range instead of showing stale rows.
	let rowSetKey = $derived(
		`${rows.length}:${rows[0]?.id ?? ''}:${rows[rows.length - 1]?.id ?? ''}:${reportedExtras.join(',')}`
	);

	// ---- VPD and light -----------------------------------------------------------

	let dli = $derived(dliToday(fieldSeries(chronologicalRows, 'ppfd'), nowDate));

	// ---- Crop targets ----------------------------------------------------------

	let vpd = $derived(
		vaporPressureDeficit(latest.air_temperature_c?.value, latest.air_humidity?.value)
	);
	let targetRows = $derived(
		crop
			? buildCropTargetRows({
					crop,
					period,
					readings: Object.fromEntries(
						SOIL_FIELDS.map((field) => [field, latest[field]?.value ?? null])
					),
					vpd
				})
			: []
	);
	let targetsNote = $derived(
		coordinates
			? period === 'day'
				? 'この場所の太陽の位置に基づく日中の目標です。'
				: 'この場所の太陽の位置に基づく夜間の目標です。'
			: period === 'day'
				? '日中の目標（06:00〜16:00。日の出・日の入りを使うには場所の位置を設定してください）。'
				: '夜間の目標（06:00〜16:00以外。日の出・日の入りを使うには場所の位置を設定してください）。'
	);
	let vpdTarget = $derived(cropTarget(crop, 'vpd', 'day'));

	// Light: the daily goal (DLI band), and the PPFD the current hour needs to
	// stay on course for it. An open-ended goal tops out at light saturation.
	let dliTarget = $derived.by(() => {
		const target = cropTarget(crop, 'dli', 'day');
		return target && (target.optimal_min !== null || target.optimal_max !== null) ? target : null;
	});
	let ppfdHour = $derived.by(() => {
		if (!dliTarget) return null;
		const hour = ppfdTargetForHour(
			nowDate,
			{ min: dliTarget.optimal_min, max: dliTarget.optimal_max },
			lightProfile
		);
		const saturation = cropTarget(crop, 'ppfd', 'day')?.optimal_max ?? null;
		if (!hour || hour.max !== null || saturation === null) return hour;
		return { ...hour, max: Math.max(hour.min ?? 0, saturation) };
	});
	const clock = new Intl.DateTimeFormat(LOCALE, { hour: '2-digit', minute: '2-digit' });
	let ppfdLabels = $derived.by(() => {
		const labels = cwPpfdChartLabels();
		if (!dliTarget) return labels;
		return {
			...labels,
			targetRange: ppfdHour
				? `目標 ${clock.format(ppfdHour.from)}〜${clock.format(ppfdHour.to)}`
				: '目標（夜間）'
		};
	});

	// Today's DLI is judged only once the day's light is over; until then the
	// card says how much should have fallen by now.
	let lightSoFar = $derived(lightShareSoFar(nowDate, lightProfile));
	let dayLightOver = $derived(lightProfile.total > 0 && lightSoFar >= 0.999);

	let dayProgress = $derived(
		dliTarget && latest.ppfd
			? {
					lightSoFar,
					lightEndsAt: lightEndsAt(nowDate, coordinates),
					assumed: !coordinates
				}
			: null
	);

	// ---- Table loader ----------------------------------------------------------

	let tableLoading = $state(false);

	// Newest first, as the history comes.
	const loadTableData = createClientTableLoader<SoilRow>(() => rows, {
		searchText: (r) =>
			[new Date(r.created_at).toLocaleString(LOCALE), ...SOIL_FIELDS.map((field) => r[field] ?? '')]
				.map(String)
				.join(' '),
		onLoadingChange: (value) => (tableLoading = value)
	});
</script>

<div class="soil-display">
	<!-- Light, air and soil at a glance. -->
	<CwAboveBelowChart
		locale={LOCALE}
		labels={cwAboveBelowChartLabels()}
		subtitle={soilPanelSubtitle(rows, nowDate)}
		targetName={cropName}
		loading={loading && rows.length === 0}
		noData={!loading && rows.length === 0 ? 'センサーデータ待機中' : undefined}
		light={buildSoilLight({ rows: chronologicalRows, latest, dli, dliTarget })}
		air={panel.air}
		ground={panel.ground}
	/>

	{#if crop}
		<CwCard title={`${cropName}の栽培目標`} subtitle={targetsNote} elevated>
			<div class="crop-targets">
				<table>
					<thead>
						<tr>
							<th scope="col">項目</th>
							<th scope="col">現在</th>
							<th scope="col">目標</th>
							<th scope="col">状態</th>
						</tr>
					</thead>
					<tbody>
						{#each targetRows as row (row.key)}
							<tr>
								<th scope="row">{row.label}</th>
								<td>{row.now}</td>
								<td>{row.target}</td>
								<td>
									{#if row.daytimeOnly}
										<span class="crop-targets__muted">日中のみ</span>
									{:else if row.status}
										<CwChip
											label={targetStatusLabel(row.status)}
											tone={targetStatusTone(row.status)}
											variant="soft"
										/>
									{:else}
										<span class="crop-targets__muted">—</span>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</CwCard>
	{/if}

	<!-- VPD and light panels pair up on desktop and stack on mobile. -->
	<div class="chart-pair">
		<CwVPDChart
			locale={LOCALE}
			labels={cwVpdChartLabels()}
			airTemperatureC={latest.air_temperature_c?.value ?? null}
			relativeHumidity={latest.air_humidity?.value ?? null}
			targetMin={vpdTarget?.optimal_min ?? null}
			targetMax={vpdTarget?.optimal_max ?? null}
			noData={latest.air_temperature_c && latest.air_humidity ? false : 'センサーデータ待機中'}
		/>
		<div class="chart-pair__stack">
			<CwPPFDChart
				locale={LOCALE}
				labels={ppfdLabels}
				plant={cropName}
				current={latest.ppfd?.value ?? null}
				targetMin={ppfdHour?.min ?? null}
				targetMax={ppfdHour?.max ?? null}
				updatedAt={latest.ppfd?.at || undefined}
				dliToday={dli}
				noData={latest.ppfd ? undefined : 'センサーデータ待機中'}
			/>
			<CwDliCard
				locale={LOCALE}
				{cropName}
				value={dli}
				targetMin={dliTarget?.optimal_min ?? null}
				targetMax={dliTarget?.optimal_max ?? null}
				showStatus={!dliTarget || dayLightOver}
				day={dayProgress}
				history={dliHistory.length > 0 ? dliHistory : undefined}
				noData={dli === null ? 'センサーデータ待機中' : false}
			/>
		</div>
	</div>

	<!-- History table, always last. -->
	{#if !loading && rows.length > 0}
		<CwCard title="履歴" subtitle="検索・並べ替え可能" elevated>
			{#key rowSetKey}
				<CwDataTable
					labels={cwDataTableLabels()}
					{columns}
					loadData={loadTableData}
					loading={tableLoading}
					rowKey="id"
					searchable
				>
					{#snippet cell(row: SoilRow, col: CwColumnDef<SoilRow>)}
						{#if col.key === 'created_at'}
							{new Date(row.created_at).toLocaleString(LOCALE)}
						{:else}
							{@const field = col.key as SoilField}
							{formatReading(field, row[field], tableDigits(field))}
						{/if}
					{/snippet}
				</CwDataTable>
			{/key}
		</CwCard>
	{:else if !loading}
		<CwCard title="データなし" elevated>
			<p>選択した範囲の土壌データはありません。</p>
		</CwCard>
	{/if}
</div>

<style>
	.soil-display {
		display: flex;
		flex-direction: column;
		gap: 1rem;
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
	.chart-pair__stack > :global(.cw-dli-card) {
		flex: 1;
	}

	@media (min-width: 64rem) {
		.chart-pair {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		}
	}

	.crop-targets {
		overflow-x: auto;
	}

	.crop-targets table {
		border-collapse: collapse;
		font-variant-numeric: tabular-nums;
		width: 100%;
	}

	.crop-targets th,
	.crop-targets td {
		border-bottom: 1px solid var(--cw-border-default);
		padding: 0.5rem 0.75rem;
		text-align: left;
		white-space: nowrap;
	}

	.crop-targets thead th {
		color: var(--cw-text-muted);
		font-size: var(--cw-text-xs);
		font-weight: var(--cw-font-semibold);
		letter-spacing: 0.05em;
	}

	.crop-targets tbody th {
		font-weight: var(--cw-font-semibold);
	}

	.crop-targets tbody tr:last-child > * {
		border-bottom: none;
	}

	.crop-targets__muted {
		color: var(--cw-text-muted);
	}
</style>
