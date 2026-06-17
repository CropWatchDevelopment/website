<script>
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
				ariaLabel="電話アイコン"
			/>
		{/if}
	</label>

	<phone>
		<a href="tel:+818042843390" class="hover:text-white">080-4284-3390</a>
	</phone>
</div>
