import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Hexagon,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Send,
  Check,
  MessageSquare,
  Truck,
  Users,
} from "lucide-react";

import logo from "@/assets/logo.png";
import trainingGroup from "@/assets/training-group.jpg";

import { useScrollAnimation, useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Honey: Pure, Natural & Raw Honey" },
      {
        name: "description",
        content:
          "Get in touch with Honey. Questions about our pure raw honey, bee boxes, equipment or training programs? We'd love to hear from you.",
      },
      { property: "og:title", content: "Contact Us — Honey" },
      {
        property: "og:description",
        content: "Reach out to our team for orders, beekeeping support or training enquiries.",
      },
    ],
  }),
  component: Contact,
});

const contactMethods = [
  {
    Icon: MapPin,
    title: "Visit Us",
    lines: ["Nature Honey Apiary & Farm", "Kanniyakumari, Tamil Nadu 629252"],
    action: "Get Directions",
    href: "https://maps.app.goo.gl/MEw1tcpCddTEvoxD6",
    external: true,
  },
  {
    Icon: Phone,
    title: "Call Us",
    lines: ["+91 63855 28481"],
    action: "Call Now",
    href: "tel:+916385528481",
    external: false,
  },
  {
    Icon: Mail,
    title: "Email Us",
    lines: ["hello@honey.in", "support@honey.in"],
    action: "Send Email",
    href: "mailto:hello@honey.in",
    external: false,
  },
  {
    Icon: Clock,
    title: "Working Hours",
    lines: ["Mon – Sat: 9AM – 6PM", "Sunday: Closed"],
    action: null,
    href: null,
    external: false,
  },
];

const departments = [
  {
    Icon: MessageSquare,
    title: "General Enquiries",
    desc: "Questions about our honey varieties, sourcing or story.",
    email: "hello@honey.in",
  },
  {
    Icon: Truck,
    title: "Orders & Shipping",
    desc: "Order status, delivery timelines and return requests.",
    email: "support@honey.in",
  },
  {
    Icon: Users,
    title: "Beekeeping Training",
    desc: "Workshops, courses and hands-on apiary sessions.",
    email: "training@honey.in",
  },
];

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
      <h2 className="font-display text-2xl leading-tight font-semibold sm:text-3xl md:text-[2.4rem]">
        {title}
      </h2>
      <span className="gold-rule mt-4" aria-hidden="true" />
    </div>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const { ref: methodsRef, visibleItems: methodsVisible } =
    useStaggeredScrollAnimation<HTMLUListElement>(contactMethods.length);
  const { ref: departmentsRef, visibleItems: departmentsVisible } =
    useStaggeredScrollAnimation<HTMLDivElement>(departments.length);
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation<HTMLElement>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Shared announcement bar + navbar (same as home and about) */}
      <SiteHeader active="Contact">
        {/* Hero content */}
        <div className="max-w-xl py-16 md:py-28 hero-content contact-hero">
          <div className="hero-entrance" style={{ animationDelay: "0ms" }}>
            <p className="eyebrow text-gold mb-4">Get in Touch</p>
            <h1 className="font-display text-4xl leading-[1.08] font-semibold sm:text-5xl md:text-6xl">
              We&rsquo;d Love to
              <br />
              <span className="text-gold">Hear From You.</span>
            </h1>
          </div>
          <div className="hero-entrance" style={{ animationDelay: "200ms" }}>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-foreground/75 sm:text-base">
              Whether you have a question about our honey, need beekeeping guidance, or want to join
              a training program — our team is here to help.
            </p>
          </div>
          {/* Mobile only: styled text */}
          <span
            className="request-sample-text mt-8"
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
        {/* Contact Methods */}
        <section className="bg-cream py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading eyebrow="Reach Out" title="Ways to Connect With Us" />
            <ul
              ref={methodsRef}
              className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {contactMethods.map(({ Icon, title, lines, action, href, external }, i) => (
                <li
                  key={title}
                  className={`card-lift rounded-sm border border-border bg-card p-6 text-center transition-all duration-700 ease-out ${
                    methodsVisible.has(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold/15 text-gold">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
                  <div className="mt-3 space-y-1 text-sm leading-relaxed text-muted-foreground">
                    {lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  {action && href ? (
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="mt-4 inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-gold uppercase transition-colors hover:underline"
                    >
                      {action}
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Form */}
        <section id="form" className="bg-background py-16 md:py-20">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 lg:grid-cols-2">
            <div
              ref={departmentsRef}
              className={`transition-all duration-1000 ease-out ${
                departmentsVisible.has(0) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <SectionHeading eyebrow="Contact Form" title="Send Us a Message" />
              <div className="mx-auto mt-8 max-w-xl space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Have a question about our honey varieties, bulk orders, or beekeeping training?
                  Fill out the form and we&rsquo;ll get back to you within one business day.
                </p>
              </div>
              <ul className="mx-auto mt-8 max-w-xl space-y-4">
                {departments.map(({ Icon, title, desc, email }, i) => (
                  <li
                    key={title}
                    className={`card-lift flex items-start gap-4 rounded-sm border border-border bg-card p-5 transition-all duration-700 ease-out ${
                      departmentsVisible.has(i + 1) || i === 0
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-semibold">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                      <a
                        href={`mailto:${email}`}
                        className="mt-1 inline-block text-xs font-medium text-gold hover:underline"
                      >
                        {email}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div
              ref={formRef}
              className="transition-all duration-1000 ease-out"
              style={{
                opacity: formVisible ? 1 : 0,
                transform: formVisible ? "translateY(0)" : "translateY(30px)",
              }}
            >
              {submitted ? (
                <div className="mx-auto flex h-full max-w-xl flex-col items-center justify-center rounded-sm border border-border bg-card p-10 text-center shadow-card">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold">
                    <Check className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold">Message Sent!</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Thank you for reaching out. Our team will get back to you within one business
                    day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline-gold mt-8 inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-[11px] font-semibold tracking-[0.15em] uppercase"
                  >
                    Send Another Message
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto max-w-xl space-y-5 rounded-sm border border-border bg-card p-6 shadow-card sm:p-8"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-xs font-medium tracking-wide uppercase"
                      >
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full rounded-sm border border-input bg-background px-3 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/40"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-xs font-medium tracking-wide uppercase"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 ..."
                        className="w-full rounded-sm border border-input bg-background px-3 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-medium tracking-wide uppercase"
                    >
                      Email Address <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-sm border border-input bg-background px-3 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/40"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-1.5 block text-xs font-medium tracking-wide uppercase"
                    >
                      Subject <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      defaultValue=""
                      className="w-full rounded-sm border border-input bg-background px-3 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/40"
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>
                      <option value="general">General Enquiry</option>
                      <option value="order">Order &amp; Shipping</option>
                      <option value="bulk">Bulk / Wholesale Order</option>
                      <option value="training">Beekeeping Training</option>
                      <option value="equipment">Bee Boxes &amp; Equipment</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-medium tracking-wide uppercase"
                    >
                      Message <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="w-full resize-none rounded-sm border border-input bg-background px-3 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/40"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold inline-flex w-full items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-[11px] font-semibold tracking-[0.15em] uppercase"
                  >
                    Send Message
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Map / Visit */}
        <section className="bg-secondary py-16 md:py-20">
          <div
            ref={mapRef}
            className="mx-auto max-w-7xl px-4 transition-all duration-1000 ease-out"
            style={{
              opacity: mapVisible ? 1 : 0,
              transform: mapVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <SectionHeading eyebrow="Visit Our Farm" title="Come See the Hives in Action" />
            <div className="mt-10 overflow-hidden rounded-sm border border-border shadow-card">
              <img
                src={trainingGroup}
                alt="Beekeepers visiting the Honey apiary farm"
                width={1600}
                height={600}
                loading="lazy"
                className="h-64 w-full object-cover sm:h-80"
              />
              <div className="grid grid-cols-1 gap-4 bg-card p-6 sm:grid-cols-3 sm:p-8">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Nature Honey Apiary &amp; Farm, Kanniyakumari, Tamil Nadu 629252
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Farm visits by appointment — Mon–Sat, 9AM–6PM
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Call +91 63855 28481 to book your visit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink text-ink-foreground py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-2xl leading-tight font-semibold sm:text-3xl md:text-4xl">
              Ready to Taste Pure Honey?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-foreground/70">
              Explore our collection of raw, unprocessed honey varieties — delivered straight from
              hive to your home.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="/"
                className="btn-gold inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-[11px] font-semibold tracking-[0.15em] uppercase"
              >
                Shop Our Honey
                <Hexagon className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href="/about"
                className="btn-outline-gold inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-[11px] font-semibold tracking-[0.15em] uppercase"
              >
                Learn About Us
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
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
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
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
          </div>

          <nav>
            <h3 className="font-display text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-[11px] text-ink-foreground/60">
              <li>
                <a href="/about" className="transition-colors hover:text-gold">
                  Our Story
                </a>
              </li>
              <li>
                <a href="/about" className="transition-colors hover:text-gold">
                  Our Values
                </a>
              </li>
              <li>
                <a href="/about" className="transition-colors hover:text-gold">
                  Meet the Team
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-gold">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-gold">
                  Careers
                </a>
              </li>
            </ul>
          </nav>

          <nav>
            <h3 className="font-display text-sm font-semibold">Products</h3>
            <ul className="mt-4 space-y-2 text-[11px] text-ink-foreground/60">
              {[
                "Multi Flower Honey",
                "Forest Honey",
                "Stingless Bee Honey",
                "Bee Boxes",
                "Training Programs",
              ].map((it) => (
                <li key={it}>
                  <a href="/" className="transition-colors hover:text-gold">
                    {it}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav>
            <h3 className="font-display text-sm font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2 text-[11px] text-ink-foreground/60">
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" /> Kanniyakumari, Tamil Nadu
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5" /> +91 63855 28481
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" /> hello@honey.in
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" /> Mon–Sat, 9AM–6PM
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-gold/15">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-[11px] text-ink-foreground/50 sm:flex-row sm:justify-between">
            <p>© 2026 Honey. All Rights Reserved.</p>
            <p>Designed with care for nature lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
