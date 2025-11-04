<script lang="ts">
	import Slider from '$lib/components/Slider.svelte';

	const proofPoints = [
		{
			title: 'Battery Life That Outlasts Downtime',
			headline: '10+ year runtime, even in 24/7 facilities',
			bullets: [
				'Send telemetry every 10 minutes without compromising uptime',
				'Dual-cell architecture with field-swappable sensor modules',
				'Predictive alerts before a device ever falls offline'
			],
			link: { label: 'Verify our lifecycle modeling', href: '/resources/battery-lifecycle' }
		},
		{
			title: 'Measurement Confidence',
			headline: 'ISO 17025 alignment, triplicate validation',
			bullets: [
				'Dual-sensor design with tie-breaker logic for each reading',
				'Serialized calibration with cloud-based certificates',
				'Automated drift detection keeps compliance on track'
			],
			link: { label: 'Explore our quality program', href: '/quality' }
		},
		{
			title: 'Connectivity Built For Harsh Sites',
			headline: 'LoRaWAN® penetration without blind spots',
			bullets: [
				'Tuned gateways engineered for dense, industrial environments',
				'Buffered storage ensures zero data loss during outages',
				'Private network options when cellular coverage fails'
			],
			link: { label: 'See the network blueprint', href: '/technology/network' }
		}
	];

	const discoveryQuestions = [
		'Can your current sensors run a decade on one charge?',
		'Do you receive actionable data at the cadence operations expect?',
		'How quickly can you prove readings when compliance asks?',
		'Are concrete, steel, and freezers still causing blind spots?'
	];

	const industriesServed = [
		{ icon: '🧊', label: 'Cold chain distribution' },
		{ icon: '🐔', label: 'Protein & livestock operations' },
		{ icon: '🏨', label: 'Hospitality & venues' },
		{ icon: '🏭', label: 'Manufacturing & processing' },
		{ icon: '🏥', label: 'Healthcare & labs' },
		{ icon: '🌿', label: 'Controlled agriculture' }
	];

	const pricingMatrix = [
		{
			title: 'Sensors & Edge Devices',
			lead: 'Deploy scalable coverage with zero compromise on accuracy.',
			items: [
				{ label: 'First 10 devices', value: '$199 each' },
				{ label: '11+ devices', value: '$179 each' },
				{ label: 'Calibration', value: 'Included, ISO-traceable' }
			]
		},
		{
			title: 'Gateways & Backbone',
			lead: 'Indoor, outdoor, and carrier-grade LoRaWAN® options.',
			items: [
				{ label: 'Indoor edge gateway', value: '$549' },
				{ label: 'Industrial carrier-grade', value: '$1,899' },
				{ label: 'Site RF design', value: 'Bundled with deployment' }
			]
		},
		{
			title: 'Software & Insights',
			lead: 'Unified dashboards, unlimited alerts, always-on support.',
			items: [
				{ label: 'Data retention', value: '24 months rolling' },
				{ label: 'User licenses', value: 'Unlimited' },
				{ label: 'Onboarding & success', value: 'Included' }
			]
		}
	];
</script>

<svelte:head>
	<title>CropWatch | Industrial IoT That Pays For Itself</title>
	<meta
		name="description"
		content="Rugged industrial IoT for cold chain, manufacturing, and hospitality. Deploy long-range sensors, LoRaWAN gateways, and analytics trusted by operations leaders."
	/>
</svelte:head>

<section id="slider" class="bg-[#11213c]">
	<Slider />
</section>

<section class="relative overflow-hidden bg-white py-20">
	<div class="absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-[#11213c]/10 to-transparent" aria-hidden="true"></div>
	<div class="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4">
		<div class="grid gap-12 md:grid-cols-[1.35fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#2f5387]">Industrial IoT That Pays For Itself</p>
				<h1 class="text-4xl font-semibold tracking-tight text-[#0b1730] md:text-5xl">
					Operational visibility for facilities that cannot afford downtime
				</h1>
				<p class="text-lg leading-relaxed text-[#15284a]/80">
					CropWatch pairs ruggedized sensors with LoRaWAN® networks and actionable analytics, giving operations teams proof that temperature, humidity, and equipment health stay within spec even in the harshest environments.
				</p>
				<div class="grid gap-3 rounded-2xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 text-sm text-[#1c2d52] md:grid-cols-2">
					{#each discoveryQuestions as question}
						<div class="flex items-start gap-3">
							<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
							<p>{question}</p>
						</div>
					{/each}
				</div>
				<div class="flex flex-wrap gap-3">
					<a
						href="/contact"
						class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5387]"
					>
						Schedule a facility walkthrough
					</a>
					<a
						href="/case-studies"
						class="inline-flex items-center gap-2 rounded-full border border-[#d7e0f5] px-6 py-3 text-sm font-semibold text-[#2f5387] transition hover:border-[#2f5387] hover:text-[#2f5387] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5387]"
					>
						Review customer outcomes
					</a>
				</div>
			</div>
			<div class="rounded-3xl border border-[#d7e0f5] bg-white p-8 shadow-lg shadow-[#0b1730]/5">
				<h2 class="text-lg font-semibold text-[#0b1730]">Program ROI snapshot</h2>
				<hr class="my-4 border-[#d7e0f5]" />
				<dl class="space-y-4 text-sm text-[#1c2d52]">
					<div class="flex items-start justify-between gap-6">
						<dt class="font-medium">Average deployment time</dt>
						<dd class="text-[#2f5387]"><strong>14 days</strong> from site survey</dd>
					</div>
					<div class="flex items-start justify-between gap-6">
						<dt class="font-medium">Visibility uplift</dt>
						<dd class="text-[#2f5387]"><strong>92%</strong> fewer manual checks</dd>
					</div>
					<div class="flex items-start justify-between gap-6">
						<dt class="font-medium">Compliance wins</dt>
						<dd class="text-[#2f5387]">2x faster audit response</dd>
					</div>
				</dl>
			</div>
		</div>

		<section class="grid gap-8 rounded-3xl border border-[#d7e0f5] bg-[#0b1730] px-6 py-10 md:grid-cols-3 md:px-10">
			{#each proofPoints as card (card.title)}
				<article class="space-y-4 text-white/90">
					<p class="text-xs font-semibold uppercase tracking-[0.22em] text-[#f2a516]">{card.title}</p>
					<h3 class="text-xl font-semibold text-white">{card.headline}</h3>
					<ul class="space-y-3 text-sm leading-relaxed">
						{#each card.bullets as bullet}
							<li class="flex items-start gap-2">
								<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
								<span>{bullet}</span>
							</li>
						{/each}
					</ul>
					{#if card.link}
						<a class="inline-flex items-center gap-2 text-sm font-semibold text-[#f2a516] transition hover:text-white" href={card.link.href}>
							{card.link.label}
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
			<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#2f5387]">Industries Served</p>
			<h2 class="mt-4 text-3xl font-semibold text-[#0b1730]">Where sensors deliver measurable ROI</h2>
			<p class="mt-3 text-base text-[#1c2d52]/80">
				Our network is trusted by operations teams in heavily regulated, temperature-sensitive, and complex facilities across the globe.
			</p>
		</div>
		<div class="grid gap-6 md:grid-cols-3">
			{#each industriesServed as industry (industry.label)}
				<div class="rounded-3xl border border-[#d7e0f5] bg-white p-6 text-center shadow-sm shadow-[#0b1730]/5 transition hover:-translate-y-1 hover:shadow-md">
					<div class="text-3xl">{industry.icon}</div>
					<p class="mt-4 text-base font-semibold text-[#0b1730]">{industry.label}</p>
					<p class="mt-2 text-sm text-[#1c2d52]/70">
						Deploy rugged sensors that keep compliance-ready records in even the hardest-to-reach zones.
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-white py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
			<div>
				<p class="text-xs font-semibold uppercase tracking-[0.28em] text-[#2f5387]">Investment Snapshot</p>
				<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">Transparent pricing engineered for scale</h2>
				<p class="mt-3 max-w-2xl text-base text-[#1c2d52]/80">
					Every engagement includes site design, deployment support, and the analytics platform your operators depend on. Pricing flexes with footprint and never penalizes growth.
				</p>
			</div>
			<a
				href="/contact"
				class="inline-flex items-center gap-2 rounded-full border border-[#d7e0f5] px-5 py-3 text-sm font-semibold text-[#2f5387] transition hover:border-[#2f5387] hover:text-[#2f5387]"
			>
				Request a tailored estimate
			</a>
		</div>
		<div class="grid gap-6 md:grid-cols-3">
			{#each pricingMatrix as column (column.title)}
				<div class="flex h-full flex-col rounded-3xl border border-[#d7e0f5] bg-[#f9fbff] p-7 shadow-sm shadow-[#0b1730]/5">
					<h3 class="text-lg font-semibold text-[#0b1730]">{column.title}</h3>
					<p class="mt-3 text-sm text-[#1c2d52]/75">{column.lead}</p>
					<hr class="my-5 border-[#d7e0f5]" />
					<ul class="space-y-4 text-sm text-[#1c2d52]">
						{#each column.items as item (item.label)}
							<li class="flex items-start justify-between gap-4">
								<span class="font-medium">{item.label}</span>
								<span class="text-[#2f5387]">{item.value}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="relative overflow-hidden bg-[#0b1730] py-20">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-5xl px-4 text-center text-white">
		<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#f2a516]">Ready to Prove ROI?</p>
		<h2 class="mt-5 text-3xl font-semibold md:text-4xl">Let's audit a high-risk production zone together</h2>
		<p class="mt-4 text-base text-white/80">
			We'll walk your environment, model signal coverage, and produce a business case that leaders can take to the boardroom.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<a
				href="/contact"
				class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
			>
				Book a strategy session
			</a>
			<a
				href="/case-studies"
				class="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
			>
				Download case studies
			</a>
		</div>
	</div>
</section>
