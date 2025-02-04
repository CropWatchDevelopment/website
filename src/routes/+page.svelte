<script lang="ts">
	import PLANT_IMAGE from '$lib/images/plant.avif';
	import COLD_STORAGE_IMAGE from '$lib/images/cold-storage.webp';
	import SectionCard from '$lib/components/UI/Section-Card.svelte';
	import FACTORY_IMAGE from '$lib/images/factory.webp';
	import BOSTON_IMAGE from '$lib/images/boston.webp';
	import SAITO_IMAGE from '$lib/images/saito.webp';
	import LinkedParticles from '$lib/components/vendor/animated-lines';
	import { onMount } from 'svelte';
	import LineCarasol from '$lib/components/UI/Line-Carasol.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import PriceCard from '$lib/components/UI/Price-Card.svelte';

	let canvas;
	let ctx;
	let lp;
	let submittingEmail = $state(false);

	function resizeCanvas() {
		const section = document.getElementById('solutions');
		const { width, height } = section.getBoundingClientRect();
		canvas.width = width;
		canvas.height = height;
	}

	onMount(() => {
		canvas = document.getElementById('lines');
		ctx = canvas.getContext('2d');

		// Initialize canvas size
		resizeCanvas();

		// Listen for window resize
		window.addEventListener('resize', resizeCanvas);

		lp = new LinkedParticles(ctx);

		function loop() {
			lp.update();
			lp.draw();
			requestAnimationFrame(loop);
		}
		requestAnimationFrame(loop);
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
	<!-- Preload the hero background image to optimize LCP -->
	<link rel="preload" as="image" href={SAITO_IMAGE} />
	<!-- Inline critical CSS if possible -->
	<style>
		/* Minimal critical styles can be inlined here.
		   For full optimization, consider extracting above‑the‑fold CSS. */
		body {
			margin: 0;
			font-family: sans-serif;
		}
	</style>
	<!-- 
		NOTE: Ensure your server or CDN is configured to serve static assets (images, CSS, JS)
		with an efficient cache policy (e.g., Cache-Control headers) to improve repeat load performance.
	-->
</svelte:head>

<!-- Hero Section -->
<section
	id="home"
	class="relative bg-blue-200 py-32 text-white"
	style="background-image: url('{SAITO_IMAGE}'); background-size: cover; background-position: top;"
>
	<!-- Overlay for blur and darkening -->
	<div class="backdrop-blur-xs absolute inset-0 bg-black bg-opacity-40"></div>
	<!-- Content -->
	<div class="container relative mx-auto text-center">
		<h1 class="text-4xl font-bold text-yellow-400 xl:text-6xl">{m.home_hero_title()}</h1>
		<p class="mt-4 text-lg">
			{m.home_hero_subtitle()}
		</p>
		<div class="mt-6">
			<a href="/use-cases" class="rounded bg-white px-6 py-3 text-blue-600 hover:bg-gray-200">
				{m.home_hero_button_label()}
			</a>
		</div>
		<div class="mt-10">
			<!-- If you add any hero image element here, consider adding explicit width/height and loading="lazy" if offscreen -->
		</div>
	</div>
</section>

<!-- Solutions Section -->
<section id="solutions" class="relative bg-gray-100 py-20" style="overflow: hidden;">
	<canvas id="lines" class="absolute inset-0 z-0 h-full w-full"></canvas>
	<div class="container relative z-10 mx-auto text-center">
		<h2 class="text-3xl font-bold">{m.home_solutions_title()}</h2>
		<p class="mt-4">{m.home_solutions_subtitle()}</p>
		<div class="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			<SectionCard
				image={PLANT_IMAGE}
				title={m.home_solutions_farming_title()}
				description={m.home_solutions_farming_description()}
				link="/product/categories/farming"
			/>

			<SectionCard
				image={COLD_STORAGE_IMAGE}
				title={m.home_solutions_cold_storage_title()}
				description={m.home_solutions_cold_storage_description()}
				link="/product/categories/cold-storage"
			/>

			<SectionCard
				image={FACTORY_IMAGE}
				title={m.home_solutions_safety_title()}
				description={m.home_solutions_safety_description()}
				link="/product/categories/safety"
			/>

			<SectionCard
				image={BOSTON_IMAGE}
				title={m.home_solutions_smart_cities_title()}
				description={m.home_solutions_smart_cities_description()}
				link="/product/categories/smart-city"
			/>
		</div>
	</div>
</section>

<!-- Products Quickview Section -->
<section id="products-quickview" class="bg-gray-600 py-10 text-white">
	<div class="container mx-auto text-center">
		<h2 class="text-3xl font-bold">{m.home_popular_products_title()}</h2>
		<p class="mt-4">
			{m.home_popular_products_subtitle()}<a href="#"><u>click here</u></a>.
		</p>
	</div>
	<LineCarasol />
</section>

<!-- Pricing Section -->
<section id="pricing" class="bg-white py-20">
	<div class="container mx-auto text-center">
		<h2 class="text-3xl font-bold">{m.home_pricing_title()}</h2>
		<p class="mt-4">{m.home_pricing_subtitle()}</p>
		<div class="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
			<PriceCard
				title="IoT"
				description="¥550/機 （税込）"
				features={[
					'データ2年分保存（データベース）',
					'データの一元管理（アプリケーションサーバー）',
					'LoRaWANサーバー',
					'アラート通知※1',
					'データダウンロード',
					'レポート作成・自動配信',
					'権限付与',
					'無制限ログイン',
					'APIアクセス'
				]}
				link="#"
				color="bg-green-500"
				buttonLabel={m.home_pricing_get_started()}
			/>

			<PriceCard
				title="Edge AI(cv)"
				description="¥11,000/機 （税込）"
				features={[
					'データ2年分保存（データベース）',
					'データの一元管理（アプリケーションサーバー）',
					'LoRaWANサーバー',
					'アラート通知',
					'データダウンロード',
					'レポート作成・自動配信',
					'権限付与',
					'無制限ログイン',
					'APIアクセス'
				]}
				link="#"
				color="bg-red-500"
				buttonLabel={m.home_pricing_get_started()}
			/>

			<PriceCard
				title={m.home_pricing_volume_agreement()}
				description="Let's Talk!"
				features={[
					'Negotiate on large amounts of devices',
					'3rd part distribution agreements',
					'Device & gateway rental bundles',
					'Partnerships & collaborations',
					'One-off projects and experiments',
					'Customized solutions',
					'Priority support',
					'Custom SLA'
				]}
				link="/contact-us"
				color="bg-yellow-300"
				buttonLabel={m.home_pricing_contact_us_options()}
			/>
		</div>
	</div>
	<p class="p-6">{m.home_pricing_disclaimer_1()}</p>
</section>

<!-- Contact Section -->
<section id="contact" class="bg-gray-100 py-20">
	<div class="container mx-auto text-center">
		<h2 class="text-3xl font-bold">{m.home_contact_title()}</h2>
		<p class="mt-4">{m.home_contact_subtitle()}</p>
		<a class="mt-6 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition" href="contact-us">Contact Us</a>
	</div>
</section>

<!-- Remarks on Asterisk Section -->
<section id="remarks" class="flex flex-col bg-gray-200 py-10 pl-3 text-left">
	<ol>
		<li>
			<sm>※1</sm>
			{m.home_disclaimer_1()}
			<a class="text-blue cursor-pointer" href="https://discord.com/">Discord</a>
		</li>
	</ol>
</section>
