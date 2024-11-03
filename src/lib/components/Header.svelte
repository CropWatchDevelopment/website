<script lang="ts">
	import CROPWATCH_IMAGE from '$lib/images/cropwatch_static.svg';
	let sidebarOpen: boolean = false;

	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'Knowledge Base', href: 'https://kb.cropwatch.io', newTab: true },
		{ name: 'Blog', href: '/blog' },
		{ name: 'Contact Us', href: '/contact-us' },
	];
</script>

<header class="bg-white">
	<nav
		class="mx-auto flex w-2/3 max-w-7xl items-center justify-between py-4 lg:px-8"
		aria-label="Global"
	>
		<div class="flex items-center flex-row gap-x-12 w-full">
			<a href="/" class="-m-1.5 flex flex-row items-center p-1">
				<img style="max-height: 40px;" class="mr-2 w-auto" src={CROPWATCH_IMAGE} alt="" />
				<h1 class="text-[23.4px] font-bold text-[#767676]">CropWatch</h1>
			</a>
			<span class="lg:flex-1" />
			<div class="hidden lg:flex lg:gap-x-12">
				{#each links as { name, href, newTab }}
					<a
						{href}
						rel={newTab ? 'noopener noreferrer' : undefined}
						target={newTab ? '_blank' : undefined}
						class="text-sm font-semibold leading-6 text-gray-900"
					>
						{name}
					</a>
				{/each}
			</div>
		</div>
		<div class="flex lg:hidden">
			<button
				type="button"
				on:click={() => (sidebarOpen = !sidebarOpen)}
				class="border-1 -m-2.5 inline-flex items-center justify-center rounded-md border border-solid border-gray-200 p-2.5 text-gray-700 hover:bg-[#ddd]"
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
					data-slot="icon"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
		</div>
	</nav>

	{#if sidebarOpen}
		<div class="lg:hidden" role="dialog" aria-modal="true">
			<div class="fixed inset-0 z-50"></div>
			<div
				class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
			>
				<div class="flex items-center justify-between">
					<a href="/" class="-m-1.5 p-1.5">
						<span class="sr-only">CropWatch</span>
						<img class="h-8 w-auto" src={CROPWATCH_IMAGE} alt="CropWatch" />
					</a>
					<button
						type="button"
						on:click={() => (sidebarOpen = !sidebarOpen)}
						class="-m-2.5 rounded-md p-2.5 text-gray-700"
					>
						<span class="sr-only">Close menu</span>
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
							data-slot="icon"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div class="mt-6 flow-root">
					<div class="-my-6 divide-y divide-gray-500/10">
						<div class="space-y-2 py-6">
							{#each links as { name, href }}
								<a
									{href}
									class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									>{name}</a
								>
							{/each}
						</div>
						<div class="py-6">
							<a
								href="https://app.cropwatch.io"
								class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>Log in</a
							>
						</div>
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
