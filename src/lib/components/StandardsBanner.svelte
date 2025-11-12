<script>
	import ilacImage from '$lib/images/ilac-mra-certification-web.png';
	import nistImage from '$lib/images/nist-traceable-web.png';
	import isoImage from '$lib/images/iso-iec-17025-certified-web.png';
	import haccp from '$lib/images/HACCP.webp';
	import { locale } from 'svelte-i18n';
</script>

<div class="bg-[#d9e9fb]">
	<div
		class="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-10 px-6 py-4 md:justify-between"
	>
		<a href="https://ilac.org/about-ilac/">
			<img src={ilacImage} alt="ILAC-MRA Certified" class="h-20 w-auto flex-shrink-0 md:h-24" />
		</a>
		<a href="https://www.nist.gov/">
			<img src={nistImage} alt="NIST 800-53 Compliant" class="h-20 w-auto flex-shrink-0 md:h-24" />
		</a>
		<img src={isoImage} alt="ISO 27001 Certified" class="h-20 w-auto flex-shrink-0 md:h-24" />
		<img src={haccp} alt="HACCP Compliant" class="h-20 w-auto flex-shrink-0 md:h-24" />
	</div>
</div>
