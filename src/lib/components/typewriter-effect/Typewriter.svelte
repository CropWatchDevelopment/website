<script lang="ts">
    export let text: string = '';
</script>

<div class="container p-2 w-full">
	<p class="typed text-center w-full">{text}</p>
</div>

<style>
	.container {
		font-family: 'arial';
		display: grid;
		place-items: center;
		width: 100%;
        max-width: 100vw;
	}

	.typed {
		overflow: hidden;
		white-space: nowrap;
		border-right: 2px solid;
		width: 0;
		animation:
			typing 1.5s steps(30, end) forwards,
			blinking 1s infinite;
	}

	@keyframes typing {
		from {
			width: 0;
		}
		to {
			width: 100%;
		}
	}

	@keyframes blinking {
		0% {
			border-color: transparent;
		}
		50% {
			border-color: black;
		}
		100% {
			border-color: transparent;
		}
	}
</style>
