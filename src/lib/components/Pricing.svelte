<script lang="ts">
	export let pricing;
	export let section;
</script>

<!-- <div>
	<stripe-pricing-table
		pricing-table-id="prctbl_1Q9NqSFvjxXrUyebQMWtdwwV"
		publishable-key="pk_live_51Kxva6FvjxXrUyebr6N62bkikUenjyebI9GJ55BCv86LuV6bLFmaAczHTIKfGxA0GonWjldSASBm5wK4Ijt48Bcq00hyGgpV4h"
	>
	</stripe-pricing-table>
</div> -->

<div class="bg-white py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="text-base font-semibold leading-7 text-indigo-600">
				{section.translations[0].supertitle ?? 'Pricing'}
			</h2>
			<p class="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
				{section.translations[0].title}
			</p>
		</div>
		<p
			class="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8"
		>
			{section.translations[0].subtitle}
		</p>
		<div class="mt-16 flex justify-center">
			<fieldset aria-label="Payment frequency">
				<div
					class="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
				>
					<label class="cursor-pointer rounded-full px-2.5 py-1">
						<input type="radio" name="frequency" value="monthly" class="sr-only" />
						<span>Monthly</span>
					</label>
					<label class="cursor-pointer rounded-full px-2.5 py-1">
						<input type="radio" name="frequency" value="annually" class="sr-only" />
						<span>Annually</span>
					</label>
				</div>
			</fieldset>
		</div>

		<div
			class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-{pricing.length}"
		>
			{#each pricing as tier}
				<div class="rounded-3xl p-8 ring-1 ring-gray-300 bg-slate-50 xl:p-10">
					<div class="flex items-center justify-between gap-x-4">
						<h3 id="tier-freelancer" class="text-lg font-semibold leading-8 text-gray-900">
							{tier.translations[0].title}
						</h3>
					</div>
					<p class="mt-4 text-sm leading-6 text-gray-600">
						{tier.translations[0].description}
					</p>
					<p class="mt-6 flex items-baseline gap-x-1">
						<span class="text-4xl font-semibold tracking-tight text-gray-900"
							>{tier.translations[0].currency}{(+tier.translations[0].price).toLocaleString()}</span
						>
						<span class="text-sm font-semibold leading-6 text-gray-600"
							>{tier.translations[0].timeframe}</span
						>
					</p>
					<a
						href="/shop"
						aria-describedby="tier-freelancer"
						class="mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>{tier.translations[0].button_text ?? "View Product"}</a
					>
					<ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
						{#each tier.translations[0].features as feature}
							<li class="flex gap-x-3">
								<svg
									class="h-6 w-5 flex-none text-indigo-600"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
									data-slot="icon"
								>
									<path
										fill-rule="evenodd"
										d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
										clip-rule="evenodd"
									/>
								</svg>
								{feature.title}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</div>
