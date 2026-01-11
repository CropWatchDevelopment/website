<script lang="ts">
	import MaterialIcon from '$lib/components/MaterialIcon.svelte';
	import PricingEn from '$lib/components/pricing/PricingEn.svelte';
	import PricingJa from '$lib/components/pricing/PricingJa.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import StandardsBanner from '$lib/components/StandardsBanner.svelte';
	import { _, json, locale } from 'svelte-i18n';

	type ProofPoint = {
		id: string;
		labelKey: string;
		headlineKey: string;
		bulletKeys: string[];
		link?: { labelKey: string; href: string };
	};

	// Derive proof points from i18n structure
	const proofPoints = $derived.by(() => {
		const proofPointData = $json('home.proof_points') as Record<
			string,
			{ bullets?: Record<string, unknown>; link?: { href: string } }
		> | null;
		if (!proofPointData) return [] as ProofPoint[];

		return Object.keys(proofPointData).map((key) => {
			const pointData = proofPointData[key];
			return {
				id: key,
				labelKey: `home.proof_points.${key}.eyebrow`,
				headlineKey: `home.proof_points.${key}.headline`,
				bulletKeys: pointData?.bullets
					? Object.keys(pointData.bullets).map((i) => `home.proof_points.${key}.bullets.${i}`)
					: [],
				link: pointData?.link?.href
					? { labelKey: `home.proof_points.${key}.link.label`, href: pointData.link.href }
					: undefined
			} satisfies ProofPoint;
		});
	});

	// Derive hero content from i18n structure
	const heroContent = $derived.by(() => {
		const heroQuestions = $json('home.hero.questions');
		const sidebarItems = $json('home.hero.sidebar.items');

		return {
			eyebrowKey: 'home.hero.eyebrow',
			headlineKey: 'home.hero.headline_html',
			bodyKey: 'home.hero.body_html',
			questions: heroQuestions
				? Object.keys(heroQuestions).map((i) => `home.hero.questions.${i}`)
				: [],
			primaryCtaKey: 'home.hero.primary_cta',
			secondaryCtaKey: 'home.hero.secondary_cta',
			sidebar: {
				titleKey: 'home.hero.sidebar.title',
				items: sidebarItems
					? Object.keys(sidebarItems).map((key) => ({
							termKey: `home.hero.sidebar.items.${key}.term`,
							valueKey: `home.hero.sidebar.items.${key}.value_html`
						}))
					: []
			}
		} as const;
	});

	// Derive ROI snapshot from i18n structure
	const roiSnapshot = $derived.by(() => {
		const manualBullets = $json('home.hero.sidebar.comparison.manual.bullets');
		const automatedBullets = $json('home.hero.sidebar.comparison.automated.bullets');
		const stats = $json('home.hero.sidebar.stats');
		const productivityBullets = $json('home.hero.sidebar.productivity.bullets');

		return {
			manualCard: {
				titleKey: 'home.hero.sidebar.comparison.manual.title',
				bulletKeys: manualBullets
					? Object.keys(manualBullets).map(
							(i) => `home.hero.sidebar.comparison.manual.bullets.${i}`
						)
					: []
			},
			automatedCard: {
				titleKey: 'home.hero.sidebar.comparison.automated.title',
				bulletKeys: automatedBullets
					? Object.keys(automatedBullets).map(
							(i) => `home.hero.sidebar.comparison.automated.bullets.${i}`
						)
					: []
			},
			stats: stats
				? Object.keys(stats).map((key) => ({
						titleKey: `home.hero.sidebar.stats.${key}.title`,
						valueKey: `home.hero.sidebar.stats.${key}.value`,
						bodyKey: `home.hero.sidebar.stats.${key}.body`
					}))
				: [],
			productivity: {
				titleKey: 'home.hero.sidebar.productivity.title',
				bulletKeys: productivityBullets
					? Object.keys(productivityBullets).map(
							(i) => `home.hero.sidebar.productivity.bullets.${i}`
						)
					: []
			}
		};
	});

	// Icons mapped to industry keys
	const industryIcons: Record<string, string> = {
		cold_chain: '🧊',
		protein: '🖼️',
		hospitality: '🐔',
		manufacturing: '🏭',
		storage: '📦',
		agriculture: '🧓'
	};

	// Derive industries from i18n structure
	const industriesServed = $derived.by(() => {
		const industries = $json('home.industries.cards');
		if (!industries) return [];

		return Object.keys(industries).map((key) => ({
			icon: industryIcons[key] || '❓',
			labelKey: `home.industries.cards.${key}.label`,
			descriptionKey: `home.industries.cards.${key}.description`
		}));
	});

	const industriesSection = {
		eyebrowKey: 'home.industries.eyebrow',
		headlineKey: 'home.industries.headline',
		introKey: 'home.industries.intro'
	} as const;

	const closingCtas = {
		eyebrowKey: 'home.closing.eyebrow',
		headlineKey: 'home.closing.headline',
		bodyKey: 'home.closing.body',
		primaryKey: 'home.closing.primary_cta',
		secondaryKey: 'home.closing.secondary_cta'
	} as const;
</script>

<svelte:head>
	<title>{$_('home.meta.title')}</title>
	<meta name="description" content={$_('home.meta.description')} />
</svelte:head>

<section id="slider" class="bg-[#11213c]">
	<Slider />
	<StandardsBanner />
</section>

<section class="relative overflow-hidden bg-white py-10">
	<div
		class="absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-[#11213c]/10 to-transparent"
		aria-hidden="true"
	></div>
	<div class="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4">
		<div class="grid gap-12 md:grid-cols-[1.35fr_1fr] md:items-start">
			<div class="flex h-full flex-col gap-6">
				<p class="text-sm font-semibold tracking-[0.22em] text-[#2f5387] uppercase">
					{$_(heroContent.eyebrowKey)}
				</p>
				<h1 class="text-4xl font-semibold tracking-tight text-[#0b1730] md:text-5xl">
					{@html $_(heroContent.headlineKey)}
				</h1>
				<p class="text-lg leading-relaxed text-[#15284a]/80">
					{@html $_(heroContent.bodyKey)}
				</p>
				<div
					class="grid gap-3 rounded-2xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 text-sm text-[#1c2d52] md:grid-cols-2"
				>
					{#each heroContent.questions as questionKey (questionKey)}
						<div class="flex items-start gap-3">
							<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
							<p>{$_(questionKey)}</p>
						</div>
					{/each}
				</div>

				<!--VIDEO EXAMPLES SECTION-->

				<div class="mt-auto flex flex-wrap gap-3">
					<a
						href="/contact"
						class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5387]"
					>
						{$_(heroContent.primaryCtaKey)}
					</a>
					<a
						href="/case-studies"
						class="inline-flex items-center gap-2 rounded-full border border-[#d7e0f5] px-6 py-3 text-sm font-semibold text-[#2f5387] transition hover:border-[#2f5387] hover:text-[#2f5387] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5387]"
					>
						{$_(heroContent.secondaryCtaKey)}
					</a>
				</div>
			</div>
			<div
				class="h-full rounded-3xl border border-[#d7e0f5] bg-white p-8 shadow-lg shadow-[#0b1730]/5"
			>
				<h2 class="text-lg font-semibold text-[#0b1730]">{$_(heroContent.sidebar.titleKey)}</h2>
				<hr class="my-4 border-[#d7e0f5]" />
				<div class="space-y-6 text-sm text-[#1c2d52]">
					<div class="grid gap-4 sm:grid-cols-2">
						<div class="rounded-2xl border border-[#d7e0f5] bg-[#f5f7fb] p-5">
							<p class="text-xs font-semibold tracking-[0.22em] text-[#2f5387] uppercase">
								{$_(roiSnapshot.manualCard.titleKey)}
							</p>
							<ul class="mt-4 space-y-3 text-[#1c2d52]/80">
								{#each roiSnapshot.manualCard.bulletKeys as bulletKey (bulletKey)}
									<li>{$_(bulletKey)}</li>
								{/each}
							</ul>
						</div>
						<div class="rounded-2xl border border-transparent bg-[#0b1730] p-5 text-white">
							<p class="text-xs font-semibold tracking-[0.22em] text-[#f2a516] uppercase">
								{$_(roiSnapshot.automatedCard.titleKey)}
							</p>
							<ul class="mt-4 space-y-3 text-white/80">
								{#each roiSnapshot.automatedCard.bulletKeys as bulletKey (bulletKey)}
									<li>{$_(bulletKey)}</li>
								{/each}
							</ul>
						</div>
					</div>
					<div class="grid gap-4 sm:grid-cols-2">
						{#each roiSnapshot.stats as stat (stat.titleKey)}
							<div class="rounded-2xl border border-[#d7e0f5] bg-white p-5">
								<p class="text-xs font-semibold tracking-[0.22em] text-[#2f5387] uppercase">
									{$_(stat.titleKey)}
								</p>
								<p class="mt-2 text-2xl font-semibold text-[#0b1730]">{$_(stat.valueKey)}</p>
								<p class="mt-2 text-[#1c2d52]/70">{$_(stat.bodyKey)}</p>
							</div>
						{/each}
					</div>
					<div class="rounded-2xl border border-[#d7e0f5] bg-[#f5f7fb] p-5">
						<p class="text-xs font-semibold tracking-[0.22em] text-[#2f5387] uppercase">
							{$_(roiSnapshot.productivity.titleKey)}
						</p>
						<ul class="mt-3 space-y-3 text-[#1c2d52]/80">
							{#each roiSnapshot.productivity.bulletKeys as bulletKey (bulletKey)}
								<li>{$_(bulletKey)}</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</div>

		<section
			class="grid gap-8 rounded-3xl border border-[#d7e0f5] bg-[#0b1730] px-6 py-10 md:grid-cols-3 md:px-10"
		>
			{#each proofPoints as card (card.id)}
				<article class="flex flex-col space-y-4 text-white/90">
					<p class="text-xs font-semibold tracking-[0.22em] text-[#f2a516] uppercase">
						{$_(card.labelKey)}
					</p>
					<h3 class="text-xl font-semibold text-white">{$_(card.headlineKey)}</h3>
					<ul class="space-y-3 text-sm leading-relaxed">
						{#each card.bulletKeys as bulletKey (bulletKey)}
							<li class="flex items-start gap-2">
								<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
								<span>{$_(bulletKey)}</span>
							</li>
						{/each}
					</ul>
					<span class="flex-grow"></span>
					{#if card.link}
						<a
							class="inline-flex items-center gap-2 text-sm font-semibold text-[#f2a516] transition hover:text-white"
							href={card.link.href}
						>
							{$_(card.link.labelKey)}
							<span aria-hidden="true">→</span>
						</a>
					{/if}
				</article>
			{/each}
		</section>
	</div>
</section>

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="mb-12 text-center">
			<p class="text-xs font-semibold tracking-[0.32em] text-[#2f5387] uppercase">
				{$_(industriesSection.eyebrowKey)}
			</p>
			<h2 class="mt-4 text-3xl font-semibold text-[#0b1730]">
				{$_(industriesSection.headlineKey)}
			</h2>
			<p class="mt-3 text-base text-[#1c2d52]/80">
				{$_(industriesSection.introKey)}
			</p>
		</div>
		<div class="grid gap-6 md:grid-cols-3">
			{#each industriesServed as industry (industry.labelKey)}
				<div
					class="rounded-3xl border border-[#d7e0f5] bg-white p-6 text-center shadow-sm shadow-[#0b1730]/5 transition hover:-translate-y-1 hover:shadow-md"
				>
					<div class="text-3xl">{industry.icon}</div>
					<p class="mt-4 text-base font-semibold text-[#0b1730]">{$_(industry.labelKey)}</p>
					<p class="mt-2 text-sm text-[#1c2d52]/70">{$_(industry.descriptionKey)}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-white py-20">
	{#if ($locale ?? 'en') === 'ja'}
		<PricingJa />
	{:else}
		<PricingEn />
	{/if}
</section>

<section class="relative overflow-hidden bg-[#0b1730] py-20">
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]"
		aria-hidden="true"
	></div>
	<div class="relative mx-auto w-full max-w-5xl px-4 text-center text-white">
		<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
			{$_(closingCtas.eyebrowKey)}
		</p>
		<h2 class="mt-5 text-3xl font-semibold md:text-4xl">
			{@html $_(closingCtas.headlineKey)}
		</h2>
		<p class="mt-4 text-base text-white/80">
			{$_(closingCtas.bodyKey)}
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<a
				href="/contact"
				class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
			>
				{$_(closingCtas.primaryKey)}
			</a>
			<a
				href="/case-studies"
				class="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
			>
				{$_(closingCtas.secondaryKey)}
			</a>
		</div>
	</div>
</section>
