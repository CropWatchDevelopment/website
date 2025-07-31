<script>
	let { showModal = $bindable(), header, children, class: className = '' } = $props();

	let dialog = $state(); // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog.showModal();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
	class="w-[90vw] rounded-xl border-2 border-white/80 bg-gradient-to-br from-blue-100 via-white to-emerald-100/80 text-gray-900 shadow-2xl backdrop-blur-md lg:w-[50vw] {className}"
>
	<div class="rounded-xl bg-white/90 p-2 shadow-lg">
		<div class="flex items-center justify-end">
			<button
				autofocus
				onclick={() => dialog.close()}
				class="rounded-full border-2 border-emerald-400 bg-white px-4 py-1 text-lg font-semibold text-emerald-700 shadow transition ease-in-out hover:bg-emerald-600 hover:text-white"
			>
				×
			</button>
		</div>
		<h2 class="mb-8 py-4 text-3xl font-extrabold text-emerald-900 drop-shadow-lg">
			{@render header?.()}
		</h2>
		<div class="space-y-10">
			{@render children?.()}
		</div>
		<hr class="my-6 border-emerald-200" />
		<!-- svelte-ignore a11y_autofocus -->
	</div>
</dialog>

<style>
	dialog {
        position: fixed;
        top: 20px;
        margin: auto;
		border-radius: 1.2em;
		border: none;
		padding: 0;
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
		background: none;
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}

	dialog::backdrop {
		background: rgba(30, 41, 59, 0.35);
		backdrop-filter: blur(2px);
	}

	@media screen and (min-width: 600px) {
		dialog > div {
			padding: 3rem 3rem 2rem 3rem;
		}
		dialog > div.bg-white\/90 {
			padding: 3rem 3rem 2rem 3rem;
		}
	}

	dialog > div {
		padding: 1.5rem 1rem 1rem 1rem;
	}
	dialog > div.bg-white\/90 {
		padding: 1.5rem 1rem 1rem 1rem;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 1em;
		box-shadow: 0 2px 16px 0 rgba(31, 38, 135, 0.1);
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	button {
		display: block;
		cursor: pointer;
		transition: box-shadow 0.2s;
	}
</style>
