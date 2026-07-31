<script lang="ts">
	import type { Snippet } from 'svelte';
	import { C, SANS, MONO, type GateTone } from './anim';
	import Icon from './Icon.svelte';

	let {
		cx,
		cy,
		w = 380,
		h = 62,
		label,
		sub = '',
		tone = 'neutral' as GateTone,
		opacity = 1,
		scale = 1,
		children
	}: {
		cx: number;
		cy: number;
		w?: number;
		h?: number;
		label: string;
		sub?: string;
		tone?: GateTone;
		opacity?: number;
		scale?: number;
		children?: Snippet;
	} = $props();

	let border = $derived(tone === 'red' ? C.red : tone === 'teal' ? C.teal : C.border);
	let glow = $derived(
		tone === 'red'
			? `0 0 24px ${C.redDim}`
			: tone === 'teal'
				? `0 0 26px ${C.tealDim}`
				: '0 8px 24px -12px rgba(11,23,48,0.26)'
	);
	let bg = $derived(
		tone === 'teal'
			? 'linear-gradient(180deg, rgba(10,125,79,0.13), rgba(10,125,79,0.04))'
			: `linear-gradient(180deg, ${C.surface2}, ${C.surface})`
	);
</script>

<div
	style="position:absolute; left:{cx - w / 2}px; top:{cy - h / 2}px; width:{w}px; min-height:{h}px;
		opacity:{opacity}; transform:scale({scale}); transform-origin:center;
		background:{bg}; border:1.5px solid {border}; border-radius:14px;
		box-shadow:{glow}; box-sizing:border-box;
		display:flex; flex-direction:column; align-items:center; justify-content:center;
		padding:10px 18px;"
>
	<div style="display:flex; align-items:center; gap:10px;">
		<Icon
			name={tone === 'teal' ? 'check_circle' : 'help'}
			size={22}
			color={tone === 'teal' ? C.teal : tone === 'red' ? C.red : C.sky}
		/>
		<span style="font-family:{SANS}; font-weight:700; font-size:19px; color:{C.ink};">{label}</span>
	</div>
	{#if sub}
		<div style="font-family:{MONO}; font-size:13px; color:{C.muted}; margin-top:6px;">{sub}</div>
	{/if}
	{@render children?.()}
</div>
