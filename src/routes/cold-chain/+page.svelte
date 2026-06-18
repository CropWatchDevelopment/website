<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
</script>

<svelte:head>
	<title
		>Cold-Chain &amp; Refrigeration Monitoring for Restaurants, Hotels, Schools &amp; Hospitals |
		CropWatch</title
	>
	<meta
		name="description"
		content="Wireless walk-in cooler and freezer temperature monitoring with HACCP-ready logs for restaurants, hotels, schools, hospitals, pharmacies, grocery and cold storage. ISO/IEC 17025 certified, dual-sensor verified, user-replaceable sensors. Unlimited users and reports."
	/>
	<meta
		name="keywords"
		content="cold chain monitoring, refrigeration monitoring, walk-in cooler sensor, freezer temperature monitoring, restaurant temperature logging, HACCP temperature monitoring, hotel kitchen monitoring, school cafeteria refrigeration, hospital pharmacy fridge monitoring, vaccine fridge monitoring, grocery cold storage, food safety temperature"
	/>
	<meta
		property="og:title"
		content="Cold-Chain &amp; Refrigeration Monitoring - HACCP-ready | CropWatch"
	/>
	<meta
		property="og:description"
		content="Continuous wireless temperature and humidity monitoring for coolers and freezers, with HACCP-ready records an inspector can trust."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://cropwatch.io/cold-chain" />
</svelte:head>

<Breadcrumbs
	items={[
		{ label: 'Home', href: '/home' },
		{ label: 'Products', href: '/cold-chain' },
		{ label: 'Cold-Chain Monitoring' }
	]}
/>

<!-- hero -->
<section class="hero">
	<div class="wrap hero__grid">
		<div class="hero__copy">
			<p class="eyebrow">Cold-chain &amp; refrigeration</p>
			<h1>Every cooler and freezer, watched around the clock.</h1>
			<p class="lead">
				Continuous wireless temperature and humidity monitoring for restaurants, hotels, schools,
				hospitals, grocery and cold storage - with HACCP-ready records an inspector can trust.
			</p>
			<div class="hero__badges">
				<span><span class="material-symbols-rounded">ac_unit</span> −80 °C to +25 °C</span>
				<span><span class="material-symbols-rounded">target</span> ±0.3 °C</span>
				<span><span class="material-symbols-rounded">description</span> HACCP-ready</span>
				<span><span class="material-symbols-rounded">verified</span> ISO/IEC 17025</span>
			</div>
			<div class="hero__ctas" style="margin-top:26px">
				<a href="/contact" class="cta-pill cta-pill--lg"
					><span>Book a demo</span> <span class="material-symbols-rounded">arrow_forward</span></a
				>
				<a href="/replacement-sensors" class="cta-ghost cta-pill--lg"
					><span class="material-symbols-rounded">cable</span> <span>Sensors</span></a
				>
			</div>
		</div>
		<div class="hero__media">
			<img
				src="/assets/photos/coldchain-door.webp"
				alt="CropWatch wireless sensor mounted above a commercial walk-in cold room door monitoring temperature"
				width="435"
				height="965"
				fetchpriority="high"
			/>
			<div class="hero__chip">
				<span class="dot"></span>
				<div><strong>Walk-in Freezer</strong><span>−18.2 °C · live</span></div>
			</div>
		</div>
	</div>
</section>

<!-- pain / outcome -->
<section class="section section--tint section--tight">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent">The problem with clipboards</p>
			<h2>Manual logs fail you exactly when it counts.</h2>
		</div>
		<div class="ind-grid" style="grid-template-columns:repeat(3,1fr)">
			<article class="feat" data-reveal>
				<span class="feat__icon"><span class="material-symbols-rounded">schedule</span></span>
				<h3>Gaps overnight &amp; on weekends</h3>
				<p>
					A freezer can drift for hours between manual checks. By the time someone writes it down,
					product is already lost.
				</p>
			</article>
			<article class="feat" data-reveal="1">
				<span class="feat__icon"><span class="material-symbols-rounded">edit_off</span></span>
				<h3>Records that don't hold up</h3>
				<p>
					Hand-written sheets get back-filled, smudged, or lost - and won't survive a serious audit
					or a recall investigation.
				</p>
			</article>
			<article class="feat" data-reveal="2">
				<span class="feat__icon"><span class="material-symbols-rounded">payments</span></span>
				<h3>Shrink you can't explain</h3>
				<p>
					Without continuous data you can't prove what spoiled, when, or why - so the loss just
					becomes someone's bad week.
				</p>
			</article>
		</div>
	</div>
</section>

<!-- how it works -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">How it works</p>
			<h2>Mounted in minutes. Logging forever.</h2>
		</div>
		<div class="steps">
			<div class="step" data-reveal>
				<div class="step__n">1</div>
				<h3>Mount the sensor</h3>
				<p>
					Stick or screw a battery-powered sensor inside each cooler, freezer or display case. No
					wiring, no drilling into the box.
				</p>
			</div>
			<div class="step" data-reveal="1">
				<div class="step__n">2</div>
				<h3>Pair to a gateway</h3>
				<p>
					One LoRaWAN gateway covers a whole building - even through thick freezer walls - and
					connects to the cloud.
				</p>
			</div>
			<div class="step" data-reveal="2">
				<div class="step__n">3</div>
				<h3>Set your limits</h3>
				<p>
					Define safe ranges per unit. Pick who gets an SMS, email or call - with no caps on rules
					or recipients.
				</p>
			</div>
			<div class="step" data-reveal="3">
				<div class="step__n">4</div>
				<h3>Prove it</h3>
				<p>
					Every reading is logged automatically. Export a clean, time-stamped PDF the moment an
					inspector asks.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- split: HACCP -->
<section class="section section--tint">
	<div class="wrap split">
		<div class="split__media split__media--tall" data-reveal>
			<img
				src="/assets/photos/coldchain-fridge.webp"
				alt="CropWatch sensor monitoring a commercial refrigerator full of prepared food in a restaurant kitchen"
			/>
		</div>
		<div data-reveal>
			<p class="eyebrow">Audit-ready by default</p>
			<h2>HACCP records that defend themselves.</h2>
			<p class="lead">
				Continuous, tamper-evident logs with NIST-traceable accuracy - and dual-sensor verification
				so a drifting probe can never quietly corrupt your history.
			</p>
			<ul class="diff-list" style="margin-top:8px">
				<li>
					<span class="material-symbols-rounded">check</span> Automatic, time-stamped readings - nothing
					to back-fill
				</li>
				<li>
					<span class="material-symbols-rounded">check</span> One-click PDF and CSV exports for any date
					range
				</li>
				<li>
					<span class="material-symbols-rounded">check</span> Per-serial ISO/IEC 17025 certificates for
					every sensor
				</li>
				<li>
					<span class="material-symbols-rounded">check</span> Corrective-action notes logged against each
					excursion
				</li>
			</ul>
			<p style="margin-top:22px">
				<a href="/contact" class="cta-pill"
					>Talk to us about your audit <span class="material-symbols-rounded">arrow_forward</span></a
				>
			</p>
		</div>
	</div>
</section>

<!-- sensor strengths -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent">Why the sensor wins</p>
			<h2>The strongest sensor in the cold aisle.</h2>
			<p class="section__intro">
				Anyone can stick a thermometer in a freezer. CropWatch is engineered so the number you log
				is one you can defend - and so a failing sensor never quietly becomes a failed audit.
			</p>
		</div>
		<div class="ind-grid" style="grid-template-columns:repeat(3,1fr)">
			<article class="feat" data-reveal>
				<span class="feat__icon"
					><span class="material-symbols-rounded">workspace_premium</span></span
				>
				<h3>ISO/IEC 17025 certified - individually</h3>
				<p>
					Every sensor is calibrated in an accredited process and ships with its own NIST-traceable
					certificate tied to its exact serial number. Not a batch sheet - proof for the specific
					device on your wall, downloadable the moment an inspector asks.
				</p>
			</article>
			<article class="feat" data-reveal="1">
				<span class="feat__icon feat__icon--accent"
					><span class="material-symbols-rounded">fact_check</span></span
				>
				<h3>Dual-sensor design - error, never a lie</h3>
				<p>
					Two independent elements cross-check every reading. If they disagree, the device refuses
					to publish and raises an error code instead. You will never log an inaccurate number - "no
					data" beats "wrong data" every single time.
				</p>
			</article>
			<article class="feat" data-reveal="2">
				<span class="feat__icon"><span class="material-symbols-rounded">cached</span></span>
				<h3>Field-replaceable - no calibration downtime</h3>
				<p>
					On-site calibration eats hours and, without lab-grade reference equipment, introduces
					error. CropWatch skips it entirely: snap in a pre-calibrated module in under a minute. No
					truck roll, no guesswork, no gap in your records.
				</p>
			</article>
			<article class="feat" data-reveal>
				<span class="feat__icon"
					><span class="material-symbols-rounded">battery_horiz_075</span></span
				>
				<h3>User-replaceable battery</h3>
				<p>
					When the cell finally runs down after years of service, you swap it yourself - no
					returning the unit, no proprietary service call. The sensor stays exactly where it is and
					keeps right on logging.
				</p>
			</article>
			<article class="feat" data-reveal="1">
				<span class="feat__icon"><span class="material-symbols-rounded">cell_tower</span></span>
				<h3>LoRa - built for deep-freeze penetration</h3>
				<p>
					Wi-Fi and Bluetooth die at the freezer wall. Our LoRa-based signal pushes through thick
					insulated panels and below-grade walk-ins, so a single gateway blankets the whole building
					- even the boxes others can't reach.
				</p>
			</article>
			<article class="feat" data-reveal="2">
				<span class="feat__icon feat__icon--accent"
					><span class="material-symbols-rounded">verified_user</span></span
				>
				<h3>Proven stability &amp; real support</h3>
				<p>
					An unmatched track record for long-term sensor stability, backed by people who actually
					pick up when you need them. The hardware self-audits and flags drift before it misleads
					you - and we're there when it counts.
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
			<h2>CW-AIR-TH - air temperature &amp; humidity</h2>
		</div>
		<dl class="pspecs__grid" data-reveal>
			<div class="spec-row"><dt>Measures</dt><dd>Temp · RH · dew point</dd></div>
			<div class="spec-row"><dt>Range</dt><dd>−40 °C to +85 °C</dd></div>
			<div class="spec-row"><dt>Accuracy</dt><dd>±0.3 °C / ±2 %RH</dd></div>
			<div class="spec-row"><dt>Verification</dt><dd>Dual-sensor cross-check</dd></div>
			<div class="spec-row"><dt>Connectivity</dt><dd>LoRaWAN (Class A)</dd></div>
			<div class="spec-row"><dt>Battery</dt><dd>Up to 10 years</dd></div>
			<div class="spec-row"><dt>Enclosure</dt><dd>IP66, food-safe</dd></div>
			<div class="spec-row"><dt>Calibration</dt><dd>NIST · ISO/IEC 17025</dd></div>
		</dl>
		<div class="prelated__grid" style="margin-top:36px">
			<a class="rel-card" href="/replacement-sensors" data-reveal>
				<span class="rel-card__ic"><span class="material-symbols-rounded">cable</span></span>
				<span><b>Replacement sensors</b><span>Swap in 60 seconds</span></span>
			</a>
			<a class="rel-card" href="/replacement-case" data-reveal>
				<span class="rel-card__ic"><span class="material-symbols-rounded">deployed_code</span></span>
				<span><b>Replacement case</b><span>Rugged IP66 enclosure</span></span>
			</a>
			<a class="rel-card" href="https://api.cropwatch.io" data-reveal>
				<span class="rel-card__ic"><span class="material-symbols-rounded">api</span></span>
				<span><b>Public API</b><span>Excel · Sheets · BI</span></span>
			</a>
		</div>
	</div>
</section>

<!-- FAQ -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">Questions</p>
			<h2>Cold-chain monitoring FAQ</h2>
		</div>
		<div class="faq" data-reveal>
			<details>
				<summary>
					Does it work inside a metal walk-in freezer?
					<span class="material-symbols-rounded">add</span>
				</summary>
				<p>
					Yes. LoRaWAN punches through thick freezer walls far better than Wi-Fi or Bluetooth, and a
					single gateway typically covers an entire building. For very large or below-grade sites we
					add a second gateway.
				</p>
			</details>
			<details>
				<summary>
					Will the records satisfy a health inspector or HACCP audit?
					<span class="material-symbols-rounded">add</span>
				</summary>
				<p>
					That's what they're built for. Readings are logged automatically with NIST-traceable
					accuracy, dual-sensor verification, and per-serial ISO/IEC 17025 certificates. You can
					export a clean, time-stamped report for any range in one click.
				</p>
			</details>
			<details>
				<summary>
					What happens if a sensor fails or drifts?
					<span class="material-symbols-rounded">add</span>
				</summary>
				<p>
					The dual-sensor design catches a drifting element and withholds the reading rather than
					logging a wrong one. The hardware also self-audits and raises a fault. When a module
					reaches end of life, you swap it yourself in under a minute.
				</p>
			</details>
			<details>
				<summary>
					Are there per-user or per-report fees?
					<span class="material-symbols-rounded">add</span>
				</summary>
				<p>
					No. Unlimited users, alert rules, recipients, reports and full API access are included
					with the sensors - no tiers, no seat licenses, no metered exports.
				</p>
			</details>
		</div>
	</div>
</section>

<!-- closing -->
<section class="closing section--tint">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold">Ready when you are</p>
		<h2>Put a sensor in your coldest box this week.</h2>
		<p>
			Tell us how many coolers and freezers you run. We'll size the sensors and gateway and show you
			the audit trail it produces.
		</p>
		<div class="closing__ctas">
			<a href="/contact" class="cta-pill cta-pill--lg">Book a demo</a>
			<a href="/replacement-sensors" class="cta-ghost cta-ghost--light cta-pill--lg">See the sensors</a>
		</div>
	</div>
</section>
