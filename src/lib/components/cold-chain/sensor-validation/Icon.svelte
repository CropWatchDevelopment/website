<script lang="ts">
	import { C } from './anim';

	type IconName = 'thermostat' | 'check_circle' | 'cancel' | 'help' | 'error' | 'verified' | 'lock';

	let {
		name,
		size = 24,
		color = C.ink as string
	}: { name: IconName; size?: number; color?: string } = $props();
</script>

<!-- Inline SVG rather than the site's Material Symbols font: the canvas needs
     glyphs that are guaranteed painted at any scale, with no font-load flash. -->
<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	aria-hidden="true"
	style="display:block; flex-shrink:0; color:{color};"
>
	{#if name === 'thermostat'}
		<path
			d="M9 4a3 3 0 0 1 6 0v9a5 5 0 1 1-6 0V4z"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linejoin="round"
		/>
		<circle cx="12" cy="16.5" r="2.4" fill="currentColor" />
		<path d="M12 8v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
	{:else if name === 'check_circle'}
		<circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" stroke-width="2" />
		<path
			d="M8 12.3l2.6 2.6L16 9.5"
			fill="none"
			stroke="currentColor"
			stroke-width="2.2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	{:else if name === 'cancel'}
		<circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" stroke-width="2" />
		<path
			d="M8.5 8.5l7 7M15.5 8.5l-7 7"
			stroke="currentColor"
			stroke-width="2.2"
			stroke-linecap="round"
		/>
	{:else if name === 'help'}
		<circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" stroke-width="2" />
		<path
			d="M9.4 9.2a2.6 2.6 0 1 1 3.4 2.5c-.9.3-1.3.9-1.3 1.9v.4"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
		/>
		<circle cx="11.9" cy="17" r="1.2" fill="currentColor" />
	{:else if name === 'error'}
		<path
			d="M12 3l9.5 16.5H2.5L12 3z"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linejoin="round"
		/>
		<path d="M12 9.5v4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
		<circle cx="12" cy="17" r="1.2" fill="currentColor" />
	{:else if name === 'verified'}
		<polygon
			points="12,2.4 14.53,5.9 18.79,5.21 18.1,9.47 21.6,12 18.1,14.53 18.79,18.79 14.53,18.1 12,21.6 9.47,18.1 5.21,18.79 5.9,14.53 2.4,12 5.9,9.47 5.21,5.21 9.47,5.9"
			fill="none"
			stroke="currentColor"
			stroke-width="1.8"
			stroke-linejoin="round"
		/>
		<path
			d="M8.4 12.2l2.4 2.4 4.6-4.8"
			fill="none"
			stroke="currentColor"
			stroke-width="2.2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	{:else if name === 'lock'}
		<rect
			x="5"
			y="10.5"
			width="14"
			height="10"
			rx="2"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		/>
		<path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="currentColor" stroke-width="2" />
	{/if}
</svg>
