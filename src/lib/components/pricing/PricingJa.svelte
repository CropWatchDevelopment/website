<script lang="ts">
	import MaterialIcon from '$lib/components/MaterialIcon.svelte';
	import { getExchangeRate } from '$lib/data/exchange-rate';
	import { onMount } from 'svelte';

	type PricingItem = {
		label: string;
		value: string;
		href?: string;
	};

	type PricingColumn = {
		title: string;
		lead: string;
		items: PricingItem[];
	};

	let costMultiplier = 1;

	const pricingMatrix: PricingColumn[] = [
		{
			title: 'LoRaWAN®デバイス&ゲートウェイ',
			lead: '温湿度センサーをはじめ、その他センサーも必要に応じて提供します。',
			items: [
				{
					label: '温度・湿度センサー',
					value: ' '
				},
				{
					label: 'アラートシステム',
					value: ' '
				},
				{
					label: 'その他センサー',
					value: ' '
				},
				{
					label: '屋内用ゲートウェイ',
					value: ' '
				},
				{
					label: '屋外用ゲートウェイ',
					value: ' '
				}
			]
		},
		{
			title: 'IoTモニタリング月額費用',
			lead: '測定品質を保ちながら、無駄のないコスト運用を実現します。',
			items: [
				{
					label: '基本料金（10台分込み）',
					value: '¥16,500'
				},
				{
					label: '追加デバイス（11台目〜）',
					value: '¥880/台'
				},
				{
					label: '100+ 台',
					value: 'お問い合わせください',
					href: '/contact'
				}
			]
		},
		{
			title: 'ソフトウェア & ダッシュボード',
			lead: '運用を止めないためのダッシュボードとサポートで、日々の業務を支えます。',
			items: [
				{
					label: 'データ保存期間',
					value: '直近２年間'
				},
				{
					label: 'ユーザーライセンス',
					value: '無制限'
				},
				{
					label: 'アラート通知',
					value: 'メール送信 / サイレン'
				},
				{
					label: 'レポート',
					value: 'メール送信 / ダウンロード'
				},
				{
					label: 'API',
					value: ' '
				}
			]
		}
	];

	function processPrice(value: string): string {
		const raw = value;
		// Capture currency mark plus number (handles commas and optional whitespace)
		const match = raw.match(/([¥￥]?\s*-?\d[\d,]*(?:\.\d+)?)/);
		if (!match) return raw;

		const numeric = Number(match[0].replace(/[¥￥,\s]/g, ''));
		if (Number.isNaN(numeric)) return raw;

		const converted = Math.round(numeric * costMultiplier * 100) / 100;
		const formatted = new Intl.NumberFormat('ja-JP', {
			style: 'currency',
			currency: 'JPY'
		}).format(converted);

		// Replace the whole currency+number chunk to avoid double yen symbols
		return raw.replace(match[0], formatted);
	}

	onMount(async () => {
		const rate = await getExchangeRate('USD', 'JPY');
		costMultiplier = rate;
	});
</script>

<div class="mx-auto w-full max-w-6xl px-4">
	<div class="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
		<div>
			<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
				導入価格と維持コスト
			</p>
			<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">
				成長を妨げない透明な料金体系
			</h2>
			<p class="mt-3 max-w-2xl text-base text-[#1c2d52]/80">
				すべての導入には、現場設計、ネットワーク構築、機器の設置が含まれます。設置後すぐに運用を開始できるよう、導入時の作業を一括でサポートします。
			</p>
		</div>
		<a
			href="/contact"
			class="inline-flex items-center gap-2 rounded-full border border-[#d7e0f5] px-5 py-3 text-sm font-semibold text-[#2f5387] transition hover:border-[#2f5387] hover:text-[#2f5387]"
		>
			<MaterialIcon name="concierge" collection="symbols" variant="outlined" />
			見積りを依頼
		</a>
	</div>
	<div class="grid gap-6 md:grid-cols-3">
		{#each pricingMatrix as column, colIdx (column.title)}
			<div
				class="flex h-full flex-col rounded-3xl border border-[#d7e0f5] bg-[#f9fbff] p-7 shadow-sm shadow-[#0b1730]/5"
			>
				<h3 class="text-lg font-semibold text-[#0b1730]">{column.title}</h3>
				<p class="mt-3 text-sm text-[#1c2d52]/75">{column.lead}</p>
				<hr class="my-5 border-[#d7e0f5]" />
				<ul class="space-y-4 text-sm text-[#1c2d52]">
					{#each column.items as item, itemIdx (item.label)}
						<li class="flex items-start justify-between gap-4">
							<span class="font-medium">{item.label}</span>
							{#if item.href}
								<a class="text-[#2f5387] underline" href={item.href}>
									{colIdx === 0 && itemIdx === 0 ? item.value : processPrice(item.value)}
								</a>
							{:else}
								<span class="text-[#2f5387]">
									{colIdx === 0 && itemIdx === 0 ? item.value : processPrice(item.value)}
								</span>
							{/if}
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>