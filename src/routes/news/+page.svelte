<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { formatNewsDate, DEFAULT_NEWS_ICON } from '$lib/content/news';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const articles = $derived(data.articles);
</script>

<svelte:head>
	<title>News &amp; Updates | CropWatch</title>
	<meta
		name="description"
		content="Product news, certifications and field stories from CropWatch - wireless environmental monitoring for cold storage, food service, agriculture and livestock."
	/>
	<link rel="canonical" href="https://cropwatch.io/news" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/home' }, { label: 'News' }]} />

<section class="pagehero">
	<div class="wrap" data-reveal>
		<p class="eyebrow"><span class="material-symbols-rounded">campaign</span> News</p>
		<h1>News &amp; updates</h1>
		<p class="lead">
			Product releases, certification milestones and announcements from CropWatch.
		</p>
	</div>
</section>

<section class="section">
	<div class="wrap news-wrap">
		{#if articles.length === 0}
			<p class="news-empty">No announcements yet - check back soon.</p>
		{:else}
			<ul class="news-list">
				{#each articles as n (n.id)}
					<li>
						<a class="news-item" href="/news/{n.id}" data-reveal>
							<span class="news-item__thumb" aria-hidden="true">
								<span class="material-symbols-rounded">{n.icon || DEFAULT_NEWS_ICON}</span>
							</span>
							<span class="news-item__main">
								<time class="news-item__date" datetime={n.date}>{formatNewsDate(n.date)}</time>
								<b class="news-item__title">{n.title}</b>
								<span class="news-item__desc">{n.description}</span>
							</span>
							<span class="news-item__go material-symbols-rounded" aria-hidden="true"
								>arrow_forward</span
							>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>

<style>
	.news-wrap {
		max-width: 860px;
	}
	.news-empty {
		font-size: 15px;
		color: var(--web-muted);
	}
	.news-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 14px;
	}
	.news-item {
		display: flex;
		align-items: center;
		gap: 18px;
		padding: 18px 22px;
		border: 1px solid var(--web-border);
		border-radius: 16px;
		background: var(--web-surface);
		box-shadow: var(--web-shadow-card);
		transition:
			transform 0.2s var(--cw-ease-default),
			border-color 0.2s var(--cw-ease-default);
	}
	.news-item:hover {
		transform: translateY(-2px);
		border-color: var(--web-primary);
	}
	.news-item__thumb {
		flex: 0 0 auto;
		width: 54px;
		height: 54px;
		display: grid;
		place-items: center;
		border-radius: 14px;
		background: var(--web-primary-soft);
		color: var(--web-primary);
	}
	.news-item__thumb .material-symbols-rounded {
		font-size: 28px;
	}
	.news-item__main {
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
		flex: 1;
	}
	.news-item__date {
		font-size: 12.5px;
		font-weight: 600;
		color: var(--web-primary);
	}
	.news-item__title {
		font-size: 16px;
		font-weight: 700;
		line-height: 1.6;
		color: var(--cw-ink);
	}
	.news-item__desc {
		font-size: 13.5px;
		line-height: 1.8;
		color: var(--web-muted);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.news-item__go {
		margin-left: auto;
		align-self: center;
		font-size: 20px;
		color: var(--web-primary);
		flex: 0 0 auto;
	}
	@media (max-width: 600px) {
		.news-item {
			gap: 14px;
			padding: 16px 16px;
		}
		.news-item__thumb {
			width: 46px;
			height: 46px;
			border-radius: 12px;
		}
		.news-item__thumb .material-symbols-rounded {
			font-size: 24px;
		}
		.news-item__go {
			display: none;
		}
	}
</style>
