<section class="section scroll-pad" id="double-sensor">
	<div class="wrap">
		<div class="section__head double-sensor__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">sensors</span> 測定値の信頼性</p>
			<h2>2つのセンサーで、10分ごとに健全性を確認。</h2>
		</div>

		<div class="double-sensor__layout">
			<div class="double-sensor__copy" data-reveal>
				<p>
					高精度な温湿度センサーを採用するとともに、長期間にわたり安心してご使用いただくため、独自の健全性チェック機能を取り入れています。この健全性チェックは単純に2つの測定値の差を比較するだけではなく、データを取得するたびに両センサーの測定値を回帰分析に反映し、これまでの関係性から大きく外れた値が発生していないかを継続的に確認します。この乖離を監視することで、単純な差分比較だけでは見つけにくい異常についても、早期に検知しやすい仕組みを採用しています。通常とは異なる値が検出された場合は測定値を送信せず、システム上にエラーとして表示させる仕組みにしています。
				</p>
				<p>
					この健全性チェック機能により、年に1回など限られたタイミングでセンサーの状態を確認するだけではなく、10分に1回のデータ取得ごとに、センサーの健全性を継続的に確認し、異常が発生した場合には迅速に対応できます。
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
		border-top: 1px solid var(--web-border);
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
