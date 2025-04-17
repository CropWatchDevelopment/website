<script lang="ts">
    import ProductCard from '$lib/components/UI/Product-Card.svelte';
    import { languageTag } from '$lib/paraglide/runtime.js';
    import * as m from '$lib/paraglide/messages.js';
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

<svelte:head>
    <title>{pageData?.title || 'CropWatch Product Categories'}</title>
    <meta name="description" content={pageData?.description || 'Find our IoT offerings by category'} />
    <meta name="keywords" content="CropWatch, IoT, Categories" />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="CropWatch" />
</svelte:head>

{#if loading}
    <!-- Loading Spinner -->
    <div class="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <svg class="h-12 w-12 animate-spin text-blue-600" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
            ></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
        <p class="mt-4 text-lg text-gray-700">Loading Device Details</p>
    </div>
{:else if error}
    <!-- Error Message -->
    <div class="flex min-h-screen flex-col items-center justify-center bg-gray-50">
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
    <div class="bg-gray-50">
        <!-- Hero Section -->
        <section class="relative py-24 bg-cover bg-center" style="background-image: url('/images/category-hero.jpg');">
            <div class="absolute inset-0 bg-black opacity-60"></div>
            <div class="container mx-auto relative z-10 text-center">
                <h1 class="text-5xl font-bold text-white drop-shadow-lg">{pageData.title}</h1>
                <p class="mt-4 text-xl text-gray-200 drop-shadow-lg">{pageData.subtitle}</p>
            </div>
        </section>

        <!-- Categories and Products -->
        {#each pageData.categories as category}
            <section class="py-16">
                <div class="container mx-auto">
                    <h2 class="text-3xl font-semibold text-gray-800 mb-8 text-center">{category.name}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {#each category.products as product}
                            <ProductCard
                                image={product.image}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                link={product.link}
                                buttonLabel={m.view_details()}
                            />
                        {/each}
                    </div>
                </div>
            </section>
        {/each}
    </div>
{/if}
