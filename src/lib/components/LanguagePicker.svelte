<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { localePath } from '$lib/i18n/navigation';
	import type { AppLocale } from '$lib/i18n';

	const languages = [
		{ code: 'en', icon: '🇺🇸', label: 'English' },
		{ code: 'ja', icon: '🇯🇵', label: '日本語' },
		{ code: 'es', icon: '🇭🇳', label: 'Español' }
	] as const satisfies readonly { code: AppLocale; icon: string; label: string }[];

	let selectedLocale = $derived<AppLocale>((($page.data as { lang?: AppLocale })?.lang ?? 'ja'));

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		const newLocale = target.value as AppLocale;
		const canonical = (($page.data as { canonicalPath?: string })?.canonicalPath ?? '/');
		const target2 = localePath(canonical, newLocale) + $page.url.search + $page.url.hash;
		goto(target2, { invalidateAll: true });
	}
</script>

<div class="relative">
	<label class="sr-only" for="language-select">{$_('header.language.picker_label')}</label>
	<select
		id="language-select"
		class="min-w-[140px] rounded-full border border-white/60 bg-white/70 px-3 py-1 text-sm font-semibold text-[#11213c] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5387] hover:bg-white/90"
		value={selectedLocale}
		onchange={handleChange}
	>
		{#each languages as language (language.code)}
			<option value={language.code}>
				{language.icon} {language.label}
			</option>
		{/each}
	</select>
</div>
