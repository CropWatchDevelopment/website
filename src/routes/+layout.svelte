<script>
	import Header from '../lib/components/Header.svelte';
	import '../app.css';
	import TopBar from '$lib/components/TopBar.svelte';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import { library } from '@fortawesome/fontawesome-svg-core';
	import { fas } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Footer from '$lib/components/Footer.svelte';
	library.add(fas); // Add the entire Solid icon set
	export let data;
	const news = data || [];
</script>

<div class="app h-full w-full flex flex-col">
	<TopBar />
	<Header />
	<main class="flex flex-col w-full">
		{#if $page.url.pathname !== '/' && $page.url.pathname !== 'error'}
			<Breadcrumbs />
		{/if}
		<slot></slot>
		<span class="flex-grow" />
	</main>
	<span class="flex-grow" />
	<Footer {news}/>
</div>
