<script lang="ts">
	export let prices;
</script>

<div class="team-wrapper team tw-bg-slate-400">
	<div class="container">
		<section class="section" id="pricing">
			<div class="container">
				<div class="row mt-5 pt-4">
					{#each prices as price}
						<div class="col-lg-4">
							<div class="pricing-box mt-4">
								<div class="pricing-badge">
									<span class="badge">{price.title}</span>
								</div>

								<i
									class="mdi mdi-account-multiple h1 text-primary"
								></i>
								<h4 class="f-20 text-primary">{price.title}</h4>

								<div class="mt-4 pt-2">
									<p class="mb-2 f-18">{price.subtitle}</p>

									{#each price.features as feature}
									<p class="mb-2">
										<i
											class="mdi mdi-checkbox-marked-circle text-success f-18 mr-2"
										></i><b>{feature.featuretitle}</b>
										{feature.value}
									</p>
									{/each}
									
									
								</div>

								<p class="mt-4 pt-2 text-muted">
									{@html price.description}
								</p>

								<div class="pricing-plan mt-4 pt-2">
									<h4 class="text-muted">
										<span class="plan pl-3 text-dark"
											>${(+price.price).toFixed(2)}</span
										>
									</h4>
									<p class="text-muted mb-0">{price.timeframe}</p>
								</div>

								<div class="mt-4 pt-3">
									<a
										href=""
										class="btn btn-primary btn-rounded"
										>{price.button_text}</a
									>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>
	</div>
</div>

<style>
	.pricing-box {
		-webkit-box-shadow: 0px 5px 30px -10px rgba(0, 0, 0, 0.1);
		box-shadow: 0px 5px 30px -10px rgba(0, 0, 0, 0.1);
		padding: 35px 50px;
		border-radius: 20px;
		position: relative;
		background-color: white;
		margin-bottom: 5px;
	}

	.pricing-box .plan {
		font-size: 34px;
	}

	.pricing-badge {
		position: absolute;
		top: 0;
		z-index: 999;
		right: 0;
		width: 100%;
		display: block;
		font-size: 15px;
		padding: 0;
		overflow: hidden;
		height: 100px;
	}

	.pricing-badge .badge {
		float: right;
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
		right: -67px;
		top: 17px;
		position: relative;
		text-align: center;
		width: 200px;
		font-size: 13px;
		margin: 0;
		padding: 7px 10px;
		font-weight: 500;
		color: #ffffff;
		background: #fb7179;
	}
	.mb-2,
	.my-2 {
		margin-bottom: 0.5rem !important;
	}
	p {
		line-height: 1.7;
	}
</style>
