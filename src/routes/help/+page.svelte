<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { faqSchema } from '$lib/seo/schema';

	const title = 'ヘルプ・使い方ガイド｜温度監視センサーのトラブル解決｜CropWatch 日本';
	const description =
		'CropWatch（クロップウォッチ）の使い方ガイドとよくあるトラブルの解決方法。センサーの設置、通知の設定、記録のダウンロード、センサーの交換を動画つきで解説します。';

	const faq = [
		{
			q: 'センサーがオフラインになっている／データが届かない',
			a: '受信機（ゲートウェイ）とセンサーの通信が途切れている可能性があります。受信機の電源ランプを確認し、センサーと受信機の距離や間に厚い金属の壁がないかを確認します。センサー前面のボタンを長押しして再起動し、電池残量が少ない場合は交換してください。'
		},
		{
			q: '通知（アラート）が届かない',
			a: '対象デバイスに通知ルールが設定されているか、送り先メールアドレスが正しいか（迷惑メールフォルダを含む）を確認します。スマホの通知をオンにし、遅延時間が長すぎないか（例：60分を10分に短縮）も確認してください。'
		},
		{
			q: '電池残量が少ないと表示される',
			a: '低温環境では電池の消耗が早まることがあります。アプリで電池残量を確認し（20%以下で交換の目安）、指定の電池（同じ型番）に向きへ注意して交換します。交換後に表示が回復するか確認してください。'
		},
		{
			q: '温度の数値がおかしい・実際とずれている',
			a: 'センサーが吹き出し口や扉の近くに置かれていないか確認し、扉の開閉直後は数分待ってから確認します。本体に霜や水滴が付いていないかも確認してください。各センサーには校正証明書があり、大きくずれる場合はサポートへご連絡ください。'
		},
		{
			q: 'アプリにログインできない',
			a: 'メールアドレスとパスワードに誤りがないか確認し、ログイン画面の「パスワードをお忘れですか？」から再設定できます。インターネット接続を確認してページを再読み込みし、別のブラウザや最新版のアプリでもお試しください。'
		}
	];

	const ld = faqSchema(faq);

	// Video facade: load the YouTube iframe only when the user clicks play.
	// Set each .ytbox's data-yt="VIDEO_ID" to wire a real video.
	function playVideo(event: Event) {
		const box = event.currentTarget as HTMLElement;
		const id = box.getAttribute('data-yt');
		if (!id) return; // placeholder — no video wired yet
		const ifr = document.createElement('iframe');
		ifr.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
		ifr.title = 'CropWatch 使い方動画';
		ifr.allow =
			'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
		ifr.allowFullscreen = true;
		ifr.loading = 'lazy';
		box.innerHTML = '';
		box.appendChild(ifr);
	}
	function onKey(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			playVideo(event);
		}
	}
</script>

<Seo {title} {description} />
<JsonLd data={ld} />

<Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: 'ヘルプ・使い方ガイド' }]} />

<section class="pagehero">
	<div class="wrap pagehero__in" data-reveal>
		<p class="eyebrow"><span class="material-symbols-rounded">help</span> ヘルプ・使い方ガイド</p>
		<h1>困ったときは、ここから。</h1>
		<p class="hero__kicker">
			設置から記録のダウンロードまで。<span class="u">動画を見ながら、その場で解決。</span>
		</p>
		<p>
			よく使う操作は<b>動画つきの手順</b>で、トラブルは<b>原因別の解決方法</b
			>でご案内します。それでも解決しないときは、サポートにお気軽にご連絡ください。
		</p>
		<div class="help-jump">
			<a href="#howto"
				><span class="material-symbols-rounded">play_circle</span> 使い方ガイド
				<span class="cnt">4</span></a
			>
			<a href="#troubleshooting"
				><span class="material-symbols-rounded">build</span> トラブルシューティング
				<span class="cnt">5</span></a
			>
		</div>
	</div>
</section>

<!-- ═══ HOW TO ═══ -->
<section class="section section--soft anchor" id="howto">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">play_circle</span> 使い方ガイド</p>
			<h2>やりたいことから、選んでください。</h2>
			<p>各ステップは動画でもご確認いただけます。再生ボタンを押すと動画が始まります。</p>
		</div>

		<div class="howto">
			<!-- 1: 設置 -->
			<article class="ht" data-reveal>
				<span class="ht__num"><span class="material-symbols-rounded">sensors</span> GUIDE 01</span>
				<h3>センサーを設置する</h3>
				<div class="ht__media">
					<div
						class="ytbox"
						data-yt=""
						role="button"
						tabindex="0"
						aria-label="動画を再生：センサーの設置"
						onclick={playVideo}
						onkeydown={onKey}
					>
						<div class="ytbox__poster">
							<span class="ytbox__play"
								><span class="material-symbols-rounded fill">play_arrow</span></span
							>
							<span class="ytbox__label">動画で見る：センサーの設置</span>
							<span class="ytbox__dur">02:14</span>
						</div>
					</div>
				</div>
				<p class="ht__desc">
					冷蔵庫・倉庫・ハウス・鶏舎など、見守りたい場所にセンサーを取り付けます。工事は不要。数分で完了します。
				</p>
				<ol class="ht__steps">
					<li>取り付ける場所の<b>ほこりや水分を拭き取り</b>ます。</li>
					<li>背面のマグネット、または付属の両面テープで<b>しっかり固定</b>します。</li>
					<li>センサー前面のボタンを<b>長押しして電源を入れます</b>（ランプが点滅）。</li>
					<li>
						アプリの<b>「デバイスを追加」</b>からQRコードを読み取り、設置場所の名前をつけます。
					</li>
				</ol>
			</article>

			<!-- 2: 通知設定 -->
			<article class="ht" data-reveal>
				<span class="ht__num"
					><span class="material-symbols-rounded">notifications_active</span> GUIDE 02</span
				>
				<h3>通知（アラート）を設定する</h3>
				<div class="ht__media">
					<div
						class="ytbox"
						data-yt=""
						role="button"
						tabindex="0"
						aria-label="動画を再生：通知の設定"
						onclick={playVideo}
						onkeydown={onKey}
					>
						<div class="ytbox__poster">
							<span class="ytbox__play"
								><span class="material-symbols-rounded fill">play_arrow</span></span
							>
							<span class="ytbox__label">動画で見る：通知の設定</span>
							<span class="ytbox__dur">03:08</span>
						</div>
					</div>
				</div>
				<p class="ht__desc">
					温度が決めた範囲を外れたときに、メール・アプリ通知ですぐに知らせます。誤報を防ぐ遅延時間も設定できます。
				</p>
				<ol class="ht__steps">
					<li>アプリで対象のデバイスを開き、<b>「通知ルール」</b>を選びます。</li>
					<li><b>上限・下限の温度</b>（例：−15 ℃〜−25 ℃）を入力します。</li>
					<li>すぐに鳴らさないための<b>遅延時間</b>（例：10分）を設定します。</li>
					<li>通知の<b>送り先</b>（自分・スタッフ・複数人）を追加して保存します。</li>
				</ol>
			</article>

			<!-- 3: 記録ダウンロード -->
			<article class="ht" data-reveal>
				<span class="ht__num"><span class="material-symbols-rounded">download</span> GUIDE 03</span>
				<h3>温度記録（レポート）をダウンロードする</h3>
				<div class="ht__media">
					<div
						class="ytbox"
						data-yt=""
						role="button"
						tabindex="0"
						aria-label="動画を再生：記録のダウンロード"
						onclick={playVideo}
						onkeydown={onKey}
					>
						<div class="ytbox__poster">
							<span class="ytbox__play"
								><span class="material-symbols-rounded fill">play_arrow</span></span
							>
							<span class="ytbox__label">動画で見る：記録のダウンロード</span>
							<span class="ytbox__dur">01:52</span>
						</div>
					</div>
				</div>
				<p class="ht__desc">
					保健所の検査やHACCPの記録に。期間を選んで、CSV・PDFでそのまま提出できる形で書き出せます。
				</p>
				<ol class="ht__steps">
					<li>メニューの<b>「レポート」</b>を開きます。</li>
					<li>対象の<b>デバイスと期間</b>（今日・今週・任意の日付）を選びます。</li>
					<li>形式を<b>CSV または PDF</b>から選びます。</li>
					<li><b>「ダウンロード」</b>を押すと、すぐに保存できます。</li>
				</ol>
			</article>

			<!-- 4: センサー交換 -->
			<article class="ht" data-reveal>
				<span class="ht__num"><span class="material-symbols-rounded">cable</span> GUIDE 04</span>
				<h3>センサーを自分で交換する</h3>
				<div class="ht__media">
					<div
						class="ytbox"
						data-yt=""
						role="button"
						tabindex="0"
						aria-label="動画を再生：センサーの交換"
						onclick={playVideo}
						onkeydown={onKey}
					>
						<div class="ytbox__poster">
							<span class="ytbox__play"
								><span class="material-symbols-rounded fill">play_arrow</span></span
							>
							<span class="ytbox__label">動画で見る：センサーの交換</span>
							<span class="ytbox__dur">02:40</span>
						</div>
					</div>
				</div>
				<p class="ht__desc">
					交換用センサーは校正証明書つき。古いセンサーを外して新しいものに付け替えるだけ。記録はそのまま引き継がれます。
				</p>
				<ol class="ht__steps">
					<li>アプリで対象のデバイスを開き、<b>「センサーを交換」</b>を選びます。</li>
					<li>古いセンサーを<b>受信機から取り外し</b>ます。</li>
					<li>新しいセンサーの<b>QRコードを読み取り</b>ます。</li>
					<li>表示される<b>校正証明書（ISO/IEC 17025）</b>を確認して完了です。</li>
				</ol>
			</article>
		</div>
	</div>
</section>

<!-- ═══ TROUBLESHOOTING ═══ -->
<section class="section anchor" id="troubleshooting">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">
				<span class="material-symbols-rounded">build</span> トラブルシューティング
			</p>
			<h2>よくあるトラブルと、その直し方。</h2>
			<p>症状をタップすると、確認する順番に解決方法が開きます。</p>
		</div>

		<div class="ts" data-reveal>
			<details>
				<summary>
					<span class="ts__ic"><span class="material-symbols-rounded">wifi_off</span></span>
					センサーがオフラインになっている／データが届かない
					<span class="ts__chev material-symbols-rounded">expand_more</span>
				</summary>
				<div class="ts__body">
					<p>
						受信機（ゲートウェイ）とセンサーの通信が途切れている可能性があります。次の順に確認してください。
					</p>
					<ul class="fixes">
						<li>
							<span class="material-symbols-rounded">check_circle</span><span
								><b>受信機の電源</b>が入っているか、電源ランプを確認します。</span
							>
						</li>
						<li>
							<span class="material-symbols-rounded">check_circle</span><span
								>センサーと受信機の<b>距離が離れすぎていないか</b
								>、間に厚い金属の壁がないかを確認します。</span
							>
						</li>
						<li>
							<span class="material-symbols-rounded">check_circle</span><span
								>センサー前面のボタンを<b>長押しして再起動</b
								>し、ランプが点滅するか確認します。</span
							>
						</li>
						<li>
							<span class="material-symbols-rounded">check_circle</span><span
								>電池残量が<b>少ない場合は交換</b>します（下の項目を参照）。</span
							>
						</li>
					</ul>
					<p class="ts__more">
						<span class="material-symbols-rounded">info</span><span
							>数分待っても復旧しない場合は <a href="/contact">サポート</a> へご連絡ください。受信機の交換手配も承ります。</span
						>
					</p>
				</div>
			</details>

			<details>
				<summary>
					<span class="ts__ic"><span class="material-symbols-rounded">notifications_off</span></span
					>
					通知（アラート）が届かない
					<span class="ts__chev material-symbols-rounded">expand_more</span>
				</summary>
				<div class="ts__body">
					<p>通知ルールや送信先の設定を確認します。</p>
					<ul class="fixes">
						<li>
							<span class="material-symbols-rounded">check_circle</span><span
								>対象デバイスに<b>通知ルールが設定されているか</b>を確認します。</span
							>
						</li>
						<li>
							<span class="material-symbols-rounded">check_circle</span><span
								>通知の<b>送り先メールアドレス</b
								>が正しいか、迷惑メールフォルダに入っていないか確認します。</span
							>
						</li>
						<li>
							<span class="material-symbols-rounded">check_circle</span><span
								>スマホの<b>通知をオン</b>にし、アプリの通知許可を確認します。</span
							>
						</li>
						<li>
							<span class="material-symbols-rounded">check_circle</span><span
								><b>遅延時間が長すぎないか</b>確認します（例：60分→10分に短縮）。</span
							>
						</li>
					</ul>
				</div>
			</details>

			<details>
				<summary>
					<span class="ts__ic"><span class="material-symbols-rounded">battery_alert</span></span>
					電池残量が少ないと表示される
					<span class="ts__chev material-symbols-rounded">expand_more</span>
				</summary>
				<div class="ts__body">
					<p>センサーの電池は長持ちしますが、低温環境では消耗が早まることがあります。</p>
					<ul class="fixes">
						<li>
							<span class="material-symbols-rounded">check_circle</span><span
								>アプリの<b>電池残量</b>を確認します（20%以下で交換の目安）。</span
							>
						</li>
						<li>
							<span class="material-symbols-rounded">check_circle</span><span
								>指定の<b>電池（同じ型番）</b>に交換します。向きにご注意ください。</span
							>
						</li>
						<li>
							<span class="material-symbols-rounded">check_circle</span><span
								>交換後、アプリの表示が<b>回復するか</b>を確認します。</span
							>
						</li>
					</ul>
					<p class="ts__more">
						<span class="material-symbols-rounded">info</span><span
							>交換用の電池・センサーは <a href="/replacement-sensors">交換用センサー</a> のページからご注文いただけます。</span
						>
					</p>
				</div>
			</details>

			<details>
				<summary>
					<span class="ts__ic"><span class="material-symbols-rounded">thermostat</span></span>
					温度の数値がおかしい・実際とずれている
					<span class="ts__chev material-symbols-rounded">expand_more</span>
				</summary>
				<div class="ts__body">
					<p>設置場所や環境の影響で、一時的にずれて見えることがあります。</p>
					<ul class="fixes">
						<li>
							<span class="material-symbols-rounded">check_circle</span><span
								>センサーが<b>吹き出し口や扉の近く</b
								>に置かれていないか確認します（場所を少し移動）。</span
							>
						</li>
						<li>
							<span class="material-symbols-rounded">check_circle</span><span
								>扉の開閉直後は数値が動くため、<b>数分待って</b>から確認します。</span
							>
						</li>
						<li>
							<span class="material-symbols-rounded">check_circle</span><span
								>センサー本体に<b>霜や水滴</b>が付いていないか確認します。</span
							>
						</li>
						<li>
							<span class="material-symbols-rounded">check_circle</span><span
								>各センサーには<b>校正証明書（±0.3 ℃）</b
								>があります。大きくずれる場合はサポートへ。</span
							>
						</li>
					</ul>
				</div>
			</details>

			<details>
				<summary>
					<span class="ts__ic"><span class="material-symbols-rounded">lock</span></span>
					アプリにログインできない
					<span class="ts__chev material-symbols-rounded">expand_more</span>
				</summary>
				<div class="ts__body">
					<p>ログイン情報や接続を確認します。</p>
					<ul class="fixes">
						<li>
							<span class="material-symbols-rounded">check_circle</span><span
								><b>メールアドレスとパスワード</b>に誤りがないか確認します。</span
							>
						</li>
						<li>
							<span class="material-symbols-rounded">check_circle</span><span
								>ログイン画面の<b>「パスワードをお忘れですか？」</b>から再設定します。</span
							>
						</li>
						<li>
							<span class="material-symbols-rounded">check_circle</span><span
								>インターネット接続を確認し、<b>ページを再読み込み</b>します。</span
							>
						</li>
						<li>
							<span class="material-symbols-rounded">check_circle</span><span
								>別のブラウザ、または最新版のアプリで<b>お試しください</b>。</span
							>
						</li>
					</ul>
				</div>
			</details>
		</div>
	</div>
</section>

<section class="closing">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold" style="justify-content:center">
			<span class="material-symbols-rounded">support_agent</span> まだ解決しないときは
		</p>
		<h2>サポートが、すぐにお手伝いします。</h2>
		<p>ご利用中のお客さまは support@cropwatch.co.jp へ。設置や設定のご相談も、お気軽にどうぞ。</p>
		<div class="closing__ctas">
			<a href="mailto:support@cropwatch.co.jp" class="btn btn--accent btn--lg">サポートに連絡する</a
			>
			<a href="/contact" class="btn btn--outline-light btn--lg">お問い合わせ</a>
		</div>
	</div>
</section>

<style>
	/* ── Section anchor offset (fixed header) ───────────────── */
	.anchor {
		scroll-margin-top: 110px;
	}

	/* ── Jump tabs ──────────────────────────────────────────── */
	.help-jump {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 26px;
	}
	.help-jump a {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		padding: 12px 20px;
		border-radius: 999px;
		background: #fff;
		border: 1px solid var(--web-border);
		box-shadow: var(--web-shadow-card);
		font-size: 14.5px;
		font-weight: 700;
		color: var(--web-heading);
		transition:
			transform 0.2s var(--jp-ease),
			border-color 0.2s var(--jp-ease);
	}
	.help-jump a:hover {
		transform: translateY(-2px);
		border-color: var(--web-primary);
	}
	.help-jump a .material-symbols-rounded {
		color: var(--web-primary);
		font-size: 20px;
	}
	.help-jump a span.cnt {
		color: var(--web-muted);
		font-weight: 600;
	}

	/* ── How-to items ───────────────────────────────────────── */
	.howto {
		display: grid;
		grid-template-columns: 1fr;
		gap: 28px;
	}
	.ht {
		display: flex;
		flex-direction: column;
		background: #fff;
		border: 1px solid var(--web-border);
		border-radius: 24px;
		padding: 30px;
		box-shadow: var(--web-shadow-card);
	}
	.ht__num {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0.04em;
		color: var(--web-primary);
		background: color-mix(in srgb, var(--web-primary) 9%, transparent);
		border-radius: 999px;
		padding: 5px 13px;
		align-self: flex-start;
	}
	.ht h3 {
		font-size: clamp(19px, 2vw, 22px);
		line-height: 1.5;
		margin: 15px 0 0;
	}
	.ht__media {
		margin: 18px 0 0;
	}
	.ht__desc {
		font-size: 14.5px;
		color: var(--web-muted);
		line-height: 1.9;
		margin: 18px 0 0;
	}
	.ht__steps {
		list-style: none;
		counter-reset: s;
		margin: 18px 0 0;
		padding: 0;
		display: grid;
		gap: 12px;
	}
	.ht__steps li {
		counter-increment: s;
		position: relative;
		padding-left: 42px;
		font-size: 14.5px;
		line-height: 1.7;
		color: var(--web-text);
	}
	.ht__steps li::before {
		content: counter(s);
		position: absolute;
		left: 0;
		top: -1px;
		width: 28px;
		height: 28px;
		border-radius: 9px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-family: 'JetBrains Mono', monospace;
		font-size: 13px;
		font-weight: 700;
		color: #fff;
		background: linear-gradient(180deg, var(--cw-sapphire-500), var(--cw-sapphire-700));
	}
	.ht__steps li b {
		color: var(--web-heading);
		font-weight: 700;
	}

	/* ── Video facade (loads YouTube only on click) ─────────── */
	.ytbox {
		position: relative;
		aspect-ratio: 16/9;
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid var(--web-border);
		background: var(--cw-ink);
		cursor: pointer;
	}
	.ytbox :global(iframe) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}
	.ytbox__poster {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 14px;
		background:
			radial-gradient(circle at 50% 22%, rgba(44, 108, 183, 0.55), transparent 62%),
			linear-gradient(160deg, #102345, #0b1730);
		color: #fff;
		text-align: center;
		padding: 24px;
		transition: opacity 0.25s var(--jp-ease);
	}
	.ytbox__play {
		width: 66px;
		height: 66px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.96);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
		transition: transform 0.2s var(--jp-ease);
	}
	.ytbox:hover .ytbox__play {
		transform: scale(1.08);
	}
	.ytbox__play .material-symbols-rounded {
		font-size: 38px;
		color: var(--web-primary);
		margin-left: 3px;
	}
	.ytbox__label {
		font-size: 13.5px;
		font-weight: 700;
		letter-spacing: 0.02em;
		opacity: 0.92;
	}
	.ytbox__dur {
		font-family: 'JetBrains Mono', monospace;
		font-size: 12px;
		opacity: 0.7;
	}

	/* ── Troubleshooting ────────────────────────────────────── */
	.ts {
		max-width: 880px;
		margin-inline: auto;
		display: grid;
		gap: 14px;
	}
	.ts details {
		background: #fff;
		border: 1px solid var(--web-border);
		border-radius: 16px;
		padding: 4px 26px;
		box-shadow: var(--web-shadow-card);
	}
	.ts details[open] {
		border-color: color-mix(in srgb, var(--web-primary) 35%, var(--web-border));
	}
	.ts summary {
		display: flex;
		align-items: center;
		gap: 15px;
		cursor: pointer;
		list-style: none;
		padding: 22px 0;
		font-size: 16.5px;
		font-weight: 700;
		color: var(--web-heading);
	}
	.ts summary::-webkit-details-marker {
		display: none;
	}
	.ts summary .ts__ic {
		flex: none;
		width: 40px;
		height: 40px;
		border-radius: 11px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--web-gold) 16%, transparent);
		color: #b07908;
	}
	.ts summary .ts__ic .material-symbols-rounded {
		font-size: 22px;
	}
	.ts summary .ts__chev {
		margin-left: auto;
		flex: none;
		color: var(--web-primary);
		transition: transform 0.2s var(--jp-ease);
	}
	.ts details[open] summary .ts__chev {
		transform: rotate(180deg);
	}
	.ts__body {
		padding: 0 0 24px 55px;
	}
	.ts__body > p {
		font-size: 14px;
		color: var(--web-muted);
		margin: 0 0 14px;
		line-height: 1.85;
	}
	.fixes {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 11px;
	}
	.fixes li {
		display: flex;
		gap: 11px;
		font-size: 14.5px;
		line-height: 1.75;
		color: var(--web-text);
	}
	.fixes li .material-symbols-rounded {
		flex: none;
		color: var(--web-accent);
		font-size: 20px;
		margin-top: 1px;
	}
	.fixes li b {
		color: var(--web-heading);
		font-weight: 700;
	}
	.ts__more {
		margin: 16px 0 0;
		padding: 14px 16px;
		border-radius: 12px;
		background: var(--web-bg-soft);
		font-size: 13.5px;
		color: var(--web-muted);
		line-height: 1.8;
		display: flex;
		gap: 10px;
		align-items: flex-start;
	}
	.ts__more .material-symbols-rounded {
		flex: none;
		color: var(--web-primary);
		font-size: 19px;
		margin-top: 1px;
	}
	.ts__more a {
		color: var(--web-primary);
		font-weight: 600;
	}

	/* Phone = 1 col (base). Tablet portrait = 2, landscape = 3, desktop = full-width 4. */
	@media (min-width: 600px) {
		.howto {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 900px) {
		.howto {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	@media (min-width: 1200px) {
		.howto {
			grid-template-columns: repeat(4, 1fr);
			gap: 30px;
			width: 100vw;
			max-width: 100vw;
			margin-left: calc(50% - 50vw);
			padding-inline: max(var(--jp-pad), 5vw);
		}
	}
	@media (max-width: 820px) {
		.ht {
			padding: 24px;
		}
		.ts__body {
			padding-left: 0;
		}
	}
</style>
