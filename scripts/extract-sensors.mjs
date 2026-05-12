// Extract sensor_* node world positions from a GLB and dump to JSON.
// Usage: node scripts/extract-sensors.mjs <input.glb> <output.json>
import { NodeIO } from "@gltf-transform/core";
import { KHRONOS_EXTENSIONS } from "@gltf-transform/extensions";
import fs from "node:fs/promises";

const [, , inPath, outPath] = process.argv;
if (!inPath || !outPath) {
  console.error("usage: node scripts/extract-sensors.mjs <in.glb> <out.json>");
  process.exit(1);
}

const io = new NodeIO().registerExtensions(KHRONOS_EXTENSIONS);
const doc = await io.read(inPath);

// Build a parent map so we can compose world transforms.
const parents = new Map();
for (const scene of doc.getRoot().listScenes()) {
  for (const root of scene.listChildren()) walk(root, null);
}
function walk(node, parent) {
  parents.set(node, parent);
  for (const c of node.listChildren()) walk(c, node);
}

function multiply(a, b) {
  // 4x4 row-major matrix multiply
  const out = new Array(16).fill(0);
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
      for (let k = 0; k < 4; k++)
        out[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
  return out;
}
function trsToMatrix(t, r, s) {
  // t [x,y,z]; r quat [x,y,z,w]; s [x,y,z]
  const [qx, qy, qz, qw] = r;
  const x2 = qx + qx, y2 = qy + qy, z2 = qz + qz;
  const xx = qx * x2, xy = qx * y2, xz = qx * z2;
  const yy = qy * y2, yz = qy * z2, zz = qz * z2;
  const wx = qw * x2, wy = qw * y2, wz = qw * z2;
  const [sx, sy, sz] = s;
  return [
    (1 - (yy + zz)) * sx, (xy + wz) * sx,       (xz - wy) * sx,       0,
    (xy - wz) * sy,       (1 - (xx + zz)) * sy, (yz + wx) * sy,       0,
    (xz + wy) * sz,       (yz - wx) * sz,       (1 - (xx + yy)) * sz, 0,
    t[0],                 t[1],                 t[2],                 1,
  ];
}
function worldMatrix(node) {
  const chain = [];
  let cur = node;
  while (cur) { chain.unshift(cur); cur = parents.get(cur); }
  let m = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
  for (const n of chain) {
    const local = trsToMatrix(n.getTranslation(), n.getRotation(), n.getScale());
    m = multiply(m.length === 16 ? transpose(m) : m, transpose(local));
    m = transpose(m);
  }
  return m;
}
function transpose(m) {
  const t = new Array(16);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) t[j * 4 + i] = m[i * 4 + j];
  return t;
}

const sensors = [];
for (const n of doc.getRoot().listNodes()) {
  const name = n.getName();
  if (!/^sensor_/i.test(name)) continue;
  const m = worldMatrix(n);
  // Translation = last column (column-major) → indices 12,13,14
  sensors.push({
    name,
    position: [m[12], m[13], m[14]],
  });
}

sensors.sort((a, b) => a.name.localeCompare(b.name, "en", { numeric: true }));

await fs.writeFile(outPath, JSON.stringify({ sensors }, null, 2));
console.log(`wrote ${sensors.length} sensors → ${outPath}`);
for (const s of sensors) console.log(`  ${s.name}  [${s.position.join(", ")}]`);
