import type { LayoutServerLoad } from './$types';
import { isChristmasSeason } from '$lib/christmas';

// Season-gate the Christmas decoration on the server so christmas-header.js is
// only shipped to the browser during the Nov 25 - Dec 30 window, instead of
// being loaded on every page year-round.
//
// Caveat: prerendered routes (e.g. the home page) evaluate this at BUILD time,
// so the flag flips only on redeploy. Schedule a redeploy at the season
// boundaries (or trust the regular deploy cadence); static/christmas-header.js
// also re-checks the date client-side as a safety net.
export const load: LayoutServerLoad = () => {
	return { christmas: isChristmasSeason() };
};
