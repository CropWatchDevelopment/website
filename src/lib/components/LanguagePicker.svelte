<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	import { onDestroy } from 'svelte';

	const languages = [
		{
			code: 'en',
			icon: '🇺🇸',
			label: 'English'
		},
		{
			code: 'ja',
			icon: '🇯🇵',
			label: '日本語'
		},
		{
			code: 'es',
			icon: '🇭🇳',
			label: 'Español'
		}
	] as const;

	type LanguageCode = (typeof languages)[number]['code'];

	let selectedLocale = $state<LanguageCode>('en');

	const unsubscribe = locale.subscribe((value) => {
		selectedLocale = (value as LanguageCode | null) ?? 'en';
	});

	onDestroy(unsubscribe);

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		const newLocale = target.value as LanguageCode;
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
				{language.icon} {language.label}
			</option>
		{/each}
	</select>
</div>
