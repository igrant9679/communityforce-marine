/*
 * CommunityForce Marine — Home Page
 * Design: Coastal Modernism
 * Deep Navy + Brass + Ivory | Playfair Display + DM Sans
 * Sections: Nav, Hero, About, Vessel, Charter Packages, Gallery, Business Venue, Inquiry Form, Footer
 */

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Image CDN URLs ───────────────────────────────────────────────────────────
const IMAGES = {
  // Generated hero images
  heroBg: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/new_homepage_hero_53b95ece.png",
  heroSunset: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/hero_sunset-3CfVwAu7r47S25P8yyUrge.webp",
  corporateMeeting: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/salon_meeting-2NVdQWiEwGrYcBMNJBqP2a.webp",
  marinaAerial: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/marina_aerial-7jo7oWLJucnQE22C7zJYeT.webp",
  // PWMarina facility photos
  pwmDock: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/pwm_dock_view_b7910622.jpg",
  pwmDeck: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/pwm_deck_view_248e4990.jpg",
  pwmAerialFall: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/pwm_aerial_fall_c2bb8f09.jpg",
  pwmAerialSummer: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/pwm_aerial_summer_72822424.jpg",
  // Business meeting photos
  meeting1: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/meeting1_8254a3d6.png",
  meeting2: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/meeting2_c3f621f0.png",
  meeting4: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/meeting4_1e88b976.png",
  meeting5: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/meeting5_a78c8faf.png",
  // Actual boat photos
  boat1: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8289_bc046952.JPEG",
  boat2: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8290_01cfc281.JPEG",
  boat3: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8291_1f65c251.JPEG",
  boat4: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8293_4e2b7de0.JPEG",
  boat5: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8294_655f14a2.JPEG",
  boat6: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8295_c1e86252.JPEG",
  boat7: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8296_31bf9fcd.JPEG",
  boat8: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8297_81a5e070.JPEG",
  // Interior / marina photos
  interior1: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8270_f111aded.JPEG",
  interior2: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8273_7e401905.JPEG",
  interior3: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8276_ef4bea75.JPEG",
  interior4: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8278_67bf308e.JPEG",
  interior5: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8280_118bda8e.JPEG",
  interior6: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8281_23f89c80.JPEG",
  // Marina / resort photos
  marina1: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/b1_814d2b40.jpg",
  marina2: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/b5_f98c1238.jpg",
  marina3: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/b6_e68c25be.jpg",
  marina4: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_0884_afd4ca6f.JPG",
  marina5: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_7674_80a14cde.JPG",
  marina6: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_0097_46e54073.JPG",
  marina7: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_0098_0d418f81.JPG",
  marina8: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_0787_03fa7333.JPG",
  // New cockpit & interior photos
  cockpit1: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/cockpitimage1_47ab1ea0.jpg",
  cockpit4: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/cockpitimage4_9458350e.jpg",
  cockpit5: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/cockpitimage5_a6837624.jpg",
  stateroom: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8293_f0a2b0b1.jpg",
  galley1: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8296_87b61edd.jpg",
  stateroomDoors: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/b6_536f6ef7.jpg",
  bathroom: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8270_926e37c0.jpg",
  fridge: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8273_257a8533.jpg",
  salon: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8276_22c05a58.jpg",
  vanity: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8278_e002a5cd.jpg",
  galley2: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/IMG_8272_3c7fce3a.jpg",
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
      { threshold: 0.12 }
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
        {/* Wordmark */}
        <div className="flex flex-col leading-none">
          <span
            className="text-white font-display font-bold tracking-wide"
            style={{ fontSize: "1.25rem", letterSpacing: "0.02em" }}
          >
            CommunityForce
          </span>
          <span
            className="text-brass-light font-body font-light tracking-widest uppercase"
            style={{ fontSize: "0.65rem", letterSpacing: "0.22em" }}
          >
            Marine
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "The Vessel", id: "vessel" },
            { label: "Charter Packages", id: "packages" },
            { label: "Gallery", id: "gallery" },
            { label: "Business Venue", id: "venue" },
            { label: "The Marina", id: "marina" },
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
            href="/social-venue"
            className="nav-link text-white/85 hover:text-white transition-colors"
            style={{ textDecoration: "none" }}
          >
            Social Charters
          </a>
          <button
            onClick={() => scrollTo("inquiry")}
            className="btn-brass"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}
          >
            Book an Inquiry
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className="block h-px bg-white transition-all"
              style={{ transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" }}
            />
            <span
              className="block h-px bg-white transition-all"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block h-px bg-white transition-all"
              style={{ transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-dark border-t border-white/10">
          <div className="container py-4 flex flex-col gap-4">
            {[
              { label: "The Vessel", id: "vessel" },
              { label: "Charter Packages", id: "packages" },
            { label: "Gallery", id: "gallery" },
            { label: "Business Venue", id: "venue" },
            { label: "The Marina", id: "marina" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-white/85 text-left font-body font-medium py-1"
              >
                {item.label}
              </button>
            ))}
            <a
              href="/social-venue"
              className="text-white/85 text-left font-body font-medium py-1"
              style={{ textDecoration: "none" }}
            >
              Social Charters
            </a>
            <button
              onClick={() => scrollTo("inquiry")}
              className="btn-brass mt-2 self-start"
            >
              Book an Inquiry
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: `oklch(0.10 0.04 240)`,
      }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.heroBg}
          alt="CommunityForce Marine yacht at sunset"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 60%" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, oklch(0.10 0.04 240 / 0.88) 0%, oklch(0.10 0.04 240 / 0.65) 50%, oklch(0.10 0.04 240 / 0.40) 100%)",
          }}
        />
      </div>

      {/* Compass rose watermark */}
      <div
        className="absolute right-0 bottom-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='95' fill='none' stroke='%23C9A84C' stroke-width='1'/%3E%3Ccircle cx='100' cy='100' r='70' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3Cline x1='100' y1='5' x2='100' y2='195' stroke='%23C9A84C' stroke-width='0.5'/%3E%3Cline x1='5' y1='100' x2='195' y2='100' stroke='%23C9A84C' stroke-width='0.5'/%3E%3Cpolygon points='100,5 95,30 100,25 105,30' fill='%23C9A84C'/%3E%3Cpolygon points='100,195 95,170 100,175 105,170' fill='%23C9A84C' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-brass" />
            <span
              className="text-brass font-body font-medium uppercase tracking-widest"
              style={{ fontSize: "0.75rem", letterSpacing: "0.2em" }}
            >
              Prince William Marina · Woodbridge, Virginia
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-white font-display font-bold leading-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: "1.1" }}
          >
            Where Executive
            <br />
            <span className="text-brass">Meetings</span> Meet
            <br />
            Open Water
          </h1>

          {/* Subheadline */}
          <p
            className="text-white/75 font-body font-light mb-10 max-w-xl"
            style={{ fontSize: "1.125rem", lineHeight: "1.75" }}
          >
            Charter a 41'9" Sea Ray 390 Motor Yacht on the Occoquan River for
            corporate team outings, government client meetings, private
            celebrations, and sunset cruises. Every voyage is captain-hosted.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button onClick={() => scrollTo("inquiry")} className="btn-brass">
              Request an Inquiry
            </button>
            <button onClick={() => scrollTo("packages")} className="btn-outline-white">
              View Charter Packages
            </button>
          </div>

          {/* Stats bar */}
          <div className="mt-16 flex flex-wrap gap-8">
            {[
              { value: "41'9\"", label: "Motor Yacht" },
              { value: "740 hp", label: "Twin MerCruiser Gas" },
              { value: "8 Guests", label: "Max Capacity" },
              { value: "~1,100 hrs", label: "Engine Hours" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-brass font-display font-bold"
                  style={{ fontSize: "1.5rem" }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-white/55 font-body uppercase tracking-wider"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.15em" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="font-body text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-white/20 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-brass"
            style={{
              height: "40%",
              animation: "scrollLine 1.8s ease-in-out infinite",
            }}
          />
        </div>
        <style>{`
          @keyframes scrollLine {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(300%); }
          }
        `}</style>
      </div>
    </section>
  );
}

// ─── About / Intro Strip ──────────────────────────────────────────────────────
function AboutStrip() {
  return (
    <section className="bg-navy py-16">
      <div className="container">
        <div className="gold-rule mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 reveal-stagger">
          {[
            {
              icon: "⚓",
              title: "Captain-Hosted Every Voyage",
              desc: "Idris Grant is present as captain and host on every charter — ensuring impeccable service, safety, and a premium guest experience.",
            },
            {
              icon: "🏛️",
              title: "Government Meeting Certified",
              desc: "Structured as a documented business meeting venue — with written agendas and deliverables — fully compliant with federal ethics guidelines.",
            },
            {
              icon: "🌊",
              title: "Occoquan River, Woodbridge VA",
              desc: "Berthed at Prince William Marina Resort, minutes from the NOVA/DC federal corridor. Scenic river cruising on the historic Occoquan.",
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col gap-4">
              <div className="text-3xl">{item.icon}</div>
              <div className="h-px w-8 bg-brass" />
              <h3
                className="text-white font-display font-semibold"
                style={{ fontSize: "1.125rem" }}
              >
                {item.title}
              </h3>
              <p className="text-white/60 font-body font-light leading-relaxed" style={{ fontSize: "0.9375rem" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="gold-rule mt-12" />
      </div>
    </section>
  );
}

// ─── Vessel Section ───────────────────────────────────────────────────────────
function VesselSection() {
  const specs = [
    { label: "Length Overall", value: "41'9\"" },
    { label: "Beam", value: "14'3\"" },
    { label: "Engines", value: "Twin MerCruiser 8.1 S Horizon Gas Inboards, 370 hp each" },
    { label: "Total Power", value: "740 hp" },
    { label: "Engine Hours", value: "~1,100 hours (1,104 / 1,101)" },
    { label: "Top Speed", value: "28 knots" },
    { label: "Cruise Speed", value: "23 knots" },
    { label: "Staterooms", value: "2 private staterooms, sleeps 4" },
    { label: "Heads", value: "2 full heads with separate showers" },
    { label: "Galley", value: "Full galley with stove, microwave, refrigerator" },
    { label: "Salon", value: "Cherry wood cabinetry, port/starboard sofas" },
    { label: "Cockpit", value: "Wet bar, icemaker, sink, 5 beverage holders" },
    { label: "Flybridge", value: "Fiberglass hardtop, dual captain's chairs, full nav electronics" },
    { label: "Generator", value: "Yes — A/C, Sat TV, washer/dryer, central vac" },
  ];

  return (
    <section id="vessel" className="bg-ivory py-24">
      <div className="container">
        {/* Section header */}
        <div className="reveal mb-16">
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
            className="font-display font-bold text-navy"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            2004 Sea Ray 390 Motor Yacht
          </h2>
          <p
            className="mt-4 text-navy/65 font-body max-w-2xl leading-relaxed"
            style={{ fontSize: "1rem" }}
          >
            A premium 41'9" flybridge motor yacht powered by twin MerCruiser 8.1 S Horizon
            gas inboards (370 hp each), two private staterooms, a full galley, and a spacious cockpit
            with wet bar. At approximately 1,100 engine hours, the vessel is well-maintained and
            ready for an exceptional charter experience.
          </p>
        </div>

        {/* Split layout: photo left, specs right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 reveal">
          {/* Photo stack */}
          <div className="relative">
            <div className="photo-card aspect-[4/3]">
              <img
                src={IMAGES.boat1}
                alt="Sea Ray 390 Motor Yacht exterior"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-6 -right-6 w-48 h-36 photo-card hidden lg:block"
              style={{ border: "4px solid white", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
            >
              <img
                src={IMAGES.boat5}
                alt="Vessel cockpit"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Specs */}
          <div className="bg-navy p-10 lg:p-12">
            <h3
              className="text-brass font-display font-semibold mb-6"
              style={{ fontSize: "1.25rem" }}
            >
              Vessel Specifications
            </h3>
            <div className="grid grid-cols-1 gap-0">
              {specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className="flex justify-between py-3"
                  style={{
                    borderBottom: i < specs.length - 1 ? "1px solid oklch(0.72 0.12 75 / 0.15)" : "none",
                  }}
                >
                  <span
                    className="text-white/50 font-body uppercase tracking-wide"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.12em" }}
                  >
                    {spec.label}
                  </span>
                  <span
                    className="text-white font-body font-medium text-right max-w-[55%]"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Photo row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 reveal">
          {[IMAGES.boat2, IMAGES.boat3, IMAGES.boat4, IMAGES.boat6].map((src, i) => (
            <div key={i} className="photo-card aspect-square">
              <img src={src} alt={`Vessel photo ${i + 2}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Charter Packages ─────────────────────────────────────────────────────────
function CharterPackages() {
  const packages = [
    {
      name: "Sunset Cruise",
      duration: "3 Hours",
      price: "$750 – $900",
      guests: "Up to 8 Guests",
      description:
        "The perfect evening on the water. Cocktail-style entertaining on the cockpit and flybridge as the sun sets over the Occoquan River.",
      includes: [
        "Flybridge access with hardtop",
        "Wet bar with icemaker & beverages",
        "Cockpit entertaining space",
        "Captain & host service",
        "Fuel & generator included",
      ],
      ideal: "Social gatherings, celebrations, client appreciation",
      featured: false,
    },
    {
      name: "Half-Day Corporate",
      duration: "4 Hours",
      price: "$1,000 – $1,400",
      guests: "Up to 8 Guests",
      description:
        "The flagship charter experience — ideal for corporate team outings, government client meetings, and milestone celebrations.",
      includes: [
        "Full vessel access — salon, cockpit, flybridge",
        "Full galley with dining service",
        "Wet bar & beverage service",
        "Captain & host service",
        "2 private staterooms available",
        "Fuel & generator included",
      ],
      ideal: "Corporate meetings, team outings, government client events",
      featured: true,
    },
    {
      name: "Full-Day Charter",
      duration: "8 Hours",
      price: "$1,800 – $2,400",
      guests: "Up to 8 Guests",
      description:
        "An extended voyage for those who want the full experience — all-day cruising, dining, and entertaining on the Occoquan River.",
      includes: [
        "Full vessel access all day",
        "Full galley service — breakfast through dinner",
        "Extended river cruising",
        "Captain & host service",
        "All amenities included",
        "Fuel & generator included",
      ],
      ideal: "Extended events, special occasions, executive retreats",
      featured: false,
    },
  ];

  return (
    <section id="packages" className="bg-white py-24">
      <div className="container">
        {/* Header */}
        <div className="reveal mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-brass" />
            <span
              className="text-brass font-body font-medium uppercase tracking-widest"
              style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
            >
              Charter Packages
            </span>
          </div>
          <h2
            className="font-display font-bold text-navy"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Choose Your Experience
          </h2>
          <p
            className="mt-4 text-navy/65 font-body max-w-xl leading-relaxed"
            style={{ fontSize: "1rem" }}
          >
            Every charter is captain-hosted by Idris Grant. The vessel never departs
            without a professional host aboard — ensuring safety, quality, and an
            exceptional experience for every guest.
          </p>
        </div>

        {/* Package cards */}
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
                  style={{
                    background: "oklch(0.72 0.12 75)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                  }}
                >
                  Most Popular
                </div>
              )}
              <div className="mb-2">
                <span
                  className={`font-body uppercase tracking-widest ${pkg.featured ? "text-brass" : "text-brass"}`}
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
                Request This Package
              </button>
            </div>
          ))}
        </div>

        {/* Add-ons note */}
        <div
          className="mt-10 p-6 bg-ivory reveal"
          style={{ borderLeft: "3px solid oklch(0.72 0.12 75)" }}
        >
          <p className="text-navy/70 font-body" style={{ fontSize: "0.9rem" }}>
            <span className="font-semibold text-navy">Optional Add-Ons:</span> Catering &
            premium bar service, professional photographer, live music, custom event
            décor. All guests must sign a liability waiver prior to boarding. Minimum
            booking is 3 hours.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function GallerySection() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const galleryCategories = [
    { label: "All", key: "all" },
    { label: "Exterior", key: "exterior" },
    { label: "Interior", key: "interior" },
    { label: "Marina", key: "marina" },
  ];
  const [activeCategory, setActiveCategory] = useState("all");

  const allGalleryImages = [
    { src: IMAGES.boat1, alt: "Vessel exterior at marina", cat: "exterior" },
    { src: IMAGES.boat7, alt: "Yacht on the water", cat: "exterior" },
    { src: IMAGES.boat8, alt: "Vessel at dock", cat: "exterior" },
    { src: IMAGES.boat2, alt: "Sea Ray 390 exterior", cat: "exterior" },
    { src: IMAGES.cockpit1, alt: "Helm station and cockpit", cat: "interior" },
    { src: IMAGES.cockpit4, alt: "Cockpit seating area", cat: "interior" },
    { src: IMAGES.cockpit5, alt: "Aft cockpit bench seating", cat: "interior" },
    { src: IMAGES.salon, alt: "Salon curved leather seating", cat: "interior" },
    { src: IMAGES.stateroom, alt: "Master stateroom with queen berth", cat: "interior" },
    { src: IMAGES.stateroomDoors, alt: "Stateroom with vanity", cat: "interior" },
    { src: IMAGES.vanity, alt: "Master head vanity", cat: "interior" },
    { src: IMAGES.bathroom, alt: "Head with stand-up shower", cat: "interior" },
    { src: IMAGES.galley2, alt: "Full galley with appliances", cat: "interior" },
    { src: IMAGES.galley1, alt: "Galley and companionway", cat: "interior" },
    { src: IMAGES.fridge, alt: "Galley refrigerator", cat: "interior" },
    { src: IMAGES.interior1, alt: "Vessel interior", cat: "interior" },
    { src: IMAGES.marina1, alt: "Prince William Marina", cat: "marina" },
    { src: IMAGES.marina2, alt: "Marina resort waterfront", cat: "marina" },
    { src: IMAGES.marina4, alt: "Occoquan River", cat: "marina" },
    { src: IMAGES.pwmAerialSummer, alt: "Marina aerial view", cat: "marina" },
    { src: IMAGES.pwmDock, alt: "Marina dock walkway", cat: "marina" },
    { src: IMAGES.marina8, alt: "Marina resort facilities", cat: "marina" },
  ];

  const galleryImages = activeCategory === "all"
    ? allGalleryImages
    : allGalleryImages.filter((img) => img.cat === activeCategory);

  return (
    <section id="gallery" className="bg-navy-dark py-24">
      <div className="container">
        {/* Header */}
        <div className="reveal mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-brass" />
            <span
              className="text-brass font-body font-medium uppercase tracking-widest"
              style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
            >
              Photo Gallery
            </span>
          </div>
          <h2
            className="font-display font-bold text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Life Aboard
          </h2>
        </div>

        {/* Category filter tabs */}
        <div className="reveal flex flex-wrap gap-3 mb-10">
          {galleryCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="font-body uppercase tracking-widest transition-all"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                padding: "0.5rem 1.25rem",
                border: activeCategory === cat.key ? "1px solid oklch(0.72 0.12 75)" : "1px solid oklch(0.72 0.12 75 / 0.3)",
                background: activeCategory === cat.key ? "oklch(0.72 0.12 75)" : "transparent",
                color: activeCategory === cat.key ? "oklch(0.10 0.04 240)" : "oklch(0.72 0.12 75)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div
          className="grid gap-3 reveal"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gridAutoRows: "210px",
          }}
        >
          {galleryImages.map((img, i) => (
            <div
              key={img.src + i}
              className="photo-card cursor-pointer"
              style={{
                gridRow: i === 0 || i === 7 ? "span 2" : "span 1",
              }}
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-navy-dark/0 hover:bg-navy-dark/30 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 text-white text-2xl">
                  ⊕
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Gallery full view"
            className="max-w-full max-h-full object-contain"
            style={{ maxHeight: "90vh" }}
          />
          <button
            className="absolute top-4 right-4 text-white text-3xl font-light"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}

// ─── Business Venue Section ───────────────────────────────────────────────────
function BusinessVenueSection() {
  return (
    <section id="venue" className="bg-ivory py-24">
      <div className="container">
        {/* Top: content + hero photo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Content */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-brass" />
              <span
                className="text-brass font-body font-medium uppercase tracking-widest"
                style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
              >
                Business Venue
              </span>
            </div>
            <h2
              className="font-display font-bold text-navy mb-6"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
            >
              A Floating Conference Room Unlike Any Other
            </h2>
            <p className="text-navy/70 font-body leading-relaxed mb-6" style={{ fontSize: "1rem" }}>
              CommunityForce Marine serves as a dedicated government client meeting
              venue — a premium, off-site setting for program reviews, contract
              briefings, and strategic working sessions with senior agency leaders.
            </p>
            <p className="text-navy/70 font-body leading-relaxed mb-8" style={{ fontSize: "1rem" }}>
              Every meeting is structured with a written agenda and produces a
              documented business deliverable — fully compliant with federal ethics
              guidelines. This is not entertainment; it is a professional meeting
              venue that happens to be on the water.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: "Government Compliant",
                  desc: "Written agendas, documented attendees, and business deliverables for every meeting.",
                },
                {
                  title: "Senior Leadership Ready",
                  desc: "Hosted by CommunityForce principals — ideal for SES, GS-15, and agency leadership.",
                },
                {
                  title: "2–4 Sessions/Month",
                  desc: "Target meeting frequency during the boating season (May–October).",
                },
                {
                  title: "Formats Available",
                  desc: "Program reviews, project planning, contract briefings, strategy sessions.",
                },
              ].map((item) => (
                <div key={item.title} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brass" />
                    <h4 className="font-body font-semibold text-navy" style={{ fontSize: "0.9rem" }}>
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-navy/60 font-body" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-brass"
            >
              Inquire About Meeting Venue
            </button>
          </div>

          {/* Hero photo */}
          <div className="reveal">
            <div className="relative">
              <div className="photo-card aspect-[4/5]">
                <img
                  src={IMAGES.meeting2}
                  alt="Five executives in business meeting aboard yacht salon"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative accent */}
              <div
                className="absolute -bottom-4 -left-4 w-24 h-24 bg-brass opacity-15"
                style={{ zIndex: -1 }}
              />
              <div
                className="absolute -top-4 -right-4 w-16 h-16 border border-brass opacity-30"
                style={{ zIndex: -1 }}
              />
            </div>
          </div>
        </div>

        {/* Photo gallery strip — three additional meeting images */}
        <div className="reveal">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-brass" />
            <span
              className="text-brass font-body font-medium uppercase tracking-widest"
              style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
            >
              Inside the Venue
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="photo-card aspect-[4/3]">
              <img
                src={IMAGES.meeting1}
                alt="Four executives in business meeting in yacht salon"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="photo-card aspect-[4/3]">
              <img
                src={IMAGES.meeting5}
                alt="Team meeting with marina water view through yacht windows"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="photo-card aspect-[4/3]">
              <img
                src={IMAGES.meeting4}
                alt="Three professionals reviewing documents aboard yacht at marina"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Marina Section ───────────────────────────────────────────────────────────
function MarinaSection() {
  return (
    <section id="marina" className="bg-white py-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photos — expanded marina grid */}
          <div className="reveal order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="photo-card aspect-[3/4] col-span-1 row-span-2">
                <img src={IMAGES.pwmAerialSummer} alt="Prince William Marina aerial view" className="w-full h-full object-cover" />
              </div>
              <div className="photo-card aspect-square">
                <img src={IMAGES.pwmDeck} alt="Marina deck and docks" className="w-full h-full object-cover" />
              </div>
              <div className="photo-card aspect-square">
                <img src={IMAGES.marina2} alt="Marina resort waterfront" className="w-full h-full object-cover" />
              </div>
            </div>
            {/* Second row */}
            <div className="grid grid-cols-3 gap-3 mt-3">
              <div className="photo-card aspect-square">
                <img src={IMAGES.pwmDock} alt="Marina dock walkway" className="w-full h-full object-cover" />
              </div>
              <div className="photo-card aspect-square">
                <img src={IMAGES.marina4} alt="Occoquan River" className="w-full h-full object-cover" />
              </div>
              <div className="photo-card aspect-square">
                <img src={IMAGES.marina8} alt="Marina resort facilities" className="w-full h-full object-cover" />
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
                The Marina
              </span>
            </div>
            <h2
              className="font-display font-bold text-navy mb-6"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
            >
              Prince William Marina
              <br />
              <span className="text-brass">Resort & Marina</span>
            </h2>
            <p className="text-navy/70 font-body leading-relaxed mb-6" style={{ fontSize: "1rem" }}>
              CommunityForce Marine is berthed at Prince William Marina on the
              historic Occoquan River in Woodbridge, Virginia — a full-service
              resort marina with exceptional amenities and easy access from the
              Northern Virginia and DC federal corridor.
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {[
                { icon: "📍", text: "Prince William Marina, Occoquan River, Woodbridge VA 22191" },
                { icon: "🚗", text: "Convenient access from I-95 and Route 1 — 25 miles south of DC" },
                { icon: "🏖️", text: "Full-service resort marina with Boatel, pool, fuel dock, ship store, and waterfront amenities" },
                { icon: "⛵", text: "Over 300 wet slips and dry storage — a premier boating destination on the Occoquan" },
                { icon: "⚓", text: "Scenic river cruising on the historic Occoquan River" },
                { icon: "🌿", text: "Lush Virginia woodland shoreline — a true escape from the city" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                  <p className="text-navy/70 font-body" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[IMAGES.pwmDock, IMAGES.pwmDeck, IMAGES.marina5, IMAGES.marina8].map((src, i) => (
                <div key={i} className="photo-card aspect-video">
                  <img src={src} alt={`Marina photo ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
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
    organization: "",
    eventType: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.eventType) {
      toast.error("Please fill in the required fields.");
      return;
    }
    setSubmitting(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Your inquiry has been received! We'll be in touch within 24 hours.");
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
                Book an Inquiry
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
              availability, discuss your event, and answer any questions.
            </p>

            <div className="flex flex-col gap-6">
              {[
                {
                  icon: "✉️",
                  label: "Email",
                  value: "idris.grant@gmail.com",
                  href: "mailto:idris.grant@gmail.com",
                },
                {
                  icon: "📍",
                  label: "Location",
                  value: "Prince William Marina\nOccoquan River, Woodbridge VA",
                  href: null,
                },
                {
                  icon: "⏱️",
                  label: "Response Time",
                  value: "Within 24 hours",
                  href: null,
                },
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
                      <a
                        href={contact.href}
                        className="text-white font-body hover:text-brass transition-colors"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p
                        className="text-white/75 font-body whitespace-pre-line"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {contact.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Sunset image */}
            <div className="mt-10 photo-card aspect-video">
              <img
                src={IMAGES.heroSunset}
                alt="Yacht at sunset"
                className="w-full h-full object-cover"
              />
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
                <h3 className="font-display font-bold text-white text-2xl mb-4">
                  Inquiry Received!
                </h3>
                <p className="text-white/65 font-body leading-relaxed max-w-sm">
                  Thank you, {form.name}. We've received your inquiry and will
                  respond within 24 hours to discuss your event and confirm
                  availability.
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
                  Charter Inquiry Form
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">
                      Full Name <span className="text-brass">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="form-input"
                      style={{ background: "oklch(0.16 0.04 240)", color: "white", borderColor: "oklch(0.72 0.12 75 / 0.25)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">
                      Email Address <span className="text-brass">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="form-input"
                      style={{ background: "oklch(0.16 0.04 240)", color: "white", borderColor: "oklch(0.72 0.12 75 / 0.25)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className="form-input"
                      style={{ background: "oklch(0.16 0.04 240)", color: "white", borderColor: "oklch(0.72 0.12 75 / 0.25)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">
                      Organization / Agency
                    </label>
                    <input
                      name="organization"
                      value={form.organization}
                      onChange={handleChange}
                      placeholder="Company or agency name"
                      className="form-input"
                      style={{ background: "oklch(0.16 0.04 240)", color: "white", borderColor: "oklch(0.72 0.12 75 / 0.25)" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">
                      Event Type <span className="text-brass">*</span>
                    </label>
                    <select
                      name="eventType"
                      value={form.eventType}
                      onChange={handleChange}
                      required
                      className="form-input"
                      style={{ background: "oklch(0.16 0.04 240)", color: form.eventType ? "white" : "oklch(0.65 0.02 240)", borderColor: "oklch(0.72 0.12 75 / 0.25)" }}
                    >
                      <option value="" disabled>Select event type</option>
                      <option value="corporate-outing">Corporate Team Outing</option>
                      <option value="government-meeting">Government Client Meeting</option>
                      <option value="sunset-cruise">Sunset Cruise</option>
                      <option value="private-celebration">Private Celebration</option>
                      <option value="executive-retreat">Executive Retreat</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">
                      Preferred Package
                    </label>
                    <select
                      name="package"
                      value={form.package}
                      onChange={handleChange}
                      className="form-input"
                      style={{ background: "oklch(0.16 0.04 240)", color: form.package ? "white" : "oklch(0.65 0.02 240)", borderColor: "oklch(0.72 0.12 75 / 0.25)" }}
                    >
                      <option value="" disabled>Select a package</option>
                      <option value="sunset">Sunset Cruise (3 hrs) — $750–$900</option>
                      <option value="half-day">Half-Day Corporate (4 hrs) — $1,000–$1,400</option>
                      <option value="full-day">Full-Day Charter (8 hrs) — $1,800–$2,400</option>
                      <option value="unsure">Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">
                      Preferred Date
                    </label>
                    <input
                      name="eventDate"
                      type="date"
                      value={form.eventDate}
                      onChange={handleChange}
                      className="form-input"
                      style={{ background: "oklch(0.16 0.04 240)", color: "white", borderColor: "oklch(0.72 0.12 75 / 0.25)", colorScheme: "dark" }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">
                      Number of Guests
                    </label>
                    <select
                      name="guestCount"
                      value={form.guestCount}
                      onChange={handleChange}
                      className="form-input"
                      style={{ background: "oklch(0.16 0.04 240)", color: form.guestCount ? "white" : "oklch(0.65 0.02 240)", borderColor: "oklch(0.72 0.12 75 / 0.25)" }}
                    >
                      <option value="" disabled>Select guest count</option>
                      <option value="1-2">1–2 guests</option>
                      <option value="3-4">3–4 guests</option>
                      <option value="5-6">5–6 guests</option>
                      <option value="7-8">7–8 guests (maximum)</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">
                    Tell Us About Your Event
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your event, any special requirements, questions about catering, etc."
                    rows={4}
                    className="form-input resize-none"
                    style={{ background: "oklch(0.16 0.04 240)", color: "white", borderColor: "oklch(0.72 0.12 75 / 0.25)" }}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">
                    How Did You Hear About Us?
                  </label>
                  <select
                    name="hearAbout"
                    value={form.hearAbout}
                    onChange={handleChange}
                    className="form-input"
                    style={{ background: "oklch(0.16 0.04 240)", color: form.hearAbout ? "white" : "oklch(0.65 0.02 240)", borderColor: "oklch(0.72 0.12 75 / 0.25)" }}
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="referral">Referral from colleague</option>
                    <option value="boatsetter">Boatsetter / GetMyBoat</option>
                    <option value="google">Google Search</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="communityforce">CommunityForce website</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-brass w-full justify-center"
                  style={{ opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? "Sending Inquiry..." : "Submit Inquiry"}
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
          {/* Brand */}
          <div>
            <div className="mb-4">
              <div
                className="text-white font-display font-bold"
                style={{ fontSize: "1.25rem" }}
              >
                CommunityForce Marine
              </div>
              <div
                className="text-brass font-body font-light uppercase tracking-widest"
                style={{ fontSize: "0.65rem", letterSpacing: "0.22em" }}
              >
                Premium Charter & Business Venue
              </div>
            </div>
            <p className="text-white/45 font-body leading-relaxed" style={{ fontSize: "0.875rem" }}>
              A 41'9" Sea Ray 390 Motor Yacht berthed at Prince William Marina on
              the Occoquan River, Woodbridge Virginia. Captain-hosted charters and
              executive meeting venue services.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-brass font-body font-medium uppercase tracking-widest mb-4"
              style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
            >
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "The Vessel", id: "vessel" },
                { label: "Charter Packages", id: "packages" },
                { label: "Photo Gallery", id: "gallery" },
                { label: "Business Venue", id: "venue" },
                { label: "The Marina", id: "marina" },
                { label: "Book an Inquiry", id: "inquiry" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-white/50 hover:text-brass transition-colors text-left font-body"
                  style={{ fontSize: "0.875rem" }}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="/social-venue"
                className="text-white/50 hover:text-brass transition-colors text-left font-body"
                style={{ fontSize: "0.875rem", textDecoration: "none" }}
              >
                Social Charters
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-brass font-body font-medium uppercase tracking-widest mb-4"
              style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
            >
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <div>
                <div className="text-white/40 font-body text-xs uppercase tracking-wider mb-1">Email</div>
                <a
                  href="mailto:idris.grant@gmail.com"
                  className="text-white/75 hover:text-brass transition-colors font-body"
                  style={{ fontSize: "0.875rem" }}
                >
                  idris.grant@gmail.com
                </a>
              </div>
              <div>
                <div className="text-white/40 font-body text-xs uppercase tracking-wider mb-1">Location</div>
                <p className="text-white/75 font-body" style={{ fontSize: "0.875rem" }}>
                  Prince William Marina
                  <br />
                  Occoquan River
                  <br />
                  Woodbridge, VA 22191
                </p>
              </div>
              <div>
                <div className="text-white/40 font-body text-xs uppercase tracking-wider mb-1">Season</div>
                <p className="text-white/75 font-body" style={{ fontSize: "0.875rem" }}>
                  Peak: May – October
                  <br />
                  Corporate meetings year-round
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="gold-rule mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 font-body" style={{ fontSize: "0.8rem" }}>
            © 2026 CommunityForce Marine LLC. All rights reserved.
          </p>
          <p className="text-white/30 font-body" style={{ fontSize: "0.8rem" }}>
            A CommunityForce venture · Prince William Marina · Woodbridge, Virginia
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Home Component ───────────────────────────────────────────────────────
export default function Home() {
  useScrollReveal();

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-body)" }}>
      <Navigation />
      <HeroSection />
      <AboutStrip />
      <VesselSection />
      <CharterPackages />
      <GallerySection />
      <BusinessVenueSection />
      <MarinaSection />
      <InquiryForm />
      <Footer />
    </div>
  );
}
