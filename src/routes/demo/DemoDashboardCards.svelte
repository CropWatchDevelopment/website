<script module lang="ts">
	/** Location-card layout: aligned responsive grid, or tightly-packed masonry. */
	export type CardLayout = 'grid' | 'masonry';
</script>

<!--
  Port of CropWatch/src/lib/components/dashboard/DashboardCards.svelte.

  Same CwLocationCard + CwSensorCard composition, same details list, same grid
  and masonry CSS. What is stripped out is everything that talks to a real
  tenant: ApiService, the auth token, paging, the per-device refresh scheduler
  and the "詳細" deep-link into a device page. Readings come from demo-data.ts
  and drift on a timer so the cards read as live.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { CwButton, CwDuration, CwLocationCard, CwSensorCard } from '@cropwatchdevelopment/cwui';
	import { createDemoGroups, DEMO_DRIFT, type DemoRow } from './demo-data';
	import { formatMeasurement, isDisplayableColumn, labelFor } from './sensor-labels';

	interface Filters {
		name: string;
	}

	/** How often the demo nudges its readings, in ms. */
	const DRIFT_INTERVAL_MS = 12_000;

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

	/** Nudge one reading inside its envelope so consecutive ticks look plausible. */
	function drift(column: string, value: number): number {
		const envelope = DEMO_DRIFT[column];
		if (!envelope) return value;
		const next = value + (Math.random() * 2 - 1) * envelope.step;
		const clamped = Math.min(envelope.max, Math.max(envelope.min, next));
		const factor = 10 ** envelope.precision;
		return Math.round(clamped * factor) / factor;
	}

	function tick() {
		lastSeenAt = new Date().toISOString();
		for (const group of groups) {
			for (const device of group.devices) {
				for (const column of Object.keys(device.details)) {
					const value = device.details[column];
					if (typeof value === 'number') device.details[column] = drift(column, value);
				}
				device.latest = {
					created_at: lastSeenAt,
					primary: device.details[device.device_type.primary_data_v2] ?? null,
					secondary: device.details[device.device_type.secondary_data_v2] ?? null
				};
				device.last_data_updated_at = lastSeenAt;
			}
		}
	}

	function primaryProps(row: DemoRow) {
		return readingProps(row.device_type.primary_data_v2, row.latest?.primary);
	}

	function secondaryProps(row: DemoRow) {
		const col = row.device_type.secondary_data_v2;
		if (!col || col === '-') return { value: null, unit: '', icon: undefined };
		return readingProps(col, row.latest?.secondary);
	}

	function readingProps(col: string, raw: unknown) {
		const def = labelFor(col);
		return {
			value: typeof raw === 'number' ? raw : null,
			unit: def.unit,
			icon: def.icon
		};
	}

	function detailEntries(details: Record<string, number | boolean | string>) {
		return Object.entries(details)
			.filter(([col, value]) => isDisplayableColumn(col) && value !== null && value !== undefined)
			.map(([col, value]) => {
				const def = labelFor(col);
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
		const timer = setInterval(tick, DRIFT_INTERVAL_MS);
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
						{@const detailRows = detailEntries(row.details)}
						<CwSensorCard
							label={row.name}
							status="online"
							detailsHeading="詳細データ"
							primaryValue={primary.value}
							primaryUnit={primary.unit}
							primary_icon={primary.icon}
							secondaryValue={secondary.value}
							secondaryUnit={secondary.unit}
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
