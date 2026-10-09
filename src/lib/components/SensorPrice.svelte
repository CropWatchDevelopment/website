<script lang="ts">
	// Visible price box for a sector page + the matching Product/Offer JSON-LD.
	// Google only shows product snippets when the Offer price is also visible on
	// the page, so both come from the same $lib/pricing values here.
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { productSchema } from '$lib/seo/schema';
	import { absUrl } from '$lib/seo/site';
	import {
		GATEWAY_BASE_PRICE,
		MIN_SEATS,
		SEAT_FEE,
		SECTOR_DEVICES,
		withTax,
		type SectorId
	} from '$lib/pricing';

	let {
		sector,
		path,
		description
	}: {
		sector: SectorId;
		/** This page's root-relative path (Product url + @id). */
		path: string;
		/** Product description for the JSON-LD (plain text). */
		description: string;
	} = $props();

	const device = $derived(SECTOR_DEVICES[sector]);
	const yen = (v: number) => '¥' + v.toLocaleString('ja-JP');

	const ld = $derived(
		productSchema({
			name: `CropWatch ${device.label}（${device.sku}）`,
			description,
			path,
			image: [
				absUrl('/assets/imagery/device-top-view.webp'),
				absUrl('/assets/imagery/device-side-view.webp'),
				absUrl('/assets/imagery/device-detail.webp')
			],
			sku: device.sku,
			category: '環境監視機器',
			price: withTax(device.unitPrice),
			offerUrl: path
		})
	);
</script>

<JsonLd data={ld} />

<section class="section section--soft" id="price">
	<div class="wrap">
		<div class="section__head" data-reveal>
			<p class="eyebrow"><span class="material-symbols-rounded">payments</span> 料金</p>
			<h2>料金の目安</h2>
		</div>
		<div class="sp" data-reveal>
			<div class="sp__card sp__card--main">
				<span class="sp__label">{device.label}（{device.sku}）</span>
				<b class="sp__value">{yen(withTax(device.unitPrice))}<small>/台（税込）</small></b>
				<span class="sp__tax">税抜 {yen(device.unitPrice)}・初回のみ</span>
				<ul class="sp__perks">
					<li>
						<span class="material-symbols-rounded fill" aria-hidden="true">verified</span>ISO/IEC
						17025認定校正に基づく校正証明書つき
					</li>
					<li>
						<span class="material-symbols-rounded fill" aria-hidden="true">shield</span>3年間のハードウェア保証
					</li>
				</ul>
			</div>
			<div class="sp__card">
				<span class="sp__label">月額利用料</span>
				<b class="sp__value">{yen(withTax(SEAT_FEE))}<small>/台・月（税込）</small></b>
				<span class="sp__tax">税抜 {yen(SEAT_FEE)}・最低{MIN_SEATS}台分から</span>
				<p class="sp__note">ユーザー数無制限・アラート通知・CSV出力・API・データ保存2年間込み。</p>
			</div>
			<div class="sp__card">
				<span class="sp__label">受信機・初期導入サポート</span>
				<b class="sp__value">{yen(withTax(GATEWAY_BASE_PRICE))}<small>/拠点（税込・概算）</small></b>
				<span class="sp__tax">税抜 {yen(GATEWAY_BASE_PRICE)}・初回のみ</span>
				<p class="sp__note">設置費・交通費は現地の状況により別途お見積もりします。</p>
			</div>
		</div>
		<p class="sp__cta" data-reveal>
			<a href="/pricing?sector={sector}" class="btn btn--primary"
				>台数を入れて料金をシミュレーション <span class="material-symbols-rounded">arrow_forward</span></a
			>
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
		margin-left: 2px;
	}
	.sp__tax {
		font-size: 12.5px;
		color: var(--web-muted);
	}
	.sp__note {
		margin: 6px 0 0;
		font-size: 13px;
		line-height: 1.7;
		color: var(--web-muted);
	}
	.sp__perks {
		list-style: none;
		margin: 8px 0 0;
		padding: 0;
		display: grid;
		gap: 6px;
	}
	.sp__perks li {
		display: flex;
		align-items: flex-start;
		gap: 6px;
		font-size: 13px;
		line-height: 1.6;
		color: var(--cw-ink);
	}
	.sp__perks .material-symbols-rounded {
		font-size: 18px;
		color: var(--web-accent);
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
