<script lang="ts">
	// 3D teardown of the V25 enclosure: screws out, covers off, sensor board and AA cells out,
	// then reassembly and the three mounting options (magnets, wall, pole strap).
	// three.js and the 3 MB model only load once the stage comes near the viewport.
	import { onMount } from 'svelte';
	import type { Teardown } from './scene';

	let stage: HTMLDivElement;
	let status = $state('Loading 3D model...');
	let playing = $state(false);
	let ready = $state(false);
	let anim: Teardown | undefined;

	onMount(() => {
		let destroyed = false;
		let stopSeen = () => {};

		const start = async () => {
			try {
				const { mountTeardown } = await import('./scene');
				if (destroyed) return;
				const a = await mountTeardown(stage, '/assets/3d/v25-case.glb', {
					onPlayingChange: (p) => (playing = p)
				});
				if (destroyed) return a.destroy();
				anim = a;
				ready = true;
				if (import.meta.env.DEV) Object.assign(window, { v25Teardown: a });
				// Loading starts early (rootMargin above), but playback waits until most of the
				// stage is on screen, and then runs from the very beginning. This deliberately ignores
				// prefers-reduced-motion (like the Christmas snow): the owner's Chrome reports it, and a
				// frozen exploded view read as broken. The pause button covers anyone who wants it still.
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
	<div class="v25__stage" bind:this={stage}>
		{#if !ready}<div class="v25__status">{status}</div>{/if}
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
