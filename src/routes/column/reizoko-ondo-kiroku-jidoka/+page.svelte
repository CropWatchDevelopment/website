<script lang="ts">
	import ColumnArticle from '$lib/components/ColumnArticle.svelte';
	import { columnBySlug } from '$lib/content/columns';

	const column = columnBySlug('reizoko-ondo-kiroku-jidoka')!;
</script>

<ColumnArticle {column}>
	<p class="col-lead">
		冷蔵庫・冷凍庫の温度チェックを、毎日手書きで記録していませんか。IoTの温度センサーと温度データロガーを使えば、温度記録は自動化できます。仕組みと選び方、導入の流れを解説します。
	</p>

	<h2>手書き記録の課題</h2>
	<p>
		決まった時間に温度計を見て紙に書く運用は、忙しい時間帯には後回しになりがちです。記録漏れや、あとでまとめて書く「まとめ書き」が起きると、記録の信頼性が下がります。夜間や休日の温度変化、冷蔵庫の故障にも気づきにくいという弱点があります。
	</p>

	<h2>温度記録を自動化する仕組み</h2>
	<p>
		自動化の基本は、<strong>温度センサー</strong>と<strong>温度データロガー</strong>、そしてデータを集めるクラウドの組み合わせです。冷蔵庫・冷凍庫に置いたセンサーが一定間隔で温度を測り、データを自動で記録・保存します。設定した範囲を外れると、メールやアラートで知らせます。
	</p>
	<ul>
		<li>センサーが温度を自動で測定し、記録する</li>
		<li>データはクラウドに保存され、スマホやPCから遠隔監視できる</li>
		<li>異常な温度を検知したら、すぐに通知が届く</li>
	</ul>

	<h2>選び方のポイント</h2>
	<p>温度監視システムを選ぶときは、次の点を確認しましょう。</p>
	<ul>
		<li><strong>測定精度</strong>：記録の信頼性を左右します。校正証明書の有無も確認します。</li>
		<li><strong>遠隔監視とアラート</strong>：離れた場所から確認でき、異常時にすぐ通知が届くか。</li>
		<li><strong>通信方式</strong>：冷凍庫の奥や厚い壁でも電波が届くか（<a class="extlink" href="https://lora-alliance.org/" target="_blank" rel="noopener noreferrer">LoRaWAN</a>は長距離に強い）。</li>
		<li><strong>電池寿命とメンテナンス</strong>：配線工事が不要か、電池がどれくらい持つか。</li>
	</ul>

	<h2>導入の流れ</h2>
	<p>
		多くのシステムは、センサーを置いてアプリに登録するだけで記録が始まります。工事や複雑な設定は不要です。まずは温度管理が重要な冷蔵庫・冷凍庫から、1台ずつ導入するのがおすすめです。
	</p>
	<div class="col-note">
		<p>
			CropWatchは、電池駆動のワイヤレスセンサーが冷蔵庫・冷凍庫の温度を10分ごとに自動記録。冷凍庫の奥まで<a class="extlink" href="https://lora-alliance.org/" target="_blank" rel="noopener noreferrer">LoRaWAN</a>で安定送信し、遠隔監視とアラートで記録漏れをなくします。
		</p>
	</div>
	<p>
		くわしくは<a href="/cold-chain">コールドチェーンの温度監視</a>のページをご覧ください。
	</p>
</ColumnArticle>
