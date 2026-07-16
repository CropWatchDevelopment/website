<script lang="ts">
import Seo from '$lib/components/Seo.svelte';

const title =
	'温度監視・環境モニタリングのCropWatch 日本｜コールドチェーン・スマート農業・スマート畜産';
const description =
	'コールドチェーンの温度監視、スマート農業、スマート畜産・養鶏IoT。冷蔵庫・冷凍庫から鶏舎・ハウスまで、同じセンサーと同じ画面で見える化する、置くだけのワイヤレス温度・環境監視システム。';

type Panel = {
	href: string;
	img: string;
	icon: string;
	eyebrow: string;
	title: string;
	desc: string;
};

// Left-to-right: 冷蔵冷凍 → 畜産 → 農業。
const PANELS: Panel[] = [
	{
		href: '/cold-chain',
		img: '/assets/photos/coldchain-freezer.webp',
		icon: 'ac_unit',
		eyebrow: '冷蔵・冷凍',
		title: 'コールドチェーン',
		desc: '飲食・ホテル・工場・倉庫の冷蔵庫・冷凍庫の温度を24時間自動で見守る、HACCP対応のコールドチェーン温度監視。'
	},
	{
		href: '/livestock',
		img: '/assets/photos/sector-livestock.webp',
		icon: 'pets',
		eyebrow: '畜産・養鶏',
		title: 'スマート畜産・養鶏',
		desc: '鶏舎・畜舎・酪農の温度・湿度・CO₂を見守る養鶏IoT・スマート畜産。異常を早めに通知します。'
	},
	{
		href: '/agriculture',
		img: '/assets/photos/agriculture-peppers.webp',
		icon: 'eco',
		eyebrow: '農業・ハウス',
		title: 'スマート農業・ハウス',
		desc: 'ハウス・露地・土壌の環境をまとめて監視するスマート農業・農業IoT。霜・高温・乾燥を早めに察知します。'
	}
];

// ── Accordion widths ────────────────────────────────────────────
// Each cell's width is proportional to its flex-grow "weight" (all
// share flex-basis:0). On hover the panel sweeps OPEN TO THE LEFT:
//  • its RIGHT edge stays put (never grows rightward),
//  • EVERYTHING to its left — the intro AND the sections it passes
//    over — collapses to thin slanted slivers, so the open panel
//    expands far enough to sweep over the intro cell too,
//  • sections to its right keep their place.
// A bigger intro + more compressed panels makes the three sections open
// far more uniformly: the intro's collapse adds the SAME boost to every
// opened panel, while the small panel base keeps the per-position step
// (BASE - SLIVER) tiny — so the rightmost no longer dwarfs the leftmost.
const SLIVER = 6; // collapsed panel sliver weight
const BASE = 14; // resting panel weight (compressed)
const INTRO = 42; // resting intro weight (enlarged)
// The intro is the first cell, so its left edge sits off-screen by
// --slant; it needs a larger collapsed weight than the panels to keep
// a visible sliver on screen.
const INTRO_SLIVER = 10;

type Layout = { intro: number; panels: number[]; sliver: boolean[]; tucked: boolean };

function computeLayout(h: number | null): Layout {
	const panels = [BASE, BASE, BASE];
	const sliver = [false, false, false];
	let intro = INTRO;
	let tucked = false;
	if (h !== null) {
		tucked = true;
		// the intro always collapses so the open panel can sweep over it
		let freed = INTRO - INTRO_SLIVER;
		intro = INTRO_SLIVER;
		for (let i = 0; i < h; i++) {
			panels[i] = SLIVER;
			sliver[i] = true;
			freed += BASE - SLIVER;
		}
		// the open panel absorbs everything freed → its right edge holds
		panels[h] = BASE + freed;
	}
	return { intro, panels, sliver, tucked };
}

let hovered = $state<number | null>(null);
const layout = $derived(computeLayout(hovered));

function clearHover(event: FocusEvent) {
	const next = event.relatedTarget as Node | null;
	if (!next || !event.currentTarget || !(event.currentTarget as HTMLElement).contains(next)) {
		hovered = null;
	}
}

// Touch devices have no hover. When the slanted accordion is showing (i.e. not
// the ≤820px stacked-card layout), the first tap on a panel opens it and a
// second tap on the already-open panel navigates. Mouse/pen behaviour is
// unchanged: hover opens, a click navigates.
const canHover = () =>
	typeof window === 'undefined' || window.matchMedia('(hover: hover)').matches;
const isTouchAccordion = () =>
	typeof window !== 'undefined' &&
	window.matchMedia('(hover: none) and (min-width: 821px)').matches;

function openPanel(i: number) {
	if (canHover()) hovered = i; // touch is handled on tap instead
}
function tapPanel(i: number, event: MouseEvent) {
	if (isTouchAccordion() && hovered !== i) {
		event.preventDefault(); // first tap opens; a second tap navigates
		hovered = i;
	}
}
</script>

<Seo {title} {description} />

<section class="splitter" aria-label="導入先から選ぶ">
	<!-- No pointerleave reset: the last section the pointer opened stays
	     held open after the mouse leaves. Moving onto the intro returns to
	     the overview. -->
	<div class="row" role="group" onfocusout={clearHover}>
		<div
			class="cell cell--intro"
			class:is-tucked={layout.tucked}
			style:flex-grow={layout.intro}
			role="presentation"
			onpointerenter={() => (hovered = null)}
		>
			<!-- slanted label shown when the intro is tucked into a sliver -->
			<span class="intro__spine" aria-hidden="true"><span class="intro__spine-txt">クロップウォッチへようこそ!</span></span>
			<div class="cell__fix intro__in">
				<p class="intro__eyebrow"><span class="material-symbols-rounded">explore</span> クロップウォッチへようこそ!</p>
				<h1 class="intro__title">あなたの現場は、どこですか？</h1>
				<p class="intro__desc">
					つながらない。止まる。記録が残らない。
				</p>
				<p class="intro__desc text-nowrap">
					CropWatchは、そんな現場の課題を前提に設計された産業用環境データ監視システムです。
				</p>
				<p class="intro__desc">
					<a class="extlink" href="https://lora-alliance.org/" target="_blank" rel="noopener noreferrer">LoRaWAN</a>通信と堅牢なハードウェア設計により、厳しい環境でも安定したデータ収集を実現。配線工事は不要で、バッテリーのみで最長10年間の稼働に対応します。
				</p>
				<p>&nbsp;</p>
				<p class="intro__hint">
					<span class="material-symbols-rounded">touch_app</span>
					業種を選んで、現場の見える化をはじめましょう。
				</p>
				<a class="btn btn--primary intro__special" href="/technology">
					CropWatch の強みを見る <span class="material-symbols-rounded">arrow_forward</span>
				</a>
			</div>
		</div>

		{#each PANELS as p, i (p.href)}
			<a
				class="cell cell--panel"
				class:is-open={hovered === i}
				class:is-sliver={layout.sliver[i]}
				style:flex-grow={layout.panels[i]}
				href={p.href}
				aria-label={p.title}
				onpointerenter={() => openPanel(i)}
				onfocusin={() => openPanel(i)}
				onclick={(e) => tapPanel(i, e)}
			>
				<span class="cell__fix panel__img" style="background-image:url('{p.img}')"></span>
				<span class="panel__shade"></span>

				<!-- slanted title shown when the panel is a sliver -->
				<span class="panel__spine"><span class="panel__spine-txt">{p.title}</span></span>

				<!-- full content shown when resting / open -->
				<span class="cell__fix panel__content">
					<span class="panel__inner">
						<span class="panel__eyebrow"><span class="material-symbols-rounded">{p.icon}</span> {p.eyebrow}</span>
						<span class="panel__title">{p.title}</span>
						<span class="panel__reveal">
							<span class="panel__desc">{p.desc}</span>
							<span class="panel__cta">くわしく見る <span class="material-symbols-rounded">arrow_forward</span></span>
						</span>
					</span>
				</span>
			</a>
		{/each}
	</div>
</section>

<style>
	/* ── Slanted 3-panel router / accordion ──────────────────────
	   .splitter fills the flex space left in <main> (viewport minus
	   header + footer). The .row is wider than the viewport so the
	   outer slants run off-screen and clip. Each .cell is sheared
	   (skewX); every upright layer is position:absolute inset:0 and
	   counter-skewed about its own centre, so skew + counter-skew
	   cancel EXACTLY and content stays put while widths animate. */
	.splitter {
		--ang: -10deg;
		--slant: 6rem; /* how far the row overhangs each screen edge */
		flex: 1 1 auto;
		/* Low floor so the band shrinks to fit viewport - header - footer
		   (no page scroll) on short laptops; flex-grow fills taller ones. */
		min-height: 16rem;
		position: relative;
		overflow: hidden;
		display: flex;
		background: var(--cw-ink);
		isolation: isolate;
	}

	.row {
		display: flex;
		align-self: stretch;
		width: calc(100% + 2 * var(--slant));
		margin-left: calc(-1 * var(--slant));
	}

	.cell {
		position: relative;
		overflow: hidden;
		flex-basis: 0;
		min-width: 0;
		transform: skewX(var(--ang));
		/* the smooth open/close sweep (~0.3s) */
		transition: flex-grow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* upright layers: fill the cell, counter-skew about centre */
	.cell__fix {
		position: absolute;
		inset: 0;
		transform: skewX(calc(-1 * var(--ang)));
		transform-origin: 50% 50%;
	}

	/* ── Intro cell (no image, holds the title) ── */
	.cell--intro {
		background: linear-gradient(160deg, #fff 0%, var(--web-bg-tint) 100%);
		color: var(--web-text);
	}
	.intro__in {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		padding: 2.5rem clamp(1.5rem, 3vw, 3rem) 2.5rem calc(var(--slant) + clamp(1rem, 2vw, 2rem));
		transition: opacity 0.25s ease;
	}
	/* When any panel opens, the intro tucks into a sliver: fade the full
	   content out and fade the slanted label in. */
	.cell--intro.is-tucked .intro__in {
		opacity: 0;
		pointer-events: none;
	}
	.intro__spine {
		position: absolute;
		inset: 0;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: clamp(0.75rem, 1.6vw, 1.5rem);
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.2s ease;
	}
	.cell--intro.is-tucked .intro__spine {
		opacity: 1;
		transition: opacity 0.35s ease 0.1s;
	}
	.intro__spine-txt {
		writing-mode: vertical-rl;
		font-size: clamp(0.85rem, 1.1vw, 1rem);
		font-weight: 700;
		letter-spacing: 0.14em;
		color: var(--web-eyebrow);
		white-space: nowrap;
	}
	.intro__eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--web-eyebrow);
		font-weight: 700;
		font-size: 0.85rem;
		letter-spacing: 0.04em;
		margin: 0 0 0.85rem;
		white-space: nowrap;
	}
	.intro__eyebrow .material-symbols-rounded {
		font-size: 1.1rem;
	}
	.intro__title {
		font-size: clamp(1.55rem, 2.7vw, 2.4rem);
		line-height: 1.32;
		font-weight: 800;
		color: var(--web-heading);
		margin: 0 0 1rem;
		letter-spacing: -0.01em;
	}
	.intro__desc {
		font-size: clamp(0.95rem, 1.1vw, 1.05rem);
		line-height: 1.95;
		color: var(--web-muted);
		max-width: 40rem;
	}
	.intro__hint {
		display: flex;
		align-items: flex-start;
		gap: 0.45rem;
		font-size: 0.92rem;
		font-weight: 600;
		line-height: 1.7;
		color: var(--web-primary);
		margin: 0;
		max-width: 30rem;
	}
	.intro__hint .material-symbols-rounded {
		font-size: 1.15rem;
		margin-top: 0.1rem;
		flex: none;
	}
	.intro__special {
		align-self: flex-start;
		margin-top: 1.25rem;
	}

	/* ── Image panels ── */
	.cell--panel {
		text-decoration: none;
		color: #fff;
	}
	.cell--panel:focus-visible {
		outline: 3px solid var(--web-gold);
		outline-offset: -6px;
	}

	.panel__img {
		background-size: cover;
		background-position: center;
		/* scale so the upright photo still covers the slanted corners */
		transform: skewX(calc(-1 * var(--ang))) scale(1.35);
		transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
		z-index: 0;
	}
	.cell--panel.is-open .panel__img {
		transform: skewX(calc(-1 * var(--ang))) scale(1.45);
	}
	.cell--panel.is-sliver .panel__img {
		transform: skewX(calc(-1 * var(--ang))) scale(1.6);
	}

	.panel__shade {
		position: absolute;
		inset: 0;
		z-index: 1;
		background: linear-gradient(
			180deg,
			rgba(11, 23, 48, 0.34) 0%,
			rgba(11, 23, 48, 0.32) 45%,
			rgba(11, 23, 48, 0.74) 100%
		);
		transition: background 0.45s ease;
	}
	.cell--panel.is-open .panel__shade {
		background: linear-gradient(
			180deg,
			rgba(11, 23, 48, 0.5) 0%,
			rgba(11, 23, 48, 0.42) 50%,
			rgba(11, 23, 48, 0.7) 100%
		);
	}
	.cell--panel.is-sliver .panel__shade {
		background: rgba(11, 23, 48, 0.55);
	}

	/* full (resting / open) content: centred in the panel */
	.panel__content {
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem clamp(1rem, 2vw, 2rem);
		text-shadow: 0 2px 18px rgba(0, 0, 0, 0.5);
		opacity: 1;
		transition: opacity 0.3s ease;
	}
	.cell--panel.is-sliver .panel__content {
		opacity: 0;
		pointer-events: none;
	}
	.panel__inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.6rem;
		max-width: 24rem;
	}
	.panel__eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.82rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		color: var(--cw-sapphire-200);
		white-space: nowrap;
	}
	.panel__eyebrow .material-symbols-rounded {
		font-size: 1.15rem;
	}
	.panel__title {
		font-size: clamp(1.25rem, 1.9vw, 1.8rem);
		font-weight: 800;
		line-height: 1.25;
		letter-spacing: 0.01em;
		white-space: nowrap;
	}

	/* hidden until the panel is open, then expands */
	.panel__reveal {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		opacity: 0;
		max-height: 0;
		transform: translateY(0.5rem);
		overflow: hidden;
		transition:
			opacity 0.4s ease 0.05s,
			transform 0.45s cubic-bezier(0.33, 0.1, 0.2, 1) 0.05s,
			max-height 0.5s ease;
	}
	.cell--panel.is-open .panel__reveal {
		opacity: 1;
		max-height: 14rem;
		transform: translateY(0);
	}
	.panel__desc {
		font-size: clamp(0.9rem, 1.05vw, 1rem);
		line-height: 1.85;
		color: rgba(255, 255, 255, 0.94);
		max-width: 22rem;
	}
	.panel__cta {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background: var(--web-accent);
		color: #fff;
		font-weight: 700;
		font-size: 0.9rem;
		padding: 0.6rem 1.2rem;
		border-radius: 9999px;
		box-shadow: 0 10px 22px -12px rgba(14, 153, 96, 0.8);
		white-space: nowrap;
	}
	.panel__cta .material-symbols-rounded {
		font-size: 1.15rem;
	}

	/* ── Sliver spine: slanted title shown when collapsed ──
	   This layer is a direct child of the sheared .cell (NOT counter-
	   skewed), so the vertical title inherits the slant and runs
	   parallel to the panel's edges. */
	.panel__spine {
		position: absolute;
		inset: 0;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s ease;
	}
	.cell--panel.is-sliver .panel__spine {
		opacity: 1;
		transition: opacity 0.35s ease 0.12s;
	}
	.panel__spine-txt {
		writing-mode: vertical-rl;
		font-size: clamp(1rem, 1.3vw, 1.25rem);
		font-weight: 800;
		letter-spacing: 0.12em;
		color: #fff;
		white-space: nowrap;
		text-shadow: 0 2px 16px rgba(0, 0, 0, 0.6);
	}

	/* NOTE: the panel sweep is an intentional, explicitly-requested
	   interaction, so we keep the ~0.3s slide even under reduced-motion
	   (only the height of the revealed text is snapped, not the slide). */
	@media (prefers-reduced-motion: reduce) {
		.panel__reveal {
			transition: opacity 0.2s ease;
		}
	}

	/* Short laptops: trim the intro so the band fits with no page scroll */
	@media (min-width: 821px) and (max-height: 820px) {
		.intro__desc,
		.intro__hint {
			display: none;
		}
		.intro__eyebrow {
			margin-bottom: 0.6rem;
		}
		.intro__title {
			font-size: clamp(1.4rem, 2.3vw, 2rem);
			margin-bottom: 0;
		}
		.intro__special {
			margin-top: 1rem;
		}
		.cell--panel.is-open .panel__reveal {
			max-height: 11rem;
		}
	}

	/* ── Mobile: drop the shear + accordion, stack as cards ── */
	@media (max-width: 820px) {
		.splitter {
			min-height: 0;
			display: block;
			overflow: visible;
			background: var(--web-bg);
		}
		.row {
			flex-direction: column;
			width: 100%;
			margin-left: 0;
		}
		.cell {
			overflow: hidden;
			transform: none;
			flex: none !important;
		}
		.cell__fix {
			position: relative;
			inset: auto;
			transform: none;
		}
		.panel__spine,
		.intro__spine {
			display: none;
		}
		.cell--intro.is-tucked .intro__in {
			opacity: 1;
			pointer-events: auto;
		}
		.intro__in {
			padding: 2.25rem 1.5rem 1.5rem;
		}
		.intro__title,
		.intro__eyebrow,
		.intro__hint,
		.panel__title,
		.panel__eyebrow {
			white-space: normal;
		}
		.cell--panel {
			display: block;
			min-height: 14rem;
		}
		.cell--panel.is-sliver .panel__content {
			opacity: 1;
			pointer-events: auto;
		}
		.panel__img {
			position: absolute;
			inset: 0;
			transform: scale(1.02);
		}
		.cell--panel.is-open .panel__img,
		.cell--panel.is-sliver .panel__img {
			transform: scale(1.06);
		}
		.panel__content {
			min-height: 14rem;
			padding: 1.6rem 1.5rem;
		}
		/* always show the description on touch screens */
		.panel__reveal {
			opacity: 1;
			max-height: 14rem;
			transform: none;
		}
	}
</style>
