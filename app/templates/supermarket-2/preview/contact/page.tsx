"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteShell } from "@/components/templates/supermarket2/layout/SiteShell";
import { Header } from "@/components/templates/supermarket2/layout/Header";
import { Footer } from "@/components/templates/supermarket2/layout/Footer";
import { CartDrawer } from "@/components/templates/supermarket2/layout/CartDrawer";
import { useSite } from "@/lib/supermarket2/context";

const BASE_PATH = "/templates/supermarket-2/preview";

export default function ContactPage() {
  const config = useSite();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <SiteShell>
      <Header />
      <main style={{ background: "#F3F4F6" }}>
        {/* Banner */}
        <div style={{ background: "#DC2626" }} className="py-10">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-1 text-xs text-white/70 mb-2">
              <Link href={BASE_PATH} className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white font-medium">Contact</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-white">Contact Us</h1>
          </div>
        </div>

        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-2">
              {/* Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h2>
                <div className="space-y-5">
                  {[
                    {
                      icon: (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      ),
                      label: "Address",
                      value: config.contact.address,
                    },
                    {
                      icon: (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l1.42-1.42a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      ),
                      label: "Phone",
                      value: config.contact.phone,
                    },
                    ...(config.contact.phone2
                      ? [{ icon: (
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.29 6.29l1.42-1.42a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                        ), label: "Phone 2", value: config.contact.phone2 }]
                      : []),
                    {
                      icon: (
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      ),
                      label: "Email",
                      value: config.contact.email,
                    },
                    ...(config.contact.hours
                      ? [{ icon: (
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                          </svg>
                        ), label: "Hours", value: config.contact.hours }]
                      : []),
                  ].map((item) => (
                    <div key={item.label} className="flex gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full shrink-0 text-white"
                        style={{ background: "#DC2626" }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{item.label}</div>
                        <div className="text-sm text-gray-700 mt-0.5">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="bg-white rounded border border-gray-200 p-6">
                {sent ? (
                  <div className="flex flex-col items-center text-center gap-4 py-10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "#DC2626" }}>
                      <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Message Sent!</h3>
                    <p className="text-sm text-gray-500">Thanks for reaching out. We will get back to you shortly.</p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="text-sm font-semibold underline"
                      style={{ color: "#DC2626" }}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-gray-800 mb-5">Send a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Name</label>
                          <input
                            type="text"
                            required
                            placeholder="Your name"
                            className="w-full rounded border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-[#DC2626]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Email</label>
                          <input
                            type="email"
                            required
                            placeholder="Your email"
                            className="w-full rounded border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-[#DC2626]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Subject</label>
                        <input
                          type="text"
                          placeholder="How can we help?"
                          className="w-full rounded border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-[#DC2626]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Message</label>
                        <textarea
                          required
                          rows={5}
                          placeholder="Your message..."
                          className="w-full rounded border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm outline-none focus:border-[#DC2626] resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full rounded py-3 text-sm font-bold text-white"
                        style={{ background: "#DC2626" }}
                      >
                        Send Message
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </SiteShell>
  );
}
