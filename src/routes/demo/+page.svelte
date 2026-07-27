<!--
  /demo — port of the CropWatch dashboard's card view
  (CropWatch/src/routes/+page.svelte), locked to `cards` since that is what the
  demo is showing off. The テーブル button is present because the toolbar is
  part of the real screen, but it points back at the card view rather than
  shipping a second port of DashboardTable.
-->
<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { assets } from '$app/paths';
	import { onMount } from 'svelte';
	import { CwButton, CwSearchInput } from '@cropwatchdevelopment/cwui';
	import AppPage from './AppPage.svelte';
	import DemoIcon from './DemoIcon.svelte';
	import DemoDashboardCards, { type CardLayout } from './DemoDashboardCards.svelte';
	import { isDemoSignedIn } from './demo-session';

	const CARD_LAYOUT_STORAGE_KEY = 'cropwatch.demo.cardLayout';
	const SEARCH_DEBOUNCE_MS = 300;

	const TABLE_ICON = `${assets}/demo/icons/table.svg`;
	const SENSOR_CARDS_ICON = `${assets}/demo/icons/sensor_cards.svg`;
	const GRID_VIEW_ICON = `${assets}/demo/icons/grid_view.svg`;
	const MASONRY_VIEW_ICON = `${assets}/demo/icons/masonary.svg`;

	let cardLayout = $state<CardLayout>('grid');

	// Free-text search box. `searchName` updates on every keystroke; `debouncedName`
	// trails it so the view re-filters once the user pauses, not on every key.
	let searchName = $state('');
	let debouncedName = $state('');
	$effect(() => {
		const next = searchName;
		const timer = setTimeout(() => {
			debouncedName = next;
		}, SEARCH_DEBOUNCE_MS);
		return () => clearTimeout(timer);
	});

	const filters = $derived({ name: debouncedName.trim() });

	function setCardLayout(next: CardLayout) {
		cardLayout = next;
		if (browser) window.localStorage.setItem(CARD_LAYOUT_STORAGE_KEY, next);
	}

	onMount(() => {
		// The demo's login screen is part of what we are showing, so send people
		// who deep-link straight here through it first.
		if (!isDemoSignedIn()) {
			goto('/demo/login', { replaceState: true });
			return;
		}

		const storedLayout = window.localStorage.getItem(CARD_LAYOUT_STORAGE_KEY);
		if (storedLayout === 'grid' || storedLayout === 'masonry') {
			cardLayout = storedLayout;
		}
	});
</script>

<svelte:head>
	<title>デモ - CropWatch ダッシュボード</title>
	<meta
		name="description"
		content="CropWatch のダッシュボード画面をサンプルデータで体験できるデモです。温湿度センサー、CO2センサー、土壌センサーの表示例をご覧いただけます。"
	/>
</svelte:head>

<AppPage width="full" class="dashboard-page">
	<div class="--cw-bg-base flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
		<header class="flex-none">
			<div class="mt-2 flex w-full flex-row sm:gap-0 md:mt-0 md:gap-4">
				<div
					class="hidden w-full flex-row gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-start md:flex"
				>
					<CwSearchInput
						id="dashboard-search"
						bind:value={searchName}
						placeholder="ロケーション、デバイス名で検索…"
						class="w-full min-w-0"
					/>
				</div>
				<span class="flex-1"></span>
				<div
					id="view-layout-selection-section"
					class="flex w-full flex-row gap-2 px-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-end"
				>
					<CwButton
						id="dashboard-table-view-button"
						class="w-full md:w-auto"
						size="sm"
						variant="secondary"
					>
						<DemoIcon src={TABLE_ICON} alt="テーブル" />
						テーブル
					</CwButton>
					<CwButton
						id="dashboard-cards-view-button"
						class="w-full md:w-auto"
						size="sm"
						variant="info"
					>
						<DemoIcon src={SENSOR_CARDS_ICON} alt="センサーカード" />
						センサーカード
					</CwButton>
					<div
						class="hidden items-center justify-end gap-1 border-t border-slate-600/70 pt-2 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-2 md:flex"
					>
						<CwButton
							id="dashboard-grid-layout-button"
							class="px-2 text-xs"
							size="sm"
							variant={cardLayout === 'grid' ? 'info' : 'secondary'}
							onclick={() => setCardLayout('grid')}
						>
							<DemoIcon src={GRID_VIEW_ICON} alt="グリッドレイアウト" />
						</CwButton>
						<CwButton
							id="dashboard-masonry-layout-button"
							class="px-2 text-xs"
							size="sm"
							variant={cardLayout === 'masonry' ? 'info' : 'secondary'}
							onclick={() => setCardLayout('masonry')}
						>
							<DemoIcon src={MASONRY_VIEW_ICON} alt="モザイクレイアウト" />
						</CwButton>
					</div>
				</div>
			</div>
		</header>

		<DemoDashboardCards {filters} {cardLayout} />
	</div>
</AppPage>

<style>
	/*
	 * Dashboard uses viewport-fill layout (internal scroll in the card view).
	 * AppPage uses flex: 1 0 auto globally for list pages; dashboard overrides
	 * back to 1 1 auto so child scroll containers receive a definite height.
	 */
	:global(.app-page.dashboard-page),
	:global(.app-page.dashboard-page .app-page__shell) {
		flex: 1 1 auto;
		min-height: 0;
	}
</style>
