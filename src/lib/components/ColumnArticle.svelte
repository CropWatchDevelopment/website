<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { articleSchema } from '$lib/seo/schema';
	import { DEFAULT_OG_IMAGE } from '$lib/seo/site';
	import type { Column } from '$lib/content/columns';
	import type { Snippet } from 'svelte';

	let { column, children }: { column: Column; children: Snippet } = $props();

	const path = $derived(`/column/${column.slug}`);
	const seoTitle = $derived(`${column.title}｜CropWatch 日本`);

	const ld = $derived(
		articleSchema({
			title: column.title,
			description: column.description,
			path,
			datePublished: column.datePublished,
			dateModified: column.dateModified,
			image: DEFAULT_OG_IMAGE
		})
	);
</script>

<Seo title={seoTitle} description={column.description} type="article" />
<JsonLd data={ld} />

<Breadcrumbs
	items={[
		{ label: 'ホーム', href: '/' },
		{ label: 'コラム', href: '/column' },
		{ label: column.title }
	]}
/>

<article class="col-article">
	<div class="wrap col-article__in">
		<header class="col-head" data-reveal>
			<p class="col-cat">{column.category}</p>
			<h1>{column.title}</h1>
			<p class="col-meta">
				<time datetime={column.datePublished}>{column.datePublished}</time>
				<span aria-hidden="true">・</span>
				<span>約{column.readMinutes}分で読めます</span>
			</p>
		</header>

		<div class="col-body" data-reveal>
			{@render children()}
		</div>

		<aside class="col-cta" data-reveal>
			<div>
				<p class="col-cta__lead">CropWatch なら、置くだけで見える化できます。</p>
				<p class="col-cta__sub">現場に合わせたセンサーと通知の設定を、無料でご提案します。</p>
			</div>
			<div class="col-cta__btns">
				<a href={column.targetHref} class="btn btn--primary">{column.targetLabel}</a>
				<a href="/contact" class="btn btn--accent">無料デモを予約する</a>
			</div>
		</aside>

		<p class="col-back"><a href="/column">← コラム一覧へ戻る</a></p>
	</div>
</article>

<style>
	.col-article {
		padding: 26px 0 8px;
	}
	.col-article__in {
		max-width: 760px;
	}
	.col-head {
		padding-bottom: 22px;
		border-bottom: 1px solid var(--web-border);
		margin-bottom: 30px;
	}
	.col-cat {
		display: inline-block;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: var(--web-primary);
		background: var(--web-primary-soft);
		padding: 5px 13px;
		border-radius: 999px;
	}
	.col-head h1 {
		font-size: clamp(1.5rem, 3.4vw, 2.05rem);
		line-height: 1.5;
		font-weight: 800;
		color: var(--cw-ink);
		margin: 16px 0 0;
		letter-spacing: -0.01em;
	}
	.col-meta {
		margin: 14px 0 0;
		font-size: 13px;
		color: var(--web-muted);
		display: flex;
		gap: 8px;
		align-items: center;
	}

	/* Article body typography (self-contained; no dependency on prose plugin) */
	.col-body :global(h2) {
		font-size: clamp(1.2rem, 2.2vw, 1.5rem);
		font-weight: 700;
		color: var(--cw-ink);
		line-height: 1.55;
		margin: 40px 0 14px;
		padding-top: 6px;
	}
	.col-body :global(h3) {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--cw-ink);
		line-height: 1.6;
		margin: 28px 0 10px;
	}
	.col-body :global(p) {
		font-size: 16px;
		line-height: 1.95;
		color: var(--web-body, #334155);
		margin: 0 0 18px;
	}
	.col-body :global(ul),
	.col-body :global(ol) {
		margin: 0 0 20px;
		padding-left: 1.4em;
	}
	.col-body :global(li) {
		font-size: 16px;
		line-height: 1.9;
		color: var(--web-body, #334155);
		margin: 0 0 8px;
	}
	.col-body :global(ul) {
		list-style: disc;
	}
	.col-body :global(ol) {
		list-style: decimal;
	}
	.col-body :global(strong) {
		font-weight: 700;
		color: var(--cw-ink);
	}
	.col-body :global(a) {
		color: var(--web-primary);
		text-decoration: underline;
		text-underline-offset: 2px;
	}
	.col-body :global(.col-lead) {
		font-size: 17px;
		line-height: 1.9;
		color: var(--cw-ink);
		font-weight: 500;
	}
	.col-body :global(.col-note) {
		background: var(--web-bg-tint, #f1f5f9);
		border-left: 4px solid var(--web-primary);
		border-radius: 10px;
		padding: 14px 18px;
		margin: 0 0 22px;
	}
	.col-body :global(.col-note p:last-child) {
		margin-bottom: 0;
	}

	.col-cta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 18px;
		margin: 40px 0 8px;
		padding: 26px 28px;
		border-radius: 18px;
		background: var(--cw-ink);
		color: #fff;
	}
	.col-cta__lead {
		font-size: 17px;
		font-weight: 700;
		margin: 0;
	}
	.col-cta__sub {
		font-size: 13.5px;
		color: rgba(231, 236, 255, 0.78);
		margin: 6px 0 0;
	}
	.col-cta__btns {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}
	.col-back {
		margin: 26px 0 0;
		font-size: 14.5px;
		font-weight: 600;
	}
	.col-back a {
		color: var(--web-primary);
	}

	@media (max-width: 600px) {
		.col-cta {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
