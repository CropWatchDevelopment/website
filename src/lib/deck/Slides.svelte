<script lang="ts">
	import Reveal from 'reveal.js';
	import 'reveal.js/dist/reveal.css';
	import 'reveal.js/dist/theme/sky.css';
	import 'reveal.js/plugin/highlight/monokai.css';
	import { onMount } from 'svelte';
	import TypeIt from 'typeit';

	import greenhouseVid1 from '$lib/videos/greenhouses1.mp4';
	import greenhouseVid2 from '$lib/videos/greenhouse2.mp4';

	onMount(() => {
		const reveal = new Reveal().initialize({
			// Reveal.js options here
			embedded: true, // Useful for embedding in a specific container
			autoPlayMedia: true,
			autoSlide: 15000,
			loop: true
		});
		let type1 = new TypeIt('.LoRaWANForYOU', {
			lifelike: true,
			speed: 120,
			deleteSpeed: 150,
			waitUntilVisible: true
		})
			.type('LoRaWAN for Smart Farming')
			.pause(700)
			.delete(7)
			.type('Cities')
			.pause(800)
			.delete(6)
			.type('Industry')
			.pause(300)
			.type('...', { speed: 800 })
			.pause(800)
			.delete(11)
			.type('YOU');

		let type2 = new TypeIt('.together', {
			lifelike: true,
			speed: 120,
			deleteSpeed: 150,
			waitUntilVisible: true
		}).type('Together we can farm from anywhere', { delay: 15100 });

	});
</script>

<div class="reveal-container">
	<div class="reveal">
		<div class="slides">
			<section
				data-background-video={greenhouseVid1}
				data-background-video-loop
				data-background-video-muted
			>
				<span class="LoRaWANForYOU text-white font-extrabold text-8xl"></span>
			</section>
			<section
				data-background-video={greenhouseVid2}
				data-background-video-muted
				data-state="next-after-video"
				data-autoslide="3300"
			>
				<span class="together text-white font-extrabold text-8xl"></span>
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
