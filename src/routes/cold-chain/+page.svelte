<script lang="ts">
	import DoubleSensorSection from '$lib/components/cold-chain/DoubleSensorSection.svelte';
	import FieldReplacementSection from '$lib/components/cold-chain/FieldReplacementSection.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { faqSchema } from '$lib/seo/schema';
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
		'コールドチェーンの温度監視システム。電池駆動のLoRaWAN®センサーが冷蔵庫・冷凍庫の温度・湿度を10分ごとに自動記録し、スマホやPCから遠隔監視できます。HACCP義務化に対応した温度記録の自動化から監査時の記録提出までを効率化。ISO/IEC 17025校正証明書つき。';

	// 回答内のリンクは信頼できる一次情報（省庁・認定機関・部品メーカー）に限定する。
	const faq = [
		{
			q: '通信が途切れた場合、記録は失われますか？',
			a: 'センサーの内部メモリ（<a class="extlink" href="https://www.infineon.com/ja/products/memories/f-ram-ferroelectric-ram" target="_blank" rel="noopener noreferrer">FeRAM</a>）に測定データを保存します。通信が復旧すると、保存していたデータを自動送信します。'
		},
		{
			q: 'HACCPの義務化に対応できますか？',
			a: 'はい。冷蔵庫・冷凍庫の温度を自動で記録し、<a class="extlink" href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/shokuhin/haccp/index.html" target="_blank" rel="noopener noreferrer">HACCP</a>で求められる温度管理の記録と保存を効率化します。紙の記録や手書き転記をなくし、監査時にもそのまま提出できます。'
		},
		{
			q: '離れた場所から冷蔵庫・冷凍庫の温度を確認できますか？',
			a: 'はい。測定データは<a class="extlink" href="https://lora-alliance.org/" target="_blank" rel="noopener noreferrer">LoRaWAN<sup class="reg">®</sup></a>通信でクラウドに送信され、スマートフォンやPCから遠隔で温度を監視できます。複数拠点の冷蔵庫・冷凍庫もまとめて確認できます。'
		},
		{
			q: '現場で校正や補正を行う必要はありますか？',
			a: '原則として現場での校正や補正は行いません。工場出荷時に校正・検査された<a class="extlink" href="https://sensirion.com/jp" target="_blank" rel="noopener noreferrer">センシリオン社</a>製の検知部を使用し、必要に応じて検知部のみを交換する運用を推奨しています。'
		},
		{
			q: '監査用の記録を出力できますか？',
			a: 'はい。日次・週次レポートの自動送信に加え、直近2年間分のデータをCSVで出力できます。<a class="extlink" href="https://www.jab.or.jp/service/laboratory" target="_blank" rel="noopener noreferrer">ISO/IEC 17025</a>の校正証明書も標準で添付します。'
		}
	];

	// 回答はアコーディオン表示用にHTMLを含むため、JSON-LD（schema.org）には
	// タグを除いたプレーンテキストを渡す。
	const faqPlain = faq.map((f) => ({
		...f,
		a: f.a.replace(/<[^>]+>/g, '')
	}));

	// 業種向けランディングページなのでProduct構造化データは出さない（このページ
	// には価格表示もない）。製品ページ（/replacement-sensors など）と /pricing が
	// Productを持つ。
	const ld = faqSchema(faqPlain);
</script>

<Seo {title} {description} />
<JsonLd data={ld} />

<Breadcrumbs
	items={[{ label: 'ホーム', href: '/' }, { label: '製品' }, { label: '冷蔵・冷凍の監視' }]}
/>

<!-- ═══ ヒーロー（現場写真バックドロップ） ═══ -->
<section class="cc-hero">
	<div
		class="cc-hero__bg"
		style="background-image:url('/assets/photos/coldchain-freezer.webp')"
	></div>
	<div class="cc-hero__scrim"></div>

	<div class="wrap cc-hero__inner">
		<div class="cc-hero__copy" data-reveal>
			<span class="cc-eyebrow"
				><span class="cc-dot"></span> コールドチェーンの温度・湿度を見守る産業用ワイヤレスデバイス</span
			>
			<!-- <h1>10分ごとの記録で、品質トラブルの<span class="cc-hl">リスク</span>を低減</h1> -->
			<h1>
				測る、記録する、残す。<br /><span class="cc-hl">HACCP</span>に沿った温度管理を、<br
				/>すべて自動で。
			</h1>
			<p class="cc-lead">
				バッテリー駆動の<a
					class="extlink"
					href="https://lora-alliance.org/"
					target="_blank"
					rel="noopener noreferrer">LoRaWAN<sup class="reg">®</sup></a
				>デバイスが温度と湿度を24時間自動で記録。WiFiや携帯がつながらない場所でも、安定したデータ送信を実現します。取得したデータは自動でレポート化され、日々の温度管理からHACCP対応、監査時の記録提出までを効率化します。
			</p>
		</div>

		<!-- リアルタイム測定パネル -->
		<aside class="cc-panel" data-reveal>
			<div class="cc-panel__head"><span class="cc-panel__pulse"></span> リアルタイム測定</div>
			<ul class="cc-panel__reads">
				<li>
					<span class="material-symbols-rounded fill" style="color:#0ea5e9">device_thermostat</span>
					<span class="cc-panel__tx">
						<span class="cc-panel__lab">温度</span>
						<span class="cc-panel__note">急速冷凍庫対応</span>
					</span>
					<span class="cc-panel__val">−40<i>°C</i> 〜 +85<i>°C</i></span>
				</li>
				<li>
					<span class="material-symbols-rounded fill" style="color:#0e9960"
						>humidity_percentage</span
					>
					<span class="cc-panel__tx">
						<span class="cc-panel__lab">湿度</span>
						<span class="cc-panel__note">結露環境にも対応</span>
					</span>
					<span class="cc-panel__val">0 〜 100<i>%RH</i></span>
				</li>
			</ul>
			<div class="cc-panel__foot">
				<span class="material-symbols-rounded">schedule</span> 10分ごとに自動記録・24時間365日どこからでも
			</div>
		</aside>
	</div>

	<!-- 実績ストリップ -->
	<div id="header-sub-stat-row" class="wrap cc-hero__statwrap">
		<div class="cc-stats" data-reveal>
			<div><b>負担軽減</b><span>確認・記録を自動化</span></div>
			<div><b>早期対応</b><span>異常をすぐに把握</span></div>
			<div><b>監査支援</b><span>記録をすぐに提出</span></div>
			<div><b>省メンテナンス</b><span>電池交換の手間を削減</span></div>
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
			<div class="box cc-box" data-reveal="0">
				<div class="cc-box__head">
					<span class="box__ic"><span class="material-symbols-rounded">schedule</span></span>
					<h3>10分ごとに自動記録</h3>
				</div>
				<p>
					温度・湿度を24時間自動で収集し、保存。日々の見回りや手書きによる記録漏れのリスクを防ぎます。
				</p>
				<a
					id="download-sample-csv-export"
					class="btn btn--accent btn--lg cc-box__cta"
					href="/assets/downloads/0011223344556677-20260718-0000_to_20260718-1321.csv"
					download="0011223344556677-20260718-0000_to_20260718-1321.csv"
					>CSVサンプル<span class="material-symbols-rounded">csv</span></a
				>
			</div>
			<div class="box cc-box" data-reveal="1">
				<div class="cc-box__head">
					<span class="box__ic box__ic--gold"
						><span class="material-symbols-rounded fill">notifications_active</span></span
					>
					<h3>異常をすばやく通知</h3>
				</div>
				<p>
					設定したしきい値に達すると、メールや現場のパトランプで通知。早めの確認と対応につなげます。
				</p>
				<ul class="cc-alerts">
					<li><span class="material-symbols-rounded">mail</span>メール</li>
					<!-- <li><span class="material-symbols-rounded">chat</span>LINE</li> -->
					<li><span class="material-symbols-rounded">app_badging</span>アプリ内</li>
				</ul>
			</div>
			<div class="box cc-box" data-reveal="2">
				<div class="cc-box__head">
					<span class="box__ic box__ic--accent">
						<span class="material-symbols-rounded">summarize</span>
					</span>
					<h3>レポート作成を効率化</h3>
				</div>
				<p>
					日次・週次レポートを自動送信。保存したデータはCSVでも出力でき、監査や社内報告に活用できます。
				</p>
				<a
					id="download-sample-report"
					class="btn btn--accent btn--lg cc-box__cta"
					href="/assets/downloads/sample_coldchain_report_ja.pdf"
					download="sample_coldchain_report_ja.pdf"
					>レポートサンプル<span class="material-symbols-rounded">download</span></a
				>
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
			<p>
				冷凍設備の厳しい環境でもデータを継続して記録し、測定値の異常や通信断にも備えた設計です。
			</p>
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
					信頼性の高い<a
						class="extlink"
						href="https://sensirion.com/jp"
						target="_blank"
						rel="noopener noreferrer">センシリオン社</a
					>&thinsp;<a
						class="extlink"
						href="https://sensirion.com/jp/products/catalog/SHT43"
						target="_blank"
						rel="noopener noreferrer">SHT43</a
					>と<a
						class="extlink"
						href="https://sensirion.com/jp/products/catalog/SHT40"
						target="_blank"
						rel="noopener noreferrer">SHT40</a
					>をダブルで搭載。いずれも認定機関にて校正後、個別に試験が行われたデジタル温湿度センサーです。
				</p>
			</div>
			<div class="box" data-reveal="2">
				<span class="box__ic box__ic--gold"
					><span class="material-symbols-rounded fill">cell_tower</span></span
				>
				<h3>冷凍庫の奥までつながる</h3>
				<p>
					<a
						class="extlink"
						href="https://lora-alliance.org/"
						target="_blank"
						rel="noopener noreferrer">LoRaWAN<sup class="reg">®</sup></a
					>通信で、Wi-Fiや携帯の電波が届かない厚い壁や冷凍庫内、離れた倉庫からもデータを安定して送信します。
				</p>
			</div>
		</div>
	</div>
</section>

<DoubleSensorSection />

<!-- 導入の現場 -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">image</span> 導入の現場</p>
			<h2>穴あけ不要。センサー本体を庫内に置くだけ。</h2>
			<p>バッテリー式・ワイヤレスなので、電源や配線を引きにくい冷蔵・冷凍設備にも設置できます。</p>
		</div>
		<div class="gallery">
			<figure data-reveal="0">
				<img src="/assets/photos/coldchain-drawer.webp" alt="食品を保管する業務用の冷蔵ドロワー" />
				<figcaption>
					<b>ドロワー冷蔵庫</b><span>引き出し式の冷蔵設備の温度も見える化</span>
				</figcaption>
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
					<b>プレハブ冷凍庫</b><span>配線工事なしでセンサーを設置</span>
				</figcaption>
			</figure>
		</div>
	</div>

	<div class="wrap gallery-cta" data-reveal>
		<a href="/testimonials" class="btn btn--accent btn--lg"
			>導入事例を見る <span class="material-symbols-rounded">arrow_forward</span></a
		>
	</div>
</section>

<FieldReplacementSection />

<!-- 校正・認証 -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent">
				<span class="material-symbols-rounded">workspace_premium</span> 校正・認証
			</p>
			<h2>測定の根拠を、記録と一緒に残せます。</h2>
			<p>
				<a
					class="extlink"
					href="https://sensirion.com/jp/products/catalog/SHT43"
					target="_blank"
					rel="noopener noreferrer">SHT43</a
				>には個体ごとの<a
					class="extlink"
					href="https://www.jab.or.jp/service/laboratory"
					target="_blank"
					rel="noopener noreferrer">ISO/IEC 17025</a
				>に基づく3点温度校正証明書を発行。
			</p>
		</div>
		<div class="badgewall">
			<a
				class="badgewall__card"
				data-reveal="0"
				href="https://www.jab.or.jp/service/laboratory"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src="/assets/badges/iso-iec-17025.png" alt="ISO/IEC 17025 校正" />
				<b>ISO/IEC 17025</b><span>認定校正に基づく証明書</span>
			</a>
			<a
				class="badgewall__card"
				data-reveal="1"
				href="https://www.nist.gov/calibrations"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src="/assets/badges/nist-traceable.webp" alt="NIST トレーサブル" />
				<b>NISTトレーサブル</b><span>測定のトレーサビリティ</span>
			</a>
			<a
				class="badgewall__card"
				data-reveal="2"
				href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/shokuhin/haccp/index.html"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src="/assets/badges/HACCP.webp" alt="HACCP対応" />
				<b>HACCP対応</b><span>温度管理記録を効率化</span>
			</a>
			<a
				class="badgewall__card"
				data-reveal="3"
				href="https://ilac.org/ilac-mra-and-signatories/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src="/assets/badges/ilac-mra.webp" alt="ILAC-MRA認定" />
				<b>ILAC-MRA</b><span>国際相互承認の枠組み</span>
			</a>
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
				<dd>
					<a
						class="extlink"
						href="https://sensirion.com/jp"
						target="_blank"
						rel="noopener noreferrer">センシリオン</a
					>
					<a
						class="extlink"
						href="https://sensirion.com/jp/products/catalog/SHT40"
						target="_blank"
						rel="noopener noreferrer">SHT40</a
					>
					/
					<a
						class="extlink"
						href="https://sensirion.com/jp/products/catalog/SHT43"
						target="_blank"
						rel="noopener noreferrer">SHT43</a
					>
					*校正証明書付き
				</dd>
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
				<dd>
					<a
						class="extlink"
						href="https://lora-alliance.org/"
						target="_blank"
						rel="noopener noreferrer">LoRaWAN<sup class="reg">®</sup></a
					><sup><small>®</small></sup>／通信断時は内部メモリへ保存し、復旧後に自動送信
				</dd>
			</div>
			<div class="spec-row">
				<dt>電池寿命</dt>
				<dd>
					最長10年（交換可能）
					<br />
					<small
						>※バッテリー寿命は、使用環境や測定・送信間隔、通信状況などによって異なります。</small
					>
				</dd>
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
			{#each faq as item}
				<details>
					<summary>{item.q} <span class="material-symbols-rounded">add</span></summary>
					<p>{@html item.a}</p>
				</details>
			{/each}
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
			監視したい冷蔵庫・冷凍庫・倉庫の様子をお聞かせください。最適なセンサーと通知の設定をご提案します。
		</p>
		<div class="closing__ctas">
			<a href="/contact" class="btn btn--accent btn--lg">問い合わせ</a>
			<a href="/replacement-sensors" class="btn btn--outline-light btn--lg">センサーを見る</a>
		</div>
	</div>
</section>

<style>
	/* ══════════════════════════════════════════════════════════
	   Cold-chain page — cool "walk-in freezer" identity.
	   Shares the site chrome, tokens & body type (same site) with
	   its own photographic hero + navy/ice palette (different
	   product). Sibling of the livestock page's warm treatment.
	   ══════════════════════════════════════════════════════════ */

	.gallery-cta {
		margin-top: 28px;
		text-align: center;
	}

	/* ═══ 記録・通知・レポート cards ═══ */
	.cc-box {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.cc-box__head {
		display: flex;
		align-items: center;
		gap: 14px;
	}
	.cc-box__head .box__ic {
		margin-bottom: 0;
		flex: none;
	}
	/* Grow the copy so CTAs / chips sit level across the three cards. */
	.cc-box p {
		flex: 1;
	}
	.cc-box__cta {
		margin-top: 22px;
	}
	.cc-alerts {
		list-style: none;
		display: flex;
		flex-wrap: nowrap;
		gap: 8px;
		margin: 22px 0 0;
		padding: 0;
	}
	.cc-alerts li {
		display: inline-flex;
		align-items: center;
		white-space: nowrap;
		gap: 6px;
		padding: 7px 11px;
		border-radius: 999px;
		border: 1px solid var(--web-border);
		background: var(--web-primary-soft);
		font-size: 13px;
		font-weight: 700;
		color: var(--web-heading);
	}
	.cc-alerts .material-symbols-rounded {
		font-size: 18px;
		color: var(--web-primary);
	}

	/* ═══ Hero (photographic backdrop) ═══ */
	.cc-hero {
		position: relative;
		overflow: hidden;
		padding: 56px 0 30px;
	}
	.cc-hero__bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center 45%;
	}
	.cc-hero__scrim {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(
				96deg,
				rgba(6, 12, 26, 0.94) 0%,
				rgba(11, 23, 48, 0.9) 32%,
				rgba(23, 61, 110, 0.6) 60%,
				rgba(23, 61, 110, 0.32) 100%
			),
			linear-gradient(180deg, transparent 52%, rgba(4, 9, 20, 0.62) 100%);
	}
	.cc-hero__inner {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		gap: 32px;
		align-items: center;
	}
	.cc-hero__statwrap {
		position: relative;
		z-index: 1;
	}
	.cc-eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 6px 13px;
		border-radius: 999px;
		background: rgba(220, 232, 255, 0.12);
		border: 1px solid rgba(220, 232, 255, 0.28);
		color: #dbe8ff;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.1em;
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
		font-size: clamp(1.8rem, 3.6vw, 2.6rem);
		line-height: 1.18;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: #fff;
		text-shadow: 0 2px 18px rgba(0, 0, 0, 0.35);
	}
	.cc-hl {
		color: #34d399;
	}
	.cc-lead {
		margin: 16px 0 0;
		font-size: clamp(0.95rem, 1.1vw, 1rem);
		line-height: 1.85;
		color: rgba(226, 234, 250, 0.94);
		max-width: 46ch;
	}
	/* live-reading glass panel */
	.cc-panel {
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
	.cc-panel__head {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 11.5px;
		font-weight: 800;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #245a9c;
	}
	.cc-panel__pulse {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #34d399;
		box-shadow: 0 0 0 4px rgba(52, 211, 153, 0.22);
	}
	.cc-panel__reads {
		list-style: none;
		margin: 12px 0 0;
		padding: 0;
	}
	.cc-panel__reads li {
		display: grid;
		grid-template-columns: 26px 1fr auto;
		align-items: center;
		gap: 10px;
		padding: 13px 2px;
		border-top: 1px solid var(--web-border);
	}
	.cc-panel__reads li:first-child {
		border-top: 0;
	}
	.cc-panel__reads .material-symbols-rounded {
		font-size: 22px;
	}
	.cc-panel__tx {
		display: flex;
		flex-direction: column;
		line-height: 1.25;
	}
	.cc-panel__lab {
		font-size: 13px;
		font-weight: 700;
		color: var(--web-heading);
	}
	.cc-panel__note {
		font-size: 10.5px;
		font-weight: 600;
		color: var(--web-accent);
		margin-top: 2px;
	}
	.cc-panel__val {
		font-family: var(--cw-font-mono);
		font-size: 14.5px;
		font-weight: 700;
		color: var(--cw-ink);
		white-space: nowrap;
	}
	.cc-panel__val i {
		font-style: normal;
		font-size: 10.5px;
		color: var(--web-muted);
	}
	.cc-panel__foot {
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
	.cc-panel__foot .material-symbols-rounded {
		font-size: 16px;
		color: #245a9c;
	}

	/* stats strip (light frosted glass, over the photo — matches .cc-panel) */
	.cc-stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		margin-top: 34px;
		border: 1px solid rgba(255, 255, 255, 0.6);
		border-radius: 16px;
		overflow: hidden;
		background: rgba(255, 255, 255, 0.92);
		backdrop-filter: blur(8px);
		box-shadow: 0 24px 45px -24px rgba(0, 0, 0, 0.6);
	}
	.cc-stats > * {
		padding: 14px 16px;
		text-align: center;
		border-right: 1px solid var(--web-border);
	}
	.cc-stats > :last-child {
		border-right: none;
	}
	.cc-stats b {
		display: block;
		font-family: var(--cw-font-mono);
		font-size: clamp(19px, 2.8vw, 25px);
		font-weight: 700;
		color: var(--web-heading);
	}
	.cc-stats span {
		font-size: 11px;
		color: var(--web-muted);
		margin-top: 3px;
		display: block;
	}

	/* ═══ Responsive ═══ */
	@media (max-width: 900px) {
		.cc-hero {
			padding: 40px 0 26px;
		}
		.cc-hero__inner {
			grid-template-columns: 1fr;
			gap: 24px;
		}
		.cc-panel {
			justify-self: stretch;
			max-width: 420px;
		}
		.cc-hero__scrim {
			background: linear-gradient(
				180deg,
				rgba(6, 12, 26, 0.84) 0%,
				rgba(11, 23, 48, 0.74) 50%,
				rgba(6, 12, 26, 0.88) 100%
			);
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
			border-bottom: 1px solid var(--web-border);
		}
	}
</style>
