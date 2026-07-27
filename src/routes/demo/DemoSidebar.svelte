<!--
  Port of CropWatch/src/routes/Sidebar.svelte.

  Same CwSideNav, same nav items and icon paths as the live dashboard. The
  differences are all demo-scoped:
    - every item except ダッシュボード is inert (the demo is one page)
    - the session-expiry countdown in the footer is replaced by a way back to
      the marketing site
    - the mobile utility row (language switcher + CwThemePicker) is dropped:
      CwThemePicker rewrites `data-theme` on <html>, which this site uses for
      its own `[data-theme="web"]` marketing tokens.
-->
<script lang="ts">
	import { assets } from '$app/paths';
	import { CwSideNav, type CwSideNavItem } from '@cropwatchdevelopment/cwui';

	let { mode = $bindable() } = $props();

	const CROPWATCH_LOGO = `${assets}/cropwatch_icons/cropwatch_static.svg`;

	const DASHBOARD_ICON_PATH = 'M2 3h5v4H2V3zm7 0h5v4H9V3zM2 9h5v4H2V9zm7 0h5v4H9V9z';
	const LOCATIONS_ICON_PATH =
		'M8 2a6 6 0 100 12A6 6 0 008 2zm0 0c1.5 1.6 2.5 3.7 2.8 6-.3 2.3-1.3 4.4-2.8 6M8 2C6.5 3.6 5.5 5.7 5.2 8c.3 2.3 1.3 4.4 2.8 6M2 8h12M3.5 4.5h9M3.5 11.5h9';
	const RULES_ICON_PATH =
		'M3 4.5h6M3 8h6M3 11.5h6M10.5 4.5l1 1 2-2M10.5 8l1 1 2-2M10.5 11.5l1 1 2-2';
	const REPORTS_ICON_PATH =
		'M4 2.5h5l3 3V13a1 1 0 01-1 1H4a1 1 0 01-1-1v-9a1 1 0 011-1zM9 2.5V5a1 1 0 001 1h2M5.5 8.5h5M5.5 10.5h5';
	const GATEWAYS_ICON_PATH =
		'M3 8.5h10A1.5 1.5 0 0 1 14.5 10v2A1.5 1.5 0 0 1 13 13.5H3A1.5 1.5 0 0 1 1.5 12v-2A1.5 1.5 0 0 1 3 8.5Zm0 2.5h.01M5.5 11h.01M8 11h.01M8 8.5V6M6 4.5a3.2 3.2 0 0 1 4 0M4.5 3a5.5 5.5 0 0 1 7 0';

	const navItems: CwSideNavItem[] = [
		{ id: 'dashboard', label: 'ダッシュボード', active: true, icon: { path: DASHBOARD_ICON_PATH } },
		{ id: 'locations', label: 'ロケーション', disabled: true, icon: { path: LOCATIONS_ICON_PATH } },
		{
			id: 'rules',
			label: 'ルール',
			disabled: true,
			icon: { path: RULES_ICON_PATH },
			group: '情報と管理'
		},
		{
			id: 'reports',
			label: 'レポート',
			disabled: true,
			icon: { path: REPORTS_ICON_PATH },
			group: '情報と管理'
		},
		{
			id: 'gateways',
			label: 'ゲートウェイ',
			disabled: true,
			icon: { path: GATEWAYS_ICON_PATH },
			group: '接続とハードウェア'
		}
	];

	// Matches the live sidebar: on mobile it overlays the page, so collapse it
	// once the user picks something.
	function closeSidebarOnMobile() {
		if (typeof window !== 'undefined' && window.innerWidth < 1024) {
			mode = 'hidden';
		}
	}
</script>

<CwSideNav bind:mode items={navItems} responsive onselect={closeSidebarOnMobile}>
	{#snippet header()}
		<div class="app-sidebar__brand">
			<img src={CROPWATCH_LOGO} alt="CropWatch" class="app-sidebar__brand-mark" />
			<span class="app-sidebar__brand-name">𝘾𝙧𝙤𝙥𝙒𝙖𝙩𝙘𝙝<sup><small>®</small></sup></span>
		</div>
	{/snippet}

	{#snippet footer()}
		<span class="app-sidebar__footer">
			<p class="app-sidebar__demo-note">
				これはサンプルデータによるデモ画面です。実際の計測値ではありません。
			</p>
			<a class="app-sidebar__demo-exit" href="/">← CropWatch のサイトに戻る</a>
		</span>
	{/snippet}
</CwSideNav>

<style>
	.app-sidebar__brand {
		display: flex;
		height: 100%;
		width: 100%;
		flex-direction: row;
		align-items: center;
		gap: var(--cw-space-2);
		color: var(--cw-text-primary);
	}

	.app-sidebar__brand-mark {
		width: 2rem;
		height: 2rem;
	}

	.app-sidebar__brand-name {
		font-size: 1.125rem;
		font-weight: var(--cw-font-semibold);
		color: white;
	}

	:global(.cw-sidenav__above-content) {
		min-height: 0;
	}

	.app-sidebar__footer {
		display: flex;
		flex-direction: column;
		gap: var(--cw-space-2);
		padding: var(--cw-space-2);
	}

	.app-sidebar__demo-note {
		margin: 0;
		font-size: var(--cw-text-xs);
		line-height: 1.5;
		color: var(--cw-text-muted);
	}

	.app-sidebar__demo-exit {
		font-size: var(--cw-text-xs);
		color: var(--cw-text-secondary);
		text-decoration: none;
	}

	.app-sidebar__demo-exit:hover {
		color: var(--cw-text-primary);
		text-decoration: underline;
	}
</style>
