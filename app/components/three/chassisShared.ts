import * as THREE from "three";

/**
 * Shared chassis-model logic: role classification from Onshape part names
 * (French — the motor sub-assembly is a CAD library part), role-tinted
 * materials, and scene preparation used by both the hero centerpiece and
 * the case-study assembly.
 */

export const MODEL_URL = "/models/chassis.glb";

export type Role =
  | "chassis"
  | "motor"
  | "mount"
  | "housing"
  | "axle"
  | "gear"
  | "screw"
  | "default";

export function detectRole(name: string): Role {
  const n = name.toLowerCase();
  if (n.includes("vis")) return "screw";
  // "axe" before "engrenage": the axle part is named "Axe engrenage".
  if (n.includes("axe")) return "axle";
  if (n.includes("engrenage")) return "gear";
  if (n.includes("enveloppe")) return "housing";
  if (n.includes("maintien")) return "mount";
  if (n.includes("moteur")) return "motor";
  if (n.includes("part 1") || n.includes("part 2") || n.includes("part1") || n.includes("part2"))
    return "chassis";
  return "default";
}

export const ROLE_MATERIAL: Record<
  Role,
  {
    color: string;
    metalness: number;
    roughness: number;
    emissive?: string;
    emissiveIntensity?: number;
  }
> = {
  chassis: { color: "#2D2A24", metalness: 0.45, roughness: 0.50 },
  motor: { color: "#1A1814", metalness: 0.45, roughness: 0.50 },
  mount: { color: "#5C4F3D", metalness: 0.40, roughness: 0.55 },
  housing: { color: "#5C4F3D", metalness: 0.40, roughness: 0.55 },
  axle: { color: "#A89A8C", metalness: 0.90, roughness: 0.20 },
  gear: { color: "#C8D958", metalness: 0.65, roughness: 0.32, emissive: "#C8D958", emissiveIntensity: 0.18 },
  screw: { color: "#B8B093", metalness: 0.78, roughness: 0.28 },
  default: { color: "#2D2A24", metalness: 0.40, roughness: 0.55 },
};

/** Assembly order: plates first, fasteners last. */
export const ROLE_DELAY: Record<Role, number> = {
  chassis: 0.00,
  motor: 0.18,
  mount: 0.28,
  housing: 0.34,
  axle: 0.42,
  gear: 0.56,
  screw: 0.74,
  default: 0.40,
};

export const ROLE_SPIN: Partial<Record<Role, number>> = {
  gear: 1.4,
  axle: 0.7,
};

export const ROLE_EXPLODE_BIAS: Record<Role, number> = {
  chassis: 1.4,
  motor: 1.2,
  mount: 1.4,
  housing: 1.6,
  axle: 1.5,
  gear: 1.7,
  screw: 2.5,
  default: 1.5,
};

export function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Deterministic pseudo-random in [0, 1) from an integer seed — stable across renders. */
export function hash01(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export type AnimatedNode = {
  node: THREE.Object3D;
  initialPos: THREE.Vector3;
  initialQuat: THREE.Quaternion;
  initialScale: THREE.Vector3;
  explodeOffset: THREE.Vector3;
  role: Role;
  delay: number;
  spinSpeed: number;
  spinAxis: THREE.Vector3;
  breatheSeed: number;
};

export type PreparedChassis = {
  root: THREE.Group;
  animatedNodes: AnimatedNode[];
};

/**
 * Clone the glTF scene, assign role materials, normalize scale so the
 * bounding-box diagonal ≈ `targetDiagonal`, and build the per-part animation
 * list. Every part of a corner drive unit ("Motor <n>" subtree) explodes
 * along that cluster's horizontal outward axis so assembly reads
 * mechanically; chassis plates split vertically.
 */
export function prepareChassis(
  scene: THREE.Object3D,
  targetDiagonal = 2.6
): PreparedChassis {
  const cloned = scene.clone(true);

  // Per-role shared materials
  const materialCache: Partial<Record<Role, THREE.MeshStandardMaterial>> = {};
  const getMat = (role: Role) => {
    if (!materialCache[role]) {
      const cfg = ROLE_MATERIAL[role];
      materialCache[role] = new THREE.MeshStandardMaterial({
        color: cfg.color,
        metalness: cfg.metalness,
        roughness: cfg.roughness,
        emissive: cfg.emissive ?? "#000000",
        emissiveIntensity: cfg.emissiveIntensity ?? 0,
      });
    }
    return materialCache[role]!;
  };

  // Role from ancestor name chain; tint meshes.
  const nodeRole = new Map<THREE.Object3D, Role>();
  const findRole = (n: THREE.Object3D): Role => {
    let cursor: THREE.Object3D | null = n;
    while (cursor) {
      if (cursor.name) {
        const r = detectRole(cursor.name);
        if (r !== "default") return r;
      }
      cursor = cursor.parent;
    }
    return "default";
  };

  cloned.traverse((node) => {
    const role = findRole(node);
    nodeRole.set(node, role);
    if ((node as THREE.Mesh).isMesh) {
      const mesh = node as THREE.Mesh;
      mesh.material = getMat(role);
      mesh.frustumCulled = true;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
    }
  });

  // Normalize scale + recenter.
  cloned.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(cloned);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const diag = size.length() || 1;
  const globalScale = targetDiagonal / diag;

  const root = new THREE.Group();
  cloned.position.sub(center);
  cloned.scale.setScalar(globalScale);
  cloned.position.multiplyScalar(globalScale);
  root.add(cloned);
  root.updateMatrixWorld(true);

  // Corner drive-unit axes.
  const clusterDir = new Map<THREE.Object3D, THREE.Vector3>();
  cloned.traverse((node) => {
    if (!/^motor\b/i.test(node.name ?? "")) return;
    const c = new THREE.Box3().setFromObject(node).getCenter(new THREE.Vector3());
    const dir = new THREE.Vector3(c.x, 0, c.z);
    if (dir.lengthSq() < 1e-8) dir.set(1, 0, 0);
    clusterDir.set(node, dir.normalize());
  });
  const findCluster = (n: THREE.Object3D): THREE.Vector3 | null => {
    let cursor: THREE.Object3D | null = n;
    while (cursor) {
      const dir = clusterDir.get(cursor);
      if (dir) return dir;
      cursor = cursor.parent;
    }
    return null;
  };

  // Animation targets — occurrence nodes carry the baked transforms.
  const animatedNodes: AnimatedNode[] = [];
  cloned.traverse((node) => {
    const isOccurrence = node.name?.toLowerCase().includes("occurrence") ?? false;
    const hasOffset = node.position.lengthSq() > 1e-12;
    if (!isOccurrence && !hasOffset) return;
    if (node === cloned) return;

    const role = nodeRole.get(node) ?? findRole(node);

    const worldPos = new THREE.Vector3();
    node.getWorldPosition(worldPos);
    const distFromCenter = worldPos.length();

    const cluster = findCluster(node);
    const dir = new THREE.Vector3();
    if (role === "chassis") {
      dir.set(0, worldPos.y >= 0 ? 1 : -1, 0);
    } else if (cluster) {
      dir.copy(cluster);
    } else if (distFromCenter > 1e-6) {
      dir.copy(worldPos).divideScalar(distFromCenter);
    } else {
      dir.set(0, 1, 0);
    }

    const explodeMag =
      ROLE_EXPLODE_BIAS[role] *
      (0.8 + Math.min(distFromCenter / targetDiagonal, 1) * 0.7);

    // World offset → parent-local (node.position lives in the parent frame).
    const worldOffset = dir.multiplyScalar(explodeMag);
    const parentInv = new THREE.Matrix4();
    if (node.parent) parentInv.copy(node.parent.matrixWorld).invert();
    const rot = new THREE.Matrix3().setFromMatrix4(parentInv);
    const localOffset = worldOffset.clone().applyMatrix3(rot);

    const spinSpeed = ROLE_SPIN[role] ?? 0;
    const spinAxisLocal = (cluster ?? new THREE.Vector3(0, 1, 0))
      .clone()
      .applyMatrix3(rot)
      .normalize();

    animatedNodes.push({
      node,
      initialPos: node.position.clone(),
      initialQuat: node.quaternion.clone(),
      initialScale: node.scale.clone(),
      explodeOffset: localOffset,
      role,
      delay: ROLE_DELAY[role] + Math.min(distFromCenter / targetDiagonal, 1) * 0.15,
      spinSpeed: spinSpeed * (hash01(animatedNodes.length) > 0.5 ? 1 : -1),
      spinAxis: spinAxisLocal,
      breatheSeed: hash01(animatedNodes.length + 57) * Math.PI * 2,
    });
  });

  return { root, animatedNodes };
}
