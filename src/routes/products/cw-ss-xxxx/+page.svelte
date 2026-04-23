<script lang="ts">
	import { resolve } from '$app/paths';
	import { locale } from 'svelte-i18n';

	import fieldInstallImage from './images/field-install.webp';
	import greenhouseBedInstallImage from './images/greenhouse-bed-install.webp';
	import greenhouseOverheadInstallImage from './images/greenhouse-overhead-install.webp';
	import openFieldRowCropImage from './images/open-field-row-crop.webp';

	type UseCase = {
		title: string;
		body: string;
	};

	type MetricCard = {
		eyebrow: string;
		title: string;
		body: string;
		bullets: string[];
	};

	type WorkflowStep = {
		step: string;
		title: string;
		body: string;
	};

	type SpecRow = {
		label: string;
		value: string;
	};

	const heroHighlights = ['Soil moisture', 'Soil temperature', 'Electrical conductivity'];

	const useCases: UseCase[] = [
		{
			title: 'Open-field row crops',
			body: 'Track root-zone conditions across broad-acre blocks without relying on spot checks alone.'
		},
		{
			title: 'Vegetable beds and fertigation zones',
			body: 'Compare irrigation sets, substrate behaviour, and nutrient delivery in high-value crops.'
		},
		{
			title: 'Greenhouses and high tunnels',
			body: 'Follow soil conditions under protected cultivation where timing and uniformity matter every day.'
		},
		{
			title: 'Trials and research plots',
			body: 'Create clean time-series datasets for treatment comparisons, irrigation strategy validation, and agronomy studies.'
		}
	];

	const metricCards: MetricCard[] = [
		{
			eyebrow: 'VWC',
			title: 'See soil moisture before the crop shows stress',
			body: 'Continuous volumetric water content readings make irrigation timing easier to defend and easier to improve.',
			bullets: [
				'Identify dry-down patterns between irrigation events.',
				'Compare blocks, rows, and greenhouse bays with the same workflow.',
				'Catch overwatering before it turns into labor, disease, or yield loss.'
			]
		},
		{
			eyebrow: 'Temperature',
			title: 'Track the root-zone environment, not just the air',
			body: 'Soil temperature adds context to emergence, root activity, and how quickly plants respond after irrigation changes.',
			bullets: [
				'Watch early-season conditions in outdoor fields.',
				'Compare protected and unprotected zones inside the same farm.',
				'Pair temperature shifts with moisture trends to understand crop response.'
			]
		},
		{
			eyebrow: 'EC',
			title: 'Keep conductivity in the same operational view',
			body: 'Electrical conductivity helps teams understand whether irrigation and nutrient programs are moving through the soil profile as expected.',
			bullets: [
				'Flag salinity build-up or uneven fertigation patterns.',
				'Review nutrient movement alongside irrigation decisions.',
				'Create cleaner records for farm managers, consultants, and researchers.'
			]
		}
	];

	const workflowSteps: WorkflowStep[] = [
		{
			step: '01',
			title: 'Field review',
			body: 'We map the crop layout, root-zone depth, and gateway coverage needed for the block, house, or pilot area.'
		},
		{
			step: '02',
			title: 'Installation planning',
			body: 'Sensor locations are selected around irrigation strategy, representative rows, and the operational questions your team actually needs answered.'
		},
		{
			step: '03',
			title: 'Threshold tuning',
			body: 'CropWatch configures reporting, alert thresholds, and dashboard views so readings are useful immediately, not weeks later.'
		},
		{
			step: '04',
			title: 'Season-long review',
			body: 'Teams use the same telemetry stream for irrigation decisions, grower communication, and post-season comparison across sites.'
		}
	];

	const specRows: SpecRow[] = [
		{ label: 'Product family', value: 'CW-SS-XXXX soil sensor' },
		{
			label: 'Primary measurements',
			value: 'Soil moisture (VWC), soil temperature, and electrical conductivity (EC)'
		},
		{
			label: 'Network path',
			value: 'LoRaWAN telemetry through CropWatch-compatible gateways into CropWatch Command'
		},
		{
			label: 'Deployment environments',
			value: 'Open fields, vegetable blocks, greenhouses, high tunnels, and research plots'
		},
		{
			label: 'Installation pattern',
			value:
				'Above-ground radio enclosure with below-ground sensing placed at crop-specific root depth'
		},
		{
			label: 'Operational output',
			value: 'Time-series charts, threshold alerts, historical review, and reporting exports'
		},
		{
			label: 'Configuration model',
			value: 'Reporting cadence, threshold bands, and placement strategy tuned per crop and site'
		}
	];

	const includedItems = [
		'Soil telemetry mapped into the same CropWatch workflow used for field and greenhouse monitoring.',
		'Deployment guidance for representative probe placement, gateway coverage, and reporting cadence.',
		'Alert and dashboard setup based on irrigation timing, dry-back windows, and crop-specific review needs.',
		'Operational support for pilots, side-by-side trials, and scaled production rollouts.'
	];

	const dataFlow = [
		'Probe readings capture moisture, temperature, and EC at the root zone.',
		'LoRaWAN backhaul moves data through the nearest CropWatch gateway.',
		'CropWatch Command stores the stream as time-series telemetry for review and alerts.',
		'Growers, agronomists, and operators compare zones and act on the same dataset.'
	];
</script>

<svelte:head>
	<title>CropWatch CW-SS-XXXX | Soil Sensor for Field and Greenhouse Growing</title>
	<meta
		name="description"
		content="Deploy the CropWatch CW-SS-XXXX soil sensor to monitor soil moisture, temperature, and EC across row crops, vegetable beds, and greenhouse environments."
	/>
	<meta property="og:image" content={`https://www.cropwatch.com${fieldInstallImage}`} />
	<meta property="og:site_name" content="CropWatch" />
	<meta property="og:type" content="website.product" />
	<meta property="og:title" content="CropWatch CW-SS-XXXX soil sensor" />
	<meta
		property="og:description"
		content="Continuous soil moisture, soil temperature, and EC telemetry for open-field and protected agriculture."
	/>
	<meta property="og:url" content="https://www.cropwatch.com/products/cw-ss-xxxx" />
	<meta property="og:locale" content={$locale} />
</svelte:head>

<section class="relative isolate overflow-hidden bg-[#0b1730] py-24 text-white">
	<div
		class="pointer-events-none absolute top-10 -right-20 h-56 w-56 rounded-full border border-white/10"
	></div>
	<div
		class="pointer-events-none absolute bottom-10 -left-16 h-40 w-40 rounded-full border border-[#f2a516]/20"
	></div>
	<div
		class="relative mx-auto grid w-full max-w-6xl gap-12 px-4 lg:grid-cols-[0.92fr_1.08fr] lg:items-center"
	>
		<div class="space-y-7">
			<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
				CW-SS-XXXX Soil Sensor
			</p>
			<h1 class="max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
				Continuous soil telemetry for field blocks, fertigation zones, and greenhouse crops
			</h1>
			<p class="max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
				The CropWatch soil sensor gives growers and farm operators a clearer view of what is
				happening at the root zone by streaming soil moisture, soil temperature, and EC into one
				monitoring workflow.
			</p>
			<p class="max-w-2xl text-base leading-relaxed text-white/72">
				Built for agriculture first, it fits the realities of open-field growing, protected
				cultivation, and side-by-side trials where irrigation timing and consistency directly affect
				crop outcomes.
			</p>
			<div class="flex flex-wrap gap-3">
				{#each heroHighlights as highlight (highlight)}
					<span
						class="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/88 backdrop-blur-sm"
					>
						{highlight}
					</span>
				{/each}
			</div>
			<div class="flex flex-wrap gap-4">
				<a
					href={resolve('/contact')}
					class="inline-flex items-center justify-center rounded-full bg-[#f2a516] px-7 py-3 text-sm font-semibold text-[#0b1730] transition hover:bg-[#ffbb34] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
				>
					Talk to a specialist
				</a>
				<a
					href="#specifications"
					class="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
				>
					See product details
				</a>
			</div>
		</div>

		<div class="space-y-5">
			<div
				class="overflow-hidden rounded-[30px] border border-white/15 bg-white/8 p-4 shadow-2xl shadow-black/25 backdrop-blur-sm"
			>
				<picture>
					<source srcset={openFieldRowCropImage} type="image/webp" />
					<img
						src={openFieldRowCropImage}
						alt="CropWatch soil sensor installed beside an outdoor vegetable row with crop beds stretching into the field."
						class="aspect-[16/11] w-full rounded-[22px] object-cover"
						fetchpriority="high"
					/>
				</picture>
				<div class="mt-4 grid gap-3 sm:grid-cols-3">
					<div class="rounded-2xl border border-white/12 bg-[#07111f]/40 p-4">
						<p class="text-xs font-semibold tracking-[0.28em] text-[#89bb62] uppercase">Measures</p>
						<p class="mt-2 text-sm text-white/80">
							Moisture, temperature, and EC in one field-ready workflow.
						</p>
					</div>
					<div class="rounded-2xl border border-white/12 bg-[#07111f]/40 p-4">
						<p class="text-xs font-semibold tracking-[0.28em] text-[#89bb62] uppercase">Fits</p>
						<p class="mt-2 text-sm text-white/80">
							Row crops, high-value vegetables, protected houses, and trials.
						</p>
					</div>
					<div class="rounded-2xl border border-white/12 bg-[#07111f]/40 p-4">
						<p class="text-xs font-semibold tracking-[0.28em] text-[#89bb62] uppercase">Backhaul</p>
						<p class="mt-2 text-sm text-white/80">
							LoRaWAN connectivity across the same CropWatch deployment stack.
						</p>
					</div>
				</div>
			</div>
			<div
				class="rounded-[30px] border border-white/12 bg-[#07111f]/45 p-6 shadow-lg shadow-black/20 backdrop-blur-sm"
			>
				<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
					Why it matters
				</p>
				<ul class="mt-4 space-y-3 text-sm leading-relaxed text-white/78">
					<li class="flex items-start gap-3">
						<span class="mt-1.5 h-2 w-2 flex-none rounded-full bg-[#f2a516]"></span>
						<span
							>Give irrigation decisions root-zone context instead of relying on visual stress
							alone.</span
						>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1.5 h-2 w-2 flex-none rounded-full bg-[#f2a516]"></span>
						<span>Compare fields, rows, and greenhouse bays in one reporting system.</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1.5 h-2 w-2 flex-none rounded-full bg-[#f2a516]"></span>
						<span>Build cleaner evidence for consultants, owners, and post-season reviews.</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-24">
	<div class="mx-auto grid w-full max-w-6xl gap-10 px-4 lg:grid-cols-[0.86fr_1.14fr]">
		<div class="space-y-5">
			<p class="text-xs font-semibold tracking-[0.32em] text-[#2f5387] uppercase">
				Application fit
			</p>
			<h2 class="max-w-xl text-3xl font-semibold text-[#0b1730] md:text-4xl">
				Built for the way farms and greenhouses actually operate
			</h2>
			<p class="text-base leading-relaxed text-slate-600">
				This page is shaped around agricultural use, not a generic industrial template. The sensor
				is positioned for crews who need reliable soil telemetry across real irrigation schedules,
				changing weather, and production environments that rarely look the same from one block to
				the next.
			</p>
			<div
				class="rounded-[28px] border border-[#d8e4d2] bg-[#f4f8f1] p-6 shadow-sm shadow-[#0b1730]/5"
			>
				<p class="text-sm font-semibold text-[#0b1730]">Operational focus</p>
				<p class="mt-3 text-sm leading-relaxed text-slate-600">
					Use one deployment approach to compare outdoor fields, greenhouse rows, and pilot plots
					while keeping reporting, alerts, and historical review in the same CropWatch workflow.
				</p>
			</div>
		</div>
		<div class="grid gap-5 sm:grid-cols-2">
			{#each useCases as item (item.title)}
				<article
					class="rounded-[28px] border border-[#d7e0f5] bg-white p-6 shadow-lg shadow-slate-200/70"
				>
					<p class="text-lg font-semibold text-[#0b1730]">{item.title}</p>
					<p class="mt-3 text-sm leading-relaxed text-slate-600">{item.body}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#f5f7fb] py-24">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="max-w-3xl">
			<p class="text-xs font-semibold tracking-[0.32em] text-[#2f5387] uppercase">In the field</p>
			<h2 class="mt-3 text-3xl font-semibold text-[#0b1730] md:text-4xl">
				Installed where agronomic decisions get made
			</h2>
			<p class="mt-4 text-base leading-relaxed text-slate-600">
				The current product photography already tells the right story: open-field deployment,
				bed-level visibility, and greenhouse installation patterns that keep the device out of the
				way while still preserving coverage.
			</p>
		</div>

		<div class="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr_0.78fr]">
			<article
				class="overflow-hidden rounded-[30px] border border-white/70 bg-white shadow-xl shadow-slate-200/70 lg:col-span-2"
			>
				<picture>
					<source srcset={fieldInstallImage} type="image/webp" />
					<img
						src={fieldInstallImage}
						alt="CropWatch soil sensor mounted on a wooden post in a leafy open field."
						class="aspect-[16/10] w-full object-cover"
						loading="lazy"
						decoding="async"
					/>
				</picture>
				<div class="p-6">
					<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
						Field install
					</p>
					<h3 class="mt-2 text-2xl font-semibold text-[#0b1730]">
						Clean placement with a strong radio path
					</h3>
					<p class="mt-3 text-sm leading-relaxed text-slate-600">
						The enclosure stays visible and serviceable above the canopy while the sensing point
						stays focused on the root zone below.
					</p>
				</div>
			</article>

			<article
				class="overflow-hidden rounded-[30px] border border-white/70 bg-white shadow-xl shadow-slate-200/70 lg:row-span-2"
			>
				<picture>
					<source srcset={greenhouseOverheadInstallImage} type="image/webp" />
					<img
						src={greenhouseOverheadInstallImage}
						alt="CropWatch soil sensor mounted overhead inside a greenhouse with crops growing below."
						class="aspect-[5/8] w-full object-cover"
						loading="lazy"
						decoding="async"
					/>
				</picture>
				<div class="p-6">
					<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
						Greenhouse routing
					</p>
					<h3 class="mt-2 text-xl font-semibold text-[#0b1730]">
						Ready for protected cultivation layouts
					</h3>
					<p class="mt-3 text-sm leading-relaxed text-slate-600">
						Mounting options can follow the structure of the house so staff keep access to rows,
						trellis lines, and work aisles.
					</p>
				</div>
			</article>

			<article
				class="overflow-hidden rounded-[30px] border border-white/70 bg-white shadow-xl shadow-slate-200/70"
			>
				<picture>
					<source srcset={greenhouseBedInstallImage} type="image/webp" />
					<img
						src={greenhouseBedInstallImage}
						alt="CropWatch soil sensor installed along a greenhouse crop bed beside pepper plants."
						class="aspect-[16/10] w-full object-cover"
						loading="lazy"
						decoding="async"
					/>
				</picture>
				<div class="p-6">
					<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
						Bed-level visibility
					</p>
					<h3 class="mt-2 text-xl font-semibold text-[#0b1730]">
						Placed close to the crop, not hidden from maintenance
					</h3>
					<p class="mt-3 text-sm leading-relaxed text-slate-600">
						The deployment style works in structured rows where growers need repeatable comparisons
						between bays or treatments.
					</p>
				</div>
			</article>
		</div>
	</div>
</section>

<section class="relative overflow-hidden bg-[#0b1730] py-24 text-white">
	<div
		class="pointer-events-none absolute top-10 -right-20 h-56 w-56 rounded-full border border-white/10"
	></div>
	<div class="relative mx-auto grid w-full max-w-6xl gap-10 px-4 lg:grid-cols-[1.08fr_0.92fr]">
		<div>
			<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
				Telemetry stack
			</p>
			<h2 class="mt-3 max-w-3xl text-3xl font-semibold md:text-4xl">
				Three soil measurements, one operational picture
			</h2>
			<div class="mt-10 grid gap-6 md:grid-cols-3">
				{#each metricCards as card (card.title)}
					<article class="rounded-[28px] border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
						<p class="text-xs font-semibold tracking-[0.28em] text-[#89bb62] uppercase">
							{card.eyebrow}
						</p>
						<h3 class="mt-3 text-xl font-semibold text-white">{card.title}</h3>
						<p class="mt-3 text-sm leading-relaxed text-white/72">{card.body}</p>
						<ul class="mt-5 space-y-3 text-sm text-white/72">
							{#each card.bullets as bullet (bullet)}
								<li class="flex items-start gap-3">
									<span class="mt-1.5 h-2 w-2 flex-none rounded-full bg-[#f2a516]"></span>
									<span>{bullet}</span>
								</li>
							{/each}
						</ul>
					</article>
				{/each}
			</div>
		</div>

		<aside
			class="rounded-[32px] border border-white/10 bg-white/7 p-7 shadow-2xl shadow-black/25 backdrop-blur-sm"
		>
			<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
				From root zone to report
			</p>
			<h3 class="mt-3 text-2xl font-semibold text-white">
				Data flow that stays usable in the real season
			</h3>
			<p class="mt-4 text-sm leading-relaxed text-white/72">
				The value is not just collecting readings. It is moving those readings into a system your
				team can compare, review, and act on without rebuilding the workflow for every crop or every
				site.
			</p>
			<ol class="mt-6 space-y-4">
				{#each dataFlow as item, index (`${index}-${item}`)}
					<li class="flex gap-4 rounded-2xl border border-white/10 bg-[#07111f]/42 px-4 py-4">
						<span
							class="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#f2a516] text-sm font-semibold text-[#0b1730]"
						>
							{index + 1}
						</span>
						<p class="text-sm leading-relaxed text-white/78">{item}</p>
					</li>
				{/each}
			</ol>
		</aside>
	</div>
</section>

<section class="bg-white py-24">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="max-w-3xl">
			<p class="text-xs font-semibold tracking-[0.32em] text-[#2f5387] uppercase">
				Deployment workflow
			</p>
			<h2 class="mt-3 text-3xl font-semibold text-[#0b1730] md:text-4xl">
				A rollout process designed for agriculture, not a generic sensor install
			</h2>
			<p class="mt-4 text-base leading-relaxed text-slate-600">
				Each farm has different irrigation schedules, crop geometry, and management questions. The
				deployment model is meant to turn those differences into a useful monitoring layout instead
				of forcing every site into the same template.
			</p>
		</div>

		<div class="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
			{#each workflowSteps as step (step.step)}
				<article
					class="rounded-[30px] border border-[#d7e0f5] bg-[#f8fafc] p-6 shadow-sm shadow-slate-200/70"
				>
					<span
						class="inline-flex rounded-full bg-[#dfead6] px-3 py-1 text-xs font-semibold tracking-[0.22em] text-[#275236]"
					>
						{step.step}
					</span>
					<h3 class="mt-4 text-xl font-semibold text-[#0b1730]">{step.title}</h3>
					<p class="mt-3 text-sm leading-relaxed text-slate-600">{step.body}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<section id="specifications" class="bg-[#f5f7fb] py-24">
	<div
		class="mx-auto grid w-full max-w-6xl gap-10 px-4 lg:grid-cols-[1.02fr_0.98fr] lg:items-start"
	>
		<div>
			<p class="text-xs font-semibold tracking-[0.32em] text-[#2f5387] uppercase">
				Product details
			</p>
			<h2 class="mt-3 text-3xl font-semibold text-[#0b1730] md:text-4xl">
				Configured around the crop and site
			</h2>
			<div
				class="mt-8 overflow-hidden rounded-[30px] border border-[#d7e0f5] bg-white shadow-sm shadow-slate-200/70"
			>
				<table class="w-full text-left text-sm text-slate-600">
					<tbody>
						{#each specRows as row (row.label)}
							<tr class="border-b border-[#d7e0f5] last:border-none">
								<th
									class="w-[34%] bg-[#f8fafc] px-6 py-4 text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>
									{row.label}
								</th>
								<td class="px-6 py-4 text-sm text-[#0b1730]">{row.value}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<div class="space-y-6">
			<article
				class="rounded-[30px] border border-[#d7e0f5] bg-white p-7 shadow-sm shadow-slate-200/70"
			>
				<p class="text-xs font-semibold tracking-[0.32em] text-[#2f5387] uppercase">
					What growers get
				</p>
				<h3 class="mt-3 text-2xl font-semibold text-[#0b1730]">
					More than a sensor on a spec sheet
				</h3>
				<ul class="mt-5 space-y-3 text-sm leading-relaxed text-slate-600">
					{#each includedItems as item (item)}
						<li class="flex items-start gap-3">
							<span class="mt-1.5 h-2 w-2 flex-none rounded-full bg-[#f2a516]"></span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</article>

			<article
				class="rounded-[30px] border border-[#d9e5d2] bg-[#edf5e8] p-7 shadow-sm shadow-slate-200/70"
			>
				<p class="text-xs font-semibold tracking-[0.32em] text-[#275236] uppercase">
					Implementation note
				</p>
				<p class="mt-3 text-sm leading-relaxed text-slate-700">
					Final placement depth, reporting cadence, and threshold strategy should be tuned around
					crop type, soil profile, irrigation method, and the management question you want the
					telemetry to answer.
				</p>
			</article>
		</div>
	</div>
</section>

<section class="bg-[#11213c] py-24 text-white">
	<div class="mx-auto grid w-full max-w-6xl gap-8 px-4 lg:grid-cols-[1fr_auto] lg:items-end">
		<div>
			<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">Next step</p>
			<h2 class="mt-3 max-w-3xl text-3xl font-semibold md:text-4xl">
				Plan a soil telemetry rollout that matches your crop, your irrigation strategy, and your
				season
			</h2>
			<p class="mt-4 max-w-3xl text-base leading-relaxed text-white/76">
				Share the crop, growing environment, and the decisions you want to improve. CropWatch can
				help map sensor placement, gateway coverage, alerting strategy, and dashboard views for the
				operation you are actually running.
			</p>
		</div>
		<div class="flex flex-wrap gap-4 lg:justify-end">
			<a
				href={resolve('/contact')}
				class="inline-flex items-center justify-center rounded-full bg-[#f2a516] px-7 py-3 text-sm font-semibold text-[#0b1730] transition hover:bg-[#ffbb34] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
			>
				Request a deployment review
			</a>
			<a
				href={resolve('/case-studies')}
				class="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
			>
				See related work
			</a>
		</div>
	</div>
</section>
