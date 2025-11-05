<script lang="ts">
	import ProductOrigin from '$lib/components/product-origin.svelte';
    import deviceSideViewImage from './images/device-side-view.webp';

	const featureHighlights = [
		{
			title: 'Rugged industrial enclosure',
			description: 'IP67-rated shell with conformal coated electronics keeps the sensor operating in freezers, loading docks, and production floors.'
		},
		{
			title: 'Precision monitoring',
			description: 'High-accuracy digital sensing provides +/- 0.2°C temperature and +/- 2% RH readings for compliance-ready reporting.'
		},
		{
			title: 'Multi-year battery life',
			description: 'Engineered for more than five years of continuous telemetry with field-replaceable lithium batteries and low-power firmware.'
		},
		{
			title: 'LoRaWAN connectivity',
			description: 'Secure LoRaWAN connectivity ensures resilient transmission through dense infrastructure and cold storage insulation.'
		}
	];

	const specificationMatrix = [
		{ label: 'Temperature range', value: '-40°C to 85°C (calibrated)' },
		{ label: 'Humidity range', value: '0% to 100% RH (non-condensing)' },
		{ label: 'Temperature accuracy', value: '+/- 0.2°C between -10°C and 50°C' },
		{ label: 'Humidity accuracy', value: '+/- 2% RH between 10% and 90%' },
		{ label: 'Ingress protection', value: 'IP67 enclosure with stainless steel mounting kit' },
		{ label: 'Wireless protocol', value: 'LoRaWAN 1.0.4 Class A, regional bands supported' },
		{ label: 'Battery', value: 'Dual 3.6V lithium primary cells, field replaceable' },
		{ label: 'Dimensions', value: '120 mm x 70 mm x 35 mm' },
		{ label: 'Operating life', value: 'Up to 5 years at 15 minute intervals' },
		{ label: 'Certifications', value: 'FCC, CE, IC, HACCP compliant materials' }
	];

	const kitContents = [
		'CW Air TH sensor with pre-configured firmware',
		'LoRaWAN activation credentials and QR deployment tag',
		'Stainless steel mounting bracket with hardware and adhesive pads',
		'Calibration certificate and validation documentation',
		'Install and cold storage handling playbook'
	];

	const deploymentWorkflow = [
		{
			title: 'Site planning',
			description: 'CropWatch specialists map facility zones, determine gateway placement, and align telemetry intervals with compliance needs.'
		},
		{
			title: 'Rapid install',
			description: 'Technicians mount sensors using magnetic, adhesive, or bracket hardware options without disrupting production.'
		},
		{
			title: 'Automated validation',
			description: 'Sensors perform baseline calibration checks and register with CropWatch Command for continuous monitoring.'
		},
		{
			title: 'Insight delivery',
			description: 'Real-time dashboards, alerts, and audit-ready reports empower teams to resolve anomalies before they escalate.'
		}
	];
</script>

<svelte:head>
	<title>CropWatch CW Air TH | Industrial Temperature & Humidity Sensor</title>
	<meta
		name="description"
		content="Deploy the CW Air TH sensor for reliable temperature and humidity monitoring across cold storage, hospitality, and industrial environments."
	/>
</svelte:head>

<section class="relative overflow-hidden bg-[#11213c] py-20 text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#f2a516]">CW Air TH</p>
				<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">Rugged temperature and humidity telemetry built for critical environments</h1>
				<p class="text-base text-white/80">
					The CW Air TH sensor combines precision sensing, long-life power, and LoRaWAN connectivity to keep cold storage, hospitality, and industrial sites informed in real time.
				</p>
				<p class="text-base text-white/80">
					Deploy the sensor as part of CropWatch Command for proactive alerts, compliance documentation, and predictable operations across every facility.
				</p>
				<div class="flex flex-wrap gap-4">
					<a
						href="/contact"
						class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
					>
						Talk to a specialist
					</a>
					<a
						href="/demo"
						class="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
					>
						See platform demo
					</a>
				</div>
			</div>
			<div class="rounded-3xl border border-white/20 bg-[#0b1730]/80 p-8 shadow-xl shadow-black/30 backdrop-blur">
				<h2 class="text-lg font-semibold text-white">Designed for demanding operators</h2>
                <picture>
                    <source srcset={deviceSideViewImage} type="image/webp" />
                    <img src={deviceSideViewImage} alt="CW Air TH sensor side view" class="mt-4 w-full rounded-lg border border-white/10 shadow-md shadow-black/20" />
                </picture>
				<ul class="mt-6 space-y-4 text-sm text-white/80">
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>Validated for HACCP, FDA, and ISO-compliant programs.</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>Ships pre-provisioned for CropWatch gateways to eliminate manual setup.</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>Access predictive analytics and alerting through CropWatch Command.</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold uppercase tracking-[0.28em] text-[#2f5387]">Key capabilities</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">Why operations teams choose the CW Air TH sensor</h2>
		<p class="mt-4 max-w-3xl text-base text-[#1c2d52]/80">
			Purpose-built hardware, enterprise-grade connectivity, and streamlined deployment support give facility leaders the insight they need to protect product quality and uptime.
		</p>
		<div class="mt-10 grid gap-6 text-sm text-[#1c2d52]/80 md:grid-cols-2">
			{#each featureHighlights as feature (feature.title)}
				<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 shadow-sm shadow-[#0b1730]/5">
					<p class="text-base font-semibold text-[#0b1730]">{feature.title}</p>
					<p class="mt-2 text-sm text-[#1c2d52]/80">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold uppercase tracking-[0.28em] text-[#2f5387]">Technical specifications</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">Engineered for reliability</h2>
		<div class="mt-8 overflow-hidden rounded-3xl border border-[#d7e0f5] bg-white shadow-sm shadow-[#0b1730]/5">
			<table class="w-full text-left text-sm text-[#1c2d52]/80">
				<tbody>
					{#each specificationMatrix as spec (spec.label)}
						<tr class="border-b border-[#d7e0f5]/80 last:border-none">
							<th class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-[#2f5387]">{spec.label}</th>
							<td class="px-6 py-4 text-sm text-[#0b1730]">{spec.value}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</section>

<section class="bg-white py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-10 md:grid-cols-[1.15fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold uppercase tracking-[0.28em] text-[#2f5387]">Deployment kit</p>
				<h2 class="text-3xl font-semibold text-[#0b1730]">Everything you need to go live in days</h2>
				<p class="text-base text-[#1c2d52]/80">
					Every CW Air TH sensor arrives fully configured and ready to join CropWatch Command, with mounting options and documentation tailored to regulated environments.
				</p>
			</div>
			<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-8 shadow-sm shadow-[#0b1730]/5">
				<ul class="space-y-4 text-sm text-[#1c2d52]/80">
					{#each kitContents as item (item)}
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

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold uppercase tracking-[0.28em] text-[#2f5387]">How we deploy</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">Proven rollout workflow</h2>
		<p class="mt-4 max-w-3xl text-base text-[#1c2d52]/80">
			Our hybrid deployment model keeps install timelines short while ensuring every stakeholder has the training, telemetry, and reporting they need to succeed.
		</p>
		<div class="mt-10 grid gap-8 md:grid-cols-4">
			{#each deploymentWorkflow as step (step.title)}
				<div class="rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5">
					<p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#2f5387]">{step.title}</p>
					<p class="mt-3 text-sm text-[#1c2d52]/80">{step.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section id="product-origin">
	<ProductOrigin />
</section>

<section class="relative overflow-hidden bg-[#0b1730] py-20 text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-5xl px-4 text-center">
		<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#f2a516]">See CW Air TH in action</p>
		<h2 class="mt-5 text-3xl font-semibold md:text-4xl">Schedule a walkthrough or start a pilot</h2>
		<p class="mt-4 text-base text-white/80">
			Connect with CropWatch specialists to map out sensor placement, gateways, and analytics that keep your environments compliant and efficient.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<a
				href="/contact"
				class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
			>
				Plan my deployment
			</a>
			<a
				href="/case-studies"
				class="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
			>
				Explore customer results
			</a>
		</div>
	</div>
</section>
