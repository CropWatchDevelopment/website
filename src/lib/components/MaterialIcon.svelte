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

	const loadedFonts = new Set<string>();

	function getFontConfig(collection: IconCollection, variant: Variant) {
		if (collection === 'icons') {
			let family = 'Material+Icons';
			if (variant === 'outlined') family = 'Material+Icons+Outlined';
			else if (variant === 'round') family = 'Material+Icons+Round';
			else if (variant === 'sharp') family = 'Material+Icons+Sharp';
			else if (variant === 'two-tone') family = 'Material+Icons+Two+Tone';

			return {
				id: `google-material-icons-${variant}`,
				href: `https://fonts.googleapis.com/icon?family=${family}&display=swap`
			};
		} else {
			// symbols
			let family = 'Material+Symbols+Outlined';
			if (variant === 'rounded' || variant === 'round') family = 'Material+Symbols+Rounded';
			else if (variant === 'sharp') family = 'Material+Symbols+Sharp';

			// Use the same variable axes as before to be safe, but only for this family
			const axes = ':opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';

			return {
				id: `google-material-symbols-${variant}`,
				href: `https://fonts.googleapis.com/css2?family=${family}${axes}&display=swap`
			};
		}
	}

	function ensureFontLoaded(collection: IconCollection, variant: Variant) {
		if (typeof document === 'undefined') return;
		const { id, href } = getFontConfig(collection, variant);
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
		ensureFontLoaded(collection, variant);
	});

	let forwardedClass = '';
	let forwardedStyle = '';
	let variantClass = VARIANT_CLASS.icons.filled;
	let resolvedSize = typeof size === 'number' ? `${size}px` : size;
	let resolvedClass = className.trim();
	let resolvedStyle = `font-size: ${resolvedSize}; width: ${resolvedSize}; height: ${resolvedSize}; display: inline-block; overflow: hidden; white-space: nowrap; line-height: 1; text-align: center; vertical-align: middle;`;
	let role = ariaLabel ? 'img' : 'presentation';
	let ariaHidden: 'true' | undefined | null = ariaLabel ? undefined : 'true';
	let restProps: Record<string, unknown> = {};

	$: forwardedClass = $$props.class ?? '';
	$: forwardedStyle = $$props.style ?? '';
	$: ensureFontLoaded(collection, variant);
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
		// Fix CLS: Reserve exact space and hide ligature text before font loads
		parts.push(`width: ${resolvedSize};`);
		parts.push(`height: ${resolvedSize};`);
		parts.push(`display: inline-block;`);
		parts.push(`overflow: hidden;`);
		parts.push(`white-space: nowrap;`);
		parts.push(`line-height: 1;`);
		parts.push(`text-align: center;`);
		parts.push(`vertical-align: middle;`); // Align with text
		
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
