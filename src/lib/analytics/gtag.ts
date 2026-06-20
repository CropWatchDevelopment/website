// Google Analytics 4 (gtag.js) plumbing for the marketing sites.
//
// The site is prerendered to static HTML but behaves as a single-page app after
// hydration, so GA's automatic page_view only fires for the first response. We
// disable it (`send_page_view: false`) and emit page_view ourselves on every
// client-side navigation. See Analytics.svelte for the lifecycle wiring.

type GtagArgs = unknown[];

declare global {
	interface Window {
		dataLayer?: GtagArgs[];
		gtag?: (...args: GtagArgs) => void;
	}
}

// The id we have already injected, so initAnalytics is idempotent.
let activeId: string | null = null;

/**
 * Inject gtag.js for `measurementId` and prime the data layer. Browser-only and
 * idempotent — safe to call from afterNavigate on every navigation. The initial
 * automatic page_view is disabled; callers emit page_view via trackPageView.
 */
export function initAnalytics(measurementId: string): void {
	if (typeof window === 'undefined' || !measurementId || activeId === measurementId) {
		return;
	}
	activeId = measurementId;

	const script = document.createElement('script');
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
	document.head.appendChild(script);

	window.dataLayer = window.dataLayer ?? [];
	// gtag forwards its raw argument list onto the data layer; gtag.js reads each
	// entry by index/length, so pushing the rest array behaves like `arguments`.
	window.gtag = function gtag(...args: GtagArgs) {
		window.dataLayer!.push(args);
	};
	window.gtag('js', new Date());
	window.gtag('config', measurementId, { send_page_view: false });
}

/** Emit a page_view for the current document/location. No-op until initAnalytics has run. */
export function trackPageView(path: string): void {
	if (typeof window === 'undefined' || !window.gtag) return;
	window.gtag('event', 'page_view', {
		page_path: path,
		page_location: window.location.href,
		page_title: document.title
	});
}
