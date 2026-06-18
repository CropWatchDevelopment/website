/**
 * Replacement Sensors — 4-up interactive 3D viewer.
 *
 * Ported from the design's `sensors-3d.js`, following its own SvelteKit-handoff
 * production note: instead of runtime OCCT-WASM tessellation of `.step`, each
 * sensor's CAD is pre-baked to a `.glb` (see `static/assets/models/`, generated
 * from the supplied STEP files) and loaded with Babylon `SceneLoader`. That
 * turns first view into a sub-second glb fetch. The soil sensor — only a mock
 * in the prototype — now has its real model too.
 *
 * The viewer lazy-starts (loads locally-bundled Babylon + builds the scene)
 * when the section nears the viewport. Babylon's classes are used via its
 * namespace; typed loosely as `any` to keep the ported code 1:1.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadBabylon } from './babylon';

export interface Sensor {
	id: string;
	file: string; // glb filename under /assets/models/
	icon: string;
	name: string;
	tag: string;
	blurb: string;
	measures: string[];
	specs: [string, string][];
}

const MODEL_DIR = '/assets/models/';

export const SENSORS: Sensor[] = [
	{
		id: 'th',
		file: 'th.glb',
		icon: 'thermostat',
		name: 'Food-Safe Temperature / Humidity',
		tag: 'CW-AIR-TH',
		blurb:
			'The everyday workhorse for cold-chain and food service. A food-safe housing reads air temperature, relative humidity and dew point with dual-sensor verification.',
		measures: ['Temperature', 'Humidity', 'Dew point'],
		specs: [
			['Accuracy', '±0.3 °C / ±2 %RH'],
			['Range', '−40 to +85 °C'],
			['Housing', 'Food-safe, IP66'],
			['Verification', 'Dual-sensor']
		]
	},
	{
		id: 'ppfd',
		file: 'ppfd.glb',
		icon: 'wb_sunny',
		name: 'PPFD - Photosynthetic Light',
		tag: 'CW-PPFD',
		blurb:
			'A horticultural quantum sensor measuring photosynthetic photon flux density at the canopy, with PPFD and a running DLI total derived on-device.',
		measures: ['PPFD', 'DLI'],
		specs: [
			['Spectral range', '400-700 nm (PAR)'],
			['Output', 'PPFD µmol/m²/s'],
			['Derived', 'DLI mol/m²/day'],
			['Housing', 'UV-stable, IP66']
		]
	},
	{
		id: 'co2',
		file: 'co2.glb',
		icon: 'cloud',
		name: 'CO₂ / Temperature / Humidity',
		tag: 'CW-AIR-THC',
		blurb:
			'Air quality in one module: NDIR carbon dioxide plus temperature and humidity, with VPD derived for greenhouses and CO₂ ventilation alerts for barns.',
		measures: ['CO₂', 'Temperature', 'Humidity', 'VPD'],
		specs: [
			['CO₂ range', '0-10,000 ppm'],
			['CO₂ method', 'NDIR'],
			['Accuracy', '±0.3 °C / ±2 %RH'],
			['Derived', 'VPD (kPa)']
		]
	},
	{
		id: 'soil',
		file: 'soil.glb',
		icon: 'grass',
		name: 'Soil Sensor',
		tag: 'CW-SS-TME',
		blurb:
			'Root-zone insight from a rugged in-ground probe: soil moisture, soil temperature and EC for irrigation and nutrient decisions.',
		measures: ['Soil moisture', 'Soil temp', 'EC'],
		specs: [
			['Moisture', 'Volumetric %'],
			['Soil EC', '0-20 mS/cm'],
			['Probe', 'Stainless, IP68'],
			['Connectivity', 'LoRaWAN (Class A)']
		]
	}
];

/**
 * Wire up the sensor viewer in the #sensorTypes section. Tabs + the spec panel
 * render immediately; Babylon and the 3D scene load lazily when the section
 * nears the viewport. Returns a cleanup to call on component destroy.
 */
export function initSensorViewer(): (() => void) | void {
	const section = document.getElementById('sensorTypes');
	const tabsEl = document.getElementById('v3dTabs');
	const panel = document.getElementById('v3dPanel');
	const statusEl = document.getElementById('v3dStatus');
	if (!section || !tabsEl || !panel) return;

	let BJS: any = null;
	let engine: any = null;
	let scene: any = null;
	let camera: any = null;
	let root: any = null;
	let started = false;
	let disposed = false;
	let activeId: string = SENSORS[0].id;
	const holders: Record<string, any> = {}; // id -> normalized TransformNode
	const TARGET = 6; // world-space size every model's longest edge is scaled to

	function setStatus(txt: string, spinning: boolean) {
		if (!statusEl) return;
		statusEl.innerHTML = spinning
			? '<span class="v3d__spin"></span><span>' + txt + '</span>'
			: txt
				? '<span class="material-symbols-rounded">info</span><span>' + txt + '</span>'
				: '';
		statusEl.style.display = txt ? 'flex' : 'none';
	}

	function setPanel(s: Sensor) {
		const name = panel!.querySelector('[data-name]');
		const tag = panel!.querySelector('[data-tag]');
		const blurb = panel!.querySelector('[data-blurb]');
		const measures = panel!.querySelector('[data-measures]');
		const specs = panel!.querySelector('[data-specs]');
		if (name) name.textContent = s.name;
		if (tag) tag.textContent = s.tag;
		if (blurb) blurb.textContent = s.blurb;
		if (measures)
			measures.innerHTML = s.measures.map((m) => '<span class="v3d-chip">' + m + '</span>').join('');
		if (specs)
			specs.innerHTML = s.specs
				.map((r) => '<div class="v3d-spec"><dt>' + r[0] + '</dt><dd>' + r[1] + '</dd></div>')
				.join('');
		document.querySelectorAll('.v3d-tab').forEach((t) =>
			t.classList.toggle('is-active', t.getAttribute('data-id') === s.id)
		);
	}

	function bounds(meshes: any[]) {
		let min: any = null;
		let max: any = null;
		meshes.forEach((m: any) => {
			if (!m.getBoundingInfo || (m.getTotalVertices && m.getTotalVertices() === 0)) return;
			m.computeWorldMatrix(true);
			const bb = m.getBoundingInfo().boundingBox;
			if (!min) {
				min = bb.minimumWorld.clone();
				max = bb.maximumWorld.clone();
			} else {
				min = BJS.Vector3.Minimize(min, bb.minimumWorld);
				max = BJS.Vector3.Maximize(max, bb.maximumWorld);
			}
		});
		return min ? { min, max, size: max.subtract(min) } : null;
	}

	// Normalize a freshly-loaded model: scale so its longest edge is TARGET world
	// units, then recenter on the origin. Without this, each glb keeps the CAD's
	// own units/origin — leaving the model outside the camera's clip planes, which
	// is exactly why the raw glb rendered as a blank stage.
	function normalize(holder: any, meshes: any[]) {
		let b = bounds(meshes);
		if (!b) return;
		const maxDim = Math.max(b.size.x, b.size.y, b.size.z) || 1;
		holder.scaling.setAll(TARGET / maxDim);
		holder.computeWorldMatrix(true);
		b = bounds(meshes);
		if (!b) return;
		const center = b.min.add(b.max).scale(0.5);
		holder.position.subtractInPlace(center);
		holder.computeWorldMatrix(true);
	}

	function showModel(id: string) {
		Object.keys(holders).forEach((k) => holders[k].setEnabled(k === id));
		camera.setTarget(BJS.Vector3.Zero());
		camera.radius = TARGET * 1.9;
	}

	function loadModel(s: Sensor) {
		if (holders[s.id]) {
			setStatus('', false);
			showModel(s.id);
			return;
		}
		setStatus('Loading 3D model…', true);
		BJS.SceneLoader.ImportMeshAsync('', MODEL_DIR, s.file, scene)
			.then((res: any) => {
				if (disposed) return;
				const holder = new BJS.TransformNode('h_' + s.id, scene);
				holder.parent = root;
				(res.meshes as any[]).forEach((m: any) => {
					if (!m.parent) m.parent = holder;
				});
				normalize(holder, res.meshes);
				holders[s.id] = holder;
				if (activeId === s.id) {
					setStatus('', false);
					showModel(s.id);
				} else {
					holder.setEnabled(false);
				}
			})
			.catch((err: unknown) => {
				if (disposed) return;
				setStatus('Could not load this model.', false);
				console.error('sensor model load failed:', err);
			});
	}

	function choose(s: Sensor) {
		activeId = s.id;
		setPanel(s);
		if (scene) loadModel(s);
	}

	function initScene(canvas: HTMLCanvasElement) {
		engine = new BJS.Engine(canvas, true, { preserveDrawingBuffer: true, antialias: true });
		scene = new BJS.Scene(engine);
		scene.clearColor = new BJS.Color4(0, 0, 0, 0);
		camera = new BJS.ArcRotateCamera(
			'cam',
			Math.PI / 4,
			Math.PI / 2.6,
			TARGET * 1.9,
			BJS.Vector3.Zero(),
			scene
		);
		camera.attachControl(canvas, true);
		camera.wheelPrecision = 40;
		camera.minZ = 0.05; // near plane well inside the normalized model
		camera.lowerRadiusLimit = TARGET * 0.8;
		camera.upperRadiusLimit = TARGET * 5;
		camera.useAutoRotationBehavior = true;
		camera.autoRotationBehavior.idleRotationSpeed = 0.35;
		camera.autoRotationBehavior.idleRotationWaitTime = 1200;
		const hemi = new BJS.HemisphericLight('h', new BJS.Vector3(0.3, 1, 0.2), scene);
		hemi.intensity = 0.95;
		hemi.groundColor = new BJS.Color3(0.4, 0.45, 0.55);
		const dir = new BJS.DirectionalLight('d', new BJS.Vector3(-0.6, -1, -0.5), scene);
		dir.intensity = 1.1;
		dir.position = new BJS.Vector3(8, 14, 8);
		const dir2 = new BJS.DirectionalLight('d2', new BJS.Vector3(0.7, -0.3, 0.6), scene);
		dir2.intensity = 0.5;
		root = new BJS.TransformNode('root', scene);
		engine.runRenderLoop(() => scene.render());
		window.addEventListener('resize', onResize);
	}

	function onResize() {
		if (engine) engine.resize();
	}

	async function start() {
		if (started || disposed) return;
		started = true;
		const canvas = document.getElementById('v3dCanvas') as HTMLCanvasElement | null;
		if (!canvas) return;
		setStatus('Loading 3D model…', true);
		try {
			BJS = await loadBabylon();
			if (disposed) return;
			initScene(canvas);
			loadModel(SENSORS.find((s) => s.id === activeId) || SENSORS[0]);
		} catch (e) {
			setStatus('3D viewer unavailable.', false);
			console.warn('sensor viewer start failed:', e);
		}
	}

	// Build tabs + initial panel immediately (works without Babylon).
	SENSORS.forEach((s) => {
		const b = document.createElement('button');
		b.className = 'v3d-tab';
		b.type = 'button';
		b.setAttribute('data-id', s.id);
		b.innerHTML =
			'<span class="v3d-tab__ic"><span class="material-symbols-rounded">' +
			s.icon +
			'</span></span>' +
			'<span class="v3d-tab__tx"><b>' +
			s.name +
			'</b><span>' +
			s.tag +
			'</span></span>';
		b.addEventListener('click', () => choose(s));
		tabsEl.appendChild(b);
	});
	setPanel(SENSORS[0]);

	// Lazy-start when the section nears the viewport.
	let io: IntersectionObserver | null = null;
	if ('IntersectionObserver' in window) {
		io = new IntersectionObserver(
			(entries) => {
				entries.forEach((en) => {
					if (en.isIntersecting) {
						start();
						io?.disconnect();
						io = null;
					}
				});
			},
			{ rootMargin: '300px' }
		);
		io.observe(section);
	} else {
		start();
	}

	return () => {
		disposed = true;
		io?.disconnect();
		window.removeEventListener('resize', onResize);
		if (engine) engine.dispose();
	};
}
