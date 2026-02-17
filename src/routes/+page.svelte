<script lang="ts">
	import PricingEn from '$lib/components/pricing/PricingEn.svelte';
	import PricingJa from '$lib/components/pricing/PricingJa.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import StandardsBanner from '$lib/components/StandardsBanner.svelte';
	import { _, locale } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_('home.meta.title')}</title>
	<meta name="description" content={$_('home.meta.description')} />
	<meta property="og:image" content="https://cropwatch.io/favicon.svg" />
	<meta property="og:site_name" content="CropWatch" />
	<meta property="og:type" content="website.home" />
	<meta property="og:title" content="CropWatch" />
	<meta property="og:description" content="Quality Temperature Monitoring Devices" />
	<meta property="og:url" content="https://www.cropwatch.com/" />
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
					{$_('home.hero.eyebrow')}
				</p>
				<h1 class="text-4xl font-semibold tracking-tight text-[#0b1730] md:text-5xl">
					{@html $_('home.hero.headline_html')}
				</h1>
				<p class="text-lg leading-relaxed text-[#15284a]/80">
					{@html $_('home.hero.body_html')}
				</p>
				<div
					class="grid gap-3 rounded-2xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 text-sm text-[#1c2d52] md:grid-cols-2"
				>
					<div class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<p>{$_('home.hero.questions.0')}</p>
					</div>
					<div class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<p>{$_('home.hero.questions.1')}</p>
					</div>
					<div class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<p>{$_('home.hero.questions.2')}</p>
					</div>
					<div class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<p>{$_('home.hero.questions.3')}</p>
					</div>
					<div class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<p>{$_('home.hero.questions.4')}</p>
					</div>
					<div class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<p>{$_('home.hero.questions.5')}</p>
					</div>
				</div>

				<!--VIDEO EXAMPLES SECTION-->
				<div>
					{#if $locale === 'ja'}
					aaa
					{:else}
					<iframe
						class="w-full rounded-2xl border border-[#d7e0f5] shadow-lg shadow-[#0b1730]/5"
						height="400"
						src="https://www.youtube.com/embed/iiGCBuoFF20?si=ZgLpXY30PN0RTVqn"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerpolicy="strict-origin-when-cross-origin"
						allowfullscreen
					></iframe>
					{/if}
				</div>

				<div class="mt-auto flex flex-wrap gap-3">
					<a
						href="/contact"
						class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5387]"
					>
						{$_('home.hero.primary_cta')}
					</a>
					<a
						href="/case-studies"
						class="inline-flex items-center gap-2 rounded-full border border-[#d7e0f5] px-6 py-3 text-sm font-semibold text-[#2f5387] transition hover:border-[#2f5387] hover:text-[#2f5387] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5387]"
					>
						{$_('home.hero.secondary_cta')}
					</a>
				</div>
			</div>
			<div
				class="h-full rounded-3xl border border-[#d7e0f5] bg-white p-8 shadow-lg shadow-[#0b1730]/5"
			>
				<h2 class="text-lg font-semibold text-[#0b1730]">{$_('home.hero.sidebar.title')}</h2>
				<hr class="my-4 border-[#d7e0f5]" />
				<div class="space-y-6 text-sm text-[#1c2d52]">
					<div class="grid gap-4 sm:grid-cols-2">
						<div class="rounded-2xl border border-[#d7e0f5] bg-[#f5f7fb] p-5">
							<p class="text-xs font-semibold tracking-[0.22em] text-[#2f5387] uppercase">
								{$_('home.hero.sidebar.comparison.manual.title')}
							</p>
							<ul class="mt-4 space-y-3 text-[#1c2d52]/80">
								<li>{$_('home.hero.sidebar.comparison.manual.bullets.0')}</li>
								<li>{$_('home.hero.sidebar.comparison.manual.bullets.1')}</li>
								<li>{$_('home.hero.sidebar.comparison.manual.bullets.2')}</li>
							</ul>
						</div>
						<div class="rounded-2xl border border-transparent bg-[#0b1730] p-5 text-white">
							<p class="text-xs font-semibold tracking-[0.22em] text-[#f2a516] uppercase">
								{$_('home.hero.sidebar.comparison.automated.title')}
							</p>
							<ul class="mt-4 space-y-3 text-white/80">
								<li>{$_('home.hero.sidebar.comparison.automated.bullets.0')}</li>
								<li>{$_('home.hero.sidebar.comparison.automated.bullets.1')}</li>
								<li>{$_('home.hero.sidebar.comparison.automated.bullets.2')}</li>
							</ul>
						</div>
					</div>
					<div class="grid gap-4 sm:grid-cols-2">
						<div class="rounded-2xl border border-[#d7e0f5] bg-white p-5">
							<p class="text-xs font-semibold tracking-[0.22em] text-[#2f5387] uppercase">
								{$_('home.hero.sidebar.stats.time_saved.title')}
							</p>
							<p class="mt-2 text-2xl font-semibold text-[#0b1730]">
								{$_('home.hero.sidebar.stats.time_saved.value')}
							</p>
							<p class="mt-2 text-[#1c2d52]/70">
								{$_('home.hero.sidebar.stats.time_saved.body')}
							</p>
						</div>
						<div class="rounded-2xl border border-[#d7e0f5] bg-white p-5">
							<p class="text-xs font-semibold tracking-[0.22em] text-[#2f5387] uppercase">
								{$_('home.hero.sidebar.stats.labor_savings.title')}
							</p>
							<p class="mt-2 text-2xl font-semibold text-[#0b1730]">
								{$_('home.hero.sidebar.stats.labor_savings.value')}
							</p>
							<p class="mt-2 text-[#1c2d52]/70">
								{$_('home.hero.sidebar.stats.labor_savings.body')}
							</p>
						</div>
					</div>
					<div class="rounded-2xl border border-[#d7e0f5] bg-[#f5f7fb] p-5">
						<p class="text-xs font-semibold tracking-[0.22em] text-[#2f5387] uppercase">
							{$_('home.hero.sidebar.productivity.title')}
						</p>
						<ul class="mt-3 space-y-3 text-[#1c2d52]/80">
							<li>{$_('home.hero.sidebar.productivity.bullets.0')}</li>
							<li>{$_('home.hero.sidebar.productivity.bullets.1')}</li>
							<li>{$_('home.hero.sidebar.productivity.bullets.2')}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div>
			<h2 class="py-4 text-center text-3xl font-semibold text-[#0b1730]">
				{$_('home.proof_points.sensorFeatures')}
			</h2>
			<section
				class="grid gap-8 rounded-3xl border border-[#d7e0f5] bg-[#0b1730] px-6 py-10 md:grid-cols-3 md:px-10"
			>
				<article class="flex flex-col space-y-4 text-white/90">
					<p class="text-xs font-semibold tracking-[0.22em] text-[#f2a516] uppercase">
						{$_('home.proof_points.battery_life.eyebrow')}
					</p>
					<h3 class="text-xl font-semibold text-white">
						{$_('home.proof_points.battery_life.headline')}
					</h3>
					<ul class="space-y-3 text-sm leading-relaxed">
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
							<span>{$_('home.proof_points.battery_life.bullets.0')}</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
							<span>{$_('home.proof_points.battery_life.bullets.1')}</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
							<span>{$_('home.proof_points.battery_life.bullets.2')}</span>
						</li>
					</ul>
					<span class="flex-grow"></span>
				</article>
				<article class="flex flex-col space-y-4 text-white/90">
					<p class="text-xs font-semibold tracking-[0.22em] text-[#f2a516] uppercase">
						{$_('home.proof_points.measurement_confidence.eyebrow')}
					</p>
					<h3 class="text-xl font-semibold text-white">
						{$_('home.proof_points.measurement_confidence.headline')}
					</h3>
					<ul class="space-y-3 text-sm leading-relaxed">
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
							<span>{$_('home.proof_points.measurement_confidence.bullets.0')}</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
							<span>{$_('home.proof_points.measurement_confidence.bullets.1')}</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
							<span>{$_('home.proof_points.measurement_confidence.bullets.2')}</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
							<span>{$_('home.proof_points.measurement_confidence.bullets.3')}</span>
						</li>
					</ul>
					<span class="flex-grow"></span>
				</article>
				<article class="flex flex-col space-y-4 text-white/90">
					<p class="text-xs font-semibold tracking-[0.22em] text-[#f2a516] uppercase">
						{$_('home.proof_points.connectivity.eyebrow')}
					</p>
					<h3 class="text-xl font-semibold text-white">
						{$_('home.proof_points.connectivity.headline')}
					</h3>
					<ul class="space-y-3 text-sm leading-relaxed">
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
							<span>{$_('home.proof_points.connectivity.bullets.0')}</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
							<span>{$_('home.proof_points.connectivity.bullets.1')}</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
							<span>{$_('home.proof_points.connectivity.bullets.2')}</span>
						</li>
					</ul>
					<span class="flex-grow"></span>
				</article>
			</section>
		</div>
	</div>
</section>

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="mb-12 text-center">
			<p class="text-xs font-semibold tracking-[0.32em] text-[#2f5387] uppercase">
				{$_('home.industries.eyebrow')}
			</p>
			<h2 class="mt-4 text-3xl font-semibold text-[#0b1730]">
				{$_('home.industries.headline')}
			</h2>
			<p class="mt-3 text-base text-[#1c2d52]/80">
				{$_('home.industries.intro')}
			</p>
		</div>
		<div class="grid gap-6 md:grid-cols-3">
			<div
				class="rounded-3xl border border-[#d7e0f5] bg-white p-6 text-center shadow-sm shadow-[#0b1730]/5 transition hover:-translate-y-1 hover:shadow-md"
			>
				<div class="text-3xl">🧊</div>
				<p class="mt-4 text-base font-semibold text-[#0b1730]">
					{$_('home.industries.cards.cold_chain.label')}
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/70">
					{$_('home.industries.cards.cold_chain.description')}
				</p>
			</div>
			<div
				class="rounded-3xl border border-[#d7e0f5] bg-white p-6 text-center shadow-sm shadow-[#0b1730]/5 transition hover:-translate-y-1 hover:shadow-md"
			>
				<div class="text-3xl">🖼️</div>
				<p class="mt-4 text-base font-semibold text-[#0b1730]">
					{$_('home.industries.cards.protein.label')}
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/70">
					{$_('home.industries.cards.protein.description')}
				</p>
			</div>
			<div
				class="rounded-3xl border border-[#d7e0f5] bg-white p-6 text-center shadow-sm shadow-[#0b1730]/5 transition hover:-translate-y-1 hover:shadow-md"
			>
				<div class="text-3xl">🐔</div>
				<p class="mt-4 text-base font-semibold text-[#0b1730]">
					{$_('home.industries.cards.hospitality.label')}
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/70">
					{$_('home.industries.cards.hospitality.description')}
				</p>
			</div>
			<div
				class="rounded-3xl border border-[#d7e0f5] bg-white p-6 text-center shadow-sm shadow-[#0b1730]/5 transition hover:-translate-y-1 hover:shadow-md"
			>
				<div class="text-3xl">🏭</div>
				<p class="mt-4 text-base font-semibold text-[#0b1730]">
					{$_('home.industries.cards.manufacturing.label')}
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/70">
					{$_('home.industries.cards.manufacturing.description')}
				</p>
			</div>
			<div
				class="rounded-3xl border border-[#d7e0f5] bg-white p-6 text-center shadow-sm shadow-[#0b1730]/5 transition hover:-translate-y-1 hover:shadow-md"
			>
				<div class="text-3xl">📦</div>
				<p class="mt-4 text-base font-semibold text-[#0b1730]">
					{$_('home.industries.cards.storage.label')}
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/70">
					{$_('home.industries.cards.storage.description')}
				</p>
			</div>
			<div
				class="rounded-3xl border border-[#d7e0f5] bg-white p-6 text-center shadow-sm shadow-[#0b1730]/5 transition hover:-translate-y-1 hover:shadow-md"
			>
				<div class="text-3xl">🧓</div>
				<p class="mt-4 text-base font-semibold text-[#0b1730]">
					{$_('home.industries.cards.agriculture.label')}
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/70">
					{$_('home.industries.cards.agriculture.description')}
				</p>
			</div>
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
			{$_('home.closing.eyebrow')}
		</p>
		<h2 class="mt-5 text-3xl font-semibold md:text-4xl">
			{@html $_('home.closing.headline')}
		</h2>
		<p class="mt-4 text-base text-white/80">
			{$_('home.closing.body')}
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<a
				href="/contact"
				class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
			>
				{$_('home.closing.primary_cta')}
			</a>
			<a
				href="/case-studies"
				class="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
			>
				{$_('home.closing.secondary_cta')}
			</a>
		</div>
	</div>
</section>
