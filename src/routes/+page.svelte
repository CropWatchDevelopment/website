<script lang="ts">
	import PLANT_IMAGE from '$lib/images/plant.avif';
	import COLD_STORAGE_IMAGE from '$lib/images/cold.png';
	import FACTORY_IMAGE from '$lib/images/factory.webp';
	import BOSTON_IMAGE from '$lib/images/boston.webp';
	import SAITO_IMAGE from '$lib/images/saito.webp';
	import LinkedParticles from '$lib/components/vendor/animated-lines';
	import { onMount } from 'svelte';
	import LineCarasol from '$lib/components/UI/Line-Carasol.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import PriceCard from '$lib/components/UI/Price-Card.svelte';
	import { languageTag } from '$lib/paraglide/runtime';

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
	<!-- Primary Meta Tags -->
	<title>クロップウォッチ - IoT Monitoring</title>
	<meta name="title" content="クロップウォッチ" />
	<meta
		name="description"
		content="CropWatch the best IoT device for remote monitoring for your farm 🌱, factory 🏭, building 🏢 or city 🏙️."
	/>
	<meta name="keywords" content="IoT Monitoring, クロップウォッチ, Cold Chain Management, Full service IoT" />
	<meta name="author" content="CropWatch LLC" />

	<meta
		name="description"
		content="CropWatch - Solving problems using IoT for Farming, Industry, and more"
	/>
	<meta name="keywords" content="CropWatch, IoT, Farming, Industry, Smart City" />
	<meta name="robots" content="index, follow" />
	<link rel="preload" as="image" href={SAITO_IMAGE} />
	<link rel="preload" as="image" href={PLANT_IMAGE} />
	<link rel="preload" as="image" href={COLD_STORAGE_IMAGE} />
	<link rel="preload" as="image" href={FACTORY_IMAGE} />
	<link rel="preload" as="image" href={BOSTON_IMAGE} />
</svelte:head>

<!-- Hero Section -->
<section
  id="home"
  class="relative min-h-[100vh] bg-cover bg-center text-white"
  style="background-image: url('/images/Dark_Saito.png');"
>
  <!-- Overlay -->
  <div class="absolute inset-0 bg-black bg-opacity-60"></div>

  <!-- Navbar (simple static version) -->
  <nav class="relative z-20 flex items-center justify-between px-6 py-4">
    <div class="flex items-center space-x-2">
      <img src="/favicon.ico" alt="CropWatch Logo" class="h-6 w-6" />
      <span class="text-xl font-bold text-white">CropWatch</span>
    </div>
    <div class="flex items-center space-x-4">
      <a href="/use-cases" class="text-white hover:underline">導入事例</a>
      <div class="relative">
        <button class="text-white">🌐 JA ▼</button>
      </div>
    </div>
  </nav>

  <!-- Hero Content -->
  <div class="relative z-20 flex h-[calc(100vh-80px)] flex-col items-center justify-center px-6 text-center">
    <h1 class="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
      過酷な場所でのセンシングの<br />ためのIoTプラットフォーム
    </h1>
    <p class="mt-4 max-w-xl text-lg md:text-xl">
      CropWatchは、過酷な環境での遠隔モニタリング向けの強力なソリューションを提供します。
    </p>
    <div class="mt-8 flex flex-wrap justify-center gap-4">
      <a
        href="/contact-us"
        class="rounded bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        無料デモを予約
      </a>
      <a
        href="/use-cases"
        class="rounded border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-black"
      >
        導入例を見る
      </a>
    </div>
  </div>
  
  <!-- Pulsating Arrow -->
  <div class="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
    <a href="#solutions" class="flex animate-pulse-subtle flex-col items-center text-white opacity-80 transition-opacity hover:opacity-100">
      <span class="mb-1 text-sm font-medium">Scroll</span>
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </a>
  </div>
</section>

<!-- Solutions Section Header with Visual Elements -->
<section id="solutions" class="relative">
  <!-- Decorative Background Elements -->
  <div class="absolute inset-0 overflow-hidden">
    <!-- Gradient Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-sky-50 to-gray-50"></div>
    
    <!-- Geometric Decorative Elements -->
    <div class="absolute -left-16 top-1/4 h-32 w-32 rounded-full bg-green-400 opacity-10 blur-2xl"></div>
    <div class="absolute -right-20 top-1/2 h-48 w-48 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
    <div class="absolute left-1/4 bottom-0 h-24 w-24 rounded-full bg-yellow-400 opacity-10 blur-xl"></div>
    
    <!-- Subtle Grid Pattern -->
    <div class="absolute inset-0" 
         style="background-image: radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.05) 1px, transparent 0); background-size: 40px 40px;">
    </div>
  </div>
  
  <!-- Content Container -->
  <div class="container relative z-10 mx-auto px-4 py-7">
    <div class="mx-auto max-w-3xl text-center">
      <!-- Decorative Element Above Title -->
      <div class="mb-6 flex justify-center">
        <div class="inline-flex items-center">
          <span class="h-px w-8 bg-green-600"></span>
          <span class="mx-2 rounded-full bg-green-600 p-1">
            <svg class="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.8 4.3c-.5-.5-1.1-.8-1.9-.8H5.1c-.7 0-1.4.3-1.9.8-.5.5-.8 1.2-.8 1.9v11.5c0 .7.3 1.4.8 1.9.5.5 1.1.8 1.9.8h13.8c.7 0 1.4-.3 1.9-.8.5-.5.8-1.2.8-1.9V6.2c0-.7-.3-1.4-.8-1.9zM17 15.5H7v-2h10v2zm0-4H7v-2h10v2z"></path>
            </svg>
          </span>
          <span class="h-px w-8 bg-green-600"></span>
        </div>
      </div>
      
      <!-- Title with Highlight -->
      <h2 class="relative text-4xl font-bold text-gray-900 md:text-5xl">
        <span class="relative z-10">
          {m.home_solutions_title()}
          <span class="absolute bottom-1 left-0 -z-10 h-3 w-full bg-green-200 opacity-70"></span>
        </span>
      </h2>
      
      <!-- Subtitle with Enhanced Typography -->
      <p class="mt-6 text-lg text-gray-600 md:text-xl">
        {m.home_solutions_subtitle()}
      </p>
      
      <!-- Visual Separator -->
      <div class="mt-12 flex items-center justify-center">
        <div class="h-px w-16 bg-gray-300"></div>
        <div class="mx-2 flex space-x-1">
          <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
          <span class="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
          <span class="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
        </div>
        <div class="h-px w-16 bg-gray-300"></div>
      </div>
    </div>
  </div>
  
  <!-- Solution Grid -->
  <div class="grid grid-cols-2 h-[800px]">
    <!-- Farming - Top Left -->
    <a href="/product/categories/farming" class="group relative overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
           style="background-image: url('{PLANT_IMAGE}');">
      </div>
      <div class="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
      <div class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <h3 class="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md">
          {m.home_solutions_farming_title()}
        </h3>
        <p class="text-sm md:text-base text-white max-w-md opacity-90 drop-shadow">
          {m.home_solutions_farming_description()}
        </p>
        <span class="mt-4 inline-block px-4 py-2 border border-white text-white rounded-md opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Learn More →
        </span>
      </div>
    </a>

    <!-- Cold Storage - Top Right -->
    <a href="/product/categories/cold-storage" class="group relative overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
           style="background-image: url('{COLD_STORAGE_IMAGE}');">
      </div>
      <div class="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
      <div class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <h3 class="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md">
          {m.home_solutions_cold_storage_title()}
        </h3>
        <p class="text-sm md:text-base text-white max-w-md opacity-90 drop-shadow">
          {m.home_solutions_cold_storage_description()}
        </p>
        <span class="mt-4 inline-block px-4 py-2 border border-white text-white rounded-md opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Learn More →
        </span>
      </div>
    </a>

    <!-- Safety/Industry - Bottom Left -->
    <a href="/product/categories/safety" class="group relative overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
           style="background-image: url('{FACTORY_IMAGE}');">
      </div>
      <div class="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
      <div class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <h3 class="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md">
          {m.home_solutions_safety_title()}
        </h3>
        <p class="text-sm md:text-base text-white max-w-md opacity-90 drop-shadow">
          {m.home_solutions_safety_description()}
        </p>
        <span class="mt-4 inline-block px-4 py-2 border border-white text-white rounded-md opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Learn More →
        </span>
      </div>
    </a>

    <!-- Smart City - Bottom Right -->
    <a href="/product/categories/smart-city" class="group relative overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
           style="background-image: url('{BOSTON_IMAGE}');">
      </div>
      <div class="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
      <div class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <h3 class="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md">
          {m.home_solutions_smart_cities_title()}
        </h3>
        <p class="text-sm md:text-base text-white max-w-md opacity-90 drop-shadow">
          {m.home_solutions_smart_cities_description()}
        </p>
        <span class="mt-4 inline-block px-4 py-2 border border-white text-white rounded-md opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Learn More →
        </span>
      </div>
    </a>
  </div>
</section>

<!-- Products Quickview Section -->
<section id="products-quickview" class="relative bg-white py-20 text-gray-900">
	<div class="container mx-auto text-center">
	  <h2 class="text-4xl font-bold">{m.home_popular_products_title()}</h2>
	  <p class="mt-4 text-lg text-gray-600">
		{m.home_popular_products_subtitle()}<a href="#" class="text-blue-600 underline">click here</a>.
	  </p>
	</div>
	<div class="relative mt-10">
	  <LineCarasol />
	</div>
  </section>
  

<!-- Pricing Section -->
<section id="pricing" class="relative bg-sky-50 py-24">
	<div class="container mx-auto text-center">
	  <h2 class="text-4xl font-bold text-gray-900">{m.home_pricing_title()}</h2>
	  <p class="mt-4 text-lg text-gray-600">{m.home_pricing_subtitle()}</p>
  
	  <div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
		<PriceCard
		  title="IoT"
		  description={m.price_1()}
		  features={languageTag() == 'ja'
			? [
				'データ2年分保存（データベース）',
				'データの一元管理（アプリケーションサーバー）',
				'LoRaWANサーバー',
				'アラート通知※1',
				'データダウンロード',
				'レポート作成・自動配信',
				'権限付与',
				'無制限ログイン',
				'APIアクセス'
			  ]
			: [
				'Store data for 2 years (database)',
				'Centralized data management (application server)',
				'LoRaWAN Server',
				'Alert notifications*1',
				'Data download',
				'Report generation and automatic distribution',
				'Permission granting',
				'Unlimited logins',
				'API access'
			  ]}
		  link="#"
		  color="bg-green-600"
		  buttonLabel={m.home_pricing_get_started()}
		/>
  
		<PriceCard
		  title="Edge AI(cv)"
		  description={m.price_2()}
		  features={languageTag() == 'ja'
			? [
				'データ2年分保存（データベース）',
				'データの一元管理（アプリケーションサーバー）',
				'LoRaWANサーバー',
				'アラート通知',
				'データダウンロード',
				'レポート作成・自動配信',
				'権限付与',
				'無制限ログイン',
				'APIアクセス'
			  ]
			: [
				'Store data for 2 years (database)',
				'Centralized data management (application server)',
				'LoRaWAN Server',
				'Alert notifications',
				'Data download',
				'Report generation and automatic distribution',
				'Permission granting',
				'Unlimited logins',
				'API access'
			  ]}
		  link="#"
		  color="bg-red-600"
		  buttonLabel={m.home_pricing_get_started()}
		/>
  
		<PriceCard
		  title={m.home_pricing_volume_agreement()}
		  description={m.price_3()}
		  features={languageTag() == 'ja'
			? [
				'大量のデバイスに関する交渉',
				'第三者流通契約',
				'デバイス＆ゲートウェイのレンタルパッケージ',
				'パートナーシップと協業',
				'単発プロジェクトおよび実験',
				'カスタマイズされたソリューション',
				'優先サポート',
				'カスタムSLA'
			  ]
			: [
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
		  color="bg-yellow-400"
		  buttonLabel={m.home_pricing_contact_us_options()}
		/>
	  </div>
	</div>
	<p class="mt-10 text-center text-sm text-gray-500">{m.home_pricing_disclaimer_1()}</p>
  </section>

<!-- Contact Section -->
<section id="contact" class="bg-gray-100 py-20">
	<div class="container mx-auto text-center">
		<h2 class="text-3xl font-bold">{m.home_contact_title()}</h2>
		<p class="mt-4">{m.home_contact_subtitle()}</p>
		<a
			class="mt-6 inline-block rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
			href="contact-us">{m.contact_us()}</a
		>
	</div>
</section>

<!-- Remarks on Asterisk Section -->
<section id="remarks" class="flex flex-col bg-gray-200 py-10 pl-3 text-left">
	<ol>
		<li>
			<sm>※1</sm>
			{m.home_disclaimer_1()}
			<a class="cursor-pointer font-bold text-blue-900 underline" href="https://discord.com/"
				>Discord</a
			>
		</li>
	</ol>
</section>

<style>
	@keyframes pulse-subtle {
	  0%, 100% {
		transform: scale(1);
	  }
	  50% {
		transform: scale(1.15);
	  }
	}
	
	.animate-pulse-subtle {
	  animation: pulse-subtle 2s ease-in-out infinite;
	}
  </style>