<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$_('case_studies.meta.title')}</title>
	<meta name="description" content={$_('case_studies.meta.description')} />
</svelte:head>

<section class="relative overflow-hidden bg-[#11213c] py-20 text-white">
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]"
		aria-hidden="true"
	></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
					{$_('case_studies.hero.eyebrow')}
				</p>
				<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">
					{$_('case_studies.hero.headline')}
				</h1>
				<p class="text-base text-white/80">{$_('case_studies.hero.intro.0')}</p>
				<p class="text-base text-white/80">{$_('case_studies.hero.intro.1')}</p>
			</div>
			<div
				class="rounded-3xl border border-white/20 bg-[#0b1730]/80 p-8 shadow-xl shadow-black/30 backdrop-blur"
			>
				<h2 class="text-lg font-semibold text-white">{$_('case_studies.hero.snapshot.title')}</h2>
				<ul class="mt-6 space-y-4 text-sm text-white/80">
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>{$_('case_studies.hero.snapshot.items.0')}</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>{$_('case_studies.hero.snapshot.items.1')}</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>{$_('case_studies.hero.snapshot.items.2')}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="flex items-center justify-center bg-white py-20">
	<div class="text-center">
		<h2 class="text-3xl font-semibold text-[#0b1730]">Case Studies & Our Clients Coming Soon!</h2>
		<p class="mt-4 max-w-2xl text-base text-[#1c2d52]/80">
			We're working hard to bring you our case studies. Stay tuned for updates!
		</p>
	</div>
</section>
