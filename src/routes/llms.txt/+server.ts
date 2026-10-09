// /llms.txt: a Markdown map of the site for AI assistants (llmstxt.org).
// Built from the same registries as /sitemap.xml (src/lib/seo/pages.ts,
// コラム manifest, news files), so it never drifts from the real pages.

import { COLUMNS } from '$lib/content/columns';
import { listNews } from '$lib/server/news';
import { PAGES, type LlmsSection } from '$lib/seo/pages';
import { ORG, SITE_NAME, absUrl } from '$lib/seo/site';

export const prerender = true;

const SECTION_HEADINGS: Record<LlmsSection, string> = {
	main: '製品・サービス',
	support: 'サポート・情報',
	legal: '法的情報'
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
	const columns = COLUMNS.map((c) => link(c.title, `/column/${c.slug}`, c.description));
	const news = listNews().map((n) => link(`${n.date} ${n.title}`, `/news/${n.id}`, n.description));
	const { address } = ORG;

	const body = `# ${SITE_NAME}（${ORG.alternateName}）

> ${ORG.description}

${ORG.legalName}（${address.region}${address.locality}）が運営する、日本向けの CropWatch 公式サイトです。LoRaWAN®（AS923）対応のワイヤレスセンサー、受信機（ゲートウェイ）、クラウドの監視画面をセットで提供しています。お問い合わせ: 電話 ${ORG.telephone}、[お問い合わせフォーム](${absUrl('/contact')})。英語版（海外向け）は https://cropwatch.io 。

${pageSection('main')}

${pageSection('support')}

## コラム

${columns.join('\n')}
${news.length ? `\n## ニュース\n\n${news.join('\n')}\n` : ''}
${pageSection('legal')}
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
