<script lang="ts">
	const {
		title,
		description,
		features,
		link,
	}: { title: string; description: string; features: string[], link: string } = $props();
</script>

<div class="flex flex-col rounded-lg border border-gray-300 p-6 shadow-md">
	<h3 class="text-xl font-bold text-gray-800">{title}</h3>
	<p class="mt-2 text-gray-700 text-lg">{description}</p>
	<hr class="my-4 border-blue-300" />
	<ul class="mt-4 space-y-2 text-left">
		{#each features as feature}
			<li class="flex items-center">
				<!-- Check icon for visual enhancement -->
				<svg class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
				</svg>
				<span class="text-gray-700">{feature}</span>
			</li>
		{/each}
	</ul>
	<span class="flex-grow"></span>
	<a href={link} class="mt-6 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition">
		Get Started
	</a>
</div>
