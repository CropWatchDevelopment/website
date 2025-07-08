<script>
	import { onMount } from 'svelte';
	import CropWatchLogo from '$lib/images/favicon.svg';
	import LanguagePicker from './LanguagePicker.svelte';

	let mobileMenuOpen = $state(false);
	let announcementVisible = $state(true);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeAnnouncement() {
		announcementVisible = false;
	}

	// Close mobile menu when clicking outside
	function handleClickOutside(event) {
		if (!event.target.closest('.mobile-menu') && !event.target.closest('.mobile-menu-btn')) {
			mobileMenuOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	function handleSectionClick(event) {
		event.preventDefault();
		const link = event.currentTarget;
		const anchorId = new URL(link.href).hash.replace('#', '');
		const anchor = document.getElementById(anchorId);
		window.scrollTo({
			top: anchor.offsetTop,
			behavior: 'smooth'
		});
	}
</script>

<!-- Announcement/Utility Bar -->
{#if announcementVisible}
	<div class="bg-gradient-to-r from-green-600 to-emerald-600 text-sm text-white">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
			<div class="flex items-center gap-2">
				<svg class="h-4 w-4 text-green-200" fill="currentColor" viewBox="0 0 20 20">
					<path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/>
				</svg>
				<span class="font-medium">New: Enhanced LoRaWAN connectivity now available!</span>
				<a
					href="#contact"
					class="ml-2 underline transition-all ease-in-out hover:translate-x-2 hover:no-underline"
				>Learn more →</a
				>
			</div>
			<button onclick={closeAnnouncement} class="text-green-200 transition-colors hover:text-white">
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	</div>
{/if}

<!-- Utility Navigation Bar -->
<div class="relative border-b border-slate-700/50 bg-blue-300 backdrop-blur-sm overflow-visible z-20">
	<div class="mx-auto max-w-6xl px-4 py-2">
		<div class="flex items-center justify-between text-sm">
			<!-- Left side - Quick links -->
			<div class="hidden items-center gap-6 text-slate-900 md:flex">
				<a
					href="mailto:sayaka@cropwatch.io"
					class="flex items-center gap-1 transition-colors hover:text-blue-700"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-6.697 2.697M12 21.75a9.75 9.75 0 01-6.697-2.697"
						/>
					</svg>
					Support
				</a>
				<a
					href="https://kb.cropwatch.io"
					class="flex items-center gap-1 transition-colors hover:text-blue-700"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
					Documentation
				</a>
				<a
					href="https://api.cropwatch.io/swagger"
					target="_blank" rel="noopener noreferrer"
					class="flex items-center gap-1 transition-colors hover:text-blue-700"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
						/>
					</svg>
					API
				</a>
			</div>

			<!-- Right side - Status and contact -->
			<div class="flex items-center gap-2 sm:gap-4">
				<div class="hidden items-center gap-2 rounded-lg bg-blue-950 p-2 text-green-400 sm:flex">
					<div class="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
					<span class="text-xs">
						<a href="https://stats.uptimerobot.com/1Z6H85HuHq" target="_blank"
						>All Systems Operational</a
						>
					</span>
				</div>
				<div class="flex items-center gap-2 text-slate-800 sm:gap-3">
					<a href="tel:+81804284339" class="hidden text-xs transition-colors hover:text-slate-600 sm:block">
						📞 +81-80-4284-3390
					</a>
					<span class="hidden text-slate-600 sm:inline">|</span>
					<a
						href="/contact-us"
						class="rounded-lg bg-blue-300 px-2 py-1 text-xs transition-colors hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:text-white sm:p-2"
					>Email Us!</a
					>
				</div>
				<div class="relative z-20">
					<LanguagePicker />
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Main Header -->
<header
	class="relative overflow-hidden border-b border-green-500/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700"
>
	<!-- Animated background pattern -->
	<div class="absolute inset-0 opacity-10">
		<div
			class="absolute inset-0 animate-[drift_20s_linear_infinite] bg-[radial-gradient(circle_at_25%_25%,_#22c55e_2px,_transparent_2px),radial-gradient(circle_at_75%_75%,_#10b981_1px,_transparent_1px)] bg-[length:60px_60px]"
		></div>
	</div>

	<nav class="relative z-10 mx-auto flex max-w-6xl items-center justify-between p-4 lg:px-8">
		<!-- Logo -->
		<a href="/" class="flex items-center gap-2 transition-transform hover:scale-105 sm:gap-3">
			<img src={CropWatchLogo} alt="CropWatch Logo" class="h-8 sm:h-10" width="40px" height="40px" />
			<div class="text-xl font-bold tracking-tight text-white sm:text-2xl">
				CropWatch<sup><small>®</small></sup>
			</div>
		</a>

		<!-- Desktop Navigation -->
		<ul class="hidden items-center gap-8 lg:flex">
			<li class="group relative">
				<a
					href="#solutions" onclick={() => handleSectionClick}
					class="relative flex items-center gap-1 rounded-lg px-4 py-2 font-medium text-white/80 backdrop-blur-sm transition-all duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-gradient-to-r after:from-green-500 after:to-emerald-500 after:transition-all after:duration-300 hover:-translate-y-0.5 hover:bg-green-500/10 hover:text-green-400 hover:after:w-4/5"
				>
					Solutions
				</a>
			</li>
			<li>
				<a
					href="#pricing"
					class="relative rounded-lg px-4 py-2 font-medium text-white/80 backdrop-blur-sm transition-all duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-gradient-to-r after:from-green-500 after:to-emerald-500 after:transition-all after:duration-300 hover:-translate-y-0.5 hover:bg-green-500/10 hover:text-green-400 hover:after:w-4/5"
				>
					Pricing
				</a>
			</li>
			<li class="group relative">
				<a
					href="#"
					class="relative flex items-center gap-1 rounded-lg px-4 py-2 font-medium text-white/80 backdrop-blur-sm transition-all duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-gradient-to-r after:from-green-500 after:to-emerald-500 after:transition-all after:duration-300 hover:-translate-y-0.5 hover:bg-green-500/10 hover:text-green-400 hover:after:w-4/5"
				>
					Devices
					<!--					<svg-->
					<!--						class="h-4 w-4 transition-transform group-hover:rotate-180"-->
					<!--						fill="none"-->
					<!--						stroke="currentColor"-->
					<!--						viewBox="0 0 24 24"-->
					<!--					>-->
					<!--						<path-->
					<!--							stroke-linecap="round"-->
					<!--							stroke-linejoin="round"-->
					<!--							stroke-width="2"-->
					<!--							d="M19 9l-7 7-7-7"-->
					<!--						/>-->
					<!--					</svg>-->
				</a>
			</li>
			<li>
				<a
					href="https://api.cropwatch.io/swagger"
					target="_blank" rel="noopener noreferrer"
					class="relative rounded-lg px-4 py-2 font-medium text-white/80 backdrop-blur-sm transition-all duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-gradient-to-r after:from-green-500 after:to-emerald-500 after:transition-all after:duration-300 hover:-translate-y-0.5 hover:bg-green-500/10 hover:text-green-400 hover:after:w-4/5"
				>
					Resources
				</a>
			</li>
			<li>
				<a
					href="about-us"
					class="relative rounded-lg px-4 py-2 font-medium text-white/80 backdrop-blur-sm transition-all duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-gradient-to-r after:from-green-500 after:to-emerald-500 after:transition-all after:duration-300 hover:-translate-y-0.5 hover:bg-green-500/10 hover:text-green-400 hover:after:w-4/5"
				>
					About
				</a>
			</li>
		</ul>

		<!-- CTA Button -->
		<div class="hidden items-center gap-3 md:flex">
			<a
				href="/demo"
				class="px-4 py-2 font-medium text-white/80 transition-colors hover:text-green-400"
			>
				Demo
			</a>
			<a
				href="https://app.cropwatch.io/auth/login"
				target="_blank"
				class="group relative inline-flex items-center overflow-hidden rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 font-semibold text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-500/40"
			>
				<span class="relative z-10">App Login</span>
				<div
					class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full"
				></div>
			</a>
		</div>

		<!-- Mobile Login Button and Menu -->
		<div class="flex items-center gap-3 lg:hidden">
			<!-- Mobile App Login Button - Always visible -->
			<a
				href="https://app.cropwatch.io/auth/login"
				target="_blank"
				class="group relative inline-flex items-center overflow-hidden rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-500/40"
			>
				<span class="relative z-10">Login</span>
				<div
					class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full"
				></div>
			</a>

			<!-- Mobile menu button -->
			<button
				onclick={toggleMobileMenu}
				class="mobile-menu-btn rounded-lg p-2 text-white transition-colors hover:bg-white/10" aria-label="Toggle mobile menu"
			>
				<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					></path>
				</svg>
			</button>
		</div>
	</nav>
</header>

<!-- Secondary Navigation/Breadcrumb Bar -->
<div class="border-b border-slate-700/30 bg-slate-800/50 backdrop-blur-sm">
	<div class="mx-auto max-w-6xl px-4 py-3 lg:px-8">
		<div class="flex items-center justify-between">
			<!-- Breadcrumb or secondary nav -->
			<div class="flex items-center gap-2 text-sm text-slate-600">
				<a href="/" class="transition-colors hover:text-slate-500">Home</a>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
				<span class="text-white">IoT Solutions</span>
			</div>
		</div>
	</div>
</div>

<!-- Mobile Menu -->
{#if mobileMenuOpen}
	<div
		class="mobile-menu absolute left-0 right-0 top-full z-50 border-t border-green-500/20 bg-slate-900/95 backdrop-blur-lg lg:hidden"
	>
		<div class="space-y-2 p-4">
			<a
				href="#solutions"
				onclick={() => (mobileMenuOpen = false)}
				class="block rounded-lg px-4 py-3 text-white/80 transition-colors hover:bg-green-500/10 hover:text-green-400"
			>
				Solutions
			</a>
			<a
				href="#pricing"
				onclick={() => (mobileMenuOpen = false)}
				class="block rounded-lg px-4 py-3 text-white/80 transition-colors hover:bg-green-500/10 hover:text-green-400"
			>
				Pricing
			</a>
			<a
				href="#devices"
				onclick={() => (mobileMenuOpen = false)}
				class="block rounded-lg px-4 py-3 text-white/80 transition-colors hover:bg-green-500/10 hover:text-green-400"
			>
				Devices
			</a>
			<a
				href="#resources"
				onclick={() => (mobileMenuOpen = false)}
				class="block rounded-lg px-4 py-3 text-white/80 transition-colors hover:bg-green-500/10 hover:text-green-400"
			>
				Resources
			</a>
			<a
				href="#about"
				onclick={() => (mobileMenuOpen = false)}
				class="block rounded-lg px-4 py-3 text-white/80 transition-colors hover:bg-green-500/10 hover:text-green-400"
			>
				About
			</a>
			<div class="space-y-2 border-t border-white/10 pt-2">
				<a
					href="/demo"
					onclick={() => (mobileMenuOpen = false)}
					class="block rounded-lg px-4 py-3 text-white/80 transition-colors hover:bg-green-500/10 hover:text-green-400"
				>
					Demo
				</a>
				<a
					href="/contact-us"
					onclick={() => (mobileMenuOpen = false)}
					class="block rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 text-center font-semibold text-white transition-all hover:from-blue-600 hover:to-blue-700"
				>
					Contact Us
				</a>
			</div>
		</div>
	</div>
{/if}

<style>
    @keyframes drift {
        0% {
            transform: translateX(0) translateY(0);
        }
        100% {
            transform: translateX(-60px) translateY(-60px);
        }
    }
</style>
