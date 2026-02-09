<script lang="ts">
	import MaterialIcon from '$lib/components/MaterialIcon.svelte';
	import { _ } from 'svelte-i18n';

	type PricingItem = {
		labelKey: string;
		valueKey: string;
		href?: string;
	};

	type PricingColumn = {
		titleKey: string;
		leadKey: string;
		items: PricingItem[];
	};

	const pricingMatrix: PricingColumn[] = [
		{
			titleKey: 'home.pricing.columns.sensors.title',
			leadKey: 'home.pricing.columns.sensors.lead',
			items: [
				{
					labelKey: 'home.pricing.columns.sensors.items.devices_0_10.label',
					valueKey: 'home.pricing.columns.sensors.items.devices_0_10.value'
				},
				{
					labelKey: 'home.pricing.columns.sensors.items.devices_11_99.label',
					valueKey: 'home.pricing.columns.sensors.items.devices_11_99.value'
				},
				{
					labelKey: 'home.pricing.columns.sensors.items.devices_100_plus.label',
					valueKey: 'home.pricing.columns.sensors.items.devices_100_plus.value',
					href: '/contact'
				}
			]
		},
		{
			titleKey: 'home.pricing.columns.devices.title',
			leadKey: 'home.pricing.columns.devices.lead',
			items: [
				{
					labelKey: 'home.pricing.columns.devices.items.sensor.label',
					valueKey: 'home.pricing.columns.devices.items.sensor.value'
				},
				{
					labelKey: 'home.pricing.columns.devices.items.relay.label',
					valueKey: 'home.pricing.columns.devices.items.relay.value'
				},
				{
					labelKey: 'home.pricing.columns.devices.items.indoor_gateway.label',
					valueKey: 'home.pricing.columns.devices.items.indoor_gateway.value'
				},
				{
					labelKey: 'home.pricing.columns.devices.items.carrier_gateway.label',
					valueKey: 'home.pricing.columns.devices.items.carrier_gateway.value'
				}
			]
		},
		{
			titleKey: 'home.pricing.columns.software.title',
			leadKey: 'home.pricing.columns.software.lead',
			items: [
				{
					labelKey: 'home.pricing.columns.software.items.retention.label',
					valueKey: 'home.pricing.columns.software.items.retention.value'
				},
				{
					labelKey: 'home.pricing.columns.software.items.licences.label',
					valueKey: 'home.pricing.columns.software.items.licences.value'
				},
				{
					labelKey: 'home.pricing.columns.software.items.onboarding.label',
					valueKey: 'home.pricing.columns.software.items.onboarding.value'
				}
			]
		}
	];
</script>

<div class="mx-auto w-full max-w-6xl px-4">
	<div class="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
		<div>
			<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
				{$_('home.pricing.eyebrow')}
			</p>
			<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">
				{$_('home.pricing.headline')}
			</h2>
			<p class="mt-3 max-w-2xl text-base text-[#1c2d52]/80">
				{$_('home.pricing.intro')}
			</p>
		</div>
		<a
			href="/contact"
			class="inline-flex items-center gap-2 rounded-full border border-[#d7e0f5] px-5 py-3 text-sm font-semibold text-[#2f5387] transition hover:border-[#2f5387] hover:text-[#2f5387]"
		>
			<MaterialIcon name="concierge" collection="symbols" variant="outlined" />
			{$_('home.pricing.cta')}
		</a>
	</div>
	<div class="grid gap-6 md:grid-cols-3">
		{#each pricingMatrix as column (column.titleKey)}
			<div
				class="flex h-full flex-col rounded-3xl border border-[#d7e0f5] bg-[#f9fbff] p-7 shadow-sm shadow-[#0b1730]/5"
			>
				<h3 class="text-lg font-semibold text-[#0b1730]">{$_(column.titleKey)}</h3>
				<p class="mt-3 text-sm text-[#1c2d52]/75">{$_(column.leadKey)}</p>
				<hr class="my-5 border-[#d7e0f5]" />
				<ul class="space-y-4 text-sm text-[#1c2d52]">
					{#each column.items as item (item.labelKey)}
						<li class="flex items-start justify-between gap-4">
							<span class="font-medium">{$_(item.labelKey)}</span>
							{#if item.href}
								<a class="text-[#2f5387] underline" href={item.href}>
									{$_(item.valueKey)}
								</a>
							{:else}
								<span class="text-[#2f5387]">{$_(item.valueKey)}</span>
							{/if}
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>
