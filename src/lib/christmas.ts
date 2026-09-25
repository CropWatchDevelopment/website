// Christmas decoration window: Nov 25 - Dec 30, in the visitor's local time.
// +layout.svelte uses this in the browser to decide whether to load
// static/christmas-header.js; that script keeps its own copy of the check.
export function isChristmasSeason(now: Date = new Date()): boolean {
	const year = now.getFullYear();
	const start = new Date(year, 10, 25, 0, 0, 0, 0); // Nov 25 00:00:00
	const end = new Date(year, 11, 30, 23, 59, 59, 999); // Dec 30 23:59:59
	return now >= start && now <= end;
}
