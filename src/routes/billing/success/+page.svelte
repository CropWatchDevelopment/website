<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(false);

	onMount(() => {
		// Small delay so the animation plays after the page renders
		const timer = setTimeout(() => (visible = true), 100);
		return () => clearTimeout(timer);
	});
</script>

<svelte:head>
	<title>Payment Successful — CropWatch</title>
	<meta name="description" content="Your payment has been processed successfully." />
</svelte:head>

<section class="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#11213c] py-20 text-white">
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto w-full max-w-lg px-4">
		<div class="flex flex-col items-center rounded-3xl border border-white/20 bg-[#0b1730]/80 p-10 text-center shadow-xl shadow-black/30 backdrop-blur">
			<!-- Animated success checkmark -->
			<div class="mb-6">
				<svg
					viewBox="0 0 96 96"
					width="96"
					height="96"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					role="img"
					aria-label="Payment successful"
				>
					<!-- Background circle -->
					<circle
						cx="48"
						cy="48"
						r="44"
						class="origin-center"
						style="
							fill: #10b981;
							transform: scale({visible ? 1 : 0});
							opacity: {visible ? 1 : 0};
							transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
							transform-origin: center;
						"
					/>

					<!-- Glow ring -->
					<circle
						cx="48"
						cy="48"
						r="44"
						stroke="#34d399"
						stroke-width="2"
						fill="none"
						style="
							opacity: {visible ? 0.4 : 0};
							transform: scale({visible ? 1.15 : 0.8});
							transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s, opacity 0.5s ease 0.15s;
							transform-origin: center;
						"
					/>

					<!-- Checkmark path -->
					<path
						d="M30 50 L43 63 L66 36"
						stroke="white"
						stroke-width="6"
						stroke-linecap="round"
						stroke-linejoin="round"
						fill="none"
						stroke-dasharray="60"
						style="
							stroke-dashoffset: {visible ? 0 : 60};
							transition: stroke-dashoffset 0.5s ease 0.35s;
						"
					/>
				</svg>
			</div>

			<h1 class="text-3xl font-semibold tracking-tight">Payment Successful</h1>

			<p class="mt-3 text-base leading-relaxed text-white/70">
				Your payment has been processed successfully. Thank you for choosing CropWatch!
			</p>

			<p class="mt-2 text-sm text-white/50">
				A confirmation email has been sent to your email address.
			</p>

			<hr class="my-8 w-full border-white/10" />

			<a
				href="/billing"
				class="inline-flex items-center gap-2 rounded-xl bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#0b1730] shadow-lg shadow-[#f2a516]/20 transition-all hover:bg-[#ffbb34] hover:shadow-[#f2a516]/30"
			>
				<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
					<path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 9H8v2h5v-2zm3 4H8v2h8v-2zm-3-8V3.5L18.5 9H13z"/>
				</svg>
				View Billing &amp; Payment History
			</a>
		</div>
	</div>
</section>
