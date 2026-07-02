<svelte:head>
	<title>冷蔵・冷凍の温度監視｜10分ごとの自動記録でHACCP・監査対応｜CropWatch 日本</title>
	<meta
		name="description"
		content="電池駆動のLoRaWANセンサーが冷蔵・冷凍庫の温度・湿度を10分ごとに自動記録。電波が届きにくい過酷な環境からも安定送信し、日々の温度管理からHACCP対応・監査時の記録提出までを効率化。ISO/IEC 17025校正証明書つき。"
	/>
</svelte:head>

<div class="crumb"><div class="wrap crumb__in">
	<a href="/">ホーム</a><span class="material-symbols-rounded">chevron_right</span>
	<a href="/sectors">製品</a><span class="material-symbols-rounded">chevron_right</span>
	<b>冷蔵・冷凍の監視</b>
</div></div>

<!-- ═══ ヒーロー ═══ -->
<section class="cc-hero">
	<div class="wrap cc-hero__grid">
		<div class="cc-hero__copy" data-reveal>
			<span class="cc-eyebrow"><span class="cc-dot"></span> 温度・湿度を見守るワイヤレスセンサー</span>
			<h1>10分ごとの記録で、<br>品質トラブルの<span class="cc-hl">リスク</span>を低減。</h1>
			<p class="cc-lead">
				電池駆動のLoRaWANセンサーが温度と湿度を24時間自動で記録。電波が届きにくい過酷な環境からも、安定してデータを送信します。取得したデータは自動でレポート化され、日々の温度管理からHACCP対応、監査時の記録提出までを効率化します。
			</p>
			<div class="cc-hero__ctas">
				<a href="/contact" class="btn btn--accent btn--lg">無料デモを予約する <span class="material-symbols-rounded">arrow_forward</span></a>
				<span class="cc-note"><span class="material-symbols-rounded">co2</span> CO₂の測定にも対応（オプション）</span>
			</div>
		</div>

		<div class="cc-hero__media" data-reveal>
			<div class="cc-reads">
				<div class="cc-read">
					<span class="material-symbols-rounded fill cc-read__ic" style="color:#0ea5e9">device_thermostat</span>
					<div class="cc-read__tx">
						<span class="cc-read__lab">測定温度</span>
						<span class="cc-read__val">−40<i>°C</i> – +85<i>°C</i></span>
						<span class="cc-read__sub">急速冷凍庫対応</span>
					</div>
				</div>
			</div>
			<img src="/assets/imagery/device-side-view.webp" alt="CropWatch 温度・湿度センサー" class="cc-device" />
		</div>
	</div>

	<!-- 実績ストリップ -->
	<div class="wrap">
		<div class="cc-stats" data-reveal>
			<div><b>±0.48<i>°C</i></b><span>測定精度</span></div>
			<div><b>10年</b><span>電池で最長10年稼働</span></div>
			<div><b>10分</b><span>収集頻度</span></div>
			<div><b class="cc-inf">∞</b><span>ユーザー無制限</span></div>
		</div>
	</div>
</section>

<!-- ═══ 選ばれる理由 ═══ -->
<section class="section section--soft">
	<div class="wrap">
		<div class="cc-rule" data-reveal><span>選ばれる理由</span><i></i></div>
		<div class="cc-feats">
			<div class="cc-feat" data-reveal="0">
				<span class="cc-feat__ic cc-feat__ic--blue"><span class="material-symbols-rounded">schedule</span></span>
				<div><h3>自動記録で、確認作業をもっとラクに</h3><p>温度・湿度データを自動で収集・保存。毎日の見回り負担を減らし、記録漏れのリスクを抑えます。</p></div>
			</div>
			<div class="cc-feat" data-reveal="1">
				<span class="cc-feat__ic cc-feat__ic--blue"><span class="material-symbols-rounded fill">notifications_active</span></span>
				<div><h3>異常をすばやく通知</h3><p>温度上昇や換気異常をメールやパトランプでお知らせ。見落としを防ぎ、早めの対応につなげます。</p></div>
			</div>
			<div class="cc-feat" data-reveal="0">
				<span class="cc-feat__ic cc-feat__ic--green"><span class="material-symbols-rounded">summarize</span></span>
				<div><h3>報告書作成もスムーズに</h3><p>保存されたデータから報告書を作成。監査前の準備や、社内外への提出資料づくりの負担を軽減します。</p></div>
			</div>
			<div class="cc-feat" data-reveal="1">
				<span class="cc-feat__ic cc-feat__ic--gold"><span class="material-symbols-rounded fill">cell_tower</span></span>
				<div><h3>「届かない」を理由に、温度管理を諦めない</h3><p>LoRaWAN通信で、冷凍庫の奥や離れた場所など、これまで確認できなかった環境も見える化します。</p></div>
			</div>
			<div class="cc-feat" data-reveal="0">
				<span class="cc-feat__ic cc-feat__ic--green"><span class="material-symbols-rounded">save</span></span>
				<div><h3>通信が途切れても、記録は止まらない</h3><p>通信障害や停電発生時は、本体メモリにデータを保存。データ欠損のリスクを防ぎます。</p></div>
			</div>
			<div class="cc-feat" data-reveal="1">
				<span class="cc-feat__ic cc-feat__ic--blue"><span class="material-symbols-rounded">fact_check</span></span>
				<div><h3>Wセンサーで、測定値の信頼性をチェック</h3><p>異常な測定値を送信しない<span class="cc-u">クロスチェック機能</span>を搭載。日々の温度管理の信頼性を高めます。</p></div>
			</div>
			<div class="cc-feat cc-feat--wide" data-reveal>
				<span class="cc-feat__ic cc-feat__ic--ink"><span class="material-symbols-rounded">api</span></span>
				<div><h3>OpenAPI・MCP によるデータ連携</h3><p>記録したデータは、ExcelやGoogleスプレッドシートなど、使い慣れたツールに取り込めます。専用画面だけに縛られず、既存の管理方法に合わせて活用できます。</p></div>
			</div>
		</div>
	</div>
</section>

<!-- ═══ 安心の公的認証 ═══ -->
<section class="section section--tight">
	<div class="wrap">
		<div class="cc-comp" data-reveal>
			<div class="cc-comp__copy">
				<p class="cc-comp__eyebrow">安心の公的認証</p>
				<h2>すべてのセンサーに、監査でそのまま使える公式の校正証明書付き。</h2>
				<p class="cc-comp__sub">ISO/IEC 17025認証取得 ・ NISTトレーサブル ・ HACCP対応 ・ ILAC-MRA認証</p>
				<span class="cc-chip"><span class="cc-chip__lab">搭載センサー</span> SHT43 &amp; SHT40</span>
			</div>
			<div class="cc-comp__badges">
				<img src="/assets/badges/iso-iec-17025.png" alt="ISO/IEC 17025 校正" />
				<img src="/assets/badges/nist-traceable.webp" alt="NIST トレーサブル" />
				<img src="/assets/badges/HACCP.webp" alt="HACCP 対応" />
				<img src="/assets/badges/ilac-mra.webp" alt="ILAC-MRA 認定" />
			</div>
		</div>
	</div>
</section>

<!-- ═══ クロージング ═══ -->
<section class="closing">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold" style="justify-content:center"><span class="material-symbols-rounded">waving_hand</span> まずはお気軽に</p>
		<h2>冷蔵・冷凍の温度管理、自動化しませんか。</h2>
		<p>見守りたい冷蔵庫・冷凍庫・倉庫の様子をお聞かせください。最適なセンサーと通知の設定を、無料でご提案します。</p>
		<div class="closing__ctas">
			<a href="/contact" class="btn btn--accent btn--lg">無料デモを予約する</a>
			<a href="/replacement-sensors" class="btn btn--outline-light btn--lg">センサーを見る</a>
		</div>
	</div>
</section>

<style>
	/* ═══ Hero (cold-chain / navy theme, adapted from the print flyer) ═══ */
	.cc-hero {
		background: linear-gradient(150deg, #0b1730 0%, #11213c 52%, #173d6e 100%);
		position: relative;
		overflow: hidden;
		padding: 40px 0 34px;
	}
	.cc-hero::before {
		content: '';
		position: absolute;
		inset: 0;
		background:
			radial-gradient(circle at 88% 12%, rgba(14, 153, 96, 0.22), transparent 46%),
			radial-gradient(circle at 6% 96%, rgba(44, 108, 183, 0.3), transparent 50%);
		pointer-events: none;
	}
	.cc-hero__grid {
		position: relative;
		display: grid;
		grid-template-columns: 1.35fr 1fr;
		gap: 28px;
		align-items: center;
	}
	.cc-eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 6px 13px;
		border-radius: 999px;
		background: rgba(231, 236, 255, 0.1);
		border: 1px solid rgba(231, 236, 255, 0.18);
		color: var(--cw-ice-400);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.12em;
	}
	.cc-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #34d399;
		box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.25);
		flex: none;
	}
	.cc-hero__copy h1 {
		margin: 16px 0 0;
		font-size: clamp(1.7rem, 3.4vw, 2.4rem);
		line-height: 1.2;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: #fff;
	}
	.cc-hl {
		color: #34d399;
	}
	.cc-lead {
		margin: 14px 0 0;
		font-size: clamp(0.95rem, 1.1vw, 1rem);
		line-height: 1.85;
		color: rgba(231, 236, 255, 0.82);
		max-width: 44ch;
	}
	.cc-hero__ctas {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 14px;
		margin-top: 22px;
	}
	.cc-note {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--cw-font-mono);
		font-size: 12.5px;
		font-weight: 600;
		color: var(--cw-ice-400);
	}
	.cc-note .material-symbols-rounded {
		font-size: 18px;
	}

	/* device + floating reading card */
	.cc-hero__media {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 240px;
	}
	.cc-device {
		width: 100%;
		max-width: 220px;
		filter: drop-shadow(0 18px 26px rgba(0, 0, 0, 0.45));
	}
	.cc-reads {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
		z-index: 2;
	}
	.cc-read {
		display: flex;
		align-items: center;
		gap: 9px;
		padding: 8px 12px;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.96);
		box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.5);
	}
	.cc-read__ic {
		font-size: 21px;
	}
	.cc-read__tx {
		display: flex;
		flex-direction: column;
		line-height: 1.25;
	}
	.cc-read__lab {
		font-size: 9px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--web-muted);
	}
	.cc-read__val {
		font-family: var(--cw-font-mono);
		font-size: 16px;
		font-weight: 700;
		color: var(--cw-ink);
		margin-top: 2px;
	}
	.cc-read__val i {
		font-style: normal;
		font-size: 11px;
		color: var(--web-muted);
	}
	.cc-read__sub {
		font-size: 9.5px;
		font-weight: 600;
		color: var(--web-accent);
		margin-top: 2px;
	}

	/* stats strip */
	.cc-stats {
		position: relative;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		margin-top: 26px;
		border: 1px solid rgba(231, 236, 255, 0.16);
		border-radius: 16px;
		overflow: hidden;
		background: rgba(231, 236, 255, 0.06);
		backdrop-filter: blur(2px);
	}
	.cc-stats > div {
		padding: 14px 16px;
		text-align: center;
		border-right: 1px solid rgba(231, 236, 255, 0.16);
	}
	.cc-stats > div:last-child {
		border-right: none;
	}
	.cc-stats b {
		display: block;
		font-family: var(--cw-font-mono);
		font-size: clamp(20px, 3vw, 26px);
		font-weight: 700;
		color: #fff;
	}
	.cc-stats b i {
		font-style: normal;
		font-size: 0.6em;
	}
	.cc-inf {
		line-height: 0.8;
	}
	.cc-stats span {
		font-size: 11px;
		color: rgba(231, 236, 255, 0.72);
		margin-top: 3px;
		display: block;
	}

	/* ═══ Feature grid ═══ */
	.cc-rule {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 18px;
	}
	.cc-rule span {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.18em;
		color: var(--cw-sapphire-600);
	}
	.cc-rule i {
		flex: 1;
		height: 1px;
		background: var(--web-border);
	}
	.cc-feats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}
	.cc-feat {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 16px 18px;
		border: 1px solid var(--web-border);
		border-left: 4px solid var(--web-accent);
		border-radius: 14px;
		background: #fff;
		box-shadow: var(--web-shadow-card);
	}
	.cc-feat h3 {
		font-size: 16px;
		font-weight: 700;
		color: var(--cw-ink);
		line-height: 1.35;
	}
	.cc-feat p {
		font-size: 13.5px;
		line-height: 1.7;
		color: var(--web-muted);
		margin: 4px 0 0;
	}
	.cc-u {
		text-decoration: underline;
		text-decoration-color: var(--web-accent);
		text-underline-offset: 2px;
	}
	.cc-feat__ic {
		flex: none;
		width: 42px;
		height: 42px;
		border-radius: 11px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.cc-feat__ic .material-symbols-rounded {
		font-size: 23px;
	}
	.cc-feat__ic--blue {
		background: var(--web-bg-tint);
		color: var(--web-primary);
	}
	.cc-feat__ic--green {
		background: var(--web-accent-soft);
		color: var(--web-accent);
	}
	.cc-feat__ic--gold {
		background: color-mix(in srgb, var(--web-gold) 16%, #fff);
		color: var(--web-gold);
	}
	.cc-feat__ic--ink {
		background: #fff;
		color: var(--cw-ink);
		border: 1px solid var(--web-border);
	}
	.cc-feat--wide {
		grid-column: 1 / -1;
		border-color: var(--web-border-strong);
		border-left-color: var(--web-primary);
		background: var(--web-primary-soft);
		box-shadow: none;
	}

	/* ═══ Compliance strip ═══ */
	.cc-comp {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		padding: 24px 28px;
		border-radius: 20px;
		background: var(--cw-ink);
		position: relative;
		overflow: hidden;
	}
	.cc-comp::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at 92% 50%, rgba(242, 165, 22, 0.16), transparent 42%);
		pointer-events: none;
	}
	.cc-comp__copy {
		position: relative;
		max-width: 46ch;
	}
	.cc-comp__eyebrow {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.16em;
		color: var(--web-gold);
		margin: 0;
	}
	.cc-comp__copy h2 {
		font-size: clamp(1.1rem, 1.7vw, 1.35rem);
		font-weight: 700;
		color: #fff;
		line-height: 1.45;
		margin: 8px 0 0;
	}
	.cc-comp__sub {
		font-size: 12.5px;
		color: rgba(231, 236, 255, 0.72);
		margin: 8px 0 0;
	}
	.cc-chip {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--cw-font-mono);
		font-size: 12px;
		font-weight: 700;
		color: #fff;
		margin-top: 12px;
		padding: 4px 12px;
		border: 1px solid rgba(231, 236, 255, 0.22);
		border-radius: 999px;
		background: rgba(231, 236, 255, 0.08);
	}
	.cc-chip__lab {
		font-family: var(--jp-font);
		font-size: 9px;
		font-weight: 700;
		letter-spacing: 0.12em;
		color: var(--cw-ice-400);
	}
	.cc-comp__badges {
		position: relative;
		flex: none;
		display: flex;
		align-items: center;
		gap: 16px;
		background: rgba(255, 255, 255, 0.96);
		padding: 12px 18px;
		border-radius: 14px;
	}
	.cc-comp__badges img {
		height: 52px;
		width: auto;
	}

	/* ═══ Responsive ═══ */
	@media (max-width: 900px) {
		.cc-hero__grid {
			grid-template-columns: 1fr;
			gap: 10px;
		}
		.cc-hero__media {
			order: -1;
			min-height: 0;
			justify-content: flex-start;
			gap: 14px;
			flex-wrap: wrap;
		}
		.cc-device {
			max-width: 150px;
		}
		.cc-reads {
			position: static;
			flex-direction: row;
			flex-wrap: wrap;
		}
	}
	@media (max-width: 760px) {
		.cc-feats {
			grid-template-columns: 1fr;
		}
		.cc-comp {
			flex-direction: column;
			align-items: flex-start;
		}
		.cc-comp__badges {
			align-self: stretch;
			justify-content: center;
			flex-wrap: wrap;
		}
	}
	@media (max-width: 600px) {
		.cc-stats {
			grid-template-columns: 1fr 1fr;
		}
		.cc-stats > div:nth-child(2) {
			border-right: none;
		}
		.cc-stats > div:nth-child(1),
		.cc-stats > div:nth-child(2) {
			border-bottom: 1px solid rgba(231, 236, 255, 0.16);
		}
		.cc-comp__badges img {
			height: 42px;
		}
	}
</style>
