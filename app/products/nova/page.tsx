"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { NovaProductViewerLazy } from "@/components/three/load-experiences";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/cn";
import { NOVA_COLORS, type HeadphoneColor } from "@/lib/nova-colors";
import { PRODUCTS } from "@/lib/product-models";

type SpecTab = "acoustics" | "connectivity" | "power" | "craft" | "in_box";

export default function NovaProductPage() {
  const [selectedColor, setSelectedColor] = useState<HeadphoneColor>(
    NOVA_COLORS[0],
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<SpecTab>("acoustics");
  const [addedNotice, setAddedNotice] = useState(false);

  const { addItem, openCart } = useCart();
  const product = PRODUCTS.headphones;

  const handleAddToCart = useCallback(() => {
    addItem(
      {
        id: `nova-${selectedColor.id}`,
        name: `NOVA (${selectedColor.name})`,
        category: product.category,
        price: "$1,250",
      },
      quantity,
    );
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  }, [addItem, product.category, quantity, selectedColor]);

  const handleBuyNow = useCallback(() => {
    addItem(
      {
        id: `nova-${selectedColor.id}`,
        name: `NOVA (${selectedColor.name})`,
        category: product.category,
        price: "$1,250",
      },
      quantity,
    );
    openCart();
  }, [addItem, openCart, product.category, quantity, selectedColor]);

  return (
    <div className="min-h-screen bg-obsidian text-titanium selection:bg-lime/80 selection:text-obsidian">
      {/* Top Breadcrumb & Status */}
      <div className="border-b border-white/6 pt-24 pb-4 md:pt-28">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.28em] text-titanium/60"
          >
            <Link href="/" className="hover:text-lime transition-colors">
              Atelier
            </Link>
            <span>/</span>
            <Link
              href="/headphones"
              className="hover:text-lime transition-colors"
            >
              Instruments
            </Link>
            <span>/</span>
            <span className="text-white">NOVA</span>
          </nav>
          <div className="hidden items-center gap-2 font-mono text-[10px] text-lime/90 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
            <span>REFERENCE 01 // OVER-EAR</span>
          </div>
        </div>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: 3D Product Gallery (lg:col-span-7) */}
          <section
            aria-label="3D Product Gallery"
            className="flex flex-col lg:col-span-7"
          >
            {/* 3D Canvas Box */}
            <div className="group relative rounded-2xl border border-white/8 bg-gradient-to-b from-graphite/40 via-graphite/20 to-obsidian shadow-2xl backdrop-blur-sm overflow-hidden">
              {/* Subtle Atelier Watermark */}
              <div className="pointer-events-none absolute left-6 top-6 z-10">
                <p className="font-sans text-[10px] uppercase tracking-[0.38em] text-lime">
                  3D Interactive Model
                </p>
                <p className="font-serif text-xs tracking-wider text-titanium/50">
                  Precision Mesh 1:1 Scale
                </p>
              </div>

              {/* View angle badge */}
              <div className="pointer-events-none absolute right-6 top-6 z-10 hidden sm:block">
                <span className="rounded-full border border-white/10 bg-obsidian/60 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-titanium/70 backdrop-blur-md">
                  PBR · Shadows · 60 FPS
                </span>
              </div>

              {/* 3D Interactive Canvas */}
              <div className="h-[460px] sm:h-[560px] lg:h-[640px] w-full">
                <NovaProductViewerLazy colorHex={selectedColor.hex} />
              </div>

              {/* Color Finish Preview Tag */}
              <div className="border-t border-white/8 bg-obsidian/80 px-6 py-4 backdrop-blur-md">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-titanium/60">
                      Active Color Finish
                    </p>
                    <p className="mt-0.5 font-serif text-base text-white">
                      {selectedColor.name}
                    </p>
                  </div>
                  <p className="text-xs text-titanium/70 italic max-w-xs text-right hidden sm:block">
                    &ldquo;{selectedColor.description}&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery View Presets & Instructions */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-titanium/60">
                  Drag to rotate · Touch to inspect · Scroll controls disabled on
                  gallery
                </span>
              </div>
              <Link
                href="/headphones"
                className="font-sans text-[10px] uppercase tracking-[0.24em] text-lime hover:underline underline-offset-4 transition"
              >
                View Full-Screen 3D Studio →
              </Link>
            </div>
          </section>

          {/* Right Column: Product Information & Purchase (lg:col-span-5) */}
          <section
            aria-label="Product Information"
            className="flex flex-col justify-start lg:col-span-5"
          >
            {/* Header / Titles */}
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-lime font-medium">
                AUREON ATELIER · NO. 01
              </p>
              <h1 className="mt-2 font-serif text-4xl text-white tracking-tight sm:text-5xl lg:text-6xl">
                {product.name}
              </h1>
              <p className="mt-2 font-sans text-sm uppercase tracking-[0.28em] text-titanium/70">
                Premium Wireless Over-Ear Headphones
              </p>
            </div>

            {/* Rating & Reviews (Clearly marked demo content) */}
            <div className="mt-4 flex items-center gap-3 border-b border-white/8 pb-5">
              <div className="flex text-lime text-sm tracking-widest" aria-label="5 star rating">
                ★★★★★
              </div>
              <span className="font-mono text-xs font-semibold text-white">
                4.9
              </span>
              <span className="text-titanium/40">·</span>
              <span className="font-sans text-xs text-titanium/70">
                128 Commissions{" "}
                <span className="text-titanium/40 text-[10px]">
                  (Demo Showcase)
                </span>
              </span>
            </div>

            {/* Price & Allocation Status */}
            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <p className="font-serif text-3xl text-white sm:text-4xl">
                  $1,250
                  <span className="ml-2 font-sans text-xs uppercase tracking-widest text-titanium/50">
                    USD
                  </span>
                </p>
                <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.24em] text-titanium/60">
                  Taxes & white-glove insured delivery calculated at allocation
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.24em] text-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
                In Stock & Hand-Tuned
              </span>
            </div>

            {/* Short Luxury Description */}
            <p className="mt-6 text-sm leading-relaxed text-titanium/80 sm:text-base">
              Closed-back acoustic architecture sculpted in aero-grade titanium
              and hand-finished protein leather. Engineered for transcendent
              immersion with custom 40mm electro-dynamic beryllium drivers and
              spatial stage reconstruction.
            </p>

            {/* Color Swatch Picker */}
            <div className="mt-8 rounded-xl border border-white/8 bg-graphite/30 p-5">
              <div className="flex items-center justify-between">
                <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-white">
                  Finish:{" "}
                  <span className="text-lime">{selectedColor.name}</span>
                </p>
                <span className="font-mono text-[10px] text-titanium/50">
                  {selectedColor.hex}
                </span>
              </div>

              {/* Five Color Swatches */}
              <div
                role="radiogroup"
                aria-label="Select NOVA color finish"
                className="mt-4 flex items-center gap-3"
              >
                {NOVA_COLORS.map((color) => {
                  const isSelected = color.id === selectedColor.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "group relative flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-200 outline-none focus-visible:ring-2 focus-visible:ring-lime",
                        isSelected ? "scale-105" : "hover:scale-100",
                      )}
                    >
                      {/* Selection ring */}
                      <span
                        className={cn(
                          "absolute inset-0 rounded-full border transition-all duration-300",
                          isSelected
                            ? "border-lime opacity-100 scale-100"
                            : "border-white/20 opacity-0 group-hover:opacity-60 scale-90",
                        )}
                      />
                      {/* Swatch circle */}
                      <span
                        style={{ backgroundColor: color.hex }}
                        className="relative block h-7 w-7 rounded-full border border-white/20 shadow-md transition-transform"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Key Acoustic Features Grid */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-white/6 bg-graphite/20 p-3.5">
                <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                  Active Noise Cancellation
                </p>
                <p className="mt-1 text-xs text-titanium/80">
                  Hybrid 3-mic array with transparent pass-through mode
                </p>
              </div>

              <div className="rounded-lg border border-white/6 bg-graphite/20 p-3.5">
                <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                  Spatial Audio
                </p>
                <p className="mt-1 text-xs text-titanium/80">
                  Binaural 3D stage reconstruction with zero coloration
                </p>
              </div>

              <div className="rounded-lg border border-white/6 bg-graphite/20 p-3.5">
                <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                  40-Hour Battery
                </p>
                <p className="mt-1 text-xs text-titanium/80">
                  Continuous ANC listening. 15 min USB-C fast charge = 3 hrs
                </p>
              </div>

              <div className="rounded-lg border border-white/6 bg-graphite/20 p-3.5">
                <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                  Bluetooth 5.3 & Lossless
                </p>
                <p className="mt-1 text-xs text-titanium/80">
                  Multi-point LDAC high-res streaming & 3.5mm analog bypass
                </p>
              </div>
            </div>

            {/* Purchase Action Section */}
            <div className="mt-8 border-t border-white/8 pt-8">
              {/* Quantity Selector */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-sans text-xs uppercase tracking-[0.28em] text-titanium/80">
                  Allocation Quantity
                </span>
                <div className="flex items-center rounded-md border border-white/10 bg-graphite/40">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="h-9 w-9 text-lg text-titanium transition hover:text-white disabled:opacity-30"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-mono text-sm font-semibold text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                    disabled={quantity >= 5}
                    aria-label="Increase quantity"
                    className="h-9 w-9 text-lg text-titanium transition hover:text-white disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center gap-2 rounded-sm bg-lime py-4 font-sans text-xs uppercase tracking-[0.28em] font-semibold text-obsidian transition hover:bg-lime/90 active:scale-[0.99]"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Add to Bag
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full rounded-sm border border-titanium/40 bg-graphite/60 py-4 font-sans text-xs uppercase tracking-[0.28em] text-white transition hover:border-lime hover:text-lime active:scale-[0.99]"
                >
                  Acquire Now
                </button>
              </div>

              {/* Confirmation Toast */}
              {addedNotice && (
                <div className="mt-3 flex items-center justify-center gap-2 rounded-md border border-lime/30 bg-lime/10 py-2.5 text-center font-sans text-xs uppercase tracking-[0.24em] text-lime animate-in fade-in slide-in-from-top-2">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  NOVA ({selectedColor.name}) Added to Atelier Bag
                </div>
              )}

              {/* Guarantees & Concierge */}
              <div className="mt-6 space-y-2 border-t border-white/6 pt-5">
                <div className="flex items-center gap-3 text-xs text-titanium/70">
                  <svg
                    className="h-4 w-4 text-lime shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  <span>
                    Complimentary worldwide insured courier (2–4 business days)
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-titanium/70">
                  <svg
                    className="h-4 w-4 text-lime shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>
                    3-Year Atelier Warranty & Acoustic Calibration Certificate
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-titanium/70">
                  <svg
                    className="h-4 w-4 text-lime shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span>
                    Encrypted private transaction with concierge assistance
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Product Highlights / Architecture Section */}
      <section className="border-t border-white/8 bg-gradient-to-b from-obsidian via-graphite/20 to-obsidian py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="max-w-2xl">
            <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-lime">
              Acoustic Architecture
            </p>
            <h2 className="mt-3 font-serif text-3xl text-white sm:text-5xl">
              Engineered without compromise.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-titanium/80 sm:text-base">
              Each component of NOVA is conceived as a vibration-damped acoustic
              chamber, removing unwanted physical resonance and revealing the
              unfiltered master recording.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-white/8 bg-graphite/40 p-8 transition hover:border-white/20">
              <span className="font-mono text-xs text-lime">01 // TRANSDUCER</span>
              <h3 className="mt-4 font-serif text-2xl text-white">
                40mm Electro-Dynamic Beryllium Drivers
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-titanium/75">
                Formed from pure beryllium foil with an ultra-stiff structural
                lattice. Offers rapid acceleration and transient recovery,
                extending sub-bass down to 5 Hz with near-zero harmonic
                distortion.
              </p>
            </div>

            <div className="rounded-xl border border-white/8 bg-graphite/40 p-8 transition hover:border-white/20">
              <span className="font-mono text-xs text-lime">02 // CHASSIS</span>
              <h3 className="mt-4 font-serif text-2xl text-white">
                Aero-Grade Titanium Yoke & Sliders
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-titanium/75">
                Machined from solid aerospace titanium alloy. Delivers rigorous
                torsional rigidity while keeping overall weight balanced at
                just 290 grams for fatigue-free listening marathons.
              </p>
            </div>

            <div className="rounded-xl border border-white/8 bg-graphite/40 p-8 transition hover:border-white/20">
              <span className="font-mono text-xs text-lime">03 // ISOLATION</span>
              <h3 className="mt-4 font-serif text-2xl text-white">
                Silent Void™ Adaptive Noise Cancellation
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-titanium/75">
                Dual feedforward and feedback microphones measure environmental
                pressure 48,000 times per second, attenuating ambient hum by up
                to -38 dB without exerting pressure on the eardrum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section className="border-t border-white/8 py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-lime">
                Atelier Data Sheet
              </p>
              <h2 className="mt-3 font-serif text-3xl text-white sm:text-5xl">
                Technical Specifications
              </h2>
            </div>

            {/* Spec Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-2">
              {[
                { id: "acoustics", label: "Acoustics" },
                { id: "connectivity", label: "Connectivity" },
                { id: "power", label: "Power & Battery" },
                { id: "craft", label: "Craft & Materials" },
                { id: "in_box", label: "In The Box" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as SpecTab)}
                  className={cn(
                    "rounded-sm px-3.5 py-1.5 font-sans text-[10px] uppercase tracking-[0.24em] transition-colors",
                    activeTab === tab.id
                      ? "bg-lime text-obsidian font-semibold"
                      : "text-titanium/70 hover:text-white",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tab Specs Table */}
          <div className="mt-10 rounded-xl border border-white/8 bg-graphite/30 p-6 md:p-10">
            {activeTab === "acoustics" && (
              <dl className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Driver Unit
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    40mm Custom Electro-Dynamic Beryllium Diaphragm
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Frequency Range
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    5 Hz – 42,000 Hz (Hi-Res Audio Certified)
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Total Harmonic Distortion
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    &lt; 0.08% @ 1 kHz, 100 dB SPL
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Impedance (Passive Bypass)
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    32 Ohms @ 1 kHz
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Sound Pressure Level (SPL)
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    105 dB SPL @ 1 mW
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Acoustic Chamber
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Closed-Back Bass Reflex Port with Tuned Dampers
                  </dd>
                </div>
              </dl>
            )}

            {activeTab === "connectivity" && (
              <dl className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Bluetooth Version
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Bluetooth 5.3 Class 1 (Up to 15m range)
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Supported Codecs
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    LDAC (990 kbps), AAC, SBC, aptX Adaptive
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Digital Wired Audio
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    USB-C Lossless (24-bit / 96 kHz Audio DAC Mode)
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Analog Wired Audio
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    3.5mm Gold-Plated Mini-Jack (Zero Latency Bypass)
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Multipoint Pairing
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Seamless switching between 2 simultaneous devices
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Microphone Array
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    4 Beamforming MEMS Mics with wind-noise mitigation
                  </dd>
                </div>
              </dl>
            )}

            {activeTab === "power" && (
              <dl className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Battery Life (ANC On)
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Up to 40 Hours continuous playback
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Battery Life (ANC Off)
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Up to 55 Hours continuous playback
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Rapid Charge Time
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    15 minutes charge provides 3 hours playback
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Full Charge Time
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Approximately 90 minutes via USB-C
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Battery Chemistry
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Rechargeable Lithium-Ion (800 mAh capacity)
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Charging Port
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Universal USB Type-C with Power Delivery protocol
                  </dd>
                </div>
              </dl>
            )}

            {activeTab === "craft" && (
              <dl className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Weight
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    290 grams (balanced weight distribution)
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Ear Cup Material
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Acoustic Polymer with PVD Protective Clear-Coat
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Headband & Yoke
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Aero-grade Titanium alloy with CNC brushed finish
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Ear Cushions
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    High-density memory foam & breathable protein leather
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Cushion Attachment
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Magnetic quick-snap replaceable system
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Dimensions (Folded Flat)
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    190 mm × 170 mm × 48 mm
                  </dd>
                </div>
              </dl>
            )}

            {activeTab === "in_box" && (
              <dl className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Primary Instrument
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    AUREON NOVA Wireless Headphones
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Protective Carry Case
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Custom hard-shell case with magnetic cable dock
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Analog Cable
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    1.2m Braided 3.5mm Oxygen-Free Copper cable
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Digital Lossless Cable
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    1.5m Braided USB-C to USB-C audio/charge cable
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Flight & Studio Adapters
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    6.35mm gold-plated adapter & airline stereo plug
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Documentation
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Signed Certificate of Acoustic Calibration
                  </dd>
                </div>
              </dl>
            )}
          </div>
        </div>
      </section>

      {/* Storytelling Editorial Section */}
      <section className="border-t border-white/8 bg-graphite/20 py-24">
        <div className="mx-auto max-w-5xl px-5 text-center md:px-10">
          <p className="font-sans text-[11px] uppercase tracking-[0.42em] text-lime">
            The Atelier Philosophy
          </p>
          <blockquote className="mt-6 font-serif text-3xl italic text-white sm:text-5xl lg:text-6xl leading-tight">
            &ldquo;In an age of synthetic saturation, NOVA was sculpted as an
            heirloom instrument for purest silence.&rdquo;
          </blockquote>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-titanium/80 sm:text-lg">
            Conceived between Geneva and London, every radius of NOVA was
            determined by how air pressure diffuses across acoustic chambers. By
            pairing aerospace titanium with hand-buffed organic lacquers, we
            rejected plastic resonance in favor of structural clarity. An
            instrument that disappears on your head, expanding the soundstage
            into infinity.
          </p>
        </div>
      </section>

      {/* Related Product: PULSE Wireless Earbuds Preview */}
      <section className="border-t border-white/8 py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="rounded-2xl border border-white/8 bg-gradient-to-r from-graphite/50 via-graphite/20 to-obsidian p-8 md:p-14">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.38em] text-lime">
                  Companion Instrument
                </p>
                <h3 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
                  {PRODUCTS.earbuds.name} Wireless Earbuds
                </h3>
                <p className="mt-1 font-sans text-xs uppercase tracking-[0.24em] text-titanium/70">
                  {PRODUCTS.earbuds.tagline}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-titanium/80">
                  {PRODUCTS.earbuds.description} Engineered with the same
                  titanium acoustic tuning, presented with a tactile opening
                  mechanism and five signature color finishes.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/earbuds"
                    className="inline-flex items-center gap-2 border border-lime bg-lime px-6 py-3 font-sans text-xs uppercase tracking-[0.24em] text-obsidian font-semibold transition hover:bg-lime/90"
                  >
                    Explore PULSE in 3D →
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 font-sans text-xs uppercase tracking-[0.24em] text-titanium transition hover:border-white/50 hover:text-white"
                  >
                    Return to Atelier
                  </Link>
                </div>
              </div>

              {/* Decorative companion card */}
              <div className="flex flex-col items-center justify-center rounded-xl border border-white/6 bg-obsidian/60 p-8 text-center backdrop-blur-sm">
                <div className="h-14 w-14 rounded-full border border-lime/30 bg-lime/10 flex items-center justify-center text-lime mb-4">
                  <svg
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
                  </svg>
                </div>
                <h4 className="font-serif text-xl text-white">
                  AUREON Dual Instrument Pairing
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-titanium/70 max-w-sm">
                  Seamless acoustic profile continuity between over-ear reference
                  immersion and wireless pocket mobility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

