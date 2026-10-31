<script lang="ts">
	// 3D service walkthrough of the V25 (REV B.2): captive screws out, sensor cover off, QWIIC
	// cable unplugged, sensor out, main cover off, AA cells swapped (one LED flash), covers back
	// on, then the magnet mount in a walk-in cooler and the pole bracket.
	// three.js and the model only load once the stage comes near the viewport.
	import { onMount } from 'svelte';
	import type { Teardown } from './scene';
	import { STEPS, CHAPTERS, DURATION } from './timeline';

	let stage: HTMLDivElement;
	let fill: HTMLDivElement;
	let status = $state('Loading 3D model...');
	let playing = $state(false);
	let ready = $state(false);
	let step = $state(0);
	let chapter = $derived(CHAPTERS.findLastIndex((c) => c.t <= STEPS[step].t));
	let anim: Teardown | undefined;

	const spans = CHAPTERS.map((c, i) => ((CHAPTERS[i + 1]?.t ?? DURATION) - c.t) / DURATION);

	onMount(() => {
		let destroyed = false;
		let stopSeen = () => {};

		const start = async () => {
			try {
				const { mountTeardown } = await import('./scene');
				if (destroyed) return;
				const a = await mountTeardown(stage, '/assets/3d/v25-revB2.glb', {
					onPlayingChange: (p) => (playing = p),
					onStep: (i) => (step = i),
					onProgress: (f) => (fill.style.transform = `scaleX(${f})`)
				});
				if (destroyed) return a.destroy();
				anim = a;
				ready = true;
				if (import.meta.env.DEV) Object.assign(window, { v25Teardown: a });
				// Loading starts early (rootMargin above), but playback waits until most of the
				// stage is on screen, and then runs from the very beginning. This deliberately ignores
				// prefers-reduced-motion (like the Christmas snow): the owner's Chrome reports it, and a
				// frozen first frame read as broken. The pause button covers anyone who wants it still.
				const seen = new IntersectionObserver(
					([e]) => {
						// 60% of the stage, or (in a viewport shorter than that) most of the viewport
						const vh = e.rootBounds?.height ?? innerHeight;
						if (e.intersectionRatio < 0.6 && e.intersectionRect.height < vh * 0.8) return;
						seen.disconnect();
						a.restart();
					},
					{ threshold: Array.from({ length: 13 }, (_, i) => i / 20) } // 0, 0.05 ... 0.6
				);
				seen.observe(stage);
				stopSeen = () => seen.disconnect();
			} catch (err) {
				status = 'The 3D model did not load: ' + (err as Error).message;
			}
		};

		const near = new IntersectionObserver(
			([e]) => {
				if (!e.isIntersecting) return;
				near.disconnect();
				start();
			},
			{ rootMargin: '400px 0px' }
		);
		near.observe(stage);

		return () => {
			destroyed = true;
			near.disconnect();
			stopSeen();
			anim?.destroy();
		};
	});
</script>

<div class="v25">
	<div
		class="v25__stage"
		bind:this={stage}
		role="img"
		aria-label="3D animation: servicing the V25 sensor and mounting it on a walk-in cooler wall and on a pole"
	>
		{#if !ready}<div class="v25__status">{status}</div>{/if}
		{#if ready}
			<div class="v25__caption">
				<span class="v25__step">{STEPS[step].title}</span>
				{#if STEPS[step].note}<span class="v25__note">{STEPS[step].note}</span>{/if}
			</div>
		{/if}
	</div>
	<div class="v25__chapters" aria-label="Chapters">
		{#each CHAPTERS as c, i (c.t)}
			<button
				type="button"
				class="v25__chapter"
				class:is-on={i === chapter}
				style="flex: {spans[i]}"
				disabled={!ready}
				onclick={() => {
					anim?.seek(c.t);
					anim?.setPlaying(true);
				}}>{c.label}</button
			>
		{/each}
		<div class="v25__track" aria-hidden="true"><div class="v25__fill" bind:this={fill}></div></div>
	</div>
	<div class="v25__controls">
		<button
			class="v25__btn"
			type="button"
			aria-label={playing ? 'Pause' : 'Play'}
			disabled={!ready}
			onclick={() => anim?.setPlaying(!playing)}
		>
			<svg viewBox="0 0 16 16" aria-hidden="true">
				{#if playing}<path d="M3 2h4v12H3zM9 2h4v12H9z" />{:else}<path d="M4 2l10 6-10 6z" />{/if}
			</svg>
		</button>
		<button
			class="v25__btn"
			type="button"
			aria-label="Restart"
			disabled={!ready}
			onclick={() => anim?.restart()}
		>
			<svg viewBox="0 0 16 16" aria-hidden="true"
				><path d="M8 2a6 6 0 1 1-5.66 4H4.5A4 4 0 1 0 8 4v2.5L4.5 3.25 8 0z" /></svg
			>
		</button>
		<span class="v25__hint">Drag to look around</span>
	</div>
</div>

<style>
	.v25 {
		display: grid;
		gap: 14px;
	}
	.v25__stage {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 10;
		min-height: 300px;
		border: 1px solid var(--web-border);
		border-radius: var(--web-radius-card);
		background: linear-gradient(180deg, #fff, var(--web-bg-soft));
		box-shadow: var(--web-shadow-card);
		overflow: hidden;
		container-type: inline-size; /* caption text scales with the stage width (cqi) */
	}
	@media (max-width: 560px) {
		.v25__stage {
			aspect-ratio: 4 / 5;
		}
	}
	.v25__stage :global(canvas) {
		display: block;
		width: 100%;
		height: 100%;
		touch-action: pan-y;
		cursor: grab;
	}
	.v25__stage :global(canvas:active) {
		cursor: grabbing;
	}
	.v25__stage :global(.v25__fade) {
		position: absolute;
		inset: 0;
		background: #fff;
		opacity: 0;
		pointer-events: none;
	}
	.v25__stage :global(.v25__labels) {
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0;
	}
	/* zero-size anchor on the part: a dot, a leader line up, the name on top */
	.v25__stage :global(.v25__label) {
		position: absolute;
		left: 0;
		top: 0;
		width: 0;
		height: 0;
		will-change: transform;
	}
	.v25__stage :global(.v25__label::before) {
		content: '';
		position: absolute;
		left: -5px;
		top: -5px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--web-primary);
		box-shadow: 0 0 0 2px #fff;
	}
	.v25__stage :global(.v25__label::after) {
		content: '';
		position: absolute;
		left: -0.75px;
		bottom: 5px;
		width: 1.5px;
		height: var(--lift);
		background: var(--web-heading);
	}
	.v25__stage :global(.v25__label span) {
		position: absolute;
		bottom: calc(var(--lift) + 5px);
		left: -12px;
		padding: 5px 10px;
		font: 600 14px/1.2 var(--cw-font-sans, sans-serif);
		color: var(--web-heading);
		white-space: nowrap;
		background: rgb(255 255 255 / 0.96);
		border: 1px solid var(--web-border);
		border-radius: 7px;
		box-shadow: 0 2px 8px rgb(15 23 42 / 0.1);
	}
	.v25__stage :global(.v25__label.is-left span) {
		left: auto;
		right: -12px;
	}
	/* no room above the part (caption or stage edge): the line and name hang below it */
	.v25__stage :global(.v25__label.is-down::after) {
		bottom: auto;
		top: 5px;
	}
	.v25__stage :global(.v25__label.is-down span) {
		bottom: auto;
		top: calc(var(--lift) + 5px);
	}
	.v25__status {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		padding: 16px;
		text-align: center;
		font: 500 13px var(--cw-font-mono);
		color: var(--web-muted);
		pointer-events: none;
	}
	/* step caption: a solid brand badge for the step, a white line for the detail;
	   sits above the white fade so it stays readable between scenes */
	.v25__caption {
		position: absolute;
		z-index: 2;
		left: clamp(12px, 2.2cqi, 24px);
		top: clamp(12px, 2.2cqi, 24px);
		right: clamp(12px, 2.2cqi, 24px);
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
		pointer-events: none;
	}
	.v25__step,
	.v25__note {
		border-radius: 10px;
		box-shadow: 0 4px 16px rgb(15 23 42 / 0.16);
	}
	.v25__step {
		padding: 0.3em 0.7em;
		font-size: clamp(19px, 2.7cqi, 30px);
		font-weight: 800;
		line-height: 1.15;
		color: #fff;
		background: var(--web-primary);
	}
	.v25__note {
		padding: 0.4em 0.8em;
		font-size: clamp(15px, 1.9cqi, 21px);
		font-weight: 600;
		line-height: 1.3;
		color: var(--web-heading);
		background: rgb(255 255 255 / 0.96);
		border: 1px solid var(--web-border);
	}
	.v25__chapters {
		position: relative;
		display: flex;
		gap: 4px;
		padding-bottom: 8px;
	}
	.v25__chapter {
		min-width: 0;
		padding: 6px 4px;
		border: 0;
		border-radius: 6px;
		background: none;
		font-size: 12px;
		color: var(--web-muted);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		cursor: pointer;
	}
	.v25__chapter:hover:not(:disabled),
	.v25__chapter.is-on {
		color: var(--web-primary);
		font-weight: 600;
	}
	.v25__chapter:disabled {
		cursor: default;
	}
	.v25__track {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 3px;
		border-radius: 2px;
		background: var(--web-border);
		overflow: hidden;
	}
	.v25__fill {
		height: 100%;
		background: var(--web-primary);
		transform-origin: 0 50%;
		transform: scaleX(0);
	}
	@media (max-width: 560px) {
		.v25__chapter {
			font-size: 10px;
			padding: 6px 1px;
		}
		.v25__stage :global(.v25__label span) {
			font-size: 12px;
			padding: 3px 7px;
		}
	}
	.v25__controls {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	.v25__btn {
		flex: none;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1px solid var(--web-border);
		background: var(--web-surface);
		color: var(--web-heading);
		display: grid;
		place-items: center;
		cursor: pointer;
	}
	.v25__btn:hover:not(:disabled) {
		border-color: var(--web-primary);
		color: var(--web-primary);
	}
	.v25__btn:disabled {
		opacity: 0.5;
		cursor: default;
	}
	.v25__btn svg {
		width: 16px;
		height: 16px;
		fill: currentColor;
	}
	.v25__hint {
		margin-left: auto;
		font-size: 13px;
		color: var(--web-muted);
	}
</style>
