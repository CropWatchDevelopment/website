/**
 * CW-CASE 3D viewer (Babylon.js) for the Replacement Sensor Case page.
 *
 * Ported from the design bundle's vanilla `device.js`, but Babylon is now
 * bundled locally (see ./babylon) instead of loaded from a CDN. The viewer
 * hydrates the `#deviceCanvas` element and tries to load the real binary STL
 * from `/assets/sensor_case_body.stl`; if that's missing it builds a clean
 * procedural enclosure so the page always shows something sensible.
 *
 * Drop the real `sensor_case_body.stl` into `static/assets/` and it loads
 * automatically (the design's STL is 1.35 MB — too large for the Claude Design
 * connector's 256 KiB fetch, so it isn't bundled here).
 *
 * Babylon's classes are used via its namespace; typed loosely as `any` to keep
 * the ported code 1:1 with the original.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadBabylon } from './babylon';

/**
 * Load (locally-bundled) Babylon, build the scene on #deviceCanvas, and return
 * a cleanup that stops the render loop and disposes GPU resources.
 */
export async function initDeviceViewer(): Promise<(() => void) | void> {
	const BABYLON: any = await loadBabylon();
	const canvas = document.getElementById('deviceCanvas') as HTMLCanvasElement | null;
	if (!canvas) return;
	const loaderEl = document.getElementById('stageLoader');

	const engine = new BABYLON.Engine(canvas, true, {
		preserveDrawingBuffer: true,
		stencil: true,
		antialias: true
	});
	const scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color4(0, 0, 0, 0); // transparent → page gradient shows

	// ── Camera ──
	const camera = new BABYLON.ArcRotateCamera(
		'cam',
		-Math.PI / 2.3,
		1.15,
		14,
		BABYLON.Vector3.Zero(),
		scene
	);
	camera.attachControl(canvas, true);
	camera.lowerRadiusLimit = 7;
	camera.upperRadiusLimit = 26;
	camera.wheelDeltaPercentage = 0.01;
	camera.pinchDeltaPercentage = 0.01;
	camera.minZ = 0.1;
	camera.useAutoRotationBehavior = true;
	camera.autoRotationBehavior.idleRotationSpeed = 0.32;
	camera.autoRotationBehavior.idleRotationWaitTime = 1800;
	camera.autoRotationBehavior.idleRotationSpinupTime = 1200;

	// ── Lights (bright white-studio feel) ──
	const hemi = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(0.2, 1, 0.1), scene);
	hemi.intensity = 0.85;
	hemi.groundColor = new BABYLON.Color3(0.62, 0.68, 0.78);
	const key = new BABYLON.DirectionalLight('key', new BABYLON.Vector3(-0.5, -1, -0.6), scene);
	key.position = new BABYLON.Vector3(12, 20, 12);
	key.intensity = 1.15;
	const rim = new BABYLON.DirectionalLight('rim', new BABYLON.Vector3(0.6, -0.2, 0.7), scene);
	rim.intensity = 0.45;
	rim.diffuse = new BABYLON.Color3(0.7, 0.82, 1.0);

	// ── White-plastic material ──
	function plasticMat() {
		const m = new BABYLON.StandardMaterial('plastic', scene);
		m.diffuseColor = new BABYLON.Color3(0.95, 0.96, 0.97);
		m.specularColor = new BABYLON.Color3(0.22, 0.24, 0.27);
		m.specularPower = 48;
		m.emissiveColor = new BABYLON.Color3(0.06, 0.07, 0.08);
		return m;
	}

	// ── Soft contact shadow (a flattened dark disc under the model) ──
	function addContactShadow(yBottom: number, span: number) {
		const disc = BABYLON.MeshBuilder.CreateDisc(
			'shadow',
			{ radius: span * 0.62, tessellation: 48 },
			scene
		);
		disc.rotation.x = Math.PI / 2;
		disc.position.y = yBottom - 0.02;
		const dt = new BABYLON.DynamicTexture('shadowTex', { width: 256, height: 256 }, scene, false);
		const ctx = dt.getContext();
		const g = ctx.createRadialGradient(128, 128, 8, 128, 128, 124);
		g.addColorStop(0, 'rgba(11,23,48,0.34)');
		g.addColorStop(0.6, 'rgba(11,23,48,0.12)');
		g.addColorStop(1, 'rgba(11,23,48,0)');
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, 256, 256);
		dt.update();
		const sm = new BABYLON.StandardMaterial('shadowMat', scene);
		sm.diffuseTexture = dt;
		sm.diffuseTexture.hasAlpha = true;
		sm.useAlphaFromDiffuseTexture = true;
		sm.emissiveColor = new BABYLON.Color3(0, 0, 0);
		sm.disableLighting = true;
		sm.backFaceCulling = false;
		disc.material = sm;
	}

	function boundsOf(meshes: any[]) {
		let min: any = null;
		let max: any = null;
		meshes.forEach((m: any) => {
			if (!m.getBoundingInfo) return;
			m.computeWorldMatrix(true);
			const bb = m.getBoundingInfo().boundingBox;
			if (!min) {
				min = bb.minimumWorld.clone();
				max = bb.maximumWorld.clone();
			} else {
				min = BABYLON.Vector3.Minimize(min, bb.minimumWorld);
				max = BABYLON.Vector3.Maximize(max, bb.maximumWorld);
			}
		});
		return { min, max };
	}

	const TARGET = 7; // world-space size the longest edge is scaled to

	function frame(meshes: any[], root: any) {
		root.computeWorldMatrix(true);
		meshes.forEach((m: any) => m.computeWorldMatrix(true));
		let b = boundsOf(meshes);
		if (!b.min) return;
		const size = b.max.subtract(b.min);
		const maxDim = Math.max(size.x, size.y, size.z) || 1;
		root.scaling.setAll(TARGET / maxDim);
		root.computeWorldMatrix(true);
		meshes.forEach((m: any) => m.computeWorldMatrix(true));
		b = boundsOf(meshes);
		const center = b.min.add(b.max).scale(0.5);
		root.position.subtractInPlace(center);
		root.computeWorldMatrix(true);
		meshes.forEach((m: any) => m.computeWorldMatrix(true));
		b = boundsOf(meshes);
		camera.setTarget(BABYLON.Vector3.Zero());
		const span = Math.max(b.max.x - b.min.x, b.max.y - b.min.y, b.max.z - b.min.z) || TARGET;
		camera.radius = span * 1.95;
		camera.lowerRadiusLimit = span * 1.15;
		camera.upperRadiusLimit = span * 4;
		addContactShadow(b.min.y, Math.max(b.max.x - b.min.x, b.max.z - b.min.z));
	}

	function done() {
		if (loaderEl) loaderEl.style.display = 'none';
	}

	function buildFallback() {
		const root = new BABYLON.TransformNode('fallback', scene);
		const mat = plasticMat();
		const body = BABYLON.MeshBuilder.CreateBox('body', { width: 4.2, height: 1.7, depth: 1.7 }, scene);
		body.material = mat;
		body.parent = root;
		const lid = BABYLON.MeshBuilder.CreateBox('lid', { width: 4.7, height: 0.42, depth: 2.0 }, scene);
		lid.position.y = 1.06;
		lid.material = mat;
		lid.parent = root;
		const probe = BABYLON.MeshBuilder.CreateCylinder('probe', { height: 1.0, diameter: 0.5 }, scene);
		probe.rotation.z = Math.PI / 2;
		probe.position.set(-2.6, -0.2, 0);
		probe.material = mat;
		probe.parent = root;
		const led = BABYLON.MeshBuilder.CreateSphere('led', { diameter: 0.22 }, scene);
		led.position.set(1.7, 0.2, 0.86);
		const lm = new BABYLON.StandardMaterial('led', scene);
		lm.emissiveColor = new BABYLON.Color3(0.05, 0.6, 0.38);
		lm.disableLighting = true;
		led.material = lm;
		led.parent = root;
		frame([body, lid, probe], root);
		done();
	}

	// ── Load the real STL, else fall back ──
	BABYLON.SceneLoader.ImportMeshAsync('', '/assets/', 'sensor_case_body.stl', scene)
		.then((res: any) => {
			const meshes = res.meshes.filter((m: any) => m.getTotalVertices && m.getTotalVertices() > 0);
			if (!meshes.length) throw new Error('empty STL');
			const root = new BABYLON.TransformNode('model', scene);
			const mat = plasticMat();
			meshes.forEach((m: any) => {
				m.parent = root;
				m.material = mat;
				try {
					m.createNormals(true);
				} catch {
					/* normals optional */
				}
			});
			root.rotation.x = -Math.PI / 2; // STL Z-up → Babylon Y-up
			frame(meshes, root);
			done();
		})
		.catch((err: unknown) => {
			console.warn('STL load failed, using procedural fallback:', err);
			buildFallback();
		});

	engine.runRenderLoop(() => scene.render());
	const onResize = () => engine.resize();
	window.addEventListener('resize', onResize);
	// Re-frame on first resize after layout settles
	const t = setTimeout(() => engine.resize(), 200);

	return () => {
		clearTimeout(t);
		window.removeEventListener('resize', onResize);
		engine.stopRenderLoop();
		scene.dispose();
		engine.dispose();
	};
}
