/**
 * Babylon.js loader — self-hosted UMD, NOT bundled through Vite.
 *
 * Importing `@babylonjs/core` as a module made Rollup transform 1000+ Babylon
 * files on every build (minutes of Vercel build time). Instead the prebuilt UMD
 * bundle is vendored under `static/assets/vendor/babylon/` and injected as a
 * <script> at runtime: static files are copied as-is (zero build cost), it's
 * same-origin (so ad-blockers/firewalls don't block it like the CDN did), and it
 * only loads on the 3D pages, on demand.
 *
 * Returns the global `window.BABYLON` (the loaders script registers the glTF +
 * STL file loaders on its SceneLoader).
 */
const BASE = '/assets/vendor/babylon/';

let cached: Promise<any> | null = null;

function loadScript(src: string): Promise<void> {
	return new Promise((resolve, reject) => {
		if (document.querySelector(`script[src="${src}"]`)) {
			resolve();
			return;
		}
		const s = document.createElement('script');
		s.src = src;
		s.onload = () => resolve();
		s.onerror = () => reject(new Error('failed to load ' + src));
		document.head.appendChild(s);
	});
}

export function loadBabylon(): Promise<any> {
	if (!cached) {
		cached = (async () => {
			await loadScript(BASE + 'babylon.js'); // defines window.BABYLON
			await loadScript(BASE + 'babylonjs.loaders.min.js'); // registers glTF + STL loaders
			return (globalThis as { BABYLON?: unknown }).BABYLON;
		})();
	}
	return cached;
}
