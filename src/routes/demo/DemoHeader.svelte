<!--
  Port of CropWatch/src/routes/Header.svelte.

  The profile menu shows a generic demo identity — never a real account name,
  employer or email address.
-->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { assets } from '$app/paths';
	import {
		CwHeader,
		CwProfileMenu,
		type CwProfileMenuItem,
		type CwSideNavMode
	} from '@cropwatchdevelopment/cwui';
	import { signOutDemo } from './demo-session';

	let { mode = $bindable<CwSideNavMode>() } = $props();

	const CROPWATCH_LOGO = `${assets}/cropwatch_icons/cropwatch_static.svg`;

	// The live app links these to /account/profile, /account/billing and
	// /settings. Those pages are not part of the demo, so the menu keeps the
	// shape a customer would see but only logout does anything.
	const menuItems: CwProfileMenuItem[] = [
		{ id: 'profile', label: 'プロフィール' },
		{ id: 'billing', label: '請求' },
		{ id: 'settings', label: '設定' },
		{ id: 'logout', label: 'ログアウト', separator: true, danger: true }
	];
</script>

<CwHeader
	class="app-header"
	bind:sideNavMode={mode}
	onToggleNav={() => (mode = mode === 'hidden' ? 'open' : 'hidden')}
>
	{#snippet logo()}
		<div class="app-header__brand">
			<img src={CROPWATCH_LOGO} alt="CropWatch" class="app-header__brand-mark" />
			<span class="app-header__brand-name">CropWatch</span>
		</div>
	{/snippet}

	{#snippet actions()}
		<CwProfileMenu
			class="app-header__profile-menu"
			name="デモユーザー"
			subtitle="デモ環境"
			{menuItems}
			onselect={(event) => {
				if (event.id !== 'logout') return;
				signOutDemo();
				goto('/demo/login');
			}}
		/>
	{/snippet}
</CwHeader>

<style>
	:global(.app-header) {
		height: calc(5rem + var(--app-shell-padding-block-start));
		padding-top: var(--app-shell-padding-block-start);
		padding-inline: var(--app-shell-padding-inline-start) var(--app-shell-padding-inline-end);
		gap: var(--cw-space-2);
	}

	:global(.app-header .cw-header__link) {
		min-width: 0;
	}

	:global(.app-header .cw-header__logo) {
		min-width: 0;
	}

	:global(.app-header .cw-header__actions) {
		min-width: 0;
	}

	.app-header__brand {
		display: flex;
		align-items: center;
		gap: var(--cw-space-2);
		min-width: 0;
		color: white;
	}

	.app-header__brand-mark {
		width: 1.5rem;
		height: 1.5rem;
		flex: none;
	}

	.app-header__brand-name {
		font-size: 1rem;
		font-weight: var(--cw-font-semibold);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	@media (max-width: 639px) {
		:global(.app-header .cw-header__logo) {
			display: flex;
		}

		:global(.app-header .cw-profile-menu__trigger) {
			gap: 0;
			padding: var(--cw-space-2);
		}

		:global(.app-header .cw-profile-menu__info),
		:global(.app-header .cw-profile-menu__chevron),
		:global(.app-header .cw-profile-menu__icon) {
			display: none;
		}

		:global(.app-header .cw-profile-menu__avatar) {
			width: 2.25rem;
			height: 2.25rem;
		}
	}

	@media (min-width: 640px) {
		.app-header__brand-name {
			font-size: 1.0625rem;
		}
	}
</style>
