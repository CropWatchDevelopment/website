<script lang="ts">
	import Callouts from '$lib/components/Callouts.svelte';
	import Cta from '$lib/components/CTA.svelte';
	import Cta2 from '$lib/components/CTA2.svelte';
	import DashboardCard from '$lib/components/DashboardCard.svelte';
	import Pricing from '$lib/components/Pricing.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import Statistics from '$lib/components/Statistics.svelte';


	export let data;
	const calloutSection = data.callout?.translations[0];
	const callouts = data.callouts;

	const slides = data.slides;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Slider {slides} />
<Cta cta={data.cta} />
<Callouts {calloutSection} {callouts} />
<Statistics />
<Pricing />
<!-- <Cta2 /> -->
