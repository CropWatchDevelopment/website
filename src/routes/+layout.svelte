<script>
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Copywrite from '$lib/components/Copywrite.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { page } from '$app/stores';
</script>

<div class="app tw-flex tw-flex-col tw-min-h-screen">
	<Header />
	<main class="tw-flex-1">
		{#if $page.url.pathname !== '/' && $page.url.pathname !== 'error'}
			<Breadcrumbs />
		{/if}
		<slot />
	</main>
	<Footer />
	<Copywrite />
</div>
