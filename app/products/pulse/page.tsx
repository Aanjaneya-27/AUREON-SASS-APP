"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { PulseProductViewerLazy } from "@/components/three/load-experiences";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/cn";
import { PRODUCTS } from "@/lib/product-models";
import { PULSE_COLORS, type PulseColor } from "@/lib/pulse-color-store";

type SpecTab = "acoustics" | "connectivity" | "battery" | "craft" | "in_box";

export default function PulseProductPage() {
  const [selectedColor, setSelectedColor] = useState<PulseColor>(
    PULSE_COLORS[0],
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<SpecTab>("acoustics");
  const [addedNotice, setAddedNotice] = useState(false);

  const { addItem, openCart } = useCart();
  const product = PRODUCTS.earbuds;

  const handleAddToCart = useCallback(() => {
    addItem(
      {
        id: `pulse-${selectedColor.id}`,
        name: `PULSE (${selectedColor.name})`,
        category: product.category,
        price: "$550",
      },
      quantity,
    );
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  }, [addItem, product.category, quantity, selectedColor]);

  const handleBuyNow = useCallback(() => {
    addItem(
      {
        id: `pulse-${selectedColor.id}`,
        name: `PULSE (${selectedColor.name})`,
        category: product.category,
        price: "$550",
      },
      quantity,
    );
    openCart();
  }, [addItem, openCart, product.category, quantity, selectedColor]);

  return (
    <div className="min-h-screen bg-obsidian text-titanium selection:bg-lime/80 selection:text-obsidian">
      {/* Top Breadcrumb & Status Bar */}
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
            <Link href="/earbuds" className="hover:text-lime transition-colors">
              Instruments
            </Link>
            <span>/</span>
            <span className="text-white">PULSE</span>
          </nav>
          <div className="hidden items-center gap-2 font-mono text-[10px] text-lime/90 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
            <span>REFERENCE 02 // TRUE WIRELESS & CASE</span>
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
                  3D Interactive Canvas
                </p>
                <p className="font-serif text-xs tracking-wider text-titanium/50">
                  Earbuds & Charging Case 1:1 Scale
                </p>
              </div>

              {/* View Status Badge */}
              <div className="pointer-events-none absolute right-6 top-6 z-10 hidden sm:block">
                <span className="rounded-full border border-white/10 bg-obsidian/60 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-titanium/70 backdrop-blur-md">
                  PBR · Interactive Case · 60 FPS
                </span>
              </div>

              {/* 3D Interactive Canvas */}
              <div className="h-[460px] sm:h-[560px] lg:h-[640px] w-full">
                <PulseProductViewerLazy colorHex={selectedColor.hex} />
              </div>

              {/* Color Finish Preview Tag */}
              <div className="border-t border-white/8 bg-obsidian/80 px-6 py-4 backdrop-blur-md">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-titanium/60">
                      Active Color Finish (Earbuds & Case)
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
                  Drag to rotate · Touch enabled · Click &lsquo;Open Case&rsquo; to inspect interior
                </span>
              </div>
              <Link
                href="/earbuds"
                className="font-sans text-[10px] uppercase tracking-[0.24em] text-lime hover:underline underline-offset-4 transition"
              >
                View Full-Screen 3D Experience →
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
                AUREON ATELIER · NO. 02
              </p>
              <h1 className="mt-2 font-serif text-4xl text-white tracking-tight sm:text-5xl lg:text-6xl">
                {product.name}
              </h1>
              <p className="mt-2 font-sans text-sm uppercase tracking-[0.28em] text-titanium/70">
                Premium True Wireless Earbuds & Case
              </p>
            </div>

            {/* Rating & Reviews (Clearly marked demo content) */}
            <div className="mt-4 flex items-center gap-3 border-b border-white/8 pb-5">
              <div
                className="flex text-lime text-sm tracking-widest"
                aria-label="5 star rating"
              >
                ★★★★★
              </div>
              <span className="font-mono text-xs font-semibold text-white">
                4.9
              </span>
              <span className="text-titanium/40">·</span>
              <span className="font-sans text-xs text-titanium/70">
                96 Commissions{" "}
                <span className="text-titanium/40 text-[10px]">
                  (Demo Showcase)
                </span>
              </span>
            </div>

            {/* Price & Allocation Status */}
            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <p className="font-serif text-3xl text-white sm:text-4xl">
                  $550
                  <span className="ml-2 font-sans text-xs uppercase tracking-widest text-titanium/50">
                    USD
                  </span>
                </p>
                <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.24em] text-titanium/60">
                  Includes pocket charging case & complimentary worldwide courier
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.24em] text-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
                In Stock & Hand-Calibrated
              </span>
            </div>

            {/* Short Luxury Description */}
            <p className="mt-6 text-sm leading-relaxed text-titanium/80 sm:text-base">
              A pair. A case. A private acoustic stage. True wireless earbuds
              sculpted in matte polycarbonate with tactile magnetic closure.
              Engineered with 11mm graphene electro-acoustic transducers and
              adaptive dual-chamber noise reduction.
            </p>

            {/* Five Color Variants Swatch Picker */}
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

              {/* Color Swatches (Updates BOTH earbuds and case) */}
              <div
                role="radiogroup"
                aria-label="Select PULSE color variant"
                className="mt-4 flex items-center gap-3"
              >
                {PULSE_COLORS.map((color) => {
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
              <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-titanium/50">
                Selection updates both earbuds and matching charging case
              </p>
            </div>

            {/* Key Audio Features Grid (6 Core Features) */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-white/6 bg-graphite/20 p-3.5">
                <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                  Active Noise Cancellation
                </p>
                <p className="mt-1 text-xs text-titanium/80">
                  Hybrid dual-chamber acoustic cancellation with ambient transparency
                </p>
              </div>

              <div className="rounded-lg border border-white/6 bg-graphite/20 p-3.5">
                <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                  Premium Spatial Audio
                </p>
                <p className="mt-1 text-xs text-titanium/80">
                  Personalized binaural head-stage rendering with zero-phase distortion
                </p>
              </div>

              <div className="rounded-lg border border-white/6 bg-graphite/20 p-3.5">
                <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                  Clear Call Quality
                </p>
                <p className="mt-1 text-xs text-titanium/80">
                  Triple beamforming microphones with bone-conduction voice pickup
                </p>
              </div>

              <div className="rounded-lg border border-white/6 bg-graphite/20 p-3.5">
                <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                  Compact Charging Case
                </p>
                <p className="mt-1 text-xs text-titanium/80">
                  Pocket-profile form with magnetic dampening & Qi wireless charging
                </p>
              </div>

              <div className="rounded-lg border border-white/6 bg-graphite/20 p-3.5">
                <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                  Tactile Touch Controls
                </p>
                <p className="mt-1 text-xs text-titanium/80">
                  Capacitive gesture surface for play/pause, ANC toggle & volume sweep
                </p>
              </div>

              <div className="rounded-lg border border-white/6 bg-graphite/20 p-3.5">
                <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                  Bluetooth 5.3 & Multipoint
                </p>
                <p className="mt-1 text-xs text-titanium/80">
                  High-res LC3 & AAC transmission with instant dual-device handover
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
                  PULSE ({selectedColor.name}) Added to Atelier Bag
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
                    3-Year Atelier Warranty & Signed Acoustic Calibration
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
                    Encrypted private checkout with white-glove support
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
              Micro-Acoustic Architecture
            </p>
            <h2 className="mt-3 font-serif text-3xl text-white sm:text-5xl">
              Sculpted for personal resonance.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-titanium/80 sm:text-base">
              PULSE translates the sonic purity of our reference over-ear
              monitors into a pocket-scale architecture, pairing precision
              graphene transducers with a damped acoustic enclosure.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-white/8 bg-graphite/40 p-8 transition hover:border-white/20">
              <span className="font-mono text-xs text-lime">01 // TRANSDUCER</span>
              <h3 className="mt-4 font-serif text-2xl text-white">
                11mm Custom Graphene Driver
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-titanium/75">
                Engineered with an ultra-thin graphene-infused diaphragm and
                high-flux neodymium magnet. Produces crystalline high-frequency
                extension up to 38,000 Hz and authoritative sub-bass texture.
              </p>
            </div>

            <div className="rounded-xl border border-white/8 bg-graphite/40 p-8 transition hover:border-white/20">
              <span className="font-mono text-xs text-lime">02 // TACTILE CASE</span>
              <h3 className="mt-4 font-serif text-2xl text-white">
                Damped Pocket Case & Wireless Qi
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-titanium/75">
                Machined with an internal steel hinge pin and magnetic closure
                tuned for a reassuring, weighted tactile ritual. Charges via
                fast USB-C or any Qi-certified wireless charging pad.
              </p>
            </div>

            <div className="rounded-xl border border-white/8 bg-graphite/40 p-8 transition hover:border-white/20">
              <span className="font-mono text-xs text-lime">03 // ISOLATION</span>
              <h3 className="mt-4 font-serif text-2xl text-white">
                Dual-Chamber Active Noise Cancellation
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-titanium/75">
                Dual acoustic microphones monitor pressure variations inside
                the ear canal and the surrounding environment, mitigating ambient
                rumble while preserving high-fidelity spatial staging.
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
                { id: "battery", label: "Battery & Charging" },
                { id: "craft", label: "Craft & Fit" },
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
                    11mm Custom Graphene Electro-Dynamic Transducer
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Frequency Range
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    10 Hz – 38,000 Hz (Hi-Res Audio Wireless Certified)
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Active Noise Cancellation
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Hybrid Dual-Chamber ANC with Adaptive Transparency
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Total Harmonic Distortion
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    &lt; 0.1% @ 1 kHz, 94 dB SPL
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Microphone System
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    6 MEMS Beamforming Mics (3 per earbud) + Voice Pickup
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Spatial Audio
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Binaural Stage Modeling with Low-Latency Processing
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
                    Bluetooth 5.3 with LE Audio Support
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Audio Codecs
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    LC3, AAC, SBC (High-bitrate low-latency streaming)
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Transmission Range
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Up to 12 meters (39 feet) unobstructed line-of-sight
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Multipoint Handshake
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Dual-Device Simultaneous Pairing & Smart Routing
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Gesture Interface
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Capacitive Touch Sensor on Earbud Stem
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Latency
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Ultra-Low Latency Mode (&lt; 45 ms for media synchronization)
                  </dd>
                </div>
              </dl>
            )}

            {activeTab === "battery" && (
              <dl className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Earbuds Playback (ANC On)
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Up to 7.5 Hours per single charge
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Earbuds Playback (ANC Off)
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Up to 10 Hours per single charge
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Total Battery with Case
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Up to 32 Hours total reserve listening
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Fast Charge
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    10 minutes in case provides 2 hours playback
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Charging Methods
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    USB-C Wired Port & Qi Wireless Charging
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Full Case Recharge
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Approximately 75 minutes via USB-C
                  </dd>
                </div>
              </dl>
            )}

            {activeTab === "craft" && (
              <dl className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Earbud Weight
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    5.2 grams per earbud (ergonomic acoustic nozzle)
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Charging Case Weight
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    48 grams (matte impact-resistant polycarbonate)
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Water Resistance
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    IPX5 Sweat & Weather Resistance (Earbuds)
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Ear Tips
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Hypoallergenic liquid silicone (4 sizes included)
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Hinge Mechanism
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Stainless steel pin with magnetic tension dampener
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Case Dimensions
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    62 mm × 46 mm × 24 mm (pocket-profile)
                  </dd>
                </div>
              </dl>
            )}

            {activeTab === "in_box" && (
              <dl className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Earbuds
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    AUREON PULSE Earbuds (Left & Right)
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Charging Case
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Color-Matched Wireless Charging Pocket Case
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Ear Tip Assortment
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    4 Pairs Liquid Silicone Tips (XS, S, M, L)
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Charging Cable
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Braided USB-C to USB-C Fast-Charging Cable
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Travel Pouch
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Soft microfiber protective slipcase
                  </dd>
                </div>
                <div>
                  <dt className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    Documentation
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-white">
                    Certificate of Acoustic Testing & Quick Guide
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
            &ldquo;A ritual of extraction. Sound sculpted for your most private
            spheres.&rdquo;
          </blockquote>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-titanium/80 sm:text-lg">
            We conceived PULSE as the sensory counterpart to NOVA. Where our
            over-ear instrument envelops the architecture of your room, PULSE
            slips seamlessly into your pocket, preserving the exact electro-acoustic
            balance and tonal truth wherever life moves. Every opening click of
            the case is an invitation back to total immersion.
          </p>
        </div>
      </section>

      {/* Related Companion Product: NOVA Headphones Preview */}
      <section className="border-t border-white/8 py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="rounded-2xl border border-white/8 bg-gradient-to-r from-graphite/50 via-graphite/20 to-obsidian p-8 md:p-14">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.38em] text-lime">
                  Companion Reference Instrument
                </p>
                <h3 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
                  {PRODUCTS.headphones.name} Wireless Headphones
                </h3>
                <p className="mt-1 font-sans text-xs uppercase tracking-[0.24em] text-titanium/70">
                  {PRODUCTS.headphones.tagline}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-titanium/80">
                  {PRODUCTS.headphones.description} Crafted from aero-grade
                  structural titanium and custom 40mm electro-dynamic beryllium
                  drivers for reference over-ear immersion.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/products/nova"
                    className="inline-flex items-center gap-2 border border-lime bg-lime px-6 py-3 font-sans text-xs uppercase tracking-[0.24em] text-obsidian font-semibold transition hover:bg-lime/90"
                  >
                    Configure NOVA Over-Ear →
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
                  Experience seamless acoustic profile continuity between pocket
                  mobility with PULSE and reference stage immersion with NOVA.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

