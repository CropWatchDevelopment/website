<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { onDestroy } from 'svelte';

	const LANGUAGE_CODES = {
		ENGLISH: 'en',
		JAPANESE: 'ja'
	} as const;

	const languages = [
		{
			code: LANGUAGE_CODES.ENGLISH,
			iconKey: 'header.language.english_icon',
			labelKey: 'header.language.english_label'
		},
		{
			code: LANGUAGE_CODES.JAPANESE,
			iconKey: 'header.language.japanese_icon',
			labelKey: 'header.language.japanese_label'
		}
	] as const;

	let selectedLocale = $state<string>(LANGUAGE_CODES.ENGLISH);

	const unsubscribe = locale.subscribe((value) => {
		selectedLocale = value ?? LANGUAGE_CODES.ENGLISH;
	});

	onDestroy(unsubscribe);

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		const newLocale = target.value as (typeof LANGUAGE_CODES)[keyof typeof LANGUAGE_CODES];
		locale.set(newLocale);
	}
</script>

<div class="relative">
	<label class="sr-only" for="language-select">{$_('header.language.picker_label')}</label>
	<select
		id="language-select"
		class="min-w-[140px] rounded-full border border-white/60 bg-white/70 px-3 py-1 text-sm font-semibold text-[#11213c] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5387] hover:bg-white/90"
		bind:value={selectedLocale}
		onchange={handleChange}
	>
		{#each languages as language (language.code)}
			<option value={language.code}>
				{$_(language.iconKey)} {$_(language.labelKey)}
			</option>
		{/each}
	</select>
</div>
