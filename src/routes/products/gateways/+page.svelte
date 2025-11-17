<script lang="ts">
	import { _ } from 'svelte-i18n';

	import ug65Image from './images/ug65-lorawan-gateway.png';
	import ug67Image from './images/Milesight-UG67-gateway.png';
	import konaMicroImage from './images/kona-micro.jpg';
	import konaEnterpriseImage from './images/Enterprise-ISO2-copy-1.png';
	import konaMacroImage from './images/Macro-ISO2-1-1.png';
	import kerlinkImage from './images/Pasted-into-1-10.png';

	const heroStats = [
		{
			labelKey: 'products.gateways.hero.stats.0.label',
			valueKey: 'products.gateways.hero.stats.0.value'
		},
		{
			labelKey: 'products.gateways.hero.stats.1.label',
			valueKey: 'products.gateways.hero.stats.1.value'
		},
		{
			labelKey: 'products.gateways.hero.stats.2.label',
			valueKey: 'products.gateways.hero.stats.2.value'
		}
	] as const;

	const highlightCards = [
		{
			titleKey: 'products.gateways.highlights.items.0.title',
			bodyKey: 'products.gateways.highlights.items.0.body'
		},
		{
			titleKey: 'products.gateways.highlights.items.1.title',
			bodyKey: 'products.gateways.highlights.items.1.body'
		},
		{
			titleKey: 'products.gateways.highlights.items.2.title',
			bodyKey: 'products.gateways.highlights.items.2.body'
		}
	] as const;

	const gatewayLineup = [
		{
			nameKey: 'products.gateways.lineup.items.ug65.name',
			manufacturerKey: 'products.gateways.lineup.items.ug65.manufacturer',
			placementKey: 'products.gateways.lineup.items.ug65.placement',
			summaryKey: 'products.gateways.lineup.items.ug65.summary',
			recommendedKeys: [
				'products.gateways.lineup.items.ug65.recommended.0',
				'products.gateways.lineup.items.ug65.recommended.1',
				'products.gateways.lineup.items.ug65.recommended.2'
			],
			image: ug65Image,
			imageAltKey: 'products.gateways.lineup.items.ug65.image_alt',
			website: 'https://www.milesight-iot.com/iot/lorawan-gateway/ug65/'
		},
		{
			nameKey: 'products.gateways.lineup.items.ug67.name',
			manufacturerKey: 'products.gateways.lineup.items.ug67.manufacturer',
			placementKey: 'products.gateways.lineup.items.ug67.placement',
			summaryKey: 'products.gateways.lineup.items.ug67.summary',
			recommendedKeys: [
				'products.gateways.lineup.items.ug67.recommended.0',
				'products.gateways.lineup.items.ug67.recommended.1',
				'products.gateways.lineup.items.ug67.recommended.2'
			],
			image: ug67Image,
			imageAltKey: 'products.gateways.lineup.items.ug67.image_alt',
			website: 'https://www.milesight-iot.com/iot/lorawan-gateway/ug67/'
		},
		{
			nameKey: 'products.gateways.lineup.items.kona_micro.name',
			manufacturerKey: 'products.gateways.lineup.items.kona_micro.manufacturer',
			placementKey: 'products.gateways.lineup.items.kona_micro.placement',
			summaryKey: 'products.gateways.lineup.items.kona_micro.summary',
			recommendedKeys: [
				'products.gateways.lineup.items.kona_micro.recommended.0',
				'products.gateways.lineup.items.kona_micro.recommended.1',
				'products.gateways.lineup.items.kona_micro.recommended.2'
			],
			image: konaMicroImage,
			imageAltKey: 'products.gateways.lineup.items.kona_micro.image_alt',
			website: 'https://tektelic.com/products/kona-micro/'
		},
		{
			nameKey: 'products.gateways.lineup.items.kona_enterprise.name',
			manufacturerKey: 'products.gateways.lineup.items.kona_enterprise.manufacturer',
			placementKey: 'products.gateways.lineup.items.kona_enterprise.placement',
			summaryKey: 'products.gateways.lineup.items.kona_enterprise.summary',
			recommendedKeys: [
				'products.gateways.lineup.items.kona_enterprise.recommended.0',
				'products.gateways.lineup.items.kona_enterprise.recommended.1',
				'products.gateways.lineup.items.kona_enterprise.recommended.2'
			],
			image: konaEnterpriseImage,
			imageAltKey: 'products.gateways.lineup.items.kona_enterprise.image_alt',
			website: 'https://tektelic.com/products/kona-enterprise/'
		},
		{
			nameKey: 'products.gateways.lineup.items.kona_macro.name',
			manufacturerKey: 'products.gateways.lineup.items.kona_macro.manufacturer',
			placementKey: 'products.gateways.lineup.items.kona_macro.placement',
			summaryKey: 'products.gateways.lineup.items.kona_macro.summary',
			recommendedKeys: [
				'products.gateways.lineup.items.kona_macro.recommended.0',
				'products.gateways.lineup.items.kona_macro.recommended.1',
				'products.gateways.lineup.items.kona_macro.recommended.2'
			],
			image: konaMacroImage,
			imageAltKey: 'products.gateways.lineup.items.kona_macro.image_alt',
			website: 'https://tektelic.com/products/kona-macro/'
		},
		{
			nameKey: 'products.gateways.lineup.items.kerlink_istation.name',
			manufacturerKey: 'products.gateways.lineup.items.kerlink_istation.manufacturer',
			placementKey: 'products.gateways.lineup.items.kerlink_istation.placement',
			summaryKey: 'products.gateways.lineup.items.kerlink_istation.summary',
			recommendedKeys: [
				'products.gateways.lineup.items.kerlink_istation.recommended.0',
				'products.gateways.lineup.items.kerlink_istation.recommended.1',
				'products.gateways.lineup.items.kerlink_istation.recommended.2'
			],
			image: kerlinkImage,
			imageAltKey: 'products.gateways.lineup.items.kerlink_istation.image_alt',
			website: 'https://www.seeedstudio.com/SenseCAP-M2-LoRaWAN-Gateway-p-5758.html'
		}
	] as const;
</script>

<svelte:head>
	<title>{$_('products.gateways.meta.title')}</title>
	<meta name="description" content={$_('products.gateways.meta.description')} />
</svelte:head>

<section class="relative isolate overflow-hidden bg-gradient-to-br from-[var(--cw-blue-900)] via-[var(--cw-blue-950)] to-black py-24 text-white">
	<div class="pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_55%)]"></div>
	<div class="pointer-events-none absolute -left-10 top-1/2 h-40 w-40 rounded-full bg-[var(--cw-gold-500)]/20 blur-3xl"></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
			<div class="space-y-7">
				<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--cw-gold-400)]">
					{$_('products.gateways.hero.eyebrow')}
				</p>
				<h1 class="text-4xl font-bold leading-tight md:text-5xl">
					{$_('products.gateways.hero.headline')}
				</h1>
				<p class="text-base text-white/80 md:text-lg">
					{$_('products.gateways.hero.body')}
				</p>
				<div class="flex flex-wrap gap-4">
					<a
						href="/contact"
						class="inline-flex items-center justify-center rounded-full bg-[var(--cw-gold-500)] px-7 py-3 text-sm font-semibold text-[var(--cw-blue-950)] transition hover:bg-[var(--cw-gold-400)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
					>
						{$_('products.gateways.hero.primary_cta')}
					</a>
					<a
						href="#lineup"
						class="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
					>
						{$_('products.gateways.hero.secondary_cta')}
					</a>
				</div>
			</div>
			<div class="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur">
				<dl class="grid gap-6 sm:grid-cols-3">
					{#each heroStats as stat (stat.labelKey)}
						<div class="rounded-2xl bg-white/5 p-4 text-center shadow-inner shadow-white/10">
							<dt class="text-xs uppercase tracking-[0.32em] text-white/60">{$_(stat.labelKey)}</dt>
							<dd class="mt-3 text-3xl font-semibold text-white md:text-4xl">{$_(stat.valueKey)}</dd>
						</div>
					{/each}
				</dl>
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-6 md:grid-cols-3">
			{#each highlightCards as card (card.titleKey)}
				<article class="relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg shadow-slate-200/60">
					<div class="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[var(--cw-blue-600)]/10 blur-3xl"></div>
					<div class="absolute bottom-4 right-4 h-8 w-8 rounded-full bg-[var(--cw-gold-500)]/40 blur-lg"></div>
					<div class="relative">
						<h3 class="text-xl font-semibold text-[var(--cw-blue-900)]">{$_(card.titleKey)}</h3>
						<p class="mt-3 text-sm leading-relaxed text-slate-600">{$_(card.bodyKey)}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<section id="lineup" class="bg-[#f5f7fb] py-24">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="mx-auto max-w-3xl text-center">
			<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--cw-blue-700)]">
				{$_('products.gateways.lineup.eyebrow')}
			</p>
			<h2 class="mt-3 text-3xl font-semibold text-[var(--cw-blue-950)] md:text-4xl">
				{$_('products.gateways.lineup.headline')}
			</h2>
			<p class="mt-4 text-base text-slate-600">
				{$_('products.gateways.lineup.intro')}
			</p>
		</div>
		<div class="mt-14 grid gap-10 lg:grid-cols-2">
			{#each gatewayLineup as gateway (gateway.nameKey)}
				<article class="flex flex-col overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-xl shadow-slate-200/70">
					<div class="relative h-56 w-full overflow-hidden bg-slate-900/5">
						<div class="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
						<img
							src={gateway.image}
							alt={$_(gateway.imageAltKey)}
							loading="lazy"
							class="h-full w-full object-cover"
						/>
					</div>
					<div class="flex flex-1 flex-col gap-5 p-7">
						<div class="flex flex-wrap items-center justify-between gap-4">
							<h3 class="text-2xl font-semibold text-[var(--cw-blue-950)]">
								{$_(gateway.nameKey)}
							</h3>
							<span class="inline-flex items-center rounded-full border border-[var(--cw-gold-500)]/50 bg-[var(--cw-gold-500)]/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--cw-gold-500)]">
								{$_(gateway.placementKey)}
							</span>
						</div>
						<div class="grid gap-2 sm:grid-cols-2">
							<div>
								<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
									{$_('products.gateways.lineup.fields.manufacturer')}
								</p>
								<p class="text-base font-medium text-slate-900">
									{$_(gateway.manufacturerKey)}
								</p>
							</div>
							<div>
								<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
									{$_('products.gateways.lineup.fields.recommended')}
								</p>
								<ul class="mt-3 space-y-1 text-sm text-slate-700">
									{#each gateway.recommendedKeys as recKey (recKey)}
										<li class="flex items-start gap-2">
											<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
											<span>{$_(recKey)}</span>
										</li>
									{/each}
								</ul>
							</div>
						</div>
						<p class="text-sm leading-relaxed text-slate-600">
							{$_(gateway.summaryKey)}
						</p>
						<div class="mt-auto rounded-2xl bg-slate-50 px-4 py-4">
							<a
								href={gateway.website}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--cw-blue-900)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--cw-blue-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cw-gold-500)]"
							>
								{$_('products.gateways.lineup.cta.view_manufacturer')}
							</a>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="relative isolate overflow-hidden bg-gradient-to-br from-[var(--cw-blue-900)] via-[#0b1730] to-black py-24 text-white">
	<div class="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--cw-gold-500)] to-transparent"></div>
	<div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_70%)]"></div>
	<div class="mx-auto w-full max-w-5xl px-4 text-center">
		<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--cw-gold-500)]">
			{$_('products.gateways.cta.eyebrow')}
		</p>
		<h2 class="mt-4 text-3xl font-semibold md:text-4xl">
			{$_('products.gateways.cta.headline')}
		</h2>
		<p class="mt-4 text-base text-white/80">
			{$_('products.gateways.cta.body')}
		</p>
		<div class="mt-10 flex flex-wrap justify-center gap-4">
			<a
				href="/contact"
				class="inline-flex items-center justify-center rounded-full bg-[var(--cw-gold-500)] px-7 py-3 text-sm font-semibold text-[var(--cw-blue-950)] transition hover:bg-[var(--cw-gold-400)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
			>
				{$_('products.gateways.cta.primary_cta')}
			</a>
			<a
				href="/contact#details"
				class="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
			>
				{$_('products.gateways.cta.secondary_cta')}
			</a>
		</div>
	</div>
</section>
