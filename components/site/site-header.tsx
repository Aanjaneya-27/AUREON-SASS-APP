"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useCart } from "@/lib/cart-context";

interface NavItem {
  label: string;
  href: string;
  anchorId?: string;
  category?: string;
  index: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/",
    category: "Luxury Audio Atelier",
    index: "01",
  },
  {
    label: "Headphones",
    href: "/headphones",
    category: "NOVA Over-Ear Instrument",
    index: "02",
  },
  {
    label: "Earbuds",
    href: "/earbuds",
    category: "PULSE Wireless Architecture",
    index: "03",
  },
  {
    label: "Technology",
    href: "/#technology",
    anchorId: "technology",
    category: "Acoustic Engineering",
    index: "04",
  },
  {
    label: "Our Story",
    href: "/#story",
    anchorId: "story",
    category: "Atelier Philosophy",
    index: "05",
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { totalCount, openCart } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Track window scroll for background transition & intersection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync hash on client mount / hash change
  useEffect(() => {
    const handleHashChange = () => {
      setActiveSection(window.location.hash.replace("#", ""));
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Section observer for Home page to dynamically highlight Technology
  useEffect(() => {
    if (pathname !== "/") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveSection("");
      return;
    }

    const sectionIds = ["technology"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            return;
          }
        }
        // If technology is not intersecting and we are near the top, reset section
        if (window.scrollY < 400 && !window.location.hash) {
          setActiveSection("");
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0.1,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Handle smooth navigation
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
      setMobileMenuOpen(false);

      if (item.anchorId) {
        if (pathname === "/") {
          e.preventDefault();
          const target = document.getElementById(item.anchorId);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", `#${item.anchorId}`);
            setActiveSection(item.anchorId);
          }
        } else {
          setActiveSection(item.anchorId);
        }
      } else if (item.href === "/" && pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
        setActiveSection("");
      }
    },
    [pathname],
  );

  const isItemActive = (item: NavItem): boolean => {
    if (item.anchorId) {
      return pathname === "/" && activeSection === item.anchorId;
    }
    if (item.href === "/") {
      return pathname === "/" && !activeSection;
    }
    return pathname === item.href;
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        isScrolled
          ? "border-b border-white/[0.08] bg-obsidian/90 py-3.5 shadow-[0_12px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl md:py-4"
          : "border-b border-white/[0.03] bg-obsidian/30 py-5 backdrop-blur-[3px] md:py-6",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
        {/* Left: Brand Wordmark */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              window.history.pushState(null, "", "/");
              setActiveSection("");
            }
          }}
          className="group relative flex items-center gap-3 focus:outline-none"
          aria-label="AUREON Home"
        >
          <span className="font-serif text-2xl font-medium tracking-[0.32em] text-white transition-all duration-300 group-hover:tracking-[0.36em] md:text-[1.65rem]">
            AUREON
          </span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime/90 shadow-[0_0_8px_rgba(217,255,63,0.8)] transition-transform duration-300 group-hover:scale-125" />
          <span className="hidden border-l border-white/10 pl-3 font-sans text-[9px] uppercase tracking-[0.36em] text-titanium/50 lg:inline-block">
            Atelier
          </span>
        </Link>

        {/* Center Navigation (Desktop) */}
        <nav
          className="hidden items-center gap-8 lg:gap-11 md:flex"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={cn(
                  "group relative py-2 font-sans text-[11px] uppercase tracking-[0.28em] transition-colors duration-300",
                  active
                    ? "font-semibold text-white"
                    : "text-titanium/80 hover:text-white",
                )}
              >
                <span>{item.label}</span>

                {/* Electric lime active underline */}
                {active ? (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-lime shadow-[0_0_8px_rgba(217,255,63,0.7)]" />
                ) : (
                  /* Subtle hover underline */
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-center scale-x-0 rounded-full bg-titanium/40 transition-transform duration-300 group-hover:scale-x-100" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Shopping Bag & Mobile Hamburger */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Shopping Bag Icon with live badge */}
          <button
            type="button"
            onClick={openCart}
            aria-label={`Shopping bag with ${totalCount} items`}
            className="group relative flex h-10 items-center justify-center rounded-full border border-white/10 bg-graphite/30 px-3.5 text-titanium transition-all duration-300 hover:border-lime/50 hover:text-white focus:outline-none"
          >
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>

            {totalCount > 0 ? (
              <span className="ml-2 flex h-4 min-w-[1.1rem] items-center justify-center rounded-full bg-lime px-1 font-mono text-[9px] font-bold text-obsidian shadow-[0_0_8px_rgba(217,255,63,0.7)]">
                {totalCount > 99 ? "99+" : totalCount}
              </span>
            ) : (
              <span className="ml-2 font-mono text-[10px] text-titanium/50">
                0
              </span>
            )}
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-graphite/40 transition-colors duration-300 hover:border-lime/50 md:hidden focus:outline-none"
          >
            <div className="flex h-3.5 w-4 flex-col justify-between">
              <span
                className={cn(
                  "h-[1.5px] w-full rounded-full bg-white transition-all duration-300 ease-out",
                  mobileMenuOpen && "translate-y-[6px] rotate-45 bg-lime",
                )}
              />
              <span
                className={cn(
                  "h-[1.5px] w-3/4 self-end rounded-full bg-lime transition-all duration-300 ease-out group-hover:w-full",
                  mobileMenuOpen && "w-full -translate-y-[6px] -rotate-45 bg-lime",
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Overlay Navigation */}
      <div
        className={cn(
          "fixed inset-0 top-[65px] z-40 flex flex-col justify-between bg-obsidian/95 px-6 pb-12 pt-8 backdrop-blur-2xl transition-all duration-400 ease-out md:hidden",
          mobileMenuOpen
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-3",
        )}
      >
        <div className="flex-1 space-y-2 overflow-y-auto">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-lime">
            Navigation Atelier
          </p>

          <nav className="mt-6 divide-y divide-white/[0.08]" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const active = isItemActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="flex items-center justify-between py-4 group focus:outline-none"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-lime/70">
                        {item.index}
                      </span>
                      <span
                        className={cn(
                          "font-serif text-2xl tracking-wide transition-colors duration-200",
                          active
                            ? "text-white font-medium"
                            : "text-titanium/80 group-hover:text-white",
                        )}
                      >
                        {item.label}
                      </span>
                    </div>
                    {item.category && (
                      <p className="mt-1 pl-7 font-sans text-[9px] uppercase tracking-[0.24em] text-titanium/50">
                        {item.category}
                      </p>
                    )}
                  </div>

                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_8px_rgba(217,255,63,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile Menu Footer */}
        <div className="border-t border-white/[0.08] pt-6">
          <div className="flex items-center justify-between">
            <span className="font-serif text-lg tracking-[0.2em] text-white">
              AUREON
            </span>
            <span className="font-sans text-[9px] uppercase tracking-[0.28em] text-lime">
              Luxury Audio Atelier
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-titanium/60">
            London · Geneva · Tokyo. Private acoustic commissions.
          </p>
        </div>
      </div>
    </header>
  );
}
