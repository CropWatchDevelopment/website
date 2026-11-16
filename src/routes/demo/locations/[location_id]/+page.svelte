<!--
  /demo/locations/[location_id] — port of the CropWatch location page
  (CropWatch/src/routes/locations/[location_id]/+page.svelte).

  Same composition: back button → header (status, coordinates and ID chips;
  更新 / デバイスを追加) → four KPI cards → map | device health (ring and
  要確認 list) → filterable device table with signal bars → location details.
  Readings and last-seen times come from the demo generator (demo-history.ts),
  refreshed on a timer like the dashboard. The settings buttons are left out
  (the app shows them only to managers) and デバイスを追加 is shown disabled:
  the demo has no device setup flow.
-->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { assets, resolve } from '$app/paths';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import {
		CwButton,
		CwCard,
		CwCopy,
		CwDataTable,
		type CwColumnDef,
		type CwTableQuery,
		type CwTableResult
	} from '@cropwatchdevelopment/cwui';
	import AppPage from '../../AppPage.svelte';
	import DemoIcon from '../../DemoIcon.svelte';
	import { cwCopyLabels, cwDataTableLabels } from '../../cwui-labels';
	import { findDemoGroup, type DemoRow } from '../../demo-data';
	import { lastHeardAt, latestUploadAt, readingAt } from '../../demo-history';
	import { isDemoSignedIn } from '../../demo-session';
	import LocationMap from '../LocationMap.svelte';
	import SignalStrength from '../SignalStrength.svelte';
	import { signalBars } from '../signal-strength';
	import {
		classifyHealth,
		formatRelative,
		summarizeHealth,
		type DeviceHealth,
		type LocationDeviceRow
	} from '../location-overview';
	import type { PageProps } from './$types';

	type HealthFilter = 'all' | DeviceHealth;

	const ICON = (name: string) => `${assets}/demo/icons/${name}.svg`;
	const LOCALE = 'ja-JP';

	let { data }: PageProps = $props();

	const group = $derived(findDemoGroup(data.locationId));
	const location = $derived(group?.location ?? null);
	const devices = $derived<DemoRow[]>(group?.devices ?? []);

	let loading = $state(false);
	let healthFilter = $state<HealthFilter>('all');
	// Rendered on the server too, so no timestamps until the client takes over
	// (they would disagree with the client's clock and hydrate wrong).
	let now = $state<number | null>(null);
	let refreshing = $state(false);

	const coordinates = $derived(location?.coordinates ?? null);

	/** The newest reading and last-heard time per device, for `now`. */
	const deviceRows = $derived.by(() =>
		devices.map((device): LocationDeviceRow => {
			const lastSeen = now === null ? null : new Date(lastHeardAt(device, now)).toISOString();
			const latest = now === null ? device.details : readingAt(device, latestUploadAt(device, now));
			const read = (column: string) => {
				const value = latest[column];
				return typeof value === 'number' ? value : null;
			};
			return {
				dev_eui: device.dev_eui,
				name: device.name,
				group: device.group,
				// Until the client clock is known, show the device as it is set up.
				health:
					now === null
						? device.silentForMinutes
							? 'offline'
							: 'online'
						: classifyHealth(lastSeen, device.upload_interval, now),
				lastSeen,
				temperature: read('temperature_c'),
				humidity: read('humidity'),
				co2: read('co2'),
				signal: device.signal,
				lat: device.lat ?? null,
				long: device.long ?? null
			};
		})
	);

	const rowsByDevEui = $derived(new Map(deviceRows.map((row) => [row.dev_eui, row])));
	const summary = $derived(summarizeHealth(deviceRows));
	const attentionRows = $derived(deviceRows.filter((row) => row.health !== 'online'));
	const devicePins = $derived(
		deviceRows.flatMap((row) =>
			row.lat != null && row.long != null
				? [{ name: row.name, lat: row.lat, long: row.long, health: row.health }]
				: []
		)
	);

	const healthLabel: Record<DeviceHealth, string> = {
		online: 'オンライン',
		offline: 'オフライン',
		never: '未受信'
	};

	// Ring arcs on a circle whose circumference is 100 units, so each arc's
	// dash length is its percentage; offsets start the ring at 12 o'clock.
	const healthArcs = $derived.by(() => {
		let start = 0;
		return (['online', 'offline', 'never'] as const).map((health) => {
			const value = summary[health];
			const length = summary.total === 0 ? 0 : (value / summary.total) * 100;
			const arc = { health, value, label: healthLabel[health], length, offset: 25 - start };
			start += length;
			return arc;
		});
	});

	const filterOptions = $derived<{ value: HealthFilter; label: string }[]>([
		{ value: 'all', label: `すべて ${summary.total}` },
		{ value: 'online', label: `オンライン ${summary.online}` },
		{ value: 'offline', label: `オフライン ${summary.offline}` },
		{ value: 'never', label: `未受信 ${summary.never}` }
	]);

	const columns: CwColumnDef<LocationDeviceRow>[] = [
		{ key: 'health', header: 'ステータス', sortable: true, width: '10rem' },
		{ key: 'name', header: 'デバイス名', sortable: true },
		{ key: 'temperature', header: '温度', sortable: true, width: '7rem', hideBelow: 'md' },
		{ key: 'humidity', header: '湿度', sortable: true, width: '7rem', hideBelow: 'md' },
		{ key: 'co2', header: 'CO₂', sortable: true, width: '7rem', hideBelow: 'lg' },
		{ key: 'lastSeen', header: '最終受信', sortable: true, width: '10rem', hideBelow: 'sm' },
		{ key: 'signal', header: '電波強度', sortable: true, width: '6rem', hideBelow: 'sm' },
		{ key: 'dev_eui', header: 'Device EUI', sortable: true, width: '14rem', hideBelow: 'lg' }
	];

	function compareRows(a: LocationDeviceRow, b: LocationDeviceRow, column: string): number {
		switch (column) {
			case 'name':
				return a.name.localeCompare(b.name, LOCALE, { numeric: true });
			case 'dev_eui':
				return a.dev_eui.localeCompare(b.dev_eui);
			case 'health':
				return a.health.localeCompare(b.health);
			case 'lastSeen':
				return (a.lastSeen ?? '').localeCompare(b.lastSeen ?? '');
			case 'temperature':
			case 'humidity':
			case 'co2':
				return (a[column] ?? -Infinity) - (b[column] ?? -Infinity);
			case 'signal': {
				const bars = (row: LocationDeviceRow) =>
					row.signal ? signalBars(row.signal.rssi, row.signal.snr) : -1;
				return bars(a) - bars(b) || (a.signal?.rssi ?? -Infinity) - (b.signal?.rssi ?? -Infinity);
			}
			default:
				return 0;
		}
	}

	async function loadData(query: CwTableQuery): Promise<CwTableResult<LocationDeviceRow>> {
		loading = true;
		try {
			const search = query.search.trim().toLowerCase();
			const filter = query.filters.health?.[0];
			let rows = deviceRows;

			if (filter) rows = rows.filter((row) => row.health === filter);
			if (search) {
				rows = rows.filter(
					(row) =>
						row.name.toLowerCase().includes(search) || row.dev_eui.toLowerCase().includes(search)
				);
			}
			if (query.sort) {
				const { column, direction } = query.sort;
				const factor = direction === 'asc' ? 1 : -1;
				rows = [...rows].sort((a, b) => compareRows(a, b, column) * factor);
			}

			const start = Math.max(0, (query.page - 1) * query.pageSize);
			return { rows: rows.slice(start, start + query.pageSize), total: rows.length };
		} finally {
			loading = false;
		}
	}

	/** Back: where the user came from (`?backTo=`, demo pages only), else the dashboard. */
	function goBack() {
		const backTo = page.url.searchParams.get('backTo');
		goto(resolve((backTo?.startsWith('/demo') ? backTo : '/demo') as '/demo'));
	}

	function refresh() {
		refreshing = true;
		now = Date.now();
		// The app waits on the API here; give the button the same brief spin.
		setTimeout(() => (refreshing = false), 400);
	}

	onMount(() => {
		if (!isDemoSignedIn()) {
			goto(resolve('/demo/login'), { replaceState: true });
			return;
		}
		now = Date.now();
		// Ticks "x 分前" and the offline check, and picks up each new upload.
		const timer = setInterval(() => (now = Date.now()), 30_000);
		return () => clearInterval(timer);
	});
</script>

<svelte:head>
	<title>{location ? `${location.name} - CropWatch デモ` : 'ロケーション - CropWatch デモ'}</title>
</svelte:head>

<AppPage>
	<div>
		<CwButton id="location-back-button" variant="secondary" size="sm" onclick={goBack}>
			&larr; ダッシュボードに戻る
		</CwButton>
	</div>

	{#if !location}
		<CwCard title="ロケーションが見つかりません" elevated>
			<p class="muted">このデモに、指定されたロケーションはありません。</p>
		</CwCard>
	{:else}
		<header class="location-header">
			<div class="location-header__titles">
				<div class="location-header__eyebrow">
					<DemoIcon src={ICON('location')} alt="" />
					<a class="location-header__crumb" href={resolve('/demo/locations')}>ロケーション</a>
					{#if location.group}
						<span aria-hidden="true">/</span>
						<span>{location.group}</span>
					{/if}
				</div>
				<h1 class="location-header__title">{location.name}</h1>
				<div class="location-header__chips">
					{#if summary.total > 0}
						<span
							class="location-chip"
							class:location-chip--success={summary.online === summary.total}
						>
							<span
								class="dot"
								class:dot--online={summary.online === summary.total}
								class:dot--warning={summary.online !== summary.total}
							></span>
							{summary.total}台中{summary.online}台が送信中
						</span>
					{/if}
					{#if coordinates}
						<span class="location-chip location-chip--mono">
							{coordinates.lat.toFixed(4)}, {coordinates.long.toFixed(4)}
						</span>
					{:else}
						<span class="location-chip location-chip--warning">座標なし</span>
					{/if}
					<span class="location-chip">ID {location.location_id}</span>
				</div>
			</div>

			<div class="location-header__actions">
				<CwButton
					id="location-refresh-button"
					variant="secondary"
					loading={refreshing}
					disabled={summary.total === 0}
					onclick={refresh}
				>
					<DemoIcon src={ICON('refresh')} alt="" />
					更新
				</CwButton>
				<!-- The demo has no device setup flow. -->
				<CwButton id="location-add-device-button" variant="primary" disabled>
					<DemoIcon src={ICON('add')} alt="" />
					デバイスを追加
				</CwButton>
			</div>
		</header>

		<section class="kpi-grid" aria-label="ロケーションの概要">
			<CwCard>
				<div class="kpi">
					<div class="kpi__head">
						<span>デバイス</span>
						<DemoIcon src={ICON('device')} alt="" class="kpi__icon kpi__icon--info" />
					</div>
					<span class="kpi__value">{summary.total}</span>
					<span class="kpi__sub">このロケーションの合計</span>
				</div>
			</CwCard>
			<CwCard>
				<div class="kpi">
					<div class="kpi__head">
						<span>オンライン</span>
						<DemoIcon src={ICON('check_circle')} alt="" class="kpi__icon kpi__icon--success" />
					</div>
					<span class="kpi__value kpi__value--success">{summary.online}</span>
					<span class="kpi__sub">{summary.percentOnline}% が予定どおり送信中</span>
				</div>
			</CwCard>
			<CwCard>
				<div class="kpi">
					<div class="kpi__head">
						<span>要確認</span>
						<DemoIcon src={ICON('active_alert')} alt="" class="kpi__icon kpi__icon--danger" />
					</div>
					<span class="kpi__value" class:kpi__value--danger={attentionRows.length > 0}>
						{attentionRows.length}
					</span>
					<span class="kpi__sub">
						{attentionRows.length > 0
							? `オフライン ${summary.offline}台・未受信 ${summary.never}台`
							: 'すべてのデバイスが正常です'}
					</span>
				</div>
			</CwCard>
			<CwCard>
				<div class="kpi">
					<div class="kpi__head">
						<span>最終受信</span>
						<DemoIcon src={ICON('history')} alt="" class="kpi__icon" />
					</div>
					<span class="kpi__value">
						{now === null
							? '—'
							: (formatRelative(summary.lastUplink?.lastSeen ?? null, now) ?? '—')}
					</span>
					<span class="kpi__sub">{summary.lastUplink?.name ?? 'まだデータがありません'}</span>
				</div>
			</CwCard>
		</section>

		<div class="overview-row">
			<CwCard
				title="地図"
				headingLevel={2}
				elevated
				class={coordinates ? 'overview-row__map' : 'overview-row__map overview-row__map--empty'}
			>
				{#snippet actions()}
					{#if coordinates}
						<a
							class="button-link"
							href={`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.long}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							Googleマップで開く
						</a>
					{/if}
				{/snippet}
				{#if coordinates}
					<div class="map-body">
						<div class="map-body__map">
							<LocationMap
								lat={coordinates.lat}
								long={coordinates.long}
								zoom={location.map_zoom}
								name={location.name}
								devices={devicePins}
							/>
						</div>
						<div class="map-body__coords">
							<span>緯度 <span class="mono">{coordinates.lat}</span></span>
							<span>経度 <span class="mono">{coordinates.long}</span></span>
							<CwCopy labels={cwCopyLabels()} value={`${coordinates.lat}, ${coordinates.long}`}>
								<span class="sr-only">座標</span>
							</CwCopy>
						</div>
					</div>
				{:else}
					<div class="map-empty">
						<DemoIcon src={ICON('map_search')} alt="" class="map-empty__icon" />
						<p class="map-empty__title">このロケーションにはまだ座標がありません</p>
						<p class="map-empty__body">緯度と経度が設定されると、ここに地図で表示されます。</p>
					</div>
				{/if}
			</CwCard>

			<CwCard
				title="デバイスの状態"
				subtitle="各デバイスの送信間隔に基づく"
				headingLevel={2}
				elevated
				class={coordinates
					? 'overview-row__health'
					: 'overview-row__health overview-row__health--wide'}
			>
				{#if summary.total === 0}
					<p class="muted">このロケーションにはまだデバイスがありません。</p>
				{:else}
					<div class="health">
						<div class="health__chart">
							<div class="health-ring">
								<svg viewBox="0 0 42 42" class="health-ring__svg" aria-hidden="true">
									<circle class="health-ring__track" cx="21" cy="21" r="15.9155" />
									{#each healthArcs as arc (arc.health)}
										{#if arc.length > 0}
											<circle
												class={`health-ring__arc health-ring__arc--${arc.health}`}
												cx="21"
												cy="21"
												r="15.9155"
												stroke-dasharray={`${arc.length} ${100 - arc.length}`}
												stroke-dashoffset={arc.offset}
											/>
										{/if}
									{/each}
								</svg>
								<div class="health-ring__center">
									<span class="health-ring__value">{summary.percentOnline}%</span>
									<span class="health-ring__label">オンライン</span>
								</div>
							</div>
							<ul class="health__legend">
								{#each healthArcs as arc (arc.health)}
									<li>
										<span class={`dot dot--${arc.health}`}></span>
										<span class="health__legend-label">{arc.label}</span>
										<strong>{arc.value}</strong>
									</li>
								{/each}
							</ul>
						</div>

						<div class="health__attention">
							<h3 class="health__subtitle">要確認</h3>
							{#if attentionRows.length === 0}
								<div class="attention-item attention-item--ok">
									<DemoIcon src={ICON('check_circle')} alt="" />
									<span>すべてのデバイスが予定どおり送信しています。</span>
								</div>
							{:else}
								<ul class="health__attention-list">
									{#each attentionRows as row (row.dev_eui)}
										<li
											class="attention-item"
											class:attention-item--danger={row.health === 'offline'}
										>
											<span class={`dot dot--${row.health}`}></span>
											<div class="attention-item__text">
												<span class="attention-item__name">{row.name}</span>
												<span class="attention-item__meta">
													{row.health === 'offline'
														? `オフライン・最終受信 ${now === null ? '—' : (formatRelative(row.lastSeen, now) ?? '—')}`
														: 'まだデータを受信していません'}
												</span>
											</div>
											<a
												class="location-link"
												href={resolve('/demo/devices/[dev_eui]', { dev_eui: row.dev_eui })}>表示</a
											>
										</li>
									{/each}
								</ul>
							{/if}
						</div>
					</div>
				{/if}
			</CwCard>
		</div>

		<CwCard
			title="デバイス"
			subtitle={`このロケーションのデバイス ${summary.total}台`}
			headingLevel={2}
			elevated
		>
			<div class="status-filter" role="group" aria-label="状態で絞り込み">
				{#each filterOptions as option (option.value)}
					<button
						type="button"
						class="status-filter__chip"
						class:status-filter__chip--active={healthFilter === option.value}
						aria-pressed={healthFilter === option.value}
						onclick={() => (healthFilter = option.value)}
					>
						{#if option.value !== 'all'}
							<span class={`dot dot--${option.value}`}></span>
						{/if}
						{option.label}
					</button>
				{/each}
			</div>

			<CwDataTable
				id="location-table"
				labels={cwDataTableLabels()}
				{columns}
				{loadData}
				{loading}
				filters={healthFilter === 'all' ? {} : { health: [healthFilter] }}
				rowKey="dev_eui"
				columnAlign="left"
				searchable
				pageSize={10}
				rowActionsHeader="操作"
			>
				{#snippet cell(
					row: LocationDeviceRow,
					col: CwColumnDef<LocationDeviceRow>,
					defaultValue: string
				)}
					<!-- Render from the live row so status and readings update between table loads. -->
					{@const live = rowsByDevEui.get(row.dev_eui) ?? row}
					{#if col.key === 'health'}
						<span class={`status-pill status-pill--${live.health}`}>
							<span class={`dot dot--${live.health}`}></span>
							{healthLabel[live.health]}
						</span>
					{:else if col.key === 'temperature'}
						{live.temperature != null ? `${live.temperature.toFixed(1)} °C` : '—'}
					{:else if col.key === 'humidity'}
						{live.humidity != null ? `${Math.round(live.humidity)} %` : '—'}
					{:else if col.key === 'co2'}
						{live.co2 != null ? `${Math.round(live.co2)} ppm` : '—'}
					{:else if col.key === 'lastSeen'}
						{now === null ? '—' : (formatRelative(live.lastSeen, now) ?? 'なし')}
					{:else if col.key === 'signal'}
						{#if live.signal}
							<SignalStrength rssi={live.signal.rssi} snr={live.signal.snr} />
						{:else}
							—
						{/if}
					{:else if col.key === 'dev_eui'}
						<CwCopy labels={cwCopyLabels()} value={row.dev_eui}>
							<span class="mono">{row.dev_eui}</span>
						</CwCopy>
					{:else}
						{defaultValue}
					{/if}
				{/snippet}

				{#snippet rowActions(row: LocationDeviceRow)}
					<div class="flex flex-row gap-2">
						<CwButton
							id={`location-row-${row.dev_eui}-view-button`}
							size="md"
							variant="info"
							onclick={() => goto(resolve('/demo/devices/[dev_eui]', { dev_eui: row.dev_eui }))}
						>
							<DemoIcon src={ICON('eye')} alt="表示" />
						</CwButton>
					</div>
				{/snippet}
			</CwDataTable>
		</CwCard>

		<CwCard title="ロケーション情報" headingLevel={2} elevated>
			<div class="details">
				<dl class="details__list">
					<dt>名前</dt>
					<dd>{location.name}</dd>
					<dt>グループ</dt>
					<dd>{location.group ?? '—'}</dd>
					<dt>説明</dt>
					<dd>{location.description ?? '—'}</dd>
				</dl>
				<dl class="details__list">
					<dt>作成日</dt>
					<dd>
						{new Date(location.created_at).toLocaleDateString(LOCALE, { dateStyle: 'medium' })}
					</dd>
					<dt>座標</dt>
					<dd class="mono">{coordinates ? `${coordinates.lat}, ${coordinates.long}` : '—'}</dd>
					<dt>ロケーションID</dt>
					<dd class="mono">{location.location_id}</dd>
				</dl>
			</div>
		</CwCard>
	{/if}
</AppPage>

<style>
	/* From the app's location page, unchanged except the breadcrumb link. */
	.location-header {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--cw-space-4);
	}

	.location-header__titles {
		display: flex;
		flex-direction: column;
		gap: var(--cw-space-2);
		min-width: 0;
	}

	.location-header__eyebrow {
		display: flex;
		align-items: center;
		gap: var(--cw-space-2);
		font-size: var(--cw-text-sm);
		color: var(--cw-text-muted);
	}

	.location-header__crumb {
		color: inherit;
	}

	.location-header__crumb:hover {
		color: var(--cw-text-primary);
		text-decoration: underline;
	}

	.location-header__title {
		margin: 0;
		font-size: var(--cw-text-3xl);
		font-weight: var(--cw-font-bold);
		line-height: var(--cw-leading-tight);
		color: var(--cw-text-primary);
		overflow-wrap: anywhere;
	}

	.location-header__chips,
	.location-header__actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--cw-space-2);
	}

	.location-chip {
		display: inline-flex;
		align-items: center;
		gap: var(--cw-space-2);
		height: 1.5rem;
		padding: 0 var(--cw-space-3);
		border-radius: var(--cw-radius-pill);
		font-size: var(--cw-text-xs);
		font-weight: var(--cw-font-medium);
		background: var(--cw-bg-muted);
		color: var(--cw-text-secondary);
		border: 1px solid var(--cw-border-muted);
		white-space: nowrap;
	}

	.location-chip--success {
		background: var(--cw-tone-success-bg-subtle);
		color: var(--cw-tone-success-text);
		border-color: var(--cw-tone-success-border);
	}

	.location-chip--warning {
		background: var(--cw-tone-warning-bg-subtle);
		color: var(--cw-tone-warning-text);
		border-color: var(--cw-tone-warning-border);
	}

	.location-chip--mono,
	.mono {
		font-family: var(--cw-font-mono);
	}

	.kpi-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
		gap: var(--cw-space-4);
	}

	.kpi {
		display: flex;
		flex-direction: column;
		gap: var(--cw-space-2);
	}

	.kpi__head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: var(--cw-text-sm);
		font-weight: var(--cw-font-medium);
		color: var(--cw-text-muted);
	}

	.kpi__value {
		font-size: var(--cw-text-3xl);
		font-weight: var(--cw-font-bold);
		line-height: var(--cw-leading-tight);
		color: var(--cw-text-primary);
		font-variant-numeric: tabular-nums;
	}

	.kpi__value--success {
		color: var(--cw-tone-success-text);
	}

	.kpi__value--danger {
		color: var(--cw-tone-danger-text);
	}

	.kpi__sub {
		font-size: var(--cw-text-xs);
		color: var(--cw-text-muted);
	}

	.overview-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--cw-space-4);
		align-items: stretch;
	}

	.overview-row :global(.overview-row__map) {
		flex: 2 1 32rem;
		min-width: 0;
		display: flex;
		flex-direction: column;
	}

	.overview-row :global(.overview-row__map--empty) {
		flex: 1 1 20rem;
	}

	.overview-row :global(.overview-row__map > .cw-card__body) {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.overview-row :global(.overview-row__health) {
		flex: 1 1 20rem;
		min-width: 0;
	}

	.overview-row :global(.overview-row__health--wide) {
		flex: 2 1 32rem;
	}

	.map-body {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--cw-space-3);
	}

	.map-body__map {
		flex: 1;
		min-height: 21rem;
		display: flex;
	}

	.map-body__coords {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--cw-space-2) var(--cw-space-6);
		font-size: var(--cw-text-sm);
		color: var(--cw-text-muted);
	}

	.map-body__coords .mono {
		color: var(--cw-text-primary);
	}

	.map-empty {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--cw-space-3);
		text-align: center;
		padding: var(--cw-space-8) var(--cw-space-6);
		border-radius: var(--cw-radius-lg);
		border: 1px dashed var(--cw-border-default);
		background: var(--cw-bg-elevated2);
	}

	.map-empty :global(.map-empty__icon) {
		width: 2.5rem;
		height: 2.5rem;
		color: var(--cw-text-muted);
	}

	.map-empty__title {
		margin: 0;
		font-size: var(--cw-text-base);
		font-weight: var(--cw-font-semibold);
		color: var(--cw-text-primary);
	}

	.map-empty__body,
	.muted {
		margin: 0;
		font-size: var(--cw-text-sm);
		color: var(--cw-text-muted);
		max-width: 36ch;
	}

	.location-link {
		font-size: var(--cw-text-sm);
		font-weight: var(--cw-font-medium);
		color: var(--cw-info-300);
		white-space: nowrap;
	}

	.location-link:hover {
		color: var(--cw-info-200);
	}

	.health {
		display: flex;
		flex-direction: column;
		gap: var(--cw-space-4);
	}

	.health__chart {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--cw-space-5);
	}

	.health-ring {
		position: relative;
		width: 7.5rem;
		height: 7.5rem;
		flex: none;
	}

	.health-ring__svg {
		width: 100%;
		height: 100%;
	}

	.health-ring__track,
	.health-ring__arc {
		fill: none;
		stroke-width: 5;
	}

	.health-ring__track {
		stroke: var(--cw-bg-muted);
	}

	.health-ring__arc--online {
		stroke: var(--cw-success-400);
	}

	.health-ring__arc--offline {
		stroke: var(--cw-danger-400);
	}

	.health-ring__arc--never {
		stroke: var(--cw-status-loading);
	}

	.health-ring__center {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		line-height: 1.1;
		pointer-events: none;
	}

	.health-ring__value {
		font-size: var(--cw-text-2xl);
		font-weight: var(--cw-font-bold);
		color: var(--cw-text-primary);
		font-variant-numeric: tabular-nums;
	}

	.health-ring__label {
		font-size: var(--cw-text-xs);
		color: var(--cw-text-muted);
	}

	.health__legend {
		list-style: none;
		margin: 0;
		padding: 0;
		flex: 1 1 9rem;
		display: flex;
		flex-direction: column;
		gap: var(--cw-space-3);
		font-size: var(--cw-text-sm);
		color: var(--cw-text-primary);
	}

	.health__legend li {
		display: flex;
		align-items: center;
		gap: var(--cw-space-2);
	}

	.health__legend-label {
		flex: 1;
	}

	.health__legend strong {
		font-weight: var(--cw-font-semibold);
		font-variant-numeric: tabular-nums;
	}

	.dot {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: var(--cw-radius-full);
		flex: none;
	}

	.dot--online {
		background: var(--cw-success-400);
	}

	.dot--offline {
		background: var(--cw-danger-400);
	}

	.dot--never {
		background: var(--cw-status-loading);
	}

	.dot--warning {
		background: var(--cw-warning-400);
	}

	.status-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		height: 1.5rem;
		padding: 0 0.625rem;
		border-radius: var(--cw-radius-pill);
		font-size: var(--cw-text-xs);
		font-weight: var(--cw-font-medium);
		white-space: nowrap;
		border: 1px solid var(--cw-border-muted);
		background: var(--cw-bg-muted);
		color: var(--cw-text-secondary);
	}

	.status-pill--online {
		background: var(--cw-tone-success-bg-subtle);
		border-color: var(--cw-tone-success-border);
		color: var(--cw-tone-success-text);
	}

	.status-pill--offline {
		background: var(--cw-tone-danger-bg-subtle);
		border-color: var(--cw-tone-danger-border);
		color: var(--cw-tone-danger-text);
	}

	.kpi :global(.kpi__icon) {
		width: 1.25rem;
		height: 1.25rem;
		color: var(--cw-text-muted);
	}

	.kpi :global(.kpi__icon--info) {
		color: var(--cw-info-300);
	}

	.kpi :global(.kpi__icon--success) {
		color: var(--cw-success-400);
	}

	.kpi :global(.kpi__icon--danger) {
		color: var(--cw-danger-400);
	}

	.button-link {
		display: inline-flex;
		align-items: center;
		height: var(--cw-control-h-sm);
		padding: 0 var(--cw-control-px-sm);
		border-radius: var(--cw-control-radius);
		font-size: var(--cw-control-text-sm);
		font-weight: var(--cw-font-medium);
		white-space: nowrap;
		text-decoration: none;
		background: var(--cw-button-secondary-bg);
		border: 1px solid var(--cw-button-secondary-border);
		color: var(--cw-button-secondary-text);
		box-shadow: var(--cw-button-secondary-shadow);
	}

	.button-link:hover {
		background: var(--cw-button-secondary-bg-hover);
		border-color: var(--cw-button-secondary-border-hover);
		color: var(--cw-button-secondary-text-hover);
	}

	.button-link:focus-visible {
		outline: var(--cw-focus-ring-width) solid var(--cw-primary-500);
		outline-offset: var(--cw-focus-ring-offset);
	}

	.health__attention {
		border-top: 1px solid var(--cw-border-muted);
		padding-top: var(--cw-space-4);
		display: flex;
		flex-direction: column;
		gap: var(--cw-space-3);
	}

	.health__subtitle {
		margin: 0;
		font-size: var(--cw-text-sm);
		font-weight: var(--cw-font-semibold);
		color: var(--cw-text-primary);
	}

	.health__attention-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--cw-space-2);
		max-height: 16rem;
		overflow-y: auto;
	}

	.attention-item {
		display: flex;
		align-items: center;
		gap: var(--cw-space-3);
		padding: var(--cw-space-2) var(--cw-space-3);
		border-radius: var(--cw-radius-lg);
		background: var(--cw-bg-muted);
		border: 1px solid var(--cw-border-muted);
		font-size: var(--cw-text-sm);
		color: var(--cw-text-primary);
	}

	.attention-item--danger {
		background: var(--cw-tone-danger-bg-subtle);
		border-color: var(--cw-tone-danger-border);
	}

	.attention-item--ok {
		background: var(--cw-tone-success-bg-subtle);
		border-color: var(--cw-tone-success-border);
		color: var(--cw-tone-success-text);
	}

	.attention-item__text {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
	}

	.attention-item__name {
		font-weight: var(--cw-font-medium);
		overflow-wrap: anywhere;
	}

	.attention-item__meta {
		font-size: var(--cw-text-xs);
		color: var(--cw-text-muted);
	}

	.attention-item--danger .attention-item__meta {
		color: var(--cw-tone-danger-text);
	}

	.status-filter {
		display: flex;
		flex-wrap: wrap;
		gap: var(--cw-space-2);
		margin-bottom: var(--cw-space-3);
	}

	.status-filter__chip {
		display: inline-flex;
		align-items: center;
		gap: var(--cw-space-2);
		min-height: var(--cw-control-h-sm);
		padding: 0 var(--cw-space-3);
		border-radius: var(--cw-radius-pill);
		font: inherit;
		font-size: var(--cw-text-xs);
		font-weight: var(--cw-font-medium);
		background: var(--cw-bg-muted);
		color: var(--cw-text-secondary);
		border: 1px solid var(--cw-border-muted);
		cursor: pointer;
		transition: background-color var(--cw-duration-fast) var(--cw-ease-default);
	}

	.status-filter__chip:hover {
		background: var(--cw-bg-subtle);
	}

	.status-filter__chip:focus-visible {
		outline: var(--cw-focus-ring-width) solid var(--cw-primary-500);
		outline-offset: var(--cw-focus-ring-offset);
	}

	.status-filter__chip--active {
		background: var(--cw-primary-700);
		border-color: var(--cw-primary-600);
		color: #ffffff;
	}

	.details {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
		gap: var(--cw-space-6);
	}

	.details__list {
		display: grid;
		grid-template-columns: minmax(0, 9rem) minmax(0, 1fr);
		gap: var(--cw-space-3) var(--cw-space-4);
		margin: 0;
		font-size: var(--cw-text-sm);
	}

	.details__list dt {
		color: var(--cw-text-muted);
	}

	.details__list dd {
		margin: 0;
		color: var(--cw-text-primary);
		overflow-wrap: anywhere;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
