<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import GatewayArt from '$lib/components/redesign/GatewayArt.svelte';
	import ClosingCTA from '$lib/components/redesign/ClosingCTA.svelte';
	import Seo from '$lib/components/redesign/Seo.svelte';
	import { loc } from '$lib/i18n/navigation';

	let gatewayJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: 'CropWatch LoRaWAN Gateways',
		brand: { '@type': 'Brand', name: 'CropWatch' },
		description: $_('rd.seo.gateways.description'),
		category: 'LoRaWAN gateway',
		manufacturer: {
			'@type': 'Organization',
			name: 'CropWatch',
			address: {
				'@type': 'PostalAddress',
				addressCountry: 'JP',
				addressRegion: 'Miyazaki'
			}
		}
	});

	let breadcrumbJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: $_('rd.hdr.nav.home'), item: 'https://www.cropwatch.io' + $loc('/') },
			{ '@type': 'ListItem', position: 2, name: $_('rd.hdr.nav.products'), item: 'https://www.cropwatch.io' + $loc('/products/gateways') },
			{ '@type': 'ListItem', position: 3, name: $_('rd.hdr.nav.products_gateways') }
		]
	});

	const models = ['indoor', 'outdoor', 'ent'];
	const setupSteps = ['1', '2', '3'];
</script>

<Seo
	title={$_('rd.seo.gateways.title')}
	description={$_('rd.seo.gateways.description')}
	ogType="product"
	jsonLd={[gatewayJsonLd, breadcrumbJsonLd]}
/>

<!-- Hero -->
<section class="prd-hero">
	<div class="cw-container">
		<div class="prd-hero-grid">
			<div>
				<div class="prd-hero-model">{$_('rd.gw.model')}</div>
				<h1>{$_('rd.gw.title')}</h1>
				<p class="prd-hero-body">{$_('rd.gw.body')}</p>
				<div class="prd-hero-chips">
					{#each [1, 2, 3, 4] as n}
						<span class="prd-chip">{$_(`rd.gw.chip${n}`)}</span>
					{/each}
				</div>
				<div style="display:flex; flex-wrap:wrap; gap:0.75rem;">
					<a href={$loc('/contact')} class="cw-btn cw-btn-primary">{$_('rd.cwath.cta1')}</a>
					<a href={$loc('/contact')} class="cw-btn cw-btn-ghost-dark">{$_('rd.cwath.cta2')}</a>
				</div>
			</div>
			<div style="display:grid; place-items:center;">
				<GatewayArt />
			</div>
		</div>
	</div>
</section>

<!-- Three models -->
<section class="cw-section cw-bg-ice">
	<div class="cw-container">
		<div class="cw-section-head">
			<span class="cw-eyebrow">{$_('rd.gw.models_eyebrow')}</span>
			<h2>{$_('rd.gw.models_title')}</h2>
			<p>{$_('rd.gw.models_body')}</p>
		</div>
		<div class="sensor-select">
			{#each models as k (k)}
				<div class="sensor-card" style="cursor:default;">
					<div class="sensor-card-head">
						<h4>{$_(`rd.gw.${k}.name`)}</h4>
						<span class="sensor-card-code">{$_(`rd.gw.${k}.model`)}</span>
					</div>
					<div class="sensor-range">{$_(`rd.gw.${k}.range`)}</div>
					<div class="sensor-card-meta" style="font-size:0.88rem; line-height:1.55;">
						{$_(`rd.gw.${k}.desc`)}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Setup -->
<section class="cw-section">
	<div class="cw-container">
		<div class="cw-section-head">
			<span class="cw-eyebrow">{$_('rd.gw.setup_eyebrow')}</span>
			<h2>{$_('rd.gw.setup_title')}</h2>
		</div>
		<div class="clarity-how" style="grid-template-columns:repeat(3,1fr);">
			{#each setupSteps as n, i (n)}
				<div class="clarity-step">
					<div class="clarity-step-num">{['①', '②', '③'][i]}</div>
					<h3 style="margin-top:0.5rem;">{$_(`rd.gw.setup_${n}_title`)}</h3>
					<p>{$_(`rd.gw.setup_${n}_body`)}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<ClosingCTA showSecondary={false} />
