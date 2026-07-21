<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { articleSchema } from '$lib/seo/schema';
	import { DEFAULT_OG_IMAGE } from '$lib/seo/site';
	import { formatNewsDate } from '$lib/content/news';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const article = $derived(data.article);
	const path = $derived(`/news/${article.id}`);
	const seoTitle = $derived(`${article.title}｜ニュース｜CropWatch 日本`);

	const ld = $derived(
		articleSchema({
			title: article.title,
			description: article.description,
			path,
			datePublished: article.date,
			image: article.headerImage ?? DEFAULT_OG_IMAGE
		})
	);
</script>

<Seo
	title={seoTitle}
	description={article.description}
	type="article"
	image={article.headerImage ?? DEFAULT_OG_IMAGE}
/>
<JsonLd data={ld} />

<Breadcrumbs
	items={[
		{ label: 'ホーム', href: '/' },
		{ label: 'ニュース', href: '/news' },
		{ label: article.title }
	]}
/>

<article class="news-article">
	<div class="wrap news-article__in">
		<header class="news-head" data-reveal>
			<p class="news-cat">お知らせ</p>
			<h1>{article.title}</h1>
			<p class="news-meta">
				<time datetime={article.date}>{formatNewsDate(article.date)}</time>
			</p>
		</header>

		{#if article.headerImage}
			<img class="news-hero-img" src={article.headerImage} alt={article.title} data-reveal />
		{/if}

		<div class="news-body" data-reveal>
			{#each article.content as block, i (i)}
				{#if block.type === 'paragraph'}
					<p>{block.text}</p>
					{#if block.image}
						<img class="news-img" src={block.image} alt="" />
					{/if}
				{:else if block.type === 'heading'}
					<h2>{block.text}</h2>
				{:else if block.type === 'list'}
					<ul>
						{#each block.items as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
				{:else if block.type === 'image'}
					<figure class="news-fig">
						<img class="news-img" src={block.src} alt={block.alt ?? ''} />
						{#if block.caption}<figcaption>{block.caption}</figcaption>{/if}
					</figure>
				{:else if block.type === 'link'}
					<p>
						<a class="news-link" href={block.href}
							>{block.text} <span class="material-symbols-rounded">arrow_forward</span></a
						>
					</p>
				{/if}
			{/each}
		</div>

		<p class="news-back"><a href="/news">← ニュース一覧へ戻る</a></p>
	</div>
</article>

<style>
	.news-article {
		padding: 26px 0 40px;
	}
	.news-article__in {
		max-width: 760px;
	}
	.news-head {
		padding-bottom: 22px;
		border-bottom: 1px solid var(--web-border);
		margin-bottom: 30px;
	}
	.news-cat {
		display: inline-block;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: var(--web-primary);
		background: var(--web-primary-soft);
		padding: 5px 13px;
		border-radius: 999px;
	}
	.news-head h1 {
		font-size: clamp(1.5rem, 3.4vw, 2.05rem);
		line-height: 1.5;
		font-weight: 800;
		color: var(--cw-ink);
		margin: 16px 0 0;
		letter-spacing: -0.01em;
	}
	.news-meta {
		margin: 14px 0 0;
		font-size: 13px;
		color: var(--web-muted);
	}
	.news-hero-img {
		width: 100%;
		max-width: 100%;
		border-radius: 16px;
		margin: 0 0 28px;
	}

	.news-body h2 {
		font-size: clamp(1.2rem, 2.2vw, 1.5rem);
		font-weight: 700;
		color: var(--cw-ink);
		line-height: 1.55;
		margin: 40px 0 14px;
	}
	.news-body p {
		font-size: 16px;
		line-height: 1.95;
		color: var(--web-body, #334155);
		margin: 0 0 18px;
	}
	.news-body ul {
		list-style: disc;
		margin: 0 0 20px;
		padding-left: 1.4em;
	}
	.news-body li {
		font-size: 16px;
		line-height: 1.9;
		color: var(--web-body, #334155);
		margin: 0 0 8px;
	}
	.news-img {
		max-width: 100%;
		border-radius: 14px;
		margin: 0 0 18px;
	}
	.news-fig {
		margin: 0 0 22px;
	}
	.news-fig figcaption {
		font-size: 13px;
		color: var(--web-muted);
		margin-top: 6px;
	}
	.news-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-weight: 700;
		color: var(--web-primary);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.news-link .material-symbols-rounded {
		font-size: 18px;
	}
	.news-back {
		margin: 26px 0 0;
		font-size: 14.5px;
		font-weight: 600;
	}
	.news-back a {
		color: var(--web-primary);
	}
</style>
