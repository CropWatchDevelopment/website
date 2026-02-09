<script lang="ts">
	import ProductOrigin from '$lib/components/product-origin.svelte';
	import deviceSideViewImage from './images/device-side-view.webp';
	import crossValidationDiagram from './images/crossvalidate.webp';
	import { _, locale } from 'svelte-i18n';
	import flyerDocument from './downloads/温度管理.pdf?url';
	import csvDataSample from './downloads/CSV-Example.csv?url';
</script>

<svelte:head>
	<title>{$_('products.cw_air_th.page.meta.title')}</title>
	<meta name="description" content={$_('products.cw_air_th.page.meta.description')} />
	<meta property="og:image" content="https://cropwatch.io/favicon.svg" />
	<meta property="og:site_name" content="CropWatch" />
	<meta property="og:type" content="website.product" />
	<meta property="og:title" content="CW-AIR-TH Sensor from CropWatch" />
	<meta
		property="og:description"
		content="The highest quality temperature and humidity monitoring sensor on the market today."
	/>
	<meta property="og:url" content="https://www.cropwatch.com/products/cw-air-th" />
	<meta property="og:locale" content={$locale} />
</svelte:head>

<section class="relative overflow-hidden bg-[#11213c] py-20 text-white">
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]"
		aria-hidden="true"
	></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
					{$_('products.cw_air_th.page.hero.badge')}
				</p>
				<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">
					{$_('products.cw_air_th.page.hero.title')}
				</h1>
				<p class="text-base text-white/80">{@html $_('products.cw_air_th.page.hero.paragraphs.0')}</p>
				<p class="text-base text-white/80">{@html $_('products.cw_air_th.page.hero.paragraphs.1')}</p>
				<div class="flex flex-wrap gap-4">
					<a
						href="/contact"
						class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
					>
						{$_('products.cw_air_th.page.hero.primary_cta')}
					</a>
					<a
						href="/demo"
						class="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
					>
						{$_('products.cw_air_th.page.hero.secondary_cta')}
					</a>
				</div>
			</div>
			<div
				class="rounded-3xl border border-white/20 bg-[#0b1730]/80 p-8 shadow-xl shadow-black/30 backdrop-blur"
			>
				<h2 class="text-lg font-semibold text-white">
					{$_('products.cw_air_th.page.hero.sidebar.title')}
				</h2>
				<picture>
					<source srcset={deviceSideViewImage} type="image/webp" />
					<img
						src={deviceSideViewImage}
						alt={$_('products.cw_air_th.page.hero.sidebar.image_alt')}
						class="mt-4 w-full rounded-lg border border-white/10 shadow-md shadow-black/20"
					/>
				</picture>
				<ul class="mt-6 space-y-4 text-sm text-white/80">
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>{@html $_('products.cw_air_th.page.hero.sidebar.bullets.0')}</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>{@html $_('products.cw_air_th.page.hero.sidebar.bullets.1')}</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>{@html $_('products.cw_air_th.page.hero.sidebar.bullets.2')}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
			{$_('products.cw_air_th.page.sections.capabilities.eyebrow')}
		</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">
			{$_('products.cw_air_th.page.sections.capabilities.headline')}
		</h2>

		<section class="cold-chain-hero" aria-labelledby="cold-chain-heading">
			<p class="mt-4 text-[#0b1730]/80">
				{@html $_('products.cw_air_th.page.sections.capabilities.paragraphs.0')}
			</p>
			<p class="my-4 mt-4 text-[#0b1730]/80">
				{@html $_('products.cw_air_th.page.sections.capabilities.paragraphs.1')}
			</p>
			<p class="mt-4 text-[#0b1730]/80">
				{@html $_('products.cw_air_th.page.sections.capabilities.paragraphs.2')}
			</p>
		</section>

		<div class="mt-12 grid gap-10 text-[#1c2d52]/80 md:grid-cols-[1.05fr_1fr] md:items-center">
			<div class="space-y-4">
				<h3 class="text-2xl font-semibold text-[#0b1730]">
					{$_('products.cw_air_th.page.sections.capabilities.diagram.headline')}
				</h3>
				<p>{$_('products.cw_air_th.page.sections.capabilities.diagram.body.0')}</p>
				<ul class="space-y-3 text-sm">
					<li class="flex gap-3">
						<span class="mt-1 h-2 w-2 flex-none rounded-full bg-[#f2a516]"></span>
						<span>{$_('products.cw_air_th.page.sections.capabilities.diagram.bullets.0')}</span>
					</li>
					<li class="flex gap-3">
						<span class="mt-1 h-2 w-2 flex-none rounded-full bg-[#f2a516]"></span>
						<span>{$_('products.cw_air_th.page.sections.capabilities.diagram.bullets.1')}</span>
					</li>
					<li class="flex gap-3">
						<span class="mt-1 h-2 w-2 flex-none rounded-full bg-[#f2a516]"></span>
						<span>{$_('products.cw_air_th.page.sections.capabilities.diagram.bullets.2')}</span>
					</li>
				</ul>
			</div>
			<picture class="order-first md:order-none md:justify-self-end">
				<source srcset={crossValidationDiagram} type="image/webp" />
				<img
					src={crossValidationDiagram}
					alt={$_('products.cw_air_th.page.sections.capabilities.diagram.image_alt')}
					class="w-full max-w-md rounded-3xl border border-[#d7e0f5] bg-white p-4 shadow-sm shadow-[#0b1730]/10"
				/>
			</picture>
		</div>

		<div class="mt-10 grid gap-6 text-sm text-[#1c2d52]/80 md:grid-cols-2">
			<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 shadow-sm shadow-[#0b1730]/5">
				<p class="text-base font-semibold text-[#0b1730]">
					{$_('products.cw_air_th.features.rugged.title')}
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/80">{$_('products.cw_air_th.features.rugged.body')}</p>
			</div>
			<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 shadow-sm shadow-[#0b1730]/5">
				<p class="text-base font-semibold text-[#0b1730]">
					{$_('products.cw_air_th.features.precision.title')}
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/80">{$_('products.cw_air_th.features.precision.body')}</p>
			</div>
			<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 shadow-sm shadow-[#0b1730]/5">
				<p class="text-base font-semibold text-[#0b1730]">
					{$_('products.cw_air_th.features.battery.title')}
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/80">{$_('products.cw_air_th.features.battery.body')}</p>
			</div>
			<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 shadow-sm shadow-[#0b1730]/5">
				<p class="text-base font-semibold text-[#0b1730]">
					{$_('products.cw_air_th.features.lorawan.title')}
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/80">{$_('products.cw_air_th.features.lorawan.body')}</p>
			</div>
		</div>
	</div>
</section>

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
			{$_('products.cw_air_th.page.sections.specifications.eyebrow')}
		</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">
			{$_('products.cw_air_th.page.sections.specifications.headline')}
		</h2>
		<div
			class="mt-8 overflow-hidden rounded-3xl border border-[#d7e0f5] bg-white shadow-sm shadow-[#0b1730]/5"
		>
				<table class="w-full text-left text-sm text-[#1c2d52]/80">
					<tbody>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>{$_('products.cw_air_th.specs.sensor.label')}</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">{$_('products.cw_air_th.specs.sensor.value')}</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>{$_('products.cw_air_th.specs.temperature_range.label')}</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">
								{$_('products.cw_air_th.specs.temperature_range.value')}
							</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>{$_('products.cw_air_th.specs.humidity_range.label')}</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">
								{$_('products.cw_air_th.specs.humidity_range.value')}
							</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>{$_('products.cw_air_th.specs.heater.label')}</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">{$_('products.cw_air_th.specs.heater.value')}</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>{$_('products.cw_air_th.specs.temperature_accuracy.label')}</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">
								{$_('products.cw_air_th.specs.temperature_accuracy.value')}
							</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>{$_('products.cw_air_th.specs.humidity_accuracy.label')}</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">
								{$_('products.cw_air_th.specs.humidity_accuracy.value')}
							</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>{$_('products.cw_air_th.specs.ingress.label')}</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">{$_('products.cw_air_th.specs.ingress.value')}</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>{$_('products.cw_air_th.specs.protocol.label')}</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">{$_('products.cw_air_th.specs.protocol.value')}</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>{$_('products.cw_air_th.specs.battery.label')}</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">{$_('products.cw_air_th.specs.battery.value')}</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>{$_('products.cw_air_th.specs.dimensions.label')}</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">
								{$_('products.cw_air_th.specs.dimensions.value')}
							</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>{$_('products.cw_air_th.specs.operating_life.label')}</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">
								{$_('products.cw_air_th.specs.operating_life.value')}
							</td>
						</tr>
						<tr class="last:border-none">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>{$_('products.cw_air_th.specs.certifications.label')}</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">
								{$_('products.cw_air_th.specs.certifications.value')}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
	</div>
</section>

<section class="bg-white py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-10 md:grid-cols-[1.15fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
					{$_('products.cw_air_th.page.sections.kit.eyebrow')}
				</p>
				<h2 class="text-3xl font-semibold text-[#0b1730]">
					{$_('products.cw_air_th.page.sections.kit.headline')}
				</h2>
				<p class="text-base text-[#1c2d52]/80">
					{@html $_('products.cw_air_th.page.sections.kit.body_html')}
				</p>
			</div>
				<div
					class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-8 shadow-sm shadow-[#0b1730]/5"
				>
					<ul class="space-y-4 text-sm text-[#1c2d52]/80">
						<li class="flex items-start gap-3">
							<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
							<span>{$_('products.cw_air_th.kit.items.sensor')}</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
							<span>{$_('products.cw_air_th.kit.items.credentials')}</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
							<span>{$_('products.cw_air_th.kit.items.mounting')}</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
							<span>{$_('products.cw_air_th.kit.items.calibration')}</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
							<span>{$_('products.cw_air_th.kit.items.playbook')}</span>
						</li>
					</ul>
				</div>
			</div>
	</div>
</section>

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
			{$_('products.cw_air_th.page.sections.deployment.eyebrow')}
		</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">
			{$_('products.cw_air_th.page.sections.deployment.headline')}
		</h2>
			<p class="mt-4 max-w-3xl text-base text-[#1c2d52]/80">
				{$_('products.cw_air_th.page.sections.deployment.body')}
			</p>
			<div class="mt-10 grid gap-8 md:grid-cols-4">
				<div class="rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5">
					<p class="text-sm font-semibold tracking-[0.18em] text-[#2f5387] uppercase">
						{$_('products.cw_air_th.deployment.steps.site_planning.title')}
					</p>
					<p class="mt-3 text-sm text-[#1c2d52]/80">
						{$_('products.cw_air_th.deployment.steps.site_planning.body')}
					</p>
				</div>
				<div class="rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5">
					<p class="text-sm font-semibold tracking-[0.18em] text-[#2f5387] uppercase">
						{$_('products.cw_air_th.deployment.steps.install.title')}
					</p>
					<p class="mt-3 text-sm text-[#1c2d52]/80">
						{$_('products.cw_air_th.deployment.steps.install.body')}
					</p>
				</div>
				<div class="rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5">
					<p class="text-sm font-semibold tracking-[0.18em] text-[#2f5387] uppercase">
						{$_('products.cw_air_th.deployment.steps.validation.title')}
					</p>
					<p class="mt-3 text-sm text-[#1c2d52]/80">
						{$_('products.cw_air_th.deployment.steps.validation.body')}
					</p>
				</div>
				<div class="rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5">
					<p class="text-sm font-semibold tracking-[0.18em] text-[#2f5387] uppercase">
						{$_('products.cw_air_th.deployment.steps.insight.title')}
					</p>
					<p class="mt-3 text-sm text-[#1c2d52]/80">
						{$_('products.cw_air_th.deployment.steps.insight.body')}
					</p>
				</div>
			</div>
		</div>
	</section>

<section id="product-origin">
	<ProductOrigin />
</section>

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">Documents</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">Downloadable files and resources</h2>
		<p class="mt-4 max-w-3xl text-base text-[#1c2d52]/80">
			Explore our collection of documents, brochures, and technical specifications to learn more
			about CW-Air-TH and its capabilities.
		</p>
		<div class="mt-10 grid gap-3 md:grid-cols-3">
			<div
				class="flex flex-col rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5"
			>
				<p class="text-sm font-semibold tracking-[0.18em] text-[#2f5387] uppercase">
					Product Flyer
				</p>
				<p class="mt-3 mb-2 border-b border-[#d7e0f5] pb-4 text-sm text-[#1c2d52]/80">
					A comprehensive overview of CW-Air-TH features and benefits.
				</p>
				<span class="flex-1"></span>

				<a
					href={flyerDocument}
					download
					class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
				>
					Download Flyer
				</a>
			</div>

			<div
				class="flex flex-col rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5"
			>
				<p class="text-sm font-semibold tracking-[0.18em] text-[#2f5387] uppercase">
					Example Report
				</p>
				<p class="mt-3 mb-2 border-b border-[#d7e0f5] pb-4 text-sm text-[#1c2d52]/80">
					An example report that would be generated by the CropWatch User Interface's Report feature
				</p>
				<span class="flex-1"></span>
				<a
					href="/contact"
					class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
				>
					Download Sample Report
				</a>
			</div>

			<div
				class="flex flex-col rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5"
			>
				<p class="text-sm font-semibold tracking-[0.18em] text-[#2f5387] uppercase">
					CSV Data Export
				</p>
				<p class="mt-3 mb-2 border-b border-[#d7e0f5] pb-4 text-sm text-[#1c2d52]/80">
					A CSV data export sample from the CropWatch User Interface containing temperature and
					humidity readings.
				</p>
				<span class="flex-1"></span>

				<!--TODO: Download csv file from ./downloads/CSV-Example.csv -->
				<a
					href={csvDataSample}
					download
					class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
				>
					Download Sample Data
				</a>
			</div>
		</div>
	</div>
</section>

<section class="relative overflow-hidden bg-[#0b1730] py-20 text-white">
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]"
		aria-hidden="true"
	></div>
	<div class="relative mx-auto w-full max-w-5xl px-4 text-center">
		<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
			{$_('products.cw_air_th.page.sections.closing.eyebrow')}
		</p>
		<h2 class="mt-5 text-3xl font-semibold md:text-4xl">
			{$_('products.cw_air_th.page.sections.closing.headline')}
		</h2>
		<p class="mt-4 text-base text-white/80">
			{@html $_('products.cw_air_th.page.sections.closing.body')}
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<a
				href="/contact"
				class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
			>
				{$_('products.cw_air_th.page.sections.closing.primary_cta')}
			</a>
			<a
				href="/case-studies"
				class="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
			>
				{$_('products.cw_air_th.page.sections.closing.secondary_cta')}
			</a>
		</div>
	</div>
</section>
