<script lang="ts">
	import { page } from '$app/state';
	import { languageTag } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages.js';

	let device = $state(null);
	let loading = $state(true);
	let error = $state(false);

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

{#if loading}
	<!-- Loading Spinner -->
	<div class="min-h-screen flex flex-col items-center justify-center">
		<svg class="animate-spin h-12 w-12 text-blue-600" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
		</svg>
		<p class="mt-4 text-lg">Loading Device Details</p>
	</div>
{:else if error}
	<!-- Error Message -->
	<div class="min-h-screen flex flex-col items-center justify-center">
		<svg class="h-12 w-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
		</svg>
		<p class="mt-4 text-lg text-red-600">Something has gone wrong, Please check back later</p>
	</div>
{:else}
	<!-- Device and Page Content -->
	<section class="bg-gradient-to-r from-green-600 to-green-400 py-16 text-white">
		<div class="container mx-auto text-center">
			<h1 class="text-5xl font-extrabold">{device.name}</h1>
		</div>
	</section>
    <div class="flex flex-row items-center justify-center w-full mt-6">
        <img
            src={device.image}
            alt={device.name}
            width="400"
            height="400"
			loading="lazy"
            class="rounded-lg shadow-lg"
        />
    </div>

	<!-- Sensor Details & Strengths -->
	<section class="py-20">
		<div class="container mx-auto">
			<h2 class="text-center text-3xl font-bold text-gray-800">{m.product_details_strengths_subtitle()}</h2>
			<!-- <p class="mt-4 text-center text-gray-600">
				Discover the key features and benefits of this sensor that set it apart.
			</p> -->
			<div class="mt-12 max-w-4xl mx-auto">
				<!-- If your device configuration has a description, use it; otherwise, include your own text -->
				<p class="text-lg text-gray-700">
					{device.description || "This sensor is engineered for high performance in challenging environments. It offers precise measurements, robust construction, and seamless integration into existing systems, ensuring you get the most reliable data for your applications."}
				</p>
			</div>
		</div>
	</section>

	<!-- Specifications Section -->
	<section class="bg-gray-100 py-20">
		<div class="container mx-auto">
			<h2 class="text-center text-3xl font-bold text-gray-800">Specifications</h2>
			<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                {#each device.specifications as specification}
				<div class="rounded-lg bg-white p-6 shadow-lg">
                    <h3 class="text-xl font-bold">{specification.title}</h3>
					<p class="text-gray-600">{specification.value_title}: {specification.value}</p>
				</div>
                {/each}
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="bg-gray-200 py-20">
		<div class="container mx-auto">
			<h2 class="text-center text-3xl font-bold text-gray-800">Features</h2>
			<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each device.features as feature}
				<div class="rounded-lg bg-white p-6 shadow-lg">
					<!-- <h3 class="text-xl font-bold">通信距離</h3> -->
					<p class="text-gray-600">{feature}</p>
				</div>
                {/each}
			</div>
		</div>
	</section>

	<!-- Datasheet Section -->
	<section class="bg-white py-20">
		<div class="container mx-auto text-center">
			<h2 class="text-3xl font-bold text-gray-800">{m.product_datasheet()}</h2>
			<p class="mt-4 text-gray-600">{m.product_datasheet_subtitle()}</p>
			<a
				href="placeholder-datasheet.pdf"
				class="mt-6 inline-block rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
				>{m.product_datasheet_button_text()}</a
			>
		</div>
	</section>

	<!-- Contact Us Call to Action -->
	<section class="bg-blue-600 py-20 text-white">
		<div class="container mx-auto text-center">
			<h2 class="text-3xl font-bold">{m.product_contact_us()}</h2>
			<p class="mt-4">
				{m.product_contact_us_subtitle()}
			</p>
			<a
				href="/contact-us"
				class="mt-6 inline-block rounded bg-white px-6 py-3 text-blue-600 hover:bg-gray-200"
			>
			{m.contact_us()}
		</div>
	</section>
{/if}
