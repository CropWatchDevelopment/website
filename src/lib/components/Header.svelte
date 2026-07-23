<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';

	const LOGO = '/assets/logos/cropwatch_static.svg';

	type Product = { href: string; icon: string; t: string; d: string };

	const products: Product[] = [
		{ href: '/cold-chain', icon: 'ac_unit', t: 'Cold-Chain Monitoring', d: 'Freezers, walk-ins, restaurants, pharma' },
		{ href: '/livestock', icon: 'pets', t: 'Livestock Monitoring', d: 'Poultry houses, barns, dairy' },
		{ href: '/agriculture', icon: 'eco', t: 'Agricultural Monitoring', d: 'Greenhouse, field, soil & canopy' },
		{ href: '/replacement-sensors', icon: 'cable', t: 'Replacement Sensors', d: 'Field-swappable, ISO 17025 certified' }
	];

	const productPaths = products.map((p) => p.href);

	// On the root sectors splash the header collapses to a slim, logo-only bar.
	let { splash = false } = $props();

	let menuOpen = $state(false);

	const path = $derived(page.url.pathname);
	const isHome = $derived(path === '/home');
	const isProducts = $derived(productPaths.includes(path));
	const isPricing = $derived(path === '/pricing');
	const isNews = $derived(path === '/news');
	const isContact = $derived(path === '/contact');

	// Close the mobile menu after any navigation, and lock body scroll while open.
	afterNavigate(() => (menuOpen = false));
	$effect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : '';
		return () => (document.body.style.overflow = '');
	});

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && menuOpen) menuOpen = false;
	}
</script>

<header class="hdr" class:hdr--splash={splash}>
	<div class="hdr__top">
		<div class="wrap hdr__top-in">
			<div class="hdr__welcome">
				<strong><i>CropWatch<sup><small>®</small></sup></i></strong><span class="sep">|</span><span>United States &amp; Global</span>
			</div>
			<div class="hdr__top-links">
				<a href="tel:+(978)381-3105"><span class="material-symbols-rounded">call</span> +1 (978) 381-3105</a>
				<a href="mailto:kevin@cropwatch.io">kevin@cropwatch.io</a>
			</div>
		</div>
	</div>

	<div class="hdr__bar">
		<div class="wrap hdr__main">
			<a class="brand" href="/home">
				<!-- <picture> + id are load-bearing: christmas-header.js targets
			     #header-logo's enclosing <picture> for the seasonal logo swap. -->
			<picture>
				<source srcset={LOGO} type="image/svg+xml" />
				<img id="header-logo" src={LOGO} alt="CropWatch" class="brand__mark" width="46" height="46" />
			</picture>
				<span class="brand__txt">
					<span class="brand__name">CropWatch<sup><small>®</small></sup></span>
					<span class="brand__tag">Quality monitoring devices</span>
				</span>
			</a>

			<nav class="nav" aria-label="Primary">
				<a class="nav__item" class:is-current={isHome} href="/home">Why CropWatch?</a>

				<div class="navdrop">
					<a class="nav__item" class:is-current={isProducts} href="/cold-chain">
						Products <span class="material-symbols-rounded">expand_more</span>
					</a>
					<div class="pd">
						<div class="pd__inner">
							{#each products as p (p.href)}
								<a class="pd__item" href={p.href}>
									<span class="pd__ic"><span class="material-symbols-rounded">{p.icon}</span></span>
									<span class="pd__tx"><b>{p.t}</b><span>{p.d}</span></span>
								</a>
							{/each}
							<a class="pd__all" href="/">
								All products &amp; sensors <span class="material-symbols-rounded">arrow_forward</span>
							</a>
						</div>
					</div>
				</div>

				<a class="nav__item" class:is-current={isPricing} href="/pricing">Pricing</a>
				<a class="nav__item" class:is-current={isNews} href="/news">News</a>
				<a class="nav__item" class:is-current={isContact} href="/contact">Contact</a>
			</nav>

			<div class="hdr__actions">
				<a href="https://app.cropwatch.io" class="util"><span class="material-symbols-rounded">exit_to_app</span> App</a>
				<a href="https://api.cropwatch.io" class="util"><span class="material-symbols-rounded">api</span> API</a>
				<a href="/contact" class="cta-pill">Book a demo</a>
			</div>

			<button class="burger" type="button" aria-label="Open menu" onclick={() => (menuOpen = true)}>
				<span class="material-symbols-rounded">menu</span>
			</button>
		</div>
	</div>
</header>

<svelte:window onkeydown={onKeydown} />

<div class="m-menu" hidden={!menuOpen} role="dialog" aria-modal="true" aria-label="Site menu">
	<button class="m-scrim" type="button" aria-label="Close menu" onclick={() => (menuOpen = false)}></button>
	<div class="m-menu__head">
		<span class="brand__name" style="color:#fff">Menu</span>
		<button class="m-close" type="button" aria-label="Close menu" onclick={() => (menuOpen = false)}>
			<span class="material-symbols-rounded">close</span>
		</button>
	</div>
	<nav class="m-nav">
		<a class="m-link" href="/home">Home</a>

		<div class="m-group">
			<a class="m-link" href="/cold-chain">Products</a>
			{#each products as p (p.href)}
				<a class="m-sub" href={p.href}><span class="material-symbols-rounded">{p.icon}</span>{p.t}</a>
			{/each}
		</div>

		<a class="m-link" href="/home#why">Why CropWatch</a>
		<a class="m-link" href="/pricing">Pricing</a>
		<a class="m-link" href="/news">News</a>
		<a class="m-link" href="/contact">Contact</a>

		<a class="cta-pill cta-pill--lg" style="margin-top:18px;justify-content:center" href="/contact">Book a demo</a>
		<div class="m-util">
			<a href="https://app.cropwatch.io"><span class="material-symbols-rounded">exit_to_app</span> Open the app</a>
			<a href="https://api.cropwatch.io"><span class="material-symbols-rounded">api</span> API docs</a>
			<a href="https://cropwatch.co.jp"><span class="material-symbols-rounded">language</span> 日本語 (.co.jp)</a>
		</div>
	</nav>
</div>

<style>
	/* Transparent backdrop that closes the menu on click/keyboard (accessible
	   replacement for a click handler on the overlay div). The panel and head
	   sit above it so only the scrim area dismisses the menu. */
	.m-scrim {
		position: absolute;
		inset: 0;
		z-index: 0;
		margin: 0;
		padding: 0;
		border: 0;
		background: transparent;
		cursor: default;
	}
	.m-menu :global(.m-menu__head),
	.m-menu :global(.m-nav) {
		position: relative;
		z-index: 1;
	}
</style>
