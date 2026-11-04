import { useSyncExternalStore } from "react";

export type PulseColor = {
  id: string;
  name: string;
  hex: string;
  description: string;
};

export const PULSE_COLORS: readonly PulseColor[] = [
  {
    id: "lavender-purple",
    name: "Lavender Purple",
    hex: "#B6A0D8",
    description: "Serene botanical lilac with a soft matte luster.",
  },
  {
    id: "pearl-white",
    name: "Pearl White",
    hex: "#EAE8E1",
    description: "Luminous mineral ivory with warm porcelain sheen.",
  },
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    hex: "#315E8C",
    description: "Deep maritime cobalt evoking oceanic calm.",
  },
  {
    id: "titanium-silver",
    name: "Titanium Silver",
    hex: "#AEB5BE",
    description: "Refined metallic platinum with satin aerospace anodization.",
  },
  {
    id: "sunset-orange",
    name: "Sunset Orange",
    hex: "#E77B42",
    description: "Vibrant golden-hour amber with radiant warmth.",
  },
] as const;

let currentColor: PulseColor = PULSE_COLORS[0];
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export function setPulseColor(colorOrId: string | PulseColor) {
  const match =
    typeof colorOrId === "string"
      ? PULSE_COLORS.find((c) => c.id === colorOrId)
      : colorOrId;

  if (match && match.id !== currentColor.id) {
    currentColor = match;
    emitChange();
  }
}

export function usePulseColor(): PulseColor {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    () => currentColor,
    () => PULSE_COLORS[0],
  );
}
