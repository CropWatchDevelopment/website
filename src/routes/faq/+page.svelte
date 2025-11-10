<script lang="ts">
	import MaterialIcon from '$lib/components/MaterialIcon.svelte';

	const heroHighlights = [
		'Pilot deployments reach production readiness in under 30 days.',
		'Sensors ship pre-calibrated with ISO 17025 traceability and serial tracking.',
		'24/7 network monitoring and automated firmware updates keep data flowing.'
	];

	const faqSections = [
		{
			title: 'Deployment & Hardware',
			description: 'Plan your rollout with confidence, from site surveys to ongoing maintenance.',
			items: [
				{
					question: 'What maintenance do the sensors require over time?',
					answer:
						'Each device is engineered for a 10+ year battery life and maintenance-free operation. When service is eventually required, field-replaceable battery sleds and hot-swappable sensor modules keep downtime under five minutes.',
					points: [
						'Scheduled health checks run automatically and alert you long before a battery nears depletion.',
						'All replacements ship pre-calibrated with cloud-stored certificates ready to activate.',
						'As of 2025-OCT-01, replacement parts must be ordered via phone, or email. Items will be shipped between 1 day to 2 months of purchase date depending on stock and inventory.'
					]
				},
				{
					question: 'Can we scale the fleet without interrupting production?',
					answer:
						'Yes. Gateways provision new sensors over the air, so you can add devices in phased batches. Profiles, alerts, and dashboards inherit your existing configuration to keep operations uninterrupted.'
				}
			]
		},
		{
			title: 'Connectivity & Coverage',
			description: 'Ensure LoRaWAN coverage in dense industrial environments.',
			items: [
				{
					question: 'What happens if our site has limited or no cellular service?',
					answer:
						'CropWatch gateways form a private LoRaWAN network that does not depend on carrier signals. Gateways backhaul over Ethernet, Wi-Fi, or LTE where available, and every sensor buffers readings locally during outages to prevent data loss.'
				},
				{
					question: 'How far can sensors communicate through dense materials?',
					answer:
						'Indoor range exceeds 3,500 feet in typical warehouses and cold storage. Concrete, steel, and refrigeration lines are mitigated with tuned antennas and optional repeater nodes placed during your RF survey.'
				},
				{
					question: 'Do gateways support redundancy?',
					answer:
						'Yes. We design dual-path coverage with overlapping gateways. If one gateway is offline, neighboring hardware automatically accepts traffic, and the network operations center is alerted for proactive remediation.'
				}
			]
		},
		{
			title: 'Data & Integrations',
			description: 'Deliver trustworthy readings to the systems your teams already use.',
			items: [
				{
					question: 'How is sensor data validated before it reaches our dashboards?',
					answer:
						'Dual sensing elements capture each reading with a tie-breaker channel to arbitrate anomalies. Firmware applies drift detection, and the platform flags deviations long before compliance thresholds are missed.'
				},
				{
					question: 'Can CropWatch integrate with our BI stack or CMMS?',
					answer:
						'Absolutely. REST and GraphQL APIs, outbound webhooks, and native connectors push data into Power BI, Tableau, Snowflake, and major CMMS platforms. Role-based access controls keep integrations scoped to the data you approve.',
					points: [
						'Export raw or aggregated readings on demand, including calibration metadata.',
						'Automate work orders by triggering maintenance tickets from alert policies.'
					]
				},
				{
					question: 'Where is data stored and how is it secured?',
					answer:
						'Data resides in redundant SOC 2 Type II cloud regions with encryption in transit (TLS 1.2+) and at rest (AES-256). Granular audit logs track every access, and optional single sign-on keeps authentication aligned with your identity provider.'
				}
			]
		},
		{
			title: 'Commercial & Support',
			description: 'Understand pricing, service tiers, and the help available to your team.',
			items: [
				{
					question: 'Do you offer a pilot before a full rollout?',
					answer:
						'Yes. Our seven-day proof-of-value bundle instruments a high-risk environment with guided ROI tracking. Findings feed directly into your executive business case.'
				},
				{
					question: 'How do we reach support if something goes wrong?',
					answer:
						'Operations specialists monitor deployments around the clock. You can open tickets in the portal, email, or contact us by phone for urgent issues.'
				},
				{
					question: 'Can you provide NET 30/60/90/180 financing terms?',
					answer:
						"We've offered financing options in the past; however, at this time we're unable to extend financial terms for new hardware purchases."
				}
			]
		}
	];

	const resourceHighlights = [
		{
			title: 'Deployment Checklist',
			description: 'Step-by-step tasks for facilities, IT, and compliance stakeholders ahead of go-live.',
			link: { label: 'Download the checklist', href: '/resources/deployment-checklist' }
		},
		{
			title: 'Network Design Guide',
			description: 'RF modeling best practices to maximize coverage in complex industrial footprints.',
			link: { label: 'Review the guide', href: '/technology/network' }
		},
		{
			title: 'Power & Sensor Lifecycle',
			description: 'Battery longevity charts, calibration intervals, and replacement SOPs for technicians.',
			link: { label: 'View lifecycle resources', href: '/resources/battery-lifecycle' }
		}
	];

	let openItems: Record<string, boolean> = $state({ '0-0': true });

	function toggleItem(id: string) {
		openItems = { ...openItems, [id]: !openItems[id] };
	}
</script>

<svelte:head>
	<title>CropWatch FAQ | Answers About Industrial IoT Deployments</title>
	<meta
		name="description"
		content="Get quick answers about CropWatch industrial IoT sensors, LoRaWAN coverage, integrations, pricing, and support programs."
	/>
</svelte:head>

<section class="relative overflow-hidden bg-[#11213c] py-20 text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 md:grid-cols-[1.25fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#f2a516]">Support center</p>
				<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">Frequently asked questions about CropWatch</h1>
				<p class="text-base text-white/80">
					Everything you need to know about deploying rugged sensors, building resilient LoRaWAN networks, and keeping operations audit-ready.
				</p>
				<ul class="space-y-3 text-sm text-white/80">
					{#each heroHighlights as highlight}
						<li class="flex items-start gap-3">
							<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
							<span>{highlight}</span>
						</li>
					{/each}
				</ul>
				<div class="flex flex-wrap gap-3">
					<a
						href="/contact"
						class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
					>
						Contact support
					</a>
					<a
						href="/case-studies"
						class="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
					>
						Explore customer stories
					</a>
				</div>
			</div>
			<div class="rounded-3xl border border-white/20 bg-[#0b1730]/80 p-8 shadow-xl shadow-black/30 backdrop-blur">
				<h2 class="text-lg font-semibold text-white">Quick resolutions</h2>
				<p class="mt-2 text-sm text-white/70">Most troubleshooting is solved in minutes with these checkpoints.</p>
				<dl class="mt-6 space-y-4 text-sm text-white/80">
					<div class="flex items-start justify-between gap-6">
						<dt class="font-medium text-white">Gateway status</dt>
						<dd class="text-[#f2a516]">Confirm LEDs & push a health ping</dd>
					</div>
					<div class="flex items-start justify-between gap-6">
						<dt class="font-medium text-white">Sensor last check-in</dt>
						<dd class="text-[#f2a516]">See the 10-minute heartbeat timeline</dd>
					</div>
					<div class="flex items-start justify-between gap-6">
						<dt class="font-medium text-white">Alert routing</dt>
						<dd class="text-[#f2a516]">Verify escalation paths and contacts</dd>
					</div>
				</dl>
				<a
					target="_blank"
					href="https://stats.uptimerobot.com/1Z6H85HuHq"
					class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#f2a516] transition hover:text-white"
				>
					View live system status
					<span aria-hidden="true">→</span>
				</a>
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="mb-12 text-center">
			<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#2f5387]">Knowledge base</p>
			<h2 class="mt-4 text-3xl font-semibold text-[#0b1730]">Answers for every team in your rollout</h2>
			<p class="mt-3 text-base text-[#1c2d52]/80">
				From operations and IT to finance and compliance, find clear guidance on how CropWatch keeps facilities online and audit-ready.
			</p>
		</div>
		<div class="space-y-10">
			{#each faqSections as section, sectionIndex}
				<article class="rounded-3xl border border-[#d7e0f5] bg-[#f9fbff] p-8 shadow-sm shadow-[#0b1730]/5">
					<header class="mb-6 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
						<div>
							<h3 class="text-xl font-semibold text-[#0b1730]">{section.title}</h3>
							<p class="text-sm text-[#1c2d52]/75">{section.description}</p>
						</div>
						<a
							href="/contact"
							class="inline-flex items-center gap-2 text-sm font-semibold text-[#2f5387] transition hover:text-[#f2a516]"
						>
							Talk with a specialist
							<span aria-hidden="true">→</span>
						</a>
					</header>
					<div class="space-y-4">
						{#each section.items as item, itemIndex}
							{@const itemId = `${sectionIndex}-${itemIndex}`}
							{@const panelId = `faq-panel-${sectionIndex}-${itemIndex}`}
							<div class="rounded-2xl border border-[#d7e0f5] bg-white">
								<button
									type="button"
									class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-[#0b1730] transition hover:bg-[#f5f7fb] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5387]"
									onclick={() => toggleItem(itemId)}
									aria-expanded={!!openItems[itemId]}
									aria-controls={panelId}
								>
									<span>{item.question}</span>
									<MaterialIcon
										name={openItems[itemId] ? 'expand_less' : 'expand_more'}
										variant="outlined"
										size={24}
										collection="icons"
									/>
								</button>
								{#if openItems[itemId]}
									<div id={panelId} class="space-y-4 border-t border-[#d7e0f5] px-5 pb-5 pt-4 text-sm text-[#1c2d52]/80">
										<p>{item.answer}</p>
										{#if item.points}
											<ul class="space-y-2 text-[#1c2d52]/75">
												{#each item.points as point}
													<li class="flex items-start gap-2">
														<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
														<span>{point}</span>
													</li>
												{/each}
											</ul>
										{/if}
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
			<div>
				<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#2f5387]">Helpful resources</p>
				<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">Guides to accelerate your rollout</h2>
				<p class="mt-3 max-w-2xl text-base text-[#1c2d52]/80">
					Share these playbooks with operations, IT, and compliance teams to streamline pilots and enterprise expansions.
				</p>
			</div>
			<a
				href="/contact"
				class="inline-flex items-center gap-2 rounded-full border border-[#d7e0f5] px-5 py-3 text-sm font-semibold text-[#2f5387] transition hover:border-[#2f5387] hover:text-[#2f5387]"
			>
				Request tailored documentation
			</a>
		</div>
		<div class="grid gap-6 md:grid-cols-3">
			{#each resourceHighlights as resource (resource.title)}
				<div class="flex h-full flex-col rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5">
					<h3 class="text-lg font-semibold text-[#0b1730]">{resource.title}</h3>
					<p class="mt-3 text-sm text-[#1c2d52]/75">{resource.description}</p>
					<a
						class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2f5387] transition hover:text-[#f2a516]"
						href={resource.link.href}
					>
						{resource.link.label}
						<span aria-hidden="true">→</span>
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="relative overflow-hidden bg-[#0b1730] py-20 text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-5xl px-4 text-center">
		<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#f2a516]">Need a deeper dive?</p>
		<h2 class="mt-5 text-3xl font-semibold md:text-4xl">Schedule a white-glove consult with our IoT engineers</h2>
		<p class="mt-4 text-base text-white/80">
			Bring us your facility maps, compliance targets, and ROI goals—we will co-author a deployment blueprint you can share with leadership.
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
				See proven results
			</a>
		</div>
	</div>
</section>
