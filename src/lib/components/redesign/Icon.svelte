<script lang="ts">
	interface Props {
		name: string;
		size?: number;
		className?: string;
	}

	const icons: Record<string, string> = {
		menu: 'M4 6h16M4 12h16M4 18h16',
		close: 'M6 6l12 12M18 6L6 18',
		chevronDown: 'M6 9l6 6 6-6',
		chevronRight: 'M9 6l6 6-6 6',
		phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
		mail: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 0l8 8 8-8',
		search: 'M11 2a9 9 0 100 18 9 9 0 000-18zm10 20l-4.35-4.35',
		open: 'M14 3h7v7M10 14L21 3M21 14v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h5',
		api: 'M8 3v4M16 3v4M3 8h4M3 16h4M17 8h4M17 16h4M8 17v4M16 17v4M9 9h6v6H9z',
		plus: 'M12 5v14M5 12h14',
		sensor: 'M4 14a8 8 0 1116 0 8 8 0 01-16 0zM12 10v4M10 12h4',
		router: 'M5 12h14v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5zM9 7V4M15 7V4M12 4v3M7 15h.01M11 15h.01M15 15h.01',
		shield: 'M12 2l9 4v6c0 5-4 9-9 10-5-1-9-5-9-10V6l9-4z',
		alert: 'M12 2l10 18H2L12 2zM12 8v5M12 17v.01',
		bolt: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
		cold: 'M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1',
		wheat: 'M12 2c-2 3-2 7 0 10 2-3 2-7 0-10zM6 8c-2 2-2 5 0 7 2-2 2-5 0-7zM18 8c-2 2-2 5 0 7 2-2 2-5 0-7zM12 14v8',
		chef: 'M6 8a6 6 0 0112 0v2H6V8zM6 10v10h12V10M8 14h.01M16 14h.01',
		factory: 'M2 22V8l5 3V8l5 3V8l5 3V22H2zM6 14v4M10 14v4M14 14v4',
		cow: 'M4 11a4 4 0 018 0v5a4 4 0 01-8 0v-5zM16 11a4 4 0 014 0v5a4 4 0 01-4 4M8 8V6M16 10V6M10 14h.01M6 14h.01',
		globe: 'M12 2a15 15 0 010 20M12 2a15 15 0 000 20M2 12h20M2 12a15 15 0 0120 0M2 12a15 15 0 0120 0'
	};

	let { name, size = 20, className = '' }: Props = $props();
	let d = $derived(icons[name] || icons.menu);
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={className}
	aria-hidden="true"
>
	<path {d} />
</svg>
