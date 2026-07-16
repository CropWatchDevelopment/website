<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { breadcrumbSchema } from '$lib/seo/schema';
	import { SITE_ORIGIN } from '$lib/seo/site';
	import { COLUMNS } from '$lib/content/columns';

	const title = 'コラム｜温度監視・スマート農業・スマート畜産の基礎知識｜CropWatch 日本';
	const description =
		'HACCP義務化、冷蔵庫の温度記録の自動化、鶏舎の暑熱対策、スマート農業やLoRaWANの基礎まで。コールドチェーン・スマート農業・スマート畜産の温度監視に役立つ情報をお届けします。';

	const ld = [
		breadcrumbSchema([
			{ name: 'ホーム', path: '/' },
			{ name: 'コラム', path: '/column' }
		]),
		{
			'@context': 'https://schema.org',
			'@type': 'Blog',
			'@id': `${SITE_ORIGIN}/column#blog`,
			name: 'CropWatch コラム',
			inLanguage: 'ja',
			blogPost: COLUMNS.map((c) => ({
				'@type': 'BlogPosting',
				headline: c.title,
				description: c.description,
				url: `${SITE_ORIGIN}/column/${c.slug}`,
				datePublished: c.datePublished
			}))
		}
	];
</script>

<Seo {title} {description} />
<JsonLd data={ld} />

<div class="crumb"><div class="wrap crumb__in">
	<a href="/">ホーム</a><span class="material-symbols-rounded">chevron_right</span>
	<b>コラム</b>
</div></div>

<section class="pagehero">
	<div class="wrap pagehero__in" data-reveal>
		<p class="eyebrow"><span class="material-symbols-rounded">menu_book</span> コラム</p>
		<h1>温度監視と現場の見える化、基礎から。</h1>
		<p class="hero__kicker">
			コールドチェーン・スマート農業・スマート畜産。<span class="u">導入前に知っておきたいことを、分かりやすく。</span>
		</p>
		<p>
			HACCP義務化への対応から、冷蔵庫の温度記録の自動化、鶏舎の暑熱対策、スマート農業や<a class="extlink" href="https://lora-alliance.org/" target="_blank" rel="noopener noreferrer">LoRaWAN</a>の基礎まで。現場の課題解決に役立つ情報をまとめています。
		</p>
	</div>
</section>

<section class="section">
	<div class="wrap">
		<div class="col-grid">
			{#each COLUMNS as c (c.slug)}
				<a class="col-card" href="/column/{c.slug}" data-reveal>
					<span class="col-card__cat">{c.category}</span>
					<h2>{c.title}</h2>
					<p>{c.description}</p>
					<span class="col-card__meta">
						<time datetime={c.datePublished}>{c.datePublished}</time>
						<span aria-hidden="true">・</span>約{c.readMinutes}分
						<span class="col-card__go material-symbols-rounded">arrow_forward</span>
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.col-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
	}
	.col-card {
		display: flex;
		flex-direction: column;
		padding: 26px 26px 20px;
		border: 1px solid var(--web-border);
		border-radius: 18px;
		background: #fff;
		box-shadow: var(--web-shadow-card);
		transition:
			transform 0.2s var(--jp-ease),
			border-color 0.2s var(--jp-ease);
	}
	.col-card:hover {
		transform: translateY(-3px);
		border-color: var(--web-primary);
	}
	.col-card__cat {
		align-self: flex-start;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.06em;
		color: var(--web-primary);
		background: var(--web-primary-soft);
		padding: 5px 12px;
		border-radius: 999px;
	}
	.col-card h2 {
		font-size: 18px;
		font-weight: 700;
		line-height: 1.55;
		color: var(--cw-ink);
		margin: 14px 0 0;
	}
	.col-card p {
		font-size: 14px;
		line-height: 1.85;
		color: var(--web-muted);
		margin: 10px 0 0;
		flex: 1;
	}
	.col-card__meta {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-top: 18px;
		font-size: 12.5px;
		color: var(--web-muted);
	}
	.col-card__go {
		margin-left: auto;
		font-size: 20px;
		color: var(--web-primary);
	}
	@media (max-width: 820px) {
		.col-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
