<script lang="ts">
	import V25Teardown from '$lib/components/v25-teardown/V25Teardown.svelte';

	let { interval = 10 }: { interval?: number } = $props();
</script>

<section class="section scroll-pad" id="double-sensor">
	<div class="wrap">
		<div class="section__head double-sensor__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">sensors</span> 測定値の信頼性</p>
			<h2>2つのセンサーで、{interval}分ごとに健全性を確認</h2>
		</div>

		<!-- 3D service walkthrough, ported from the cropwatch.io /home "Inside the sensor"
		     section. three.js and the GLB only load once the stage nears the viewport. -->
		<figure class="double-sensor__teardown" data-reveal id="inside-the-sensor">
			<V25Teardown />
			<figcaption>
				センサー交換はネジ3本、電池交換はさらに5本。現場でメンテナンスしながら長く使えるよう設計した筐体です。
			</figcaption>
		</figure>
	</div>
</section>

<style>
	.double-sensor__head {
		margin-bottom: 48px;
	}

	/* The 3D stage gets the full content width: its captions scale with the stage (cqi),
	   so a narrower column only makes them smaller. */
	.double-sensor__teardown {
		width: 100%;
		margin: 0;
	}

	.double-sensor__teardown figcaption {
		margin-top: 14px;
		color: var(--web-muted);
		font-size: 14px;
		line-height: 1.8;
		text-align: center;
	}

	@media (max-width: 600px) {
		.double-sensor__head {
			margin-bottom: 32px;
		}

		.double-sensor__teardown figcaption {
			text-align: left;
		}
	}
</style>
