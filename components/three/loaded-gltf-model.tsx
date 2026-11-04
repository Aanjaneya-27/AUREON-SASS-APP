"use client";

import { useAnimations, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Box3,
  Color,
  Group,
  LoopOnce,
  Mesh,
  Vector3,
  type AnimationAction,
  type Material,
  type MeshStandardMaterial,
  type Object3D,
} from "three";
import { SkeletonUtils } from "three-stdlib";
import { getGsap } from "@/lib/gsap-client";

export type ModelCapabilities = {
  clipNames: string[];
  lidNames: string[];
  canToggleCase: boolean;
  /** Names of the materials that receive the selected shell color. */
  colorMaterialNames?: string[];
};

export type GltfProductHandle = {
  toggleCase: () => boolean;
  isCaseOpen: () => boolean;
};

type LoadedGltfModelProps = {
  url: string;
  targetSize?: number;
  /** Hex color applied to the outer shell / earbud & case materials. */
  shellColor?: string;
  /**
   * Exact material names to tint. When provided, this overrides the
   * automatic name-based classification.
   */
  shellMaterialNames?: string[];
  /** Logs every material and whether it was tinted (use once to verify classification). */
  debugMaterials?: boolean;
  onCapabilities?: (caps: ModelCapabilities) => void;
};

const LID_NAME = /(^|_|-| )(lid|cover|cap|hinge)(s)?($|_|-| )/i;
const OPEN_CLIP = /(open|lid|case|cover)/i;

/** Whole-word matcher so "led" does not match "scaled", "port" not "support", etc. */
const tok = (words: string) => `(?:^|[^a-z])(?:${words})(?:$|[^a-z])`;

/** Materials/meshes that must NEVER be recolored. Checked first. */
const KEEP_ORIGINAL = new RegExp(
  `metal|chrome|steel|alumin|gold|silver|brass|titanium|screw|bolt|rivet|` +
  `leather|fabric|cloth|rubber|silicon|glass|lens|emissive|stitch|seam|interior|charcoal|` +
  `${tok(
    "hinge|slider|cushion|pad|foam|mesh|grill|cable|wire|logo|text|label|led|light|button|port|jack|mic|sensor|inner|speaker|driver|tip|tips|eartip|eartips",
  )}`,
  "i",
);

/** Materials/meshes that make up the painted outer shell / earcups / case exterior. */
const SHELL_MATCH =
  /(shell|earcup|ear_cup|ear-cup|cup|housing|body|paint|plastic|outer|exterior|casing|enclosure|matte|colou?r|headband|polycarbonate)/i;

function isStandardMaterial(m: Material): m is MeshStandardMaterial {
  return Boolean((m as MeshStandardMaterial).isMeshStandardMaterial);
}

function findCaseClip(names: string[]) {
  return names.find((name) => OPEN_CLIP.test(name));
}

function collectLids(root: Object3D) {
  const lids: Object3D[] = [];
  root.traverse((child) => {
    if (LID_NAME.test(child.name)) lids.push(child);
  });
  return lids;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export const LoadedGltfModel = forwardRef<
  GltfProductHandle,
  LoadedGltfModelProps
>(function LoadedGltfModel(
  {
    url,
    targetSize = 1.72,
    shellColor = "#17191D",
    shellMaterialNames,
    debugMaterials = false,
    onCapabilities,
  },
  forwardedRef,
) {
  const root = useRef<Group>(null);
  const invalidate = useThree((state) => state.invalidate);
  const gltf = useGLTF(url);
  const cloned = useMemo(
    () => SkeletonUtils.clone(gltf.scene) as Group,
    [gltf.scene],
  );
  const { actions, names } = useAnimations(gltf.animations, root);
  const [open, setOpen] = useState(false);
  const lidsRef = useRef<Object3D[]>([]);
  const lidBaseRef = useRef<Map<string, number>>(new Map());

  // Color system refs (no React state => no re-renders / no reloads).
  const tintMaterialsRef = useRef<MeshStandardMaterial[]>([]);
  const tintNamesRef = useRef<string[]>([]);
  const currentColorRef = useRef(new Color(shellColor));
  const shellColorRef = useRef(shellColor);
  shellColorRef.current = shellColor;
  const debugRef = useRef(debugMaterials);
  debugRef.current = debugMaterials;
  // Read through a ref so a new array identity never triggers a re-clone.
  const shellNamesRef = useRef(shellMaterialNames);
  shellNamesRef.current = shellMaterialNames;

  /**
   * Scene setup: clone materials per mesh (the GLTF cache keeps originals
   * untouched), classify which ones are shell/casing materials, then fit the model.
   * Both earbuds and charging case share the outer matte polycarbonate material
   * so they recolor in perfect visual harmony.
   */
  useLayoutEffect(() => {
    cloned.scale.setScalar(1);
    cloned.position.set(0, 0, 0);
    cloned.updateWorldMatrix(true, true);

    const restores: Array<[Mesh, Material | Material[]]> = [];
    const cloneMap = new Map<Material, Material>(); // original -> clone
    const meshNames = new Map<Material, Set<string>>(); // clone -> mesh names
    const volume = new Map<Material, number>(); // clone -> bbox volume
    const meshBox = new Box3();
    const meshSize = new Vector3();

    cloned.traverse((child) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const original = mesh.material;
      restores.push([mesh, original]);

      meshBox.setFromObject(mesh);
      meshBox.getSize(meshSize);
      const meshVolume = meshSize.x * meshSize.y * meshSize.z;

      const list = Array.isArray(original) ? original : [original];
      const next = list.map((material) => {
        if (!material) return material;

        let copy = cloneMap.get(material);
        if (!copy) {
          copy = material.clone();
          cloneMap.set(material, copy);
        }
        if (!meshNames.has(copy)) meshNames.set(copy, new Set());
        meshNames.get(copy)!.add(mesh.name);
        volume.set(copy, (volume.get(copy) ?? 0) + meshVolume);

        if ("envMapIntensity" in copy) {
          (copy as MeshStandardMaterial).envMapIntensity = 1.7;
        }
        copy.needsUpdate = true;
        return copy;
      });
      mesh.material = Array.isArray(original) ? next : next[0];
    });

    // --- Classify shell materials -------------------------------------
    const clones = Array.from(cloneMap.values()).filter(isStandardMaterial);
    const label = (m: MeshStandardMaterial) =>
      m.name || Array.from(meshNames.get(m) ?? []).join(" ");

    const explicitNames = shellNamesRef.current;
    let tinted: MeshStandardMaterial[] = [];

    if (explicitNames?.length) {
      tinted = clones.filter((m) => explicitNames.includes(m.name));
    } else {
      tinted = clones.filter((m) => {
        const text = label(m);
        return !KEEP_ORIGINAL.test(text) && SHELL_MATCH.test(text);
      });

      // Fallback: no named shell material -> largest non-metallic, non-excluded one.
      if (!tinted.length) {
        const candidates = clones
          .filter((m) => !KEEP_ORIGINAL.test(label(m)) && m.metalness < 0.5)
          .sort((a, b) => (volume.get(b) ?? 0) - (volume.get(a) ?? 0));
        if (candidates[0]) tinted = [candidates[0]];
      }
    }

    tintMaterialsRef.current = tinted;
    tintNamesRef.current = tinted.map((m) => m.name || "(unnamed)");

    // Apply the current color immediately (no tween on setup).
    currentColorRef.current.set(shellColorRef.current);
    for (const material of tinted) material.color.copy(currentColorRef.current);
    invalidate();

    if (debugRef.current) {
      console.info(
        "[LoadedGltfModel] materials",
        clones.map((m) => ({
          name: m.name || "(unnamed)",
          meshes: Array.from(meshNames.get(m) ?? []),
          metalness: m.metalness,
          roughness: m.roughness,
          hasMap: Boolean(m.map),
          tinted: tinted.includes(m),
        })),
      );
    }

    // --- Fit model (unchanged behavior) -------------------------------
    const box = meshBounds(cloned);
    const size = new Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    cloned.scale.setScalar(targetSize / maxDim);
    cloned.updateWorldMatrix(true, true);

    const fitted = meshBounds(cloned);
    const center = new Vector3();
    fitted.getCenter(center);
    cloned.position.sub(center);
    cloned.updateWorldMatrix(true, true);

    return () => {
      tintMaterialsRef.current = [];
      tintNamesRef.current = [];
      for (const [mesh, original] of restores) mesh.material = original;
      cloneMap.forEach((copy) => copy.dispose());
    };
  }, [cloned, targetSize, invalidate]);

  /** Color changes: tween only the tinted material colors. No reload, no re-clone. */
  useEffect(() => {
    const target = new Color(shellColor);
    const current = currentColorRef.current;
    if (current.equals(target)) return;

    const from = current.clone();
    const apply = () => {
      for (const material of tintMaterialsRef.current) {
        material.color.copy(currentColorRef.current);
      }
      invalidate();
    };

    if (prefersReducedMotion()) {
      currentColorRef.current.copy(target);
      apply();
      return;
    }

    const { gsap } = getGsap();
    const progress = { t: 0 };
    const tween = gsap.to(progress, {
      t: 1,
      duration: 0.5,
      ease: "power2.out",
      overwrite: true,
      onUpdate: () => {
        currentColorRef.current.copy(from).lerp(target, progress.t);
        apply();
      },
      onComplete: () => {
        currentColorRef.current.copy(target);
        apply();
      },
    });

    return () => {
      tween.kill();
    };
  }, [shellColor, invalidate]);

  useEffect(() => {
    const lids = collectLids(cloned);
    lidsRef.current = lids;
    const bases = new Map<string, number>();
    lids.forEach((lid, index) => {
      bases.set(lid.uuid ?? String(index), lid.rotation.x);
    });
    lidBaseRef.current = bases;

    onCapabilities?.({
      clipNames: names,
      lidNames: lids.map((lid) => lid.name),
      canToggleCase: Boolean(findCaseClip(names) || lids.length),
      colorMaterialNames: tintNamesRef.current,
    });
  }, [cloned, names, onCapabilities]);

  useImperativeHandle(
    forwardedRef,
    () => ({
      isCaseOpen: () => open,
      toggleCase: () => {
        const clipName = findCaseClip(names);
        const action = clipName ? actions[clipName] : null;
        const next = !open;

        if (action) {
          playCaseAction(action, next);
          setOpen(next);
          return true;
        }

        if (lidsRef.current.length) {
          animateLids(lidsRef.current, lidBaseRef.current, next);
          setOpen(next);
          return true;
        }

        return false;
      },
    }),
    [actions, names, open],
  );

  useEffect(() => {
    return () => {
      names.forEach((name) => {
        actions[name]?.fadeOut(0.1);
        actions[name]?.stop();
      });
    };
  }, [actions, names]);

  return (
    <group ref={root} dispose={null}>
      <primitive object={cloned} />
    </group>
  );
});

function meshBounds(root: Object3D) {
  const box = new Box3();
  root.traverse((child) => {
    const mesh = child as Mesh;
    if (!mesh.isMesh || !mesh.visible) return;
    box.expandByObject(mesh);
  });
  return box;
}

function playCaseAction(action: AnimationAction, shouldOpen: boolean) {
  action.setLoop(LoopOnce, 1);
  action.clampWhenFinished = true;
  action.paused = false;
  if (shouldOpen) {
    action.timeScale = 1;
    action.reset().fadeIn(0.15).play();
    return;
  }
  action.timeScale = -1;
  action.paused = false;
  if (action.time <= 0) action.time = action.getClip().duration;
  action.play();
}

function animateLids(
  lids: Object3D[],
  bases: Map<string, number>,
  shouldOpen: boolean,
) {
  const { gsap } = getGsap();
  lids.forEach((lid, index) => {
    const base = bases.get(lid.uuid ?? String(index)) ?? 0;
    gsap.to(lid.rotation, {
      x: shouldOpen ? base - 1.45 : base,
      duration: 1.15,
      ease: "power3.inOut",
      overwrite: true,
    });
  });
}
