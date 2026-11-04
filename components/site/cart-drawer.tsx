"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { PRODUCTS } from "@/lib/product-models";

export function CartDrawer() {
  const { items, totalCount, isOpen, closeCart, removeItem, addItem, clearCart } =
    useCart();

  // Close on ESC key press & lock scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-obsidian/75 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-white/10 bg-obsidian shadow-2xl transition-transform duration-400 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping Bag"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-6 md:px-8">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.38em] text-lime">
              Atelier Allocation
            </p>
            <h2 className="mt-1 font-serif text-2xl tracking-wide text-white">
              Curated Bag
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-titanium transition-colors duration-200 hover:border-lime/60 hover:text-lime"
          >
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-8">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-graphite/40">
                <svg
                  className="h-7 w-7 text-titanium/60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-white">
                Your Atelier Bag is Empty
              </h3>
              <p className="mt-3 max-w-xs text-xs leading-relaxed text-titanium/70">
                Each AUREON instrument is individually engineered and calibrated
                upon private commission.
              </p>

              {/* Exploration Showcase */}
              <div className="mt-8 w-full space-y-4">
                <div className="rounded-sm border border-white/8 bg-graphite/30 p-4 text-left transition hover:border-white/20">
                  <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    {PRODUCTS.headphones.category}
                  </p>
                  <h4 className="mt-1 font-serif text-lg text-white">
                    {PRODUCTS.headphones.name}
                  </h4>
                  <p className="mt-1 text-xs text-titanium/70 line-clamp-2">
                    {PRODUCTS.headphones.tagline}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <Link
                      href="/products/nova"
                      onClick={closeCart}
                      className="font-sans text-[10px] uppercase tracking-[0.24em] text-lime hover:underline underline-offset-4"
                    >
                      Configure in 3D →
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        addItem({
                          id: PRODUCTS.headphones.id,
                          name: PRODUCTS.headphones.name,
                          category: PRODUCTS.headphones.category,
                          price: "$1,250",
                        })
                      }
                      className="border border-white/10 bg-obsidian px-3 py-1 font-sans text-[9px] uppercase tracking-[0.24em] text-titanium hover:border-lime hover:text-lime"
                    >
                      + Add to bag
                    </button>
                  </div>
                </div>

                <div className="rounded-sm border border-white/8 bg-graphite/30 p-4 text-left transition hover:border-white/20">
                  <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-lime">
                    {PRODUCTS.earbuds.category}
                  </p>
                  <h4 className="mt-1 font-serif text-lg text-white">
                    {PRODUCTS.earbuds.name}
                  </h4>
                  <p className="mt-1 text-xs text-titanium/70 line-clamp-2">
                    {PRODUCTS.earbuds.tagline}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <Link
                      href="/products/pulse"
                      onClick={closeCart}
                      className="font-sans text-[10px] uppercase tracking-[0.24em] text-lime hover:underline underline-offset-4"
                    >
                      Configure in 3D →
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        addItem({
                          id: PRODUCTS.earbuds.id,
                          name: PRODUCTS.earbuds.name,
                          category: PRODUCTS.earbuds.category,
                          price: "$550",
                        })
                      }
                      className="border border-white/10 bg-obsidian px-3 py-1 font-sans text-[9px] uppercase tracking-[0.24em] text-titanium hover:border-lime hover:text-lime"
                    >
                      + Add to bag
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="divide-y divide-white/8">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-4"
                  >
                    <div>
                      <p className="font-sans text-[9px] uppercase tracking-[0.28em] text-lime">
                        {item.category}
                      </p>
                      <h4 className="mt-0.5 font-serif text-lg text-white">
                        {item.name}
                      </h4>
                      <p className="mt-0.5 font-mono text-xs text-titanium/80">
                        {item.price} · Qty {item.quantity}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="p-2 text-titanium/60 transition hover:text-white"
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="rounded-sm border border-white/8 bg-graphite/20 p-4">
                <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-titanium/80">
                  Private Allocation Notice
                </p>
                <p className="mt-2 text-xs leading-relaxed text-titanium/60">
                  Each instrument is individually calibrated in titanium and
                  dispatched with certificate of acoustic verification.
                </p>
              </div>

              <button
                type="button"
                onClick={clearCart}
                className="font-sans text-[10px] uppercase tracking-[0.28em] text-titanium/60 underline hover:text-titanium"
              >
                Clear all instruments
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/8 bg-graphite/40 px-6 py-6 md:px-8">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs uppercase tracking-[0.28em] text-titanium/70">
                Instruments ({totalCount})
              </span>
              <span className="font-sans text-[11px] uppercase tracking-[0.28em] text-lime">
                Bespoke Commission
              </span>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="mt-5 w-full bg-lime py-3.5 text-center font-sans text-xs uppercase tracking-[0.28em] text-obsidian transition hover:bg-lime/90"
            >
              Request Allocation
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
