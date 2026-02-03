<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { sitemapSections as sections } from '$lib/data/sitemap';
</script>

<svelte:head>
	<title>{$_('sitemap.meta.title')}</title>
	<meta name="description" content={$_('sitemap.meta.description')} />
</svelte:head>

<section class="bg-[#0b1730] py-20 text-white">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
			{$_('sitemap.hero.eyebrow')}
		</p>
		<h1 class="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
			{$_('sitemap.hero.headline')}
		</h1>
		<p class="mt-4 max-w-2xl text-base text-white/80">
			{$_('sitemap.hero.body')}
		</p>
	</div>
</section>

<section class="bg-white py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
			{#each sections as section (section.headingKey)}
				<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 shadow-sm shadow-[#0b1730]/5">
					<h2 class="text-sm font-semibold tracking-[0.22em] text-[#2f5387] uppercase">
						{$_(section.headingKey)}
					</h2>
					<ul class="mt-4 space-y-3 text-sm text-[#1c2d52]/80">
						{#each section.links as link (link.href)}
							<li>
								<a
									href={link.href}
									class="inline-flex items-center gap-2 text-[#2f5387] transition hover:text-[#0b1730]"
								>
									<span>{$_(link.labelKey)}</span>
									<span aria-hidden="true">→</span>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

