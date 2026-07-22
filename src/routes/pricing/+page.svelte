<script lang="ts">
	import { flushSync, onMount } from 'svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	/* ══════════════════════════════════════════════════════════════════
	   Pricing knobs - edit these to tune the calculator, per sector.
	   pricePerDevice / baseFee are USD per month; minutesPerCheck is the
	   DEFAULT time one manual reading of one unit takes (walk there, read
	   it, log it) - shown as an adjustable slider on the page. comingSoon:
	   true hides the calculator for that tab and shows a "coming soon"
	   card instead.
	   ══════════════════════════════════════════════════════════════════ */
	type Sector = {
		label: string;
		icon: string;
		pricePerDevice: number;
		/** USD per month, charged once per account regardless of location count. */
		baseFee: number;
		/** One-time hardware price per sensor, USD. null = quote only (no ROI chart). */
		deviceUnitPrice: number | null;
		/** Default slider position: number of locations (sites/stores/farms). */
		defaultLocations: number;
		/** Default slider position: how many units a typical location monitors. */
		defaultUnits: number;
		/** Default slider position: manual temperature checks per day. */
		defaultChecksPerDay: number;
		minutesPerCheck: number;
		unitsHint: string;
		comingSoon?: boolean;
	};
	const SECTORS: Record<string, Sector> = {
		'cold-chain': {
			label: 'Cold-Chain',
			icon: 'ac_unit',
			pricePerDevice: 8,
			baseFee: 100,
			deviceUnitPrice: 220,
			defaultLocations: 1,
			defaultUnits: 20,
			defaultChecksPerDay: 2,
			minutesPerCheck: 3,
			unitsHint: 'Coolers, freezers and display cases.'
		},
		livestock: {
			label: 'Livestock',
			icon: 'pets',
			pricePerDevice: 8,
			baseFee: 50,
			deviceUnitPrice: 260,
			defaultLocations: 1,
			defaultUnits: 50,
			defaultChecksPerDay: 3,
			minutesPerCheck: 5,
			unitsHint: 'Poultry houses, barn zones and dairy rooms.'
		},
		agriculture: {
			label: 'Agriculture',
			icon: 'eco',
			pricePerDevice: 0,
			baseFee: 0,
			deviceUnitPrice: null,
			defaultLocations: 0,
			defaultUnits: 0,
			defaultChecksPerDay: 0,
			minutesPerCheck: 0,
			unitsHint: '',
			comingSoon: true
		}
	};
	/** Default hourly wage: the average US state minimum wage (federal floor is $7.25). */
	const DEFAULT_HOURLY_WAGE = 11.51;
	/** One-time gateway + onboarding cost per location, USD.
	    PLACEHOLDER converted from the Japan price list (¥275,000; sensors
	    ¥33,000/¥39,000 -> deviceUnitPrice above) at ~150 JPY/USD - adjust to
	    the real US hardware pricing before this ships. */
	const HARDWARE_BASE_PRICE = 1800;
	/* ══════════════════════════════════════════════════════════════════ */

	const SECTOR_IDS = Object.keys(SECTORS);
	let sector = $state('cold-chain');
	const cfg = $derived(SECTORS[sector]);

	let locations = $state(SECTORS['cold-chain'].defaultLocations);
	let units = $state(SECTORS['cold-chain'].defaultUnits);
	let checksPerDay = $state(SECTORS['cold-chain'].defaultChecksPerDay);
	let minutesPerCheck = $state(SECTORS['cold-chain'].minutesPerCheck);
	let wage = $state(DEFAULT_HOURLY_WAGE);

	function selectSector(id: string) {
		sector = id;
		// Each sector starts from its own realistic defaults.
		locations = SECTORS[id].defaultLocations;
		units = SECTORS[id].defaultUnits;
		checksPerDay = SECTORS[id].defaultChecksPerDay;
		minutesPerCheck = SECTORS[id].minutesPerCheck;
	}

	// Honor ?sector= deep links (e.g. /pricing?sector=livestock).
	onMount(() => {
		printDate = new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
		const requested = new URL(window.location.href).searchParams.get('sector');
		if (requested && SECTORS[requested]) selectSector(requested);
	});

	const safeWage = $derived(Number.isFinite(wage) && wage > 0 ? wage : 0);

	// Everything below the locations slider is per location.
	const totalUnits = $derived(locations * units);

	// Manual clipboard logging: every unit, every check, every day, every site.
	const manualHoursPerYear = $derived((totalUnits * checksPerDay * minutesPerCheck * 365) / 60);
	const manualCostPerYear = $derived(manualHoursPerYear * safeWage);

	// CropWatch: one base fee per account (NOT per location) + per-device fee, billed monthly.
	const cropwatchPerMonth = $derived(cfg.baseFee + totalUnits * cfg.pricePerDevice);
	const cropwatchPerYear = $derived(cropwatchPerMonth * 12);

	const savingsPerYear = $derived(manualCostPerYear - cropwatchPerYear);
	const savingsPerMonth = $derived(savingsPerYear / 12);
	const checksPerYear = $derived(totalUnits * checksPerDay * 365);

	const usd = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0
	});
	const usd2 = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 2
	});
	const num = new Intl.NumberFormat('en-US');
	/** Short money for chart axis labels ($550k / $1.2M). */
	const usdCompact = (v: number) =>
		v >= 1e6
			? `$${(v / 1e6).toLocaleString('en-US', { maximumFractionDigits: 1 })}M`
			: v >= 1e3
				? `$${Math.round(v / 1e3).toLocaleString('en-US')}k`
				: `$${Math.round(v).toLocaleString('en-US')}`;

	// ── ROI (payback) line chart ──
	// Cumulative CropWatch cost (one-time hardware + monthly subscription)
	// versus the cumulative labor cost of manual logging.
	/** Estimated one-time hardware & setup across all locations. */
	const roiInitial = $derived(
		(cfg.deviceUnitPrice ?? 0) * totalUnits + HARDWARE_BASE_PRICE * locations
	);
	const manualPerMonth = $derived(manualCostPerYear / 12);
	/** Months until the hardware investment pays for itself (null = never at these settings). */
	const breakEvenMonths = $derived(savingsPerMonth > 0 ? roiInitial / savingsPerMonth : null);
	/** Payback slower than 3 years reads as a bad deal on labor savings alone - flag it. */
	const slowRoi = $derived(breakEvenMonths !== null && breakEvenMonths > 36);
	/** X-axis span: 3 years by default; extend so the break-even point fits (max 10 years). */
	const roiMonths = $derived(
		breakEvenMonths === null
			? 36
			: Math.min(120, Math.max(36, Math.ceil((breakEvenMonths * 1.25) / 6) * 6))
	);
	const cwAt = (m: number) => roiInitial + cropwatchPerMonth * m;
	const manualAt = (m: number) => manualPerMonth * m;
	/** Round the axis ceiling up to a tidy 1/2/2.5/5 x 10^k value. */
	function niceCeil(v: number) {
		if (v <= 0) return 1;
		const exp = Math.pow(10, Math.floor(Math.log10(v)));
		const f = v / exp;
		return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * exp;
	}
	const roiMaxY = $derived(niceCeil(Math.max(cwAt(roiMonths), manualAt(roiMonths))));

	// Drawing geometry (tracks the container width).
	let chartW = $state(0);
	const CHART_H = 260;
	const PAD = { top: 18, right: 18, bottom: 30, left: 56 };
	const plotW = $derived(Math.max(chartW - PAD.left - PAD.right, 0));
	const plotH = CHART_H - PAD.top - PAD.bottom;
	const xAt = (m: number) => PAD.left + (m / roiMonths) * plotW;
	const yAt = (v: number) => PAD.top + plotH - (v / roiMaxY) * plotH;
	// Thin out the ticks on narrow screens so labels don't overlap.
	const xTickStep = $derived(roiMonths <= 42 ? (chartW < 480 ? 12 : 6) : chartW < 480 ? 24 : 12);
	const xTicks = $derived(
		Array.from({ length: Math.floor(roiMonths / xTickStep) + 1 }, (_, i) => i * xTickStep)
	);
	const yTicks = $derived([0, 1, 2, 3, 4].map((i) => (roiMaxY / 4) * i));
	const monthLabel = (m: number) => (m === 0 ? 'Start' : m % 12 === 0 ? `${m / 12} yr` : `${m} mo`);

	// Hover/focus: snap to the nearest month and show both series.
	let hoverMonth = $state<number | null>(null);
	function roiMove(e: PointerEvent) {
		const rect = (e.currentTarget as SVGRectElement).getBoundingClientRect();
		const m = Math.round(((e.clientX - rect.left - PAD.left) / Math.max(plotW, 1)) * roiMonths);
		hoverMonth = Math.max(0, Math.min(roiMonths, m));
	}

	// ── Print (preliminary estimate for customer review) ──
	/** Keep the ROI numbers table open while printing (closed <details> don't print). */
	let roiTableOpen = $state(false);
	/** The browser snapshots the page right after beforeprint, so flush the
	    open attribute synchronously instead of waiting for Svelte's async tick. */
	function openRoiTableForPrint() {
		flushSync(() => (roiTableOpen = true));
	}
	/** Date shown in the print header (resolved client-side only). */
	let printDate = $state('');
</script>

<svelte:head>
	<title>Pricing &amp; Savings Calculator | CropWatch</title>
	<meta
		name="description"
		content="See what CropWatch costs and what it saves. Slide in your number of monitored units and how often you log temperatures today - the calculator compares manual clipboard logging against automated monitoring in real time."
	/>
	<meta property="og:title" content="Pricing &amp; Savings Calculator | CropWatch" />
	<meta
		property="og:description"
		content="Compare the cost of manual temperature logging against automated CropWatch monitoring - live, with your own numbers."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://cropwatch.io/pricing" />
</svelte:head>

<!-- Any print (including Ctrl+P) should output with the ROI table expanded. -->
<svelte:window onbeforeprint={openRoiTableForPrint} />

<Breadcrumbs items={[{ label: 'Home', href: '/home' }, { label: 'Pricing' }]} />

<section class="pagehero">
	<div class="wrap" data-reveal>
		<p class="eyebrow"><span class="material-symbols-rounded">payments</span> Pricing</p>
		<h1>ROI Estimation</h1>
		<p class="lead">
			{#if cfg.comingSoon}
				{cfg.label} pricing is on its way. Pick another sector to run the numbers - unlimited users, alerts,
				reports and API are always included.
			{:else}
				Simple {cfg.label.toLowerCase()} pricing: {usd2.format(cfg.baseFee)}/month base + {usd2.format(
					cfg.pricePerDevice
				)}/month per monitored unit - unlimited users, alerts, reports and API included. Slide in
				your own numbers and see the ROI for yourself.
			{/if}
		</p>
	</div>
</section>

<section class="section">
	<div class="wrap">
		<!-- Print-only header (hidden on screen) -->
		<div class="print-head">
			<img src="/assets/logos/cropwatch_static.svg" alt="" class="print-head__logo" />
			<div class="print-head__tx">
				<b>CropWatch</b>
				<span>Pricing &amp; savings estimate (preliminary)</span>
			</div>
			<div class="print-head__meta">
				{#if printDate}<span>Printed: {printDate}</span>{/if}
				<span
					>{cfg.label} / {num.format(units)}
					{units === 1 ? 'unit' : 'units'} × {num.format(locations)}
					{locations === 1 ? 'location' : 'locations'}</span
				>
			</div>
		</div>

		<div class="calc-tabs" role="tablist" aria-label="Pricing by sector" data-reveal>
			{#each SECTOR_IDS as id (id)}
				{@const s = SECTORS[id]}
				<button
					type="button"
					id="sector-{id}"
					class="calc-tab"
					class:is-active={sector === id}
					role="tab"
					aria-selected={sector === id}
					onclick={() => selectSector(id)}
				>
					<span class="material-symbols-rounded">{s.icon}</span>
					<span>{s.label}</span>
					{#if s.comingSoon}<span class="calc-tab__soon">Coming soon</span>{/if}
				</button>
			{/each}
		</div>
	</div>

	{#if cfg.comingSoon}
		<div class="wrap" data-reveal>
			<div class="calc-soon" id="calc-coming-soon">
				<span class="material-symbols-rounded">{cfg.icon}</span>
				<h2>{cfg.label} pricing is coming soon.</h2>
				<p>
					We're finalizing packages for greenhouses, fields and soil monitoring. Tell us about your
					operation and we'll put real numbers in front of you first.
				</p>
				<a href="/contact" class="cta-pill cta-pill--lg"
					><span>Talk to us</span> <span class="material-symbols-rounded">arrow_forward</span></a
				>
			</div>
		</div>
	{:else}
		<div class="wrap">
			<!-- Print-only: a compact "your inputs" table replaces the sliders,
		     which are hidden when printing. -->
			<div class="print-inputs">
				<h2>Your inputs</h2>
				<table>
					<tbody>
						<tr>
							<th>Sector</th>
							<td>{cfg.label}</td>
							<th>Monitored units per location</th>
							<td>{num.format(units)}</td>
						</tr>
						<tr>
							<th>Locations</th>
							<td>{num.format(locations)}</td>
							<th>Total monitored units</th>
							<td>{num.format(totalUnits)}</td>
						</tr>
						<tr>
							<th>Temperature checks per day</th>
							<td>{checksPerDay}×</td>
							<th>Time per reading</th>
							<td>{minutesPerCheck} min</td>
						</tr>
						<tr>
							<th>Hourly wage</th>
							<td>{usd2.format(safeWage)}/hr</td>
							<th>Printed</th>
							<td>{printDate}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div class="wrap calc" data-reveal>
			<div class="calc__inputs">
				<div class="calc-loc">
					<div class="calc-field__head">
						<label for="locations">Locations</label>
						<b>{locations}</b>
					</div>
					<input id="locations" type="range" min="1" max="50" step="1" bind:value={locations} />
					<p class="calc-field__hint">
						Sites, stores, plants or farms. Everything inside applies to each location.
					</p>

					<div class="calc-loc__fields">
						<div class="calc-field">
							<div class="calc-field__head">
								<label for="units">Monitored units per location</label>
								<b>{units}</b>
							</div>
							<input id="units" type="range" min="1" max="100" step="1" bind:value={units} />
							<p class="calc-field__hint">{cfg.unitsHint}</p>
						</div>

						<div class="calc-field">
							<div class="calc-field__head">
								<label for="checks">Temperature checks per day</label>
								<b>{checksPerDay}×</b>
							</div>
							<input id="checks" type="range" min="1" max="12" step="1" bind:value={checksPerDay} />
							<p class="calc-field__hint">
								How often someone currently walks the log route. Health codes typically require at
								least two.
							</p>
						</div>

						<div class="calc-field">
							<div class="calc-field__head">
								<label for="minutes">Time per reading</label>
								<b>{minutesPerCheck} min</b>
							</div>
							<input
								id="minutes"
								type="range"
								min="1"
								max="30"
								step="1"
								bind:value={minutesPerCheck}
							/>
							<p class="calc-field__hint">
								Be honest here: include the walk or travel time to reach each unit, reading it, and
								the time to log the number into your system - not just glancing at a display.
							</p>
						</div>
					</div>
				</div>

				<div class="calc-field">
					<div class="calc-field__head">
						<label for="wage">Hourly wage</label>
						<b>{usd2.format(safeWage)}/hr</b>
					</div>
					<div class="calc-wage">
						<span class="calc-wage__cur">$</span>
						<input id="wage" type="number" min="0" step="0.25" bind:value={wage} />
					</div>
					<p class="calc-field__hint">
						Defaults to the average US state minimum wage ({usd2.format(DEFAULT_HOURLY_WAGE)}/hr).
						Use your real loaded labor rate for a truer number.
					</p>
				</div>

				<p class="calc-assume">
					Assumes checks happen 365 days a year. CropWatch records automatically every 10 minutes -
					the numbers below only count the manual walk it replaces.
				</p>
			</div>

			<div class="calc__results">
				<div class="calc-row">
					<span
						>Manual logging labor <small
							>({num.format(Math.round(manualHoursPerYear))} hours/yr)</small
						></span
					>
					<b>{usd.format(manualCostPerYear)}<small>/yr</small></b>
				</div>
				<div class="calc-row">
					<span
						>CropWatch <small
							>({usd2.format(cropwatchPerMonth)}/mo · {num.format(totalUnits)} devices)</small
						></span
					>
					<b>{usd.format(cropwatchPerYear)}<small>/yr</small></b>
				</div>
				<div class="calc-total" class:is-negative={savingsPerYear < 0 || slowRoi}>
					<span>Your estimated savings</span>
					<strong
						>{usd.format(savingsPerYear)}<small>/yr</small>{#if savingsPerYear < 0}<span
								class="calc-total__nope">Not worth it</span
							>{:else if slowRoi}<span class="calc-total__nope calc-total__nope--roi"
								>&gt; 3 year ROI, likely not worth it</span
							>{/if}</strong
					>
					<span class="calc-total__sub">
						{#if savingsPerYear < 0}
							At this size the clipboard is cheaper on paper - but {num.format(checksPerYear)}
							automated checks a year, audit-proof records and 24/7 alerts usually still win.
						{:else if slowRoi && breakEvenMonths !== null}
							The savings are real, but at these settings the hardware takes about {(
								breakEvenMonths / 12
							).toFixed(1)} years to pay for itself. Spoilage prevented and audit protection usually
							shorten that - worth checking on a demo before ruling it out.
						{:else}
							{usd.format(savingsPerMonth)} back every month - and {num.format(checksPerYear)} checks
							a year logged without anyone lifting a pen.
						{/if}
					</span>
				</div>
				<a href="/contact" class="cta-pill cta-pill--lg calc-cta"
					><span>Get an exact quote</span>
					<span class="material-symbols-rounded">arrow_forward</span></a
				>
				<button
					type="button"
					class="calc-print"
					onclick={() => {
						openRoiTableForPrint();
						window.print();
					}}
				>
					<span class="material-symbols-rounded">print</span>
					Print this estimate
				</button>
				<p class="calc-fine">
					Estimate only - excludes spoilage prevented, energy saved and failed-audit risk, which are
					usually the bigger numbers. We'll walk through those on a demo.
				</p>
			</div>
		</div>

		{#if cfg.deviceUnitPrice !== null}
			<!-- ROI: payback line chart -->
			<div class="wrap" data-reveal>
				<div class="roi">
					<h2 class="roi__title">
						<span class="material-symbols-rounded">show_chart</span> When does it pay for itself?
					</h2>
					<p class="roi__sub">
						Cumulative CropWatch cost - estimated one-time hardware &amp; setup of {usd.format(
							roiInitial
						)} plus the monthly subscription - versus the cumulative labor cost of manual logging.
					</p>
					<div class="roi__legend">
						<span><i class="roi-key roi-key--manual"></i>Manual logging labor (cumulative)</span>
						<span><i class="roi-key roi-key--cw"></i>CropWatch (hardware + monthly)</span>
					</div>
					<div
						class="roi__chart"
						role="img"
						aria-label="Cumulative cost over time. CropWatch starts at {usd.format(
							roiInitial
						)} of hardware and grows by {usd.format(
							cropwatchPerMonth
						)} per month; manual logging grows
					by {usd.format(manualPerMonth)} per month. The same numbers are in the table below."
						bind:clientWidth={chartW}
					>
						{#if chartW > 0}
							<svg
								width={chartW}
								height={CHART_H}
								viewBox="0 0 {chartW} {CHART_H}"
								aria-hidden="true"
							>
								{#each yTicks as t (t)}
									<line
										x1={PAD.left}
										x2={chartW - PAD.right}
										y1={yAt(t)}
										y2={yAt(t)}
										class="roi-grid"
									/>
									<text x={PAD.left - 8} y={yAt(t) + 3.5} text-anchor="end" class="roi-tick"
										>{usdCompact(t)}</text
									>
								{/each}
								{#each xTicks as m (m)}
									<text x={xAt(m)} y={CHART_H - 8} text-anchor="middle" class="roi-tick"
										>{monthLabel(m)}</text
									>
								{/each}
								{#if hoverMonth !== null}
									<line
										x1={xAt(hoverMonth)}
										x2={xAt(hoverMonth)}
										y1={PAD.top}
										y2={PAD.top + plotH}
										class="roi-cross"
									/>
								{/if}
								<line
									x1={xAt(0)}
									y1={yAt(manualAt(0))}
									x2={xAt(roiMonths)}
									y2={yAt(manualAt(roiMonths))}
									class="roi-line roi-line--manual"
								/>
								<line
									x1={xAt(0)}
									y1={yAt(cwAt(0))}
									x2={xAt(roiMonths)}
									y2={yAt(cwAt(roiMonths))}
									class="roi-line roi-line--cw"
								/>
								{#if breakEvenMonths !== null && breakEvenMonths <= roiMonths}
									<circle
										cx={xAt(breakEvenMonths)}
										cy={yAt(cwAt(breakEvenMonths))}
										r="4.5"
										class="roi-be"
									/>
									<text
										x={xAt(breakEvenMonths) + (breakEvenMonths > roiMonths * 0.6 ? -10 : 10)}
										y={Math.max(yAt(cwAt(breakEvenMonths)) - 12, PAD.top + 12)}
										text-anchor={breakEvenMonths > roiMonths * 0.6 ? 'end' : 'start'}
										class="roi-be-label">Pays for itself in ~{Math.ceil(breakEvenMonths)} mo</text
									>
								{/if}
								{#if hoverMonth !== null}
									<circle
										cx={xAt(hoverMonth)}
										cy={yAt(manualAt(hoverMonth))}
										r="4"
										class="roi-dot roi-dot--manual"
									/>
									<circle
										cx={xAt(hoverMonth)}
										cy={yAt(cwAt(hoverMonth))}
										r="4"
										class="roi-dot roi-dot--cw"
									/>
								{/if}
								<!-- Hover is supplementary (the same numbers are in the table below).
							     Only the Svelte a11y warning is suppressed here. -->
								<!-- svelte-ignore a11y_no_static_element_interactions -->
								<rect
									x="0"
									y="0"
									width={chartW}
									height={CHART_H}
									fill="transparent"
									onpointermove={roiMove}
									onpointerleave={() => (hoverMonth = null)}
								/>
							</svg>
							{#if hoverMonth !== null}
								<div
									class="roi-tip"
									class:roi-tip--flip={hoverMonth > roiMonths * 0.55}
									style="left:{xAt(hoverMonth)}px; top:{PAD.top}px;"
								>
									<b class="roi-tip__t"
										>{hoverMonth === 0 ? 'At installation' : `After ${hoverMonth} mo`}</b
									>
									<div class="roi-tip__row">
										<i class="roi-key roi-key--manual"></i>
										<b>{usd.format(manualAt(hoverMonth))}</b>
										<span>Manual logging</span>
									</div>
									<div class="roi-tip__row">
										<i class="roi-key roi-key--cw"></i>
										<b>{usd.format(cwAt(hoverMonth))}</b>
										<span>CropWatch</span>
									</div>
									{#if manualAt(hoverMonth) - cwAt(hoverMonth) > 0}
										<div class="roi-tip__diff">
											{usd.format(manualAt(hoverMonth) - cwAt(hoverMonth))} ahead
										</div>
									{/if}
								</div>
							{/if}
						{/if}
					</div>
					<p class="roi__note">
						{#if breakEvenMonths !== null}
							At {usd.format(savingsPerMonth)}/mo in labor savings, the upfront hardware pays for
							itself in about {Math.ceil(breakEvenMonths)} months.
						{:else}
							At these settings manual logging stays cheaper, so there is no break-even point on
							cost alone.
						{/if}
						Hardware &amp; setup estimated at {usd.format(HARDWARE_BASE_PRICE)}/location plus {usd.format(
							cfg.deviceUnitPrice ?? 0
						)}/sensor - your exact quote may differ.
					</p>
					<details class="roi__table" bind:open={roiTableOpen}>
						<summary>See the numbers as a table</summary>
						<div class="roi__tablewrap">
							<table>
								<thead>
									<tr><th>Time</th><th>Manual logging</th><th>CropWatch</th><th>Difference</th></tr>
								</thead>
								<tbody>
									{#each xTicks as m (m)}
										<tr>
											<th>{monthLabel(m)}</th>
											<td>{usd.format(manualAt(m))}</td>
											<td>{usd.format(cwAt(m))}</td>
											<td>{usd.format(manualAt(m) - cwAt(m))}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</details>
				</div>
			</div>
		{/if}

		<div class="wrap">
			<!-- Print-only footer (hidden on screen) -->
			<p class="print-foot">
				<span class="print-foot__star">★</span>
				All figures in this document are rough, preliminary estimates - not a formal quote. Final pricing
				follows a review of your configuration and site conditions.
			</p>
		</div>
	{/if}
</section>

<style>
	/* ── Sector tabs ── */
	.calc-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-bottom: 30px;
	}
	.calc-tab {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font: inherit;
		font-size: 14.5px;
		font-weight: 700;
		color: var(--cw-ink);
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: 999px;
		padding: 11px 20px;
		cursor: pointer;
		box-shadow: var(--web-shadow-card);
		transition:
			border-color 0.18s ease,
			background 0.18s ease,
			color 0.18s ease;
	}
	.calc-tab .material-symbols-rounded {
		font-size: 19px;
		color: var(--web-accent);
	}
	.calc-tab:hover {
		border-color: var(--web-border-strong);
	}
	.calc-tab.is-active {
		background: var(--web-primary);
		border-color: var(--web-primary);
		color: #fff;
	}
	.calc-tab.is-active .material-symbols-rounded {
		color: #fff;
	}
	.calc-tab__soon {
		font-size: 10.5px;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--cw-gold-500, #f2a516);
		background: color-mix(in srgb, var(--cw-gold-400, #ffbb34) 18%, transparent);
		border: 1px solid color-mix(in srgb, var(--cw-gold-500, #f2a516) 40%, transparent);
		border-radius: 999px;
		padding: 2px 8px;
	}
	.calc-tab.is-active .calc-tab__soon {
		color: #fff;
		background: rgba(255, 255, 255, 0.16);
		border-color: rgba(255, 255, 255, 0.35);
	}

	/* ── Coming-soon card ── */
	.calc-soon {
		text-align: center;
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: var(--web-radius-card);
		box-shadow: var(--web-shadow-card);
		padding: clamp(40px, 6vw, 70px) 24px;
		display: grid;
		justify-items: center;
		gap: 14px;
	}
	.calc-soon > .material-symbols-rounded {
		font-size: 46px;
		color: var(--web-accent);
	}
	.calc-soon h2 {
		margin: 0;
	}
	.calc-soon p {
		margin: 0;
		max-width: 48ch;
		font-size: 15px;
		line-height: 1.7;
		color: var(--web-muted);
	}

	.calc {
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		gap: clamp(24px, 4vw, 48px);
		align-items: start;
	}

	/* ── Inputs ── */
	.calc__inputs {
		display: grid;
		gap: 26px;
	}
	/* Locations wrapper: the outer scale everything else multiplies by. */
	.calc-loc {
		background: var(--web-primary-soft);
		border: 1px solid color-mix(in srgb, var(--web-primary) 30%, transparent);
		border-radius: var(--web-radius-card);
		box-shadow: var(--web-shadow-card);
		padding: 22px 24px;
	}
	.calc-loc > .calc-field__head label {
		font-size: 17px;
	}
	/* The card behind this slider is primary-soft - the default track color -
	   so give it a white track (with a faint outline) to stay visible. */
	.calc-loc > input[type='range'] {
		background: #fff;
		border: 1px solid color-mix(in srgb, var(--web-primary) 35%, transparent);
	}
	.calc-loc > input[type='range']::-moz-range-track {
		background: #fff;
	}
	.calc-loc__fields {
		display: grid;
		gap: 16px;
		margin-top: 20px;
		padding-top: 20px;
		border-top: 1px dashed color-mix(in srgb, var(--web-primary) 35%, transparent);
	}
	.calc-field {
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: var(--web-radius-card);
		box-shadow: var(--web-shadow-card);
		padding: 20px 24px;
	}
	.calc-field__head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 14px;
	}
	.calc-field__head label {
		font-size: 15px;
		font-weight: 700;
		color: var(--cw-ink);
	}
	.calc-field__head b {
		font-size: 22px;
		font-weight: 800;
		color: var(--web-primary);
		font-family: var(--cw-font-mono);
		white-space: nowrap;
	}
	.calc-field__hint {
		margin: 10px 0 0;
		font-size: 12.5px;
		line-height: 1.6;
		color: var(--web-muted);
	}

	input[type='range'] {
		width: 100%;
		appearance: none;
		height: 8px;
		border-radius: 999px;
		background: linear-gradient(90deg, var(--web-primary-soft), var(--web-primary-soft));
		outline-offset: 4px;
		cursor: pointer;
	}
	input[type='range']::-webkit-slider-thumb {
		appearance: none;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: var(--web-primary);
		border: 3px solid #fff;
		box-shadow: 0 1px 6px rgba(8, 16, 34, 0.35);
	}
	input[type='range']::-moz-range-thumb {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--web-primary);
		border: 3px solid #fff;
		box-shadow: 0 1px 6px rgba(8, 16, 34, 0.35);
	}
	input[type='range']::-moz-range-track {
		height: 8px;
		border-radius: 999px;
		background: var(--web-primary-soft);
	}

	.calc-wage {
		position: relative;
	}
	.calc-wage__cur {
		position: absolute;
		left: 14px;
		top: 50%;
		transform: translateY(-50%);
		font-weight: 700;
		color: var(--web-muted);
	}
	.calc-wage input {
		width: 100%;
		font: inherit;
		font-family: var(--cw-font-mono);
		font-weight: 700;
		font-size: 17px;
		color: var(--cw-ink);
		padding: 11px 14px 11px 30px;
		border: 1px solid var(--web-border-strong);
		border-radius: var(--cw-radius-lg);
		background: var(--web-bg-soft);
	}
	.calc-wage input:focus-visible {
		outline: 2px solid var(--web-primary);
		outline-offset: 1px;
	}
	.calc-assume {
		margin: 0;
		font-size: 12.5px;
		line-height: 1.7;
		color: var(--web-muted);
	}

	/* ── Results ── */
	.calc__results {
		position: sticky;
		top: 120px;
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: var(--web-radius-card);
		box-shadow: var(--web-shadow-raised);
		padding: 26px 28px;
		display: grid;
		gap: 14px;
	}
	.calc-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 14px;
		padding-bottom: 14px;
		border-bottom: 1px solid var(--web-border);
	}
	.calc-row span {
		font-size: 14px;
		font-weight: 600;
		color: var(--web-muted);
	}
	.calc-row span small {
		display: block;
		font-size: 12px;
		font-weight: 500;
	}
	.calc-row b {
		font-size: 22px;
		font-weight: 800;
		color: var(--cw-ink);
		font-family: var(--cw-font-mono);
		white-space: nowrap;
	}
	.calc-row b small {
		font-size: 12px;
		color: var(--web-muted);
		font-weight: 600;
	}
	.calc-total {
		background: var(--web-accent-soft);
		border: 1px solid color-mix(in srgb, var(--web-accent) 30%, transparent);
		border-radius: var(--cw-radius-xl);
		padding: 18px 20px;
		display: grid;
		gap: 4px;
	}
	.calc-total > span:first-child {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--cw-emerald-700, #0a7a4d);
	}
	.calc-total strong {
		font-size: clamp(30px, 4vw, 40px);
		font-weight: 800;
		line-height: 1.05;
		color: var(--cw-emerald-700, #0a7a4d);
		font-family: var(--cw-font-mono);
	}
	.calc-total strong small {
		font-size: 15px;
		font-weight: 700;
	}
	.calc-total__sub {
		font-size: 13px;
		line-height: 1.6;
		color: var(--web-text);
		margin-top: 6px;
	}
	.calc-total.is-negative {
		background: var(--web-bg-soft);
		border-color: var(--web-border-strong);
	}
	.calc-total.is-negative > span:first-child,
	.calc-total.is-negative strong {
		color: var(--cw-ink);
	}
	.calc-total__nope {
		display: inline-block;
		vertical-align: middle;
		margin-left: 12px;
		font-family: var(--cw-font-family);
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--cw-danger-500, #dc2626);
		background: color-mix(in srgb, var(--cw-danger-500, #dc2626) 10%, transparent);
		border: 1px solid color-mix(in srgb, var(--cw-danger-500, #dc2626) 35%, transparent);
		border-radius: 999px;
		padding: 4px 11px;
		white-space: nowrap;
	}
	/* The slow-payback badge is wordier - let it wrap instead of overflowing the card. */
	.calc-total__nope--roi {
		white-space: normal;
		line-height: 1.5;
	}
	.calc-cta {
		justify-content: center;
	}
	.calc-print {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		margin-top: -4px;
		padding: 0.9rem 1.7rem;
		font-family: inherit;
		font-weight: 600;
		font-size: var(--cw-text-base);
		color: var(--web-primary);
		background: transparent;
		border: 1px solid var(--web-border-strong);
		border-radius: var(--cw-radius-pill);
		cursor: pointer;
		transition:
			border-color var(--cw-duration-normal) var(--cw-ease-default),
			background var(--cw-duration-normal) var(--cw-ease-default);
	}
	.calc-print:hover {
		border-color: var(--web-primary);
		background: var(--web-primary-soft);
	}
	.calc-print:active {
		transform: translateY(1px);
	}
	.calc-print .material-symbols-rounded {
		font-size: 20px;
	}
	.calc-fine {
		margin: 0;
		font-size: 12px;
		line-height: 1.65;
		color: var(--web-muted);
	}

	/* ── ROI (payback) line chart ── */
	.roi {
		margin-top: clamp(24px, 4vw, 48px);
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: var(--web-radius-card);
		box-shadow: var(--web-shadow-card);
		padding: 22px 24px;
	}
	.roi__title {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 19px;
		margin: 0 0 10px;
		color: var(--cw-ink);
	}
	.roi__title .material-symbols-rounded {
		font-size: 22px;
		color: var(--web-accent);
	}
	.roi__sub {
		margin: 0 0 12px;
		font-size: 13px;
		line-height: 1.7;
		color: var(--web-muted);
	}
	.roi__legend {
		display: flex;
		flex-wrap: wrap;
		gap: 6px 18px;
		margin-bottom: 6px;
		font-size: 12.5px;
		font-weight: 700;
		color: var(--web-muted);
	}
	.roi__legend span {
		display: inline-flex;
		align-items: center;
		gap: 7px;
	}
	.roi-key {
		display: inline-block;
		width: 16px;
		height: 0;
		border-top: 2px solid;
		border-radius: 2px;
	}
	.roi-key--cw {
		border-color: var(--cw-emerald-500);
	}
	.roi-key--manual {
		border-color: var(--cw-sapphire-500);
	}
	.roi__chart {
		position: relative;
	}
	.roi__chart svg {
		display: block;
	}
	.roi-grid {
		stroke: var(--cw-gray-200);
		stroke-width: 1;
	}
	.roi-tick {
		font-size: 11px;
		fill: var(--web-muted);
	}
	.roi-line {
		fill: none;
		stroke-width: 2;
		stroke-linecap: round;
	}
	.roi-line--cw {
		stroke: var(--cw-emerald-500);
	}
	.roi-line--manual {
		stroke: var(--cw-sapphire-500);
	}
	.roi-cross {
		stroke: var(--cw-gray-300);
		stroke-width: 1;
	}
	.roi-be {
		fill: var(--cw-emerald-500);
		stroke: var(--web-surface);
		stroke-width: 2;
	}
	.roi-be-label {
		font-size: 12px;
		font-weight: 700;
		fill: var(--cw-ink);
	}
	.roi-dot {
		stroke: var(--web-surface);
		stroke-width: 2;
	}
	.roi-dot--cw {
		fill: var(--cw-emerald-500);
	}
	.roi-dot--manual {
		fill: var(--cw-sapphire-500);
	}
	.roi-tip {
		position: absolute;
		transform: translateX(12px);
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: 10px;
		box-shadow: var(--web-shadow-card);
		padding: 10px 12px;
		pointer-events: none;
		white-space: nowrap;
		z-index: 2;
	}
	.roi-tip--flip {
		transform: translateX(calc(-100% - 12px));
	}
	.roi-tip__t {
		display: block;
		font-size: 11.5px;
		color: var(--web-muted);
		margin-bottom: 6px;
	}
	.roi-tip__row {
		display: flex;
		align-items: center;
		gap: 7px;
		font-size: 12.5px;
	}
	.roi-tip__row + .roi-tip__row {
		margin-top: 4px;
	}
	.roi-tip__row b {
		font-family: var(--cw-font-mono);
		font-size: 13px;
		color: var(--cw-ink);
	}
	.roi-tip__row span {
		color: var(--web-muted);
		font-size: 11.5px;
	}
	.roi-tip__diff {
		margin-top: 6px;
		padding-top: 6px;
		border-top: 1px dashed var(--web-border);
		font-size: 12px;
		font-weight: 700;
		color: var(--cw-emerald-600, #0b7f50);
	}
	.roi__note {
		margin: 12px 0 0;
		font-size: 12.5px;
		line-height: 1.8;
		color: var(--web-muted);
	}
	.roi__table {
		margin-top: 10px;
	}
	.roi__table summary {
		font-size: 12.5px;
		font-weight: 700;
		color: var(--web-muted);
		cursor: pointer;
	}
	.roi__tablewrap {
		overflow-x: auto;
	}
	.roi__table table {
		width: 100%;
		min-width: 420px;
		margin-top: 10px;
		border-collapse: collapse;
		font-size: 12.5px;
	}
	.roi__table th,
	.roi__table td {
		padding: 6px 10px;
		border-bottom: 1px solid var(--web-border);
		text-align: right;
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}
	.roi__table thead th {
		color: var(--web-muted);
		font-size: 11.5px;
	}
	.roi__table tbody th {
		text-align: left;
		color: var(--web-muted);
		font-weight: 700;
	}

	/* ── Print (preliminary estimate for customer review) ── */
	.print-head,
	.print-foot,
	.print-inputs {
		display: none;
	}
	@media print {
		/* No site chrome on paper: header, footer, breadcrumb, interactive UI. */
		:global(header.hdr),
		:global(footer.ftr),
		:global(nav.pcrumb) {
			display: none !important;
		}
		.pagehero,
		.calc-tabs,
		.calc__inputs,
		.calc-cta,
		.calc-print {
			display: none !important;
		}
		/* Disable the reveal-on-scroll animation so nothing prints invisible. */
		:global([data-reveal]) {
			opacity: 1 !important;
			transform: none !important;
			transition: none !important;
		}
		/* Results card becomes plain flow content next to the inputs table. */
		.calc {
			display: block;
		}
		.calc__results {
			position: static;
			box-shadow: none;
		}
		/* CropWatch print header */
		.print-head {
			display: flex;
			align-items: center;
			gap: 14px;
			padding-bottom: 14px;
			margin-bottom: 18px;
			border-bottom: 2px solid var(--cw-ink);
		}
		.print-head__logo {
			width: 46px;
			height: auto;
		}
		.print-head__tx b {
			display: block;
			font-size: 18px;
			color: var(--cw-ink);
		}
		.print-head__tx span {
			font-size: 12px;
			color: var(--web-muted);
		}
		.print-head__meta {
			margin-left: auto;
			display: grid;
			gap: 2px;
			justify-items: end;
			font-size: 11.5px;
			color: var(--web-muted);
		}
		/* "Your inputs" report table standing in for the sliders. */
		.print-inputs {
			display: block;
			break-inside: avoid;
			margin-bottom: 16px;
		}
		.print-inputs h2 {
			margin: 0 0 8px;
			font-size: 14px;
			color: var(--cw-ink);
		}
		.print-inputs table {
			width: 100%;
			border-collapse: collapse;
			font-size: 12px;
		}
		.print-inputs th,
		.print-inputs td {
			border: 1px solid var(--web-border);
			padding: 6px 10px;
			text-align: left;
		}
		.print-inputs th {
			width: 24%;
			background: var(--web-bg-soft);
			color: var(--web-muted);
			font-weight: 700;
		}
		.print-inputs td {
			width: 26%;
			color: var(--cw-ink);
			font-weight: 700;
			font-variant-numeric: tabular-nums;
		}
		/* Starred disclaimer footer */
		.print-foot {
			display: flex;
			align-items: flex-start;
			gap: 8px;
			margin-top: 20px;
			padding-top: 12px;
			border-top: 1px solid var(--web-border);
			font-size: 11.5px;
			line-height: 1.8;
			color: var(--web-muted);
		}
		.print-foot__star {
			font-size: 13px;
			line-height: 1.6;
			color: var(--cw-ink);
		}
		/* Keep the small cards on one page; tall cards may split naturally. */
		.calc-total,
		.print-inputs {
			break-inside: avoid;
		}
		/* Print the numbers table as-is, without the toggle UI. */
		.roi__table summary {
			display: none;
		}
		/* Never print transient hover artifacts (tooltip, crosshair, dots) -
		   they freeze into the page if the cursor was on the chart at Ctrl+P. */
		.roi-tip,
		.roi-cross,
		.roi-dot {
			display: none !important;
		}
		/* Safety net: browsers that support it force closed <details> content
		   visible at print time even if the JS open flush didn't land. */
		.roi__table::details-content {
			content-visibility: visible !important;
			height: auto !important;
		}
		/* The SVG was measured at screen width; scale it into the page width
		   (the viewBox keeps the aspect ratio). */
		.roi__chart svg {
			max-width: 100%;
			height: auto;
		}
		/* Tighten spacing so the estimate fits in as few pages as possible. */
		:global(.section) {
			padding-block: 8px;
		}
		.roi {
			margin-top: 14px;
		}
	}

	/* screen-only: at print time the ~A4 paper width (~700px) would trigger
	   this one-column mobile layout and stretch everything vertically. */
	@media screen and (max-width: 900px) {
		.calc {
			grid-template-columns: 1fr;
		}
		.calc__results {
			position: static;
		}
	}
</style>
