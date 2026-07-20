<script lang="ts">
	// Component-sourcing breakdown for the "trusted parts" section. Counts come
	// from the BOM: 34 part types placed 71 times, from 18 manufacturers
	// across 8 countries. Colours are per-country chart hues (also used for the
	// donut ring, the legend dot and each bar).
	const sourcing = [
		{ code: 'us', name: 'United States', parts: 10, pct: 29, mfrs: 7, color: '#14b8a6' },
		{ code: 'jp', name: 'Japan', parts: 7, pct: 21, mfrs: 2, color: '#3b82f6' },
		{ code: 'tw', name: 'Taiwan', parts: 7, pct: 21, mfrs: 2, color: '#f59e0b' },
		{ code: 'ch', name: 'Switzerland', parts: 5, pct: 15, mfrs: 3, color: '#22c55e' },
		{ code: 'ie', name: 'Ireland', parts: 2, pct: 6, mfrs: 1, color: '#a855f7' },
		{ code: 'at', name: 'Austria', parts: 1, pct: 3, mfrs: 1, color: '#fb923c' },
		{ code: 'kr', name: 'South Korea', parts: 1, pct: 3, mfrs: 1, color: '#f87171' },
		{ code: 'de', name: 'Germany', parts: 1, pct: 3, mfrs: 1, color: '#94a3b8' }
	];

	const sourcingStats = [
		{ value: '34', label: 'Part types' },
		{ value: '8', label: 'Countries' },
		{ value: '18', label: 'Manufacturers' },
		{ value: '71', label: 'Total placements' }
	];

	// Build the donut ring from the part counts (which sum to exactly 34 -> 100%)
	// rather than the rounded percentages, so there's no thin gap at the end.
	const partsTotal = sourcing.reduce((sum, c) => sum + c.parts, 0);
	let acc = 0;
	const donutStops = sourcing.map((c) => {
		const start = acc;
		acc += (c.parts / partsTotal) * 100;
		return `${c.color} ${start.toFixed(2)}% ${acc.toFixed(2)}%`;
	});
	const donutBg = `conic-gradient(${donutStops.join(', ')})`;
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
	<meta property="og:title" content="CropWatch - Environmental monitoring you can defend in any audit" />
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
			<h1>Why choose CropWatch? There are many options, but only one you can trust.</h1>
			<p class="lead">
				CropWatch is built from the ground up to give you confidence at every step - from the sensor that has been engineered to be provably accurate, to our backend infrastructure that data moves through, to the software you use to access it. We designed the whole stack to be something you can trust - so you can spend less time worrying about your monitoring and more time running your business.
			</p>
			<ul class="proof">
				<li><span class="material-symbols-rounded">check</span> <span>Devices that ensure you get correct data, or none at all</span></li>
				<li><span class="material-symbols-rounded">check</span> <span>Onboard memory that keeps recording and re-sends automatically when your internet fails you</span></li>
				<li><span class="material-symbols-rounded">check</span> <span>An infrastructure that assumes the worst will happen, and is ready to handle it.</span></li>
				<li><span class="material-symbols-rounded">check</span> <span>Real humans that care about the outcomes as much as you do</span></li>
			</ul>
			<div class="hero__ctas">
				<a href="/contact" class="cta-pill cta-pill--lg"><span>Book a demo</span> <span class="material-symbols-rounded">arrow_forward</span></a>
				<a href="#why" class="cta-ghost cta-pill--lg"><span class="material-symbols-rounded">verified</span> <span>Why we're different</span></a>
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
				<div><strong>Kitchen Walk-in Cooler</strong><span>3.4 °C · 61 %RH · live</span></div>
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
			<h2>Four reasons companies large and small switch to CropWatch</h2>
			<p class="section__intro">
				Most monitoring systems make you trust a single sensor, lock you into a technician for every
				swap, and quietly log numbers that may be wrong. We built ours the opposite way.
			</p>
		</div>
		<div class="why4">
			<article class="why-card" data-reveal>
				<span class="why-card__ic"><span class="material-symbols-rounded">cached</span></span>
				<h3>User-replaceable sensors & batteries</h3>
				<p>Pop the cap, swap the calibrated module, re-pair. No truck roll, no service contract, no downtime - anyone on your team can do it in under a minute.</p>
			</article>
			<article class="why-card" data-reveal="1">
				<span class="why-card__ic"><span class="material-symbols-rounded">verified</span></span>
				<h3>ISO/IEC 17025 certified</h3>
				<p>Every sensor ships with a downloadable calibration certificate tied to its individual serial number - NIST-traceable proof, ready for any inspector.</p>
			</article>
			<article class="why-card" data-reveal="2">
				<span class="why-card__ic"><span class="material-symbols-rounded">fact_check</span></span>
				<h3>Dual-sensor verified</h3>
				<p>Two independent Sensirion sensors (SHT43 + SHT40) cross-check every reading. If they disagree, the device flags an error and refuses to publish - so bad data never reaches your records.</p>
			</article>
			<article class="why-card" data-reveal="3">
				<span class="why-card__ic"><span class="material-symbols-rounded">health_and_safety</span></span>
				<h3>Self-auditing hardware</h3>
				<p>Two independent watchdogs - one in software, one a separate hardware circuit - restart the device on their own if it ever hangs, and readings buffer to onboard FRAM memory until delivered. If anything drifts out of spec, it tells you - instead of silently logging numbers you can't trust.</p>
			</article>
		</div>
	</div>
</section>

<!-- ░░ Trusted parts / global sourcing ░░ -->
<section class="section section--tint">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">Where our parts come from</p>
			<h2>Our trusted device is built with trusted parts from trusted places.</h2>
			<p class="section__intro">
				Every CropWatch device is assembled from components we hand-pick for reliability - sourced
				from established manufacturers across eight countries, so quality is never left to chance.
			</p>
		</div>

		<div class="src-stats" data-reveal>
			{#each sourcingStats as s (s.label)}
				<div class="src-stat">
					<strong>{s.value}</strong>
					<span>{s.label}</span>
				</div>
			{/each}
		</div>

		<div class="src-grid" data-reveal>
			<div class="src-donut__wrap">
				<div
					class="src-donut"
					style="background:{donutBg}"
					role="img"
					aria-label="Component count by country of origin"
				>
					<div class="src-donut__hole">
						<strong>{partsTotal}</strong>
						<span>Parts</span>
					</div>
				</div>
			</div>

			<ul class="src-list">
				{#each sourcing as c (c.code)}
					<li class="src-row">
						<span class="src-row__dot" style="background:{c.color}"></span>
						<img
							class="src-row__flag"
							src="/assets/flags/{c.code}.svg"
							alt=""
							width="22"
							height="16"
							loading="lazy"
						/>
						<span class="src-row__name">{c.name}</span>
						<span class="src-row__bar"
							><span style="width:{c.pct}%;background:{c.color}"></span></span
						>
						<span class="src-row__meta"
							><b>{c.parts}</b> · {c.pct}% · {c.mfrs} mfr{c.mfrs > 1 ? 's' : ''}</span
						>
					</li>
					{/each}
					<li class="src-row">
						<span class="src-row__dot" style="background:green"></span>
						<img
							class="src-row__flag"
							src="/assets/flags/jp.svg"
							alt=""
							width="22"
							height="16"
							loading="lazy"
						/>
						<span class="src-row__name">
							Manufactured & <br /> Assembled
						</span>
						<span class="src-row__bar">
							<span style="width:100%;background:green"></span>
						</span>
						<span class="src-row__meta">
							🛠️ · 100%
						</span>
					</li>
			</ul>
			<small><sup>*</sup>Our hardware <b><u><i>ONLY</i></u></b> contains parts from countries in the chart above.</small>
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
				Sensors organize themselves by site and zone, color-coded so anything that needs
				attention jumps out and everything else fades into the background - the same clean
				view on the desktop on your wall and the phone in your pocket. Your team spends its
				day on the work that matters, not on chasing temperatures.
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
					<span class="material-symbols-rounded">desktop_windows</span> PC &amp; web dashboard
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
					<span class="material-symbols-rounded">phone_android</span> Android widget
				</figcaption>
			</figure>
		</div>

		<ul class="ui-points" data-reveal>
			<li>
				<span class="material-symbols-rounded">location_on</span>
				<div><b>Grouped by location</b><span>Sensors roll up by site and zone - you read "Storage Room B", never a wall of device IDs.</span></div>
			</li>
			<li>
				<span class="material-symbols-rounded">visibility</span>
				<div><b>Glanceable status</b><span>Online, offline and alerts sit up top; green-to-red cards show what needs you in a single glance.</span></div>
			</li>
			<li>
				<span class="material-symbols-rounded">devices</span>
				<div><b>Same view everywhere</b><span>Desktop, phone widget or a quick search - one simple interface, nothing to learn.</span></div>
			</li>
		</ul>

		<p style="text-align:center;margin-top:36px" data-reveal>
			<a href="/contact" class="cta-pill cta-pill--lg">See it on your own coolers <span class="material-symbols-rounded">arrow_forward</span></a>
		</p>
	</div>
</section>

<!-- ░░ Everything included ░░ -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">No surprise invoices</p>
			<h2>The software is included, We don't hide fees</h2>
			<p class="section__intro">Most platforms charge per seat, per rule, or per export. We don't. Buy the sensors once and the entire platform comes with them.</p>
		</div>
		<div class="vs" data-reveal>
			<div class="vs-card vs-them">
				<h3><span class="material-symbols-rounded">sentiment_dissatisfied</span> Typical monitoring vendor</h3>
				<ul>
					<li><span class="material-symbols-rounded">close</span> Per-user license fees as your team grows</li>
					<li><span class="material-symbols-rounded">close</span> Caps on alert rules and notification recipients</li>
					<li><span class="material-symbols-rounded">close</span> API and integrations behind a higher tier</li>
					<li><span class="material-symbols-rounded">close</span> Report exports metered or paywalled</li>
					<li><span class="material-symbols-rounded">close</span> Technician required for every sensor swap</li>
				</ul>
			</div>
			<div class="vs-card vs-us">
				<span class="ribbon">Included</span>
				<h3><span class="material-symbols-rounded">verified</span> CropWatch</h3>
				<ul>
					<li><span class="material-symbols-rounded">check</span> Unlimited users - invite your whole team and auditors</li>
					<li><span class="material-symbols-rounded">check</span> Unlimited alert rules &amp; recipients (SMS, email, webhook)</li>
					<li><span class="material-symbols-rounded">check</span> Full public API access for Excel, Sheets &amp; BI</li>
					<li><span class="material-symbols-rounded">check</span> Unlimited scheduled &amp; on-demand reports</li>
					<li><span class="material-symbols-rounded">check</span> Swap your own sensors - no service contract</li>
				</ul>
			</div>
		</div>
		<div class="incl">
			<div class="incl-card" data-reveal><span class="material-symbols-rounded">group</span><b>Unlimited users</b><span>Whole team + auditors</span><span class="free">No per-seat fees</span></div>
			<div class="incl-card" data-reveal="1"><span class="material-symbols-rounded">notifications_active</span><b>Unlimited rules</b><span>SMS · email · webhook</span><span class="free">Included</span></div>
			<div class="incl-card" data-reveal="2"><span class="material-symbols-rounded">api</span><b>Full API & MCP Access</b><span><a href="https://api.cropwatch.io">api.cropwatch.io</a></span><span class="free">Included</span></div>
			<div class="incl-card" data-reveal="3"><span class="material-symbols-rounded">summarize</span><b>Unlimited reports</b><span>Scheduled &amp; PDF</span><span class="free">Included</span></div>
		</div>
	</div>
</section>

<!-- ░░ Proof band ░░ -->
<section class="proofband">
	<div class="wrap proofband__grid">
		<div class="stat" data-reveal><p class="stat__eyebrow">Battery life</p><p class="stat__value stat__value--accent">10 yr</p><p class="stat__body">Up to 10 years on the cold-chain sensor at a 10-minute cadence; up to 5 on CO₂ models. User-replaceable cells.</p></div>
		<div class="stat" data-reveal="1"><p class="stat__eyebrow">Accuracy</p><p class="stat__value">±0.9 °F</p><p class="stat__body">NIST-traceable, ISO/IEC 17025 calibrated - defensible in an audit.</p></div>
		<div class="stat" data-reveal="2"><p class="stat__eyebrow">Range</p><p class="stat__value stat__value--accent">5 miles</p><p class="stat__body">LoRaWAN coverage from a single gateway across a whole site.</p></div>
		<div class="stat" data-reveal="3"><p class="stat__eyebrow">Bad readings logged</p><p class="stat__value">0</p><p class="stat__body">Dual-sensor verification means wrong data never reaches your records.</p></div>
	</div>
</section>

<!-- ░░ Closing ░░ -->
<section class="closing">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold">Ready when you are</p>
		<h2>See your own coolers on the dashboard this week.</h2>
		<p>Tell us what you need to keep in range. We'll map the sensors, gateways, and alerts - and show you the audit trail it produces.</p>
		<div class="closing__ctas">
			<a href="/contact" class="cta-pill cta-pill--lg">Book a demo</a>
			<a href="/cold-chain" class="cta-ghost cta-ghost--light cta-pill--lg">Explore products</a>
		</div>
	</div>
</section>

<style>
	/* ── Trusted parts / global sourcing ─────────────────────────────────────
	   Built on the design-system tokens (--web-* / --cw-*) so it matches the
	   marketing theme. Data + donut ring are computed in the script above. */
	.src-stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
		margin-top: 8px;
	}
	.src-stat {
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: var(--cw-radius-2xl);
		padding: 20px 22px;
		box-shadow: var(--web-shadow-card);
	}
	.src-stat strong {
		display: block;
		font-size: var(--cw-text-4xl);
		font-weight: 700;
		line-height: 1;
		letter-spacing: -0.02em;
		color: var(--web-heading);
	}
	.src-stat span {
		display: block;
		margin-top: 8px;
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--web-muted);
	}

	.src-grid {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 48px;
		margin-top: 24px;
		padding: 32px;
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: var(--web-radius-card);
		box-shadow: var(--web-shadow-card);
	}
	.src-donut__wrap {
		display: flex;
		justify-content: center;
	}
	.src-donut {
		position: relative;
		width: 220px;
		height: 220px;
		border-radius: 50%;
	}
	.src-donut__hole {
		position: absolute;
		inset: 22%;
		border-radius: 50%;
		background: var(--web-surface);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.src-donut__hole strong {
		font-size: var(--cw-text-3xl);
		font-weight: 700;
		line-height: 1;
		color: var(--web-heading);
	}
	.src-donut__hole span {
		margin-top: 4px;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--web-muted);
	}

	.src-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.src-row {
		display: grid;
		grid-template-columns: 10px 22px minmax(110px, 160px) 1fr auto;
		align-items: center;
		gap: 10px;
	}
	.src-row__dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}
	.src-row__flag {
		width: 22px;
		height: 16px;
		border-radius: 3px;
		object-fit: cover;
		box-shadow: 0 0 0 1px rgba(8, 16, 34, 0.12);
		display: block;
	}
	.src-row__name {
		font-size: 15px;
		font-weight: 700;
		color: var(--web-heading);
		white-space: nowrap;
	}
	.src-row__bar {
		height: 8px;
		border-radius: 9999px;
		background: var(--web-bg-soft);
		overflow: hidden;
	}
	.src-row__bar span {
		display: block;
		height: 100%;
		border-radius: 9999px;
	}
	.src-row__meta {
		font-size: 13px;
		color: var(--web-muted);
		white-space: nowrap;
	}
	.src-row__meta b {
		font-weight: 700;
		color: var(--web-heading);
	}

	@media (max-width: 980px) {
		.src-stats {
			grid-template-columns: 1fr 1fr;
		}
		.src-grid {
			grid-template-columns: 1fr;
			gap: 28px;
			padding: 24px;
		}
	}
	@media (max-width: 560px) {
		.src-row {
			grid-template-columns: 10px 22px 1fr auto;
		}
		.src-row__bar {
			display: none;
		}
	}

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
