<script lang="ts">
	import ColumnArticle from '$lib/components/ColumnArticle.svelte';
	import { columnBySlug } from '$lib/content/columns';

	const column = columnBySlug('haccp-ondo-kiroku-wifi-nashi')!;
</script>

<ColumnArticle {column}>
	<p class="col-lead">
		できます。センサーそのものにWi-Fiが必要ない方式を選べば、厨房の奥や冷凍庫の中でも温度記録を自動化できます。ここでは、HACCPの温度記録を残す5つの方法を比較し、Wi-Fiがない現場に向いている方法を整理します。
	</p>

	<h2>HACCPで残すべき温度記録</h2>
	<p>
		HACCPに沿った衛生管理（小規模事業者は「HACCPの考え方を取り入れた衛生管理」）では、冷蔵庫・冷凍庫の温度を決めた頻度で確認し、記録を保存することが求められます。業種別の手引書によって細かな違いはありますが、一般的には次の項目を残します。
	</p>
	<ul>
		<li>日付と確認した時刻</li>
		<li>冷蔵庫・冷凍庫ごとの温度</li>
		<li>確認した人</li>
		<li>基準を外れたときに行った対応（改善措置）</li>
	</ul>
	<p>
		このうち温度と時刻は機械で自動化できますが、<strong>異常時に何をしたかの記録は人が残す必要があります</strong>。自動化で手間が減る分、異常への対応に時間を使えるようになります。
	</p>

	<h2>Wi-Fiがない現場で困ること</h2>
	<p>
		温度センサーの多くはWi-Fiでデータを送りますが、飲食店の厨房、食品工場、倉庫では次のような問題が起きがちです。
	</p>
	<ul>
		<li>事務所にはWi-Fiがあっても、厨房の奥や倉庫までは届かない</li>
		<li>冷凍庫の金属の壁にさえぎられ、扉を閉めると接続が切れる</li>
		<li>ルーターの交換やパスワード変更のたびに、全センサーの再設定が必要になる</li>
		<li>店舗のネットワークに機器をつなぐことを、本部や情報システム部門が認めていない</li>
	</ul>

	<h2>温度記録を残す5つの方法を比較</h2>
	<div class="col-table">
		<table>
			<thead>
				<tr>
					<th scope="col">方法</th>
					<th scope="col">記録</th>
					<th scope="col">遠隔確認・アラート</th>
					<th scope="col">Wi-Fi</th>
					<th scope="col">主な注意点</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">手書きのチェック表</th>
					<td>人が記入</td>
					<td>なし</td>
					<td>不要</td>
					<td>記録漏れやまとめ書きが起きやすい。夜間・休日は空白になる</td>
				</tr>
				<tr>
					<th scope="row">USB型の温度データロガー</th>
					<td>自動</td>
					<td>なし</td>
					<td>不要</td>
					<td>回収してPCで読み出すまで、異常に気づけない</td>
				</tr>
				<tr>
					<th scope="row">Wi-Fi型の温度センサー</th>
					<td>自動</td>
					<td>あり</td>
					<td>必要</td>
					<td>冷凍庫や厨房の奥で接続が切れやすい。ネットワーク変更で再設定が必要</td>
				</tr>
				<tr>
					<th scope="row">LTE（携帯回線）内蔵センサー</th>
					<td>自動</td>
					<td>あり</td>
					<td>不要</td>
					<td>1台ごとに通信費がかかることが多い。地下や冷凍庫の中では電波が弱い場合がある</td>
				</tr>
				<tr>
					<th scope="row">LoRaWAN®センサー＋受信機</th>
					<td>自動</td>
					<td>あり</td>
					<td>不要</td>
					<td>受信機（ゲートウェイ）の設置と、受信機をインターネットにつなぐ回線が1つ必要</td>
				</tr>
			</tbody>
		</table>
	</div>

	<h2>Wi-Fiがない現場に向いている方法</h2>
	<p>
		記録を残すだけなら、手書きやUSB型のデータロガーでも対応できます。ただし、冷凍庫の故障や扉の閉め忘れに<strong>その場で気づく</strong>には、遠隔確認とアラートのある方式が必要です。
	</p>
	<p>
		Wi-Fiが届かない現場では、LTE内蔵センサーか、<a class="extlink" href="https://lora-alliance.org/" target="_blank" rel="noopener noreferrer">LoRaWAN<sup class="reg">®</sup></a>センサーが候補になります。センサーの台数が少なければLTE型も選択肢ですが、冷蔵庫・冷凍庫が何台もある場合は、受信機1台で多くのセンサーをまとめられるLoRaWAN<sup class="reg">®</sup>型のほうが、通信費と管理の手間を抑えやすくなります。920MHz帯の電波は金属の壁や建物の奥にも回り込みやすく、冷凍庫の中のセンサーにも向いています。
	</p>

	<h2>導入前に確認したいこと</h2>
	<ul>
		<li><strong>受信機の置き場所と回線</strong>：受信機を設置する場所と、インターネットにつなぐ回線（有線LANなど）があるか。</li>
		<li><strong>通信が途切れたときの記録</strong>：センサー本体に記録を残し、復旧後に送り直せるか。</li>
		<li><strong>監査で使える出力</strong>：CSVやレポートで記録を出せるか、校正証明書が付くか。</li>
		<li><strong>通知先</strong>：メール・プッシュ通知・SMSなど、夜間に確実に気づける手段があるか。</li>
	</ul>

	<h2>よくある質問</h2>
	<h3>Wi-Fiがまったくない店舗でも使えますか？</h3>
	<p>
		LoRaWAN<sup class="reg">®</sup>型の場合、センサー側にWi-Fiは不要ですが、受信機をインターネットにつなぐ回線は1つ必要です。回線の用意が難しい場合は、導入前にご相談ください。
	</p>
	<h3>自動記録だけでHACCPの記録として足りますか？</h3>
	<p>
		温度と時刻の記録は自動化できますが、基準を外れたときに行った対応は人が記録して残す必要があります。お使いの業種別手引書の様式もあわせて確認しましょう。
	</p>
	<h3>USB型のデータロガーとの違いは何ですか？</h3>
	<p>
		USB型は記録を本体にためておき、あとで回収して確認します。無線で送るタイプは記録がすぐにクラウドに届くため、異常に気づいた時点で対応できます。
	</p>

	<div class="col-note">
		<p>
			CropWatchは、電池駆動のLoRaWAN<sup class="reg">®</sup>センサーが冷蔵庫・冷凍庫の温度を10分ごとに自動記録します。センサー側の配線工事やWi-Fi設定は不要で、通信が途切れても本体のメモリに記録を残し、復旧後に自動で送信。直近2年間分の記録をCSVで出力でき、ISO/IEC 17025の校正証明書も付属します。費用は<a href="/pricing">料金ページ</a>でシミュレーションできます。
		</p>
	</div>
	<p>
		HACCPの基本は<a href="/column/haccp-gimuka">HACCP義務化とは？</a>、監視の仕組みは<a href="/cold-chain">コールドチェーンの温度監視</a>のページをご覧ください。
	</p>
</ColumnArticle>
