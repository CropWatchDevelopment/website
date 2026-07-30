<!--
  /demo/devices/[dev_eui] — port of the CropWatch device detail page
  (CropWatch/src/routes/locations/[location_id]/devices/[dev_eui]/+page.svelte).

  Same composition: back button → header card with the range picker →
  CwResponsiveLineChart → the display component for the device's data table
  (AirDisplay for cw_air_data, SoilDisplay for cw_soil_data). Everything the
  real page does against a live tenant — ApiService, permissions, relay control,
  CSV export, notes — is gone; the history comes from demo-history.ts.
-->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import {
		CwCard,
		CwResponsiveLineChart,
		CwSpinner,
		CwStatCard,
		metricColor,
		type CwResponsiveLineLayout,
		type CwResponsiveLineSeries
	} from '@cropwatchdevelopment/cwui';
	import AppPage from '../../AppPage.svelte';
	import DemoAirDisplay from './DemoAirDisplay.svelte';
	import DemoSoilDisplay from './DemoSoilDisplay.svelte';
	import DemoDeviceHeader from './DemoDeviceHeader.svelte';
	import { createDemoGroups, type DemoRow } from '../../demo-data';
	import {
		buildDliHistory,
		buildHistory,
		DEFAULT_RANGE_SELECTION,
		getRangeOptions,
		solarNoonPpfd,
		type RangeSelection
	} from '../../demo-history';
	import { isDemoSignedIn } from '../../demo-session';
	import { labelFor } from '../../sensor-labels';
	import { cwResponsiveLineChartLabels, cwStatCardLabels } from '../../cwui-labels';
	import { computeStatsNewestFirst } from '../../compute-stats';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	/** Columns that belong on the chart. Battery and pressure stay in the table. */
	const CHART_COLUMNS = [
		'temperature_c',
		'humidity',
		'co2',
		'moisture',
		'ec',
		'air_temperature',
		'air_humidity',
		'air_co2'
	];

	/** Combined-sensor air columns, shown as stat cards above the chart. */
	const AIR_STAT_COLUMNS = ['air_temperature', 'air_humidity', 'air_co2'];

	/**
	 * Column -> the metric key CWUI colors by.
	 *
	 * CWUI deliberately splits soil from air (soil temperature is brown, air
	 * temperature red; soil moisture and humidity are different blues) so the two
	 * families stay legible on one chart — which matters now that a soil device
	 * plots both. Two fixes are needed for that to work here: `temperature_c` on
	 * a soil device is ground temperature, not air, and `air_co2` is not a key
	 * CWUI knows, so without the mapping it would take a hashed fallback hue
	 * instead of the CO₂ purple.
	 */
	function colorKeyFor(column: string, dataTable: string): string {
		if (column === 'air_co2') return 'co2';
		if (column === 'temperature_c' && dataTable === 'cw_soil_data') return 'soil_temperature';
		return column;
	}

	const groups = createDemoGroups();

	const devEui = $derived(data.devEui);
	const found = $derived.by(() => {
		for (const group of groups) {
			for (const device of group.devices) {
				if (device.dev_eui === devEui) return { device, locationName: group.location.name };
			}
		}
		return null;
	});
	const device = $derived<DemoRow | null>(found?.device ?? null);
	const locationName = $derived(found?.locationName ?? 'ロケーションなし');

	/**
	 * The chart's own `layout="auto"` resolves from the width it measures on
	 * itself with a ResizeObserver. With six series the legend's min-content
	 * width is wide enough to push its container, which the observer re-reads,
	 * which re-runs the layout — a feedback loop that pegs the renderer at phone
	 * widths (reproducible below ~360px; two series never trigger it because the
	 * legend stays narrow). Resolving the layout from the viewport instead breaks
	 * the cycle, because the window's width cannot depend on what the chart draws.
	 * Thresholds mirror the component's own (520 / 820 / 1100).
	 */
	let viewportWidth = $state(1440);
	const chartLayout = $derived<CwResponsiveLineLayout>(
		viewportWidth < 520
			? 'phone'
			: viewportWidth < 820
				? 'tablet'
				: viewportWidth < 1100
					? 'tablet-land'
					: 'desktop'
	);

	let activeRange = $state<RangeSelection>(DEFAULT_RANGE_SELECTION);
	// DLI is a per-day total, so it is independent of the selected range and is
	// built once on mount rather than rebuilt on every range change.
	let dliHistory = $state<{ date: string; value: number }[]>([]);
	const dliToday = $derived(dliHistory.at(-1)?.value ?? 0);
	// Gauge reading only; the DLI figures above integrate the real day curve.
	let ppfdReading = $state<{ value: number; at: string }>({ value: 0, at: '' });
	// Generated on the client only: the series is anchored to "now", so building
	// it during SSR would bake in a timestamp the client then disagrees with.
	let historicalData = $state<Record<string, number | string>[]>([]);
	let loading = $state(true);

	const latestData = $derived(historicalData[0] ?? null);
	const lastUpdatedAt = $derived(
		typeof latestData?.created_at === 'string' ? latestData.created_at : null
	);

	// Stat cards for the combined sensor's air readings. Only devices that
	// actually report the columns get them, so the air devices — which already
	// carry their own temperature/humidity/CO₂ cards in DemoAirDisplay — are
	// left alone.
	const airStats = $derived.by(() => {
		if (!device || historicalData.length === 0) return [];
		return AIR_STAT_COLUMNS.filter((column) => column in device.details).map((column) => {
			const def = labelFor(column, device.device_type.data_table_v2);
			return {
				column,
				label: def.label,
				unit: def.unit,
				color: metricColor(colorKeyFor(column, device.device_type.data_table_v2)).color,
				stats: computeStatsNewestFirst(historicalData.map((row) => Number(row[column]) || 0))
			};
		});
	});

	const chartSeries = $derived.by<CwResponsiveLineSeries[]>(() => {
		if (!device || historicalData.length === 0) return [];
		return CHART_COLUMNS.filter((column) => column in device.details).map((column) => {
			const def = labelFor(column, device.device_type.data_table_v2);
			const { color, gradient } = metricColor(
				colorKeyFor(column, device.device_type.data_table_v2)
			);
			return {
				id: column,
				label: def.label,
				unit: def.unit,
				color,
				gradient,
				decimals: def.format === 'integer' ? 0 : 1,
				// Oldest-first for the chart; the display components want newest-first.
				data: historicalData
					.map((row) => ({
						t: new Date(String(row.created_at)).getTime(),
						v: typeof row[column] === 'number' ? (row[column] as number) : null
					}))
					.reverse()
			};
		});
	});

	function selectRange(selection: RangeSelection) {
		if (!device) return;
		activeRange = selection;
		loading = true;
		historicalData = buildHistory(device, selection, Date.now());
		loading = false;
	}

	$effect(() => {
		const syncViewport = () => (viewportWidth = window.innerWidth);
		syncViewport();
		window.addEventListener('resize', syncViewport);
		return () => window.removeEventListener('resize', syncViewport);
	});

	onMount(() => {
		if (!isDemoSignedIn()) {
			goto('/demo/login', { replaceState: true });
			return;
		}
		if (!device) return;
		dliHistory = buildDliHistory(device, Date.now());
		ppfdReading = solarNoonPpfd(device, Date.now());
		selectRange(DEFAULT_RANGE_SELECTION);
	});
</script>

<svelte:head>
	<title>{device ? `${device.name} - CropWatch デモ` : 'デバイス - CropWatch デモ'}</title>
</svelte:head>

<AppPage>
	{#if !device}
		<CwCard title="デバイスが見つかりません" elevated>
			<p class="device-page__empty-message">
				このデモに、指定されたデバイスはありません。ダッシュボードからお選びください。
			</p>
		</CwCard>
	{:else}
		<div class="device-page">
			<DemoDeviceHeader
				{activeRange}
				{devEui}
				{lastUpdatedAt}
				{locationName}
				onBack={() => goto('/demo')}
				onSelectRange={selectRange}
				rangeOptions={getRangeOptions()}
				titleName={device.name}
			/>

			{#if loading}
				<div class="device-page__loading">
					<CwSpinner size="xl" />
				</div>
			{:else}
				{#if airStats.length > 0}
					<div class="device-page__airstats">
						{#each airStats as stat (stat.column)}
							<CwStatCard
								title={stat.label}
								stats={stat.stats}
								unit={stat.unit}
								accentColor={stat.color}
								labels={cwStatCardLabels()}
							/>
						{/each}
					</div>
				{/if}

				{#if chartSeries.length > 0}
					<div class="device-page__chart">
						<CwResponsiveLineChart
							series={chartSeries}
							title={device.name}
							subtitle="時系列データ"
							ranges={[]}
							layout={chartLayout}
							theme="dark"
							showThemeToggle={false}
							showDataGaps={false}
							height={480}
							labels={cwResponsiveLineChartLabels()}
						/>
					</div>
				{/if}

				<div class="device-page__display">
					{#if device.device_type.data_table_v2 === 'cw_soil_data'}
						<DemoSoilDisplay
							{latestData}
							{historicalData}
							{loading}
							{dliToday}
							{dliHistory}
							{ppfdReading}
						/>
					{:else}
						<DemoAirDisplay {latestData} {historicalData} {loading} />
					{/if}
				</div>

				<p class="device-page__demo-note">
					これはサンプルデータによるデモ画面です。実際の計測値ではありません。
				</p>
			{/if}
		</div>
	{/if}
</AppPage>

<style>
	.device-page {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-width: 0;
	}

	.device-page__display,
	.device-page__chart {
		width: 100%;
		min-width: 0;
	}

	/* Same grid as the display components' .kpi-grid, so the air cards above the
	   chart line up with the soil cards below it. */
	.device-page__airstats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 1rem;
		min-width: 0;
	}

	/* Match the soil cards below the chart: titles stay on one line. */
	.device-page__airstats :global(.cw-stat-card__title) {
		white-space: nowrap;
	}

	.device-page__loading {
		display: flex;
		justify-content: center;
		padding: 3rem 0;
	}

	.device-page__empty-message {
		margin: 0;
		color: var(--cw-text-muted, #475467);
	}

	.device-page__demo-note {
		margin: 0;
		padding-bottom: 0.5rem;
		font-size: var(--cw-text-xs);
		color: var(--cw-text-muted);
	}

	@media (max-width: 720px) {
		.device-page {
			padding-right: 0;
			padding-bottom: 0.75rem;
		}
	}

	/* CWUI's .cw-rlc--xs breakpoint fires below 380px of *content* width, and the
	   class it applies drops the chart's padding from 16px to 4px. Because
	   .cw-rlc is border-box, that changes the width the breakpoint measures: a
	   390px chart reads 358 (xs on) -> repads to 4px -> reads 382 (xs off) ->
	   repads to 16px, forever. It is visible as a chart that vibrates, and it
	   traps any chart between 388px and 412px wide — an iPhone 12 Pro is 390.
	   Pinning the padding to the same value on both sides of the breakpoint
	   makes the measurement independent of the class, so it settles in one pass.
	   Fix belongs upstream in CwResponsiveLineChart (the breakpoint needs
	   hysteresis, or should not alter padding); this keeps phones usable now. */
	@media (max-width: 460px) {
		.device-page__chart :global(.cw-rlc) {
			padding: 4px;
		}
	}
</style>
