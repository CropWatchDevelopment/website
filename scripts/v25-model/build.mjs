// FreeCAD face tessellation (pos.bin / idx.bin / nodes.json from export_v25.py) -> the V25 GLB,
// Y-up, millimetres, meshopt-compressed. Usage: node build.mjs <export dir> <out.glb> [raw]
import fs from 'node:fs';
import { Document, NodeIO } from '@gltf-transform/core';
import { EXTMeshoptCompression, KHRMeshQuantization } from '@gltf-transform/extensions';
import {
	weld,
	simplifyPrimitive,
	reorder,
	quantize,
	meshopt,
	dedup,
	prune
} from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';

const IN = process.argv[2];
const OUT = process.argv[3];
const COMPRESS = process.argv[4] !== 'raw';
const nodes = JSON.parse(fs.readFileSync(IN + '/nodes.json', 'utf8'));
const P = new Float32Array(fs.readFileSync(IN + '/pos.bin').buffer.slice(0));
const I = new Uint32Array(fs.readFileSync(IN + '/idx.bin').buffer.slice(0));

// simplification error per node, as a fraction of the node's own size
const ERR = {
	base: 0.0004,
	cover_aa: 0.0004,
	sensor_cover: 0.0004,
	gasket: 0.0015,
	inserts: 0.002,
	sensor: 0.0015,
	pcb: 0.0012,
	led: 0.004,
	holder: 0.001,
	holder_contacts: 0.004,
	bracket: 0.0008,
	potting: 0.0006
};
// drawn in three.js: screws and washers (hex socket, thread), AA cells, QWIIC plugs
const SKIP = (n) =>
	/^(screw|washer)\d$/.test(n) || ['cell1', 'cell2', 'sensor_plug', 'board_plug'].includes(n);

const doc = new Document();
const buffer = doc.createBuffer();
const scene = doc.createScene('v25');
const mats = new Map();
const srgb2lin = (c) => {
	c /= 255;
	return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
function material(rgb) {
	const key = rgb.join(',');
	if (mats.has(key)) return mats.get(key);
	const [r, g, b] = rgb;
	const grey = Math.max(r, g, b) - Math.min(r, g, b) < 18;
	const gold = r > 170 && g > 130 && b < 110 && r - b > 80;
	const metal = (grey && r > 165) || gold;
	const m = doc
		.createMaterial(key)
		.setBaseColorFactor([srgb2lin(r), srgb2lin(g), srgb2lin(b), 1])
		.setMetallicFactor(metal ? 0.85 : 0)
		.setRoughnessFactor(metal ? 0.35 : 0.6);
	mats.set(key, m);
	return m;
}

let total = 0;
for (const [name, n] of Object.entries(nodes)) {
	if (SKIP(name)) continue;
	const mesh = doc.createMesh(name);
	for (const pr of n.prims) {
		const [po, pc] = pr.pos;
		const [io, ic] = pr.idx;
		// CAD Z-up -> glTF Y-up: (x, y, z) -> (x, z, -y)
		const pos = new Float32Array(pc);
		for (let k = 0; k < pc; k += 3) {
			pos[k] = P[po + k];
			pos[k + 1] = P[po + k + 2];
			pos[k + 2] = -P[po + k + 1];
		}
		const idx = new Uint32Array(ic);
		for (let k = 0; k < ic; k++) idx[k] = I[io + k];
		// smooth normals inside each CAD face; faces never share vertices, so edges stay sharp
		const nrm = new Float32Array(pc);
		for (let k = 0; k < ic; k += 3) {
			const a = idx[k] * 3,
				b = idx[k + 1] * 3,
				c = idx[k + 2] * 3;
			const ux = pos[b] - pos[a],
				uy = pos[b + 1] - pos[a + 1],
				uz = pos[b + 2] - pos[a + 2];
			const vx = pos[c] - pos[a],
				vy = pos[c + 1] - pos[a + 1],
				vz = pos[c + 2] - pos[a + 2];
			const nx = uy * vz - uz * vy,
				ny = uz * vx - ux * vz,
				nz = ux * vy - uy * vx;
			for (const v of [a, b, c]) {
				nrm[v] += nx;
				nrm[v + 1] += ny;
				nrm[v + 2] += nz;
			}
		}
		for (let k = 0; k < pc; k += 3) {
			const l = Math.hypot(nrm[k], nrm[k + 1], nrm[k + 2]) || 1;
			nrm[k] /= l;
			nrm[k + 1] /= l;
			nrm[k + 2] /= l;
		}
		const prim = doc
			.createPrimitive()
			.setAttribute(
				'POSITION',
				doc.createAccessor().setType('VEC3').setArray(pos).setBuffer(buffer)
			)
			.setAttribute('NORMAL', doc.createAccessor().setType('VEC3').setArray(nrm).setBuffer(buffer))
			.setIndices(doc.createAccessor().setType('SCALAR').setArray(idx).setBuffer(buffer))
			.setMaterial(material(pr.color));
		mesh.addPrimitive(prim);
		total += ic / 3;
	}
	const [px, py, pz] = n.pivot;
	const node = doc.createNode(name).setMesh(mesh).setTranslation([px, pz, -py]);
	node.setExtras({ err: ERR[name] ?? 0.002, pivot: [px, pz, -py] });
	scene.addChild(node);
}
console.log('input tris', total);

await MeshoptSimplifier.ready;
await MeshoptEncoder.ready;
await doc.transform(weld());
for (const node of doc.getRoot().listNodes()) {
	const err = node.getExtras().err;
	for (const p of node.getMesh().listPrimitives())
		simplifyPrimitive(p, { simplifier: MeshoptSimplifier, ratio: 0, error: err });
}
let after = 0;
for (const m of doc.getRoot().listMeshes()) {
	let t = 0;
	for (const p of m.listPrimitives()) t += p.getIndices().getCount() / 3;
	after += t;
	console.log(m.getName().padEnd(16), t);
}
console.log('output tris', after);
for (const node of doc.getRoot().listNodes())
	node.setExtras({ pivot: node.getExtras().pivot.map((v) => +v.toFixed(3)) });

await doc.transform(dedup(), prune(), reorder({ encoder: MeshoptEncoder }));
if (COMPRESS) {
	await doc.transform(
		quantize({ quantizePosition: 14, quantizeNormal: 10 }),
		meshopt({ encoder: MeshoptEncoder, level: 'high' })
	);
}
const io = new NodeIO()
	.registerExtensions([EXTMeshoptCompression, KHRMeshQuantization])
	.registerDependencies({
		'meshopt.encoder': MeshoptEncoder
	});
await io.write(OUT, doc);
console.log('wrote', OUT, fs.statSync(OUT).size);
