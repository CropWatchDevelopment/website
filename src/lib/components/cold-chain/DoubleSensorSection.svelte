<script lang="ts">
	let { interval = 10 }: { interval?: number } = $props();

	// Illustrative SHT43 - SHT40 difference (°C) for the mini chart in step 2: the pair
	// normally holds a steady small offset, then the last reading jumps out of the usual band.
	// Example values only (the figcaption says so); they match the 3.2 / 3.3 °C cards in step 1.
	const DIFF = [-0.1, -0.08, -0.12, -0.09, -0.11, -0.07, -0.1, -0.12, -0.09, 1.55];
	const X0 = 22;
	const X1 = 276;
	const Y_BASE = 96; // y of V_MIN
	const Y_SPAN = 74;
	const V_MIN = -0.6;
	const V_RANGE = 2.5;
	const px = (i: number) => X0 + (i * (X1 - X0)) / (DIFF.length - 1);
	const py = (v: number) => Y_BASE - ((v - V_MIN) / V_RANGE) * Y_SPAN;
	const pts = DIFF.map((v, i) => ({ x: px(i), y: py(v) }));
	const usual = pts.slice(0, -1);
	const jump = pts[pts.length - 1];
	const prev = usual[usual.length - 1];
	const usualPath = usual
		.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
		.join(' ');
	const bandTop = py(0.05);
	const bandBottom = py(-0.25);
</script>

<section class="section scroll-pad" id="double-sensor">
	<div class="wrap">
		<div class="section__head double-sensor__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">sensors</span> 測定値の信頼性</p>
			<h2>2つのセンサーで、{interval}分ごとに健全性を確認</h2>
		</div>

		<!-- Process explainer: measure with both sensors -> health check -> only a passing
		     SHT43 value is sent. Real HTML text (not a scaled SVG) so it stays legible and
		     reflows: 3 columns from 980px, stacked below. -->
		<figure class="dsflow" data-reveal>
			<ol class="dsflow__steps">
				<li class="dsflow__step">
					<p class="dsflow__label"><span class="dsflow__num">01</span>測る</p>
					<h3>同じ空気を、2つのセンサーで同時に測定</h3>
					<div class="dsflow__sensors">
						<div class="dsflow__sensor dsflow__sensor--main">
							<span class="dsflow__role">測定用</span>
							<span class="dsflow__model">SHT43</span>
							<span class="dsflow__reading">3.2<small>℃</small></span>
							<span class="dsflow__note">ISO/IEC 17025 校正済み</span>
						</div>
						<div class="dsflow__sensor dsflow__sensor--check">
							<span class="dsflow__role">確認用</span>
							<span class="dsflow__model">SHT40</span>
							<span class="dsflow__reading">3.3<small>℃</small></span>
							<span class="dsflow__note">SHT43の値を確かめる</span>
						</div>
					</div>
					<p class="dsflow__foot">
						<span class="material-symbols-rounded" aria-hidden="true">schedule</span>
						{interval}分ごと、データ送信のたびに
					</p>
				</li>

				<li class="dsflow__step dsflow__step--check">
					<p class="dsflow__label"><span class="dsflow__num">02</span>確かめる</p>
					<h3>送信の前に、健全性チェック</h3>
					<ul class="dsflow__checks">
						<li>
							<span class="material-symbols-rounded" aria-hidden="true">check_circle</span>
							2つのセンサーが応答している
						</li>
						<li>
							<span class="material-symbols-rounded" aria-hidden="true">check_circle</span>
							読み取りエラーが出ていない
						</li>
						<li>
							<span class="material-symbols-rounded" aria-hidden="true">check_circle</span>
							2つの値の差が、これまでの傾向から外れていない
						</li>
					</ul>
					<div class="dsflow__chart">
						<p class="dsflow__chart-title">SHT43とSHT40の差（イメージ）</p>
						<svg
							viewBox="0 0 300 118"
							role="img"
							aria-label="2つのセンサーの値の差は普段は一定の範囲に収まり、範囲から大きく外れた値をズレとして検知するイメージ図"
						>
							<rect
								x={X0 - 10}
								y={bandTop}
								width={X1 - X0 + 20}
								height={bandBottom - bandTop}
								rx="4"
								fill="#e9f9f1"
								stroke="#93e0bd"
								stroke-dasharray="3 3"
							/>
							<text x={X0 - 8} y={bandBottom + 15} class="dsflow__svg-muted">いつもの範囲</text>
							<line x1={X0 - 10} y1="108" x2={X1 + 10} y2="108" stroke="#d7e0f5" />
							<text x={X1 + 10} y="104" text-anchor="end" class="dsflow__svg-muted">時間 →</text>
							<path
								d={usualPath}
								fill="none"
								stroke="#5b6f92"
								stroke-width="2"
								stroke-linejoin="round"
							/>
							<path
								d="M{prev.x} {prev.y} L{jump.x} {jump.y}"
								fill="none"
								stroke="#dd0f0f"
								stroke-width="2"
								stroke-dasharray="4 3"
							/>
							{#each usual as p, i (i)}
								<circle cx={p.x} cy={p.y} r="3.5" fill="#5b6f92" stroke="#fff" stroke-width="1.5" />
							{/each}
							<circle cx={jump.x} cy={jump.y} r="9" fill="#dd0f0f" stroke="#fff" stroke-width="2" />
							<path
								d="M{jump.x - 3.5} {jump.y - 3.5}l7 7m0-7-7 7"
								stroke="#fff"
								stroke-width="2"
								stroke-linecap="round"
							/>
							<text x={jump.x - 16} y={jump.y + 4} text-anchor="end" class="dsflow__svg-ink"
								>ズレを検知</text
							>
						</svg>
					</div>
				</li>

				<li class="dsflow__step dsflow__step--result">
					<p class="dsflow__label"><span class="dsflow__num">03</span>判定する</p>
					<h3>合格した値だけを、記録に残す</h3>
					<div class="dsflow__outcome dsflow__outcome--ok">
						<span class="dsflow__badge"
							><span class="material-symbols-rounded" aria-hidden="true">check</span></span
						>
						<div>
							<p class="dsflow__when">すべてクリア</p>
							<p class="dsflow__what">SHT43の値を、正常データとして送信</p>
							<span class="dsflow__chip">
								<span class="material-symbols-rounded" aria-hidden="true">cloud_upload</span>
								3.2℃ を記録
							</span>
						</div>
					</div>
					<div class="dsflow__outcome dsflow__outcome--ng">
						<span class="dsflow__badge"
							><span class="material-symbols-rounded" aria-hidden="true">close</span></span
						>
						<div>
							<p class="dsflow__when">1つでも外れたら</p>
							<p class="dsflow__what">その値は記録せず、システム上にセンサーエラーを表示</p>
							<a class="dsflow__link" href="#field-replacement"
								>検知部は現場で交換できます
								<span class="material-symbols-rounded" aria-hidden="true">arrow_downward</span></a
							>
						</div>
					</div>
				</li>
			</ol>
			<figcaption>
				※数値は説明用の例です。ダブルセンサーによる健全性チェックの流れ - 特許出願中
			</figcaption>
		</figure>
	</div>
</section>

<style>
	.double-sensor__head {
		margin-bottom: 48px;
	}

	.dsflow {
		--dsflow-gap: 48px;
		--sht43: var(--cw-sapphire-500);
		--sht40: var(--cw-emerald-500);
		margin: 0;
	}

	.dsflow__steps {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.12fr) minmax(0, 1fr);
		gap: var(--dsflow-gap);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.dsflow__step {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 24px 22px;
		border: 1px solid var(--web-border);
		border-radius: 22px;
		background: var(--web-surface);
		box-shadow: var(--web-shadow-card);
	}

	/* arrow in the gap to the next step: right on desktop, down when stacked */
	.dsflow__step:not(:last-child)::after {
		content: '';
		position: absolute;
		top: 50%;
		right: calc(var(--dsflow-gap) / -2 - 14px);
		width: 28px;
		height: 28px;
		transform: translateY(-50%);
		background: var(--web-border-strong);
		-webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M4 10.5h11.6l-5-5L12.7 3.4 21.3 12l-8.6 8.6-2.1-2.1 5-5H4z'/%3E%3C/svg%3E")
			center / contain no-repeat;
		mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M4 10.5h11.6l-5-5L12.7 3.4 21.3 12l-8.6 8.6-2.1-2.1 5-5H4z'/%3E%3C/svg%3E")
			center / contain no-repeat;
	}

	.dsflow__label {
		display: flex;
		align-items: center;
		gap: 10px;
		margin: 0;
		color: var(--web-eyebrow);
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0.08em;
	}

	.dsflow__num {
		font-family: var(--cw-font-mono);
		font-size: 14px;
		color: var(--web-primary);
	}

	.dsflow__step h3 {
		margin: 0;
		font-size: 18px;
		line-height: 1.5;
	}

	/* step 1 - the two sensors */
	.dsflow__sensors {
		display: grid;
		gap: 10px;
	}

	.dsflow__sensor {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		grid-template-areas:
			'role role reading'
			'model model reading'
			'note note note';
		column-gap: 10px;
		padding: 12px 14px;
		border: 1px solid var(--web-border);
		border-left: 5px solid var(--dsflow-id);
		border-radius: 14px;
		background: var(--web-bg-soft);
	}

	.dsflow__sensor--main {
		--dsflow-id: var(--sht43);
	}

	.dsflow__sensor--check {
		--dsflow-id: var(--sht40);
	}

	.dsflow__role {
		grid-area: role;
		color: var(--web-muted);
		font-size: 12px;
		font-weight: 700;
	}

	.dsflow__model {
		grid-area: model;
		color: var(--web-heading);
		font-size: 20px;
		font-weight: 800;
		line-height: 1.3;
	}

	.dsflow__reading {
		grid-area: reading;
		align-self: center;
		color: var(--web-heading);
		font-family: var(--cw-font-mono);
		font-size: 24px;
		font-weight: 700;
	}

	.dsflow__reading small {
		margin-left: 2px;
		font-size: 14px;
	}

	.dsflow__note {
		grid-area: note;
		margin-top: 4px;
		color: var(--web-muted);
		font-size: 12px;
	}

	.dsflow__foot {
		display: flex;
		align-items: center;
		gap: 6px;
		margin: auto 0 0;
		color: var(--web-primary);
		font-size: 14px;
		font-weight: 700;
	}

	.dsflow__foot .material-symbols-rounded {
		font-size: 20px;
	}

	/* step 2 - the check, the dark "brain" card */
	.dsflow__step--check {
		border-color: var(--cw-sapphire-900);
		background: var(--cw-sapphire-900);
	}

	.dsflow__step--check .dsflow__label,
	.dsflow__step--check .dsflow__num {
		color: #7fc9e6;
	}

	.dsflow__step--check h3 {
		color: var(--web-on-ink);
	}

	.dsflow__checks {
		display: grid;
		gap: 8px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.dsflow__checks li {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		color: var(--web-on-ink);
		font-size: 14.5px;
		line-height: 1.6;
	}

	.dsflow__checks .material-symbols-rounded {
		flex: none;
		margin-top: 1px;
		color: var(--cw-emerald-300);
		font-size: 20px;
	}

	.dsflow__chart {
		margin-top: auto;
		padding: 12px 12px 6px;
		border-radius: 14px;
		background: var(--web-surface);
	}

	.dsflow__chart-title {
		margin: 0 0 2px;
		color: var(--web-heading);
		font-size: 12.5px;
		font-weight: 700;
	}

	.dsflow__chart svg {
		display: block;
		width: 100%;
		height: auto;
		overflow: visible;
	}

	.dsflow__svg-muted {
		fill: var(--web-muted);
		font-size: 11px;
	}

	.dsflow__svg-ink {
		fill: var(--web-heading);
		font-size: 12.5px;
		font-weight: 700;
	}

	/* step 3 - the two outcomes */
	.dsflow__outcome {
		display: grid;
		grid-template-columns: 34px minmax(0, 1fr);
		gap: 12px;
		padding: 14px;
		border: 1.5px solid var(--dsflow-tone-border);
		border-radius: 14px;
		background: var(--dsflow-tone-bg);
	}

	.dsflow__outcome--ok {
		--dsflow-tone: var(--cw-emerald-500);
		--dsflow-tone-ink: var(--cw-emerald-700);
		--dsflow-tone-border: var(--cw-emerald-300);
		--dsflow-tone-bg: var(--cw-emerald-50);
	}

	.dsflow__outcome--ng {
		--dsflow-tone: var(--cw-danger-600);
		--dsflow-tone-ink: #a20c0c;
		--dsflow-tone-border: var(--cw-danger-500);
		--dsflow-tone-bg: #fff1f1;
	}

	.dsflow__badge {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: var(--dsflow-tone);
		color: #fff;
	}

	.dsflow__badge .material-symbols-rounded {
		font-size: 22px;
		font-weight: 700;
	}

	.dsflow__when {
		margin: 0;
		color: var(--dsflow-tone-ink);
		font-size: 12.5px;
		font-weight: 700;
	}

	.dsflow__what {
		margin: 2px 0 0;
		color: var(--web-heading);
		font-size: 15px;
		font-weight: 700;
		line-height: 1.55;
	}

	.dsflow__chip {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		margin-top: 8px;
		padding: 3px 10px;
		border-radius: var(--web-radius-pill);
		background: var(--web-surface);
		border: 1px solid var(--cw-emerald-200);
		color: var(--cw-emerald-700);
		font-family: var(--cw-font-mono);
		font-size: 13px;
		font-weight: 700;
	}

	.dsflow__chip .material-symbols-rounded {
		font-size: 17px;
	}

	.dsflow__link {
		display: inline-flex;
		align-items: center;
		gap: 3px;
		margin-top: 8px;
		color: var(--web-primary);
		font-size: 13px;
		font-weight: 700;
	}

	.dsflow__link:hover {
		color: var(--web-primary-hover);
	}

	.dsflow__link .material-symbols-rounded {
		font-size: 17px;
	}

	.dsflow figcaption {
		margin-top: 18px;
		color: var(--web-muted);
		font-size: 12.5px;
		text-align: center;
	}

	/* the standard 980px step: stack the steps, arrows point down, the sensors sit side by side */
	@media (max-width: 980px) {
		.dsflow {
			--dsflow-gap: 44px;
		}

		.dsflow__steps {
			grid-template-columns: minmax(0, 1fr);
			max-width: 640px;
			margin-inline: auto;
		}

		.dsflow__step:not(:last-child)::after {
			top: auto;
			right: auto;
			bottom: calc(var(--dsflow-gap) / -2 - 14px);
			left: 50%;
			transform: translateX(-50%) rotate(90deg);
		}

		.dsflow__sensors {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.dsflow__chart {
			margin-top: 4px;
		}
	}

	@media (max-width: 600px) {
		.double-sensor__head {
			margin-bottom: 32px;
		}

		.dsflow__step {
			padding: 20px 16px;
			border-radius: 18px;
		}

		/* side by side, each card got ~140px and the reading crowded the model name */
		.dsflow__sensors {
			grid-template-columns: minmax(0, 1fr);
		}

		.dsflow figcaption {
			text-align: left;
		}
	}
</style>
