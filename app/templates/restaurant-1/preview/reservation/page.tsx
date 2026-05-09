"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSite } from "@/lib/restaurant1/context";
import { PageTitle } from "@/components/templates/restaurant1/ui/Atoms";
import { R1_DEFAULTS } from "@/lib/restaurant1/defaults";

export default function ReservationPage() {
  const site = useSite();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/templates/restaurant-1/preview/reservation/thank-you");
    }, 1000);
  };

  const inputClass = "w-full bg-white border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors";

  return (
    <>
      <PageTitle
        title="Make A Reservation"
        subtitle="Book A Table"
        bg={R1_DEFAULTS.hero.slides[1].image}
      />

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <div>
              <p className="text-sm tracking-[0.2em] uppercase mb-2 font-medium" style={{ color: site.theme.primaryColor }}>
                Reservations
              </p>
              <h2
                className="text-4xl font-light mb-4"
                style={{ fontFamily: "var(--font-r1-heading, 'Great Vibes', cursive)", color: site.theme.darkColor }}
              >
                {site.reservation.heading}
              </h2>
              <div className="flex mb-6">
                <div className="w-12 h-px self-center" style={{ background: site.theme.primaryColor }} />
                <div className="w-2 h-2 rounded-full mx-2" style={{ background: site.theme.primaryColor }} />
                <div className="w-12 h-px self-center" style={{ background: site.theme.primaryColor }} />
              </div>
              <p className="text-gray-600 leading-relaxed mb-10">
                {site.reservation.description}
              </p>

              {/* Hours */}
              <h3 className="text-sm tracking-widest uppercase font-semibold mb-5">Opening Hours</h3>
              <div className="space-y-3">
                {site.contact.hours.map((h, i) => (
                  <div key={i} className="flex justify-between text-sm border-b border-gray-100 pb-3">
                    <span className="text-gray-500">{h.day}</span>
                    <span className="font-medium">{h.hours}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 border" style={{ borderColor: `${site.theme.primaryColor}40` }}>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Phone:</span>{" "}
                  <a href={`tel:${site.contact.phone}`} className="hover:underline">{site.contact.phone}</a>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold text-gray-800">Email:</span>{" "}
                  <a href={`mailto:${site.contact.email}`} className="hover:underline">{site.contact.email}</a>
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name *"
                    required
                    className={inputClass}
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={inputClass}
                  />
                  <select
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={String(n)}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                    <option value="10+">10+ Guests</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                  <select
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Select Time *</option>
                    {[
                      "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
                      "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM",
                    ].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Special Requests or Notes"
                  rows={4}
                  className={`${inputClass} resize-none`}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-sm tracking-widest uppercase font-semibold text-white transition-all hover:opacity-80 disabled:opacity-50"
                  style={{ background: site.theme.primaryColor }}
                >
                  {loading ? "Submitting..." : "Book A Table"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
