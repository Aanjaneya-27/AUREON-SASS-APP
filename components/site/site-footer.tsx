import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/6 bg-obsidian">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="font-serif text-lg tracking-[0.22em] text-white">
          AUREON
        </p>
        <p className="max-w-md text-sm leading-relaxed text-titanium/70">
          Engineered for immersion. Luxury listening instruments, presented in
          cinematic three-dimensional form.
        </p>
        <div className="flex gap-6 font-sans text-[10px] uppercase tracking-[0.28em] text-titanium">
          <Link href="/headphones" className="hover:text-lime">
            Nova
          </Link>
          <Link href="/earbuds" className="hover:text-lime">
            Pulse
          </Link>
        </div>
      </div>
    </footer>
  );
}
