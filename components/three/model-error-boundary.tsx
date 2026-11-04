"use client";

import { Component, type ReactNode } from "react";
import { MissingModelFallback } from "@/components/three/missing-model-fallback";

type Props = {
  path: string;
  label: string;
  children: ReactNode;
};

type State = { failed: boolean };

export class ModelErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    console.warn("[AUREON 3D] Failed to load model", this.props.path, error);
  }

  render() {
    if (this.state.failed) {
      return (
        <MissingModelFallback path={this.props.path} label={this.props.label} />
      );
    }

    return this.props.children;
  }
}
