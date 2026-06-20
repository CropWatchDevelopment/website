// Cross-site hreflang alternates linking cropwatch.io (en) and cropwatch.co.jp (ja).
//
// hreflang tells Google these URLs are the same page in another language so it
// serves the right one per user and consolidates ranking signals instead of
// treating the two domains as duplicate/competing content. It MUST be
// reciprocal and self-referential: every page lists the full set including
// itself, and the matching page on the other site lists the identical set.
//
// IMPORTANT: this file is shared verbatim by both deploy branches
//   - master / develop      -> cropwatch.io      (call alternatesFor('en', ...))
//   - Japan-website         -> cropwatch.co.jp   (call alternatesFor('ja', ...))
// Only the locale arg passed in the root layout differs. Keep PAIRS identical
// on both branches or Google drops the annotations ("no return tag").

const ORIGINS = {
	en: 'https://cropwatch.io',
	ja: 'https://cropwatch.co.jp'
} as const;

export type Locale = keyof typeof ORIGINS;

// Pairs of GENUINELY equivalent pages across the two sites. Only paths listed
// here emit cross-site hreflang; every other page keeps just its self-canonical
// (pointing unrelated pages at the other homepage would be wrong and flagged).
// The two sites have largely different route structures, so this is short by
// design - add a row only when a true counterpart page exists on both sides.
const PAIRS: Record<Locale, string>[] = [
	{ en: '/', ja: '/' }, // homepage <-> homepage (most important pair)
	{ en: '/contact', ja: '/contact' }
];

export type Alternate = { hreflang: string; href: string };

// Strip the trailing slash so lookups are stable regardless of how the URL is
// requested (root stays '/').
function normalise(pathname: string): string {
	return pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

/**
 * Given the locale of the CURRENT site and the current pathname, return the
 * full reciprocal alternate set (en, ja and x-default), or null when this page
 * has no cross-site equivalent and should emit no hreflang.
 */
export function alternatesFor(site: Locale, pathname: string): Alternate[] | null {
	const path = normalise(pathname);
	const pair = PAIRS.find((p) => p[site] === path);
	if (!pair) return null;

	return [
		{ hreflang: 'en', href: ORIGINS.en + pair.en },
		{ hreflang: 'ja', href: ORIGINS.ja + pair.ja },
		// x-default = the fallback for users we don't explicitly target; the
		// global English site is the right catch-all.
		{ hreflang: 'x-default', href: ORIGINS.en + pair.en }
	];
}
