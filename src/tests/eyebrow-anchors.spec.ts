import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Section eyebrows double as anchor links, so a URL like
 * /cold-chain#audit-ready-by-default can be shared and lands on the section.
 *
 * These assertions run against the .svelte sources rather than a rendered page:
 * the site is prerendered (src/routes/+layout.ts sets `prerender = true`), so the
 * ids have to be in the markup, and checking the markup is what catches a new
 * page shipping without them.
 */

const ROUTES = join(process.cwd(), 'src/routes');

/** Sections whose eyebrow introduces the page itself, not a linkable section. */
const UNANCHORED_SECTION = /\b(hero|pagehero|closing)\b/;

/** Matches `<p class="eyebrow…">…</p>`, but not `.stat__eyebrow` / `.panel__eyebrow`. */
const EYEBROW_RE = /<p class="(eyebrow[^"]*)">([\s\S]*?)<\/p>/g;

function pageFiles(dir: string): string[] {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) return pageFiles(full);
		return entry.name === '+page.svelte' ? [full] : [];
	});
}

interface Eyebrow {
	classes: string;
	inner: string;
	sectionTag: string;
	sectionClasses: string;
}

/**
 * Split a page into its top-level `<section>` blocks and pull the eyebrows out of
 * each. Sections are never nested in these pages, so splitting on the opening tag
 * is enough to attribute an eyebrow to its section.
 */
function eyebrowsOf(source: string): Eyebrow[] {
	const found: Eyebrow[] = [];
	const sectionRe = /<section\b([^>]*)>/g;
	const opens = [...source.matchAll(sectionRe)];

	opens.forEach((open, i) => {
		const start = open.index + open[0].length;
		const end = i + 1 < opens.length ? opens[i + 1].index : source.length;
		const body = source.slice(start, end);
		const attrs = open[1];
		const sectionClasses = /class="([^"]*)"/.exec(attrs)?.[1] ?? '';

		for (const m of body.matchAll(EYEBROW_RE)) {
			found.push({
				classes: m[1],
				inner: m[2],
				sectionTag: open[0],
				sectionClasses
			});
		}
	});

	return found;
}

const pages = pageFiles(ROUTES).map((file) => ({
	file,
	rel: relative(process.cwd(), file),
	source: readFileSync(file, 'utf8')
}));

describe('section eyebrow anchors', () => {
	it('finds the route pages to check', () => {
		expect(pages.length).toBeGreaterThan(0);
	});

	describe.each(pages)('$rel', ({ source }) => {
		const eyebrows = eyebrowsOf(source);
		const anchorable = eyebrows.filter((e) => !UNANCHORED_SECTION.test(e.sectionClasses));
		const ids = [...source.matchAll(/\sid="([^"]*)"/g)].map((m) => m[1]);

		it('has no duplicate ids', () => {
			// Guards the anchor ids against the form-field ids on /pricing and
			// /contact (#email, #locations, #units, #checks, #minutes, #wage, …).
			const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
			expect(dupes).toEqual([]);
		});

		it.runIf(anchorable.length > 0)('wraps every section eyebrow in an anchor', () => {
			const bare = anchorable.filter((e) => !e.inner.includes('class="eyebrow__link"'));
			expect(bare.map((e) => e.inner)).toEqual([]);
		});

		it.runIf(anchorable.length > 0)('points each anchor at its own section', () => {
			for (const e of anchorable) {
				const href = /href="#([^"]*)"/.exec(e.inner)?.[1];
				expect(href, `no href in ${e.inner}`).toBeTruthy();

				// The target id must live on the section that contains the eyebrow,
				// so scroll-margin-top applies to what the browser scrolls to.
				expect(e.sectionTag, `#${href} is not on its own section`).toContain(`id="${href}"`);

				// scroll-pad is the site's existing anchor offset for the sticky header
				// (.scroll-pad { scroll-margin-top: 130px } in src/lib/styles/cw.css).
				expect(
					e.sectionClasses.split(/\s+/),
					`#${href} would land under the sticky header`
				).toContain('scroll-pad');
			}
		});

		it('leaves hero and closing eyebrows as plain text', () => {
			const heroish = eyebrows.filter((e) => UNANCHORED_SECTION.test(e.sectionClasses));
			const linked = heroish.filter((e) => e.inner.includes('eyebrow__link'));
			expect(linked.map((e) => e.inner)).toEqual([]);
		});
	});

	it('covers the expected pages', () => {
		// Update deliberately when a page gains or loses linkable sections.
		const counts = Object.fromEntries(
			pages
				.map(({ rel, source }) => [
					rel.replace('src/routes/', '').replace('/+page.svelte', ''),
					eyebrowsOf(source).filter((e) => e.inner.includes('eyebrow__link')).length
				])
				.filter(([, n]) => (n as number) > 0)
		);

		expect(counts).toEqual({
			agriculture: 7,
			'cold-chain': 6,
			home: 4,
			livestock: 7,
			'replacement-sensors': 6
		});
	});
});
