<script lang="ts">
import Footer from '$lib/components/Footer.svelte';
import Header from '$lib/components/Header.svelte';
import { afterNavigate } from '$app/navigation';
import { PUBLIC_GA_MEASUREMENT_ID } from '$env/static/public';
import { onMount } from 'svelte';
import '../app.css';

let { children } = $props();

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
</svelte:head>

<div class="flex flex-col min-h-screen">
	<Header />

	<main class="flex flex-1 flex-col w-full mx-auto">
		{@render children()}
	</main>

	<Footer />
</div>
