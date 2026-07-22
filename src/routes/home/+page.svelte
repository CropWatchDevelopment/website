<script lang="ts">
	import PartsOrigin from '$lib/components/PartsOrigin.svelte';
</script>

<svelte:head>
	<title
		>CropWatch - Wireless temperature &amp; environmental monitoring for cold storage, restaurants,
		farming &amp; livestock (USA)</title
	>
	<meta
		name="description"
		content="CropWatch builds rugged wireless temperature and humidity sensors with audit-ready software for restaurants, hotels, schools, hospitals, cold storage, farming, greenhouses and poultry. User-replaceable, ISO/IEC 17025 certified, dual-sensor verified. Unlimited users, rules, API and reports at no extra cost."
	/>
	<meta
		name="keywords"
		content="temperature monitoring, cold chain monitoring, restaurant refrigeration monitoring, walk-in cooler sensor, HACCP logging, hotel kitchen temperature, school cafeteria monitoring, hospital pharmacy fridge monitoring, agriculture sensors, greenhouse monitoring, poultry house monitoring, livestock barn climate, LoRaWAN sensor, ISO 17025 calibration, NIST traceable"
	/>
	<meta
		property="og:title"
		content="CropWatch - Environmental monitoring you can defend in any audit"
	/>
	<meta
		property="og:description"
		content="Wireless temperature & humidity monitoring for cold storage, food service, agriculture and livestock. User-replaceable, ISO/IEC 17025 certified, dual-sensor verified."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://cropwatch.io/home" />
</svelte:head>

<!-- ░░ Hero ░░ -->
<section class="hero">
	<div class="wrap hero__grid">
		<div class="hero__copy">
			<p class="eyebrow">Environmental monitoring, proven</p>
			<h1>What sets us apart?</h1>
			<p class="lead">
				We built our hardware from the ground up - for one simple reason, we tried every other
				device on the market and they all failed in their own unique way.
				<br />
				<u>The IoT market is flooded with consumer-grade devices, some better, others worse.</u>
				<br />
				In such a market, we found our niche by building a system that keeps sending data, when all other
				devices go dark.
			</p>

			<h3>What makes a <u>truly</u> great IoT Service</h3>
			<ul class="proof">
				<li>
					<span class="material-symbols-rounded">check</span>
					<span>Devices simply run. Seeing a failed device just shouldn't happen.</span>
				</li>
				<li>
					<span class="material-symbols-rounded">check</span>
					<span
						>If a device ever does fail, <u>we replace it.</u> We don't just transfer you to sales again.
					</span>
				</li>
				<li>
					<span class="material-symbols-rounded">check</span>
					<span> Data must be correct.</span>
				</li>
				<li>
					<span class="material-symbols-rounded">check</span>
					<span
						>Products that make a difference. <br /> Make people's jobs easier, AND improve outcomes for
						all.</span
					>
				</li>
			</ul>
			<div class="hero__ctas">
				<a href="/contact" class="cta-pill cta-pill--lg"
					><span>Book a demo</span> <span class="material-symbols-rounded">arrow_forward</span></a
				>
				<a href="#why" class="cta-ghost cta-pill--lg"
					><span class="material-symbols-rounded">verified</span>
					<span>Why we're different</span></a
				>
			</div>
		</div>
		<div class="hero__media">
			<img
				src="/assets/photos/coldchain-fridge.webp"
				alt="A CropWatch wireless sensor mounted inside a commercial restaurant refrigerator monitoring food storage temperature"
				width="1800"
				height="811"
				fetchpriority="high"
			/>
			<div class="hero__chip">
				<span class="dot"></span>
				<div>
					<strong>Cook Station Cooler #5</strong><span>38.1 °F (3.4 °C) · 61 %RH · live</span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ░░ Trust band ░░ -->
<section class="trust">
	<div class="wrap trust__in">
		<span class="trust__label">Measurement you can defend</span>
		<div class="trust__logos">
			<img src="/assets/badges/iso-iec-17025.png" alt="ISO/IEC 17025 calibrated" height="56" />
			<img src="/assets/badges/nist-traceable.webp" alt="NIST traceable" height="56" />
			<img src="/assets/badges/HACCP.webp" alt="HACCP ready" height="56" />
			<img src="/assets/badges/ilac-mra.webp" alt="ILAC-MRA accredited" height="56" />
		</div>
	</div>
</section>

<!-- ░░ Why us - 4 differentiators (short) ░░ -->
<section class="section scroll-pad" id="why">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">Why CropWatch</p>
			<h2>It's simple, we are a <u>customer-centric</u> company.</h2>
			<p class="section__intro">
				Today way too many companies across all industries ignore the customer. Automate call
				centers, hide support, and move on after the sale. That is where our strategy is different.
			</p>
		</div>
		<div class="why4">
			<article class="why-card" data-reveal>
				<span class="why-card__ic"><span class="material-symbols-rounded">fort</span></span>
				<h3>Solid Hardware</h3>
				<p>
					Solid hardware that doesn't break down is where everyone wants. This means more uptime,
					less support, and more trust in the data. Our devices are built to last. We don't tolerate
					devices that fail, and we continuously improve our hardware if we ever find a weakness in
					the real-world deployment.
				</p>
			</article>
			<article class="why-card" data-reveal="1">
				<span class="why-card__ic"><span class="material-symbols-rounded">verified</span></span>
				<h3>
					<a
						class="termlink"
						href="https://www.iso.org/ISO-IEC-17025-testing-and-calibration-laboratories.html"
						target="_blank"
						rel="noopener noreferrer">ISO/IEC 17025</a
					> certified
				</h3>
				<p>
					We have had issues in the past finding the "TRUE" value from sensors. It can be difficult
					when you have doubt in your sensor, and you also doubt your calibration hardware as well.
					That is why we have left the calibration up to the experts. Our sensors are calibrated by
					an ISO/IEC 17025 accredited laboratory, and the calibration is traceable to <a
						class="termlink"
						href="https://www.nist.gov/calibrations/traceability"
						target="_blank"
						rel="noopener noreferrer">NIST</a
					> standards.
				</p>
			</article>
			<article class="why-card" data-reveal="2">
				<span class="why-card__ic"><span class="material-symbols-rounded">fact_check</span></span>
				<h3>Dual-sensor verified</h3>
				<p>
					On the same note as calibration, we have also tried other sensors that have given us false readings that looked plausible.
				</p>
				<p>
					Our innovative sensors feature dual-sensor verification, which means if one sensor is fails, the other sensor will catch it and alert you that the sensor is bad and we don't send any data, because we believe no data is always better than wrong data.
				</p>
			</article>
			<article class="why-card" data-reveal="3">
				<span class="why-card__ic"
					><span class="material-symbols-rounded">support_agent</span></span
				>
				<h3>Real Support</h3>
				<p>
					Finally, if you ever do run into a problem, we have a real (human) support team that is ready to help you. We don't hide behind a call center, and we don't outsource our support. We are here to help you, and we will do whatever it takes to make sure you are satisfied with our products and services.
				</p>
			</article>
		</div>
	</div>
</section>

<!-- ░░ Trusted parts / global sourcing ░░ -->
<section class="section section--tint scroll-pad" id="trusted-parts">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">Where our parts come from</p>
			<h2>Our <i>trusted</i> device is built with <i>trusted</i> parts from <i>trusted places</i>.</h2>
			<p class="section__intro">
				Every CropWatch device is assembled from components we hand-pick for reliability - sourced
				from established manufacturers across eight countries, so quality is never left to chance.
			</p>
		</div>

		<div data-reveal>
			<PartsOrigin />
		</div>
	</div>
</section>

<!-- ░░ Dashboard mockup ░░ -->
<section class="section section--navy section--tight">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">Simple by design</p>
			<h2>All your locations, grouped and glanceable.</h2>
			<p class="section__intro">
				Sensors can easily be organized, filtered and sorted. Anything that needs attention
				jumps out and everything else fades into the background - the same clean view on the desktop
				on your wall and the phone in your pocket. Your team spends its day on the work that
				matters, not on chasing data points.
			</p>
		</div>

		<div class="ui-devices" data-reveal>
			<figure class="ui-device ui-device--desktop">
				<div class="ui-device__frame ui-device__frame--window">
					<img
						src="/assets/screenshots/app-desktop.webp"
						alt="CropWatch desktop dashboard with sensors grouped into zones, each showing live temperature and humidity"
						width="1600"
						height="844"
						loading="lazy"
					/>
				</div>
				<figcaption>
					<span class="material-symbols-rounded">desktop_windows</span> PC &amp; Mac, tablet &amp; iPhone or Android
				</figcaption>
			</figure>
			<figure class="ui-device ui-device--phone">
				<div class="ui-device__frame">
					<img
						src="/assets/screenshots/app-mobile.webp"
						alt="CropWatch Android home-screen widget showing online, offline and alert counts above sensors grouped by location"
						width="480"
						height="1005"
						loading="lazy"
					/>
				</div>
				<figcaption>
					<span class="material-symbols-rounded">phone_android</span> Android Homescreen widget
				</figcaption>
			</figure>
		</div>

		<ul class="ui-points" data-reveal>
			<li>
				<span class="material-symbols-rounded">location_on</span>
				<div>
					<b>Grouped by location</b>
					<span>
						Group sensors by site, zone, location, and then organize them within those groups. The
						dashboard shows you the big picture, and lets you drill down to the details.
					</span>
				</div>
			</li>
			<li>
				<span class="material-symbols-rounded">visibility</span>
				<div>
					<b>Quick status</b><span>
						No wasting time, Here are the numbers, and you can get back to what you were doing.
						<br />
						The purpose of our application isn't to make you use it more, we want you to use it faster,
						and get back to what really matters to you.
					</span>
				</div>
			</li>
			<li>
				<span class="material-symbols-rounded">devices</span>
				<div>
					<b>Same view everywhere</b>
					<span>
						Desktop, tablet, phone - the same clean view on the wall and in your pocket. No learning
						a new interface for each device. Set a filter once for the view you want, and it sticks
						across all devices.
					</span>
				</div>
			</li>
		</ul>
	</div>
</section>

<!-- ░░ Everything included ░░ -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">No surprise invoices</p>
			<h2>The software is included, We don't hide <a class="termlink" href="/pricing">fees</a></h2>
			<p class="section__intro">
				Most platforms charge per seat, per location, per rule, or per export. We don't. Our fees
				are simple.
			</p>
		</div>
		<div class="vs" data-reveal>
			<div class="vs-card vs-them">
				<h3>
					<span class="material-symbols-rounded">sentiment_dissatisfied</span> Typical monitoring vendor
				</h3>
				<ul>
					<li>
						<span class="material-symbols-rounded">close</span> Per-user license fees as your team grows
					</li>
					<li>
						<span class="material-symbols-rounded">close</span> Caps on alert rules and notification recipients
					</li>
					<li>
						<span class="material-symbols-rounded">close</span> API and integrations behind a higher tier
					</li>
					<li>
						<span class="material-symbols-rounded">close</span> Report exports metered or paywalled
					</li>
					<li>
						<span class="material-symbols-rounded">close</span> Technician required for every sensor swap
					</li>
				</ul>
			</div>
			<div class="vs-card vs-us">
				<span class="ribbon">Included</span>
				<h3><span class="material-symbols-rounded">verified</span> CropWatch</h3>
				<ul>
					<li>
						<span class="material-symbols-rounded">check</span> Unlimited users - invite your whole team!
					</li>
					<li>
						<span class="material-symbols-rounded">check</span> Unlimited alert rules &amp; recipients
						(SMS, email, webhook)
					</li>
					<li>
						<span class="material-symbols-rounded">check</span> Full public API access for Excel, Sheets
						&amp; BI
					</li>
					<li>
						<span class="material-symbols-rounded">check</span> Unlimited scheduled &amp; on-demand reports
					</li>
					<li>
						<span class="material-symbols-rounded">check</span> Swap your own sensors - no service contract
					</li>
				</ul>
			</div>
		</div>
		<div class="incl">
			<div class="incl-card" data-reveal>
				<span class="material-symbols-rounded">group</span><b>Unlimited users</b><span
					>Whole team + auditors</span
				><span class="free">No per-seat fees</span>
			</div>
			<div class="incl-card" data-reveal="1">
				<span class="material-symbols-rounded">notifications_active</span><b>Unlimited rules</b
				><span>SMS · email · webhook</span><span class="free">Included</span>
			</div>
			<div class="incl-card" data-reveal="2">
				<span class="material-symbols-rounded">api</span><b>Full API & MCP Access</b><span
					><a href="https://api.cropwatch.io">api.cropwatch.io</a></span
				><span class="free">Included</span>
			</div>
			<div class="incl-card" data-reveal="3">
				<span class="material-symbols-rounded">summarize</span><b>Unlimited reports</b><span
					>Scheduled &amp; PDF</span
				><span class="free">Included</span>
			</div>
		</div>
	</div>
</section>

<!-- ░░ Proof band ░░ -->
<section class="proofband">
	<div class="wrap proofband__grid">
		<div class="stat" data-reveal>
			<p class="stat__eyebrow">Battery life</p>
			<p class="stat__value stat__value--accent">10 yr</p>
			<p class="stat__body">
				Up to 10 years on the cold-chain sensor at a 10-minute cadence; up to 5 on CO₂ models.
				User-replaceable cells.
			</p>
		</div>
		<div class="stat" data-reveal="1">
			<p class="stat__eyebrow">Accuracy</p>
			<p class="stat__value">±0.9 °F</p>
			<p class="stat__body">
				(±0.48 °C) <a
					class="termlink"
					href="https://www.nist.gov/calibrations/traceability"
					target="_blank"
					rel="noopener noreferrer">NIST</a
				>-traceable,
				<a
					class="termlink"
					href="https://www.iso.org/ISO-IEC-17025-testing-and-calibration-laboratories.html"
					target="_blank"
					rel="noopener noreferrer">ISO/IEC 17025</a
				> calibrated - defensible in an audit.
			</p>
		</div>
		<div class="stat" data-reveal="2">
			<p class="stat__eyebrow">Range</p>
			<p class="stat__value stat__value--accent">5 miles</p>
			<p class="stat__body">
				<a
					class="termlink"
					href="https://lora-alliance.org/about-lorawan/"
					target="_blank"
					rel="noopener noreferrer">LoRaWAN<sup>™</sup></a
				> coverage from a single gateway across a whole site.
			</p>
		</div>
		<div class="stat" data-reveal="3">
			<p class="stat__eyebrow">Bad readings logged</p>
			<p class="stat__value">0</p>
			<p class="stat__body">
				Dual-sensor verification means wrong data never reaches your records.
			</p>
		</div>
	</div>
</section>

<!-- ░░ Closing ░░ -->
<section class="closing">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold">Ready when you are</p>
		<h2>Interested? Get in touch, It can't hurt to chat!</h2>
		<p>
			Tell us what you need to keep in range. We'll map the sensors, gateways, and alerts - and show
			you the audit trail it produces.
		</p>
		<div class="closing__ctas">
			<a href="/contact" class="cta-pill cta-pill--lg">Contact Us!</a>
			<a href="/pricing" class="cta-ghost cta-ghost--light cta-pill--lg">Checkout our pricing</a>
		</div>
	</div>
</section>

<style>
	/* ── App UI showcase (navy section) ──────────────────────────────────────
	   Each device sits in its own column - no overlap - bottom-aligned on a shared
	   shelf with a labelled caption. flex-wrap + per-device flex-basis means a
	   third device (e.g. an iPad/tablet figure) can be dropped in later. */
	.ui-devices {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: center;
		gap: 28px 40px;
		max-width: 1000px;
		margin: 40px auto 0;
	}
	.ui-device {
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.ui-device--desktop {
		flex: 1 1 460px;
		max-width: 640px;
	}
	.ui-device--phone {
		flex: 0 1 188px;
	}
	.ui-device__frame img {
		display: block;
		width: 100%;
		height: auto;
	}
	/* The desktop screenshot gets a window frame; the phone already has its own
	   bezel, so it just floats with a drop-shadow. */
	.ui-device__frame--window {
		border-radius: 14px;
		border: 1px solid rgba(255, 255, 255, 0.12);
		box-shadow: 0 30px 70px -30px rgba(0, 0, 0, 0.85);
		overflow: hidden;
	}
	.ui-device--phone .ui-device__frame img {
		filter: drop-shadow(0 24px 30px rgba(0, 0, 0, 0.55));
	}
	.ui-device figcaption {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		margin-top: 18px;
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: var(--web-on-ink-muted);
	}
	.ui-device figcaption .material-symbols-rounded {
		font-size: 18px;
		color: var(--cw-emerald-300, #6ee7b7);
	}

	.ui-points {
		list-style: none;
		margin: 76px auto 0;
		padding: 0;
		max-width: 1000px;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 26px;
	}
	.ui-points li {
		display: flex;
		gap: 12px;
		align-items: flex-start;
	}
	.ui-points li > .material-symbols-rounded {
		flex: none;
		font-size: 24px;
		color: var(--cw-emerald-300, #6ee7b7);
	}
	.ui-points b {
		display: block;
		margin-bottom: 3px;
		font-size: 15px;
		color: #fff;
	}
	.ui-points span {
		display: block;
		font-size: 14px;
		line-height: 1.55;
		color: var(--web-on-ink-muted);
	}

	@media (max-width: 860px) {
		/* Devices wrap to their own rows; keep them centered and comfortably sized. */
		.ui-device--desktop {
			flex-basis: 100%;
		}
		.ui-device--phone {
			flex-basis: 200px;
		}
		.ui-points {
			grid-template-columns: 1fr;
			gap: 18px;
			margin-top: 44px;
		}
	}
</style>
