<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { formatNewsDate, DEFAULT_NEWS_ICON } from '$lib/content/news';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const articles = $derived(data.articles);

	const title = 'ニュース｜お知らせ・最新情報｜CropWatch 日本';
	const description =
		'CropWatch 日本からのお知らせ・最新情報の一覧です。サービスの更新情報、規約の改定、イベント情報などをお届けします。';
</script>

<Seo {title} {description} />

<Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: 'ニュース' }]} />

<section class="pagehero">
	<div class="wrap pagehero__in" data-reveal>
		<p class="eyebrow"><span class="material-symbols-rounded">campaign</span> ニュース</p>
		<h1>お知らせ・最新情報</h1>
		<p class="hero__kicker">
			サービスの更新情報や規約の改定など、<span class="u">CropWatch 日本からのお知らせ</span
			>をまとめています。
		</p>
	</div>
</section>

<section class="section">
	<div class="wrap news-wrap">
		{#if articles.length === 0}
			<p class="news-empty">現在、お知らせはありません。</p>
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
		background: #fff;
		box-shadow: var(--web-shadow-card);
		transition:
			transform 0.2s var(--jp-ease),
			border-color 0.2s var(--jp-ease);
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
