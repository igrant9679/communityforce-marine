/**
 * Luna Sea Marine — Stay Aboard Page
 * Design: Coastal Modernism — Deep Navy + Brass + Ivory | Playfair Display + DM Sans
 * Airbnb-style overnight / multi-night stay booking for the Sea Ray 390 Motor Yacht
 */

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

// ─── Image CDN URLs ───────────────────────────────────────────────────────────
const IMAGES = {
  logo: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/luna_sea_marine_logo-5yYTbKz7zrmVitDLMtP6Qb.webp",
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/stay_aboard_hero-btKRnPjSYtgRTv3qF9BEEG.webp",
  salonNight: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/sea_ray_390_salon_interior-TT2m2ppFgBXWYMNdgjBYgo.webp",
  stateroomNight: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/sea_ray_390_stateroom_interior-naV5ZT2VcqjigW8jM25Dzo.webp",
  boatDay: "/manus-storage/IMG_0884_0eb5630e.JPG",
  boatRiver: "/manus-storage/IMG_0787_3b05bbdf.JPG",
  swimPlatform: "/manus-storage/b3_6de55c03.jpg",
  salon: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/sea_ray_390_salon_interior-TT2m2ppFgBXWYMNdgjBYgo.webp",
  stateroom: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/sea_ray_390_stateroom_interior-naV5ZT2VcqjigW8jM25Dzo.webp",
  galley: "https://d2xsxph8kpxj0f.cloudfront.net/105450714/mn5ePzJGJrovVnJuBnxonq/sea_ray_390_cockpit_evening-FwQR9EUwHJUBRb6aPvFKEG.webp",
  bathroom: "/manus-storage/b3_6de55c03.jpg",
};

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal, .reveal-stagger").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <Link href="/" className="flex items-center gap-2">
          <img src={IMAGES.logo} alt="Luna Sea Marine" className="w-8 h-8 object-contain" />
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-white" style={{ fontSize: "1.1rem", letterSpacing: "0.02em" }}>
              Luna Sea
            </span>
            <span className="font-body font-medium uppercase tracking-widest text-brass" style={{ fontSize: "0.55rem", letterSpacing: "0.25em" }}>
              MARINE
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Home", href: "/" },
            { label: "Charter Packages", href: "/#packages" },
            { label: "Social Charters", href: "/social" },
            { label: "Stay Aboard", href: "/stay-aboard" },
            { label: "Gallery", href: "/#gallery" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-body uppercase tracking-widest transition-colors hover:text-brass"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                color: item.href === "/stay-aboard" ? "oklch(0.72 0.12 75)" : "oklch(0.85 0.02 240)",
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#booking"
          className="hidden md:block btn-brass"
          style={{ padding: "0.6rem 1.5rem", fontSize: "0.7rem" }}
        >
          CHECK AVAILABILITY
        </a>
      </div>
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end pb-20" style={{ minHeight: "100svh" }}>
      <div className="absolute inset-0">
        <img src={IMAGES.hero} alt="Luna Sea at night" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.08 0.04 240 / 0.92) 0%, oklch(0.08 0.04 240 / 0.5) 50%, oklch(0.08 0.04 240 / 0.2) 100%)",
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-10 bg-brass" />
            <span
              className="text-brass font-body font-medium uppercase tracking-widest"
              style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
            >
              Stay Aboard · Prince William Marina
            </span>
          </div>
          <h1
            className="font-display font-bold text-white mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1.05 }}
          >
            Your Private Floating<br />
            <em className="text-brass not-italic">Retreat</em> on the Water
          </h1>
          <p className="text-white/75 font-body leading-relaxed mb-10" style={{ fontSize: "1rem", maxWidth: 520 }}>
            Book the <em>Luna Sea</em> for one or more nights — just like an Airbnb, but on a
            41'9" Sea Ray 390 Motor Yacht moored at Prince William Marina on the Occoquan River.
            Wake up to the sound of water, watch the sunrise from the cockpit, and spend your
            days exploring the river at your own pace.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#booking" className="btn-brass">
              CHECK AVAILABILITY
            </a>
            <a
              href="#spaces"
              className="font-body uppercase tracking-widest transition-colors hover:text-brass text-white/70"
              style={{ fontSize: "0.75rem", letterSpacing: "0.15em", padding: "0.75rem 0", display: "flex", alignItems: "center", gap: 8 }}
            >
              EXPLORE THE VESSEL
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick stats bar */}
        <div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{ background: "oklch(0.72 0.12 75 / 0.2)" }}
        >
          {[
            { value: "41'9\"", label: "Motor Yacht" },
            { value: "2 Cabins", label: "Sleeping Spaces" },
            { value: "4 Guests", label: "Max Overnight" },
            { value: "From $150", label: "Per Night" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-5 px-4 text-center"
              style={{ background: "oklch(0.08 0.04 240 / 0.7)", backdropFilter: "blur(8px)" }}
            >
              <span className="font-display font-bold text-white" style={{ fontSize: "1.5rem" }}>
                {stat.value}
              </span>
              <span
                className="font-body uppercase tracking-widest text-brass/80 mt-1"
                style={{ fontSize: "0.6rem", letterSpacing: "0.18em" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Photo Gallery Strip ───────────────────────────────────────────────────────
function PhotoStrip() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const photos = [
    { src: IMAGES.hero, alt: "Luna Sea at night at the marina" },
    { src: IMAGES.salonNight, alt: "Salon dining for two at night" },
    { src: IMAGES.stateroomNight, alt: "Master stateroom with queen berth" },
    { src: IMAGES.boatDay, alt: "Sea Ray 390 at Prince William Marina" },
    { src: IMAGES.boatRiver, alt: "Sea Ray 390 on the Occoquan River" },
    { src: IMAGES.salon, alt: "Salon seating area" },
    { src: IMAGES.galley, alt: "Full galley kitchen" },
    { src: IMAGES.bathroom, alt: "Head with stand-up shower" },
  ];

  const prev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex]);

  return (
    <section id="photos" className="bg-navy-dark py-4">
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "260px 260px" }}
      >
        {/* Large hero photo */}
        <div
          className="photo-card cursor-pointer group"
          style={{ gridRow: "span 2" }}
          onClick={() => setLightboxIndex(0)}
        >
          <img src={photos[0].src} alt={photos[0].alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/30 transition-colors duration-300" />
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-black/60 backdrop-blur-sm text-white font-body px-3 py-1.5 text-xs uppercase tracking-wider">View all photos</span>
          </div>
        </div>
        {/* Smaller photos */}
        {photos.slice(1, 5).map((photo, i) => (
          <div
            key={i}
            className="photo-card cursor-pointer group"
            onClick={() => setLightboxIndex(i + 1)}
          >
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-navy-dark/0 group-hover:bg-navy-dark/30 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-5 right-5 z-10 flex items-center justify-center rounded-full"
            style={{ width: 44, height: 44, background: "oklch(0.72 0.12 75 / 0.15)", border: "1px solid oklch(0.72 0.12 75 / 0.4)" }}
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
          <button
            className="absolute left-4 md:left-8 z-10 flex items-center justify-center rounded-full"
            style={{ width: 52, height: 52, background: "oklch(0.72 0.12 75 / 0.15)", border: "1px solid oklch(0.72 0.12 75 / 0.4)" }}
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div className="flex flex-col items-center gap-4 px-20 md:px-28" style={{ maxWidth: "90vw" }} onClick={(e) => e.stopPropagation()}>
            <img src={photos[lightboxIndex].src} alt={photos[lightboxIndex].alt} className="object-contain rounded-sm" style={{ maxWidth: "85vw", maxHeight: "78vh" }} />
            <p className="text-white/70 font-body text-sm">{photos[lightboxIndex].alt} · {lightboxIndex + 1} / {photos.length}</p>
          </div>
          <button
            className="absolute right-4 md:right-8 z-10 flex items-center justify-center rounded-full"
            style={{ width: 52, height: 52, background: "oklch(0.72 0.12 75 / 0.15)", border: "1px solid oklch(0.72 0.12 75 / 0.4)" }}
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      )}
    </section>
  );
}

// ─── Listing Detail + Booking Form ────────────────────────────────────────────
function ListingSection() {
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: "",
    name: "",
    email: "",
    phone: "",
    occasion: "",
    notes: "",
  });
  const [nights, setNights] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const NIGHTLY_RATE = 150;
  const CLEANING_FEE = 75;
  const SERVICE_FEE = 45;

  useEffect(() => {
    if (form.checkIn && form.checkOut) {
      const diff = (new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / (1000 * 60 * 60 * 24);
      setNights(diff > 0 ? diff : 0);
    } else {
      setNights(0);
    }
  }, [form.checkIn, form.checkOut]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const total = nights * NIGHTLY_RATE + (nights > 0 ? CLEANING_FEE + SERVICE_FEE : 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.checkIn || !form.checkOut || nights < 1) {
      toast.error("Please select valid check-in and check-out dates.");
      return;
    }
    setSubmitting(true);
    const subject = encodeURIComponent(`Stay Aboard Inquiry — ${form.checkIn} to ${form.checkOut} (${nights} night${nights !== 1 ? "s" : ""})`);
    const body = encodeURIComponent(
      `Stay Aboard Booking Request\n\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone || "—"}\n` +
      `Check-In: ${form.checkIn}\n` +
      `Check-Out: ${form.checkOut}\n` +
      `Nights: ${nights}\n` +
      `Guests: ${form.guests || "—"}\n` +
      `Occasion: ${form.occasion || "—"}\n` +
      `Estimated Total: $${total.toLocaleString()}\n\n` +
      `Notes:\n${form.notes || "None"}\n\n` +
      `— Sent from LunaSeaMarine.com`
    );
    setTimeout(() => {
      window.location.href = `mailto:idris.grant@gmail.com?subject=${subject}&body=${body}`;
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Opening your email client to send the booking request!");
    }, 600);
  };

  const amenities = [
    { icon: "🛏️", label: "Master Stateroom", desc: "Queen berth with hotel-quality linens" },
    { icon: "🛁", label: "Private Head", desc: "Stand-up shower, vanity, full amenities" },
    { icon: "🍳", label: "Full Galley", desc: "Stove, microwave, refrigerator, sink" },
    { icon: "🛋️", label: "Salon Lounge", desc: "Curved leather seating, dining table" },
    { icon: "⚓", label: "Cockpit Deck", desc: "Outdoor seating, swim platform, ladder" },
    { icon: "🌊", label: "Waterfront Location", desc: "Prince William Marina, Occoquan River" },
    { icon: "🔒", label: "Private & Secure", desc: "Gated marina slip, keypad access" },
    { icon: "🎣", label: "Fishing Gear", desc: "Rods and tackle available on request" },
    { icon: "❄️", label: "Air Conditioning", desc: "Climate-controlled salon and stateroom" },
    { icon: "📺", label: "Entertainment", desc: "Flat-screen TV, Bluetooth audio" },
    { icon: "🚿", label: "Shore Power", desc: "Full shore power hookup at the slip" },
    { icon: "🅿️", label: "Free Parking", desc: "Marina parking included for guests" },
  ];

  const rules = [
    "Maximum 4 overnight guests",
    "No smoking anywhere aboard",
    "No pets (allergies policy)",
    "Check-in: 3:00 PM · Check-out: 11:00 AM",
    "Quiet hours: 10:00 PM – 8:00 AM",
    "No open flames or candles below deck",
    "Life jackets must be worn on open water",
    "Captain Idris Grant available for day cruises (add-on)",
  ];

  return (
    <section id="spaces" className="bg-ivory py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* ── Left: Listing details ── */}
          <div className="lg:col-span-2">
            {/* Title block */}
            <div className="reveal border-b pb-8 mb-8" style={{ borderColor: "oklch(0.72 0.12 75 / 0.2)" }}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="font-display font-bold text-navy mb-1" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}>
                    Luna Sea — Sea Ray 390 Motor Yacht
                  </h1>
                  <p className="text-navy/60 font-body" style={{ fontSize: "0.875rem" }}>
                    Prince William Marina · Woodbridge, Virginia · Occoquan River
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-display font-bold text-navy" style={{ fontSize: "1.5rem" }}>
                    $150 <span className="font-body font-normal text-navy/50" style={{ fontSize: "0.875rem" }}>/ night</span>
                  </span>
                  <span className="text-brass font-body" style={{ fontSize: "0.75rem" }}>From $150 · 1-night minimum</span>
                </div>
              </div>

              {/* Host + quick facts */}
              <div className="flex flex-wrap gap-6 mt-6">
                {[
                  { label: "4 guests max", icon: "👥" },
                  { label: "2 sleeping spaces", icon: "🛏️" },
                  { label: "1 full head", icon: "🚿" },
                  { label: "Hosted by Idris Grant", icon: "⚓" },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-2">
                    <span style={{ fontSize: "1rem" }}>{f.icon}</span>
                    <span className="text-navy/70 font-body" style={{ fontSize: "0.875rem" }}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="reveal mb-10">
              <h2 className="font-display font-semibold text-navy mb-4" style={{ fontSize: "1.25rem" }}>
                About This Stay
              </h2>
              <p className="text-navy/70 font-body leading-relaxed mb-4" style={{ fontSize: "0.9375rem" }}>
                Step aboard the <em>Luna Sea</em> for an unforgettable overnight or multi-night stay on the
                Occoquan River. This 41'9" Sea Ray 390 Motor Yacht is fully equipped for comfortable
                living — with a master stateroom, full galley, stand-up shower, and a spacious salon
                lounge that converts to additional sleeping space for up to 4 guests.
              </p>
              <p className="text-navy/70 font-body leading-relaxed mb-4" style={{ fontSize: "0.9375rem" }}>
                Spend your evenings on the cockpit deck under the stars, sipping wine as the marina
                lights reflect on the water. Wake up to a peaceful sunrise over the Occoquan, brew
                coffee in the galley, and decide whether to stay moored or cast off for a day cruise
                with Captain Idris Grant (available as an add-on).
              </p>
              <p className="text-navy/70 font-body leading-relaxed" style={{ fontSize: "0.9375rem" }}>
                Perfect for romantic getaways, birthday weekends, anniversary celebrations, or simply
                a unique escape from the ordinary. Prince William Marina offers secure gated access,
                free parking, and is just 30 minutes south of Washington D.C.
              </p>
            </div>

            {/* Spaces / interior photos */}
            <div className="reveal mb-10">
              <h2 className="font-display font-semibold text-navy mb-6" style={{ fontSize: "1.25rem" }}>
                The Spaces
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { src: IMAGES.stateroomNight, label: "Master Stateroom" },
                  { src: IMAGES.salonNight, label: "Salon & Dining" },
                  { src: IMAGES.galley, label: "Full Galley" },
                  { src: IMAGES.bathroom, label: "Private Head" },
                ].map((space) => (
                  <div key={space.label} className="relative overflow-hidden" style={{ borderRadius: "2px" }}>
                    <img src={space.src} alt={space.label} className="w-full object-cover" style={{ height: 200 }} />
                    <div
                      className="absolute bottom-0 left-0 right-0 py-2 px-3"
                      style={{ background: "linear-gradient(to top, oklch(0.08 0.04 240 / 0.8), transparent)" }}
                    >
                      <span className="text-white font-body" style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}>{space.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="reveal mb-10 border-t pt-8" style={{ borderColor: "oklch(0.72 0.12 75 / 0.2)" }}>
              <h2 className="font-display font-semibold text-navy mb-6" style={{ fontSize: "1.25rem" }}>
                What's Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amenities.map((a) => (
                  <div key={a.label} className="flex items-start gap-3">
                    <span style={{ fontSize: "1.25rem", lineHeight: 1.4 }}>{a.icon}</span>
                    <div>
                      <p className="font-body font-medium text-navy" style={{ fontSize: "0.875rem" }}>{a.label}</p>
                      <p className="font-body text-navy/55" style={{ fontSize: "0.8rem" }}>{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* House rules */}
            <div className="reveal border-t pt-8" style={{ borderColor: "oklch(0.72 0.12 75 / 0.2)" }}>
              <h2 className="font-display font-semibold text-navy mb-6" style={{ fontSize: "1.25rem" }}>
                House Rules
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {rules.map((rule) => (
                  <div key={rule} className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 mt-1 rounded-full"
                      style={{ width: 6, height: 6, background: "oklch(0.72 0.12 75)", marginTop: 7 }}
                    />
                    <p className="font-body text-navy/70" style={{ fontSize: "0.875rem" }}>{rule}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Booking widget ── */}
          <div className="lg:col-span-1">
            <div
              id="booking"
              className="sticky top-24 rounded-sm overflow-hidden"
              style={{ border: "1px solid oklch(0.72 0.12 75 / 0.25)", boxShadow: "0 8px 40px oklch(0.08 0.04 240 / 0.12)" }}
            >
              {submitted ? (
                <div className="p-8 flex flex-col items-center text-center bg-navy">
                  <div
                    className="flex items-center justify-center mb-5 rounded-full"
                    style={{ width: 64, height: 64, background: "oklch(0.72 0.12 75 / 0.15)", border: "2px solid oklch(0.72 0.12 75 / 0.5)" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                      <path d="M6 16l7 7 13-13" stroke="oklch(0.72 0.12 75)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-white text-xl mb-2">Request Sent!</h3>
                  <p className="text-white/55 font-body mb-6" style={{ fontSize: "0.875rem" }}>
                    We'll confirm availability and respond within 24 hours.
                  </p>
                  <div className="w-full text-left rounded-sm p-4 mb-5" style={{ background: "oklch(0.16 0.04 240)", border: "1px solid oklch(0.72 0.12 75 / 0.2)" }}>
                    <div className="text-brass font-body font-medium uppercase tracking-widest mb-3" style={{ fontSize: "0.6rem" }}>Booking Summary</div>
                    {[
                      { label: "Check-In", value: form.checkIn },
                      { label: "Check-Out", value: form.checkOut },
                      { label: "Nights", value: `${nights}` },
                      { label: "Guests", value: form.guests || "—" },
                      { label: "Est. Total", value: `$${total.toLocaleString()}` },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between gap-2 mb-1">
                        <span className="text-white/40 font-body" style={{ fontSize: "0.75rem" }}>{label}</span>
                        <span className="text-white/85 font-body" style={{ fontSize: "0.75rem" }}>{value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-brass font-body" style={{ fontSize: "0.8rem" }}>Fair winds and following seas. ⚓</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white">
                  {/* Pricing header */}
                  <div className="p-5 border-b" style={{ borderColor: "oklch(0.72 0.12 75 / 0.15)" }}>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-bold text-navy" style={{ fontSize: "1.5rem" }}>$150</span>
                      <span className="text-navy/50 font-body" style={{ fontSize: "0.875rem" }}>/ night</span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col gap-4">
                    {/* Date picker */}
                    <div
                      className="grid grid-cols-2 overflow-hidden"
                      style={{ border: "1px solid oklch(0.72 0.12 75 / 0.3)", borderRadius: "2px" }}
                    >
                      <div className="p-3 border-r" style={{ borderColor: "oklch(0.72 0.12 75 / 0.3)" }}>
                        <label className="block text-navy/50 font-body uppercase tracking-wider mb-1" style={{ fontSize: "0.6rem" }}>Check-In</label>
                        <input
                          name="checkIn"
                          type="date"
                          value={form.checkIn}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full font-body text-navy bg-transparent outline-none"
                          style={{ fontSize: "0.875rem" }}
                        />
                      </div>
                      <div className="p-3">
                        <label className="block text-navy/50 font-body uppercase tracking-wider mb-1" style={{ fontSize: "0.6rem" }}>Check-Out</label>
                        <input
                          name="checkOut"
                          type="date"
                          value={form.checkOut}
                          onChange={handleChange}
                          required
                          min={form.checkIn || new Date().toISOString().split("T")[0]}
                          className="w-full font-body text-navy bg-transparent outline-none"
                          style={{ fontSize: "0.875rem" }}
                        />
                      </div>
                    </div>

                    {/* Guests */}
                    <div style={{ border: "1px solid oklch(0.72 0.12 75 / 0.3)", borderRadius: "2px" }}>
                      <div className="p-3">
                        <label className="block text-navy/50 font-body uppercase tracking-wider mb-1" style={{ fontSize: "0.6rem" }}>Guests</label>
                        <select
                          name="guests"
                          value={form.guests}
                          onChange={handleChange}
                          required
                          className="w-full font-body text-navy bg-transparent outline-none"
                          style={{ fontSize: "0.875rem" }}
                        >
                          <option value="">Select guests</option>
                          <option value="1">1 guest</option>
                          <option value="2">2 guests</option>
                          <option value="3">3 guests</option>
                          <option value="4">4 guests (max)</option>
                        </select>
                      </div>
                    </div>

                    {/* Contact info */}
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" required className="form-input text-navy bg-white" style={{ borderColor: "oklch(0.72 0.12 75 / 0.3)", fontSize: "0.875rem" }} />
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email address" required className="form-input text-navy bg-white" style={{ borderColor: "oklch(0.72 0.12 75 / 0.3)", fontSize: "0.875rem" }} />
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone (optional)" className="form-input text-navy bg-white" style={{ borderColor: "oklch(0.72 0.12 75 / 0.3)", fontSize: "0.875rem" }} />

                    <select name="occasion" value={form.occasion} onChange={handleChange} className="form-input text-navy bg-white" style={{ borderColor: "oklch(0.72 0.12 75 / 0.3)", fontSize: "0.875rem", color: form.occasion ? undefined : "oklch(0.55 0.02 240)" }}>
                      <option value="">Occasion (optional)</option>
                      <option value="Romantic Getaway">Romantic Getaway</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Birthday Weekend">Birthday Weekend</option>
                      <option value="Bachelorette / Bachelor">Bachelorette / Bachelor</option>
                      <option value="Family Vacation">Family Vacation</option>
                      <option value="Friends Weekend">Friends Weekend</option>
                      <option value="Just for Fun">Just for Fun</option>
                    </select>

                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Any special requests or questions?"
                      rows={3}
                      className="form-input text-navy bg-white resize-none"
                      style={{ borderColor: "oklch(0.72 0.12 75 / 0.3)", fontSize: "0.875rem" }}
                    />

                    {/* Price breakdown */}
                    {nights > 0 && (
                      <div className="rounded-sm p-4" style={{ background: "oklch(0.97 0.01 240)", border: "1px solid oklch(0.72 0.12 75 / 0.15)" }}>
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between">
                            <span className="text-navy/60 font-body" style={{ fontSize: "0.8rem" }}>${NIGHTLY_RATE} × {nights} night{nights !== 1 ? "s" : ""}</span>
                            <span className="text-navy font-body" style={{ fontSize: "0.8rem" }}>${(NIGHTLY_RATE * nights).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-navy/60 font-body" style={{ fontSize: "0.8rem" }}>Cleaning fee</span>
                            <span className="text-navy font-body" style={{ fontSize: "0.8rem" }}>${CLEANING_FEE}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-navy/60 font-body" style={{ fontSize: "0.8rem" }}>Service fee</span>
                            <span className="text-navy font-body" style={{ fontSize: "0.8rem" }}>${SERVICE_FEE}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t" style={{ borderColor: "oklch(0.72 0.12 75 / 0.2)" }}>
                            <span className="text-navy font-body font-semibold" style={{ fontSize: "0.875rem" }}>Total (est.)</span>
                            <span className="text-navy font-body font-semibold" style={{ fontSize: "0.875rem" }}>${total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-brass w-full text-center"
                      style={{ padding: "0.875rem", fontSize: "0.75rem", opacity: submitting ? 0.7 : 1 }}
                    >
                      {submitting ? "SENDING REQUEST..." : "REQUEST TO BOOK"}
                    </button>
                    <p className="text-navy/40 font-body text-center" style={{ fontSize: "0.75rem" }}>
                      You won't be charged yet — Captain Idris will confirm availability within 24 hours.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Contact sidebar */}
            <div className="mt-6 p-5 rounded-sm" style={{ background: "oklch(0.10 0.04 240)", border: "1px solid oklch(0.72 0.12 75 / 0.2)" }}>
              <p className="text-brass font-body font-medium uppercase tracking-widest mb-3" style={{ fontSize: "0.65rem", letterSpacing: "0.18em" }}>Questions?</p>
              <p className="text-white/70 font-body mb-3" style={{ fontSize: "0.8rem" }}>Reach Captain Idris directly:</p>
              <div className="flex flex-col gap-2">
                <a href="tel:7039578309" className="flex items-center gap-2 text-white hover:text-brass transition-colors font-body" style={{ fontSize: "0.875rem" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                  703-957-8309
                </a>
                <a href="mailto:idris.grant@gmail.com" className="flex items-center gap-2 text-white hover:text-brass transition-colors font-body" style={{ fontSize: "0.875rem" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  idris.grant@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Add-Ons Section ──────────────────────────────────────────────────────────
function AddOnsSection() {
  const addons = [
    {
      icon: "⚓",
      title: "Day Cruise with Captain Idris",
      desc: "Add a personally hosted day cruise on the Occoquan River or Potomac. Explore coves, anchor for swimming, or cruise to a waterfront restaurant.",
      price: "From $400 / day",
    },
    {
      icon: "🍾",
      title: "Champagne & Charcuterie Welcome",
      desc: "Arrive to a chilled bottle of champagne, a curated charcuterie board, and fresh flowers in the salon — perfect for anniversaries and celebrations.",
      price: "$85 add-on",
    },
    {
      icon: "🎣",
      title: "Fishing Charter",
      desc: "Spend a morning fishing the Occoquan with Captain Idris. Rods, tackle, and bait included. Catch-and-release or keep your catch.",
      price: "From $250 / half-day",
    },
    {
      icon: "🌅",
      title: "Sunset Cocktail Cruise",
      desc: "A 2-hour evening cruise at golden hour — wine, snacks, and the most beautiful light on the river. Available as an add-on to any overnight stay.",
      price: "$300 add-on",
    },
  ];

  return (
    <section className="bg-navy-dark py-20">
      <div className="container">
        <div className="reveal mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-brass" />
            <span className="text-brass font-body font-medium uppercase tracking-widest" style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}>
              Enhance Your Stay
            </span>
            <div className="h-px w-10 bg-brass" />
          </div>
          <h2 className="font-display font-bold text-white" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}>
            Add-On Experiences
          </h2>
          <p className="text-white/55 font-body mt-3 mx-auto" style={{ fontSize: "0.9375rem", maxWidth: 520 }}>
            Customize your stay with curated add-ons. Mention any in your booking notes and Captain Idris will arrange the details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addons.map((addon) => (
            <div
              key={addon.title}
              className="reveal p-7 flex gap-5"
              style={{ background: "oklch(0.14 0.04 240)", border: "1px solid oklch(0.72 0.12 75 / 0.15)" }}
            >
              <span style={{ fontSize: "2rem", lineHeight: 1 }}>{addon.icon}</span>
              <div>
                <h3 className="font-display font-semibold text-white mb-1" style={{ fontSize: "1.05rem" }}>{addon.title}</h3>
                <p className="text-white/55 font-body leading-relaxed mb-3" style={{ fontSize: "0.875rem" }}>{addon.desc}</p>
                <span className="text-brass font-body font-medium" style={{ fontSize: "0.875rem" }}>{addon.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Location Section ─────────────────────────────────────────────────────────
function LocationSection() {
  return (
    <section className="bg-ivory py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-brass" />
              <span className="text-brass font-body font-medium uppercase tracking-widest" style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}>
                Location
              </span>
            </div>
            <h2 className="font-display font-bold text-navy mb-6" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
              Prince William Marina<br />Woodbridge, Virginia
            </h2>
            <p className="text-navy/70 font-body leading-relaxed mb-6" style={{ fontSize: "0.9375rem" }}>
              The <em>Luna Sea</em> is moored at Prince William Marina on the Occoquan River —
              a beautiful, gated marina in Woodbridge, Virginia, just 30 minutes south of
              Washington D.C. and 20 minutes from Quantico.
            </p>
            <div className="flex flex-col gap-3 mb-8">
              {[
                "30 min south of Washington D.C.",
                "Free parking at the marina",
                "Walking distance to Occoquan Village restaurants",
                "Easy access from I-95 (Exit 156)",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex-shrink-0 rounded-full" style={{ width: 6, height: 6, background: "oklch(0.72 0.12 75)", marginTop: 1 }} />
                  <span className="text-navy/70 font-body" style={{ fontSize: "0.875rem" }}>{item}</span>
                </div>
              ))}
            </div>
            <a
              href="https://maps.google.com/?q=Prince+William+Marina+Woodbridge+VA"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brass inline-block"
            >
              GET DIRECTIONS
            </a>
          </div>
          <div className="reveal">
            <div className="photo-card" style={{ height: 400 }}>
              <img src={IMAGES.boatRiver} alt="Sea Ray 390 on the Occoquan River" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-navy/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-navy-dark py-12 border-t" style={{ borderColor: "oklch(0.72 0.12 75 / 0.15)" }}>
      <div className="container">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src={IMAGES.logo} alt="Luna Sea Marine" className="w-7 h-7 object-contain" />
              <span className="font-display font-bold text-white" style={{ fontSize: "1.1rem" }}>Luna Sea Marine</span>
            </div>
            <p className="text-white/40 font-body" style={{ fontSize: "0.8rem", maxWidth: 280 }}>
              Sea Ray 390 Motor Yacht · Prince William Marina · Woodbridge, Virginia
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <a href="tel:7039578309" className="text-white/60 hover:text-brass transition-colors font-body" style={{ fontSize: "0.875rem" }}>703-957-8309</a>
            <a href="mailto:idris.grant@gmail.com" className="text-white/60 hover:text-brass transition-colors font-body" style={{ fontSize: "0.875rem" }}>idris.grant@gmail.com</a>
          </div>
          <div className="flex flex-col gap-2">
            <a href="/" className="text-white/60 hover:text-brass transition-colors font-body" style={{ fontSize: "0.875rem" }}>Home</a>
            <a href="/social" className="text-white/60 hover:text-brass transition-colors font-body" style={{ fontSize: "0.875rem" }}>Social Charters</a>
            <a href="/stay-aboard" className="text-brass font-body" style={{ fontSize: "0.875rem" }}>Stay Aboard</a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderColor: "oklch(0.72 0.12 75 / 0.1)" }}>
          <p className="text-white/25 font-body" style={{ fontSize: "0.75rem" }}>
            © {new Date().getFullYear()} Luna Sea Marine. All rights reserved.
          </p>
          <p className="text-white/25 font-body" style={{ fontSize: "0.75rem" }}>
            Experienced River Host · Prince William Marina · Woodbridge, VA
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function StayAboard() {
  useScrollReveal();
  return (
    <div className="bg-navy-dark">
      <Navigation />
      <HeroSection />
      <PhotoStrip />
      <ListingSection />
      <AddOnsSection />
      <LocationSection />
      <Footer />
    </div>
  );
}
