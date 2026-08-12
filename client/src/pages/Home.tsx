/*
 * Luna Sea Marine — Home Page
 * Design: Coastal Modernism
 * Deep Navy + Brass + Ivory | Playfair Display + DM Sans
 * Sections: Nav, Hero, About, Vessel, Charter Packages, Gallery, Business Venue, Inquiry Form, Footer
 */

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { MarinaMap } from "@/components/MarinaMap";

// ─── Image CDN URLs ───────────────────────────────────────────────────────────
const IMAGES = {
  // Generated hero images
  heroBg: "/images/hero_390_v7-nNzjbRbccmZTdwhqs4ZoR5.webp",
  heroSunset: "/images/hero_sunset-3CfVwAu7r47S25P8yyUrge.webp",
  corporateMeeting: "/images/biz_4prof_cockpit_carpet_e4ecb865.png",
  marinaAerial: "/images/marina_aerial-7jo7oWLJucnQE22C7zJYeT.webp",
  // PWMarina facility photos
  pwmDock: "/images/pwm_dock_view_b7910622.jpg",
  pwmDeck: "/images/pwm_deck_view_248e4990.jpg",
  pwmAerialFall: "/images/pwm_aerial_fall_c2bb8f09.jpg",
  pwmAerialSummer: "/images/pwm_aerial_summer_72822424.jpg",
  // Business meeting photos (updated Mar 2026 — real yacht meeting scenes)
  meeting1: "/images/biz_3prof_salon_6b61f1b9.png",
  meeting2: "/images/biz_4prof_cockpit_marina_41552692.png",
  meeting4: "/images/biz_group_salon_working_4c0edee9.png",
  meeting5: "/images/biz_group_salon_45d05ab0.png",
  // Additional business meeting photos
  biz3ProfRiver: "/images/biz_3prof_river_b1932ffa.png",
  biz3ProfSalon2: "/images/biz_3prof_salon2_6ce3facd.png",
  biz4ProfCarpet: "/images/biz_4prof_cockpit_carpet_e4ecb865.png",
  bizCockpit1: "/images/biz_cockpit1_5115a092.png",
  bizCockpit2: "/images/biz_cockpit2_d9eeabea.png",
  bizCockpit3: "/images/biz_cockpit3_72a74766.png",
  bizCockpit4: "/images/biz_cockpit4_584f7faa.png",
  // Real owner boat photos (high-accuracy Sea Ray 390)
  // The three filenames previously here were dead CDN keys — the bucket answers
  // 403 for objects that never existed, so they were never private, just wrong.
  // Repointed at photographs already in the manifest: Luna Sea at her Prince
  // William Marina slip, the 390 on the Occoquan, and the marina at golden hour.
  boatReal1: "/images/lunasea2_landscape_d63608ce.png",
  boatReal2: "/images/IMG_0787_03fa7333.JPG",
  boatReal3: "/images/pw_marina2_landscape_f37bf649.png",
  // Actual boat photos
  boat1: "/images/IMG_8289_bc046952.JPEG",
  boat2: "/images/IMG_8290_01cfc281.JPEG",
  boat3: "/images/IMG_8291_1f65c251.JPEG",
  boat4: "/images/IMG_8293_4e2b7de0.JPEG",
  boat5: "/images/IMG_8294_655f14a2.JPEG",
  boat6: "/images/IMG_8295_c1e86252.JPEG",
  boat7: "/images/IMG_8296_31bf9fcd.JPEG",
  boat8: "/images/IMG_8297_81a5e070.JPEG",
  // Interior / marina photos
  interior1: "/images/IMG_8270_f111aded.JPEG",
  interior2: "/images/IMG_8273_7e401905.JPEG",
  interior3: "/images/IMG_8276_ef4bea75.JPEG",
  interior4: "/images/IMG_8278_67bf308e.JPEG",
  interior5: "/images/IMG_8280_118bda8e.JPEG",
  interior6: "/images/IMG_8281_23f89c80.JPEG",
  // Marina / resort photos
  marina1: "/images/b1_814d2b40.jpg",
  marina2: "/images/b5_f98c1238.jpg",
  marina3: "/images/b6_e68c25be.jpg",
  marina5: "/images/IMG_7674_80a14cde.JPG",
  marina6: "/images/IMG_0097_46e54073.JPG",
  marina7: "/images/IMG_0098_0d418f81.JPG",
  marina8: "/images/IMG_0787_03fa7333.JPG",
  // New high-res marina facility photos (user-provided, Mar 2026)
  pwPool1: "/images/pw_pool1_square_c48dece8.png",
  pwBathhousePool: "/images/pw_bathhouse_pool_portrait_3cde740c.png",
  epalm3: "/images/epalm3_portrait_ec73b49c.png",
  pwPoolPortrait: "/images/pw_pool_portrait_378eaa0e.png",
  marinaAerialLandscape: "/images/marina_aerial_landscape_ee467009.png",
  pwMarina1: "/images/pw_marina1_landscape_9425392b.png",
  pwMarina2: "/images/pw_marina2_landscape_f37bf649.png",
  epalm4: "/images/epalm4_landscape_042d9aee.png",
  epalm1: "/images/epalm1_landscape_5616e665.png",
  lunaSea1: "/images/lunasea1_landscape_baeae85d.png",
  lunaSea2: "/images/lunasea2_landscape_d63608ce.png",
  marina3Landscape: "/images/marina3_landscape_84f04340.png",
  // New cockpit & interior photos
  cockpit1: "/images/cockpitimage1_47ab1ea0.jpg",
  cockpit4: "/images/cockpitimage4_9458350e.jpg",
  cockpit5: "/images/cockpitimage5_a6837624.jpg",
  stateroom: "/images/IMG_8293_f0a2b0b1.jpg",
  galley1: "/images/IMG_8296_87b61edd.jpg",
  stateroomDoors: "/images/b6_536f6ef7.jpg",
  bathroom: "/images/IMG_8270_926e37c0.jpg",
  fridge: "/images/IMG_8273_257a8533.jpg",
  salon: "/images/IMG_8276_22c05a58.jpg",
  vanity: "/images/IMG_8278_e002a5cd.jpg",
  galley2: "/images/IMG_8272_3c7fce3a.jpg",
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
        <a
          href="/"
          className="flex flex-col leading-none"
          style={{ textDecoration: "none" }}
        >
          <div className="flex items-center gap-2">
            <img
              src="/images/luna_sea_marine_logo-5yYTbKz7zrmVitDLMtP6Qb.webp"
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
                className="text-brass-light font-body font-light tracking-widest uppercase"
                style={{ fontSize: "0.6rem", letterSpacing: "0.22em" }}
              >
                Marine
              </span>
            </div>
          </div>
        </a>

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
          <a
            href="/stay-aboard"
            className="nav-link hover:text-white transition-colors"
            style={{ textDecoration: "none", color: "oklch(0.72 0.12 75)" }}
          >
            Stay Aboard
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
            <a
              href="/stay-aboard"
              className="text-left font-body font-medium py-1"
              style={{ textDecoration: "none", color: "oklch(0.72 0.12 75)" }}
            >
              Stay Aboard
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
          alt="Luna Sea Marine yacht at sunset"
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
            celebrations, and sunset cruises. Every voyage is personally hosted.
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
              { value: "~300 hrs", label: "Engine Hours" },
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
    { label: "Engine Hours", value: "~300 hours" },
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
            with wet bar. At approximately 300 engine hours, the vessel is exceptionally low-hours and
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
            Every charter is personally hosted by Idris Grant. The vessel never departs
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryCategories = [
    { label: "All", key: "all" },
    { label: "Exterior", key: "exterior" },
    { label: "Interior", key: "interior" },
    { label: "Marina", key: "marina" },
  ];
  const [activeCategory, setActiveCategory] = useState("all");

  const allGalleryImages = [
    { src: IMAGES.boatReal1, alt: "Sea Ray 390 Motor Yacht at Prince William Marina", cat: "exterior" },
    { src: IMAGES.boatReal2, alt: "Sea Ray 390 docked on the Occoquan River", cat: "exterior" },
    { src: IMAGES.boatReal3, alt: "Prince William Marina waterfront at golden hour", cat: "marina" },
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
    { src: IMAGES.marina1, alt: "Sea Ray 390 Motor Yacht at her berth", cat: "marina" },
    { src: IMAGES.marina2, alt: "Luna Sea berthed at Prince William Marina", cat: "marina" },
    { src: IMAGES.pwmAerialSummer, alt: "Marina aerial view", cat: "marina" },
    { src: IMAGES.pwmDock, alt: "Marina dock walkway", cat: "marina" },
    { src: IMAGES.marina8, alt: "Sea Ray 390 Motor Yacht on the Occoquan River", cat: "marina" },
  ];

  const galleryImages = activeCategory === "all"
    ? allGalleryImages
    : allGalleryImages.filter((img) => img.cat === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null));
  const nextImage = () => setLightboxIndex((i) => (i !== null ? (i + 1) % galleryImages.length : null));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, galleryImages.length]);

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
              className="photo-card cursor-pointer group"
              style={{
                gridRow: i === 0 || i === 7 ? "span 2" : "span 1",
              }}
              onClick={() => openLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/40 transition-colors duration-300 flex items-end justify-start p-3">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                    <span className="text-white font-body" style={{ fontSize: "0.7rem", letterSpacing: "0.1em" }}>ENLARGE</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-5 right-5 z-10 flex items-center justify-center rounded-full transition-colors"
            style={{ width: 44, height: 44, background: "oklch(0.72 0.12 75 / 0.15)", border: "1px solid oklch(0.72 0.12 75 / 0.4)" }}
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev button */}
          <button
            className="absolute left-4 md:left-8 z-10 flex items-center justify-center rounded-full transition-all hover:scale-110"
            style={{ width: 52, height: 52, background: "oklch(0.72 0.12 75 / 0.15)", border: "1px solid oklch(0.72 0.12 75 / 0.4)" }}
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Previous image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Image + caption */}
          <div
            className="flex flex-col items-center gap-4 px-20 md:px-28"
            style={{ maxWidth: "90vw", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              className="object-contain rounded-sm"
              style={{ maxWidth: "85vw", maxHeight: "78vh" }}
            />
            <div className="flex flex-col items-center gap-1">
              <p className="text-white/80 font-body text-center" style={{ fontSize: "0.875rem" }}>
                {galleryImages[lightboxIndex].alt}
              </p>
              <p className="text-white/35 font-body" style={{ fontSize: "0.75rem" }}>
                {lightboxIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </div>

          {/* Next button */}
          <button
            className="absolute right-4 md:right-8 z-10 flex items-center justify-center rounded-full transition-all hover:scale-110"
            style={{ width: 52, height: 52, background: "oklch(0.72 0.12 75 / 0.15)", border: "1px solid oklch(0.72 0.12 75 / 0.4)" }}
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Next image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                className="rounded-full transition-all"
                style={{
                  width: i === lightboxIndex ? 20 : 6,
                  height: 6,
                  background: i === lightboxIndex ? "oklch(0.72 0.12 75)" : "oklch(0.72 0.12 75 / 0.35)",
                }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Captain Bio Section ────────────────────────────────────────────────────
function CaptainBioSection() {
  return (
    <section id="captain" className="bg-navy py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <div className="reveal order-2 lg:order-1">
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: "2px" }}
            >
              <img
                src={IMAGES.boatReal1}
                alt="Luna Sea, a Sea Ray 390 Motor Yacht, at her Prince William Marina slip"
                className="w-full object-cover"
                style={{ maxHeight: 480 }}
              />
              {/* Brass accent bar */}
              <div
                className="absolute bottom-0 left-0 right-0 py-4 px-6"
                style={{ background: "linear-gradient(to top, oklch(0.10 0.04 240 / 0.9), transparent)" }}
              >
                <p className="text-brass font-body font-medium uppercase tracking-widest" style={{ fontSize: "0.65rem", letterSpacing: "0.2em" }}>
                  Sea Ray 390 Motor Yacht · Prince William Marina
                </p>
              </div>
            </div>
          </div>

          {/* Bio content */}
          <div className="reveal order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-brass" />
              <span
                className="text-brass font-body font-medium uppercase tracking-widest"
                style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
              >
                Your Captain
              </span>
            </div>
            <h2
              className="font-display font-bold text-white mb-2"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Idris Grant
            </h2>
            <p className="text-brass font-body mb-6" style={{ fontSize: "0.875rem", letterSpacing: "0.08em" }}>
              Occoquan River Host · Prince William Marina
            </p>
            <p className="text-white/70 font-body leading-relaxed mb-5" style={{ fontSize: "0.9375rem" }}>
              Idris Grant brings years of experience navigating the Occoquan River and
              Potomac waterways aboard the <em>Luna Sea</em> — a 41'9" Sea Ray 390 Motor Yacht
              based at Prince William Marina in Woodbridge, Virginia. Every voyage is personally
              personally hosted, ensuring a safe, relaxed, and memorable experience on the water.
            </p>
            <p className="text-white/70 font-body leading-relaxed mb-8" style={{ fontSize: "0.9375rem" }}>
              Whether you're hosting a corporate retreat, a family celebration, a romantic sunset
              cruise, or an overnight stay aboard, Captain Grant tailors every charter to your
              group's pace — from anchoring at a quiet cove to cruising past the historic
              Occoquan waterfront.
            </p>
            {/* Credential badges */}
            <div className="flex flex-wrap gap-3">
              {[
                "Experienced River Host",
                "CPR / First Aid Certified",
                "Occoquan River Expert",
                "8 Guests Max",
              ].map((badge) => (
                <span
                  key={badge}
                  className="font-body uppercase tracking-widest"
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    padding: "0.4rem 0.9rem",
                    border: "1px solid oklch(0.72 0.12 75 / 0.4)",
                    color: "oklch(0.72 0.12 75)",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
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
              Luna Sea Marine serves as a dedicated government client meeting
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
                  desc: "Hosted by Luna Sea Marine principals — ideal for SES, GS-15, and agency leadership.",
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
                  src={IMAGES.meeting1}
                  alt="Three professionals in business meeting aboard yacht salon"
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

        {/* Photo gallery strip — all new meeting images */}
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
          {/* Row 1: 3 photos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="photo-card aspect-[4/3]">
              <img
                src={IMAGES.meeting2}
                alt="Four professionals in business meeting at marina cockpit"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="photo-card aspect-[4/3]">
              <img
                src={IMAGES.biz3ProfRiver}
                alt="Three professionals meeting aboard yacht on the river"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="photo-card aspect-[4/3]">
              <img
                src={IMAGES.biz3ProfSalon2}
                alt="Business meeting in yacht salon with documents"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Row 2: 4 photos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="photo-card aspect-[4/3]">
              <img
                src={IMAGES.bizCockpit1}
                alt="Professionals meeting in yacht cockpit with water view"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="photo-card aspect-[4/3]">
              <img
                src={IMAGES.bizCockpit2}
                alt="Business team reviewing charts in yacht cockpit"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="photo-card aspect-[4/3]">
              <img
                src={IMAGES.bizCockpit3}
                alt="Three professionals with tablet and documents in cockpit"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="photo-card aspect-[4/3]">
              <img
                src={IMAGES.bizCockpit4}
                alt="Professionals discussing strategy in yacht cockpit"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Row 3: 2 salon photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="photo-card aspect-video">
              <img
                src={IMAGES.meeting4}
                alt="Four professionals in yacht salon working session"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="photo-card aspect-video">
              <img
                src={IMAGES.meeting5}
                alt="Business group in yacht salon with river views"
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
  const marinaPhotos = [
    { src: IMAGES.marinaAerialLandscape, alt: "Prince William Marina aerial view" },
    { src: IMAGES.pwMarina1, alt: "Prince William Marina dock" },
    { src: IMAGES.pwMarina2, alt: "Prince William Marina waterfront" },
    { src: IMAGES.marina3Landscape, alt: "Marina facilities landscape" },
    { src: IMAGES.epalm1, alt: "The Electric Palm Restaurant" },
    { src: IMAGES.epalm4, alt: "The Electric Palm Restaurant exterior" },
    { src: IMAGES.epalm3, alt: "The Electric Palm Restaurant from the road" },
    { src: IMAGES.lunaSea1, alt: "Sea Ray 390 Motor Yacht at her berth" },
    { src: IMAGES.lunaSea2, alt: "Luna Sea berthed at Prince William Marina" },
    { src: IMAGES.pwPool1, alt: "Prince William Marina pool" },
    { src: IMAGES.pwPoolPortrait, alt: "Marina pool and resort" },
    { src: IMAGES.pwBathhousePool, alt: "Marina bathhouse and lawn" },
  ];

  return (
    <section id="marina" className="bg-white py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-brass" />
            <span
              className="text-brass font-body font-medium uppercase tracking-widest"
              style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
            >
              The Marina
            </span>
            <div className="h-px w-10 bg-brass" />
          </div>
          <h2
            className="font-display font-bold text-navy mb-4"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          >
            Prince William Marina
            <br />
            <span className="text-brass">Resort & Marina</span>
          </h2>
          <p className="text-navy/65 font-body leading-relaxed max-w-2xl mx-auto" style={{ fontSize: "1rem" }}>
            Luna Sea Marine is berthed at Prince William Marina on the historic Occoquan River
            in Woodbridge, Virginia — a full-service resort marina with exceptional amenities and
            easy access from the Northern Virginia and DC federal corridor.
          </p>
        </div>

        {/* Hero row: large aerial + tall portrait */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 reveal">
          <div className="photo-card md:col-span-2 aspect-video">
            <img src={marinaPhotos[0].src} alt={marinaPhotos[0].alt} className="w-full h-full object-cover" />
          </div>
          <div className="photo-card aspect-video md:aspect-auto" style={{ minHeight: "280px" }}>
            <img src={marinaPhotos[10].src} alt={marinaPhotos[10].alt} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Second row: 4 landscape thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 reveal">
          {marinaPhotos.slice(1, 5).map((photo, i) => (
            <div key={i} className="photo-card aspect-video">
              <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Third row: dining & pool — 4 more */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 reveal">
          {marinaPhotos.slice(5, 9).map((photo, i) => (
            <div key={i} className="photo-card aspect-video">
              <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Amenities strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
          {[
            { icon: "📍", label: "Location", text: "Prince William Marina, Occoquan River, Woodbridge VA 22191" },
            { icon: "🚗", label: "Access", text: "25 miles south of DC via I-95 & Route 1 — easy for Northern Virginia clients" },
            { icon: "🍽️", label: "Dining", text: "The Electric Palm Restaurant & Luna Sea Bar — waterfront dining steps from the dock" },
            { icon: "🏖️", label: "Facilities", text: "Pool, fuel dock, ship store, Boatel, and full waterfront resort amenities" },
            { icon: "⛵", label: "Slips", text: "Over 300 wet slips and dry storage — Northern Virginia's premier boating destination" },
            { icon: "🌿", label: "Setting", text: "Lush Virginia woodland shoreline on the scenic historic Occoquan River" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4 p-5 rounded-lg" style={{ background: "oklch(0.97 0.002 240)" }}>
              <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{item.icon}</span>
              <div>
                <p className="font-body font-semibold text-navy mb-1" style={{ fontSize: "0.85rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>{item.label}</p>
                <p className="text-navy/65 font-body" style={{ fontSize: "0.875rem", lineHeight: "1.6" }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Map */}
        <div className="mt-12 reveal">
          <div className="rounded-xl overflow-hidden shadow-lg" style={{ height: 380 }}>
            <MarinaMap
              className="w-full h-full"
              lat={38.6818}
              lng={-77.2598}
              zoom={14}
            />
          </div>
          <p className="text-center text-navy/50 font-body mt-3" style={{ fontSize: "0.8rem" }}>
            Prince William Marina · 12849 Gordon Blvd, Woodbridge, VA 22191
          </p>
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
    preferredTime: "",
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
    if (!form.name || !form.email || !form.eventType) {
      toast.error("Please fill in the required fields.");
      return;
    }
    const subject = encodeURIComponent(
      `Charter Inquiry — ${form.eventType}${form.eventDate ? ` on ${form.eventDate}` : ""}`
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone || "Not provided"}\n` +
      `Event Type: ${form.eventType}\n` +
      `Preferred Date: ${form.eventDate || "Flexible"}\n` +
      `Preferred Time: ${form.preferredTime || "Flexible"}\n` +
      `Number of Guests: ${form.guestCount || "Not specified"}\n` +
      `Package Interest: ${form.package || "Not specified"}\n` +
      `How They Heard About Us: ${form.hearAbout || "Not specified"}\n\n` +
      `Additional Message:\n${form.message || "None"}`
    );
    window.location.href = `mailto:idris.grant@gmail.com?subject=${subject}&body=${body}`;
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
                  icon: "📞",
                  label: "Phone / Text",
                  value: "703-957-8309",
                  href: "tel:7039578309",
                },
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

            {/* Real boat photo */}
            <div className="mt-10 photo-card aspect-video">
              <img
                src={IMAGES.boatReal1}
                alt="Sea Ray 390 Motor Yacht at Prince William Marina"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-navy/20" />
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3 reveal">
            {submitted ? (
              <div
                className="h-full flex flex-col items-center justify-center text-center p-10"
                style={{ background: "oklch(0.22 0.04 240)", border: "1px solid oklch(0.72 0.12 75 / 0.3)" }}
              >
                {/* Animated check */}
                <div
                  className="flex items-center justify-center mb-6 rounded-full"
                  style={{ width: 72, height: 72, background: "oklch(0.72 0.12 75 / 0.15)", border: "2px solid oklch(0.72 0.12 75 / 0.5)" }}
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M6 16l7 7 13-13" stroke="oklch(0.72 0.12 75)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-white text-2xl mb-2">
                  Inquiry Sent!
                </h3>
                <p className="text-white/55 font-body mb-8" style={{ fontSize: "0.875rem" }}>
                  We'll respond within 24 hours.
                </p>
                {/* Summary card */}
                <div className="w-full text-left rounded-sm p-5 mb-6" style={{ background: "oklch(0.16 0.04 240)", border: "1px solid oklch(0.72 0.12 75 / 0.2)" }}>
                  <div className="text-brass font-body font-medium uppercase tracking-widest mb-4" style={{ fontSize: "0.65rem", letterSpacing: "0.18em" }}>Your Booking Summary</div>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Name", value: form.name },
                      { label: "Email", value: form.email },
                      { label: "Event Type", value: form.eventType || "—" },
                      { label: "Date", value: form.eventDate || "Flexible" },
                      { label: "Time", value: form.preferredTime || "Flexible" },
                      { label: "Guests", value: form.guestCount || "—" },
                      { label: "Package", value: form.package || "—" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between gap-4">
                        <span className="text-white/40 font-body" style={{ fontSize: "0.8rem", minWidth: 80 }}>{label}</span>
                        <span className="text-white/85 font-body text-right" style={{ fontSize: "0.8rem" }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="gold-rule w-full mb-4" />
                <p className="text-brass font-body" style={{ fontSize: "0.8rem" }}>Fair winds and following seas. ⚓</p>
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
                      style={{ background: "oklch(0.16 0.04 240)", color: form.eventDate ? "white" : "oklch(0.65 0.02 240)", borderColor: "oklch(0.72 0.12 75 / 0.25)", colorScheme: "dark" }}
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 font-body text-xs uppercase tracking-wider mb-2">
                      Preferred Start Time
                    </label>
                    <select
                      name="preferredTime"
                      value={form.preferredTime}
                      onChange={handleChange}
                      className="form-input"
                      style={{ background: "oklch(0.16 0.04 240)", color: form.preferredTime ? "white" : "oklch(0.65 0.02 240)", borderColor: "oklch(0.72 0.12 75 / 0.25)" }}
                    >
                      <option value="">Flexible / TBD</option>
                      <option value="Morning (8am–11am)">Morning (8am–11am)</option>
                      <option value="Midday (11am–2pm)">Midday (11am–2pm)</option>
                      <option value="Afternoon (2pm–5pm)">Afternoon (2pm–5pm)</option>
                      <option value="Sunset (5pm–8pm)">Sunset (5pm–8pm)</option>
                      <option value="Evening (after 7pm)">Evening (after 7pm)</option>
                    </select>
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
                    <option value="communityforce">Luna Sea Marine website</option>
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
            <div className="mb-4 flex items-center gap-3">
              <img
                src="/images/luna_sea_marine_logo-5yYTbKz7zrmVitDLMtP6Qb.webp"
                alt="Luna Sea Marine"
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />
              <div>
                <div
                  className="text-white font-display font-bold"
                  style={{ fontSize: "1.25rem" }}
                >
                  Luna Sea Marine
                </div>
                <div
                  className="text-brass font-body font-light uppercase tracking-widest"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.22em" }}
                >
                  Premium Charter & Business Venue
                </div>
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
                <div className="text-white/40 font-body text-xs uppercase tracking-wider mb-1">Phone / Text</div>
                <a
                  href="tel:7039578309"
                  className="text-white/75 hover:text-brass transition-colors font-body"
                  style={{ fontSize: "0.875rem" }}
                >
                  703-957-8309
                </a>
              </div>
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

// ─── Stay Aboard Teaser ─────────────────────────────────────────────────────
function StayAboardTeaser() {
  const HERO_NIGHT = "/images/stay_aboard_hero_v6-Xmo9WpViykvTk2NTJXFjaB.webp";
  const SALON = "/images/sea_ray_390_salon_interior-TT2m2ppFgBXWYMNdgjBYgo.webp";
  const STATEROOM = "/images/sea_ray_390_stateroom_interior-naV5ZT2VcqjigW8jM25Dzo.webp";

  return (
    <section className="reveal relative overflow-hidden" style={{ background: "oklch(0.12 0.03 240)" }}>
      {/* Background image with dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${HERO_NIGHT})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, oklch(0.08 0.04 240 / 0.92) 45%, oklch(0.08 0.04 240 / 0.65) 100%)" }} />

      <div className="container relative py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <p className="font-body uppercase tracking-[0.2em] mb-4" style={{ fontSize: "0.75rem", color: "oklch(0.72 0.12 75)" }}>
              New Experience
            </p>
            <h2 className="font-display font-bold text-white mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1 }}>
              Sleep Under the Stars<br />
              <span style={{ color: "oklch(0.72 0.12 75)" }}>Aboard the Luna Sea</span>
            </h2>
            <p className="text-white/70 font-body leading-relaxed mb-8" style={{ fontSize: "1rem", maxWidth: "38ch" }}>
              Skip the hotel. Wake up on the water. The Luna Sea is available for overnight stays
              at Prince William Marina — your private 41'9" floating retreat on the Occoquan River,
              starting at just $150 a night.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { icon: "🌙", label: "1–7 Night Stays" },
                { icon: "🛏", label: "Queen Stateroom" },
                { icon: "🍽", label: "Full Galley Kitchen" },
                { icon: "🌊", label: "Swim Platform Access" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                  <span className="text-white/75 font-body" style={{ fontSize: "0.875rem" }}>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="/stay-aboard"
                className="btn-brass inline-block"
                style={{ padding: "0.85rem 2rem", fontSize: "0.85rem", textDecoration: "none" }}
              >
                View the Listing
              </a>
              <a
                href="/stay-aboard"
                className="inline-block font-body font-medium text-white/70 hover:text-white transition-colors"
                style={{ padding: "0.85rem 0", fontSize: "0.85rem", textDecoration: "none" }}
              >
                From $150 / night →
              </a>
            </div>
          </div>

          {/* Right — photo pair */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div
              className="rounded-sm overflow-hidden"
              style={{ aspectRatio: "3/4", boxShadow: "0 20px 60px oklch(0 0 0 / 0.5)" }}
            >
              <img src={SALON} alt="Salon interior" className="w-full h-full object-cover" />
            </div>
            <div
              className="rounded-sm overflow-hidden mt-8"
              style={{ aspectRatio: "3/4", boxShadow: "0 20px 60px oklch(0 0 0 / 0.5)" }}
            >
              <img src={STATEROOM} alt="Master stateroom" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>

        {/* Bottom strip — price + CTA */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ borderTop: "1px solid oklch(0.72 0.12 75 / 0.2)" }}
        >
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-white" style={{ fontSize: "2rem" }}>$150</span>
            <span className="text-white/50 font-body" style={{ fontSize: "0.875rem" }}>/ night · 1-night minimum</span>
          </div>
          <div className="flex items-center gap-6 text-white/50 font-body" style={{ fontSize: "0.8rem" }}>
            <span>✓ Cleaning included</span>
            <span>✓ Up to 4 guests</span>
            <span>✓ Prince William Marina</span>
          </div>
        </div>
      </div>
    </section>
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
      <CaptainBioSection />
      <BusinessVenueSection />
      <MarinaSection />
      <StayAboardTeaser />
      <InquiryForm />
      <Footer />
    </div>
  );
}
