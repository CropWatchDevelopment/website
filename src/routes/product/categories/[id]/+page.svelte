<script lang="ts">
	import ProductCard from '$lib/components/UI/Product-Card.svelte';
	import { languageTag } from '$lib/paraglide/runtime.js';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let pageData = null;
	let loading = true;
	let error = false;

	onMount(() => {
		fetch(`/configs/categories/${languageTag()}/${page.params.id}.json`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				pageData = data;
				loading = false;
			})
			.catch((err) => {
				console.error(err);
				error = true;
				loading = false;
			});
	});
</script>

{#if loading}
	<!-- Loading Spinner -->
	<div class="flex min-h-screen flex-col items-center justify-center">
		<svg class="h-12 w-12 animate-spin text-blue-600" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
			></circle>
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
		</svg>
		<p class="mt-4 text-lg">Loading Device Details</p>
	</div>
{:else if error}
	<!-- Error Message -->
	<div class="flex min-h-screen flex-col items-center justify-center">
		<svg class="h-12 w-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 18L18 6M6 6l12 12"
			/>
		</svg>
		<p class="mt-4 text-lg text-red-600">Something has gone wrong, Please check back later</p>
	</div>
{:else}
	<section class="bg-green-100/5 py-10">
		<div class="container mx-auto text-center">
			<h1 class="text-4xl font-bold">{pageData.title}</h1>
			<p class="mt-2 text-gray-600">{pageData.subtitle}</p>
		</div>
	</section>
	{#each pageData.categories as category}
		<section class="py-10">
			<div class="container mx-auto">
				<div class="mb-10">
					<h2 class="border-b-2 border-blue-600 pb-2 text-2xl font-bold">{category.name}</h2>
					<div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
						{#each category.products as product}
							<ProductCard
								image={product.image}
								name={product.name}
								description={product.description}
								price={product.price}
								link={product.link}
							/>
						{/each}
					</div>
				</div>
			</div>
		</section>
	{/each}
{/if}
