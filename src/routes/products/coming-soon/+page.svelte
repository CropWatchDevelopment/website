<script lang="ts">
	import { _ } from 'svelte-i18n';
	import MaterialIcon from '$lib/components/MaterialIcon.svelte';

	const benefits = [
		{
			icon: 'sensors',
			titleKey: 'products.coming_soon.benefits.sensor_suite.title',
			descriptionKey: 'products.coming_soon.benefits.sensor_suite.description'
		},
		{
			icon: 'signal_cellular_alt',
			titleKey: 'products.coming_soon.benefits.network.title',
			descriptionKey: 'products.coming_soon.benefits.network.description'
		},
		{
			icon: 'shield',
			titleKey: 'products.coming_soon.benefits.compliance.title',
			descriptionKey: 'products.coming_soon.benefits.compliance.description'
		}
	] as const;

	const timeline = [
		{
			labelKey: 'products.coming_soon.timeline.discovery.label',
			statusKey: 'products.coming_soon.timeline.discovery.status',
			descriptionKey: 'products.coming_soon.timeline.discovery.description'
		},
		{
			labelKey: 'products.coming_soon.timeline.pilot.label',
			statusKey: 'products.coming_soon.timeline.pilot.status',
			descriptionKey: 'products.coming_soon.timeline.pilot.description'
		},
		{
			labelKey: 'products.coming_soon.timeline.launch.label',
			statusKey: 'products.coming_soon.timeline.launch.status',
			descriptionKey: 'products.coming_soon.timeline.launch.description'
		}
	] as const;

	const faqItems = [
		{
			questionKey: 'products.coming_soon.faq.items.0.question',
			answerKey: 'products.coming_soon.faq.items.0.answer'
		},
		{
			questionKey: 'products.coming_soon.faq.items.1.question',
			answerKey: 'products.coming_soon.faq.items.1.answer'
		},
		{
			questionKey: 'products.coming_soon.faq.items.2.question',
			answerKey: 'products.coming_soon.faq.items.2.answer'
		}
	] as const;
	
</script>

<svelte:head>
	<title>{$_('products.coming_soon.meta.title')}</title>
	<meta name="description" content={$_('products.coming_soon.meta.description')} />
</svelte:head>

<section class="relative overflow-hidden bg-[#0b1730] py-20 text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,83,135,0.25),transparent_60%)]" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
					{$_('products.coming_soon.hero.eyebrow')}
				</p>
				<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">
					{$_('products.coming_soon.hero.headline')}
				</h1>
				<p class="text-base text-white/80 md:text-lg">
					{$_('products.coming_soon.hero.body')}
				</p>
				<div class="flex flex-wrap gap-3">
					<a
						href="/contact"
						class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
					>
						<MaterialIcon name="calendar_month" collection="symbols" variant="outlined" size={18} />
						{$_('products.coming_soon.hero.primary_cta')}
					</a>
					<a
						href="/case-studies"
						class="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
					>
						<MaterialIcon name="description" collection="symbols" variant="outlined" size={18} />
						{$_('products.coming_soon.hero.secondary_cta')}
					</a>
				</div>
			</div>
			<div class="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl shadow-black/30 backdrop-blur">
				<h2 class="text-lg font-semibold text-white">{$_('products.coming_soon.hero.sidebar.title')}</h2>
				<p class="mt-3 text-sm text-white/70">{$_('products.coming_soon.hero.sidebar.intro')}</p>
				<ul class="mt-6 space-y-4 text-sm text-white/80">
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>{$_('products.coming_soon.hero.sidebar.points.0')}</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>{$_('products.coming_soon.hero.sidebar.points.1')}</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>{$_('products.coming_soon.hero.sidebar.points.2')}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>
