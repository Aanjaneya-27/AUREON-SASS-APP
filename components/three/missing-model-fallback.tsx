import { cn } from "@/lib/cn";

export function MissingModelFallback({
  path,
  label,
  className,
}: {
  path: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_30%,#17191D_0%,#08090B_62%)] px-6",
        className,
      )}
    >
      <div className="max-w-lg border border-white/8 bg-graphite/70 p-8 text-center backdrop-blur-sm">
        <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-lime">
          3D model required
        </p>
        <h3 className="mt-4 font-serif text-3xl text-white">{label}</h3>
        <p className="mt-4 text-sm leading-relaxed text-titanium/80">
          Place a real GLB/GLTF file at this path. The scene is wired and waiting
          — no placeholder geometry is rendered.
        </p>
        <code className="mt-6 block break-all rounded-sm bg-obsidian px-4 py-3 font-mono text-xs text-titanium">
          public{path}
        </code>
      </div>
    </div>
  );
}
