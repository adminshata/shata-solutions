// app/templates/spa-salon-1/preview/account/page.tsx
import Link from "next/link";

const upcomingAppointments = [
  { id: "apt-1", service: "Deep Cleansing Facial", date: "May 18, 2026", time: "11:00 AM", therapist: "Layla Hassan", status: "Confirmed" },
  { id: "apt-2", service: "Aromatherapy Massage", date: "June 2, 2026", time: "3:00 PM", therapist: "Hana Mostafa", status: "Pending" },
];

const pastAppointments = [
  { id: "past-1", service: "Hot Stone Therapy", date: "April 20, 2026", therapist: "Layla Hassan", rating: 5 },
  { id: "past-2", service: "Hair Styling", date: "March 14, 2026", therapist: "Sara Ali", rating: 5 },
  { id: "past-3", service: "Gel Manicure", date: "February 28, 2026", therapist: "Nour Ibrahim", rating: 4 },
];

export default function SpaSalon1AccountPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-gray-900 text-gray-300 text-xs py-2 px-4 text-center">
        <span className="mr-6">+20 100 000 0000</span>
        <span>info@shatasolutions.com</span>
        <span className="ml-6">Mon–Sat: 9:00 AM – 8:00 PM</span>
      </div>

      {/* Nav */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/templates/spa-salon-1/preview">
            <img src="/templates/spaSalon1/images/logo.svg" alt="Shata Spa & Salon" className="h-10" />
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href="/templates/spa-salon-1/preview" className="hover:text-pink-500">Home</Link>
            <Link href="/templates/spa-salon-1/preview/services" className="hover:text-pink-500">Services</Link>
            <Link href="/templates/spa-salon-1/preview/appointment" className="hover:text-pink-500">Book</Link>
          </nav>
          <Link
            href="/templates/spa-salon-1/preview/appointment"
            className="px-5 py-2 bg-pink-400 text-white text-sm rounded-full hover:bg-pink-500 transition-colors"
          >
            Book Appointment
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-200 to-pink-400 flex items-center justify-center text-white text-3xl font-light flex-shrink-0">
            A
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-light text-gray-800">Shata Solutions</h1>
            <p className="text-gray-500 text-sm mt-0.5">info@shatasolutions.com</p>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 text-pink-600 text-xs rounded-full">
                Gold Member
              </span>
              <span className="text-xs text-gray-400">Member since January 2025</span>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button className="px-4 py-2 border border-gray-200 text-gray-600 text-sm rounded-lg hover:border-pink-300 transition-colors">
              Edit Profile
            </button>
            <Link
              href="/templates/spa-salon-1/preview/login"
              className="px-4 py-2 border border-gray-200 text-gray-500 text-sm rounded-lg hover:border-red-200 hover:text-red-400 transition-colors"
            >
              Sign Out
            </Link>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Visits", value: "12" },
            { label: "Loyalty Points", value: "840" },
            { label: "Upcoming", value: "2" },
            { label: "Reviews Given", value: "8" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl shadow-sm p-5 text-center">
              <div className="text-2xl font-light text-pink-400">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: Quick Actions */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Quick Actions</h2>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {[
                { label: "Book Appointment", desc: "Schedule a new session", href: "/templates/spa-salon-1/preview/appointment" },
                { label: "Browse Services", desc: "Explore our treatments", href: "/templates/spa-salon-1/preview/services" },
                { label: "View Pricing", desc: "See all service rates", href: "/templates/spa-salon-1/preview/pricing" },
                { label: "Gift Cards", desc: "Give the gift of wellness", href: "/templates/spa-salon-1/preview/gift-cards" },
                { label: "Contact Us", desc: "Get in touch", href: "/templates/spa-salon-1/preview/contact" },
              ].map((item, i, arr) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-4 px-5 py-4 hover:bg-pink-50 transition-colors ${i < arr.length - 1 ? "border-b border-gray-50" : ""}`}
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700">{item.label}</div>
                    <div className="text-xs text-gray-400">{item.desc}</div>
                  </div>
                  <span className="text-gray-300 text-sm">›</span>
                </Link>
              ))}
            </div>

            {/* Loyalty Card */}
            <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl p-5 text-white">
              <div className="text-xs uppercase tracking-widest opacity-80 mb-1">Loyalty Points</div>
              <div className="text-3xl font-light mb-1">840 pts</div>
              <div className="text-xs opacity-75 mb-3">160 points until your next free treatment</div>
              <div className="h-1.5 bg-white/20 rounded-full">
                <div className="h-1.5 bg-white rounded-full w-5/6"></div>
              </div>
            </div>
          </div>

          {/* Right: Appointments */}
          <div className="md:col-span-2 space-y-6">
            {/* Upcoming */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Upcoming Appointments</h2>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {upcomingAppointments.map((apt, i) => (
                  <div
                    key={apt.id}
                    className={`p-5 flex items-start gap-4 ${i < upcomingAppointments.length - 1 ? "border-b border-gray-50" : ""}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-pink-50 flex flex-col items-center justify-center flex-shrink-0">
                      <div className="text-xs text-pink-500 font-semibold leading-none">
                        {apt.date.split(" ")[1].replace(",", "")}
                      </div>
                      <div className="text-xs text-pink-300 leading-none mt-0.5">
                        {apt.date.split(" ")[0].slice(0, 3).toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-800 text-sm">{apt.service}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{apt.time} &middot; with {apt.therapist}</div>
                    </div>
                    <span
                      className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full ${
                        apt.status === "Confirmed"
                          ? "bg-green-50 text-green-600"
                          : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-right">
                <Link
                  href="/templates/spa-salon-1/preview/appointment"
                  className="inline-block px-5 py-2 bg-pink-400 text-white text-xs rounded-full hover:bg-pink-500 transition-colors tracking-wide"
                >
                  + Book New Appointment
                </Link>
              </div>
            </div>

            {/* Past Appointments */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Past Visits</h2>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {pastAppointments.map((apt, i) => (
                  <div
                    key={apt.id}
                    className={`p-5 flex items-center gap-4 ${i < pastAppointments.length - 1 ? "border-b border-gray-50" : ""}`}
                  >
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700">{apt.service}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{apt.date} &middot; {apt.therapist}</div>
                    </div>
                    <div className="text-yellow-400 text-xs">
                      {"★".repeat(apt.rating)}{"☆".repeat(5 - apt.rating)}
                    </div>
                    <button className="text-xs text-pink-400 hover:underline flex-shrink-0">Rebook</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Info */}
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Profile Information</h2>
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { label: "Full Name", value: "Shata Solutions" },
                    { label: "Email", value: "info@shatasolutions.com" },
                    { label: "Phone", value: "+20 100 000 0000" },
                    { label: "City", value: "Cairo, Egypt" },
                    { label: "Birthday", value: "— Not set —" },
                    { label: "Preferred Therapist", value: "Layla Hassan" },
                  ].map((f) => (
                    <div key={f.label}>
                      <div className="text-xs text-gray-400 mb-1">{f.label}</div>
                      <div className="text-sm text-gray-700">{f.value}</div>
                    </div>
                  ))}
                </div>
                <button className="mt-5 text-sm text-pink-500 hover:underline">Edit Profile Information</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm">
          <Link href="/templates/spa-salon-1/preview" className="text-gray-400 hover:text-gray-600">← Back to Home</Link>
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-400 text-sm text-center py-6 mt-10">
        &copy; {new Date().getFullYear()} Shata Spa &amp; Salon. All rights reserved.
      </footer>
    </div>
  );
}
