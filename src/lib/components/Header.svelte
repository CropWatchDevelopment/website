<script lang="ts">
	import CROPWATCH_IMAGE from '$lib/images/cropwatch_static.svg';
	let sidebarOpen: boolean = false;

	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'Knowledge Base', href: 'https://kb.cropwatch.io', newTab: true },
		{ name: 'News', href: '/news' },
		{ name: 'Contact Us', href: '/contact-us' },
	];
</script>

<header class="bg-white shadow">
	<nav
		class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
		aria-label="Global"
	>
		<div class="flex items-center justify-between w-full">
			<a href="/" class="flex items-center">
				<img style="max-height: 40px;" class="mr-2" src={CROPWATCH_IMAGE} alt="CropWatch Logo" />
				<h1 class="text-[23.4px] font-bold text-gray-700">CropWatch</h1>
			</a>
			<div class="hidden lg:flex lg:gap-x-8">
				{#each links as { name, href, newTab }}
					<a
						{href}
						rel={newTab ? 'noopener noreferrer' : undefined}
						target={newTab ? '_blank' : undefined}
						class="text-sm font-semibold text-gray-900 hover:text-gray-700"
					>
						{name}
					</a>
				{/each}
			</div>
			<div class="lg:hidden">
				<button
					type="button"
					on:click={() => (sidebarOpen = !sidebarOpen)}
					class="inline-flex items-center justify-center p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
					<span class="sr-only">Open main menu</span>
					<svg
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</button>
			</div>
		</div>
	</nav>

	<!-- Sidebar for Mobile -->
	{#if sidebarOpen}
		<div class="lg:hidden" role="dialog" aria-modal="true">
			<div class="fixed inset-0 z-50 bg-black bg-opacity-25"></div>
			<div
				class="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white p-6 shadow-lg sm:ring-1 sm:ring-gray-900/10"
			>
				<div class="flex items-center justify-between">
					<a href="/" class="flex items-center">
						<img class="h-8 w-auto" src={CROPWATCH_IMAGE} alt="CropWatch" />
					</a>
					<button
						type="button"
						on:click={() => (sidebarOpen = !sidebarOpen)}
						class="p-2 text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
					>
						<span class="sr-only">Close menu</span>
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div class="mt-6">
					<div class="space-y-4">
						{#each links as { name, href }}
							<a
								{href}
								class="block text-base font-semibold text-gray-900 hover:bg-gray-50 rounded-lg p-3"
							>
								{name}
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/if}
</header>

<style>
	h1 {
		font-family: 'font-awesome';
		font-weight: 900;
	}
</style>
