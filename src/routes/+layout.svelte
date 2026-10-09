<script lang="ts">
import Analytics from '$lib/components/Analytics.svelte';
import Footer from '$lib/components/Footer.svelte';
import Header from '$lib/components/Header.svelte';
import { afterNavigate } from '$app/navigation';
import { assets } from '$app/paths';
import { page } from '$app/state';
import { onMount, tick } from 'svelte';
import { alternatesFor } from '$lib/seo/alternates';
import JsonLd from '$lib/components/JsonLd.svelte';
import { organizationSchema, websiteSchema } from '$lib/seo/schema';
import { isChristmasSeason } from '$lib/christmas';
import { isHalloweenSeason } from '$lib/halloween';
import '../app.css';
import '$lib/styles/cropwatch-tokens.css';
import '$lib/styles/cropwatch-site.css';
import '$lib/styles/cropwatch-chrome.css';

let { children } = $props();

// hreflang alternates linking this page to its cropwatch.io (en) counterpart.
// This is the Japan-website branch (ja); the .io branch calls
// alternatesFor('en', ...) against the same shared map. Pages with no
// cross-site equivalent return null and emit nothing.
const alternates = $derived(alternatesFor('ja', page.url.pathname));

// Two subtrees render without the Japanese header/footer chrome: the /403
// region-gate (a standalone full-screen English page) and /demo (a viewport-
// filling clone of the app.cropwatch.io dashboard, which brings its own header
// and sidebar). SvelteKit can't escape the root layout via naming, so they opt
// out here.
const bare = $derived(page.url.pathname === '/403' || page.url.pathname.startsWith('/demo'));

// Site-wide publisher identity + WebSite entity, emitted on every page.
const siteLd = [organizationSchema(), websiteSchema()];

// ── Material Symbols icon-font guard ──────────────────────────
// Reveal icons only once the icon font is confirmed loaded, so raw
// ligature text ("call", "expand_more"…) never flashes and wrecks the
// layout. Mirrors the guard in cropwatch-site.css (html:not(.ms-ready)).
const ensureIcons = () => {
	const FONT = "24px 'Material Symbols Rounded'";
	const reveal = () => document.documentElement.classList.add('ms-ready');
	try {
		if (
			!(
				document.fonts &&
				typeof document.fonts.load === 'function' &&
				typeof document.fonts.check === 'function'
			)
		) {
			reveal();
			return;
		}
		const check = () => {
			if (document.fonts.check(FONT)) {
				reveal();
				return true;
			}
			return false;
		};
		document.fonts.load(FONT).then(check).catch(() => {});
		if (document.fonts.ready) document.fonts.ready.then(check);
		let tries = 0;
		const iv = setInterval(() => {
			if (check() || ++tries > 30) clearInterval(iv);
		}, 300);
	} catch {
		reveal();
	}
};

// ── Reveal-on-scroll for [data-reveal] elements ───────────────
let revealObserver: IntersectionObserver | null = null;
const scanReveal = () => {
	if (typeof window === 'undefined') return;
	const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'));
	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduce || !('IntersectionObserver' in window)) {
		els.forEach((el) => el.classList.add('is-in'));
		return;
	}
	if (!revealObserver) {
		revealObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((en) => {
					if (en.isIntersecting) {
						en.target.classList.add('is-in');
						revealObserver?.unobserve(en.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
		);
	}
	els.forEach((el) => revealObserver!.observe(el));
};

// Season-gated in the browser, not in a server load: prerendered routes (e.g.
// /news) would otherwise freeze the check at build time and never show the
// decoration unless someone happened to deploy in season.
const loadChristmasDecor = () => {
	if (!isChristmasSeason() || document.querySelector('script[data-cw-christmas]')) return;
	const script = document.createElement('script');
	script.src = `${assets}/christmas-header.js`;
	script.defer = true;
	script.dataset.cwChristmas = '';
	document.head.appendChild(script);
};

// Same client-side gate for the Halloween logo (Oct 1 - Oct 31).
const loadHalloweenDecor = () => {
	if (!isHalloweenSeason() || document.querySelector('script[data-cw-halloween]')) return;
	const script = document.createElement('script');
	script.src = `${assets}/halloween-header.js`;
	script.defer = true;
	script.dataset.cwHalloween = '';
	document.head.appendChild(script);
};

onMount(() => {
	ensureIcons();
	scanReveal();
	loadChristmasDecor();
	loadHalloweenDecor();
});

afterNavigate(async () => {
	await tick();
	scanReveal();
});
</script>

<svelte:head>
	{#each alternates ?? [] as alt (alt.hreflang)}
		<link rel="alternate" hreflang={alt.hreflang} href={alt.href} />
	{/each}
</svelte:head>

<JsonLd data={siteLd} />
<Analytics />

<div class="flex min-h-screen flex-col">
	{#if !bare}
		<Header />
	{/if}

	<main class="flex-1 flex flex-col">
		{@render children()}
	</main>

	{#if !bare}
		<Footer />
	{/if}
</div>
