// V25 service + mounting animation (three.js). Model: REV B.2 of
// Enclosures-reduction/V25_Plastic/Case.FCStd, exported with its GUI colours and simplified
// (scripts/v25-model/README.md). CAD is Z-up mm and the GLB is Y-up, so
// CAD (x, y, z) -> (x, z, -y). Every pose is a pure function of the timeline time, so
// seeking and the chapter bar work from any point.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { steel, screwGeometry, washerGeometry, makeCell, plugGeometry, QwiicCable } from './parts';
import { buildFridge } from './fridge';
import { DURATION, STEPS } from './timeline';

type Vec = [number, number, number];

export interface Teardown {
	setPlaying(p: boolean): void;
	seek(s: number): void;
	restart(): void;
	destroy(): void;
}

const cad = (x: number, y: number, z: number) => new THREE.Vector3(x, z, -y);
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const seg = (t: number, a: number, b: number) => Math.min(1, Math.max(0, (t - a) / (b - a)));
const es = (t: number, a: number, b: number) => ease(seg(t, a, b));

/** piecewise state: eases between [time, value] keys and holds the value in between */
function track(t: number, keys: [number, number][]) {
	if (t <= keys[0][0]) return keys[0][1];
	for (let i = 0; i < keys.length - 1; i++) {
		const [ta, va] = keys[i],
			[tb, vb] = keys[i + 1];
		if (t <= tb) return va + (vb - va) * es(t, ta, tb);
	}
	return keys[keys.length - 1][1];
}

// ---- timeline (seconds) ----
const FRIDGE0 = 54.5,
	POLE0 = 66.0;
const FADES: [number, number][] = [
	[FRIDGE0 - 0.5, FRIDGE0 + 0.5],
	[POLE0 - 0.5, POLE0 + 0.5],
	[DURATION - 0.5, DURATION]
];
// the cooler and pole scenes swap in at the whitest point of each fade
const IN_FRIDGE = FRIDGE0 - 0.25,
	IN_POLE = POLE0 - 0.25;
const LED_FLASH = 39.75;
// black epoxy potting poured over the main PCB: stream, then the level rises to the connectors
const POT0 = 26.0;
// the board is potted from the start; the epoxy fades out for the labelled look at the board,
// then is poured back in (POT0)
const POT_HIDE: [number, number] = [21.0, 22.0];

// sensor cover: 0 fitted, 1 screws loose, 2 lifted, 3 parked; same for the main cover
const SC_KEYS: [number, number][] = [
	[2.3, 0],
	[4.4, 1],
	[5.6, 2],
	[7.4, 3],
	[49.5, 3],
	[50.9, 2],
	[51.5, 1],
	[53.5, 0]
];
const MC_KEYS: [number, number][] = [
	[14.3, 0],
	[16.7, 1],
	[17.9, 2],
	[19.6, 3],
	[40.9, 3],
	[42.4, 2],
	[42.9, 1],
	[45.1, 0]
];
// sensor board: 0 in its slot, 1 lifted clear, 2 parked
const SB_KEYS: [number, number][] = [
	[11.2, 0],
	[12.2, 1],
	[13.6, 2],
	[45.5, 2],
	[46.7, 1],
	[47.4, 0]
];
// QWIIC plug: 0 plugged into the sensor, 1 pulled up, 2 laid aside
const QW_KEYS: [number, number][] = [
	[8.4, 0],
	[9.1, 1],
	[10.4, 2],
	[47.5, 2],
	[48.6, 1],
	[49.2, 0]
];
// AA cells: 0 in the holder, 1 tipped out, 2 lifted clear, 3 parked
const CELL_KEYS: [number, number][][] = [
	[
		[32.8, 0],
		[33.5, 1],
		[34, 2],
		[35, 3],
		[36.9, 3],
		[37.8, 2],
		[38.3, 1],
		[38.9, 0]
	],
	[
		[33.6, 0],
		[34.3, 1],
		[34.8, 2],
		[35.8, 3],
		[36.2, 3],
		[37.1, 2],
		[37.6, 1],
		[38.2, 0]
	]
];

// screws: CAD (x, y) and the Z of the head's underside when tight
const LUGS: [number, number][] = [
	[46.6, 53.6],
	[-46.6, 53.6],
	[51, 6],
	[-51, 6],
	[0, 58]
]; // EDLY-B-M3-V4-L8 in the main cover, 7 turns (3.5 mm) to free
const FRONT: [number, number][] = [
	[-42, -48],
	[4, -48.25],
	[42, -48]
]; // EDLY-B-M3-V4-L10 in the sensor cover, 8 turns (4 mm)

// QWIIC cable centreline from the CAD route (sensor plug top -> board plug top)
const CABLE: Vec[] = [
	[-27.5, -46.25, 19.3],
	[-27.5, -46.25, 19.5],
	[-27.5, -46.25, 19.7],
	[-27.59, -46.25, 20.35],
	[-27.84, -46.25, 20.95],
	[-28.23, -46.25, 21.47],
	[-28.75, -46.25, 21.86],
	[-29.35, -46.25, 22.11],
	[-30, -46.25, 22.2],
	[-30.6, -46.25, 22.2],
	[-31.2, -46.25, 22.2],
	[-31.85, -46.25, 22.11],
	[-32.45, -46.25, 21.86],
	[-32.97, -46.25, 21.47],
	[-33.37, -46.25, 20.95],
	[-33.62, -46.25, 20.35],
	[-33.7, -46.25, 19.7],
	[-33.7, -46.25, 16.73],
	[-33.7, -46.25, 13.75],
	[-33.7, -46.16, 13.1],
	[-33.7, -45.91, 12.5],
	[-33.7, -45.52, 11.98],
	[-33.7, -45, 11.59],
	[-33.7, -44.4, 11.34],
	[-33.7, -43.75, 11.25],
	[-33.7, -39.62, 11.25],
	[-33.7, -35.5, 11.25],
	[-33.7, -34.85, 11.34],
	[-33.7, -34.25, 11.59],
	[-33.7, -33.73, 11.98],
	[-33.7, -33.34, 12.5],
	[-33.7, -33.09, 13.1],
	[-33.7, -33, 13.75],
	[-33.7, -33, 13.97],
	[-33.65, -32.93, 14.62],
	[-33.5, -32.73, 15.22],
	[-33.27, -32.41, 15.74],
	[-32.97, -31.99, 16.14],
	[-32.62, -31.5, 16.39],
	[-32.24, -30.97, 16.47],
	[-31.48, -29.93, 16.47],
	[-30.73, -28.88, 16.47],
	[-30.35, -28.36, 16.39],
	[-30, -27.87, 16.14],
	[-29.7, -27.45, 15.74],
	[-29.46, -27.13, 15.22],
	[-29.32, -26.93, 14.62],
	[-29.27, -26.86, 13.97],
	[-29.27, -26.86, 13.67],
	[-29.27, -26.86, 13.37]
];
const CABLE_FREE = 24; // points 0..23 are in the sensor bay; 24 on sit in the glued passage

// ---- camera ----
type CamKey = [number, Vec, Vec, number?];
const CAM: CamKey[] = [
	[0.0, [190, 150, 250], [0, 10, 5], 28],
	[2.0, [110, 120, 215], [0, 16, 30]],
	[4.4, [55, 92, 172], [0, 20, 42], 26],
	[5.6, [95, 140, 235], [-5, 30, 40], 28],
	[7.4, [10, 185, 270], [-45, 12, 50], 32],
	[8.4, [-6, 58, 104], [-28, 18, 45], 24],
	[10.8, [-20, 54, 98], [-30, 20, 45]],
	[12.0, [40, 110, 190], [-40, 22, 30], 28],
	[13.8, [70, 135, 215], [-70, 10, 25]],
	[15.0, [140, 200, 170], [0, 18, -5], 30],
	[16.8, [150, 190, 190], [0, 22, -5]],
	[18.4, [190, 175, 175], [40, 25, -20]],
	[19.6, [215, 185, 165], [70, 12, -30]],
	[20.8, [120, 150, 130], [0, 12, -6], 30], // the potted board, then the epoxy fades
	[22.1, [95, 135, 110], [0, 16, -12], 30],
	[25.7, [-75, 125, 95], [0, 16, -14]],
	[26.7, [78, 95, 122], [2, 8, 16], 28], // pouring: low and to the side for the gloss
	[30.7, [18, 102, 132], [2, 8, 14]],
	[33.2, [150, 165, 185], [20, 12, 35], 32],
	[36.0, [140, 170, 200], [15, 10, 45]],
	[37.4, [110, 150, 150], [10, 12, 0], 30],
	[39.0, [64, 72, 82], [16, 14, 19], 26],
	[40.8, [60, 70, 80], [16, 14, 19]],
	[42.2, [165, 195, 185], [45, 15, -10], 30],
	[45.4, [140, 190, 170], [0, 18, -5]],
	[46.6, [40, 110, 190], [-40, 22, 30], 28],
	[47.6, [-6, 58, 104], [-28, 18, 45], 24],
	[49.2, [-20, 54, 98], [-30, 20, 45]],
	[50.4, [10, 185, 270], [-45, 12, 50], 32],
	[51.6, [55, 92, 172], [0, 20, 42], 26],
	[53.6, [150, 130, 215], [0, 10, 4], 28],
	[54.5, [150, 130, 215], [0, 10, 4]]
];
// walk-in cooler, seconds after FRIDGE0: a flight through the door, then a hold on the wall
const FLY: [Vec, Vec][] = [
	[
		[-420, 1700, 3000],
		[0, 1250, 0]
	],
	[
		[-80, 1600, 1100],
		[0, 1450, -900]
	],
	[
		[0, 1580, 60],
		[80, 1500, -1500]
	],
	[
		[120, 1560, -520],
		[500, 1450, -1600]
	],
	[
		[380, 1530, -560],
		[1200, 1460, -1000]
	]
];
const FLY_T = 6.2;
const FRIDGE_CAM: CamKey[] = [
	[FLY_T, [380, 1530, -560], [1200, 1460, -1000], 40],
	[8.8, [640, 1530, -640], [1200, 1485, -920], 35],
	[11.5, [760, 1520, -680], [1199, 1490, -900], 32]
];
// pole, seconds after POLE0
const POLE_Y = 420;
const POLE_CAM: CamKey[] = [
	[0.0, [230, 540, 640], [0, POLE_Y, 230], 30],
	[2.4, [200, 520, 560], [0, POLE_Y - 5, 225]],
	[3.7, [170, 505, 520], [0, POLE_Y - 5, 225]],
	[6.0, [330, 500, 250], [0, POLE_Y, 50]],
	[6.6, [-150, 520, -330], [0, POLE_Y, 10], 30],
	[9.4, [-250, 470, -250], [0, POLE_Y, 15]],
	[10.4, [250, 500, 340], [0, POLE_Y, 45], 30],
	[13.0, [-190, 480, 360], [0, POLE_Y, 45]]
];

function camKeys(t: number, keys: CamKey[]) {
	let i = 0;
	while (i < keys.length - 2 && t > keys[i + 1][0]) i++;
	const [ta, pa, qa] = keys[i],
		[tb, pb, qb] = keys[i + 1];
	const fa = fovOf(keys, i),
		fb = fovOf(keys, i + 1);
	const u = es(t, ta, tb);
	// orbit round the moving target (spherical interpolation) so the camera never cuts
	// through the subject between two keys on opposite sides
	const tgt = new THREE.Vector3(...qa).lerp(new THREE.Vector3(...qb), u);
	const sa = new THREE.Spherical().setFromVector3(
		new THREE.Vector3(...pa).sub(new THREE.Vector3(...qa))
	);
	const sb = new THREE.Spherical().setFromVector3(
		new THREE.Vector3(...pb).sub(new THREE.Vector3(...qb))
	);
	let dth = sb.theta - sa.theta;
	if (dth > Math.PI) dth -= 2 * Math.PI;
	if (dth < -Math.PI) dth += 2 * Math.PI;
	const s = new THREE.Spherical(
		sa.radius + (sb.radius - sa.radius) * u,
		sa.phi + (sb.phi - sa.phi) * u,
		sa.theta + dth * u
	);
	return { pos: new THREE.Vector3().setFromSpherical(s).add(tgt), tgt, fov: fa + (fb - fa) * u };
}
function fovOf(keys: CamKey[], i: number) {
	for (let k = i; k >= 0; k--) if (keys[k][3] !== undefined) return keys[k][3]!;
	return 28;
}

type Std = THREE.MeshStandardMaterial;

export async function mountTeardown(
	stage: HTMLElement,
	modelUrl: string,
	opts: {
		onPlayingChange?: (p: boolean) => void;
		onStep?: (i: number) => void;
		onProgress?: (fraction: number) => void;
	} = {}
): Promise<Teardown> {
	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	stage.prepend(renderer.domElement);

	// white dip between scenes, and the part labels for the look inside
	const fade = document.createElement('div');
	fade.className = 'v25__fade';
	const labelLayer = document.createElement('div');
	labelLayer.className = 'v25__labels';
	labelLayer.setAttribute('aria-hidden', 'true');
	stage.append(labelLayer, fade);

	const scene = new THREE.Scene();
	const pmrem = new THREE.PMREMGenerator(renderer);
	scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
	scene.environmentIntensity = 0.55;

	const sun = new THREE.DirectionalLight(0xffffff, 1.6);
	sun.castShadow = true;
	sun.shadow.mapSize.set(2048, 2048);
	Object.assign(sun.shadow.camera, {
		left: -260,
		right: 260,
		top: 260,
		bottom: -260,
		near: 10,
		far: 1600
	});
	sun.shadow.bias = -0.0004;
	const hemi = new THREE.HemisphereLight(0xffffff, 0x8a9a8f, 0.5);
	const fill = new THREE.DirectionalLight(0xffffff, 0.6); // lifts the side away from the sun
	scene.add(sun, sun.target, hemi, fill, fill.target);

	// studio floor (teardown and pole)
	const floor = new THREE.Mesh(
		new THREE.PlaneGeometry(1600, 1600),
		new THREE.ShadowMaterial({ opacity: 0.14 })
	);
	floor.rotation.x = -Math.PI / 2;
	floor.position.y = -0.6;
	floor.receiveShadow = true;
	scene.add(floor);

	const fridge = buildFridge();
	fridge.group.visible = false;
	scene.add(fridge.group);
	const fridgeLights = new THREE.Group();
	for (const x of [-520, 520]) {
		const l = new THREE.PointLight(0xf2f7ff, 0.35, 4200, 0);
		l.position.set(x, 2300, -1500);
		fridgeLights.add(l);
	}
	fridgeLights.visible = false;
	scene.add(fridgeLights);

	const camera = new THREE.PerspectiveCamera(28, 1, 2, 30000);
	camera.layers.enable(1); // layer 1: drawn by this camera only, not in the epoxy's reflection
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.enablePan = false;
	controls.enableZoom = false; // don't hijack page scroll
	controls.minDistance = 20;
	controls.maxDistance = 6000;
	// drag to look round; the timeline camera eases back in a moment after the drag ends
	let camMode: 'auto' | 'user' | 'blend' = 'auto';
	let idleSince = 0,
		blendStart = 0,
		dragging = false;
	const blendFrom = { pos: new THREE.Vector3(), tgt: new THREE.Vector3() };
	controls.addEventListener('start', () => {
		camMode = 'user';
		dragging = true;
	});
	controls.addEventListener('end', () => {
		dragging = false;
		idleSince = performance.now();
	});
	const flyPos = new THREE.CatmullRomCurve3(FLY.map(([p]) => new THREE.Vector3(...p)));
	const flyTgt = new THREE.CatmullRomCurve3(FLY.map(([, q]) => new THREE.Vector3(...q)));
	const fridgeFog = new THREE.Fog(0xb9c3ca, 6500, 20000);
	let looped = false; // fade in from white only when the loop wraps, not on first play

	let aspect = 1;
	function resize() {
		const w = stage.clientWidth,
			h = stage.clientHeight;
		if (!w || !h) return;
		renderer.setSize(w, h, false);
		aspect = w / h;
		camera.aspect = aspect;
		camera.updateProjectionMatrix();
	}
	const ro = new ResizeObserver(resize);
	ro.observe(stage);

	const device = new THREE.Group(); // moves as one unit in the mounting scenes
	scene.add(device);
	const nodes: Record<string, THREE.Group> = {};
	const home = (g: THREE.Object3D) => g.userData.home as THREE.Vector3;

	// ---- small parts ----
	const steelMat = steel();
	const lugScrew = screwGeometry(4),
		frontScrew = screwGeometry(6),
		washerGeo = washerGeometry();
	const screws: {
		mesh: THREE.Mesh;
		washer: THREE.Mesh;
		base: THREE.Vector3;
		turns: number;
		lift: number;
	}[][] = [[], []]; // [front, lugs]
	const cells: THREE.Group[] = [];
	const sensorPlug = new THREE.Mesh(
		plugGeometry(),
		new THREE.MeshStandardMaterial({ color: 0xefe8d8, roughness: 0.55 })
	);
	const boardPlug = sensorPlug.clone();
	const cable = new QwiicCable();
	const cablePts = CABLE.map(([x, y, z]) => cad(x, y, z));
	const plugHome = cablePts[0].clone();
	// how strongly each free point follows the plug, by distance along the cable
	const follow: number[] = [];
	{
		let s = 0;
		const len: number[] = [0];
		for (let i = 1; i <= CABLE_FREE; i++) len.push((s += cablePts[i].distanceTo(cablePts[i - 1])));
		for (let i = 0; i <= CABLE_FREE; i++) follow.push(i < 2 ? 1 : Math.pow(1 - len[i] / s, 2.2));
	}

	// ---- LED flash ----
	let ledMats: Std[] = [];
	const glowTex = (() => {
		const c = document.createElement('canvas');
		c.width = c.height = 128;
		const x = c.getContext('2d')!;
		const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
		g.addColorStop(0, 'rgba(255,255,255,1)');
		g.addColorStop(0.2, 'rgba(255,90,70,0.9)');
		g.addColorStop(1, 'rgba(255,0,0,0)');
		x.fillStyle = g;
		x.fillRect(0, 0, 128, 128);
		return new THREE.CanvasTexture(c);
	})();
	const glow = new THREE.Sprite(
		new THREE.SpriteMaterial({
			map: glowTex,
			color: 0xff3020,
			blending: THREE.AdditiveBlending,
			depthWrite: false,
			depthTest: false, // a bloom over everything, not a disc cut off by the epoxy surface
			transparent: true
		})
	);
	glow.renderOrder = 10;
	glow.layers.set(1);
	glow.position.copy(cad(16.04, -22.97, 16.6));
	const ledLight = new THREE.PointLight(0xff2a1a, 0, 90, 0);
	ledLight.position.copy(cad(16.04, -22.97, 17));
	device.add(glow, ledLight);

	// ---- black epoxy potting over the main PCB ----
	// gloss black, like MG Chemicals 832B; poured onto open board between the MCU and the
	// terminal block, it spreads on the board, then fills the bay to just over the SMD parts, under the cable passage
	const epoxy = new THREE.MeshPhysicalMaterial({
		color: 0x060607,
		roughness: 0.1,
		metalness: 0,
		clearcoat: 1,
		clearcoatRoughness: 0.03
	});
	const POUR = cad(-6, -12, 0);
	const BOARD_TOP = 6.95; // top of the Rev 9 board's solder mask, CAD Z
	const stream = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.2, 1, 20, 1, true), epoxy);
	stream.geometry.translate(0, 0.5, 0); // unit height, origin at the bottom
	const puddle = new THREE.Mesh(new THREE.CircleGeometry(1, 48), epoxy);
	puddle.rotation.x = -Math.PI / 2;
	puddle.position.set(POUR.x, BOARD_TOP + 0.08, POUR.z);
	device.add(stream, puddle);
	let potFloor = 0,
		potHeight = 1; // set from the potting node once the model is in
	// once it has settled the surface also reflects like a dark mirror: a planar reflection, dimmed like a
	// dielectric (faint straight on, stronger at grazing angles), faded in over the clearcoat
	const GLOSS_SHADER = {
		name: 'EpoxyGloss',
		uniforms: {
			color: { value: null },
			tDiffuse: { value: null },
			textureMatrix: { value: null },
			opacity: { value: 0 }
		},
		vertexShader: /* glsl */ `
			uniform mat4 textureMatrix;
			varying vec4 vUv;
			varying vec3 vWorld;
			void main() {
				vUv = textureMatrix * vec4(position, 1.0);
				vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
			}`,
		fragmentShader: /* glsl */ `
			uniform vec3 color;
			uniform sampler2D tDiffuse;
			uniform float opacity;
			varying vec4 vUv;
			varying vec3 vWorld;
			void main() {
				vec3 base = texture2DProj(tDiffuse, vUv).rgb;
				float facing = abs(normalize(cameraPosition - vWorld).y);
				float fres = 0.16 + 0.7 * pow(1.0 - facing, 3.0);
				gl_FragColor = vec4(base * color * fres * opacity, 1.0);
				#include <tonemapping_fragment>
				#include <colorspace_fragment>
			}`
	};
	let gloss: Reflector | undefined;

	// ---- labels for the look inside ----
	// [text, anchor, leader length px, name to the left of the anchor], in placement priority
	const LABELS: [string, THREE.Vector3, number, boolean][] = [
		['ステータスLED', cad(16.0, -23.0, 18.5), 84, false],
		['LoRaWAN無線モジュール', cad(29.7, -19.6, 8.6), 36, false],
		['STM32マイコン', cad(5.1, -21.2, 8.5), 36, true],
		['単3電池 2本', cad(-8, 30.8, 23.1), 36, false],
		['シリコンパッキン', cad(-45.6, 20, 17.5), 36, true]
	];
	const labelPick = LABELS.map(() => 0); // last placement per label, kept while it still fits
	const labelEls = LABELS.map(([text, , lift, left]) => {
		const el = document.createElement('div');
		el.className = 'v25__label' + (left ? ' is-left' : '');
		el.style.setProperty('--lift', lift + 'px');
		const span = document.createElement('span');
		span.textContent = text;
		el.append(span);
		labelLayer.append(el);
		return el;
	});

	// ---- mounting props ----
	const magnets = new THREE.Group();
	{
		const nickel = new THREE.MeshStandardMaterial({
			color: 0xc9ccd0,
			metalness: 1,
			roughness: 0.25
		});
		for (const [x, y] of [
			[-38.37, -42.38],
			[38.37, -42.38],
			[-38.37, 42.38],
			[38.37, 42.38]
		]) {
			const m = new THREE.Mesh(new THREE.CylinderGeometry(7.5, 7.5, 1.9, 40), nickel);
			m.position.copy(cad(x, y, 0.5)); // Ø15 x 2 in the Ø15.25 recess, Z -0.5 to 1.5
			magnets.add(m);
		}
		device.add(magnets);
	}
	const bracketScrew = new THREE.Mesh(screwGeometry(0.3, 8), steelMat);
	bracketScrew.rotation.x = Math.PI; // head at the back, thread up into the base
	device.add(bracketScrew);

	const poleGroup = new THREE.Group();
	poleGroup.visible = false;
	scene.add(poleGroup);
	const POLE_R = 35; // the WGMB-1 saddle is R35
	const galv = new THREE.MeshStandardMaterial({ color: 0xcfd4d8, metalness: 0.7, roughness: 0.4 });
	const pole = new THREE.Mesh(new THREE.CylinderGeometry(POLE_R, POLE_R, 1500, 72), galv);
	pole.position.y = 749.4;
	pole.castShadow = pole.receiveShadow = true;
	poleGroup.add(pole);
	// stainless band clamp: across the saddle through the bracket's side windows, round the pole
	const band = (() => {
		// in the pole's XZ plane (Vector2 x = X, y = Z), pole axis at the origin
		const Rs = POLE_R + 0.7,
			L = new THREE.Vector2(-20.7, 37.5),
			R = new THREE.Vector2(20.7, 37.5);
		const th = Math.atan2(R.y, R.x) - Math.acos(Rs / R.length()); // tangent point, right side
		const pts: THREE.Vector2[] = [];
		for (let i = 0; i <= 20; i++) pts.push(L.clone().lerp(R, i / 20)); // over the saddle, inside
		const T1 = new THREE.Vector2(Rs * Math.cos(th), Rs * Math.sin(th));
		for (let i = 1; i <= 8; i++) pts.push(R.clone().lerp(T1, i / 8));
		const total = 2 * th + Math.PI; // clockwise round the back to the mirror tangent point
		for (let i = 1; i <= 90; i++) {
			const a = th - (total * i) / 90;
			pts.push(new THREE.Vector2(Rs * Math.cos(a), Rs * Math.sin(a)));
		}
		const T2 = pts[pts.length - 1].clone();
		for (let i = 1; i <= 8; i++) pts.push(T2.clone().lerp(L, i / 8));
		const pos: number[] = [];
		const hw = 6,
			thick = 0.6;
		const quad = (a: Vec, b: Vec, c: Vec, e: Vec) => pos.push(...a, ...b, ...c, ...a, ...c, ...e);
		const nrm = (k: number) => {
			const a = pts[Math.max(0, k - 1)],
				b = pts[Math.min(pts.length - 1, k + 1)];
			const t = b.clone().sub(a).normalize();
			return new THREE.Vector2(-t.y, t.x); // outward, away from the pole
		};
		const v = (w: THREE.Vector2, y: number): Vec => [w.x, y, w.y];
		for (let i = 0; i < pts.length - 1; i++) {
			const p = pts[i],
				q = pts[i + 1];
			const po = p.clone().addScaledVector(nrm(i), thick),
				qo = q.clone().addScaledVector(nrm(i + 1), thick);
			quad(v(po, hw), v(qo, hw), v(qo, -hw), v(po, -hw));
			quad(v(p, -hw), v(q, -hw), v(q, hw), v(p, hw));
			quad(v(p, hw), v(q, hw), v(qo, hw), v(po, hw));
			quad(v(po, -hw), v(qo, -hw), v(q, -hw), v(p, -hw));
		}
		const geo = new THREE.BufferGeometry();
		geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
		geo.computeVertexNormals();
		const m = new THREE.Mesh(
			geo,
			new THREE.MeshStandardMaterial({
				color: 0xd9dde0,
				metalness: 1,
				roughness: 0.3,
				side: THREE.DoubleSide
			})
		);
		m.castShadow = true;
		m.userData.segs = pts.length - 1;
		return m;
	})();
	band.position.y = POLE_Y + 6.7; // through the bracket windows, CAD Y 6.7
	poleGroup.add(band);
	const worm = new THREE.Group(); // worm-drive housing at the back of the pole
	{
		const housing = new THREE.Mesh(new THREE.BoxGeometry(14, 13, 7), band.material);
		housing.position.set(0, 0, -POLE_R - 4);
		const head = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.2, 5, 6), steelMat);
		head.rotation.z = Math.PI / 2;
		head.position.set(10, 0, -POLE_R - 4.5);
		worm.add(housing, head);
		worm.userData.head = head;
		worm.position.y = POLE_Y + 6.7;
		poleGroup.add(worm);
	}

	// device orientations for the mounts (sensor end down, as the drawings intend)
	const basis = (x: Vec, y: Vec, z: Vec) =>
		new THREE.Quaternion().setFromRotationMatrix(
			new THREE.Matrix4().makeBasis(
				new THREE.Vector3(...x),
				new THREE.Vector3(...y),
				new THREE.Vector3(...z)
			)
		);
	const Q_WALL_SHOW = basis([0, 0, -1], [1, 0, 0], [0, -1, 0]); // magnets towards the camera
	const Q_POLE_SHOW = basis([-1, 0, 0], [0, 0, -1], [0, -1, 0]); // back towards the camera
	const rotY = (a: number) =>
		new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), a);

	function applyDevice(t: number) {
		device.position.set(0, 0, 0);
		device.quaternion.identity();
		if (t >= IN_FRIDGE && t < IN_POLE) {
			const f = t - FRIDGE0;
			const m = fridge.mount;
			const wallX = m.pos.x - 0.5; // base underside (CAD Z -0.5) on the panel
			const hover = new THREE.Vector3(1060, m.pos.y, m.pos.z);
			const enter = new THREE.Vector3(1000, 1180, -760); // rises in from below the frame
			const a = es(f, 6.0, 7.3);
			device.position.copy(enter).lerp(hover, a);
			const turn = es(f, 7.4, 8.4);
			device.quaternion.copy(rotY(turn * Math.PI).multiply(Q_WALL_SHOW));
			const snap = seg(f, 8.45, 8.85);
			device.position.x += (wallX - hover.x) * snap * snap * snap; // magnets pull harder near the wall
			const k = seg(f, 8.85, 9.6); // a small knock as the magnets land
			if (k > 0 && k < 1) device.rotateZ(Math.sin(k * 26) * (1 - k) * 0.012);
		} else if (t >= IN_POLE) {
			const p = t - POLE0;
			const turn = es(p, 3.9, 5.8);
			device.quaternion.copy(rotY(turn * Math.PI).multiply(Q_POLE_SHOW));
			device.position.set(0, POLE_Y, THREE.MathUtils.lerp(230, 44, es(p, 4.2, 6.0)));
		}
	}

	function applyParts(t: number) {
		// sensor cover and main cover, each carrying its captive screws
		const covers: [THREE.Group, [number, number][], number, Vec, number][] = [
			[nodes.sensor_cover, SC_KEYS, 0, [-125, -19.5, 45], -0.55],
			[nodes.cover_aa, MC_KEYS, 1, [165, -18.0, -35], -0.45]
		];
		for (const [g, keys, k, park, tilt] of covers) {
			const s = track(t, keys);
			// loosen: about 8 turns at the front and 7 at the lugs (M3, 0.5 pitch) before the
			// thread is out of the insert; it is then back in the cover's own Ø2.6 hole
			screws[k].forEach((sc, i) => {
				const u = Math.min(1, track(t - (s < 1.5 ? i * 0.12 : 0), keys));
				sc.mesh.position.copy(sc.base).setY(sc.base.y + u * sc.lift);
				sc.mesh.rotation.y = u * sc.turns * Math.PI * 2;
			});
			const lift = es(s, 1, 2),
				go = Math.min(1, Math.max(0, s - 2));
			const L = new THREE.Vector3(0, 30 * lift, 0),
				P = new THREE.Vector3(...park);
			const off = L.clone().lerp(P, ease(go));
			off.y += Math.sin(Math.PI * go) * 45;
			g.position.copy(home(g)).add(off);
			g.rotation.x = tilt * lift * (1 - ease(go));
		}
		// sensor board: up out of its slot, then laid face up on the left
		{
			const g = nodes.sensor,
				s = track(t, SB_KEYS);
			const up = es(s, 0, 1),
				go = Math.min(1, Math.max(0, s - 1));
			const off = new THREE.Vector3(0, 32 * up, 0).lerp(
				new THREE.Vector3(-159, 3.3 - 11.5, -17),
				ease(go)
			);
			off.y += Math.sin(Math.PI * go) * 40;
			g.position.copy(home(g)).add(off);
			g.rotation.x = (-Math.PI / 2) * ease(go);
		}
		// QWIIC plug pulled straight up off the sensor, then laid aside; the cable follows it
		{
			const s = track(t, QW_KEYS);
			const d = new THREE.Vector3(0, 5 * es(s, 0, 1), 0).add(
				new THREE.Vector3(-11, 3.2, 1).multiplyScalar(es(s, 1, 2))
			);
			sensorPlug.position.copy(plugHome).add(d);
			sensorPlug.rotation.z = 0.45 * es(s, 1, 2);
			const key = d
				.toArray()
				.map((v) => v.toFixed(3))
				.join();
			if (key !== cable.group.userData.key) {
				cable.group.userData.key = key;
				const pts = cablePts.map((p, i) =>
					i <= CABLE_FREE ? p.clone().addScaledVector(d, follow[i]) : p
				);
				cable.update(pts);
			}
		}
		// AA cells: tip out past the spring, lift clear, park on the right
		cells.forEach((c, i) => {
			const s = track(t, CELL_KEYS[i]);
			const sign = i === 0 ? 1 : -1; // cell 1 positive end at +X, cell 2 at -X
			const tip = es(s, 0, 1),
				go = Math.min(1, Math.max(0, s - 2));
			const press = 1.5 * Math.min(1, tip * 3);
			const th = sign * 0.5 * es(tip, 0.25, 1);
			const neg = new THREE.Vector3(-sign * 25.25, 0, 0);
			const pin = neg.clone().add(new THREE.Vector3(-sign * press, 0, 0));
			const tipped = pin.clone().sub(neg.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), th));
			const lifted = new THREE.Vector3(0, 40, 0);
			const u = es(s, 1, 2);
			const off = tipped.clone().lerp(lifted, u);
			// laid side by side in front of the case
			const park = new THREE.Vector3(30, 6.75, i === 0 ? 105 : 127).sub(home(c));
			off.lerp(park, ease(go));
			off.y += Math.sin(Math.PI * go) * 35;
			c.position.copy(home(c)).add(off);
			c.rotation.z = th * (1 - u);
		});
		// one flash as the second cell seats
		const f = t - LED_FLASH;
		const on = f < 0 ? 0 : f < 0.07 ? f / 0.07 : Math.exp(-(f - 0.07) / 0.16);
		const flash = f > 1.2 ? 0 : on;
		ledMats.forEach((m) => (m.emissiveIntensity = flash * 6));
		glow.material.opacity = flash;
		glow.scale.setScalar(8 + 30 * flash);
		glow.visible = flash > 0.01;
		ledLight.intensity = flash * 2.5;

		// potting: in place from the start (the board ships potted); it fades out (POT_HIDE) for the
		// labelled look at the board, then is poured again from POT0. The stream runs from 0.9 s
		// to 4.3 s into the pour; the level rises from the bay floor, under the board first, then
		// over the SMD parts (Z 9.3), clear of the I2C connectors
		{
			const pt = t - POT0;
			const repour = t >= POT0;
			const pour = seg(pt, 0.9, 1.3) * (1 - seg(pt, 3.9, 4.3));
			const level = repour ? es(pt, 1.2, 4.2) : 1;
			const show = repour ? 1 : 1 - seg(t, ...POT_HIDE);
			if (epoxy.transparent !== show < 1) {
				epoxy.transparent = show < 1;
				epoxy.depthWrite = show >= 1;
				epoxy.needsUpdate = true;
			}
			epoxy.opacity = show;
			const pot = nodes.potting;
			pot.visible = level > 0.002 && show > 0.002;
			pot.scale.y = Math.max(0.002, level);
			const surf = potFloor + potHeight * level;
			const land = Math.max(surf, BOARD_TOP);
			stream.visible = pour > 0.01;
			stream.position.set(POUR.x, land, POUR.z);
			stream.scale.set(pour, 90 - land, pour);
			const spread = es(pt, 1.0, 2.6) * 13;
			puddle.visible = spread > 0.05 && surf < BOARD_TOP + 0.3;
			puddle.scale.setScalar(Math.max(0.01, spread));
			// mirror only while the bay is open and the surface is settled: in as the main cover
			// lifts, out with the fade, back once the new pour levels off, out as the cover
			// comes down (the reflection pass costs a second render)
			if (gloss) {
				const settled = repour ? seg(pt, 4.2, 5.0) : 1 - seg(t, POT_HIDE[0], POT_HIDE[0] + 0.6);
				const g = settled * seg(track(t, MC_KEYS), 1.2, 2.0);
				gloss.visible = g > 0.01 && t < IN_FRIDGE;
				(gloss.material as THREE.ShaderMaterial).uniforms.opacity.value = g;
			}
		}

		// pole scene: bracket on, screw in
		const p = t - POLE0;
		const inPole = t >= IN_POLE;
		const br = nodes.bracket;
		br.visible = inPole && p > 0.6;
		bracketScrew.visible = inPole && p > 2.0;
		if (inPole) {
			const b = es(p, 0.7, 2.0);
			br.position.copy(home(br)).add(new THREE.Vector3(0, -140 * (1 - b), 0));
			br.rotation.y = (1 - b) * 0.6;
			const sIn = es(p, 2.2, 3.6);
			bracketScrew.position.copy(cad(0, 6.7, -5 - 14 * (1 - es(p, 2.0, 2.4)) - 4 * (1 - sIn)));
			bracketScrew.rotation.y = -sIn * 8 * Math.PI * 2;
		}
		const w = seg(p, 6.4, 8.1);
		band.geometry.setDrawRange(0, Math.round(w * band.userData.segs) * 24);
		band.visible = inPole && w > 0;
		worm.visible = inPole && p > 7.6;
		(worm.userData.head as THREE.Mesh).rotation.x = es(p, 8.2, 9.4) * Math.PI * 10;
	}

	function autoCam(t: number) {
		if (t < IN_FRIDGE) return camKeys(t, CAM);
		if (t < IN_POLE) {
			const f = t - FRIDGE0;
			if (f < FLY_T) {
				const u = es(f, 0, FLY_T) * 0.65 + seg(f, 0, FLY_T) * 0.35;
				return {
					pos: flyPos.getPoint(u),
					tgt: flyTgt.getPoint(u),
					fov: 46 - 6 * es(f, 3.5, FLY_T)
				};
			}
			return camKeys(f, FRIDGE_CAM);
		}
		return camKeys(t - POLE0, POLE_CAM);
	}

	function apply(t: number) {
		const inFridge = t >= IN_FRIDGE && t < IN_POLE;
		const inPole = t >= IN_POLE;
		fridge.group.visible = fridgeLights.visible = inFridge;
		poleGroup.visible = inPole;
		floor.visible = !inFridge;
		scene.fog = inFridge ? fridgeFog : null;
		hemi.intensity = inFridge ? 0.55 : 0.5;
		hemi.color.set(inFridge ? 0xdcecff : 0xffffff);
		scene.environmentIntensity = inFridge ? 0.3 : 0.55;
		renderer.toneMappingExposure = inFridge ? 0.9 : 1;

		applyParts(t);
		applyDevice(t);
		device.visible = !inFridge || t - FRIDGE0 > 5.9; // enters after the flight
		device.updateMatrixWorld(true);

		// sun follows the subject so the shadow map stays sharp
		const focus = inFridge
			? device.position
			: inPole
				? new THREE.Vector3(0, POLE_Y, 40)
				: new THREE.Vector3();
		const off = inFridge
			? new THREE.Vector3(-420, 380, 170)
			: new THREE.Vector3(120, 260, 140).multiplyScalar(2.2);
		sun.position.copy(focus).add(off);
		sun.target.position.copy(focus);
		sun.intensity = inFridge ? 1.4 : 1.6;
		fill.position.copy(focus).sub(off);
		fill.target.position.copy(focus);
		fill.intensity = inFridge ? 0 : inPole ? 0.9 : 0.35;

		let fadeA = 0;
		for (const [a, b] of FADES) {
			const mid = (a + b) / 2;
			if (t >= a && t <= b) fadeA = t < mid ? seg(t, a, mid) : 1 - seg(t, mid, b);
		}
		if (looped && t < 0.4) fadeA = 1 - seg(t, 0, 0.4);
		fade.style.opacity = fadeA.toFixed(3);

		// camera
		const ac = autoCam(t);
		if (camMode === 'user' && idleSince && performance.now() - idleSince > 2500 && !dragging) {
			camMode = 'blend';
			blendStart = performance.now();
			blendFrom.pos.copy(camera.position);
			blendFrom.tgt.copy(controls.target);
		}
		if (camMode === 'blend') {
			const b = ease(Math.min(1, (performance.now() - blendStart) / 1400));
			camera.position.copy(blendFrom.pos).lerp(ac.pos, b);
			controls.target.copy(blendFrom.tgt).lerp(ac.tgt, b);
			if (b >= 1) camMode = 'auto';
		} else if (camMode === 'auto') {
			camera.position.copy(ac.pos);
			controls.target.copy(ac.tgt);
		}
		// keep the subject in frame on tall (phone) stages by widening the view
		const fov =
			aspect < 1.6
				? (2 * Math.atan(Math.tan((ac.fov * Math.PI) / 360) * (1.6 / aspect)) * 180) / Math.PI
				: ac.fov;
		if (Math.abs(camera.fov - fov) > 1e-3) {
			camera.fov = fov;
			camera.updateProjectionMatrix();
		}
		if (camMode === 'user') controls.update();
		else camera.lookAt(controls.target);

		fridge.update(t, camera.position);

		// labels while the covers are off
		const la = seg(t, 22.3, 22.9) * (1 - seg(t, 25.5, 26.0));
		labelLayer.style.opacity = la.toFixed(3);
		if (la > 0) {
			const w = stage.clientWidth,
				h = stage.clientHeight;
			// read every size first, then write, so this costs one layout per frame
			const cap = stage.querySelector('.v25__caption');
			const capBottom = cap
				? cap.getBoundingClientRect().bottom - stage.getBoundingClientRect().top
				: 0;
			const sizes = labelEls.map((el) => {
				const b = el.firstElementChild as HTMLElement;
				return [b.offsetWidth, b.offsetHeight];
			});
			const pts = LABELS.map(([, p]) => {
				const v = p.clone().applyMatrix4(device.matrixWorld).project(camera);
				return { x: ((v.x + 1) / 2) * w, y: ((1 - v.y) / 2) * h, front: v.z < 1 };
			});
			// greedy placement in priority order: each name takes the first spot that stays
			// inside the stage and clear of the caption, the other names and every dot
			type Box = [number, number, number, number];
			const hit = (a: Box, b: Box) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];
			const taken: Box[] = pts.map(({ x, y }) => [x - 7, y - 7, x + 7, y + 7]);
			LABELS.forEach(([, , lift, left], i) => {
				const { x, y, front } = pts[i];
				const [bw, bh] = sizes[i];
				const spots: [boolean, boolean, number][] = []; // [to the left, below, leader]
				for (const L of [lift, lift * 1.8])
					for (const down of [false, true]) for (const l of [left, !left]) spots.push([l, down, L]);
				const box = ([l, down, L]: [boolean, boolean, number]): Box => {
					const x0 = l ? x + 12 - bw : x - 12;
					const y0 = down ? y + L + 5 : y - L - 5 - bh;
					return [x0 - 3, y0 - 3, x0 + bw + 3, y0 + bh + 3];
				};
				const fits = (s: [boolean, boolean, number]) => {
					const b = box(s);
					return (
						b[0] >= 4 &&
						b[2] <= w - 4 &&
						b[1] >= capBottom + 4 &&
						b[3] <= h - 4 &&
						!taken.some((o, k) => k !== i && hit(b, o))
					);
				};
				let k = fits(spots[labelPick[i]]) ? labelPick[i] : spots.findIndex(fits);
				const el = labelEls[i];
				const shown = front && k >= 0; // no free spot (a small phone stage): leave it out
				el.style.visibility = shown ? 'visible' : 'hidden';
				if (k < 0) k = labelPick[i];
				labelPick[i] = k;
				const [l, down, L] = spots[k];
				if (shown) taken.push(box(spots[k]));
				el.classList.toggle('is-left', l);
				el.classList.toggle('is-down', down);
				el.style.setProperty('--lift', L + 'px');
				el.style.transform = `translate(${x}px, ${y}px)`;
			});
		}
	}

	// ---- playback ----
	let t = 0,
		playing = false,
		inView = true,
		last = performance.now(),
		raf = 0,
		ready = false,
		step = -1;
	function setPlaying(p: boolean) {
		playing = p;
		last = performance.now();
		opts.onPlayingChange?.(p);
	}
	const io = new IntersectionObserver(([e]) => {
		inView = e.isIntersecting;
		last = performance.now();
	});
	io.observe(stage);

	function tick(now: number) {
		raf = requestAnimationFrame(tick);
		if (!inView) return;
		const dt = Math.min(0.1, (now - last) / 1000);
		last = now;
		if (playing && ready) {
			t += dt;
			if (t >= DURATION) {
				t = 0;
				looped = true;
				camMode = 'auto';
			}
		}
		if (ready) {
			apply(t);
			let s = 0;
			while (s < STEPS.length - 1 && t >= STEPS[s + 1].t) s++;
			if (s !== step) opts.onStep?.((step = s));
			opts.onProgress?.(t / DURATION);
		}
		renderer.render(scene, camera);
	}

	function destroy() {
		cancelAnimationFrame(raf);
		ro.disconnect();
		io.disconnect();
		controls.dispose();
		gloss?.dispose(); // its render target
		scene.traverse((o) => {
			const mesh = o as THREE.Mesh;
			if (!mesh.isMesh && !(o as THREE.Sprite).isSprite) return;
			mesh.geometry?.dispose();
			const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
			mats.forEach((m) => {
				Object.values(m).forEach(
					(v) => (v as THREE.Texture)?.isTexture && (v as THREE.Texture).dispose()
				);
				m.dispose();
			});
		});
		scene.environment?.dispose();
		pmrem.dispose();
		renderer.dispose();
		renderer.domElement.remove();
		fade.remove();
		labelLayer.remove();
	}

	resize();
	raf = requestAnimationFrame(tick);

	try {
		const loader = new GLTFLoader();
		loader.setMeshoptDecoder(MeshoptDecoder);
		const gltf = await loader.loadAsync(modelUrl);
		device.add(gltf.scene);
		device.updateMatrixWorld(true);
		// re-root every part on its own pivot (the CAD centre / screw axis stored in extras)
		for (const n of [...gltf.scene.children]) {
			const g = new THREE.Group();
			g.name = n.name;
			g.position.fromArray(n.userData.pivot as Vec);
			g.userData.home = g.position.clone();
			device.add(g);
			g.updateMatrixWorld(true);
			g.attach(n);
			nodes[n.name] = g;
			n.traverse((o) => {
				const m = o as THREE.Mesh;
				if (!m.isMesh) return;
				m.castShadow = true;
				m.receiveShadow = true;
			});
		}
		gltf.scene.removeFromParent();
		const setMat = (name: string, mat: THREE.Material) =>
			nodes[name].traverse((o) => {
				if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).material = mat;
			});
		// PA12 MJF natural grey for the printed parts; the GLB carries the PCB colours
		const pa12 = new THREE.MeshStandardMaterial({ roughness: 0.85 });
		pa12.color.setRGB(0.36, 0.38, 0.39, THREE.SRGBColorSpace);
		['base', 'cover_aa', 'sensor_cover'].forEach((n) => setMat(n, pa12));
		setMat('gasket', new THREE.MeshStandardMaterial({ color: 0xa8432c, roughness: 0.7 }));
		setMat(
			'inserts',
			new THREE.MeshStandardMaterial({ color: 0xc9a24a, metalness: 1, roughness: 0.35 })
		);
		const bracketMat = new THREE.MeshStandardMaterial({ roughness: 0.6 });
		bracketMat.color.setRGB(0.9, 0.9, 0.87, THREE.SRGBColorSpace);
		setMat('bracket', bracketMat);
		setMat('potting', epoxy);
		{
			const bb = new THREE.Box3().setFromObject(nodes.potting);
			potFloor = bb.min.y;
			potHeight = bb.max.y - bb.min.y;
			// the mirror takes the potting's own top faces, so it follows the bay outline
			const top = bb.max.y,
				cx = (bb.min.x + bb.max.x) / 2,
				cz = (bb.min.z + bb.max.z) / 2;
			const flat: number[] = [];
			const a = new THREE.Vector3(),
				b = new THREE.Vector3(),
				c = new THREE.Vector3(),
				n = new THREE.Vector3();
			nodes.potting.traverse((o) => {
				const m = o as THREE.Mesh;
				if (!m.isMesh) return;
				m.updateWorldMatrix(true, false);
				const pos = m.geometry.getAttribute('position');
				const idx = m.geometry.index;
				const count = idx ? idx.count : pos.count;
				for (let k = 0; k < count; k += 3) {
					const [i0, i1, i2] = [k, k + 1, k + 2].map((j) => (idx ? idx.getX(j) : j));
					a.fromBufferAttribute(pos, i0).applyMatrix4(m.matrixWorld);
					b.fromBufferAttribute(pos, i1).applyMatrix4(m.matrixWorld);
					c.fromBufferAttribute(pos, i2).applyMatrix4(m.matrixWorld);
					n.subVectors(c, b).cross(new THREE.Vector3().subVectors(a, b)).normalize();
					if (n.y < 0.99 || Math.min(a.y, b.y, c.y) < top - 0.05) continue;
					// world (x, top, z) -> reflector plane (x - cx, -(z - cz), 0)
					for (const v of [a, b, c]) flat.push(v.x - cx, -(v.z - cz), 0);
				}
			});
			const geo = new THREE.BufferGeometry();
			geo.setAttribute('position', new THREE.Float32BufferAttribute(flat, 3));
			gloss = new Reflector(geo, {
				color: 0xffffff,
				textureWidth: 1024,
				textureHeight: 1024,
				shader: GLOSS_SHADER
			});
			// added on top of the clearcoat, so the room's highlight stays as well
			const gm = gloss.material as THREE.ShaderMaterial;
			gm.transparent = true;
			gm.blending = THREE.AdditiveBlending;
			gm.depthWrite = false;
			gloss.rotation.x = -Math.PI / 2;
			gloss.position.set(cx, top + 0.02, cz);
			gloss.visible = false;
			device.add(gloss);
		}
		nodes.led.traverse((o) => {
			const m = o as THREE.Mesh;
			if (!m.isMesh) return;
			const mat = (m.material as Std).clone();
			mat.emissive.setRGB(1, 0.12, 0.05);
			mat.emissiveIntensity = 0;
			m.material = mat;
			ledMats.push(mat);
		});
		ledMats = ledMats.filter((m) => m.color.r > m.color.g * 2); // the red body, not the leads

		// captive screws ride in their covers
		const addScrews = (
			list: [number, number][],
			seatZ: number,
			geo: THREE.BufferGeometry,
			cover: THREE.Group,
			turns: number,
			lift: number
		) =>
			list.map(([x, y]) => {
				const mesh = new THREE.Mesh(geo, steelMat);
				const washer = new THREE.Mesh(washerGeo, steelMat);
				mesh.castShadow = washer.castShadow = true;
				const base = cad(x, y, seatZ).sub(home(cover));
				mesh.position.copy(base);
				washer.position.copy(base).setY(base.y - 0.5);
				cover.add(mesh, washer);
				return { mesh, washer, base, turns, lift };
			});
		screws[0] = addScrews(FRONT, 25.0, frontScrew, nodes.sensor_cover, 8, 4);
		screws[1] = addScrews(LUGS, 23.5, lugScrew, nodes.cover_aa, 7, 3.5);

		// AA cells, axis along X at CAD Y 22.8 and 38.8
		[22.8, 38.8].forEach((y, i) => {
			const c = makeCell();
			if (i === 1) c.rotation.y = Math.PI; // positive end at -X
			const g = new THREE.Group();
			g.position.copy(cad(0, y, 15.86));
			g.userData.home = g.position.clone();
			g.add(c);
			device.add(g);
			cells.push(g);
		});

		sensorPlug.castShadow = boardPlug.castShadow = true;
		device.add(sensorPlug, cable.group);
		boardPlug.position.copy(cad(-29.27, -26.86, 13.37));
		boardPlug.rotation.y = Math.PI / 2;
		device.add(boardPlug);
		bracketScrew.castShadow = true;
	} catch (err) {
		destroy();
		throw err;
	}

	resize();
	ready = true;
	setPlaying(false); // the component starts playback once the stage is properly in view

	return {
		setPlaying,
		seek(s: number) {
			t = Math.max(0, Math.min(DURATION - 0.001, s));
			looped = false;
			camMode = 'auto';
		},
		restart() {
			t = 0;
			looped = false;
			camMode = 'auto';
			setPlaying(true);
		},
		destroy
	};
}
