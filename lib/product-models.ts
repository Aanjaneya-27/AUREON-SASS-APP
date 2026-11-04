// Exact filenames as placed in /public/models/ — do NOT rename these files.
// The space and parenthesis in the headphones filename must be percent-encoded
// so that fetch() (useModelExists HEAD probe) and useGLTF() both resolve correctly.
export const HEADPHONES_MODEL_PATH =
  "/models/over-ear-headphones%20(1).glb";
export const EARBUDS_MODEL_PATH = "/models/wireless-earbuds-with-case.glb";

export const PRODUCTS = {
  headphones: {
    id: "nova",
    name: "NOVA",
    category: "Over-ear headphones",
    href: "/headphones",
    modelPath: HEADPHONES_MODEL_PATH,
    tagline: "Silence, sculpted in titanium.",
    description:
      "Closed-back over-ear architecture with a sculpted headband, deep cushion geometry, and a cinematic presence designed for long-form listening.",
  },
  earbuds: {
    id: "pulse",
    name: "PULSE",
    category: "Wireless earbuds",
    href: "/earbuds",
    modelPath: EARBUDS_MODEL_PATH,
    tagline: "A pair. A case. A private stage.",
    description:
      "True wireless earbuds presented with their charging case — compact, precise, and built for a tactile opening ritual.",
  },
} as const;
