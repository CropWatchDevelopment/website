<script>
    import Callout from '$lib/components/Callout.svelte';
	import Carasol from '$lib/components/Carasol.svelte';
	import Pricing from '$lib/components/Pricing.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';

	export let data;
</script>

<svelte:head>
	<title>CropWatch</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Carasol />
<Callout callout={data.callout}/>
<Stats />
<Pricing prices={data.prices} />
<Testimonials testimonials={data.testimonials} />

<div class="signup-wrapper bm-remove animate fadeInDown" data-anim-type="fadeInDown">
	<div class="container">
		<h2>Sign Up our Website today!</h2>
		<p>excepteur sint occaecat cupidatat non proiden deserunt mollit anim laborum.</p>
		<a href="javascript:void(0)">Sign up now!</a>
	</div>
</div>
