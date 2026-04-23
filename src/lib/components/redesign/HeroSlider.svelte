<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { _ } from 'svelte-i18n';
	import Icon from './Icon.svelte';
	import HeroArt from './HeroArt.svelte';
	import { loc } from '$lib/i18n/navigation';
	import livestockImg from '$lib/images/slider-images/livestock_header-1024.webp';
	import freezerImg from '$lib/images/slider-images/survive_the_cold.webp';
	import gatewayImg from '$lib/images/slider-images/gateway_header-1280.webp';
	import greenhouseImg from '$lib/images/slider-images/greenhouse.webp';

	const slides = [
		{ k: 'slide1', img: livestockImg, align: 'left' as const },
		{ k: 'slide2', img: freezerImg, align: 'right' as const },
		{ k: 'slide3', img: gatewayImg, align: 'left' as const },
		{ k: 'slide4', img: greenhouseImg, align: 'right' as const }
	];

	let i = $state(0);
	let timer: ReturnType<typeof setInterval> | null = null;
	let hsEl = $state<HTMLElement | null>(null);

	function start() {
		timer = setInterval(() => {
			i = (i + 1) % slides.length;
		}, 6000);
	}
	function stop() {
		if (timer) clearInterval(timer);
		timer = null;
	}
	function reset() {
		stop();
		start();
	}

	const DESKTOP_MIN_WIDTH = 900;

	function updateHeroHeight() {
		if (!hsEl) return;
		if (window.innerWidth < DESKTOP_MIN_WIDTH) {
			hsEl.style.removeProperty('--cw-hero-h');
			return;
		}
		const header = document.querySelector('header');
		const banner = hsEl.nextElementSibling as HTMLElement | null;
		const headerH = header?.offsetHeight ?? 0;
		const bannerH = banner?.offsetHeight ?? 0;
		const h = window.innerHeight - headerH - bannerH;
		if (h > 360) hsEl.style.setProperty('--cw-hero-h', `${h}px`);
		else hsEl.style.removeProperty('--cw-hero-h');
	}

	onMount(() => {
		start();
		updateHeroHeight();
		const onResize = () => updateHeroHeight();
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	});
	onDestroy(stop);
</script>

<section class="hs" aria-label="Hero carousel" bind:this={hsEl}>
	<div class="hs-track">
		{#each slides as s, idx (s.k)}
			<div class="hs-slide {idx === i ? 'active' : ''} {s.align}" aria-hidden={idx !== i}>
				<div class="hs-slide-bg"><HeroArt src={s.img} alt="" /></div>
				<div class="hs-inner">
					<div class="hs-card">
						<span class="hs-badge">{$_(`rd.${s.k}.badge`)}</span>
						<h1 class="hs-title">{$_(`rd.${s.k}.title`)}</h1>
						<p class="hs-body">{$_(`rd.${s.k}.body`)}</p>
						<div class="hs-cta-row">
							<a href={$loc('/case-studies')} class="cw-btn cw-btn-primary">
								{$_(`rd.${s.k}.cta`)}
								<Icon name="chevronRight" size={16} />
							</a>
							<a href={$loc('/contact')} class="cw-btn cw-btn-ghost-dark">{$_('rd.hdr.contact_cta')}</a>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<button
		class="hs-nav prev"
		aria-label={$_('rd.slider.prev')}
		onclick={() => {
			i = (i - 1 + slides.length) % slides.length;
			reset();
		}}
	>
		<Icon name="chevronRight" size={22} />
	</button>
	<button
		class="hs-nav next"
		aria-label={$_('rd.slider.next')}
		onclick={() => {
			i = (i + 1) % slides.length;
			reset();
		}}
	>
		<Icon name="chevronRight" size={22} />
	</button>

	<div class="hs-dots">
		{#each slides as _s, idx (idx)}
			<button
				class={idx === i ? 'active' : ''}
				aria-label={`Slide ${idx + 1}`}
				onclick={() => {
					i = idx;
					reset();
				}}
			></button>
		{/each}
	</div>
</section>
