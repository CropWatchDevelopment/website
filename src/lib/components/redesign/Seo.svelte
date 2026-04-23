<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';

	interface Props {
		title: string;
		description: string;
		ogType?: 'website' | 'article' | 'product' | 'profile';
		ogImage?: string;
		noindex?: boolean;
		jsonLd?: Record<string, unknown> | Record<string, unknown>[];
	}

	let {
		title,
		description,
		ogType = 'website',
		ogImage,
		noindex = false,
		jsonLd
	}: Props = $props();

	const SITE_ORIGIN = 'https://www.cropwatch.io';
	const DEFAULT_IMAGE = `${SITE_ORIGIN}/favicon.svg`;

	let siteName = $derived($_('rd.seo.site_name'));
	let fullTitle = $derived(`${title} — ${siteName}`);
	let image = $derived(ogImage ?? DEFAULT_IMAGE);
	let url = $derived(SITE_ORIGIN + ($page.url.pathname || '/'));

	let robots = $derived(noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

	let jsonLdItems = $derived(
		jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []
	);

	function stringify(item: Record<string, unknown>): string {
		return JSON.stringify(item).replace(/</g, '\\u003c');
	}
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta name="robots" content={robots} />

	<meta property="og:site_name" content={siteName} />
	<meta property="og:type" content={ogType} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	{#each jsonLdItems as item, i (i)}
		{@html `<script type="application/ld+json">${stringify(item)}<\/script>`}
	{/each}
</svelte:head>
