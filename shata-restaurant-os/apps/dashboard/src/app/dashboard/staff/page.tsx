"use client";

import { useState } from "react";

interface StaffMember {
  id: string;
  name: string;
  role: "MANAGER" | "SERVER" | "KITCHEN" | "CASHIER";
  pin?: string;
  active: boolean;
}

const ROLE_STYLES: Record<string, string> = {
  MANAGER: "bg-purple-100 text-purple-700",
  SERVER: "bg-blue-100 text-blue-700",
  KITCHEN: "bg-orange-100 text-orange-700",
  CASHIER: "bg-green-100 text-green-700",
};

export default function StaffPage() {
  const [staff] = useState<StaffMember[]>([]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex h-16 items-center justify-between border-b bg-white px-6">
        <div>
          <h1 className="font-bold text-slate-900">Staff</h1>
          <p className="text-xs text-slate-500">{staff.length} team members</p>
        </div>
        <button className="rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-dark transition-colors">
          Add Staff
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {staff.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-3 text-slate-400">
            <p className="text-sm">No staff members added yet.</p>
            <p className="text-xs text-slate-300">
              Add your team to enable role-based access and PIN login.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="border-b bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {staff.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{member.name}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${ROLE_STYLES[member.role] ?? ""}`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold ${member.active ? "text-green-600" : "text-slate-400"}`}>
                        {member.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-xs text-slate-400 hover:text-slate-700 transition-colors">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
