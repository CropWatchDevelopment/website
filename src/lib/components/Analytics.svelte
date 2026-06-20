<script lang="ts">
	// Google Analytics 4 for the marketing sites (cropwatch.io / cropwatch.co.jp).
	//
	// These sites are prerendered to static HTML (`prerender = true`), so the
	// measurement id must be known at BUILD time: $env/static/public, NOT
	// $env/dynamic/public — dynamic public env is never baked into a prerendered
	// page, so the id would always arrive empty client-side. The gtag.js loader is
	// emitted into <svelte:head> so it ships inside the static HTML; a page_view is
	// then fired on every client-side navigation (SPA tracking, since the browser
	// only performs one real page load). Set PUBLIC_GA_MEASUREMENT_ID per Vercel
	// project (G-V65DJ4TTV1 for .io, G-K4ZHT9JRY4 for .co.jp) to enable.
	import { afterNavigate } from '$app/navigation';
	import { tick } from 'svelte';
	import { PUBLIC_GA_MEASUREMENT_ID } from '$env/static/public';

	type Gtag = (...args: unknown[]) => void;
	type WindowWithGtag = Window & { dataLayer?: unknown[]; gtag?: Gtag };

	let configured = false;

	function ensureGtag(): Gtag | null {
		if (typeof window === 'undefined') return null;
		const win = window as WindowWithGtag;
		win.dataLayer = win.dataLayer || [];
		if (!win.gtag) {
			// Queue calls onto the data layer until gtag.js (loaded via the head
			// <script>) takes over and processes them in order.
			win.gtag = function gtag(...args: unknown[]) {
				win.dataLayer!.push(args);
			};
		}
		return win.gtag ?? null;
	}

	// afterNavigate fires on the initial mount AND every client-side navigation,
	// so this single handler covers the first page view and all subsequent ones.
	afterNavigate(async () => {
		if (!PUBLIC_GA_MEASUREMENT_ID) return;
		const gtag = ensureGtag();
		if (!gtag) return;
		if (!configured) {
			gtag('js', new Date());
			gtag('config', PUBLIC_GA_MEASUREMENT_ID, { send_page_view: false });
			configured = true;
		}
		await tick(); // let <svelte:head><title> update before reading document.title
		gtag('event', 'page_view', {
			page_location: window.location.href,
			page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
			page_title: document.title
		});
	});
</script>

<svelte:head>
	{#if PUBLIC_GA_MEASUREMENT_ID}
		<script async src="https://www.googletagmanager.com/gtag/js?id={PUBLIC_GA_MEASUREMENT_ID}"></script>
	{/if}
</svelte:head>
