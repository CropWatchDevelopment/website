<script lang="ts">
	import { onMount } from 'svelte';
	import productData from '$lib/paraglide/messages/cw-air-th.js';

	let product = productData;
	let isContactFormOpen = false;

	// If productData is dynamic per language, this will update on language change
	$: product = productData;

	const onNavigate = (locationId: string) => {
		console.log(`Navigating to location with ID: ${locationId}`);
	};

	const testimonials = [
		{
			quote: 'CropWatch sensors have transformed how we monitor our greenhouse conditions, saving us thousands in potential crop losses.',
			author: 'Sarah Johnson',
			title: 'Operations Manager, Green Valley Farms',
			image: 'images/testimonial1.jpg'
		},
		{
			quote: "The battery life is impressive. We installed these two years ago and haven't had to service a single unit yet.",
			author: 'Michael Chen',
			title: 'Chief Engineer, FreshTech Storage Solutions'
		},
		{
			quote: 'The data reliability even in our metal-walled cold storage facilities is outstanding. No more dead zones.',
			author: 'David Rodriguez',
			title: 'Quality Assurance Director, Pacific Cold Chain'
		}
	];

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
<section class="bg-gradient-to-r from-blue-700 to-blue-600 text-white">
	<div class="container mx-auto flex flex-col items-center px-4 py-12 md:flex-row md:px-8">
		<div class="mb-8 md:mb-0 md:w-1/2">
			<h1 class="mb-4 text-4xl font-bold md:text-5xl">{product.name}</h1>
			<p class="mb-6 text-xl md:text-2xl">{product.tagline}</p>
			<p class="mb-8 text-lg">{product.description}</p>
			<div class="flex space-x-4">
				<a href="mailto:sayaka@cropwatch.io"
					class="rounded-lg bg-white px-6 py-3 font-bold text-blue-700 shadow-lg transition duration-300 hover:bg-green-100"
				>
					Request Quote
			</a>
				<button
					class="rounded-lg border-2 border-white bg-transparent px-6 py-3 font-bold text-white transition duration-300 hover:bg-white hover:text-blue-700"
				>
					Download Datasheet
				</button>
			</div>
		</div>
		<div class="flex justify-center md:w-1/2">
			<img
				src="/images/CW-AIR-TH-nobg.png"
				alt="CropWatch Monitoring Device"
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
				<div
					class="overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-105"
				>
					<div class="p-6">
						<h3 class="mb-2 text-2xl font-bold text-blue-700">{model.name}</h3>
						<div class="mb-2 text-gray-500">Model: {model.id}</div>
						<p class="text-gray-700">{model.description}</p>
					</div>
					<div class="flex items-center justify-between bg-blue-700 p-4 text-white">
						<span class="font-bold">Learn More</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
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
		<h2 class="mb-12 text-center text-3xl font-bold text-gray-800">
			What Makes CropWatch Stand Out
		</h2>

		<div class="mx-auto max-w-3xl">
			<ul class="space-y-4">
				{#each product.standoutFeatures as feature}
					<li class="flex items-start">
						<div class="mt-1 flex-shrink-0">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-green-600"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clip-rule="evenodd"
								/>
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
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-8 w-8 text-green-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 10V3L4 14h7v7l9-11h-7z"
								/>
							</svg>
							<h3 class="ml-3 text-xl font-bold text-gray-800">Long Battery Life</h3>
						</div>
						<p class="text-gray-700">
							Up to 10 years of operation from a single D-cell Li-SOCL2 battery, perfect for remote
							deployments.
						</p>
					</div>

					<div class="rounded-lg bg-white p-6 shadow-md">
						<div class="mb-3 flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-8 w-8 text-green-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
								/>
							</svg>
							<h3 class="ml-3 text-xl font-bold text-gray-800">Superior Connectivity</h3>
						</div>
						<p class="text-gray-700">
							Removable and extendable external antenna with SMA-RP connector provides robust signal
							performance.
						</p>
					</div>

					<div class="rounded-lg bg-white p-6 shadow-md">
						<div class="mb-3 flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-8 w-8 text-green-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
								/>
							</svg>
							<h3 class="ml-3 text-xl font-bold text-gray-800">Environmental Durability</h3>
						</div>
						<p class="text-gray-700">
							IP67-rated enclosure with fully conformal coated PCB for protection against moisture
							and contaminants.
						</p>
					</div>
				</div>
			</div>

			<!-- Specifications Column -->
			<div class="pl-0 md:w-1/2 md:pl-8">
				<h2 class="mb-8 text-3xl font-bold text-gray-800">Technical Specifications</h2>

				<div class="overflow-hidden rounded-lg bg-white shadow-md">
					{#each product.specifications as category}
						<div class="border-b border-gray-200 last:border-b-0">
							<div class="bg-blue-700 px-6 py-3 text-white">
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
<section class="bg-gradient-to-r from-blue-700 to-blue-600 py-16 text-white">
	<div class="container mx-auto px-4 md:px-8">
		<h2 class="mb-12 text-center text-3xl font-bold">Applications</h2>

		<div class="grid gap-8 md:grid-cols-3">
			{#each product.applications as application}
				<div
					class="rounded-lg border border-white border-opacity-20 bg-white bg-opacity-10 p-6 backdrop-blur-lg backdrop-filter"
				>
					<h3 class="mb-4 text-2xl font-bold">{application.name}</h3>
					<ul class="space-y-2">
						{#each application.examples as example}
							<li class="flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="mr-2 h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								{example}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Sensor We Use -->
<section class="bg-white py-16">
	<div class="container mx-auto px-4 md:px-8">
		<h2 class="mb-12 text-center text-3xl font-bold text-gray-800">
			Related Sensors for this Device
		</h2>

		<!-- Annotated Images with Features Highlighted -->
		<div class="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
			<!-- First Image with Annotations -->
			<div class="relative rounded-lg bg-gray-50 p-6 shadow-lg">
				<h3 class="mb-4 text-xl font-semibold text-gray-800">Sensor Detail View</h3>
				<div class="relative">
					<!-- Image with map attribute -->
					<img
						src="/images/cw-sht31-DIS-P-FRONT.png"
						alt="CropWatch Air TH Sensor Board"
						class="mx-auto h-auto w-full max-w-md object-contain"
						usemap="#sensor-map"
					/>

					<!-- Image map definition -->
					<map name="sensor-map">
						<!-- Sensor IC area -->
						<area
							shape="circle"
							coords="45,146,27"
							alt="Temperature/Humidity Sensor"
							href="javascript:void(0)"
							onmouseover={() => showTooltip('sensor')}
							onmouseout={hideTooltip}
						/>

						<!-- I²C Connector area -->
						<area
							shape="circle"
							coords="425,100,27"
							alt="Conformal Coated PCB"
							href="javascript:void(0)"
							onmouseover={() => showTooltip('pcb')}
							onmouseout={hideTooltip}
						/>

						<!-- PCB Board area -->
						<area
							shape="circle"
							coords="235,280,27"
							alt="PCB Board Connector"
							href="javascript:void(0)"
							onmouseover={() => showTooltip('connector')}
							onmouseout={hideTooltip}
						/>
					</map>

					<!-- Tooltips - shown conditionally based on activeTooltip -->
					{#if activeTooltip === 'sensor'}
						<div
							class="absolute left-1/2 top-1/3 z-10 -translate-x-1/2 -translate-y-full transform rounded-md bg-black bg-opacity-90 p-3 text-white shadow-lg"
						>
							<h4 class="mb-1 font-bold">SHT31-DIS Sensor</h4>
							<p class="text-sm">
								High-quality digital temperature and humidity sensor with built-in heater for
								greater humidity accuracy.
							</p>
						</div>
					{/if}

					{#if activeTooltip === 'connector'}
						<div
							class="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-full transform rounded-md bg-black bg-opacity-90 p-3 text-white shadow-lg"
						>
							<h4 class="mb-1 font-bold">Conformal Coated PCB</h4>
							<p class="text-sm">
								Our PCB & sensor is conformal coated for higher reliability in humid, wet, and
								difficult environments.
							</p>
						</div>
					{/if}

					{#if activeTooltip === 'pcb'}
						<div
							class="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/4 transform rounded-md bg-black bg-opacity-90 p-3 text-white shadow-lg"
						>
							<h4 class="mb-1 font-bold">User Replacable</h4>
							<p class="text-sm">
								Quick disconnect plug to allow the user to quickly replace our sensor or to plug
								into a test platform to ensure accuracy.
							</p>
						</div>
					{/if}
				</div>
				<p class="mt-4 text-gray-600">
					High-precision environmental monitoring component with industry-leading sensor technology
				</p>
			</div>

			<!-- Second Image with Annotations -->
			<div class="relative rounded-lg bg-gray-50 p-6 shadow-lg">
				<h3 class="mb-4 text-xl font-semibold text-gray-800">Logo & Serial Detail</h3>
				<div class="relative">
					<!-- Image with map attribute -->
					<img
						src="/images/cw-sht31-DIS-P-BACK.png"
						alt="CropWatch Air TH Sensor Board"
						class="mx-auto h-auto w-full max-w-md object-contain"
						usemap="#sensor-map-back"
					/>

					<!-- Image map definition -->
					<map name="sensor-map-back">
						 <!-- Left "i" icon ID -->
						<area
							shape="circle"
							coords="160,160,30"
							alt="ID"
							href="javascript:void(0)"
							onmouseover={() => showTooltip('id')}
							onmouseout={hideTooltip}
							onfocus={() => showTooltip('id')}
							onblur={hideTooltip}
						/>
						<!-- Right "i" icon Logo -->
						<area
							shape="circle"
							coords="300,170,30"
							alt="Logo"
							href="javascript:void(0)"
							onmouseover={() => showTooltip('logo')}
							onmouseout={hideTooltip}
							onfocus={() => showTooltip('logo')}
							onblur={hideTooltip}
						/>
					</map>
					{#if activeTooltip === 'logo'}
						<div
							class="absolute bottom-0 left-2/3 z-10 -translate-x-1/2 translate-y-full transform rounded-md bg-black bg-opacity-90 p-3 text-white shadow-lg"
						>
							<h4 class="mb-1 font-bold">CropWatch Logo</h4>
							<p class="text-sm">
								Authentic CropWatch branding for quality assurance.
							</p>
						</div>
					{/if}
					{#if activeTooltip === 'id'}
						<div
							class="absolute bottom-0 left-1/3 z-10 -translate-x-1/2 translate-y-full transform rounded-md bg-black bg-opacity-90 p-3 text-white shadow-lg"
						>
							<h4 class="mb-1 font-bold">Serial Number</h4>
							<p class="text-sm">
								Each device has a unique serial number for traceability and support.
							</p>
						</div>
					{/if}
				</div>
				<p class="mt-4 text-gray-600">
					Each device comes with a unique serial number and authentic CropWatch branding
				</p>
			</div>
		</div>

		<!-- Component details cards -->
		<div class="grid gap-8 md:grid-cols-3">
			<div
				class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
			>
				<div class="bg-blue-700 p-4">
					<h3 class="text-xl font-bold text-white">Temperature Sensor</h3>
				</div>
				<div class="p-4">
					<p class="mb-4 text-gray-700">
						High-precision temperature monitoring with ±0.3°C accuracy across a wide operating
						range.
					</p>
					<ul class="mb-4 list-disc pl-5 text-gray-700">
						<li>Range: -40°C to +85°C</li>
						<li>Accuracy: ±0.3°C</li>
						<li>Resolution: 0.01°C</li>
					</ul>
					<a
						href="#temp-spec"
						class="flex items-center font-medium text-blue-700 hover:text-blue-800"
					>
						Technical Specifications
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="ml-1 h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
				</div>
			</div>

			<div
				class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
			>
				<div class="bg-blue-700 p-4">
					<h3 class="text-xl font-bold text-white">Humidity Sensor</h3>
				</div>
				<div class="p-4">
					<p class="mb-4 text-gray-700">
						Reliable humidity monitoring in challenging environments with fast response time.
					</p>
					<ul class="mb-4 list-disc pl-5 text-gray-700">
						<li>Range: 0% to 100% RH</li>
						<li>Accuracy: ±2% RH</li>
						<li>Response time: &lt;1s</li>
					</ul>
					<a
						href="#humidity-spec"
						class="flex items-center font-medium text-blue-700 hover:text-blue-800"
					>
						Technical Specifications
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="ml-1 h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
				</div>
			</div>

			<div
				class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
			>
				<div class="bg-blue-700 p-4">
					<h3 class="text-xl font-bold text-white">User Replacable Sensor</h3>
				</div>
				<div class="p-4">
					<p class="mb-4 text-gray-700">
						Our sensors are user replacable, and can be connected to a data validation tool to verify accuracy.
					</p>
					<ul class="mb-4 list-disc pl-5 text-gray-700">
						<li>User Replacable</li>
						<li>Saves cost, and the environment by reducing the need to purchase new devices.</li>
						<li>Easy to validate data and upgrade sensors if needed.</li>
					</ul>
					<a
						href="#interface-spec"
						class="flex items-center font-medium text-blue-700 hover:text-blue-800"
					>
						Connection Guide
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="ml-1 h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Testimonials -->
<!-- <section class="bg-gray-200 py-16">
	<div class="container mx-auto px-4 md:px-8">
		<h2 class="mb-12 text-center text-3xl font-bold text-gray-800">What Our Customers Say</h2>

		<div class="grid gap-8 md:grid-cols-3">
			{#each testimonials as testimonial}
				<div class="rounded-lg bg-white p-6 shadow-md">
					<div class="mb-4 text-green-600">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="absolute ml-5 mt-5 h-8 w-8"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
							/>
						</svg>
						<img src={testimonial.image} alt={testimonial.author} class="rounded-xl" />
					</div>
					<p class="mb-6 italic text-gray-700">{testimonial.quote}</p>
					<div>
						<p class="font-bold text-gray-800">{testimonial.author}</p>
						<p class="text-gray-600">{testimonial.title}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section> -->

<!-- Call to Action -->
<section class="bg-blue-700 py-16 text-white">
	<div class="container mx-auto px-4 text-center md:px-8">
		<h2 class="mb-6 text-3xl font-bold">Ready to Transform Your Cold-Chain Monitoring?</h2>
		<p class="mx-auto mb-8 max-w-3xl text-xl">
			Join the growing number of businesses that trust CropWatch for their critical monitoring
			needs.
		</p>

		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<button
				onclick={toggleContactForm}
				class="rounded-lg bg-white px-8 py-3 font-bold text-blue-700 shadow-lg transition duration-300 hover:bg-blue-100"
			>
				Contact Sales
			</button>
			<a
				href="#download"
				class="rounded-lg border-2 border-white bg-transparent px-8 py-3 font-bold text-white transition duration-300 hover:bg-white hover:text-blue-700"
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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<form>
					<div class="mb-4">
						<label for="name" class="mb-2 block font-medium text-gray-700">Name</label>
						<input
							type="text"
							id="name"
							class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>

					<div class="mb-4">
						<label for="email" class="mb-2 block font-medium text-gray-700">Email</label>
						<input
							type="email"
							id="email"
							class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>

					<div class="mb-4">
						<label for="company" class="mb-2 block font-medium text-gray-700">Company</label>
						<input
							type="text"
							id="company"
							class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>

					<div class="mb-6">
						<label for="message" class="mb-2 block font-medium text-gray-700">Message</label>
						<textarea
							id="message"
							rows="4"
							class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							required
						></textarea>
					</div>

					<button
						type="submit"
						class="w-full rounded-lg bg-blue-700 px-4 py-3 font-bold text-white transition duration-300 hover:bg-blue-800"
					>
						Submit Request
					</button>
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
				<p class="text-gray-300">Environmental Monitoring Solutions</p>
				<p class="mt-2 text-gray-300">© 2025 CropWatch. All rights reserved</p>
			</div>

			<div>
				<h3 class="mb-4 text-lg font-bold">Products</h3>
				<ul class="space-y-2">
					<li><a href="#soil" class="text-gray-300 hover:text-white">Soil Sensors</a></li>
					<li><a href="#air" class="text-gray-300 hover:text-white">Air Quality Sensors</a></li>
					<li><a href="#gateways" class="text-gray-300 hover:text-white">LoRaWAN Gateways</a></li>
					<li>
						<a href="#software" class="text-gray-300 hover:text-white">Monitoring Platform</a>
					</li>
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

<style>
</style>