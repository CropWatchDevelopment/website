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
					2つのセンサーの測定値を相互に比較し、これまでのデータ傾向とも照合することで、通常とは異なるズレを自動で検知します。10分ごとの測定時にセンサーの状態を確認し、異常を検知した場合は、その測定値を記録・送信せず、システム上にエラーとして表示します。これにより、誤った測定データが記録に残ることを防ぎます。
				</p>
			</div>

			<figure class="double-sensor__diagram" data-reveal id="double-sensor-diagram">
				<!-- The animation is authored on a fixed 1080px grid and scales as a unit,
				     so legibility is purely a function of how much width it gets. Below
				     ~900px it drops under ~0.75 scale and the labels stop being readable,
				     so the purpose-built static diagram stands in instead. -->
				<div class="double-sensor__anim">
					<SensorValidationAnimation />
				</div>
				<picture class="double-sensor__still">
					<source
						media="(max-width: 600px)"
						srcset="/assets/imagery/double-sensor-check-mobile.svg"
					/>
					<img
						src="/assets/imagery/double-sensor-check.svg"
						alt="2つの温湿度センサーを回帰分析で照合し、通常データまたはエラーとして処理する流れ"
					/>
				</picture>
				<figcaption>ダブルセンサーによる健全性チェックの流れ</figcaption>
			</figure>
		</div>
	</div>
</section>

<style>
	.double-sensor__head {
		margin-bottom: 48px;
	}

	/* Stacked, not side-by-side. The animation is a fixed 1080px square that
	   scales to its container, so a half-width column forced it to ~0.49 scale
	   and its 20px labels rendered at ~10px. Giving it the full content width
	   is what makes it legible; the copy reads as a lead paragraph above it. */
	.double-sensor__layout {
		display: grid;
		justify-items: center;
		gap: 40px;
	}

	.double-sensor__diagram {
		width: 100%;
		/* Squares get tall fast: past ~900px this out-grows the viewport and you
		   can no longer see the flow end-to-end while it plays. */
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
