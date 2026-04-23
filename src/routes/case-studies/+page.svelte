<script lang="ts">
	import { resolve } from '$app/paths';
	import type { RouteId } from '$app/types';
	import './case-studies.css';
	import {
		caseStudies,
		closingFacts,
		commonThread,
		filterOptions,
		heroStats,
		type FilterKey
	} from './case-studies.data';

	let activeFilter = $state<FilterKey>('all');

	const activeFilterLabel = $derived.by(
		() => filterOptions.find((option) => option.key === activeFilter)?.label ?? 'All sectors'
	);

	const visibleCases = $derived.by(() =>
		activeFilter === 'all'
			? caseStudies
			: caseStudies.filter((study) => study.sector === activeFilter)
	);

	const resultSummary = $derived.by(() => {
		const count = visibleCases.length;
		const noun = count === 1 ? 'deployment' : 'deployments';
		return `${count} ${noun} shown / ${activeFilterLabel}`;
	});

	const bandInsertAfter = $derived.by(() =>
		visibleCases.length > 2 ? 1 : Math.max(visibleCases.length - 1, 0)
	);
</script>

<svelte:head>
	<title>Case Studies | CropWatch | Real deployments across Japan</title>
	<meta
		name="description"
		content="Real CropWatch deployments across cold chain, hospitality, agriculture, and livestock in Japan."
	/>
	<link rel="canonical" href="https://cropwatch.io/case-studies" />
</svelte:head>

<div class="case-studies-page">
	<section class="cs-hero">
		<div class="cs-container cs-hero-grid">
			<div class="cs-hero-copy">
				<p class="cs-hero-kicker">Case studies / 2024-2026</p>
				<h1 class="cs-hero-title">
					<span>Real facilities.</span>
					<span>Real numbers.</span>
					<span>Real audits passed.</span>
				</h1>
				<p class="cs-hero-body">
					Five operators across cold chain, hospitality, agriculture, and poultry, each running
					CropWatch in production. Here is what they replaced, what they measured, and what they got
					back.
				</p>
			</div>

			<div class="cs-hero-stats" aria-label="Deployment highlights">
				{#each heroStats as stat (stat.label)}
					<div class="cs-hero-stat">
						<p class="cs-hero-stat-label">{stat.label}</p>
						<p class="cs-hero-stat-value">{stat.value}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<nav class="cs-index" aria-label="Case studies index">
		<div class="cs-index-grid">
			{#each visibleCases as study (study.id)}
				<a class="cs-index-link" href={`#${study.id}`} data-ga-click={`case-index-${study.id}`}>
					<span class="cs-index-order">{study.orderLabel.split(' / ')[0]}</span>
					<span class="cs-index-name">{study.indexName}</span>
					<span class="cs-index-industry">{study.indexIndustry}</span>
				</a>
			{/each}
		</div>
	</nav>

	<section class="cs-filter-bar" aria-label="Case study filters">
		<div class="cs-container cs-filter-row">
			<div class="cs-filter-group" role="toolbar" aria-label="Sector filters">
				{#each filterOptions as option (option.key)}
					<button
						type="button"
						class:active={activeFilter === option.key}
						class="cs-filter-chip"
						aria-pressed={activeFilter === option.key}
						onclick={() => {
							activeFilter = option.key;
						}}
					>
						{option.label}
					</button>
				{/each}
			</div>

			<p class="cs-filter-summary" aria-live="polite">{resultSummary}</p>
		</div>
	</section>

	{#each visibleCases as study, index (study.id)}
		{@const isAlt = index % 2 === 1}

		<section class:alt={isAlt} class="cs-case-section">
			<div class="cs-container">
				<article class="cs-case-card" id={study.id}>
					<div class="cs-case-head">
						<span class="cs-case-order">{study.orderLabel}</span>
						<span class="cs-case-breadcrumb">
							Sector / <strong>{study.breadcrumb}</strong> / {study.location}
						</span>
						<span class="cs-case-status">
							<span class="cs-case-status-dot" aria-hidden="true"></span>
							Live / {study.liveDuration}
						</span>
					</div>

					<div class="cs-case-body">
						{#if study.layout === 'visual-first'}
							<div class="cs-case-visual">
								<div class="cs-case-visual-shell">
									<div>
										<p class="cs-visual-eyebrow">{study.visual.eyebrow}</p>
										<div class="cs-visual-tags">
											{#each study.visual.tags as tag (tag)}
												<span class="cs-visual-tag">{tag}</span>
											{/each}
										</div>
									</div>

									<img src={study.imageSrc} alt={study.imageAlt} class="cs-visual-image" />

									{#if study.visual.kind === 'readout'}
										<div class="cs-visual-readout" role="list">
											{#each study.visual.entries as entry (entry.label)}
												<div class="cs-visual-row" role="listitem">
													<span class="cs-visual-key">{entry.label}</span>
													<span
														class:neutral={entry.tone === 'neutral'}
														class:ok={entry.tone === 'ok'}
														class:warn={entry.tone === 'warn'}
														class="cs-visual-value"
													>
														{entry.value}
													</span>
												</div>
											{/each}
										</div>
									{:else}
										<div class="cs-zone-grid" role="list">
											{#each study.visual.entries as entry (entry.label)}
												<div
													class:warn={entry.tone === 'warn'}
													class="cs-zone-cell"
													role="listitem"
												>
													<span class="cs-zone-label">{entry.label}</span>
													<span class:warn={entry.tone === 'warn'} class="cs-zone-value">
														{entry.value}
													</span>
												</div>
											{/each}
										</div>

										<p class="cs-visual-footnote end">{study.visual.footerNote}</p>
									{/if}
								</div>
							</div>

							<div class="cs-case-content">
								<div class="cs-case-client">
									<div class="cs-case-logo" aria-hidden="true">{study.logo}</div>
									<div>
										<p class="cs-case-client-meta">{study.clientMeta}</p>
										<h2 class="cs-case-client-name">
											{#if study.clientUrl}
												{#if study.clientUrlExternal}
													<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
													<a href={study.clientUrl} target="_blank" rel="noreferrer">
														{study.clientName}
													</a>
												{:else}
													<a href={resolve(study.clientUrl as RouteId)}>
														{study.clientName}
													</a>
												{/if}
											{:else}
												{study.clientName}
											{/if}
										</h2>
									</div>
								</div>

								<h3 class="cs-case-headline">
									{study.headline.before}<span>{study.headline.accent}</span>{study.headline
										.after ?? ''}
								</h3>

								<div class="cs-case-detail">
									<p class="cs-case-detail-label problem">Problem</p>
									<p class="cs-case-detail-copy">{study.problem}</p>
								</div>

								<div class="cs-case-detail">
									<p class="cs-case-detail-label solution">Solution</p>
									<p class="cs-case-detail-copy">{study.solution}</p>
								</div>

								<blockquote class="cs-case-quote">
									<p>{study.quote}</p>
									<footer>{study.quoteAttribution}</footer>
								</blockquote>

								<div class="cs-case-metrics">
									{#each study.metrics as metric (metric.label)}
										<div class="cs-case-metric">
											<p class="cs-case-metric-value">
												{metric.value}
												{#if metric.unit}
													<span>{metric.unit}</span>
												{/if}
											</p>
											<p class="cs-case-metric-label">{metric.label}</p>
										</div>
									{/each}
								</div>
							</div>
						{:else}
							<div class="cs-case-content">
								<div class="cs-case-client">
									<div class="cs-case-logo" aria-hidden="true">{study.logo}</div>
									<div>
										<p class="cs-case-client-meta">{study.clientMeta}</p>
										<h2 class="cs-case-client-name">
											{#if study.clientUrl}
												{#if study.clientUrlExternal}
													<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
													<a href={study.clientUrl} target="_blank" rel="noreferrer">
														{study.clientName}
													</a>
												{:else}
													<a href={resolve(study.clientUrl as RouteId)}>
														{study.clientName}
													</a>
												{/if}
											{:else}
												{study.clientName}
											{/if}
										</h2>
									</div>
								</div>

								<h3 class="cs-case-headline">
									{study.headline.before}<span>{study.headline.accent}</span>{study.headline
										.after ?? ''}
								</h3>

								<div class="cs-case-detail">
									<p class="cs-case-detail-label problem">Problem</p>
									<p class="cs-case-detail-copy">{study.problem}</p>
								</div>

								<div class="cs-case-detail">
									<p class="cs-case-detail-label solution">Solution</p>
									<p class="cs-case-detail-copy">{study.solution}</p>
								</div>

								<blockquote class="cs-case-quote">
									<p>{study.quote}</p>
									<footer>{study.quoteAttribution}</footer>
								</blockquote>

								<div class="cs-case-metrics">
									{#each study.metrics as metric (metric.label)}
										<div class="cs-case-metric">
											<p class="cs-case-metric-value">
												{metric.value}
												{#if metric.unit}
													<span>{metric.unit}</span>
												{/if}
											</p>
											<p class="cs-case-metric-label">{metric.label}</p>
										</div>
									{/each}
								</div>
							</div>

							<div class="cs-case-visual">
								<div class="cs-case-visual-shell">
									<div>
										<p class="cs-visual-eyebrow">{study.visual.eyebrow}</p>
										<div class="cs-visual-tags">
											{#each study.visual.tags as tag (tag)}
												<span class="cs-visual-tag">{tag}</span>
											{/each}
										</div>
									</div>

									<img src={study.imageSrc} alt={study.imageAlt} class="cs-visual-image" />

									{#if study.visual.kind === 'readout'}
										<div class="cs-visual-readout" role="list">
											{#each study.visual.entries as entry (entry.label)}
												<div class="cs-visual-row" role="listitem">
													<span class="cs-visual-key">{entry.label}</span>
													<span
														class:neutral={entry.tone === 'neutral'}
														class:ok={entry.tone === 'ok'}
														class:warn={entry.tone === 'warn'}
														class="cs-visual-value"
													>
														{entry.value}
													</span>
												</div>
											{/each}
										</div>
									{:else}
										<div class="cs-zone-grid" role="list">
											{#each study.visual.entries as entry (entry.label)}
												<div
													class:warn={entry.tone === 'warn'}
													class="cs-zone-cell"
													role="listitem"
												>
													<span class="cs-zone-label">{entry.label}</span>
													<span class:warn={entry.tone === 'warn'} class="cs-zone-value">
														{entry.value}
													</span>
												</div>
											{/each}
										</div>

										<p class="cs-visual-footnote end">{study.visual.footerNote}</p>
									{/if}
								</div>
							</div>
						{/if}
					</div>

					<div class="cs-case-footer">
						<span>Deployed / {study.deployed} / {study.deploymentNote}</span>
						{#if study.footerLink.external}
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
							<a class="cs-case-link" href={study.footerLink.href} target="_blank" rel="noreferrer">
								{study.footerLink.label}
							</a>
						{:else}
							<a class="cs-case-link" href={resolve(study.footerLink.href as RouteId)}>
								{study.footerLink.label}
							</a>
						{/if}
					</div>
				</article>
			</div>
		</section>

		{#if index === bandInsertAfter}
			<section class="cs-band">
				<div class="cs-container">
					<p class="cs-band-eyebrow">{commonThread.eyebrow}</p>
					<h2 class="cs-band-headline">
						{commonThread.before}<span>{commonThread.accent}</span>
					</h2>
				</div>
			</section>
		{/if}
	{/each}

	<section class="cs-closing">
		<div class="cs-container cs-closing-grid">
			<div class="cs-closing-copy">
				<p class="cs-closing-eyebrow">Next step / 06</p>
				<h2 class="cs-closing-title">Your facility could be next.</h2>
				<p class="cs-closing-body">
					Tell us what you are monitoring today, or what you wish you could monitor. We will spec a
					starter kit, map the rollout, and show where the first quarter payoff should come from.
				</p>

				<div class="cs-closing-actions">
					<a class="cs-primary-action" href={resolve('/contact')} data-ga-click="case-studies-demo">
						Book a 20-minute demo
					</a>
					<a class="cs-secondary-action" href={resolve('/products')}>See products</a>
				</div>
			</div>

			<div class="cs-closing-panel">
				<p class="cs-closing-panel-title">Starter kit / CW-START-03</p>

				<div class="cs-closing-facts">
					{#each closingFacts as fact (fact.label)}
						<div class="cs-closing-fact">
							<span class="cs-closing-fact-label">{fact.label}</span>
							<span class:highlight={fact.highlight} class="cs-closing-fact-value">
								{fact.value}
							</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>
</div>
