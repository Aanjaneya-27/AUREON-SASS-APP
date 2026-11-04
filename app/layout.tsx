import type { Metadata } from "next";
import { Cormorant_Garamond, Geist_Mono, Outfit } from "next/font/google";
import { Suspense } from "react";
import { CartDrawer } from "@/components/site/cart-drawer";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AUREON — Engineered for Immersion",
    template: "%s — AUREON",
  },
  description:
    "Premium luxury audio. Explore AUREON NOVA headphones and PULSE wireless earbuds in interactive 3D.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-obsidian text-titanium">
        <CartProvider>
          <Suspense fallback={null}>
            <SiteHeader />
          </Suspense>
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
