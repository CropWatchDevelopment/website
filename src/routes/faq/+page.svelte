<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Icon from '$lib/components/redesign/Icon.svelte';
	import ClosingCTA from '$lib/components/redesign/ClosingCTA.svelte';
	import Seo from '$lib/components/redesign/Seo.svelte';

	type TabKey = 'general' | 'hardware' | 'deploy' | 'billing';

	const tabs: { k: TabKey; keys: string[] }[] = [
		{ k: 'general', keys: ['g1', 'g2', 'g3'] },
		{ k: 'hardware', keys: ['h1', 'h2', 'h3'] },
		{ k: 'deploy', keys: ['d1', 'd2', 'd3'] },
		{ k: 'billing', keys: ['b1', 'b2'] }
	];

	let tab = $state<TabKey>('general');
	let open = $state<string | null>(null);

	let current = $derived(tabs.find((x) => x.k === tab)!);

	const ALL_FAQ_KEYS = ['g1', 'g2', 'g3', 'h1', 'h2', 'h3', 'd1', 'd2', 'd3', 'b1', 'b2'];
	let faqJsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: ALL_FAQ_KEYS.map((k) => ({
			'@type': 'Question',
			name: $_(`rd.faq.${k}_q`),
			acceptedAnswer: {
				'@type': 'Answer',
				text: $_(`rd.faq.${k}_a`)
			}
		}))
	});
</script>

<Seo
	title={$_('rd.seo.faq.title')}
	description={$_('rd.seo.faq.description')}
	jsonLd={faqJsonLd}
/>

<section class="cw-section">
	<div class="cw-container-narrow">
		<div style="text-align:center; margin-bottom:2.5rem;">
			<span class="cw-eyebrow">{$_('rd.hdr.nav.faq')}</span>
			<h1
				style="margin:0.7rem 0 1rem; font-size:clamp(2rem,4.2vw,3rem); letter-spacing:-0.03em; color:var(--cw-blue-900); line-height:1.15;"
			>
				{$_('rd.faq.title')}
			</h1>
			<p style="color:var(--cw-text-soft); font-size:1rem; margin:0;">{$_('rd.faq.body')}</p>
		</div>

		<div class="faq-tabs">
			{#each tabs as x (x.k)}
				<button
					class="cs-chip {tab === x.k ? 'active' : ''}"
					type="button"
					onclick={() => {
						tab = x.k;
						open = null;
					}}
				>
					{$_(`rd.faq.tab_${x.k}`)}
				</button>
			{/each}
		</div>

		<div>
			{#each current.keys as k (`${tab}-${k}`)}
				{@const id = `${tab}-${k}`}
				{@const isOpen = open === id}
				<div class="faq-item {isOpen ? 'open' : ''}">
					<button
						class="faq-trigger"
						type="button"
						aria-expanded={isOpen}
						onclick={() => (open = isOpen ? null : id)}
					>
						<span>{$_(`rd.faq.${k}_q`)}</span>
						<Icon name="plus" size={22} className="faq-icon" />
					</button>
					{#if isOpen}
						<div class="faq-body">{$_(`rd.faq.${k}_a`)}</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<ClosingCTA showSecondary={false} />
