<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	// Page-specific stylesheet (kept out of the global bundle).
	import '$lib/styles/product.css';
</script>

<svelte:head>
	<title
		>Poultry &amp; Livestock Air Quality Monitoring - Temperature, CO₂, Humidity &amp; Ammonia |
		CropWatch</title
	>
	<meta
		name="description"
		content="Wireless temperature, CO₂, humidity and ammonia (NH₃) monitoring for poultry houses, broiler and layer barns, dairy and livestock sheds. Catch heat stress, poor ventilation and rising gases before they cost you birds. User-replaceable Swiss Sensirion sensors, calibrated at an accredited lab, with unlimited users and alerts."
	/>
	<meta
		name="keywords"
		content="poultry house air quality, broiler house CO2 monitoring, ammonia monitoring poultry, NH3 sensor barn, layer house climate, livestock barn temperature humidity, heat stress alert, poultry ventilation monitoring, animal welfare air quality, wet litter humidity, farm CO2 sensor"
	/>
	<meta property="og:title" content="Poultry &amp; Livestock Air Quality Monitoring | CropWatch" />
	<meta
		property="og:description"
		content="Monitor temperature, CO₂, humidity and ammonia across poultry houses and barns - catch heat stress and ventilation faults before they cost you birds."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://cropwatch.io/livestock" />
</svelte:head>

<Breadcrumbs
	items={[
		{ label: 'Home', href: '/home' },
		{ label: 'Products', href: '/cold-chain' },
		{ label: 'Livestock Monitoring' }
	]}
/>

<!-- hero -->
<section class="hero hero--bg">
	<img
		class="hero__bg"
		src="/assets/photos/poultry-farm.webp"
		alt="A poultry farm yard with feed silos and barns - the kind of livestock operation CropWatch monitors"
		width="1920"
		height="865"
		fetchpriority="high"
	/>
	<div class="hero__scrim"></div>
	<div class="wrap hero__grid">
		<div class="hero__copy">
			<p class="eyebrow">Poultry &amp; livestock</p>
			<h1>Keep the house in range - and the flock comfortable.</h1>
			<p class="lead">
				Wireless monitoring of the four things that decide a flock's day -
				<strong>Temperature, CO₂, Humidity and Ammonia</strong> - across poultry houses, broiler and layer
				barns, dairy and livestock sheds. Catch heat stress, poor ventilation and rising gases before
				they cost you birds.
			</p>
			<div class="hero__badges">
				<span
					><span class="material-symbols-rounded">device_thermostat</span> Temp &amp; humidity</span
				>
				<span><span class="material-symbols-rounded">air</span> Heat-stress alerts</span>
				<span><span class="material-symbols-rounded">battery_5_bar</span> 5-yr battery</span>
				<span><span class="material-symbols-rounded">cloud</span> CO₂ readings</span>
				<span><span class="material-symbols-rounded">detector_alarm</span> Ammonia (NH₃)</span>
			</div>
			<div class="hero__ctas" style="margin-top:26px">
				<a href="/contact" class="cta-pill cta-pill--lg"
					><span>Talk to us about a demo</span>
					<span class="material-symbols-rounded">arrow_forward</span></a
				>
				<a href="/agriculture" class="cta-ghost cta-ghost--light cta-pill--lg"
					><span class="material-symbols-rounded">eco</span> <span>Also see Agriculture</span></a
				>
			</div>
		</div>
		<div class="hero__media">
			<img
				src="/assets/photos/poultry.webp"
				alt="Interior of a commercial broiler poultry house with thousands of birds, monitored for temperature and ventilation by CropWatch"
				width="1376"
				height="620"
			/>
			<div class="hero__chip">
				<span class="dot"></span>
				<div><strong>Broiler House 3</strong><span>76.3 °F (24.6 °C) · 68 %RH · live</span></div>
			</div>
		</div>
	</div>
</section>

<!-- what to monitor & why -->
<section class="section section--tint">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent">What to monitor &amp; why</p>
			<h2>Four readings decide flock health, growth and welfare.</h2>
			<p class="section__intro">
				Air quality is one of the most underestimated drivers of bird performance - poor conditions
				cause stress, respiratory disease, uneven growth and higher mortality. These are the four
				CropWatch tracks, and the numbers the research says to hold.
			</p>
		</div>
		<div class="ind-grid" style="grid-template-columns:repeat(2,1fr)">
			<article class="feat" data-reveal>
				<span class="feat__icon"
					><span class="material-symbols-rounded">device_thermostat</span></span
				>
				<h3>Temperature</h3>
				<p class="param-target">
					<span class="material-symbols-rounded">target</span> Target 64-75 °F (18-24 °C) for adult birds
					· age-specific for chicks
				</p>
				<p>
					Birds only convert feed to weight efficiently inside a narrow comfort zone. Stray above it
					and heat stress quietly cuts growth and feed conversion and drives up mortality - long
					before birds visibly pant. Brooding chicks need precise heat to build immunity and stay
					unstressed.
				</p>
			</article>
			<article class="feat" data-reveal="1">
				<span class="feat__icon feat__icon--accent"
					><span class="material-symbols-rounded">cloud</span></span
				>
				<h3>CO₂ - carbon dioxide</h3>
				<p class="param-target">
					<span class="material-symbols-rounded">target</span> Target ≤ 3,000 ppm · chicks tolerate ~4,000
					ppm
				</p>
				<p>
					CO₂ is your single best proxy for whether the house is actually ventilating. It climbs
					fastest in cold weather and during brooding, when gas heaters run and operators throttle
					airflow to save heat - exactly when a sealed house can starve birds of oxygen. Rising CO₂
					is the early warning that minimum ventilation is too low.
				</p>
			</article>
			<article class="feat" data-reveal="2">
				<span class="feat__icon"
					><span class="material-symbols-rounded">humidity_percentage</span></span
				>
				<h3>Humidity</h3>
				<p class="param-target">
					<span class="material-symbols-rounded">target</span> Keep 50-70 %RH · the best overall air-quality
					indicator
				</p>
				<p>
					Relative humidity is the most telling single measure of house air quality. Above ~70 %RH
					litter turns wet - driving footpad dermatitis, coccidiosis and respiratory problems - and
					CO₂ and ammonia climb with it. Below ~60 %RH those gases tend to stay in check. Watch RH
					and you see trouble coming.
				</p>
			</article>
			<article class="feat" data-reveal="3">
				<span class="feat__icon feat__icon--accent"
					><span class="material-symbols-rounded">detector_alarm</span></span
				>
				<h3>Ammonia (NH₃) <span class="param-opt">optional</span></h3>
				<p class="param-target">
					<span class="material-symbols-rounded">target</span> Keep below 25 ppm
				</p>
				<p>
					Ammonia irritates birds' lungs, weakens immunity and slows growth and egg production. The
					danger is that you can't trust your nose - workers acclimate to the smell within about 20
					minutes, so harmful 50-100 ppm levels go unnoticed. A continuous NH₃ reading catches what
					people can't.
				</p>
			</article>
		</div>
		<p class="param-note" data-reveal>
			<span class="material-symbols-rounded">lightbulb</span> These four move together: when humidity
			rises past 70 %, CO₂ and ammonia climb with it. CropWatch surfaces all of them on one screen so
			a single trend warns you before any one crosses the line.
		</p>
	</div>
</section>

<!-- why timing matters -->
<section class="section section--tight">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent">Why timing matters</p>
			<h2>The damage is done before anyone walks the barn.</h2>
		</div>
		<div class="ind-grid" style="grid-template-columns:repeat(3,1fr)">
			<article class="feat" data-reveal>
				<span class="feat__icon"><span class="material-symbols-rounded">thermostat</span></span>
				<h3>Heat stress is silent</h3>
				<p>
					By the time birds are panting, performance is already dropping. Early temperature and
					humidity alerts give you time to react.
				</p>
			</article>
			<article class="feat" data-reveal="1">
				<span class="feat__icon"><span class="material-symbols-rounded">mode_fan</span></span>
				<h3>Ventilation faults spread fast</h3>
				<p>
					A stalled fan or stuck inlet sends CO₂ and ammonia climbing across an entire house in
					minutes. Per-zone monitoring tells you exactly where, fast.
				</p>
			</article>
			<article class="feat" data-reveal="2">
				<span class="feat__icon"><span class="material-symbols-rounded">nightlight</span></span>
				<h3>The worst swings come at night</h3>
				<p>
					Nobody's walking the barn at 3 a.m. Continuous monitoring and a phone alert mean you don't
					have to be.
				</p>
			</article>
		</div>
	</div>
</section>

<!-- per-zone visibility split -->
<section class="section">
	<div class="wrap split">
		<div data-reveal>
			<p class="eyebrow">Per-zone visibility</p>
			<h2>Watch every end of a long house.</h2>
			<p class="lead">
				One sensor at each end (and the middle) shows you the real climate gradient - not a single
				thermostat's guess. Battery-powered and wireless, so you place them where the birds actually
				are.
			</p>
			<ul class="diff-list" style="margin-top:8px">
				<li>
					<span class="material-symbols-rounded">check</span> Map temperature, CO₂, humidity and ammonia
					zone by zone
				</li>
				<li>
					<span class="material-symbols-rounded">check</span> Set per-zone limits with unlimited alert
					recipients
				</li>
				<li>
					<span class="material-symbols-rounded">check</span> Protected electronics keep recording through
					humidity, dust and washdown
				</li>
				<li>
					<span class="material-symbols-rounded">check</span> Swap your own sensors between flocks in
					seconds
				</li>
			</ul>
			<p style="margin-top:22px">
				<a href="/contact" class="cta-pill"
					>Map your houses <span class="material-symbols-rounded">arrow_forward</span></a
				>
			</p>
		</div>
		<div class="split__media split__media--tall" data-reveal>
			<img
				src="/assets/photos/poultry.webp"
				alt="Long commercial poultry house monitored end to end by wireless CropWatch climate sensors"
			/>
		</div>
	</div>
</section>

<!-- four advantages -->
<section class="section section--navy section--tight">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">Built tough, built honest</p>
			<h2>The same four advantages, in the barn.</h2>
		</div>
		<div class="why4">
			<article class="why-card" data-reveal>
				<span class="why-card__ic"><span class="material-symbols-rounded">cached</span></span>
				<h3>Replaceable</h3>
				<p>Swap sensors yourself between flocks - no service call, no downtime.</p>
			</article>
			<article class="why-card" data-reveal="1">
				<span class="why-card__ic"><span class="material-symbols-rounded">verified</span></span>
				<h3>Certified</h3>
				<p>
					<a
						class="termlink"
						href="https://www.nist.gov/calibrations/traceability"
						target="_blank"
						rel="noopener noreferrer">NIST</a
					>
					Traceability as well as
					<a
						class="termlink"
						href="https://www.reset.build/standard/air"
						target="_blank"
						rel="noopener noreferrer">RESET<sup>®</sup></a
					>
					CO<sub>2</sub> certifications bring our food grade safety to the barn.
				</p>
			</article>
			<article class="why-card" data-reveal="2">
				<span class="why-card__ic"><span class="material-symbols-rounded">fact_check</span></span>
				<h3>Swiss precision</h3>
				<p>
					<a
						class="termlink"
						href="https://sensirion.com/company/about-sensirion"
						target="_blank"
						rel="noopener noreferrer">Sensirion</a
					>
					<a
						class="termlink"
						href="https://sensirion.com/products/catalog/SHT40"
						target="_blank"
						rel="noopener noreferrer">SHT40</a
					>
					and
					<a
						class="termlink"
						href="https://sensirion.com/products/catalog/SCD41"
						target="_blank"
						rel="noopener noreferrer">SCD41</a
					> digital sensors - calibrated and tested at an accredited lab.
				</p>
			</article>
			<article class="why-card" data-reveal="3">
				<span class="why-card__ic"
					><span class="material-symbols-rounded">health_and_safety</span></span
				>
				<h3>Built for the barn</h3>
				<p>
					A protective board coating shrugs off humidity, dust and temperature swings for years of
					maintenance-free service.
				</p>
			</article>
		</div>
	</div>
</section>

<!-- specs -->
<section class="pspecs">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">Recommended sensor</p>
			<h2>CW-AIR-THC(A)</h2>
		</div>
		<dl class="pspecs__grid" data-reveal>
			<div class="spec-row">
				<dt>Measures</dt>
				<dd>Temp · RH · CO₂ · NH₃</dd>
			</div>
			<div class="spec-row">
				<dt>Sensors</dt>
				<dd>
					Sensirion <a
						class="termlink"
						href="https://sensirion.com/products/catalog/SHT40"
						target="_blank"
						rel="noopener noreferrer">SHT40</a
					>
					+
					<a
						class="termlink"
						href="https://sensirion.com/products/catalog/SCD41"
						target="_blank"
						rel="noopener noreferrer">SCD41</a
					> (temp · RH · CO₂)
				</dd>
			</div>
			<div class="spec-row">
				<dt>Temp range</dt>
				<dd>−40 to +185 °F (−40 to +85 °C)</dd>
			</div>
			<div class="spec-row">
				<dt>CO₂ range</dt>
				<dd>400-5,000 ppm (NDIR)</dd>
			</div>
			<div class="spec-row">
				<dt>Ammonia</dt>
				<dd>0-100 ppm (NH₃)</dd>
			</div>
			<div class="spec-row">
				<dt>Accuracy</dt>
				<dd>±0.4 °F (±0.2 °C) / ±1.8 %RH</dd>
			</div>
			<div class="spec-row">
				<dt>Ruggedness</dt>
				<dd>
					<a
						class="termlink"
						href="https://en.wikipedia.org/wiki/Conformal_coating"
						target="_blank"
						rel="noopener noreferrer">Conformal coating</a
					>
					+
					<a
						class="termlink"
						href="https://en.wikipedia.org/wiki/Potting_(electronics)"
						target="_blank"
						rel="noopener noreferrer">potted board</a
					>
				</dd>
			</div>
			<div class="spec-row">
				<dt>Connectivity</dt>
				<dd>
					<a
						class="termlink"
						href="https://lora-alliance.org/about-lorawan/"
						target="_blank"
						rel="noopener noreferrer">LoRaWAN<sup>™</sup></a
					> (Class A)
				</dd>
			</div>
			<div class="spec-row">
				<dt>Battery</dt>
				<dd>Up to 5 years (replaceable)</dd>
			</div>
			<div class="spec-row">
				<dt>Logging</dt>
				<dd>Every 15 min · 1 year retained · CSV</dd>
			</div>
			<div class="spec-row">
				<dt>Enclosure</dt>
				<dd>IP66, washdown-ready</dd>
			</div>
			<div class="spec-row">
				<dt>Coverage</dt>
				<dd>Up to 8 miles per gateway</dd>
			</div>
		</dl>
	</div>
</section>

<!-- FAQ -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">Questions</p>
			<h2>Livestock monitoring FAQ</h2>
		</div>
		<div class="faq" data-reveal>
			<details>
				<summary>
					How many sensors per house?
					<span class="material-symbols-rounded">add</span>
				</summary>
				<p>
					Most operators run one at each end and one mid-house to capture the climate gradient.
					Because the sensors are wireless and battery-powered, you can add or move them at any time
					without rewiring.
				</p>
			</details>
			<details>
				<summary>
					Will dust, ammonia and washdown wreck the sensors?
					<span class="material-symbols-rounded">add</span>
				</summary>
				<p>
					The board is conformal-coated and the electronics are potted in resin for high-humidity,
					high-dust houses. The enclosure is IP66-rated and washdown-ready. If a sensing module ever
					degrades, you swap it yourself in the field - no return shipment, no downtime.
				</p>
			</details>
			<details>
				<summary>
					Why monitor CO₂ and ammonia, not just temperature?
					<span class="material-symbols-rounded">add</span>
				</summary>
				<p>
					Temperature tells you comfort; CO₂ and ammonia tell you whether the air is actually safe
					to breathe. CO₂ is the earliest sign a house is under-ventilated, and ammonia harms birds
					long before workers can smell it. Watching all four - with humidity as the early indicator
					- catches problems a thermostat never sees.
				</p>
			</details>
			<details>
				<summary>
					Can it call me, not just email?
					<span class="material-symbols-rounded">add</span>
				</summary>
				<p>
					Yes. Alerts can go out by SMS, email and webhook to as many recipients as you like -
					included, with no per-recipient fee.
				</p>
			</details>
		</div>
	</div>
</section>

<!-- closing -->
<section class="closing section--tint">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold">Ready when you are</p>
		<h2>Protect what is important.</h2>
		<p>Tell us how your houses are laid out and we'll map the sensors and alerts to match.</p>
		<div class="closing__ctas">
			<a href="/contact" class="cta-pill cta-pill--lg">Book a demo</a>
			<a href="/replacement-sensors" class="cta-ghost cta-ghost--light cta-pill--lg"
				>See the sensors</a
			>
		</div>
	</div>
</section>

<style>
	/* Full-bleed photographic hero (livestock): the farm photo sits behind the
	   copy with a left-weighted dark scrim so the light text stays legible.
	   Warm earth/gold palette ported from the Japan site's livestock hero. */
	.hero--bg {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		background: #160d06;
		padding-block: 104px 92px;
		min-height: 560px;
	}
	.hero__bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 42%;
		z-index: -2;
	}
	.hero__scrim {
		position: absolute;
		inset: 0;
		z-index: -1;
		background:
			linear-gradient(
				96deg,
				rgba(22, 13, 6, 0.95) 0%,
				rgba(38, 24, 13, 0.9) 32%,
				rgba(58, 36, 20, 0.62) 60%,
				rgba(58, 36, 20, 0.32) 100%
			),
			linear-gradient(180deg, transparent 52%, rgba(18, 11, 5, 0.62) 100%);
	}
	/* light type for legibility over the photo */
	.hero--bg .eyebrow {
		color: var(--cw-gold-400);
	}
	.hero--bg h1 {
		color: #fff;
		text-shadow: 0 2px 20px rgba(0, 0, 0, 0.45);
	}
	.hero--bg .lead {
		color: rgba(255, 246, 238, 0.94);
	}
	.hero--bg .lead strong {
		color: #fff;
	}
	.hero--bg .hero__badges span {
		color: #ffe9d8;
		background: rgba(255, 240, 224, 0.12);
		border: 1px solid rgba(255, 240, 224, 0.28);
		backdrop-filter: blur(4px);
	}
	.hero--bg .hero__badges .material-symbols-rounded {
		color: var(--cw-gold-400);
	}
	@media (max-width: 900px) {
		.hero--bg {
			padding-block: 72px 64px;
			min-height: 0;
		}
		.hero__scrim {
			background: linear-gradient(
				180deg,
				rgba(22, 13, 6, 0.82) 0%,
				rgba(38, 24, 13, 0.72) 50%,
				rgba(30, 19, 10, 0.86) 100%
			);
		}
	}
</style>
