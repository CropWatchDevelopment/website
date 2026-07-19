<script lang="ts">
	import { C } from './anim';

	let {
		x,
		y,
		len,
		grow = 1,
		vertical = true,
		color = C.teal as string,
		thick = 4,
		opacity = 1
	}: {
		x: number;
		y: number;
		len: number;
		grow?: number;
		vertical?: boolean;
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
		transform-origin:{vertical ? 'top' : 'left'};
		box-shadow:{color === C.teal ? `0 0 12px ${C.tealDim}` : 'none'};"
></div>
