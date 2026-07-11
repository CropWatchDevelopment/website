<script lang="ts">
	import DoubleSensorSection from '$lib/components/cold-chain/DoubleSensorSection.svelte';
	import FieldReplacementSection from '$lib/components/cold-chain/FieldReplacementSection.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { breadcrumbSchema, faqSchema, productSchema } from '$lib/seo/schema';
	import RelatedLinks from '$lib/components/RelatedLinks.svelte';

	const related = [
		{ href: '/livestock', label: 'スマート畜産・養鶏', sub: '鶏舎・畜舎の温度監視' },
		{ href: '/agriculture', label: 'スマート農業・ハウス', sub: 'ハウス・露地・土壌の環境監視' },
		{ href: '/column/haccp-gimuka', label: 'HACCP義務化とは？', sub: 'コラム' },
		{ href: '/column/cold-chain-toha', label: 'コールドチェーンとは？', sub: 'コラム' }
	];

	const title =
		'コールドチェーン温度監視システム｜冷蔵庫・冷凍庫の遠隔温度監視とHACCP自動記録｜CropWatch 日本';
	const description =
		'コールドチェーンの温度監視システム。電池駆動のLoRaWANセンサーが冷蔵庫・冷凍庫の温度・湿度を10分ごとに自動記録し、スマホやPCから遠隔監視できます。HACCP義務化に対応した温度記録の自動化から監査時の記録提出までを効率化。ISO/IEC 17025校正証明書つき。';

	const faq = [
		{
			q: '通信が途切れた場合、記録は失われますか？',
			a: 'センサーの内部メモリに測定データを保存します。通信が復旧すると、保存していたデータを自動送信します。'
		},
		{
			q: 'HACCPの義務化に対応できますか？',
			a: 'はい。冷蔵庫・冷凍庫の温度を自動で記録し、HACCPで求められる温度管理の記録と保存を効率化します。紙の記録や手書き転記をなくし、監査時にもそのまま提出できます。'
		},
		{
			q: '離れた場所から冷蔵庫・冷凍庫の温度を確認できますか？',
			a: 'はい。測定データはクラウドに送信され、スマートフォンやPCから遠隔で温度を監視できます。複数拠点の冷蔵庫・冷凍庫もまとめて確認できます。'
		},
		{
			q: '現場で校正や補正を行う必要はありますか？',
			a: '原則として現場での校正や補正は行いません。工場出荷時に校正・検査された検知部を使用し、必要に応じて検知部のみを交換する運用を推奨しています。'
		},
		{
			q: '監査用の記録を出力できますか？',
			a: 'はい。日次・週次レポートの自動送信に加え、直近2年間分のデータをCSVで出力できます。校正証明書も標準で添付します。'
		}
	];

	const ld = [
		breadcrumbSchema([
			{ name: 'ホーム', path: '/' },
			{ name: '冷蔵・冷凍の監視', path: '/cold-chain' }
		]),
		faqSchema(faq),
		productSchema({
			name: 'CropWatch 冷蔵・冷凍向け 温度・湿度監視センサー',
			description:
				'コールドチェーン向けの電池駆動LoRaWAN温度・湿度センサー。冷蔵庫・冷凍庫の温度を10分ごとに自動記録し、遠隔監視とHACCP対応の温度記録を実現するクラウド温度監視システムです。',
			image: 'https://cropwatch.co.jp/assets/imagery/device-side-view.webp',
			category: '温度監視システム'
		})
	];
</script>

<Seo {title} {description} />
<JsonLd data={ld} />

<div class="crumb"><div class="wrap crumb__in">
	<a href="/">ホーム</a><span class="material-symbols-rounded">chevron_right</span>
	<span>製品</span><span class="material-symbols-rounded">chevron_right</span>
	<b>冷蔵・冷凍の監視</b>
</div></div>

<!-- ═══ ヒーロー ═══ -->
<section class="cc-hero">
	<div class="wrap cc-hero__grid">
		<div class="cc-hero__copy" data-reveal>
			<span class="cc-eyebrow"><span class="cc-dot"></span> コールドチェーンの温度・湿度を見守る産業用ワイヤレスデバイス</span>
			<h1>10分ごとの記録で、<br>品質トラブルの<span class="cc-hl">リスク</span>を低減</h1>
			<p class="cc-lead">
				バッテリー駆動のLoRaWAN®デバイスが温度と湿度を24時間自動で記録。WiFiや携帯がつながらない場所でも、安定したデータ送信を実現します。取得したデータは自動でレポート化され、日々の温度管理からHACCP対応、監査時の記録提出までを効率化します。
			</p>
			<div class="cc-hero__ctas">
				<a href="/contact" class="btn btn--accent btn--lg">通信テストを予約する<span class="material-symbols-rounded">arrow_forward</span></a>
			</div>
		</div>

		<div class="cc-hero__media" data-reveal>
			<div class="cc-media-top">
				<div class="cc-reads">
					<div class="cc-read">
						<span class="material-symbols-rounded fill cc-read__ic" style="color:#0ea5e9">device_thermostat</span>
						<div class="cc-read__tx">
							<span class="cc-read__lab">測定温度</span>
							<span class="cc-read__val">−40<i>°C</i> – +85<i>°C</i></span>
							<span class="cc-read__sub">急速冷凍庫対応</span>
						</div>
					</div>
					<div class="cc-read">
						<span class="material-symbols-rounded fill cc-read__ic" style="color:#0e9960">humidity_percentage</span>
						<div class="cc-read__tx">
							<span class="cc-read__lab">測定湿度</span>
							<span class="cc-read__val">0<i>%RH</i> – 100<i>%RH</i></span>
							<span class="cc-read__sub">結露環境にも対応</span>
						</div>
					</div>
				</div>
				<img src="/assets/imagery/device-side-view.webp" alt="CropWatch 温度・湿度センサー" class="cc-device" />
			</div>

			<!-- どのデバイスからでも — cross-device graphic (matches CropWatch TH flyer) -->
			<figure class="cc-anydevice">
				<img
					src="/assets/imagery/multi-device.svg"
					alt="スマホ・タブレット・パソコンで確認"
					class="cc-anydevice__img"
					id="cc-anydevice__img"
				/>
				<figcaption class="cc-anydevice__cap">
					スマホ・タブレット・パソコン。どのデバイスからでも<br />
					<b>24時間365日</b>いつでもどこからでも確認できます。
				</figcaption>
			</figure>
		</div>
	</div>

	<!-- 実績ストリップ -->
	<div class="wrap">
		<div class="cc-stats" data-reveal>
			<div><b>配線不要</b><span>無線タイプ</span></div>
			<div><b>電源不要</b><span>最長10年バッテリー稼働</span></div>
			<div><b>センサー<sup>x2</sup></b><span>データ整合性の自動検証</span></div>
			<a href="#double-sensor" aria-label="交差検証の詳細を見る">
				<b>工事不要</b><span>穴あけ不要</span>
			</a>
		</div>
	</div>
</section>

<!-- 記録・通知・レポート -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent">
				<span class="material-symbols-rounded">autorenew</span> 温度管理を自動化
			</p>
			<h2>毎日の記録から監査対応まで</h2>
			<p>手書きや転記に使っていた時間を減らし、異常の把握と記録の確認をスムーズにします。</p>
		</div>
		<div class="boxgrid boxgrid--3">
			<div class="box" data-reveal="0">
				<span class="box__ic"><span class="material-symbols-rounded">schedule</span></span>
				<h3>10分ごとに自動記録</h3>
				<p>
					温度・湿度を24時間自動で収集し、保存。日々の見回りや手書きによる記録漏れのリスクを抑えます。
				</p>
			</div>
			<div class="box" data-reveal="1">
				<span class="box__ic box__ic--gold"
					><span class="material-symbols-rounded fill">notifications_active</span></span
				>
				<h3>異常をすばやく通知</h3>
				<p>
					設定したしきい値に達すると、メールや現場のパトランプで通知。早めの確認と対応につなげます。
				</p>
			</div>
			<div class="box" data-reveal="2">
				<span class="box__ic box__ic--accent"
					><span class="material-symbols-rounded">summarize</span></span
				>
				<h3>レポート作成を効率化</h3>
				<p>
					日次・週次レポートを自動送信。保存したデータはCSVでも出力でき、監査や社内報告に活用できます。
				</p>
			</div>
		</div>
	</div>
</section>

<!-- 選ばれる理由 -->
<section class="section section--soft">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent">
				<span class="material-symbols-rounded">verified_user</span> 継続運用を支える仕組み
			</p>
			<h2>止めない記録、信頼できる測定、届きにくい場所まで確実につなぐ</h2>
			<p>冷凍設備の厳しい環境でもデータを継続して記録し、測定値の異常や通信断にも備えた設計です。</p>
		</div>
		<div class="boxgrid boxgrid--3">
			<div class="box" data-reveal="0">
				<span class="box__ic box__ic--accent"
					><span class="material-symbols-rounded">save</span></span
				>
				<h3>停電や通信断にも対応</h3>
				<p>
					通信できない間は内部メモリに測定データを保存。復旧後に自動送信し、記録の欠損を防ぎます。
				</p>
			</div>
			<div class="box" data-reveal="1">
				<span class="box__ic"><span class="material-symbols-rounded">fact_check</span></span>
				<h3>スイス製高精度センサー採用</h3>
				<p>
					信頼性の高いセンシリオン社SHT43とSHT40をダブルで搭載。いずれも認定機関にて校正後、個別に試験が行われたデジタル温湿度センサーです。				</p>
			</div>
			<div class="box" data-reveal="2">
				<span class="box__ic box__ic--gold"
					><span class="material-symbols-rounded fill">cell_tower</span></span
				>
				<h3>冷凍庫の奥までつながる</h3>
				<p>LoRaWAN通信で、Wi-Fiや携帯の電波が届かない厚い壁や冷凍庫内、離れた倉庫からもデータを安定して送信します。</p>
			</div>
		</div>
	</div>
</section>

<DoubleSensorSection />

<FieldReplacementSection />

<!-- 導入の現場 -->
<section class="section section--soft">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">image</span> 導入の現場</p>
			<h2>温度を守る場所に、工事なしで設置</h2>
			<p>電池式・ワイヤレスなので、電源や配線を引きにくい冷蔵・冷凍設備にも設置できます。</p>
		</div>
		<div class="gallery">
			<figure data-reveal="0">
				<img src="/assets/photos/coldchain-freezer.webp" alt="食品を保管する業務用冷凍庫" />
				<figcaption><b>業務用冷凍庫</b><span>低温環境の温度・湿度を継続監視</span></figcaption>
			</figure>
			<figure data-reveal="1">
				<img src="/assets/photos/coldchain-fridge.webp" alt="食品を保管する業務用冷蔵庫" />
				<figcaption><b>業務用冷蔵庫</b><span>日々の記録と異常通知を自動化</span></figcaption>
			</figure>
			<figure data-reveal="2">
				<img
					src="/assets/photos/coldchain-door.webp"
					alt="冷蔵・冷凍設備の出入口に設置されたCropWatchセンサー"
				/>
				<figcaption>
					<b>冷蔵・冷凍設備の出入口</b><span>配線工事なしでセンサーを設置</span>
				</figcaption>
			</figure>
		</div>
	</div>
</section>

<!-- 校正・認証 -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent">
				<span class="material-symbols-rounded">workspace_premium</span> 校正・認証
			</p>
			<h2>測定の根拠を、記録と一緒に残せます。</h2>
			<p>
				SHT43には個体ごとのISO/IEC 17025に基づく3点温度校正証明書を発行。
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
				<b>HACCP対応</b><span>温度管理記録を効率化</span>
			</div>
			<div class="badgewall__card" data-reveal="3">
				<img src="/assets/badges/ilac-mra.webp" alt="ILAC-MRA認定" />
				<b>ILAC-MRA</b><span>国際相互承認の枠組み</span>
			</div>
		</div>
	</div>
</section>

<!-- 主な仕様 -->
<section class="section section--soft">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">tune</span> 主な仕様</p>
			<h2>長期運用に必要な機能を、標準で。</h2>
		</div>
		<dl class="specs" data-reveal style="max-width:760px;margin-inline:auto">
			<div class="spec-row">
				<dt>測定</dt>
				<dd>温度・湿度</dd>
			</div>
			<div class="spec-row">
				<dt>搭載センサー</dt>
				<dd>センシリオン SHT40 / SHT43 *校正証明書付き</dd>
			</div>
			<div class="spec-row">
				<dt>動作温度範囲</dt>
				<dd>-40°C - +85°C</dd>
				<dt>動作湿度範囲</dt>
				<dd>0% - 100% RH (結露)</dd>
			</div>
			<div class="spec-row">
				<dt>データ収集</dt>
				<dd>10分ごと／直近2年間分を保存／CSV出力</dd>
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
				<dt>データ連携</dt>
				<dd>OpenAPI・MCPによる外部システム連携／ユーザー数無制限</dd>
			</div>
		</dl>
	</div>
</section>

<!-- FAQ -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">quiz</span> よくあるご質問</p>
			<h2>冷蔵・冷凍の温度監視 Q&amp;A</h2>
		</div>
		<div class="faq" data-reveal>
			<details>
				<summary
					>通信が途切れた場合、記録は失われますか？ <span class="material-symbols-rounded">add</span
					></summary
				>
				<p>
					センサーの内部メモリに測定データを保存します。通信が復旧すると、保存していたデータを自動送信します。
				</p>
			</details>
			<details>
				<summary
					>HACCPの義務化に対応できますか？ <span class="material-symbols-rounded">add</span
					></summary
				>
				<p>
					はい。冷蔵庫・冷凍庫の温度を自動で記録し、HACCPで求められる温度管理の記録と保存を効率化します。紙の記録や手書き転記をなくし、監査時にもそのまま提出できます。
				</p>
			</details>
			<details>
				<summary
					>離れた場所から冷蔵庫・冷凍庫の温度を確認できますか？ <span class="material-symbols-rounded"
						>add</span
					></summary
				>
				<p>
					はい。測定データはクラウドに送信され、スマートフォンやPCから遠隔で温度を監視できます。複数拠点の冷蔵庫・冷凍庫もまとめて確認できます。
				</p>
			</details>
			<details>
				<summary
					>現場で校正や補正を行う必要はありますか？ <span class="material-symbols-rounded">add</span
					></summary
				>
				<p>
					原則として現場での校正や補正は行いません。工場出荷時に校正・検査された検知部を使用し、必要に応じて検知部のみを交換する運用を推奨しています。
				</p>
			</details>
			<details>
				<summary
					>監査用の記録を出力できますか？ <span class="material-symbols-rounded">add</span></summary
				>
				<p>
					はい。日次・週次レポートの自動送信に加え、直近2年間分のデータをCSVで出力できます。校正証明書も標準で添付します。
				</p>
			</details>
		</div>
	</div>
</section>

<RelatedLinks links={related} />

<!-- クロージング -->
<section class="closing">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold" style="justify-content:center">
			<span class="material-symbols-rounded">waving_hand</span> まずはお気軽に
		</p>
		<h2>冷蔵・冷凍設備の温度管理を自動化しませんか?</h2>
		<p>
			監視した冷蔵庫・冷凍庫・倉庫の様子をお聞かせください。最適なセンサーと通知の設定をご提案します。
		</p>
		<div class="closing__ctas">
			<a href="/contact" class="btn btn--accent btn--lg">問い合わせ</a>
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
		/* bottom-align so the CTA button and the multi-device caption share a baseline */
		align-items: end;
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
		font-size: 15px;
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
	/* device + floating reading card */
	.cc-hero__media {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 24px;
		min-height: 240px;
	}
	/* area 2 — device (rotated, left-aligned) + floating reading cards (top-right) */
	.cc-media-top {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		min-height: 150px;
		padding-top: 18px;
	}
	.cc-device {
		width: 100%;
		max-width: 208px;
		margin-left: 6px;
		transform: rotate(-12deg);
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

	/* area 1 — "どのデバイスからでも" cross-device graphic */
	.cc-anydevice {
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		text-align: center;
	}
	.cc-anydevice__img {
		width: 100%;
		max-width: 230px;
		height: auto;
		filter: drop-shadow(0 14px 22px rgba(0, 0, 0, 0.4));
	}
	.cc-anydevice__cap {
		font-size: 13px;
		line-height: 1.85;
		color: rgba(231, 236, 255, 0.82);
	}
	.cc-anydevice__cap b {
		color: #34d399;
		font-weight: 800;
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
		border: 1px solid var(--cw-emerald-300);
		border-radius: 16px;
		overflow: hidden;
		background: var(--cw-emerald-50);
		box-shadow: 0 18px 40px -28px rgba(4, 57, 42, 0.8);
	}
	.cc-stats > * {
		padding: 14px 16px;
		text-align: center;
		border-right: 1px solid var(--cw-emerald-200);
	}
	.cc-stats > :last-child {
		border-right: none;
	}
	.cc-stats > a {
		transition:
			background-color 180ms var(--jp-ease),
			box-shadow 180ms var(--jp-ease);
	}
	.cc-stats > a:hover {
		background: var(--cw-emerald-100);
	}
	.cc-stats > a:focus-visible {
		outline: 3px solid var(--cw-emerald-600);
		outline-offset: -4px;
		box-shadow: inset 0 0 0 1px var(--cw-emerald-50);
	}
	.cc-stats b {
		display: block;
		font-family: var(--cw-font-mono);
		font-size: clamp(20px, 3vw, 26px);
		font-weight: 700;
		color: var(--cw-emerald-900);
	}
	.cc-stats span {
		font-size: 11px;
		font-weight: 600;
		color: var(--cw-emerald-800);
		margin-top: 3px;
		display: block;
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
			gap: 18px;
		}
		.cc-media-top {
			min-height: 0;
			padding-top: 0;
			justify-content: flex-start;
			gap: 14px;
			flex-wrap: wrap;
		}
		.cc-device {
			max-width: 140px;
			transform: rotate(-8deg);
		}
		.cc-reads {
			position: static;
			flex-direction: row;
			flex-wrap: wrap;
		}
		.cc-anydevice {
			align-items: flex-start;
			text-align: left;
		}
	}
	@media (max-width: 600px) {
		.cc-stats {
			grid-template-columns: 1fr 1fr;
		}
		.cc-stats > :nth-child(2) {
			border-right: none;
		}
		.cc-stats > :nth-child(1),
		.cc-stats > :nth-child(2) {
			border-bottom: 1px solid var(--cw-emerald-200);
		}
	}
</style>
