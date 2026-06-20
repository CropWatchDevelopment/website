<script lang="ts">
	// Google Analytics 4 for the marketing sites (cropwatch.io / cropwatch.co.jp).
	//
	// Mounted once in the root layout so it covers every route. page_view is
	// emitted on each client-side navigation. The measurement id comes from
	// PUBLIC_GA_MEASUREMENT_ID, so each deployment (the .io and .co.jp Vercel
	// projects) reports to its own data stream. Disabled in dev so local traffic
	// never reaches the property.
	import { afterNavigate } from '$app/navigation';
	import { dev } from '$app/environment';
	import { tick } from 'svelte';
	import { page } from '$app/state';
	import { env } from '$env/dynamic/public';
	import { initAnalytics, trackPageView } from '$lib/analytics/gtag';

	// Read env inside the browser-only callback (never at module top level) so it
	// is never touched during prerendering, which $env/dynamic/public forbids.
	// afterNavigate fires on first mount AND every client-side navigation, so one
	// handler covers the initial page view and all subsequent ones.
	afterNavigate(async () => {
		const id = dev ? '' : (env.PUBLIC_GA_MEASUREMENT_ID ?? '');
		if (!id) return;
		initAnalytics(id);
		await tick(); // let <svelte:head><title> update before reading document.title
		trackPageView(page.url.pathname + page.url.search);
	});
</script>
