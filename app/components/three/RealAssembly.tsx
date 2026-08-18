"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
type AssemblyPhase = "assembling" | "assembled" | "disassembling" | "idle";

const MODEL_URL = "/models/chassis.gltf";
useGLTF.preload(MODEL_URL);

const ASSEMBLE_DURATION = 5.0;
const HOLD_DURATION = 3.5;
const DISASSEMBLE_DURATION = 2.5;
const PAUSE_DURATION = 1.0;
const TOTAL_CYCLE =
  ASSEMBLE_DURATION + HOLD_DURATION + DISASSEMBLE_DURATION + PAUSE_DURATION;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function assemblyProgress(t: number): {
  progress: number;
  phase: AssemblyPhase;
  cycleElapsed: number;
} {
  const cycleT = t % TOTAL_CYCLE;
  if (cycleT < ASSEMBLE_DURATION) {
    return {
      progress: easeInOutCubic(cycleT / ASSEMBLE_DURATION),
      phase: "assembling",
      cycleElapsed: cycleT,
    };
  }
  if (cycleT < ASSEMBLE_DURATION + HOLD_DURATION) {
    return { progress: 1, phase: "assembled", cycleElapsed: cycleT };
  }
  if (cycleT < ASSEMBLE_DURATION + HOLD_DURATION + DISASSEMBLE_DURATION) {
    const u =
      (cycleT - ASSEMBLE_DURATION - HOLD_DURATION) / DISASSEMBLE_DURATION;
    return {
      progress: 1 - easeInOutCubic(u),
      phase: "disassembling",
      cycleElapsed: cycleT,
    };
  }
  return { progress: 0, phase: "idle", cycleElapsed: cycleT };
}

type Role =
  | "chassis"
  | "motor"
  | "mount"
  | "housing"
  | "axle"
  | "gear"
  | "screw"
  | "default";

function detectRole(name: string): Role {
  const n = name.toLowerCase();
  if (n.includes("vis")) return "screw";
  if (n.includes("engrenage")) return "gear";
  if (n.includes("axe")) return "axle";
  if (n.includes("enveloppe")) return "housing";
  if (n.includes("maintien")) return "mount";
  if (n.includes("moteur")) return "motor";
  if (n.includes("part 1") || n.includes("part 2") || n.includes("part1") || n.includes("part2"))
    return "chassis";
  return "default";
}

const ROLE_MATERIAL: Record<
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

const ROLE_DELAY: Record<Role, number> = {
  chassis: 0.00,
  motor: 0.18,
  mount: 0.28,
  housing: 0.34,
  axle: 0.46,
  gear: 0.56,
  screw: 0.74,
  default: 0.40,
};

const ROLE_SPIN: Partial<Record<Role, number>> = {
  gear: 1.4,
  axle: 0.7,
};

const ROLE_EXPLODE_BIAS: Record<Role, number> = {
  chassis: 1.4,
  motor: 1.2,
  mount: 1.4,
  housing: 1.6,
  axle: 1.5,
  gear: 1.7,
  screw: 2.5,
  default: 1.5,
};

type AnimatedNode = {
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

const TARGET_DIAGONAL = 2.6;

/** Deterministic pseudo-random in [0, 1) from an integer seed — stable across renders. */
function hash01(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

type Props = {
  assembleCycle?: boolean;
  /**
   * When true, skips per-part animation entirely. Parts render in the
   * fully-assembled state, no useFrame overhead. Used by the hero canvas
   * to avoid two animated R3F loops on the same page.
   */
  static?: boolean;
};

export default function RealAssembly({
  assembleCycle = true,
  static: isStatic = false,
}: Props) {
  const { scene } = useGLTF(MODEL_URL);

  // Clone once + prepare materials, scaling, and animation list
  const { root, animatedNodes } = useMemo(() => {
    const cloned = scene.clone(true);

    // Build per-role shared materials
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

    // First pass — figure out each node's role from ancestor name chain,
    // assign role-tinted materials to meshes
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

    // Compute global bbox + scale model so its diagonal ≈ TARGET_DIAGONAL units
    cloned.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const diag = size.length() || 1;
    const globalScale = TARGET_DIAGONAL / diag;

    // Wrap so we can scale + recenter without mutating gltf scene's root transform
    const root = new THREE.Group();
    cloned.position.sub(center);
    cloned.scale.setScalar(globalScale);
    cloned.position.multiplyScalar(globalScale);
    root.add(cloned);

    // Re-update world matrices after scaling
    root.updateMatrixWorld(true);

    // Animation targets — every "occurrence" node carries a baked transform.
    // Find them by name (Onshape convention) AND by having a non-zero initial position.
    const animatedNodes: AnimatedNode[] = [];
    cloned.traverse((node) => {
      const isOccurrence =
        node.name?.toLowerCase().includes("occurrence") ?? false;
      const hasOffset = node.position.lengthSq() > 1e-12;
      if (!isOccurrence && !hasOffset) return;
      if (node === cloned) return;

      const role = nodeRole.get(node) ?? findRole(node);

      // Each animated node's WORLD position (after global scale + recenter)
      const worldPos = new THREE.Vector3();
      node.getWorldPosition(worldPos);

      // Explode direction = outward from world origin (which is now the bbox center)
      const dir = worldPos.clone();
      const distFromCenter = dir.length();
      if (distFromCenter > 1e-6) {
        dir.divideScalar(distFromCenter);
      } else {
        // dead center — pick a small upward bias
        dir.set(0, 1, 0);
      }
      // Bias chassis plates to explode vertically
      if (role === "chassis") {
        dir.set(0, worldPos.y >= 0 ? 1 : -1, 0);
      }

      const explodeMag =
        ROLE_EXPLODE_BIAS[role] *
        (0.8 + Math.min(distFromCenter / TARGET_DIAGONAL, 1) * 0.7);

      // Offset in WORLD coords; convert to node's PARENT-local coords for animating
      // node.position correctly (since node.position is in parent frame).
      const worldOffset = dir.multiplyScalar(explodeMag);
      const parentInv = new THREE.Matrix4();
      if (node.parent) {
        parentInv.copy(node.parent.matrixWorld).invert();
      }
      // Apply only the rotation/scale part of parent inverse to a direction vector
      const localOffset = worldOffset.clone();
      const r = new THREE.Matrix3().setFromMatrix4(parentInv);
      localOffset.applyMatrix3(r);

      // Spin axis preference: gears spin around their LOCAL Y unless geometry suggests otherwise
      const spinSpeed = ROLE_SPIN[role] ?? 0;
      // Use the direction in local space as a proxy: gears typically mount on an axle pointing
      // outward — spin around the axis that's most aligned with the world's "up" (Y) in local frame
      const spinAxisLocal = new THREE.Vector3(0, 1, 0).applyMatrix3(r).normalize();

      animatedNodes.push({
        node,
        initialPos: node.position.clone(),
        initialQuat: node.quaternion.clone(),
        initialScale: node.scale.clone(),
        explodeOffset: localOffset,
        role,
        delay: ROLE_DELAY[role] + Math.min(distFromCenter / TARGET_DIAGONAL, 1) * 0.15,
        spinSpeed: spinSpeed * (hash01(animatedNodes.length) > 0.5 ? 1 : -1),
        spinAxis: spinAxisLocal,
        breatheSeed: hash01(animatedNodes.length + 57) * Math.PI * 2,
      });
    });

    return { root, animatedNodes };
  }, [scene]);

  const tmpQuat = useMemo(() => new THREE.Quaternion(), []);
  const tmpAxisQuat = useMemo(() => new THREE.Quaternion(), []);
  const initialized = useRef(false);

  // STATIC mode: set every node to its assembled state once, never run useFrame
  useEffect(() => {
    if (!isStatic || initialized.current) return;
    for (let i = 0; i < animatedNodes.length; i++) {
      const a = animatedNodes[i];
      a.node.position.copy(a.initialPos);
      a.node.quaternion.copy(a.initialQuat);
      a.node.scale.copy(a.initialScale);
    }
    initialized.current = true;
  }, [animatedNodes, isStatic]);

  useFrame((state, delta) => {
    if (isStatic) return; // perf: skip frame loop entirely in static mode

    const t = state.clock.elapsedTime;
    const cycle = assembleCycle
      ? assemblyProgress(t)
      : { progress: 1, phase: "assembled" as AssemblyPhase, cycleElapsed: 0 };

    const progress = cycle.progress;

    for (let i = 0; i < animatedNodes.length; i++) {
      const a = animatedNodes[i];
      const adjusted = progress * (1 + a.delay * 0.4) - a.delay * 0.4;
      const partProgress = adjusted < 0 ? 0 : adjusted > 1 ? 1 : adjusted;
      const eased = assembleCycle ? easeInOutCubic(partProgress) : 1;
      const partInv = 1 - eased;

      a.node.position.x = a.initialPos.x + a.explodeOffset.x * partInv;
      a.node.position.y = a.initialPos.y + a.explodeOffset.y * partInv;
      a.node.position.z = a.initialPos.z + a.explodeOffset.z * partInv;

      if (eased > 0.95) {
        a.node.position.y += Math.sin(t * 0.9 + a.breatheSeed) * 0.004;
      }

      if (a.spinSpeed !== 0 && eased > 0.6) {
        const angle = t * a.spinSpeed * (eased - 0.6) * 2.5;
        tmpAxisQuat.setFromAxisAngle(a.spinAxis, angle);
        tmpQuat.copy(a.initialQuat).multiply(tmpAxisQuat);
        a.node.quaternion.copy(tmpQuat);
      } else {
        a.node.quaternion.copy(a.initialQuat);
      }
    }

    root.position.y = Math.sin(t * 0.6) * 0.018 * progress;
  });

  return <primitive object={root} />;
}
