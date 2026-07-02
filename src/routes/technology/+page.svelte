<script lang="ts">
import PartsOrigin from '$lib/components/PartsOrigin.svelte';
</script>

<svelte:head>
	<title>技術・設計｜現場に強い、センサー基板のつくり｜CropWatch 日本</title>
	<meta
		name="description"
		content="CropWatch のセンサー基板の設計と技術。ご自分で交換できる電池とセンサー、樹脂で封止した頑丈な基板、厚い壁も通すLoRaWAN、記録を守るFRAMメモリ、機器を見張る「番犬機能」まで。止まらず・届いて・失わない監視の理由をご紹介します。"
	/>
</svelte:head>

<div class="crumb"><div class="wrap crumb__in">
	<a href="/">ホーム</a><span class="material-symbols-rounded">chevron_right</span>
	<b>技術・設計</b>
</div></div>

<!-- ヒーロー -->
<section class="pagehero">
	<div class="wrap pagehero__in" data-reveal>
		<p class="eyebrow"><span class="material-symbols-rounded">developer_board</span> 設計と技術</p>
		<h1>現場に強い理由は、<br><span class="hl">基板の中</span>にあります。</h1>
		<p class="hero__kicker">見えないところにこそ、こだわりを。<span class="u">中身まで、現場のために設計しました。</span></p>
		<p>CropWatch のセンサーは、<b>ご自分で交換できる電池とセンサー</b>、<b>樹脂で丸ごと封止した頑丈な基板</b>、<b>厚い壁も通すLoRaWAN</b>、<b>記録を守るFRAMメモリ</b>、そして機器を見張る<b>「番犬機能」</b>まで——止まらず・届いて・失わない監視のために、細部まで作りこんでいます。</p>
		<div class="hero__ctas">
			<a href="#hardware" class="btn btn--primary btn--lg"><span class="material-symbols-rounded">tune</span> 設計の強みを見る</a>
			<a href="/contact" class="btn btn--ghost btn--lg">相談する</a>
		</div>
		<p class="pagehero__note"><span class="material-symbols-rounded">check_circle</span> 専門用語は使わずに、やさしくご説明します。</p>
	</div>
</section>

<!-- やさしい説明 -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent"><span class="material-symbols-rounded">pets</span> まずはイメージで</p>
			<h2>「番犬」がしていること。</h2>
			<p>むずかしい用語は要りません。番犬（ばんけん）が家を見張る様子を思い浮かべてください。</p>
		</div>
		<div class="boxgrid boxgrid--3">
			<div class="box" data-reveal="0">
				<span class="box__ic box__ic--accent"><span class="material-symbols-rounded">visibility</span></span>
				<h3>① いつも見張る</h3>
				<p>機器は元気なあいだ、番犬に「合図」を送り続けます。番犬はその合図をずっと見守っています。</p>
			</div>
			<div class="box" data-reveal="1">
				<span class="box__ic box__ic--gold"><span class="material-symbols-rounded">notifications_active</span></span>
				<h3>② 合図が止まると気づく</h3>
				<p>機器がフリーズして合図が来なくなると、番犬は「おかしい」とすぐに気づきます。</p>
			</div>
			<div class="box" data-reveal="2">
				<span class="box__ic"><span class="material-symbols-rounded">restart_alt</span></span>
				<h3>③ 自動で起こす</h3>
				<p>番犬が機器を「リセット（再起動）」し、目を覚まさせます。人が駆けつけなくても元どおりに。</p>
			</div>
		</div>
	</div>
</section>

<!-- 図解（添付画像） -->
<section class="section section--soft scroll-pad" id="zukai">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">schema</span> 図解</p>
			<h2>WDT（番犬機能）の動き。</h2>
			<p>正常なときと、異常なとき。番犬がどう判断して機器を守るのかを、1枚にまとめました。</p>
		</div>
		<figure class="wdt-figure" data-reveal style="margin:0">
			<img src="/assets/uploads/WatchDogTimerJPN.png" alt="ウォッチドッグタイマー（WDT）の動作図。MCU正常時は番犬が信号を受け取りOKと判断し、MCU異常時は信号が来ないためリセット信号を出力する様子を示した図解" />
			<figcaption>図：ウィンドウモードでのWDTの動作（正常時／異常時）。MCU＝機器の中の小さなコンピューター、WDT＝番犬の役割。</figcaption>
		</figure>
	</div>
</section>

<!-- なぜ大事か -->
<section class="section section--tight">
	<div class="wrap">
		<div class="callout" data-reveal>
			<span class="callout__ic"><span class="material-symbols-rounded">verified_user</span></span>
			<div>
				<h3>だから、記録に「空白」ができません。</h3>
				<p>監視機器が静かに止まってしまうと、その間の温度は記録されず、検査のときに困ります。CropWatch は番犬機能で自動復旧するうえ、2つのセンサーで二重チェックも行うので、まちがった数値も、抜けもれもない記録が残ります。</p>
			</div>
		</div>
	</div>
</section>

<!-- 他の安心とあわせて -->
<section class="section section--soft section--tight">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">handshake</span> 安心は、重ねて守る</p>
			<h2>番犬機能は、安心の一部です。</h2>
		</div>
		<div class="boxgrid boxgrid--2">
			<a class="box" href="/replacement-sensors" data-reveal="0">
				<span class="box__ic"><span class="material-symbols-rounded">fact_check</span></span>
				<h3>2つのセンサーで二重チェック</h3>
				<p>値が合わないときは記録しない。まちがった数値を残しません。</p>
			</a>
			<a class="box" href="/replacement-sensors" data-reveal="1">
				<span class="box__ic box__ic--accent"><span class="material-symbols-rounded">workspace_premium</span></span>
				<h3>校正証明書つき</h3>
				<p>ISO/IEC 17025 で校正済み。1台ごとに証明書が付きます。</p>
			</a>
		</div>
	</div>
</section>

<!-- だれでも交換できる -->
<section class="section scroll-pad" id="hardware">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent"><span class="material-symbols-rounded">build</span> メンテナンス</p>
			<h2>だれでも、その場で交換。</h2>
			<p>電池もセンサーも、専門業者を呼ばずに、ご自分でかんたんに交換できます。</p>
		</div>
		<div class="boxgrid boxgrid--2">
			<div class="box" data-reveal="0">
				<span class="box__ic box__ic--gold"><span class="material-symbols-rounded">battery_full</span></span>
				<h3>電池は、ご自分で交換できます。</h3>
				<p>寿命がきても、業者を呼ぶ必要はありません。工具いらずで、だれでもかんたんに交換。長寿命なので、交換の回数もごくわずかです。</p>
			</div>
			<div class="box" data-reveal="1">
				<span class="box__ic box__ic--accent"><span class="material-symbols-rounded">cable</span></span>
				<h3>センサーも、かんたん交換。</h3>
				<p>センサー部分だけを、その場で差し替え。1台ごとに校正証明書（ISO/IEC 17025）が付くので、交換後もそのまま検査・監査に使えます。</p>
			</div>
		</div>
	</div>
</section>

<!-- 現場に強い設計 -->
<section class="section section--soft">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">verified_user</span> 現場に強い設計</p>
			<h2>厳しい現場でも、止まらない・届く・失わない。</h2>
			<p>水も、ほこりも、電波の届きにくさも。過酷な現場を想定した、ハードウェア設計です。</p>
		</div>
		<div class="boxgrid boxgrid--3">
			<div class="box" data-reveal="0">
				<span class="box__ic"><span class="material-symbols-rounded">deployed_code</span></span>
				<h3>基板は、樹脂で丸ごと封止。</h3>
				<p>電子基板を樹脂で完全に封止（ポッティング）。ほこり・水・結露・振動に強く、冷凍庫やハウス、鶏舎など、過酷な現場でも安定して動きます。</p>
			</div>
			<div class="box" data-reveal="1">
				<span class="box__ic box__ic--accent"><span class="material-symbols-rounded">cell_tower</span></span>
				<h3>厚い壁も通す、電波（LoRaWAN）。</h3>
				<p>LoRaWANの電波は、Wi-Fiより遠く、壁や床をこえて届きます。冷凍庫の奥や地下、倉庫の奥まった場所など、ほかの通信では届かない現場もカバー。1台の受信機で、広い敷地をまとめて見守れます。</p>
			</div>
			<div class="box" data-reveal="2">
				<span class="box__ic box__ic--gold"><span class="material-symbols-rounded">memory</span></span>
				<h3>FRAMメモリで、記録を守る。</h3>
				<p>電波が一時的に届かないときも、測ったデータは本体のFRAM（強誘電体メモリ）に保存。復旧後にまとめて送るので、記録に空白ができません。書き換えに強く、電池が切れても消えないメモリです。</p>
			</div>
		</div>
	</div>
</section>

<!-- 部品の生産国 -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">public</span> 部品と品質</p>
			<h2>この基板は、世界の確かな部品でできています。</h2>
			<p>用途ごとに最適な部品を、世界から選定。7か国・16メーカーの部品で、CropWatch のセンサー基板は構成されています。</p>
		</div>
		<div data-reveal>
			<PartsOrigin />
		</div>
	</div>
</section>

<!-- クロージング -->
<section class="closing">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold" style="justify-content:center"><span class="material-symbols-rounded">waving_hand</span> ご相談ください</p>
		<h2>「止まらない監視」を、現場で。</h2>
		<p>どんな場所を見守りたいか、お聞かせください。最適なセンサーと通知の設定をご提案します。</p>
		<div class="closing__ctas">
			<a href="/contact" class="btn btn--accent btn--lg">無料デモを予約する</a>
			<a href="/" class="btn btn--outline-light btn--lg">ホームへ戻る</a>
		</div>
	</div>
</section>

<style>
	.pagehero h1 .hl { color: var(--web-primary); }
	.wdt-figure { background: #fff; border: 1px solid var(--web-border); border-radius: 24px; padding: 22px; box-shadow: var(--web-shadow-card); }
	.wdt-figure img { width: 100%; height: auto; border-radius: 14px; }
	.wdt-figure figcaption { text-align: center; font-size: 14px; color: var(--web-muted); margin-top: 16px; }
</style>
