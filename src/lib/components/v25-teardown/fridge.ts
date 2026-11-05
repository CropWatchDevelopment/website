// Walk-in cooler for the magnet-mount scene, in millimetres. Inside: X -1200..1200,
// Y 0..2400, Z -3000..0; the front wall (door, strip curtain) runs Z 0..100 and the
// camera starts out in the warehouse at +Z.
import * as THREE from 'three';

const W = 1200,
	H = 2400,
	D = 3000,
	WALL = 100,
	DOOR_W = 450,
	DOOR_H = 2050;
const PANEL = 1150; // insulated panel width

export interface Fridge {
	group: THREE.Group;
	/** right-hand wall, where the V25 goes: centre of the spot and the wall's inward normal */
	mount: { pos: THREE.Vector3; normal: THREE.Vector3 };
	update(t: number, cam: THREE.Vector3): void;
}

function canvasTex(w: number, h: number, draw: (x: CanvasRenderingContext2D) => void) {
	const c = document.createElement('canvas');
	c.width = w;
	c.height = h;
	draw(c.getContext('2d')!);
	const t = new THREE.CanvasTexture(c);
	t.colorSpace = THREE.SRGBColorSpace;
	t.wrapS = t.wrapT = THREE.RepeatWrapping;
	t.anisotropy = 8;
	return t;
}

// one insulated panel: stucco-embossed white steel, a seam at the left edge, two cam-lock caps
function panelTexture() {
	return canvasTex(512, 512, (x) => {
		x.fillStyle = '#eef1f2';
		x.fillRect(0, 0, 512, 512);
		for (let i = 0; i < 26000; i++) {
			const v = 234 + Math.floor(Math.random() * 12);
			x.fillStyle = `rgb(${v},${v + 2},${v + 3})`;
			x.fillRect(Math.random() * 512, Math.random() * 512, 1, 1);
		}
		x.fillStyle = '#b9c1c6';
		x.fillRect(0, 0, 3, 512);
		x.fillStyle = '#ffffff';
		x.fillRect(3, 0, 2, 512);
		for (const y of [128, 384]) {
			x.beginPath();
			x.arc(26, y, 9, 0, Math.PI * 2);
			x.fillStyle = '#e2e7ea';
			x.fill();
			x.strokeStyle = '#aab3b8';
			x.lineWidth = 2;
			x.stroke();
		}
	});
}

function diamondPlate() {
	return canvasTex(256, 256, (x) => {
		x.fillStyle = '#9aa1a6';
		x.fillRect(0, 0, 256, 256);
		for (let i = 0; i < 2200; i++) {
			const v = 140 + Math.floor(Math.random() * 30);
			x.fillStyle = `rgb(${v},${v + 4},${v + 7})`;
			x.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
		}
		for (let r = 0; r < 8; r++)
			for (let c = 0; c < 8; c++) {
				const cx = c * 32 + (r % 2) * 16 + 8,
					cy = r * 32 + 16;
				x.save();
				x.translate(cx, cy);
				x.rotate(r % 2 ? 0.7 : -0.7);
				x.fillStyle = '#c3c9cd';
				x.fillRect(-11, -2.5, 22, 5);
				x.fillStyle = '#6f777c';
				x.fillRect(-11, 2.5, 22, 1.5);
				x.restore();
			}
	});
}

function wireGrid() {
	const t = canvasTex(128, 128, (x) => {
		x.clearRect(0, 0, 128, 128);
		x.strokeStyle = '#dfe4e7';
		x.lineWidth = 5;
		for (let i = 0; i <= 128; i += 32) {
			x.beginPath();
			x.moveTo(i, 0);
			x.lineTo(i, 128);
			x.stroke();
		}
		x.lineWidth = 3;
		x.beginPath();
		x.moveTo(0, 64);
		x.lineTo(128, 64);
		x.stroke();
	});
	return t;
}

function label(text: string, w: number, h: number, bg: string, fg: string, font: string) {
	return canvasTex(w, h, (x) => {
		x.fillStyle = bg;
		x.fillRect(0, 0, w, h);
		x.fillStyle = fg;
		x.font = font;
		x.textAlign = 'center';
		x.textBaseline = 'middle';
		x.fillText(text, w / 2, h / 2);
	});
}

export function buildFridge(): Fridge {
	const group = new THREE.Group();
	const panelTex = panelTexture();
	const panel = (wMM: number, hMM: number) => {
		const t = panelTex.clone();
		t.needsUpdate = true;
		t.repeat.set(wMM / PANEL, hMM / PANEL);
		return new THREE.MeshStandardMaterial({ map: t, roughness: 0.55, metalness: 0.1 });
	};
	const add = <T extends THREE.Object3D>(o: T, shadow = false) => {
		o.traverse((m) => {
			if ((m as THREE.Mesh).isMesh) m.receiveShadow = shadow;
		});
		group.add(o);
		return o;
	};
	const plane = (w: number, h: number, mat: THREE.Material) =>
		new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);

	// ---- shell ----
	const left = plane(D, H, panel(D, H));
	left.position.set(-W, H / 2, -D / 2);
	left.rotation.y = Math.PI / 2;
	add(left);
	const right = plane(D, H, panel(D, H));
	right.position.set(W, H / 2, -D / 2);
	right.rotation.y = -Math.PI / 2;
	add(right, true);
	const back = plane(2 * W, H, panel(2 * W, H));
	back.position.set(0, H / 2, -D);
	add(back);
	const ceil = plane(2 * W, D, panel(2 * W, D));
	ceil.position.set(0, H, -D / 2);
	ceil.rotation.x = Math.PI / 2;
	add(ceil);
	const plateTex = diamondPlate();
	plateTex.repeat.set((2 * W) / 260, D / 260);
	const floor = plane(
		2 * W,
		D,
		new THREE.MeshStandardMaterial({ map: plateTex, metalness: 0.6, roughness: 0.45 })
	);
	floor.rotation.x = -Math.PI / 2;
	floor.position.set(0, 0, -D / 2);
	add(floor, true);

	// front wall with the door opening, extruded through its thickness
	const fw = new THREE.Shape();
	fw.moveTo(-W - WALL, 0);
	fw.lineTo(-DOOR_W, 0);
	fw.lineTo(-DOOR_W, DOOR_H);
	fw.lineTo(DOOR_W, DOOR_H);
	fw.lineTo(DOOR_W, 0);
	fw.lineTo(W + WALL, 0);
	fw.lineTo(W + WALL, H + WALL);
	fw.lineTo(-W - WALL, H + WALL);
	const frontTex = panelTex.clone();
	frontTex.needsUpdate = true;
	frontTex.repeat.set(1 / PANEL, 1 / PANEL);
	frontTex.offset.set(0.5, 0);
	add(
		new THREE.Mesh(
			new THREE.ExtrudeGeometry(fw, { depth: WALL, bevelEnabled: false }),
			new THREE.MeshStandardMaterial({ map: frontTex, roughness: 0.55, metalness: 0.1 })
		)
	);
	// outside of the side walls and roof, seen on the way in
	for (const s of [-1, 1]) {
		const o = plane(D + WALL, H + WALL, panel(D + WALL, H + WALL));
		o.position.set(s * (W + WALL), (H + WALL) / 2, -D / 2 + WALL / 2);
		o.rotation.y = (s * Math.PI) / 2;
		add(o);
	}
	const roof = plane(2 * (W + WALL), D + WALL, panel(2 * W, D));
	roof.rotation.x = -Math.PI / 2;
	roof.position.set(0, H + WALL, -D / 2 + WALL / 2);
	add(roof);

	const stainless = new THREE.MeshStandardMaterial({
		color: 0xd5d9dc,
		metalness: 1,
		roughness: 0.28
	});
	// stainless door trim and kick plates
	const box = (w: number, h: number, d: number, mat: THREE.Material) =>
		new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
	for (const s of [-1, 1]) {
		const j = box(70, DOOR_H + 70, 6, stainless);
		j.position.set(s * (DOOR_W + 35), (DOOR_H + 70) / 2, WALL + 3);
		add(j);
	}
	const head = box(2 * DOOR_W + 140, 70, 6, stainless);
	head.position.set(0, DOOR_H + 35, WALL + 3);
	add(head);
	for (const [x, z, ry, len] of [
		[-W + 1, -D / 2, Math.PI / 2, D],
		[W - 1, -D / 2, -Math.PI / 2, D],
		[0, -D + 1, 0, 2 * W]
	] as const) {
		const k = box(len, 300, 2, stainless);
		k.position.set(x, 150, z);
		k.rotation.y = ry;
		add(k);
	}

	// open door, hinged on the right of the opening
	const doorPivot = new THREE.Group();
	doorPivot.position.set(DOOR_W, 0, WALL);
	const leaf = new THREE.Group();
	const slab = box(2 * DOOR_W - 10, DOOR_H - 10, 100, panel(900, 2050));
	slab.position.set(-DOOR_W + 5, DOOR_H / 2, 50);
	const kick = box(2 * DOOR_W - 30, 300, 4, stainless);
	kick.position.set(-DOOR_W + 5, 160, 102);
	const handle = box(40, 300, 50, stainless);
	handle.position.set(-2 * DOOR_W + 90, 1050, 125);
	leaf.add(slab, kick, handle);
	for (const y of [300, 1000, 1700]) {
		const hinge = box(60, 200, 40, stainless);
		hinge.position.set(15, y, 80);
		leaf.add(hinge);
	}
	doorPivot.add(leaf);
	doorPivot.rotation.y = (-100 * Math.PI) / 180;
	add(doorPivot);

	// sign and outside thermometer
	const sign = new THREE.Mesh(
		new THREE.PlaneGeometry(760, 130),
		new THREE.MeshStandardMaterial({
			map: label(
				'冷蔵庫',
				1024,
				176,
				'#1f3b5a',
				'#ffffff',
				'bold 92px "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif'
			),
			roughness: 0.5
		})
	);
	sign.position.set(0, DOOR_H + 190, WALL + 2);
	add(sign);
	const thermo = box(
		150,
		90,
		30,
		new THREE.MeshStandardMaterial({ color: 0xe9ecee, roughness: 0.5 })
	);
	thermo.position.set(DOOR_W + 230, 1450, WALL + 15);
	const lcd = new THREE.Mesh(
		new THREE.PlaneGeometry(120, 56),
		new THREE.MeshBasicMaterial({
			map: label('2.8°C', 256, 120, '#0d1a12', '#5dff8a', 'bold 78px monospace')
		})
	);
	lcd.position.set(DOOR_W + 230, 1450, WALL + 31);
	add(thermo);
	add(lcd);

	// PVC strip curtain in the doorway
	const stripMat = new THREE.MeshStandardMaterial({
		color: 0xcfe2ea,
		transparent: true,
		opacity: 0.32,
		roughness: 0.12,
		side: THREE.DoubleSide,
		depthWrite: false
	});
	const strips: { pivot: THREE.Group; x: number }[] = [];
	for (let i = 0; i < 7; i++) {
		const x = -390 + i * 130;
		const pivot = new THREE.Group();
		pivot.position.set(x, DOOR_H - 10, WALL / 2 + (i % 2) * 3);
		const s = plane(200, DOOR_H - 30, stripMat);
		s.position.y = -(DOOR_H - 30) / 2;
		pivot.add(s);
		group.add(pivot);
		strips.push({ pivot, x });
	}

	// evaporator coil on the back wall, two fans
	const evap = new THREE.Group();
	const casing = box(
		1400,
		330,
		480,
		new THREE.MeshStandardMaterial({ color: 0xe1e5e8, roughness: 0.5 })
	);
	casing.position.set(0, 2215, -D + 240);
	evap.add(casing);
	const fins = box(
		1380,
		4,
		460,
		new THREE.MeshStandardMaterial({ color: 0x8d9499, metalness: 0.7, roughness: 0.5 })
	);
	fins.position.set(0, 2049, -D + 240);
	evap.add(fins);
	const fanBlades: THREE.Group[] = [];
	const dark = new THREE.MeshStandardMaterial({ color: 0x1d2125, roughness: 0.6 });
	for (const fx of [-330, 330]) {
		const shroud = new THREE.Mesh(new THREE.CircleGeometry(135, 48), dark);
		shroud.position.set(fx, 2215, -D + 481);
		evap.add(shroud);
		for (const r of [132, 92, 52]) {
			const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 2.5, 6, 64), dark);
			ring.position.set(fx, 2215, -D + 492);
			evap.add(ring);
		}
		for (let k = 0; k < 4; k++) {
			const spoke = box(264, 4, 4, dark);
			spoke.position.set(fx, 2215, -D + 492);
			spoke.rotation.z = (k * Math.PI) / 4;
			evap.add(spoke);
		}
		const blades = new THREE.Group();
		blades.position.set(fx, 2215, -D + 486);
		for (let k = 0; k < 4; k++) {
			const b = box(
				115,
				34,
				3,
				new THREE.MeshStandardMaterial({ color: 0x5b6268, metalness: 0.4, roughness: 0.5 })
			);
			b.position.x = 62;
			const arm = new THREE.Group();
			arm.rotation.z = (k * Math.PI) / 2;
			b.rotation.x = 0.35;
			arm.add(b);
			blades.add(arm);
		}
		evap.add(blades);
		fanBlades.push(blades);
	}
	add(evap);

	// vapour-tight LED fixtures
	const lamp = new THREE.MeshStandardMaterial({
		color: 0xffffff,
		emissive: 0xf4f8ff,
		emissiveIntensity: 1.6
	});
	for (const x of [-520, 520]) {
		const f = box(110, 50, 1250, lamp);
		f.position.set(x, H - 25, -D / 2);
		add(f);
	}

	// chrome wire shelving along the left wall, stocked with cases and crates
	const chrome = new THREE.MeshStandardMaterial({ color: 0xe2e6e9, metalness: 1, roughness: 0.22 });
	const grid = wireGrid();
	grid.repeat.set(500 / 40, 1200 / 40);
	const shelfMat = new THREE.MeshStandardMaterial({
		map: grid,
		alphaTest: 0.5,
		metalness: 1,
		roughness: 0.25,
		side: THREE.DoubleSide
	});
	const stock: { x: number; y: number; z: number; w: number; h: number; d: number; c: number }[] =
		[];
	const colours = [0xb98a55, 0xc79a62, 0x2f7d4f, 0x2a5e9e, 0xa87b4b, 0xd8d2c4];
	let seed = 7;
	const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
	for (const z0 of [-2800, -1500]) {
		const x0 = -W + 40,
			x1 = x0 + 500,
			z1 = z0 + 1200;
		for (const [px, pz] of [
			[x0, z0],
			[x1, z0],
			[x0, z1],
			[x1, z1]
		]) {
			const post = new THREE.Mesh(new THREE.CylinderGeometry(13, 13, 1850, 12), chrome);
			post.position.set(px, 925, pz);
			add(post);
		}
		for (const y of [160, 600, 1040, 1480]) {
			const s = plane(500, 1200, shelfMat);
			s.rotation.x = -Math.PI / 2;
			s.position.set((x0 + x1) / 2, y, (z0 + z1) / 2);
			add(s);
			for (const zz of [z0, z1]) {
				const rail = box(500, 25, 6, chrome);
				rail.position.set((x0 + x1) / 2, y, zz);
				add(rail);
			}
			// fill the shelf with a row of cases and crates
			let z = z0 + 30;
			while (z < z1 - 200) {
				const crate = rnd() < 0.35;
				const d = crate ? 300 : 220 + rnd() * 120;
				const h = crate ? 230 : 180 + rnd() * 160;
				const w = crate ? 400 : 300 + rnd() * 140;
				const c = crate
					? colours[2 + Math.floor(rnd() * 2)]
					: colours[[0, 1, 4, 5][Math.floor(rnd() * 4)]];
				stock.push({ x: x0 + 30 + w / 2, y: y + h / 2 + 2, z: z + d / 2, w, h, d, c });
				z += d + 25;
			}
		}
	}
	// a pallet of cases at the back right
	const pallet = box(
		1000,
		140,
		1200,
		new THREE.MeshStandardMaterial({ color: 0x9c7a50, roughness: 0.9 })
	);
	pallet.position.set(560, 70, -2350);
	add(pallet);
	for (let ix = 0; ix < 2; ix++)
		for (let iz = 0; iz < 3; iz++)
			for (let iy = 0; iy < 3; iy++)
				stock.push({
					x: 330 + ix * 470,
					y: 140 + 160 + iy * 320,
					z: -2880 + iz * 390,
					w: 450,
					h: 310,
					d: 370,
					c: colours[(ix + iz + iy) % 2 ? 0 : 4]
				});
	const cases = new THREE.InstancedMesh(
		new THREE.BoxGeometry(1, 1, 1),
		new THREE.MeshStandardMaterial({ roughness: 0.85 }),
		stock.length
	);
	const m4 = new THREE.Matrix4();
	stock.forEach((s, i) => {
		m4.compose(
			new THREE.Vector3(s.x, s.y, s.z),
			new THREE.Quaternion(),
			new THREE.Vector3(s.w, s.h, s.d)
		);
		cases.setMatrixAt(i, m4);
		cases.setColorAt(i, new THREE.Color(s.c));
	});
	add(cases);

	// warehouse round the cooler: floor, far walls, a run of pallet racking
	const wh = new THREE.Mesh(
		new THREE.BoxGeometry(16000, 8000, 16000),
		new THREE.MeshStandardMaterial({ color: 0x5a636a, roughness: 0.9, side: THREE.BackSide })
	);
	wh.position.set(0, 3999, 2000);
	add(wh);
	const whFloor = plane(
		16000,
		16000,
		new THREE.MeshStandardMaterial({ color: 0x737a7f, roughness: 0.7 })
	);
	whFloor.rotation.x = -Math.PI / 2;
	whFloor.position.set(0, -1, 2000);
	add(whFloor);
	// yellow aisle lines in front of the door
	const paint = new THREE.MeshStandardMaterial({ color: 0xe8b923, roughness: 0.6 });
	for (const x of [-1500, 1500]) {
		const line = plane(100, 5000, paint);
		line.rotation.x = -Math.PI / 2;
		line.position.set(x, 0, 2700);
		add(line);
	}
	const rackBlue = new THREE.MeshStandardMaterial({ color: 0x2b5ea8, roughness: 0.6 });
	const rackOrange = new THREE.MeshStandardMaterial({ color: 0xe0782a, roughness: 0.6 });
	for (const x of [-4200, -2900, 2900, 4200]) {
		for (const z of [-2600, -200]) {
			const up = box(80, 4200, 80, rackBlue);
			up.position.set(x, 2100, z);
			add(up);
		}
		for (const y of [1400, 2800]) {
			const beam = box(80, 120, 2400, rackOrange);
			beam.position.set(x, y, -1400);
			add(beam);
		}
	}

	const mount = { pos: new THREE.Vector3(W, 1500, -900), normal: new THREE.Vector3(-1, 0, 0) };

	return {
		group,
		mount,
		update(t, cam) {
			fanBlades.forEach((b, i) => (b.rotation.z = t * 9 + i));
			// strips bend away from the camera as it pushes through, then swing back
			const z = cam.z - WALL / 2;
			for (const s of strips) {
				const near = Math.exp(-((s.x - cam.x) ** 2) / (2 * 220 ** 2));
				let a = 0;
				if (z < 260 && z > -1800) {
					const push = Math.min(1, (260 - z) / 260);
					const after = z < 0 ? Math.exp(z / 450) * Math.cos(z / 140) : 1;
					a = near * 1.05 * push * after;
				}
				s.pivot.rotation.x = a;
			}
		}
	};
}
