<script>
	import { page } from '$app/state';
    import * as m from '$lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{page.status}: {page.error.message}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
	<div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
		<h1 class="text-3xl font-bold text-red-500 mb-4">
			{page.status}: {page.error.message}
		</h1>
		<p class="text-gray-700 mb-6">
			{m.page_not_found_subtitle()}
		</p>
		<button
			on:click={() => window.location.href = '/'}
			class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
		>
			Home
		</button>
	</div>
</div>
