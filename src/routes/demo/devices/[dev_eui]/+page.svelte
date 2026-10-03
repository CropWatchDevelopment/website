<!--
  /demo/devices/[dev_eui] — port of the CropWatch device detail page
  (CropWatch/src/routes/locations/[location_id]/devices/[dev_eui]/+page.svelte).

  Same composition: back button → header card with the range picker →
  CwResponsiveLineChart (with the derived 露点 line, off by default, on air
  devices) → the display component for the device's data table
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
		metricColor,
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
		type RangeSelection
	} from '../../demo-history';
	import { computeDewPoint } from '../../dew-point';
	import { isDemoSignedIn } from '../../demo-session';
	import { labelFor } from '../../sensor-labels';
	import { cwResponsiveLineChartLabels } from '../../cwui-labels';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	/** Columns that belong on the chart — every reading the demo devices send. */
	const CHART_COLUMNS = [
		'temperature_c',
		'humidity',
		'moisture',
		'ec',
		'ph',
		'co2',
		'air_temperature_c',
		'air_humidity',
		'ppfd'
	];

	/**
	 * On the soil page these start switched off in the top chart: the air
	 * readings have their own 空気質 chart below and PPFD its gauge, so the top
	 * chart opens on the soil itself. They stay one click away in the legend.
	 */
	const SOIL_INITIAL_HIDDEN = ['ph', 'co2', 'air_temperature_c', 'air_humidity', 'ppfd'];

	/**
	 * Series id of the derived dew point line. The app adds it to every air
	 * device's chart, switched off until the viewer turns it on.
	 */
	const DEW_POINT_SERIES_ID = 'dew_point';

	/**
	 * Column -> the metric key CWUI colors by. CWUI colors soil temperature
	 * differently from air temperature, and on a soil device `temperature_c` is
	 * ground temperature.
	 */
	function colorKeyFor(column: string, dataTable: string): string {
		if (column === 'temperature_c' && dataTable === 'cw_soil_data') return 'soil_temperature';
		if (column === 'air_temperature_c') return 'air_temperature';
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

	let activeRange = $state<RangeSelection>(DEFAULT_RANGE_SELECTION);
	const isAirDevice = $derived(device?.device_type.data_table_v2 === 'cw_air_data');
	const isSoilDevice = $derived(device?.device_type.data_table_v2 === 'cw_soil_data');
	// DLI is a per-day total, independent of the selected range, so it is built
	// once on mount rather than on every range change.
	let dliHistory = $state<{ date: string; value: number }[]>([]);
	const dliToday = $derived(dliHistory.at(-1)?.value ?? 0);
	// Generated on the client only: the series is anchored to "now", so building
	// it during SSR would bake in a timestamp the client then disagrees with.
	let historicalData = $state<Record<string, number | string>[]>([]);
	let loading = $state(true);

	const latestData = $derived(historicalData[0] ?? null);
	const lastUpdatedAt = $derived(
		typeof latestData?.created_at === 'string' ? latestData.created_at : null
	);

	const chartSeries = $derived.by<CwResponsiveLineSeries[]>(() => {
		if (!device || historicalData.length === 0) return [];
		const series: CwResponsiveLineSeries[] = CHART_COLUMNS.filter(
			(column) => column in device.details
		).map((column) => {
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
		if (isAirDevice) {
			const { color, gradient } = metricColor(DEW_POINT_SERIES_ID);
			const def = labelFor(DEW_POINT_SERIES_ID);
			series.push({
				id: DEW_POINT_SERIES_ID,
				label: def.label,
				unit: def.unit,
				color,
				gradient: gradient ?? false,
				decimals: 2,
				data: historicalData
					.map((row) => ({
						t: new Date(String(row.created_at)).getTime(),
						v: computeDewPoint(Number(row.temperature_c), Number(row.humidity))
					}))
					.reverse()
			});
		}
		return series;
	});

	function selectRange(selection: RangeSelection) {
		if (!device) return;
		activeRange = selection;
		loading = true;
		historicalData = buildHistory(device, selection, Date.now());
		loading = false;
	}

	onMount(() => {
		if (!isDemoSignedIn()) {
			goto('/demo/login', { replaceState: true });
			return;
		}
		if (!device) return;
		if (isSoilDevice) dliHistory = buildDliHistory(device, Date.now());
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
				{#if chartSeries.length > 0}
					<div class="device-page__chart">
						<CwResponsiveLineChart
							series={chartSeries}
							title={device.name}
							subtitle="時系列データ"
							ranges={[]}
							theme="dark"
							showThemeToggle={false}
							showDataGaps={false}
							height={480}
							initialHidden={isAirDevice
								? [DEW_POINT_SERIES_ID]
								: isSoilDevice
									? SOIL_INITIAL_HIDDEN
									: []}
							labels={cwResponsiveLineChartLabels()}
						/>
					</div>
				{/if}

				<div class="device-page__display">
					{#if device.device_type.data_table_v2 === 'cw_soil_data'}
						<DemoSoilDisplay {latestData} {historicalData} {loading} {dliToday} {dliHistory} />
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
</style>
