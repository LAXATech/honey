import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Leaf,
  Droplets,
  Hexagon,
  Check,
  Play,
  Star,
  Heart,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  ShieldCheck,
  FlaskConical,
  Package,
  Sprout,
} from "lucide-react";

import logo from "@/assets/logo.png";
import vMulti from "@/assets/v-multiflower.jpg";
import vLeaf from "@/assets/v-leaf.png";
import vKombu from "@/assets/v-kombu.jpg";
import vForest from "@/assets/v-forest.jpg";
import vMurungai from "@/assets/v-murungai.png";
import vStingless from "@/assets/v-stingless.jpg";
import pBeebox from "@/assets/p-beebox.jpg";
import pEquip from "@/assets/p-equipment.jpg";
import pBees from "@/assets/p-bees.jpg";
import pTraining from "@/assets/p-training.jpg";
import pFeed from "@/assets/p-feed.jpg";
import pTools from "@/assets/p-tools.jpg";
import whyHoney from "@/assets/why-honey.jpg";
import trainingGroup from "@/assets/training-group.jpg";
import bgBee from "@/assets/bg-bee.png";

import { useScrollAnimation, useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Honey — Pure, Natural & Raw Honey and Beekeeping Supplies" },
      {
        name: "description",
        content:
          "100% pure, raw and unprocessed honey straight from nature, plus bee boxes, beekeeping equipment and hands-on training programs.",
      },
      { property: "og:title", content: "Honey — Pure Honey. Pure Life." },
      {
        property: "og:description",
        content:
          "Raw, unprocessed honey varieties and everything beekeepers need — bee boxes, equipment, bees and training.",
      },
    ],
  }),
  component: Index,
});

const varieties = [
  { img: vMulti, t1: "Multi Flower", t2: "Honey", d: "A blend of nectar from various flowers." },
  { img: vLeaf, t1: "Leaf Nectar", t2: "Honey", d: "Nectar collected from natural leaves." },
  { img: vKombu, t1: "Kombu", t2: "Honey", d: "Rare honey with rich aroma and taste." },
  { img: vForest, t1: "Forest", t2: "Honey", d: "Wild honey from deep forest collection." },
  { img: vMurungai, t1: "Murungai", t2: "Honey", d: "Nectar from moringa (drumstick) flowers." },
  { img: vStingless, t1: "Stingless Bee", t2: "Honey", d: "Pure honey from stingless bees." },
];

// WhatsApp click-to-chat: opens a chat with this number with the product
// name pre-filled, e.g. "I need Multi Flower Honey" — the user just hits send.
const WHATSAPP_NUMBER = "916385528481";

function whatsappOrderLink(product: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`I need ${product}`)}`;
}

const supplies = [
  { img: pBeebox, t1: "All Types of", t2: "Bee Box" },
  { img: pEquip, t1: "Bee Farming", t2: "Equipments" },
  { img: pBees, t1: "Bees", t2: "Sales" },
  { img: pTraining, t1: "Training &", t2: "Workshops" },
  { img: pFeed, t1: "Bee Feed &", t2: "Supplements" },
  { img: pTools, t1: "Accessories &", t2: "Tools" },
];

const reasons = [
  { Icon: Hexagon, t: "100% Pure", d: "No additives or preservatives" },
  { Icon: Droplets, t: "Raw & Unprocessed", d: "Retains natural enzymes" },
  { Icon: Sprout, t: "Sustainably Sourced", d: "From trusted beekeepers" },
  { Icon: FlaskConical, t: "Lab Tested", d: "Quality you can trust" },
  { Icon: Package, t: "Packed with Care", d: "Hygienic & eco-friendly packing" },
];

const testimonials = [
  {
    q: "The honey is 100% pure and tastes amazing. You can feel the difference!",
    n: "Arun Kumar",
    c: "Chennai",
  },
  {
    q: "Great quality bee boxes and excellent training sessions. Highly recommended!",
    n: "Priya Chandran",
    c: "Coimbatore",
  },
  {
    q: "Very reliable and trustworthy. My bees are healthy and productive.",
    n: "Suresh Babu",
    c: "Madurai",
  },
];

function footerLinkHref(label: string): string {
  if (label === "Home") return "/";
  if (label === "About Us") return "/about";
  if (label === "Contact Us") return "/contact";
  return "#";
}

function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center text-center transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {eyebrow ? (
        <p className="eyebrow mb-3 flex items-center gap-2 text-gold">
          <Hexagon className="h-3 w-3" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-[2.4rem]">
        {title}
      </h2>
      <span className="gold-rule mt-4" aria-hidden="true" />
    </div>
  );
}

function Index() {
  const [slide, setSlide] = useState(0);
  // "Watch Our Process" button shows a temporary "coming soon" message
  const [processSoon, setProcessSoon] = useState(false);

  // Auto-hide the message after a few seconds
  useEffect(() => {
    if (!processSoon) return;
    const timer = setTimeout(() => setProcessSoon(false), 3000);
    return () => clearTimeout(timer);
  }, [processSoon]);

  const { ref: varietiesRef, visibleItems: varietiesVisible } =
    useStaggeredScrollAnimation<HTMLDivElement>(varieties.length);
  const { ref: suppliesRef, visibleItems: suppliesVisible } =
    useStaggeredScrollAnimation<HTMLDivElement>(supplies.length);
  const { ref: reasonsRef, visibleItems: reasonsVisible } =
    useStaggeredScrollAnimation<HTMLUListElement>(reasons.length);
  const { ref: testimonialsRef, isVisible: testimonialsVisible } =
    useScrollAnimation<HTMLDivElement>();
  // Testimonials carousel: 1 card per view on mobile, 3 on desktop (md+).
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setPerView(mq.matches ? 3 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Keep the active slide within range when the per-view count changes
  // (e.g. rotating a phone back to portrait while on the last card).
  useEffect(() => {
    setSlide((s) => Math.min(s, testimonials.length - perView));
  }, [perView]);
  const { ref: trainingRef, isVisible: trainingVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation<HTMLElement>();

  return (
    // DOUBLE-SCROLLBAR FIX (was `overflow-x-hidden`):
    // `overflow-x: hidden` forced this wrapper into a scroll container — per
    // CSS Overflow L3, when one axis is `hidden` the other axis' `visible`
    // computes to `auto`. The scroll-reveal animations mount below-fold
    // elements at translateY(30px); those transformed boxes extended this
    // wrapper's scrollable overflow area ~30px past its bottom edge, so the
    // wrapper rendered its OWN vertical scrollbar alongside the <html>
    // document scrollbar (two scrollbars, and scrolling the inner one
    // desynced the reveal animations).
    //
    // `overflow-x: clip` clips horizontal overflow WITHOUT creating a scroll
    // container, keeping <html> as the single scroll owner. Reveal animations
    // still work unchanged (IntersectionObserver is unaffected).
    <div className="min-h-screen bg-background text-foreground relative overflow-x-clip">
      {/* Shared announcement bar + navbar (also used by /about and /contact) */}
      <SiteHeader active="Home">
        {/* Hero content */}
        <div className="max-w-xl py-16 md:py-28 hero-content home-hero">
          <div className="hero-entrance" style={{ animationDelay: "0ms" }}>
            <h1 className="font-display text-4xl leading-[1.08] font-semibold sm:text-5xl md:text-6xl">
              Pure Honey.
              <br />
              <span className="text-gold">Pure Life.</span>
            </h1>
          </div>
          <div className="hero-entrance" style={{ animationDelay: "150ms" }}>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-foreground/75 sm:text-base">
              Straight from nature to you. 100% pure, raw and unprocessed honey packed with
              goodness.
            </p>
          </div>

          <div className="hero-entrance" style={{ animationDelay: "300ms" }}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#varieties"
                className="btn-gold inline-flex items-center gap-2 rounded-sm px-6 py-3.5 text-[11px] font-semibold tracking-[0.15em] uppercase"
              >
                Explore Honey
                <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href="#story"
                className="btn-outline-gold inline-flex items-center gap-2 rounded-sm px-6 py-3.5 text-[11px] font-semibold tracking-[0.15em] uppercase"
              >
                Our Story
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
            {/* Mobile only: styled text */}
            <span
              className="request-sample-text mt-4"
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  window.location.href = "/contact";
                }
              }}
            >
              Request Sample
            </span>
          </div>

          <div className="hero-entrance" style={{ animationDelay: "450ms" }}>
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[10px] leading-tight font-medium tracking-wide uppercase">
              {[
                { Icon: Leaf, a: "100%", b: "Pure" },
                { Icon: Hexagon, a: "Natural &", b: "Raw" },
                { Icon: Droplets, a: "Rich in", b: "Nutrients" },
              ].map(({ Icon, a, b }, i) => (
                <li key={a} className="flex items-center gap-2 whitespace-nowrap">
                  {i > 0 ? <span className="h-7 w-px bg-gold/25" aria-hidden="true" /> : null}
                  <Icon className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span className="leading-snug">
                    {a}
                    <br />
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <style>{`
              .hero-entrance {
                opacity: 0;
                transform: translateY(30px);
                animation: heroFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }
              @keyframes heroFadeIn {
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              `}</style>
        </div>
      </SiteHeader>

      <main>
        {/* Varieties */}
        <section id="varieties" className="bg-ink-2 py-16 text-ink-foreground md:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading eyebrow="Our Honey Collection" title="Explore Our Honey Varieties" />
            <div
              ref={varietiesRef}
              className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
            >
              {varieties.map((v, i) => (
                <article
                  key={v.t1}
                  className={`card-lift overflow-hidden rounded-sm border border-gold/20 bg-ink transition-all duration-700 ease-out ${
                    varietiesVisible.has(i)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <img
                    src={v.img}
                    alt={`${v.t1} ${v.t2}`}
                    width={600}
                    height={700}
                    loading="lazy"
                    className="h-44 w-full object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-display text-base leading-snug font-semibold">
                      {v.t1}
                      <br />
                      <span className="underline decoration-gold/60 underline-offset-4">
                        {v.t2}
                      </span>
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink-foreground/60">{v.d}</p>
                    <a
                      href={whatsappOrderLink(`${v.t1} ${v.t2}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold mt-4 inline-flex w-full items-center justify-center gap-2 rounded-sm px-3 py-2 text-[10px] font-semibold tracking-[0.15em] uppercase"
                    >
                      Order Now
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Supplies */}
        <section id="supplies" className="bg-cream py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading title="Everything for Beekeepers" />
            <div
              ref={suppliesRef}
              className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6"
            >
              {supplies.map((s, i) => (
                <article
                  key={s.t2}
                  className={`card-lift flex flex-col items-center rounded-sm border border-border bg-card p-5 text-center transition-all duration-700 ease-out ${
                    suppliesVisible.has(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <img
                    src={s.img}
                    alt={`${s.t1} ${s.t2}`}
                    width={512}
                    height={512}
                    loading="lazy"
                    className="h-24 w-full object-contain"
                  />
                  <h3 className="mt-5 text-sm leading-snug font-medium">
                    {s.t1}
                    <br />
                    <span className="font-semibold">{s.t2}</span>
                  </h3>
                  <a
                    href={whatsappOrderLink(`${s.t1} ${s.t2}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Order ${s.t1} ${s.t2} on WhatsApp`}
                    className="mt-4 grid h-11 w-11 place-items-center rounded-full border border-gold text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
                  >
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why choose */}
        <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
          <img
            src={whyHoney}
            alt="Honey jar with honeycomb and yellow flowers"
            width={900}
            height={600}
            loading="lazy"
            className="absolute inset-y-0 right-0 hidden h-full w-[40%] object-cover lg:block"
          />
          <div
            className="absolute inset-0 hidden bg-[linear-gradient(90deg,var(--ink)_50%,transparent_85%)] lg:block"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-20">
            <div className="lg:max-w-[62%]">
              <SectionHeading title="Why Choose Our Honey?" />
              <ul
                ref={reasonsRef}
                className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5"
              >
                {reasons.map(({ Icon, t, d }, i) => (
                  <li
                    key={t}
                    className={`px-2 text-center transition-all duration-700 ease-out ${
                      i > 0 ? "lg:border-l lg:border-gold/20" : ""
                    } ${reasonsVisible.has(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <Icon className="mx-auto h-7 w-7 text-gold" aria-hidden="true" />
                    <h3 className="mt-3 text-sm font-semibold">{t}</h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-ink-foreground/60">{d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Honey collection — original image on the left, text on the right.
            overflow-hidden here is the safeguard that keeps the absolutely
            positioned bee artwork from ever widening the page (no horizontal
            scroll on any breakpoint). */}
        <section id="story" className="relative overflow-hidden bg-cream">
          <div
            ref={trainingRef}
            className="mx-auto grid max-w-7xl grid-cols-1 items-stretch lg:grid-cols-2 transition-all duration-1000 ease-out"
            style={{
              opacity: trainingVisible ? 1 : 0,
              transform: trainingVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <div className="relative">
              <img
                src={trainingGroup}
                alt="Beekeepers in protective suits carefully collecting honeycomb from hives"
                width={900}
                height={800}
                loading="lazy"
                className="h-64 w-full object-cover sm:h-80 lg:h-full"
              />
            </div>

            <div className="relative flex flex-col justify-center bg-cream px-4 py-12 text-foreground sm:px-10 lg:px-14 lg:py-16">
              <div className="relative">
                <p className="eyebrow text-gold">From Hive to Jar.</p>
                <h2 className="mt-3 font-display text-2xl leading-tight font-semibold sm:text-3xl md:text-[2.1rem]">
                  How We Collect
                  <br />
                  Our Pure Honey
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                  Every jar begins in the wild. Our beekeepers follow a gentle, traditional process
                  that keeps the bees healthy and the honey raw — exactly as nature made it.
                </p>
                <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 text-xs sm:grid-cols-2 sm:text-sm">
                  {[
                    "Wild Forest Nectar Gathering",
                    "Gentle, Bee-Safe Harvesting",
                    "Cold-Filtered & Never Heated",
                    "Lab-Tested Before Packing",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setProcessSoon(true)}
                  className="btn-gold mt-8 inline-flex items-center gap-2 rounded-sm px-6 py-3.5 text-[11px] font-semibold tracking-[0.15em] uppercase"
                >
                  Watch Our Process
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* "Coming soon" toast for the process video */}
            {processSoon ? (
              <div
                role="status"
                className="fixed bottom-6 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-sm border border-gold/40 bg-card px-5 py-3 text-sm shadow-xl"
              >
                <Hexagon className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                Our process video is coming soon — stay tuned!
              </div>
            ) : null}
          </div>

          {/* Decorative bee artwork — positioned relative to the full
              section so right-0 pins it to the true right edge. */}
          <img
            src={bgBee}
            alt=""
            aria-hidden="true"
            width={1327}
            height={2400}
            loading="lazy"
            className="pointer-events-none absolute -bottom-6 right-0 z-10 h-auto w-auto max-w-[220px] opacity-25 invert mix-blend-multiply lg:max-w-[300px]"
          />
        </section>

        {/* Testimonials */}
        <section className="bg-secondary py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading title="What Our Customers Say" />
            {/* Sliding carousel: the dots switch the active testimonial.
                The track translates by -100% per slide so exactly one
                testimonial is visible at a time on every screen size. */}
            <div
              ref={testimonialsRef}
              className="mt-10 transition-all duration-1000 ease-out"
              style={{
                opacity: testimonialsVisible ? 1 : 0,
                transform: testimonialsVisible ? "translateY(0)" : "translateY(30px)",
              }}
            >
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${(slide * 100) / perView}%)` }}
                >
                  {testimonials.map((t) => (
                    <figure key={t.n} className="w-full shrink-0 px-1 md:w-1/3">
                      <div className="card-lift h-full rounded-sm border border-border bg-card p-6 text-center sm:p-8">
                        <blockquote className="text-xs leading-relaxed text-muted-foreground italic sm:text-sm">
                          &ldquo;{t.q}&rdquo;
                        </blockquote>
                        <div className="mt-4 flex justify-center gap-1 text-gold">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <Star key={s} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                          ))}
                        </div>
                        <figcaption className="mt-4 flex items-center justify-center gap-3">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/20 text-xs font-semibold text-foreground">
                            {t.n.charAt(0)}
                          </span>
                          <span className="min-w-0 text-left">
                            <span className="block truncate text-xs font-semibold">{t.n}</span>
                            <span className="block text-[11px] text-muted-foreground">{t.c}</span>
                          </span>
                        </figcaption>
                      </div>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
            {/* Dots are only needed on mobile where a single card is shown */}
            <div className="mt-8 flex justify-center gap-3 md:hidden">
              {testimonials.map((t, i) => (
                <button
                  key={t.n}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === slide}
                  onClick={() => setSlide(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    i === slide ? "bg-gold" : "bg-border hover:bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        ref={footerRef}
        className="bg-ink text-ink-foreground transition-all duration-1000 ease-out"
        style={{
          opacity: footerVisible ? 1 : 0,
          transform: footerVisible ? "translateY(0)" : "translateY(30px)",
        }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-4 py-14 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <img
              src={logo}
              alt="Honey logo"
              width={56}
              height={56}
              className="h-12 w-12"
              loading="lazy"
            />
            <p className="mt-2 font-display text-lg font-semibold tracking-[0.18em]">HONEY</p>
            <p className="mt-3 text-[11px] leading-relaxed text-ink-foreground/60">
              Pure honey, Pure life. Our mission is to bring nature's sweetness to your life while
              supporting beekeepers and sustainable beekeeping.
            </p>
            <div className="mt-4 flex gap-3 text-ink-foreground/70">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-11 w-11 place-items-center transition-colors hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              h: "Quick Links",
              items: ["Home", "About Us", "Products", "Bee Farming", "Training", "Contact Us"],
            },
            {
              h: "Our Products",
              items: [
                "Multi Flower Honey",
                "Leaf Nectar Honey",
                "Kombu Honey",
                "Forest Honey",
                "Murungai Honey",
                "Stingless Bee Honey",
              ],
            },
            {
              h: "Bee Farming",
              items: ["Bee Boxes", "Equipments", "Bees Sales", "Bee Feed", "Accessories"],
            },
            {
              h: "Support",
              items: [
                "Shipping & Delivery",
                "Return Policy",
                "Terms & Conditions",
                "Privacy Policy",
                "FAQ",
              ],
            },
          ].map((col) => (
            <nav key={col.h}>
              <h3 className="font-display text-sm font-semibold">{col.h}</h3>
              <ul className="mt-4 space-y-2 text-[11px] text-ink-foreground/60">
                {col.items.map((it) => (
                  <li key={it}>
                    <a href={footerLinkHref(it)} className="transition-colors hover:text-gold">
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-display text-sm font-semibold">Newsletter</h3>
            <p className="mt-4 text-[11px] leading-relaxed text-ink-foreground/60">
              Subscribe to get updates on new products and offers.
            </p>
            <form
              className="mt-4 flex overflow-hidden rounded-sm border border-gold/40"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                required
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-[11px] outline-none placeholder:text-ink-foreground/40"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="btn-gold grid h-11 w-11 shrink-0 place-items-center"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
            <div className="mt-6 flex items-center gap-2 text-gold/70">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <span className="text-[11px]">Secure &amp; trusted checkout</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/15">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-[11px] text-ink-foreground/50 sm:flex-row sm:justify-between">
            <p>© 2026 Honey. All Rights Reserved.</p>
            <p className="flex items-center gap-1">
              Designed with <Heart className="h-3 w-3 fill-current text-destructive" /> for nature
              lovers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
