<script lang="ts">
	// Central per-page SEO head: title, meta description, self-referential
	// canonical, and the full Open Graph + Twitter card set. Drop one <Seo />
	// near the top of every route's markup in place of a hand-written
	// <svelte:head> title/description.
	import { page } from '$app/state';
	import { SITE_NAME, DEFAULT_OG_IMAGE, absUrl } from '$lib/seo/site';

	let {
		title,
		description,
		image = DEFAULT_OG_IMAGE,
		type = 'website',
		noindex = false
	}: {
		title: string;
		description: string;
		image?: string;
		type?: string;
		noindex?: boolean;
	} = $props();

	const canonical = $derived(absUrl(page.url.pathname));
	const ogImage = $derived(image.startsWith('http') ? image : absUrl(image));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#if noindex}
		<meta name="robots" content="noindex" />
	{/if}

	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content="ja_JP" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>
