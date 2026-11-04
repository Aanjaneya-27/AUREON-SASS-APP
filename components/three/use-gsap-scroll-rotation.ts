"use client";

import { type MutableRefObject, type RefObject, useEffect } from "react";
import { getGsap } from "@/lib/gsap-client";

type Options = {
  enabled?: boolean;
  pin?: boolean;
  revolutions?: number;
};

export function useGsapScrollRotation(
  triggerRef: RefObject<HTMLElement | null>,
  rotationRef: MutableRefObject<number>,
  { enabled = true, pin = true, revolutions = 1 }: Options = {},
) {
  useEffect(() => {
    const trigger = triggerRef.current;
    if (!enabled || !trigger) return;

    const { gsap, ScrollTrigger } = getGsap();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger,
        start: pin ? "top 4.5rem" : "top 85%",
        end: pin ? "+=220%" : "bottom 15%",
        pin: pin && !reduceMotion,
        pinSpacing: pin && !reduceMotion,
        scrub: reduceMotion ? false : 1.35,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          rotationRef.current = self.progress * Math.PI * 2 * revolutions;
        },
      });
    }, trigger);

    return () => {
      ctx.revert();
    };
  }, [enabled, pin, revolutions, rotationRef, triggerRef]);
}
