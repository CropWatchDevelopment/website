<script lang="ts">
	const milestones = [
		{
			year: '2016',
			title: 'First crop network deployed',
			description: 'Partnered with a 40,000 acre citrus grower to prove LoRa-based microclimate monitoring at scale.'
		},
		{
			year: '2018',
			title: 'Global sensor coverage',
			description: 'Expanded gateway fleet across six countries with ruggedized hardware rated for harsh industrial environments.'
		},
		{
			year: '2021',
			title: 'CropWatch analytics launch',
			description: 'Delivered predictive dashboards and anomaly detection tuned for cold chain, hospitality, and manufacturing customers.'
		},
		{
			year: '2024',
			title: 'Enterprise reliability standard',
			description: 'Achieved 99.98% network uptime backed by 24/7 operations hubs and proactive firmware orchestration.'
		}
	];

	const leadershipTeam = [
		{
			name: 'Evelyn Ortiz',
			title: 'Chief Executive Officer',
			bio: 'Former logistics executive who led connected supply chain programs for Fortune 100 grocers and retailers.'
		},
		{
			name: 'Marcus Boyd',
			title: 'Chief Technology Officer',
			bio: 'Architected low-power sensor networks on three continents; co-authored the LoRa Edge deployment framework.'
		},
		{
			name: 'Priya Nandan',
			title: 'Chief Customer Officer',
			bio: 'Built cross-functional customer success programs delivering double-digit ROI across cold storage and hospitality portfolios.'
		},
		{
			name: 'Greg Tanaka',
			title: 'Head of Product',
			bio: 'Former NASA systems engineer applying mission-critical telemetry practices to industrial IoT analytics.'
		}
	];

	const values = [
		{
			title: 'Operational certainty',
			description: 'We engineer every deployment to run without drama, with redundant gateways and predictive maintenance baked in.'
		},
		{
			title: 'Human-centered rollouts',
			description: 'Technicians, managers, and executives all get the playbooks, training, and context they need to adopt with confidence.'
		},
		{
			title: 'Proof of value first',
			description: 'Every program starts with measurable ROI targets and transparent reporting to keep momentum and trust.'
		}
	];
</script>

<svelte:head>
	<title>About CropWatch | Industrial IoT Built for Reliability</title>
	<meta
		name="description"
		content="Discover CropWatch's mission, leadership, and milestones as we deliver resilient IoT networks for cold storage, hospitality, and manufacturing."
	/>
</svelte:head>

<section class="relative overflow-hidden bg-[#11213c] py-20 text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#f2a516]">Our story</p>
				<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">Industrial insight meets resilient connectivity</h1>
				<p class="text-base text-white/80">
					CropWatch helps facility leaders maintain quality, compliance, and uptime by combining edge-resilient networks with analytics tuned for mission-critical environments.
				</p>
				<p class="text-base text-white/80">
					We started by safeguarding agricultural supply chains and now support industrial campuses, hotels, and cold storage fleets across three continents.
				</p>
				<div class="grid gap-4 text-sm text-white/80 md:grid-cols-2">
					<div class="rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
						<p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#f2a516]">99.98% uptime</p>
						<p class="mt-2 text-base font-semibold text-white">Backed by 24/7 operations teams</p>
					</div>
					<div class="rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
						<p class="text-sm font-semibold uppercase tracking-[0.22em] text-[#f2a516]">6 global hubs</p>
						<p class="mt-2 text-base font-semibold text-white">Sensor fleets monitored around the clock</p>
					</div>
				</div>
			</div>
			<div class="rounded-3xl border border-white/20 bg-[#0b1730]/80 p-8 shadow-xl shadow-black/30 backdrop-blur">
				<h2 class="text-lg font-semibold text-white">Built for demanding operators</h2>
				<p class="mt-3 text-sm text-white/70">
					Our teams blend RF engineering, industrial automation, and data science to deliver reliable insights where downtime is not an option.
				</p>
				<ul class="mt-6 space-y-4 text-sm text-white/80">
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>Certified specialists in HACCP, OSHA, and ISO 9001 compliance workflows.</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>Hybrid deployment model blending on-site technicians with remote command centers.</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>Industry partnerships with leading sensor manufacturers and cloud platforms.</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-10 md:grid-cols-[1.2fr_1fr]">
			<div class="space-y-6">
				<p class="text-xs font-semibold uppercase tracking-[0.28em] text-[#2f5387]">Milestones</p>
				<h2 class="text-3xl font-semibold text-[#0b1730]">From regional pilot to global coverage</h2>
				<p class="text-base text-[#1c2d52]/80">
					We have scaled alongside customers who need feet-on-the-ground expertise paired with modern telemetry. Each milestone sharpened our ability to deliver measurable value.
				</p>
			</div>
			<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-8 shadow-sm shadow-[#0b1730]/5">
				<ul class="space-y-6 text-sm text-[#1c2d52]/80">
					{#each milestones as milestone (milestone.year)}
						<li class="relative border-l-2 border-[#f2a516]/60 pl-6">
							<div class="absolute -left-[11px] top-1 h-5 w-5 rounded-full border-2 border-[#f2a516] bg-white"></div>
							<p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#2f5387]">{milestone.year}</p>
							<p class="mt-1 text-base font-semibold text-[#0b1730]">{milestone.title}</p>
							<p class="mt-1 text-[#1c2d52]/70">{milestone.description}</p>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold uppercase tracking-[0.28em] text-[#2f5387]">Leadership</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">Experienced operators guiding every rollout</h2>
		<p class="mt-4 max-w-3xl text-base text-[#1c2d52]/80">
			Our leadership team brings deep experience in regulated industries, mission-critical infrastructure, and high-scale deployments, enabling CropWatch to deliver reliability from day one.
		</p>
		<div class="mt-10 grid gap-6 md:grid-cols-2">
			{#each leadershipTeam as leader (leader.name)}
				<div class="rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5">
					<p class="text-base font-semibold text-[#0b1730]">{leader.name}</p>
					<p class="text-sm font-medium uppercase tracking-[0.18em] text-[#2f5387]">{leader.title}</p>
					<p class="mt-3 text-sm text-[#1c2d52]/80">{leader.bio}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-white py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-10 md:grid-cols-[1.15fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold uppercase tracking-[0.28em] text-[#2f5387]">Values</p>
				<h2 class="text-3xl font-semibold text-[#0b1730]">Principles that keep customers at the center</h2>
				<p class="text-base text-[#1c2d52]/80">
					Every decision is measured against the uptime, compliance, and experience our customers expect. These values guide how we design, deploy, and support every project.
				</p>
			</div>
			<div class="space-y-6">
				{#each values as value (value.title)}
					<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 shadow-sm shadow-[#0b1730]/5">
						<p class="text-base font-semibold text-[#0b1730]">{value.title}</p>
						<p class="mt-2 text-sm text-[#1c2d52]/80">{value.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<section class="relative overflow-hidden bg-[#0b1730] py-20 text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-5xl px-4 text-center">
		<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#f2a516]">Join the mission</p>
		<h2 class="mt-5 text-3xl font-semibold md:text-4xl">We are hiring engineers, operators, and customer champions</h2>
		<p class="mt-4 text-base text-white/80">
			If you are passionate about building reliable systems for industries where downtime is not an option, we would love to meet you.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<a
				href="/careers"
				class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
			>
				Explore open roles
			</a>
			<a
				href="/contact"
				class="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
			>
				Talk to our team
			</a>
		</div>
	</div>
</section>
