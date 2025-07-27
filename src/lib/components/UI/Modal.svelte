<script>
	let { showModal = $bindable(), header, children } = $props();

	let dialog = $state(); // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog.showModal();
	});
</script>
<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => { if (e.target === dialog) dialog.close(); }}
	class="bg-green-600 text-white w-90vw lg:w-[70vw]"
>
	<div>
		<div class="flex items-center justify-end">

			<button autofocus onclick={() => dialog.close()}
							class="border border-solid px-4 py-1 rounded-md hover:bg-green-900 transition ease-in-out">close
			</button>
		</div>
		<h2 class="font-semibold text-3xl py-4 mb-10">
			{@render header?.()}
		</h2>
		<div class="space-y-10">
			{@render children?.()}
		</div>
		<hr />
		<!-- svelte-ignore a11y_autofocus -->
	</div>

</dialog>

<style>
    dialog {
        /*width: 70vw;*/
        border-radius: 0.8em;
        border: none;
        padding: 0;

    }

    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }

    @media screen and (min-width: 600px) {
        dialog > div {
            padding: 4rem;
        }
    }

    dialog > div {
        padding: 1rem;
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
    }
</style>
