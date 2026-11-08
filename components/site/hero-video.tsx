"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap-client";

export function HeroVideo() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // GSAP Choreographed Entrance
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });

      // Video frame reveal with cinematic scale & shadow
      if (videoCardRef.current) {
        tl.fromTo(
          videoCardRef.current,
          { opacity: 0, scale: 0.95, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: "power2.out" },
          0
        );
      }

      // Eyebrow
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.2
        );
      }

      // Headline
      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1.1 },
          0.35
        );
      }

      // Supporting Copy
      if (copyRef.current) {
        tl.fromTo(
          copyRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.55
        );
      }

      // CTAs
      if (ctaRef.current?.children) {
        tl.fromTo(
          Array.from(ctaRef.current.children),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
          0.75
        );
      }

      // Subtle scroll indicator reveal and gentle float
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          1.1
        );

        gsap.to(scrollIndicatorRef.current, {
          y: 6,
          repeat: -1,
          yoyo: true,
          duration: 1.6,
          ease: "power1.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      ref={containerRef}
      id="story"
      className="relative flex min-h-[100svh] w-full scroll-mt-20 items-center overflow-hidden bg-obsidian px-5 pb-16 pt-24 sm:px-8 md:px-10 lg:px-12 lg:pb-20 lg:pt-28"
    >
      {/* Ambient background atmosphere - subtle luxury lighting without neon overkill */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(217,255,63,0.035),transparent_65%)] blur-3xl" />
        <div className="absolute right-[-5%] top-[20%] h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(184,189,197,0.04),transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(8,9,11,0.6)_0%,rgba(8,9,11,1)_100%)]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
        {/* LEFT COLUMN: AUREON branding, headline, copy & CTAs */}
        <div className="flex flex-col justify-center lg:col-span-5 xl:col-span-5">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_8px_rgba(217,255,63,0.9)]" />
            <p
              ref={eyebrowRef}
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.42em] text-lime"
            >
              Engineered for Immersion
            </p>
          </div>

          {/* Main Headline */}
          <h1
            ref={headlineRef}
            className="mt-6 font-serif text-[13vw] font-normal uppercase leading-[0.88] tracking-tight text-white sm:text-[10vw] md:text-[5.4rem] lg:text-[4.6rem] xl:text-[5.4rem]"
          >
            Sound.
            <br />
            Without
            <br />
            limits.
          </h1>

          {/* Supporting Copy */}
          <p
            ref={copyRef}
            className="mt-6 max-w-lg text-base font-light leading-relaxed text-titanium/80 sm:text-lg lg:mt-8"
          >
            A new dimension of listening. Two acoustic instruments crafted in
            uncompromising titanium and acoustic ceramics. Experience pure,
            uncompromised fidelity.
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="mt-8 flex flex-wrap items-center gap-4 sm:gap-5 lg:mt-10"
          >
            <Link
              href="/products/nova"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-lime px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-obsidian shadow-[0_0_24px_rgba(217,255,63,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_32px_rgba(217,255,63,0.6)] focus:outline-none focus:ring-2 focus:ring-lime"
            >
              <span>Explore NOVA</span>
            </Link>

            <Link
              href="/products/pulse"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-titanium/30 bg-graphite/40 px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-lime hover:text-lime focus:outline-none focus:ring-2 focus:ring-titanium"
            >
              <span>Discover PULSE</span>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div
            ref={scrollIndicatorRef}
            className="mt-12 hidden items-center gap-3 text-titanium/50 lg:flex"
          >
            <span className="h-px w-8 bg-titanium/25" />
            <span className="font-sans text-[10px] uppercase tracking-[0.3em]">
              Scroll to explore instruments
            </span>
            <svg
              className="h-3 w-3 text-lime"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* RIGHT COLUMN: Large Immersive Cinematic Brand Film */}
        <div className="relative w-full lg:col-span-7 xl:col-span-7">
          {/* Soft ambient back-glow for depth */}
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(217,255,63,0.06),transparent_70%)] blur-2xl" />

          <div
            ref={videoCardRef}
            className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-titanium/20 bg-graphite/60 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/5 sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[16/10] xl:aspect-[16/9.5]"
          >
            {/* The Brand Video */}
            <video
              ref={videoRef}
              src="/videos/AUREON.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />

            {/* Subtle Luxury Overlays for contrast & elegance */}
            <div className="pointer-events-none absolute inset-0 bg-black/15" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent" />
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.5)]" />

            {/* Top Badging / Film Tag */}
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-6">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-obsidian/60 px-3 py-1 backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-white">
                  Brand Film
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-widest text-titanium/60">
                4K HDR · 60 FPS
              </span>
            </div>

            {/* Bottom Controls & Audio Atelier Metadata */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
              <div className="space-y-1">
                <p className="font-serif text-lg text-white sm:text-xl">
                  AUREON Acoustic Atelier
                </p>
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-titanium/70">
                  Visual Architecture & Material Study
                </p>
              </div>

              {/* Play / Pause Toggle Button */}
              <button
                type="button"
                onClick={togglePlayback}
                aria-label={isPlaying ? "Pause brand video" : "Play brand video"}
                className="group/btn flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-obsidian/70 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-lime hover:text-lime focus:outline-none"
              >
                {isPlaying ? (
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg
                    className="ml-0.5 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
