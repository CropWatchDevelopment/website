<!--
  Port of CropWatch/src/routes/locations/[location_id]/LocationMap.svelte,
  read-only (the app's editable picker mode belongs to location settings,
  which the demo does not have).

  MapLibre with the same two keyless raster basemaps as the app: GSI
  (国土地理院) aerial photos by default, OpenStreetMap as the "地図" view.
  MapLibre is imported dynamically, so only this demo page loads it.
-->
<script lang="ts">
	import 'maplibre-gl/dist/maplibre-gl.css';
	import type {
		Map as MapLibreMap,
		Marker,
		RasterSourceSpecification,
		StyleSpecification
	} from 'maplibre-gl';
	// MapLibre finds its worker relative to its own file, which breaks once Vite
	// pre-bundles (dev) or hashes (build) it. Let Vite bundle the worker and
	// hand MapLibre the resulting URL instead.
	import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
	import { untrack } from 'svelte';
	import { CwButton } from '@cropwatchdevelopment/cwui';
	import type { DeviceHealth } from './location-overview';

	interface DevicePin {
		name: string;
		lat: number;
		long: number;
		health: DeviceHealth;
	}

	interface Props {
		lat: number;
		long: number;
		zoom?: number | null;
		name: string;
		devices?: DevicePin[];
	}

	let { lat, long, zoom = null, name, devices = [] }: Props = $props();

	let container: HTMLDivElement;

	// Raster basemaps, both free and keyless. Attributions are fixed strings;
	// MapLibre renders them as HTML, so never build them from data.
	const BASEMAPS = {
		// GSI aerial photos; its terms ask only for this credit (commercial use allowed).
		satellite: {
			type: 'raster',
			tiles: ['https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg'],
			tileSize: 256,
			minzoom: 2,
			maxzoom: 18,
			attribution:
				'<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener noreferrer">地理院タイル</a>'
		},
		map: {
			type: 'raster',
			tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
			tileSize: 256,
			maxzoom: 19,
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
		}
	} satisfies Record<string, RasterSourceSpecification>;
	type Basemap = keyof typeof BASEMAPS;

	const styleFor = (basemap: Basemap): StyleSpecification => ({
		version: 8,
		sources: { [basemap]: BASEMAPS[basemap] },
		layers: [{ id: basemap, type: 'raster', source: basemap }]
	});

	const DEFAULT_ZOOM = 16;

	// MapLibre and the map live outside $state: they are imperative handles,
	// and `ready` is what tells the other effects the map exists.
	let maplibre: typeof import('maplibre-gl') | null = null;
	let map: MapLibreMap | null = null;
	let marker: Marker | null = null;
	let deviceMarkers: Marker[] = [];
	let resizeObserver: ResizeObserver | null = null;
	let ready = $state(false);
	let basemap = $state<Basemap>('satellite');

	function toggleBasemap() {
		basemap = basemap === 'satellite' ? 'map' : 'satellite';
		// Markers are DOM elements, so they stay put while the tiles change.
		map?.setStyle(styleFor(basemap));
	}

	// Teardrop pin, built from DOM nodes (no HTML strings), tip at the bottom.
	function createLocationPin(): HTMLElement {
		const svgNs = 'http://www.w3.org/2000/svg';
		const element = document.createElement('div');
		element.className = 'location-map__pin';
		const svg = document.createElementNS(svgNs, 'svg');
		svg.setAttribute('viewBox', '0 0 28 36');
		svg.setAttribute('width', '28');
		svg.setAttribute('height', '36');
		svg.setAttribute('aria-hidden', 'true');
		const drop = document.createElementNS(svgNs, 'path');
		drop.setAttribute('d', 'M14 35C14 35 2 21.5 2 13.5a12 12 0 1 1 24 0C26 21.5 14 35 14 35Z');
		drop.setAttribute('class', 'location-map__pin-body');
		const dot = document.createElementNS(svgNs, 'circle');
		dot.setAttribute('cx', '14');
		dot.setAttribute('cy', '13.5');
		dot.setAttribute('r', '4.5');
		dot.setAttribute('class', 'location-map__pin-dot');
		svg.append(drop, dot);
		element.append(svg);
		return element;
	}

	// Built once; later prop changes move the pin instead of rebuilding the map.
	$effect(() => {
		let cancelled = false;
		const initial = untrack(() => ({ lat, long, zoom }));

		// MapLibre needs WebGL and `window`, so load it only in the browser.
		import('maplibre-gl').then((lib) => {
			if (cancelled) return;
			maplibre = lib;
			lib.setWorkerUrl(maplibreWorkerUrl);
			map = new lib.Map({
				container,
				style: styleFor(basemap),
				center: [initial.long, initial.lat],
				zoom: initial.zoom && initial.zoom > 0 ? initial.zoom : DEFAULT_ZOOM,
				// Plain scrolls and one-finger swipes scroll the page past the map:
				// zoom with Ctrl (⌘ on a Mac) + scroll, move the map with two fingers.
				cooperativeGestures: true,
				locale: {
					'CooperativeGesturesHandler.WindowsHelpText':
						'Ctrl キーを押しながらスクロールすると地図を拡大・縮小できます',
					'CooperativeGesturesHandler.MacHelpText':
						'⌘ キーを押しながらスクロールすると地図を拡大・縮小できます',
					'CooperativeGesturesHandler.MobileHelpText': '地図を動かすには 2 本の指で操作してください'
				},
				dragRotate: false,
				pitchWithRotate: false,
				attributionControl: { compact: true }
			});
			map.touchZoomRotate.disableRotation();
			map.addControl(
				new lib.NavigationControl({ showCompass: false, visualizePitch: false }),
				'top-left'
			);
			// The card's height settles after MapLibre measures it; re-measure so
			// the canvas always covers the whole box.
			resizeObserver = new ResizeObserver(() => map?.resize());
			resizeObserver.observe(container);
			ready = true;
		});

		return () => {
			cancelled = true;
			resizeObserver?.disconnect();
			resizeObserver = null;
			ready = false;
			for (const deviceMarker of deviceMarkers) deviceMarker.remove();
			deviceMarkers = [];
			marker?.remove();
			marker = null;
			map?.remove();
			map = null;
		};
	});

	// The location pin.
	$effect(() => {
		if (!ready || !maplibre || !map) return;
		const position: [number, number] = [long, lat];
		if (!marker) {
			const element = createLocationPin();
			element.setAttribute(
				'aria-label',
				untrack(() => name)
			);
			element.title = untrack(() => name);
			marker = new maplibre.Marker({ element, anchor: 'bottom' }).setLngLat(position).addTo(map);
		} else {
			marker.setLngLat(position);
		}
	});

	// Device pins redraw on their own so health updates don't rebuild the map.
	$effect(() => {
		if (!ready || !maplibre || !map) return;
		const lib = maplibre;
		const target = map;
		for (const deviceMarker of deviceMarkers) deviceMarker.remove();
		deviceMarkers = devices.map((pin) => {
			const element = document.createElement('div');
			element.className = `location-map__device location-map__device--${pin.health}`;
			element.setAttribute('aria-label', pin.name);
			// setText, never setHTML.
			const popup = new lib.Popup({
				closeButton: false,
				closeOnClick: false,
				offset: 10,
				className: 'location-map__popup'
			}).setText(pin.name);
			element.addEventListener('mouseenter', () =>
				popup.setLngLat([pin.long, pin.lat]).addTo(target)
			);
			element.addEventListener('mouseleave', () => popup.remove());
			return new lib.Marker({ element }).setLngLat([pin.long, pin.lat]).addTo(target);
		});
	});
</script>

<div class="location-map" role="region" aria-label={`${name}の地図`}>
	<div bind:this={container} class="location-map__canvas"></div>
	<CwButton
		id="location-map-basemap-button"
		class="location-map__basemap"
		variant="secondary"
		size="sm"
		onclick={toggleBasemap}
	>
		{basemap === 'satellite' ? '地図' : '航空写真'}
	</CwButton>
</div>

<style>
	.location-map {
		height: 100%;
		min-height: 20rem;
		width: 100%;
		border-radius: var(--cw-radius-lg);
		border: 1px solid var(--cw-border-muted);
		overflow: hidden;
		/* Keep the map's own layers under app overlays (menus, dialogs, toasts). */
		position: relative;
		z-index: 0;
	}

	.location-map__canvas {
		position: absolute;
		inset: 0;
	}

	.location-map :global(.location-map__basemap) {
		position: absolute;
		top: var(--cw-space-2);
		right: var(--cw-space-2);
		z-index: 1;
	}

	:global(.location-map__pin) {
		filter: drop-shadow(0 2px 3px rgb(0 0 0 / 0.35));
	}

	:global(.location-map__pin-body) {
		fill: var(--cw-primary-500);
		stroke: var(--cw-primary-900);
		stroke-width: 2;
	}

	:global(.location-map__pin-dot) {
		fill: var(--cw-primary-900);
	}

	:global(.location-map__device) {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		border: 2px solid var(--cw-gray-900);
		box-sizing: border-box;
	}

	:global(.location-map__device--online) {
		background: var(--cw-success-400);
	}

	:global(.location-map__device--offline) {
		background: var(--cw-danger-400);
	}

	:global(.location-map__device--never) {
		background: var(--cw-status-loading);
	}

	:global(.location-map__popup .maplibregl-popup-content) {
		padding: var(--cw-space-1) var(--cw-space-2);
		font-size: var(--cw-text-xs);
		color: var(--cw-gray-900);
		border-radius: var(--cw-radius-md);
	}
</style>
