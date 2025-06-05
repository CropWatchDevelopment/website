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

<div class="flex flex-col border border-gray-300 shadow-md rounded-md lg:mx-16">
	<div class="bg-green-950 p-6 rounded-t-md">
		<h3 class="text-3xl font-bold text-green-100 mb-4">{title}</h3>
		<p class="mt-2 text-xl font-light text-green-200">{description}</p>
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
		class="mt-6 inline-block rounded-b-md bg-green-500 px-4 py-4 text-green-100 hover:bg-blue-700 text-nowrap text-lg"
	>
		{buttonLabel ? buttonLabel : 'Get Started'}
	</a>
</div>
