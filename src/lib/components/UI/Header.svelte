<script>
  import { onMount } from 'svelte';
  import CropWatchLogo from '$lib/images/favicon.svg';
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
</script>

<!-- Announcement/Utility Bar -->
{#if announcementVisible}
  <div class="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm">
    <div class="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4 text-green-200" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
        </svg>
        <span class="font-medium">New: Enhanced LoRaWAN connectivity now available!</span>
        <a href="#learn-more" class="underline hover:no-underline ml-2 hover:translate-x-2 transition-all ease-in-out">Learn more →</a>
      </div>
      <button onclick={closeAnnouncement} class="text-green-200 hover:text-white transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
{/if}

<!-- Utility Navigation Bar -->
<div class="bg-blue-300 backdrop-blur-sm border-b border-slate-700/50">
  <div class="max-w-6xl mx-auto px-4 py-2">
    <div class="flex items-center justify-between text-sm">
      <!-- Left side - Quick links -->
      <div class="hidden md:flex items-center gap-6 text-slate-900">
        <a href="/support" class="hover:text-blue-700 transition-colors flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-6.697 2.697M12 21.75a9.75 9.75 0 01-6.697-2.697"/>
          </svg>
          24/7 Support
        </a>
        <a href="/docs" class="hover:text-blue-700 transition-colors flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Documentation
        </a>
        <a href="/api" class="hover:text-blue-700 transition-colors flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
          </svg>
          API
        </a>
      </div>

      <!-- Right side - Status and contact -->
      <div class="flex items-center gap-4">
        <div class="hidden sm:flex items-center gap-2 text-green-400 bg-blue-950 p-2 rounded-lg">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span class="text-xs">All Systems Operational</span>
        </div>
        <div class="flex items-center gap-3 text-slate-800">
          <a href="tel:+1234567890" class="hover:text-slate-600 transition-colors text-xs">
            📞 Support: +1 (234) 567-890
          </a>
          <span class="text-slate-600">|</span>
          <a href="/login" class="hover:text-white bg-blue-300 p-2 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 rounded-lg transition-colors text-xs ">Login</a>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Main Header -->
<header class="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 overflow-hidden border-b border-green-500/20">
  <!-- Animated background pattern -->
  <div class="absolute inset-0 opacity-10">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_#22c55e_2px,_transparent_2px),radial-gradient(circle_at_75%_75%,_#10b981_1px,_transparent_1px)] bg-[length:60px_60px] animate-[drift_20s_linear_infinite]"></div>
  </div>

  <nav class="relative max-w-6xl mx-auto flex items-center justify-between p-4 lg:px-8 z-10">
    <!-- Logo -->
    <a href="/" class="flex items-center gap-3 transition-transform hover:scale-105">
      <!-- <div class="relative w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30"> -->
        <img src={CropWatchLogo} alt="CropWatch Logo" class="h-10" width="40px" height="40px" />
      <!-- </div> -->
<div class="text-2xl font-bold text-white tracking-tight">
		  CropWatch<sup><small>®</small></sup>
      </div>
    </a>

    <!-- Desktop Navigation -->
    <ul class="hidden lg:flex items-center gap-8">
      <li class="relative group">
        <a href="#solutions" class="relative px-4 py-2 text-white/80 font-medium rounded-lg backdrop-blur-sm transition-all duration-300 hover:text-green-400 hover:bg-green-500/10 hover:-translate-y-0.5 after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-green-500 after:to-emerald-500 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-4/5 flex items-center gap-1">
          Solutions
          <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </a>
      </li>
      <li>
        <a href="#pricing" class="relative px-4 py-2 text-white/80 font-medium rounded-lg backdrop-blur-sm transition-all duration-300 hover:text-green-400 hover:bg-green-500/10 hover:-translate-y-0.5 after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-green-500 after:to-emerald-500 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-4/5">
          Pricing
        </a>
      </li>
      <li class="relative group">
        <a href="#devices" class="relative px-4 py-2 text-white/80 font-medium rounded-lg backdrop-blur-sm transition-all duration-300 hover:text-green-400 hover:bg-green-500/10 hover:-translate-y-0.5 after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-green-500 after:to-emerald-500 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-4/5 flex items-center gap-1">
          Devices
          <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </a>
      </li>
      <li>
        <a href="#resources" class="relative px-4 py-2 text-white/80 font-medium rounded-lg backdrop-blur-sm transition-all duration-300 hover:text-green-400 hover:bg-green-500/10 hover:-translate-y-0.5 after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-green-500 after:to-emerald-500 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-4/5">
          Resources
        </a>
      </li>
      <li>
        <a href="#about" class="relative px-4 py-2 text-white/80 font-medium rounded-lg backdrop-blur-sm transition-all duration-300 hover:text-green-400 hover:bg-green-500/10 hover:-translate-y-0.5 after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-green-500 after:to-emerald-500 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-4/5">
          About
        </a>
      </li>
    </ul>

    <!-- CTA Button -->
    <div class="hidden md:flex items-center gap-3">
      <a href="/demo" class="px-4 py-2 text-white/80 hover:text-green-400 font-medium transition-colors">
        Demo
      </a>
      <a href="/contact-us" class="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-green-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-500/40 overflow-hidden group">
        <span class="relative z-10">App Login</span>
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
      </a>
    </div>

    <!-- Mobile menu button -->
    <button
      onclick={toggleMobileMenu}
      class="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors mobile-menu-btn"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  </nav>
</header>

<!-- Secondary Navigation/Breadcrumb Bar -->
<div class="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/30">
  <div class="max-w-6xl mx-auto px-4 lg:px-8 py-3">
    <div class="flex items-center justify-between">
      <!-- Breadcrumb or secondary nav -->
      <div class="flex items-center gap-2 text-sm text-slate-600">
        <a href="/" class="hover:text-slate-500 transition-colors">Home</a>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
        <span class="text-white">IoT Solutions</span>
      </div>

      <!-- Quick actions -->
      <div class="hidden md:flex items-center gap-4 text-sm">
        <a href="/marketplace" class="text-slate-900 hover:text-green-400 transition-colors flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          Marketplace
        </a>
        <a href="/partners" class="text-slate-900 hover:text-green-400 transition-colors flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          Partners
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Mobile Menu -->
{#if mobileMenuOpen}
  <div class="lg:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-green-500/20 mobile-menu z-50">
    <div class="p-4 space-y-2">
      <a href="#solutions" class="block px-4 py-3 text-white/80 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors">
        Solutions
      </a>
      <a href="#pricing" class="block px-4 py-3 text-white/80 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors">
        Pricing
      </a>
      <a href="#devices" class="block px-4 py-3 text-white/80 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors">
        Devices
      </a>
      <a href="#resources" class="block px-4 py-3 text-white/80 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors">
        Resources
      </a>
      <a href="#about" class="block px-4 py-3 text-white/80 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors">
        About
      </a>
      <div class="pt-2 border-t border-white/10 space-y-2">
        <a href="/demo" class="block px-4 py-3 text-white/80 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors">
          Demo
        </a>
        <a href="/contact-us" class="block px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg text-center">
          Get Started
        </a>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes drift {
    0% { transform: translateX(0) translateY(0); }
    100% { transform: translateX(-60px) translateY(-60px); }
  }
</style>