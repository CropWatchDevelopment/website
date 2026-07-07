<script lang="ts">
	// Renders one schema.org JSON-LD block into <head>. Accepts a single schema
	// object or an array of them. `<` is escaped so the payload can never break
	// out of the <script> element.
	let { data }: { data: Record<string, unknown> | Record<string, unknown>[] } = $props();

	const json = $derived(JSON.stringify(data).replace(/</g, '\\u003c'));
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${json}<\/script>`}
</svelte:head>
