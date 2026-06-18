<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';

	let { children } = $props();

	// The root sectors splitter is a self-contained full-viewport funnel: the
	// header collapses to a logo-only bar and the footer is dropped entirely.
	const splash = $derived(page.url.pathname === '/');

	let observer: IntersectionObserver | null = null;

	// Reveal-on-scroll — ported from the design's cw-chrome.js.
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

<Header {splash} />

<main>
	{@render children()}
</main>

{#if !splash}
	<Footer />
{/if}
