<script lang="ts">
	import { C, SANS, MONO, type SensorState } from './anim';
	import Icon from './Icon.svelte';

	let {
		cx,
		cy,
		w = 250,
		h = 116,
		role,
		name,
		temp = '',
		hum = '',
		state = 'ok' as SensorState,
		opacity = 1,
		scale = 1,
		shake = 0
	}: {
		cx: number;
		cy: number;
		w?: number;
		h?: number;
		role: string;
		name: string;
		temp?: string;
		hum?: string;
		state?: SensorState;
		opacity?: number;
		scale?: number;
		shake?: number;
	} = $props();

	let bad = $derived(state === 'err' || state === 'wrong');
	let stateColor = $derived(bad ? C.red : state === 'off' ? C.faint : C.teal);
	let dim = $derived(state === 'off');
</script>

<div
	style="position:absolute; left:{cx - w / 2}px; top:{cy - h / 2}px; width:{w}px; height:{h}px;
		opacity:{opacity}; transform:translateX({shake}px) scale({scale}); transform-origin:center;
		background:linear-gradient(180deg, {C.surface2}, {C.surface});
		border:1.5px solid {state === 'ok' ? C.border : stateColor};
		border-radius:14px; padding:14px 16px; box-sizing:border-box;
		box-shadow:{bad
		? `0 0 0 1px ${C.red}, 0 0 26px ${C.redDim}`
		: '0 10px 26px -12px rgba(11,23,48,0.28)'};"
>
	<div style="display:flex; align-items:center; gap:8px;">
		<Icon name="thermostat" size={20} color={stateColor} />
		<span
			style="font-family:{SANS}; font-weight:700; font-size:15px; color:{C.ink}; letter-spacing:0.02em;"
		>
			{name}
		</span>
		<span
			style="margin-left:auto; font-family:{SANS}; font-weight:600; font-size:10px;
				letter-spacing:0.14em; text-transform:uppercase; color:{C.faint};
				border:1px solid {C.border}; border-radius:20px; padding:2px 8px;"
		>
			{role}
		</span>
	</div>

	<div
		style="margin-top:12px; font-family:{MONO}; font-weight:600; opacity:{dim ? 0.5 : 1};
			font-size:30px; color:{bad ? C.red : C.ink}; letter-spacing:-0.01em;"
	>
		{state === 'off' ? '— — —' : state === 'err' ? 'エラー' : temp}
	</div>

	<div
		style="margin-top:2px; font-family:{MONO}; font-size:14px; color:{state === 'wrong'
			? C.red
			: C.muted};"
	>
		{state === 'off' ? '応答なし' : state === 'err' ? '読み取り失敗' : hum}
	</div>
</div>
