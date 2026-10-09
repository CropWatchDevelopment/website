// /llms.txt: a Markdown map of the site for AI assistants (llmstxt.org).
// Built from the same registry as /sitemap.xml (src/lib/seo/pages.ts plus the
// news files), so it never drifts from the real pages.

import { listNews } from '$lib/server/news';
import { PAGES, type LlmsSection } from '$lib/seo/pages';
import { ORG, SITE_NAME, absUrl } from '$lib/seo/site';

export const prerender = true;

const SECTION_HEADINGS: Record<LlmsSection, string> = {
	main: 'Products and solutions',
	support: 'Updates',
	legal: 'Legal'
};

const link = (title: string, path: string, summary: string) =>
	`- [${title}](${absUrl(path)}): ${summary}`;

function pageSection(section: LlmsSection): string {
	const lines = PAGES.filter((p) => p.section === section).map((p) =>
		link(p.title, p.path, p.summary)
	);
	return `## ${SECTION_HEADINGS[section]}\n\n${lines.join('\n')}`;
}

export function GET() {
	const news = listNews().map((n) => link(`${n.date} ${n.title}`, `/news/${n.id}`, n.description));

	const body = `# ${SITE_NAME}

> ${ORG.description}

CropWatch sells LoRaWAN wireless sensors, gateways and a cloud dashboard as one system for US and global customers. Contact: ${ORG.telephone}, ${ORG.email}, or the [contact form](${absUrl('/contact')}). The Japanese site is https://cropwatch.co.jp .

${pageSection('main')}

${pageSection('support')}
${news.length ? `\n## News\n\n${news.join('\n')}\n` : ''}
${pageSection('legal')}
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
