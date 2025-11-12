<script lang="ts">
	import kevinImage from '$lib/images/team/Kevin_Cantrell.jpeg';
	import sigurdImage from '$lib/images/team/Sigurd_Øyen.jpeg';
	import joseImage from '$lib/images/team/Jose_Ramiro_Zuniga.jpg';
	import sayakaImage from '$lib/images/team/Sayaka_Ikemizu.jpg';
	import sedarImage from '$lib/images/team/Sedar_Korur.jpg';
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
		name: string;
		title: string;
		bio: string;
		src?: string;
		avatarAlt: string;
		initials: string;
		linkedinUrl?: string;
		githubUrl?: string;
	};

	const leadershipTeam: Leader[] = [
		{
			name: 'Kevin Cantrell',
			title: 'Founder & Developer',
			bio: 'Founder of CropWatch and lead developer of its core technologies.',
			src: kevinImage,
			avatarAlt: 'Placeholder portrait illustration for Kevin Cantrell',
			initials: 'KC',
			linkedinUrl: 'https://www.linkedin.com/in/cropwatch/',
			githubUrl: 'https://github.com/kevin192291'
		},
		{
			name: 'Sayaka Cantrell',
			title: 'Business Leader',
			bio: 'Responsible for business operations and strategy, driving growth and market presence for CropWatch.',
			avatarAlt: 'Placeholder portrait illustration for Sayaka Cantrell',
			src: sayakaImage,
			initials: 'SC',
			linkedinUrl: 'https://www.linkedin.com/in/sayaka-ikemizu-694b17276/'
		},
		{
			name: 'Sigurd Øyen',
			title: 'Head of Engineering',
			bio: 'Sigurd has engineered the hardware of CropWatch’s sensor networks from the beginning, ensuring robust and reliable performance in diverse environments.',
			avatarAlt: 'Placeholder portrait illustration for Sigurd Øyen',
			src: sigurdImage,
			initials: 'SO',
			linkedinUrl: 'https://www.linkedin.com/in/sigurd-%C3%B8yen-78688899/'
		},
		{
			name: 'Jose Ramiro Zuniga',
			title: 'Frontend Engineer & Designer',
			bio: 'Jose is responsible for the design and user experience of CropWatch’s web applications, bringing a user-centered approach to the platform.',
			avatarAlt: 'Placeholder portrait illustration for Jose Ramiro Zuniga',
			src: joseImage,
			initials: 'JRZ',
			linkedinUrl: 'https://www.linkedin.com/in/jose-ramiro-zuniga',
			githubUrl: 'https://github.com/jramiroz98'
		},
		{
			name: 'Kohei',
			title: 'Full Stack Engineer',
			bio: 'Kohei contributes to both frontend and backend development, ensuring seamless integration and functionality across CropWatch’s platform.',
			avatarAlt: 'Placeholder portrait illustration for Kohei',
			// src: sigurdImage,
			initials: 'SO',
			linkedinUrl: 'https://www.linkedin.com/in/sigurd-%C3%B8yen-78688899/'
		},
		{
			name: 'Sedar Korur',
			title: 'API/Backend Engineer',
			bio: 'Sedar is responsible for developing and maintaining the backend systems and APIs that power CropWatch’s data services.',
			avatarAlt: 'Placeholder portrait illustration for Sedar Korur',
			src: sedarImage,
			initials: 'SK',
			githubUrl: 'https://github.com/korur'
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
		paragraphKeys: ['about.hero.paragraphs.0', 'about.hero.paragraphs.1'],
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
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,83,135,0.25),transparent_60%)]"
		aria-hidden="true"
	></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
					{$_(heroContent.eyebrowKey)}
				</p>
				<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">
					{$_(heroContent.headlineKey)}
				</h1>
				{#each heroContent.paragraphKeys as paragraphKey (paragraphKey)}
					<p class="text-base text-white/80">{$_(paragraphKey)}</p>
				{/each}
				<div class="grid gap-4 text-sm text-white/80 md:grid-cols-2">
					<div class="rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
						<p class="text-sm font-semibold tracking-[0.22em] text-[#f2a516] uppercase">
							{$_(heroContent.statCards[0].titleKey)}
						</p>
						<p class="mt-2 text-base font-semibold text-white">
							{$_(heroContent.statCards[0].descriptionKey)}
						</p>
					</div>
					<div class="rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
						<p class="text-sm font-semibold tracking-[0.22em] text-[#f2a516] uppercase">
							{$_(heroContent.statCards[1].titleKey)}
						</p>
						<p class="mt-2 text-base font-semibold text-white">
							{$_(heroContent.statCards[1].descriptionKey)}
						</p>
					</div>
				</div>
			</div>
			<div
				class="rounded-3xl border border-white/20 bg-[#0b1730]/80 p-8 shadow-xl shadow-black/30 backdrop-blur"
			>
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
				<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
					{$_(historySection.eyebrowKey)}
				</p>
				<h2 class="text-3xl font-semibold text-[#0b1730]">{$_(historySection.headlineKey)}</h2>
				<p class="text-base text-[#1c2d52]/80">{$_(historySection.introKey)}</p>
			</div>
			<div
				class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-8 shadow-sm shadow-[#0b1730]/5"
			>
				<ul class="space-y-6 text-sm text-[#1c2d52]/80">
					{#each milestones as milestone (milestone.yearKey)}
						<li class="relative border-l-2 border-[#f2a516]/60 pl-6">
							<div
								class="absolute top-1 -left-[11px] h-5 w-5 rounded-full border-2 border-[#f2a516] bg-white"
							></div>
							<p class="text-sm font-semibold tracking-[0.18em] text-[#2f5387] uppercase">
								{$_(milestone.yearKey)}
							</p>
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
		<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
			{$_(leadershipSection.eyebrowKey)}
		</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">{$_(leadershipSection.headlineKey)}</h2>
		<p class="mt-4 max-w-3xl text-base text-[#1c2d52]/80">{$_(leadershipSection.introKey)}</p>
		<div class="mt-10 grid gap-6 md:grid-cols-2">
			{#each leadershipTeam as leader (leader.name)}
				<article
					class="flex h-full flex-col justify-between rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5"
				>
					<div class="flex items-center gap-4">
						<div
							class="flex h-20 w-20 items-center justify-center rounded-full text-xl font-semibold text-white"
							style="background-image: linear-gradient(to bottom right, #11213c, #2f5387, #f2a516);"
						>
							{#if leader.src}
								<img
									src={leader.src}
									alt={leader.avatarAlt}
									class="h-20 w-20 rounded-full object-cover"
								/>
							{:else}
								<span aria-hidden="true">{leader.initials}</span>
								<span class="sr-only">{leader.avatarAlt}</span>
							{/if}
						</div>
						<div>
							<p class="text-base font-semibold text-[#0b1730]">{leader.name}</p>
							<p class="text-sm font-medium tracking-[0.18em] text-[#2f5387] uppercase">
								{leader.title}
							</p>
						</div>
					</div>
					<p class="mt-4 text-sm text-[#1c2d52]/80">{leader.bio}</p>
					<div class="mt-6 flex flex-wrap gap-3">
						{#if leader.linkedinUrl}
							<a
								href={leader.linkedinUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-2 rounded-full border border-[#2f5387]/30 px-4 py-2 text-sm font-medium text-[#2f5387] transition hover:border-[#2f5387] hover:bg-[#2f5387] hover:text-white"
								aria-label={$_('about.leadership.actions.linkedin_aria', {
									values: { name: leader.name }
								})}
							>
								<span aria-hidden="true" class="text-base font-semibold">in</span>
								<span>{$_('about.leadership.actions.linkedin')}</span>
							</a>
						{/if}
						{#if leader.githubUrl}
							<a
								href={leader.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-2 rounded-full border border-[#0b1730]/30 px-4 py-2 text-sm font-medium text-[#0b1730] transition hover:border-[#0b1730] hover:bg-[#0b1730] hover:text-white"
								aria-label={$_('about.leadership.actions.github_aria', {
									values: { name: leader.name }
								})}
							>
								<span aria-hidden="true" class="text-base font-semibold">GH</span>
								<span>{$_('about.leadership.actions.github')}</span>
							</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="bg-white py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-10 md:grid-cols-[1.15fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
					{$_(valuesSection.eyebrowKey)}
				</p>
				<h2 class="text-3xl font-semibold text-[#0b1730]">{$_(valuesSection.headlineKey)}</h2>
				<p class="text-base text-[#1c2d52]/80">{$_(valuesSection.introKey)}</p>
			</div>
			<div class="space-y-6">
				{#each values as value (value.titleKey)}
					<div
						class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 shadow-sm shadow-[#0b1730]/5"
					>
						<p class="text-base font-semibold text-[#0b1730]">{$_(value.titleKey)}</p>
						<p class="mt-2 text-sm text-[#1c2d52]/80">{$_(value.descriptionKey)}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<section class="relative overflow-hidden bg-[#0b1730] py-20 text-white">
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,83,135,0.25),transparent_60%)]"
		aria-hidden="true"
	></div>
	<div class="relative mx-auto w-full max-w-5xl px-4 text-center">
		<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
			{$_(closingSection.eyebrowKey)}
		</p>
		<h2 class="mt-5 text-3xl font-semibold md:text-4xl">{$_(closingSection.headlineKey)}</h2>
		<p class="mt-4 text-base text-white/80">{$_(closingSection.bodyKey)}</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<a
				href="https://www.linkedin.com/company/cropwatch-system/"
				target="_blank"
				rel="noopener noreferrer"
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
