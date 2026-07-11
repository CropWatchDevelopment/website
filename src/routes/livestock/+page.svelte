<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { breadcrumbSchema, productSchema } from '$lib/seo/schema';
	import RelatedLinks from '$lib/components/RelatedLinks.svelte';

	const related = [
		{ href: '/cold-chain', label: 'コールドチェーン温度監視', sub: '冷蔵庫・冷凍庫の遠隔監視' },
		{ href: '/agriculture', label: 'スマート農業・ハウス', sub: 'ハウス・露地・土壌の環境監視' },
		{ href: '/column/keisha-shonetsu-taisaku', label: '鶏舎の暑熱対策', sub: 'コラム' }
	];

	const title =
		'スマート畜産・養鶏IoT｜鶏舎・畜舎の温度・湿度を遠隔監視するワイヤレスセンサー｜CropWatch 日本';
	const description =
		'スマート畜産・養鶏IoTのための鶏舎・畜舎の環境モニタリング。温度・湿度を15分ごとに自動送信し、暑熱対策や換気の判断に役立つ環境データを24時間見える化。家禽・畜産の暑熱ストレスや換気不良を早期に発見します。LoRaWANで配線工事なし、ISO/IEC 17025校正証明書つき。';

	const ld = [
		breadcrumbSchema([
			{ name: 'ホーム', path: '/' },
			{ name: '畜産・養鶏の監視', path: '/livestock' }
		]),
		productSchema({
			name: 'CropWatch 畜産・養鶏向け 温度・湿度監視センサー',
			description:
				'スマート畜産・養鶏IoT向けの電池駆動LoRaWAN環境センサー。鶏舎・畜舎の温度・湿度・CO₂を遠隔で見える化し、暑熱ストレスや換気不良の早期発見を支援します。',
			image: 'https://cropwatch.co.jp/assets/imagery/device-side-view.webp',
			category: 'スマート畜産 / 畜産IoT'
		})
	];
</script>

<Seo {title} {description} />
<JsonLd data={ld} />

<div class="crumb"><div class="wrap crumb__in">
	<a href="/">ホーム</a><span class="material-symbols-rounded">chevron_right</span>
	<span>製品</span><span class="material-symbols-rounded">chevron_right</span>
	<b>畜産・養鶏の監視</b>
</div></div>

<!-- ═══ ヒーロー ═══ -->
<section class="lsf-hero">
	<div class="wrap lsf-hero__grid">
		<div class="lsf-hero__copy" data-reveal>
			<span class="lsf-eyebrow"><span class="lsf-dot"></span> 鶏舎・畜舎の温度・湿度・CO₂を見守る産業用ワイヤレスデバイス</span>
			<h1>環境の変化を見逃さず、<br>飼育<span class="lsf-hl">リスク</span>を低減。</h1>
			<p class="lsf-lead">
				養鶏IoT・スマート畜産のワイヤレスセンサーが、鶏舎・畜舎の温度・湿度を15分ごとに自動送信し、鶏舎内の環境モニタリングを24時間見える化します。電波が届きにくい場所でもLoRaWANにより安定したデータ送信が可能。暑熱ストレス、換気不良、温度ムラなどの早期発見を支援し、鶏や家畜の健康と安定した飼育管理に貢献します。
			</p>
			<div class="lsf-hero__ctas">
				<a href="/contact" class="btn btn--accent btn--lg">無料デモを予約する <span class="material-symbols-rounded">arrow_forward</span></a>
				<span class="lsf-note"><span class="material-symbols-rounded">co2</span> CO₂の測定にも対応（オプション）</span>
			</div>
		</div>

		<div class="lsf-hero__media" data-reveal>
			<div class="lsf-media-top">
			<div class="lsf-reads">
				<div class="lsf-read">
					<span class="material-symbols-rounded fill lsf-read__ic" style="color:#0ea5e9">device_thermostat</span>
					<div class="lsf-read__tx">
						<span class="lsf-read__lab">温度測定</span>
						<span class="lsf-read__val">−40<i>°C</i> – +85<i>°C</i></span>
						<span class="lsf-read__sub">広い温度帯に対応</span>
					</div>
				</div>
				<div class="lsf-read">
					<span class="material-symbols-rounded fill lsf-read__ic" style="color:var(--web-accent)">co2</span>
					<div class="lsf-read__tx">
						<span class="lsf-read__lab">CO₂測定</span>
						<span class="lsf-read__val">400<i>ppm</i> – 5000<i>ppm</i></span>
						<span class="lsf-read__sub">オプション対応</span>
					</div>
				</div>
			</div>
			<img src="/assets/imagery/device-side-view.webp" alt="CropWatch 温度・湿度センサー" class="lsf-device" />
			</div>

			<!-- どのデバイスからでも — cross-device graphic (matches CropWatch TH flyer) -->
			<figure class="lsf-anydevice">
				<img
					src="/assets/imagery/multi-device.svg"
					alt="スマホ・タブレット・パソコンで確認"
					class="lsf-anydevice__img"
				/>
				<figcaption class="lsf-anydevice__cap">
					スマホ・タブレット・パソコン、どのデバイスからでも<br />
					<b>24時間365日</b>いつでもどこからでも確認できます。
				</figcaption>
			</figure>
		</div>
	</div>

	<!-- 実績ストリップ -->
	<div class="wrap">
		<div class="lsf-stats" data-reveal>
			<div><b>配線不要</b><span>無線タイプ</span></div>
			<div><b>電源工事不要</b><span>コンセント不要</span></div>
			<div><b>最長10年</b><span>バッテリーのみで稼働</span></div>
			<div><b>簡単設置</b><span>置くだけ・すぐ稼働</span></div>
		</div>
	</div>
</section>

<!-- ═══ 選ばれる理由 ═══ -->
<section class="section section--soft">
	<div class="wrap">
		<div class="lsf-rule" data-reveal><span>選ばれる理由</span><i></i></div>
		<div class="lsf-feats">
			<div class="lsf-feat" data-reveal="0">
				<span class="lsf-feat__ic lsf-feat__ic--blue"><span class="material-symbols-rounded">thermostat</span></span>
				<div><h3>鶏舎の暑熱対策をサポート</h3><p>鶏舎・畜舎の温度・湿度を自動で記録し、家禽や家畜に負担がかかる環境変化を見える化。夏場の暑熱対策や換気の判断に役立ちます。</p></div>
			</div>
			<div class="lsf-feat" data-reveal="1">
				<span class="lsf-feat__ic lsf-feat__ic--gold"><span class="material-symbols-rounded fill">notifications_active</span></span>
				<div><h3>異常をすばやく通知</h3><p>温度上昇や換気異常をメールやパトランプでお知らせし、早めの対応につなげます。</p></div>
			</div>
			<div class="lsf-feat" data-reveal="0">
				<span class="lsf-feat__ic lsf-feat__ic--green"><span class="material-symbols-rounded">smartphone</span></span>
				<div><h3>見回り負担をもっと軽く</h3><p>携帯やパソコンから今のデータをすばやく確認。現場に行かなくても、環境の変化を把握できます。</p></div>
			</div>
			<div class="lsf-feat" data-reveal="1">
				<span class="lsf-feat__ic lsf-feat__ic--blue"><span class="material-symbols-rounded">insights</span></span>
				<div><h3>過去データで改善につなげる</h3><p>暑さや換気不良などの傾向を把握することで、病気や死亡リスクの低減につなげます。</p></div>
			</div>
			<div class="lsf-feat" data-reveal="0">
				<span class="lsf-feat__ic lsf-feat__ic--green"><span class="material-symbols-rounded">save</span></span>
				<div><h3>通信が途切れても、記録は止まらない</h3><p>通信障害や停電発生時は、本体メモリにデータを保存。環境変化の記録漏れを防ぎます。</p></div>
			</div>
			<div class="lsf-feat" data-reveal="1">
				<span class="lsf-feat__ic lsf-feat__ic--blue"><span class="material-symbols-rounded">cached</span></span>
				<div><h3>メンテナンス負担を軽減</h3><p>検知部と電池を現場で交換できる構造を採用。ダウンタイムと保守コストを最小限に抑えます。</p></div>
			</div>
			<div class="lsf-feat lsf-feat--wide" data-reveal>
				<span class="lsf-feat__ic lsf-feat__ic--earth"><span class="material-symbols-rounded">cell_tower</span></span>
				<div><h3>つながりにくい場所も、簡単設置</h3><p>LoRaWAN通信により、Wi-Fiや携帯電話の電波が届きにくい場所でもデータ収集が可能です。無線タイプ・バッテリー方式のため、配線工事や電源工事は不要。必要な場所にすばやく簡単に設置できます。</p></div>
			</div>
			<div class="lsf-feat lsf-feat--wide" data-reveal>
				<span class="lsf-feat__ic lsf-feat__ic--earth"><span class="material-symbols-rounded fill">verified_user</span></span>
				<div><h3>過酷な環境でも壊れにくく、長く使える</h3><p>基板にコンフォーマルコーティングとポッティング処理を施し、高湿度・粉じん・温度変化による故障リスクを低減。鶏舎の過酷な環境での長期運用を見据え、壊れにくく安定して使える設計にしています。</p></div>
			</div>
		</div>
	</div>
</section>

<!-- ═══ 安心の公的認証 ═══ -->
<section class="section section--tight">
	<div class="wrap">
		<div class="lsf-comp" data-reveal>
			<div class="lsf-comp__copy">
				<p class="lsf-comp__eyebrow">安心の公的認証</p>
				<h2>すべてのセンサーに、監査でそのまま使える公式の校正証明書付き。</h2>
				<p class="lsf-comp__sub">ISO/IEC 17025認証取得 ・ NISTトレーサブル ・ HACCP対応 ・ ILAC-MRA認証</p>
				<span class="lsf-chip">搭載センサー：センシリオン社 SHT40 / SCD41</span>
			</div>
			<div class="lsf-comp__badges">
				<img src="/assets/badges/iso-iec-17025.png" alt="ISO/IEC 17025 校正" />
				<img src="/assets/badges/nist-traceable.webp" alt="NIST トレーサブル" />
				<img src="/assets/badges/HACCP.webp" alt="HACCP 対応" />
				<img src="/assets/badges/ilac-mra.webp" alt="ILAC-MRA 認定" />
			</div>
		</div>
	</div>
</section>

<RelatedLinks links={related} />

<!-- ═══ クロージング ═══ -->
<section class="closing">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold" style="justify-content:center"><span class="material-symbols-rounded">waving_hand</span> まずはお気軽に</p>
		<h2>鶏舎の環境、見える化しませんか。</h2>
		<p>見守りたい鶏舎・畜舎の様子をお聞かせください。最適なセンサーと通知の設定を、無料でご提案します。</p>
		<div class="closing__ctas">
			<a href="/contact" class="btn btn--accent btn--lg">無料デモを予約する</a>
			<a href="/replacement-sensors" class="btn btn--outline-light btn--lg">センサーを見る</a>
		</div>
	</div>
</section>

<style>
	/* ═══ Hero (poultry / earth theme, adapted from the print flyer) ═══ */
	.lsf-hero {
		background: linear-gradient(150deg, #3a2415 0%, #5e3a22 52%, #8a5a36 100%);
		position: relative;
		overflow: hidden;
		padding: 40px 0 34px;
	}
	.lsf-hero::before {
		content: '';
		position: absolute;
		inset: 0;
		background:
			radial-gradient(circle at 88% 12%, rgba(14, 153, 96, 0.22), transparent 46%),
			radial-gradient(circle at 6% 96%, rgba(44, 108, 183, 0.3), transparent 50%);
		pointer-events: none;
	}
	.lsf-hero__grid {
		position: relative;
		display: grid;
		grid-template-columns: 1.35fr 1fr;
		gap: 28px;
		align-items: center;
	}
	.lsf-eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 6px 13px;
		border-radius: 999px;
		background: rgba(255, 248, 240, 0.14);
		border: 1px solid rgba(255, 248, 240, 0.3);
		color: #ffece0;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.12em;
	}
	.lsf-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #34d399;
		box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.25);
		flex: none;
	}
	.lsf-hero__copy h1 {
		margin: 16px 0 0;
		font-size: clamp(1.7rem, 3.4vw, 2.4rem);
		line-height: 1.2;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: #fff;
	}
	.lsf-hl {
		color: #34d399;
	}
	.lsf-lead {
		margin: 14px 0 0;
		font-size: clamp(0.95rem, 1.1vw, 1rem);
		line-height: 1.85;
		color: rgba(255, 248, 240, 0.95);
		max-width: 42ch;
	}
	.lsf-hero__ctas {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 14px;
		margin-top: 22px;
	}
	.lsf-note {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--cw-font-mono);
		font-size: 12.5px;
		font-weight: 600;
		color: rgba(255, 248, 240, 0.92);
	}
	.lsf-note .material-symbols-rounded {
		font-size: 18px;
	}

	/* device + floating reading cards */
	.lsf-hero__media {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 24px;
		min-height: 240px;
	}
	.lsf-media-top {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 150px;
		padding-top: 18px;
	}
	/* どのデバイスからでも — cross-device graphic */
	.lsf-anydevice {
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
		text-align: center;
	}
	.lsf-anydevice__img {
		width: 100%;
		max-width: 230px;
		height: auto;
		filter: drop-shadow(0 14px 22px rgba(0, 0, 0, 0.4));
	}
	.lsf-anydevice__cap {
		font-size: 13px;
		line-height: 1.85;
		color: rgba(255, 248, 240, 0.9);
	}
	.lsf-anydevice__cap b {
		color: #34d399;
		font-weight: 800;
	}
	.lsf-device {
		width: 100%;
		max-width: 220px;
		filter: drop-shadow(0 18px 26px rgba(0, 0, 0, 0.45));
	}
	.lsf-reads {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
		z-index: 2;
	}
	.lsf-read {
		display: flex;
		align-items: center;
		gap: 9px;
		padding: 8px 12px;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.96);
		box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.5);
	}
	.lsf-read__ic {
		font-size: 21px;
	}
	.lsf-read__tx {
		display: flex;
		flex-direction: column;
		line-height: 1.25;
	}
	.lsf-read__lab {
		font-size: 9px;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--web-muted);
	}
	.lsf-read__val {
		font-family: var(--cw-font-mono);
		font-size: 16px;
		font-weight: 700;
		color: var(--cw-ink);
		margin-top: 2px;
	}
	.lsf-read__val i {
		font-style: normal;
		font-size: 11px;
		color: var(--web-muted);
	}
	.lsf-read__sub {
		font-size: 9.5px;
		font-weight: 600;
		color: var(--web-accent);
		margin-top: 2px;
	}

	/* stats strip */
	.lsf-stats {
		position: relative;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		margin-top: 26px;
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: 16px;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.18);
		backdrop-filter: blur(2px);
	}
	.lsf-stats > div {
		padding: 14px 16px;
		text-align: center;
		border-right: 1px solid rgba(255, 255, 255, 0.16);
	}
	.lsf-stats > div:last-child {
		border-right: none;
	}
	.lsf-stats b {
		display: block;
		font-family: var(--cw-font-mono);
		font-size: clamp(20px, 3vw, 26px);
		font-weight: 700;
		color: #fff;
	}
	.lsf-stats span {
		font-size: 11.5px;
		color: rgba(255, 255, 255, 0.72);
		margin-top: 3px;
		display: block;
	}

	/* ═══ Feature grid ═══ */
	.lsf-rule {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 18px;
	}
	.lsf-rule span {
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.18em;
		color: var(--cw-sapphire-600);
	}
	.lsf-rule i {
		flex: 1;
		height: 1px;
		background: var(--web-border);
	}
	.lsf-feats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
	}
	.lsf-feat {
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
	.lsf-feat h3 {
		font-size: 16px;
		font-weight: 700;
		color: var(--cw-ink);
		line-height: 1.35;
	}
	.lsf-feat p {
		font-size: 13.5px;
		line-height: 1.7;
		color: var(--web-muted);
		margin: 4px 0 0;
	}
	.lsf-feat__ic {
		flex: none;
		width: 42px;
		height: 42px;
		border-radius: 11px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.lsf-feat__ic .material-symbols-rounded {
		font-size: 23px;
	}
	.lsf-feat__ic--blue {
		background: var(--web-bg-tint);
		color: var(--web-primary);
	}
	.lsf-feat__ic--green {
		background: var(--web-accent-soft);
		color: var(--web-accent);
	}
	.lsf-feat__ic--gold {
		background: color-mix(in srgb, var(--web-gold) 16%, #fff);
		color: var(--web-gold);
	}
	.lsf-feat__ic--earth {
		background: #f0e0cc;
		color: #8a5a36;
	}
	.lsf-feat--wide {
		grid-column: 1 / -1;
		border-color: #e6d8c6;
		border-left-color: #8a5a36;
		background: #f6efe6;
		box-shadow: none;
	}

	/* ═══ Compliance strip ═══ */
	.lsf-comp {
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
	.lsf-comp::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at 92% 50%, rgba(242, 165, 22, 0.16), transparent 42%);
		pointer-events: none;
	}
	.lsf-comp__copy {
		position: relative;
		max-width: 46ch;
	}
	.lsf-comp__eyebrow {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.16em;
		color: var(--web-gold);
		margin: 0;
	}
	.lsf-comp__copy h2 {
		font-size: clamp(1.1rem, 1.7vw, 1.35rem);
		font-weight: 700;
		color: #fff;
		line-height: 1.45;
		margin: 8px 0 0;
	}
	.lsf-comp__sub {
		font-size: 12.5px;
		color: rgba(231, 236, 255, 0.72);
		margin: 8px 0 0;
	}
	.lsf-chip {
		display: inline-block;
		font-size: 12px;
		color: rgba(231, 236, 255, 0.85);
		margin-top: 12px;
		padding: 4px 13px;
		border: 1px solid rgba(255, 255, 255, 0.35);
		border-radius: 999px;
	}
	.lsf-comp__badges {
		position: relative;
		flex: none;
		display: flex;
		align-items: center;
		gap: 16px;
		background: rgba(255, 255, 255, 0.96);
		padding: 12px 18px;
		border-radius: 14px;
	}
	.lsf-comp__badges img {
		height: 52px;
		width: auto;
	}

	/* ═══ Responsive ═══ */
	@media (max-width: 900px) {
		.lsf-hero__grid {
			grid-template-columns: 1fr;
			gap: 10px;
		}
		.lsf-hero__media {
			order: -1;
			min-height: 0;
			gap: 18px;
		}
		.lsf-media-top {
			min-height: 0;
			padding-top: 0;
			justify-content: flex-start;
			gap: 14px;
			flex-wrap: wrap;
		}
		.lsf-device {
			max-width: 150px;
		}
		/* place the reading cards beside the device instead of over it */
		.lsf-reads {
			position: static;
			flex-direction: row;
			flex-wrap: wrap;
		}
		.lsf-anydevice {
			align-items: flex-start;
			text-align: left;
		}
	}
	@media (max-width: 760px) {
		.lsf-feats {
			grid-template-columns: 1fr;
		}
		.lsf-comp {
			flex-direction: column;
			align-items: flex-start;
		}
		.lsf-comp__badges {
			align-self: stretch;
			justify-content: center;
			flex-wrap: wrap;
		}
	}
	@media (max-width: 600px) {
		.lsf-stats {
			grid-template-columns: 1fr 1fr;
		}
		.lsf-stats > div:nth-child(2) {
			border-right: none;
		}
		.lsf-stats > div:nth-child(1),
		.lsf-stats > div:nth-child(2) {
			border-bottom: 1px solid rgba(255, 255, 255, 0.16);
		}
		.lsf-comp__badges img {
			height: 42px;
		}
	}
</style>
