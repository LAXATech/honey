import { useState, type ReactNode } from "react";
import { Hexagon, Heart, Truck, Menu } from "lucide-react";

import logo from "@/assets/logo.png";
import hero from "@/assets/hero-honey.jpg";

const navLinks = ["Home", "Honey", "Bee Farming", "About Us", "Contact"];

function navHref(label: string): string {
  if (label === "Home") return "/";
  // Section anchors on the home page
  if (label === "Honey") return "/#varieties";
  if (label === "Bee Farming") return "/#supplies";
  if (label === "About Us") return "/about";
  if (label === "Contact") return "/contact";
  return "#";
}

interface SiteHeaderProps {
  /** Nav label to highlight as the current page, e.g. "Home" | "About Us" | "Contact". */
  active?: string;
  /** Page-specific hero content rendered below the shared navbar. */
  children?: ReactNode;
}

/**
 * Shared site header used by every page:
 * 1. Yellow announcement bar
 * 2. Hero banner with background image and the full navbar
 *    (logo, links with active highlighting, search/account/cart, mobile menu)
 *
 * Page content passes its own headline block as `children`.
 */
export function SiteHeader({ active = "Home", children }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-gold text-primary-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-1 px-4 py-2 text-center text-[11px] font-medium tracking-wide sm:grid-cols-3 sm:text-left">
          <p className="flex items-center justify-center gap-2 sm:justify-start">
            <Hexagon className="h-3 w-3 shrink-0" aria-hidden="true" />
            100% PURE &amp; NATURAL HONEY
          </p>
          <p className="hidden items-center justify-center gap-2 sm:flex">
            <Heart className="h-3 w-3 shrink-0" aria-hidden="true" />
            FROM NATURE, WITH LOVE
          </p>
          <p className="hidden items-center justify-end gap-2 sm:flex">
            <Truck className="h-3 w-3 shrink-0" aria-hidden="true" />
            FREE SHIPPING ON ORDERS ABOVE ₹999
          </p>
        </div>
      </div>

      {/* Hero banner + navbar */}
      <header className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <img
          src={hero}
          alt="Golden honey being drizzled into a glass jar surrounded by wildflowers and honeycomb"
          width={1200}
          height={912}
          className="absolute inset-y-0 right-0 h-full w-full object-cover object-right opacity-60 md:w-[62%] md:opacity-100"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,var(--ink)_0%,var(--ink)_34%,transparent_78%)] max-md:bg-[linear-gradient(180deg,var(--ink)_10%,transparent_100%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4">
          {/* Nav */}
          <nav className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-4 lg:grid-cols-[auto_1fr_auto]">
            <a href="/" className="flex min-w-0 items-center">
              <img src={logo} alt="Honey logo" width={56} height={56} className="h-12 w-12" />
            </a>

            <ul className="hidden justify-center gap-8 text-xs font-medium tracking-[0.12em] uppercase lg:flex">
              {navLinks.map((label) => (
                <li key={label}>
                  <a
                    href={navHref(label)}
                    className={`flex items-center gap-1 pb-1 transition-colors hover:text-gold ${
                      label === active ? "border-b-2 border-gold text-gold" : ""
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex shrink-0 items-center gap-3 justify-self-end sm:gap-4">
              <a
                href="/contact"
                className="btn-gold hidden md:inline-flex items-center justify-center rounded-sm px-4 py-3.5 text-[10px] font-semibold tracking-[0.15em] uppercase md:px-5 md:text-[11px]"
              >
                Request Sample
              </a>
              <button
                aria-label="Menu"
                onClick={() => setMenuOpen((v) => !v)}
                className="grid h-11 w-11 place-items-center rounded-sm transition-colors hover:text-gold lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </nav>

          {menuOpen ? (
            <ul className="flex flex-col gap-3 border-t border-gold/20 py-4 text-xs tracking-[0.12em] uppercase lg:hidden">
              {navLinks.map((label) => (
                <li key={label}>
                  <a
                    href={navHref(label)}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-2 transition-colors hover:text-gold ${label === active ? "text-gold" : ""}`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          {/* Page-specific hero content */}
          {children}
        </div>
      </header>
    </>
  );
}
