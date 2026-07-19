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
		name: '温度・湿度（食品対応）',
		tag: 'CW-AIR-TH',
		blurb:
			'冷蔵・冷凍設備や食品保管環境に適した標準センサー。気温・相対湿度を測定し、2系統のセンサーで測定値を照合。安定した温湿度管理を支えます。',
		measures: ['温度', '湿度', '露点'],
		specs: [
			['温度測定範囲', '−40〜+85℃'],
			['湿度測定範囲','0%〜100% (結露)'],
			['精度', '±0.48℃ / ±1.8%RH'],
			['年間ドリフト', 'typ. <0.01℃/y'],
			['チェック機能', '2系統センサーで測定値を確認']
		]
	},
	{
		id: 'co2',
		file: 'co2.glb',
		icon: 'cloud',
		name: 'CO₂・温度・湿度',
		tag: 'CW-AIR-THC',
		blurb:
			'空気の状態を、ひとつのセンサーで。NDIR方式のCO₂に加えて温度・湿度も測定。ハウスのVPD算出や、鶏舎の換気アラートに使えます。',
		measures: ['CO₂', '温度', '湿度', 'VPD'],
		specs: [
			['CO₂測定範囲', '400〜5,000ppm'],
			['精度','測定範囲により異なる'],
			['CO₂測定方式', 'NDIR'],
			['温度測定範囲', '−40〜+85℃'],
			['湿度測定範囲','0%〜100% (結露)'],
			['精度', '±0.2℃ / ±1.8%RH'],
			['算出値', 'VPD（kPa）']
		]
	},
	{
		id: 'ppfd',
		file: 'ppfd.glb',
		icon: 'wb_sunny',
		name: 'PPFD（光合成有効光量子束密度）',
		tag: 'CW-PPFD',
		blurb:
			'農業・栽培環境向けの光センサー。植物が光合成に利用できる光の量（PPFD）を測定。さらに、1日に植物へ届いた光の合計量を示すDLI（日積算光量）も本体で算出。日々の光環境を把握し、補光管理や栽培環境の見直しに活用できます。',
		measures: ['PPFD', 'DLI'],
		specs: [
			['波長範囲', '350〜1000nm（PAR）'],
			['測定値', 'PPFD µmol/m²/s'],
			['算出値', 'DLI mol/m²/日'],
		]
	},
	{
		id: 'soil',
		file: 'soil.glb',
		icon: 'grass',
		name: '土壌センサー',
		tag: 'CW-SS-TME',
		blurb:
			'頑丈な地中プローブで、土壌の中の状態を見える化。土壌水分・地温・EC（電気伝導度）を測定し、かん水や施肥の判断に活用できます。',
		measures: ['土壌水分', '地温', 'EC'],
		specs: [
			['土壌水分量（VWC）', '測定値から算出'],
			['土壌水分', '0〜100%（±8%）'],
			['土壌EC', '0〜3.0 mS/cm（±20%）'],
			['', '3.0〜8.0 mS/cm（±40%）'],
			['地温', '-20℃〜70℃'],
			['プローブ', 'ステンレス・IP68']
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

	function sensorFromUrl(): Sensor {
		const requestedId = new URL(window.location.href).searchParams.get('sensor');
		return SENSORS.find((sensor) => sensor.id === requestedId) || SENSORS[0];
	}

	function updateSensorUrl(id: string) {
		const url = new URL(window.location.href);
		if (url.searchParams.get('sensor') === id) return;
		url.searchParams.set('sensor', id);
		window.history.pushState(window.history.state, '', url);
	}

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
		document.querySelectorAll<HTMLButtonElement>('.v3d-tab').forEach((tab) =>
			tab.setAttribute('aria-pressed', String(tab.dataset.id === s.id))
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
		setStatus('3Dモデルを読み込み中…', true);
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
				setStatus('モデルを読み込めませんでした。', false);
				console.error('sensor model load failed:', err);
			});
	}

	function choose(s: Sensor, updateUrl = false) {
		activeId = s.id;
		setPanel(s);
		if (scene) loadModel(s);
		if (updateUrl) updateSensorUrl(s.id);
	}

	function onPopState() {
		choose(sensorFromUrl());
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
		setStatus('3Dモデルを読み込み中…', true);
		try {
			BJS = await loadBabylon();
			if (disposed) return;
			initScene(canvas);
			loadModel(SENSORS.find((s) => s.id === activeId) || SENSORS[0]);
		} catch (e) {
			setStatus('3Dビューアを表示できません。', false);
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
		b.addEventListener('click', () => choose(s, true));
		tabsEl.appendChild(b);
	});
	const initialSensor = sensorFromUrl();
	activeId = initialSensor.id;
	setPanel(initialSensor);
	window.addEventListener('popstate', onPopState);

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
		window.removeEventListener('popstate', onPopState);
		window.removeEventListener('resize', onResize);
		if (engine) engine.dispose();
	};
}
