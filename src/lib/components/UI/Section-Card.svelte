<script lang="ts">
	const { image, title, description, link, class: ClassName } = $props();
</script>

<div class="m-1 mx-2 rounded-md bg-white text-left shadow-md">
	<img src={image} alt="Agriculture" loading="lazy" class="mx-auto h-60 w-full rounded-t-md" />
	<div class="px-6">
		<h3 class="mt-4 text-2xl font-bold">{title}</h3>
		<p class="mt-4 pb-2 font-light">{description}</p>
		<p class="text-center">
			{#if link}
				<a
					href={link}
					class="block {ClassName} my-6 rounded py-3 font-light text-white transition-all hover:scale-105"
				>
					Learn more
				</a>
			{:else}
				<span class="block {ClassName} my-6 rounded py-3 font-bold text-white"> Coming soon </span>
			{/if}
		</p>
	</div>
</div>
