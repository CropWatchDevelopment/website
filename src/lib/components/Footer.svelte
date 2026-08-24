<script lang="ts">
	import { resolve } from '$app/paths';

	const LOGO = '/assets/logos/cropwatch_static.svg';
	const year = new Date().getFullYear();
</script>

<footer class="ftr">
	<div class="wrap ftr__grid">
		<div class="ftr__about">
			<a class="brand brand--ftr" href={resolve('/home')}>
				<img src={LOGO} alt="" class="brand__mark" width="36" height="36" />
				<span class="brand__name">CropWatch<sup><small>®</small></sup></span>
			</a>
			<p>
				Quality environmental monitoring for cold storage, food service, agriculture, and livestock
				- with measurement you can defend in any audit.
			</p>
			<a href={resolve('/contact')} class="cta-pill cta-pill--gold">Contact us</a>
		</div>

		<nav class="ftr__col">
			<h4>Products</h4>
			<a href={resolve('/cold-chain')}>Cold-Chain Monitoring</a>
			<a href={resolve('/livestock')}>Livestock Monitoring</a>
			<a href={resolve('/agriculture')}>Agricultural Monitoring</a>
			<a href={resolve('/replacement-sensors')}>Replacement Sensors</a>
		</nav>

		<nav class="ftr__col">
			<h4>Industries</h4>
			<a href={resolve('/cold-chain')}>Restaurants &amp; hospitality</a>
			<a href={resolve('/cold-chain')}>Hotels &amp; schools</a>
			<a href={resolve('/livestock')}>Poultry &amp; livestock</a>
			<a href={resolve('/agriculture')}>Farming &amp; greenhouse</a>
		</nav>

		<nav class="ftr__col">
			<h4>Company</h4>
			<a href={resolve('/pricing')}>Pricing</a>
			<a href={resolve('/news')}>News</a>
			<a href={resolve('/contact')}>Contact</a>
			<a href="https://app.cropwatch.io">Open the app</a>
			<a href="https://api.cropwatch.io">API</a>
		</nav>
	</div>

	<div class="ftr__legal">
		<div class="wrap ftr__legal-in">
			<p>© {year} CropWatch. All rights reserved. · United States &amp; Global</p>
			<p>
				<a class="termlink" href={resolve('/legal/privacy-policy')}>Privacy</a> ·
				<a class="termlink" href={resolve('/legal/terms-of-service')}>Cookies</a> ·
				<a class="termlink" href={resolve('/legal/EULA')}>EULA</a> ·
				<a
					class="termlink"
					href="https://www.iso.org/ISO-IEC-17025-testing-and-calibration-laboratories.html"
					target="_blank"
					rel="noopener noreferrer">ISO/IEC 17025</a
				>
				calibration · <a class="termlink" href={resolve('/sitemap.xml')}>Sitemap</a>
			</p>
		</div>
	</div>
</footer>
