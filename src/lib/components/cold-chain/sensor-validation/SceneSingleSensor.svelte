<script lang="ts">
	import { C, SANS, Easing, interpolate, seg, io, fmtTemp } from './anim';
	import Eyebrow from './Eyebrow.svelte';
	import SensorCard from './SensorCard.svelte';
	import Icon from './Icon.svelte';

	let { t }: { t: number } = $props();

	const tempRamp = interpolate([1.3, 2.3], [0, 7.2], Easing.easeOutCubic);

	let appear = $derived(io(t, 0.2, 7.0, 6.6, 7.3));
	let cardIn = $derived(Easing.easeOutBack(seg(t, 0.6, 1.5)));
	let tempVal = $derived(tempRamp(t));
	let glitch = $derived(t > 3.6);
	let shakeAmt = $derived(t > 3.6 && t < 4.05 ? Math.sin(t * 90) * 6 * (1 - seg(t, 3.6, 4.05)) : 0);
	let okIn = $derived(io(t, 2.3, 2.7, 3.55, 3.7));
	let badIn = $derived(seg(t, 3.7, 4.0));
	let trueIn = $derived(io(t, 4.0, 4.5, 6.6, 7.1));
</script>

{#if t <= 7.3 && appear > 0}
	<div style="position:absolute; inset:0; opacity:{appear};">
		<Eyebrow text="The problem" x={540} y={110} color={glitch ? C.red : C.amber} />

		<SensorCard
			cx={540}
			cy={350}
			w={380}
			h={124}
			role="Single reading"
			name="Temperature sensor"
			temp={fmtTemp(tempVal)}
			hum="20 %RH"
			state={glitch ? 'wrong' : 'ok'}
			scale={cardIn}
			shake={shakeAmt}
		/>

		<!-- the trustworthy-looking OK badge -->
		<div
			style="position:absolute; left:540px; top:480px; transform:translateX(-50%); opacity:{okIn};
				display:flex; align-items:center; gap:8px;
				background:{C.tealDim}; border:1.5px solid {C.teal}; border-radius:30px;
				padding:8px 18px;"
		>
			<Icon name="check_circle" size={20} color={C.teal} />
			<span style="font-family:{SANS}; font-weight:700; font-size:16px; color:{C.teal};"
				>Reading: Normal</span
			>
		</div>

		<!-- reveal: it was wrong. Deliberately huge (3x the OK badge): this is the
		     moment the scene exists to land. Sized to stay inside the 1080px canvas. -->
		<div
			style="position:absolute; left:540px; top:466px;
				transform:translateX(-50%) scale({0.8 + 0.2 * Easing.easeOutBack(badIn)}); opacity:{badIn};
				display:flex; align-items:center; gap:16px; white-space:nowrap;
				background:{C.redDim}; border:3px solid {C.red}; border-radius:999px;
				padding:12px 34px;"
		>
			<Icon name="cancel" size={54} color={C.red} />
			<span
				style="font-family:{SANS}; font-weight:800; font-size:48px; color:{C.red}; letter-spacing:-0.01em;"
			>
				Actual conditions: 10.0 °C / 55 %RH
			</span>
		</div>

		<!-- headline -->
		<div
			style="position:absolute; left:540px; top:600px; transform:translateX(-50%);
				width:820px; text-align:center; opacity:{trueIn};"
		>
			<div
				style="font-family:{SANS}; font-weight:800; font-size:44px; color:{C.ink};
					letter-spacing:-0.02em; line-height:1.15;"
			>
				A single sensor reports<br />may report incorrectly with confidence.
			</div>
			<div
				style="font-family:{SANS}; font-weight:500; font-size:21px; color:{C.muted}; margin-top:18px;"
			>
				A reading you can't verify is a reading you can't trust.
			</div>
		</div>
	</div>
{/if}
