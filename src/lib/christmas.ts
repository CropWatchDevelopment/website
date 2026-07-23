// Christmas decoration window: Nov 25 - Dec 30. Kept in one place so the server
// gate (+layout.server.ts) has a single source of truth. static/christmas-header.js
// keeps its own copy of this same check as a client-side safety net, since
// prerendered pages bake the server gate at build time (see +layout.server.ts).
export function isChristmasSeason(now: Date = new Date()): boolean {
	const year = now.getFullYear();
	const start = new Date(year, 10, 25, 0, 0, 0, 0); // Nov 25 00:00:00
	const end = new Date(year, 11, 30, 23, 59, 59, 999); // Dec 30 23:59:59
	return now >= start && now <= end;
}
