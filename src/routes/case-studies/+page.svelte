<script lang="ts">
	import { derived } from 'svelte/store';
	import type { Readable } from 'svelte/store';
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
	type MessagesRoot = {
		case_studies?: {
			meta?: MetaContent;
			hero?: HeroContent;
			featured?: FeaturedContent;
			playbook?: PlaybookContent;
			testimony?: TestimonyContent;
			closing?: ClosingContent;
		};
	};

	const messages: Readable<MessagesRoot> = derived(
		[dictionary, locale],
		([$dictionary, $locale]) => {
			const safeLocale = typeof $locale === 'string' && $locale ? $locale : 'en';
			return (($dictionary as Record<string, unknown>)[safeLocale] ?? {}) as MessagesRoot;
		}
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
	const comingSoon = $state(true);

	const caseStudies = derived(featured, ($featured) => {
		if (!$featured?.cases) return [];
		return Object.entries($featured.cases).map(([id, data]) => ({ id, ...data }));
	});
	const rolloutSteps = derived(playbook, ($playbook) => {
		if (!$playbook?.steps) return [];
		return Object.values($playbook.steps);
	});

	function getCompanyMark(company: string): string {
		const cleaned = company.replace(/[^\p{L}\p{N} ]/gu, ' ').trim();
		const parts = cleaned.split(/\s+/).filter(Boolean);
		return parts
			.slice(0, 2)
			.map((part) => part.slice(0, 1).toUpperCase())
			.join('');
	}

	function getMiniTestimonial(study: CaseStudyContent): string {
		const recap = (study.recap ?? '').trim();
		if (recap) return recap;
		const firstStat = study.stats?.[0];
		return firstStat ? `${firstStat.value} ${firstStat.label}` : '';
	}
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

{#if $featured && !comingSoon}
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
						class="group relative overflow-hidden rounded-3xl border border-[#d7e0f5] bg-gradient-to-b from-[#f9fbff] to-[#f5f7fb] p-8 shadow-sm shadow-[#0b1730]/5 transition hover:-translate-y-1 hover:border-[#2f5387]/30 hover:shadow-md"
					>
						<div
							class="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,_rgba(242,165,22,0.25),_transparent_60%)] opacity-0 transition group-hover:opacity-100"
							aria-hidden="true"
						></div>
						<div
							class="relative flex items-center justify-between text-xs font-semibold tracking-[0.22em] text-[#2f5387] uppercase"
						>
							<div class="flex items-center gap-3">
								<div
									class="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2f5387] to-[#11213c] text-sm font-semibold tracking-tight text-white shadow-sm"
									aria-hidden="true"
								>
									{getCompanyMark(study.company)}
								</div>
								<span>{study.industry}</span>
							</div>
							<span
								class="rounded-full border border-[#2f5387]/35 bg-white/80 px-3 py-1 text-[11px] font-semibold text-[#2f5387] shadow-sm"
								>{study.badge}</span
							>
						</div>
						<p class="relative mt-4 text-2xl font-semibold text-[#0b1730]">{study.company}</p>
						{#if study.recap}
							<p class="mt-3 text-sm text-[#1c2d52]/80">{study.recap}</p>
						{/if}
						<div class="mt-6 grid gap-4 text-sm text-[#1c2d52]/80 md:grid-cols-2">
							{#each study.stats as stat (stat.label)}
								<div class="rounded-2xl border border-[#d7e0f5] bg-white p-4 shadow-sm">
									<p class="text-xl font-semibold text-[#0b1730]">{stat.value}</p>
									<p class="mt-1 text-xs tracking-[0.18em] text-[#2f5387] uppercase">
										{stat.label}
									</p>
								</div>
							{/each}
						</div>

						{#if getMiniTestimonial(study)}
							<!-- Testimonial section (above contact/website row) -->
							<div class="mt-7 rounded-2xl border border-[#d7e0f5] bg-white/80 p-5">
								<div class="flex items-start gap-3">
									<span class="mt-1 text-[#f2a516]" aria-hidden="true">❝</span>
									<div class="min-w-0">
										<p class="text-sm italic text-[#1c2d52]/80 clamp-3">
											{getMiniTestimonial(study)}
										</p>
										<p class="mt-3 text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase">
											{study.industry}
										</p>
									</div>
								</div>
							</div>
						{/if}

						<div class="mt-6 flex flex-row items-center gap-3">
							<a
								href="/contact"
								class="inline-flex items-center gap-2 rounded-full bg-[#2f5387] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#24446f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5387]/40"
							>
								{$featured.cta}
								<span aria-hidden="true">→</span>
							</a>
							{#if study.websiteUrl}
								<a
									href={study.websiteUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 rounded-full border border-[#d7e0f5] bg-white px-4 py-2 text-sm font-semibold text-[#2f5387] transition hover:border-[#2f5387]/40 hover:text-[#24446f]"
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
							<span class="flex-1"></span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
	{:else}
	<section class="flex items-center justify-center bg-white py-20">
		<div class="text-center">
			<h2 class="text-3xl font-semibold text-[#0b1730]">Case Studies & Our Clients Coming Soon!</h2>
			<p class="mt-4 max-w-2xl text-base text-[#1c2d52]/80">
				We're working hard to bring you our case studies. Stay tuned for updates!
			</p>
		</div>
	</section>
{/if}

<style>
	.clamp-3 {
		display: -webkit-box;
		line-clamp: 3;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>

