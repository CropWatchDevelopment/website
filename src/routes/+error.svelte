<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} · CropWatch</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="pagehero">
	<div class="wrap">
		<p class="eyebrow">Error {page.status}</p>
		<h1>{page.status === 404 ? "We couldn't find that page." : 'Something went wrong.'}</h1>
		<p>{page.error?.message ?? 'An unexpected error occurred.'}</p>
		<div class="hero__ctas" style="margin-top:26px">
			<a href="/" class="cta-pill cta-pill--lg"><span>Back to home</span> <span class="material-symbols-rounded">arrow_forward</span></a>
			<a href="/contact" class="cta-ghost cta-pill--lg"><span class="material-symbols-rounded">call</span> <span>Contact us</span></a>
		</div>
	</div>
</section>
