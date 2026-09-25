// Halloween decoration window: Oct 15 00:00 up to (not including) Nov 1 00:00,
// in the visitor's local time. +layout.svelte uses this in the browser to
// decide whether to load static/halloween-header.js; that script keeps its own
// copy of the check.
export function isHalloweenSeason(now: Date = new Date()): boolean {
	const year = now.getFullYear();
	const start = new Date(year, 9, 15, 0, 0, 0, 0); // Oct 15 00:00:00
	const end = new Date(year, 10, 1, 0, 0, 0, 0); // Nov 1 00:00:00 (exclusive)
	return now >= start && now < end;
}
