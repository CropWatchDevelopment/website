<script lang="ts">
	import { C, SANS, MONO } from './anim';
	import Icon from './Icon.svelte';

	let {
		cx,
		cy,
		opacity = 1,
		reason
	}: { cx: number; cy: number; opacity?: number; reason: string } = $props();
</script>

<div
	style="position:absolute; left:{cx}px; top:{cy - 27}px; opacity:{opacity};
		display:flex; align-items:center; gap:10px;
		background:linear-gradient(180deg, #fdeeee, #fbe0e0);
		border:1.5px solid {C.red}; border-radius:12px; padding:9px 16px;
		box-shadow:0 0 22px {C.redDim};"
>
	<Icon name="error" size={20} color={C.red} />
	<div style="display:flex; flex-direction:column; line-height:1.15;">
		<span
			style="font-family:{SANS}; font-weight:800; font-size:15px; color:#8f1010; letter-spacing:0.06em;"
		>
			エラー
		</span>
		<span style="font-family:{MONO}; font-size:12px; color:#a81616;">{reason}</span>
	</div>
</div>
