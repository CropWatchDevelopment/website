<script lang="ts">
	import { _ } from 'svelte-i18n';
	import HeroSlider from '$lib/components/redesign/HeroSlider.svelte';
	import ClosingCTA from '$lib/components/redesign/ClosingCTA.svelte';
	import Icon from '$lib/components/redesign/Icon.svelte';
	import StandardsBanner from '$lib/components/StandardsBanner.svelte';
	import Seo from '$lib/components/redesign/Seo.svelte';
	import { loc } from '$lib/i18n/navigation';

	const steps = [
		{ k: '1', icon: 'sensor' },
		{ k: '2', icon: 'router' },
		{ k: '3', icon: 'open' },
		{ k: '4', icon: 'alert' }
	];

	const proofCards = [
		{ k: 'battery', bullets: 3 },
		{ k: 'accuracy', bullets: 3 },
		{ k: 'connect', bullets: 3 }
	];

	const industries = [
		{ k: 'cold', icon: 'cold' },
		{ k: 'ag', icon: 'wheat' },
		{ k: 'food', icon: 'chef' },
		{ k: 'mfg', icon: 'factory' },
		{ k: 'live', icon: 'cow' },
		{ k: 'pub', icon: 'globe' }
	];
</script>

<Seo
	title={$_('rd.seo.home.title')}
	description={$_('rd.seo.home.description')}
	ogType="website"
/>

<HeroSlider />
<StandardsBanner />

<!-- Clarity / What we do -->
<section class="clarity">
	<div class="cw-container-narrow">
		<div class="clarity-one-liner">
			<span class="cw-eyebrow">{$_('rd.clarity.eyebrow')}</span>
			<h2>
				{$_('rd.clarity.headline_a')}<em>{$_('rd.clarity.headline_b')}</em>{$_(
					'rd.clarity.headline_c'
				)}
			</h2>
			<p class="clarity-sub">{$_('rd.clarity.sub')}</p>
		</div>
	</div>
	<div class="cw-container">
		<div style="text-align:center; margin-bottom:1.5rem;">
			<span class="cw-eyebrow">{$_('rd.clarity.how_eyebrow')}</span>
			<h3
				style="margin:0.6rem 0 0; font-size:clamp(1.4rem,2.6vw,1.9rem); color:var(--cw-blue-900); letter-spacing:-0.02em;"
			>
				{$_('rd.clarity.how_title')}
			</h3>
		</div>
		<div class="clarity-how">
			{#each steps as s (s.k)}
				<div class="clarity-step">
					<div class="clarity-step-num">{s.k}</div>
					<div class="clarity-step-icon">
						<Icon name={s.icon} size={28} />
					</div>
					<h3>{$_(`rd.clarity.step${s.k}_title`)}</h3>
					<p>{$_(`rd.clarity.step${s.k}_body`)}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Proof -->
<section class="cw-section cw-bg-navy">
	<div class="cw-container">
		<div class="cw-section-head">
			<span class="cw-eyebrow cw-gold">{$_('rd.proof.eyebrow')}</span>
			<h2>{$_('rd.proof.title')}</h2>
		</div>
		<div class="proof-grid">
			{#each proofCards as c (c.k)}
				<article class="proof-card">
					<div class="cw-eyebrow cw-gold">{$_(`rd.proof.${c.k}.eyebrow`)}</div>
					<h3>{$_(`rd.proof.${c.k}.title`)}</h3>
					<ul>
						{#each Array(c.bullets) as _b, i}
							<li>{$_(`rd.proof.${c.k}.b${i + 1}`)}</li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- Industries -->
<section class="cw-section cw-bg-ice">
	<div class="cw-container">
		<div class="cw-section-head">
			<span class="cw-eyebrow">{$_('rd.ind.eyebrow')}</span>
			<h2>{$_('rd.ind.title')}</h2>
			<p>{$_('rd.ind.intro')}</p>
		</div>
		<div class="ind-grid">
			{#each industries as it (it.k)}
				<a href={$loc('/case-studies')} class="ind-card">
					<div class="ind-card-icon">
						<Icon name={it.icon} size={26} />
					</div>
					<h3>{$_(`rd.ind.${it.k}.title`)}</h3>
					<p>{$_(`rd.ind.${it.k}.body`)}</p>
				</a>
			{/each}
		</div>
	</div>
</section>

<ClosingCTA />
