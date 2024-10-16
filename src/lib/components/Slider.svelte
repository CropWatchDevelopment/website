<script lang="ts">
	import Reveal from 'reveal.js';
	import 'reveal.js/dist/reveal.css';
	import 'reveal.js/dist/theme/sky.css';
	import 'reveal.js/plugin/highlight/monokai.css';
	import { onMount } from 'svelte';
	// import TypeIt from 'typeit';

	import SAITO_IMAGE from '$lib/images/saito.jpg';
	import PEPPER_FIELD_IMAGE from '$lib/images/pepperfield.jpg';
	import CHICKEN_IMAGE from '$lib/images/chickens.jpg';
	import COLD_CHAIN_IMAGE from '$lib/images/cold_chain.jpg';
	import { PUBLIC_APIURL } from '$env/static/public';

	export let slides;

	const opacity = 0.65;

	onMount(() => {
		// Initialize Reveal.js
		const reveal = new Reveal();
		reveal
			.initialize({
				embedded: true, // Embed in container
				autoPlayMedia: true,
				autoSlide: 15000,
				loop: true
			})
			.then(() => {
				// Once Reveal.js is ready, start the TypeIt animations
				// new TypeIt('.LoRaWANForYOU', {
				// 	speed: 120,
				// 	deleteSpeed: 150,
				// 	waitUntilVisible: true // Wait for visibility
				// })
				// 	.type('LoRaWAN<sup style="font-size:34px;">®</sup> for Smart Farming')
				// 	.pause(700)
				// 	.delete(7)
				// 	.type('Cities')
				// 	.pause(800)
				// 	.delete(6)
				// 	.type('Industry')
				// 	.pause(300)
				// 	.type('...', { speed: 800 })
				// 	.pause(800)
				// 	.delete(11)
				// 	.type('YOU')
				// 	.go(); // Add go() to start TypeIt
				// new TypeIt('.together', {
				// 	speed: 120,
				// 	deleteSpeed: 150,
				// 	waitUntilVisible: true
				// })
				// 	.type('Together we can farm from <u>anywhere</u>', { delay: 15100 })
				// 	.go(); // Add go() to start TypeIt
			});
	});
</script>

<div class="reveal-container">
	<div class="reveal">
		<div class="slides">
			{#each slides as slide}
				<section
					data-background-color="rgb(0, 0, 0)"
					data-background-opacity={opacity}
					data-background-image={`${PUBLIC_APIURL}/assets/${slide.translations[0]?.image}`}
				>
					<div class="flex flex-col gap-5">
						<h1 class="title">{slide.translations[0]?.title}</h1>
						<h3 class="subtitle">{slide.translations[0]?.subtitle}</h3>
						<button class="btn btn-hero btn-lg bg-[#1abc9c]">{slide.translations[0]?.button_text}</button>
					</div>
				</section>
			{/each}
		</div>
	</div>
</div>

<style>
	.title {
		border-bottom-color: rgb(229, 231, 235);
		border-bottom-style: solid;
		border-bottom-width: 0px;
		border-left-color: rgb(229, 231, 235);
		border-left-style: solid;
		border-left-width: 0px;
		border-right-color: rgb(229, 231, 235);
		border-right-style: solid;
		border-right-width: 0px;
		border-top-color: rgb(229, 231, 235);
		border-top-style: solid;
		border-top-width: 0px;
		box-sizing: border-box;
		color: rgb(255, 255, 255);
		display: block;
		font-family: 'Open Sans', sans-serif;
		font-feature-settings: normal;
		font-size: 80px;
		font-variation-settings: normal;
		font-weight: 700;
		height: auto;
		line-height: 61.6px;
		margin-block-end: 0px;
		margin-block-start: 0px;
		margin-bottom: 0px;
		margin-inline-end: 0px;
		margin-inline-start: 0px;
		margin-left: 0px;
		margin-right: 0px;
		margin-top: 0px;
		padding-bottom: 0px;
		padding-left: 0px;
		padding-right: 0px;
		padding-top: 0px;
		tab-size: 4;
		text-align: center;
		text-size-adjust: 100%;
		text-transform: uppercase;
		unicode-bidi: isolate;
		width: auto;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
	.subtitle {
		border-bottom-color: rgb(229, 231, 235);
		border-bottom-style: solid;
		border-bottom-width: 0px;
		border-left-color: rgb(229, 231, 235);
		border-left-style: solid;
		border-left-width: 0px;
		border-right-color: rgb(229, 231, 235);
		border-right-style: solid;
		border-right-width: 0px;
		border-top-color: rgb(229, 231, 235);
		border-top-style: solid;
		border-top-width: 0px;
		box-sizing: border-box;
		color: rgb(255, 255, 255);
		display: block;
		font-family: Lato, sans-serif;
		font-feature-settings: normal;
		font-size: 30px;
		font-variation-settings: normal;
		font-weight: 600;
		height: auto;
		line-height: 19.8px;
		margin-block-end: 0px;
		margin-block-start: 0px;
		margin-bottom: 0px;
		margin-inline-end: 0px;
		margin-inline-start: 0px;
		margin-left: 0px;
		margin-right: 0px;
		margin-top: 0px;
		padding-bottom: 0px;
		padding-left: 0px;
		padding-right: 0px;
		padding-top: 10px;
		tab-size: 4;
		text-align: center;
		text-size-adjust: 100%;
		text-transform: uppercase;
		unicode-bidi: isolate;
		width: auto;
	}
	.btn {
		font-size: 30px;
		border-radius: 10px;
		padding: 15px 50px 15px 50px;
	}
	.btn:hover {
		background-color: #16cea9;
	}
	.reveal-container {
		height: 54vh;
		width: 100%;
		overflow: hidden;
	}

	.reveal {
		height: 100%;
	}
</style>
