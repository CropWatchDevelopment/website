<script lang="ts">
import Footer from '$lib/components/Footer.svelte';
import Header from '$lib/components/Header.svelte';
import { afterNavigate } from '$app/navigation';
import { page } from '$app/state';
import { PUBLIC_GA_MEASUREMENT_ID } from '$env/static/public';
import { onMount } from 'svelte';
import { alternatesFor } from '$lib/seo/alternates';
import { assets } from '$app/paths';
import JsonLd from '$lib/components/JsonLd.svelte';
import { organizationSchema, websiteSchema } from '$lib/seo/schema';
import '../app.css';

let { children, data } = $props();

// hreflang alternates linking this page to its cropwatch.io (en) counterpart.
// This is the Japan-website branch (ja); the .io branch calls
// alternatesFor('en', ...) against the same shared map. Pages with no
// cross-site equivalent return null and emit nothing.
const alternates = $derived(alternatesFor('ja', page.url.pathname));

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

onMount(() => {
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
	afterNavigate(() => trackPageView());
	document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	});
</script>

<svelte:head>
	{#if PUBLIC_GA_MEASUREMENT_ID}
		<script async src="https://www.googletagmanager.com/gtag/js?id={PUBLIC_GA_MEASUREMENT_ID}"></script>
	{/if}
	{#each alternates ?? [] as alt (alt.hreflang)}
		<link rel="alternate" hreflang={alt.hreflang} href={alt.href} />
	{/each}
	{#if data.christmas}
		<script defer src="{assets}/christmas-header.js"></script>
	{/if}
</svelte:head>

<!-- Site-wide publisher identity: one Organization + WebSite per page. -->
<JsonLd data={[organizationSchema(), websiteSchema()]} />

<div class="flex flex-col min-h-screen">
	<Header />

	<main class="flex flex-1 flex-col w-full mx-auto">
		{@render children()}
	</main>

	<Footer />
</div>
