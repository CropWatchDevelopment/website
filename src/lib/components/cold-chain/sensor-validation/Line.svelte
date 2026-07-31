<script lang="ts">
	import { C } from './anim';

	let {
		x,
		y,
		len,
		grow = 1,
		vertical = true,
		reverse = false,
		color = C.teal as string,
		thick = 4,
		opacity = 1
	}: {
		x: number;
		y: number;
		len: number;
		grow?: number;
		vertical?: boolean;
		/** Grow from the far end back toward (x, y): bottom-up / right-to-left. */
		reverse?: boolean;
		color?: string;
		thick?: number;
		opacity?: number;
	} = $props();
</script>

<div
	style="position:absolute; left:{x}px; top:{y}px; opacity:{opacity};
		width:{vertical ? thick : len}px; height:{vertical ? len : thick}px;
		background:{color}; border-radius:{thick}px;
		transform:{vertical ? `scaleY(${grow})` : `scaleX(${grow})`};
		transform-origin:{vertical ? (reverse ? 'bottom' : 'top') : reverse ? 'right' : 'left'};
		box-shadow:{color === C.teal ? `0 0 12px ${C.tealDim}` : 'none'};"
></div>
