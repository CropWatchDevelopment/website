<script lang="ts">
	import { onMount } from 'svelte';
	import productData from '$lib/paraglide/messages/cw-ss.js';

	let product = productData;
	let isContactFormOpen = false;

	$: product = productData;

	function toggleContactForm() {
		isContactFormOpen = !isContactFormOpen;
	}

	function handleSubmit() {
		alert('Thank you for your interest! Our team will contact you soon.');
		isContactFormOpen = false;
	}

	let activeTooltip: string | null = null;

	function showTooltip(id: string) {
		activeTooltip = id;
	}

	function hideTooltip() {
		activeTooltip = null;
	}

	onMount(() => {});
</script>

<!-- Hero Section -->
<section class="bg-gradient-to-r from-green-700 to-green-600 text-white">
	<div class="container mx-auto flex flex-col items-center px-4 py-12 md:flex-row md:px-8">
		<div class="mb-8 md:mb-0 md:w-1/2">
			<h1 class="mb-4 text-4xl font-bold md:text-5xl">{product.name}</h1>
			<p class="mb-6 text-xl md:text-2xl">{product.tagline}</p>
			<p class="mb-8 text-lg">{product.description}</p>
			<div class="flex space-x-4">
				<a href="mailto:sayaka@cropwatch.io"
					class="rounded-lg bg-white px-6 py-3 font-bold text-green-700 shadow-lg transition duration-300 hover:bg-green-100"
				>
					Request Quote
				</a>
				<button
					class="rounded-lg border-2 border-white bg-transparent px-6 py-3 font-bold text-white transition duration-300 hover:bg-white hover:text-green-700"
				>
					Download Datasheet
				</button>
			</div>
		</div>
		<div class="flex justify-center md:w-1/2">
			<img
				src="/images/CW-SS-TMEPNPK.webp"
				alt="CropWatch Soil Sensor Device"
				class="h-auto max-w-full rounded-lg shadow-xl"
			/>
		</div>
	</div>
</section>

<!-- Product Showcase -->
<section class="bg-gray-100 py-16">
	<div class="container mx-auto px-4 md:px-8">
		<h2 class="mb-12 text-center text-3xl font-bold text-gray-800">Product Models</h2>
		<div class="grid gap-8 md:grid-cols-2">
			{#each product.models as model}
				<div class="overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-105">
					<div class="p-6">
						<h3 class="mb-2 text-2xl font-bold text-green-700">{model.name}</h3>
						<div class="mb-2 text-gray-500">Model: {model.id}</div>
						<p class="text-gray-700">{model.description}</p>
					</div>
					<div class="flex items-center justify-between bg-green-700 p-4 text-white">
						<span class="font-bold">Learn More</span>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- What Makes CropWatch Stand Out -->
<section class="bg-white py-16">
	<div class="container mx-auto px-4 md:px-8">
		<h2 class="mb-12 text-center text-3xl font-bold text-gray-800">What Makes CropWatch Stand Out</h2>
		<div class="mx-auto max-w-3xl">
			<ul class="space-y-4">
				{#each product.standoutFeatures as feature}
					<li class="flex items-start">
						<div class="mt-1 flex-shrink-0">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
						</div>
						<p class="ml-3 text-lg text-gray-700">{feature}</p>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<!-- Features & Specifications -->
<section class="bg-gray-100 py-16">
	<div class="container mx-auto px-4 md:px-8">
		<div class="flex flex-col md:flex-row">
			<!-- Features Column -->
			<div class="mb-8 pr-0 md:mb-0 md:w-1/2 md:pr-8">
				<h2 class="mb-8 text-3xl font-bold text-gray-800">Key Features</h2>
				<div class="space-y-6">
					<div class="rounded-lg bg-white p-6 shadow-md">
						<div class="mb-3 flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
							<h3 class="ml-3 text-xl font-bold text-gray-800">Long Battery Life</h3>
						</div>
						<p class="text-gray-700">Up to 5 years of operation from a single D-cell Li-SOCL<sub>2</sub> battery, perfect for remote deployments.</p>
					</div>
					<div class="rounded-lg bg-white p-6 shadow-md">
						<div class="mb-3 flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
							</svg>
							<h3 class="ml-3 text-xl font-bold text-gray-800">Superior Connectivity</h3>
						</div>
						<p class="text-gray-700">Robust LoRaWAN and RS485 connectivity for reliable data transmission in the field.</p>
					</div>
					<div class="rounded-lg bg-white p-6 shadow-md">
						<div class="mb-3 flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
							</svg>
							<h3 class="ml-3 text-xl font-bold text-gray-800">Environmental Durability</h3>
						</div>
						<p class="text-gray-700">IP67-rated enclosure and conformal coated PCB for protection against moisture and contaminants.</p>
					</div>
				</div>
			</div>
			<!-- Specifications Column -->
			<div class="pl-0 md:w-1/2 md:pl-8">
				<h2 class="mb-8 text-3xl font-bold text-gray-800">Technical Specifications</h2>
				<div class="overflow-hidden rounded-lg bg-white shadow-md">
					{#each product.specifications as category}
						<div class="border-b border-gray-200 last:border-b-0">
							<div class="bg-green-700 px-6 py-3 text-white">
								<h3 class="font-bold">{category.category} Specifications</h3>
							</div>
							<div class="p-4">
								<table class="w-full">
									<tbody>
										{#each category.specs as spec}
											<tr class="border-b border-gray-100 last:border-b-0">
												<td class="py-3 font-medium text-gray-600">{spec.name}</td>
												<td class="py-3 text-gray-800">{spec.value}</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Applications -->
<section class="bg-gradient-to-r from-green-700 to-green-600 py-16 text-white">
	<div class="container mx-auto px-4 md:px-8">
		<h2 class="mb-12 text-center text-3xl font-bold">Applications</h2>
		<div class="grid gap-8 md:grid-cols-3">
			{#each product.applications as application}
				<div class="rounded-lg border border-white border-opacity-20 bg-white bg-opacity-10 p-6 backdrop-blur-lg backdrop-filter">
					<h3 class="mb-4 text-2xl font-bold">{application.name}</h3>
					<ul class="space-y-2">
						{#each application.examples as example}
							<li class="flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
								{example}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Call to Action -->
<section class="bg-green-700 py-16 text-white">
	<div class="container mx-auto px-4 text-center md:px-8">
		<h2 class="mb-6 text-3xl font-bold">Ready to Optimize Your Soil Monitoring?</h2>
		<p class="mx-auto mb-8 max-w-3xl text-xl">
			Join the growing number of growers and researchers who trust CropWatch for their soil data needs.
		</p>
		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<button
				onclick={toggleContactForm}
				class="rounded-lg bg-white px-8 py-3 font-bold text-green-700 shadow-lg transition duration-300 hover:bg-green-100"
			>
				Contact Sales
			</button>
			<a
				href="#download"
				class="rounded-lg border-2 border-white bg-transparent px-8 py-3 font-bold text-white transition duration-300 hover:bg-white hover:text-green-700"
			>
				Download Documentation
			</a>
		</div>
	</div>
</section>

<!-- Contact Form Modal -->
{#if isContactFormOpen}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
		<div class="w-full max-w-md rounded-lg bg-white shadow-xl">
			<div class="p-6">
				<div class="mb-4 flex items-center justify-between">
					<h3 class="text-2xl font-bold text-gray-800">Contact Sales</h3>
					<button onclick={toggleContactForm} class="text-gray-500 hover:text-gray-700">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<form>
					<div class="mb-4">
						<label for="name" class="mb-2 block font-medium text-gray-700">Name</label>
						<input type="text" id="name" class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500" required />
					</div>
					<div class="mb-4">
						<label for="email" class="mb-2 block font-medium text-gray-700">Email</label>
						<input type="email" id="email" class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500" required />
					</div>
					<div class="mb-4">
						<label for="company" class="mb-2 block font-medium text-gray-700">Company</label>
						<input type="text" id="company" class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500" required />
					</div>
					<div class="mb-6">
						<label for="message" class="mb-2 block font-medium text-gray-700">Message</label>
						<textarea id="message" rows="4" class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500" required></textarea>
					</div>
					<button type="submit" class="w-full rounded-lg bg-green-700 px-4 py-3 font-bold text-white transition duration-300 hover:bg-green-800">Submit Request</button>
				</form>
			</div>
		</div>
	</div>
{/if}

<!-- Footer -->
<footer class="bg-gray-800 py-12 text-white">
	<div class="container mx-auto px-4 md:px-8">
		<div class="grid gap-8 md:grid-cols-4">
			<div>
				<h3 class="mb-4 text-xl font-bold">CropWatch</h3>
				<p class="text-gray-300">Soil Sensing Solutions</p>
				<p class="mt-2 text-gray-300">© 2025 CropWatch. All rights reserved</p>
			</div>
			<div>
				<h3 class="mb-4 text-lg font-bold">Products</h3>
				<ul class="space-y-2">
					<li><a href="#soil" class="text-gray-300 hover:text-white">Soil Sensors</a></li>
					<li><a href="#air" class="text-gray-300 hover:text-white">Air Quality Sensors</a></li>
					<li><a href="#gateways" class="text-gray-300 hover:text-white">LoRaWAN Gateways</a></li>
					<li><a href="#software" class="text-gray-300 hover:text-white">Monitoring Platform</a></li>
				</ul>
			</div>
			<div>
				<h3 class="mb-4 text-lg font-bold">Resources</h3>
				<ul class="space-y-2">
					<li><a href="#docs" class="text-gray-300 hover:text-white">Documentation</a></li>
					<li><a href="#support" class="text-gray-300 hover:text-white">Support</a></li>
					<li><a href="#blog" class="text-gray-300 hover:text-white">Blog</a></li>
					<li><a href="#videos" class="text-gray-300 hover:text-white">Videos</a></li>
				</ul>
			</div>
		</div>
	</div>
</footer>
