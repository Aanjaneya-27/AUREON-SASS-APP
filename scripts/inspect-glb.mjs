import fs from "fs";
import path from "path";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

globalThis.self = globalThis;
globalThis.window = globalThis;
globalThis.document = {
  createElementNS: () => ({
    width: 1,
    height: 1,
    getContext: () => null,
  }),
};
globalThis.Image = class {
  set src(_v) {
    queueMicrotask(() => this.onload?.());
  }
};
globalThis.createImageBitmap = async () => ({
  width: 1,
  height: 1,
  close() {},
});

async function inspect(file) {
  const buf = fs.readFileSync(file);
  const loader = new GLTFLoader();
  const arrayBuffer = buf.buffer.slice(
    buf.byteOffset,
    buf.byteOffset + buf.byteLength,
  );
  const gltf = await new Promise((res, rej) =>
    loader.parse(arrayBuffer, "", res, rej),
  );
  const scene = gltf.scene;
  scene.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(scene);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const meshes = [];
  scene.traverse((o) => {
    if (!o.isMesh) return;
    const mb = new THREE.Box3().setFromObject(o);
    const s = new THREE.Vector3();
    mb.getSize(s);
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    const world = new THREE.Vector3();
    o.getWorldPosition(world);
    meshes.push({
      name: o.name,
      size: [+s.x.toFixed(5), +s.y.toFixed(5), +s.z.toFixed(5)],
      pos: o.position.toArray().map((n) => +n.toFixed(4)),
      world: world.toArray().map((n) => +n.toFixed(4)),
      materials: mats.map(
        (m) =>
          m && {
            name: m.name,
            type: m.type,
            color: m.color ? `#${m.color.getHexString()}` : null,
            metalness: m.metalness,
            roughness: m.roughness,
            emissive: m.emissive ? `#${m.emissive.getHexString()}` : null,
            envMapIntensity: m.envMapIntensity,
          },
      ),
    });
  });
  console.log(
    JSON.stringify(
      {
        file: path.basename(file),
        animations: gltf.animations.map((a) => ({
          name: a.name,
          dur: a.duration,
          tracks: a.tracks.map((t) => t.name),
        })),
        size: size.toArray(),
        center: center.toArray(),
        maxDim: Math.max(size.x, size.y, size.z),
        children: scene.children.map((c) => `${c.name}:${c.type}`),
        meshCount: meshes.length,
        meshes,
      },
      null,
      2,
    ),
  );
}

await inspect("public/models/over-ear-headphones (1).glb");
await inspect("public/models/wireless-earbuds-with-case.glb");
