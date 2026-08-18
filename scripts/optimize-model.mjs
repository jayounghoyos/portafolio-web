/**
 * Chassis model optimization pipeline.
 *
 * Onshape exports the assembly as a single .gltf with an embedded base64
 * buffer (~26 MB): 123 nodes, 16 unique meshes carrying 1,868 primitives
 * (≈6,400 instanced draw calls, ≈2M instanced triangles).
 *
 * The site discards the file's materials at runtime (parts are re-tinted by
 * role, keyed off node names), so primitives can be merged freely — but the
 * named occurrence NODES must survive untouched: role detection and the
 * per-part assembly animation both key off them.
 *
 * Pipeline: weld → join primitives per mesh (1 draw call per occurrence)
 * → simplify (CAD over-tessellation) → prune → quantize → meshopt compress
 * → binary .glb.
 *
 * Usage: pnpm optimize:model  (re-run whenever a new Onshape export lands)
 */
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import {
  dedup,
  joinPrimitives,
  meshopt,
  prune,
  quantize,
  simplify,
  weld,
} from "@gltf-transform/functions";
import { MeshoptEncoder, MeshoptSimplifier } from "meshoptimizer";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INPUT = path.join(root, "assets/chassis-source.gltf");
const OUTPUT = path.join(root, "public/models/chassis.glb");

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
  "meshopt.encoder": MeshoptEncoder,
});

await MeshoptEncoder.ready;
await MeshoptSimplifier.ready;

const document = await io.read(INPUT);
const logStats = (label) => {
  let prims = 0;
  let tris = 0;
  for (const mesh of document.getRoot().listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      prims += 1;
      const indices = prim.getIndices();
      tris += (indices ? indices.getCount() : prim.getAttribute("POSITION").getCount()) / 3;
    }
  }
  console.log(`${label}: ${prims} primitives, ${Math.round(tris).toLocaleString()} unique triangles`);
};

logStats("input");

// 1. Weld duplicate vertices (required for effective joining/simplification).
await document.transform(weld());

// 2. Merge all primitives within each mesh into one. Materials differ per
//    primitive but are replaced at runtime, so unify them first.
const scrap = [];
for (const mesh of document.getRoot().listMeshes()) {
  const prims = mesh.listPrimitives();
  if (prims.length <= 1) continue;
  const material = prims[0].getMaterial();
  for (const prim of prims) prim.setMaterial(material);
  const joined = joinPrimitives(prims);
  for (const prim of prims) {
    mesh.removePrimitive(prim);
    scrap.push(prim);
  }
  mesh.addPrimitive(joined);
}
for (const prim of scrap) prim.dispose();

logStats("after join");

// 3. Simplify — CAD tessellation is far denser than the web needs.
await document.transform(
  simplify({ simplifier: MeshoptSimplifier, ratio: 0.25, error: 0.001 })
);

logStats("after simplify");

// 4. Cleanup, quantize, compress.
await document.transform(dedup(), prune(), quantize(), meshopt({ encoder: MeshoptEncoder }));

await io.write(OUTPUT, document);

const inSize = fs.statSync(INPUT).size;
const outSize = fs.statSync(OUTPUT).size;
console.log(
  `written ${path.relative(root, OUTPUT)}: ${(outSize / 1e6).toFixed(2)} MB (from ${(inSize / 1e6).toFixed(1)} MB, ×${(inSize / outSize).toFixed(1)} smaller)`
);
console.log(`nodes: ${document.getRoot().listNodes().length}`);
