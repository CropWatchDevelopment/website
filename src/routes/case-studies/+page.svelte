<script lang="ts">
	import { derived } from 'svelte/store';
	import { dictionary, locale } from 'svelte-i18n';
	import MaterialIcon from '$lib/components/MaterialIcon.svelte';

	type CaseStudyStat = { value: string; label: string };
	type CaseStudyContent = {
		company: string;
		industry: string;
		recap: string;
		badge: string;
		websiteUrl?: string;
		stats: CaseStudyStat[];
	};
	type FeaturedContent = {
		eyebrow: string;
		headline: string;
		intro: string;
		cta: string;
		cases: Record<string, CaseStudyContent>;
	};
	type HeroContent = {
		eyebrow: string;
		headline: string;
		intro: string[];
		snapshot: {
			title: string;
			items: string[];
		};
	};
	type PlaybookStep = {
		title: string;
		description: string;
	};
	type PlaybookContent = {
		eyebrow: string;
		headline: string;
		intro: string;
		steps: Record<string, PlaybookStep>;
	};
	type TestimonyContent = {
		eyebrow: string;
		quote: string;
		person: string;
		title: string;
	};
	type ClosingContent = {
		eyebrow: string;
		headline: string;
		body: string;
		primary_cta: string;
		secondary_cta: string;
	};
	type MetaContent = {
		title?: string;
		description?: string;
	};

	const messages = derived(
		[dictionary, locale],
		([$dictionary, $locale]) => $dictionary[$locale] ?? {}
	);

	const meta = derived(
		messages,
		($messages) => $messages.case_studies?.meta as MetaContent | undefined
	);
	const hero = derived(
		messages,
		($messages) => $messages.case_studies?.hero as HeroContent | undefined
	);
	const featured = derived(
		messages,
		($messages) => $messages.case_studies?.featured as FeaturedContent | undefined
	);
	const playbook = derived(
		messages,
		($messages) => $messages.case_studies?.playbook as PlaybookContent | undefined
	);
	const testimony = derived(
		messages,
		($messages) => $messages.case_studies?.testimony as TestimonyContent | undefined
	);
	const closing = derived(
		messages,
		($messages) => $messages.case_studies?.closing as ClosingContent | undefined
	);

	const caseStudies = derived(featured, ($featured) => {
		if (!$featured?.cases) return [];
		return Object.entries($featured.cases).map(([id, data]) => ({ id, ...data }));
	});
	const rolloutSteps = derived(playbook, ($playbook) => {
		if (!$playbook?.steps) return [];
		return Object.values($playbook.steps);
	});
</script>

<svelte:head>
	<title>{$meta?.title ?? ''}</title>
	<meta name="description" content={$meta?.description ?? ''} />
</svelte:head>

{#if $hero}
	<section class="relative overflow-hidden bg-[#11213c] py-20 text-white">
		<div
			class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]"
			aria-hidden="true"
		></div>
		<div class="relative mx-auto w-full max-w-6xl px-4">
			<div class="grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-center">
				<div class="space-y-6">
					<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
						{$hero.eyebrow}
					</p>
					<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">{$hero.headline}</h1>
					{#each $hero.intro as paragraph (paragraph)}
						<p class="text-base text-white/80">{paragraph}</p>
					{/each}
				</div>
				<div
					class="rounded-3xl border border-white/20 bg-[#0b1730]/80 p-8 shadow-xl shadow-black/30 backdrop-blur"
				>
					<h2 class="text-lg font-semibold text-white">{$hero.snapshot.title}</h2>
					<ul class="mt-6 space-y-4 text-sm text-white/80">
						{#each $hero.snapshot.items as item (item)}
							<li class="flex items-start gap-3">
								<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
								<span>{item}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</section>
{/if}

{#if $featured}
	<section class="bg-white py-20">
		<div class="mx-auto w-full max-w-6xl px-4">
			<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
				{$featured.eyebrow}
			</p>
			<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">{$featured.headline}</h2>
			<p class="mt-4 max-w-3xl text-base text-[#1c2d52]/80">{$featured.intro}</p>
			<div class="mt-10 grid gap-8 md:grid-cols-2">
				{#each $caseStudies as study (study.id)}
					<div
						class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-8 shadow-sm shadow-[#0b1730]/5"
					>
						<div
							class="flex items-center justify-between text-xs font-semibold tracking-[0.22em] text-[#2f5387] uppercase"
						>
							<span>{study.industry}</span>
							<span
								class="rounded-full border border-[#2f5387]/40 bg-white/70 px-3 py-1 text-[11px] font-semibold text-[#2f5387]"
								>{study.badge}</span
							>
						</div>
						<p class="mt-4 text-2xl font-semibold text-[#0b1730]">{study.company}</p>
						<p class="mt-3 text-sm text-[#1c2d52]/80">{study.recap}</p>
						<div class="mt-6 grid gap-4 text-sm text-[#1c2d52]/80 md:grid-cols-2">
							{#each study.stats as stat (stat.label)}
								<div class="rounded-2xl border border-[#d7e0f5] bg-white p-4">
									<p class="text-xl font-semibold text-[#0b1730]">{stat.value}</p>
									<p class="mt-1 text-xs tracking-[0.18em] text-[#2f5387] uppercase">
										{stat.label}
									</p>
								</div>
							{/each}
						</div>
						<div class="flex flex-row">
							<a
								href="/contact"
								class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2f5387] transition hover:text-[#f2a516]"
							>
								{$featured.cta}
								<span aria-hidden="true">-></span>
							</a>
							<span class="flex flex-1"></span>

							{#if study.websiteUrl}
								<a
									href={study.websiteUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2f5387] transition hover:text-[#f2a516]"
								>
									<MaterialIcon
										name="language"
										collection="symbols"
										variant="outlined"
										size={20}
										class="text-inherit"
									/>
									<span>Visit Website</span>
								</a>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		{#if $playbook}
			<div class="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
				<div class="space-y-6">
					<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
						{$playbook.eyebrow}
					</p>
					<h2 class="text-3xl font-semibold text-[#0b1730]">{$playbook.headline}</h2>
					<p class="text-base text-[#1c2d52]/80">{$playbook.intro}</p>
				</div>
				<div class="rounded-3xl border border-[#d7e0f5] bg-white p-8 shadow-sm shadow-[#0b1730]/5">
					<ul class="space-y-6 text-sm text-[#1c2d52]/80">
						{#each $rolloutSteps as step (step.title)}
							<li class="relative border-l-2 border-[#f2a516]/60 pl-6">
								<div
									class="absolute top-1 -left-[11px] h-5 w-5 rounded-full border-2 border-[#f2a516] bg-white"
								></div>
								<p class="text-sm font-semibold tracking-[0.18em] text-[#2f5387] uppercase">
									{step.title}
								</p>
								<p class="mt-1 text-[#1c2d52]/70">{step.description}</p>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/if}

		{#if $testimony}
			<div
				class="mt-16 rounded-3xl border border-[#d7e0f5] bg-white p-10 shadow-sm shadow-[#0b1730]/5"
			>
				<p class="text-xs font-semibold tracking-[0.22em] text-[#2f5387] uppercase">
					{$testimony.eyebrow}
				</p>
				<p class="mt-4 text-2xl font-semibold text-[#0b1730]">"{$testimony.quote}"</p>
				<p class="mt-6 text-sm font-semibold text-[#0b1730]">{$testimony.person}</p>
				<p class="text-xs tracking-[0.18em] text-[#2f5387] uppercase">{$testimony.title}</p>
			</div>
		{/if}
	</div>
</section>

{#if $closing}
	<section class="relative overflow-hidden bg-[#0b1730] py-20 text-white">
		<div
			class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]"
			aria-hidden="true"
		></div>
		<div class="relative mx-auto w-full max-w-5xl px-4 text-center">
			<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
				{$closing.eyebrow}
			</p>
			<h2 class="mt-5 text-3xl font-semibold md:text-4xl">{$closing.headline}</h2>
			<p class="mt-4 text-base text-white/80">{$closing.body}</p>
			<div class="mt-8 flex flex-wrap justify-center gap-4">
				<a
					href="/contact"
					class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
				>
					{$closing.primary_cta}
				</a>
				<a
					href="/demo"
					class="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
				>
					{$closing.secondary_cta}
				</a>
			</div>
		</div>
	</section>
{/if}
