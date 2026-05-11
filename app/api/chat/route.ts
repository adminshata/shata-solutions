import OpenAI from "openai";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Lazy Supabase client — never constructed at module import time.
// Avoids "supabaseUrl is required" during Next.js "Collecting page data".
let _supabase: SupabaseClient | null = null;
function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and/or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }
  _supabase = createClient(url, key);
  return _supabase;
}

let _openai: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (_openai) return _openai;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OpenAI env var: OPENAI_API_KEY");
  }
  _openai = new OpenAI({ apiKey });
  return _openai;
}

const MAKE_WEBHOOK = "https://hook.us2.make.com/ksqvtzcbif1143uiv1t0pvkno67dhsol";

const formatTime = () =>
  new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });


const detectCountry = (message: string): string => {
  const text = message.toLowerCase();

  if (text.includes("uae") || text.includes("dubai") || text.includes("abu dhabi")) return "AE";
  if (text.includes("usa") || text.includes("united states") || text.includes("california") || text.includes("new york")) return "US";
  if (text.includes("egypt") || text.includes("cairo")) return "EG";

  // default fallback
  return "EG";
};

const normalizePhone = (phone: string, defaultCountry: string = "EG") => {
  if (!phone) return "";

  // remove all except digits and +
  let cleaned = phone.replace(/[^\d+]/g, "");

  // normalize prefixes
  if (cleaned.startsWith("+")) {
    cleaned = cleaned.slice(1);
  } else if (cleaned.startsWith("00")) {
    cleaned = cleaned.slice(2);
  }

  // --- COUNTRY RULES ---

  // Egypt
  if (defaultCountry === "EG") {
    if (cleaned.startsWith("0") && cleaned.length === 11) {
      cleaned = "2" + cleaned.slice(1);
    }
  }

  // UAE
  if (defaultCountry === "AE") {
    if (cleaned.startsWith("05") && cleaned.length === 10) {
      cleaned = "971" + cleaned.slice(1);
    }
  }

  // US fallback
  if (cleaned.length === 10) {
    cleaned = "1" + cleaned;
  }

  // ensure only digits
  cleaned = cleaned.replace(/\D/g, "");

  // sanity check: WhatsApp requires at least 8 digits
  if (cleaned.length < 8) return "";

  return cleaned;
};

// --- Reusable saveLead function with deduplication, session safety, and message merging ---
const saveLead = async (
  lead: { email?: string | null; phone?: string | null },
  newMessages: { role: string; message: string }[],
  sessionId: string
) => {
  try {
    const supabase = getSupabase();
    // 🔍 find existing lead by session
    const { data: existingLead, error } = await supabase
      .from("leads")
      .select("*")
      .eq("session_id", sessionId)
      .maybeSingle();

    if (error) {
      console.error("Error finding lead:", error);
    }

    if (existingLead) {
      // 🔁 merge messages safely
      const updatedMessages = [
        ...(existingLead.messages || []),
        ...newMessages
      ];

      await supabase
        .from("leads")
        .update({
          email: lead.email ?? existingLead.email,
          phone: lead.phone ?? existingLead.phone,
          messages: updatedMessages,
          updated_at: new Date().toISOString()
        })
        .eq("id", existingLead.id)
        .eq("session_id", sessionId);

    } else {
      // 🆕 create new lead
      await supabase.from("leads").insert([
        {
          email: lead.email || null,
          phone: lead.phone || null,
          messages: newMessages,
          session_id: sessionId,
          created_at: new Date().toISOString()
        }
      ]);
    }

  } catch (err) {
    console.error("Error saving lead", err);
  }
};

export async function POST(req: Request) {
  try {
    const supabase = getSupabase();
    const { message, history = [], sessionId } = await req.json();

    if (!sessionId) {
      return new Response(JSON.stringify({ reply: "Missing session." }), { status: 400 });
    }

    // --- Lead capture (simple) ---
    const emailMatch = message.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    const phoneMatch = message.match(/(\+?\d[\d\s\-]{7,}\d)/);

    const lead = {
      email: emailMatch ? emailMatch[0].toLowerCase() : null,
      phone: phoneMatch ? phoneMatch[0] : null,
    };

    // safe phone fallback (fix TypeScript null issue)
    const phone = lead.phone ?? "";

    // 🔥 fallback: attach to latest lead if only one field is provided
    let fallbackLeadId: string | null = null;

    if (!lead.email && lead.phone) {
      const { data } = await supabase
        .from("leads")
        .select("id")
        .eq("session_id", sessionId)
        .is("phone", null)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      fallbackLeadId = data?.id || null;
    }

    if (!lead.phone && lead.email) {
      const { data } = await supabase
        .from("leads")
        .select("id")
        .eq("session_id", sessionId)
        .is("email", null)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      fallbackLeadId = data?.id || null;
    }

    // --- Save lead to Supabase (deduplicate) ---
    if (lead.email || lead.phone) {
      try {
        let query = supabase.from("leads").select("id,email,phone").eq("session_id", sessionId);

        // 🔥 search by email OR phone
        if (lead.email && lead.phone) {
          query = query.or(`email.eq.${lead.email},phone.eq.${lead.phone}`);
        } else if (lead.email) {
          query = query.eq("email", lead.email);
        } else if (lead.phone) {
          query = query.eq("phone", lead.phone);
        }

        const { data: existingLead, error: selectError } = await query.maybeSingle();

        if (selectError) {
          console.error("Supabase select error:", selectError);
        }

        // 🔥 merge case: email row + phone row exist separately
        if (lead.email && lead.phone) {
          const { data: emailRow } = await supabase
            .from("leads")
            .select("id")
            .eq("session_id", sessionId)
            .eq("email", lead.email)
            .maybeSingle();

          const { data: phoneRow } = await supabase
            .from("leads")
            .select("id")
            .eq("session_id", sessionId)
            .eq("phone", lead.phone)
            .maybeSingle();

          if (emailRow?.id && phoneRow?.id && emailRow.id !== phoneRow.id) {
            // update email row with phone
            await supabase
              .from("leads")
              .update({ phone: lead.phone })
              .eq("id", emailRow.id)
              .eq("session_id", sessionId);

            // delete duplicate phone row
            await supabase
              .from("leads")
              .delete()
              .eq("id", phoneRow.id)
              .eq("session_id", sessionId);
          }
        }

        // 🔥 use fallback if no direct match
        if (!existingLead?.id && fallbackLeadId) {
          const { error: fallbackUpdateError } = await supabase
            .from("leads")
            .update({
              email: lead.email ?? undefined,
              phone: lead.phone ?? undefined,
              created_at: new Date().toISOString()
            })
            .eq("id", fallbackLeadId)
            .eq("session_id", sessionId);

          if (fallbackUpdateError) {
            console.error("Fallback update error:", fallbackUpdateError);
          }

          return;
        }

        if (existingLead?.id) {
          const { error: updateError } = await supabase
            .from("leads")
            .update({
              email: lead.email ?? existingLead.email,
              phone: lead.phone ?? existingLead.phone,
              created_at: new Date().toISOString()
            })
            .eq("id", existingLead.id)
            .eq("session_id", sessionId);

          if (updateError) {
            console.error("Supabase update error:", updateError);
          }
        } else {
          const { error: insertError } = await supabase
            .from("leads")
            .insert([
              {
                email: lead.email,
                phone: lead.phone,
                session_id: sessionId,
                created_at: new Date().toISOString()
              }
            ]);

          if (insertError) {
            console.error("Supabase insert error:", insertError);
          }
        }
      } catch (e) {
        console.error("Supabase lead save error:", e);
      }
    }

    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are Shata, the AI sales closer for Shata Solutions.

Your purpose:
- Qualify the lead
- Keep the conversation short
- Move the user toward giving contact details or agreeing to the next step
- Increase conversions without giving away too much implementation detail

You help users with:
- LLC formation
- EIN filing
- AI automation systems
- business setup
- sales automation

Rules:
- Be concise, confident, and professional
- Sound human, not robotic
- Do NOT provide long technical explanations
- Do NOT give full step-by-step service instructions
- Do NOT overwhelm the lead with information
- Focus on trust, simplicity, and next action
- If the user asks for pricing, quote, setup, start, or says they are ready, treat them as high intent
- If contact details are missing, try to move them toward sharing email or phone
- If contact details already exist, move toward booking, WhatsApp, or next-step confirmation
- End most replies with a soft closing question

Closer behavior:
- Early stage lead: ask one smart qualifying question
- Interested lead: suggest the easiest next step
- High-intent lead: push gently toward action now
- Existing lead with contact info: encourage immediate follow-up through WhatsApp or email

Response style:
- 1 to 3 short paragraphs max
- Plain English
- No emojis unless the user uses them first
- No bullet points

Never say you are an AI model. Act like a real sales assistant working for Shata Solutions.`
        },
        ...history.map((m: any) => ({
          role: m.role === "bot" ? "assistant" : "user",
          content: m.message
        })),
        {
          role: "user",
          content: message
        }
      ],
    });

    const reply = completion.choices[0].message.content;

    // --- AI Smart WhatsApp Trigger ---
    const lowerMessage = message.toLowerCase();

    const wantsWhatsApp =
      lowerMessage.includes("price") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("start") ||
      lowerMessage.includes("ready") ||
      lowerMessage.includes("help") ||
      lowerMessage.includes("contact") ||
      lowerMessage.includes("call");

    // build WhatsApp number (use lead phone if exists, otherwise default)
    const whatsappNumber = lead.phone
      ? normalizePhone(lead.phone, detectCountry(message))
      : "201010255736";

    let finalReply = reply;

    if (wantsWhatsApp) {
      finalReply += `\n\nNeed faster help?\n👉 https://wa.me/${whatsappNumber}?text=Hi%20I%20want%20to%20get%20started`;
    }

    // --- Save lead with merged messages (reusable function) ---
    await saveLead(
      { email: lead.email, phone: lead.phone },
      [
        { role: "user", message },
        { role: "assistant", message: reply }
      ],
      sessionId
    );

    // 🔥 REAL-TIME HIGH INTENT ALERT
    try {
      const lowerMessage = message.toLowerCase();

      const isHotLead =
        lowerMessage.includes("price") ||
        lowerMessage.includes("how much") ||
        lowerMessage.includes("start") ||
        lowerMessage.includes("ready") ||
        lowerMessage.includes("now") ||
        lowerMessage.includes("quote") ||
        lowerMessage.includes("cost") ||
        lowerMessage.includes("book") ||
        lowerMessage.includes("call me") ||
        lowerMessage.includes("lets start") ||
        lowerMessage.includes("let's start");

      if (isHotLead && (lead.email || lead.phone)) {
        await fetch(MAKE_WEBHOOK, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: lead.email,
            phone: lead.phone,
            whatsappPhone: lead.phone ? normalizePhone(lead.phone, detectCountry(message)) : "",
            message,
            alert: "🔥 HOT LEAD",
            time: formatTime()
          })
        });
      }
    } catch (err) {
      console.error("Realtime alert error:", err);
    }

    // --- Send to Make webhook (WhatsApp / general + email follow-up) ---
    if (lead.email || lead.phone) {
      try {
        // 📲 Main webhook (WhatsApp / general automation)
        await fetch(MAKE_WEBHOOK, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: lead.email,
            phone: lead.phone,
            whatsappPhone: lead.phone ? normalizePhone(lead.phone, detectCountry(message)) : "",
            message,
            time: formatTime()
          })
        });

        // 🤖 AI EMAIL CLOSER
        if (lead.email) {
          let emailContent = "";

          try {
            const aiEmail = await openai.chat.completions.create({
              model: "gpt-4o-mini",
              messages: [
                {
                  role: "system",
                  content: `You are a professional sales closer writing follow-up emails for Shata Solutions.

Your goal is to move the lead toward replying or taking the next step.

Rules:
- Keep it short and professional
- Do NOT explain the service in detail
- Focus on trust and simplicity
- Make the client feel everything will be handled
- Encourage reply with a soft closing question
- Sound premium and human
- No emojis
- Avoid generic filler
- Make the email feel action-oriented`
                },
                {
                  role: "user",
                  content: `Write a short follow-up email for a client interested in ${lead.phone ? "our services" : "our services"}.`
                }
              ]
            });

            emailContent =
              aiEmail.choices[0]?.message?.content ??
              "Hello,\n\nThank you for contacting Shata Solutions. Our team will assist you shortly.";

          } catch (err) {
            console.error("AI email generation failed", err);
            emailContent = "Hello,\n\nThank you for contacting Shata Solutions. Our team will assist you shortly.";
          }

          if (process.env.MAKE_EMAIL_WEBHOOK) {
            await fetch(process.env.MAKE_EMAIL_WEBHOOK, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                email: lead.email,
                phone: lead.phone,
                subject: "Shata Solutions – Next Steps",
                message: emailContent
              })
            });
          }
        }

      } catch (e) {
        console.error("Make webhook error:", e);
      }
    }

    return new Response(
      JSON.stringify({ reply: finalReply, leadCaptured: (lead.email || lead.phone), lead }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ reply: "AI error. Try again." }),
      { status: 500 }
    );
  }
}
