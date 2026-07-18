<script lang="ts">
	import { C, SANS, MONO, Easing, interpolate, seg, io, type GateTone } from './anim';
	import Eyebrow from './Eyebrow.svelte';
	import SensorCard from './SensorCard.svelte';
	import Gate from './Gate.svelte';
	import ErrorPill from './ErrorPill.svelte';
	import Line from './Line.svelte';
	import Icon from './Icon.svelte';

	let { t }: { t: number } = $props();

	const F0 = 10.6; // scene 3 base time

	// geometry — everything hangs off a single vertical spine. The connector
	// lines, pulse ramp and gate thresholds all derive from these constants,
	// so vertical rhythm is tuned here alone (canvas is 1080×800).
	const SPINE = 540;
	const xA = SPINE - 145;
	const xB = SPINE + 145;
	const yA = 168;
	const yB = 168;
	const yMerge = 230;
	const g1 = 300;
	const g2 = 400;
	const g3 = 524;
	const res = 656;
	// the result card is ~91px tall centered on `res`; spine segments end at
	// its top edge so the flow reads as one unbroken line into the card.
	const resTop = 45;
	const errX = 792;

	// validation-run pulse
	const RUN_START = 10.4;
	const RUN_END = 15.2;
	const pulseRamp = interpolate([RUN_START, RUN_END], [yA, res], Easing.easeInOutCubic);

	let r = $derived(t - F0);
	let sceneFade = $derived(io(t, F0 - 0.1, F0 + 0.5, 28.7, 29.2));
	let pulseActive = $derived(r >= RUN_START && r <= RUN_END + 0.6);
	let pulseY = $derived(pulseRamp(r));

	const passed = (y: number) => r >= RUN_START && pulseY >= y - 6;

	// gate tones: red while that failure mode is being demoed, teal once the pulse clears it
	let g1tone: GateTone = $derived(passed(g1) ? 'teal' : r > 1.6 && r < 3.1 ? 'red' : 'neutral');
	let g2tone: GateTone = $derived(passed(g2) ? 'teal' : r > 4.2 && r < 5.7 ? 'red' : 'neutral');
	let g3tone: GateTone = $derived(passed(g3) ? 'teal' : r > 6.9 && r < 8.7 ? 'red' : 'neutral');

	// error pills: rise during their demo, settle to a ghost, fade out before the clean run
	const pillOp = (demoA: number, demoB: number) => {
		if (r < demoA) return 0;
		if (r < demoB) return Easing.easeOutCubic(seg(r, demoA, demoA + 0.35));
		if (r < 14.6) return 0.3;
		return 0.3 * (1 - seg(r, 14.6, 15.4));
	};
	let o1 = $derived(pillOp(1.7, 3.1));
	let o2 = $derived(pillOp(4.3, 5.7));
	let o3 = $derived(pillOp(7.0, 8.7));

	// caption (single line, swaps)
	let cap = $derived(
		r > 1.7 && r < 3.2
			? 'いずれかのセンサーが応答しない → エラー'
			: r > 4.3 && r < 5.8
				? 'いずれかのセンサーがエラーを返す → エラー'
				: r > 7.0 && r < 8.8
					? '2つの測定値が一致しない → エラー'
					: r > 10.6 && r < 16
						? '両方が一致すれば、検証済みの値を返す'
						: ''
	);

	// sensor + merge draw
	let sensorsIn = $derived(Easing.easeOutCubic(seg(r, 0, 0.7)));
	let mergeGrow = $derived(seg(r, 0.6, 1.2));
	let y1grow = $derived(seg(r, 3.3, 3.9)); // g1→g2
	let y2grow = $derived(seg(r, 5.9, 6.5)); // g2→g3
	let y3grow = $derived(seg(r, 9.0, 9.6)); // g3→result

	// per-gate failure demos
	let bOff = $derived(r > 1.7 && r < 3.05);
	let aErr = $derived(r > 4.3 && r < 5.7);
	let bDisagree = $derived(r > 6.9 && r < 8.9);

	// cross-validation values inside g3
	let g3vals = $derived.by(() => {
		if (r < 6.9) return null;
		const disagree = r < 8.9;
		return {
			a: '10.0 °C',
			b: disagree ? '12.7 °C' : '10.1 °C',
			delta: disagree ? 'Δ 2.7 °C  ✕  ±0.3 °C 超過' : 'Δ 0.1 °C  ✓  ±0.3 °C 以内',
			ok: !disagree
		};
	});

	// result card
	let rin = $derived(Easing.easeOutCubic(seg(r, 9.4, 10.1)));
	let lit = $derived(passed(res));
	// Exactly two smooth rise-and-fall pulses, then settle. sin² gives positive-only
	// humps that touch baseline with zero slope (no jump); 2 humps over the window.
	let resPulse = $derived.by(() => {
		const pt = Math.max(0, r - RUN_END);
		const dur = 2.4;
		const s = Math.sin(2 * Math.PI * (pt / dur));
		return lit && pt < dur ? 0.032 * s * s : 0;
	});
</script>

{#if t >= F0 - 0.2 && t <= 29.2}
	<div style="position:absolute; inset:0; opacity:{sceneFade};">
		<Eyebrow text="CropWatch の検証プロセス" x={540} y={56} color={C.teal} />

		<!-- sensors -->
		<SensorCard
			cx={xA}
			cy={yA}
			w={250}
			h={112}
			role="プライマリ"
			name="センサー A"
			temp="10.0 °C"
			hum="55 %RH"
			state={aErr ? 'err' : 'ok'}
			scale={sensorsIn}
		/>
		<SensorCard
			cx={xB}
			cy={yB}
			w={250}
			h={112}
			role="リファレンス"
			name="センサー B"
			temp={bDisagree ? '12.7 °C' : '10.1 °C'}
			hum="55 %RH"
			state={bOff ? 'off' : bDisagree ? 'wrong' : 'ok'}
			scale={sensorsIn}
		/>

		<!-- merge lines from cards to spine -->
		<Line
			x={xA}
			y={yMerge - 6}
			len={SPINE - xA + 2}
			grow={mergeGrow}
			vertical={false}
			color={passed(yMerge) ? C.teal : C.faint}
			opacity={0.9}
		/>
		<Line
			x={SPINE}
			y={yMerge - 6}
			len={xB - SPINE + 2}
			grow={mergeGrow}
			vertical={false}
			color={passed(yMerge) ? C.teal : C.faint}
			opacity={0.9}
		/>
		<Line
			x={xA - 2}
			y={yA + 56}
			len={yMerge - (yA + 56)}
			grow={mergeGrow}
			color={passed(yMerge) ? C.teal : C.faint}
			opacity={0.9}
			thick={4}
		/>
		<Line
			x={xB - 2}
			y={yB + 56}
			len={yMerge - (yB + 56)}
			grow={mergeGrow}
			color={passed(yMerge) ? C.teal : C.faint}
			opacity={0.9}
			thick={4}
		/>
		<Line
			x={SPINE - 2}
			y={yMerge - 6}
			len={g1 - 31 - (yMerge - 6)}
			grow={seg(r, 1.0, 1.5)}
			color={passed(g1 - 31) ? C.teal : C.faint}
		/>

		<!-- Gate 1 -->
		<Gate
			cx={SPINE}
			cy={g1}
			label="両方のセンサーが応答したか？"
			tone={g1tone}
			opacity={Easing.easeOutCubic(seg(r, 1.0, 1.6))}
			scale={0.9 + 0.1 * Easing.easeOutBack(seg(r, 1.0, 1.6))}
		/>
		<Line
			x={SPINE + 190}
			y={g1 - 2}
			len={errX - (SPINE + 190)}
			grow={seg(r, 1.7, 2.0)}
			vertical={false}
			color={C.red}
			opacity={o1 > 0 ? Math.min(1, o1 + 0.4) : 0}
		/>
		<ErrorPill cx={errX} cy={g1} opacity={o1} reason="センサー・オフライン" />
		<Line
			x={SPINE - 2}
			y={g1 + 31}
			len={g2 - 31 - (g1 + 31)}
			grow={y1grow}
			color={passed(g2 - 31) ? C.teal : C.faint}
		/>

		<!-- Gate 2 -->
		<Gate
			cx={SPINE}
			cy={g2}
			label="いずれかがエラーか？"
			sub="両方が値を返す必要があります"
			tone={g2tone}
			opacity={Easing.easeOutCubic(seg(r, 3.6, 4.2))}
			scale={0.9 + 0.1 * Easing.easeOutBack(seg(r, 3.6, 4.2))}
		/>
		<Line
			x={SPINE + 190}
			y={g2 - 2}
			len={errX - (SPINE + 190)}
			grow={seg(r, 4.3, 4.6)}
			vertical={false}
			color={C.red}
			opacity={o2 > 0 ? Math.min(1, o2 + 0.4) : 0}
		/>
		<ErrorPill cx={errX} cy={g2} opacity={o2} reason="測定エラー" />
		<Line
			x={SPINE - 2}
			y={g2 + 31}
			len={g3 - 55 - (g2 + 31)}
			grow={y2grow}
			color={passed(g3 - 55) ? C.teal : C.faint}
		/>

		<!-- Gate 3 — cross validation -->
		<Gate
			cx={SPINE}
			cy={g3}
			w={400}
			h={110}
			label="クロス検証：値が一致するか？"
			tone={g3tone}
			opacity={Easing.easeOutCubic(seg(r, 6.3, 6.9))}
			scale={0.9 + 0.1 * Easing.easeOutBack(seg(r, 6.3, 6.9))}
		>
			{#if g3vals}
				<div style="margin-top:8px; text-align:center;">
					<div style="font-family:{MONO}; font-size:15px; color:{C.muted};">
						A <b style="color:{C.ink};">{g3vals.a}</b> &nbsp; · &nbsp; B
						<b style="color:{g3vals.ok ? C.ink : C.red};">{g3vals.b}</b>
					</div>
					<div
						style="font-family:{MONO}; font-size:14px; color:{g3vals.ok ? C.teal : C.red};
							margin-top:3px; font-weight:600;"
					>
						{g3vals.delta}
					</div>
				</div>
			{/if}
		</Gate>
		<Line
			x={SPINE + 200}
			y={g3 - 2}
			len={errX - (SPINE + 200)}
			grow={seg(r, 7.0, 7.3)}
			vertical={false}
			color={C.red}
			opacity={o3 > 0 ? Math.min(1, o3 + 0.4) : 0}
		/>
		<ErrorPill cx={errX} cy={g3} opacity={o3} reason="検証エラー" />
		<Line
			x={SPINE - 2}
			y={g3 + 55}
			len={res - resTop - (g3 + 55)}
			grow={y3grow}
			color={passed(res - resTop) ? C.teal : C.faint}
		/>

		<!-- Result — validated value -->
		{#if rin > 0}
			<div
				style="position:absolute; left:{SPINE}px; top:{res}px;
					transform:translate(-50%,-50%) scale({0.9 + 0.1 * rin + resPulse});
					opacity:{rin}; width:460px;
					background:{lit
					? 'linear-gradient(180deg, rgba(10,125,79,0.15), rgba(10,125,79,0.05))'
					: `linear-gradient(180deg, ${C.surface2}, ${C.surface})`};
					border:1.5px solid {lit ? C.teal : C.border}; border-radius:16px; padding:16px 22px;
					box-shadow:{lit ? `0 0 40px ${C.tealDim}` : '0 12px 30px -14px rgba(11,23,48,0.30)'};
					box-sizing:border-box; display:flex; align-items:center; gap:16px;"
			>
				<Icon name={lit ? 'verified' : 'lock'} size={40} color={lit ? C.teal : C.faint} />
				<div>
					<div
						style="font-family:{SANS}; font-weight:700; font-size:12px; letter-spacing:0.16em;
							text-transform:uppercase; color:{lit ? C.teal : C.faint};"
					>
						{lit ? '検証済みの測定値' : 'プライマリの値を返す'}
					</div>
					<div
						style="font-family:{MONO}; font-weight:700; font-size:30px; color:{C.ink};
							margin-top:4px; white-space:nowrap;"
					>
						10.0 °C / 55 %RH
					</div>
				</div>
			</div>
		{/if}

		<!-- travelling pulse dot -->
		{#if pulseActive && pulseY < res - 40}
			<div
				style="position:absolute; left:{SPINE}px; top:{pulseY}px; transform:translate(-50%,-50%);
					width:20px; height:20px; border-radius:20px; background:{C.teal};
					box-shadow:0 0 20px 6px {C.teal};"
			></div>
		{/if}

		<!-- caption -->
		<div
			style="position:absolute; left:540px; top:726px; transform:translateX(-50%);
				opacity:{cap ? 0.85 : 0}; font-family:{SANS}; font-weight:600; font-size:22px;
				color:{C.ink}; text-align:center;"
		>
			{cap}
		</div>
	</div>
{/if}
