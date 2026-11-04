"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { Group } from "three";
import { getGsap } from "@/lib/gsap-client";

export function EntranceGroup({ children }: { children: ReactNode }) {
  const group = useRef<Group>(null);

  useLayoutEffect(() => {
    const node = group.current;
    if (!node) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const { gsap } = getGsap();
    node.scale.setScalar(1);
    node.position.y = -0.06;
    node.rotation.y = -0.38;

    const tween = gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .to(node.position, { y: 0, duration: 1.25 }, 0)
      .to(node.rotation, { y: 0, duration: 1.45 }, 0);

    return () => {
      tween.kill();
    };
  }, []);

  return <group ref={group}>{children}</group>;
}
