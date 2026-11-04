import { cn } from "@/lib/cn";

export function LoadingIndicator({
  label = "Composing the scene",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-10 flex items-center justify-center bg-obsidian/80",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-12 w-12">
          <span className="absolute inset-0 rounded-full border border-titanium/20" />
          <span className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-lime" />
        </div>
        <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-titanium/70">
          {label}
        </p>
      </div>
    </div>
  );
}
