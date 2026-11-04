"use client";

import { useCallback, useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { PULSE_COLORS, type PulseColor } from "@/lib/pulse-color-store";

interface PulseColorSelectorProps {
  value: string;
  onChange: (colorOrId: string) => void;
  className?: string;
}

export function PulseColorSelector({
  value,
  onChange,
  className,
}: PulseColorSelectorProps) {
  const swatchRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selected: PulseColor =
    PULSE_COLORS.find((c) => c.id === value) ?? PULSE_COLORS[0];

  const onSwatchKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const last = PULSE_COLORS.length - 1;
      let next = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        next = index === last ? 0 : index + 1;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        next = index === 0 ? last : index - 1;
      } else if (event.key === "Home") {
        next = 0;
      } else if (event.key === "End") {
        next = last;
      } else {
        return;
      }
      event.preventDefault();
      onChange(PULSE_COLORS[next].id);
      swatchRefs.current[next]?.focus();
    },
    [onChange],
  );

  return (
    <div
      className={cn(
        "pointer-events-none flex flex-col items-center gap-3 px-4",
        className,
      )}
    >
      <p
        aria-live="polite"
        className="font-sans text-[10px] uppercase tracking-[0.32em] text-titanium/80"
      >
        <span className="text-titanium/50">Finish&nbsp;&nbsp;</span>
        <span className="text-white">{selected.name}</span>
      </p>

      <div
        role="radiogroup"
        aria-label="PULSE earbud color"
        className="pointer-events-auto flex max-w-full items-center justify-center gap-0.5 rounded-full border border-white/10 bg-black/40 px-2 py-1 backdrop-blur-md sm:gap-2 sm:px-3"
      >
        {PULSE_COLORS.map((color, index) => {
          const isSelected = color.id === selected.id;
          return (
            <button
              key={color.id}
              ref={(node) => {
                swatchRefs.current[index] = node;
              }}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={color.name}
              title={color.name}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onChange(color.id)}
              onKeyDown={(event) => onSwatchKeyDown(event, index)}
              className="group relative flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-lime/80"
            >
              {/* Selection ring */}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-1 rounded-full border transition-all duration-300 ease-out",
                  isSelected
                    ? "scale-100 border-white/90 opacity-100"
                    : "scale-75 border-white/0 opacity-0 group-hover:scale-90 group-hover:border-white/30 group-hover:opacity-100",
                )}
              />
              {/* Swatch */}
              <span
                aria-hidden
                style={{ backgroundColor: color.hex }}
                className={cn(
                  "relative block h-6 w-6 rounded-full border border-white/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.28),inset_0_-2px_3px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out",
                  isSelected
                    ? "scale-100"
                    : "scale-90 group-hover:scale-100 group-active:scale-95",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

