"use client";
import { useState } from "react";

export default function Onboarding() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    state: "",
    type: "",
    passport: null as File | null
  });

  const handleSubmit = async () => {
    console.log(form);

    // TODO: send to Supabase
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-lg space-y-4">
        <h1 className="text-xl font-semibold">Complete Your Business Setup</h1>

        <input placeholder="Full Name" onChange={e => setForm({...form, name: e.target.value})} className="input" />
        <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} className="input" />
        <input placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} className="input" />

        <input placeholder="Business Name" onChange={e => setForm({...form, businessName: e.target.value})} className="input" />

        <select onChange={e => setForm({...form, state: e.target.value})} className="input">
          <option value="">Select State</option>
          <option value="wyoming">Wyoming</option>
          <option value="delaware">Delaware</option>
        </select>

        <select onChange={e => setForm({...form, type: e.target.value})} className="input">
          <option value="">Business Type</option>
          <option value="llc">LLC</option>
          <option value="c-corp">C-Corp</option>
        </select>

        <input type="file" onChange={e => setForm({...form, passport: e.target.files?.[0] || null})} />

        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-full w-full">
          Submit
        </button>
      </div>
    </div>
  );
}