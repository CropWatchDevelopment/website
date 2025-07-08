<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { i18n } from '$lib/i18n';
	import type { AvailableLanguageTag } from '$lib/paraglide/runtime';
	import { languageTag } from '$lib/paraglide/runtime';

	let dropdownOpen = $state(false);
	let selectedLanguage = $state<AvailableLanguageTag>(languageTag());
	const languages: AvailableLanguageTag[] = ['ja', 'en', 'es', 'fr'];
	const languageFlags: Record<AvailableLanguageTag, string> = {
		ja: '🇯🇵',
		en: '🇺🇸',
		es: '🇭🇳',
		fr: '🇫🇷'
	};

	// On component mount, retrieve the saved language from localStorage
	$effect(() => {
		const savedLanguage = localStorage.getItem('selectedLanguage') as AvailableLanguageTag;
		if (savedLanguage && languages.includes(savedLanguage)) {
			selectedLanguage = savedLanguage;
		} else {
			selectedLanguage = languageTag();
		}
	});

	// Update the language and persist the choice
	function switchToLanguage(newLanguage: AvailableLanguageTag) {
		selectedLanguage = newLanguage;
		localStorage.setItem('selectedLanguage', newLanguage);
		const canonicalPath = i18n.route(page.url.pathname);
		const localisedPath = i18n.resolveRoute(canonicalPath, newLanguage);
		goto(localisedPath);
	}

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}
</script>

<!-- Header Dropdown -->
<div class="relative inline-block text-left">
	<!-- Main button to toggle dropdown -->
	<button
		onclick={toggleDropdown}
		type="button"
		class="inline-flex w-full justify-center rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-black shadow-sm focus:outline-none"
	>
		<span>{languageFlags[selectedLanguage]} {selectedLanguage.toUpperCase()}</span>
		<svg
			class="-mr-1 ml-2 h-5 w-5"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 20 20"
			fill="currentColor"
			aria-hidden="true"
		>
			<path
				fill-rule="evenodd"
				d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>

	<!-- Dropdown menu -->
	{#if dropdownOpen}
		<div
			class="absolute right-0 top-full mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10"
		>
			<div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
				{#each languages as lang}
					<button
						onclick={() => {
							switchToLanguage(lang);
							dropdownOpen = false;
						}}
						class="block w-full px-4 py-2 text-left text-sm text-black hover:bg-gray-100"
						role="menuitem"
					>
						{languageFlags[lang]}
						{lang.toUpperCase()}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
