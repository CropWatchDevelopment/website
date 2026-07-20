<script lang="ts">
	import PartsOrigin from '$lib/components/PartsOrigin.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { breadcrumbSchema } from '$lib/seo/schema';
	import RelatedLinks from '$lib/components/RelatedLinks.svelte';

	const related = [
		{ href: '/cold-chain', label: 'コールドチェーン温度監視', sub: '冷蔵庫・冷凍庫の遠隔監視' },
		{ href: '/livestock', label: 'スマート畜産・養鶏', sub: '鶏舎・畜舎の温度監視' },
		{ href: '/agriculture', label: 'スマート農業・ハウス', sub: 'ハウス・露地・土壌の環境監視' },
		{ href: '/column/lorawan-toha', label: 'LoRaWANとは？', sub: 'コラム' }
	];

	const title = '技術・設計｜現場に強い、センサー基板のつくり｜CropWatch 日本';
	const description =
		'CropWatch のセンサー基板の設計と技術。用途ごとに世界から選んだ7か国・16メーカーの部品、2つのセンサーによる測定値の検証、その場で交換できる電池・センサー・ケース、記録を守るFRAMメモリ、ハードウェアとソフトウェアの二重の番犬機能まで。長く使い続けるための設計をご紹介します。';

	const ld = breadcrumbSchema([
		{ name: 'ホーム', path: '/' },
		{ name: '技術・設計', path: '/technology' }
	]);
</script>

<Seo {title} {description} />
<JsonLd data={ld} />

<div class="crumb">
	<div class="wrap crumb__in">
		<a href="/">ホーム</a><span class="material-symbols-rounded">chevron_right</span>
		<b>技術・設計</b>
	</div>
</div>

<!-- ヒーロー -->
<section class="pagehero">
	<div class="wrap pagehero__in" data-reveal>
		<p class="eyebrow"><span class="material-symbols-rounded">developer_board</span> 設計と技術</p>
		<h1>現場に強い理由は、<br /><span class="hl">基板の中</span>にあります。</h1>
		<p class="hero__kicker">
			壊れにくい設計、信頼できる測定、万が一停止した場合でも自動で立て直す復旧機能。CropWatchのセンサーは、現場に設置したあとも何年にもわたって動き続けることを前提に、細部まで作り込んでいます。
		</p>
		<div class="hero__ctas">
			<a href="#design" class="btn btn--primary btn--lg"
				><span class="material-symbols-rounded">tune</span> 設計の強みを見る</a
			>
			<a href="/contact" class="btn btn--ghost btn--lg">相談する</a>
		</div>
		<p class="pagehero__note">
			<span class="material-symbols-rounded">check_circle</span> 専門用語は使わずに、やさしくご説明します。
		</p>
	</div>
</section>

<!-- 現場に強い設計 -->
<section class="section section--soft">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">
				<span class="material-symbols-rounded">verified_user</span> 現場に強い設計
			</p>
			<h2>厳しい現場でも、壊れにくく、しっかり届く。</h2>
			<p>水も、ほこりも、電波の届きにくさも。過酷な現場を想定したハードウェア設計です。</p>
		</div>
		<div class="boxgrid boxgrid--2">
			<div class="box" data-reveal="0">
				<span class="box__ic"><span class="material-symbols-rounded">deployed_code</span></span>
				<h3>基板は、樹脂で丸ごと保護</h3>
				<p>
					電子基板全体を樹脂で覆うポッティング処理を施しています。ほこりや水分、結露、振動に強く、冷凍庫やハウス、鶏舎などの厳しい環境でも、長期間にわたって安定して稼働できるように設計しています。
				</p>
			</div>
			<div class="box" data-reveal="1">
				<span class="box__ic box__ic--accent"
					><span class="material-symbols-rounded">cell_tower</span></span
				>
				<h3>壁や階を越えて、遠くまで届くLoRaWAN</h3>
				<p>
					<a
						class="extlink"
						href="https://lora-alliance.org/"
						target="_blank"
						rel="noopener noreferrer">LoRaWAN</a
					>の電波は、広い範囲に電波が届きやすく、厚い壁や遮蔽物に囲まれた場所でも通信しやすいのが特長です。冷凍庫の奥や地下、倉庫の奥まった場所など、一般的な無線では電波が届きにくい現場にも対応。1台の受信機で、広い敷地をまとめて見守れます。
				</p>
			</div>
		</div>
	</div>
</section>

<!-- 設計の考え方 -->
<!-- <section class="section section--tight scroll-pad" id="design">
	<div class="wrap">
		<div class="callout" data-reveal>
			<span class="callout__ic"><span class="material-symbols-rounded">autorenew</span></span>
			<div>
				<h3>交換できるから、使い続けられる。</h3>
				<p>CropWatchシリーズは、消耗や劣化が生じても本体ごと買い替える必要がないよう、必要な部分だけを交換できる設計にしています。交換できるのは、バッテリー、センサー、ケース。必要な部分を取り替えながら、本体を長く使い続けることができます。導入したときだけでなく、その先の運用まで支えるための設計です。</p>
			</div>
		</div>
	</div>
</section> -->

<!-- 部品を選ぶ -->
<section class="section section--soft">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">public</span> 部品と品質</p>
			<h2>部品は、その役割にいちばん適したものを。</h2>
			<p>
				データシートを一つひとつ読み込み、性能や精度、耐久性を確かめたうえで、それぞれの役割に最も適した部品を世界中から選定しています。7か国・16メーカーから選んだ、29種類の部品。その一つひとつに、選んだ理由があります。
			</p>
		</div>
		<!-- <div class="boxgrid boxgrid--3">
			<div class="box" data-reveal="0">
				<span class="box__ic"><span class="material-symbols-rounded">device_thermostat</span></span>
				<h3>その分野の、一流を。</h3>
				<p>
					温度・湿度は、スイスの<a class="extlink" href="https://sensirion.com/" target="_blank" rel="noopener noreferrer">センシリオン社</a>。CO₂も同社の<a class="extlink" href="https://sensirion.com/products/catalog/SCD41" target="_blank" rel="noopener noreferrer">SCD41</a>を使います。測るものごとに、その分野で実績のあるメーカーを選んでいます。
				</p>
			</div>
			<div class="box" data-reveal="1">
				<span class="box__ic box__ic--accent"><span class="material-symbols-rounded">workspace_premium</span></span>
				<h3>校正済みの個体だけを、載せる。</h3>
				<p>良い部品を選ぶだけでは足りません。認定機関で校正・試験を通ったセンサーだけを採用し、1台ごとにISO/IEC 17025にもとづく校正証明書をお付けします。</p>
			</div>
			<div class="box" data-reveal="2">
				<span class="box__ic box__ic--gold"><span class="material-symbols-rounded">public</span></span>
				<h3>国ではなく、中身で選ぶ。</h3>
				<p>結果として、7か国・16メーカーの部品が1枚の基板に集まりました。産地をそろえることより、それぞれの役割に最も適したものを選ぶことを優先しています。</p>
			</div>
		</div> -->
		<div data-reveal class="parts-origin">
			<PartsOrigin />
		</div>
	</div>
</section>

<!-- 2つのセンサー -->
<section class="section">
	<div class="wrap split" data-reveal>
		<div>
			<p class="eyebrow eyebrow--accent">
				<span class="material-symbols-rounded">fact_check</span> 測定値の信頼性
			</p>
			<h2>2つのセンサーで、確かめ合う。</h2>
			<p class="split__lead">
				温度・湿度センサーには、種類の異なる2つの温湿度センサーを搭載しています。同じ空気を同時に測り、測定のたびに2つの値を照らし合わせることで、データに異常がないかを確認します。大きな食い違いが見つかった場合、その測定値は使用せず、センサー異常としてお知らせします。
			</p>
			<ul class="checklist">
				<li>
					<span class="material-symbols-rounded">check</span
					>測定のたびに、2つの値の整合性を確認します。
				</li>
				<li>
					<span class="material-symbols-rounded">check</span
					>過去の傾向と比べ、普段と違うズレを確認します。
				</li>
				<li>
					<span class="material-symbols-rounded">check</span
					>2つの値が一致しない場合は、エラーとしてお知らせします。
				</li>
			</ul>
		</div>
		<figure id="tech-figure" class="tech-figure" data-reveal>
			<svg
				viewBox="0 0 900 520"
				xmlns="http://www.w3.org/2000/svg"
				role="img"
				aria-label="2つのセンサーで同じ空気を測り、値を照合して正常データと異常を判定する横フロー図"
			>
				<defs>
					<marker id="dsc-gray" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"
						><path d="M1 1l6 3.5-6 3.5z" fill="#5b6f92"></path></marker
					>
					<marker id="dsc-green" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"
						><path d="M1 1l6 3.5-6 3.5z" fill="#0e9960"></path></marker
					>
					<marker id="dsc-red" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"
						><path d="M1 1l6 3.5-6 3.5z" fill="#dd0f0f"></path></marker
					>
				</defs>

				<rect x="1" y="1" width="898" height="518" rx="26" fill="#ffffff" stroke="#d7e0f5" stroke-width="2"
				></rect>
				<text x="44" y="52" fill="#245a9c" font-size="13" font-weight="700" letter-spacing="1.8"
					>DOUBLE-SENSOR CHECK ／ 測定値の信頼性</text
				>
				<text x="44" y="88" fill="#0b1730" font-size="26" font-weight="800"
					>2つのセンサーで、確かめ合う。</text
				>

				<!-- 同じ空気を測る2つのセンサー -->
				<rect x="40" y="140" width="250" height="320" rx="20" fill="#f1f6fd" stroke="#d7e0f5" stroke-width="2"
				></rect>
				<text x="60" y="178" fill="#0b1730" font-size="15" font-weight="800">同じ空気を同時に測定</text>

				<rect x="62" y="198" width="206" height="104" rx="14" fill="#ffffff" stroke="#b4ccf0" stroke-width="2"
				></rect>
				<circle cx="104" cy="250" r="23" fill="#eef4fc"></circle>
				<path
					transform="translate(90.2,236.2) scale(1.15)"
					d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-8c0-.55.45-1 1-1s1 .45 1 1h-1v1h1v2h-1v1h1v2h-2V5z"
					fill="#2c6cb7"
				></path>
				<text x="146" y="242" fill="#4a5d7e" font-size="12" font-weight="700">センサー A</text>
				<text x="146" y="268" fill="#0b1730" font-size="20" font-weight="800">SHT43</text>

				<rect x="62" y="320" width="206" height="104" rx="14" fill="#ffffff" stroke="#93e0bd" stroke-width="2"
				></rect>
				<circle cx="104" cy="372" r="23" fill="#e9f9f1"></circle>
				<path
					transform="translate(90.2,358.2) scale(1.15)"
					d="M15 13V5c0-1.66-1.34-3-3-3S9 3.34 9 5v8c-1.21.91-2 2.37-2 4 0 2.76 2.24 5 5 5s5-2.24 5-5c0-1.63-.79-3.09-2-4zm-4-8c0-.55.45-1 1-1s1 .45 1 1h-1v1h1v2h-1v1h1v2h-2V5z"
					fill="#0e9960"
				></path>
				<text x="146" y="364" fill="#4a5d7e" font-size="12" font-weight="700">センサー B</text>
				<text x="146" y="390" fill="#0b1730" font-size="20" font-weight="800">SHT40</text>

				<path
					d="M268 250 H322 V290 H352"
					fill="none"
					stroke="#5b6f92"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				></path>
				<path
					d="M268 372 H322 V290 H352"
					fill="none"
					stroke="#5b6f92"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					marker-end="url(#dsc-gray)"
				></path>

				<!-- 照合ノード -->
				<rect x="360" y="200" width="200" height="200" rx="20" fill="#11213c"></rect>
				<g
					transform="translate(460,244)"
					stroke="#7fc9e6"
					stroke-width="3"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M-22 -6h44M-22 -6l8 -8M-22 -6l8 8M22 10h-44M22 10l-8 -8M22 10l-8 8"></path>
				</g>
				<text x="460" y="300" fill="#e7ecff" font-size="22" font-weight="800" text-anchor="middle">照合</text>
				<text x="460" y="326" fill="#9ab0d6" font-size="12.5" text-anchor="middle">2つの値の整合性を確認</text>
				<line x1="392" y1="344" x2="528" y2="344" stroke="#2f5387" stroke-width="1"></line>
				<text x="460" y="368" fill="#7fe0be" font-size="12" font-weight="600" text-anchor="middle"
					>過去の傾向と比較</text
				>

				<path
					d="M560 262 H592 V240 H616"
					fill="none"
					stroke="#0e9960"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					marker-end="url(#dsc-green)"
				></path>
				<path
					d="M560 338 H592 V370 H616"
					fill="none"
					stroke="#dd0f0f"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					marker-end="url(#dsc-red)"
				></path>

				<!-- 判定結果 -->
				<rect x="616" y="190" width="244" height="100" rx="16" fill="#e9f9f1" stroke="#57cd99" stroke-width="2"
				></rect>
				<circle cx="656" cy="240" r="19" fill="#0e9960"></circle>
				<path
					d="M647 240l6 6 12-14"
					fill="none"
					stroke="#fff"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="3.5"
				></path>
				<text x="690" y="232" fill="#086241" font-size="13" font-weight="700">一致</text>
				<text x="690" y="258" fill="#04392a" font-size="17" font-weight="800">通常データとして記録</text>

				<rect x="616" y="320" width="244" height="100" rx="16" fill="#fff1f1" stroke="#eb2f2f" stroke-width="2"
				></rect>
				<circle cx="656" cy="370" r="19" fill="#dd0f0f"></circle>
				<path d="M649 363l14 14m0-14-14 14" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3.5"
				></path>
				<text x="690" y="362" fill="#a20c0c" font-size="13" font-weight="700">乖離</text>
				<text x="690" y="388" fill="#741010" font-size="17" font-weight="800">エラーとして通知</text>
			</svg>
		</figure>
	</div>
</section>

<!-- 交換できる -->
<section class="section section--soft scroll-pad" id="hardware">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow eyebrow--accent">
				<span class="material-symbols-rounded">build</span> 交換できる設計
			</p>
			<h2>だめになった部分だけ、取り替える。</h2>
			<p>
				本体ごと買い替える必要はありません。消耗する3つの部分は、どれも現場で簡単に交換できます。
			</p>
		</div>
		<div class="boxgrid boxgrid--3">
			<div class="box" data-reveal="0">
				<span class="box__ic box__ic--gold"
					><span class="material-symbols-rounded">battery_full</span></span
				>
				<h3>バッテリー</h3>
				<p>
					10分ごとの送信で、最大10年間稼働。長寿命のバッテリーを採用しているため、交換の手間や回数を大幅に減らせます。
				</p>
				<p>
					<small
						>※バッテリー寿命は、使用環境や測定・送信間隔、通信状況などによって異なります。</small
					>
				</p>
				<a href="https://saft.com/jp" target="_blank" rel="noopener noreferrer" class="box__go"
					>交換用バッテリーを見る<span class="material-symbols-rounded">arrow_forward</span></a
				>
			</div>
			<div class="box" data-reveal="1">
				<span class="box__ic box__ic--accent"
					><span class="material-symbols-rounded">cable</span></span
				>
				<h3>センサー</h3>
				<p>
					差し替えると自動で認識するため、面倒な設定作業は必要ありません。交換用センサーにも校正証明書が付属しており、検査や監査時の確認資料として活用できます。
				</p>
				<span class="box__go"
					>交換用センサーを見る <span class="material-symbols-rounded">arrow_forward</span></span
				>
			</div>
			<div class="box" data-reveal="2">
				<span class="box__ic"><span class="material-symbols-rounded">package_2</span></span>
				<h3>センサーケース</h3>
				<p>
					センサーを保護するケースが破損・劣化しても、ケースだけを交換できます。新しいケースに取り替えることで、内部のセンサーをしっかり保護できます。
				</p>
				<span class="box__go"
					>交換用ケースを見る <span class="material-symbols-rounded">arrow_forward</span></span
				>
			</div>
		</div>
	</div>
</section>

<!-- FRAM -->
<section class="section">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">memory</span> 記録を守る</p>
			<h2>通信が止まっても、記録は残ります。</h2>
			<p>ゲートウェイと通信ができない場合は、本体のFRAM（強誘電体メモリ）にデータを保存します。</p>
		</div>
		<div class="framstats" data-reveal>
			<div class="framstat">
				<b>約151年</b>
				<span>データを保持できる期間<i>メーカー公称値</i></span>
			</div>
			<div class="framstat">
				<b>1兆回以上</b>
				<span>書き換えできる回数<i>フラッシュメモリの数万回に対して</i></span>
			</div>
			<div class="framstat">
				<b>36回分</b>
				<span>本体に残る記録<i>最大6時間の停電に対応</i></span>
			</div>
		</div>
		<div class="callout callout--plain" data-reveal>
			<span class="callout__ic"><span class="material-symbols-rounded">history</span></span>
			<div>
				<h3>
					なぜ、わざわざ<a
						class="extlink"
						href="https://www.infineon.com/ja/products/memories/f-ram-ferroelectric-ram"
						target="_blank"
						rel="noopener noreferrer">FRAM</a
					>なのか。
				</h3>
				<p>
					保存用として広く使われるフラッシュメモリには、書き換え回数に限りがあります。通信障害が長時間続き、測定データを短い間隔で繰り返し保存する機器では、メモリの寿命も考慮しなければなりません。また、基板に実装されたメモリが故障すると、メモリだけを交換することが難しく、基板ごとの修理や交換が必要になる場合があります。CropWatchでは、こうした故障や交換のリスクを抑えるため、書き換え耐久性に優れたFRAMを採用しています。
				</p>
			</div>
		</div>
	</div>
</section>

<!-- 止まらない仕組み（番犬） -->
<section class="section section--soft">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">pets</span> 止まらない仕組み</p>
			<h2>2匹の番犬で、止まっても自分で立て直す。</h2>
			<p>
				機器内部の小さなコンピューターは、まれに動作が止まることがあります。そのままでは測定や記録に空白が生じるため、CropWatchでは二段構えの監視機能で動作を見張っています。異常を検知すると自動で再起動し、正常な動作へ立て直す。この仕組みを「番犬（ウォッチドッグタイマー）」と呼びます。
			</p>
		</div>
		<div class="boxgrid boxgrid--2">
			<div class="box" data-reveal="0">
				<!-- <span class="box__ic box__ic--accent"><span class="material-symbols-rounded">code</span></span> -->
				<span class="box__ic box__ic--accent overflow-hidden">
					<img
						class="h-full w-full object-cover"
						src="/assets/imagery/Shiro1.png"
						alt="ソフトウェアの番犬"
					/>
				</span>
				<h3>ソフトウェアの番犬</h3>
				<p>
					内蔵された監視機能が、プログラムが正常に動いているかを見張ります。処理が止まり、一定時間応答がなくなると、機器を自動で再起動して正常な動作に戻します。多くの一時的な不調は、この段階で解消します。
				</p>
			</div>
			<div class="box" data-reveal="1">
				<span class="box__ic box__ic--accent overflow-hidden">
					<img
						class="h-full w-full object-cover"
						src="/assets/imagery/Shiro2.png"
						alt="ソフトウェアの番犬"
					/>
				</span>
				<h3>ハードウェアの番犬</h3>
				<p>
					プログラム全体が止まり、1つ目の番犬が機能しなくなった場合でも、基板上の独立した監視回路が機器の動作を見張ります。ソフトウェアとは独立して動作するため、より深刻な停止にも対応できます。
				</p>
			</div>
		</div>
	</div>
</section>

<RelatedLinks links={related} />

<!-- クロージング -->
<section class="closing">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold" style="justify-content:center">
			<span class="material-symbols-rounded">waving_hand</span> ご相談ください
		</p>
		<h2>「止まらない監視」を、現場で。</h2>
		<p>どんな場所を見守りたいか、お聞かせください。最適なセンサーと通知の設定をご提案します。</p>
		<div class="closing__ctas">
			<a href="/contact" class="btn btn--accent btn--lg">無料デモを予約する</a>
			<a href="/" class="btn btn--outline-light btn--lg">ホームへ戻る</a>
		</div>
	</div>
</section>

<style>
	.pagehero h1 .hl {
		color: var(--web-primary);
	}

	/* The flow diagram draws its own white card (rounded rect + border), so the
	   figure adds no frame of its own - just the floating shadow. */
	.tech-figure {
		margin: 0;
	}
	.tech-figure svg {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 20px;
		box-shadow: 0 18px 48px rgba(11, 23, 48, 0.14);
	}

	.parts-origin {
		margin-top: 36px;
	}

	/* ── FRAM figures ── */
	.framstats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 18px;
		margin-bottom: 28px;
	}
	.framstat {
		background: #fff;
		border: 1px solid var(--web-border);
		border-radius: 20px;
		padding: 26px 24px;
		text-align: center;
		box-shadow: var(--web-shadow-card);
	}
	.framstat b {
		display: block;
		font-size: clamp(28px, 3.4vw, 38px);
		font-weight: 800;
		line-height: 1.1;
		color: var(--web-primary);
		letter-spacing: -0.01em;
	}
	.framstat span {
		display: block;
		margin-top: 10px;
		font-size: 14px;
		font-weight: 700;
		color: var(--web-heading);
	}
	.framstat i {
		display: block;
		margin-top: 4px;
		font-style: normal;
		font-size: 12.5px;
		font-weight: 500;
		color: var(--web-muted);
	}

	/* Same shape as .callout but reading as a footnote to the stats above it,
	   so it doesn't compete with them for attention. */
	.callout--plain {
		background: var(--web-bg-soft);
		border-color: var(--web-border);
	}
	.callout--plain .callout__ic {
		background: var(--web-primary-soft);
		color: var(--web-primary);
	}

	/* Column layout + margin-top:auto pins the "go" link to the card bottom, so
	   the links line up across cards whose copy runs to different lengths. */
	.box {
		display: flex;
		flex-direction: column;
	}
	.box__go {
		display: inline-flex;
		align-self: flex-start;
		align-items: center;
		gap: 4px;
		margin-top: auto;
		padding-top: 14px;
		font-size: 13.5px;
		font-weight: 700;
		color: var(--web-primary);
	}
	.box__go .material-symbols-rounded {
		font-size: 16px;
		transition: transform 0.15s var(--jp-ease);
	}
	.box:hover .box__go .material-symbols-rounded {
		transform: translateX(3px);
	}

	@media (max-width: 780px) {
		.framstats {
			grid-template-columns: 1fr;
			gap: 14px;
		}
	}
</style>
