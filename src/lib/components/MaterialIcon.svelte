<script lang="ts">
	import { onMount } from 'svelte';

	type IconCollection = 'icons' | 'symbols';
	type IconVariant = 'filled' | 'outlined' | 'round' | 'sharp' | 'two-tone';
	type SymbolVariant = 'outlined' | 'rounded' | 'sharp';
	type Variant = IconVariant | SymbolVariant;

	const VARIANT_CLASS: Record<IconCollection, Record<string, string>> = {
		icons: {
			filled: 'material-icons',
			outlined: 'material-icons-outlined',
			round: 'material-icons-round',
			sharp: 'material-icons-sharp',
			'two-tone': 'material-icons-two-tone'
		},
		symbols: {
			outlined: 'material-symbols-outlined',
			rounded: 'material-symbols-rounded',
			sharp: 'material-symbols-sharp'
		}
	};

	const FONT_CONFIG: Record<IconCollection, { id: string; href: string }> = {
		icons: {
			id: 'google-material-icons-font',
			href: 'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round|Material+Icons+Sharp|Material+Icons+Two+Tone'
		},
		symbols: {
			id: 'google-material-symbols-font',
			href:
				'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap'
		}
	};

	const loadedFonts = new Set<string>();

	function ensureFontLoaded(collection: IconCollection) {
		if (typeof document === 'undefined') return;
		const { id, href } = FONT_CONFIG[collection];
		if (loadedFonts.has(id) || document.getElementById(id)) {
			loadedFonts.add(id);
			return;
		}

		const link = document.createElement('link');
		link.id = id;
		link.rel = 'stylesheet';
		link.href = href;
		document.head.appendChild(link);
		loadedFonts.add(id);
	}

	/** Name of the icon as listed on fonts.google.com/icons */
	export let name: string;
	/** Icon collection to use: classic Material Icons or Material Symbols. */
	export let collection: IconCollection = 'icons';
	/** Icon variant/style to match the style on fonts.google.com/icons */
	export let variant: Variant = 'filled';
	/** Font size for the icon. Accepts numbers (pixels) or CSS size strings. */
	export let size: number | string = 24;
	/** Material Symbol fill axis: 0 (outlined) or 1 (filled). */
	export let fill: 0 | 1 = 0;
	/** Material Symbol weight axis, typically 100-700. */
	export let weight = 400;
	/** Material Symbol grade axis, typically -50 to 200. */
	export let grade = 0;
	/** Material Symbol optical size axis, typically 20-48. */
	export let opticalSize = 24;
	/** Optional aria-label for accessibility. When omitted the icon is hidden from assistive tech. */
	export let ariaLabel: string | undefined = undefined;
	/** Pass additional classes for layout/styling. */
	export let className = '';
	/** Optional title attribute for native browser tooltips. */
	export let title: string | undefined = undefined;

	onMount(() => {
		ensureFontLoaded(collection);
	});

	declare const $$props: {
		class?: string;
		style?: string;
		[key: string]: unknown;
	};

	let forwardedClass = '';
	let forwardedStyle = '';
	let variantClass = VARIANT_CLASS.icons.filled;
	let resolvedSize = typeof size === 'number' ? `${size}px` : size;
	let resolvedClass = className.trim();
	let resolvedStyle = `font-size: ${resolvedSize};`;
	let role = ariaLabel ? 'img' : 'presentation';
	let ariaHidden: string | undefined = ariaLabel ? undefined : 'true';
	let restProps: Record<string, unknown> = {};

	$: forwardedClass = $$props.class ?? '';
	$: forwardedStyle = $$props.style ?? '';
	$: ensureFontLoaded(collection);
	$: resolvedSize = typeof size === 'number' ? `${size}px` : size;
	$: variantClass = (() => {
		if (collection === 'icons') {
			const iconVariant = variant as IconVariant;
			return VARIANT_CLASS.icons[iconVariant] ?? VARIANT_CLASS.icons.filled;
		}
		const mappedVariant = variant === 'round' ? 'rounded' : variant;
		const symbolVariant = mappedVariant as SymbolVariant;
		return VARIANT_CLASS.symbols[symbolVariant] ?? VARIANT_CLASS.symbols.outlined;
	})();
	$: resolvedClass = [variantClass, className, forwardedClass].filter(Boolean).join(' ');
	$: resolvedStyle = (() => {
		const parts = [];
		if (forwardedStyle) parts.push(forwardedStyle);
		parts.push(`font-size: ${resolvedSize};`);
		if (collection === 'symbols') {
			parts.push(
				`font-variation-settings: "FILL" ${fill}, "wght" ${weight}, "GRAD" ${grade}, "opsz" ${opticalSize};`
			);
		}
		return parts.join(' ');
	})();
	$: role = ariaLabel ? 'img' : 'presentation';
	$: ariaHidden = ariaLabel ? undefined : 'true';
	$: restProps = (() => {
		const { class: _class, style: _style, ...rest } = $$props;
		return rest;
	})();
</script>

<span
	class={resolvedClass}
	style={resolvedStyle}
	role={role}
	aria-hidden={ariaHidden}
	aria-label={ariaLabel}
	title={title}
	{...restProps}
>
	{name}
</span>
