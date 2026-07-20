// Shared, client-safe types + helpers for the news system. The actual
// reading of the JSON files lives in $lib/server/news.ts (server-only, uses
// node:fs) — see the note there for why we don't import.meta.glob() the
// static/ directory.

export type NewsBlock =
	| { type: 'paragraph'; text: string; image?: string | null }
	| { type: 'heading'; text: string }
	| { type: 'list'; items: string[] }
	| { type: 'image'; src: string; alt?: string; caption?: string }
	| { type: 'link'; href: string; text: string };

export type NewsArticle = {
	id: string;
	title: string;
	description: string;
	/** ISO date, e.g. "2026-07-18" */
	date: string;
	/**
	 * Material Symbol name shown as the list thumbnail (e.g. "gavel",
	 * "campaign", "eco"). See fonts.google.com/icons. Falls back to a default
	 * when omitted. NOTE: icons used in article JSON must exist in the
	 * self-hosted subset font — scripts/build-fonts.py scans static/news/*.json
	 * and includes them; re-run it after introducing a new icon name.
	 */
	icon?: string | null;
	headerImage?: string | null;
	content: NewsBlock[];
};

/** Lightweight summary used by the /news list page. */
export type NewsSummary = Pick<NewsArticle, 'id' | 'title' | 'description' | 'date' | 'icon'>;

/** Thumbnail icon used when an article omits its own `icon`. */
export const DEFAULT_NEWS_ICON = 'campaign';

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

/** "2026-07-18" -> "July 18, 2026" (falls back to the raw string). */
export function formatNewsDate(iso: string): string {
	const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
	if (!m) return iso;
	return `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}`;
}
