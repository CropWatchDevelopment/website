<script lang="ts">
	/**
	 * Breadcrumb structured data (JSON-LD only) for cropwatch.co.jp.
	 *
	 * Unlike the .io Breadcrumbs, this emits ONLY the schema.org BreadcrumbList
	 * (no visible <nav>): the .io visual trail relies on .io design tokens and an
	 * icon font this site doesn't load, so a visible port would render broken.
	 * Pass crumbs from the site root to the current page; omit `href` on the
	 * current page and on name-only parents (e.g. 製品).
	 *
	 * Usage:
	 *   <Breadcrumbs items={[
	 *     { label: 'ホーム', href: '/' },
	 *     { label: '製品' },
	 *     { label: '温度・湿度センサー (CW-AIR-TH)' }
	 *   ]} />
	 */
	import JsonLd from './JsonLd.svelte';
	import { breadcrumbSchema } from '$lib/seo/schema';

	export interface Crumb {
		label: string;
		/** Root-relative path. Omit on the current page and on name-only parents. */
		href?: string;
	}

	let { items }: { items: Crumb[] } = $props();

	const breadcrumbLd = $derived(
		breadcrumbSchema(items.map((crumb) => ({ name: crumb.label, path: crumb.href })))
	);
</script>

<JsonLd data={breadcrumbLd} />
