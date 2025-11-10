<script lang="ts">
	import { _ } from 'svelte-i18n';

	type Milestone = {
		yearKey: string;
		titleKey: string;
		descriptionKey: string;
	};

	const milestones: Milestone[] = [
		{
			yearKey: 'about.history.milestones.2016.year',
			titleKey: 'about.history.milestones.2016.title',
			descriptionKey: 'about.history.milestones.2016.description'
		},
		{
			yearKey: 'about.history.milestones.2018.year',
			titleKey: 'about.history.milestones.2018.title',
			descriptionKey: 'about.history.milestones.2018.description'
		},
		{
			yearKey: 'about.history.milestones.2021.year',
			titleKey: 'about.history.milestones.2021.title',
			descriptionKey: 'about.history.milestones.2021.description'
		},
		{
			yearKey: 'about.history.milestones.2024.year',
			titleKey: 'about.history.milestones.2024.title',
			descriptionKey: 'about.history.milestones.2024.description'
		}
	];

	type Leader = {
		nameKey: string;
		titleKey: string;
		bioKey: string;
	};

	const leadershipTeam: Leader[] = [
		{
			nameKey: 'about.leadership.members.evelyn.name',
			titleKey: 'about.leadership.members.evelyn.title',
			bioKey: 'about.leadership.members.evelyn.bio'
		},
		{
			nameKey: 'about.leadership.members.marcus.name',
			titleKey: 'about.leadership.members.marcus.title',
			bioKey: 'about.leadership.members.marcus.bio'
		},
		{
			nameKey: 'about.leadership.members.priya.name',
			titleKey: 'about.leadership.members.priya.title',
			bioKey: 'about.leadership.members.priya.bio'
		},
		{
			nameKey: 'about.leadership.members.greg.name',
			titleKey: 'about.leadership.members.greg.title',
			bioKey: 'about.leadership.members.greg.bio'
		}
	];

	type ValueEntry = {
		titleKey: string;
		descriptionKey: string;
	};

	const values: ValueEntry[] = [
		{
			titleKey: 'about.values.items.operational_certainty.title',
			descriptionKey: 'about.values.items.operational_certainty.description'
		},
		{
			titleKey: 'about.values.items.human_centered.title',
			descriptionKey: 'about.values.items.human_centered.description'
		},
		{
			titleKey: 'about.values.items.proof_of_value.title',
			descriptionKey: 'about.values.items.proof_of_value.description'
		}
	];

	const heroContent = {
		eyebrowKey: 'about.hero.eyebrow',
		headlineKey: 'about.hero.headline',
		paragraphKeys: [
			'about.hero.paragraphs.0',
			'about.hero.paragraphs.1'
		],
		statCards: [
			{
				titleKey: 'about.hero.stats.uptime.title',
				descriptionKey: 'about.hero.stats.uptime.description'
			},
			{
				titleKey: 'about.hero.stats.hubs.title',
				descriptionKey: 'about.hero.stats.hubs.description'
			}
		]
	} as const;

	const meta = {
		titleKey: 'about.meta.title',
		descriptionKey: 'about.meta.description'
	} as const;

	const heroSidebar = {
		titleKey: 'about.hero.sidebar.title',
		introKey: 'about.hero.sidebar.intro',
		bullets: [
			'about.hero.sidebar.points.0',
			'about.hero.sidebar.points.1',
			'about.hero.sidebar.points.2'
		]
	} as const;

	const historySection = {
		eyebrowKey: 'about.history.eyebrow',
		headlineKey: 'about.history.headline',
		introKey: 'about.history.intro'
	} as const;

	const leadershipSection = {
		eyebrowKey: 'about.leadership.eyebrow',
		headlineKey: 'about.leadership.headline',
		introKey: 'about.leadership.intro'
	} as const;

	const valuesSection = {
		eyebrowKey: 'about.values.eyebrow',
		headlineKey: 'about.values.headline',
		introKey: 'about.values.intro'
	} as const;

	const closingSection = {
		eyebrowKey: 'about.closing.eyebrow',
		headlineKey: 'about.closing.headline',
		bodyKey: 'about.closing.body',
		primaryCtaKey: 'about.closing.primary_cta',
		secondaryCtaKey: 'about.closing.secondary_cta'
	} as const;
</script>

<svelte:head>
	<title>{$_(meta.titleKey)}</title>
	<meta name="description" content={$_(meta.descriptionKey)} />
</svelte:head>

<section class="relative overflow-hidden bg-[#11213c] py-20 text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#f2a516]">{$_(heroContent.eyebrowKey)}</p>
				<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">{$_(heroContent.headlineKey)}</h1>
				{#each heroContent.paragraphKeys as paragraphKey (paragraphKey)}
					<p class="text-base text-white/80">{$_(paragraphKey)}</p>
				{/each}
				<div class="grid gap-4 text-sm text-white/80 md:grid-cols-2">
					<div class="rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
						<p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#f2a516]">{$_(heroContent.statCards[0].titleKey)}</p>
						<p class="mt-2 text-base font-semibold text-white">{$_(heroContent.statCards[0].descriptionKey)}</p>
					</div>
					<div class="rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
						<p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#f2a516]">{$_(heroContent.statCards[1].titleKey)}</p>
						<p class="mt-2 text-base font-semibold text-white">{$_(heroContent.statCards[1].descriptionKey)}</p>
					</div>
				</div>
			</div>
			<div class="rounded-3xl border border-white/20 bg-[#0b1730]/80 p-8 shadow-xl shadow-black/30 backdrop-blur">
				<h2 class="text-lg font-semibold text-white">{$_(heroSidebar.titleKey)}</h2>
				<p class="mt-3 text-sm text-white/70">{$_(heroSidebar.introKey)}</p>
				<ul class="mt-6 space-y-4 text-sm text-white/80">
					{#each heroSidebar.bullets as bulletKey (bulletKey)}
						<li class="flex items-start gap-3">
							<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
							<span>{$_(bulletKey)}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-10 md:grid-cols-[1.2fr_1fr]">
			<div class="space-y-6">
				<p class="text-xs font-semibold uppercase tracking-[0.28em] text-[#2f5387]">{$_(historySection.eyebrowKey)}</p>
				<h2 class="text-3xl font-semibold text-[#0b1730]">{$_(historySection.headlineKey)}</h2>
				<p class="text-base text-[#1c2d52]/80">{$_(historySection.introKey)}</p>
			</div>
			<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-8 shadow-sm shadow-[#0b1730]/5">
				<ul class="space-y-6 text-sm text-[#1c2d52]/80">
					{#each milestones as milestone (milestone.yearKey)}
						<li class="relative border-l-2 border-[#f2a516]/60 pl-6">
							<div class="absolute -left-[11px] top-1 h-5 w-5 rounded-full border-2 border-[#f2a516] bg-white"></div>
							<p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#2f5387]">{$_(milestone.yearKey)}</p>
							<p class="mt-1 text-base font-semibold text-[#0b1730]">{$_(milestone.titleKey)}</p>
							<p class="mt-1 text-[#1c2d52]/70">{$_(milestone.descriptionKey)}</p>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold uppercase tracking-[0.28em] text-[#2f5387]">{$_(leadershipSection.eyebrowKey)}</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">{$_(leadershipSection.headlineKey)}</h2>
		<p class="mt-4 max-w-3xl text-base text-[#1c2d52]/80">{$_(leadershipSection.introKey)}</p>
		<div class="mt-10 grid gap-6 md:grid-cols-2">
			{#each leadershipTeam as leader (leader.nameKey)}
				<div class="rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5">
					<p class="text-base font-semibold text-[#0b1730]">{$_(leader.nameKey)}</p>
					<p class="text-sm font-medium uppercase tracking-[0.18em] text-[#2f5387]">{$_(leader.titleKey)}</p>
					<p class="mt-3 text-sm text-[#1c2d52]/80">{$_(leader.bioKey)}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-white py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-10 md:grid-cols-[1.15fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold uppercase tracking-[0.28em] text-[#2f5387]">{$_(valuesSection.eyebrowKey)}</p>
				<h2 class="text-3xl font-semibold text-[#0b1730]">{$_(valuesSection.headlineKey)}</h2>
				<p class="text-base text-[#1c2d52]/80">{$_(valuesSection.introKey)}</p>
			</div>
			<div class="space-y-6">
				{#each values as value (value.titleKey)}
					<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 shadow-sm shadow-[#0b1730]/5">
						<p class="text-base font-semibold text-[#0b1730]">{$_(value.titleKey)}</p>
						<p class="mt-2 text-sm text-[#1c2d52]/80">{$_(value.descriptionKey)}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<section class="relative overflow-hidden bg-[#0b1730] py-20 text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-5xl px-4 text-center">
		<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#f2a516]">{$_(closingSection.eyebrowKey)}</p>
		<h2 class="mt-5 text-3xl font-semibold md:text-4xl">{$_(closingSection.headlineKey)}</h2>
		<p class="mt-4 text-base text-white/80">{$_(closingSection.bodyKey)}</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<a
				href="/careers"
				class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
			>
				{$_(closingSection.primaryCtaKey)}
			</a>
			<a
				href="/contact"
				class="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
			>
				{$_(closingSection.secondaryCtaKey)}
			</a>
		</div>
	</div>
</section>
