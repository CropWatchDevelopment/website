<script lang="ts">
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
					2つのセンサーから取得したデータをこれまでの測定データの傾向と照らし合わせ、通常とは異なるズレがないかを自動でチェックします。異常が見つかった場合は、その測定結果は使用せず、システム上にエラーとして表示されます。{interval}分に1回のデータ取得ごとにセンサーの状態を確認し、異常が検知された場合は、誤った測定データを記録・送信しない仕組みを採用しています。
				</p>
			</div>

			<figure class="double-sensor__diagram" data-reveal>
				<picture>
					<source
						media="(max-width: 600px)"
						srcset="/assets/imagery/double-sensor-check-mobile.svg"
					/>
					<img
						src="/assets/imagery/double-sensor-check.svg"
						alt="2つの温湿度センサーを回帰分析で照合し、通常データまたはエラーとして処理する流れ"
					/>
				</picture>
				<figcaption>ダブルセンサーによる健全性チェックの概念図</figcaption>
			</figure>
		</div>
	</div>
</section>

<style>
	.double-sensor__head {
		margin-bottom: 48px;
	}

	.double-sensor__layout {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
		gap: clamp(42px, 6vw, 76px);
		align-items: start;
	}

	.double-sensor__diagram {
		position: sticky;
		top: 132px;
		margin: 0;
		padding: 14px;
		border: 1px solid var(--web-border);
		border-radius: 22px;
		background: var(--web-bg-soft);
	}

	.double-sensor__diagram img {
		width: 100%;
		height: auto;
	}

	.double-sensor__diagram picture {
		display: block;
	}

	.double-sensor__diagram figcaption {
		padding: 10px 4px 2px;
		color: var(--web-muted);
		font-size: 12px;
		text-align: center;
	}

	.double-sensor__copy {
		display: grid;
		gap: 0;
	}

	.double-sensor__copy p {
		margin: 0;
		padding-block: 18px;
		/* border-top: 1px solid var(--web-border); */
		color: var(--web-muted);
		font-size: 15.5px;
		line-height: 2;
	}

	.double-sensor__copy p:first-child {
		padding-top: 0;
		border-top: 0;
	}

	.double-sensor__copy p:last-child {
		padding-bottom: 0;
	}

	@media (max-width: 980px) {
		.double-sensor__layout {
			grid-template-columns: 1fr;
		}

		.double-sensor__diagram {
			position: static;
			width: min(100%, 680px);
			margin-inline: auto;
		}

		.double-sensor__copy {
			max-width: 760px;
			margin-inline: auto;
		}
	}

	@media (max-width: 600px) {
		.double-sensor__head {
			margin-bottom: 32px;
		}

		.double-sensor__layout {
			gap: 34px;
		}

		.double-sensor__diagram {
			padding: 8px;
			border-radius: 16px;
		}

		.double-sensor__copy p {
			padding-block: 16px;
			font-size: 15px;
			line-height: 1.95;
		}
	}
</style>
