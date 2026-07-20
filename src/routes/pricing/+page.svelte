<script lang="ts">
	import { onMount } from 'svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	/* ══════════════════════════════════════════════════════════════════
	   Pricing knobs - edit these to tune the calculator, per sector.
	   pricePerDevice / baseFee are USD per month; minutesPerCheck is how
	   long one manual check of one unit takes. comingSoon: true hides the
	   calculator for that tab and shows a "coming soon" card instead.
	   ══════════════════════════════════════════════════════════════════ */
	type Sector = {
		label: string;
		icon: string;
		pricePerDevice: number;
		baseFee: number;
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
			minutesPerCheck: 3,
			unitsHint: 'Coolers, freezers and display cases.'
		},
		livestock: {
			label: 'Livestock',
			icon: 'pets',
			pricePerDevice: 12,
			baseFee: 50,
			minutesPerCheck: 5,
			unitsHint: 'Poultry houses, barn zones and dairy rooms.'
		},
		agriculture: {
			label: 'Agriculture',
			icon: 'eco',
			pricePerDevice: 0,
			baseFee: 0,
			minutesPerCheck: 0,
			unitsHint: '',
			comingSoon: true
		}
	};
	/** Default hourly wage: the average US state minimum wage (federal floor is $7.25). */
	const DEFAULT_HOURLY_WAGE = 11.5;
	/* ══════════════════════════════════════════════════════════════════ */

	const SECTOR_IDS = Object.keys(SECTORS);
	let sector = $state('cold-chain');
	const cfg = $derived(SECTORS[sector]);

	// Honor ?sector= deep links (e.g. /pricing?sector=livestock).
	onMount(() => {
		const requested = new URL(window.location.href).searchParams.get('sector');
		if (requested && SECTORS[requested]) sector = requested;
	});

	let units = $state(10);
	let checksPerDay = $state(2);
	let wage = $state(DEFAULT_HOURLY_WAGE);

	const safeWage = $derived(Number.isFinite(wage) && wage > 0 ? wage : 0);

	// Manual clipboard logging: every unit, every check, every day of the year.
	const manualHoursPerYear = $derived((units * checksPerDay * cfg.minutesPerCheck * 365) / 60);
	const manualCostPerYear = $derived(manualHoursPerYear * safeWage);

	// CropWatch: base fee + per-device fee, billed monthly.
	const cropwatchPerMonth = $derived(cfg.baseFee + units * cfg.pricePerDevice);
	const cropwatchPerYear = $derived(cropwatchPerMonth * 12);

	const savingsPerYear = $derived(manualCostPerYear - cropwatchPerYear);
	const savingsPerMonth = $derived(savingsPerYear / 12);
	const checksPerYear = $derived(units * checksPerDay * 365);

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

<Breadcrumbs items={[{ label: 'Home', href: '/home' }, { label: 'Pricing' }]} />

<section class="pagehero">
	<div class="wrap" data-reveal>
		<p class="eyebrow"><span class="material-symbols-rounded">payments</span> Pricing</p>
		<h1>Monitoring that costs less than the clipboard.</h1>
		<p class="lead">
			{#if cfg.comingSoon}
				{cfg.label} pricing is on its way. Pick another sector to run the numbers - unlimited
				users, alerts, reports and API are always included.
			{:else}
				Simple {cfg.label.toLowerCase()} pricing: {usd2.format(cfg.baseFee)}/month base + {usd2.format(
					cfg.pricePerDevice
				)}/month per monitored unit - unlimited users, alerts, reports and API included. Slide in
				your own numbers and watch what the manual log walk really costs.
			{/if}
		</p>
	</div>
</section>

<section class="section">
	<div class="wrap">
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
					onclick={() => (sector = id)}
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
	<div class="wrap calc" data-reveal>
		<div class="calc__inputs">
			<div class="calc-field">
				<div class="calc-field__head">
					<label for="units">Monitored units</label>
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
					How often someone currently walks the log route. Health codes typically require at least
					two.
				</p>
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
				Assumes {cfg.minutesPerCheck} minutes per unit per check, 365 days a year. CropWatch records
				automatically every 10 minutes - the numbers below only count the manual walk it replaces.
			</p>
		</div>

		<div class="calc__results">
			<div class="calc-row">
				<span>Manual logging labor <small>({num.format(Math.round(manualHoursPerYear))} hours/yr)</small></span>
				<b>{usd.format(manualCostPerYear)}<small>/yr</small></b>
			</div>
			<div class="calc-row">
				<span>CropWatch <small>({usd2.format(cropwatchPerMonth)}/mo)</small></span>
				<b>{usd.format(cropwatchPerYear)}<small>/yr</small></b>
			</div>
			<div class="calc-total" class:is-negative={savingsPerYear < 0}>
				<span>Your estimated savings</span>
				<strong>{usd.format(savingsPerYear)}<small>/yr</small></strong>
				<span class="calc-total__sub">
					{#if savingsPerYear >= 0}
						{usd.format(savingsPerMonth)} back every month - and {num.format(checksPerYear)} checks
						a year logged without anyone lifting a pen.
					{:else}
						At this size the clipboard is cheaper on paper - but {num.format(checksPerYear)}
						automated checks a year, audit-proof records and 24/7 alerts usually still win.
					{/if}
				</span>
			</div>
			<a href="/contact" class="cta-pill cta-pill--lg calc-cta"
				><span>Get an exact quote</span>
				<span class="material-symbols-rounded">arrow_forward</span></a
			>
			<p class="calc-fine">
				Estimate only - excludes spoilage prevented, energy saved and failed-audit risk, which are
				usually the bigger numbers. We'll walk through those on a demo.
			</p>
		</div>
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
	.calc-cta {
		justify-content: center;
	}
	.calc-fine {
		margin: 0;
		font-size: 12px;
		line-height: 1.65;
		color: var(--web-muted);
	}

	@media (max-width: 900px) {
		.calc {
			grid-template-columns: 1fr;
		}
		.calc__results {
			position: static;
		}
	}
</style>
