"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Lead {
  id: string;
  email: string | null;
  phone: string | null;
  created_at: string;
  status?: "hot" | "warm" | "cold";
  messages?: { role: string; message: string }[];
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchLeads();

    const channel = supabase
      .channel("realtime-leads")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "leads",
        },
        (payload) => {
          console.log("Realtime update:", payload);
          fetchLeads();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching leads:", error);
    } else {
      setLeads(data || []);
    }

    setLoading(false);
  };

  const filteredLeads = leads.filter((lead) => {
    const text = (lead.email || "") + (lead.phone || "");
    return text.toLowerCase().includes(search.toLowerCase());
  });

  function getLeadScore(lead: Lead): number {
    let score = 10;

    if (lead.email) score += 20;
    if (lead.phone) score += 30;

    const createdAt = new Date(lead.created_at).getTime();
    const now = Date.now();
    const hoursAgo = (now - createdAt) / (1000 * 60 * 60);

    if (hoursAgo < 1) score += 20;
    else if (hoursAgo < 24) score += 10;

    // 🧠 REAL AI BEHAVIOR FROM MESSAGES
    if (lead.messages && lead.messages.length > 0) {
      const fullText = lead.messages
        .map((m) => m.message.toLowerCase())
        .join(" ");

      if (fullText.includes("price") || fullText.includes("how much")) {
        score += 20; // strong buying intent
      }

      if (fullText.includes("start") || fullText.includes("setup")) {
        score += 15;
      }

      if (fullText.includes("ready") || fullText.includes("now")) {
        score += 20;
      }

      if (fullText.includes("just asking") || fullText.includes("info")) {
        score -= 10; // low intent
      }
    }

    if (lead.email && lead.phone) score += 10;

    return Math.max(0, Math.min(score, 100));
  }

  function getLeadTemperature(score: number): string {
    if (score >= 75) return "Hot";
    if (score >= 45) return "Warm";
    return "Cold";
  }

  function getStatusClasses(status: string): string {
    if (status === "Hot") return "bg-red-500 text-red-100";
    if (status === "Warm") return "bg-yellow-500 text-yellow-100";
    return "bg-gray-500 text-gray-100";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0b0f] via-[#0d1117] to-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight">Leads</h1>
          <p className="text-white/50 mt-2 text-sm">
            Manage and track your incoming clients in one place.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/20"
          />
        </div>

        {/* Leads List */}
        {loading ? (
          <div className="text-white/50">Loading...</div>
        ) : (
          <div className="space-y-4">
            {filteredLeads.map((lead) => {
              const score = getLeadScore(lead);
              const status = getLeadTemperature(score);

              return (
                <div
                  key={lead.id}
                  onClick={() => router.push(`/dashboard/leads/${lead.id}`)}
                  className="cursor-pointer bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-white/[0.06] transition"
                >
                  {/* Left Info */}
                  <div className="space-y-1">
                    <p className="font-medium text-white">
                      {lead.email || "Unnamed Lead"}
                    </p>
                    <p className="text-xs text-white/40">
                      {lead.phone || "No phone"}
                    </p>
                    <p className="text-xs text-white/30">
                      {new Date(lead.created_at).toLocaleString()}
                    </p>
                  </div>

                  {/* Score */}
                  <div className="flex items-center gap-3">
                    <div className="w-28">
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            score > 80
                              ? "bg-red-400"
                              : score > 50
                              ? "bg-yellow-400"
                              : "bg-gray-400"
                          }`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <p className="text-xs text-white/40 mt-1">{score}%</p>
                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${getStatusClasses(
                        status
                      )}`}
                    >
                      {status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {lead.phone && (
                      <a
                        onClick={(e) => e.stopPropagation()}
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        className="px-4 py-2 rounded-lg bg-green-500/10 text-green-400 text-sm hover:bg-green-500/20 transition"
                      >
                        WhatsApp
                      </a>
                    )}

                    {lead.email && (
                      <a
                        onClick={(e) => e.stopPropagation()}
                        href={`mailto:${lead.email}`}
                        className="px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 text-sm hover:bg-blue-500/20 transition"
                      >
                        Email
                      </a>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredLeads.length === 0 && (
              <div className="text-center text-white/40 mt-10">
                No leads found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}