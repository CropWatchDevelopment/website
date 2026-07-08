<script lang="ts">
	const LOGO = '/cropwatch_icons/cropwatch_static.svg';
</script>

<svelte:head>
	<title>CropWatch — Not available in your region</title>
	<meta
		name="description"
		content="CropWatch is not currently available in your region. We hope to offer service here in the future."
	/>
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<section class="region-gate">
	<div class="region-gate__wash" aria-hidden="true"></div>

	<div class="region-gate__inner">
		<a class="rg-brand" href="https://cropwatch.io">
			<img src={LOGO} alt="" class="rg-brand__mark" />
			<span class="rg-brand__name">CropWatch<sup>&reg;</sup></span>
		</a>

		<span class="rg-eyebrow">Service availability</span>

		<h1 class="rg-title">CropWatch isn&rsquo;t available in your region&nbsp;yet</h1>

		<p class="rg-lead">
			We don&rsquo;t currently offer service in your area. CropWatch is growing quickly, and we hope
			to bring our industrial environmental monitoring to your region in the future.
		</p>

		<p class="rg-note">Thank you for your interest &mdash; please check back soon.</p>

		<div class="flex flex-col gap-5">
			<a
				class="btn btn--outline-light btn--lg rg-cta"
				href="https://www.linkedin.com/company/71224776"
			>
				Contact us on LinkedIn!
			</a>
			<a class="btn btn--outline-light btn--lg rg-cta" href="https://x.com/CropWatchJapan">
				Contact us on X!
			</a>
		</div>
	</div>
</section>

<style>
	.region-gate {
		position: relative;
		flex: 1 1 auto;
		min-height: 100dvh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 3rem 1.5rem;
		overflow: hidden;
		background: linear-gradient(160deg, var(--cw-navy-900), var(--cw-ink) 58%, var(--cw-navy-950));
		color: #fff;
		isolation: isolate;
	}

	/* soft brand-colour light wash, matched to the site hero */
	.region-gate__wash {
		position: absolute;
		inset: 0;
		z-index: -1;
		background:
			radial-gradient(circle at 14% 8%, rgba(44, 108, 183, 0.32), transparent 55%),
			radial-gradient(circle at 100% 100%, rgba(14, 153, 96, 0.22), transparent 52%);
	}

	.region-gate__inner {
		width: 100%;
		max-width: 40rem;
		text-align: center;
	}

	.rg-brand {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 2.25rem;
	}

	.rg-brand__mark {
		width: 52px;
		height: 52px;
	}

	.rg-brand__name {
		font-weight: 800;
		font-style: italic;
		font-size: 24px;
		color: #fff;
		letter-spacing: 0.01em;
	}

	.rg-brand__name sup {
		font-size: 0.5em;
		font-style: normal;
		vertical-align: super;
	}

	.rg-eyebrow {
		display: inline-block;
		font-size: 13px;
		font-weight: 700;
		letter-spacing: var(--cw-tracking-eyebrow, 0.22em);
		text-transform: uppercase;
		color: var(--cw-gold-400);
		margin-bottom: 1rem;
	}

	.rg-title {
		font-size: clamp(1.9rem, 5.5vw, 3rem);
		line-height: 1.18;
		font-weight: 800;
		letter-spacing: -0.01em;
		margin: 0 0 1.25rem;
		color: #fff;
		text-wrap: balance;
	}

	.rg-lead {
		font-size: clamp(1rem, 2.4vw, 1.125rem);
		line-height: 1.8;
		color: var(--cw-ice-100);
		margin: 0 auto 0.75rem;
		max-width: 34rem;
	}

	.rg-note {
		font-size: 15px;
		line-height: 1.7;
		color: var(--web-on-ink-muted);
		margin: 0 0 2.25rem;
	}

	.rg-cta {
		text-decoration: none;
	}
</style>
