<!--
  App shell for /demo — port of CropWatch/src/routes/+layout.svelte.

  The marketing header/footer are suppressed for this subtree (see the `bare`
  check in the root +layout.svelte) so the demo fills the viewport exactly like
  the real dashboard does.
-->
<script lang="ts">
	import { page } from '$app/state';
	import {
		createCwToastContext,
		CwToastContainer,
		type CwSideNavMode
	} from '@cropwatchdevelopment/cwui';
	import DemoHeader from './DemoHeader.svelte';
	import DemoSidebar from './DemoSidebar.svelte';
	import './demo.css';

	let { children } = $props();

	createCwToastContext();

	let mode = $state<CwSideNavMode>('open');

	// /demo/login is the demo's equivalent of the app's /auth routes: no sidebar,
	// no header, content owns the full viewport.
	const isAuthRoute = $derived(page.url.pathname.startsWith('/demo/login'));
</script>

<svelte:head>
	<!-- A fabricated dashboard is not something search engines should surface as
	     CropWatch content; the marketing pages carry the SEO. -->
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<CwToastContainer />

<div class="cw-demo">
	{#if !isAuthRoute}
		<DemoSidebar bind:mode />

		<div class="cw-demo__content">
			<DemoHeader bind:mode />

			<main class="cw-demo__main">{@render children()}</main>
		</div>
	{:else}
		<main class="cw-demo__main cw-demo__main--standalone">{@render children()}</main>
	{/if}
</div>
