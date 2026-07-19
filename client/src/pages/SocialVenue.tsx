/**
 * Luna Sea Marine — Social Venue Page
 * Design: Coastal Modernism
 * Deep Navy + Brass + Ivory | Playfair Display + DM Sans
 * Target: Families, couples, and friend groups for leisure charters
 */

import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Image CDN URLs ───────────────────────────────────────────────────────────
const IMAGES = {
  heroBg: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/new_homepage_hero_53b95ece.png",
  heroSunset: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/hero_sunset-3CfVwAu7r47R25P8yyUrge.webp",
  salon: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8276_22c05a58.jpg",
  stateroom: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8293_f0a2b0b1.jpg",
  galley: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8272_3c7fce3a.jpg",
  bathroom: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8270_926e37c0.jpg",
  cockpit4: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/cockpitimage4_9458350e.jpg",
  cockpit5: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/cockpitimage5_a6837624.jpg",
  boat1: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8289_bc046952.JPEG",
  boat2: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8290_01cfc281.JPEG",
  marina1: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/b1_814d2b40.jpg",
  marina2: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/b5_f98c1238.jpg",
  pwmAerial: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/pwm_aerial_summer_72822424.jpg",
  // Social / family moments
  fatherSonFishing: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/Fatherandsonfishing_a1fe06ce.png",
  momWithKids: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/ChatGPTImageMar10,2026,04_22_24PM_38e85d33.png",
  womanSunbathing: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/womansunbathing_db283775.png",
};

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: scrolled ? "oklch(0.10 0.04 240 / 0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(0.72 0.12 75 / 0.2)" : "none",
        padding: scrolled ? "0.75rem 0" : "1.5rem 0",
      }}
    >
      <div className="container flex items-center justify-between">
        <a href="/" className="flex flex-col leading-none">
          <div className="flex items-center gap-2">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/luna_sea_marine_logo-5yYTbKz7zrmVitDLMtP6Qb.webp"
              alt="Luna Sea Marine logo"
              style={{ width: "32px", height: "32px", objectFit: "contain" }}
            />
            <div className="flex flex-col leading-none">
              <span
                className="text-white font-display font-bold tracking-wide"
                style={{ fontSize: "1.15rem", letterSpacing: "0.02em" }}
              >
                Luna Sea
              </span>
              <span
                className="font-body font-light tracking-widest uppercase"
                style={{ fontSize: "0.6rem", letterSpacing: "0.22em", color: "oklch(0.72 0.12 75)" }}
              >
                Marine
              </span>
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Our Packages", id: "packages" },
            { label: "The Experience", id: "experience" },
            { label: "The Vessel", id: "vessel-features" },
            { label: "FAQ", id: "faq" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="nav-link text-white/85 hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ))}
          <a
            href="/"
            className="text-white/60 hover:text-white transition-colors font-body"
            style={{ fontSize: "0.85rem" }}
          >
            ← Business Venue
          </a>
          <button
            onClick={() => scrollTo("inquiry")}
            className="btn-brass"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}
          >
            Book Now
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className="block h-px bg-white transition-all" style={{ transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }} />
            <span className="block h-px bg-white transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="block h-px bg-white transition-all" style={{ transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }} />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-navy-dark border-t border-white/10">
          <div className="container py-4 flex flex-col gap-4">
            {[
              { label: "Our Packages", id: "packages" },
              { label: "The Experience", id: "experience" },
              { label: "The Vessel", id: "vessel-features" },
              { label: "FAQ", id: "faq" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-white/85 text-left font-body font-medium py-1"
              >
                {item.label}
              </button>
            ))}
            <a href="/" className="text-white/50 font-body text-sm py-1">← Back to Business Venue</a>
            <button onClick={() => scrollTo("inquiry")} className="btn-brass mt-2 self-start">
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-end"
      style={{
        backgroundImage: `url(${IMAGES.heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
      }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.10 0.04 240 / 0.35) 0%, oklch(0.10 0.04 240 / 0.75) 60%, oklch(0.10 0.04 240 / 0.95) 100%)",
        }}
      />

      <div className="container relative z-10 pb-20 pt-40">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10" style={{ background: "oklch(0.72 0.12 75)" }} />
          <span
            className="font-body font-medium uppercase tracking-widest"
            style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "oklch(0.72 0.12 75)" }}
          >
            Social Charter · Prince William Marina · Woodbridge, VA
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display font-bold text-white mb-6"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 1.08 }}
        >
          Your Perfect Day
          <br />
          <span style={{ color: "oklch(0.72 0.12 75)" }}>On the Water</span>
        </h1>

        <p
          className="text-white/75 font-body leading-relaxed mb-10 max-w-xl"
          style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}
        >
          Charter a 41'9" Sea Ray 390 Motor Yacht on the Occoquan River for
          family adventures, romantic getaways, and unforgettable outings with
          friends. Every voyage is captain-hosted — you just relax and enjoy.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-brass"
          >
            Book Your Charter
          </button>
          <button
            onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-outline-brass"
          >
            View Packages
          </button>
        </div>

        {/* Stats bar */}
        <div
          className="mt-16 flex flex-wrap gap-8 pt-8"
          style={{ borderTop: "1px solid oklch(0.72 0.12 75 / 0.25)" }}
        >
          {[
            { value: "Up to 8", label: "Guests" },
            { value: "41'9\"", label: "Motor Yacht" },
            { value: "3–8 hrs", label: "Charter Duration" },
            { value: "Captain-Hosted", label: "Every Voyage" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span
                className="font-display font-bold"
                style={{ fontSize: "1.5rem", color: "oklch(0.72 0.12 75)" }}
              >
                {stat.value}
              </span>
              <span
                className="font-body uppercase tracking-widest text-white/50"
                style={{ fontSize: "0.65rem", letterSpacing: "0.18em" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="font-body uppercase tracking-widest" style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}>
          Scroll
        </span>
        <div className="w-px h-8 bg-white/20" />
      </div>
    </section>
  );
}

// ─── Occasion Strip ───────────────────────────────────────────────────────────
function OccasionStrip() {
  const occasions = [
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Family Adventures",
      desc: "Create lasting memories with the kids on the Occoquan River. Fishing, swimming, and exploring — all from the comfort of a luxury yacht.",
    },
    {
      icon: "💑",
      title: "Romantic Getaways",
      desc: "Celebrate anniversaries, birthdays, or simply a special evening together with a private sunset cruise on the water.",
    },
    {
      icon: "🥂",
      title: "Friends & Groups",
      desc: "Reunions, birthday parties, bachelorette celebrations — bring your crew aboard for an experience no restaurant or bar can match.",
    },
    {
      icon: "🎉",
      title: "Special Occasions",
      desc: "Graduations, retirements, holiday gatherings — mark life's milestones with something truly extraordinary.",
    },
  ];

  return (
    <section className="bg-ivory py-16">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-stagger">
          {occasions.map((item) => (
            <div
              key={item.title}
              className="p-6 bg-white"
              style={{ borderTop: "3px solid oklch(0.72 0.12 75)" }}
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-display font-bold text-navy mb-3" style={{ fontSize: "1.1rem" }}>
                {item.title}
              </h3>
              <p className="text-navy/60 font-body leading-relaxed" style={{ fontSize: "0.875rem" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Packages Section ─────────────────────────────────────────────────────────
function PackagesSection() {
  const packages = [
    {
      name: "Sunset Cruise",
      duration: "3 Hours",
      price: "$750 – $900",
      tagline: "The perfect evening escape",
      description:
        "Watch the sun dip below the Virginia treeline from the water. Perfect for couples, small families, or a relaxed evening with close friends.",
      includes: [
        "3-hour captain-hosted cruise",
        "Up to 8 guests",
        "Occoquan River & Potomac access",
        "Complimentary soft drinks & water",
        "Bluetooth audio system",
        "Swim platform access",
      ],
      ideal: "Couples, anniversaries, small families",
      icon: "🌅",
      featured: false,
    },
    {
      name: "Half-Day Social",
      duration: "4 Hours",
      price: "$1,000 – $1,400",
      tagline: "More time, more memories",
      description:
        "Four hours of open water, sunshine, and good company. Swim, fish, explore the river, or simply cruise and relax with your group.",
      includes: [
        "4-hour captain-hosted charter",
        "Up to 8 guests",
        "Extended river & bay cruising",
        "Complimentary beverages",
        "Swim ladder & water access",
        "Bluetooth audio system",
        "Fuel & generator included",
      ],
      ideal: "Friend groups, birthday outings, family days",
      icon: "⛵",
      featured: true,
    },
    {
      name: "Full-Day Adventure",
      duration: "8 Hours",
      price: "$1,800 – $2,400",
      tagline: "The ultimate day on the water",
      description:
        "A full day aboard — cruise to new destinations, anchor for swimming, enjoy a meal on the water, and return at sunset. The complete experience.",
      includes: [
        "8-hour captain-hosted charter",
        "Up to 8 guests",
        "Extended range cruising",
        "Full galley use",
        "All amenities included",
        "Fuel & generator included",
        "Optional catering add-on",
      ],
      ideal: "Family reunions, group celebrations, special occasions",
      icon: "🏖️",
      featured: false,
    },
  ];

  return (
    <section id="packages" className="bg-white py-24">
      <div className="container">
        <div className="reveal mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-brass" />
            <span
              className="text-brass font-body font-medium uppercase tracking-widest"
              style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
            >
              Social Charter Packages
            </span>
          </div>
          <h2
            className="font-display font-bold text-navy"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Choose Your Adventure
          </h2>
          <p className="mt-4 text-navy/65 font-body max-w-xl leading-relaxed" style={{ fontSize: "1rem" }}>
            Every charter is captain-hosted by Idris Grant. You bring the good
            vibes — we handle everything else. All packages include fuel, the
            captain, and complimentary beverages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal-stagger">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`pricing-card flex flex-col ${pkg.featured ? "featured" : ""}`}
            >
              {pkg.featured && (
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: "oklch(0.72 0.12 75)" }}
                />
              )}
              {pkg.featured && (
                <div
                  className="inline-block mb-4 self-start px-3 py-1 text-navy font-body font-semibold uppercase tracking-widest"
                  style={{ background: "oklch(0.72 0.12 75)", fontSize: "0.65rem", letterSpacing: "0.15em" }}
                >
                  Most Popular
                </div>
              )}
              <div className="text-3xl mb-3">{pkg.icon}</div>
              <div className="mb-2">
                <span
                  className="font-body uppercase tracking-widest text-brass"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
                >
                  {pkg.duration}
                </span>
              </div>
              <h3
                className={`font-display font-bold mb-1 ${pkg.featured ? "text-white" : "text-navy"}`}
                style={{ fontSize: "1.5rem" }}
              >
                {pkg.name}
              </h3>
              <p
                className={`font-body italic mb-3 ${pkg.featured ? "text-brass" : "text-brass"}`}
                style={{ fontSize: "0.875rem" }}
              >
                {pkg.tagline}
              </p>
              <div
                className={`font-display font-semibold mb-4 ${pkg.featured ? "text-brass" : "text-brass"}`}
                style={{ fontSize: "1.75rem" }}
              >
                {pkg.price}
              </div>
              <p
                className={`font-body leading-relaxed mb-6 ${pkg.featured ? "text-white/70" : "text-navy/65"}`}
                style={{ fontSize: "0.9rem" }}
              >
                {pkg.description}
              </p>
              <div className="h-px mb-6" style={{ background: pkg.featured ? "oklch(0.72 0.12 75 / 0.3)" : "oklch(0.88 0.01 80)" }} />
              <ul className="flex flex-col gap-2 mb-6 flex-1">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-brass mt-0.5" style={{ fontSize: "0.75rem" }}>✦</span>
                    <span
                      className={`font-body ${pkg.featured ? "text-white/80" : "text-navy/70"}`}
                      style={{ fontSize: "0.875rem" }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div
                className={`font-body mb-6 ${pkg.featured ? "text-white/50" : "text-navy/45"}`}
                style={{ fontSize: "0.8rem" }}
              >
                <span className="font-semibold">Ideal for:</span> {pkg.ideal}
              </div>
              <button
                onClick={() => document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" })}
                className={pkg.featured ? "btn-brass" : "btn-outline-brass"}
              >
                Book This Package
              </button>
            </div>
          ))}
        </div>

        <div
          className="mt-10 p-6 bg-ivory reveal"
          style={{ borderLeft: "3px solid oklch(0.72 0.12 75)" }}
        >
          <p className="text-navy/70 font-body" style={{ fontSize: "0.9rem" }}>
            <span className="font-semibold text-navy">Optional Add-Ons:</span> Catering &
            premium bar service, professional photographer, fishing gear, live
            music, custom event décor. All guests must sign a liability waiver
            prior to boarding. Minimum booking is 3 hours.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Social Moments Section ─────────────────────────────────────────────────
function SocialMomentsSection() {
  const moments = [
    {
      img: IMAGES.fatherSonFishing,
      alt: "Father and son fishing from the cockpit",
      caption: "Father & Son",
      sub: "Fishing off the cockpit on the Occoquan",
    },
    {
      img: IMAGES.momWithKids,
      alt: "Mom relaxing in the salon with three children",
      caption: "Family Time",
      sub: "Comfortable salon seating for the whole crew",
    },
    {
      img: IMAGES.womanSunbathing,
      alt: "Woman relaxing on the bow in the sun",
      caption: "Pure Relaxation",
      sub: "Unwind on the bow as the river rolls by",
    },
  ];

  return (
    <section id="social-moments" className="bg-ivory py-24">
      <div className="container">
        {/* Header */}
        <div className="reveal mb-14 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-brass" />
            <span
              className="text-brass font-body font-medium uppercase tracking-widest"
              style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
            >
              Real Moments on the Water
            </span>
            <div className="h-px w-10 bg-brass" />
          </div>
          <h2
            className="font-display font-bold text-navy mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Every Outing Tells a Story
          </h2>
          <p className="text-navy/60 font-body max-w-xl mx-auto leading-relaxed" style={{ fontSize: "1rem" }}>
            From a father teaching his son to fish, to a mom creating memories
            with her kids, to a quiet afternoon soaking up the sun — the Sea Ray
            390 is the backdrop for moments that last a lifetime.
          </p>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
          {moments.map((m) => (
            <div key={m.caption} className="group flex flex-col">
              <div
                className="photo-card overflow-hidden"
                style={{ aspectRatio: "4/5" }}
              >
                <img
                  src={m.img}
                  alt={m.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle gradient overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/3"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.10 0.04 240 / 0.55), transparent)",
                  }}
                />
              </div>
              <div className="mt-4 pl-1">
                <h4 className="font-display font-semibold text-navy" style={{ fontSize: "1.05rem" }}>
                  {m.caption}
                </h4>
                <p className="text-navy/55 font-body mt-1" style={{ fontSize: "0.875rem" }}>
                  {m.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-14 reveal text-center">
          <button
            onClick={() => document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-brass"
          >
            Plan Your Charter
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Experience Section ───────────────────────────────────────────────────────
function ExperienceSection() {
  return (
    <section id="experience" className="bg-navy-dark py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-brass" />
              <span
                className="text-brass font-body font-medium uppercase tracking-widest"
                style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
              >
                The Experience
              </span>
            </div>
            <h2
              className="font-display font-bold text-white mb-6"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
            >
              More Than a Boat Ride —<br />
              <span style={{ color: "oklch(0.72 0.12 75)" }}>A Full Escape</span>
            </h2>
            <p className="text-white/65 font-body leading-relaxed mb-6" style={{ fontSize: "1rem" }}>
              From the moment you step aboard, the world slows down. The Occoquan
              River winds through lush Virginia woodland — no traffic, no noise,
              just open water and the sound of the wake. Your captain handles
              navigation while you focus on making memories.
            </p>
            <p className="text-white/65 font-body leading-relaxed mb-8" style={{ fontSize: "1rem" }}>
              The Sea Ray 390 is a true motor yacht — spacious enough for a group
              of eight, with a full galley, master stateroom, stand-up head with
              shower, and a wraparound salon that opens to the cockpit. Bring
              food, bring drinks, bring your playlist.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: "🎵", title: "Bluetooth Audio", desc: "Stream your playlist through the onboard sound system." },
                { icon: "🏊", title: "Swim Platform", desc: "Jump in from the aft swim platform on warm days." },
                { icon: "🍳", title: "Full Galley", desc: "Prep food and drinks in the fully equipped galley." },
                { icon: "🛏️", title: "Master Stateroom", desc: "A private queen berth for overnight or extended stays." },
                { icon: "🚿", title: "Head & Shower", desc: "Full stand-up head with shower for all-day comfort." },
                { icon: "⚓", title: "Captain-Hosted", desc: "Idris Grant hosts every voyage — safety and hospitality guaranteed." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <div>
                    <h4 className="font-body font-semibold text-white mb-1" style={{ fontSize: "0.9rem" }}>
                      {item.title}
                    </h4>
                    <p className="text-white/50 font-body" style={{ fontSize: "0.825rem", lineHeight: "1.6" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo collage */}
          <div className="reveal">
            <div className="grid grid-cols-2 gap-3">
              <div className="photo-card aspect-[3/4] col-span-1 row-span-2">
                <img src={IMAGES.salon} alt="Salon seating" className="w-full h-full object-cover" />
              </div>
              <div className="photo-card aspect-square">
                <img src={IMAGES.cockpit4} alt="Cockpit area" className="w-full h-full object-cover" />
              </div>
              <div className="photo-card aspect-square">
                <img src={IMAGES.stateroom} alt="Master stateroom" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="photo-card aspect-video">
                <img src={IMAGES.galley} alt="Galley" className="w-full h-full object-cover" />
              </div>
              <div className="photo-card aspect-video">
                <img src={IMAGES.bathroom} alt="Head with shower" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Vessel Features Section ──────────────────────────────────────────────────
function VesselFeaturesSection() {
  return (
    <section id="vessel-features" className="bg-ivory py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photos */}
          <div className="reveal order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="photo-card aspect-[4/3]">
                <img src={IMAGES.boat1} alt="Sea Ray 390 exterior" className="w-full h-full object-cover" />
              </div>
              <div className="photo-card aspect-[4/3]">
                <img src={IMAGES.boat2} alt="Vessel at marina" className="w-full h-full object-cover" />
              </div>
              <div className="photo-card aspect-[4/3]">
                <img src={IMAGES.cockpit5} alt="Cockpit seating" className="w-full h-full object-cover" />
              </div>
              <div className="photo-card aspect-[4/3]">
                <img src={IMAGES.marina1} alt="Prince William Marina" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="reveal order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-brass" />
              <span
                className="text-brass font-body font-medium uppercase tracking-widest"
                style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
              >
                The Vessel
              </span>
            </div>
            <h2
              className="font-display font-bold text-navy mb-6"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
            >
              2004 Sea Ray 390
              <br />
              <span className="text-brass">Motor Yacht</span>
            </h2>
            <p className="text-navy/70 font-body leading-relaxed mb-8" style={{ fontSize: "1rem" }}>
              A 41'9" luxury motor yacht with twin MerCruiser 8.1 S Horizon gas
              inboards producing 740 hp combined. Spacious, stable, and built for
              comfort — the Sea Ray 390 is one of the most capable and
              well-appointed vessels in its class.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Length", value: "41'9\"" },
                { label: "Beam", value: "13'9\"" },
                { label: "Engines", value: "Twin MerCruiser 8.1 S" },
                { label: "Power", value: "740 hp combined" },
                { label: "Fuel Type", value: "Gas Inboards" },
                { label: "Max Guests", value: "8 passengers" },
                { label: "Staterooms", value: "2 cabins" },
                { label: "Heads", value: "2 full heads" },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-col gap-1 pb-3"
                  style={{ borderBottom: "1px solid oklch(0.88 0.01 80)" }}
                >
                  <span className="text-navy/45 font-body uppercase tracking-wider" style={{ fontSize: "0.65rem", letterSpacing: "0.15em" }}>
                    {spec.label}
                  </span>
                  <span className="text-navy font-body font-semibold" style={{ fontSize: "0.9rem" }}>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-brass"
            >
              Book Your Charter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────
function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: "How many people can come aboard?",
      a: "The Sea Ray 390 is Coast Guard certified for up to 8 passengers plus the captain. We recommend 6–8 guests for the most comfortable experience.",
    },
    {
      q: "Can we bring our own food and drinks?",
      a: "Absolutely. You're welcome to bring a cooler, snacks, meals, and beverages. The full galley is available for your use. We also offer optional catering add-ons if you'd prefer to have it handled for you.",
    },
    {
      q: "Is the captain included in the price?",
      a: "Yes — every charter is captain-hosted by Idris Grant. The captain's fee is included in all package prices. You will never be expected to operate the vessel yourself.",
    },
    {
      q: "Can we swim from the boat?",
      a: "Yes! The Sea Ray 390 has a swim platform at the stern. On calm, warm days we can anchor in a suitable location for swimming. The captain will advise on the best spots based on conditions.",
    },
    {
      q: "What happens if the weather is bad?",
      a: "Safety is our top priority. If conditions are unsafe, we will work with you to reschedule at no additional cost. We monitor weather closely and will contact you in advance if there are concerns.",
    },
    {
      q: "Where do we depart from?",
      a: "All charters depart from Prince William Marina on the Occoquan River in Woodbridge, Virginia. The marina is easily accessible from I-95 and Route 1, approximately 25 miles south of Washington, DC.",
    },
    {
      q: "What should we bring?",
      a: "Comfortable, non-marking footwear (soft soles), sunscreen, sunglasses, and any food or beverages you'd like. Life jackets are provided onboard. Dress for the weather and the season.",
    },
    {
      q: "Is there a deposit required to book?",
      a: "Yes, a deposit is required to hold your date. Full details on deposit amounts and cancellation policy will be provided when you submit your inquiry and we confirm availability.",
    },
  ];

  return (
    <section id="faq" className="bg-white py-24">
      <div className="container max-w-3xl mx-auto">
        <div className="reveal mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-brass" />
            <span
              className="text-brass font-body font-medium uppercase tracking-widest"
              style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
            >
              Frequently Asked Questions
            </span>
            <div className="h-px w-10 bg-brass" />
          </div>
          <h2
            className="font-display font-bold text-navy"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Everything You Need to Know
          </h2>
        </div>

        <div className="flex flex-col gap-2 reveal">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-b"
              style={{ borderColor: "oklch(0.88 0.01 80)" }}
            >
              <button
                className="w-full text-left py-5 flex items-center justify-between gap-4"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="font-body font-semibold text-navy" style={{ fontSize: "0.975rem" }}>
                  {faq.q}
                </span>
                <span
                  className="text-brass flex-shrink-0 transition-transform duration-300"
                  style={{
                    fontSize: "1.25rem",
                    transform: openIdx === i ? "rotate(45deg)" : "none",
                  }}
                >
                  +
                </span>
              </button>
              {openIdx === i && (
                <div className="pb-5">
                  <p className="text-navy/65 font-body leading-relaxed" style={{ fontSize: "0.9rem" }}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Inquiry Form ─────────────────────────────────────────────────────────────
function InquiryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    occasion: "",
    eventDate: "",
    guestCount: "",
    package: "",
    message: "",
    hearAbout: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.occasion) {
      toast.error("Please fill in the required fields.");
      return;
    }
    const subject = encodeURIComponent(
      `Social Charter Inquiry — ${form.occasion}${form.eventDate ? ` on ${form.eventDate}` : ""}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone || "Not provided"}\n` +
      `Occasion: ${form.occasion}\n` +
      `Preferred Date: ${form.eventDate || "Flexible"}\n` +
      `Number of Guests: ${form.guestCount || "Not specified"}\n` +
      `Package Interest: ${form.package || "Not specified"}\n` +
      `How They Heard About Us: ${form.hearAbout || "Not specified"}\n\n` +
      `Additional Message:\n${form.message || "None"}`
    );
    window.location.href = `mailto:idris.grant@lunaseamarine.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    toast.success("Opening your email client to send the inquiry!");
  };

  return (
    <section id="inquiry" className="bg-navy py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left: info */}
          <div className="lg:col-span-2 reveal">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-brass" />
              <span
                className="text-brass font-body font-medium uppercase tracking-widest"
                style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
              >
                Book Your Charter
              </span>
            </div>
            <h2
              className="font-display font-bold text-white mb-6"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
            >
              Ready to Set Sail?
            </h2>
            <p className="text-white/65 font-body leading-relaxed mb-8" style={{ fontSize: "0.9375rem" }}>
              Fill out the form and we'll respond within 24 hours to confirm
              availability, discuss your occasion, and answer any questions.
            </p>

            <div className="flex flex-col gap-6 mb-10">
              {[
                { icon: "✉️", label: "Email", value: "idris.grant@gmail.com", href: "mailto:idris.grant@gmail.com" },
                { icon: "📍", label: "Location", value: "Prince William Marina\nOccoquan River, Woodbridge VA", href: null },
                { icon: "⏱️", label: "Response Time", value: "Within 24 hours", href: null },
                { icon: "🗓️", label: "Season", value: "Peak: May – October\nYear-round by request", href: null },
              ].map((contact) => (
                <div key={contact.label} className="flex items-start gap-4">
                  <span className="text-xl mt-0.5">{contact.icon}</span>
                  <div>
                    <div
                      className="text-brass font-body font-medium uppercase tracking-wider mb-1"
                      style={{ fontSize: "0.7rem", letterSpacing: "0.15em" }}
                    >
                      {contact.label}
                    </div>
                    {contact.href ? (
                      <a href={contact.href} className="text-white font-body hover:text-brass transition-colors" style={{ fontSize: "0.9rem" }}>
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-white/75 font-body whitespace-pre-line" style={{ fontSize: "0.9rem" }}>
                        {contact.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="photo-card aspect-video">
              <img src={IMAGES.pwmAerial} alt="Prince William Marina aerial" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-navy/30" />
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3 reveal">
            {submitted ? (
              <div
                className="h-full flex flex-col items-center justify-center text-center p-12"
                style={{ background: "oklch(0.22 0.04 240)", border: "1px solid oklch(0.72 0.12 75 / 0.3)" }}
              >
                <div className="text-5xl mb-6">⚓</div>
                <h3 className="font-display font-bold text-white text-2xl mb-4">Booking Request Received!</h3>
                <p className="text-white/65 font-body leading-relaxed max-w-sm">
                  Thank you, {form.name}. We've received your request and will
                  respond within 24 hours to confirm availability and discuss
                  your charter.
                </p>
                <div className="gold-rule mt-8 w-32" />
                <p className="text-brass font-body mt-4" style={{ fontSize: "0.875rem" }}>
                  Fair winds and following seas.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 md:p-10"
                style={{ background: "oklch(0.22 0.04 240)", border: "1px solid oklch(0.72 0.12 75 / 0.2)" }}
              >
                <h3 className="font-display font-semibold text-white text-xl mb-6">
                  Social Charter Inquiry
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">
                      Full Name <span className="text-brass">*</span>
                    </label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required className="form-input" style={{ background: "oklch(0.16 0.04 240)", color: "white", borderColor: "oklch(0.72 0.12 75 / 0.25)" }} />
                  </div>
                  <div>
                    <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">
                      Email Address <span className="text-brass">*</span>
                    </label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required className="form-input" style={{ background: "oklch(0.16 0.04 240)", color: "white", borderColor: "oklch(0.72 0.12 75 / 0.25)" }} />
                  </div>
                  <div>
                    <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">Phone Number</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" className="form-input" style={{ background: "oklch(0.16 0.04 240)", color: "white", borderColor: "oklch(0.72 0.12 75 / 0.25)" }} />
                  </div>
                  <div>
                    <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">
                      Occasion / Event Type <span className="text-brass">*</span>
                    </label>
                    <select name="occasion" value={form.occasion} onChange={handleChange} required className="form-input" style={{ background: "oklch(0.16 0.04 240)", color: form.occasion ? "white" : "oklch(0.65 0.02 240)", borderColor: "oklch(0.72 0.12 75 / 0.25)" }}>
                      <option value="" disabled>Select occasion</option>
                      <option value="family-day">Family Day Out</option>
                      <option value="romantic-cruise">Romantic Getaway / Anniversary</option>
                      <option value="birthday">Birthday Celebration</option>
                      <option value="bachelorette">Bachelorette / Bachelor Party</option>
                      <option value="friends-group">Friends Group Outing</option>
                      <option value="graduation">Graduation Celebration</option>
                      <option value="holiday">Holiday Gathering</option>
                      <option value="sunset-cruise">Sunset Cruise</option>
                      <option value="other">Other Special Occasion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">Preferred Package</label>
                    <select name="package" value={form.package} onChange={handleChange} className="form-input" style={{ background: "oklch(0.16 0.04 240)", color: form.package ? "white" : "oklch(0.65 0.02 240)", borderColor: "oklch(0.72 0.12 75 / 0.25)" }}>
                      <option value="" disabled>Select a package</option>
                      <option value="sunset">Sunset Cruise (3 hrs) — $750–$900</option>
                      <option value="half-day">Half-Day Social (4 hrs) — $1,000–$1,400</option>
                      <option value="full-day">Full-Day Adventure (8 hrs) — $1,800–$2,400</option>
                      <option value="unsure">Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">Preferred Date</label>
                    <input name="eventDate" type="date" value={form.eventDate} onChange={handleChange} className="form-input" style={{ background: "oklch(0.16 0.04 240)", color: "white", borderColor: "oklch(0.72 0.12 75 / 0.25)", colorScheme: "dark" }} />
                  </div>
                  <div>
                    <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">Number of Guests</label>
                    <select name="guestCount" value={form.guestCount} onChange={handleChange} className="form-input" style={{ background: "oklch(0.16 0.04 240)", color: form.guestCount ? "white" : "oklch(0.65 0.02 240)", borderColor: "oklch(0.72 0.12 75 / 0.25)" }}>
                      <option value="" disabled>Select guest count</option>
                      <option value="1-2">1–2 guests (couple / solo)</option>
                      <option value="3-4">3–4 guests (small family / couple + friends)</option>
                      <option value="5-6">5–6 guests</option>
                      <option value="7-8">7–8 guests (maximum capacity)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">How Did You Hear About Us?</label>
                    <select name="hearAbout" value={form.hearAbout} onChange={handleChange} className="form-input" style={{ background: "oklch(0.16 0.04 240)", color: form.hearAbout ? "white" : "oklch(0.65 0.02 240)", borderColor: "oklch(0.72 0.12 75 / 0.25)" }}>
                      <option value="" disabled>Select an option</option>
                      <option value="referral">Friend or family referral</option>
                      <option value="boatsetter">Boatsetter / GetMyBoat</option>
                      <option value="google">Google Search</option>
                      <option value="instagram">Instagram / Social Media</option>
                      <option value="marina">Prince William Marina</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">Tell Us About Your Occasion</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Describe your event — any special requests, dietary needs, activities you'd like, or questions you have." rows={4} className="form-input resize-none" style={{ background: "oklch(0.16 0.04 240)", color: "white", borderColor: "oklch(0.72 0.12 75 / 0.25)" }} />
                </div>

                <button type="submit" disabled={submitting} className="btn-brass w-full justify-center" style={{ opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? "Sending Request..." : "Submit Booking Request"}
                </button>

                <p className="text-white/35 font-body text-center mt-4" style={{ fontSize: "0.75rem" }}>
                  We respond within 24 hours. All information is kept confidential.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-navy-dark py-16">
      <div className="container">
        <div className="gold-rule mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/luna_sea_marine_logo-5yYTbKz7zrmVitDLMtP6Qb.webp"
                alt="Luna Sea Marine"
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />
              <div>
                <div className="text-white font-display font-bold" style={{ fontSize: "1.25rem" }}>
                  Luna Sea Marine
                </div>
                <div className="text-brass font-body font-light uppercase tracking-widest" style={{ fontSize: "0.65rem", letterSpacing: "0.22em" }}>
                  Social Charter · Woodbridge, Virginia
                </div>
              </div>
            </div>
            <p className="text-white/45 font-body leading-relaxed" style={{ fontSize: "0.875rem" }}>
              A 41'9" Sea Ray 390 Motor Yacht berthed at Prince William Marina on
              the Occoquan River. Captain-hosted social charters for families,
              couples, and groups.
            </p>
          </div>

          <div>
            <h4 className="text-brass font-body font-medium uppercase tracking-widest mb-4" style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}>
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Charter Packages", id: "packages" },
                { label: "The Experience", id: "experience" },
                { label: "The Vessel", id: "vessel-features" },
                { label: "FAQ", id: "faq" },
                { label: "Book a Charter", id: "inquiry" },
              ].map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)} className="text-white/50 hover:text-brass transition-colors text-left font-body" style={{ fontSize: "0.875rem" }}>
                  {item.label}
                </button>
              ))}
              <a href="/" className="text-white/50 hover:text-brass transition-colors text-left font-body" style={{ fontSize: "0.875rem" }}>
                Business Venue →
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-brass font-body font-medium uppercase tracking-widest mb-4" style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}>
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <div>
                <div className="text-white/40 font-body text-xs uppercase tracking-wider mb-1">Email</div>
                <a href="mailto:idris.grant@gmail.com" className="text-white/75 hover:text-brass transition-colors font-body" style={{ fontSize: "0.875rem" }}>
                  idris.grant@gmail.com
                </a>
              </div>
              <div>
                <div className="text-white/40 font-body text-xs uppercase tracking-wider mb-1">Location</div>
                <p className="text-white/75 font-body" style={{ fontSize: "0.875rem" }}>
                  Prince William Marina<br />Occoquan River<br />Woodbridge, VA 22191
                </p>
              </div>
              <div>
                <div className="text-white/40 font-body text-xs uppercase tracking-wider mb-1">Season</div>
                <p className="text-white/75 font-body" style={{ fontSize: "0.875rem" }}>
                  Peak: May – October<br />Year-round by request
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="gold-rule mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 font-body" style={{ fontSize: "0.8rem" }}>
            © 2026 Luna Sea Marine LLC. All rights reserved.
          </p>
          <p className="text-white/30 font-body" style={{ fontSize: "0.8rem" }}>
            A Luna Sea venture · Prince William Marina · Woodbridge, Virginia
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Social Venue Component ───────────────────────────────────────────────
export default function SocialVenue() {
  useScrollReveal();

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-body)" }}>
      <Navigation />
      <HeroSection />
      <OccasionStrip />
      <PackagesSection />
      <SocialMomentsSection />
      <ExperienceSection />
      <VesselFeaturesSection />
      <FAQSection />
      <InquiryForm />
      <Footer />
    </div>
  );
}
