<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { sitemapLinks } from '$lib/data/sitemap';

	type Suggestion = {
		labelKey: string;
		href: string;
		label: string;
	};

	const KEYBOARD_KEYS = {
		ESCAPE: 'Escape',
		ENTER: 'Enter',
		ARROW_UP: 'ArrowUp',
		ARROW_DOWN: 'ArrowDown'
	} as const;

	const LISTBOX_ID = 'header-search-suggestions';
	const OPTION_ID_PREFIX = 'header-search-option-';

	let searchQuery = $state('');
	let showSuggestions = $state(false);
	let highlightedIndex = $state(0);

	let searchInput: HTMLInputElement | null = null;
	let container: HTMLElement | null = null;
	let hideTimer: number | undefined;

	let translate = (key: string) => key;
	const unsubscribe = _.subscribe((fn) => {
		translate = fn;
	});

	onDestroy(unsubscribe);

	const suggestionSource = $derived<Suggestion[]>(
		sitemapLinks.map((link) => ({
			labelKey: link.labelKey,
			href: link.href,
			label: translate(link.labelKey)
		}))
	);

	const normalizedQuery = $derived(searchQuery.trim().toLowerCase());


	function fuzzyScore(text: string, query: string): number | null {
		const normalizedText = text.toLowerCase();
		const normalizedNeedle = query.toLowerCase();
		let score = 0;
		let lastIndex = -1;
		for (const char of normalizedNeedle) {
			const index = normalizedText.indexOf(char, lastIndex + 1);
			if (index === -1) {
				return null;
			}
			score += index - lastIndex - 1;
			lastIndex = index;
		}
		return score + (normalizedText.length - lastIndex - 1);
	}

	const suggestions = $derived.by<Suggestion[]>(() => {
		const query = normalizedQuery;
		const source = suggestionSource;
		if (!query) return source;
		return source
			.map((item) => {
				const score = fuzzyScore(item.label, query);
				return score === null ? null : { item, score };
			})
			.filter((entry): entry is { item: Suggestion; score: number } => entry !== null)
			.sort((a, b) => a.score - b.score || a.item.label.localeCompare(b.item.label))
			.map((entry) => entry.item);
	});

	$effect(() => {
		const total = suggestions.length;
		if (!total) {
			highlightedIndex = -1;
			return;
		}

		if (highlightedIndex < 0) {
			highlightedIndex = 0;
		} else if (highlightedIndex >= total) {
			highlightedIndex = total - 1;
		}
	});

	function openSuggestions() {
		clearTimeout(hideTimer);
		hideTimer = undefined;
		showSuggestions = true;
	}

	function scheduleHideSuggestions(event: FocusEvent) {
		clearTimeout(hideTimer);
		const nextTarget = event.relatedTarget as Node | null;
		if (container && nextTarget && container.contains(nextTarget)) {
			return;
		}

		hideTimer = setTimeout(() => {
			showSuggestions = false;
			hideTimer = undefined;
		}, 120);
	}

	function handleInput(event: Event) {
		openSuggestions();
		const target = event.target as HTMLInputElement;
		searchQuery = target.value;
		if (suggestions.length > 0) {
			highlightedIndex = 0;
		}
	}

	function isExternal(href: string) {
		return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//');
	}

	function navigateToSuggestion(item: Suggestion | undefined) {
		if (!item) return;
		clearTimeout(hideTimer);
		hideTimer = undefined;
		showSuggestions = false;
		searchQuery = '';
		searchInput?.blur();
		highlightedIndex = 0;

		if (isExternal(item.href)) {
			window.location.href = item.href;
		} else {
			goto(item.href);
		}
	}

	function handleSubmit(event: Event) {
		event.preventDefault();
		if (suggestions.length === 0) return;
		const index = highlightedIndex >= 0 ? highlightedIndex : 0;
		navigateToSuggestion(suggestions[index]);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!showSuggestions && (event.key === KEYBOARD_KEYS.ARROW_DOWN || event.key === KEYBOARD_KEYS.ARROW_UP)) {
			openSuggestions();
		}

		switch (event.key) {
			case KEYBOARD_KEYS.ARROW_DOWN:
				event.preventDefault();
				if (suggestions.length === 0) return;
				highlightedIndex = Math.min(highlightedIndex + 1, suggestions.length - 1);
				break;
			case KEYBOARD_KEYS.ARROW_UP:
				event.preventDefault();
				if (suggestions.length === 0) return;
				highlightedIndex = Math.max(highlightedIndex - 1, 0);
				break;
			case KEYBOARD_KEYS.ESCAPE:
				showSuggestions = false;
				break;
			case KEYBOARD_KEYS.ENTER:
				if (suggestions.length === 0) return;
				event.preventDefault();
				navigateToSuggestion(suggestions[highlightedIndex >= 0 ? highlightedIndex : 0]);
				break;
		}
	}

	function handleOptionClick(suggestion: Suggestion) {
		navigateToSuggestion(suggestion);
	}
</script>

<div
	class="relative w-full max-w-xs"
	bind:this={container}
	onfocusin={openSuggestions}
	onfocusout={scheduleHideSuggestions}
>
	<form
		class="flex w-full items-center overflow-hidden rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm transition focus-within:border-white focus-within:bg-white/20"
		role="search"
		onsubmit={handleSubmit}
	>
		<label class="sr-only" for="header-search">{$_('header.search.label')}</label>
			<input
				bind:this={searchInput}
				bind:value={searchQuery}
				id="header-search"
				class="w-full border-none bg-transparent text-white placeholder:text-white/70 focus:outline-none"
				type="search"
			name="q"
			placeholder={$_('header.search.placeholder')}
			autocomplete="off"
				role="combobox"
				aria-autocomplete="list"
				aria-controls={LISTBOX_ID}
				aria-expanded={showSuggestions && suggestions.length > 0}
			aria-activedescendant={showSuggestions && suggestions.length > 0 && highlightedIndex >= 0
				? `${OPTION_ID_PREFIX}${highlightedIndex}`
					: undefined}
				oninput={handleInput}
				onkeydown={handleKeydown}
				onfocus={openSuggestions}
			/>
		<button
			type="submit"
			class="ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/40"
			aria-label={$_('header.search.submit_aria')}
		>
			<svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				<path
					fill-rule="evenodd"
					d="M9 3.5a5.5 5.5 0 1 0 3.356 9.9l3.122 3.122a.75.75 0 1 0 1.06-1.06l-3.121-3.123A5.5 5.5 0 0 0 9 3.5ZM5 9a4 4 0 1 1 7.007 2.545.75.75 0 0 0-.144.144A4 4 0 0 1 5 9Z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</form>

	{#if showSuggestions && suggestions.length > 0}
		<ul
			class="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-white/20 bg-white/95 text-sm shadow-lg shadow-black/10 backdrop-blur"
			id={LISTBOX_ID}
			role="listbox"
			aria-label={$_('header.search.label')}
		>
			{#each suggestions as suggestion, index (suggestion.labelKey ?? `${suggestion.href}-${index}`)}
				<li>
					<button
						type="button"
						class={`flex w-full items-start gap-2 px-4 py-2 text-left transition ${index === highlightedIndex ? 'bg-[#2f5387]/10 text-[#0b1730]' : 'text-[#1c2d52]/80 hover:bg-[#2f5387]/5 hover:text-[#0b1730]'}`}
						role="option"
						id={`${OPTION_ID_PREFIX}${index}`}
						aria-selected={index === highlightedIndex}
						onmousedown={() => navigateToSuggestion(suggestion)}
					>
						<span class="font-medium text-[#2f5387]">→</span>
						<span>{suggestion.label}</span>
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
