<script lang="ts">
	import { C, SANS } from './anim';

	let {
		text,
		x,
		y,
		color = C.teal as string,
		opacity = 1
	}: { text: string; x: number; y: number; color?: string; opacity?: number } = $props();
</script>

<div
	style="position:absolute; left:{x}px; top:{y}px; opacity:{opacity};
		transform:translateX(-50%); font-family:{SANS}; font-weight:600; font-size:20px;
		letter-spacing:0.24em; text-transform:uppercase; color:{color};"
>
	{text}
</div>
