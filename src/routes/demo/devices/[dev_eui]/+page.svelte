<!--
  /demo/devices/[dev_eui] — port of the CropWatch device detail page
  (CropWatch/src/routes/locations/[location_id]/devices/[dev_eui]/+page.svelte).

  Same composition: back button → header card with the range picker →
  CwResponsiveLineChart (with the derived 露点 line, off by default, on air
  devices, and the crop's target lines on a soil sensor's soil readings) →
  the display component for the device's data table (AirDisplay for
  cw_air_data, SoilDisplay for cw_soil_data). Everything the real page does
  against a live tenant (ApiService, permissions, relay control, CSV export,
  notes) is gone; the history comes from demo-history.ts and the soil
  sensor's AI growing report from demo-ai-report.ts.
-->
<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import {
		CwCard,
		CwResponsiveLineChart,
		CwSpinner,
		metricColor,
		type CwResponsiveLineSeries
	} from '@cropwatchdevelopment/cwui';
	import type { CropTypeDetailDto } from '../../agronomy/crop-targets';
	import AppPage from '../../AppPage.svelte';
	import DemoAirDisplay from './DemoAirDisplay.svelte';
	import DemoSoilDisplay from './DemoSoilDisplay.svelte';
	import DemoDeviceHeader from './DemoDeviceHeader.svelte';
	import { buildAiReport, type AiRecommendationDto } from '../../demo-ai-report';
	import { createDemoGroups, type DemoRow } from '../../demo-data';
	import {
		buildDliHistory,
		buildHistory,
		DEFAULT_RANGE_SELECTION,
		deviceNow,
		getRangeOptions,
		type RangeSelection
	} from '../../demo-history';
	import { computeDewPoint } from '../../dew-point';
	import { sunCoordinates } from '../../demo-crops';
	import { isDemoSignedIn } from '../../demo-session';
	import { labelFor } from '../../sensor-labels';
	import { cwResponsiveLineChartLabels } from '../../cwui-labels';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	/**
	 * Columns that belong on the chart: every reading the demo devices send.
	 * Like the app, all of them start switched on.
	 */
	const CHART_COLUMNS = [
		'temperature_c',
		'humidity',
		'moisture',
		'ec',
		'co2',
		'air_temperature_c',
		'air_humidity',
		'ppfd'
	];

	/**
	 * Soil columns whose crop targets hold all day, by target metric (the app's
	 * CROP_TARGET_SERIES). Air readings get no line: their targets change
	 * between day and night, which one line cannot show.
	 */
	const CROP_TARGET_SERIES: Record<string, string> = {
		moisture: 'soil_moisture',
		temperature_c: 'soil_temperature',
		ec: 'soil_ec'
	};

	/** The app's withCropTargetLines: the optimal band's ends as lines on the soil series. */
	function withCropTargetLines(
		series: CwResponsiveLineSeries[],
		crop: CropTypeDetailDto | undefined
	): CwResponsiveLineSeries[] {
		if (!crop) return series;
		return series.map((line) => {
			const metric = CROP_TARGET_SERIES[line.id];
			const target = crop.targets.find((t) => t.metric === metric && t.period === 'all');
			if (!target) return line;
			const ends = [
				{ value: target.optimal_min, label: `${crop.name_ja} 下限` },
				{ value: target.optimal_max, label: `${crop.name_ja} 上限` }
			].flatMap(({ value, label }) =>
				value === null ? [] : [{ value, label, color: 'var(--cw-success-500)' }]
			);
			return ends.length > 0
				? { ...line, thresholds: [...(line.thresholds ?? []), ...ends] }
				: line;
		});
	}

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
	// The DLI history covers the complete days before today, independent of the
	// selected range, so it is built once on mount rather than on every range
	// change (the app loads it once per device and day).
	let dliHistory = $state<{ date: string; value: number }[]>([]);
	// Yesterday's AI growing report: like the DLI history it covers complete
	// days, so it too is built once on mount (the app loads the newest one).
	let aiReport = $state<AiRecommendationDto | null>(null);
	// The device's clock: frozen at 13:00 for the cucumber house.
	let clockNow = $state(0);
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
				// The app's buildSensorChartSeries: two decimals, none for integer metrics.
				decimals: def.format === 'integer' ? 0 : 2,
				// Oldest-first for the chart; the display components want newest-first.
				data: historicalData
					.map((row) => ({
						t: new Date(String(row.created_at)).getTime(),
						v: typeof row[column] === 'number' ? (row[column] as number) : null
					}))
					.reverse()
			};
		});
		if (isSoilDevice) return withCropTargetLines(series, device.crop);
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

	/**
	 * Back, as in the app: to where the user came from (`?backTo=`, demo pages
	 * only, e.g. the dashboard), else to the device's location page.
	 */
	function goBack() {
		const backTo = page.url.searchParams.get('backTo');
		if (backTo?.startsWith('/demo')) goto(resolve(backTo as '/demo'));
		else if (device?.location)
			goto(
				resolve('/demo/locations/[location_id]', {
					location_id: String(device.location.location_id)
				})
			);
		else goto(resolve('/demo'));
	}

	function selectRange(selection: RangeSelection) {
		if (!device) return;
		activeRange = selection;
		loading = true;
		const now = Date.now();
		clockNow = deviceNow(device, now);
		historicalData = buildHistory(device, selection, now);
		loading = false;
	}

	onMount(() => {
		if (!isDemoSignedIn()) {
			goto(resolve('/demo/login'), { replaceState: true });
			return;
		}
		if (!device) return;
		if (isSoilDevice) {
			const now = Date.now();
			dliHistory = buildDliHistory(device, now);
			aiReport = buildAiReport(device, now);
		}
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
				onBack={goBack}
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
							initialHidden={isAirDevice ? [DEW_POINT_SERIES_ID] : []}
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
							crop={device.crop ?? null}
							coordinates={sunCoordinates(device.location?.coordinates)}
							now={clockNow}
							{dliHistory}
							{aiReport}
						/>
					{:else}
						<DemoAirDisplay {latestData} {historicalData} {loading} />
					{/if}
				</div>
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

	@media (max-width: 720px) {
		.device-page {
			padding-right: 0;
			padding-bottom: 0.75rem;
		}
	}
</style>
