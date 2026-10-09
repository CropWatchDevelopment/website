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
	//
	// Custom events (mark generate_lead + contact_click as Key events in GA):
	//   ai_referral    first page view of a visit from ChatGPT/Perplexity/... (+ ai_source user property)
	//   contact_click  tel: / mailto: / LINE link clicks
	//   click          every other link click (outbound flag + domain)
	//   generate_lead  contact form sent (fired from routes/contact via trackEvent)
	import { afterNavigate } from '$app/navigation';
	import { onMount, tick } from 'svelte';
	import { PUBLIC_GA_MEASUREMENT_ID } from '$env/static/public';
	import { detectAiSource } from '$lib/analytics/ai-referrer';
	import { ensureGtag } from '$lib/analytics/gtag';

	let configured = false;
	let firstView = true;

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

	function contactMethod(url: URL): 'phone' | 'email' | 'line' | null {
		if (url.protocol === 'tel:') return 'phone';
		// `mailto:?subject=...` (no address) is a share link, not a contact.
		if (url.protocol === 'mailto:') return url.pathname ? 'email' : null;
		if (/(^|\.)(line\.me|lin\.ee)$/.test(url.hostname)) return 'line';
		return null;
	}

	function handleClick(event: MouseEvent) {
		const gtag = ensureGtag();
		const link = (event.target as HTMLElement | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
		if (!gtag || !link?.href) return;

		let url: URL;
		try {
			url = new URL(link.href, window.location.href);
		} catch {
			return;
		}
		const label = link.textContent?.trim().slice(0, 100) || link.href;

		const method = contactMethod(url);
		if (method) {
			gtag('event', 'contact_click', {
				method,
				link_url: link.href,
				event_label: label,
				transport_type: 'beacon'
			});
			return;
		}

		gtag('event', 'click', {
			event_category: 'link',
			event_label: label,
			link_url: link.href,
			link_domain: url.hostname || undefined,
			outbound: url.origin !== window.location.origin,
			transport_type: 'beacon'
		});
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
		document.addEventListener('click', handleClick);
		return () => {
			cleanup();
			document.removeEventListener('click', handleClick);
		};
	});

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

		// Only the landing view carries the external referrer / utm params.
		const aiSource = firstView
			? detectAiSource(new URLSearchParams(window.location.search).get('utm_source'), document.referrer)
			: null;
		firstView = false;
		if (aiSource) gtag('set', 'user_properties', { ai_source: aiSource });

		gtag('event', 'page_view', {
			page_location: window.location.href,
			page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
			page_title: document.title
		});
		if (aiSource) {
			gtag('event', 'ai_referral', { ai_source: aiSource, landing_page: window.location.pathname });
		}
	});
</script>
