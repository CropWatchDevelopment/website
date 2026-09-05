<script lang="ts">
	import SensorValidationAnimation from './sensor-validation/SensorValidationAnimation.svelte';

	let { interval = 10 }: { interval?: number } = $props();
</script>

<section class="section scroll-pad" id="double-sensor">
	<div class="wrap">
		<div class="section__head double-sensor__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">sensors</span> 測定値の信頼性</p>
			<h2>2つのセンサーで、{interval}分ごとに健全性を確認</h2>
		</div>

		<div class="double-sensor__layout">
			<div class="double-sensor__copy" data-reveal>
				<p>
					<b>SHT43</b>は<b>ISO/IEC 17025:2017認定の個体別3点温度校正（−30℃ / 5℃ / 70℃）</b>を実施しており、<b>年間の温度ドリフトはクラス最高水準の0.01℃未満</b>です。
そのため、<u>SHT43単体で十分に高精度な測定が可能</u>ですが、CropWatchではさらに<b>信頼性を高めるため、もう1台のセンサー(SHT40)を搭載</b>しています。

<u>データ送信のたびに2つのセンサーを用いて健全性チェック（健康診断）を実施し、クリアした場合のみSHT43の測定値を正常データとして送信します。</u>

<br>
<b>2つのセンサーを搭載する目的は、測定精度を単純に高めるためではなく、センサーの異常を測定のたびに検知し、誤ったデータを記録しないためです。</b>
				</p>
				<small>ダブルセンサーによる健全性チェックの流れ - 特許出願中</small>
			</div>

		</div>
	</div>
</section>

<style>
	.double-sensor__head {
		margin-bottom: 48px;
	}

	/* Stacked, not side-by-side. The animation is a fixed 1080px-wide canvas
	   that scales to its container, so a half-width column forced it to ~0.49
	   scale and its 20px labels rendered at ~10px. Giving it the full content
	   width is what makes it legible; the copy reads as a lead paragraph above it. */
	.double-sensor__layout {
		display: grid;
		justify-items: center;
		gap: 40px;
	}

	.double-sensor__diagram {
		width: 100%;
		/* The panel is ~0.74:1 (1080×800): past ~900px wide it out-grows the
		   viewport and you can no longer see the flow end-to-end while it plays. */
		max-width: 900px;
		margin: 0;
	}

	.double-sensor__diagram img {
		width: 100%;
		height: auto;
		border: 1px solid var(--web-border);
		border-radius: 22px;
		background: var(--web-bg-soft);
	}

	/* Animation above 900px, static diagram below — see the markup comment.
	   900px viewport is where the panel still gets ~830px and holds ~0.77 scale;
	   below it the labels fall under ~14px and the still reads better. */
	.double-sensor__anim {
		display: block;
	}

	.double-sensor__still {
		display: none;
	}

	@media (max-width: 900px) {
		.double-sensor__anim {
			display: none;
		}

		.double-sensor__still {
			display: block;
		}
	}

	.double-sensor__diagram figcaption {
		padding: 10px 4px 2px;
		color: var(--web-muted);
		font-size: 12px;
		text-align: center;
	}

	.double-sensor__copy {
		max-width: 820px;
	}

	.double-sensor__copy p {
		margin: 0;
		color: var(--web-muted);
		font-size: 15.5px;
		line-height: 2;
		text-align: center;
	}

	@media (max-width: 600px) {
		.double-sensor__head {
			margin-bottom: 32px;
		}

		.double-sensor__layout {
			gap: 28px;
		}

		.double-sensor__diagram img {
			border-radius: 16px;
		}

		.double-sensor__copy p {
			font-size: 15px;
			line-height: 1.95;
			text-align: left;
		}
	}
</style>
