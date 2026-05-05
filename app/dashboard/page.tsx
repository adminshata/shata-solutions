"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [leads, setLeads] = useState<any[]>([]);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setLeads(data || []);
  };

  useEffect(() => {
    fetchLeads();

    // 🔥 realtime updates
    const channel = supabase
      .channel("leads-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "leads" },
        (payload) => {
          setLeads((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Leads Dashboard 🚀</h1>

      {leads.length === 0 && (
        <p className="text-white/60">No leads yet...</p>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="p-5 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition"
          >
            <p className="font-semibold text-lg">
              {lead.email || "No Email"}
            </p>

            <p className="text-sm text-green-400 mt-1">
              {lead.phone || "No Phone"}
            </p>

            <p className="text-xs text-white/50 mt-2">
              {new Date(lead.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}