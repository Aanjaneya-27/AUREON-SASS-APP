export type HeadphoneColor = {
  id: string;
  name: string;
  hex: string;
  description: string;
};

export const NOVA_COLORS: readonly HeadphoneColor[] = [
  {
    id: "midnight-black",
    name: "Midnight Black",
    hex: "#17191D",
    description: "Deep obsidian matte finish with subtle slate undertones.",
  },
  {
    id: "crimson-red",
    name: "Crimson Red",
    hex: "#A51F32",
    description: "Anodized deep crimson lacquer with metallic luster.",
  },
  {
    id: "mocha-brown",
    name: "Mocha Brown",
    hex: "#684536",
    description: "Warm espresso hue with hand-buffed organic tones.",
  },
  {
    id: "arctic-green",
    name: "Arctic Green",
    hex: "#A9C7A5",
    description: "Subtle sage mineral tint inspired by Nordic glaciers.",
  },
  {
    id: "blush-pink",
    name: "Blush Pink",
    hex: "#E8A9B8",
    description: "Powder rose tone with soft-touch acoustic matte finish.",
  },
] as const;

// Alias for backwards compatibility
export const HEADPHONE_COLORS = NOVA_COLORS;

