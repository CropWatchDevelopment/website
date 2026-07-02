<script lang="ts">
// Where the CropWatch sensor board's parts come from, by country of origin.
// Distinct parts are counted (29 total); hovering a donut segment or a
// legend row highlights the matching pair.
type Origin = { name: string; flag: string; parts: number; mfrs: number; color: string };

const ORIGINS: Origin[] = [
	{ name: 'アメリカ', flag: '🇺🇸', parts: 9, mfrs: 7, color: '#12c3a0' },
	{ name: '日本', flag: '🇯🇵', parts: 7, mfrs: 2, color: '#2f9fe6' },
	{ name: '台湾', flag: '🇹🇼', parts: 7, mfrs: 2, color: '#f4b63c' },
	{ name: 'スイス', flag: '🇨🇭', parts: 2, mfrs: 2, color: '#33c56a' },
	{ name: 'アイルランド', flag: '🇮🇪', parts: 2, mfrs: 1, color: '#a35be6' },
	{ name: '韓国', flag: '🇰🇷', parts: 1, mfrs: 1, color: '#f56b6b' },
	{ name: 'ドイツ', flag: '🇩🇪', parts: 1, mfrs: 1, color: '#9aa4b2' }
];

const TOTAL_PARTS = ORIGINS.reduce((s, o) => s + o.parts, 0); // 29
const COUNTRIES = ORIGINS.length; // 7
const MANUFACTURERS = ORIGINS.reduce((s, o) => s + o.mfrs, 0); // 16
const PLACEMENTS = 60; // total component placements on the board

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

<div class="po" role="group" aria-label="部品の生産国" onpointerleave={() => set(null)}>
	<div class="po__stats">
		<div class="po__stat"><b>{TOTAL_PARTS}</b><span>部品の種類</span></div>
		<div class="po__stat"><b>{COUNTRIES}</b><span>生産国</span></div>
		<div class="po__stat"><b>{MANUFACTURERS}</b><span>メーカー</span></div>
		<div class="po__stat"><b>{PLACEMENTS}</b><span>総実装点数</span></div>
	</div>

	<div class="po__main">
		<div class="po__chart">
			<svg viewBox="0 0 42 42" role="img" aria-label="生産国別の部品構成グラフ">
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
							aria-label="{s.name}：{s.parts}点（{Math.round(s.pct)}％）"
							onpointerenter={() => set(s.i)}
							onfocus={() => set(s.i)}
							onblur={() => set(null)}
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
					onfocus={() => set(s.i)}
					onblur={() => set(null)}
				>
					<span class="po__head">
						<span class="po__dot"></span>
						<span class="po__flag">{s.flag}</span>
						<span class="po__name">{s.name}</span>
						<span class="po__meta"><b>{s.parts}</b> ・ {Math.round(s.pct)}% ・ {s.mfrs}社</span>
					</span>
					<span class="po__bar"><i style="width:{s.pct}%"></i></span>
				</button>
			{/each}
		</div>
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

	/* ── Chart + legend ── */
	.po__main {
		display: grid;
		grid-template-columns: minmax(200px, 260px) 1fr;
		gap: clamp(20px, 4vw, 40px);
		align-items: center;
	}
	.po__chart {
		position: relative;
		width: 100%;
		max-width: 260px;
		margin-inline: auto;
		aspect-ratio: 1;
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
			gap: 20px;
		}
		.po__chart {
			max-width: 220px;
		}
	}
</style>
