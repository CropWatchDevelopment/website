<script>
	import { languageTag } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages.js';

	// Example use cases array
	let useCases = $state([]);
	$effect(() => {
		fetch(`/configs/usecases/${languageTag()}.json`)
			.then((res) => res.json())
			.then((data) => {
				debugger;
				console.log(data);
				useCases = data.usecases;
			})
			.catch((err) => {
				console.error(err);
			});
	});
</script>

<svelte:head>
	<title>CropWatch IoT Use Cases</title>
	<meta name="description" content="Problems CropWatch has solved with our IoT Devices." />
	<meta name="keywords" content="CropWatch, IoT, Use Cases" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="CropWatch" />
	<meta property="og:title" content="CropWatch IoT Use Cases" />
	<meta property="og:description" content="Problems CropWatch has solved with our IoT Devices." />
</svelte:head>

<h1 class="mb-8 mt-4 text-center text-6xl font-bold">Use Cases</h1>
<div class="mx-8 mb-4 grid grid-cols-1 gap-6 border-b border-t sm:grid-cols-2 lg:grid-cols-4">
	{#each useCases as useCase}
		<div class="flex flex-col overflow-hidden rounded-lg bg-slate-200 shadow">
			<!-- Image container with title overlay -->
			<div class="relative">
				<img src={useCase.image} alt={useCase.alt} class="h-52 w-full object-cover" />
				<div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2">
					<h2 class="text-lg font-semibold text-white">{useCase.title}</h2>
				</div>
			</div>
			<div class="flex-grow p-4">
				<div class="mb-4">
					<h3 class="text-lg font-semibold text-gray-800">{m.usecases_challenges()}</h3>
					<p class="text-gray-600">{useCase.challenges}</p>
				</div>
				<div>
					<h3 class="text-lg font-semibold text-gray-800">{m.usecases_solutions()}</h3>
					<p class="text-gray-600">{useCase.solution}</p>
				</div>
			</div>
			{#if useCase.button}
				<div class="p-4 text-right">
					{#if useCase.button.external}
						<a
							href={useCase.button.link}
							target="_blank"
							rel="noopener noreferrer"
							class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
						>
							{useCase.button.text}
						</a>
					{:else}
						<a
							href={useCase.button.link}
							class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
						>
							{useCase.button.text}
						</a>
					{/if}
				</div>
			{/if}
		</div>
	{/each}

	<div class="flex items-center justify-center rounded-lg bg-slate-200 p-4 shadow">
		<span class="text-2xl font-semibold text-gray-500">{m.more_coming_soon()}</span>
	</div>
</div>
