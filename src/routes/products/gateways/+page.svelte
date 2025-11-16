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

<section class="relative overflow-hidden bg-[#0b1730] py-20 text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(47,83,135,0.45),rgba(10,20,40,0.8))]" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
			<div class="space-y-6">
				<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#f2a516]">
					{$_('products.gateways.hero.eyebrow')}
				</p>
				<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">
					{$_('products.gateways.hero.headline')}
				</h1>
				<p class="text-base text-white/80 md:text-lg">
					{$_('products.gateways.hero.body')}
				</p>
				<div class="flex flex-wrap gap-3">
					<a
						href="/contact"
						class="inline-flex items-center justify-center rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
					>
						{$_('products.gateways.hero.primary_cta')}
					</a>
					<a
						href="#lineup"
						class="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
					>
						{$_('products.gateways.hero.secondary_cta')}
					</a>
				</div>
			</div>
			<div class="rounded-3xl border border-white/15 bg-white/5 p-8 shadow-xl shadow-black/30 backdrop-blur">
				<dl class="space-y-6">
					{#each heroStats as stat (stat.labelKey)}
						<div>
							<dt class="text-sm uppercase tracking-[0.25em] text-white/60">
								{$_(stat.labelKey)}
							</dt>
							<dd class="mt-2 text-4xl font-semibold text-white md:text-5xl">
								{$_(stat.valueKey)}
							</dd>
						</div>
					{/each}
				</dl>
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-16">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-6 md:grid-cols-3">
			{#each highlightCards as card (card.titleKey)}
				<article class="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm">
					<h3 class="text-lg font-semibold text-[#0b1730]">{$_(card.titleKey)}</h3>
					<p class="mt-3 text-sm text-slate-600">{$_(card.bodyKey)}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<section id="lineup" class="bg-[#f8fafc] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="mx-auto max-w-3xl text-center">
			<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#0b1730]">
				{$_('products.gateways.lineup.eyebrow')}
			</p>
			<h2 class="mt-3 text-3xl font-semibold text-[#0b1730] md:text-4xl">
				{$_('products.gateways.lineup.headline')}
			</h2>
			<p class="mt-4 text-base text-slate-600">
				{$_('products.gateways.lineup.intro')}
			</p>
		</div>
		<div class="mt-12 grid gap-8 lg:grid-cols-2">
			{#each gatewayLineup as gateway (gateway.nameKey)}
				<article class="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
					<div class="relative h-56 w-full overflow-hidden bg-slate-100">
						<img
							src={gateway.image}
							alt={$_(gateway.imageAltKey)}
							loading="lazy"
							class="h-full w-full object-cover"
						/>
					</div>
					<div class="flex flex-1 flex-col gap-4 p-6">
						<div class="flex flex-wrap items-center justify-between gap-4">
							<h3 class="text-2xl font-semibold text-[#0b1730]">
								{$_(gateway.nameKey)}
							</h3>
							<span class="inline-flex items-center rounded-full bg-[#fdf3d7] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#8f5803]">
								{$_(gateway.placementKey)}
							</span>
						</div>
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-500">
								{$_('products.gateways.lineup.fields.manufacturer')}
							</p>
							<p class="text-base font-medium text-slate-900">
								{$_(gateway.manufacturerKey)}
							</p>
						</div>
						<p class="text-sm text-slate-600">
							{$_(gateway.summaryKey)}
						</p>
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-500">
								{$_('products.gateways.lineup.fields.recommended')}
							</p>
							<ul class="mt-3 space-y-2 text-sm text-slate-700">
								{#each gateway.recommendedKeys as recKey (recKey)}
									<li class="flex gap-2">
										<span class="text-[#f2a516]">•</span>
										<span>{$_(recKey)}</span>
									</li>
								{/each}
							</ul>
						</div>
						<div class="mt-auto border-t border-slate-100 pt-4">
							<a
								href={gateway.website}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex w-full items-center justify-center rounded-2xl bg-[#0b1730] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#152a52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2a516]"
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

<section class="bg-[#11213c] py-20 text-white">
	<div class="mx-auto w-full max-w-5xl px-4 text-center">
		<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#f2a516]">
			{$_('products.gateways.cta.eyebrow')}
		</p>
		<h2 class="mt-3 text-3xl font-semibold md:text-4xl">
			{$_('products.gateways.cta.headline')}
		</h2>
		<p class="mt-4 text-base text-white/80">
			{$_('products.gateways.cta.body')}
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<a
				href="/contact"
				class="inline-flex items-center justify-center rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
			>
				{$_('products.gateways.cta.primary_cta')}
			</a>
			<a
				href="/contact#details"
				class="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
			>
				{$_('products.gateways.cta.secondary_cta')}
			</a>
		</div>
	</div>
</section>
