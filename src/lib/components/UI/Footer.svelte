<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import LanguagePicker from './LanguagePicker.svelte';
</script>

<footer class="bg-gray-800 py-6 text-white">
	<div class="container mx-auto text-center">
		<p>&copy; 2025 CropWatch LLC. {m.footer_rights_reserved()}</p>
		<div class="mt-4 space-x-4 align-middle">
			<a href="/privacy-policy" class="hover:underline">{m.footer_privacy_policy()}</a>
			<a href="/EULA" class="hover:underline">EULA</a>
			<!-- <a href="/terms-of-service" class="hover:underline">{m.footer_terms_of_service()}</a> -->
		</div>
		<span class="block md:hidden mt-2">
			<LanguagePicker />
		</span>
	</div>
</footer>
