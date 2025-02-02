<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css';
	import Header from '$lib/components/UI/Header.svelte';
	import Footer from '$lib/components/UI/Footer.svelte';

	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<div class="flex flex-col min-h-screen">
		<Header />
		<main class="flex-grow">
			{@render children()}
		</main>
		<Footer />
	</div>
</ParaglideJS>

