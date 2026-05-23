"use client";

import { useState } from "react";
import { FIRM, PRACTICE_AREAS } from "@/lib/multiLawyer1/data";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    practiceArea: "",
    message: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "First name is required.";
    if (!form.lastName.trim()) e.lastName = "Last name is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "A valid email address is required.";
    if (!form.message.trim()) e.message = "Please briefly describe your legal matter.";
    if (!form.consent) e.consent = "You must acknowledge the disclaimer to submit.";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-[#0a1628] border border-[#1a3060] text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c]/60 transition-colors rounded-sm";
  const labelClass = "block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2";
  const errorClass = "mt-1.5 text-red-400 text-xs";

  if (submitted) {
    return (
      <section className="min-h-screen pt-40 pb-24 bg-[#050d1f] flex items-center">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/50">
            <span className="text-[#c9a84c] text-2xl">✓</span>
          </div>
          <h1 className="ml-serif text-4xl font-bold text-white mb-4">
            Thank You, {form.firstName}
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8">
            Your consultation request has been received. A member of our team will contact you within one business day to schedule your free initial consultation.
          </p>
          <div className="p-6 bg-[#0a1628] border border-[#c9a84c]/20 rounded-sm text-left mb-8">
            <p className="text-[#c9a84c] text-xs font-bold tracking-[0.2em] uppercase mb-3">What Happens Next</p>
            <ul className="space-y-2 text-sm text-white/60">
              <li className="flex gap-2"><span className="text-[#c9a84c]">1.</span> Our intake team reviews your request within one business day.</li>
              <li className="flex gap-2"><span className="text-[#c9a84c]">2.</span> We contact you at the number or email you provided to confirm your consultation.</li>
              <li className="flex gap-2"><span className="text-[#c9a84c]">3.</span> Your consultation is conducted by the attorney best suited to your matter.</li>
              <li className="flex gap-2"><span className="text-[#c9a84c]">4.</span> The consultation is completely free and confidential, with no obligation to retain our services.</li>
            </ul>
          </div>
          <p className="text-white/40 text-xs">
            For urgent matters, call us directly at{" "}
            <a href={`tel:${FIRM.phone}`} className="text-[#c9a84c] hover:text-[#e4b96a] transition-colors">
              {FIRM.phone}
            </a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-gradient-to-b from-[#0a1628] to-[#050d1f] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            Get in Touch
          </p>
          <h1 className="ml-serif text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Schedule a Free<br />
            <span className="text-[#c9a84c]">Consultation</span>
          </h1>
          <p className="text-white/60 text-xl leading-relaxed max-w-2xl">
            Contact Morrison & Grant LLP for a free, confidential initial consultation. We respond within one business day.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="py-24 bg-[#050d1f]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_380px] items-start">
            {/* Form */}
            <div>
              <h2 className="ml-serif text-2xl font-bold text-white mb-8">
                Request a Consultation
              </h2>

              {/* Disclaimer */}
              <div className="p-4 bg-[#c9a84c]/8 border border-[#c9a84c]/25 rounded-sm mb-8">
                <p className="text-white/55 text-xs leading-relaxed">
                  <strong className="text-[#c9a84c]">Disclaimer:</strong> Submitting this form does not create an attorney-client relationship. Please do not include confidential information in your initial inquiry. An attorney-client relationship is formed only upon a signed engagement agreement.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>First Name *</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="James"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    />
                    {errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Last Name *</label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Smith"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    />
                    {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input
                      type="email"
                      className={inputClass}
                      placeholder="james@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    {errors.email && <p className={errorClass}>{errors.email}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input
                      type="tel"
                      className={inputClass}
                      placeholder="(212) 555-0100"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Practice Area</label>
                  <select
                    className={`${inputClass} appearance-none cursor-pointer`}
                    value={form.practiceArea}
                    onChange={(e) => setForm({ ...form, practiceArea: e.target.value })}
                  >
                    <option value="">Select a practice area...</option>
                    {PRACTICE_AREAS.map((area) => (
                      <option key={area.id} value={area.name}>
                        {area.name}
                      </option>
                    ))}
                    <option value="Not sure">Not Sure / General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Describe Your Legal Matter *</label>
                  <textarea
                    rows={5}
                    className={inputClass}
                    placeholder="Please provide a brief overview of your legal matter. Do not include highly sensitive or confidential details in this initial inquiry."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                  {errors.message && <p className={errorClass}>{errors.message}</p>}
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-0.5 accent-[#c9a84c]"
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    />
                    <span className="text-white/55 text-xs leading-relaxed">
                      I understand that submitting this form does not create an attorney-client relationship, that this website is a demonstration template, and that I should not include highly confidential information in this form. *
                    </span>
                  </label>
                  {errors.consent && <p className={`${errorClass} ml-6`}>{errors.consent}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#c9a84c] text-[#050d1f] font-bold text-sm rounded-sm hover:bg-[#e4b96a] transition-colors"
                >
                  Submit Consultation Request
                </button>

                <p className="text-white/35 text-xs text-center leading-relaxed">
                  By submitting this form you agree to be contacted by Morrison & Grant LLP. Your information is treated with strict confidentiality.
                </p>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-[#0a1628] border border-[#c9a84c]/30 rounded-sm p-7">
                <h3 className="ml-serif text-xl font-bold text-white mb-6">
                  Office Information
                </h3>
                <div className="space-y-5 text-sm">
                  <div className="flex gap-3">
                    <span className="text-[#c9a84c] mt-0.5 shrink-0 text-base">📍</span>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Address</p>
                      <p className="text-white/80 leading-relaxed">{FIRM.address}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#c9a84c] mt-0.5 shrink-0 text-base">📞</span>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Phone</p>
                      <a href={`tel:${FIRM.phone}`} className="text-white/80 hover:text-[#c9a84c] transition-colors">
                        {FIRM.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#c9a84c] mt-0.5 shrink-0 text-base">✉</span>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Email</p>
                      <a href={`mailto:${FIRM.email}`} className="text-white/80 hover:text-[#c9a84c] transition-colors">
                        {FIRM.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#c9a84c] mt-0.5 shrink-0 text-base">🕐</span>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Office Hours</p>
                      <p className="text-white/80">{FIRM.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose */}
              <div className="bg-[#0a1628] border border-[#1a3060] rounded-sm p-6">
                <h4 className="text-[#c9a84c] text-xs font-bold tracking-[0.2em] uppercase mb-4">
                  Your Free Consultation Includes
                </h4>
                <ul className="space-y-3">
                  {[
                    "Direct discussion with an experienced attorney",
                    "Review of the key facts of your matter",
                    "Overview of your legal options",
                    "Honest assessment of potential outcomes",
                    "No obligation to retain our services",
                    "Complete confidentiality",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="text-[#c9a84c] shrink-0 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map placeholder */}
              <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3060] border border-[#1a3060] rounded-sm h-48 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl mb-2 block">🗺</span>
                  <p className="text-white/50 text-xs">425 Park Avenue, Suite 2800</p>
                  <p className="text-white/50 text-xs">New York, NY 10022</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
