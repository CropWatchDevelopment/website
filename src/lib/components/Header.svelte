<script lang="ts">
	import logo from '$lib/images/cropwatch_animated.svg';
	import MaterialIcon from './MaterialIcon.svelte';
	import LanguagePicker from './LanguagePicker.svelte';
	import Search from './Search.svelte';
	import Telephone from './Telephone.svelte';
	import { _ } from 'svelte-i18n';

	interface NavItem {
		id: string;
		labelKey: string;
		href?: string;
		children?: { labelKey: string; href: string; icon?: string; ariaKey?: string }[];
	}

	const navItems: NavItem[] = [
		{ id: 'home', labelKey: 'header.navigation.home', href: '/' },
		{
			id: 'products',
			labelKey: 'header.navigation.products',
			children: [
				{
					labelKey: 'header.navigation.products_sensor',
					href: '/products/cw-air-th',
					icon: 'device_thermostat'
				},
				{
					labelKey: 'header.navigation.products_gateways',
					href: '/products/gateways',
					icon: 'router'
				},
				{
					labelKey: 'header.navigation.products_replacement_sensors',
					href: '/products/coming-soon',
					icon: 'settings_input_hdmi'
				}
			]
		},
		{ id: 'case-studies', labelKey: 'header.navigation.case_studies', href: '/case-studies' },
		{ id: 'about', labelKey: 'header.navigation.about', href: '/about' },
		{ id: 'contact', labelKey: 'header.navigation.contact', href: '/contact' }
	] as const;

	const utilityLinks = [
		{
			labelKey: 'header.utility.ui_app',
			href: 'https://app.cropwatch.io/',
			icon: 'exit_to_app',
			ariaKey: 'header.utility.ui_app_icon_aria'
		},
		{
			labelKey: 'header.utility.system_status',
			icon: 'monitor_heart',
			href: 'https://stats.uptimerobot.com/1Z6H85HuHq',
			ariaKey: 'header.utility.system_status_icon_aria'
		}
	] as const;

	const KEYBOARD_KEYS = {
		ESCAPE: 'Escape',
		SPACE: ' ',
		ENTER: 'Enter'
	} as const;

	let openMenu = $state<string | null>(null);

	function toggleMenu(id: string) {
		openMenu = openMenu === id ? null : id;
	}

	function closeMenu() {
		openMenu = null;
	}

	const topLinks = [
		{ href: '/contact', labelKey: 'common.actions.contact' }
		// { href: '/support', labelKey: 'common.actions.support' }
	] as const;
</script>

<header>
	<div class="mx-auto flex flex-row items-center justify-between bg-[#e7be728f] px-4 text-sm">
		<div class="flex gap-2 py-3 text-sm font-semibold text-[#11213c]">
			<span>{$_('header.topbar.welcome')}</span>
			<span>|</span>
			<span>{$_('header.topbar.global_site')}</span>
		</div>
		<div class="flex items-center gap-4 py-3">
			{#each topLinks as link (link.href)}
				<a href={link.href} class="transition-colors hover:text-blue-600">{$_(link.labelKey)}</a>
			{/each}
			<LanguagePicker />
		</div>
	</div>

	<div
		class="bg-gradient-to-b from-[#2f5387] to-[#1f3b64] py-4 text-white shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
	>
		<div class="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 px-4">
			<a
				class="flex min-w-[220px] items-center gap-4"
				href="https://cropwatch.io/"
				aria-label={$_('header.brand.home_aria')}
			>
				<picture class="h-14 w-14 overflow-hidden p-2">
					<source srcset={logo} type="image/svg+xml" />
					<img src={logo} alt={$_('header.brand.logo_alt')} class="h-full w-full object-contain" />
				</picture>
				<div class="flex flex-col">
					<!-- <span class="text-lg font-semibold tracking-wide">{$_('header.brand.name')}</span> -->
					<span class="text-lg font-semibold tracking-wide">𝘾𝙧𝙤𝙥𝙒𝙖𝙩𝙘𝙝</span>
					<span class="text-xs text-white/80 uppercase">{$_('header.brand.tagline')}</span>
				</div>
			</a>
			<div class="flex flex-1 items-center justify-end gap-6">
				<Telephone />
				<Search />
			</div>
		</div>
	</div>

	<nav
		class="bg-gradient-to-b from-[#2f5387] to-[#1f3b64] py-3 shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
		
	>
		<div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-10 px-4">
			<ul class="flex items-center gap-6 text-sm text-white" id="mainMenu">
				{#each navItems as item (item.id)}
					<li
						class="relative border-r border-white/20 py-1 pr-6 last-of-type:border-0 last-of-type:pr-0"
					>
						{#if item.children}
							<button
								class="flex items-center gap-1 rounded px-2 py-1 font-medium transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
								aria-expanded={openMenu === item.id}
								onclick={() => toggleMenu(item.id)}
								onkeydown={(event) => {
									if (event.key === KEYBOARD_KEYS.ESCAPE) {
										closeMenu();
									}

									if (event.key === KEYBOARD_KEYS.SPACE || event.key === KEYBOARD_KEYS.ENTER) {
										event.preventDefault();
										toggleMenu(item.id);
									}
								}}
							>
								<span>{$_(item.labelKey)}</span>
								<svg
									class={`h-4 w-4 transition-transform ${openMenu === item.id ? 'rotate-180' : ''}`}
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
							<ul
								class={`absolute top-full left-0 z-10 mt-2 w-52 rounded-md bg-white py-2 text-gray-800 shadow-lg ring-1 ring-black/5 transition-[opacity,transform] duration-150 ${openMenu === item.id ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible -translate-y-2 opacity-0'}`}
								role="menu"
								aria-hidden={openMenu !== item.id}
							>
								{#each item.children as child (child.href)}
									<li class="z-10">
										<a
											class="flex items-center gap-2 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 hover:text-gray-900"
											href={child.href}
											role="menuitem"
											onclick={closeMenu}
										>
											{#if child.icon}
												<MaterialIcon
													name={child.icon || 'open_in_new'}
													collection="symbols"
													variant="rounded"
													size={20}
													class="text-gray-500"
													ariaLabel={$_(child.ariaKey || 'header.navigation.opens_in_new_tab_aria')}
												/>
											{/if}
											<span>{$_(child.labelKey)}</span>
										</a>
									</li>
								{/each}
							</ul>
						{:else}
							<a
								class="rounded px-2 py-1 font-medium transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
								href={item.href}
							>
								{$_(item.labelKey)}
							</a>
						{/if}
					</li>
				{/each}
			</ul>
			<ul id="utilityLinks" class="flex items-center gap-4 text-sm font-semibold text-white/80">
				{#each utilityLinks as link (link.href)}
					<li class="border-r border-white/20 py-1 pr-6 last-of-type:border-0 last-of-type:pr-0">
						<a
							class="rounded px-3 py-1 transition hover:bg-white/10 hover:text-white"
							target="_blank"
							href={link.href}
						>
							{#if link.icon}
								<MaterialIcon
									name={link.icon}
									collection="symbols"
									variant="rounded"
									size={16}
									class="mr-1 inline-block align-middle"
									ariaLabel={$_(link.ariaKey)}
								/>
							{/if}
							{$_(link.labelKey)}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
</header>
