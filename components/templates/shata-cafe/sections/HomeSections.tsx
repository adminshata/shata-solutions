"use client";

import Image from "next/image";
import { useState } from "react";
import { useSite } from "@/lib/shata-cafe/context";
import { featuredMenuItems, featuredTeam } from "@/lib/shata-cafe/utils";
import type { SectionId } from "@/lib/shata-cafe/types";
import { Container, SectionHeading, StarRating, MenuBadge } from "@/components/templates/shata-cafe/ui/Atoms";

/* ======================================================================
   HERO
   ====================================================================== */
export function HeroSection() {
  const config = useSite();
  const slides = config.sections.hero.slides;
  const [active, setActive] = useState(0);
  const slide = slides[active];
  if (!slide) return null;

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={slide.image}
          alt=""
          fill
          priority
          className="object-cover transition-opacity duration-700"
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <Container className="relative z-10 flex h-full flex-col justify-center text-white">
        <div className="max-w-2xl">
          {/* Accent line */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[color:var(--cafe-accent)]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[color:var(--cafe-accent)]">
              {config.name}
            </span>
          </div>
          <h1 className="text-4xl font-black leading-tight whitespace-pre-line md:text-5xl lg:text-6xl">
            {slide.heading}
          </h1>
          <p className="mt-5 text-base text-white/80 leading-7 max-w-xl md:text-lg">
            {slide.subheading}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {slide.cta && (
              <a
                href={slide.cta.href}
                className="rounded-[var(--cafe-radius)] bg-[color:var(--cafe-accent)] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-amber-500 transition-colors"
              >
                {slide.cta.label}
              </a>
            )}
            {slide.ctaSecondary && (
              <a
                href={slide.ctaSecondary.href}
                className="rounded-[var(--cafe-radius)] border border-white/50 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                {slide.ctaSecondary.label}
              </a>
            )}
          </div>
        </div>
      </Container>

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-[color:var(--cafe-accent)]" : "w-4 bg-white/40"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Prev / Next */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setActive((a) => (a - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setActive((a) => (a + 1) % slides.length)}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            aria-label="Next"
          >
            ›
          </button>
        </>
      )}
    </section>
  );
}

/* ======================================================================
   MENU CATEGORIES
   ====================================================================== */
export function MenuCategoriesSection() {
  const config = useSite();
  const s = config.sections.menuCategories;
  return (
    <section id="menu" className="py-16 md:py-20 bg-[color:var(--cafe-surface)]">
      <Container>
        <SectionHeading eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} align="center" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {config.menuCategories.map((cat) => (
            <div
              key={cat.id}
              className="group relative overflow-hidden rounded-[var(--cafe-radius)] aspect-square cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            >
              {cat.image && (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  unoptimized
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="font-bold text-sm">{cat.name}</div>
                {cat.description && (
                  <div className="text-[11px] text-white/70 mt-0.5">{cat.description}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ======================================================================
   ABOUT
   ====================================================================== */
export function AboutSection() {
  const config = useSite();
  const a = config.sections.about;
  return (
    <section id="about" className="py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Images — stacked / offset layout */}
          <div className="relative hidden sm:block">
            <div className="relative h-80 lg:h-[460px] overflow-hidden rounded-[var(--cafe-radius)] shadow-xl">
              {a.image && (
                <Image src={a.image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" unoptimized />
              )}
            </div>
            {/* Floating second image */}
            {a.imageSecondary && (
              <div className="absolute -bottom-8 -right-6 h-44 w-52 overflow-hidden rounded-[var(--cafe-radius)] border-4 border-[color:var(--cafe-bg)] shadow-xl">
                <Image src={a.imageSecondary} alt="" fill className="object-cover" sizes="208px" unoptimized />
              </div>
            )}
            {/* Years badge */}
            <div className="absolute -top-4 -left-4 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-[color:var(--cafe-accent)] text-white shadow-lg">
              <span className="text-2xl font-black leading-none">8+</span>
              <span className="text-[9px] font-bold uppercase tracking-wider leading-tight text-center">Years<br/>Open</span>
            </div>
          </div>

          {/* Text */}
          <div>
            <SectionHeading eyebrow={a.eyebrow} title={a.title} />
            <p className="mt-5 text-[color:var(--cafe-muted)] leading-7 text-[15px]">{a.body}</p>
            {a.checkpoints && a.checkpoints.length > 0 && (
              <ul className="mt-6 space-y-3">
                {a.checkpoints.map((cp) => (
                  <li key={cp} className="flex items-start gap-3">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[color:var(--cafe-accent)]/15 text-[color:var(--cafe-accent)] text-[10px] font-bold">✓</span>
                    <span className="text-sm text-[color:var(--cafe-fg)]">{cp}</span>
                  </li>
                ))}
              </ul>
            )}
            {a.cta && (
              <div className="mt-8">
                <a
                  href={a.cta.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--cafe-accent)] border-b border-[color:var(--cafe-accent)] pb-0.5 hover:text-amber-600 hover:border-amber-600 transition-colors"
                >
                  {a.cta.label} →
                </a>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ======================================================================
   FEATURED MENU
   ====================================================================== */
export function FeaturedMenuSection() {
  const config = useSite();
  const s = config.sections.featuredMenu;
  const items = featuredMenuItems(config);
  if (items.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-[color:var(--cafe-surface)]">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
          <SectionHeading eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />
          <a
            href="#menu"
            className="shrink-0 text-sm font-semibold text-[color:var(--cafe-accent)] border-b border-[color:var(--cafe-accent)] pb-0.5 hover:text-amber-600 hover:border-amber-600 transition-colors"
          >
            Full Menu →
          </a>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-[var(--cafe-radius)] bg-white border border-[color:var(--cafe-border)] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  unoptimized
                />
                {item.badge && (
                  <div className="absolute top-3 left-3">
                    <MenuBadge kind={item.badge} />
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-[color:var(--cafe-fg)] text-sm leading-snug">{item.name}</h3>
                  <span className="shrink-0 font-bold text-[color:var(--cafe-accent)] text-sm">{item.price}</span>
                </div>
                <p className="mt-1.5 text-[13px] text-[color:var(--cafe-muted)] leading-5 flex-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ======================================================================
   STATS
   ====================================================================== */
export function StatsSection() {
  const config = useSite();
  const s = config.sections.stats;
  return (
    <section
      className="relative py-20"
      style={
        s.backgroundImage
          ? { backgroundImage: `url(${s.backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }
          : { background: "var(--cafe-primary)" }
      }
    >
      <div className="absolute inset-0 bg-[color:var(--cafe-primary)]/80" />
      <Container className="relative z-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {s.items.map((item) => (
            <div key={item.label} className="text-center text-white">
              <div className="text-5xl font-black text-[color:var(--cafe-accent)]">{item.value}</div>
              <div className="mt-2 text-sm text-white/70 font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ======================================================================
   GALLERY
   ====================================================================== */
export function GallerySection() {
  const config = useSite();
  const g = config.sections.gallery;
  return (
    <section id="gallery" className="py-16 md:py-20">
      <Container>
        <SectionHeading eyebrow={g.eyebrow} title={g.title} subtitle={g.subtitle} align="center" />
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
          {g.images.map((img, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-[var(--cafe-radius)] shadow-sm hover:shadow-md transition-shadow ${
                i === 0 || i === 4 ? "row-span-2" : ""
              }`}
              style={{ aspectRatio: i === 0 || i === 4 ? "1 / 2" : "1 / 1" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ======================================================================
   TEAM
   ====================================================================== */
export function TeamSection() {
  const config = useSite();
  const s = config.sections.team;
  const members = featuredTeam(config);
  if (members.length === 0) return null;

  return (
    <section id="team" className="py-16 md:py-20 bg-[color:var(--cafe-surface)]">
      <Container>
        <SectionHeading eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} align="center" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <div key={member.id} className="group text-center">
              <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-[color:var(--cafe-border)] shadow-md group-hover:border-[color:var(--cafe-accent)] transition-colors duration-300">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="160px"
                  unoptimized
                />
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-[color:var(--cafe-fg)]">{member.name}</h3>
                <p className="text-[13px] font-medium text-[color:var(--cafe-accent)] mt-0.5">{member.role}</p>
                {member.bio && (
                  <p className="mt-2 text-[13px] text-[color:var(--cafe-muted)] leading-5 max-w-xs mx-auto">{member.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ======================================================================
   TESTIMONIALS
   ====================================================================== */
export function TestimonialsSection() {
  const config = useSite();
  const t = config.sections.testimonials;
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeading eyebrow={t.eyebrow} title={t.title} align="center" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {t.items.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] bg-white p-6 shadow-sm"
            >
              {item.rating && <StarRating value={item.rating} />}
              <p className="text-sm text-[color:var(--cafe-fg)] leading-7 italic flex-1">
                &ldquo;{item.body}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-auto">
                {item.avatar && (
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image src={item.avatar} alt={item.author} fill className="object-cover" sizes="40px" unoptimized />
                  </div>
                )}
                <div>
                  <div className="text-sm font-semibold text-[color:var(--cafe-fg)]">{item.author}</div>
                  {item.role && (
                    <div className="text-[11px] text-[color:var(--cafe-muted)]">{item.role}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Second row — smaller cards */}
        {t.items.length > 3 && (
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {t.items.slice(3, 5).map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] bg-white p-5 shadow-sm"
              >
                {item.avatar && (
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full mt-0.5">
                    <Image src={item.avatar} alt={item.author} fill className="object-cover" sizes="40px" unoptimized />
                  </div>
                )}
                <div className="flex-1">
                  {item.rating && <StarRating value={item.rating} />}
                  <p className="mt-1.5 text-sm text-[color:var(--cafe-fg)] leading-6 italic">
                    &ldquo;{item.body}&rdquo;
                  </p>
                  <div className="mt-2 text-[12px]">
                    <span className="font-semibold text-[color:var(--cafe-fg)]">{item.author}</span>
                    {item.role && <span className="text-[color:var(--cafe-muted)]"> · {item.role}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

/* ======================================================================
   RESERVATION
   ====================================================================== */
export function ReservationSection() {
  const config = useSite();
  const r = config.sections.reservation;
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "", guests: "2", notes: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section
      id="reservation"
      className="relative py-20 md:py-28"
      style={
        r.backgroundImage
          ? { backgroundImage: `url(${r.backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
          : { background: "var(--cafe-primary)" }
      }
    >
      <div className="absolute inset-0 bg-[color:var(--cafe-primary)]/85" />
      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Left: info */}
          <div className="text-white">
            <SectionHeading eyebrow={r.eyebrow} title={r.title} subtitle={r.subtitle} light />
            {/* Hours */}
            <div className="mt-8 space-y-3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--cafe-accent)]">Opening Hours</h3>
              {r.hours.map((h) => (
                <div key={h.day} className="flex justify-between border-b border-white/10 pb-2 text-sm">
                  <span className="text-white/70">{h.day}</span>
                  <span className="font-semibold">{h.time}</span>
                </div>
              ))}
            </div>
            {/* Contact */}
            <div className="mt-8 space-y-2 text-[13px]">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--cafe-accent)]">Contact</h3>
              <p className="text-white/70">
                Phone reservations:{" "}
                <a href={`tel:${config.contact.reservationPhone}`} className="text-white hover:text-[color:var(--cafe-accent)] transition-colors font-medium">
                  {config.contact.reservationPhone}
                </a>
              </p>
              <p className="text-white/70">
                Email:{" "}
                <a href={`mailto:${config.contact.email}`} className="text-white hover:text-[color:var(--cafe-accent)] transition-colors font-medium">
                  {config.contact.email}
                </a>
              </p>
              <p className="text-white/70">{config.contact.address}</p>
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-[var(--cafe-radius)] bg-white p-6 md:p-8 shadow-2xl">
            {sent ? (
              <div className="text-center py-8">
                <div className="text-4xl text-[color:var(--cafe-accent)] font-black">✓</div>
                <h3 className="mt-3 text-lg font-bold text-[color:var(--cafe-fg)]">Reservation Received</h3>
                <p className="mt-2 text-sm text-[color:var(--cafe-muted)]">
                  We&apos;ll confirm your booking within 2 hours. See you soon!
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-[color:var(--cafe-fg)] mb-5">Book Your Table</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[12px] font-semibold text-[color:var(--cafe-fg)] mb-1.5">Full Name</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        className="w-full rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] bg-[color:var(--cafe-surface)] px-3 py-2.5 text-sm text-[color:var(--cafe-fg)] outline-none focus:border-[color:var(--cafe-accent)] focus:ring-1 focus:ring-[color:var(--cafe-accent)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-[color:var(--cafe-fg)] mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="+1 (555) ..."
                        className="w-full rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] bg-[color:var(--cafe-surface)] px-3 py-2.5 text-sm text-[color:var(--cafe-fg)] outline-none focus:border-[color:var(--cafe-accent)] focus:ring-1 focus:ring-[color:var(--cafe-accent)] transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[color:var(--cafe-fg)] mb-1.5">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="you@email.com"
                      className="w-full rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] bg-[color:var(--cafe-surface)] px-3 py-2.5 text-sm text-[color:var(--cafe-fg)] outline-none focus:border-[color:var(--cafe-accent)] focus:ring-1 focus:ring-[color:var(--cafe-accent)] transition-colors"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-[12px] font-semibold text-[color:var(--cafe-fg)] mb-1.5">Date</label>
                      <input
                        required
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                        className="w-full rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] bg-[color:var(--cafe-surface)] px-3 py-2.5 text-sm text-[color:var(--cafe-fg)] outline-none focus:border-[color:var(--cafe-accent)] focus:ring-1 focus:ring-[color:var(--cafe-accent)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-[color:var(--cafe-fg)] mb-1.5">Time</label>
                      <select
                        required
                        value={form.time}
                        onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                        className="w-full rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] bg-[color:var(--cafe-surface)] px-3 py-2.5 text-sm text-[color:var(--cafe-fg)] outline-none focus:border-[color:var(--cafe-accent)] focus:ring-1 focus:ring-[color:var(--cafe-accent)] transition-colors"
                      >
                        <option value="">Select</option>
                        {["7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "18:00", "19:00", "20:00", "21:00"].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-[color:var(--cafe-fg)] mb-1.5">Guests</label>
                      <select
                        value={form.guests}
                        onChange={(e) => setForm((f) => ({ ...f, guests: e.target.value }))}
                        className="w-full rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] bg-[color:var(--cafe-surface)] px-3 py-2.5 text-sm text-[color:var(--cafe-fg)] outline-none focus:border-[color:var(--cafe-accent)] focus:ring-1 focus:ring-[color:var(--cafe-accent)] transition-colors"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                        ))}
                        <option value="9+">9+ guests</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[color:var(--cafe-fg)] mb-1.5">Special Requests <span className="font-normal text-[color:var(--cafe-muted)]">(optional)</span></label>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                      placeholder="Allergies, celebrations, high chair needed..."
                      className="w-full rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] bg-[color:var(--cafe-surface)] px-3 py-2.5 text-sm text-[color:var(--cafe-fg)] outline-none focus:border-[color:var(--cafe-accent)] focus:ring-1 focus:ring-[color:var(--cafe-accent)] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-[var(--cafe-radius)] bg-[color:var(--cafe-primary)] py-3 text-sm font-bold text-white hover:bg-[color:var(--cafe-accent)] transition-colors"
                  >
                    Request Reservation
                  </button>
                  <p className="text-center text-[11px] text-[color:var(--cafe-muted)]">
                    We&apos;ll confirm within 2 hours. For same-day bookings, please call us.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ======================================================================
   NEWSLETTER
   ====================================================================== */
export function NewsletterSection() {
  const config = useSite();
  const n = config.sections.newsletter;
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
    setEmail("");
  }

  return (
    <section className="bg-[color:var(--cafe-surface)] border-t border-[color:var(--cafe-border)] py-14">
      <Container className="text-center">
        <div className="mx-auto max-w-xl">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--cafe-accent)]">Stay Connected</div>
          <h2 className="text-2xl font-bold text-[color:var(--cafe-fg)]">{n.title}</h2>
          {n.subtitle && <p className="mt-2 text-sm text-[color:var(--cafe-muted)]">{n.subtitle}</p>}
          {done ? (
            <p className="mt-6 text-[color:var(--cafe-accent)] font-semibold">
              Subscribed — thank you! We&apos;ll be in touch soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={n.placeholder ?? "Enter your email"}
                className="flex-1 rounded-[var(--cafe-radius)] border border-[color:var(--cafe-border)] bg-white px-4 py-2.5 text-sm text-[color:var(--cafe-fg)] outline-none focus:border-[color:var(--cafe-accent)] focus:ring-1 focus:ring-[color:var(--cafe-accent)] transition-colors"
              />
              <button
                type="submit"
                className="rounded-[var(--cafe-radius)] bg-[color:var(--cafe-primary)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[color:var(--cafe-accent)] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}

/* ======================================================================
   Section map
   ====================================================================== */
export const SECTION_MAP: Record<SectionId, React.FC> = {
  "hero":            HeroSection,
  "menu-categories": MenuCategoriesSection,
  "about":           AboutSection,
  "featured-menu":   FeaturedMenuSection,
  "stats":           StatsSection,
  "gallery":         GallerySection,
  "team":            TeamSection,
  "testimonials":    TestimonialsSection,
  "reservation":     ReservationSection,
  "newsletter":      NewsletterSection,
};
