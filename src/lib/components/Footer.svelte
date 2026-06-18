<script lang="ts">
	const LOGO = '/assets/logos/cropwatch_static.svg';
	const year = new Date().getFullYear();
</script>

<footer class="ftr">
	<div class="wrap ftr__grid">
		<div class="ftr__about">
			<a class="brand brand--ftr" href="/home">
				<img src={LOGO} alt="" class="brand__mark" width="36" height="36" />
				<span class="brand__name">CropWatch</span>
			</a>
			<p>
				Quality environmental monitoring for cold storage, food service, agriculture, and livestock —
				with measurement you can defend in any audit.
			</p>
			<a href="/contact" class="cta-pill cta-pill--gold">Contact us</a>
		</div>

		<nav class="ftr__col">
			<h4>Products</h4>
			<a href="/cold-chain">Cold-Chain Monitoring</a>
			<a href="/livestock">Livestock Monitoring</a>
			<a href="/agriculture">Agricultural Monitoring</a>
			<a href="/replacement-sensors">Replacement Sensors</a>
			<a href="/replacement-case">Replacement Sensor Case</a>
		</nav>

		<nav class="ftr__col">
			<h4>Industries</h4>
			<a href="/cold-chain">Restaurants &amp; hospitality</a>
			<a href="/cold-chain">Hotels &amp; schools</a>
			<a href="/cold-chain">Hospitals &amp; pharma</a>
			<a href="/livestock">Poultry &amp; livestock</a>
			<a href="/agriculture">Farming &amp; greenhouse</a>
		</nav>

		<nav class="ftr__col">
			<h4>Company</h4>
			<a href="/news">News</a>
			<a href="/contact">Contact</a>
			<a href="https://app.cropwatch.io">Open the app</a>
			<a href="https://api.cropwatch.io">API</a>
			<a href="https://cropwatch.co.jp">日本語 (.co.jp)</a>
		</nav>
	</div>

	<div class="ftr__legal">
		<div class="wrap ftr__legal-in">
			<p>© {year} CropWatch. All rights reserved. · United States &amp; Global</p>
			<p>Privacy · Terms · ISO/IEC 17025 calibration · Sitemap</p>
		</div>
	</div>
</footer>
