<script lang="ts">
	import logo from '$lib/images/cropwatch_animated.svg';
	let openMenu = $state<string | null>(null);

	const navItems = [
		{ id: 'home', label: 'Home', href: '/' },
		{
			id: 'solutions',
			label: 'Solutions',
			children: [
				{ label: 'Manufacturing', href: '/solutions/manufacturing' },
				{ label: 'Logistics', href: '/solutions/logistics' },
				{ label: 'Agriculture', href: '/solutions/agriculture' },
				{ label: 'Energy', href: '/solutions/energy' }
			]
		},
		{
			id: 'products',
			label: 'Products',
			children: [{ label: 'Temperature/Humidity Sensor (CW-AIR-TH)', href: '/products/cw-air-th' }]
		},
		{ id: 'case-studies', label: 'Case Studies', href: '/case-studies' },
		{ id: 'about', label: 'About', href: '/about' },
		{ id: 'contact', label: 'Contact', href: '/contact' }
	] as const;

	function toggleMenu(id: string) {
		openMenu = openMenu === id ? null : id;
	}

	function closeMenu() {
		openMenu = null;
	}

	function clickOutside(node: HTMLElement) {
		const handleClick = (event: MouseEvent) => {
			if (!node.contains(event.target as Node)) {
				closeMenu();
			}
		};

		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeMenu();
			}
		};

		document.addEventListener('click', handleClick, true);
		document.addEventListener('keydown', handleKeydown, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
				document.removeEventListener('keydown', handleKeydown, true);
			}
		};
	}
</script>

<header>
	<div class="mx-auto flex flex-row bg-[#fffc00] items-center justify-between bg-gray-100 px-4 py-2 text-sm">
		<div class="flex gap-2 py-3">
			<span>Welcome to CropWatch</span>
			<span>|</span>
			<span>Global Site</span>
			<!-- <span class="flex flex-1"></span> -->
		</div>
		<div class="flex gap-4">
			<a href="/contact" class="transition-colors hover:text-blue-600">Contact</a>
			<a href="/support" class="transition-colors hover:text-blue-600">Support</a>
			<a href="/en" class="transition-colors hover:text-blue-600">EN</a>
			<a href="/jp" class="transition-colors hover:text-blue-600">JP</a>
		</div>
	</div>

	<div class="bg-gradient-to-b from-[#2f5387] to-[#1f3b64] py-4 text-white shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
		<div class="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 px-4">
			<a class="flex min-w-[220px] items-center gap-4" href="https://cropwatch.io/" aria-label="CropWatch home">
				<picture class="h-14 w-14 overflow-hidden p-2">
					<source srcset={logo} type="image/svg+xml" />
					<img src={logo} alt="CropWatch logo" class="h-full w-full object-contain" />
				</picture>
				<div class="flex flex-col">
					<span class="text-lg font-semibold tracking-wide">CropWatch LLC</span>
					<span class="text-xs uppercase text-white/80">Delivering Quality &amp; ROI Since 2019</span>
				</div>
			</a>
			<div class="flex flex-1 items-center justify-end gap-6">
				<div class="hidden items-center gap-2 text-sm font-semibold sm:flex">
					<span class="text-lg">☎</span>
					<a href="tel:+818042843390" class="hover:text-white">080-4284-3390</a>
				</div>
				<form
					class="flex w-full max-w-xs items-center overflow-hidden rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm transition focus-within:border-white focus-within:bg-white/20"
					role="search"
				>
					<label class="sr-only" for="header-search">Search CropWatch</label>
					<input
						id="header-search"
						class="w-full bg-transparent border-none text-white placeholder:text-white/70 focus:outline-none"
						type="search"
						name="q"
						placeholder="Search our site"
						autocomplete="off"
					/>
					<button
						type="submit"
						class="ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40"
						aria-label="Search"
					>
						<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M9 3.5a5.5 5.5 0 1 0 3.356 9.9l3.122 3.122a.75.75 0 1 0 1.06-1.06l-3.121-3.123A5.5 5.5 0 0 0 9 3.5ZM5 9a4 4 0 1 1 7.007 2.545.75.75 0 0 0-.144.144A4 4 0 0 1 5 9Z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				</form>
			</div>
		</div>
	</div>

	<nav
		class="bg-gradient-to-b from-[#2f5387] to-[#1f3b64] py-4 shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
		use:clickOutside
	>
		<ul class="mx-auto flex max-w-6xl items-center gap-6 px-4 text-sm text-white" id="mainMenu">
			{#each navItems as item (item.id)}
				<li class="relative">
					{#if item.children}
						<button
							class="flex items-center gap-1 rounded px-2 py-1 font-medium transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
							aria-expanded={openMenu === item.id}
							onclick={() => toggleMenu(item.id)}
							onkeydown={(event) => {
								if (event.key === 'Escape') {
									closeMenu();
								}

								if (event.key === ' ' || event.key === 'Enter') {
									event.preventDefault();
									toggleMenu(item.id);
								}
							}}
						>
							<span>{item.label}</span>
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
							class={`z-10 absolute top-full left-0 mt-2 w-52 rounded-md bg-white py-2 text-gray-800 shadow-lg ring-1 ring-black/5 transition-[opacity,transform] duration-150 ${openMenu === item.id ? 'visible translate-y-0 opacity-100' : 'pointer-events-none invisible -translate-y-2 opacity-0'}`}
							role="menu"
							aria-hidden={openMenu !== item.id}
						>
							{#each item.children as child (child.href)}
								<li class="z-10">
									<a
										class="block px-4 py-2 text-sm font-medium transition hover:bg-gray-100 hover:text-gray-900"
										href={child.href}
										role="menuitem"
										onclick={closeMenu}
									>
										{child.label}
									</a>
								</li>
							{/each}
						</ul>
					{:else}
						<a
							class="rounded px-2 py-1 font-medium transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
							href={item.href}
						>
							{item.label}
						</a>
					{/if}
				</li>
			{/each}
		</ul>
	</nav>
</header>
