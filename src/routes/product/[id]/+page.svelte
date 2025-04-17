<script lang="ts">
	import { page } from '$app/state';
	import { languageTag } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages.js';
	import { onMount } from 'svelte';

	let device = $state(null);
	let loading = $state(true);
	let error = $state(false);
	let activeTab = $state('specifications');

	onMount(() => {
		// Add a slight delay for animation purposes
		setTimeout(() => {
			window.addEventListener('scroll', handleScroll);
		}, 100);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function handleScroll() {
		const elements = document.querySelectorAll('.reveal-on-scroll');
		elements.forEach((el) => {
			const rect = el.getBoundingClientRect();
			const windowHeight = window.innerHeight || document.documentElement.clientHeight;
			if (rect.top <= windowHeight * 0.85) {
				el.classList.add('revealed');
			}
		});
	}

	// Fetch the device configuration
	fetch(`/configs/product/${languageTag()}/${page.params.id}.json`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			device = data;
			loading = false;
		})
		.catch((err) => {
			console.error(err);
			error = true;
			loading = false;
		});
</script>

<style>
	.reveal-on-scroll {
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 0.8s ease, transform 0.8s ease;
	}
	.revealed {
		opacity: 1;
		transform: translateY(0);
	}
	.feature-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}
	.svg-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0.05;
		z-index: 0;
	}
	.tab-button {
		position: relative;
		transition: all 0.3s ease;
	}
	.tab-button::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 2px;
		background-color: currentColor;
		transition: width 0.3s ease;
	}
	.tab-button.active::after {
		width: 100%;
	}
</style>

{#if loading}
	<!-- Enhanced Loading Spinner -->
	<div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
		<div class="relative">
			<svg class="animate-spin h-16 w-16 text-green-600" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
			</svg>
			<div class="absolute inset-0 flex items-center justify-center">
				<div class="h-8 w-8 bg-white rounded-full"></div>
			</div>
		</div>
		<p class="mt-6 text-lg font-medium text-gray-700">Loading Device Details</p>
		<p class="text-sm text-gray-500 animate-pulse">Please wait a moment...</p>
	</div>
{:else if error}
	<!-- Enhanced Error Message -->
	<div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-gray-100">
		<div class="bg-white p-8 rounded-xl shadow-lg max-w-md">
			<div class="flex justify-center">
				<svg class="h-16 w-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
				</svg>
			</div>
			<h2 class="mt-4 text-xl font-bold text-center text-gray-800">Something Went Wrong</h2>
			<p class="mt-2 text-center text-gray-600">We couldn't load the device information. Please try again later or contact support.</p>
			<button 
				class="mt-6 w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-300 ease-in-out"
				on:click={() => window.location.reload()}
			>
				Try Again
			</button>
		</div>
	</div>
{:else}
	<!-- Hero Section with Asymmetric Design -->
	<section class="relative overflow-hidden">
		<!-- Background pattern -->
		<div class="svg-bg">
			<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
				<defs>
					<pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
						<path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5" />
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#grid)" />
			</svg>
		</div>
		
		<div class="container mx-auto px-4 py-16 md:py-24 lg:py-32">
			<div class="flex flex-col md:flex-row items-center">
				<div class="md:w-1/2 z-10">
					<span class="inline-block py-1 px-3 rounded-full bg-green-100 text-green-800 text-xs font-semibold mb-4">
						{device.category || 'Advanced Technology'}
					</span>
					<h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
						{device.name}
					</h1>
					<p class="mt-4 md:mt-6 text-lg md:text-xl text-gray-600 max-w-xl">
						{device.tagline || 'Revolutionary sensor technology designed for precision and reliability in demanding environments.'}
					</p>
					<div class="mt-8 flex flex-wrap gap-4">
						<a href="#details" class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
							Explore Features
						</a>
						<a href="#contact" class="px-6 py-3 bg-white border border-gray-300 hover:border-gray-400 text-gray-800 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
							Request Info
						</a>
					</div>
				</div>
				<div class="md:w-1/2 mt-10 md:mt-0 relative z-10">
					<div class="relative">
						<div class="absolute inset-0 bg-gradient-to-r from-green-300 to-blue-300 rounded-3xl transform rotate-3 scale-105 opacity-30 blur-xl"></div>
						<img
							src={device.image}
							alt={device.name}
							width="600"
							height="600"
							loading="lazy"
							class="relative rounded-2xl shadow-2xl mx-auto object-cover"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Description Section with angled divider -->
	<section id="details" class="relative py-16 bg-gray-50">
		<div class="absolute top-0 left-0 right-0 h-16 bg-white" style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);"></div>
		<div class="container mx-auto px-4">
			<div class="max-w-4xl mx-auto">
				<div class="flex flex-col sm:flex-row items-start justify-between mb-12">
					<h2 class="text-3xl font-bold text-gray-800 reveal-on-scroll">
						{m.product_details_strengths_subtitle()}
					</h2>
					<div class="w-20 h-1 bg-green-500 rounded mt-4 sm:mt-6 reveal-on-scroll"></div>
				</div>
				
				<div class="prose prose-lg max-w-none reveal-on-scroll">
					<p class="text-gray-700">
						{device.description || "This sensor is engineered for high performance in challenging environments. It offers precise measurements, robust construction, and seamless integration into existing systems, ensuring you get the most reliable data for your applications."}
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Tabs Section for Specifications and Features -->
	<section class="py-16 md:py-24">
		<div class="container mx-auto px-4">
			<div class="flex flex-wrap justify-center space-x-8 mb-12 border-b border-gray-200">
				<button 
					class={`tab-button px-4 py-2 text-lg font-medium ${activeTab === 'specifications' ? 'text-green-600 active' : 'text-gray-500 hover:text-gray-700'}`}
					on:click={() => activeTab = 'specifications'}
				>
					Specifications
				</button>
				<button 
					class={`tab-button px-4 py-2 text-lg font-medium ${activeTab === 'features' ? 'text-green-600 active' : 'text-gray-500 hover:text-gray-700'}`}
					on:click={() => activeTab = 'features'}
				>
					Features
				</button>
			</div>

			{#if activeTab === 'specifications'}
				<div class="reveal-on-scroll">
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{#each device.specifications as specification, i}
							<div class="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl" style="animation-delay: {i * 100}ms">
								<div class="p-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
								<div class="p-6">
									<h3 class="text-xl font-bold text-gray-800 mb-2">{specification.title}</h3>
									<div class="flex justify-between items-center">
										<span class="text-sm text-gray-500">{specification.value_title}</span>
										<span class="text-lg font-semibold text-gray-800">{specification.value}</span>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{:else if activeTab === 'features'}
				<div class="reveal-on-scroll">
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each device.features as feature, i}
							<div 
								class="feature-card bg-white rounded-xl shadow-md p-6 transition-all duration-300"
								style="animation-delay: {i * 100}ms"
							>
								<div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
									<!-- You can replace this with actual icons for each feature -->
									<svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
								</div>
								<p class="text-gray-700">{feature}</p>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</section>

	<!-- Datasheet Section with Asymmetric Design -->
	<section class="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 relative overflow-hidden">
		<div class="svg-bg text-white">
			<svg viewBox="0 0 100 100" preserveAspectRatio="none">
				<path d="M0,0 L100,0 L100,100 Z" fill="currentColor" opacity="0.1"></path>
			</svg>
		</div>
		
		<div class="container mx-auto px-4">
			<div class="flex flex-col md:flex-row items-center justify-between">
				<div class="md:w-1/2 reveal-on-scroll">
					<h2 class="text-3xl font-bold mb-4">{m.product_datasheet()}</h2>
					<p class="text-gray-300 max-w-md">{m.product_datasheet_subtitle()}</p>
					<a
						href="placeholder-datasheet.pdf"
						class="mt-8 inline-flex items-center px-6 py-3 bg-white text-gray-900 rounded-lg font-medium transition hover:bg-gray-100 transform hover:-translate-y-1"
					>
						<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
						</svg>
						{m.product_datasheet_button_text()}
					</a>
				</div>
				<div class="md:w-1/2 mt-12 md:mt-0 reveal-on-scroll">
					<div class="relative mx-auto max-w-sm">
						<div class="absolute inset-0 bg-green-400 rounded transform rotate-6"></div>
						<div class="relative bg-white rounded shadow-lg p-6">
							<div class="flex items-center mb-4">
								<div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
									<svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
									</svg>
								</div>
								<h3 class="text-xl font-bold text-gray-800">Technical Documentation</h3>
							</div>
							<ul class="space-y-3 text-gray-600">
								<li class="flex items-center">
									<svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									Complete specifications
								</li>
								<li class="flex items-center">
									<svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									Installation guidelines
								</li>
								<li class="flex items-center">
									<svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									Maintenance procedures
								</li>
								<li class="flex items-center">
									<svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									Troubleshooting guide
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Contact Us Section -->
	<section id="contact" class="py-20 relative bg-white">
		<div class="container mx-auto px-4">
			<div class="flex flex-col md:flex-row md:items-center md:space-x-12">
				<div class="md:w-1/2 mb-12 md:mb-0 reveal-on-scroll">
					<h2 class="text-3xl font-bold text-gray-800 mb-6">{m.product_contact_us()}</h2>
					<p class="text-gray-600 mb-8 max-w-md">
						{m.product_contact_us_subtitle()}
					</p>
					<div class="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
						<div class="flex items-center mb-4">
							<div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
								<svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
								</svg>
							</div>
							<div>
								<h3 class="text-lg font-medium text-gray-800">Email Us</h3>
								<p class="text-gray-500">We typically respond within 24 hours</p>
							</div>
						</div>
						<div class="flex items-center">
							<div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
								<svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
								</svg>
							</div>
							<div>
								<h3 class="text-lg font-medium text-gray-800">Schedule a Call</h3>
								<p class="text-gray-500">Speak with a product specialist</p>
							</div>
						</div>
					</div>
				</div>
				<div class="md:w-1/2 reveal-on-scroll">
					<div class="bg-white rounded-xl shadow-xl overflow-hidden">
						<div class="p-2 bg-gradient-to-r from-blue-400 to-green-400"></div>
						<div class="p-6 md:p-8">
							<h3 class="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h3>
							<form class="space-y-4">
								<div>
									<label for="name" class="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
									<input type="text" id="name" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
								</div>
								<div>
									<label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
									<input type="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
								</div>
								<div>
									<label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
									<textarea id="message" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
								</div>
								<button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition duration-300 ease-in-out">
									{m.contact_us()}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
{/if}