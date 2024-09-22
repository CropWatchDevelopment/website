<script lang="ts">
import { page } from '$app/stores';

</script>

<section class="inner-wrapper">
	<div class="container">
		<div class="row">
			<div class="inner-wrapper-main oops">
				<h2><i class="fa fa-exclamation-circle" aria-hidden="true"></i>{$page.error.message}</h2>
				<p>{$page.error.message}</p>
				<p>Oops... Page not found!</p>
				<a href="/" class="btn-home">Home</a>
			</div>
		</div>
	</div>
</section>
