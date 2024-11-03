<script lang="ts">

	export let cta;
</script>


<div class="theme-bg no-padding typo-light">
	<div class="container">
		<div class="flex-row-center">
			<!-- TEXT -->
			<!-- <span class="flex-grow" /> -->
			<div class="cta-text">
				{cta.translations[0]?.title}
			</div>
			<div class="cta-btn">
				<!-- BUTTON -->
				<a href="#footer" class="btn no-margin btn-dark btn-hv-light btn-rounded btn-default">{cta.translations[0]?.button_text ?? "Click Here"}</a>
			</div>
		</div>
	</div>
</div>

<style>
	.flex-row-center {
		display: flex;
		/* flex-direction: row; */
		justify-content: center;
		align-items: center;
		gap: 20px; /* Adjust the gap between text and buttons as needed */
		
	}

	.cta-btn {
		display: flex;
		gap: 10px; /* Adjust the spacing between the buttons */
	}

	/* .btn {
		padding: 10px 20px;
		background-color: #007bff;
		color: white;
		text-decoration: none;
		border-radius: 5px;
	}

	.btn:hover {
		background-color: #0056b3;
	} */
</style>
