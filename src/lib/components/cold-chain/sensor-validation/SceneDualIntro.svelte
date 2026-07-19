<script lang="ts">
	import { C, SANS, MONO, Easing, seg, io } from './anim';
	import Eyebrow from './Eyebrow.svelte';
	import SensorCard from './SensorCard.svelte';

	let { t }: { t: number } = $props();

	let appear = $derived(io(t, 6.9, 7.6, 10.3, 10.8));
	let aIn = $derived(Easing.easeOutBack(seg(t, 7.5, 8.3)));
	let bIn = $derived(Easing.easeOutBack(seg(t, 7.75, 8.55)));
	let specIn = $derived(seg(t, 8.6, 9.3));
</script>

{#if t >= 6.7 && t <= 10.8}
	<div style="position:absolute; inset:0; opacity:{appear};">
		<Eyebrow text="CropWatch の仕組み" x={540} y={150} color={C.teal} />

		<div
			style="position:absolute; left:540px; top:210px; transform:translateX(-50%);
				width:860px; text-align:center; font-family:{SANS}; font-weight:800; font-size:52px;
				color:{C.ink}; letter-spacing:-0.02em; line-height:1.14;"
		>
			だから、2つのセンサーで測定する。
		</div>

		<SensorCard
			cx={395}
			cy={480}
			role="プライマリ"
			name="センサー A"
			temp="10.0 °C"
			hum="55 %RH"
			scale={aIn}
		/>
		<SensorCard
			cx={685}
			cy={480}
			role="リファレンス"
			name="センサー B"
			temp="10.1 °C"
			hum="55 %RH"
			scale={bIn}
		/>

		<div
			style="position:absolute; left:540px; top:620px; transform:translateX(-50%);
				text-align:center; opacity:{specIn}; font-family:{MONO}; font-size:20px;
				color:{C.muted}; letter-spacing:0.02em;"
		>
			SHT43&SHT40
			<br />
			ISO/IEC 17025認定校正機関による校正済み
		</div>
	</div>
{/if}
