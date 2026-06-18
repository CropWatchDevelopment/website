<!--
	Sectors splitter — the site's first landing page.
	A full-viewport "choose your industry" funnel that routes visitors into the
	three product worlds. The shared header renders in its slim, logo-only
	"splash" variant and the footer is suppressed (handled in +layout.svelte) so
	nothing competes with the choice. Ported from the design's sectors.html.
-->
<svelte:head>
	<title>Choose Your Industry — Cold-Chain, Agriculture &amp; Livestock Monitoring | CropWatch</title>
	<meta
		name="description"
		content="Find the right CropWatch monitoring solution for your business. Cold-chain & refrigeration for restaurants, hotels, schools and hospitals; agriculture & greenhouse for farms; and climate monitoring for poultry & livestock."
	/>
	<meta
		name="keywords"
		content="cold chain monitoring, refrigeration monitoring, agriculture monitoring, greenhouse monitoring, poultry monitoring, livestock monitoring, choose industry, temperature monitoring solutions"
	/>
	<meta property="og:title" content="Choose your industry — CropWatch environmental monitoring" />
	<meta
		property="og:description"
		content="Cold-chain, agriculture and livestock monitoring you can defend in any audit. Pick your industry to see how CropWatch fits."
	/>
	<meta property="og:type" content="website" />
	<link rel="canonical" href="https://cropwatch.io/" />
	<link rel="preload" as="image" href="/assets/photos/sector-coldchain.webp" />
	<link rel="preload" as="image" href="/assets/photos/sector-agriculture.webp" />
	<link rel="preload" as="image" href="/assets/photos/sector-livestock.webp" />
</svelte:head>

<div class="split-hero">
	<div class="panels">
		<span class="sh-prompt">Choose your industry</span>

		<!-- COLD CHAIN — full-height left -->
		<a class="panel panel--cold" href="/cold-chain">
			<img
				class="panel__img"
				src="/assets/photos/sector-coldchain.webp"
				alt="CropWatch sensor mounted above a commercial cold room door"
				width="870"
				height="1930"
				fetchpriority="high"
			/>
			<div class="panel__scrim"></div>
			<div class="panel__in">
				<span class="panel__eyebrow"
					><span class="material-symbols-rounded">ac_unit</span> Cold-chain &amp; refrigeration</span
				>
				<h2 class="panel__h">
					<span class="panel__hic material-symbols-rounded">ac_unit</span>Cold-Chain Insights
				</h2>
				<p class="panel__sub">
					Walk-ins, freezers and display cases for restaurants, hotels, schools, hospitals and cold
					storage — with HACCP-ready records an inspector can trust.
				</p>
				<div class="panel__tags">
					<span>Restaurants</span><span>Hospitality</span><span>Hospitals</span><span
						>Cold storage</span
					>
				</div>
				<span class="panel__cta"
					>Explore cold-chain <span class="material-symbols-rounded">arrow_forward</span></span
				>
			</div>
		</a>

		<!-- AGRICULTURE — top right -->
		<a class="panel panel--agri" href="/agriculture">
			<img
				class="panel__img"
				src="/assets/photos/sector-agriculture.webp"
				alt="CropWatch sensor monitoring a commercial pepper greenhouse"
				width="1560"
				height="703"
			/>
			<div class="panel__scrim"></div>
			<div class="panel__in">
				<span class="panel__eyebrow"
					><span class="material-symbols-rounded">eco</span> Agriculture &amp; greenhouse</span
				>
				<h2 class="panel__h">
					<span class="panel__hic material-symbols-rounded">potted_plant</span>Agricultural Monitoring
				</h2>
				<p class="panel__sub">
					Soil, air and canopy climate across greenhouses, fields, orchards and vineyards — spot
					frost, heat and humidity risk early.
				</p>
				<div class="panel__tags">
					<span>Greenhouse</span><span>Open field</span><span>Soil &amp; canopy</span>
				</div>
				<span class="panel__cta"
					>Explore agriculture <span class="material-symbols-rounded">arrow_forward</span></span
				>
			</div>
		</a>

		<!-- LIVESTOCK — bottom right -->
		<a class="panel panel--live" href="/livestock">
			<img
				class="panel__img"
				src="/assets/photos/sector-livestock.webp"
				alt="Interior of a commercial poultry house monitored by CropWatch"
				width="1376"
				height="620"
			/>
			<div class="panel__scrim"></div>
			<div class="panel__in">
				<span class="panel__eyebrow"
					><span class="material-symbols-rounded">pets</span> Poultry &amp; livestock</span
				>
				<h2 class="panel__h">
					<span class="panel__hic material-symbols-rounded">pets</span>Livestock Monitoring
				</h2>
				<p class="panel__sub">
					Per-zone climate for poultry houses, barns and dairy — catch heat stress and ventilation
					faults before they cost you animals.
				</p>
				<div class="panel__tags">
					<span>Poultry</span><span>Barns</span><span>Dairy</span>
				</div>
				<span class="panel__cta"
					>Explore livestock <span class="material-symbols-rounded">arrow_forward</span></span
				>
			</div>
		</a>
	</div>
</div>

<style>
	/* ── Sector splitter — full viewport, no page scroll ──────────────────────
	   .split-hero is a <div> here (not <main>) because the shared layout already
	   provides the <main> landmark. position:fixed makes it cover the viewport;
	   the sticky header (z-index:40) still paints over its top edge. */
	.split-hero {
		position: fixed;
		inset: 0;
		display: flex;
		flex-direction: column;
	}

	/* the three-panel grid: cold-chain spans the full-height left column */
	.panels {
		flex: 1;
		min-height: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		grid-template-areas:
			'cold agri'
			'cold live';
		gap: 0;
	}
	.panel {
		position: relative;
		overflow: hidden;
		display: block;
		isolation: isolate;
	}
	.panel--cold {
		grid-area: cold;
	}
	.panel--agri {
		grid-area: agri;
	}
	.panel--live {
		grid-area: live;
	}

	.panel__img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: -2;
		transform: scale(1.04);
		transition:
			transform 5s var(--cw-ease-default),
			filter var(--cw-duration-slow);
	}
	.panel--cold .panel__img {
		object-position: center 30%;
	}
	/* Direction-aware scrims: dark exactly where the text sits, so white copy
	   stays legible no matter how light or busy the photo behind it is. */
	.panel__scrim {
		position: absolute;
		inset: 0;
		z-index: -1;
		transition: background var(--cw-duration-slow);
		background: linear-gradient(
			180deg,
			rgba(8, 16, 34, 0.14) 0%,
			rgba(8, 16, 34, 0.34) 38%,
			rgba(8, 16, 34, 0.8) 72%,
			rgba(8, 16, 34, 0.93) 100%
		);
	}
	.panel--cold .panel__scrim {
		background: linear-gradient(
			102deg,
			rgba(8, 16, 34, 0.9) 0%,
			rgba(8, 16, 34, 0.74) 26%,
			rgba(8, 16, 34, 0.42) 52%,
			rgba(8, 16, 34, 0.34) 100%
		);
	}

	.panel:hover .panel__img {
		transform: scale(1.1);
	}
	.panel:hover .panel__scrim {
		background: linear-gradient(
			180deg,
			rgba(11, 40, 86, 0.22) 0%,
			rgba(14, 153, 96, 0.16) 34%,
			rgba(8, 16, 34, 0.82) 72%,
			rgba(8, 16, 34, 0.95) 100%
		);
	}
	.panel--cold:hover .panel__scrim {
		background: linear-gradient(
			102deg,
			rgba(8, 16, 34, 0.9) 0%,
			rgba(8, 16, 34, 0.74) 26%,
			rgba(8, 16, 34, 0.42) 52%,
			rgba(8, 16, 34, 0.34) 100%
		);
	}

	/* dividing lines */
	.panels::before,
	.panels::after {
		content: '';
		position: absolute;
		z-index: 10;
		pointer-events: none;
		background: linear-gradient(
			var(--_g, 180deg),
			rgba(255, 255, 255, 0),
			rgba(255, 255, 255, 0.55),
			rgba(255, 255, 255, 0)
		);
	}
	/* vertical line at 50% */
	.panels::before {
		top: 6%;
		bottom: 6%;
		left: 50%;
		width: 2px;
		transform: translateX(-1px);
		--_g: 180deg;
	}
	/* horizontal line across the right half */
	.panels::after {
		left: 50%;
		right: 6%;
		top: 50%;
		height: 2px;
		transform: translateY(-1px);
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0),
			rgba(255, 255, 255, 0.55),
			rgba(255, 255, 255, 0)
		);
	}

	/* panel content */
	.panel__in {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding: clamp(22px, 3.4vw, 56px);
		color: #fff;
		gap: 6px;
	}
	.panel--cold .panel__in {
		justify-content: center;
	}
	.panel__eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #fff;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
	}
	.panel__eyebrow .material-symbols-rounded {
		font-size: 18px;
		color: var(--cw-emerald-300, #6ee7b7);
	}
	.panel__hic {
		font-size: 0.82em;
		line-height: 1;
		vertical-align: -0.12em;
		margin-right: 0.26em;
		color: #fff;
		text-shadow:
			0 2px 4px rgba(0, 0, 0, 0.55),
			0 6px 28px rgba(0, 0, 0, 0.5);
	}
	.panel__h {
		color: #fff;
		font-size: clamp(28px, 3.2vw, 52px);
		line-height: 1.02;
		font-weight: 800;
		letter-spacing: -0.02em;
		margin: 0;
		text-shadow:
			0 2px 4px rgba(0, 0, 0, 0.55),
			0 6px 28px rgba(0, 0, 0, 0.5);
	}
	.panel--cold .panel__h {
		font-size: clamp(34px, 4vw, 62px);
	}
	.panel__sub {
		font-size: clamp(14px, 1.15vw, 18px);
		color: rgba(255, 255, 255, 0.94);
		max-width: 46ch;
		line-height: 1.5;
		margin: 4px 0 0;
		text-shadow:
			0 1px 3px rgba(0, 0, 0, 0.6),
			0 2px 14px rgba(0, 0, 0, 0.55);
	}
	.panel__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 7px;
		margin-top: 4px;
	}
	.panel__tags span {
		font-size: 12px;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.92);
		background: rgba(255, 255, 255, 0.12);
		border: 1px solid rgba(255, 255, 255, 0.2);
		padding: 4px 11px;
		border-radius: 9999px;
		backdrop-filter: blur(4px);
	}
	.panel__cta {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		margin-top: 16px;
		align-self: flex-start;
		font-size: 15px;
		font-weight: 700;
		color: var(--cw-ink);
		background: #fff;
		padding: 12px 22px;
		border-radius: 9999px;
		box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.6);
		transition:
			transform var(--cw-duration-normal),
			box-shadow var(--cw-duration-normal),
			background var(--cw-duration-normal);
	}
	.panel__cta .material-symbols-rounded {
		font-size: 19px;
		transition: transform var(--cw-duration-normal);
	}
	.panel:hover .panel__cta {
		background: var(--web-accent);
		color: #fff;
		transform: translateY(-2px);
		box-shadow: 0 16px 40px -12px rgba(14, 153, 96, 0.7);
	}
	.panel:hover .panel__cta .material-symbols-rounded {
		transform: translateX(4px);
	}

	/* center prompt chip (hidden by default, kept for parity with the design) */
	.sh-prompt {
		position: absolute;
		z-index: 20;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: rgba(8, 16, 34, 0.74);
		border: 1px solid rgba(255, 255, 255, 0.22);
		backdrop-filter: blur(10px);
		color: #fff;
		font-size: 12.5px;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		padding: 9px 18px;
		border-radius: 9999px;
		white-space: nowrap;
		box-shadow: 0 12px 40px -12px rgba(0, 0, 0, 0.7);
		display: none;
	}

	@media (prefers-reduced-motion: no-preference) {
		.panel__in > * {
			opacity: 0;
			transform: translateY(16px);
			animation: shIn 0.7s var(--cw-ease-default) forwards;
		}
		.panel--cold .panel__in > * {
			animation-delay: 0.1s;
		}
		.panel--agri .panel__in > * {
			animation-delay: 0.2s;
		}
		.panel--live .panel__in > * {
			animation-delay: 0.3s;
		}
		.panel__in > *:nth-child(2) {
			animation-delay: 0.06s;
		}
		@keyframes shIn {
			to {
				opacity: 1;
				transform: none;
			}
		}
	}

	/* ── Responsive: stack vertically on mobile ──────────────────────────────
	   The fixed full-viewport layout only makes sense on wide screens; below
	   860px the panels stack and the page scrolls normally. */
	@media (max-width: 860px) {
		.split-hero {
			position: relative;
			inset: auto;
			min-height: 100svh;
		}
		.panels {
			grid-template-columns: 1fr;
			grid-template-rows: none;
			grid-template-areas:
				'cold'
				'agri'
				'live';
		}
		.panels::before,
		.panels::after {
			display: none;
		}
		.panel {
			min-height: 64svh;
		}
		.panel--cold .panel__in {
			justify-content: flex-end;
		}
		.panel + .panel {
			border-top: 2px solid rgba(255, 255, 255, 0.5);
		}
		.panel__sub {
			max-width: none;
		}
	}
	@media (max-width: 480px) {
		.panel {
			min-height: 58svh;
		}
	}
</style>
