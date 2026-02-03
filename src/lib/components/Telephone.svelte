<script>
	import { _, locale } from 'svelte-i18n';
	import MaterialIcon from './MaterialIcon.svelte';
	let { hideIcon = false } = $$props;
</script>

<div class="hidden items-center gap-2 text-sm font-semibold sm:flex">
	<label for="phone" class="text-lg">
		{#if !hideIcon}
			<MaterialIcon
				name="phone_in_talk"
				collection="symbols"
				variant="rounded"
				size={18}
				class="inline-block align-middle"
				ariaLabel={$_('header.brand.phone_icon_aria')}
			/>
		{/if}
	</label>

	<phone>
		{#if $locale === 'ja'}
			<a href="tel:+818042843390" class="hover:text-white">080-4284-3390</a>
		{:else}
			<a href="tel:+16038662394" class="hover:text-white">+1 (603) 866-2394</a>
		{/if}
	</phone>
</div>
