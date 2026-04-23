<script lang="ts">
	import { _ } from 'svelte-i18n';
	import ClosingCTA from '$lib/components/redesign/ClosingCTA.svelte';
	import Seo from '$lib/components/redesign/Seo.svelte';
	import { loc } from '$lib/i18n/navigation';

	const team = [
		{ initials: 'KC', name: 'Kevin Cantrell', role: 'Founder & CEO' },
		{ initials: 'SH', name: 'Sayaka Hoshino', role: 'Customer Success' },
		{ initials: 'JZ', name: 'Jose Zuniga', role: 'Firmware & Cloud' },
		{ initials: 'SO', name: 'Sigurd Øyen', role: 'Engineering' }
	];

	const values = ['v1', 'v2', 'v3'];
</script>

<Seo
	title={$_('rd.seo.about.title')}
	description={$_('rd.seo.about.description')}
	ogType="profile"
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'AboutPage',
		name: $_('rd.seo.about.title'),
		description: $_('rd.seo.about.description'),
		url: 'https://www.cropwatch.io' + $loc('/about')
	}}
/>

<section class="cw-section" style="padding-top:clamp(3rem,5vw,4.5rem);">
	<div class="cw-container-narrow">
		<div class="about-intro">
			<div>
				<span class="cw-eyebrow">{$_('rd.about.eyebrow')}</span>
				<h1
					style="margin:0.7rem 0 1.5rem; font-size:clamp(2rem,4.2vw,3rem); letter-spacing:-0.03em; color:var(--cw-blue-900); line-height:1.1;"
				>
					{$_('rd.about.title')}
				</h1>
				<p
					style="font-size:1.05rem; line-height:1.7; color:var(--cw-text-soft); margin:0 0 1.25rem;"
				>
					{$_('rd.about.body1')}
				</p>
				<p style="font-size:1.05rem; line-height:1.7; color:var(--cw-text-soft); margin:0;">
					{$_('rd.about.body2')}
				</p>
			</div>
			<div class="img-placeholder" style="min-height:380px; border-radius:1.3rem;">
				<span>Photo · Miyazaki HQ exterior</span>
			</div>
		</div>
	</div>
</section>

<section class="cw-section cw-bg-ice">
	<div class="cw-container">
		<div class="cw-section-head">
			<span class="cw-eyebrow">{$_('rd.about.values_eyebrow')}</span>
			<h2>{$_('rd.about.values_title')}</h2>
		</div>
		<div class="values-grid">
			{#each values as k, i (k)}
				<article class="value-card">
					<span class="value-num">0{i + 1}</span>
					<h3>{$_(`rd.about.${k}_title`)}</h3>
					<p>{$_(`rd.about.${k}_body`)}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="cw-section">
	<div class="cw-container">
		<div class="cw-section-head">
			<span class="cw-eyebrow">{$_('rd.about.team_eyebrow')}</span>
			<h2>{$_('rd.about.team_title')}</h2>
			<p>{$_('rd.about.team_body')}</p>
		</div>
		<div class="team-grid">
			{#each team as m (m.initials)}
				<div class="team-card">
					<div class="team-avatar">{m.initials}</div>
					<h4>{m.name}</h4>
					<p>{m.role}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<ClosingCTA showSecondary={false} />
