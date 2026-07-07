<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Analytics from '$lib/components/Analytics.svelte';
	import { alternatesFor } from '$lib/seo/alternates';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { organizationSchema, websiteSchema } from '$lib/seo/schema';
	// Self-hosted text faces (replace the former Google Fonts <link>s in app.html):
	// same-origin, immutable-cached, no third-party connection blocking first paint.
	import '@fontsource-variable/inter';
	import '@fontsource-variable/jetbrains-mono';
	import '../app.css';

	let { children } = $props();

	// hreflang alternates linking this page to its cropwatch.co.jp (ja)
	// counterpart. This is the .io (en) branch; the Japan-website branch calls
	// alternatesFor('ja', ...) against the same map. Pages with no cross-site
	// equivalent return null and emit nothing (keeping their self-canonical).
	const alternates = $derived(alternatesFor('en', page.url.pathname));

	// The root sectors splitter is a self-contained full-viewport funnel: the
	// header collapses to a logo-only bar and the footer is dropped entirely.
	const splash = $derived(page.url.pathname === '/');

	let observer: IntersectionObserver | null = null;

	// Reveal-on-scroll - ported from the design's cw-chrome.js.
	// Respects reduced-motion and degrades gracefully without IntersectionObserver.
	function initReveal() {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

		if (reduce || !('IntersectionObserver' in window)) {
			els.forEach((el) => el.classList.add('is-in'));
			return;
		}

		observer?.disconnect();
		observer = new IntersectionObserver(
			(entries) => {
				for (const en of entries) {
					if (en.isIntersecting) {
						en.target.classList.add('is-in');
						observer?.unobserve(en.target);
					}
				}
			},
			{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
		);
		els.forEach((el) => observer!.observe(el));
	}

	onMount(() => {
		initReveal();
		return () => observer?.disconnect();
	});

	// Re-scan reveal targets after client-side navigation.
	afterNavigate(async () => {
		await tick();
		initReveal();
	});
</script>

<svelte:head>
	{#each alternates ?? [] as alt (alt.hreflang)}
		<link rel="alternate" hreflang={alt.hreflang} href={alt.href} />
	{/each}
</svelte:head>

<!-- Site-wide publisher identity: exactly one Organization + WebSite per page. -->
<JsonLd data={[organizationSchema(), websiteSchema()]} />

<Analytics />

<Header {splash} />

<main>
	{@render children()}
</main>

{#if !splash}
	<Footer />
{/if}
