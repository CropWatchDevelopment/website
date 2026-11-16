<!--
  App shell for /demo — port of CropWatch/src/routes/+layout.svelte.

  The marketing header/footer are suppressed for this subtree (see the `bare`
  check in the root +layout.svelte) so the demo fills the viewport exactly like
  the real dashboard does.

  Demo-only addition: the red DemoBanner row above the whole shell, on every
  demo screen including the login.
-->
<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import {
		createCwToastContext,
		CwToastContainer,
		type CwSideNavMode
	} from '@cropwatchdevelopment/cwui';
	import DemoBanner from './DemoBanner.svelte';
	import DemoHeader from './DemoHeader.svelte';
	import DemoSidebar from './DemoSidebar.svelte';
	import './demo.css';

	let { children } = $props();

	createCwToastContext();

	let mode = $state<CwSideNavMode>('open');

	// /demo/login is the demo's equivalent of the app's /auth routes: no sidebar,
	// no header, content owns the full viewport.
	const isAuthRoute = $derived(page.url.pathname.startsWith('/demo/login'));

	// The page scrolls inside <main>, not the window, so SvelteKit's own scroll
	// reset never reaches it: start each new page at the top.
	let main = $state<HTMLElement | null>(null);
	afterNavigate(({ from, to }) => {
		if (main && from?.url.pathname !== to?.url.pathname) main.scrollTop = 0;
	});
</script>

<svelte:head>
	<!-- A fabricated dashboard is not something search engines should surface as
	     CropWatch content; the marketing pages carry the SEO. -->
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<CwToastContainer />

<div class="cw-demo">
	<DemoBanner />

	<div class="cw-demo__body">
		{#if !isAuthRoute}
			<DemoSidebar bind:mode />

			<div class="cw-demo__content">
				<DemoHeader bind:mode />

				<main class="cw-demo__main" bind:this={main}>{@render children()}</main>
			</div>
		{:else}
			<main class="cw-demo__main cw-demo__main--standalone">{@render children()}</main>
		{/if}
	</div>
</div>
