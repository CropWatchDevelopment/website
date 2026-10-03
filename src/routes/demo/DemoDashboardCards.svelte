<script module lang="ts">
	/** Location-card layout: aligned responsive grid, or tightly-packed masonry. */
	export type CardLayout = 'grid' | 'masonry';
</script>

<!--
  Port of CropWatch/src/lib/components/dashboard/DashboardCards.svelte.

  Same CwLocationCard + CwSensorCard composition, same details list, same grid
  and masonry CSS. What is stripped out is everything that talks to a real
  tenant: ApiService, the auth token, paging, the per-device refresh scheduler
  and the "詳細" deep-link into a device page. Readings come from the same
  generator as the device pages (demo-history.ts), refreshed on a timer, so a
  card always shows the reading its device page has for the latest upload.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { CwButton, CwDuration, CwLocationCard, CwSensorCard } from '@cropwatchdevelopment/cwui';
	import { createDemoGroups, type DemoRow } from './demo-data';
	import { latestUploadAt, readingAt } from './demo-history';
	import { formatMeasurement, isDisplayableColumn, labelFor } from './sensor-labels';

	interface Filters {
		name: string;
	}

	/** How often the demo checks for a new upload, in ms. */
	const REFRESH_INTERVAL_MS = 15_000;

	let { filters, cardLayout = 'grid' }: { filters: Filters; cardLayout?: CardLayout } = $props();

	let groups = $state(createDemoGroups());

	// Rendered on the server too, so timestamps must not be baked into the SSR
	// HTML — they'd disagree with the client and make CwDuration hydrate wrong.
	// Until this fills in, CwSensorCard has no freshness signal and falls back to
	// the `status` prop, which the demo always reports as online.
	let lastSeenAt = $state<string | null>(null);

	const visibleGroups = $derived.by(() => {
		const needle = filters.name.trim().toLowerCase();
		if (!needle) return groups;
		return groups
			.map((group) => ({
				...group,
				devices: group.devices.filter(
					(device) =>
						device.name.toLowerCase().includes(needle) ||
						group.location.name.toLowerCase().includes(needle)
				)
			}))
			.filter(
				(group) => group.devices.length > 0 || group.location.name.toLowerCase().includes(needle)
			);
	});

	/** Load each device's reading for its most recent 10-minute upload. */
	function tick() {
		const now = Date.now();
		// Freshness for the cards: the latest 10-minute upload in real time. The
		// cucumber house's readings are frozen at 13:00 (to show its midday
		// peak), but its card should still read as a live, online device.
		lastSeenAt = new Date(Math.floor(now / (10 * 60_000)) * (10 * 60_000)).toISOString();
		for (const group of groups) {
			for (const device of group.devices) {
				const uploadedAt = new Date(latestUploadAt(device, now)).toISOString();
				device.details = readingAt(device, Date.parse(uploadedAt));
				device.latest = {
					created_at: uploadedAt,
					primary: device.details[device.device_type.primary_data_v2] ?? null,
					secondary: device.details[device.device_type.secondary_data_v2] ?? null
				};
				device.last_data_updated_at = uploadedAt;
			}
		}
	}

	function primaryProps(row: DemoRow) {
		return readingProps(row.device_type.primary_data_v2, row.latest?.primary);
	}

	function secondaryProps(row: DemoRow) {
		const col = row.device_type.secondary_data_v2;
		if (!col || col === '-') return { value: null, unit: '', icon: undefined, label: undefined };
		return readingProps(col, row.latest?.secondary);
	}

	// Integer metrics (CO₂) pass their formatted text as the label, as the app
	// does, so the card doesn't re-format them with its 2-decimal number
	// formatter ("630.00 ppm").
	function readingProps(col: string, raw: unknown) {
		const def = labelFor(col);
		const value = typeof raw === 'number' ? raw : null;
		return {
			value,
			unit: def.unit,
			icon: def.icon,
			label: def.format === 'integer' && value !== null ? formatMeasurement(col, value) : undefined
		};
	}

	// The data table picks the label, so a soil probe's temperature_c reads as
	// 土壌温度 next to its 気温 rather than as a second, ambiguous 温度.
	function detailEntries(details: Record<string, number | boolean | string>, dataTable: string) {
		return Object.entries(details)
			.filter(([col, value]) => isDisplayableColumn(col) && value !== null && value !== undefined)
			.map(([col, value]) => {
				const def = labelFor(col, dataTable);
				return {
					col,
					def,
					valueDisplay: typeof value === 'number' ? formatMeasurement(col, value) : String(value),
					unit: def.unit
				};
			});
	}

	onMount(() => {
		tick();
		const timer = setInterval(tick, REFRESH_INTERVAL_MS);
		return () => clearInterval(timer);
	});
</script>

<div class="dashboard-cards__scroll">
	{#if visibleGroups.length === 0}
		<p class="dashboard-cards__empty">デバイスがありません</p>
	{:else}
		<div class="dashboard-cards__groups dashboard-cards__groups--{cardLayout}">
			{#each visibleGroups as group (group.key)}
				<CwLocationCard title={group.location.name} class="dashboard-cards__location">
					{#each group.devices as row (row.dev_eui)}
						{@const primary = primaryProps(row)}
						{@const secondary = secondaryProps(row)}
						{@const detailRows = detailEntries(row.details, row.device_type.data_table_v2)}
						<CwSensorCard
							label={row.name}
							status="online"
							detailsHeading="詳細データ"
							primaryValue={primary.value}
							primaryUnit={primary.unit}
							primaryLabel={primary.label}
							primary_icon={primary.icon}
							secondaryValue={secondary.value}
							secondaryUnit={secondary.unit}
							secondaryLabel={secondary.label}
							secondary_icon={secondary.icon}
							lastSeenAt={lastSeenAt ?? undefined}
							expireAfterMinutes={row.upload_interval ??
								row.device_type.default_upload_interval ??
								60}
							storageKey={`demo:${row.dev_eui}`}
						>
							<dl class="dashboard-cards__details-list">
								{#each detailRows as { col, def, valueDisplay, unit } (col)}
									<div class="dashboard-cards__details-row">
										<dt>{def.label}</dt>
										<dd>
											{valueDisplay}
											<small><sup>{unit ? ` ${unit}` : ''}</sup></small>
										</dd>
									</div>
								{/each}
								<!-- Always show Last Seen at the BOTTOM of the details list -->
								{#if lastSeenAt}
									<div class="dashboard-cards__details-row">
										<dt>最終受信</dt>
										<dd>
											<CwDuration from={lastSeenAt} class="ml-1 text-xs text-slate-400" />
										</dd>
									</div>
								{/if}
								<!-- END OF LAST SEEN -->
							</dl>
							<span class="flex w-full flex-row gap-1">
								<CwButton
									variant="secondary"
									class="w-full"
									onclick={() => goto(`/demo/devices/${row.dev_eui}`)}
								>
									詳細
								</CwButton>
							</span>
						</CwSensorCard>
					{/each}
				</CwLocationCard>
			{/each}
		</div>
	{/if}
</div>

<style>
	.dashboard-cards__scroll {
		flex: 1 1 auto;
		min-height: 0;
		overflow-y: auto;
		padding: 0.5rem 0.5rem 1.5rem;
	}

	.dashboard-cards__empty {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		padding: 3rem 0.5rem;
		color: var(--cw-text-muted, #94a3b8);
	}

	/* Responsive layout of location cards.
	   Columns — Mobile: 1. Tablet: 2. Small laptop: 3. Desktop: 5. */
	.dashboard-cards__groups :global(.dashboard-cards__location) {
		width: 100%;
		min-width: 0;
	}

	/* Grid layout: aligned rows — a tall card stretches its whole row, leaving
	   shorter neighbours with empty space below them. */
	.dashboard-cards__groups--grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.5rem;
		align-items: start;
	}

	/* Masonry layout: CSS columns pack cards top-to-bottom, so a short card
	   sits directly under another regardless of how tall neighbours are. */
	.dashboard-cards__groups--masonry {
		display: block;
		columns: 1;
		column-gap: 0.5rem;
	}
	.dashboard-cards__groups--masonry :global(.dashboard-cards__location) {
		break-inside: avoid;
		margin-bottom: 0.5rem;
	}

	@media (min-width: 640px) {
		.dashboard-cards__groups--grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.dashboard-cards__groups--masonry {
			columns: 2;
		}
	}
	@media (min-width: 1024px) {
		.dashboard-cards__groups--grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
		.dashboard-cards__groups--masonry {
			columns: 3;
		}
	}
	@media (min-width: 1280px) {
		.dashboard-cards__groups--grid {
			grid-template-columns: repeat(5, minmax(0, 1fr));
		}
		.dashboard-cards__groups--masonry {
			columns: 5;
		}
	}

	/* ── Demo-only presentation tweak ──────────────────────────────────
	   Everything above this point is the dashboard's CSS unchanged. A real
	   tenant fills those 3- and 5-column tracks; this demo has two location
	   cards, so from the laptop breakpoint up we hold at two columns and centre
	   the grid instead of stranding three empty columns on a wide screen.
	   Placed after the 1280px block so it wins there on source order. */
	@media (min-width: 1024px) {
		.dashboard-cards__groups--grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.dashboard-cards__groups--masonry {
			columns: 2;
		}
		.dashboard-cards__groups {
			max-width: calc(390px * 2 + 0.5rem);
			margin-inline: auto;
		}
	}

	.dashboard-cards__details-list {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.25rem 1rem;
		margin: 0;
		padding: 0;
	}

	.dashboard-cards__details-row {
		display: contents;
	}

	.dashboard-cards__details-row dt {
		color: var(--cw-text-muted, #94a3b8);
		font-size: 0.875rem;
	}

	.dashboard-cards__details-row dd {
		margin: 0;
		font-weight: 600;
		text-align: right;
	}
</style>
