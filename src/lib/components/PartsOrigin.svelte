<script lang="ts">
	// Where the CropWatch parts come from, by country of origin, across both
	// boards (main board + sensor board). Distinct part types are counted
	// (34 total); hovering / tapping a donut segment or a legend row highlights
	// the matching pair and shows that country's manufacturers with links to
	// their official sites in the panel above the donut.
	type Maker = { name: string; url: string };
	type Origin = { name: string; flag: string; parts: number; makers: Maker[]; color: string };

	const ORIGINS: Origin[] = [
		{
			name: 'United States',
			flag: '🇺🇸',
			parts: 10,
			color: '#12c3a0',
			makers: [
				{ name: 'Texas Instruments', url: 'https://www.ti.com/' },
				{ name: 'onsemi', url: 'https://www.onsemi.com/' },
				{ name: 'Diodes Incorporated', url: 'https://www.diodes.com/' },
				{ name: 'Alpha & Omega Semiconductor', url: 'https://www.aosmd.com/' },
				{ name: 'C&K Switches', url: 'https://www.ckswitches.com/' },
				{ name: 'QT Brightek', url: 'https://www.qt-brightek.com/' },
				{ name: 'Amphenol', url: 'https://www.amphenol.com/' }
			]
		},
		{
			name: 'Japan',
			flag: '🇯🇵',
			parts: 7,
			color: '#2f9fe6',
			makers: [
				{ name: 'Murata Manufacturing', url: 'https://www.murata.com/' },
				{ name: 'JST', url: 'https://www.jst.com/' }
			]
		},
		{
			name: 'Taiwan',
			flag: '🇹🇼',
			parts: 7,
			color: '#f4b63c',
			makers: [
				{ name: 'YAGEO', url: 'https://www.yageo.com/' },
				{ name: 'Walsin Technology', url: 'https://www.passivecomponent.com/' }
			]
		},
		{
			name: 'Switzerland',
			flag: '🇨🇭',
			parts: 5,
			color: '#33c56a',
			makers: [
				{ name: 'Sensirion', url: 'https://sensirion.com/' },
				{ name: 'STMicroelectronics', url: 'https://www.st.com/' },
				{ name: 'Micro Crystal', url: 'https://www.microcrystal.com/' }
			]
		},
		{
			name: 'Ireland',
			flag: '🇮🇪',
			parts: 2,
			color: '#a35be6',
			makers: [{ name: 'TE Connectivity', url: 'https://www.te.com/' }]
		},
		{
			name: 'Austria',
			flag: '🇦🇹',
			parts: 1,
			color: '#f0883c',
			makers: [{ name: 'ams OSRAM', url: 'https://ams-osram.com/' }]
		},
		{
			name: 'South Korea',
			flag: '🇰🇷',
			parts: 1,
			color: '#f56b6b',
			makers: [{ name: 'Samsung Electro-Mechanics', url: 'https://www.samsungsem.com/' }]
		},
		{
			name: 'Germany',
			flag: '🇩🇪',
			parts: 1,
			color: '#9aa4b2',
			makers: [{ name: 'Infineon', url: 'https://www.infineon.com/' }]
		}
	];

	const TOTAL_PARTS = ORIGINS.reduce((s, o) => s + o.parts, 0); // 34
	const COUNTRIES = ORIGINS.length; // 8
	const MANUFACTURERS = ORIGINS.reduce((s, o) => s + o.makers.length, 0); // 18
	const PLACEMENTS = 71; // total component placements (main board 60 + sensor board 11)

	// donut segments (pathLength = 100 via r ≈ 15.915). GAP leaves a hair of
	// space between segments.
	const GAP = 1.1;
	let acc = 0;
	const SEGMENTS = ORIGINS.map((o, i) => {
		const pct = (o.parts / TOTAL_PARTS) * 100;
		const seg = { ...o, i, pct, offset: acc };
		acc += pct;
		return seg;
	});

	let active = $state<number | null>(null);
	const set = (i: number | null) => (active = i);
</script>

<div
	class="po"
	role="group"
	aria-label="Parts by country of origin"
	onpointerleave={(e) => e.pointerType === 'mouse' && set(null)}
	onfocusout={(e) => {
		const t = e.relatedTarget;
		if (!(t instanceof Node) || !e.currentTarget.contains(t)) set(null);
	}}
>
	<div class="po__stats">
		<div class="po__stat"><b>{TOTAL_PARTS}</b><span>Part types</span></div>
		<div class="po__stat"><b>{COUNTRIES}</b><span>Countries</span></div>
		<div class="po__stat"><b>{MANUFACTURERS}</b><span>Manufacturers</span></div>
		<div class="po__stat"><b>{PLACEMENTS}</b><span>Total placements</span></div>
	</div>

	<div class="po__main">
		<div
			class="po__panel"
			aria-live="polite"
			style={active !== null ? `--c:${SEGMENTS[active].color}` : ''}
		>
			{#if active !== null}
				{@const a = SEGMENTS[active]}
				<p class="po__panel-title">
					<span class="po__flag">{a.flag}</span>{a.name} manufacturers ({a.makers.length})
				</p>
				<ul class="po__makers">
					{#each a.makers as m (m.name)}
						<li>
							<a href={m.url} target="_blank" rel="noopener noreferrer">
								{m.name}<span class="po__ext" aria-hidden="true">↗</span>
							</a>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="po__panel-hint">
					Hover over (or tap) a country to see its manufacturers, with links to their official
					sites.
				</p>
			{/if}
		</div>

		<div class="po__chart">
			<svg viewBox="0 0 42 42" role="img" aria-label="Parts composition by country of origin">
				<circle class="po__track" cx="21" cy="21" r="15.915" />
				<g transform="rotate(-90 21 21)">
					{#each SEGMENTS as s (s.name)}
						<circle
							class="po__seg"
							class:is-on={active === s.i}
							class:is-dim={active !== null && active !== s.i}
							cx="21"
							cy="21"
							r="15.915"
							stroke={s.color}
							stroke-dasharray="{Math.max(s.pct - GAP, 0.6)} {100 - Math.max(s.pct - GAP, 0.6)}"
							stroke-dashoffset={-s.offset}
							role="button"
							tabindex="0"
							aria-label="{s.name}: {s.parts} parts ({Math.round(s.pct)}%)"
							onpointerenter={() => set(s.i)}
							onfocus={() => set(s.i)}
							onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && set(s.i)}
						/>
					{/each}
				</g>
			</svg>
			<div class="po__center"><b>{TOTAL_PARTS}</b><span>PARTS</span></div>
		</div>

		<div class="po__legend">
			{#each SEGMENTS as s (s.name)}
				<button
					type="button"
					class="po__row"
					class:is-active={active === s.i}
					class:is-dim={active !== null && active !== s.i}
					style="--c:{s.color}"
					onpointerenter={() => set(s.i)}
					onclick={() => set(s.i)}
					onfocus={() => set(s.i)}
				>
					<span class="po__head">
						<span class="po__dot"></span>
						<span class="po__flag">{s.flag}</span>
						<span class="po__name">{s.name}</span>
						<span class="po__meta"
							><b>{s.parts}</b> · {Math.round(s.pct)}% · {s.makers.length} mfr{s.makers.length > 1
								? 's'
								: ''}</span
						>
					</span>
					<span class="po__bar"><i style="width:{s.pct}%"></i></span>
				</button>
			{/each}
		</div>
	</div>
	<div>
		<p>
			<sup>*</sup><small
				>Countries not shown here have no parts on our boards (main board or sensor board).</small
			>
		</p>
	</div>
</div>

<style>
	.po {
		background: #fff;
		border: 1px solid var(--web-border);
		border-radius: 24px;
		padding: 26px clamp(18px, 3vw, 34px) 30px;
		box-shadow: var(--web-shadow-card);
	}

	/* ── Stat cards ── */
	.po__stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 12px;
		margin-bottom: 26px;
	}
	.po__stat {
		background: var(--web-bg-soft);
		border: 1px solid var(--web-border);
		border-radius: 14px;
		padding: 16px 18px;
	}
	.po__stat b {
		display: block;
		font-size: clamp(24px, 3vw, 30px);
		font-weight: 800;
		color: var(--web-heading);
		line-height: 1.1;
	}
	.po__stat span {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: var(--web-muted);
	}

	/* ── Panel + chart + legend ── */
	.po__main {
		display: grid;
		grid-template-columns: minmax(220px, 300px) 1fr;
		grid-template-rows: auto 1fr;
		grid-template-areas:
			'panel legend'
			'chart legend';
		gap: 18px clamp(20px, 4vw, 40px);
	}

	/* ── Manufacturer panel ── */
	.po__panel {
		grid-area: panel;
		min-height: 196px;
		background: var(--web-bg-soft);
		border: 1px solid color-mix(in srgb, var(--c, transparent) 35%, var(--web-border));
		border-radius: 14px;
		padding: 14px 16px;
		transition: border-color 0.18s ease;
	}
	.po__panel-title {
		display: flex;
		align-items: center;
		gap: 7px;
		margin: 0;
		font-size: 13.5px;
		font-weight: 800;
		color: var(--web-heading);
	}
	.po__panel-hint {
		margin: 0;
		font-size: 12.5px;
		line-height: 1.8;
		color: var(--web-muted);
	}
	.po__makers {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 10px 0 0;
		padding: 0;
	}
	.po__makers a {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 12.5px;
		font-weight: 600;
		color: var(--web-heading);
		background: #fff;
		border: 1px solid var(--web-border);
		border-radius: 999px;
		padding: 5px 11px;
		text-decoration: none;
		transition:
			border-color 0.15s ease,
			color 0.15s ease;
	}
	.po__makers a:hover,
	.po__makers a:focus-visible {
		border-color: var(--c, var(--web-heading));
		color: var(--c, var(--web-heading));
	}
	.po__ext {
		font-size: 11px;
		color: var(--web-muted);
	}

	/* ── Chart ── */
	.po__chart {
		grid-area: chart;
		position: relative;
		width: 100%;
		max-width: 260px;
		margin-inline: auto;
		aspect-ratio: 1;
		align-self: start;
	}
	.po__chart svg {
		width: 100%;
		height: 100%;
		display: block;
	}
	.po__track {
		fill: none;
		stroke: var(--web-bg-soft);
		stroke-width: 4.4;
	}
	.po__seg {
		fill: none;
		stroke-width: 4.4;
		cursor: pointer;
		transition:
			stroke-width 0.22s ease,
			opacity 0.22s ease;
	}
	.po__seg:focus {
		outline: none;
	}
	.po__seg.is-on {
		stroke-width: 6;
	}
	.po__seg.is-dim {
		opacity: 0.32;
	}
	.po__center {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}
	.po__center b {
		font-size: clamp(28px, 4.5vw, 38px);
		font-weight: 800;
		color: var(--web-heading);
		line-height: 1;
	}
	.po__center span {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.14em;
		color: var(--web-muted);
		margin-top: 3px;
	}

	/* ── Legend rows ── */
	.po__legend {
		grid-area: legend;
		align-self: center;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.po__row {
		display: block;
		width: 100%;
		text-align: left;
		background: transparent;
		border: 1px solid transparent;
		border-radius: 12px;
		padding: 9px 12px;
		cursor: pointer;
		transition:
			background 0.18s ease,
			opacity 0.18s ease;
		font: inherit;
		color: inherit;
	}
	.po__row.is-active {
		background: color-mix(in srgb, var(--c) 12%, transparent);
		border-color: color-mix(in srgb, var(--c) 30%, transparent);
	}
	.po__row.is-dim {
		opacity: 0.5;
	}
	.po__head {
		display: flex;
		align-items: center;
		gap: 9px;
	}
	.po__dot {
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background: var(--c);
		flex: none;
	}
	.po__flag {
		font-size: 17px;
		line-height: 1;
	}
	.po__name {
		font-size: 15px;
		font-weight: 700;
		color: var(--web-heading);
	}
	.po__meta {
		margin-left: auto;
		font-size: 13px;
		color: var(--web-muted);
		white-space: nowrap;
	}
	.po__meta b {
		color: var(--web-heading);
		font-weight: 800;
	}
	.po__bar {
		display: block;
		height: 6px;
		border-radius: 999px;
		background: var(--web-bg-soft);
		margin-top: 8px;
		overflow: hidden;
	}
	.po__bar i {
		display: block;
		height: 100%;
		border-radius: 999px;
		background: var(--c);
		transition: filter 0.18s ease;
	}
	.po__row.is-active .po__bar i {
		filter: brightness(1.05) saturate(1.1);
	}

	@media (max-width: 720px) {
		.po__stats {
			grid-template-columns: repeat(2, 1fr);
		}
		.po__main {
			grid-template-columns: 1fr;
			grid-template-rows: auto auto auto;
			grid-template-areas:
				'chart'
				'panel'
				'legend';
			gap: 20px;
		}
		.po__panel {
			min-height: 150px;
		}
		.po__chart {
			max-width: 220px;
		}
	}
</style>
