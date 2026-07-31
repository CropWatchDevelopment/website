<script lang="ts">
	// Google Analytics 4 for the marketing sites (cropwatch.io / cropwatch.co.jp).
	//
	// These sites are prerendered to static HTML (`prerender = true`), so the
	// measurement id must be known at BUILD time: $env/static/public, NOT
	// $env/dynamic/public — dynamic public env is never baked into a prerendered
	// page, so the id would always arrive empty client-side. The gtag.js loader
	// is injected lazily (first interaction / idle fallback, see onMount below);
	// a page_view is fired on every client-side navigation (SPA tracking, since
	// the browser only performs one real page load). Set PUBLIC_GA_MEASUREMENT_ID per Vercel
	// project (G-V65DJ4TTV1 for .io, G-K4ZHT9JRY4 for .co.jp) to enable.
	import { afterNavigate } from '$app/navigation';
	import { onMount, tick } from 'svelte';
	import { PUBLIC_GA_MEASUREMENT_ID } from '$env/static/public';

	type Gtag = (...args: unknown[]) => void;
	type WindowWithGtag = Window & { dataLayer?: unknown[]; gtag?: Gtag };

	let configured = false;

	// gtag.js is ~160KB of script and the single largest main-thread cost on
	// these pages (Lighthouse: 490ms TBT on desktop), so it is NOT emitted in
	// the initial HTML. It loads on the first user interaction, or after a
	// short idle fallback for visitors who never interact. Events fired before
	// then queue on dataLayer via the gtag() stub and are delivered once the
	// script arrives, so nothing is lost for visitors who stay past the delay.
	let loaderInjected = false;

	function injectGtagLoader() {
		if (loaderInjected || typeof document === 'undefined') return;
		loaderInjected = true;
		const s = document.createElement('script');
		s.async = true;
		s.src = `https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GA_MEASUREMENT_ID}`;
		document.head.appendChild(s);
	}

	onMount(() => {
		if (!PUBLIC_GA_MEASUREMENT_ID) return;
		const events = ['pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'] as const;
		const onFirstInteraction = () => {
			cleanup();
			injectGtagLoader();
		};
		const idleTimer = setTimeout(onFirstInteraction, 4000);
		const cleanup = () => {
			clearTimeout(idleTimer);
			for (const e of events) removeEventListener(e, onFirstInteraction);
		};
		for (const e of events) {
			addEventListener(e, onFirstInteraction, { once: true, passive: true });
		}
		return cleanup;
	});

	function ensureGtag(): Gtag | null {
		if (typeof window === 'undefined') return null;
		const win = window as WindowWithGtag;
		win.dataLayer = win.dataLayer || [];
		if (!win.gtag) {
			// gtag.js ONLY processes data-layer entries that are the live `arguments`
			// object — a real array (rest params) is silently ignored, so events
			// queue but never send. Push `arguments`, like the canonical snippet.
			// eslint-disable-next-line prefer-rest-params
			win.gtag = function gtag() {
				win.dataLayer!.push(arguments);
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

