<script lang="ts">
	import { onMount } from 'svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import PartsOrigin from '$lib/components/PartsOrigin.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { productSchema } from '$lib/seo/schema';

	interface Sensor {
		id: string;
		icon: string;
		name: string;
		tag: string;
		blurb: string;
		measures: string[];
		specs: [string, string][];
	}

	const SENSORS: Sensor[] = [
		{
			id: 'th',
			icon: 'thermostat',
			name: 'Food-Safe Temperature / Humidity',
			tag: 'CW-AIR-TH',
			blurb:
				'The everyday workhorse for cold-chain and food service. A food-safe housing reads air temperature, relative humidity and dew point with dual-sensor verification.',
			measures: ['Temperature', 'Humidity', 'Dew point'],
			specs: [
				['Accuracy', '±0.48 °C / ±1.8 %RH'],
				['Range', '−40 to +85 °C'],
				['Annual drift', 'typ. <0.01 °C/yr'],
				['Housing', 'Food-safe, IP66'],
				['Verification', 'Dual-sensor']
			]
		},
		{
			id: 'ppfd',
			icon: 'wb_sunny',
			name: 'PPFD - Photosynthetic Light',
			tag: 'CW-PPFD',
			blurb:
				'A horticultural quantum sensor measuring photosynthetic photon flux density at the canopy, with PPFD and a running DLI total derived on-device.',
			measures: ['PPFD', 'DLI'],
			specs: [
				['Spectral range', '350-1000 nm (PAR)'],
				['Output', 'PPFD µmol/m²/s'],
				['Derived', 'DLI mol/m²/day'],
				['Housing', 'UV-stable, IP66']
			]
		},
		{
			id: 'co2',
			icon: 'cloud',
			name: 'CO₂ / Temperature / Humidity',
			tag: 'CW-AIR-THC',
			blurb:
				'Air quality in one module: NDIR carbon dioxide plus temperature and humidity, with VPD derived for greenhouses and CO₂ ventilation alerts for barns.',
			measures: ['CO₂', 'Temperature', 'Humidity', 'VPD'],
			specs: [
				['CO₂ range', '400-5,000 ppm'],
				['CO₂ method', 'NDIR'],
				['Accuracy', '±0.2 °C / ±1.8 %RH'],
				['Derived', 'VPD (kPa)']
			]
		},
		{
			id: 'soil',
			icon: 'grass',
			name: 'Soil Sensor',
			tag: 'CW-SS-TME',
			blurb:
				'Root-zone insight from a rugged in-ground probe: soil moisture, soil temperature and EC for irrigation and nutrient decisions.',
			measures: ['Soil moisture', 'Soil temp', 'EC'],
			specs: [
				['Moisture', '0-100 % (±8 %)'],
				['Soil EC', '0-3.0 mS/cm ±20 % · 3.0-8.0 ±40 %'],
				['Probe', 'Stainless, IP68'],
				['Connectivity', 'LoRaWAN (Class A)']
			]
		}
	];

	let active = $state(SENSORS[0]);

	// Honor the old 3D viewer's ?sensor= deep links.
	onMount(() => {
		const requested = new URL(window.location.href).searchParams.get('sensor');
		const match = SENSORS.find((s) => s.id === requested);
		if (match) active = match;
	});

	// One Product per sensor module (name + SKU + description). Bare Products (no
	// price/rating): valid + entity-strengthening, not rich-snippet eligible.
	const productsLd = SENSORS.map((s) =>
		productSchema({
			name: `${s.name} (${s.tag})`,
			sku: s.tag,
			description: s.blurb,
			category: 'Environmental sensor',
			url: '/replacement-sensors'
		})
	);
</script>

<svelte:head>
	<title>User-Replaceable Sensors with ISO/IEC 17025 Certificates | CropWatch</title>
	<meta
		name="description"
		content="Pre-calibrated, user-replaceable CropWatch sensor modules. Swap in under a minute with no technician. Every module ships with a downloadable, per-serial-number ISO/IEC 17025 calibration certificate. Dual-sensor verified and self-auditing."
	/>
	<meta
		name="keywords"
		content="replacement sensor, user replaceable sensor, pre-calibrated sensor module, ISO 17025 certificate, NIST traceable calibration, temperature sensor replacement, field serviceable sensor, dual sensor module, LoRaWAN sensor module"
	/>
	<meta
		property="og:title"
		content="User-Replaceable Sensors with ISO/IEC 17025 Certificates | CropWatch"
	/>
	<meta
		property="og:description"
		content="Pre-calibrated sensor modules you swap yourself in under a minute - each with its own per-serial ISO/IEC 17025 certificate. Compare all four modules side by side."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://cropwatch.io/replacement-sensors" />
</svelte:head>

<Breadcrumbs
	items={[
		{ label: 'Home', href: '/home' },
		{ label: 'Products', href: '/cold-chain' },
		{ label: 'Replacement Sensors' }
	]}
/>

<JsonLd data={productsLd} />

<!-- hero -->
<section class="hero">
	<div class="wrap hero__grid">
		<div class="hero__copy">
			<p class="eyebrow">Replacement sensors</p>
			<h1>Calibrated. Certified. Swapped in 60 seconds.</h1>
			<p class="lead">
				When a module reaches end of life, you don't ship the unit back or wait for a technician.
				Snap in a new pre-calibrated module - and download its own ISO/IEC 17025 certificate, tied to
				that exact serial number.
			</p>
			<div class="hero__badges">
				<span><span class="material-symbols-rounded">cached</span> Tool-free swap</span>
				<span><span class="material-symbols-rounded">workspace_premium</span> Per-serial certificate</span>
				<span><span class="material-symbols-rounded">fact_check</span> Dual-sensor</span>
				<span><span class="material-symbols-rounded">target</span> ±0.48 °C</span>
			</div>
		</div>
		<div class="hero__media">
			<img
				src="/assets/imagery/device-detail.webp"
				alt="Close-up of the CropWatch sensor module that users can replace in the field"
				width="800"
				height="600"
				fetchpriority="high"
			/>
			<div class="hero__chip">
				<span class="dot"></span>
				<div><strong>CW-AIR-TH module</strong><span>CW-7F3A-29155 · verified</span></div>
			</div>
		</div>
	</div>
</section>

<!-- sensor module picker -->
<section class="section section--tint" id="sensorTypes">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent">Four sensors, one platform</p>
			<h2>Pick the module. Keep the workflow.</h2>
			<p class="section__intro">
				Every CropWatch sensor shares the same enclosure, socket and dashboard - so you can mix
				module types across a site and swap any of them yourself.
			</p>
		</div>
		<div class="picker" data-reveal>
			<div class="picker-tabs">
				{#each SENSORS as s (s.id)}
					<button
						type="button"
						class="picker-tab"
						class:is-active={active.id === s.id}
						aria-pressed={active.id === s.id}
						onclick={() => (active = s)}
					>
						<span class="picker-tab__ic"><span class="material-symbols-rounded">{s.icon}</span></span>
						<span class="picker-tab__tx"><b>{s.name}</b><span>{s.tag}</span></span>
					</button>
				{/each}
			</div>
			<div class="picker-panel">
				<span class="picker-panel__tag">{active.tag}</span>
				<h3>{active.name}</h3>
				<p class="picker-panel__blurb">{active.blurb}</p>
				<div class="picker-measures">
					{#each active.measures as m (m)}<span class="picker-chip">{m}</span>{/each}
				</div>
				<dl class="picker-specs">
					{#each active.specs as [k, v] (k)}<div class="picker-spec"><dt>{k}</dt><dd>{v}</dd></div>{/each}
				</dl>
			</div>
		</div>
		<p style="text-align:center;margin-top:26px;font-size:13px;color:var(--web-muted)" data-reveal>
			All four modules are pre-calibrated, dual-sensor verified, and ship with an individual ISO/IEC
			17025 certificate.
		</p>
	</div>
</section>

<!-- swap steps -->
<section class="section section--tint section--tight">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent">No truck roll</p>
			<h2>Anyone on your team can do it.</h2>
		</div>
		<div class="steps">
			<div class="step" data-reveal>
				<div class="step__n">1</div>
				<h3>Unscrew the cap</h3>
				<p>Tool-free - no screws, no opening the sealed enclosure.</p>
			</div>
			<div class="step" data-reveal="1">
				<div class="step__n">2</div>
				<h3>Pull the old module</h3>
				<p>The calibrated sensing module lifts straight out of its socket.</p>
			</div>
			<div class="step" data-reveal="2">
				<div class="step__n">3</div>
				<h3>Snap in the new one</h3>
				<p>Pre-calibrated at the factory - nothing to re-zero on site.</p>
			</div>
			<div class="step" data-reveal="3">
				<div class="step__n">4</div>
				<h3>It re-configures itself</h3>
				<p>The device recognises the module and you're logging again in under a minute.</p>
			</div>
		</div>
	</div>
</section>

<!-- dual-sensor reassurance -->
<section class="section section--navy section--tight">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">Why a swap is safe</p>
			<h2>The new module proves itself before you trust it.</h2>
		</div>
		<div class="why4">
			<article class="why-card" data-reveal>
				<span class="why-card__ic"><span class="material-symbols-rounded">fact_check</span></span>
				<h3>Dual-sensor</h3>
				<p>Two elements cross-check on every reading - a bad swap is caught instantly.</p>
			</article>
			<article class="why-card" data-reveal="1">
				<span class="why-card__ic"
					><span class="material-symbols-rounded">health_and_safety</span></span
				>
				<h3>Self-audit</h3>
				<p>The module runs its own diagnostics and reports health on first pair.</p>
			</article>
			<article class="why-card" data-reveal="2">
				<span class="why-card__ic"
					><span class="material-symbols-rounded">workspace_premium</span></span
				>
				<h3>Certified</h3>
				<p>Its certificate is already in your dashboard the moment it pairs.</p>
			</article>
			<article class="why-card" data-reveal="3">
				<span class="why-card__ic"><span class="material-symbols-rounded">history</span></span>
				<h3>Traceable</h3>
				<p>Every swap is logged - what changed, when, and by whom.</p>
			</article>
		</div>
	</div>
</section>

<!-- parts origin -->
<section class="section section--tint">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">Built to a bill of materials</p>
			<h2>Where the parts come from.</h2>
			<p class="section__intro">
				Every CropWatch sensor board is assembled from 34 part types across 8 countries and 18
				manufacturers - chosen for reliability, not the lowest bid.
			</p>
		</div>
		<div data-reveal>
			<PartsOrigin />
		</div>
	</div>
</section>

<!-- specs -->
<section class="pspecs">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">Module options</p>
			<h2>Specifications</h2>
		</div>
		<dl class="pspecs__grid" data-reveal>
			<div class="spec-row"><dt>Air temp / RH</dt><dd>CW-AIR-TH module</dd></div>
			<div class="spec-row"><dt>Soil / substrate</dt><dd>CW-SS-TME module</dd></div>
			<div class="spec-row"><dt>Accuracy</dt><dd>±0.48 °C / ±1.8 %RH (TH module)</dd></div>
			<div class="spec-row"><dt>Annual drift</dt><dd>typ. &lt;0.01 °C/yr</dd></div>
			<div class="spec-row"><dt>Calibration</dt><dd>ISO/IEC 17025 · NIST</dd></div>
			<div class="spec-row"><dt>Certificate</dt><dd>Per serial number</dd></div>
			<div class="spec-row"><dt>Install time</dt><dd>&lt; 60 seconds</dd></div>
			<div class="spec-row"><dt>Tools required</dt><dd>None</dd></div>
			<div class="spec-row"><dt>Compatibility</dt><dd>All CropWatch enclosures</dd></div>
		</dl>
	</div>
</section>

<!-- FAQ -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">Questions</p>
			<h2>Replacement sensor FAQ</h2>
		</div>
		<div class="faq" data-reveal>
			<details>
				<summary>
					Do I need to recalibrate after swapping?
					<span class="material-symbols-rounded">add</span>
				</summary>
				<p>
					No. Modules are calibrated at the factory and ship ready to use. The certificate for the
					new serial number appears in your dashboard automatically.
				</p>
			</details>
			<details>
				<summary>
					Where do I get the certificate?
					<span class="material-symbols-rounded">add</span>
				</summary>
				<p>
					Every module's ISO/IEC 17025 certificate is downloadable as a PDF from the device page in
					the app - matched to its individual serial number, ready to hand an auditor.
				</p>
			</details>
			<details>
				<summary>
					How often should modules be replaced?
					<span class="material-symbols-rounded">add</span>
				</summary>
				<p>
					It depends on your environment and compliance schedule. Annual temperature drift is
					typically under 0.01 °C, so drift alone rarely forces a swap. Many customers re-certify on an
					annual cycle; the self-auditing hardware will also flag a module that has drifted out of
					spec.
				</p>
			</details>
		</div>
	</div>
</section>

<!-- closing -->
<section class="closing section--tint">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold">Stock up</p>
		<h2>Keep a spare on the shelf.</h2>
		<p>
			Tell us how many devices you run and we'll quote replacement modules and a re-certification
			schedule.
		</p>
		<div class="closing__ctas">
			<a href="/contact" class="cta-pill cta-pill--lg">Request a quote</a>
			<a href="/replacement-case" class="cta-ghost cta-ghost--light cta-pill--lg">View the case in 3D</a>
		</div>
	</div>
</section>

<style>
	.picker { display: grid; grid-template-columns: 340px 1fr; gap: 22px; align-items: start; }
	.picker-tabs { display: flex; flex-direction: column; gap: 10px; }
	.picker-tab { display: flex; align-items: center; gap: 13px; text-align: left; cursor: pointer; font-family: inherit;
		background: var(--web-surface); border: 1px solid var(--web-border); border-radius: var(--cw-radius-xl); padding: 14px 15px;
		box-shadow: var(--web-shadow-card); transition: border-color var(--cw-duration-fast), transform var(--cw-duration-fast), background var(--cw-duration-fast); }
	.picker-tab:hover { transform: translateX(3px); border-color: var(--web-border-strong); }
	.picker-tab.is-active { border-color: var(--web-primary); background: var(--web-primary-soft); }
	.picker-tab__ic { display: grid; place-items: center; width: 42px; height: 42px; flex: none; border-radius: var(--cw-radius-lg);
		background: var(--web-accent-soft); color: var(--web-accent); }
	.picker-tab.is-active .picker-tab__ic { background: var(--web-primary); color: #fff; }
	.picker-tab__ic .material-symbols-rounded { font-size: 24px; }
	.picker-tab__tx b { display: block; font-size: 14px; color: var(--cw-ink); line-height: 1.2; }
	.picker-tab__tx span { font-size: 12px; color: var(--web-muted); font-family: var(--cw-font-mono); }

	.picker-panel { display: flex; flex-direction: column; gap: 14px; background: var(--web-surface);
		border: 1px solid var(--web-border); border-radius: var(--web-radius-card); box-shadow: var(--web-shadow-card);
		padding: 24px 26px; }
	.picker-panel__tag { align-self: flex-start; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; font-family: var(--cw-font-mono);
		color: var(--web-primary); background: var(--web-primary-soft); padding: 5px 11px; border-radius: 9999px; }
	.picker-panel h3 { font-size: var(--cw-text-xl); margin: 0; line-height: 1.25; }
	.picker-panel__blurb { font-size: 14px; color: var(--web-muted); line-height: 1.7; margin: 0; }
	.picker-measures { display: flex; flex-wrap: wrap; gap: 7px; }
	.picker-chip { font-size: 12px; font-weight: 600; color: var(--web-accent); background: var(--web-accent-soft);
		border: 1px solid color-mix(in srgb, var(--web-accent) 28%, transparent); border-radius: 9999px; padding: 5px 11px; }
	.picker-specs { display: grid; gap: 0; margin: 4px 0 0; }
	.picker-spec { display: flex; justify-content: space-between; gap: 12px; padding: 9px 0; border-bottom: 1px solid var(--web-border); }
	.picker-spec dt { font-size: 12.5px; color: var(--web-muted); font-weight: 600; }
	.picker-spec dd { font-size: 12.5px; color: var(--cw-ink); font-weight: 600; font-family: var(--cw-font-mono); margin: 0; text-align: right; }

	@media (max-width: 720px) {
		.picker { grid-template-columns: 1fr; }
		.picker-tabs { flex-direction: row; overflow-x: auto; }
		.picker-tab { min-width: 220px; }
		.picker-panel { padding: 20px 18px; }
	}
</style>
