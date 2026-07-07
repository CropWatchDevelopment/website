<script lang="ts">
	const JP = { tel: '080-4282-3390', telHref: 'tel:08042823390' };
	const LOGO = '/cropwatch_icons/cropwatch_static.svg';
	const year = new Date().getFullYear();
</script>

<footer class="ftr">
	<div class="wrap ftr__grid">
		<div class="ftr__about">
			<a class="brand" href="/">
				<img src={LOGO} alt="" class="brand__mark" />
				<span class="brand__name">CropWatch<sup>®</sup></span>
			</a>
			<p>
				コールドチェーン・スマート農業・スマート畜産向けのワイヤレス温度監視・環境モニタリング。
				記録作業の自動化と、監査対応に使えるデータ管理を。
			</p>
			<a href="/contact" class="btn btn--accent">お問い合わせ</a>
		</div>

		<nav class="ftr__col">
			<h4>製品</h4>
			<a href="/cold-chain">コールドチェーン温度監視</a>
			<a href="/livestock">スマート畜産・養鶏の監視</a>
			<a href="/agriculture">スマート農業・ハウスの監視</a>
			<a href="/replacement-sensors">交換用センサー</a>
			<a href="/replacement-case">交換用ケース</a>
		</nav>

		<nav class="ftr__col">
			<h4>情報</h4>
			<a href="/technology">技術</a>
			<a href="/sectors">業種から探す</a>
			<a href="/testimonials">お客様の声</a>
			<a href="/column">コラム</a>
			<a href="/help">ヘルプ</a>
			<a href="/contact">お問い合わせ</a>
		</nav>

		<nav class="ftr__col">
			<h4>その他</h4>
			<a href="https://app.cropwatch.io">アプリを開く</a>
			<a href="https://api.cropwatch.io">API</a>
			<!-- <a href={JP.telHref}>{JP.tel}</a> -->
		</nav>
	</div>

	<div class="ftr__legal">
		<div class="wrap ftr__legal-in">
			<p>{year} CropWatch<sup>®</sup> 日本. All rights reserved.</p>
			<p>
				<a href="/legal/privacy-policy">プライバシー</a> ·
				<a href="/legal/terms-of-service">利用規約</a> ·
				<a href="/legal/terms-of-service">クッキーポリシー</a>
			</p>
		</div>
	</div>
</footer>
