<script lang="ts">
	import { PUBLIC_APIURL } from '$env/static/public';

	export let calloutSection;
	export let callouts;
</script>

<div class="callouts-wrapper">
	<div class="container">
		<div class="title">
			<h2>{@html calloutSection.title}</h2>
			<span class="title-border-green"></span>
		</div>
		<p>
			{@html calloutSection.description}
		</p>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#each callouts as callout}
				<div>
					<div class="callouts wow fadeIn animated flex flex-col h-full" data-wow-duration="1.5s">
						{#if callout.translations[0]?.image}
							<img
								src={`${PUBLIC_APIURL}/assets/${callout.translations[0]?.image}`}
								alt={callout.translations[0]?.title}
								class="mx-auto mb-7 h-24 w-24 rounded-full"
							/>
						{:else}
							<i class="fa fa-tablet circle" />
						{/if}
						<h3>{callout.translations[0]?.title}</h3>
						<p>
							{@html callout.translations[0]?.description}
						</p>
						<!-- Spacer to push the button to the bottom -->
						<div class="flex-grow"></div>
						<a href={`/page/${callout.slug}`} class="btn mt-auto">Read more</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	h2 {
		font-size: 30px;
		font-weight: 700;
		margin-bottom: 20px;
	}

	i {
		margin-left: auto;
		margin-right: auto;
	}

	.callouts {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	/* Ensure the grid items have consistent height */
	.grid > div {
		display: flex;
		flex-direction: column;
	}

	.callouts p {
		flex-grow: 1; /* Allow the p tag to take up the available space */
	}

	.btn {
		margin-top: auto; /* Push the button to the bottom */
	}
</style>
