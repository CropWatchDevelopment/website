// Small parts the CAD export leaves out or draws too plainly: EDLY captive screws with a hex
// socket and a real thread, AA cells, JST-SH plugs and the 4-wire QWIIC cable.
// Units are millimetres, Y up.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export const steel = () =>
	new THREE.MeshStandardMaterial({ color: 0xc9ccd1, metalness: 1, roughness: 0.32 });

function merged(parts: THREE.BufferGeometry[]) {
	const g = mergeGeometries(parts.map((p) => (p.index ? p.toNonIndexed() : p)));
	parts.forEach((p) => p.dispose());
	return g;
}

// helical thread ridge round a core, from y0 down `len` mm at M3 pitch 0.5
function thread(y0: number, len: number, r: number) {
	const turns = len / 0.5;
	const pts: THREE.Vector3[] = [];
	const n = Math.round(turns * 18);
	for (let i = 0; i <= n; i++) {
		const a = (i / n) * turns * Math.PI * 2;
		pts.push(new THREE.Vector3(Math.cos(a) * r, y0 - (i / n) * len, Math.sin(a) * r));
	}
	return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), n, 0.2, 5, false);
}

/**
 * JLCMC EDLY-B captive hex socket cap screw, M3: head Ø5.5 x 3 with a 2.5 hex socket, a Ø2.2
 * neck, then 4 mm of thread at the tip. Origin at the underside of the head, axis +Y.
 */
export function screwGeometry(neck: number, threadLen = 4) {
	const head = new THREE.Shape();
	head.absarc(0, 0, 2.5, 0, Math.PI * 2, false);
	const hex = new THREE.Path();
	for (let i = 0; i <= 6; i++) {
		const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
		const p = [Math.cos(a) * 1.443, Math.sin(a) * 1.443] as const;
		if (i) hex.lineTo(...p);
		else hex.moveTo(...p);
	}
	head.holes.push(hex);
	const h = new THREE.ExtrudeGeometry(head, {
		depth: 2.5,
		bevelEnabled: true,
		bevelThickness: 0.25,
		bevelSize: 0.25,
		bevelSegments: 2,
		curveSegments: 28
	});
	h.rotateX(-Math.PI / 2);
	h.translate(0, 0.25, 0);
	const socket = new THREE.CylinderGeometry(1.45, 1.45, 0.1, 6);
	socket.rotateY(Math.PI / 6);
	socket.translate(0, 1.4, 0);
	const n = new THREE.CylinderGeometry(1.1, 1.1, neck, 20, 1, true);
	n.translate(0, -neck / 2, 0);
	const core = new THREE.CylinderGeometry(1.2, 1.05, threadLen, 20);
	core.translate(0, -neck - threadLen / 2, 0);
	return merged([h, socket, n, core, thread(-neck - 0.15, threadLen - 0.4, 1.25)]);
}

export function washerGeometry() {
	// Ø7 x 0.5 M3 washer, origin at its underside
	const g = new THREE.LatheGeometry(
		[
			new THREE.Vector2(1.65, 0),
			new THREE.Vector2(3.5, 0),
			new THREE.Vector2(3.5, 0.5),
			new THREE.Vector2(1.65, 0.5),
			new THREE.Vector2(1.65, 0)
		],
		40
	);
	return g;
}

// wrap for the cell: u runs round the cell, v along it (top of the canvas = positive end)
function cellLabel() {
	const c = document.createElement('canvas');
	c.width = 256;
	c.height = 512;
	const x = c.getContext('2d')!;
	x.fillStyle = '#1d2f5c';
	x.fillRect(0, 0, 256, 512);
	x.fillStyle = '#d8dde6';
	x.fillRect(0, 0, 256, 34);
	x.fillRect(150, 0, 5, 512);
	x.translate(96, 270);
	x.rotate(-Math.PI / 2);
	x.font = 'bold 44px sans-serif';
	x.textAlign = 'center';
	x.textBaseline = 'middle';
	x.fillText('AA  1.5 V', 0, 0);
	x.font = 'bold 56px sans-serif';
	x.fillText('+', 200, 0);
	const t = new THREE.CanvasTexture(c);
	t.colorSpace = THREE.SRGBColorSpace;
	t.anisotropy = 4;
	return t;
}

/** IEC R6 cell, Ø14.5 x 50.5, along +X with the positive end at +X. Origin at its centre. */
export function makeCell(): THREE.Group {
	const g = new THREE.Group();
	const can = new THREE.MeshStandardMaterial({ color: 0xc4c7cc, metalness: 1, roughness: 0.3 });
	// steel can, negative end to the positive shoulder, then the button
	const prof = [
		[0, -25.25],
		[6.6, -25.25],
		[7.15, -24.9],
		[7.15, 23.2],
		[6.4, 24.0],
		[2.7, 24.0],
		[2.7, 25.1],
		[2.4, 25.25],
		[0, 25.25]
	].map(([r, y]) => new THREE.Vector2(r, y));
	const body = new THREE.Mesh(new THREE.LatheGeometry(prof, 40), can);
	const wrap = new THREE.Mesh(
		new THREE.CylinderGeometry(7.25, 7.25, 47.6, 40, 1, true),
		new THREE.MeshStandardMaterial({ map: cellLabel(), roughness: 0.45, metalness: 0.15 })
	);
	wrap.position.y = -1.1;
	body.castShadow = wrap.castShadow = true;
	const inner = new THREE.Group();
	inner.add(body, wrap);
	inner.rotation.z = -Math.PI / 2; // lathe axis +Y -> +X
	g.add(inner);
	return g;
}

/** JST-SH 4-pin plug housing, natural nylon. Origin at the top centre where the wires leave. */
export function plugGeometry() {
	const g = new RoundedBoxGeometry(7.0, 4.2, 2.8, 2, 0.35);
	g.translate(0, -2.1, 0);
	return g;
}

const WIRE_COLORS = [0x1b1b1d, 0xc8272d, 0x2459c4, 0xe8c62c]; // QWIIC: GND, 3.3 V, SDA, SCL
const WIRE_OFFSETS: [number, number][] = [
	[-0.48, -0.48],
	[0.48, -0.48],
	[0.48, 0.48],
	[-0.48, 0.48]
];

/** Four Ø0.9 wires laid round a centreline, rebuilt whenever the centreline moves. */
export class QwiicCable {
	group = new THREE.Group();
	private meshes: THREE.Mesh[];
	constructor() {
		this.meshes = WIRE_COLORS.map((c) => {
			const m = new THREE.Mesh(
				new THREE.BufferGeometry(),
				new THREE.MeshStandardMaterial({ color: c, roughness: 0.55 })
			);
			m.castShadow = true;
			this.group.add(m);
			return m;
		});
	}
	update(points: THREE.Vector3[]) {
		const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
		const N = 90;
		const P = curve.getSpacedPoints(N);
		// parallel-transport frames, so the bundle does not twist at the bends
		const T = P.map((_, i) =>
			P[Math.min(N, i + 1)]
				.clone()
				.sub(P[Math.max(0, i - 1)])
				.normalize()
		);
		let nrm = new THREE.Vector3(0, 1, 0);
		if (Math.abs(T[0].dot(nrm)) > 0.9) nrm.set(1, 0, 0);
		nrm.sub(T[0].clone().multiplyScalar(nrm.dot(T[0]))).normalize();
		const frames: [THREE.Vector3, THREE.Vector3][] = [];
		for (let i = 0; i <= N; i++) {
			if (i) {
				const axis = new THREE.Vector3().crossVectors(T[i - 1], T[i]);
				const s = axis.length();
				if (s > 1e-6) {
					const ang = Math.atan2(s, T[i - 1].dot(T[i]));
					nrm = nrm.clone().applyAxisAngle(axis.normalize(), ang);
				}
			}
			frames.push([nrm.clone(), new THREE.Vector3().crossVectors(T[i], nrm)]);
		}
		this.meshes.forEach((m, k) => {
			const [a, b] = WIRE_OFFSETS[k];
			const pts = P.map((p, i) =>
				p.clone().addScaledVector(frames[i][0], a).addScaledVector(frames[i][1], b)
			);
			m.geometry.dispose();
			m.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), N, 0.45, 6, false);
		});
	}
}
