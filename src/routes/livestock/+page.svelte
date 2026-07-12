<script lang="ts">
	import DoubleSensorSection from '$lib/components/cold-chain/DoubleSensorSection.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { breadcrumbSchema, faqSchema, productSchema } from '$lib/seo/schema';
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

	const faq = [
		{
			q: '鶏舎の暑熱対策に役立ちますか？',
			a: 'はい。温度・湿度を15分ごとに自動で記録し、鶏や家畜に負担がかかる環境変化を見える化します。夏場の暑熱対策や、送風・換気を行うタイミングの判断に役立ちます。'
		},
		{
			q: 'CO₂濃度も測定できますか？',
			a: 'はい。オプションのセンシリオン社SCD41センサーにより、400〜5000ppmのCO₂濃度を測定できます。換気不良の早期発見に役立ちます。'
		},
		{
			q: '電波が届きにくい鶏舎・畜舎でも使えますか？',
			a: 'はい。LoRaWAN通信により、Wi-Fiや携帯の電波が届きにくい場所でもデータを送信できます。無線・電池式のため、配線工事や電源工事は不要です。'
		},
		{
			q: '高湿度や粉じんの多い環境でも故障しにくいですか？',
			a: '基板にコンフォーマルコーティングとポッティング処理を施し、高湿度・粉じん・温度変化による故障リスクを低減しています。鶏舎の過酷な環境での長期運用を想定した設計です。'
		},
		{
			q: '通信が途切れた場合、記録は失われますか？',
			a: '本体の内部メモリに測定データを保存します。通信が復旧すると、保存していたデータを自動で送信します。'
		}
	];

	const ld = [
		breadcrumbSchema([
			{ name: 'ホーム', path: '/' },
			{ name: '畜産・養鶏の監視', path: '/livestock' }
		]),
		faqSchema(faq),
		productSchema({
			name: 'CropWatch 畜産・養鶏向け 温度・湿度監視センサー',
			description:
				'スマート畜産・養鶏IoT向けの電池駆動LoRaWAN環境センサー。鶏舎・畜舎の温度・湿度・CO₂を遠隔で見える化し、暑熱ストレスや換気不良の早期発見を支援します。',
			image: 'https://cropwatch.co.jp/assets/photos/livestock-sensor-install.webp',
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

<!-- ═══ ヒーロー（現場写真バックドロップ） ═══ -->
<section class="ls-hero">
	<div class="ls-hero__bg" style="background-image:url('/assets/photos/livestock-hero.webp')"></div>
	<div class="ls-hero__scrim"></div>

	<div class="wrap ls-hero__inner">
		<div class="ls-hero__copy" data-reveal>
			<span class="ls-eyebrow"><span class="ls-dot"></span> 鶏舎・畜舎の温度・湿度・CO₂を見守る産業用ワイヤレスデバイス</span>
			<h1>環境の変化を見逃さず、<br />飼育<span class="ls-hl">リスク</span>を低減。</h1>
			<p class="ls-lead">
				養鶏IoT・スマート畜産のワイヤレスセンサーが、鶏舎・畜舎の温度・湿度を15分ごとに自動送信。電波が届きにくい場所でもLoRaWANで安定通信し、暑熱ストレスや換気不良の兆候を早期に把握します。鶏や家畜の健康と、安定した飼育管理に貢献します。
			</p>
			<div class="ls-hero__ctas">
				<a href="/contact" class="btn btn--accent btn--lg">無料デモを予約する <span class="material-symbols-rounded">arrow_forward</span></a>
				<span class="ls-note"><span class="material-symbols-rounded">co2</span> CO₂の測定にも対応（オプション）</span>
			</div>
		</div>

		<!-- リアルタイム測定パネル（製品の目印になる要素） -->
		<aside class="ls-panel" data-reveal>
			<div class="ls-panel__head"><span class="ls-panel__pulse"></span> リアルタイム測定</div>
			<ul class="ls-panel__reads">
				<li>
					<span class="material-symbols-rounded fill" style="color:#d9772f">device_thermostat</span>
					<span class="ls-panel__lab">温度</span>
					<span class="ls-panel__val">−40<i>°C</i> 〜 +85<i>°C</i></span>
				</li>
				<li>
					<span class="material-symbols-rounded fill" style="color:#0e9960">humidity_percentage</span>
					<span class="ls-panel__lab">湿度</span>
					<span class="ls-panel__val">0 〜 100<i>%RH</i></span>
				</li>
				<li>
					<span class="material-symbols-rounded fill" style="color:#2c6cb7">co2</span>
					<span class="ls-panel__lab">CO₂ <em>オプション</em></span>
					<span class="ls-panel__val">400 〜 5000<i>ppm</i></span>
				</li>
			</ul>
			<div class="ls-panel__foot">
				<span class="material-symbols-rounded">schedule</span> 15分ごとに自動送信・24時間365日どこからでも
			</div>
		</aside>
	</div>

	<!-- 実績ストリップ -->
	<div class="wrap ls-hero__statwrap">
		<div class="ls-stats" data-reveal>
			<div><b>配線不要</b><span>無線タイプ</span></div>
			<div><b>電源不要</b><span>バッテリーで最長10年稼働</span></div>
			<div><b>堅牢設計</b><span>メンテナンスフリー</span></div>
			<div><b>簡単設置</b><span>置くだけ・すぐ稼働</span></div>
		</div>
	</div>
</section>

<!-- ═══ 環境管理を自動化（写真スプリット） ═══ -->
<section class="section">
	<div class="wrap ls-split">
		<figure class="ls-split__media" data-reveal>
			<img src="/assets/photos/livestock-barn.webp" alt="換気ファンを備えた大規模な鶏舎の内部" />
			<figcaption>鶏舎全体の温度・湿度・CO₂を、まとめて見える化</figcaption>
		</figure>
		<div class="ls-split__body" data-reveal>
			<p class="ls-kicker"><span class="material-symbols-rounded">autorenew</span> 環境管理を自動化</p>
			<h2>毎日の見回りを、データで軽く。</h2>
			<ul class="ls-rows">
				<li>
					<span class="ls-chip"><span class="material-symbols-rounded">schedule</span></span>
					<div>
						<h3>15分ごとに自動記録</h3>
						<p>温度・湿度・CO₂を24時間自動で収集・保存。見回りや手書きによる記録漏れのリスクを抑えます。</p>
					</div>
				</li>
				<li>
					<span class="ls-chip"><span class="material-symbols-rounded fill">notifications_active</span></span>
					<div>
						<h3>異常をすばやく通知</h3>
						<p>設定したしきい値に達すると、メールや現場のパトランプで通知。暑熱や換気異常の早めの対応につなげます。</p>
					</div>
				</li>
				<li>
					<span class="ls-chip"><span class="material-symbols-rounded">smartphone</span></span>
					<div>
						<h3>見回り負担をもっと軽く</h3>
						<p>携帯やパソコンから今の環境データをすばやく確認。現場に行かなくても、変化を把握できます。</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</section>

<!-- ═══ 選ばれる理由（アースカラーのカード） ═══ -->
<section class="section ls-warm">
	<div class="wrap">
		<div class="ls-why__head" data-reveal>
			<p class="ls-kicker"><span class="material-symbols-rounded">verified_user</span> 継続運用を支える仕組み</p>
			<h2>止めない記録、信頼できる測定、届きにくい鶏舎まで。</h2>
			<p class="ls-why__sub">高湿度・粉じんの多い鶏舎でもデータを継続して記録し、測定値の異常や通信断にも備えた設計です。</p>
		</div>
		<div class="ls-why__grid">
			<article class="ls-card" data-reveal="0">
				<span class="ls-card__ic"><span class="material-symbols-rounded">save</span></span>
				<h3>停電や通信断にも対応</h3>
				<p>通信できない間は内部メモリに測定データを保存。復旧後に自動送信し、環境変化の記録の欠損を防ぎます。</p>
			</article>
			<article class="ls-card" data-reveal="1">
				<span class="ls-card__ic"><span class="material-symbols-rounded">fact_check</span></span>
				<h3>スイス製高精度センサー採用</h3>
				<p>温湿度はセンシリオン社SHT40、CO₂はオプションのSCD41を搭載。いずれも認定機関で校正・試験されたデジタルセンサーです。</p>
			</article>
			<article class="ls-card" data-reveal="2">
				<span class="ls-card__ic"><span class="material-symbols-rounded fill">cell_tower</span></span>
				<h3>つながりにくい場所も、簡単設置</h3>
				<p>LoRaWAN通信で、Wi-Fiや携帯の電波が届きにくい鶏舎・畜舎からもデータを安定送信。配線・電源工事は不要です。</p>
			</article>
		</div>
	</div>
</section>

<DoubleSensorSection interval={15} />

<!-- ═══ 導入の現場（現場写真ショーケース） ═══ -->
<section class="section ls-warm">
	<div class="wrap">
		<div class="ls-show__head" data-reveal>
			<p class="ls-kicker"><span class="material-symbols-rounded">photo_camera</span> 導入の現場</p>
			<h2>鶏の生活域に、そのまま。</h2>
			<p class="ls-show__sub">無線・電池式なので、電源や配線を引きにくい鶏舎・畜舎にも工事なしで設置できます。</p>
		</div>
		<div class="ls-showcase" data-reveal>
			<figure class="ls-showcase__lead">
				<img src="/assets/photos/livestock-sensor-install.webp" alt="鶏舎の飼育ラインに設置されたCropWatchセンサー" />
				<figcaption><b>飼育ラインに直接設置</b><span>鶏の生活域の温度・湿度・CO₂をそのまま測定</span></figcaption>
			</figure>
			<figure>
				<img src="/assets/photos/livestock-flock.webp" alt="給餌器のまわりに集まる鶏（ブロイラー）" />
				<figcaption><b>群れの環境を見守る</b><span>暑熱ストレスの兆候を早期に把握</span></figcaption>
			</figure>
			<figure>
				<img src="/assets/photos/livestock-exterior.webp" alt="鶏舎の外観と制御盤・飼料タンク" />
				<figcaption><b>屋外・多拠点にも対応</b><span>離れた鶏舎もまとめて遠隔監視</span></figcaption>
			</figure>
		</div>
	</div>
</section>

<!-- ═══ 校正・認証 ═══ -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="ls-kicker" style="justify-content:center">
				<span class="material-symbols-rounded">workspace_premium</span> 校正・認証
			</p>
			<h2>測定の根拠を、記録と一緒に。</h2>
			<p>
				搭載するセンシリオン社SHT40 / SCD41には、個体ごとのISO/IEC 17025に基づく校正証明書を発行。監査でもそのまま使えます。
			</p>
		</div>
		<div class="badgewall">
			<div class="badgewall__card" data-reveal="0">
				<img src="/assets/badges/iso-iec-17025.png" alt="ISO/IEC 17025 校正" />
				<b>ISO/IEC 17025</b><span>認定校正に基づく証明書</span>
			</div>
			<div class="badgewall__card" data-reveal="1">
				<img src="/assets/badges/nist-traceable.webp" alt="NIST トレーサブル" />
				<b>NISTトレーサブル</b><span>測定のトレーサビリティ</span>
			</div>
			<div class="badgewall__card" data-reveal="2">
				<img src="/assets/badges/HACCP.webp" alt="HACCP対応" />
				<b>HACCP対応</b><span>環境管理記録を効率化</span>
			</div>
			<div class="badgewall__card" data-reveal="3">
				<img src="/assets/badges/ilac-mra.webp" alt="ILAC-MRA認定" />
				<b>ILAC-MRA</b><span>国際相互承認の枠組み</span>
			</div>
		</div>
	</div>
</section>


<!-- ═══ 主な仕様 ═══ -->
<section class="section ls-warm">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="ls-kicker" style="justify-content:center">
				<span class="material-symbols-rounded">tune</span> 主な仕様
			</p>
			<h2>鶏舎・畜舎の長期運用に必要な機能を、標準で。</h2>
		</div>
		<dl class="specs" data-reveal style="max-width:760px;margin-inline:auto">
			<div class="spec-row">
				<dt>測定項目</dt>
				<dd>温度・湿度／CO₂（オプション）</dd>
			</div>
			<div class="spec-row">
				<dt>搭載センサー</dt>
				<dd>センシリオン SHT40 ／ SCD41（CO₂・オプション） *校正証明書付き</dd>
			</div>
			<div class="spec-row">
				<dt>動作温度範囲</dt>
				<dd>-40°C - +85°C</dd>
				<dt>動作湿度範囲</dt>
				<dd>0% - 100% RH</dd>
			</div>
			<div class="spec-row">
				<dt>CO₂測定範囲</dt>
				<dd>400 - 5000 ppm（オプション）</dd>
			</div>
			<div class="spec-row">
				<dt>データ収集</dt>
				<dd>15分ごと／直近2年間分を保存／CSV出力</dd>
			</div>
			<div class="spec-row">
				<dt>通信</dt>
				<dd>LoRaWAN<sup><small>®</small></sup>／通信断時は内部メモリへ保存し、復旧後に自動送信</dd>
			</div>
			<div class="spec-row">
				<dt>電池寿命</dt>
				<dd>最長10年（交換可能）</dd>
			</div>
			<div class="spec-row">
				<dt>堅牢性</dt>
				<dd>コンフォーマルコーティング＋ポッティング処理（高湿度・粉じん対策）</dd>
			</div>
			<div class="spec-row">
				<dt>データ連携</dt>
				<dd>OpenAPI・MCPによる外部システム連携／ユーザー数無制限</dd>
			</div>
		</dl>
	</div>
</section>

<!-- ═══ FAQ ═══ -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="ls-kicker" style="justify-content:center">
				<span class="material-symbols-rounded">quiz</span> よくあるご質問
			</p>
			<h2>畜産・養鶏の環境監視 Q&amp;A</h2>
		</div>
		<div class="faq" data-reveal>
			{#each faq as item}
				<details>
					<summary>{item.q} <span class="material-symbols-rounded">add</span></summary>
					<p>{item.a}</p>
				</details>
			{/each}
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
	/* ══════════════════════════════════════════════════════════
	   Livestock page — warm "earth / on-farm" identity.
	   Shares the site chrome, tokens & body type (same site),
	   but its own hero photography, palette & layout rhythm
	   (different product). Earth accents: #8a5a36 / cream #f7f1ea.
	   ══════════════════════════════════════════════════════════ */

	/* ═══ Hero (photographic backdrop) ═══ */
	.ls-hero {
		position: relative;
		overflow: hidden;
		padding: 56px 0 30px;
	}
	.ls-hero__bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center 42%;
	}
	.ls-hero__scrim {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(
				96deg,
				rgba(22, 13, 6, 0.95) 0%,
				rgba(38, 24, 13, 0.9) 32%,
				rgba(58, 36, 20, 0.62) 60%,
				rgba(58, 36, 20, 0.32) 100%
			),
			linear-gradient(180deg, transparent 52%, rgba(18, 11, 5, 0.62) 100%);
	}
	.ls-hero__inner {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		gap: 32px;
		align-items: center;
	}
	.ls-hero__statwrap {
		position: relative;
		z-index: 1;
	}
	.ls-eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 6px 13px;
		border-radius: 999px;
		background: rgba(255, 240, 224, 0.12);
		border: 1px solid rgba(255, 240, 224, 0.28);
		color: #ffe9d8;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.1em;
	}
	.ls-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #34d399;
		box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.25);
		flex: none;
	}
	.ls-hero__copy h1 {
		margin: 16px 0 0;
		font-size: clamp(1.8rem, 3.6vw, 2.6rem);
		line-height: 1.18;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: #fff;
		text-shadow: 0 2px 18px rgba(0, 0, 0, 0.35);
	}
	.ls-hl {
		color: #34d399;
	}
	.ls-lead {
		margin: 16px 0 0;
		font-size: clamp(0.95rem, 1.1vw, 1rem);
		line-height: 1.85;
		color: rgba(255, 246, 238, 0.94);
		max-width: 46ch;
	}
	.ls-hero__ctas {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 14px;
		margin-top: 24px;
	}
	.ls-note {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--cw-font-mono);
		font-size: 12.5px;
		font-weight: 600;
		color: rgba(255, 246, 238, 0.9);
	}
	.ls-note .material-symbols-rounded {
		font-size: 18px;
	}

	/* live-reading glass panel */
	.ls-panel {
		justify-self: end;
		width: 100%;
		max-width: 340px;
		background: rgba(255, 255, 255, 0.94);
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.6);
		border-radius: 20px;
		padding: 18px 20px;
		box-shadow: 0 30px 55px -24px rgba(0, 0, 0, 0.75);
	}
	.ls-panel__head {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 11.5px;
		font-weight: 800;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #8a5a36;
	}
	.ls-panel__pulse {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #34d399;
		box-shadow: 0 0 0 4px rgba(52, 211, 153, 0.22);
	}
	.ls-panel__reads {
		list-style: none;
		margin: 12px 0 0;
		padding: 0;
	}
	.ls-panel__reads li {
		display: grid;
		grid-template-columns: 26px 1fr auto;
		align-items: center;
		gap: 10px;
		padding: 12px 2px;
		border-top: 1px solid var(--web-border);
	}
	.ls-panel__reads li:first-child {
		border-top: 0;
	}
	.ls-panel__reads .material-symbols-rounded {
		font-size: 22px;
	}
	.ls-panel__lab {
		font-size: 13px;
		font-weight: 700;
		color: var(--web-heading);
	}
	.ls-panel__lab em {
		font-style: normal;
		font-size: 9.5px;
		font-weight: 700;
		color: #b9790a;
		margin-left: 6px;
		padding: 1px 6px;
		border-radius: 6px;
		background: color-mix(in srgb, var(--web-gold) 16%, #fff);
		vertical-align: middle;
	}
	.ls-panel__val {
		font-family: var(--cw-font-mono);
		font-size: 14.5px;
		font-weight: 700;
		color: var(--cw-ink);
		white-space: nowrap;
	}
	.ls-panel__val i {
		font-style: normal;
		font-size: 10.5px;
		color: var(--web-muted);
	}
	.ls-panel__foot {
		display: flex;
		align-items: center;
		gap: 7px;
		margin-top: 6px;
		padding-top: 12px;
		border-top: 1px solid var(--web-border);
		font-size: 11.5px;
		font-weight: 600;
		color: var(--web-muted);
	}
	.ls-panel__foot .material-symbols-rounded {
		font-size: 16px;
		color: #8a5a36;
	}

	/* stats strip */
	.ls-stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		margin-top: 34px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		overflow: hidden;
		background: rgba(18, 11, 5, 0.42);
		backdrop-filter: blur(3px);
	}
	.ls-stats > div {
		padding: 14px 16px;
		text-align: center;
		border-right: 1px solid rgba(255, 255, 255, 0.16);
	}
	.ls-stats > div:last-child {
		border-right: none;
	}
	.ls-stats b {
		display: block;
		font-family: var(--cw-font-mono);
		font-size: clamp(19px, 2.8vw, 25px);
		font-weight: 700;
		color: #fff;
	}
	.ls-stats span {
		font-size: 11px;
		color: rgba(255, 255, 255, 0.74);
		margin-top: 3px;
		display: block;
	}

	/* ═══ Shared earth kicker (replaces the cool .eyebrow--accent) ═══ */
	.ls-kicker {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin: 0;
		font-size: 12.5px;
		font-weight: 800;
		letter-spacing: 0.14em;
		color: #8a5a36;
	}
	.ls-kicker .material-symbols-rounded {
		font-size: 18px;
	}

	/* warm section background */
	.ls-warm {
		background: #f7f1ea;
	}

	/* ═══ Feature split (photo + rows) ═══ */
	.ls-split {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(28px, 5vw, 64px);
		align-items: center;
	}
	.ls-split__media {
		position: relative;
		margin: 0;
		border-radius: 22px;
		overflow: hidden;
		border: 1px solid var(--web-border);
		box-shadow: var(--web-shadow-card);
	}
	.ls-split__media img {
		width: 100%;
		height: clamp(300px, 38vw, 440px);
		object-fit: cover;
		display: block;
	}
	.ls-split__media figcaption {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 30px 18px 14px;
		font-size: 13.5px;
		font-weight: 700;
		color: #fff;
		background: linear-gradient(180deg, transparent, rgba(18, 11, 5, 0.82));
	}
	.ls-split__body h2 {
		margin: 12px 0 0;
		font-size: clamp(24px, 3vw, 34px);
		line-height: 1.4;
	}
	.ls-rows {
		list-style: none;
		margin: 26px 0 0;
		padding: 0;
	}
	.ls-rows li {
		display: grid;
		grid-template-columns: 52px 1fr;
		gap: 16px;
		align-items: start;
		padding: 22px 0;
		border-top: 1px solid var(--web-border);
	}
	.ls-rows li:first-child {
		border-top: 0;
		padding-top: 6px;
	}
	.ls-rows li:last-child {
		padding-bottom: 0;
	}
	.ls-chip {
		flex: none;
		width: 52px;
		height: 52px;
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f0e0cc;
		color: #8a5a36;
	}
	.ls-chip .material-symbols-rounded {
		font-size: 26px;
	}
	.ls-rows h3 {
		font-size: 18px;
		line-height: 1.5;
		color: var(--web-heading);
	}
	.ls-rows p {
		margin: 6px 0 0;
		font-size: 14.5px;
		line-height: 1.8;
		color: var(--web-muted);
	}

	/* ═══ 選ばれる理由 — earth cards ═══ */
	.ls-why__head {
		max-width: 780px;
		margin: 0 0 34px;
	}
	.ls-why__head h2 {
		margin: 12px 0 0;
		font-size: clamp(24px, 3.2vw, 34px);
		line-height: 1.45;
	}
	.ls-why__sub {
		margin: 14px 0 0;
		font-size: 16px;
		line-height: 1.9;
		color: var(--web-muted);
	}
	.ls-why__grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 18px;
	}
	.ls-card {
		position: relative;
		overflow: hidden;
		background: #fff;
		border: 1px solid #e8dccb;
		border-radius: 20px;
		padding: 28px 26px;
		box-shadow: 0 20px 38px -28px rgba(58, 36, 20, 0.55);
		transition:
			transform 0.25s var(--jp-ease),
			box-shadow 0.25s var(--jp-ease);
	}
	.ls-card::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 4px;
		background: #8a5a36;
	}
	.ls-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 26px 46px -26px rgba(58, 36, 20, 0.6);
	}
	.ls-card__ic {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		border-radius: 15px;
		background: #f0e0cc;
		color: #8a5a36;
		margin-bottom: 18px;
	}
	.ls-card__ic .material-symbols-rounded {
		font-size: 28px;
	}
	.ls-card h3 {
		font-size: 19px;
		line-height: 1.5;
		color: var(--web-heading);
	}
	.ls-card p {
		margin: 10px 0 0;
		font-size: 14.5px;
		line-height: 1.8;
		color: var(--web-muted);
	}

	/* ═══ 導入の現場 — bento showcase ═══ */
	.ls-show__head {
		max-width: 780px;
		margin: 0 0 30px;
	}
	.ls-show__head h2 {
		margin: 12px 0 0;
		font-size: clamp(24px, 3.2vw, 34px);
	}
	.ls-show__sub {
		margin: 12px 0 0;
		font-size: 15.5px;
		line-height: 1.85;
		color: var(--web-muted);
	}
	.ls-showcase {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 16px;
		height: clamp(400px, 48vw, 540px);
	}
	.ls-showcase figure {
		position: relative;
		margin: 0;
		border-radius: 18px;
		overflow: hidden;
		border: 1px solid #e8dccb;
		box-shadow: var(--web-shadow-card);
	}
	.ls-showcase__lead {
		grid-row: 1 / span 2;
	}
	.ls-showcase img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.ls-showcase figcaption {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 26px 16px 12px;
		background: linear-gradient(180deg, transparent, rgba(18, 11, 5, 0.86));
	}
	.ls-showcase figcaption b {
		display: block;
		font-size: 14px;
		color: #fff;
	}
	.ls-showcase figcaption span {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.82);
	}

	/* ═══ Responsive ═══ */
	@media (max-width: 900px) {
		.ls-hero {
			padding: 40px 0 26px;
		}
		.ls-hero__inner {
			grid-template-columns: 1fr;
			gap: 24px;
		}
		.ls-panel {
			justify-self: stretch;
			max-width: 420px;
		}
		.ls-hero__scrim {
			background:
				linear-gradient(
					180deg,
					rgba(22, 13, 6, 0.82) 0%,
					rgba(38, 24, 13, 0.72) 50%,
					rgba(30, 19, 10, 0.86) 100%
				);
		}
	}
	@media (max-width: 820px) {
		.ls-split {
			grid-template-columns: 1fr;
			gap: 30px;
		}
		.ls-split__media {
			order: -1;
		}
	}
	@media (max-width: 760px) {
		.ls-showcase {
			grid-template-columns: 1fr;
			grid-template-rows: none;
			height: auto;
		}
		.ls-showcase__lead {
			grid-row: auto;
		}
		.ls-showcase figure {
			height: 240px;
		}
	}
	@media (max-width: 640px) {
		.ls-why__grid {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 600px) {
		.ls-stats {
			grid-template-columns: 1fr 1fr;
		}
		.ls-stats > div:nth-child(2) {
			border-right: none;
		}
		.ls-stats > div:nth-child(1),
		.ls-stats > div:nth-child(2) {
			border-bottom: 1px solid rgba(255, 255, 255, 0.16);
		}
		.ls-rows li {
			grid-template-columns: 44px 1fr;
			gap: 12px;
		}
		.ls-chip {
			width: 44px;
			height: 44px;
			border-radius: 12px;
		}
		.ls-chip .material-symbols-rounded {
			font-size: 22px;
		}
	}
</style>
