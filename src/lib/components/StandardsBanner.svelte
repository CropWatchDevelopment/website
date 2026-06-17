<script>
	import ilacImage from '$lib/images/ilac-mra-certification-web.webp';
	import nistImage from '$lib/images/nist-traceable-web.webp';
	import isoImage from '$lib/images/iso-iec-17025-certified-web.png';
	import haccp from '$lib/images/HACCP.webp';
</script>

<div class="bg-[#d9e9fb]">
	<div
		class="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-10 px-6 py-4 md:justify-between"
	>
		<a href="https://ilac.org/about-ilac/" target="_blank" rel="noopener noreferrer">
			<img src={ilacImage} alt="ILAC-MRA Certified" class="h-20 w-auto flex-shrink-0 md:h-24" />
		</a>
		<a href="https://www.nist.gov/" target="_blank" rel="noopener noreferrer">
			<img src={nistImage} alt="NIST 800-53 Compliant" class="h-20 w-auto flex-shrink-0 md:h-24" />
		</a>
		<a href="https://www.iso.org/standard/27001" target="_blank" rel="noopener noreferrer">
			<img src={isoImage} alt="ISO 27001 Certified" title="ISO 27001 Certifications downloadable via App" class="h-20 w-auto flex-shrink-0 md:h-24" />
		</a>
		<a
			href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/shokuhin/haccp/index.html"
			target="_blank"
			rel="noopener noreferrer"
		>
			<img src={haccp} alt="HACCP適合" class="h-20 w-auto flex-shrink-0 md:h-24" title="HACCP監査をスピードアップし、運用をシンプルに" />
		</a>
	</div>
</div>
