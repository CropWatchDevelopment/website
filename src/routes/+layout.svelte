<script lang="ts">
import Footer from '$lib/components/Footer.svelte';
import Header from '$lib/components/Header.svelte';
import { afterNavigate } from '$app/navigation';
import { page } from '$app/state';
import { PUBLIC_GA_MEASUREMENT_ID } from '$env/static/public';
import { onMount, tick } from 'svelte';
import { alternatesFor } from '$lib/seo/alternates';
import JsonLd from '$lib/components/JsonLd.svelte';
import { organizationSchema, websiteSchema } from '$lib/seo/schema';
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

// The /403 region-gate is a standalone full-screen English page; it renders
// without the Japanese header/footer chrome. (SvelteKit can't escape the root
// layout via naming, so we opt this one route out here.)
const bare = $derived(page.url.pathname === '/403');

// Site-wide publisher identity + WebSite entity, emitted on every page.
const siteLd = [organizationSchema(), websiteSchema()];

type Gtag = (...args: unknown[]) => void;
type WindowWithGtag = Window & { dataLayer?: unknown[]; gtag?: Gtag };

const ensureGtag = (): Gtag | null => {
	if (typeof window === 'undefined') return null;
	const win = window as WindowWithGtag;
	win.dataLayer = win.dataLayer || [];
	if (!win.gtag) {
		win.gtag = function gtag(..._args: unknown[]) {
			(win.dataLayer as unknown[]).push(arguments);
		};
	}
	return win.gtag ?? null;
};

const trackPageView = () => {
	if (!PUBLIC_GA_MEASUREMENT_ID || typeof window === 'undefined') return;
	const gtag = ensureGtag();
	if (!gtag) return;
	gtag('event', 'page_view', {
		page_location: window.location.href,
		page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
		page_title: document.title
	});
};

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

onMount(() => {
	ensureIcons();
	scanReveal();

	if (!PUBLIC_GA_MEASUREMENT_ID || typeof window === 'undefined') return;

	const gtag = ensureGtag();
	if (!gtag) return;

	const handleClick = (event: MouseEvent) => {
		const clickGtag = ensureGtag();
		if (!clickGtag) return;
		const target = event.target as HTMLElement | null;
		if (!target) return;

		const tracked = target.closest('[data-ga-click]') as HTMLElement | null;
		if (tracked) {
			const label = tracked.getAttribute('data-ga-click') ?? tracked.textContent?.trim() ?? 'ui_element';
			clickGtag('event', 'click', {
				event_category: 'ui',
				event_label: label.slice(0, 100),
				element_tag: tracked.tagName.toLowerCase(),
				element_id: tracked.id || undefined,
				element_classes: typeof tracked.className === 'string' ? tracked.className : undefined,
				page_location: window.location.href
			});
			return;
		}

		const link = target.closest('a[href]') as HTMLAnchorElement | null;
		if (!link) return;
		const href = link.href;
		if (!href) return;

		let linkDomain: string | undefined;
		let outbound = false;
		try {
			const url = new URL(href, window.location.href);
			linkDomain = url.hostname;
			outbound = url.origin !== window.location.origin;
		} catch {
			linkDomain = undefined;
			outbound = false;
		}

		const linkLabel = link.textContent?.trim();
		clickGtag('event', 'click', {
			event_category: 'link',
			event_label: linkLabel ? linkLabel.slice(0, 100) : href,
			link_url: href,
			link_domain: linkDomain,
			outbound,
			page_location: window.location.href,
			transport_type: 'beacon'
		});
	};

	gtag('js', new Date());
	gtag('config', PUBLIC_GA_MEASUREMENT_ID, { send_page_view: false });
	trackPageView();
	document.addEventListener('click', handleClick);

	return () => {
		document.removeEventListener('click', handleClick);
	};
});

afterNavigate(async () => {
	await tick();
	scanReveal();
	trackPageView();
});
</script>

<svelte:head>
	{#if PUBLIC_GA_MEASUREMENT_ID}
		<script async src="https://www.googletagmanager.com/gtag/js?id={PUBLIC_GA_MEASUREMENT_ID}"></script>
	{/if}
	{#each alternates ?? [] as alt (alt.hreflang)}
		<link rel="alternate" hreflang={alt.hreflang} href={alt.href} />
	{/each}
</svelte:head>

<JsonLd data={siteLd} />

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
