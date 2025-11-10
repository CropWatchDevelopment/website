<script lang="ts">
	import { _ } from 'svelte-i18n';

	type CaseStudy = {
		id: string;
		companyKey: string;
		industryKey: string;
		recapKey: string;
		badgeKey: string;
		stats: { valueKey: string; labelKey: string }[];
	};

	const caseStudies: CaseStudy[] = [
		{
			id: 'sunharvest',
			companyKey: 'case_studies.featured.cases.sunharvest.company',
			industryKey: 'case_studies.featured.cases.sunharvest.industry',
			recapKey: 'case_studies.featured.cases.sunharvest.recap',
			badgeKey: 'case_studies.featured.cases.sunharvest.badge',
			stats: [
				{
					valueKey: 'case_studies.featured.cases.sunharvest.stats.0.value',
					labelKey: 'case_studies.featured.cases.sunharvest.stats.0.label'
				},
				{
					valueKey: 'case_studies.featured.cases.sunharvest.stats.1.value',
					labelKey: 'case_studies.featured.cases.sunharvest.stats.1.label'
				}
			]
		},
		{
			id: 'harborline',
			companyKey: 'case_studies.featured.cases.harborline.company',
			industryKey: 'case_studies.featured.cases.harborline.industry',
			recapKey: 'case_studies.featured.cases.harborline.recap',
			badgeKey: 'case_studies.featured.cases.harborline.badge',
			stats: [
				{
					valueKey: 'case_studies.featured.cases.harborline.stats.0.value',
					labelKey: 'case_studies.featured.cases.harborline.stats.0.label'
				},
				{
					valueKey: 'case_studies.featured.cases.harborline.stats.1.value',
					labelKey: 'case_studies.featured.cases.harborline.stats.1.label'
				}
			]
		},
		{
			id: 'kodiak',
			companyKey: 'case_studies.featured.cases.kodiak.company',
			industryKey: 'case_studies.featured.cases.kodiak.industry',
			recapKey: 'case_studies.featured.cases.kodiak.recap',
			badgeKey: 'case_studies.featured.cases.kodiak.badge',
			stats: [
				{
					valueKey: 'case_studies.featured.cases.kodiak.stats.0.value',
					labelKey: 'case_studies.featured.cases.kodiak.stats.0.label'
				},
				{
					valueKey: 'case_studies.featured.cases.kodiak.stats.1.value',
					labelKey: 'case_studies.featured.cases.kodiak.stats.1.label'
				}
			]
		},
		{
			id: 'greenfield',
			companyKey: 'case_studies.featured.cases.greenfield.company',
			industryKey: 'case_studies.featured.cases.greenfield.industry',
			recapKey: 'case_studies.featured.cases.greenfield.recap',
			badgeKey: 'case_studies.featured.cases.greenfield.badge',
			stats: [
				{
					valueKey: 'case_studies.featured.cases.greenfield.stats.0.value',
					labelKey: 'case_studies.featured.cases.greenfield.stats.0.label'
				},
				{
					valueKey: 'case_studies.featured.cases.greenfield.stats.1.value',
					labelKey: 'case_studies.featured.cases.greenfield.stats.1.label'
				}
			]
		}
	];

	const rolloutPlaybook = [
		{
			stepKey: 'case_studies.playbook.steps.assess.title',
			descriptionKey: 'case_studies.playbook.steps.assess.description'
		},
		{
			stepKey: 'case_studies.playbook.steps.pilot.title',
			descriptionKey: 'case_studies.playbook.steps.pilot.description'
		},
		{
			stepKey: 'case_studies.playbook.steps.scale.title',
			descriptionKey: 'case_studies.playbook.steps.scale.description'
		},
		{
			stepKey: 'case_studies.playbook.steps.optimize.title',
			descriptionKey: 'case_studies.playbook.steps.optimize.description'
		}
	] as const;

	const heroContent = {
		eyebrowKey: 'case_studies.hero.eyebrow',
		headlineKey: 'case_studies.hero.headline',
		introKeys: [
			'case_studies.hero.intro.0',
			'case_studies.hero.intro.1'
		],
		snapshotTitleKey: 'case_studies.hero.snapshot.title',
		snapshotItems: [
			'case_studies.hero.snapshot.items.0',
			'case_studies.hero.snapshot.items.1',
			'case_studies.hero.snapshot.items.2'
		]
	} as const;

	const featuredSection = {
		eyebrowKey: 'case_studies.featured.eyebrow',
		headlineKey: 'case_studies.featured.headline',
		introKey: 'case_studies.featured.intro',
		ctaKey: 'case_studies.featured.cta'
	} as const;

	const playbookSection = {
		eyebrowKey: 'case_studies.playbook.eyebrow',
		headlineKey: 'case_studies.playbook.headline',
		introKey: 'case_studies.playbook.intro'
	} as const;

	const testimony = {
		quoteKey: 'case_studies.testimony.quote',
		personKey: 'case_studies.testimony.person',
		titleKey: 'case_studies.testimony.title'
	} as const;

	const closingCta = {
		eyebrowKey: 'case_studies.closing.eyebrow',
		headlineKey: 'case_studies.closing.headline',
		bodyKey: 'case_studies.closing.body',
		primaryKey: 'case_studies.closing.primary_cta',
		secondaryKey: 'case_studies.closing.secondary_cta'
	} as const;
</script>

<svelte:head>
	<title>{$_('case_studies.meta.title')}</title>
	<meta name="description" content={$_('case_studies.meta.description')} />
</svelte:head>

<section class="relative overflow-hidden bg-[#11213c] py-20 text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#f2a516]">
					{$_(heroContent.eyebrowKey)}
				</p>
				<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">{$_(heroContent.headlineKey)}</h1>
				{#each heroContent.introKeys as introKey}
					<p class="text-base text-white/80">{$_(introKey)}</p>
				{/each}
			</div>
			<div class="rounded-3xl border border-white/20 bg-[#0b1730]/80 p-8 shadow-xl shadow-black/30 backdrop-blur">
				<h2 class="text-lg font-semibold text-white">{$_(heroContent.snapshotTitleKey)}</h2>
				<ul class="mt-6 space-y-4 text-sm text-white/80">
					{#each heroContent.snapshotItems as itemKey}
						<li class="flex items-start gap-3">
							<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
							<span>{$_(itemKey)}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold uppercase tracking-[0.28em] text-[#2f5387]">{$_(featuredSection.eyebrowKey)}</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">{$_(featuredSection.headlineKey)}</h2>
		<p class="mt-4 max-w-3xl text-base text-[#1c2d52]/80">{$_(featuredSection.introKey)}</p>
		<div class="mt-10 grid gap-8 md:grid-cols-2">
			{#each caseStudies as study (study.id)}
				<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-8 shadow-sm shadow-[#0b1730]/5">
					<div class="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-[#2f5387]">
						<span>{$_(study.industryKey)}</span>
						<span class="rounded-full border border-[#2f5387]/40 bg-white/70 px-3 py-1 text-[11px] font-semibold text-[#2f5387]">{$_(study.badgeKey)}</span>
					</div>
					<p class="mt-4 text-2xl font-semibold text-[#0b1730]">{$_(study.companyKey)}</p>
					<p class="mt-3 text-sm text-[#1c2d52]/80">{$_(study.recapKey)}</p>
					<div class="mt-6 grid gap-4 text-sm text-[#1c2d52]/80 md:grid-cols-2">
						{#each study.stats as stat (stat.labelKey)}
							<div class="rounded-2xl border border-[#d7e0f5] bg-white p-4">
								<p class="text-xl font-semibold text-[#0b1730]">{$_(stat.valueKey)}</p>
								<p class="mt-1 text-xs uppercase tracking-[0.18em] text-[#2f5387]">{$_(stat.labelKey)}</p>
							</div>
						{/each}
					</div>
					<a
						href="/contact"
						class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2f5387] transition hover:text-[#f2a516]"
					>
						{$_(featuredSection.ctaKey)}
						<span aria-hidden="true">-></span>
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold uppercase tracking-[0.28em] text-[#2f5387]">{$_(playbookSection.eyebrowKey)}</p>
				<h2 class="text-3xl font-semibold text-[#0b1730]">{$_(playbookSection.headlineKey)}</h2>
				<p class="text-base text-[#1c2d52]/80">{$_(playbookSection.introKey)}</p>
			</div>
			<div class="rounded-3xl border border-[#d7e0f5] bg-white p-8 shadow-sm shadow-[#0b1730]/5">
				<ul class="space-y-6 text-sm text-[#1c2d52]/80">
					{#each rolloutPlaybook as item (item.stepKey)}
						<li class="relative border-l-2 border-[#f2a516]/60 pl-6">
							<div class="absolute -left-[11px] top-1 h-5 w-5 rounded-full border-2 border-[#f2a516] bg-white"></div>
							<p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#2f5387]">{$_(item.stepKey)}</p>
							<p class="mt-1 text-[#1c2d52]/70">{$_(item.descriptionKey)}</p>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="mt-16 rounded-3xl border border-[#d7e0f5] bg-white p-10 shadow-sm shadow-[#0b1730]/5">
			<p class="text-xs font-semibold uppercase tracking-[0.22em] text-[#2f5387]">{$_('case_studies.testimony.eyebrow')}</p>
			<p class="mt-4 text-2xl font-semibold text-[#0b1730]">"{$_(testimony.quoteKey)}"</p>
			<p class="mt-6 text-sm font-semibold text-[#0b1730]">{$_(testimony.personKey)}</p>
			<p class="text-xs uppercase tracking-[0.18em] text-[#2f5387]">{$_(testimony.titleKey)}</p>
		</div>
	</div>
</section>

<section class="relative overflow-hidden bg-[#0b1730] py-20 text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-5xl px-4 text-center">
		<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#f2a516]">{$_(closingCta.eyebrowKey)}</p>
		<h2 class="mt-5 text-3xl font-semibold md:text-4xl">{$_(closingCta.headlineKey)}</h2>
		<p class="mt-4 text-base text-white/80">{$_(closingCta.bodyKey)}</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<a
				href="/contact"
				class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
			>
				{$_(closingCta.primaryKey)}
			</a>
			<a
				href="/demo"
				class="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
			>
				{$_(closingCta.secondaryKey)}
			</a>
		</div>
	</div>
</section>
