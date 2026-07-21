<script lang="ts">
	/**
	 * Breadcrumbs for cropwatch.co.jp: renders the visible `.crumb` trail AND
	 * the matching schema.org BreadcrumbList JSON-LD from one `items` array,
	 * so the two can never drift apart.
	 *
	 * Pass crumbs from the site root to the current page. The last item is the
	 * current page (rendered bold, unlinked; its schema URL falls back to the
	 * current path). Omit `href` on name-only parents (e.g. 製品, which has no
	 * landing page): they stay in the visible trail but are skipped in the
	 * JSON-LD, because Google requires a real `item` URL on every ListItem
	 * except the last.
	 *
	 * Usage:
	 *   <Breadcrumbs items={[
	 *     { label: 'ホーム', href: '/' },
	 *     { label: '製品' },
	 *     { label: '交換用センサー' }
	 *   ]} />
	 */
	import { page } from '$app/state';
	import JsonLd from './JsonLd.svelte';
	import { breadcrumbSchema } from '$lib/seo/schema';

	export interface Crumb {
		label: string;
		/** Root-relative path. Omit on the current page and on name-only parents. */
		href?: string;
	}

	let { items }: { items: Crumb[] } = $props();

	const breadcrumbLd = $derived(
		breadcrumbSchema(
			items
				.filter((crumb, i) => crumb.href || i === items.length - 1)
				.map((crumb) => ({ name: crumb.label, path: crumb.href ?? page.url.pathname }))
		)
	);
</script>

<JsonLd data={breadcrumbLd} />

<div class="crumb">
	<div class="wrap crumb__in">
		{#each items as crumb, i (i)}
			{#if i > 0}<span class="material-symbols-rounded">chevron_right</span>{/if}
			{#if i === items.length - 1}
				<b>{crumb.label}</b>
			{:else if crumb.href}
				<a href={crumb.href}>{crumb.label}</a>
			{:else}
				<span>{crumb.label}</span>
			{/if}
		{/each}
	</div>
</div>
