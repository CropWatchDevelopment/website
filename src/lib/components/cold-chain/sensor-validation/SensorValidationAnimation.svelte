<script lang="ts">
	import { onMount } from 'svelte';
	import { CANVAS, SPEED, DURATION } from './anim';
	import SceneSingleSensor from './SceneSingleSensor.svelte';
	import SceneDualIntro from './SceneDualIntro.svelte';
	import SceneFlow from './SceneFlow.svelte';
	import ScenePayoff from './ScenePayoff.svelte';

	let host = $state<HTMLDivElement | null>(null);
	let hostW = $state(0);
	let time = $state(0);
	let paused = $state(false);
	let onScreen = $state(false);
	let started = $state(false);

	/* The canvas is authored on a fixed 1080px grid, so it scales as a unit
	   rather than reflowing. */
	let scale = $derived(hostW / CANVAS);
	let t = $derived(time * SPEED);
	let running = $derived(onScreen && !paused && hostW > 0);

	/* Poster: shown until the first play. Pausing later leaves it hidden, so the
	   overlay never covers a frame someone deliberately stopped on. */
	let showPoster = $derived(paused && !started);

	function play() {
		started = true;
		paused = false;
	}

	onMount(() => {
		// prefers-reduced-motion: don't autoplay. `time` stays at 0, so the poster
		// sits on frame one and playing starts from the beginning, not partway in.
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		const applyMotionPref = (matches: boolean) => {
			if (matches) paused = true;
		};
		applyMotionPref(mq.matches);
		const onMq = (e: MediaQueryListEvent) => applyMotionPref(e.matches);
		mq.addEventListener('change', onMq);

		// Pause off-screen. This also covers the <760px fallback, where the host
		// is display:none and therefore never intersects.
		const ob = new IntersectionObserver((entries) => (onScreen = entries[0].isIntersecting), {
			threshold: 0
		});
		if (host) ob.observe(host);

		return () => {
			ob.disconnect();
			mq.removeEventListener('change', onMq);
		};
	});

	$effect(() => {
		if (!running) return;
		let raf = 0;
		let last = 0;
		const step = (ts: number) => {
			if (!last) last = ts;
			const dt = (ts - last) / 1000;
			last = ts;
			time = (time + dt) % DURATION;
			raf = requestAnimationFrame(step);
		};
		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	});
</script>

<div class="sv" bind:this={host} bind:clientWidth={hostW}>
	<div class="sv__canvas" style="transform:scale({scale});" aria-hidden="true">
		<div class="sv__backdrop"><div class="sv__grid"></div></div>
		<SceneSingleSensor {t} />
		<SceneDualIntro {t} />
		<SceneFlow {t} />
		<ScenePayoff {t} />
	</div>

	{#if showPoster}
		<button class="sv__poster" type="button" onclick={play} aria-label="アニメーションを再生">
			<span class="sv__poster__btn">
				<span class="material-symbols-rounded" aria-hidden="true">play_arrow</span>
			</span>
			<span class="sv__poster__tx">アニメーションを再生</span>
		</button>
	{:else}
		<button
			class="sv__toggle"
			type="button"
			onclick={() => (paused = !paused)}
			aria-label={paused ? 'アニメーションを再生' : 'アニメーションを一時停止'}
		>
			<span class="material-symbols-rounded" aria-hidden="true"
				>{paused ? 'play_arrow' : 'pause'}</span
			>
		</button>
	{/if}
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
		   heights, so they must not inherit the site's editorial line-height
		   (1.85 from body) — that overflowed every fixed-height card. Scenes
		   that want looser leading set it themselves. */
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

	/* Poster over frame one. Scene 1 fades in from 0.2s, so the canvas underneath
	   is still empty here - the overlay is what the panel reads as until play.
	   Full-panel hit area so the whole thing is the button, not a 40px corner. */
	.sv__poster {
		position: absolute;
		inset: 0;
		display: grid;
		place-content: center;
		justify-items: center;
		gap: 16px;
		padding: 0;
		border: 0;
		background: transparent;
		cursor: pointer;
		z-index: 3;
	}

	.sv__poster__btn {
		display: grid;
		place-items: center;
		width: 96px;
		height: 96px;
		border-radius: 9999px;
		background: var(--web-accent);
		color: #ffffff;
		box-shadow: 0 12px 30px -8px rgba(11, 23, 48, 0.45);
		transition:
			transform 140ms ease,
			box-shadow 140ms ease;
	}

	.sv__poster:hover .sv__poster__btn,
	.sv__poster:focus-visible .sv__poster__btn {
		transform: scale(1.06);
		box-shadow: 0 16px 38px -8px rgba(11, 23, 48, 0.5);
	}

	.sv__poster__btn .material-symbols-rounded {
		font-size: 54px;
		/* optical centring: the glyph's bearing sits left of the circle's centre */
		margin-left: 5px;
	}

	.sv__poster__tx {
		font-weight: 700;
		font-size: 14px;
		letter-spacing: 0.02em;
		color: var(--web-heading);
	}

	/* WCAG 2.2.2: a 45s autoplaying loop needs a pause control. */
	.sv__toggle {
		position: absolute;
		right: 12px;
		bottom: 12px;
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		padding: 0;
		border: 1px solid var(--web-border);
		border-radius: 9999px;
		background: rgba(255, 255, 255, 0.86);
		color: var(--web-muted);
		cursor: pointer;
		opacity: 0.7;
		transition:
			opacity 140ms ease,
			background 140ms ease;
	}

	.sv:hover .sv__toggle,
	.sv__toggle:focus-visible {
		opacity: 1;
		background: #ffffff;
		color: var(--web-heading);
	}

	.sv__toggle .material-symbols-rounded {
		font-size: 22px;
	}

	@media (hover: none) {
		.sv__toggle {
			opacity: 1;
		}
	}
</style>
