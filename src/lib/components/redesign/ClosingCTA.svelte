<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { loc } from '$lib/i18n/navigation';

	interface Props {
		showSecondary?: boolean;
	}
	let { showSecondary = true }: Props = $props();
</script>

<section class="cw-section cw-bg-dark cta-dark">
	<div class="cw-container">
		<div class="cta-dark-inner">
			<span class="cw-eyebrow cw-gold">{$_('rd.cta.eyebrow')}</span>
			<h2>{$_('rd.cta.title')}</h2>
			<p>{$_('rd.cta.body')}</p>
			<div class="cw-btn-row">
				<a href={$loc('/contact')} class="cw-btn cw-btn-primary">{$_('rd.cta.primary')}</a>
				{#if showSecondary}
					<a href={$loc('/case-studies')} class="cw-btn cw-btn-ghost-dark">{$_('rd.cta.secondary')}</a>
				{/if}
			</div>
		</div>
	</div>
</section>
