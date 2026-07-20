// Server-only news loader. Reads the article JSON files from static/news/*.json
// (filename minus .json = article id / URL slug) from disk.
//
// Why disk reads and not import.meta.glob('/static/...'):
//   Vite forbids importing files out of the public/static directory into JS
//   ("Assets in public directory cannot be imported from JavaScript"). A glob
//   there breaks dev-mode hydration. Reading from disk instead keeps the files
//   in static/ (so they're also directly fetchable at /news/<id>.json) while
//   loading them purely at build time.
//
// Why this is safe on Vercel:
//   Every /news route is prerendered (prerender = true), so this code runs
//   during `vite build` / `vite dev`, where the static/ directory exists on
//   disk. It never runs inside a Vercel serverless function at request time.
//
// This module lives under $lib/server so SvelteKit guarantees it is never
// bundled into client code.

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { NewsArticle, NewsSummary } from '$lib/content/news';

const NEWS_DIR = join(process.cwd(), 'static', 'news');

/** Read + parse every article, newest first. Invalid files are skipped. */
function readAll(): NewsArticle[] {
	let files: string[];
	try {
		files = readdirSync(NEWS_DIR).filter((f) => f.endsWith('.json'));
	} catch {
		return [];
	}
	const articles: NewsArticle[] = [];
	for (const file of files) {
		try {
			const raw = readFileSync(join(NEWS_DIR, file), 'utf-8');
			const data = JSON.parse(raw) as Omit<NewsArticle, 'id'>;
			articles.push({ id: file.replace(/\.json$/, ''), ...data });
		} catch (err) {
			console.warn(`[news] skipping invalid article file ${file}:`, err);
		}
	}
	return articles.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
}

/** Summaries for the list page + sitemap, newest first. */
export function listNews(): NewsSummary[] {
	return readAll().map(({ id, title, description, date, icon }) => ({
		id,
		title,
		description,
		date,
		icon
	}));
}

/** Full article by id, or undefined if not found. */
export function getNews(id: string): NewsArticle | undefined {
	return readAll().find((n) => n.id === id);
}
