<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import ProductSensorArt from '$lib/components/redesign/ProductSensorArt.svelte';
	import ClosingCTA from '$lib/components/redesign/ClosingCTA.svelte';
	import Seo from '$lib/components/redesign/Seo.svelte';
	import { loc } from '$lib/i18n/navigation';
	import datasheetUrl from './downloads/温度管理.pdf?url';

	let productJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: 'CW-AIR-TH',
		sku: 'CW-AIR-TH',
		brand: { '@type': 'Brand', name: 'CropWatch' },
		description: $_('rd.seo.cwath.description'),
		category: 'Wireless environmental sensor',
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
			{ '@type': 'ListItem', position: 2, name: $_('rd.hdr.nav.products'), item: 'https://www.cropwatch.io' + $loc('/products/cw-air-th') },
			{ '@type': 'ListItem', position: 3, name: 'CW-AIR-TH' }
		]
	});

	const sensorCodes = ['sth', 'cth', 'tth'] as const;
	type SensorCode = (typeof sensorCodes)[number];
	let selected = $state<SensorCode>('sth');

	const specKeys = ['housing', 'temp', 'battery', 'life', 'radio', 'config', 'mount', 'cert'];
	const useCats = ['ag', 'cold', 'food'];
</script>

<Seo
	title={$_('rd.seo.cwath.title')}
	description={$_('rd.seo.cwath.description')}
	ogType="product"
	jsonLd={[productJsonLd, breadcrumbJsonLd]}
/>

<!-- Hero -->
<section class="prd-hero">
	<div class="cw-container">
		<div class="prd-hero-grid">
			<div>
				<div class="prd-hero-model">{$_('rd.cwath.model')}</div>
				<h1>{$_('rd.cwath.title')}</h1>
				<p class="prd-hero-body">{$_('rd.cwath.body')}</p>
				<div class="prd-hero-chips">
					{#each [1, 2, 3, 4, 5] as n}
						<span class="prd-chip">{$_(`rd.cwath.chip${n}`)}</span>
					{/each}
				</div>
				<div style="display:flex; flex-wrap:wrap; gap:0.75rem;">
					<a href={$loc('/contact')} class="cw-btn cw-btn-primary">{$_('rd.cwath.cta1')}</a>
					<a href={datasheetUrl} target="_blank" rel="noopener" class="cw-btn cw-btn-ghost-dark"
						>{$_('rd.cwath.cta2')}</a
					>
				</div>
			</div>
			<div style="display:grid; place-items:center;">
				<ProductSensorArt />
			</div>
		</div>
	</div>
</section>

<!-- Sensor selector -->
<section class="cw-section cw-bg-ice">
	<div class="cw-container">
		<div class="cw-section-head">
			<span class="cw-eyebrow">{$_('rd.cwath.specs.sensor_heads')}</span>
			<h2>{$_('rd.cwath.sensors_title')}</h2>
			<p>{$_('rd.cwath.sensors_body')}</p>
		</div>
		<div class="sensor-select">
			{#each sensorCodes as code (code)}
				<button
					class="sensor-card {selected === code ? 'active' : ''}"
					onclick={() => (selected = code)}
					type="button"
				>
					<div class="sensor-card-head">
						<h4>{$_(`rd.cwath.${code}.name`)}</h4>
						<span class="sensor-card-code">CW-{code.toUpperCase()}</span>
					</div>
					<div class="sensor-range">{$_(`rd.cwath.${code}.range`)}</div>
					<div
						style="font-family:var(--cw-mono); font-size:0.82rem; color:var(--cw-gold-500); font-weight:700;"
					>
						{$_(`rd.cwath.${code}.accuracy`)}
					</div>
					<div class="sensor-card-meta">{$_(`rd.cwath.${code}.note`)}</div>
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- Specs -->
<section class="cw-section">
	<div class="cw-container">
		<div class="prd-specs">
			<div>
				<div style="margin-bottom:1.5rem;">
					<span class="cw-eyebrow">{$_('rd.cwath.specs.eyebrow')}</span>
					<h2
						style="margin:0.5rem 0 0; font-size:clamp(1.6rem, 3vw, 2rem); letter-spacing:-0.02em; color:var(--cw-blue-900);"
					>
						{$_('rd.cwath.specs.title')}
					</h2>
				</div>
				<div class="prd-spec-table">
					<div class="prd-spec-table-title">CW-AIR-TH</div>
					{#each specKeys as k (k)}
						<div class="prd-spec-row">
							<div class="prd-spec-key">{$_(`rd.cwath.specs.${k}`)}</div>
							<div class="prd-spec-val">{$_(`rd.cwath.specs.${k}_val`)}</div>
						</div>
					{/each}
				</div>
			</div>
			<div style="display:flex; flex-direction:column; gap:1rem;">
				<div class="img-placeholder" style="min-height:180px;">
					<span>Photo · Sensor on pole</span>
				</div>
				<div class="img-placeholder" style="min-height:180px;">
					<span>Photo · Sensor in freezer</span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Use cases -->
<section class="cw-section cw-bg-ice">
	<div class="cw-container">
		<div class="cw-section-head">
			<span class="cw-eyebrow">{$_('rd.cwath.specs.uses_eyebrow')}</span>
			<h2>{$_('rd.cwath.uses.title')}</h2>
		</div>
		<div class="use-grid">
			{#each useCats as cat (cat)}
				<div class="use-card">
					<h4>{$_(`rd.cwath.uses.${cat}`)}</h4>
					<ul>
						{#each [1, 2, 3, 4] as i}
							<li>{$_(`rd.cwath.uses.${cat}_${i}`)}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<ClosingCTA showSecondary={false} />
