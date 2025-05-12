<script>
	import { onMount } from 'svelte';

	const onNavigate = (locationId) => {
		// Handle navigation logic here
		console.log(`Navigating to location with ID: ${locationId}`);
	};

	// Sample product data - you would likely fetch this from an API
	const product = {
		name: 'CropWatch® Environmental Monitoring Solution',
		tagline: 'Long-Range Monitoring for Challenging Environments',
		description:
			'The CropWatch Monitoring Solution is engineered for challenging environments where traditional monitoring systems fail. With a unique external antenna design, exceptional battery longevity, and resilient construction, CropWatch outperforms competitors in refrigeration facilities, rural deployments, and high-density environments.',
		models: [
			{
				id: 'CW-SS-XXXX',
				name: 'Soil Sensing Solution',
				description:
					'Specialized for soil sensing applications, with configurable sensor options to measure soil moisture, temperature, conductivity, and more.'
			},
			{
				id: 'CW-AIR-XXX',
				name: 'Atmospheric Monitoring Solution',
				description:
					'Designed for atmospheric monitoring, capable of measuring air temperature, humidity, pressure, and gas concentrations depending on sensor configuration.'
			}
		],
		standoutFeatures: [
			'Exceptional 10-year battery life with a single D-cell Li-SOCL2 battery',
			'Superior signal performance even in difficult radio environments',
			'Durable IP67-rated weatherproof construction',
			'User-serviceable components for easy maintenance',
			'Versatile LoRaWAN, RS485, and NFC connectivity'
		],
		specifications: [
			{
				category: 'Physical',
				specs: [
					{ name: 'Enclosure', value: 'IP67-rated weatherproof housing' },
					{ name: 'Material', value: 'UV-resistant ASA UL94HB' },
					{ name: 'Mounting', value: 'Pole, DIN Rail, Wall, Magnet' }
				]
			},
			{
				category: 'Power',
				specs: [
					{ name: 'Battery Type', value: 'Li-SOCL2 D-Cell' },
					{ name: 'Battery Life', value: 'Up to 10 years' },
					{ name: 'Power Consumption', value: '25-30 μA (Sleep)' }
				]
			},
			{
				category: 'Connectivity',
				specs: [
					{ name: 'Wireless', value: 'LoRaWAN (AS923-1, US915)' },
					{ name: 'Wired', value: 'RS485, I²C' },
					{ name: 'Configuration', value: 'NFC' }
				]
			},
			{
				category: 'Environmental',
				specs: [
					{ name: 'Temperature', value: '-40°C to +80°C (-22°F to +176°F)' },
					{ name: 'Humidity', value: '0-100% RH (condensing)' },
					{ name: 'Certifications', value: 'FCC, TELEC, RoHS' }
				]
			}
		],
		applications: [
			{
				name: 'Agriculture',
				examples: ['Greenhouse monitoring', 'Soil condition tracking', 'Irrigation control']
			},
			{
				name: 'Cold Chain',
				examples: ['Refrigerated transport', 'Cold storage facilities', 'HACCP compliance']
			},
			{
				name: 'Food Processing',
				examples: ['Production monitoring', 'Storage oversight', 'Regulatory compliance']
			}
		]
	};

	// For testimonials or case studies
	const testimonials = [
		{
			quote:
				'CropWatch sensors have transformed how we monitor our greenhouse conditions, saving us thousands in potential crop losses.',
			author: 'Sarah Johnson',
			title: 'Operations Manager, Green Valley Farms',
			image: 'images/testimonial1.jpg'
		},
		{
			quote:
				"The battery life is impressive. We installed these two years ago and haven't had to service a single unit yet.",
			author: 'Michael Chen',
			title: 'Chief Engineer, FreshTech Storage Solutions'
		},
		{
			quote:
				'The data reliability even in our metal-walled cold storage facilities is outstanding. No more dead zones.',
			author: 'David Rodriguez',
			title: 'Quality Assurance Director, Pacific Cold Chain'
		}
	];

	let isContactFormOpen = false;

	function toggleContactForm() {
		isContactFormOpen = !isContactFormOpen;
	}

	function handleSubmit() {
		// Handle form submission logic here
		alert('Thank you for your interest! Our team will contact you soon.');
		isContactFormOpen = false;
	}

	onMount(() => {
		// Any initialization code can go here
	});
</script>

<!-- Hero Section -->
<section class="bg-gradient-to-r from-green-700 to-green-600 text-white">
	<div class="container mx-auto flex flex-col items-center px-4 py-12 md:flex-row md:px-8">
		<div class="mb-8 md:mb-0 md:w-1/2">
			<h1 class="mb-4 text-4xl font-bold md:text-5xl">{product.name}</h1>
			<p class="mb-6 text-xl md:text-2xl">{product.tagline}</p>
			<p class="mb-8 text-lg">{product.description}</p>
			<div class="flex space-x-4">
				<button
					class="rounded-lg bg-white px-6 py-3 font-bold text-green-700 shadow-lg transition duration-300 hover:bg-green-100"
				>
					Request Quote
				</button>
				<button
					class="rounded-lg border-2 border-white bg-transparent px-6 py-3 font-bold text-white transition duration-300 hover:bg-white hover:text-green-700"
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
						<h3 class="mb-2 text-2xl font-bold text-green-700">{model.name}</h3>
						<div class="mb-2 text-gray-500">Model: {model.id}</div>
						<p class="text-gray-700">{model.description}</p>
					</div>
					<div class="flex items-center justify-between bg-green-700 p-4 text-white">
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
					<img 
						src="/images/cw-sht31-DIS-P-FRONT.png" 
						alt="CropWatch Air TH Sensor Board" 
						class="mx-auto h-auto w-full max-w-md object-contain"
					/>
					
					<!-- SVG Overlay for annotations -->
					<svg class="absolute inset-0 h-full w-full" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
						<!-- Line to Sensirion Chip -->
						<path d="M150,180 L80,100" stroke="#22c55e" stroke-width="2" />
						<circle cx="150" cy="180" r="5" fill="#22c55e" />
						
						<!-- Text bubble for Sensirion Chip -->
						<rect x="10" y="60" width="160" height="40" rx="5" fill="#22c55e" />
						<text x="20" y="85" font-family="Arial" font-size="12" fill="white">Genuine Sensirion SHT31 Sensor</text>
						
						<!-- Line to Main Board -->
						<path d="M300,220 L380,170" stroke="#22c55e" stroke-width="2" />
						<circle cx="300" cy="220" r="5" fill="#22c55e" />
						
						<!-- Text bubble for Conformal Coating -->
						<rect x="320" y="140" width="160" height="40" rx="5" fill="#22c55e" />
						<text x="330" y="165" font-family="Arial" font-size="12" fill="white">Conformal Coated Board</text>
					</svg>
				</div>
				<p class="mt-4 text-gray-600">High-precision environmental monitoring component with industry-leading sensor technology</p>
			</div>
			
			<!-- Second Image with Annotations -->
			<div class="relative rounded-lg bg-gray-50 p-6 shadow-lg">
				<h3 class="mb-4 text-xl font-semibold text-gray-800">Logo & Serial Detail</h3>
				<div class="relative">
					<img 
						src="/images/cw-sht31-DIS-P-BACK.png" 
						alt="CropWatch Logo and Serial Number" 
						class="mx-auto h-auto w-full max-w-md object-contain"
					/>
					
					<!-- SVG Overlay for annotations -->
					<svg class="absolute inset-0 h-full w-full" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
						<!-- Line to CropWatch Logo -->
						<path d="M250,180 L350,80" stroke="#22c55e" stroke-width="2" />
						<circle cx="250" cy="180" r="5" fill="#22c55e" />
						
						<!-- Text bubble for Logo area -->
						<rect x="280" y="40" width="200" height="50" rx="5" fill="#22c55e" />
						<text x="290" y="65" font-family="Arial" font-size="12" fill="white">Sensirion Serial Number &</text>
						<text x="290" y="80" font-family="Arial" font-size="12" fill="white">CropWatch Logo for Quality Verification</text>
					</svg>
				</div>
				<p class="mt-4 text-gray-600">Each device comes with a unique serial number and authentic CropWatch branding</p>
			</div>
		</div>

		<!-- Component details cards -->
		<div class="grid gap-8 md:grid-cols-3">
			<div
				class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
			>
				<div class="bg-green-700 p-4">
					<h3 class="text-xl font-bold text-white">Temperature Sensor</h3>
				</div>
				<div class="p-4">
					<p class="mb-4 text-gray-700">
						High-precision temperature monitoring with ±0.3°C accuracy across a wide operating range.
					</p>
					<ul class="mb-4 list-disc pl-5 text-gray-700">
						<li>Range: -40°C to +85°C</li>
						<li>Accuracy: ±0.3°C</li>
						<li>Resolution: 0.01°C</li>
					</ul>
					<a
						href="#temp-spec"
						class="flex items-center font-medium text-green-700 hover:text-green-800"
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
				<div class="bg-green-700 p-4">
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
						class="flex items-center font-medium text-green-700 hover:text-green-800"
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
				<div class="bg-green-700 p-4">
					<h3 class="text-xl font-bold text-white">I²C Interface</h3>
				</div>
				<div class="p-4">
					<p class="mb-4 text-gray-700">
						Standardized I²C interface for easy integration with other sensing systems.
					</p>
					<ul class="mb-4 list-disc pl-5 text-gray-700">
						<li>Address: 0x44 (default)</li>
						<li>Speed: 100kHz/400kHz</li>
						<li>Expandable with additional sensors</li>
					</ul>
					<a
						href="#interface-spec"
						class="flex items-center font-medium text-green-700 hover:text-green-800"
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
<section class="bg-gray-200 py-16">
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
</section>

<!-- Call to Action -->
<section class="bg-green-700 py-16 text-white">
	<div class="container mx-auto px-4 text-center md:px-8">
		<h2 class="mb-6 text-3xl font-bold">Ready to Transform Your Environmental Monitoring?</h2>
		<p class="mx-auto mb-8 max-w-3xl text-xl">
			Join the growing number of businesses that trust CropWatch for their critical monitoring
			needs.
		</p>

		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<button
				on:click={toggleContactForm}
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
					<button on:click={toggleContactForm} class="text-gray-500 hover:text-gray-700">
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

				<form on:submit|preventDefault={handleSubmit}>
					<div class="mb-4">
						<label for="name" class="mb-2 block font-medium text-gray-700">Name</label>
						<input
							type="text"
							id="name"
							class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500"
							required
						/>
					</div>

					<div class="mb-4">
						<label for="email" class="mb-2 block font-medium text-gray-700">Email</label>
						<input
							type="email"
							id="email"
							class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500"
							required
						/>
					</div>

					<div class="mb-4">
						<label for="company" class="mb-2 block font-medium text-gray-700">Company</label>
						<input
							type="text"
							id="company"
							class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500"
							required
						/>
					</div>

					<div class="mb-6">
						<label for="message" class="mb-2 block font-medium text-gray-700">Message</label>
						<textarea
							id="message"
							rows="4"
							class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500"
							required
						></textarea>
					</div>

					<button
						type="submit"
						class="w-full rounded-lg bg-green-700 px-4 py-3 font-bold text-white transition duration-300 hover:bg-green-800"
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
