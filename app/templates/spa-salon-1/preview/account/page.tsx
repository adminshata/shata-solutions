// app/templates/spa-salon-1/preview/account/page.tsx
import Link from "next/link";

export default function SpaSalon1AccountPage() {
  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-400 text-2xl font-light">
              A
            </div>
            <div>
              <h1 className="text-xl font-light text-gray-800">My Account</h1>
              <p className="text-sm text-gray-500">info@shatasolutions.com</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Link href="/templates/spa-salon-1/preview/appointment" className="block p-5 border border-gray-100 rounded-xl hover:border-pink-200 transition-colors">
              <div className="text-pink-400 text-lg mb-2">📅</div>
              <div className="text-sm font-medium text-gray-700">Book Appointment</div>
              <div className="text-xs text-gray-400 mt-1">Schedule a new session</div>
            </Link>
            <div className="block p-5 border border-gray-100 rounded-xl">
              <div className="text-pink-400 text-lg mb-2">📋</div>
              <div className="text-sm font-medium text-gray-700">My Appointments</div>
              <div className="text-xs text-gray-400 mt-1">No upcoming appointments</div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <Link href="/templates/spa-salon-1/preview" className="text-sm text-gray-400 hover:text-gray-600">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
