<svelte:head>
	<title
		>CropWatch — Wireless temperature &amp; environmental monitoring for cold storage, restaurants,
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
	<meta property="og:title" content="CropWatch — Environmental monitoring you can defend in any audit" />
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
			<h1>Know every freezer, field and barn is in range — without walking the floor.</h1>
			<p class="lead">
				CropWatch puts rugged wireless sensors in your coolers, kitchens, greenhouses and poultry
				houses, then turns every reading into audit-ready proof. No clipboards. No 2&nbsp;a.m.
				surprises. No bad data.
			</p>
			<ul class="proof">
				<li><span class="material-symbols-rounded">check</span> <span>Pass your next health or HACCP audit</span></li>
				<li><span class="material-symbols-rounded">check</span> <span>Catch a failing cooler before product is lost</span></li>
				<li><span class="material-symbols-rounded">check</span> <span>Swap a sensor yourself in 60 seconds</span></li>
				<li><span class="material-symbols-rounded">check</span> <span>Trust the reading — or the system fails safe</span></li>
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

<!-- ░░ Why us — 4 differentiators (short) ░░ -->
<section class="section scroll-pad" id="why">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">Why CropWatch</p>
			<h2>Four reasons buyers in the U.S. switch to CropWatch.</h2>
			<p class="section__intro">
				Most monitoring systems make you trust a single sensor, lock you into a technician for every
				swap, and quietly log numbers that may be wrong. We built ours the opposite way.
			</p>
		</div>
		<div class="why4">
			<article class="why-card" data-reveal>
				<span class="why-card__ic"><span class="material-symbols-rounded">cached</span></span>
				<h3>User-replaceable sensors</h3>
				<p>Pop the cap, swap the calibrated module, re-pair. No truck roll, no service contract, no downtime — anyone on your team can do it in under a minute.</p>
			</article>
			<article class="why-card" data-reveal="1">
				<span class="why-card__ic"><span class="material-symbols-rounded">verified</span></span>
				<h3>ISO/IEC 17025 certified</h3>
				<p>Every sensor ships with a downloadable calibration certificate tied to its individual serial number — NIST-traceable proof, ready for any inspector.</p>
			</article>
			<article class="why-card" data-reveal="2">
				<span class="why-card__ic"><span class="material-symbols-rounded">fact_check</span></span>
				<h3>Dual-sensor verified</h3>
				<p>Two independent sensors cross-check every reading. If they disagree, the device flags an error and refuses to publish — so bad data never reaches your records.</p>
			</article>
			<article class="why-card" data-reveal="3">
				<span class="why-card__ic"><span class="material-symbols-rounded">health_and_safety</span></span>
				<h3>Self-auditing hardware</h3>
				<p>The device continuously checks and corrects itself. If anything drifts out of spec, it tells you — instead of silently logging numbers you can't trust.</p>
			</article>
		</div>
	</div>
</section>

<!-- ░░ Dashboard mockup ░░ -->
<section class="section section--navy section--tight">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">One dashboard, every location</p>
			<h2>See every reading the moment it lands.</h2>
			<p class="section__intro">
				Live status, history, and alerts for every sensor across every site — on the web, your
				phone, or pulled straight into a spreadsheet.
			</p>
		</div>
		<div class="dashwrap" data-reveal>
			<div class="dashbar"><i></i><i></i><i></i><span class="url">app.cropwatch.io/locations</span></div>
			<div class="dash">
				<div class="dash__top">
					<h4>Riverside Foods — All locations</h4>
					<span class="dash__count">18 sensors</span>
					<span class="dash__spacer"></span>
					<span class="dash__pill ok"><span class="material-symbols-rounded">check_circle</span> 16 in range</span>
					<span class="dash__pill warn"><span class="material-symbols-rounded">error</span> 1 alert · 1 fault</span>
				</div>
				<div class="dash__grid">
					<div class="dcards">
						<div class="dcard ok">
							<div class="dcard__h"><b class="dcard__lab">Walk-in Cooler A</b></div>
							<div class="dcard__stats">
								<div><div class="dstat__v t">3.4<small> °C</small></div><div class="dstat__l">Temp</div></div>
								<div><div class="dstat__v h">61<small> %</small></div><div class="dstat__l">Humidity</div></div>
							</div>
						</div>
						<div class="dcard ok">
							<div class="dcard__h"><b class="dcard__lab">Freezer B — Line 2</b></div>
							<div class="dcard__stats">
								<div><div class="dstat__v t">−18.6<small> °C</small></div><div class="dstat__l">Temp</div></div>
								<div><div class="dstat__v h">42<small> %</small></div><div class="dstat__l">Humidity</div></div>
							</div>
						</div>
						<div class="dcard warn">
							<div class="dcard__h"><b class="dcard__lab">Prep Cooler C</b></div>
							<div class="dcard__stats">
								<div><div class="dstat__v t">7.9<small> °C</small></div><div class="dstat__l">Temp · high</div></div>
								<div><div class="dstat__v h">58<small> %</small></div><div class="dstat__l">Humidity</div></div>
							</div>
						</div>
						<div class="dcard bad">
							<div class="dcard__h"><b class="dcard__lab">Receiving Dock D</b></div>
							<div class="dcard__err"><span class="material-symbols-rounded">gpp_maybe</span> Sensor mismatch — reading withheld</div>
						</div>
					</div>
					<div class="dpanel">
						<h5>Walk-in Cooler A — 24 h</h5>
						<span class="sub">Temperature · °C · safe band 0–5 °C</span>
						<svg class="chart" viewBox="0 0 320 116" preserveAspectRatio="none" aria-hidden="true">
							<defs>
								<linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0" stop-color="#00d4aa" stop-opacity="0.35" />
									<stop offset="1" stop-color="#00d4aa" stop-opacity="0" />
								</linearGradient>
							</defs>
							<rect x="0" y="40" width="320" height="40" fill="#10b981" opacity="0.10" />
							<line x1="0" y1="40" x2="320" y2="40" stroke="#3a4861" stroke-width="1" stroke-dasharray="3 4" />
							<line x1="0" y1="80" x2="320" y2="80" stroke="#3a4861" stroke-width="1" stroke-dasharray="3 4" />
							<path d="M0,66 L40,62 L80,68 L120,58 L160,64 L200,55 L240,60 L280,57 L320,61 L320,116 L0,116 Z" fill="url(#ga)" />
							<path d="M0,66 L40,62 L80,68 L120,58 L160,64 L200,55 L240,60 L280,57 L320,61" fill="none" stroke="#00d4aa" stroke-width="2.2" stroke-linejoin="round" />
						</svg>
						<div class="alerts">
							<div class="alert g"><span class="material-symbols-rounded">check_circle</span><div><b>Freezer B back in range</b> <span>−18.6 °C</span></div><time>09:42</time></div>
							<div class="alert a"><span class="material-symbols-rounded">warning</span><div><b>Prep Cooler C above 5 °C</b> <span>SMS + email sent</span></div><time>11:18</time></div>
							<div class="alert r"><span class="material-symbols-rounded">gpp_maybe</span><div><b>Dock D sensor mismatch</b> <span>reading withheld</span></div><time>11:25</time></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<p style="text-align:center;margin-top:22px" data-reveal>
			<a href="/contact" class="cta-pill cta-pill--lg">See it on your own coolers <span class="material-symbols-rounded">arrow_forward</span></a>
		</p>
	</div>
</section>

<!-- ░░ Differentiators expanded ░░ -->
<section class="section section--tint">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent">How it's built differently</p>
			<h2>The details that keep you out of trouble.</h2>
		</div>

		<!-- 1 replaceable -->
		<div class="diff-row" data-reveal>
			<div class="diff-row__copy">
				<p class="eyebrow">01 · Field-serviceable</p>
				<h3>Swap a sensor yourself — in under a minute.</h3>
				<p>When a calibrated module reaches end of life, you don't book a technician or ship the unit back. You unclip the old module and snap in a new pre-calibrated one.</p>
				<ul class="diff-list">
					<li><span class="material-symbols-rounded">check</span> Pre-calibrated replacement modules — no recalibration on site</li>
					<li><span class="material-symbols-rounded">check</span> Tool-free cap; the gateway re-pairs automatically</li>
					<li><span class="material-symbols-rounded">check</span> Zero downtime, zero truck rolls, zero service contracts</li>
				</ul>
				<p style="margin-top:18px"><a href="/replacement-sensors" class="cta-ghost">Replacement sensors <span class="material-symbols-rounded">arrow_forward</span></a></p>
			</div>
			<div class="diff-row__media"><div class="diff-art">
				<div class="schem">
					<div class="schem__tile"><span class="material-symbols-rounded">lock_open</span><div><b>1 · Unclip the cap</b><span>tool-free</span></div></div>
					<div class="schem__tile"><span class="material-symbols-rounded">cached</span><div><b>2 · Swap the module</b><span>pre-calibrated</span></div></div>
					<div class="schem__tile schem__tile--ok"><span class="material-symbols-rounded">cell_tower</span><div><b>3 · Auto re-pairs</b><span>back online &lt; 60 s</span></div></div>
				</div>
			</div></div>
		</div>

		<!-- 2 iso -->
		<div class="diff-row" data-reveal>
			<div class="diff-row__copy">
				<p class="eyebrow">02 · Provable accuracy</p>
				<h3>A certificate for every serial number.</h3>
				<p>Each sensor is calibrated in an ISO/IEC 17025 accredited process and ships with its own NIST-traceable certificate — downloadable any time, matched to the exact device on your wall.</p>
				<ul class="diff-list">
					<li><span class="material-symbols-rounded">check</span> Per-serial-number certificates, not a generic batch sheet</li>
					<li><span class="material-symbols-rounded">check</span> ±0.3 °C accuracy, traceable to national standards</li>
					<li><span class="material-symbols-rounded">check</span> Download the PDF straight from the dashboard for an auditor</li>
				</ul>
			</div>
			<div class="diff-row__media"><div class="diff-art">
				<div class="schem" style="max-width:340px">
					<div class="schem__tile" style="flex-direction:column;align-items:stretch;gap:10px">
						<div style="display:flex;align-items:center;gap:10px"><span class="material-symbols-rounded" style="color:var(--web-accent)">workspace_premium</span><b style="font-size:13px">Calibration Certificate</b></div>
						<div style="font-family:var(--cw-font-mono);font-size:11.5px;color:var(--web-muted);line-height:1.7">
							Model&nbsp;&nbsp;CW-AIR-TH<br />Serial&nbsp;&nbsp;CW-7F3A-29155<br />Std&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ISO/IEC 17025<br />Accuracy ±0.3 °C / ±2 %RH<br />Trace&nbsp;&nbsp;&nbsp;NIST
						</div>
						<span style="display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:var(--web-accent)"><span class="material-symbols-rounded" style="font-size:17px">download</span> Download PDF</span>
					</div>
				</div>
			</div></div>
		</div>

		<!-- 3 dual -->
		<div class="diff-row" data-reveal>
			<div class="diff-row__copy">
				<p class="eyebrow">03 · Fail-safe by design</p>
				<h3>Two sensors. One verified truth.</h3>
				<p>Every device carries two independent sensing elements that cross-check each other on every reading. Agree, and the reading is published. Disagree, and the device fails safe — flagging a fault instead of writing a number you can't trust.</p>
				<ul class="diff-list">
					<li><span class="material-symbols-rounded">check</span> Dual-element cross-validation on every sample</li>
					<li><span class="material-symbols-rounded">check</span> A drifting element is caught before it pollutes your log</li>
					<li><span class="material-symbols-rounded">check</span> "No data" beats "wrong data" — every time</li>
				</ul>
			</div>
			<div class="diff-row__media"><div class="diff-art">
				<div class="schem">
					<div class="schem__tile schem__tile--ok"><span class="material-symbols-rounded">check_circle</span><div><b>Sensor A 3.4 °C · Sensor B 3.5 °C</b><span>agree → published</span></div></div>
					<div class="schem__tile schem__tile--bad"><span class="material-symbols-rounded">gpp_maybe</span><div><b>Sensor A 3.4 °C · Sensor B 6.1 °C</b><span>mismatch → reading withheld</span></div></div>
				</div>
			</div></div>
		</div>

		<!-- 4 self-audit -->
		<div class="diff-row" data-reveal>
			<div class="diff-row__copy">
				<p class="eyebrow">04 · Always honest</p>
				<h3>Hardware that audits itself.</h3>
				<p>The device runs continuous self-checks on its electronics and power, correcting for known drift and raising a fault the moment anything falls out of spec — so the only readings you ever see are ones the device stands behind.</p>
				<ul class="diff-list">
					<li><span class="material-symbols-rounded">check</span> Continuous self-diagnostics and drift correction</li>
					<li><span class="material-symbols-rounded">check</span> Battery, link and sensor health reported up front</li>
					<li><span class="material-symbols-rounded">check</span> Faults surface as alerts — never hidden in the data</li>
				</ul>
			</div>
			<div class="diff-row__media"><div class="diff-art">
				<div class="schem">
					<div class="schem__tile"><span class="material-symbols-rounded">memory</span><div><b>Self-check loop</b><span>electronics · power · clock</span></div></div>
					<div class="schem__tile schem__tile--ok"><span class="material-symbols-rounded">tune</span><div><b>Auto-corrects known drift</b><span>stays in spec</span></div></div>
					<div class="schem__tile schem__tile--ok"><span class="material-symbols-rounded">battery_5_bar</span><div><b>Health reported</b><span>10-yr battery · RSSI</span></div></div>
				</div>
			</div></div>
		</div>
	</div>
</section>

<!-- ░░ Everything included ░░ -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">No surprise invoices</p>
			<h2>The software is included. All of it.</h2>
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
					<li><span class="material-symbols-rounded">check</span> Unlimited users — invite your whole team and auditors</li>
					<li><span class="material-symbols-rounded">check</span> Unlimited alert rules &amp; recipients (SMS, email, webhook)</li>
					<li><span class="material-symbols-rounded">check</span> Full public API access for Excel, Sheets &amp; BI</li>
					<li><span class="material-symbols-rounded">check</span> Unlimited scheduled &amp; on-demand reports</li>
					<li><span class="material-symbols-rounded">check</span> Swap your own sensors — no service contract</li>
				</ul>
			</div>
		</div>
		<div class="incl">
			<div class="incl-card" data-reveal><span class="material-symbols-rounded">group</span><b>Unlimited users</b><span>Whole team + auditors</span><span class="free">No per-seat fees</span></div>
			<div class="incl-card" data-reveal="1"><span class="material-symbols-rounded">notifications_active</span><b>Unlimited rules</b><span>SMS · email · webhook</span><span class="free">Included</span></div>
			<div class="incl-card" data-reveal="2"><span class="material-symbols-rounded">api</span><b>Full API</b><span>api.cropwatch.io</span><span class="free">Included</span></div>
			<div class="incl-card" data-reveal="3"><span class="material-symbols-rounded">summarize</span><b>Unlimited reports</b><span>Scheduled &amp; PDF</span><span class="free">Included</span></div>
		</div>
	</div>
</section>

<!-- ░░ Industries (SEO) ░░ -->
<section class="section section--tint scroll-pad" id="industries">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">Where CropWatch works</p>
			<h2>One platform for everything that has to stay in range.</h2>
			<p class="section__intro">From a hospital pharmacy fridge to an open field, the same rugged devices and the same dashboard cover it.</p>
		</div>
		<div class="industries">
			<a class="ind-chip" href="/cold-chain" data-reveal><span class="material-symbols-rounded">restaurant</span><span><b>Restaurants</b><span>Coolers, freezers, prep lines</span></span></a>
			<a class="ind-chip" href="/cold-chain" data-reveal><span class="material-symbols-rounded">hotel</span><span><b>Hotels &amp; hospitality</b><span>Kitchens, banquet, bars</span></span></a>
			<a class="ind-chip" href="/cold-chain" data-reveal><span class="material-symbols-rounded">school</span><span><b>Schools &amp; universities</b><span>Cafeterias, labs, dining</span></span></a>
			<a class="ind-chip" href="/cold-chain" data-reveal><span class="material-symbols-rounded">local_hospital</span><span><b>Hospitals &amp; pharma</b><span>Vaccine &amp; medication fridges</span></span></a>
			<a class="ind-chip" href="/cold-chain" data-reveal><span class="material-symbols-rounded">warehouse</span><span><b>Cold storage &amp; warehousing</b><span>Walk-ins, blast freezers</span></span></a>
			<a class="ind-chip" href="/cold-chain" data-reveal><span class="material-symbols-rounded">grocery</span><span><b>Grocery &amp; food retail</b><span>Display cases, back-of-house</span></span></a>
			<a class="ind-chip" href="/agriculture" data-reveal><span class="material-symbols-rounded">agriculture</span><span><b>Farming &amp; agriculture</b><span>Field, soil &amp; canopy</span></span></a>
			<a class="ind-chip" href="/agriculture" data-reveal><span class="material-symbols-rounded">eco</span><span><b>Greenhouses</b><span>Climate &amp; humidity</span></span></a>
			<a class="ind-chip" href="/livestock" data-reveal><span class="material-symbols-rounded">egg</span><span><b>Poultry</b><span>Broiler &amp; layer houses</span></span></a>
			<a class="ind-chip" href="/livestock" data-reveal><span class="material-symbols-rounded">pets</span><span><b>Livestock &amp; dairy</b><span>Barn &amp; shed climate</span></span></a>
			<a class="ind-chip" href="/cold-chain" data-reveal><span class="material-symbols-rounded">factory</span><span><b>Food manufacturing</b><span>Process &amp; storage</span></span></a>
			<a class="ind-chip" href="/cold-chain" data-reveal><span class="material-symbols-rounded">local_shipping</span><span><b>Distribution &amp; logistics</b><span>Docks &amp; reefers</span></span></a>
		</div>
	</div>
</section>

<!-- ░░ Proof band ░░ -->
<section class="proofband">
	<div class="wrap proofband__grid">
		<div class="stat" data-reveal><p class="stat__eyebrow">Battery life</p><p class="stat__value stat__value--accent">10 yr</p><p class="stat__body">User-replaceable cells. No wiring, no gateways to babysit.</p></div>
		<div class="stat" data-reveal="1"><p class="stat__eyebrow">Accuracy</p><p class="stat__value">±0.3 °C</p><p class="stat__body">NIST-traceable, ISO/IEC 17025 calibrated — defensible in an audit.</p></div>
		<div class="stat" data-reveal="2"><p class="stat__eyebrow">Range</p><p class="stat__value stat__value--accent">5 miles</p><p class="stat__body">LoRaWAN coverage from a single gateway across a whole site.</p></div>
		<div class="stat" data-reveal="3"><p class="stat__eyebrow">Bad readings logged</p><p class="stat__value">0</p><p class="stat__body">Dual-sensor verification means wrong data never reaches your records.</p></div>
	</div>
</section>

<!-- ░░ Closing ░░ -->
<section class="closing">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold">Ready when you are</p>
		<h2>See your own coolers on the dashboard this week.</h2>
		<p>Tell us what you need to keep in range. We'll map the sensors, gateways, and alerts — and show you the audit trail it produces.</p>
		<div class="closing__ctas">
			<a href="/contact" class="cta-pill cta-pill--lg">Book a demo</a>
			<a href="/cold-chain" class="cta-ghost cta-ghost--light cta-pill--lg">Explore products</a>
		</div>
	</div>
</section>
