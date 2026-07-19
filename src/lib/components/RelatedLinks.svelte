<script lang="ts">
	// Small "関連情報" internal-linking block. Cross-links the important money
	// pages and relevant コラム articles with concise, keyword anchor text — the
	// site-structure signal Google uses when choosing sitelinks.
	type Link = { href: string; label: string; sub?: string };
	let { links, title = '関連情報' }: { links: Link[]; title?: string } = $props();
</script>

<section class="section section--soft">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">hub</span> {title}</p>
			<h2>あわせて見る</h2>
		</div>
		<div class="rel__grid">
			{#each links as l, i (l.href)}
				<a class="rel__card" href={l.href} data-reveal={i % 3}>
					<span class="rel__txt">
						<span class="rel__label">{l.label}</span>
						{#if l.sub}<span class="rel__sub">{l.sub}</span>{/if}
					</span>
					<span class="rel__go material-symbols-rounded">arrow_forward</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.rel__grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 16px;
		margin-top: 24px;
	}
	.rel__card {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 20px 22px;
		background: #fff;
		border: 1px solid var(--web-border);
		border-radius: 14px;
		box-shadow: var(--web-shadow-card);
		transition:
			transform 0.2s var(--jp-ease),
			border-color 0.2s var(--jp-ease);
	}
	.rel__card:hover {
		transform: translateY(-3px);
		border-color: var(--web-primary);
	}
	.rel__txt {
		display: flex;
		flex-direction: column;
		gap: 3px;
		min-width: 0;
	}
	.rel__label {
		font-size: 15.5px;
		font-weight: 700;
		color: var(--cw-ink);
		line-height: 1.5;
	}
	.rel__sub {
		font-size: 12.5px;
		color: var(--web-muted);
		line-height: 1.5;
	}
	.rel__go {
		margin-left: auto;
		flex: none;
		font-size: 20px;
		color: var(--web-primary);
	}
</style>
