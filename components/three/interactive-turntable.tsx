"use client";

import { useFrame, useThree } from "@react-three/fiber";
import {
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
} from "react";
import { Group, MathUtils } from "three";

type InteractiveTurntableProps = {
  children: ReactNode;
  scrollYRef?: RefObject<number>;
  autoIdle?: boolean;
};

export function InteractiveTurntable({
  children,
  scrollYRef,
  autoIdle = true,
}: InteractiveTurntableProps) {
  const group = useRef<Group>(null);
  const { gl } = useThree();
  const drag = useRef({
    pointerId: -1,
    lastX: 0,
    lastY: 0,
    rotX: 0.14,
    rotY: 0.35,
    vx: 0,
  });

  useEffect(() => {
    const el = gl.domElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const onDown = (event: PointerEvent) => {
      drag.current.pointerId = event.pointerId;
      drag.current.lastX = event.clientX;
      drag.current.lastY = event.clientY;
      drag.current.vx = 0;
      el.setPointerCapture(event.pointerId);
    };

    const onMove = (event: PointerEvent) => {
      if (drag.current.pointerId !== event.pointerId) return;
      const dx = event.clientX - drag.current.lastX;
      const dy = event.clientY - drag.current.lastY;
      drag.current.lastX = event.clientX;
      drag.current.lastY = event.clientY;
      drag.current.rotY += dx * 0.0075;
      drag.current.rotX = MathUtils.clamp(
        drag.current.rotX + dy * 0.0048,
        -0.42,
        0.52,
      );
      drag.current.vx = dx;
    };

    const onUp = (event: PointerEvent) => {
      if (drag.current.pointerId !== event.pointerId) return;
      drag.current.pointerId = -1;
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("lostpointercapture", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("lostpointercapture", onUp);
      void reduceMotion;
    };
  }, [gl]);

  useFrame((state, delta) => {
    const node = group.current;
    if (!node) return;

    const dragging = drag.current.pointerId >= 0;
    if (!dragging) {
      drag.current.rotY += drag.current.vx * 0.0022;
      drag.current.vx *= 0.9;
      if (autoIdle && Math.abs(drag.current.vx) < 0.08) {
        drag.current.rotY += delta * 0.12;
      }
    }

    const scroll = scrollYRef?.current ?? 0;
    const targetY = drag.current.rotY + scroll;
    node.rotation.y = MathUtils.damp(node.rotation.y, targetY, 7, delta);
    node.rotation.x = MathUtils.damp(
      node.rotation.x,
      drag.current.rotX,
      7,
      delta,
    );
    node.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.012;
  });

  return <group ref={group}>{children}</group>;
}
