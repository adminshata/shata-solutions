"use client";

import { useState } from "react";
import Image from "next/image";
import Agency1Header from "@/components/templates/agency1/header/Agency1Header";
import Agency1Footer from "@/components/templates/agency1/footer/Agency1Footer";
import Agency1Breadcrumb from "@/components/templates/agency1/inner/Agency1Breadcrumb";
import { useAgency1 } from "@/lib/agency1/context";

export default function Agency1ContactPage() {
  const { config } = useAgency1();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Agency1Header />
      <main>
        <Agency1Breadcrumb
          title={config.contact.title}
          subtitle={config.contact.subtitle}
          bg="/templates/agency1/imgs/inner/contact/contact-bg.jpg"
        />

        <section className="section-spacing">
          <div className="container rr-container-1800">
            <div className="row gy-5">
              {/* Form */}
              <div className="col-xl-7">
                <h2 style={{ fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 800, marginBottom: 12 }}>
                  {config.contact.title === "Contact Us" ? "Let’s Start a Conversation" : config.contact.title}
                </h2>
                <p style={{ color: "#666", lineHeight: 1.7, marginBottom: 40 }}>
                  {config.contact.intro}
                </p>

                {submitted ? (
                  <div style={{ background: "#F0F2F4", borderRadius: 16, padding: 40, textAlign: "center" }}>
                    <i className="fa-solid fa-circle-check" style={{ fontSize: 48, color: "#22c55e", marginBottom: 16 }} />
                    <h3 style={{ fontWeight: 700, marginBottom: 12 }}>Message Received!</h3>
                    <p style={{ color: "#666" }}>We&apos;ll be in touch within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div style={{ marginBottom: 20 }}>
                          <label style={{ display: "block", fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Full Name *</label>
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            placeholder="John Smith"
                            style={{ width: "100%", padding: "14px 18px", border: "1px solid #ddd", borderRadius: 10, fontSize: 15, outline: "none" }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div style={{ marginBottom: 20 }}>
                          <label style={{ display: "block", fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Email Address *</label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                            placeholder="john@company.com"
                            style={{ width: "100%", padding: "14px 18px", border: "1px solid #ddd", borderRadius: 10, fontSize: 15, outline: "none" }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div style={{ marginBottom: 20 }}>
                          <label style={{ display: "block", fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Phone Number</label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="+1 (555) 000-0000"
                            style={{ width: "100%", padding: "14px 18px", border: "1px solid #ddd", borderRadius: 10, fontSize: 15, outline: "none" }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div style={{ marginBottom: 20 }}>
                          <label style={{ display: "block", fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Service Interest</label>
                          <select
                            value={form.service}
                            onChange={(e) => setForm({ ...form, service: e.target.value })}
                            style={{ width: "100%", padding: "14px 18px", border: "1px solid #ddd", borderRadius: 10, fontSize: 15, outline: "none", background: "#fff" }}
                          >
                            <option value="">Select a service...</option>
                            <option>Custom AI Solutions</option>
                            <option>AI Strategy & Consulting</option>
                            <option>Machine Learning</option>
                            <option>NLP & Language AI</option>
                            <option>Computer Vision</option>
                            <option>AI Automation</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12">
                        <div style={{ marginBottom: 28 }}>
                          <label style={{ display: "block", fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Message *</label>
                          <textarea
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            required
                            rows={5}
                            placeholder="Tell us about your project, goals, and timeline..."
                            style={{ width: "100%", padding: "14px 18px", border: "1px solid #ddd", borderRadius: 10, fontSize: 15, outline: "none", resize: "vertical" }}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="rr-btn">
                          <span className="btn-wrap">
                            <span className="text-one">Send Message</span>
                            <span className="text-two">Send Message</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Info */}
              <div className="col-xl-5">
                <div style={{ background: "#101010", borderRadius: 20, padding: "40px 36px", color: "#fff", height: "100%" }}>
                  <h3 style={{ fontWeight: 700, fontSize: 24, marginBottom: 32 }}>Contact Information</h3>

                  {[
                    { icon: "fa-solid fa-location-dot", label: "Our Office", value: config.contact.office },
                    { icon: "fa-solid fa-envelope", label: "Email Us", value: config.contact.email },
                    { icon: "fa-solid fa-phone", label: "Call Us", value: config.contact.phone },
                    { icon: "fa-solid fa-clock", label: "Working Hours", value: config.contact.hours },
                  ].map((item) => (
                    <div key={item.label} style={{ display: "flex", gap: 20, marginBottom: 28 }}>
                      <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <i className={item.icon} style={{ color: "#F14F44" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>{item.label}</div>
                        <div style={{ fontWeight: 600 }}>{item.value}</div>
                      </div>
                    </div>
                  ))}

                  <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <h4 style={{ fontWeight: 700, marginBottom: 16 }}>Follow Us</h4>
                    <div style={{ display: "flex", gap: 12 }}>
                      {[
                        { icon: "fab fa-twitter", href: config.contact.socials.twitter },
                        { icon: "fab fa-linkedin-in", href: config.contact.socials.linkedin },
                        { icon: "fab fa-github", href: config.contact.socials.github },
                        { icon: "fab fa-youtube", href: config.contact.socials.youtube },
                      ].map((s) => (
                        <a key={s.icon} href={s.href}
                          style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                          <i className={s.icon} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Agency1Footer />
    </>
  );
}
