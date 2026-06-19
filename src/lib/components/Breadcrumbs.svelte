<script lang="ts">
	/**
	 * Reusable breadcrumb trail.
	 *
	 * Pass an ordered list of crumbs from the site root to the current page. The
	 * final crumb is rendered as the current page - no link, `aria-current="page"`.
	 * The component also emits a matching schema.org `BreadcrumbList` so the trail
	 * is eligible for breadcrumb rich results in search.
	 *
	 * Usage:
	 *   <Breadcrumbs
	 *     items={[
	 *       { label: 'Home', href: '/home' },
	 *       { label: 'Products', href: '/cold-chain' },
	 *       { label: 'Cold-Chain Monitoring' }
	 *     ]}
	 *   />
	 */
	export interface Crumb {
		label: string;
		/** Absolute or root-relative path. Omit on the final (current) crumb. */
		href?: string;
	}

	let { items, origin = 'https://cropwatch.io' }: { items: Crumb[]; origin?: string } =
		$props();

	const lastIndex = $derived(items.length - 1);

	// BreadcrumbList JSON-LD: absolute URLs from each href; the current page omits
	// `item`. `<` is escaped so a label can never break out of the script tag.
	const jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: items.map((crumb, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: crumb.label,
				...(crumb.href ? { item: origin + crumb.href } : {})
			}))
		}).replace(/</g, '\\u003c')
	);
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<nav class="pcrumb" aria-label="Breadcrumb">
	<div class="wrap">
		<ol class="pcrumb__list">
			{#each items as crumb, i (crumb.label)}
				<li class="pcrumb__crumb">
					{#if crumb.href && i !== lastIndex}
						<a href={crumb.href}>{crumb.label}</a>
					{:else}
						<span class="pcrumb__current" aria-current="page">{crumb.label}</span>
					{/if}
					{#if i !== lastIndex}
						<span class="pcrumb__sep material-symbols-rounded" aria-hidden="true">chevron_right</span>
					{/if}
				</li>
			{/each}
		</ol>
	</div>
</nav>

<style>
	/* Ported from the design's product.css .pcrumb, encapsulated here so every
	   page gets the trail by dropping in <Breadcrumbs />. */
	.pcrumb {
		border-bottom: 1px solid var(--web-border);
		background: #fff;
	}
	.pcrumb__list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
		margin: 0;
		padding-block: 12px;
		padding-inline: 0;
		list-style: none;
		font-size: 13px;
		color: var(--web-muted);
	}
	.pcrumb__crumb {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}
	.pcrumb a:hover {
		color: var(--web-primary);
	}
	.pcrumb__current {
		color: var(--cw-ink);
		font-weight: 600;
	}
	.pcrumb__sep {
		font-size: 16px;
		opacity: 0.6;
	}
</style>
