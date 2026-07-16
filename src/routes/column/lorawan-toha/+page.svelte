<script lang="ts">
	import ColumnArticle from '$lib/components/ColumnArticle.svelte';
	import { columnBySlug } from '$lib/content/columns';

	const column = columnBySlug('lorawan-toha')!;
</script>

<ColumnArticle {column}>
	<p class="col-lead">
		<a class="extlink" href="https://lora-alliance.org/" target="_blank" rel="noopener noreferrer">LoRaWAN</a>（ローラワン）は、IoT向けの無線通信規格のひとつです。「長距離」「省電力」という特長から、農業や畜産の現場での環境監視に適しています。仕組みと使い方を分かりやすく解説します。
	</p>

	<h2>LoRaWANとは</h2>
	<p>
		<a class="extlink" href="https://lora-alliance.org/" target="_blank" rel="noopener noreferrer">LoRaWAN</a>は、少ないデータを遠くまで、少ない電力で送ることに特化した無線通信規格です。日本では免許のいらない920MHz帯（サブギガ帯）を使い、見通しのよい環境では数kmから10km程度の通信が可能です。Wi-Fiや携帯回線とは違い、<strong>電波が遠くまで届き、電池が長持ちする</strong>点が大きな特長です。
	</p>

	<h2>LoRaWANの特長</h2>
	<ul>
		<li><strong>長距離</strong>：1台の受信機（ゲートウェイ）で広い範囲をカバーできる</li>
		<li><strong>省電力</strong>：電池でも数年から10年近く動作する製品がある</li>
		<li><strong>免許不要</strong>：920MHz帯を利用し、通信料（携帯回線）もかからない</li>
		<li><strong>障害物に強い</strong>：厚い壁や冷凍庫の奥など、電波が届きにくい場所にも届きやすい</li>
	</ul>

	<h2>農業・畜産での使い方</h2>
	<p>
		これらの特長は、電源や通信環境が整っていない現場で特に活きます。農業では、ハウスや離れた畑、露地の温度・湿度・CO₂・土壌の状態を、1台の受信機でまとめて監視できます。畜産では、長い鶏舎や畜舎の温度・湿度を端から端まで見える化できます。いずれも<strong>配線工事なし</strong>で、必要な場所に置くだけで導入できます。
	</p>

	<h2>CropWatchのLoRaWAN活用</h2>
	<p>
		CropWatchのセンサーは<a class="extlink" href="https://lora-alliance.org/" target="_blank" rel="noopener noreferrer">LoRaWAN</a>に対応し、電波が届きにくい過酷な環境でも安定してデータを送信します。電池は最長10年稼働し、通信が途切れても本体メモリに記録を残すため、データの欠損を防ぎます。
	</p>
	<div class="col-note">
		<p>
			止まらず・届いて・失わない。CropWatchが厳しい現場で使われる理由は、通信と基板の設計にあります。
		</p>
	</div>
	<p>
		くわしくは<a href="/technology">技術・設計</a>のページをご覧ください。
	</p>
</ColumnArticle>
