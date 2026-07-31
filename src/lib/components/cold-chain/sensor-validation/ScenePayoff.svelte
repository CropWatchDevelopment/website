<script lang="ts">
	import { C, SANS, MONO, Easing, seg, io, FLOW_SHIFT } from './anim';
	import Eyebrow from './Eyebrow.svelte';
	import Icon from './Icon.svelte';
	import TreeLogo from './TreeLogo.svelte';

	let { t }: { t: number } = $props();

	// SceneFlow's demo holds push everything after it back by FLOW_SHIFT; work
	// in shifted time so the authored timings below stay as written.
	let p = $derived(t - FLOW_SHIFT);

	let appear = $derived(seg(p, 29.0, 29.7));
	let valIn = $derived(Easing.easeOutBack(seg(p, 29.3, 30.2)));
	let headIn = $derived(io(p, 30.1, 30.8, 34.9, 35.1));
	let brandIn = $derived(seg(p, 31.2, 31.9));
	let eyebrowIn = $derived(seg(p, 29.4, 30.0));
</script>

{#if p >= 28.7}
	<div style="position:absolute; inset:0; opacity:{appear};">
		<Eyebrow text="The result" x={540} y={135} color={C.teal} opacity={eyebrowIn} />

		<!-- big validated value -->
		<div
			style="position:absolute; left:540px; top:255px; transform:translate(-50%,-50%) scale({valIn});
				display:flex; align-items:center; gap:18px;
				background:linear-gradient(180deg, rgba(10,125,79,0.14), rgba(10,125,79,0.04));
				border:1.5px solid {C.teal}; border-radius:20px; padding:22px 34px;
				box-shadow:0 0 60px {C.tealDim};"
		>
			<Icon name="verified" size={64} color={C.teal} />
			<div>
				<div
					style="font-family:{SANS}; font-weight:700; font-size:14px; letter-spacing:0.16em;
						text-transform:uppercase; color:{C.teal};"
				>
					Validated
				</div>
				<div
					style="font-family:{MONO}; font-weight:700; font-size:48px; color:{C.ink};
						margin-top:4px; white-space:nowrap;"
				>
					10.0 °C / 55 %RH
				</div>
			</div>
		</div>

		<!-- headline -->
		<div
			style="position:absolute; left:540px; top:425px; transform:translateX(-50%);
				width:900px; text-align:center; opacity:{headIn};"
		>
			<div
				style="font-family:{SANS}; font-weight:800; font-size:58px; color:{C.ink};
					letter-spacing:-0.025em; line-height:1.14;"
			>
				Two sensors.<br />One value you can trust.
			</div>
			<div
				style="font-family:{SANS}; font-weight:500; font-size:24px; color:{C.muted};
					margin-top:26px; line-height:1.5;"
			>
				Every reading is cross-checked, and anomalies raise an alert.<br
				/>A wrong value is never silently published.
			</div>
		</div>

		<!-- brand -->
		<div
			style="position:absolute; left:540px; top:690px; transform:translateX(-50%);
				text-align:center; opacity:{brandIn};"
		>
			<div style="display:flex; align-items:center; justify-content:center; gap:14px;">
				<TreeLogo size={58} />
				<div
					style="font-family:{SANS}; font-weight:800; font-style:italic; font-size:40px;
						color:{C.ink}; letter-spacing:-0.01em;"
				>
					CropWatch<span style="font-size:20px; vertical-align:super;">®</span>
				</div>
			</div>
			<div
				style="font-family:{SANS}; font-weight:500; font-size:18px; color:{C.muted};
					margin-top:8px; letter-spacing:0.02em;"
			>
				High-quality environmental monitoring devices
			</div>
		</div>
	</div>
{/if}
