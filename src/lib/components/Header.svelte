<script>
	// Use Svelte reactive state instead of direct DOM access so this is
	// safe during SSR and runs correctly when the component mounts.
	let mobileMenuOpen = false;

	function toggleMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<header
	class="sticky top-0 z-50 border-b border-blue-200/40 bg-white/60 shadow-md backdrop-blur-md"
	aria-label="Primary navigation"
>
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
		<!-- Logo and brand name -->
		<a href="/" class="flex items-center space-x-2">
			<!-- Inline SVG logo to avoid external asset during prerender -->
			<svg
				role="img"
				aria-label="YourCompany logo"
				class="h-8 w-8 drop-shadow-sm"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>YourCompany</title>
				<g fill="none" fill-rule="evenodd">
					<circle cx="12" cy="12" r="10" fill="#0ea5e9" />
					<path d="M7 12c1.5-3 5-5 8-5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M7 12c1.5 3 5 5 8 5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</g>
			</svg>
			<span class="text-lg font-semibold tracking-wide text-gray-800"> YourCompany </span>
		</a>
		<!-- Desktop navigation -->
		<nav class="hidden items-center space-x-6 md:flex">
			<a href="/" class="font-medium text-gray-700 transition-colors hover:text-blue-800"
				>Home</a
			>
			<div class="group relative">
				<!-- Button to toggle the services dropdown -->
				<button
					type="button"
					class="flex items-center space-x-1 font-medium text-gray-700 hover:text-blue-800 focus:outline-none"
					aria-haspopup="true"
					aria-expanded="false"
				>
					<span>Services</span>
					<!-- Down chevron icon -->
					<svg
						class="h-4 w-4 transform transition-transform group-hover:rotate-180"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
					</svg>
				</button>
				<!-- Dropdown menu -->
				<ul
					class="invisible absolute left-0 mt-3 w-44 rounded-lg border border-blue-200/30 bg-white/90 opacity-0 shadow-lg backdrop-blur-md transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100"
				>
					<li>
						<a
							href="/about"
							class="block px-4 py-2 text-gray-700 hover:bg-blue-100/60 hover:text-blue-900"
							>Consulting</a
						>
					</li>
					<li>
						<a
							href="/about"
							class="block px-4 py-2 text-gray-700 hover:bg-blue-100/60 hover:text-blue-900"
							>Development</a
						>
					</li>
					<li>
						<a
							href="/about"
							class="block px-4 py-2 text-gray-700 hover:bg-blue-100/60 hover:text-blue-900"
							>Support</a
						>
					</li>
				</ul>
			</div>
			<a href="/about" class="font-medium text-gray-700 transition-colors hover:text-blue-800"
				>About</a
			>
			<a href="/about" class="font-medium text-gray-700 transition-colors hover:text-blue-800"
				>Contact</a
			>
		</nav>
		<!-- Icons and mobile toggle -->
		<div class="flex items-center space-x-4">
			<!-- Search icon -->
			<button
				aria-label="Search"
				class="text-gray-700 transition-colors hover:text-blue-800"
				type="button"
			>
				<svg
					class="h-6 w-6"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					viewBox="0 0 24 24"
				>
					<!-- Magnifying glass path from Heroicons outline set -->
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
					/>
				</svg>
			</button>
			<!-- Mail icon -->
			<a
				href="mailto:info@example.com"
				aria-label="Email"
				class="text-gray-700 transition-colors hover:text-blue-800"
			>
				<svg
					class="h-6 w-6"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
					/>
				</svg>
			</a>
			<!-- Phone icon -->
			<a
				href="tel:+811234567890"
				aria-label="Call"
				class="text-gray-700 transition-colors hover:text-blue-800"
			>
				<svg
					class="h-6 w-6"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
					/>
				</svg>
			</a>
			<!-- Mobile menu button -->
			<button
				id="mobile-menu-toggle"
				class="text-gray-700 hover:text-blue-800 focus:outline-none md:hidden"
				aria-label="Toggle mobile menu"
				aria-expanded={mobileMenuOpen}
				aria-controls="mobile-menu"
				type="button"
				on:click={toggleMenu}
			>
				<svg
					class="h-6 w-6"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
		</div>
	</div>
	<!-- Mobile navigation menu (hidden by default) -->
		<nav
		id="mobile-menu"
		class="space-y-1 border-t border-blue-200/40 bg-white/80 px-4 pb-4 backdrop-blur-lg md:hidden"
		class:hidden={!mobileMenuOpen}
		class:block={mobileMenuOpen}
		aria-label="Mobile navigation"
	>
			<a href="/" class="block py-2 font-medium text-gray-700 hover:text-blue-800">Home</a>
		<details>
			<summary
				class="flex cursor-pointer items-center justify-between py-2 font-medium text-gray-700 hover:text-blue-800"
			>
				<span>Services</span>
				<svg
					class="ml-2 h-4 w-4"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
				</svg>
			</summary>
			<div class="mt-1 space-y-1 pl-4">
				<a href="/about" class="block py-1 text-gray-700 hover:text-blue-800">Consulting</a>
				<a href="/about" class="block py-1 text-gray-700 hover:text-blue-800">Development</a>
				<a href="/about" class="block py-1 text-gray-700 hover:text-blue-800">Support</a>
			</div>
		</details>
			<a href="/about" class="block py-2 font-medium text-gray-700 hover:text-blue-800">About</a>
			<a href="/about" class="block py-2 font-medium text-gray-700 hover:text-blue-800">Contact</a>
	</nav>
</header>
