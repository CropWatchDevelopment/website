import { error } from '@sveltejs/kit';
import { getNews, listNews } from '$lib/server/news';
import type { PageServerLoad, EntryGenerator } from './$types';

// Prerendered: one static page per article. `entries` enumerates the known
// ids so the crawler renders them all; unknown ids 404.
export const prerender = true;
export const entries: EntryGenerator = () => listNews().map((n) => ({ id: n.id }));

export const load: PageServerLoad = ({ params }) => {
	const article = getNews(params.id);
	if (!article) error(404, 'お知らせが見つかりませんでした');
	return { article };
};
