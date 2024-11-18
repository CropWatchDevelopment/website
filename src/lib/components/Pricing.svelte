<script lang="ts">
	import DashboardCard from "./DashboardCard.svelte";
</script>

<div class="bg-white py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-4xl text-center">
			<p class="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
				User Interface Demo
			</p>
			<h2 class="text-base font-semibold leading-7 text-indigo-600">
				Our clear, concise, and easy to use UI gets you the data you need fast, so you can make informed decisions.
			</h2>
		</div>

		<div class="relative flex items-center justify-center">
			<DashboardCard />
		</div>
	</div>
</div>

<style>
	.relative {
		position: relative;
	}
	
	.fade-left,
	.fade-right {
		position: relative;
	}
	
	.fade-left::after,
	.fade-right::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		width: 50%;
		background: linear-gradient(to right, rgba(255, 255, 255, 0) 100%, white 0%);
		pointer-events: none;
	}
	
	.fade-left::after {
		left: 80%; /* Bring the gradient closer to the DashboardCard */
		transform: translateX(-100%);
    transform: skewY(10deg);
    margin-bottom: 30px;
	}
	
	.fade-right::after {
		right: 100%;
		transform: translateX(100%);
	}
	
	.relative img {
		width: auto;
		height: 100%;
		max-width: 100%;
		display: block;
	}
	</style>
	