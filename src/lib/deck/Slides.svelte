<script lang="ts">
	import Reveal from 'reveal.js';
	import 'reveal.js/dist/reveal.css';
	import 'reveal.js/dist/theme/sky.css';
	import 'reveal.js/plugin/highlight/monokai.css';
	import { onMount } from 'svelte';

	import greenhouseVid1 from '$lib/videos/greenhouses1.mp4';
	import greenhouseVid2 from '$lib/videos/greenhouse2.mp4';

	$: innerHeight = 500;
	onMount(() => {
		new Reveal().initialize({
			// Reveal.js options here
			embedded: true, // Useful for embedding in a specific container
			autoPlayMedia: true,
			autoSlide: 10000,
			loop: true
		});
	});

	const setSlide = (index: number) => {
		debugger;
		Reveal.slide(0);
	};
</script>

<svelte:window bind:innerHeight />
<div class="reveal-container">
	<div class="reveal">
		<div class="slides">
			<section
				data-background-video={greenhouseVid1}
				data-background-video-loop
				data-background-video-muted
			></section>
			<section
				data-background-video={greenhouseVid2}
				data-background-video-muted
				data-state="next-after-video"
			>
				Slide 2
			</section>
			<!-- Add more slides as needed -->
		</div>
	</div>
</div>

<style>
	.reveal-container {
		height: 50vh; /* 50% of the viewport height */
		width: 100%; /* Adjust width as needed */
		overflow: hidden; /* Hide overflow to maintain the set size */
	}

	.reveal {
		height: 100%;
	}
</style>
