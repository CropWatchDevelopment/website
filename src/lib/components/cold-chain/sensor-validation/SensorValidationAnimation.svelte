<script lang="ts">
	import { onMount } from 'svelte';
	import { CANVAS, SPEED, END_TIME } from './anim';
	import SceneSingleSensor from './SceneSingleSensor.svelte';
	import SceneDualIntro from './SceneDualIntro.svelte';
	import SceneFlow from './SceneFlow.svelte';
	import ScenePayoff from './ScenePayoff.svelte';

	let host = $state<HTMLDivElement | null>(null);
	let hostW = $state(0);
	let time = $state(0);
	let paused = $state(false);
	let ended = $state(false);
	let onScreen = $state(false);

	/* The canvas is authored on a fixed 1080px grid, so it scales as a unit
	   rather than reflowing. */
	let scale = $derived(hostW / CANVAS);
	let t = $derived(time * SPEED);
	let running = $derived(onScreen && !paused && !ended && hostW > 0);

	onMount(() => {
		// Pause while off-screen (or while the host is display:none inside a
		// closed dialog, which never intersects). Mounting fresh on each dialog
		// open is what makes it auto-play from the start every time.
		const ob = new IntersectionObserver((entries) => (onScreen = entries[0].isIntersecting), {
			threshold: 0
		});
		if (host) ob.observe(host);
		return () => ob.disconnect();
	});

	// Single play-through: advance to END_TIME and freeze on the payoff frame.
	// Only the play control starts it again (from the beginning).
	$effect(() => {
		if (!running) return;
		let raf = 0;
		let last = 0;
		const step = (ts: number) => {
			if (!last) last = ts;
			const dt = (ts - last) / 1000;
			last = ts;
			time = time + dt;
			if (time * SPEED >= END_TIME) {
				time = END_TIME / SPEED;
				ended = true;
				return;
			}
			raf = requestAnimationFrame(step);
		};
		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	});

	function toggle() {
		if (ended) {
			time = 0;
			ended = false;
			paused = false;
		} else {
			paused = !paused;
		}
	}
</script>

<div class="sv" bind:this={host} bind:clientWidth={hostW}>
	<div class="sv__canvas" style="transform:scale({scale});" aria-hidden="true">
		<div class="sv__backdrop"><div class="sv__grid"></div></div>
		<SceneSingleSensor {t} />
		<SceneDualIntro {t} />
		<SceneFlow {t} />
		<ScenePayoff {t} />
	</div>

	<button
		class="sv__toggle"
		type="button"
		onclick={toggle}
		aria-label={ended ? 'Replay animation' : paused ? 'Play animation' : 'Pause animation'}
	>
		<!-- Literal icon names in separate branches (not a ternary) so
		     scripts/build-fonts.py's scanner finds them for the font subset. -->
		{#if ended}
			<span class="material-symbols-rounded" aria-hidden="true">replay</span>
		{:else if paused}
			<span class="material-symbols-rounded" aria-hidden="true">play_arrow</span>
		{:else}
			<span class="material-symbols-rounded" aria-hidden="true">pause</span>
		{/if}
	</button>
</div>

<style>
	.sv {
		position: relative;
		width: 100%;
		/* Matches the authored canvas grid below (1080×800). */
		aspect-ratio: 1080 / 800;
		overflow: hidden;
		border: 1px solid var(--web-border);
		border-radius: 22px;
		background: var(--web-bg-soft);
	}

	.sv__canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 1080px;
		height: 800px;
		transform-origin: top left;
		/* The scenes are authored on a fixed pixel grid with hand-computed box
		   heights, so they must not inherit the site's editorial line-height —
		   that overflowed every fixed-height card. Scenes that want looser
		   leading set it themselves. */
		line-height: 1.25;
	}

	/* Palette mirrors C in ./anim.ts — a light panel on a light page. */
	.sv__backdrop {
		position: absolute;
		inset: 0;
		background: radial-gradient(120% 80% at 50% 0%, #ffffff 0%, var(--web-bg-tint) 100%);
	}

	.sv__grid {
		position: absolute;
		inset: 0;
		opacity: 0.5;
		background-image:
			linear-gradient(rgba(44, 108, 183, 0.09) 1px, transparent 1px),
			linear-gradient(90deg, rgba(44, 108, 183, 0.09) 1px, transparent 1px);
		background-size: 54px 54px;
		mask-image: radial-gradient(100% 100% at 50% 40%, #000 30%, transparent 78%);
		-webkit-mask-image: radial-gradient(100% 100% at 50% 40%, #000 30%, transparent 78%);
	}

	/* WCAG 2.2.2: the ~45s auto-playing run needs a pause control. Solid accent
	   fill so it reads at a glance against the light panel. */
	.sv__toggle {
		position: absolute;
		right: 14px;
		bottom: 14px;
		display: grid;
		place-items: center;
		width: 46px;
		height: 46px;
		padding: 0;
		border: none;
		border-radius: 9999px;
		background: var(--web-accent);
		color: #ffffff;
		cursor: pointer;
		box-shadow: 0 6px 18px -6px rgba(11, 23, 48, 0.45);
		transition: background 140ms ease;
	}

	.sv__toggle:hover,
	.sv__toggle:focus-visible {
		background: var(--web-accent-hover);
	}

	.sv__toggle .material-symbols-rounded {
		font-size: 26px;
	}
</style>
