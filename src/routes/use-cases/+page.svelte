<script>
	import { languageTag } from "$lib/paraglide/runtime";
	import * as m from '$lib/paraglide/messages.js';

	// Example use cases array
	let useCases = $state([]);
	fetch(`/configs/usecases/${languageTag()}.json`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			useCases = data.usecases;
		})
		.catch((err) => {
			console.error(err);
		});
</script>

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
					<h3 class="text-lg font-semibold text-gray-800">Challenges</h3>
					<p class="text-gray-600">{useCase.challenges}</p>
				</div>
				<div>
					<h3 class="text-lg font-semibold text-gray-800">Solution</h3>
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
