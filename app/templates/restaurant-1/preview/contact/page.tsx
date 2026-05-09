"use client";

import { useState } from "react";
import { useSite } from "@/lib/restaurant1/context";
import { PageTitle, SectionHeading } from "@/components/templates/restaurant1/ui/Atoms";
import { R1_DEFAULTS } from "@/lib/restaurant1/defaults";

export default function ContactPage() {
  const site = useSite();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClass = "w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-gray-400 transition-colors";

  return (
    <>
      <PageTitle
        title="Contact Us"
        subtitle="Get In Touch"
        bg={R1_DEFAULTS.hero.slides[0].image}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading subtitle="contact us" title="Get In Touch" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Info Cards */}
            <div className="space-y-6">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: "Our Address",
                  value: site.contact.address,
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  label: "Phone Number",
                  value: site.contact.phone,
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: "Email Address",
                  value: site.contact.email,
                },
              ].map((card, i) => (
                <div key={i} className="flex gap-4 p-5 border border-gray-100">
                  <div
                    className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-white"
                    style={{ background: site.theme.primaryColor }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase font-semibold mb-1 text-gray-400">
                      {card.label}
                    </p>
                    <p className="text-sm text-gray-800">{card.value}</p>
                  </div>
                </div>
              ))}

              {/* Hours */}
              <div className="p-5 border border-gray-100">
                <p className="text-xs tracking-widest uppercase font-semibold mb-4 text-gray-400">Opening Hours</p>
                {site.contact.hours.map((h, i) => (
                  <div key={i} className="flex justify-between text-sm border-b border-gray-50 pb-2 mb-2 last:border-0 last:mb-0">
                    <span className="text-gray-500">{h.day}</span>
                    <span className="font-medium text-gray-800">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {sent ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                  <p className="text-gray-500">Thank you for contacting us. We will get back to you shortly.</p>
                </div>
              ) : (
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
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className={inputClass}
                  />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your Message *"
                    rows={6}
                    required
                    className={`${inputClass} resize-none`}
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 text-sm tracking-widest uppercase font-semibold text-white transition-all hover:opacity-80"
                    style={{ background: site.theme.primaryColor }}
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <div className="h-80 bg-gray-200 flex items-center justify-center">
        <p className="text-gray-400 text-sm tracking-widest uppercase">Map — {site.contact.address}</p>
      </div>
    </>
  );
}
