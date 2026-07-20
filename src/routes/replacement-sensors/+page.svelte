<script lang="ts">
	import { onMount } from 'svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import PartsOrigin from '$lib/components/PartsOrigin.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { productSchema } from '$lib/seo/schema';
	import { initSensorViewer, SENSORS } from '$lib/sensors3d';

	// Render the first sensor's panel server-side (real content for SEO / no-JS);
	// the viewer overwrites it as tabs are clicked.
	const first = SENSORS[0];

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

	// Tabs + spec panel render immediately; Babylon loads from CDN and the 3D
	// scene spins up lazily when the #sensorTypes section nears the viewport.
	onMount(() => initSensorViewer());
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
		content="Pre-calibrated sensor modules you swap yourself in under a minute - each with its own per-serial ISO/IEC 17025 certificate. View all four in interactive 3D."
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

<!-- sensor types 3D -->
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
		<div class="v3d" data-reveal>
			<div class="v3d-tabs" id="v3dTabs"></div>
			<div class="v3d-stage">
				<span class="v3d-stage__badge"
					><span class="material-symbols-rounded">view_in_ar</span> Interactive 3D</span
				>
				<canvas id="v3dCanvas"></canvas>
				<div class="v3d__status" id="v3dStatus"></div>
				<span class="v3d-stage__hint"
					><span class="material-symbols-rounded">drag_pan</span> Drag to rotate · scroll to zoom</span
				>
			</div>
			<div class="v3d-panel" id="v3dPanel">
				<span class="v3d-panel__tag" data-tag>{first.tag}</span>
				<h3 data-name>{first.name}</h3>
				<p class="v3d-panel__blurb" data-blurb>{first.blurb}</p>
				<div class="v3d-measures" data-measures>
					{#each first.measures as m (m)}<span class="v3d-chip">{m}</span>{/each}
				</div>
				<dl class="v3d-specs" data-specs>
					{#each first.specs as [k, v] (k)}<div class="v3d-spec"><dt>{k}</dt><dd>{v}</dd></div>{/each}
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
