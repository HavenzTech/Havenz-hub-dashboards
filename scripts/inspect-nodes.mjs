// Dump every node name in a GLB plus its translation and mesh-attached status.
// Usage: node scripts/inspect-nodes.mjs <path-to-glb>
import { NodeIO } from "@gltf-transform/core";
import { KHRONOS_EXTENSIONS } from "@gltf-transform/extensions";

const path = process.argv[2];
if (!path) {
  console.error("usage: node scripts/inspect-nodes.mjs <file.glb>");
  process.exit(1);
}

const io = new NodeIO().registerExtensions(KHRONOS_EXTENSIONS);
const doc = await io.read(path);

const nodes = doc.getRoot().listNodes();
console.log(`total nodes: ${nodes.length}`);

const sensors = [];
const named = [];
for (const n of nodes) {
  const name = n.getName();
  const hasMesh = !!n.getMesh();
  const t = n.getTranslation();
  if (/^sensor_/i.test(name)) {
    sensors.push({ name, translation: t, hasMesh });
  }
  if (name && !hasMesh) {
    named.push({ name, translation: t });
  }
}

console.log(`\nsensor_* nodes: ${sensors.length}`);
for (const s of sensors) console.log(`  ${s.name}  t=[${s.translation.join(", ")}]  mesh=${s.hasMesh}`);

console.log(`\nfirst 40 named empty (no-mesh) nodes:`);
for (const n of named.slice(0, 40)) {
  console.log(`  ${n.name}  t=[${n.translation.join(", ")}]`);
}
