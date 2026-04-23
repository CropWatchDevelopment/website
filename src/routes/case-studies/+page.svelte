<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import ClosingCTA from '$lib/components/redesign/ClosingCTA.svelte';
	import Seo from '$lib/components/redesign/Seo.svelte';
	import { loc } from '$lib/i18n/navigation';
	import { CS_DATA } from '$lib/components/redesign/caseStudiesData';

	type Filter = 'all' | 'cold' | 'hosp' | 'ag' | 'live';
	let filter = $state<Filter>('all');

	let currentLang = $derived<'en' | 'ja'>(($locale ?? 'en').startsWith('ja') ? 'ja' : 'en');
	let data = $derived(CS_DATA[currentLang]);
	let filtered = $derived(filter === 'all' ? data : data.filter((d) => d.sector === filter));

	const filters: { k: Filter; label: string }[] = [
		{ k: 'all', label: 'rd.cs.filter_all' },
		{ k: 'cold', label: 'rd.cs.filter_cold' },
		{ k: 'hosp', label: 'rd.cs.filter_hosp' },
		{ k: 'ag', label: 'rd.cs.filter_ag' },
		{ k: 'live', label: 'rd.cs.filter_live' }
	];

	function pad2(n: number) {
		return String(n).padStart(2, '0');
	}
</script>

<Seo
	title={$_('rd.seo.case_studies.title')}
	description={$_('rd.seo.case_studies.description')}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: $_('rd.hdr.nav.home'), item: 'https://www.cropwatch.io' + $loc('/') },
			{ '@type': 'ListItem', position: 2, name: $_('rd.hdr.nav.case_studies') }
		]
	}}
/>

<div class="cs-page">
	<!-- Hero -->
	<section class="cs-hero">
		<div class="cw-container">
			<div class="cs-hero-grid">
				<div>
					<p class="cs-hero-kicker">{$_('rd.cs.kicker')}</p>
					<h1 class="cs-hero-title">
						<span>{$_('rd.cs.title_1')}</span>
						<span>{$_('rd.cs.title_2')}</span>
						<span>{$_('rd.cs.title_3')}</span>
					</h1>
					<p class="cs-hero-body">{$_('rd.cs.body')}</p>
				</div>
				<div class="cs-hero-stats">
					{#each [1, 2, 3, 4] as n}
						<div class="cs-hero-stat">
							<p class="cs-hero-stat-label">{$_(`rd.cs.stat${n}`)}</p>
							<p class="cs-hero-stat-value">{$_(`rd.cs.stat${n}v`)}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Filter bar -->
	<section class="cs-filter-bar">
		<div class="cw-container">
			<div class="cs-filter-row">
				<div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
					{#each filters as f (f.k)}
						<button
							class="cs-chip {filter === f.k ? 'active' : ''}"
							onclick={() => (filter = f.k)}
							type="button"
						>
							{$_(f.label)}
						</button>
					{/each}
				</div>
				<p class="cs-filter-summary">{filtered.length} / {data.length}</p>
			</div>
		</div>
	</section>

	<!-- Cases -->
	{#each filtered as c, idx (c.id)}
		<section class="cs-case-section {idx % 2 === 1 ? 'alt' : ''}">
			<div class="cw-container">
				<article class="cs-card">
					<div class="cs-case-head">
						<div class="cs-case-order">Case {c.id} / {pad2(data.length)}</div>
						<div class="cs-case-bc">
							{#each c.bc as b, i}
								{#if i > 0}
									·
								{/if}
								{#if i === c.bc.length - 1}
									<strong>{b}</strong>
								{:else}
									{b}
								{/if}
							{/each}
						</div>
						<div class="cs-case-status">
							<span class="cs-status-dot"></span>
							{c.status}
						</div>
					</div>
					<div class="cs-case-body {idx % 2 === 1 ? 'reverse' : ''}">
						<div class="cs-content">
							<div class="cs-client">
								<div class="cs-logo">{c.logoTxt}</div>
								<div>
									<p class="cs-client-meta">{c.clientMeta}</p>
									<p class="cs-client-name">{c.company}</p>
								</div>
							</div>
							<h2 class="cs-headline">{@html c.headline}</h2>
							<div class="cs-detail">
								<p class="cs-detail-label problem">{$_('rd.cs.labels_problem')}</p>
								<p class="cs-detail-copy">{c.problem}</p>
							</div>
							<div class="cs-detail">
								<p class="cs-detail-label solution">{$_('rd.cs.labels_solution')}</p>
								<p class="cs-detail-copy">{c.solution}</p>
							</div>
							<blockquote class="cs-quote">
								<p>{c.quote.text}</p>
								<footer>{c.quote.who}</footer>
							</blockquote>
							<div class="cs-metrics">
								{#each c.metrics as m, i (i)}
									<div class="cs-metric">
										<p class="cs-metric-value">
											{m.v}{#if m.unit}<span>{m.unit}</span>{/if}
										</p>
										<p class="cs-metric-label">{m.l}</p>
									</div>
								{/each}
							</div>
						</div>
						<div class="cs-visual">
							<div class="cs-visual-shell">
								<p class="cs-visual-eyebrow">{$_('rd.cs.live_readout')}</p>
								<div class="cs-visual-tags">
									{#each c.tags as tg, i (i)}
										<span class="cs-visual-tag">{tg}</span>
									{/each}
								</div>
								<div class="cs-readout">
									{#each c.readout as r, i (i)}
										<div class="cs-readout-row">
											<span class="cs-readout-key">{r.k}</span>
											<span class="cs-readout-val {r.cls}">{r.v}</span>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</article>
			</div>
		</section>
	{/each}

	<ClosingCTA showSecondary={false} />
</div>
