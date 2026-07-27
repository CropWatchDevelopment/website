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
		metricColor,
		type CwResponsiveLineSeries
	} from '@cropwatchdevelopment/cwui';
	import AppPage from '../../AppPage.svelte';
	import DemoAirDisplay from './DemoAirDisplay.svelte';
	import DemoSoilDisplay from './DemoSoilDisplay.svelte';
	import DemoDeviceHeader from './DemoDeviceHeader.svelte';
	import { createDemoGroups, type DemoRow } from '../../demo-data';
	import {
		buildHistory,
		DEFAULT_RANGE_SELECTION,
		getRangeOptions,
		type RangeSelection
	} from '../../demo-history';
	import { isDemoSignedIn } from '../../demo-session';
	import { labelFor } from '../../sensor-labels';
	import { cwResponsiveLineChartLabels } from '../../cwui-labels';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	/** Columns that belong on the chart. Battery and pressure stay in the table. */
	const CHART_COLUMNS = ['temperature_c', 'humidity', 'co2', 'moisture', 'ec'];

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
		return CHART_COLUMNS.filter((column) => column in device.details).map((column) => {
			const def = labelFor(column);
			const { color, gradient } = metricColor(column);
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

	onMount(() => {
		if (!isDemoSignedIn()) {
			goto('/demo/login', { replaceState: true });
			return;
		}
		if (!device) return;
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
							labels={cwResponsiveLineChartLabels()}
						/>
					</div>
				{/if}

				<div class="device-page__display">
					{#if device.device_type.data_table_v2 === 'cw_soil_data'}
						<DemoSoilDisplay {latestData} {historicalData} {loading} />
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
