<script lang="ts">
	import { _ } from 'svelte-i18n';

	type SitemapSection = {
		headingKey: string;
		links: { labelKey: string; href: string }[];
	};

	const sections: SitemapSection[] = [
		{
			headingKey: 'sitemap.sections.primary.heading',
			links: [
				{ labelKey: 'header.navigation.home', href: '/' },
				{ labelKey: 'header.navigation.products', href: '/products/cw-air-th' },
				{ labelKey: 'header.navigation.case_studies', href: '/case-studies' },
				{ labelKey: 'header.navigation.about', href: '/about' },
				{ labelKey: 'header.navigation.contact', href: '/contact' }
			]
		},
		{
			headingKey: 'sitemap.sections.resources.heading',
			links: [
				{ labelKey: 'header.utility.system_status', href: 'https://stats.uptimerobot.com/1Z6H85HuHq' },
				{ labelKey: 'header.utility.ui_app', href: 'https://app.cropwatch.io/' },
				{ labelKey: 'sitemap.links.lorawan', href: '/technology/lorawan' },
				{ labelKey: 'sitemap.links.case_study_archive', href: '/case-studies' }
			]
		},
		{
			headingKey: 'sitemap.sections.support.heading',
			links: [
				{ labelKey: 'common.actions.contact', href: '/contact' },
				{ labelKey: 'sitemap.links.pricing', href: '/#pricing' },
				{ labelKey: 'sitemap.links.faq', href: '/faq' },
				{ labelKey: 'sitemap.links.sitemap', href: '/sitemap' }
			]
		},
		{
			headingKey: 'sitemap.sections.legal.heading',
			links: [
				{ labelKey: 'sitemap.links.terms', href: '/legal/terms-of-service' },
				{ labelKey: 'sitemap.links.privacy', href: '/legal/privacy-policy' },
				{ labelKey: 'sitemap.links.robots', href: '/robots.txt' }
			]
		}
	];
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

<section class="bg-[#f5f7fb] py-16">
	<div class="mx-auto w-full max-w-5xl px-4 text-center">
		<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
			{$_('sitemap.cta.eyebrow')}
		</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">
			{$_('sitemap.cta.headline')}
		</h2>
		<p class="mt-4 text-base text-[#1c2d52]/75">
			{$_('sitemap.cta.body')}
		</p>
		<div class="mt-6 flex flex-wrap justify-center gap-3">
			<a
				href="/contact"
				class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34]"
			>
				{$_('sitemap.cta.primary_cta')}
			</a>
			<a
				href="/case-studies"
				class="inline-flex items-center gap-2 rounded-full border border-[#d7e0f5] px-6 py-3 text-sm font-semibold text-[#2f5387] transition hover:border-[#2f5387] hover:text-[#2f5387]"
			>
				{$_('sitemap.cta.secondary_cta')}
			</a>
		</div>
	</div>
</section>
