<script lang="ts">
	// Bottom-of-page footnote that every STORAGE_NOTE_REF ("※1") on the page
	// links to. Render once per page. Pass wrap={false} inside a container that
	// already provides the gutter (e.g. a コラム article body).
	import {
		STORAGE_NOTE_ID,
		STORAGE_NOTE_MARK,
		STORAGE_NOTE_TITLE,
		STORAGE_NOTE_LEAD,
		STORAGE_NOTE_CAPACITY,
		STORAGE_NOTE_CAVEAT
	} from '$lib/content/storage-note';

	let { wrap = true }: { wrap?: boolean } = $props();
</script>

{#snippet note()}
	<aside
		id={STORAGE_NOTE_ID}
		class="fnote"
		class:fnote--inline={!wrap}
		aria-labelledby="{STORAGE_NOTE_ID}-title"
	>
		<p class="fnote__title" id="{STORAGE_NOTE_ID}-title">
			<span aria-hidden="true">{STORAGE_NOTE_MARK}</span>{STORAGE_NOTE_TITLE}
		</p>
		<p class="fnote__body">
			{STORAGE_NOTE_LEAD}{STORAGE_NOTE_CAPACITY}{STORAGE_NOTE_CAVEAT}
		</p>
	</aside>
{/snippet}

{#if wrap}
	<div class="wrap fnote-wrap">{@render note()}</div>
{:else}
	{@render note()}
{/if}

<style>
	.fnote-wrap {
		padding-block: 32px 40px;
	}
	.fnote {
		max-width: 820px;
		margin-inline: auto;
		padding: 16px 20px;
		background: var(--web-bg-soft);
		border: 1px solid var(--web-border);
		border-radius: 12px;
		color: var(--web-muted);
		font-size: 13.5px;
		line-height: 1.85;
		/* clear the sticky header when reached via a ※ link */
		scroll-margin-top: 120px;
		transition:
			border-color 0.2s var(--jp-ease),
			box-shadow 0.2s var(--jp-ease);
	}
	.fnote--inline {
		margin-top: 36px;
	}
	.fnote:target {
		border-color: var(--web-primary);
		box-shadow: 0 0 0 3px var(--web-primary-soft);
	}
	/* .fnote prefix outranks .col-body :global(p) when used inside a コラム */
	.fnote .fnote__title {
		display: flex;
		gap: 4px;
		margin: 0 0 4px;
		font-size: 14px;
		font-weight: 700;
		line-height: 1.7;
		color: var(--web-heading);
	}
	.fnote .fnote__body {
		margin: 0;
		font-size: inherit;
		line-height: inherit;
		color: inherit;
	}
</style>
