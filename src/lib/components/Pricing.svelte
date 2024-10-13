<script lang="ts">
	export let prices;
</script>

<div class="callouts-wrapper team tw-bg-slate-400">
	<div class="container">
		<section class="section" id="pricing">
			<script
				async
				src="https://js.stripe.com/v3/pricing-table.js"
			></script>
			<stripe-pricing-table
				pricing-table-id="prctbl_1Q9NqSFvjxXrUyebQMWtdwwV"
				publishable-key="pk_live_51Kxva6FvjxXrUyebr6N62bkikUenjyebI9GJ55BCv86LuV6bLFmaAczHTIKfGxA0GonWjldSASBm5wK4Ijt48Bcq00hyGgpV4h"
			>
			</stripe-pricing-table>
		</section>
	</div>
</div>
