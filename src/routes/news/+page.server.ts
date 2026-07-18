import { listNews } from '$lib/server/news';
import type { PageServerLoad } from './$types';

// Prerendered: the article list is read from static/news/*.json at build time.
export const prerender = true;

export const load: PageServerLoad = () => {
	return { articles: listNews() };
};
