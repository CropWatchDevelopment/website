<script lang="ts">
	import { _ } from 'svelte-i18n';

	import ug65Image from './images/ug65-lorawan-gateway.png';
	import ug67Image from './images/Milesight-UG67-gateway.png';
	import konaMicroImage from './images/kona-micro.png';
	import konaEnterpriseImage from './images/Enterprise-ISO2-copy-1.png';
	import konaMacroImage from './images/Macro-ISO2-1-1.png';
	import seeedImage from './images/Seeed-m2.png';
	import ezurioImage from './images/LoRaGateway01.webp';
	import milesightLogo from './images/Milesight.png';
	import tektelicLogo from './images/tektelic.svg';
	import ezurioLogo from './images/ezurio.png';
	import seeedLogo from './images/seeed-studio.webp';
</script>

<svelte:head>
	<title>{$_('products.gateways.meta.title')}</title>
	<meta name="description" content={$_('products.gateways.meta.description')} />
</svelte:head>

<section class="relative isolate overflow-hidden bg-gradient-to-br from-[var(--cw-blue-900)] via-[var(--cw-blue-950)] to-black py-24 text-white">
	<div class="pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_55%)]"></div>
	<div class="pointer-events-none absolute -left-10 top-1/2 h-40 w-40 rounded-full bg-[var(--cw-gold-500)]/20 blur-3xl"></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
			<div class="space-y-7">
				<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--cw-gold-400)]">
					{$_('products.gateways.hero.eyebrow')}
				</p>
				<h1 class="text-4xl font-bold leading-tight md:text-5xl">
					{$_('products.gateways.hero.headline')}
				</h1>
				<p class="text-base text-white/80 md:text-lg">
					{$_('products.gateways.hero.body')}
				</p>
				<div class="flex flex-wrap gap-4">
					<a
						href="/contact"
						class="inline-flex items-center justify-center rounded-full bg-[var(--cw-gold-500)] px-7 py-3 text-sm font-semibold text-[var(--cw-blue-950)] transition hover:bg-[var(--cw-gold-400)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
					>
						{$_('products.gateways.hero.primary_cta')}
					</a>
					<a
						href="#lineup"
						class="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
					>
						{$_('products.gateways.hero.secondary_cta')}
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<section id="lineup" class="bg-[#f5f7fb] py-24">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="mx-auto max-w-3xl text-center">
			<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--cw-blue-700)]">
				{$_('products.gateways.lineup.eyebrow')}
			</p>
			<h2 class="mt-3 text-3xl font-semibold text-[var(--cw-blue-950)] md:text-4xl">
				{$_('products.gateways.lineup.headline')}
			</h2>
			<p class="mt-4 text-base text-slate-600">
				{$_('products.gateways.lineup.intro')}
			</p>
		</div>
		<div class="mt-14 grid gap-10 lg:grid-cols-2">
			<article class="flex flex-col overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-xl shadow-slate-200/70">
				<div class="relative flex w-full items-center justify-center overflow-hidden bg-slate-900/5 aspect-[4/3] sm:aspect-[16/10]">
					<div class="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
					<img
						src={ug65Image}
						alt={$_('products.gateways.lineup.items.ug65.image_alt')}
						loading="lazy"
						class="h-full w-full object-contain p-6 sm:p-8 md:p-10"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-5 p-7">
					<div class="flex flex-wrap items-center justify-between gap-4">
						<h3 class="text-2xl font-semibold text-[var(--cw-blue-950)]">
							{$_('products.gateways.lineup.items.ug65.name')}
						</h3>
						<span class="inline-flex items-center rounded-full border border-[var(--cw-gold-500)]/50 bg-[var(--cw-gold-500)]/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--cw-gold-500)]">
							{$_('products.gateways.lineup.items.ug65.placement')}
						</span>
					</div>
					<div class="grid gap-2 sm:grid-cols-2">
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								{$_('products.gateways.lineup.fields.manufacturer')}
							</p>
							<div class="mt-2 flex flex-col items-start gap-2">
								<span class="text-base font-medium text-slate-900">
									{$_('products.gateways.lineup.items.ug65.manufacturer')}
								</span>
								<div class="flex w-full items-center justify-center">
									<img
										src={milesightLogo}
										alt="Milesight logo"
										class="object-contain max-w-[60%] pt-5"
									/>
								</div>
							</div>
						</div>
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								{$_('products.gateways.lineup.fields.recommended')}
							</p>
							<ul class="mt-3 space-y-1 text-sm text-slate-700">
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>{$_('products.gateways.lineup.items.ug65.recommended.0')}</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>{$_('products.gateways.lineup.items.ug65.recommended.1')}</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>{$_('products.gateways.lineup.items.ug65.recommended.2')}</span>
								</li>
							</ul>
						</div>
					</div>
					<p class="text-sm leading-relaxed text-slate-600">
						{$_('products.gateways.lineup.items.ug65.summary')}
					</p>
					<div class="mt-auto rounded-2xl bg-slate-50 px-4 py-4">
						<a
							href="https://www.milesight-iot.com/iot/lorawan-gateway/ug65/"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--cw-blue-900)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--cw-blue-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cw-gold-500)]"
						>
							{$_('products.gateways.lineup.cta.view_manufacturer')}
						</a>
					</div>
				</div>
			</article>
			<article class="flex flex-col overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-xl shadow-slate-200/70">
				<div class="relative flex w-full items-center justify-center overflow-hidden bg-slate-900/5 aspect-[4/3] sm:aspect-[16/10]">
					<div class="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
					<img
						src={ug67Image}
						alt={$_('products.gateways.lineup.items.ug67.image_alt')}
						loading="lazy"
						class="h-full w-full object-contain p-6 sm:p-8 md:p-10"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-5 p-7">
					<div class="flex flex-wrap items-center justify-between gap-4">
						<h3 class="text-2xl font-semibold text-[var(--cw-blue-950)]">
							{$_('products.gateways.lineup.items.ug67.name')}
						</h3>
						<span class="inline-flex items-center rounded-full border border-[var(--cw-gold-500)]/50 bg-[var(--cw-gold-500)]/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--cw-gold-500)]">
							{$_('products.gateways.lineup.items.ug67.placement')}
						</span>
					</div>
					<div class="grid gap-2 sm:grid-cols-2">
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								{$_('products.gateways.lineup.fields.manufacturer')}
							</p>
							<div class="mt-2 flex flex-col items-start gap-2">
								<span class="text-base font-medium text-slate-900">
									{$_('products.gateways.lineup.items.ug67.manufacturer')}
								</span>
								<div class="flex w-full items-center justify-center">
									<img
										src={milesightLogo}
										alt="Milesight logo"
										class="object-contain max-w-[60%] pt-5"
									/>
								</div>
							</div>
						</div>
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								{$_('products.gateways.lineup.fields.recommended')}
							</p>
							<ul class="mt-3 space-y-1 text-sm text-slate-700">
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>{$_('products.gateways.lineup.items.ug67.recommended.0')}</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>{$_('products.gateways.lineup.items.ug67.recommended.1')}</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>{$_('products.gateways.lineup.items.ug67.recommended.2')}</span>
								</li>
							</ul>
						</div>
					</div>
					<p class="text-sm leading-relaxed text-slate-600">
						{$_('products.gateways.lineup.items.ug67.summary')}
					</p>
					<div class="mt-auto rounded-2xl bg-slate-50 px-4 py-4">
						<a
							href="https://www.milesight-iot.com/iot/lorawan-gateway/ug67/"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--cw-blue-900)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--cw-blue-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cw-gold-500)]"
						>
							{$_('products.gateways.lineup.cta.view_manufacturer')}
						</a>
					</div>
				</div>
			</article>
			<article class="flex flex-col overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-xl shadow-slate-200/70">
				<div class="relative flex w-full items-center justify-center overflow-hidden bg-slate-900/5 aspect-[4/3] sm:aspect-[16/10]">
					<div class="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
					<img
						src={konaMicroImage}
						alt={$_('products.gateways.lineup.items.kona_micro.image_alt')}
						loading="lazy"
						class="h-full w-full object-contain p-6 sm:p-8 md:p-10"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-5 p-7">
					<div class="flex flex-wrap items-center justify-between gap-4">
						<h3 class="text-2xl font-semibold text-[var(--cw-blue-950)]">
							{$_('products.gateways.lineup.items.kona_micro.name')}
						</h3>
						<span class="inline-flex items-center rounded-full border border-[var(--cw-gold-500)]/50 bg-[var(--cw-gold-500)]/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--cw-gold-500)]">
							{$_('products.gateways.lineup.items.kona_micro.placement')}
						</span>
					</div>
					<div class="grid gap-2 sm:grid-cols-2">
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								{$_('products.gateways.lineup.fields.manufacturer')}
							</p>
							<div class="mt-2 flex flex-col items-start gap-2">
								<span class="text-base font-medium text-slate-900">
									{$_('products.gateways.lineup.items.kona_micro.manufacturer')}
								</span>
								<div class="flex w-full items-center justify-center">
									<img
										src={tektelicLogo}
										alt="Tektelic logo"
										class="object-contain max-w-[60%] pt-5"
									/>
								</div>
							</div>
						</div>
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								{$_('products.gateways.lineup.fields.recommended')}
							</p>
							<ul class="mt-3 space-y-1 text-sm text-slate-700">
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>{$_('products.gateways.lineup.items.kona_micro.recommended.0')}</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>{$_('products.gateways.lineup.items.kona_micro.recommended.1')}</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>{$_('products.gateways.lineup.items.kona_micro.recommended.2')}</span>
								</li>
							</ul>
						</div>
					</div>
					<p class="text-sm leading-relaxed text-slate-600">
						{$_('products.gateways.lineup.items.kona_micro.summary')}
					</p>
					<div class="mt-auto rounded-2xl bg-slate-50 px-4 py-4">
						<a
							href="https://tektelic.com/products/gateways/kona-micro/"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--cw-blue-900)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--cw-blue-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cw-gold-500)]"
						>
							{$_('products.gateways.lineup.cta.view_manufacturer')}
						</a>
					</div>
				</div>
			</article>
			<article class="flex flex-col overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-xl shadow-slate-200/70">
				<div class="relative flex w-full items-center justify-center overflow-hidden bg-slate-900/5 aspect-[4/3] sm:aspect-[16/10]">
					<div class="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
					<img
						src={konaEnterpriseImage}
						alt={$_('products.gateways.lineup.items.kona_enterprise.image_alt')}
						loading="lazy"
						class="h-full w-full object-contain p-6 sm:p-8 md:p-10"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-5 p-7">
					<div class="flex flex-wrap items-center justify-between gap-4">
						<h3 class="text-2xl font-semibold text-[var(--cw-blue-950)]">
							{$_('products.gateways.lineup.items.kona_enterprise.name')}
						</h3>
						<span class="inline-flex items-center rounded-full border border-[var(--cw-gold-500)]/50 bg-[var(--cw-gold-500)]/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--cw-gold-500)]">
							{$_('products.gateways.lineup.items.kona_enterprise.placement')}
						</span>
					</div>
					<div class="grid gap-2 sm:grid-cols-2">
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								{$_('products.gateways.lineup.fields.manufacturer')}
							</p>
							<div class="mt-2 flex flex-col items-start gap-2">
								<span class="text-base font-medium text-slate-900">
									{$_('products.gateways.lineup.items.kona_enterprise.manufacturer')}
								</span>
								<div class="flex w-full items-center justify-center">
									<img
										src={tektelicLogo}
										alt="Tektelic logo"
										class="object-contain max-w-[60%] pt-5"
									/>
								</div>
							</div>
						</div>
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								{$_('products.gateways.lineup.fields.recommended')}
							</p>
							<ul class="mt-3 space-y-1 text-sm text-slate-700">
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>{$_('products.gateways.lineup.items.kona_enterprise.recommended.0')}</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>{$_('products.gateways.lineup.items.kona_enterprise.recommended.1')}</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>{$_('products.gateways.lineup.items.kona_enterprise.recommended.2')}</span>
								</li>
							</ul>
						</div>
					</div>
					<p class="text-sm leading-relaxed text-slate-600">
						{$_('products.gateways.lineup.items.kona_enterprise.summary')}
					</p>
					<div class="mt-auto rounded-2xl bg-slate-50 px-4 py-4">
						<a
							href="https://tektelic.com/products/gateways/kona-enterprise/"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--cw-blue-900)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--cw-blue-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cw-gold-500)]"
						>
							{$_('products.gateways.lineup.cta.view_manufacturer')}
						</a>
					</div>
				</div>
			</article>
			<article class="flex flex-col overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-xl shadow-slate-200/70">
				<div class="relative flex w-full items-center justify-center overflow-hidden bg-slate-900/5 aspect-[4/3] sm:aspect-[16/10]">
					<div class="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
					<img
						src={konaMacroImage}
						alt={$_('products.gateways.lineup.items.kona_macro.image_alt')}
						loading="lazy"
						class="h-full w-full object-contain p-6 sm:p-8 md:p-10"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-5 p-7">
					<div class="flex flex-wrap items-center justify-between gap-4">
						<h3 class="text-2xl font-semibold text-[var(--cw-blue-950)]">
							{$_('products.gateways.lineup.items.kona_macro.name')}
						</h3>
						<span class="inline-flex items-center rounded-full border border-[var(--cw-emerald-500)] bg-[var(--cw-emerald-900)] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--cw-emerald-900)]">
							{$_('products.gateways.lineup.items.kona_macro.placement')}
						</span>
					</div>
					<div class="grid gap-2 sm:grid-cols-2">
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								{$_('products.gateways.lineup.fields.manufacturer')}
							</p>
							<div class="mt-2 flex flex-col items-start gap-2">
								<span class="text-base font-medium text-slate-900">
									{$_('products.gateways.lineup.items.kona_macro.manufacturer')}
								</span>
								<div class="flex w-full items-center justify-center">
									<img
										src={tektelicLogo}
										alt="Tektelic logo"
										class="object-contain max-w-[60%] pt-5"
									/>
								</div>
							</div>
						</div>
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								{$_('products.gateways.lineup.fields.recommended')}
							</p>
							<ul class="mt-3 space-y-1 text-sm text-slate-700">
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>{$_('products.gateways.lineup.items.kona_macro.recommended.0')}</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>{$_('products.gateways.lineup.items.kona_macro.recommended.1')}</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>{$_('products.gateways.lineup.items.kona_macro.recommended.2')}</span>
								</li>
							</ul>
						</div>
					</div>
					<p class="text-sm leading-relaxed text-slate-600">
						{$_('products.gateways.lineup.items.kona_macro.summary')}
					</p>
					<div class="mt-auto rounded-2xl bg-slate-50 px-4 py-4">
						<a
							href="https://tektelic.com/products/gateways/kona-macro/"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--cw-blue-900)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--cw-blue-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cw-gold-500)]"
						>
							{$_('products.gateways.lineup.cta.view_manufacturer')}
						</a>
					</div>
				</div>
			</article>
			<article class="flex flex-col overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-xl shadow-slate-200/70">
				<div class="relative flex w-full items-center justify-center overflow-hidden bg-slate-900/5 aspect-[4/3] sm:aspect-[16/10]">
					<div class="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
					<img
						src={seeedImage}
						alt={$_('products.gateways.lineup.items.seeed_m2.image_alt')}
						loading="lazy"
						class="h-full w-full object-contain p-6 sm:p-8 md:p-10"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-5 p-7">
					<div class="flex flex-wrap items-center justify-between gap-4">
						<h3 class="text-2xl font-semibold text-[var(--cw-blue-950)]">
							{$_('products.gateways.lineup.items.seeed_m2.name')}
						</h3>
						<span class="inline-flex items-center rounded-full border border-[var(--cw-gold-500)]/50 bg-[var(--cw-gold-500)]/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--cw-gold-500)]">
							{$_('products.gateways.lineup.items.seeed_m2.placement')}
						</span>
					</div>
					<div class="grid gap-2 sm:grid-cols-2">
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								{$_('products.gateways.lineup.fields.manufacturer')}
							</p>
							<div class="mt-2 flex flex-col items-start gap-2">
								<span class="text-base font-medium text-slate-900">
									{$_('products.gateways.lineup.items.seeed_m2.manufacturer')}
								</span>
								<div class="flex w-full items-center justify-center">
									<img
										src={seeedLogo}
										alt="Seeed Studio logo"
										class="object-contain max-w-[60%]"
									/>
								</div>
							</div>
						</div>
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								{$_('products.gateways.lineup.fields.recommended')}
							</p>
							<ul class="mt-3 space-y-1 text-sm text-slate-700">
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>{$_('products.gateways.lineup.items.seeed_m2.recommended.0')}</span>
								</li>
							</ul>
						</div>
					</div>
					<p class="text-sm leading-relaxed text-slate-600">
						{$_('products.gateways.lineup.items.seeed_m2.summary')}
					</p>
					<div class="mt-auto rounded-2xl bg-slate-50 px-4 py-4">
						<a
							href="https://www.seeedstudio.com/SenseCAP-M2-LoRaWAN-Gateway-p-5758.html"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--cw-blue-900)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--cw-blue-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cw-gold-500)]"
						>
							{$_('products.gateways.lineup.cta.view_manufacturer')}
						</a>
					</div>
				</div>
			</article>
			<article class="flex flex-col overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-xl shadow-slate-200/70">
				<div class="relative flex w-full items-center justify-center overflow-hidden bg-slate-900/5 aspect-[4/3] sm:aspect-[16/10]">
					<div class="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
					<img
						src={ezurioImage}
						alt={$_('products.gateways.lineup.items.ezurio_indoor.image_alt')}
						loading="lazy"
						class="h-full w-full object-contain p-6 sm:p-8 md:p-10"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-5 p-7">
					<div class="flex flex-wrap items-center justify-between gap-4">
						<h3 class="text-2xl font-semibold text-[var(--cw-blue-950)]">
							{$_('products.gateways.lineup.items.ezurio_indoor.name')}
						</h3>
						<span class="inline-flex items-center rounded-full border border-[var(--cw-gold-500)]/50 bg-[var(--cw-gold-500)]/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--cw-gold-500)]">
							{$_('products.gateways.lineup.items.ezurio_indoor.placement')}
						</span>
					</div>
					<div class="grid gap-2 sm:grid-cols-2">
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								{$_('products.gateways.lineup.fields.manufacturer')}
							</p>
							<div class="mt-2 flex flex-col items-start gap-2">
								<span class="text-base font-medium text-slate-900">
									{$_('products.gateways.lineup.items.ezurio_indoor.manufacturer')}
								</span>
								<div class="flex w-full items-center justify-center">
									<img
										src={ezurioLogo}
										alt="Ezurio logo"
										class="object-contain max-w-[60%]"
									/>
								</div>
							</div>
						</div>
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								{$_('products.gateways.lineup.fields.recommended')}
							</p>
							<ul class="mt-3 space-y-1 text-sm text-slate-700">
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>{$_('products.gateways.lineup.items.ezurio_indoor.recommended.0')}</span>
								</li>
							</ul>
						</div>
					</div>
					<p class="text-sm leading-relaxed text-slate-600">
						{$_('products.gateways.lineup.items.ezurio_indoor.summary')}
					</p>
					<div class="mt-auto rounded-2xl bg-slate-50 px-4 py-4">
						<a
							href="https://www.ezurio.com/iot-devices/lorawan-iot-devices/sentrius-rg1xx-lorawan-gateway-wi-fi-ethernet-optional-lte-us-only"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--cw-blue-900)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--cw-blue-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cw-gold-500)]"
						>
							{$_('products.gateways.lineup.cta.view_manufacturer')}
						</a>
					</div>
				</div>
			</article>
		</div>
	</div>
</section>

<section class="relative isolate overflow-hidden bg-gradient-to-br from-[var(--cw-blue-900)] via-[#0b1730] to-black py-24 text-white">
	<div class="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--cw-gold-500)] to-transparent"></div>
	<div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_70%)]"></div>
	<div class="mx-auto w-full max-w-5xl px-4 text-center">
		<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--cw-gold-500)]">
			{$_('products.gateways.cta.eyebrow')}
		</p>
		<h2 class="mt-4 text-3xl font-semibold md:text-4xl">
			{$_('products.gateways.cta.headline')}
		</h2>
		<p class="mt-4 text-base text-white/80">
			{$_('products.gateways.cta.body')}
		</p>
		<div class="mt-10 flex flex-wrap justify-center gap-4">
			<a
				href="/contact"
				class="inline-flex items-center justify-center rounded-full bg-[var(--cw-gold-500)] px-7 py-3 text-sm font-semibold text-[var(--cw-blue-950)] transition hover:bg-[var(--cw-gold-400)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
			>
				{$_('products.gateways.cta.primary_cta')}
			</a>
			<a
				href="/contact#details"
				class="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
			>
				{$_('products.gateways.cta.secondary_cta')}
			</a>
		</div>
	</div>
</section>
