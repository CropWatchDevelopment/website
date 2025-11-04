<script lang="ts">
	import Slider from '$lib/components/Slider.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section id="slider">
	<Slider min={0} max={200} step={5} value={50} />
</section>

<section id="company-intro" class="mx-auto max-w-4xl px-4">
	<h1 class="mb-6 text-4xl font-bold">Industrial IoT That Pays for Itself</h1>
	<p class="text-lg text-gray-700">
		CropWatch is a leading provider of IoT solutions for agriculture, manufacturing, logistics, and
		energy sectors. Our innovative sensor technology and analytics platform help businesses optimize
		operations, improve efficiency, and ensure quality control.
	</p>
</section>
