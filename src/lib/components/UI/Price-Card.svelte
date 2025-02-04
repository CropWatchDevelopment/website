<script lang="ts">
	const {
		title,
		description,
		features,
		link,
		buttonLabel,
		color = 'bg-blue-300'
	}: { title: string; description: string; features: string[]; link: string; buttonLabel?: string, color?: string } =
		$props();
</script>

<div class="flex flex-col rounded-lg border border-gray-300 shadow-md">
	<div class="bg-blue-600 p-6">
		<h3 class="text-3xl font-bold text-white">{title}</h3>
		<p class="mt-2 text-xl font-extrabold text-gray-300">{description}</p>
	</div>
	<ul class="mt-4 space-y-2 p-6 text-left">
		{#each features as feature}
			<li class="flex items-center">
				<!-- Check icon for visual enhancement -->
				<svg
					class="mr-2 h-5 w-5 flex-shrink-0 text-green-500"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
				</svg>
				<span class="text-gray-700">{feature}</span>
			</li>
		{/each}
	</ul>
	<span class="flex-grow"></span>
	<a
		href={link}
		class="mt-6 inline-block rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
	>
		{buttonLabel ? buttonLabel : 'Get Started'}
	</a>
</div>
