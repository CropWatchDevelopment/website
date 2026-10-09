// Shared gtag() stub. Events pushed before gtag.js loads (it is injected lazily
// by Analytics.svelte) queue on dataLayer and are delivered once it arrives.

export type Gtag = (...args: unknown[]) => void;
type WindowWithGtag = Window & { dataLayer?: unknown[]; gtag?: Gtag };

export function ensureGtag(): Gtag | null {
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

/** Sends a GA4 event; a no-op during SSR. */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
	ensureGtag()?.('event', name, params);
}
