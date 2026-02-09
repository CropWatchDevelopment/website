<script lang="ts">
	import { _ } from 'svelte-i18n';
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
			<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 shadow-sm shadow-[#0b1730]/5">
				<h2 class="text-sm font-semibold tracking-[0.22em] text-[#2f5387] uppercase">
					{$_('sitemap.sections.primary.heading')}
				</h2>
				<ul class="mt-4 space-y-3 text-sm text-[#1c2d52]/80">
					<li>
						<a
							href="/"
							class="inline-flex items-center gap-2 text-[#2f5387] transition hover:text-[#0b1730]"
						>
							<span>{$_('header.navigation.home')}</span>
							<span aria-hidden="true">→</span>
						</a>
					</li>
					<li>
						<a
							href="/products/cw-air-th"
							class="inline-flex items-center gap-2 text-[#2f5387] transition hover:text-[#0b1730]"
						>
							<span>{$_('header.navigation.products')}</span>
							<span aria-hidden="true">→</span>
						</a>
					</li>
					<li>
						<a
							href="/case-studies"
							class="inline-flex items-center gap-2 text-[#2f5387] transition hover:text-[#0b1730]"
						>
							<span>{$_('header.navigation.case_studies')}</span>
							<span aria-hidden="true">→</span>
						</a>
					</li>
					<li>
						<a
							href="/about"
							class="inline-flex items-center gap-2 text-[#2f5387] transition hover:text-[#0b1730]"
						>
							<span>{$_('header.navigation.about')}</span>
							<span aria-hidden="true">→</span>
						</a>
					</li>
					<li>
						<a
							href="/contact"
							class="inline-flex items-center gap-2 text-[#2f5387] transition hover:text-[#0b1730]"
						>
							<span>{$_('header.navigation.contact')}</span>
							<span aria-hidden="true">→</span>
						</a>
					</li>
				</ul>
			</div>

			<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 shadow-sm shadow-[#0b1730]/5">
				<h2 class="text-sm font-semibold tracking-[0.22em] text-[#2f5387] uppercase">
					{$_('sitemap.sections.resources.heading')}
				</h2>
				<ul class="mt-4 space-y-3 text-sm text-[#1c2d52]/80">
					<li>
						<a
							href="https://stats.uptimerobot.com/1Z6H85HuHq"
							class="inline-flex items-center gap-2 text-[#2f5387] transition hover:text-[#0b1730]"
						>
							<span>{$_('header.utility.system_status')}</span>
							<span aria-hidden="true">→</span>
						</a>
					</li>
					<li>
						<a
							href="https://app.cropwatch.io/"
							class="inline-flex items-center gap-2 text-[#2f5387] transition hover:text-[#0b1730]"
						>
							<span>{$_('header.utility.ui_app')}</span>
							<span aria-hidden="true">→</span>
						</a>
					</li>
					<li>
						<a
							href="/technology/lorawan"
							class="inline-flex items-center gap-2 text-[#2f5387] transition hover:text-[#0b1730]"
						>
							<span>{$_('sitemap.links.lorawan')}</span>
							<span aria-hidden="true">→</span>
						</a>
					</li>
					<li>
						<a
							href="/case-studies"
							class="inline-flex items-center gap-2 text-[#2f5387] transition hover:text-[#0b1730]"
						>
							<span>{$_('sitemap.links.case_study_archive')}</span>
							<span aria-hidden="true">→</span>
						</a>
					</li>
				</ul>
			</div>

			<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 shadow-sm shadow-[#0b1730]/5">
				<h2 class="text-sm font-semibold tracking-[0.22em] text-[#2f5387] uppercase">
					{$_('sitemap.sections.support.heading')}
				</h2>
				<ul class="mt-4 space-y-3 text-sm text-[#1c2d52]/80">
					<li>
						<a
							href="/contact"
							class="inline-flex items-center gap-2 text-[#2f5387] transition hover:text-[#0b1730]"
						>
							<span>{$_('common.actions.contact')}</span>
							<span aria-hidden="true">→</span>
						</a>
					</li>
					<li>
						<a
							href="/#pricing"
							class="inline-flex items-center gap-2 text-[#2f5387] transition hover:text-[#0b1730]"
						>
							<span>{$_('sitemap.links.pricing')}</span>
							<span aria-hidden="true">→</span>
						</a>
					</li>
					<li>
						<a
							href="/faq"
							class="inline-flex items-center gap-2 text-[#2f5387] transition hover:text-[#0b1730]"
						>
							<span>{$_('sitemap.links.faq')}</span>
							<span aria-hidden="true">→</span>
						</a>
					</li>
					<li>
						<a
							href="/sitemap"
							class="inline-flex items-center gap-2 text-[#2f5387] transition hover:text-[#0b1730]"
						>
							<span>{$_('sitemap.links.sitemap')}</span>
							<span aria-hidden="true">→</span>
						</a>
					</li>
				</ul>
			</div>

			<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 shadow-sm shadow-[#0b1730]/5">
				<h2 class="text-sm font-semibold tracking-[0.22em] text-[#2f5387] uppercase">
					{$_('sitemap.sections.legal.heading')}
				</h2>
				<ul class="mt-4 space-y-3 text-sm text-[#1c2d52]/80">
					<li>
						<a
							href="/legal/terms-of-service"
							class="inline-flex items-center gap-2 text-[#2f5387] transition hover:text-[#0b1730]"
						>
							<span>{$_('sitemap.links.terms')}</span>
							<span aria-hidden="true">→</span>
						</a>
					</li>
					<li>
						<a
							href="/legal/privacy-policy"
							class="inline-flex items-center gap-2 text-[#2f5387] transition hover:text-[#0b1730]"
						>
							<span>{$_('sitemap.links.privacy')}</span>
							<span aria-hidden="true">→</span>
						</a>
					</li>
					<li>
						<a
							href="/robots.txt"
							class="inline-flex items-center gap-2 text-[#2f5387] transition hover:text-[#0b1730]"
						>
							<span>{$_('sitemap.links.robots')}</span>
							<span aria-hidden="true">→</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>
