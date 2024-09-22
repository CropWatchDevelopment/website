<script>
	import { onMount } from 'svelte';

	onMount(() => {
		if (typeof window !== 'undefined' && window.$) {
			// Initialize the carousel
			window.$('#bs-carousel').carousel({
				interval: 6000
			});
		}
	});
</script>

<div class="banner-wrapper">
	<div
		class="carousel fade-carousel slide"
		data-ride="carousel"
		data-interval="6000"
		id="bs-carousel"
	>
		<!-- Overlay -->
		<div class="overlay"></div>
		<!-- Indicators -->
		<ol class="carousel-indicators">
			<li data-target="#bs-carousel" data-slide-to="0" class="active"></li>
			<li data-target="#bs-carousel" data-slide-to="1"></li>
			<li data-target="#bs-carousel" data-slide-to="2"></li>
			<li data-target="#bs-carousel" data-slide-to="3"></li>
		</ol>
		<!-- Wrapper for slides -->
		<div class="carousel-inner">
			<div class="item slides active">
				<div class="slide-1" style="background-image: url('images/saito.jpg');" />
				<div class="hero">
					<h1 class="animated1">CropWatch LLC</h1>
					<h3 class="animated2">We don't suck</h3>
					<button class="btn btn-hero btn-lg animated3">Learn Why!</button>
				</div>
			</div>
			<div class="item slides">
				<div class="slide-2" style="background-image: url('images/chickens.jpg');" />
				<div class="hero">
					<h1 class="animated1">Realtime Data and Alerts</h1>
					<h3 class="animated2">Always be in the know with alerts direcly to your phone</h3>
					<button class="btn btn-hero btn-lg animated3">About Us</button>
				</div>
			</div>
			<div class="item slides">
				<div class="slide-3" style="background-image: url('images/potatos.jpg');" />
				<div class="hero">
					<h1 class="animated1">Cold Chain Monitoring</h1>
					<h3 class="animated2">Get data from inside of metal containers and refridgerators</h3>
					<button class="btn btn-hero btn-lg animated3">About Us</button>
				</div>
			</div>
			<div class="item slides">
				<div class="slide-3" style="background-image: url('images/pepperfield.jpg');" />
				<div class="hero">
					<h1 class="animated1">Long Distance Data</h1>
					<h3 class="animated2">We can get data from the most remote places</h3>
					<button class="btn btn-hero btn-lg animated3">About Us</button>
				</div>
			</div>
		</div>
	</div>
</div>