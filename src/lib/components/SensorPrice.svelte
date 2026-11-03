<script lang="ts">
	// Visible price box for a sector page + the matching Product/Offer JSON-LD.
	// Google only shows product snippets when the Offer price is also visible on
	// the page, so both come from the same $lib/pricing values here.
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { productSchema } from '$lib/seo/schema';
	import { absUrl } from '$lib/seo/site';
	import { GATEWAY_FROM_PRICE, SECTOR_PRICING, type SectorId } from '$lib/pricing';

	let {
		sector,
		path,
		description,
		tint = false
	}: {
		sector: SectorId;
		/** This page's root-relative path (Product url + Offer url). */
		path: string;
		/** Product description for the JSON-LD (plain text). */
		description: string;
		/** Use the tinted section background (to alternate with neighbours). */
		tint?: boolean;
	} = $props();

	const p = $derived(SECTOR_PRICING[sector]);
	const usd = (v: number) => '$' + v.toLocaleString('en-US');

	const ld = $derived(
		productSchema({
			name: `CropWatch ${p.label} (${p.sku})`,
			description,
			url: path,
			image: [
				absUrl('/assets/imagery/v25-device.webp'),
				absUrl('/assets/imagery/device-side-view.webp'),
				absUrl('/assets/imagery/device-detail.webp')
			],
			sku: p.sku,
			category: 'Environmental sensor',
			price: p.unitPrice
		})
	);
</script>

<JsonLd data={ld} />

<section class="section scroll-pad" class:section--tint={tint} id="pricing">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow">
				<a class="eyebrow__link" href="#pricing">Pricing</a>
			</p>
			<h2>What it costs</h2>
		</div>
		<div class="sp" data-reveal>
			<div class="sp__card sp__card--main">
				<span class="sp__label">{p.label} ({p.sku})</span>
				<b class="sp__value">{usd(p.unitPrice)}<small>/sensor, one-time</small></b>
				<ul class="sp__perks">
					<li>ISO/IEC 17025 calibration certificate with every sensor</li>
					<li>Field-replaceable sensor module, case and battery</li>
				</ul>
			</div>
			<div class="sp__card">
				<span class="sp__label">Monitoring plan</span>
				<b class="sp__value">{usd(p.monthlyPerSensor)}<small>/sensor/month</small></b>
				<p class="sp__note">
					{#if p.baseFee > 0}Plus {usd(p.baseFee)}/month per account. {/if}Unlimited users,
					alerts, reports and API access included.
				</p>
			</div>
			<div class="sp__card">
				<span class="sp__label">Gateway</span>
				<b class="sp__value">From {usd(GATEWAY_FROM_PRICE)}<small>/location, one-time</small></b>
				<p class="sp__note">One gateway per location, or use a LoRaWAN® gateway you already own.</p>
			</div>
		</div>
		<p class="sp__cta" data-reveal>
			<a href="/pricing?sector={sector}" class="cta-pill">Estimate your total cost</a>
		</p>
	</div>
</section>

<style>
	.sp {
		display: grid;
		grid-template-columns: 1.2fr 1fr 1fr;
		gap: 16px;
	}
	.sp__card {
		display: flex;
		flex-direction: column;
		gap: 6px;
		background: var(--web-surface);
		border: 1px solid var(--web-border);
		border-radius: var(--web-radius-card);
		box-shadow: var(--web-shadow-card);
		padding: 22px 24px;
		min-width: 0;
	}
	.sp__card--main {
		border-color: var(--web-primary);
	}
	.sp__label {
		font-size: 13px;
		font-weight: 700;
		color: var(--web-muted);
	}
	.sp__value {
		font-family: var(--cw-font-mono);
		font-size: clamp(24px, 3vw, 30px);
		font-weight: 800;
		line-height: 1.15;
		color: var(--cw-ink);
	}
	.sp__value small {
		font-family: inherit;
		font-size: 12px;
		font-weight: 700;
		color: var(--web-muted);
		margin-left: 4px;
	}
	.sp__note {
		margin: 6px 0 0;
		font-size: 13.5px;
		line-height: 1.6;
		color: var(--web-muted);
	}
	.sp__perks {
		margin: 8px 0 0;
		padding-left: 1.2em;
		display: grid;
		gap: 4px;
		font-size: 13.5px;
		line-height: 1.6;
		color: var(--cw-ink);
		list-style: disc;
	}
	.sp__cta {
		margin: 22px 0 0;
		text-align: center;
	}

	@media (max-width: 980px) {
		.sp {
			grid-template-columns: 1fr 1fr;
		}
		.sp__card--main {
			grid-column: 1 / -1;
		}
	}
	@media (max-width: 600px) {
		.sp {
			grid-template-columns: 1fr;
		}
	}
</style>
