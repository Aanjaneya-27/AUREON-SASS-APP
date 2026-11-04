"use client";

import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import { PerspectiveCamera } from "three";

type FramingRigProps = {
  /** World-space bounding-sphere radius of the fitted model. */
  radius: number;
  padding?: number;
  y?: number;
};

export function FramingRig({
  radius,
  padding = 1.24,
  y = 0.04,
}: FramingRigProps) {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    const cam = camera as PerspectiveCamera;
    if (!cam.isPerspectiveCamera) return;

    const aspect = Math.max(size.width / Math.max(size.height, 1), 0.55);
    const verticalFov = (cam.fov * Math.PI) / 180;
    const halfHeight = Math.tan(verticalFov / 2);
    const fitHeight = (radius * padding) / halfHeight;
    const fitWidth = (radius * padding) / (halfHeight * aspect);
    const distance = Math.max(fitHeight, fitWidth);

    cam.near = Math.max(distance / 100, 0.08);
    cam.far = Math.max(distance * 24, 40);
    cam.position.set(0, y, distance);
    cam.lookAt(0, 0, 0);
    cam.updateProjectionMatrix();
  }, [camera, padding, radius, size.height, size.width, y]);

  return null;
}
