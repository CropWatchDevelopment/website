<script lang="ts">
	const caseStudies = [
		{
			company: 'SunHarvest Foods',
			industry: 'Cold storage and distribution',
			recap: 'Scaled temperature and humidity monitoring across 12 distribution centers to eliminate spoilage claims.',
			stats: [
				{ value: '38%', label: 'Insurance claim reduction inside 6 months' },
				{ value: '16 hrs', label: 'Faster incident response time per facility' }
			],
			badge: 'Global rollout'
		},
		{
			company: 'Harborline Hospitality',
			industry: 'Luxury resorts and hotels',
			recap: 'Unified indoor air quality, energy metering, and guest experience sensors across 27 properties.',
			stats: [
				{ value: '22%', label: 'Energy savings measured year over year' },
				{ value: '100%', label: 'Regulatory audits passed on first review' }
			],
			badge: 'Multi-brand portfolio'
		},
		{
			company: 'Kodiak Manufacturing',
			industry: 'Industrial fabrication',
			recap: 'Instrumented mission critical production lines to detect vibration, dust, and temperature anomalies.',
			stats: [
				{ value: '4 hrs', label: 'Average downtime avoided per incident' },
				{ value: '3x', label: 'Increase in predictive maintenance alerts' }
			],
			badge: 'High compliance'
		},
		{
			company: 'Greenfield Produce',
			industry: 'Agricultural supply chain',
			recap: 'Extended field-to-dock visibility with soil, moisture, and transport telemetry for export partners.',
			stats: [
				{ value: '48 hrs', label: 'Faster shipment release cycle' },
				{ value: '12%', label: 'Yield improvement through targeted irrigation' }
			],
			badge: 'End-to-end visibility'
		}
	];

	const rolloutPlaybook = [
		{
			step: 'Assess',
			description: 'We map environments, compliance mandates, and existing telemetry to prioritize critical wins.'
		},
		{
			step: 'Pilot',
			description: 'Joint teams deploy a rapid proof of value with clear KPIs and stakeholder training.'
		},
		{
			step: 'Scale',
			description: 'Standardized deployment kits and hybrid field teams extend coverage without disrupting operations.'
		},
		{
			step: 'Optimize',
			description: 'Analytics, playbooks, and quarterly executive reviews keep ROI visible and improvements continuous.'
		}
	];

	const testimony = {
		quote:
			'CropWatch gave us predictive insight into every walk-in and loading bay without drowning our teams in dashboards. The rollout finished ahead of schedule and paid for itself inside the first quarter.',
		person: 'Charmaine Ellis',
		title: 'VP of Operations, Harborline Hospitality'
	};
</script>

<svelte:head>
	<title>Case Studies | CropWatch Industrial IoT Outcomes</title>
	<meta
		name="description"
		content="See how CropWatch delivers measurable ROI for cold storage, hospitality, manufacturing, and agriculture with resilient IoT deployments."
	/>
</svelte:head>

<section class="relative overflow-hidden bg-[#11213c] py-20 text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#f2a516]">Case studies</p>
				<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">Proof points from demanding environments</h1>
				<p class="text-base text-white/80">
					Operators rely on CropWatch to deliver resilient networks, trusted analytics, and rapid payback across cold storage, hospitality, and heavy industry.
				</p>
				<p class="text-base text-white/80">
					Explore how we combine hardware, software, and human expertise to meet strict uptime and compliance goals without overwhelming frontline teams.
				</p>
			</div>
			<div class="rounded-3xl border border-white/20 bg-[#0b1730]/80 p-8 shadow-xl shadow-black/30 backdrop-blur">
				<h2 class="text-lg font-semibold text-white">Snapshot results</h2>
				<ul class="mt-6 space-y-4 text-sm text-white/80">
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>38 percent reduction in spoilage claims for national cold storage network.</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>22 percent energy savings across a 27 hotel portfolio within the first year.</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>99.98 percent uptime backed by our global operations centers.</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold uppercase tracking-[0.28em] text-[#2f5387]">Featured programs</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">Cross-industry wins delivered with CropWatch</h2>
		<p class="mt-4 max-w-3xl text-base text-[#1c2d52]/80">
			Each engagement pairs ruggedized hardware with rollout specialists who understand regulated environments. The result: measurable efficiency, compliance, and operational clarity.
		</p>
		<div class="mt-10 grid gap-8 md:grid-cols-2">
			{#each caseStudies as study (study.company)}
				<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-8 shadow-sm shadow-[#0b1730]/5">
					<div class="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-[#2f5387]">
						<span>{study.industry}</span>
						<span class="rounded-full border border-[#2f5387]/40 bg-white/70 px-3 py-1 text-[11px] font-semibold text-[#2f5387]">{study.badge}</span>
					</div>
					<p class="mt-4 text-2xl font-semibold text-[#0b1730]">{study.company}</p>
					<p class="mt-3 text-sm text-[#1c2d52]/80">{study.recap}</p>
					<div class="mt-6 grid gap-4 text-sm text-[#1c2d52]/80 md:grid-cols-2">
						{#each study.stats as stat (stat.label)}
							<div class="rounded-2xl border border-[#d7e0f5] bg-white p-4">
								<p class="text-xl font-semibold text-[#0b1730]">{stat.value}</p>
								<p class="mt-1 text-xs uppercase tracking-[0.18em] text-[#2f5387]">{stat.label}</p>
							</div>
						{/each}
					</div>
					<a
						href="/contact"
						class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2f5387] transition hover:text-[#f2a516]"
					>
						Discuss this approach
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
				<p class="text-xs font-semibold uppercase tracking-[0.28em] text-[#2f5387]">Rollout playbook</p>
				<h2 class="text-3xl font-semibold text-[#0b1730]">Consistent outcomes, site after site</h2>
				<p class="text-base text-[#1c2d52]/80">
					Our structured methodology keeps every engagement focused on measurable ROI and frontline adoption. Customers can scale quickly without compromising quality.
				</p>
			</div>
			<div class="rounded-3xl border border-[#d7e0f5] bg-white p-8 shadow-sm shadow-[#0b1730]/5">
				<ul class="space-y-6 text-sm text-[#1c2d52]/80">
					{#each rolloutPlaybook as item (item.step)}
						<li class="relative border-l-2 border-[#f2a516]/60 pl-6">
							<div class="absolute -left-[11px] top-1 h-5 w-5 rounded-full border-2 border-[#f2a516] bg-white"></div>
							<p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#2f5387]">{item.step}</p>
							<p class="mt-1 text-[#1c2d52]/70">{item.description}</p>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="mt-16 rounded-3xl border border-[#d7e0f5] bg-white p-10 shadow-sm shadow-[#0b1730]/5">
			<p class="text-xs font-semibold uppercase tracking-[0.22em] text-[#2f5387]">Customer voice</p>
			<p class="mt-4 text-2xl font-semibold text-[#0b1730]">"{testimony.quote}"</p>
			<p class="mt-6 text-sm font-semibold text-[#0b1730]">{testimony.person}</p>
			<p class="text-xs uppercase tracking-[0.18em] text-[#2f5387]">{testimony.title}</p>
		</div>
	</div>
</section>

<section class="relative overflow-hidden bg-[#0b1730] py-20 text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-5xl px-4 text-center">
		<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#f2a516]">Ready to explore a pilot?</p>
		<h2 class="mt-5 text-3xl font-semibold md:text-4xl">Let us map out the first 90 days</h2>
		<p class="mt-4 text-base text-white/80">
			Share a target facility or pain point and we will deliver a tailored deployment plan, cost model, and timeline within two weeks.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<a
				href="/contact"
				class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
			>
				Start a pilot conversation
			</a>
			<a
				href="/demo"
				class="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
			>
				Book a live demo
			</a>
		</div>
	</div>
</section>
