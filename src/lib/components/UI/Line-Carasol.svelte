<script lang="ts">
	import { onMount } from 'svelte';

	let carousel: HTMLElement | null = null;
	let track: HTMLElement | null = null;

	let index = 0;
	let interval: NodeJS.Timeout | null = null;

	const products = [
        {
            image: '/images/CW-SS-TMEPNPK.webp',
			alt: "CropWatch's 7 in 1 Soil Sensor",
            text: 'CropWatch Soil Sensor',
            link: "/product/CW-SS-TMEPNPK",
        },
        {
            image: '/images/Milesight_EM500-co2.webp',
			alt: "Milesight's CO2 EM500 Sensor",
            text: 'MileSight CO2 Sensor',
            link: "/product/milesight-em500-co2"
        },
        {
            image: '/images/RA02A Wireless Smoke Detector.webp',
			alt: "Smoke Detector Over LoRaWAN",
            text: 'Netvox Smoke Detector',
            link: "/product/netvox-ra02a"
        },
        {
            image: '/images/seeed.webp',
			alt: "SEEED's 8 in 1 weather station",
            text: 'SEEED Weather Station',
            link: "/product/seed-weatherstation"
        },
        {
            image: '/images/TUNDRA-ISO-2000x2000.webp',
			alt: "Food Grade Temperature Sensor",
            text: 'Tundra Temperature Sensor',
            link: "/product/tundra"
        },
        {
            image: '/images/breeze-solution-768x768.webp',
			alt: "Building Management Temp and CO2 sensor",
            text: 'Tektelic Breeze',
            link: "/product/breeze-v"
        },
        {
            image: '/images/image_1.webp',
			alt: "Personal Protection watch device",
            text: 'CropWatch Safety Monitor Watch',
            link: '/product/CW-LW-1',
        },
        {
            image: '/images/CHICKADEE-ISO2-768x768.webp',
			alt: "Personal Protection Card Sized device",
            text: 'Tektelic Personal Tracker',
            link: '/product/tektelic-chickadee',
        },
        {
            image: '/images/AI_canera_1.webp',
			alt: "AI Device for Traffic Counting",
            text: 'CropWatch AI Traffic Counting',
            link: '#',
        },
    ];

	const visibleItems = 3;

	const startCarousel = () => {
		interval = setInterval(() => {
			index = (index + 1) % products.length;
			if (track) {
				const totalWidth = track.scrollWidth;
				const itemWidth = totalWidth / products.length;
				const offset = (index * itemWidth);
				track.style.transform = `translateX(-${offset}px)`;
			}
		}, 10000);
	};

	const stopCarousel = () => {
		if (interval) {
			clearInterval(interval);
		}
	};

	const previousSlide = () => {
		index = (index - 1 + products.length) % products.length;
		if (track) {
			const totalWidth = track.scrollWidth;
			const itemWidth = totalWidth / products.length;
			const offset = (index * itemWidth);
			track.style.transform = `translateX(-${offset}px)`;
		}
	};

	const nextSlide = () => {
		index = (index + 1) % products.length;
		if (track) {
			const totalWidth = track.scrollWidth;
			const itemWidth = totalWidth / products.length;
			const offset = (index * itemWidth);
			track.style.transform = `translateX(-${offset}px)`;
		}
	};

	onMount(() => {
		carousel?.addEventListener('mouseenter', stopCarousel);
		carousel?.addEventListener('mouseleave', startCarousel);

		startCarousel();

		return () => {
			carousel?.removeEventListener('mouseenter', stopCarousel);
			carousel?.removeEventListener('mouseleave', startCarousel);
			stopCarousel();
		};
	});
</script>

<section bind:this={carousel} class="relative overflow-hidden py-8 w-full">
	<button
		class="absolute left-0 top-0 h-full bg-black bg-opacity-50 text-white px-4 focus:outline-none z-20"
		on:click={previousSlide}
	>
		&#8249;
	</button>
	<div bind:this={track} class="flex transition-transform duration-500 ease-linear space-x-4 z-10">
		{#each products as { image, text, link, alt }}
			<a
				href={link}
				class="carousel-slide flex-shrink-0 w-1/3 text-center bg-slate-500 hover:bg-slate-500/50 p-1 hover:p-0 shadow-lg z-10"
				aria-label={text}
			>
				<img src={image} {alt} class="mx-auto h-64 object-cover rounded-lg" height="256px" width="255px" loading="lazy" />
				<p class="mt-4 text-lg font-bold">{text}</p>
			</a>
		{/each}
	</div>
	<button
		class="absolute right-0 top-0 h-full bg-black bg-opacity-50 text-white px-4 focus:outline-none z-20"
		on:click={nextSlide}
	>
		&#8250;
	</button>
</section>

<style>
	.carousel-slide {
		width: calc(100% / 3); /* Display 3 items at once */
	}
</style>
