// V25 enclosure teardown + mounting animation (three.js).
// Ported from Enclosures/V25_Plastic/marketing/teardown-animation/source/template.html;
// the timeline and key-frames are unchanged so the two stay comparable. CAD is Z-up mm and
// the GLB is Y-up, so CAD (x, y, z) -> (x, z, -y).
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

type Vec = [number, number, number];
type CamKey = [number, Vec, Vec];
type PoseKey = [number, Vec, number, 'snap'?];

export interface Teardown {
	setPlaying(p: boolean): void;
	seek(s: number): void;
	restart(): void;
	destroy(): void;
}

const cad = (x: number, y: number, z: number) => new THREE.Vector3(x, z, -y);

// ---- timeline (seconds) ----
const T_END = 21; // teardown length
const T_REWIND = 23.5; // hold, then reassemble at 3x
const M0 = 30.5; // case closed again; mounting scenes start
const G_END = M0 + 21.5;
const tearTime = (g: number) =>
	g <= T_END ? g : g < T_REWIND ? T_END : Math.max(0, T_END - (g - T_REWIND) * 3);
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const seg = (t: number, a: number, b: number) => Math.min(1, Math.max(0, (t - a) / (b - a)));

const FRONT: [number, number][] = [
	[-49, -48],
	[0, -48.25],
	[49, -48]
]; // through sensor cover lap, head seat Z 24
const LUGS: [number, number][] = [
	[-58, 6],
	[58, 6],
	[0, 58],
	[-53.6, 53.6],
	[53.6, 53.6]
]; // main cover lugs, head seat Z 23

const CAM_KEYS: CamKey[] = [
	[0.0, [150, 130, 215], [0, 10, 4]],
	[3.6, [130, 120, 205], [0, 10, 8]],
	// sensor-cover close-up: pulled back and re-aimed at the case centre so it stays in frame on wide stages
	[5.8, [-35, 305, 182], [-12, 6, 12]],
	[8.6, [-67, 297, 175], [-12, 6, 12]],
	[10.6, [145, 150, 200], [0, 8, 2]],
	[14.4, [105, 205, 140], [0, 14, -14]], // aim up/back to keep the lifted cover in frame
	[17.8, [-95, 190, 155], [0, 4, 0]],
	[21.0, [-55, 205, 175], [0, 4, 0]]
];

// mounting scenes, in seconds after M0
const HALF = Math.PI / 2,
	SHOW = -1.35; // case back against the wall / back turned to the camera
const POSE_KEYS: PoseKey[] = [
	[0.0, [0, 0, 0], 0],
	[0.8, [0, 0, 0], 0],
	[3.0, [0, 110, 0], SHOW],
	[5.0, [0, 110, 0], SHOW],
	[7.2, [0, 110, -72], HALF],
	[7.5, [0, 110, -90], HALF, 'snap'],
	[9.6, [0, 110, -90], HALF],
	[10.4, [0, 110, -40], HALF],
	[12.0, [0, 110, 0], SHOW],
	[14.4, [0, 110, 0], SHOW],
	[16.4, [0, 110, -30], HALF],
	[20.0, [0, 110, -30], HALF],
	[21.5, [0, 0, 0], 0]
];
const WALL_Z = -90.6,
	POLE_R = 24,
	POLE_DROP = 33; // pole axis sits 33 mm behind the case back
const MOUNT_CAM: CamKey[] = [
	[0.0, [150, 130, 215], [0, 10, 4]],
	[3.0, [50, 150, 300], [0, 108, 0]],
	[5.0, [70, 150, 295], [0, 108, 0]],
	[7.5, [230, 150, 190], [0, 108, -60]],
	[9.6, [250, 140, 150], [0, 108, -60]],
	[12.0, [50, 150, 300], [0, 108, 0]],
	[14.4, [-40, 150, 300], [0, 108, 0]],
	[16.4, [340, 150, 50], [0, 108, -42]],
	[18.6, [320, 200, -270], [0, 108, -45]],
	[19.6, [305, 200, -285], [0, 108, -45]],
	[21.5, [150, 130, 215], [0, 10, 4]]
];
const SENSOR = ['sensor_board', 'sensor_scd4x', 'sensor_conn', 'sensor_parts'];

type Std = THREE.MeshStandardMaterial;

export async function mountTeardown(
	stage: HTMLElement,
	modelUrl: string,
	opts: { onPlayingChange?: (p: boolean) => void } = {}
): Promise<Teardown> {
	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
	renderer.outputColorSpace = THREE.SRGBColorSpace;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1.0;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	stage.prepend(renderer.domElement);

	const scene = new THREE.Scene();
	const pmrem = new THREE.PMREMGenerator(renderer);
	scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
	scene.environmentIntensity = 0.55;

	const sun = new THREE.DirectionalLight(0xffffff, 1.6);
	sun.position.set(120, 260, 140);
	sun.castShadow = true;
	sun.shadow.mapSize.set(2048, 2048);
	Object.assign(sun.shadow.camera, {
		left: -300,
		right: 300,
		top: 300,
		bottom: -300,
		near: 10,
		far: 1200
	});
	sun.shadow.bias = -0.0004;
	scene.add(sun, new THREE.HemisphereLight(0xffffff, 0x8a9a8f, 0.5));

	const floor = new THREE.Mesh(
		new THREE.PlaneGeometry(900, 900),
		new THREE.ShadowMaterial({ opacity: 0.14 })
	);
	floor.rotation.x = -Math.PI / 2;
	floor.position.y = -0.6;
	floor.receiveShadow = true;
	scene.add(floor);

	const camera = new THREE.PerspectiveCamera(28, 1, 5, 3000);
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.enablePan = false;
	controls.enableZoom = false; // don't hijack page scroll
	controls.minDistance = 140;
	controls.maxDistance = 900;
	controls.maxPolarAngle = Math.PI * 0.49;
	let userCam = false;
	controls.addEventListener('start', () => {
		userCam = true;
	});

	let fit = 1;
	function resize() {
		const w = stage.clientWidth,
			h = stage.clientHeight;
		if (!w || !h) return;
		renderer.setSize(w, h, false);
		camera.aspect = w / h;
		// pull back on tall (phone) frames so the whole case fits
		// (the keys were framed edge-to-edge; 1.15 leaves margin for parts lifting off)
		fit = Math.max(1.15, 1.4 / camera.aspect);
		camera.updateProjectionMatrix();
	}
	const ro = new ResizeObserver(resize);
	ro.observe(stage);

	const parts: Record<string, THREE.Mesh> = {};
	const device = new THREE.Group(); // everything that moves as one unit when the case is mounted
	scene.add(device);
	const pivots: Record<string, THREE.Group> = {};
	// group meshes under a pivot at their own centre so they spin in place
	function pivotFor(names: string[]) {
		const box = new THREE.Box3();
		names.forEach((n) => box.expandByObject(parts[n]));
		const g = new THREE.Group();
		box.getCenter(g.position);
		g.userData.home = g.position.clone();
		device.add(g);
		names.forEach((n) => g.attach(parts[n]));
		return g;
	}
	let screwsFront: THREE.Group[] = [],
		screwsLug: THREE.Group[] = [];

	function setOpacity(obj: THREE.Object3D, o: number) {
		obj.visible = o > 0.001;
		obj.traverse((m) => {
			if (!(m as THREE.Mesh).isMesh) return;
			const mesh = m as THREE.Mesh;
			const mat = mesh.material as THREE.Material;
			mat.opacity = o;
			const tr = o < 0.999;
			if (mat.transparent !== tr) {
				mat.transparent = tr;
				mat.depthWrite = !tr;
				mat.needsUpdate = true;
			}
			mesh.castShadow = !tr;
		});
	}

	function makeScrew(
		proto: THREE.Mesh,
		washerProto: THREE.Mesh,
		x: number,
		y: number,
		seatZ: number
	) {
		const g = new THREE.Group();
		const s = proto.clone();
		s.material = (proto.material as Std).clone();
		const w = washerProto.clone();
		w.material = (washerProto.material as Std).clone();
		s.position.set(0, 0.5, 0); // head sits on the 0.5 mm washer
		g.add(s, w);
		g.position.copy(cad(x, y, seatZ));
		g.userData = { base: g.position.clone(), screw: s };
		device.add(g);
		return g;
	}

	function animateScrews(list: THREE.Group[], t: number, t0: number) {
		list.forEach((g, i) => {
			const a = t0 + i * 0.18;
			const u = ease(seg(t, a, a + 1.9)); // unthread 10 mm, 4 turns
			const p = ease(seg(t, a + 2.0, a + 3.0)); // pull away
			g.position.copy(g.userData.base);
			g.position.y += u * 10.5 + p * 40;
			g.userData.screw.rotation.y = -u * Math.PI * 8;
			setOpacity(g, 1 - seg(t, a + 2.5, a + 3.0));
		});
	}

	function camAt(t: number, keys: CamKey[] = CAM_KEYS) {
		let i = 0;
		while (i < keys.length - 2 && t > keys[i + 1][0]) i++;
		const [ta, pa, qa] = keys[i],
			[tb, pb, qb] = keys[i + 1];
		const u = ease(seg(t, ta, tb));
		const pos = new THREE.Vector3(...pa).lerp(new THREE.Vector3(...pb), u);
		const tgt = new THREE.Vector3(...qa).lerp(new THREE.Vector3(...qb), u);
		pos.sub(tgt).multiplyScalar(fit).add(tgt);
		return [pos, tgt] as const;
	}

	// ---- mounting props: magnets, wall, pole, strap ----
	let wall: THREE.Group, pole: THREE.Mesh, strap: THREE.Mesh;
	let strapSegs = 0;
	function buildMountProps() {
		const nickel = new THREE.MeshStandardMaterial({
			color: 0xc9ccd0,
			metalness: 1,
			roughness: 0.28
		});
		const dark = new THREE.MeshStandardMaterial({
			color: 0x2a2b2d,
			metalness: 0.8,
			roughness: 0.4
		});
		for (const [x, y] of [
			[-42.38, -42.38],
			[42.38, -42.38],
			[-42.38, 42.38],
			[42.38, 42.38]
		]) {
			const m = new THREE.Mesh(new THREE.CylinderGeometry(7.4, 7.4, 1.9, 40), nickel);
			m.position.copy(cad(x, y, 0.55)); // Ø15 x 2 recess, Z -0.5 to 1.5
			const h = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.1, 0.2, 24), dark);
			h.position.copy(cad(x, y, -0.4));
			m.castShadow = true;
			device.add(m, h);
		}

		// insulated-panel wall: coated steel skin, panel joints, cam-lock plugs
		wall = new THREE.Group();
		const skin = new THREE.MeshStandardMaterial({
			color: 0xdfe5e8,
			metalness: 0.35,
			roughness: 0.5
		});
		const joint = new THREE.MeshStandardMaterial({
			color: 0x9aa4a9,
			metalness: 0.2,
			roughness: 0.7
		});
		const plane = new THREE.Mesh(new THREE.PlaneGeometry(2400, 1600), skin);
		plane.position.set(0, 200, 0);
		plane.receiveShadow = true;
		wall.add(plane);
		for (const x of [-210, 170]) {
			const j = new THREE.Mesh(new THREE.BoxGeometry(3, 1600, 0.6), joint);
			j.position.set(x, 200, 0.2);
			wall.add(j);
			for (const y of [-160, 40, 240, 440]) {
				const plug = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 1.2, 24), skin.clone());
				plug.rotation.x = HALF;
				plug.position.set(x + 38, y, 0.5);
				wall.add(plug);
			}
		}
		wall.position.z = WALL_Z;
		scene.add(wall);

		pole = new THREE.Mesh(
			new THREE.CylinderGeometry(POLE_R, POLE_R, 1600, 56),
			new THREE.MeshStandardMaterial({ color: 0xa9aeb2, metalness: 0.9, roughness: 0.42 })
		);
		pole.position.set(0, 200, -30 - POLE_DROP);
		pole.castShadow = true;
		pole.receiveShadow = true;
		scene.add(pole);

		// strap: a closed band through the bracket window and around the pole, drawn in the case's own frame
		const C = new THREE.Vector2(0, -POLE_DROP),
			Rs = POLE_R + 1.0,
			A = new THREE.Vector2(24, -6.5);
		const d = A.distanceTo(C),
			phi = Math.atan2(A.y - C.y, A.x - C.x),
			th = phi - Math.acos(Rs / d);
		const pts: THREE.Vector2[] = [];
		for (let x = -24; x < 24; x += 2) pts.push(new THREE.Vector2(x, A.y));
		const T1 = new THREE.Vector2(C.x + Rs * Math.cos(th), C.y + Rs * Math.sin(th));
		for (let i = 0; i < 8; i++) pts.push(A.clone().lerp(T1, i / 8));
		const sweep = Math.PI + 2 * th;
		for (let i = 0; i <= 72; i++) {
			const a = th - (sweep * i) / 72;
			pts.push(new THREE.Vector2(C.x + Rs * Math.cos(a), C.y + Rs * Math.sin(a)));
		}
		const T2 = pts[pts.length - 1].clone(),
			B = new THREE.Vector2(-24, A.y);
		for (let i = 1; i <= 8; i++) pts.push(T2.clone().lerp(B, i / 8));
		const pos: number[] = [],
			zc = -7,
			hw = 10,
			thick = 1.6;
		const quad = (a: Vec, b: Vec, c: Vec, e: Vec) => pos.push(...a, ...b, ...c, ...a, ...c, ...e);
		const nrm = (k: number) => {
			const a = pts[Math.max(0, k - 1)],
				b = pts[Math.min(pts.length - 1, k + 1)];
			const t = b.clone().sub(a).normalize();
			return new THREE.Vector2(-t.y, t.x);
		};
		const v = (w: THREE.Vector2, z: number): Vec => [w.x, w.y, z];
		for (let i = 0; i < pts.length - 1; i++) {
			const p = pts[i],
				q = pts[i + 1];
			const po = p.clone().addScaledVector(nrm(i), thick),
				qo = q.clone().addScaledVector(nrm(i + 1), thick);
			quad(v(po, zc + hw), v(qo, zc + hw), v(qo, zc - hw), v(po, zc - hw)); // outer
			quad(v(p, zc - hw), v(q, zc - hw), v(q, zc + hw), v(p, zc + hw)); // inner
			quad(v(p, zc + hw), v(q, zc + hw), v(qo, zc + hw), v(po, zc + hw)); // edges
			quad(v(po, zc - hw), v(qo, zc - hw), v(q, zc - hw), v(p, zc - hw));
		}
		strapSegs = pts.length - 1;
		const geo = new THREE.BufferGeometry();
		geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
		geo.computeVertexNormals();
		strap = new THREE.Mesh(
			geo,
			new THREE.MeshStandardMaterial({ color: 0x17181a, roughness: 0.95, side: THREE.DoubleSide })
		);
		strap.castShadow = true;
		device.add(strap);
	}

	function applyMount(m: number) {
		let i = 0;
		while (i < POSE_KEYS.length - 2 && m > POSE_KEYS[i + 1][0]) i++;
		const [ta, pa, ra] = POSE_KEYS[i],
			[tb, pb, rb, mode] = POSE_KEYS[i + 1];
		const x = seg(m, ta, tb),
			u = mode === 'snap' ? x * x * x : ease(x);
		device.position.set(...pa).lerp(new THREE.Vector3(...pb), u);
		device.rotation.x = ra + (rb - ra) * u;

		setOpacity(wall, seg(m, 4.6, 5.6) * (1 - seg(m, 10.0, 10.8)));

		const br = parts.bracket,
			bi = ease(seg(m, 12.0, 13.4));
		br.position.y = -(1 - bi) * 90;
		setOpacity(br, seg(m, 12.0, 12.5) * (1 - seg(m, 19.8, 20.4)));

		const gone = 1 - seg(m, 19.8, 20.4);
		setOpacity(pole, seg(m, 14.0, 15.0) * gone);
		const w = seg(m, 16.4, 18.6);
		strap.geometry.setDrawRange(0, Math.round(w * strapSegs) * 24);
		setOpacity(strap, w > 0 ? gone : 0);
	}

	function apply(g: number) {
		const t = tearTime(g),
			m = Math.max(0, g - M0);
		applyMount(m);
		animateScrews(screwsFront, t, 1.2);
		animateScrews(screwsLug, t, 9.6);

		const sc = parts.sensor_cover;
		const s1 = ease(seg(t, 4.4, 5.2)),
			s2 = ease(seg(t, 5.0, 6.4));
		sc.position.set(0, s1 * 14 + s2 * 46, s2 * 14);
		sc.rotation.x = s2 * 0.25;
		setOpacity(sc, 1 - seg(t, 5.7, 6.4));

		const mc = parts.cover_aa;
		const c1 = ease(seg(t, 12.8, 13.8)),
			c2 = ease(seg(t, 13.5, 15.0));
		mc.position.set(0, c1 * 22 + c2 * 60, -c2 * 110);
		mc.rotation.x = -c2 * 0.45;
		setOpacity(mc, 1 - seg(t, 14.5, 15.2));

		// sensor board: slide up out of the bay, then fly off
		const b1 = ease(seg(t, 6.6, 7.6)),
			b2 = ease(seg(t, 7.5, 9.1));
		const sp = pivots.sensor;
		sp.position
			.copy(sp.userData.home)
			.add(new THREE.Vector3(-b2 * 60, b1 * 26 + b2 * 300, b2 * 50));
		sp.rotation.set(-b2 * 0.6, b2 * 1.2, b2 * 0.4);
		// AA cells: pop out of the holder one after the other, then fly off
		['cell_aa1', 'cell_aa2'].forEach((n, i) => {
			const a = 17.8 + i * 0.5;
			const l = ease(seg(t, a, a + 0.8)),
				f = ease(seg(t, a + 0.7, a + 1.9));
			const p = pivots[n];
			p.position.copy(p.userData.home).add(new THREE.Vector3(f * 90, l * 24 + f * 300, f * 20));
			p.rotation.set(l * 0.15 + f * 0.8, 0, -l * 0.1 - f * 0.9);
		});

		if (!userCam) {
			const [p, q] = g < M0 ? camAt(t) : camAt(m, MOUNT_CAM);
			camera.position.copy(p);
			controls.target.copy(q);
		}
	}

	// ---- playback: teardown, reassembly, mounting scenes, repeat ----
	let t = 0,
		playing = false,
		inView = true,
		last = performance.now(),
		raf = 0,
		ready = false;
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
			if (t >= G_END) {
				t = 0;
				userCam = false;
			}
		}
		if (ready) apply(t);
		controls.update();
		renderer.render(scene, camera);
	}

	function destroy() {
		cancelAnimationFrame(raf);
		ro.disconnect();
		io.disconnect();
		controls.dispose();
		scene.traverse((o) => {
			const mesh = o as THREE.Mesh;
			if (!mesh.isMesh) return;
			mesh.geometry.dispose();
			const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
			mats.forEach((m) => m.dispose());
		});
		scene.environment?.dispose();
		pmrem.dispose();
		renderer.dispose();
		renderer.domElement.remove();
	}

	resize();
	raf = requestAnimationFrame(tick);

	try {
		const gltf = await new GLTFLoader().loadAsync(modelUrl);
		gltf.scene.traverse((o) => {
			const mesh = o as THREE.Mesh;
			if (!mesh.isMesh) return;
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			parts[mesh.name] = mesh;
		});
		device.add(gltf.scene);
		// own the fading parts' materials so opacity changes stay local
		// PA12 MJF natural grey; the GLB carries the other colours
		for (const n of ['base', 'sensor_cover', 'cover_aa']) {
			const mat = (parts[n].material as Std).clone();
			mat.color.setRGB(0.36, 0.38, 0.39, THREE.SRGBColorSpace);
			mat.roughness = 0.85;
			parts[n].material = mat;
		}
		for (const n of ['cell_aa1', 'cell_aa2'])
			(parts[n].material as Std).color.setRGB(0.16, 0.24, 0.46, THREE.SRGBColorSpace);
		pivots.sensor = pivotFor(SENSOR);
		pivots.cell_aa1 = pivotFor(['cell_aa1']);
		pivots.cell_aa2 = pivotFor(['cell_aa2']);
		(parts.bracket.material as Std).color.setRGB(0.9, 0.9, 0.87, THREE.SRGBColorSpace);
		buildMountProps();
		const screw = parts.screw_m3x10,
			washer = parts.washer_m3;
		screw.removeFromParent();
		washer.removeFromParent();
		screwsFront = FRONT.map(([x, y]) => makeScrew(screw, washer, x, y, 24));
		screwsLug = LUGS.map(([x, y]) => makeScrew(screw, washer, x, y, 23));
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
			t = s;
			userCam = false;
		},
		restart() {
			t = 0;
			userCam = false;
			setPlaying(true);
		},
		destroy
	};
}
