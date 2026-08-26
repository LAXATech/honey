import { createFileRoute } from "@tanstack/react-router";
import {
  Leaf,
  Droplets,
  Hexagon,
  Sprout,
  FlaskConical,
  Package,
  Heart,
  Users,
  Award,
  Truck,
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

import logo from "@/assets/logo.png";
import trainingGroup from "@/assets/training-group.jpg";

import { useScrollAnimation, useStaggeredScrollAnimation } from "@/hooks/useScrollAnimation";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Honey: Pure, Natural & Raw Honey" },
      {
        name: "description",
        content:
          "Learn about Honey's mission to bring 100% pure, raw honey from nature to your table while supporting sustainable beekeeping practices.",
      },
      { property: "og:title", content: "About Us — Honey" },
      {
        property: "og:description",
        content: "Our story, values, and commitment to pure honey and sustainable beekeeping.",
      },
    ],
  }),
  component: About,
});

const values = [
  {
    Icon: Hexagon,
    title: "100% Pure",
    desc: "No additives, no preservatives, no compromises. Just honey as nature intended.",
  },
  {
    Icon: Droplets,
    title: "Raw & Unprocessed",
    desc: "Never heated above hive temperature. All natural enzymes and nutrients preserved.",
  },
  {
    Icon: Sprout,
    title: "Sustainably Sourced",
    desc: "Partnering with ethical beekeepers who prioritize bee welfare and biodiversity.",
  },
  {
    Icon: FlaskConical,
    title: "Lab Tested",
    desc: "Every batch tested for purity, moisture content, and absence of contaminants.",
  },
  {
    Icon: Package,
    title: "Eco-Friendly Packaging",
    desc: "Glass jars, recyclable materials, and minimal waste in every shipment.",
  },
  {
    Icon: Heart,
    title: "Community First",
    desc: "Supporting local beekeeping communities with fair prices and training programs.",
  },
];

const team = [
  { name: "Rajesh Kumar", role: "Founder & Master Beekeeper", exp: "25+ years", img: "RK" },
  { name: "Dr. Priya Sharma", role: "Food Scientist & Quality Head", exp: "15+ years", img: "PS" },
  { name: "Arun Patel", role: "Operations & Supply Chain", exp: "12+ years", img: "AP" },
  { name: "Meera Nair", role: "Community & Training Lead", exp: "10+ years", img: "MN" },
];

const milestones = [
  {
    year: "2010",
    title: "Started with 50 Hives",
    desc: "Began as a small family apiary in the Western Ghats",
  },
  {
    year: "2014",
    title: "First Organic Certification",
    desc: "Achieved certified organic status for all honey varieties",
  },
  {
    year: "2018",
    title: "Launched Training Center",
    desc: "Opened beekeeping school to share knowledge with next generation",
  },
  {
    year: "2021",
    title: "Expanded to 500+ Beekeepers",
    desc: "Built network of ethical beekeepers across South India",
  },
  {
    year: "2024",
    title: "1 Million Jars Delivered",
    desc: "Reached milestone of delivering pure honey to homes nationwide",
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

function About() {
  const { ref: valuesRef, visibleItems: valuesVisible } =
    useStaggeredScrollAnimation<HTMLUListElement>(values.length);
  const { ref: teamRef, visibleItems: teamVisible } = useStaggeredScrollAnimation<HTMLDivElement>(
    team.length,
  );
  const { ref: milestonesRef, visibleItems: milestonesVisible } =
    useStaggeredScrollAnimation<HTMLDivElement>(milestones.length);
  const { ref: storyRef, isVisible: storyVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation<HTMLElement>();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Shared announcement bar + navbar (same as home and contact) */}
      <SiteHeader active="About Us">
        {/* Hero content */}
        <div className="max-w-xl py-16 md:py-28 hero-content about-hero">
          <div className="hero-entrance" style={{ animationDelay: "0ms" }}>
            <p className="eyebrow text-gold mb-4">Our Story</p>
            <h1 className="font-display text-4xl leading-[1.08] font-semibold sm:text-5xl md:text-6xl">
              Pure Honey,
              <br />
              <span className="text-gold">Pure Purpose.</span>
            </h1>
          </div>
          <div className="hero-entrance" style={{ animationDelay: "200ms" }}>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-foreground/75 sm:text-base">
              From a small family apiary to a trusted name in pure honey — our journey is built on
              respect for bees, nature, and the beekeepers who make it all possible.
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
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      </SiteHeader>

      <main>
        {/* Our Story */}
        <section id="story" className="bg-cream py-16 md:py-20">
          <div
            ref={storyRef}
            className="mx-auto max-w-7xl px-4 transition-all duration-1000 ease-out"
            style={{
              opacity: storyVisible ? 1 : 0,
              transform: storyVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src={trainingGroup}
                  alt="Beekeeper inspecting hive frames in sunny apiary"
                  width={800}
                  height={600}
                  loading="lazy"
                  className="rounded-sm w-full h-auto object-cover shadow-card"
                />
                <div className="absolute bottom-4 left-4 bg-gold p-4 rounded-sm sm:-bottom-6 sm:-left-6 sm:p-6 sm:p-8">
                  <div className="flex items-center gap-3 text-primary-foreground">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-primary-foreground/20">
                      <Leaf className="h-6 w-6 text-gold" />
                    </div>
                    <div>
                      <p className="font-display text-xl font-semibold">Since 2010</p>
                      <p className="text-sm opacity-80">Serving Pure Honey</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <SectionHeading eyebrow="Who We Are" title="Our Journey from Hive to Home" />
                <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <p>
                    Honey began in 2010 as a modest family apiary nestled in the biodiverse Western
                    Ghats. What started with 50 hives and a deep respect for the craft of beekeeping
                    has grown into a network of over 500 ethical beekeepers across South India.
                  </p>
                  <p>
                    Every jar of honey we sell tells a story — of wildflowers blooming in untouched
                    forests, of bees dancing from blossom to blossom, of beekeepers who wake before
                    dawn to tend their colonies with care. We believe honey should be exactly as
                    nature made it: raw, unheated, unfiltered, and full of life.
                  </p>
                  <p>
                    Today, we're proud to bring you six distinct honey varieties, each with its own
                    unique flavor profile reflecting the terroir of its origin. But our mission
                    remains the same: pure honey, pure life — for you, for the bees, and for the
                    planet.
                  </p>
                </div>
                <a
                  href="/contact"
                  className="btn-gold mt-8 inline-flex items-center gap-2 rounded-sm px-6 py-3.5 text-[11px] font-semibold tracking-[0.15em] uppercase"
                >
                  Visit Our Apiary
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section id="mission" className="bg-ink text-ink-foreground py-16 md:py-20">
          <div
            ref={missionRef}
            className="mx-auto max-w-7xl px-4 transition-all duration-1000 ease-out"
            style={{
              opacity: missionVisible ? 1 : 0,
              transform: missionVisible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-3 gap-8">
              <article className="text-center p-6">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">Our Mission</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-foreground/70">
                  To deliver 100% pure, raw honey from ethical sources to every home, while
                  empowering beekeepers and protecting pollinator populations for future
                  generations.
                </p>
              </article>
              <article className="text-center p-6 border-l border-r border-gold/20 lg:border-l lg:border-r lg:border-t-0 lg:border-b-0">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">Our Vision</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-foreground/70">
                  A world where every spoonful of honey supports thriving bee communities,
                  sustainable agriculture, and the wellbeing of people who cherish nature's gifts.
                </p>
              </article>
              <article className="text-center p-6">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">Our Promise</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-foreground/70">
                  Every jar is traceable to its source, tested for purity, and packed with
                  integrity. If it doesn't meet our standards, it doesn't leave our facility.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-background py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading eyebrow="Our Principles" title="Values That Guide Everything We Do" />
            <ul
              ref={valuesRef}
              className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {values.map(({ Icon, title, desc }, i) => (
                <li
                  key={title}
                  className={`card-lift rounded-sm border border-border bg-card p-6 transition-all duration-700 ease-out ${
                    valuesVisible.has(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <Icon className="h-7 w-7 text-gold mb-4" aria-hidden="true" />
                  <h3 className="font-display text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Team */}
        <section className="bg-secondary py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading eyebrow="Meet the Team" title="The People Behind the Honey" />
            <div
              ref={teamRef}
              className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {team.map(({ name, role, exp, img }, i) => (
                <article
                  key={name}
                  className={`card-lift rounded-sm border border-border bg-card overflow-hidden text-center transition-all duration-700 ease-out ${
                    teamVisible.has(i) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="aspect-square bg-gold/10 flex items-center justify-center">
                    <div className="grid h-24 w-24 place-items-center rounded-full bg-gold/20 text-3xl font-semibold text-gold">
                      {img}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-semibold">{name}</h3>
                    <p className="mt-1 text-xs text-gold font-medium">{role}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{exp} experience</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="bg-cream py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHeading eyebrow="Our Journey" title="Milestones Along the Way" />
            <div ref={milestonesRef} className="mt-10 relative">
              <div
                className="absolute left-4 top-0 bottom-0 w-0.5 bg-gold/20 hidden lg:block"
                aria-hidden="true"
              />
              {milestones.map(({ year, title, desc }, i) => (
                <div
                  key={year}
                  className={`relative pl-12 pb-10 lg:pl-16 transition-all duration-700 ease-out ${
                    milestonesVisible.has(i)
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="absolute left-4 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-gold text-primary-foreground text-xs font-semibold lg:left-8">
                    {year}
                  </div>
                  <div className="bg-card rounded-sm border border-border p-5">
                    <h3 className="font-display text-base font-semibold">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ink text-ink-foreground py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-2xl leading-tight font-semibold sm:text-3xl md:text-4xl">
              Ready to Experience Pure Honey?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-foreground/70">
              Explore our collection of raw, unprocessed honey varieties — each with its own unique
              story from hive to jar.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="/"
                className="btn-gold inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-[11px] font-semibold tracking-[0.15em] uppercase"
              >
                Shop Our Honey
                <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href="/contact"
                className="btn-outline-gold inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-[11px] font-semibold tracking-[0.15em] uppercase"
              >
                Get in Touch
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
              {["Our Story", "Our Values", "Meet the Team", "Sustainability", "Careers"].map(
                (it) => (
                  <li key={it}>
                    <a href="#" className="transition-colors hover:text-gold">
                      {it}
                    </a>
                  </li>
                ),
              )}
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
                  <a href="#" className="transition-colors hover:text-gold">
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
