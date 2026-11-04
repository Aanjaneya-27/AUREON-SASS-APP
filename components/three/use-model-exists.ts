"use client";

import { useEffect, useState } from "react";

export type ModelStatus = "checking" | "ready" | "missing";

export function useModelExists(url: string): ModelStatus {
  const [status, setStatus] = useState<ModelStatus>("checking");

  useEffect(() => {
    let cancelled = false;

    async function probe() {
      try {
        const head = await fetch(url, { method: "HEAD", cache: "no-store" });
        if (cancelled) return;
        if (head.ok) {
          setStatus("ready");
          return;
        }
        if (head.status === 405 || head.status === 501) {
          const get = await fetch(url, {
            method: "GET",
            cache: "no-store",
            headers: { Range: "bytes=0-0" },
          });
          if (!cancelled) setStatus(get.ok ? "ready" : "missing");
          return;
        }
        setStatus("missing");
      } catch {
        if (!cancelled) setStatus("missing");
      }
    }

    void probe();
    return () => {
      cancelled = true;
    };
  }, [url]);

  return status;
}
