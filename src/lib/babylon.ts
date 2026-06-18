/**
 * Locally-bundled Babylon.js loader — no third-party CDN.
 *
 * The earlier prototype pulled Babylon from `cdn.babylonjs.com` at runtime,
 * which silently fails behind ad-blockers, privacy extensions, corporate
 * proxies or offline — leaving the 3D viewers blank. Here Babylon is an npm
 * dependency, dynamically imported so Vite code-splits it into a chunk that
 * only downloads on the 3D pages, on demand.
 *
 * Returns the `@babylonjs/core` namespace, which is API-compatible with the old
 * `window.BABYLON` global (Engine, Scene, Vector3, SceneLoader, …) — so the
 * ported viewer code is unchanged. The glTF + STL side-effect imports register
 * those file loaders with `SceneLoader`.
 */
export type Babylon = typeof import('@babylonjs/core');

let cached: Promise<Babylon> | null = null;

export function loadBabylon(): Promise<Babylon> {
	if (!cached) {
		cached = (async () => {
			const core = await import('@babylonjs/core');
			await import('@babylonjs/loaders/glTF'); // .glb / .gltf
			await import('@babylonjs/loaders/STL'); // .stl
			return core;
		})();
	}
	return cached;
}
