<script lang="ts">
	// How a reading travels: V25 sensor -> LoRaWAN gateway -> CropWatch cloud -> customer.
	// Ported from Enclosures/V25_Plastic/marketing/network-diagram (a fixed 1600x700 image)
	// into a responsive row that stacks vertically on phones. US band: 915 MHz.
</script>

<div class="flow">
	<div class="node">
		<div class="art">
			<img
				src="/assets/imagery/v25-device.webp"
				alt="CropWatch V25 sensor enclosure"
				width="800"
				height="498"
				loading="lazy"
			/>
		</div>
		<p class="hop">In the field</p>
		<h3 class="name">CropWatch sensor</h3>
		<p class="desc">Battery powered, sealed, and mounted where you need to measure.</p>
	</div>

	<div class="link" aria-hidden="true">
		<svg viewBox="0 0 200 80" class="link__svg">
			<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3.5">
				<path d="M14 25 a18 18 0 0 1 0 30" />
				<path d="M26 13 a32 32 0 0 1 0 54" opacity="0.75" />
				<path d="M38 1 a46 46 0 0 1 0 78" opacity="0.5" />
				<path d="M64 40 L136 40" stroke-width="3" stroke-dasharray="2 9" />
				<path d="M186 25 a18 18 0 0 0 0 30" />
				<path d="M174 13 a32 32 0 0 0 0 54" opacity="0.75" />
				<path d="M162 1 a46 46 0 0 0 0 78" opacity="0.5" />
			</g>
		</svg>
		<span class="chip"><b>LoRaWAN</b> · 915 MHz</span>
	</div>

	<div class="node">
		<div class="art">
			<!-- generic gateway illustration, no vendor artwork -->
			<svg width="132" height="184" viewBox="0 0 180 250" aria-hidden="true">
				<defs>
					<linearGradient id="lf-gw" x1="0" x2="1"
						><stop offset="0" stop-color="#ffffff" /><stop
							offset="1"
							stop-color="#e3e8f0"
						/></linearGradient
					>
					<linearGradient id="lf-gws" x1="0" x2="1"
						><stop offset="0" stop-color="#cdd5e2" /><stop
							offset="1"
							stop-color="#b6c0d0"
						/></linearGradient
					>
				</defs>
				<ellipse cx="88" cy="236" rx="70" ry="9" fill="#0b1730" opacity="0.12" />
				<rect x="111" y="14" width="11" height="78" rx="5.5" fill="#26303f" />
				<rect x="108" y="86" width="17" height="14" rx="3" fill="#57606e" />
				<path d="M134 98 L152 88 L152 214 L134 226 Z" fill="url(#lf-gws)" />
				<path d="M30 98 L48 88 L152 88 L134 98 Z" fill="#f4f6f9" />
				<rect x="30" y="98" width="104" height="128" rx="10" fill="url(#lf-gw)" stroke="#c9d3e3" />
				<circle cx="50" cy="206" r="4" fill="#10b981" />
				<circle cx="64" cy="206" r="4" fill="#10b981" />
				<circle cx="78" cy="206" r="4" fill="#c9d3e3" />
			</svg>
		</div>
		<p class="hop">On site</p>
		<h3 class="name">LoRaWAN gateway</h3>
		<p class="desc">Picks up every LoRaWAN sensor in range and forwards the readings.</p>
	</div>

	<div class="link" aria-hidden="true">
		<svg viewBox="0 0 200 80" class="link__svg">
			<path d="M20 40 L172 40" stroke="currentColor" stroke-width="3" fill="none" />
			<path d="M168 30 L188 40 L168 50 z" fill="currentColor" />
		</svg>
		<span class="chip"><b>Internet</b> · encrypted</span>
	</div>

	<div class="node">
		<div class="art">
			<svg width="200" height="184" viewBox="0 0 250 230" aria-hidden="true">
				<path
					d="M62 150 a46 46 0 0 1 8 -91 a58 58 0 0 1 108 8 a42 42 0 0 1 14 83 Z"
					class="cloud"
					stroke-width="3"
					stroke-linejoin="round"
				/>
				<g transform="translate(78 92)">
					<rect width="94" height="30" rx="5" fill="#0b1730" /><circle
						cx="14"
						cy="15"
						r="4"
						fill="#34d399"
					/><rect x="58" y="12" width="26" height="6" rx="3" fill="#475569" />
					<rect y="36" width="94" height="30" rx="5" fill="#0b1730" /><circle
						cx="14"
						cy="51"
						r="4"
						fill="#34d399"
					/><rect x="58" y="48" width="26" height="6" rx="3" fill="#475569" />
				</g>
				<text
					x="125"
					y="190"
					text-anchor="middle"
					font-family="JetBrains Mono Variable, monospace"
					font-size="13"
					fill="#4a5d7e">Data Ops</text
				>
			</svg>
		</div>
		<p class="hop">In the cloud</p>
		<h3 class="name">CropWatch servers</h3>
		<p class="desc">Store every reading, watch your thresholds and send alerts.</p>
	</div>

	<div class="link" aria-hidden="true">
		<svg viewBox="0 0 200 80" class="link__svg">
			<path d="M20 40 L172 40" stroke="currentColor" stroke-width="3" fill="none" />
			<path d="M168 30 L188 40 L168 50 z" fill="currentColor" />
		</svg>
		<span class="chip"><b>HTTPS</b> · web &amp; app</span>
	</div>

	<div class="node">
		<div class="art">
			<svg width="240" height="184" viewBox="0 0 300 230" aria-hidden="true">
				<rect x="20" y="40" width="210" height="136" rx="9" fill="#0b1730" />
				<rect x="30" y="50" width="190" height="116" rx="3" fill="#f8fafc" />
				<rect x="30" y="50" width="190" height="16" class="accent" />
				<rect x="40" y="76" width="54" height="34" rx="4" class="soft" /><rect
					x="100"
					y="76"
					width="54"
					height="34"
					rx="4"
					class="soft"
				/><rect x="160" y="76" width="50" height="34" rx="4" class="soft" />
				<g
					text-anchor="middle"
					font-family="Inter Variable, sans-serif"
					font-weight="600"
					font-size="14"
					fill="#0b1730"
				>
					<text x="67" y="98">38.1°</text>
					<text x="127" y="98">61%</text>
					<text x="185" y="98">612</text>
				</g>
				<polyline
					points="40,156 62,146 84,150 106,134 128,140 150,124 172,130 194,118 210,122"
					fill="none"
					class="line"
					stroke-width="2.5"
					stroke-linejoin="round"
				/>
				<path d="M6 176 L244 176 L232 190 L18 190 Z" fill="#57606e" />
				<rect x="214" y="78" width="74" height="136" rx="12" fill="#0b1730" />
				<rect x="220" y="88" width="62" height="116" rx="6" fill="#f8fafc" />
				<rect x="225" y="98" width="52" height="30" rx="5" class="soft line" />
				<circle cx="234" cy="113" r="4" class="accent" /><rect
					x="242"
					y="108"
					width="30"
					height="4"
					rx="2"
					class="accent"
				/><rect x="242" y="116" width="22" height="4" rx="2" fill="#94a3b8" />
				<polyline
					points="226,186 238,178 250,182 262,168 276,172"
					fill="none"
					class="line"
					stroke-width="2.2"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
		<p class="hop">Wherever you are</p>
		<h3 class="name">You, the customer</h3>
		<p class="desc">Live readings, history and alerts on the web and on your phone.</p>
	</div>
</div>

<style>
	.flow {
		--art-h: 190px;
		display: grid;
		grid-template-columns:
			1fr minmax(110px, 0.55fr) 1fr minmax(110px, 0.55fr) 1fr minmax(110px, 0.55fr)
			1fr;
		align-items: start;
		margin-top: 40px;
	}
	.node {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		min-width: 0;
	}
	.art {
		height: var(--art-h);
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.art img {
		width: 100%;
		max-width: 260px;
		height: auto;
	}
	.art svg {
		max-width: 100%;
		height: auto;
	}
	.cloud {
		fill: var(--web-accent-soft);
		stroke: var(--web-accent);
	}
	.accent {
		fill: var(--web-accent);
	}
	.soft {
		fill: var(--web-accent-soft);
	}
	.line {
		stroke: var(--web-accent);
	}
	.hop {
		margin: 18px 0 0;
		font: 500 12px var(--cw-font-mono);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--web-accent-hover);
	}
	.name {
		margin: 4px 0 0;
		font-size: 20px;
		line-height: 1.2;
		color: var(--web-heading);
	}
	.desc {
		margin: 8px 0 0;
		max-width: 260px;
		font-size: 14.5px;
		line-height: 1.5;
		color: var(--web-muted);
	}
	.link {
		height: var(--art-h);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		color: var(--web-accent);
		/* the chip sits under the line, so nudge the pair down to centre the line on the art */
		padding-top: 44px;
	}
	.link__svg {
		width: 100%;
		max-width: 170px;
		height: auto;
	}
	.chip {
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: var(--web-radius-pill);
		padding: 6px 13px;
		font: 12px var(--cw-font-mono);
		white-space: nowrap;
		color: var(--web-text);
	}
	.chip b {
		font-weight: 500;
		color: var(--web-accent-hover);
	}

	@media (max-width: 1000px) {
		.flow {
			grid-template-columns: 1fr;
			max-width: 420px;
			margin-inline: auto;
		}
		.link {
			height: auto;
			padding: 18px 0;
			flex-direction: row;
			gap: 14px;
		}
		.link__svg {
			width: 72px;
			margin-block: 22px; /* rotated box is taller than its layout box */
			transform: rotate(90deg);
		}
		.art {
			--art-h: 170px;
		}
	}
</style>
