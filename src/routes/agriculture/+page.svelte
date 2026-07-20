<script lang="ts">
	import { onMount } from 'svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { initAgCharts } from '$lib/agCharts';

	// The PPFD gauge, VPD matrix and heatmap are built client-side into the
	// (server-rendered, empty) chart-card containers once the page mounts.
	onMount(() => initAgCharts());
</script>

<svelte:head>
	<title
		>Agricultural, Greenhouse &amp; Field Monitoring - Soil, Air, CO₂, VPD, PPFD &amp; DLI |
		CropWatch</title
	>
	<meta
		name="description"
		content="One CropWatch platform measures the whole growing environment - soil moisture, soil temperature and EC; air temperature, humidity and CO₂; plus calculated VPD, light PPFD and DLI - for greenhouses, fields, orchards and vineyards. See crop stress, frost and light deficits early."
	/>
	<meta
		name="keywords"
		content="agriculture monitoring, greenhouse monitoring, VPD monitoring, vapor pressure deficit, PPFD sensor, DLI daily light integral, soil moisture monitoring, soil EC sensor, soil temperature, air CO2 greenhouse, crop climate monitoring, vineyard monitoring, orchard monitoring, horticulture sensor, LoRaWAN agriculture"
	/>
	<meta
		property="og:title"
		content="Agricultural, Greenhouse &amp; Field Monitoring | CropWatch"
	/>
	<meta
		property="og:description"
		content="Measure soil, air and light - plus calculated VPD, PPFD and DLI - across greenhouses, fields, orchards and vineyards."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://cropwatch.io/agriculture" />
</svelte:head>

<Breadcrumbs
	items={[
		{ label: 'Home', href: '/home' },
		{ label: 'Products', href: '/cold-chain' },
		{ label: 'Agricultural Monitoring' }
	]}
/>

<!-- hero -->
<section class="hero hero--bg">
	<img
		class="hero__bg"
		src="/assets/photos/field-sweetpotato.webp"
		alt="An open sweet-potato field under mulch film with mountains and cherry blossom behind - the kind of open-field crop CropWatch monitors"
		width="1233"
		height="925"
		fetchpriority="high"
	/>
	<div class="hero__scrim"></div>
	<div class="wrap hero__grid">
		<div class="hero__copy">
			<p class="eyebrow">Agriculture &amp; greenhouse</p>
			<h1>From the root zone to the canopy - one platform.</h1>
			<p class="lead">
				CropWatch measures the whole growing environment:
				<strong>soil moisture, temperature and EC</strong>,
				<strong>air temperature, humidity and CO₂</strong>, plus calculated
				<strong>VPD, PPFD and DLI</strong>. The readings growers actually steer by - on greenhouses,
				fields, orchards and vineyards.
			</p>
			<div class="hero__badges">
				<span><span class="material-symbols-rounded">grass</span> Soil · air · light</span>
				<span><span class="material-symbols-rounded">water_drop</span> VPD</span>
				<span><span class="material-symbols-rounded">wb_sunny</span> PPFD &amp; DLI</span>
				<span><span class="material-symbols-rounded">cloud</span> Air CO₂</span>
			</div>
			<div class="hero__ctas" style="margin-top:26px">
				<a href="/contact" class="cta-pill cta-pill--lg"
					><span>Book a demo</span> <span class="material-symbols-rounded">arrow_forward</span></a
				>
				<a href="/livestock" class="cta-ghost cta-ghost--light cta-pill--lg"
					><span class="material-symbols-rounded">pets</span> <span>Livestock</span></a
				>
			</div>
		</div>
		<div class="hero__media">
			<img
				src="/assets/photos/greenhouse-peppers.webp"
				alt="CropWatch sensor monitoring climate and light in a commercial pepper greenhouse"
				width="1560"
				height="703"
			/>
			<div class="hero__chip">
				<span class="dot"></span>
				<div><strong>Greenhouse 2 - Row 4</strong><span>0.92 kPa VPD · 740 PPFD · live</span></div>
			</div>
		</div>
	</div>
</section>

<!-- Soil -> Air -> Light stack -->
<section class="section section--tint">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent">Soil to air to light</p>
			<h2>Everything that drives growth, on one device family.</h2>
			<p class="section__intro">
				Most systems give you a single number. CropWatch captures the full stack - what the roots
				feel, what the canopy breathes, and the light the crop actually receives - then derives the
				calculated metrics growers manage by.
			</p>
		</div>
		<div class="stack">
			<div class="tier tier--light" data-reveal>
				<div class="tier__head">
					<span class="tier__ic"><span class="material-symbols-rounded">wb_sunny</span></span>
					<div><h3>Light</h3><span>Calculated</span></div>
				</div>
				<div class="tier__metrics">
					<span class="mchip mchip--calc"
						><span class="material-symbols-rounded">light_mode</span> PPFD
						<small>µmol/m²/s</small></span
					>
					<span class="mchip mchip--calc"
						><span class="material-symbols-rounded">wb_twilight</span> DLI
						<small>mol/m²/day</small></span
					>
				</div>
			</div>
			<div class="tier tier--air" data-reveal="1">
				<div class="tier__head">
					<span class="tier__ic"><span class="material-symbols-rounded">air</span></span>
					<div><h3>Air</h3><span>Measured + derived</span></div>
				</div>
				<div class="tier__metrics">
					<span class="mchip"><span class="material-symbols-rounded">device_thermostat</span> Air temperature</span>
					<span class="mchip"><span class="material-symbols-rounded">humidity_percentage</span> Air humidity</span>
					<span class="mchip"><span class="material-symbols-rounded">cloud</span> Air CO₂</span>
					<span class="mchip mchip--calc"
						><span class="material-symbols-rounded">water_drop</span> VPD <small>kPa</small></span
					>
				</div>
			</div>
			<div class="tier tier--soil" data-reveal="2">
				<div class="tier__head">
					<span class="tier__ic"><span class="material-symbols-rounded">grass</span></span>
					<div><h3>Soil</h3><span>Measured</span></div>
				</div>
				<div class="tier__metrics">
					<span class="mchip"><span class="material-symbols-rounded">humidity_low</span> Soil moisture</span>
					<span class="mchip"><span class="material-symbols-rounded">thermostat</span> Soil temperature</span>
					<span class="mchip"
						><span class="material-symbols-rounded">bolt</span> Soil EC
						<small>nutrient/salinity</small></span
					>
				</div>
			</div>
		</div>
		<div class="stack__legend" data-reveal>
			<span><i class="measured"></i> Measured directly by the sensor</span>
			<span><i class="calc"></i> Calculated by CropWatch from the raw readings</span>
		</div>
	</div>
</section>

<!-- Why VPD / PPFD / DLI -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">Why the calculated metrics matter</p>
			<h2>Temperature and humidity alone will mislead you.</h2>
			<p class="section__intro">
				The numbers that actually predict growth aren't raw readings - they're what you derive from
				them. Here's what VPD, PPFD and DLI tell you, and the bands to hold.
			</p>
		</div>
		<div class="metric-explains">
			<article class="mx-card" data-reveal>
				<div class="mx-card__ab">VPD</div>
				<h3>Vapor Pressure Deficit</h3>
				<p class="mx-card__unit">kilopascals · kPa</p>
				<p>
					The true driver of transpiration. Temperature and humidity in isolation don't tell you
					whether a plant can move water - VPD combines them into the single number that governs
					stomata, CO₂ uptake and nutrient flow. Too high and leaves lose water faster than roots
					resupply, so stomata close and photosynthesis stalls; too low and transpiration slows,
					stunting nutrient uptake and inviting mould and disease.
				</p>
				<div class="mx-card__target">
					<span class="material-symbols-rounded">target</span> Greenhouse sweet spot ≈ 0.45-1.25 kPa (~0.85
					ideal)
				</div>
			</article>
			<article class="mx-card" data-reveal="1">
				<div class="mx-card__ab">PPFD</div>
				<h3>Photosynthetic Photon Flux Density</h3>
				<p class="mx-card__unit">µmol/m²/s</p>
				<p>
					How many usable light photons land on a square metre of canopy every second - the
					intensity that actually drives photosynthesis, not lux or watts. Too dim and growth
					stalls; too bright and you bleach leaves and waste energy and money. Targets are
					crop-specific, so CropWatch shows the live reading against the band for the crop you're
					growing.
				</p>
				<div class="mx-card__target">
					<span class="material-symbols-rounded">target</span> Crop-specific · lettuce 200-400 → tomato
					700-1,200
				</div>
			</article>
			<article class="mx-card" data-reveal="2">
				<div class="mx-card__ab">DLI</div>
				<h3>Daily Light Integral</h3>
				<p class="mx-card__unit">mol/m²/day</p>
				<p>
					If PPFD is the rate, DLI is the dose - the total light delivered to the canopy over a full
					day. It's the number that predicts yield, quality and timing, and it lets you trade
					intensity against hours: a gentler PPFD over a longer photoperiod can reach the same DLI.
					Track it and you stop guessing whether the crop got enough light today.
				</p>
				<div class="mx-card__target">
					<span class="material-symbols-rounded">target</span> Most greenhouse crops ≈ 12-30 mol/m²/day
				</div>
			</article>
		</div>
	</div>
</section>

<!-- UI examples (live CWUI chart recreations) -->
<section class="section section--navy">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">From the CropWatch app</p>
			<h2>The readings, the way your growers read them.</h2>
			<p class="section__intro">
				These are live components from the CropWatch interface - the same PPFD gauge, VPD climate
				matrix and temperature heatmap your team works from every day.
			</p>
		</div>

		<!-- PPFD -->
		<div class="chart-card" id="ppfdCard" data-reveal style="margin-bottom:26px">
			<div class="chart-card__head">
				<div>
					<h3 class="chart-card__title">PPFD - canopy light intensity</h3>
					<p class="chart-card__sub">Live reading against the crop's optimal band, with today's DLI.</p>
				</div>
				<span class="chart-card__tag">CwPPFDChart</span>
			</div>
			<div class="crop-chips" data-chips></div>
			<div data-view></div>
		</div>

		<div style="display:grid;grid-template-columns:1.05fr 0.95fr;gap:26px" class="ag-charts-2up">
			<!-- VPD -->
			<div class="chart-card" id="vpdCard" data-reveal>
				<div class="chart-card__head">
					<div>
						<h3 class="chart-card__title">VPD climate matrix</h3>
						<p class="chart-card__sub">
							Temperature × humidity, coloured by VPD. Pick a crop program to see the target band.
						</p>
					</div>
					<span class="chart-card__tag">CwVPDChart</span>
				</div>
				<div class="crop-chips" data-chips></div>
				<div data-readout style="margin-bottom:14px"></div>
				<div data-view></div>
				<div class="vpd__legend">
					<span>Humid / low</span><span class="vpd__ramp"></span><span>Dry / high</span>
					<span style="margin-left:auto"
						><span
							style="display:inline-block;width:11px;height:11px;border-radius:3px;box-shadow:inset 0 0 0 2px #fff,0 0 0 1px rgba(0,0,0,.2);vertical-align:-1px;margin-right:4px"
						></span> in target band</span
					>
				</div>
			</div>

			<!-- Heatmap -->
			<div class="chart-card" id="hmCard" data-reveal>
				<div class="chart-card__head">
					<div>
						<h3 class="chart-card__title">Field temperature - last 7 days</h3>
						<p class="chart-card__sub">Every hour of every day, at a glance. Hover any cell for the reading.</p>
					</div>
					<span class="chart-card__tag">CwHeatmap</span>
				</div>
				<div data-view></div>
				<div class="hm__legend" data-legend></div>
			</div>
		</div>
	</div>
</section>

<!-- Gallery -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">In the field</p>
			<h2>Deployed where crops grow.</h2>
		</div>
		<div class="gallery">
			<figure data-reveal>
				<img
					src="/assets/photos/greenhouse-peppers.webp"
					alt="CropWatch sensor monitoring climate in a commercial pepper greenhouse"
				/>
				<figcaption><b>Pepper greenhouse</b>Canopy VPD, CO₂ and light between rows.</figcaption>
			</figure>
			<figure data-reveal="1">
				<img
					src="/assets/photos/greenhouse-cucumber.webp"
					alt="CropWatch sensor mounted in a hydroponic cucumber greenhouse"
				/>
				<figcaption><b>Cucumber house</b>Overhead climate and DLI in a hydroponic house.</figcaption>
			</figure>
			<figure data-reveal="2">
				<img
					src="/assets/photos/field-chili.webp"
					alt="CropWatch monitoring station beside an open chili pepper field"
				/>
				<figcaption><b>Open chili field</b>Soil moisture, EC and field microclimate.</figcaption>
			</figure>
		</div>
	</div>
</section>

<!-- Coverage split -->
<section class="section section--tint">
	<div class="wrap split">
		<div class="split__media split__media--tall" data-reveal>
			<img
				src="/assets/photos/field-chili.webp"
				alt="Outdoor CropWatch station monitoring an open field of chili peppers"
			/>
		</div>
		<div data-reveal>
			<p class="eyebrow">Coverage without wires</p>
			<h2>One gateway covers the whole operation.</h2>
			<p class="lead">
				LoRaWAN reaches up to 15 km line-of-sight, so a single gateway can link greenhouses, fields
				and outbuildings on one farm - no cellular bills, no trenching cable.
			</p>
			<ul class="diff-list" style="margin-top:8px">
				<li><span class="material-symbols-rounded">check</span> Battery life measured in years, not weeks</li>
				<li><span class="material-symbols-rounded">check</span> Rugged IP66 enclosure for sun, rain and dust</li>
				<li>
					<span class="material-symbols-rounded">check</span> Dual-sensor verification &amp; self-auditing
					hardware
				</li>
				<li><span class="material-symbols-rounded">check</span> Swap your own sensors at season's end</li>
				<li>
					<span class="material-symbols-rounded">check</span> Condensation-tolerant Sensirion sensors
					recover even after 100 %RH nights
				</li>
			</ul>
			<p style="margin-top:22px">
				<a href="/contact" class="cta-pill"
					>Plan your coverage <span class="material-symbols-rounded">arrow_forward</span></a
				>
			</p>
		</div>
	</div>
</section>

<!-- Specs -->
<section class="pspecs">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">Recommended sensors</p>
			<h2>Soil + air + light, one platform</h2>
		</div>
		<dl class="pspecs__grid" data-reveal>
			<div class="spec-row"><dt>Air sensor</dt><dd>CW-AIR-THC (T·RH·CO₂)</dd></div>
			<div class="spec-row"><dt>Soil sensor</dt><dd>CW-SS-TME (moisture·temp·EC)</dd></div>
			<div class="spec-row"><dt>Calculated</dt><dd>VPD · PPFD · DLI</dd></div>
			<div class="spec-row"><dt>Air accuracy</dt><dd>±0.2 °C / ±1.8 %RH</dd></div>
			<div class="spec-row"><dt>CO₂ range</dt><dd>400-5,000 ppm (NDIR)</dd></div>
			<div class="spec-row"><dt>Soil moisture</dt><dd>0-100 % (±8 %)</dd></div>
			<div class="spec-row"><dt>Soil temp</dt><dd>−4 to 158 °F (−20 to 70 °C)</dd></div>
			<div class="spec-row"><dt>Soil EC</dt><dd>0-3.0 mS/cm ±20 % · 3.0-8.0 ±40 %</dd></div>
			<div class="spec-row"><dt>Connectivity</dt><dd>LoRaWAN (Class A)</dd></div>
			<div class="spec-row"><dt>Battery</dt><dd>Up to 5 years (replaceable)</dd></div>
			<div class="spec-row"><dt>Enclosure</dt><dd>IP66, UV-stable</dd></div>
			<div class="spec-row"><dt>Range</dt><dd>Up to 15 km per gateway</dd></div>
		</dl>
		<div class="prelated__grid" style="margin-top:36px">
			<a class="rel-card" href="/replacement-sensors" data-reveal>
				<span class="rel-card__ic"><span class="material-symbols-rounded">cable</span></span>
				<span><b>Replacement sensors</b><span>Season-to-season swaps</span></span>
			</a>
			<a class="rel-card" href="/replacement-case" data-reveal>
				<span class="rel-card__ic"><span class="material-symbols-rounded">deployed_code</span></span>
				<span><b>Replacement case</b><span>UV-stable IP66 enclosure</span></span>
			</a>
			<a class="rel-card" href="https://api.cropwatch.io" data-reveal>
				<span class="rel-card__ic"><span class="material-symbols-rounded">api</span></span>
				<span><b>Public API</b><span>Pull into your farm tools</span></span>
			</a>
		</div>
	</div>
</section>

<!-- FAQ -->
<section class="section section--tint">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">Questions</p>
			<h2>Agriculture monitoring FAQ</h2>
		</div>
		<div class="faq" data-reveal>
			<details>
				<summary>
					How do you calculate VPD, PPFD and DLI?
					<span class="material-symbols-rounded">add</span>
				</summary>
				<p>
					VPD is derived from the sensor's air temperature and relative humidity (optionally leaf
					temperature). PPFD and DLI are computed from the light reading and accumulated over the
					day. You get the raw readings <em>and</em> the calculated metrics on one screen - no
					spreadsheets.
				</p>
			</details>
			<details>
				<summary>
					Why measure VPD instead of just humidity?
					<span class="material-symbols-rounded">add</span>
				</summary>
				<p>
					Relative humidity is tied to temperature, so the same RH means very different things on a
					cool morning and a warm afternoon. VPD captures the relationship between the two and
					correlates directly with transpiration - it's a proactive growing tool, not just a climate
					number.
				</p>
			</details>
			<details>
				<summary>
					Can I monitor soil and air from the same gateway?
					<span class="material-symbols-rounded">add</span>
				</summary>
				<p>
					Yes. Air, soil and light sensors all report to one LoRaWAN gateway, which covers up to 15
					km line-of-sight - enough for greenhouses, fields and outbuildings across a whole farm.
				</p>
			</details>
			<details>
				<summary>
					Can I change what a device measures later?
					<span class="material-symbols-rounded">add</span>
				</summary>
				<p>
					Yes. The sensing module is user-replaceable, so the same unit can switch between air, soil
					and light modules - swap the module and the device recognises it and carries on. No new
					hardware purchase, no reconfiguration.
				</p>
			</details>
		</div>
	</div>
</section>

<!-- closing -->
<section class="closing">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold">Ready when you are</p>
		<h2>Put data behind your next decision.</h2>
		<p>
			Tell us about your greenhouses and fields - we'll map the soil, air and light sensors, the
			gateway and the alerts to fit.
		</p>
		<div class="closing__ctas">
			<a href="/contact" class="cta-pill cta-pill--lg">Book a demo</a>
			<a href="/replacement-sensors" class="cta-ghost cta-ghost--light cta-pill--lg">See the sensors</a>
		</div>
	</div>
</section>

<style>
	/* Full-bleed photographic hero (agriculture only): the field photo sits behind
	   the copy with a left-weighted dark scrim so the light text stays legible. */
	.hero--bg {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		background: var(--cw-ink);
		padding-block: 104px 92px;
		min-height: 560px;
	}
	.hero__bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 58%;
		z-index: -2;
	}
	.hero__scrim {
		position: absolute;
		inset: 0;
		z-index: -1;
		background:
			linear-gradient(
				96deg,
				rgba(8, 16, 34, 0.92) 0%,
				rgba(8, 16, 34, 0.7) 40%,
				rgba(8, 16, 34, 0.24) 76%,
				rgba(8, 16, 34, 0.05) 100%
			),
			linear-gradient(0deg, rgba(8, 16, 34, 0.5) 0%, rgba(8, 16, 34, 0) 42%);
	}
	/* light type for legibility over the field */
	.hero--bg .eyebrow {
		color: var(--cw-emerald-300);
	}
	.hero--bg h1 {
		color: #fff;
		text-shadow: 0 2px 20px rgba(0, 0, 0, 0.45);
	}
	.hero--bg .lead {
		color: rgba(255, 255, 255, 0.92);
	}
	.hero--bg .lead strong {
		color: #fff;
	}
	.hero--bg .hero__badges span {
		color: #fff;
		background: rgba(255, 255, 255, 0.12);
		border: 1px solid rgba(255, 255, 255, 0.28);
		backdrop-filter: blur(4px);
	}
	.hero--bg .hero__badges .material-symbols-rounded {
		color: var(--cw-emerald-300);
	}
	@media (max-width: 900px) {
		.hero--bg {
			padding-block: 72px 64px;
			min-height: 0;
		}
	}
</style>
