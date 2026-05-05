"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface MessageItem {
  role: "user" | "assistant" | string;
  message: string;
}

interface Lead {
  id: string;
  email: string | null;
  phone: string | null;
  created_at: string;
  messages?: MessageItem[] | null;
}

export default function LeadDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [aiInsight, setAiInsight] = useState("Hi, I saw your request and can help you get started today. Want me to take care of everything for you?");
  const [insightLoading, setInsightLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchLead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!lead || !lead.messages || lead.messages.length === 0) {
      setAiInsight("No conversation history yet. Follow up to gather more buying signals.");
      return;
    }

    generateAIInsight(lead);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lead]);

  const fetchLead = async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching lead:", error);
    } else {
      setLead(data as Lead);
    }

    setLoading(false);
  };

  const generateAIInsight = async (lead: Lead) => {
    try {
      setInsightLoading(true);

      const conversationText = (lead.messages || [])
        .map((msg) => `${msg.role}: ${msg.message}`)
        .join("\n");

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: `Based on this conversation, generate a short WhatsApp message that will help close the lead. Make it sound human, confident, and action-oriented. Encourage the client to reply. Keep it under 25 words.\n\nConversation:\n${conversationText}`,
          history: [],
          sessionId: `lead-insight-${lead.id}`
        })
      });

      const data = await res.json();
      setAiInsight(data?.reply || "I can help you get this done quickly. Want me to handle it for you?");
    } catch (error) {
      console.error("AI insight generation failed:", error);
      setAiInsight("Unable to generate AI insight right now. Use WhatsApp follow-up as the next best step.");
    } finally {
      setInsightLoading(false);
    }
  };

  const getLeadScore = (lead: Lead) => {
    let score = 10;

    if (lead.email) score += 25;
    if (lead.phone) score += 35;

    const createdAt = new Date(lead.created_at).getTime();
    const now = Date.now();
    const hoursAgo = (now - createdAt) / (1000 * 60 * 60);

    if (hoursAgo < 1) score += 25;
    else if (hoursAgo < 24) score += 15;
    else if (hoursAgo < 72) score += 5;

    if (lead.email && lead.phone) score += 10;

    return Math.min(score, 100);
  };

  const getAIInsight = (lead: Lead) => {
    const score = getLeadScore(lead);

    if (score >= 80) {
      return "High-intent lead. Likely ready to convert. Recommend immediate WhatsApp follow-up.";
    }

    if (score >= 50) {
      return "Moderate interest detected. Follow up soon and provide guidance to move forward.";
    }

    return "Low engagement so far. Nurture with follow-up and build trust.";
  };

  if (loading) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  if (!lead) {
    return <div className="p-6 text-white">Lead not found</div>;
  }

  const score = getLeadScore(lead);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0b0f] via-[#0d1117] to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold">Lead Details</h1>
          <p className="text-white/50 text-sm mt-2">Full client overview</p>
        </div>

        {/* Info */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-3">
          <p><span className="text-white/50">Email:</span> {lead.email || "—"}</p>
          <p><span className="text-white/50">Phone:</span> {lead.phone || "—"}</p>
          <p><span className="text-white/50">Created:</span> {new Date(lead.created_at).toLocaleString()}</p>
        </div>

        {/* Score */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-medium mb-4">AI Score</h2>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
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
          <p className="text-sm text-white/50 mt-2">{score}% intent</p>
        </div>

        {/* AI Insight */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-medium mb-2">AI Insight</h2>
          <p className="text-white/60 text-sm">
            {insightLoading ? "Generating AI insight..." : aiInsight || getAIInsight(lead)}
          </p>
        </div>

        {/* Messages */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-medium mb-4">Conversation</h2>

          {lead.messages && lead.messages.length > 0 ? (
            <div className="space-y-3">
              {lead.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-sm ${
                    msg.role === "user"
                      ? "bg-blue-500/10 text-blue-300"
                      : "bg-white/5 text-white/70"
                  }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/40 text-sm">No messages yet</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {lead.phone && (
            <a
              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(aiInsight)}`}
              target="_blank"
              className="px-5 py-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition"
            >
              Open WhatsApp
            </a>
          )}

          {lead.email && (
            <a
              href={`mailto:${lead.email}`}
              className="px-5 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
            >
              Send Email
            </a>
          )}

          <button className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg">
            Mark as Hot Lead
          </button>

          <button className="px-4 py-2 bg-yellow-500/10 text-yellow-400 rounded-lg">
            Follow Up Later
          </button>
        </div>

      </div>
    </div>
  );
}
