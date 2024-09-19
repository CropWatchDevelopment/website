<script>
	import Carasol from '$lib/components/Carasol.svelte';
	import Pricing from '$lib/components/Pricing.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
</script>

<svelte:head>
	<title>CropWatch</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Carasol />


<div class="callouts-wrapper">
	<div class="container">
		<div class="title">
			<h2>Welcome to <span>CropWatch</span></h2>
			<span class="title-border-green"></span>
		</div>
		<p>
			Lorem Ipsum is simply dummy text of the printing and typesetting industry. printing and
			typesetting industry.
		</p>
		<p>Lorem Ipsum has been the industry's standard dummy text ever</p>
		<div class="col-sm-6 col-md-3 callouts wow fadeIn animated" data-wow-duration="1.5s">
			<i class="fa fa-tablet circle"></i>
			<h3>Fully Responsive</h3>
			<p>Coccaecat cupidatat aliqu proident sunt in culpa qui officia deserunt mollit anim.</p>
			<a href="javascript:void(0)" class="btn">Read more</a>
		</div>
		<div
			class="col-sm-6 col-md-3 callouts wow fadeIn animated"
			data-wow-duration="1.5s"
			data-wow-delay="0.3s"
		>
			<i class="fa fa-paint-brush circle" aria-hidden="true"></i>
			<h3>Clean Design</h3>
			<p>Coccaecat cupidatat aliqu proident sunt in culpa qui officia deserunt mollit anim.</p>
			<a href="javascript:void(0)" class="btn">Read more</a>
		</div>
		<div
			class="col-sm-6 col-md-3 callouts wow fadeIn animated"
			data-wow-duration="1.5s"
			data-wow-delay="0.5s"
		>
			<i class="fa fa-magic circle" aria-hidden="true"></i>
			<h3>Retina Ready</h3>
			<p>Coccaecat cupidatat aliqu proident sunt in culpa qui officia deserunt mollit anim.</p>
			<a href="javascript:void(0)" class="btn">Read more</a>
		</div>
		<div
			class="col-sm-6 col-md-3 callouts wow fadeIn animated"
			data-wow-duration="1.5s"
			data-wow-delay="0.7s"
		>
			<i class="fa fa-cogs circle" aria-hidden="true"></i>
			<h3>Multipurpose</h3>
			<p>Coccaecat cupidatat aliqu proident sunt in culpa qui officia deserunt mollit anim.</p>
			<a href="javascript:void(0)" class="btn">Read more</a>
		</div>
	</div>
</div>

<Stats />
<Pricing />
<Testimonials />

<div class="signup-wrapper bm-remove animate fadeInDown" data-anim-type="fadeInDown">
	<div class="container">
		<h2>Sign Up our Website today!</h2>
		<p>excepteur sint occaecat cupidatat non proiden deserunt mollit anim laborum.</p>
		<a href="javascript:void(0)">Sign up now!</a>
	</div>
</div>
