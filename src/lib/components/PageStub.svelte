<script lang="ts">
	// Lightweight, on-brand placeholder for the .io pages not yet ported from the
	// design bundle. Renders the design system's .pagehero + a short "what this
	// page covers" panel so navigation works and links never 404.
	interface Props {
		eyebrow: string;
		title: string;
		lead: string;
		image?: string;
		imageAlt?: string;
		points?: string[];
	}

	let { eyebrow, title, lead, image, imageAlt = '', points = [] }: Props = $props();
</script>

<section class="pagehero">
	<div class="wrap">
		<p class="eyebrow">{eyebrow}</p>
		<h1>{title}</h1>
		<p>{lead}</p>
	</div>
</section>

<section class="section">
	<div class="wrap">
		<div class="split">
			<div class="split__copy">
				<p class="eyebrow eyebrow--accent">Full page coming soon</p>
				<h2 style="font-size:var(--cw-text-3xl)">What this page will cover</h2>
				<p class="lead" style="max-width:none">
					This section of the new cropwatch.io site is being built out from the approved design.
					Here's what it will include — in the meantime, book a demo and we'll walk you through it
					directly.
				</p>
				{#if points.length}
					<ul class="diff-list" style="margin-top:8px">
						{#each points as point (point)}
							<li><span class="material-symbols-rounded">check</span> {point}</li>
						{/each}
					</ul>
				{/if}
				<div class="hero__ctas" style="margin-top:26px">
					<a href="/contact" class="cta-pill cta-pill--lg"><span>Book a demo</span> <span class="material-symbols-rounded">arrow_forward</span></a>
					<a href="/" class="cta-ghost cta-pill--lg"><span class="material-symbols-rounded">arrow_back</span> <span>Back to home</span></a>
				</div>
			</div>
			<div class="split__media split__media--tall">
				{#if image}
					<img src={image} alt={imageAlt} />
				{:else}
					<div class="diff-art" style="min-height:360px">
						<span class="material-symbols-rounded" style="font-size:72px;color:var(--web-primary);opacity:.5">construction</span>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
