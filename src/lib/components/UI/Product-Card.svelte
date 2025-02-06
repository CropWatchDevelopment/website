<script lang="ts">
	import NO_IMAGE from '$lib/images/no_image_placeholder.png';
	const { image, name, description, price, link, buttonLabel } = $props();
</script>

<div class="flex flex-col rounded bg-white p-6 shadow-md">
	<!-- Aspect ratio container -->
	<div class="w-full aspect-[396/208] bg-gray-100 overflow-hidden rounded">
		<img
			src={image ?? NO_IMAGE}
			alt={name}
			loading="lazy"
			class="w-full h-full object-contain"
		/>
	</div>
	<h3 class="mt-4 text-xl font-bold">{name ?? 'Product Name Not available'}</h3>
	<p class="mt-2 text-gray-600">{description}</p>
	<!-- <p class="mt-4 text-lg font-bold text-blue-600">{price}</p> -->
	<span class="flex-grow"></span>
	<a
		href={link}
		class="mt-4 block rounded bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
	>
		{buttonLabel}
	</a>
</div>
