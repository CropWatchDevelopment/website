<script lang="ts">
	import ProductOrigin from '$lib/components/product-origin.svelte';
	import deviceSideViewImage from './images/device-side-view.webp';
	import crossValidationDiagram from './images/crossvalidate.webp';
	import deviceDetailImage from './images/device-detail.webp';
	import locationDetailImage from './images/location-detail.webp';
	import UIDemo from '$lib/components/UI-Demo.svelte';
	import { _ } from 'svelte-i18n';
	import flyerDocument from './downloads/温度管理.pdf?url';
	import csvDataSample from './downloads/CSV-Example.csv?url';

	const featureHighlights = [
		{
			titleKey: 'products.cw_air_th.features.rugged.title',
			descriptionKey: 'products.cw_air_th.features.rugged.body'
		},
		{
			titleKey: 'products.cw_air_th.features.precision.title',
			descriptionKey: 'products.cw_air_th.features.precision.body'
		},
		{
			titleKey: 'products.cw_air_th.features.battery.title',
			descriptionKey: 'products.cw_air_th.features.battery.body'
		},
		{
			titleKey: 'products.cw_air_th.features.lorawan.title',
			descriptionKey: 'products.cw_air_th.features.lorawan.body'
		}
	] as const;

	const specificationMatrix = [
		{
			labelKey: 'products.cw_air_th.specs.sensor.label',
			valueKey: 'products.cw_air_th.specs.sensor.value'
		},
		{
			labelKey: 'products.cw_air_th.specs.temperature_range.label',
			valueKey: 'products.cw_air_th.specs.temperature_range.value'
		},
		{
			labelKey: 'products.cw_air_th.specs.humidity_range.label',
			valueKey: 'products.cw_air_th.specs.humidity_range.value'
		},
		{
			labelKey: 'products.cw_air_th.specs.heater.label',
			valueKey: 'products.cw_air_th.specs.heater.value'
		},
		{
			labelKey: 'products.cw_air_th.specs.temperature_accuracy.label',
			valueKey: 'products.cw_air_th.specs.temperature_accuracy.value'
		},
		{
			labelKey: 'products.cw_air_th.specs.humidity_accuracy.label',
			valueKey: 'products.cw_air_th.specs.humidity_accuracy.value'
		},
		{
			labelKey: 'products.cw_air_th.specs.ingress.label',
			valueKey: 'products.cw_air_th.specs.ingress.value'
		},
		{
			labelKey: 'products.cw_air_th.specs.protocol.label',
			valueKey: 'products.cw_air_th.specs.protocol.value'
		},
		{
			labelKey: 'products.cw_air_th.specs.battery.label',
			valueKey: 'products.cw_air_th.specs.battery.value'
		},
		{
			labelKey: 'products.cw_air_th.specs.dimensions.label',
			valueKey: 'products.cw_air_th.specs.dimensions.value'
		},
		{
			labelKey: 'products.cw_air_th.specs.operating_life.label',
			valueKey: 'products.cw_air_th.specs.operating_life.value'
		},
		{
			labelKey: 'products.cw_air_th.specs.certifications.label',
			valueKey: 'products.cw_air_th.specs.certifications.value'
		}
	] as const;

	const kitContents = [
		'products.cw_air_th.kit.items.sensor',
		'products.cw_air_th.kit.items.credentials',
		'products.cw_air_th.kit.items.mounting',
		'products.cw_air_th.kit.items.calibration',
		'products.cw_air_th.kit.items.playbook'
	] as const;

	const deploymentWorkflow = [
		{
			titleKey: 'products.cw_air_th.deployment.steps.site_planning.title',
			descriptionKey: 'products.cw_air_th.deployment.steps.site_planning.body'
		},
		{
			titleKey: 'products.cw_air_th.deployment.steps.install.title',
			descriptionKey: 'products.cw_air_th.deployment.steps.install.body'
		},
		{
			titleKey: 'products.cw_air_th.deployment.steps.validation.title',
			descriptionKey: 'products.cw_air_th.deployment.steps.validation.body'
		},
		{
			titleKey: 'products.cw_air_th.deployment.steps.insight.title',
			descriptionKey: 'products.cw_air_th.deployment.steps.insight.body'
		}
	] as const;

	const pageContent = {
		meta: {
			titleKey: 'products.cw_air_th.page.meta.title',
			descriptionKey: 'products.cw_air_th.page.meta.description'
		},
		hero: {
			badgeKey: 'products.cw_air_th.page.hero.badge',
			titleKey: 'products.cw_air_th.page.hero.title',
			paragraphKeys: [
				'products.cw_air_th.page.hero.paragraphs.0',
				'products.cw_air_th.page.hero.paragraphs.1'
			],
			primaryCtaKey: 'products.cw_air_th.page.hero.primary_cta',
			secondaryCtaKey: 'products.cw_air_th.page.hero.secondary_cta',
			sidebar: {
				titleKey: 'products.cw_air_th.page.hero.sidebar.title',
				imageAltKey: 'products.cw_air_th.page.hero.sidebar.image_alt',
				bulletKeys: [
					'products.cw_air_th.page.hero.sidebar.bullets.0',
					'products.cw_air_th.page.hero.sidebar.bullets.1',
					'products.cw_air_th.page.hero.sidebar.bullets.2'
				]
			}
		},
		sections: {
			capabilities: {
				eyebrowKey: 'products.cw_air_th.page.sections.capabilities.eyebrow',
				headlineKey: 'products.cw_air_th.page.sections.capabilities.headline',
				paragraphKeys: [
					'products.cw_air_th.page.sections.capabilities.paragraphs.0',
					'products.cw_air_th.page.sections.capabilities.paragraphs.1',
					'products.cw_air_th.page.sections.capabilities.paragraphs.2'
				],
				diagram: {
					headlineKey: 'products.cw_air_th.page.sections.capabilities.diagram.headline',
					bodyKeys: ['products.cw_air_th.page.sections.capabilities.diagram.body.0'],
					bulletKeys: [
						'products.cw_air_th.page.sections.capabilities.diagram.bullets.0',
						'products.cw_air_th.page.sections.capabilities.diagram.bullets.1',
						'products.cw_air_th.page.sections.capabilities.diagram.bullets.2'
					],
					imageAltKey: 'products.cw_air_th.page.sections.capabilities.diagram.image_alt'
				}
			},
			specifications: {
				eyebrowKey: 'products.cw_air_th.page.sections.specifications.eyebrow',
				headlineKey: 'products.cw_air_th.page.sections.specifications.headline'
			},
			kit: {
				eyebrowKey: 'products.cw_air_th.page.sections.kit.eyebrow',
				headlineKey: 'products.cw_air_th.page.sections.kit.headline',
				bodyKey: 'products.cw_air_th.page.sections.kit.body_html'
			},
			ui: {
				eyebrowKey: 'products.cw_air_th.page.sections.ui.eyebrow',
				headlineKey: 'products.cw_air_th.page.sections.ui.headline',
				bodyKey: 'products.cw_air_th.page.sections.ui.body',
				stepProgressKey: 'products.cw_air_th.page.sections.ui.step_progress',
				themeLabelKey: 'products.cw_air_th.page.sections.ui.theme_label',
				themeOptions: {
					darkKey: 'products.cw_air_th.page.sections.ui.theme_options.dark',
					lightKey: 'products.cw_air_th.page.sections.ui.theme_options.light'
				},
				statusCard: {
					titleKey: 'products.cw_air_th.page.sections.ui.status_card.title',
					helperKey: 'products.cw_air_th.page.sections.ui.status_card.helper'
				},
				temperatureCard: {
					titleKey: 'products.cw_air_th.page.sections.ui.temperature_card.title',
					helperKey: 'products.cw_air_th.page.sections.ui.temperature_card.helper'
				},
				humidityCard: {
					titleKey: 'products.cw_air_th.page.sections.ui.humidity_card.title',
					helperKey: 'products.cw_air_th.page.sections.ui.humidity_card.helper'
				},
				controls: {
					backKey: 'products.cw_air_th.page.sections.ui.controls.back',
					nextKey: 'products.cw_air_th.page.sections.ui.controls.next'
				}
			},
			deployment: {
				eyebrowKey: 'products.cw_air_th.page.sections.deployment.eyebrow',
				headlineKey: 'products.cw_air_th.page.sections.deployment.headline',
				bodyKey: 'products.cw_air_th.page.sections.deployment.body'
			},
			closing: {
				eyebrowKey: 'products.cw_air_th.page.sections.closing.eyebrow',
				headlineKey: 'products.cw_air_th.page.sections.closing.headline',
				bodyKey: 'products.cw_air_th.page.sections.closing.body',
				primaryCtaKey: 'products.cw_air_th.page.sections.closing.primary_cta',
				secondaryCtaKey: 'products.cw_air_th.page.sections.closing.secondary_cta'
			}
		}
	} as const;

	type DemoStatus = 'online' | 'offline' | 'loading' | 'partialError';
	type DemoTheme = 'dark' | 'light';

	type DemoState = {
		title: string;
		deviceLabel: string;
		expanded: boolean;
		status: DemoStatus;
		primaryValue: number;
		secondaryValue: number;
		lastUpdate: string;
		mode: DemoTheme;
	};

	const statusMeta: Record<DemoStatus, { labelKey: string; helperKey: string; color: string }> = {
		loading: {
			labelKey: 'products.cw_air_th.demo.status.loading.label',
			helperKey: 'products.cw_air_th.demo.status.loading.helper',
			color: '#f2a516'
		},
		online: {
			labelKey: 'products.cw_air_th.demo.status.online.label',
			helperKey: 'products.cw_air_th.demo.status.online.helper',
			color: '#20d16a'
		},
		partialError: {
			labelKey: 'products.cw_air_th.demo.status.partial_error.label',
			helperKey: 'products.cw_air_th.demo.status.partial_error.helper',
			color: '#ff784f'
		},
		offline: {
			labelKey: 'products.cw_air_th.demo.status.offline.label',
			helperKey: 'products.cw_air_th.demo.status.offline.helper',
			color: '#f25555'
		}
	} as const;

	const temperatureSamples = [-22.93, -18.25, -12.5];
	const humiditySamples = [79.61, 72.4, 55.4];

	const setupNameInputKeys = {
		helperKey: 'products.cw_air_th.demo.walkthrough.steps.setup_location_device_names.helper',
		locationLabelKey:
			'products.cw_air_th.demo.walkthrough.steps.setup_location_device_names.location_label',
		locationPlaceholderKey:
			'products.cw_air_th.demo.walkthrough.steps.setup_location_device_names.location_placeholder',
		deviceLabelKey:
			'products.cw_air_th.demo.walkthrough.steps.setup_location_device_names.device_label',
		devicePlaceholderKey:
			'products.cw_air_th.demo.walkthrough.steps.setup_location_device_names.device_placeholder'
	} as const;

	type WalkthroughStep = {
		id: string;
		titleKey: string;
		descriptionKey: string;
		imgSrc?: string;
		apply: (state: DemoState) => DemoState;
	};

	const walkthroughSteps: WalkthroughStep[] = [
		{
			id: 'details',
			titleKey: 'products.cw_air_th.demo.walkthrough.steps.details.title',
			descriptionKey: 'products.cw_air_th.demo.walkthrough.steps.details.body',
			apply: (state: DemoState): DemoState => ({ ...state, expanded: true })
		},
		{
			id: 'setup-location-device-names',
			titleKey: 'products.cw_air_th.demo.walkthrough.steps.setup_location_device_names.title',
			descriptionKey: 'products.cw_air_th.demo.walkthrough.steps.setup_location_device_names.body',
			apply: (state: DemoState): DemoState => ({ ...state, expanded: true })
		},
		{
			id: 'status',
			titleKey: 'products.cw_air_th.demo.walkthrough.steps.status.title',
			descriptionKey: 'products.cw_air_th.demo.walkthrough.steps.status.body',
			apply: (state: DemoState): DemoState => ({ ...state, status: 'online' as DemoStatus })
		},
		{
			id: 'temperature',
			titleKey: 'products.cw_air_th.demo.walkthrough.steps.temperature.title',
			descriptionKey: 'products.cw_air_th.demo.walkthrough.steps.temperature.body',
			apply: (state: DemoState): DemoState => ({ ...state, primaryValue: temperatureSamples[0] })
		},
		{
			id: 'humidity',
			titleKey: 'products.cw_air_th.demo.walkthrough.steps.humidity.title',
			descriptionKey: 'products.cw_air_th.demo.walkthrough.steps.humidity.body',
			apply: (state: DemoState): DemoState => ({ ...state, secondaryValue: humiditySamples[0] })
		},
		{
			id: 'location-page',
			titleKey: 'products.cw_air_th.demo.walkthrough.steps.location_page.title',
			descriptionKey: 'products.cw_air_th.demo.walkthrough.steps.location_page.body',
			imgSrc: locationDetailImage,
			apply: (state: DemoState): DemoState => ({ ...state, expanded: true })
		},
		{
			id: 'device-detail-page',
			titleKey: 'products.cw_air_th.demo.walkthrough.steps.device_detail.title',
			descriptionKey: 'products.cw_air_th.demo.walkthrough.steps.device_detail.body',
			imgSrc: deviceDetailImage,
			apply: (state: DemoState): DemoState => ({ ...state, expanded: true })
		}
	];

	const initialDemoState: DemoState = {
		title: '冷凍',
		deviceLabel: 'Sensor 1',
		expanded: true,
		status: 'loading',
		primaryValue: temperatureSamples[0],
		secondaryValue: humiditySamples[0],
		lastUpdate: '8m 17s 前',
		mode: 'dark'
	};

	let demoState: DemoState = { ...initialDemoState };
	let walkthroughStep = 0;

	function setDemoState(patch: Partial<DemoState>) {
		demoState = { ...demoState, ...patch };
	}

	function goToStep(index: number) {
		const step = walkthroughSteps[index];
		if (!step) return;
		demoState = step.apply(demoState);
		walkthroughStep = index;
	}

	function nextStep() {
		if (walkthroughStep < walkthroughSteps.length - 1) {
			goToStep(walkthroughStep + 1);
		}
	}

	function previousStep() {
		if (walkthroughStep > 0) {
			goToStep(walkthroughStep - 1);
		}
	}

	function handleStatusSelect(status: DemoStatus) {
		setDemoState({ status });
		walkthroughStep = 1;
	}

	function setTheme(mode: DemoTheme) {
		setDemoState({ mode });
	}

	function handleDemoChange(event: CustomEvent<Partial<DemoState> & { stepId?: string }>) {
		const { stepId, ...patch } = event.detail;
		if (Object.keys(patch).length > 0) {
			setDemoState(patch);
			if ('expanded' in patch) {
				walkthroughStep = 0;
			} else if ('status' in patch) {
				walkthroughStep = 1;
			} else if ('primaryValue' in patch) {
				walkthroughStep = 2;
			} else if ('secondaryValue' in patch) {
				walkthroughStep = 3;
			}
		}
		if (stepId) {
			const index = walkthroughSteps.findIndex((step) => step.id === stepId);
			if (index !== -1) {
				goToStep(index);
			}
		}
	}

	$: currentStep = walkthroughSteps[walkthroughStep];
	$: progressPercent =
		walkthroughSteps.length > 1 ? (walkthroughStep / (walkthroughSteps.length - 1)) * 100 : 100;
</script>

<svelte:head>
	<title>{$_(pageContent.meta.titleKey)}</title>
	<meta name="description" content={$_(pageContent.meta.descriptionKey)} />
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
					{$_(pageContent.hero.badgeKey)}
				</p>
				<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">
					{$_(pageContent.hero.titleKey)}
				</h1>
				{#each pageContent.hero.paragraphKeys as paragraphKey (paragraphKey)}
					<p class="text-base text-white/80">{@html $_(paragraphKey)}</p>
				{/each}
				<div class="flex flex-wrap gap-4">
					<a
						href="/contact"
						class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
					>
						{$_(pageContent.hero.primaryCtaKey)}
					</a>
					<a
						href="/demo"
						class="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
					>
						{$_(pageContent.hero.secondaryCtaKey)}
					</a>
				</div>
			</div>
			<div
				class="rounded-3xl border border-white/20 bg-[#0b1730]/80 p-8 shadow-xl shadow-black/30 backdrop-blur"
			>
				<h2 class="text-lg font-semibold text-white">{$_(pageContent.hero.sidebar.titleKey)}</h2>
				<picture>
					<source srcset={deviceSideViewImage} type="image/webp" />
					<img
						src={deviceSideViewImage}
						alt={$_(pageContent.hero.sidebar.imageAltKey)}
						class="mt-4 w-full rounded-lg border border-white/10 shadow-md shadow-black/20"
					/>
				</picture>
				<ul class="mt-6 space-y-4 text-sm text-white/80">
					{#each pageContent.hero.sidebar.bulletKeys as bulletKey (bulletKey)}
						<li class="flex items-start gap-3">
							<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
							<span>{@html $_(bulletKey)}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
			{$_(pageContent.sections.capabilities.eyebrowKey)}
		</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">
			{$_(pageContent.sections.capabilities.headlineKey)}
		</h2>

		<section class="cold-chain-hero" aria-labelledby="cold-chain-heading">
			{#each pageContent.sections.capabilities.paragraphKeys as paragraphKey, index (paragraphKey)}
				<p class={index === 1 ? 'my-4' : undefined}>
					{@html $_(paragraphKey)}
				</p>
			{/each}
		</section>

		<div class="mt-12 grid gap-10 text-[#1c2d52]/80 md:grid-cols-[1.05fr_1fr] md:items-center">
			<div class="space-y-4">
				<h3 class="text-2xl font-semibold text-[#0b1730]">
					{$_(pageContent.sections.capabilities.diagram.headlineKey)}
				</h3>
				{#each pageContent.sections.capabilities.diagram.bodyKeys as bodyKey (bodyKey)}
					<p>{$_(bodyKey)}</p>
				{/each}
				<ul class="space-y-3 text-sm">
					{#each pageContent.sections.capabilities.diagram.bulletKeys as bulletKey (bulletKey)}
						<li class="flex gap-3">
							<span class="mt-1 h-2 w-2 flex-none rounded-full bg-[#f2a516]"></span>
							<span>{$_(bulletKey)}</span>
						</li>
					{/each}
				</ul>
			</div>
			<picture class="order-first md:order-none md:justify-self-end">
				<source srcset={crossValidationDiagram} type="image/webp" />
				<img
					src={crossValidationDiagram}
					alt={$_(pageContent.sections.capabilities.diagram.imageAltKey)}
					class="w-full max-w-md rounded-3xl border border-[#d7e0f5] bg-white p-4 shadow-sm shadow-[#0b1730]/10"
				/>
			</picture>
		</div>

		<div class="mt-10 grid gap-6 text-sm text-[#1c2d52]/80 md:grid-cols-2">
			{#each featureHighlights as feature (feature.titleKey)}
				<div
					class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 shadow-sm shadow-[#0b1730]/5"
				>
					<p class="text-base font-semibold text-[#0b1730]">{$_(feature.titleKey)}</p>
					<p class="mt-2 text-sm text-[#1c2d52]/80">{$_(feature.descriptionKey)}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
			{$_(pageContent.sections.specifications.eyebrowKey)}
		</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">
			{$_(pageContent.sections.specifications.headlineKey)}
		</h2>
		<div
			class="mt-8 overflow-hidden rounded-3xl border border-[#d7e0f5] bg-white shadow-sm shadow-[#0b1730]/5"
		>
			<table class="w-full text-left text-sm text-[#1c2d52]/80">
				<tbody>
					{#each specificationMatrix as spec (spec.labelKey)}
						<tr class="border-b border-[#d7e0f5]/80 last:border-none">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>{$_(spec.labelKey)}</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">{$_(spec.valueKey)}</td>
						</tr>
					{/each}
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
					{$_(pageContent.sections.kit.eyebrowKey)}
				</p>
				<h2 class="text-3xl font-semibold text-[#0b1730]">
					{$_(pageContent.sections.kit.headlineKey)}
				</h2>
				<p class="text-base text-[#1c2d52]/80">{@html $_(pageContent.sections.kit.bodyKey)}</p>
			</div>
			<div
				class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-8 shadow-sm shadow-[#0b1730]/5"
			>
				<ul class="space-y-4 text-sm text-[#1c2d52]/80">
					{#each kitContents as item (item)}
						<li class="flex items-start gap-3">
							<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
							<span>{$_(item)}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
			{$_(pageContent.sections.ui.eyebrowKey)}
		</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">
			{$_(pageContent.sections.ui.headlineKey)}
		</h2>
		<p class="mt-4 max-w-3xl text-base text-[#1c2d52]/80">
			{$_(pageContent.sections.ui.bodyKey)}
		</p>
		<div class="flex flex-row gap-2">
			<div id="demo-section" class="mt-10 flex-shrink-0">
				<UIDemo
					title={demoState.title}
					deviceLabel={demoState.deviceLabel}
					expanded={demoState.expanded}
					status={demoState.status}
					primaryValue={demoState.primaryValue}
					secondaryValue={demoState.secondaryValue}
					lastUpdate={demoState.lastUpdate}
					mode={demoState.mode}
					on:stateChange={handleDemoChange}
				/>
			</div>
			<div id="demo-description" class="mt-10 max-w-3xl flex-1 text-base text-[#1c2d52]/80">
				<div
					id="explanation-card"
					class="flex h-full min-h-[400px] w-full flex-col gap-6 rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5"
				>
					<div>
						<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
							{$_(pageContent.sections.ui.stepProgressKey)
								.replace('{current}', String(walkthroughStep + 1))
								.replace('{total}', String(walkthroughSteps.length))}
						</p>
						<h3 class="mt-2 text-2xl font-semibold text-[#0b1730]">{$_(currentStep.titleKey)}</h3>
						<p class="mt-2 text-sm text-[#1c2d52]/80">{$_(currentStep.descriptionKey)}</p>
					</div>

					<div class="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#6b7ba7]">
						<span>{$_(pageContent.sections.ui.themeLabelKey)}</span>
						<div class="inline-flex rounded-full border border-[#d7e0f5] bg-[#f5f7fb] p-1">
							<button
								type="button"
								class={`rounded-full px-3 py-1 transition ${
									demoState.mode === 'dark' ? 'bg-white text-[#0b1730] shadow-sm' : 'text-[#6b7ba7]'
								}`}
								onclick={() => setTheme('dark')}
							>
								{$_(pageContent.sections.ui.themeOptions.darkKey)}
							</button>
							<button
								type="button"
								class={`rounded-full px-3 py-1 transition ${
									demoState.mode === 'light'
										? 'bg-white text-[#0b1730] shadow-sm'
										: 'text-[#6b7ba7]'
								}`}
								onclick={() => setTheme('light')}
							>
								{$_(pageContent.sections.ui.themeOptions.lightKey)}
							</button>
						</div>
					</div>

					{#if currentStep.id === 'setup-location-device-names'}
						<div
							class="space-y-4 rounded-2xl border border-[#d7e0f5] bg-[#f5f7fb] p-4 shadow-inner shadow-white/40"
						>
							<p class="text-xs text-[#1c2d52]/80">
								{$_(setupNameInputKeys.helperKey)}
							</p>
							<label class="flex flex-col gap-1 text-sm font-semibold text-[#0b1730]">
								<span>{$_(setupNameInputKeys.locationLabelKey)}</span>
								<input
									class="w-full rounded-xl border border-[#c7d5f2] bg-white px-3 py-2 text-base font-normal text-[#0b1730] focus:ring-2 focus:ring-[#2f5387] focus:outline-none"
									type="text"
									value={demoState.title}
									placeholder={$_(setupNameInputKeys.locationPlaceholderKey)}
									oninput={(event) =>
										setDemoState({
											title: (event.currentTarget as HTMLInputElement).value
										})}
								/>
							</label>
							<label class="flex flex-col gap-1 text-sm font-semibold text-[#0b1730]">
								<span>{$_(setupNameInputKeys.deviceLabelKey)}</span>
								<input
									class="w-full rounded-xl border border-[#c7d5f2] bg-white px-3 py-2 text-base font-normal text-[#0b1730] focus:ring-2 focus:ring-[#2f5387] focus:outline-none"
									type="text"
									value={demoState.deviceLabel}
									placeholder={$_(setupNameInputKeys.devicePlaceholderKey)}
									oninput={(event) =>
										setDemoState({
											deviceLabel: (event.currentTarget as HTMLInputElement).value
										})}
								/>
							</label>
						</div>
					{/if}

					{#if currentStep.imgSrc}
						<figure
							class="overflow-hidden rounded-2xl border border-[#d7e0f5] bg-[#f5f7fb] shadow-sm shadow-[#0b1730]/5"
						>
							<img
								width="50%"
								src={currentStep.imgSrc}
								alt={$_(currentStep.titleKey)}
								loading="lazy"
								class="h-full w-full object-cover"
							/>
						</figure>
					{/if}
					<span class="flex flex-1"></span>
					{#if walkthroughStep === 1}
						<div class="rounded-2xl bg-[#f5f7fb] p-4 text-sm text-[#1c2d52]">
							<p class="text-sm font-semibold text-[#0b1730]">
								{$_(pageContent.sections.ui.statusCard.titleKey)}
							</p>
							<p class="mt-1 text-xs text-[#6b7ba7]">
								{$_(pageContent.sections.ui.statusCard.helperKey)}
							</p>
							<div class="mt-3 flex flex-wrap gap-2">
								{#each Object.keys(statusMeta) as key}
									{@const option = key as DemoStatus}
									<button
										type="button"
										class={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold transition ${
											demoState.status === option
												? 'border-[#2f5387] bg-white text-[#0b1730] shadow-sm'
												: 'border-transparent bg-white/70 text-[#1c2d52]/70'
										}`}
										style={`--chip-color:${statusMeta[option].color}`}
										onclick={() => handleStatusSelect(option)}
									>
										<span
											class="h-2 w-2 rounded-full"
											style={`background:${statusMeta[option].color}`}
											aria-hidden="true"
										></span>
										{$_(statusMeta[option].labelKey)}
									</button>
								{/each}
							</div>
							<p class="mt-3 text-xs text-[#6b7ba7]">
								{$_(statusMeta[demoState.status].helperKey)}
							</p>
						</div>
					{:else if walkthroughStep === 2}
						<div class="rounded-2xl bg-[#f5f7fb] p-4 shadow-inner shadow-white/40">
							<p class="text-sm font-semibold text-[#0b1730]">
								{$_(pageContent.sections.ui.temperatureCard.titleKey)}
							</p>
							<p class="text-3xl font-bold text-[#0b1730]">
								{demoState.primaryValue.toFixed(2)}°C
							</p>
							<p class="text-xs text-[#6b7ba7]">
								{$_(pageContent.sections.ui.temperatureCard.helperKey)}
							</p>
						</div>
					{:else if walkthroughStep === 3}
						<div class="rounded-2xl bg-[#f5f7fb] p-4 shadow-inner shadow-white/40">
							<p class="text-sm font-semibold text-[#0b1730]">
								{$_(pageContent.sections.ui.humidityCard.titleKey)}
							</p>
							<p class="text-3xl font-bold text-[#0b1730]">
								{demoState.secondaryValue.toFixed(2)}%
							</p>
							<p class="text-xs text-[#6b7ba7]">
								{$_(pageContent.sections.ui.humidityCard.helperKey)}
							</p>
						</div>
					{/if}

					<div>
						<div class="h-2 rounded-full bg-[#e1e6f5]">
							<div
								class="h-2 rounded-full bg-[#2f5387] transition-all"
								style={`width:${progressPercent}%`}
							></div>
						</div>
						<div class="mt-4 flex items-center justify-between">
							{#each walkthroughSteps as step, index}
								<button
									type="button"
									class={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition ${
										index === walkthroughStep
											? 'border-[#2f5387] bg-[#2f5387] text-white'
											: 'border-[#d7e0f5] bg-white text-[#6b7ba7]'
									}`}
									onclick={() => goToStep(index)}
								>
									{index + 1}
								</button>
							{/each}
						</div>
					</div>

					<div class="flex items-center justify-between">
						<button
							type="button"
							class="inline-flex items-center gap-2 rounded-full border border-[#c7d5f2] px-4 py-2 text-sm font-semibold text-[#1c2d52] transition hover:border-[#2f5387]"
							onclick={previousStep}
							disabled={walkthroughStep === 0}
						>
							<span aria-hidden="true">←</span>
							{$_(pageContent.sections.ui.controls.backKey)}
						</button>
						<button
							type="button"
							class="inline-flex items-center gap-2 rounded-full bg-[#2f5387] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#1c3867] disabled:cursor-not-allowed disabled:bg-[#9fb1d8]"
							onclick={nextStep}
							disabled={walkthroughStep === walkthroughSteps.length - 1}
						>
							{$_(pageContent.sections.ui.controls.nextKey)}
							<span aria-hidden="true">→</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
			{$_(pageContent.sections.deployment.eyebrowKey)}
		</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">
			{$_(pageContent.sections.deployment.headlineKey)}
		</h2>
		<p class="mt-4 max-w-3xl text-base text-[#1c2d52]/80">
			{$_(pageContent.sections.deployment.bodyKey)}
		</p>
		<div class="mt-10 grid gap-8 md:grid-cols-4">
			{#each deploymentWorkflow as step (step.titleKey)}
				<div class="rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5">
					<p class="text-sm font-semibold tracking-[0.18em] text-[#2f5387] uppercase">
						{$_(step.titleKey)}
					</p>
					<p class="mt-3 text-sm text-[#1c2d52]/80">{$_(step.descriptionKey)}</p>
				</div>
			{/each}
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
			{$_(pageContent.sections.closing.eyebrowKey)}
		</p>
		<h2 class="mt-5 text-3xl font-semibold md:text-4xl">
			{$_(pageContent.sections.closing.headlineKey)}
		</h2>
		<p class="mt-4 text-base text-white/80">{@html $_(pageContent.sections.closing.bodyKey)}</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<a
				href="/contact"
				class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
			>
				{$_(pageContent.sections.closing.primaryCtaKey)}
			</a>
			<a
				href="/case-studies"
				class="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
			>
				{$_(pageContent.sections.closing.secondaryCtaKey)}
			</a>
		</div>
	</div>
</section>
