<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Telephone from './Telephone.svelte';

	let year = $derived(new Date().getFullYear());
</script>

<footer
	class="relative overflow-hidden bg-gradient-to-b from-[var(--cw-blue-700)] via-[var(--cw-blue-900)] to-[var(--cw-blue-950)] text-white"
>
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_65%)] opacity-70"
		aria-hidden="true"
	></div>
	<div
		class="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--cw-gold-500)] to-transparent opacity-70"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto w-full max-w-6xl px-4 py-16">
		<div class="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
			<section class="space-y-4">
				<h2 class="text-lg font-semibold uppercase tracking-wide text-white/80">{$_('footer.about.heading')}</h2>
				<p class="text-sm leading-relaxed text-white/80">
					{$_('footer.about.body')}
				</p>
				<p class="text-sm leading-relaxed text-white/70">
					{$_('footer.about.sub_body')}
				</p>
				<!-- <p class="text-sm text-white/60">
					{$_('footer.about.phone_label')}
					<a href="tel:+18135550123" class="font-semibold text-white transition hover:text-[#f2a516]">
						{$_('footer.about.phone_number')}
					</a>
				</p> -->
				<Telephone hideIcon={true} />
				<a
					href="/contact"
					class="inline-flex items-center gap-2 rounded-full bg-[var(--cw-gold-500)] px-4 py-2 text-sm font-semibold text-[var(--cw-blue-950)] transition hover:bg-[var(--cw-gold-400)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cw-gold-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cw-blue-900)]"
				>
					{$_('footer.about.cta')}
				</a>
			</section>

			<nav aria-label={$_('footer.link_groups.socials.title')} class="space-y-3">
				<h3 class="text-sm font-semibold uppercase tracking-wide text-white/70">{$_('footer.link_groups.socials.title')}</h3>
				<ul class="space-y-2 text-sm text-white/75">
					<li>
						<a class="transition hover:text-[#f2a516]" target="_blank" href="https://www.linkedin.com/company/cropwatch-system">
							{$_('footer.link_groups.socials.links.linkedin')}
						</a>
					</li>
					<li>
						<a class="transition hover:text-[#f2a516]" target="_blank" href="https://www.youtube.com/@cropwatch4407">
							{$_('footer.link_groups.socials.links.youtube')}
						</a>
					</li>
					<li>
						<a class="transition hover:text-[#f2a516]" target="_blank" href="https://github.com/CropWatchDevelopment">
							{$_('footer.link_groups.socials.links.github')}
						</a>
					</li>
				</ul>
			</nav>

			<nav aria-label={$_('footer.link_groups.products.title')} class="space-y-3">
				<h3 class="text-sm font-semibold uppercase tracking-wide text-white/70">{$_('footer.link_groups.products.title')}</h3>
				<ul class="space-y-2 text-sm text-white/75">
					<li>
						<a class="transition hover:text-[#f2a516]" href="/products/cw-air-th">
							{$_('footer.link_groups.products.links.cw-air-th')}
						</a>
					</li>
					<li>
						<a class="transition hover:text-[#f2a516]" href="/products/gateways">
							{$_('footer.link_groups.products.links.gateways')}
						</a>
					</li>
					<li>
						<a class="transition hover:text-[#f2a516]" href="/products/coming-soon">
							{$_('footer.link_groups.products.links.analytics')}
						</a>
					</li>
				</ul>
			</nav>

			<nav aria-label={$_('footer.link_groups.connect.title')} class="space-y-3">
				<h3 class="text-sm font-semibold uppercase tracking-wide text-white/70">{$_('footer.link_groups.connect.title')}</h3>
				<ul class="space-y-2 text-sm text-white/75">
					<li>
						<a class="transition hover:text-[#f2a516]" href="/contact">
							{$_('footer.link_groups.connect.links.contact')}
						</a>
					</li>
					<li>
						<a class="transition hover:text-[#f2a516]" href="/case-studies">
							{$_('footer.link_groups.connect.links.case_studies')}
						</a>
					</li>
					<li>
						<a class="transition hover:text-[#f2a516]" href="/faq">
							{$_('footer.link_groups.connect.links.faq')}
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>

	<div class="relative border-t border-white/10 bg-[var(--cw-blue-950)]">
		<div class="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
			<p>{$_('footer.legal.copyright', { values: { year } })}</p>
			<ul class="flex flex-wrap items-center gap-3">
				<li class="flex items-center gap-3">
					<a class="transition hover:text-[#f2a516]" href="/legal/privacy-policy">{$_('footer.legal.links.privacy')}</a>
				</li>
				<li class="flex items-center gap-3">
					<span aria-hidden="true" class="text-white/40">|</span>
					<a class="transition hover:text-[#f2a516]" href="/legal/terms-of-service">{$_('footer.legal.links.terms')}</a>
				</li>
				<li class="flex items-center gap-3">
					<span aria-hidden="true" class="text-white/40">|</span>
					<a class="transition hover:text-[#f2a516]" href="/sitemap">{$_('footer.legal.links.sitemap')}</a>
				</li>
			</ul>
		</div>
	</div>
</footer>
