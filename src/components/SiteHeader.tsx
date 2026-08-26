import { useState, useEffect, type ReactNode } from "react";
import { Hexagon, Heart, Truck, Menu, X } from "lucide-react";

import logo from "@/assets/logo.png";
import hero from "@/assets/hero-honey.jpg";

const navLinks = ["Home", "Honey", "Bee Farming", "About Us", "Contact"];

function navHref(label: string): string {
  if (label === "Home") return "/";
  if (label === "Honey") return "/#varieties";
  if (label === "Bee Farming") return "/#supplies";
  if (label === "About Us") return "/about";
  if (label === "Contact") return "/contact";
  return "#";
}

interface SiteHeaderProps {
  active?: string;
  children?: ReactNode;
}

export function SiteHeader({ active = "Home", children }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="bg-gold text-primary-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-1 px-4 py-2 text-center text-[11px] font-medium tracking-wide sm:grid-cols-3 sm:text-left">
          <p className="flex items-center justify-center gap-2 sm:justify-start">
            <Hexagon className="h-3 w-3 shrink-0" aria-hidden="true" />
            100% PURE & NATURAL HONEY
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
                onClick={() => setMenuOpen(true)}
                className="grid h-11 w-11 place-items-center rounded-sm transition-colors hover:text-gold lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </nav>

          {children}
        </div>

        {menuOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-out lg:hidden"
              onClick={closeMenu}
              aria-hidden="true"
            />
            <div
              className="fixed top-0 right-0 z-50 w-full max-w-sm h-full bg-ink text-ink-foreground shadow-xl transform transition-transform duration-300 ease-out lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-between border-b border-gold/20 px-6 py-4">
                <img src={logo} alt="Honey logo" width={40} height={40} className="h-10 w-10" />
                <button
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-sm transition-colors hover:text-gold"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="p-6">
                <ul className="flex flex-col gap-4">
                  {navLinks.map((label) => (
                    <li key={label}>
                      <a
                        href={navHref(label)}
                        onClick={closeMenu}
                        className={`block text-lg font-medium tracking-[0.12em] uppercase transition-colors hover:text-gold ${
                          label === active ? "text-gold" : ""
                        }`}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  onClick={closeMenu}
                  className="btn-gold mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-[11px] font-semibold tracking-[0.15em] uppercase"
                >
                  Request Sample
                </a>
              </nav>
            </div>
          </>
        )}
      </header>
    </>
  );
}
