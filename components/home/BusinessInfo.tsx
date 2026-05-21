"use client";

interface Props {
  isDark: boolean;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function BuildingIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function BadgeCheckIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const IDENTITY_FIELDS = [
  { label: "Legal Business Name", value: "Shata Global LLC" },
  { label: "Operating Brand Name", value: "Shata Solutions" },
  { label: "Business Type", value: "Limited Liability Company (LLC)" },
  { label: "State of Registration", value: "Wyoming, United States" },
  { label: "Tax ID (EIN)", value: "Available upon request to verified partners" },
];

const SERVICES_FIELDS = [
  { label: "Website Development", value: "Custom websites, web apps & landing pages" },
  { label: "AI & Automation", value: "AI chatbots, workflow automation, CRM systems" },
  { label: "Branding & Design", value: "Logo, brand identity, marketing materials" },
  { label: "Business Formation", value: "LLC registration, EIN filing, U.S. banking setup" },
  { label: "Website Templates", value: "Ready-to-launch SaaS template marketplace" },
  { label: "Primary Markets", value: "United States, UAE, Egypt, International" },
];

const CONTACT_FIELDS = [
  { label: "General Inquiries", value: "info@shatasolutions.com" },
  { label: "Customer Support", value: "support@shatasolutions.com" },
  { label: "Sales Inquiries", value: "sales@shatasolutions.com" },
  { label: "Billing & Payments", value: "billing@shatasolutions.com" },
  { label: "Phone", value: "+1 (619) 776-1222" },
  { label: "Support Hours", value: "Mon–Fri, 9 AM–6 PM EST" },
];

const ADDRESS_FIELDS = [
  { label: "Mailing Address", value: "3845 University Ave, San Diego, CA 92105" },
  { label: "Registered State", value: "Wyoming, United States" },
  { label: "Official Website", value: "shatasolutions.com" },
  { label: "Service Delivery", value: "100% Online, Cloud-Based" },
];

const COMPLIANCE_FIELDS = [
  { label: "Encryption", value: "256-bit SSL — encrypted at rest & in transit" },
  { label: "Payment Processors", value: "Stripe, Wise, Mercury — fully compatible" },
  { label: "Data Privacy", value: "GDPR & CCPA compliant" },
  { label: "Refund Policy", value: "Transparent policy — available on website" },
  { label: "Payment Security", value: "PCI-DSS compliant handling" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface CardProps {
  isDark: boolean;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  fields: { label: string; value: string }[];
}

function InfoCard({ isDark, icon, iconBg, iconColor, title, fields }: CardProps) {
  return (
    <div
      className={`rounded-2xl border p-6 transition-all hover:-translate-y-0.5 ${
        isDark
          ? "border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] hover:border-white/20"
          : "border-slate-200 bg-white hover:shadow-md"
      }`}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
          {icon}
        </div>
        <h3
          className={`font-semibold text-base tracking-tight ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          {title}
        </h3>
      </div>

      {/* Fields */}
      <dl className="space-y-3">
        {fields.map(({ label, value }) => (
          <div
            key={label}
            className={`flex flex-col gap-0.5 pb-3 border-b last:border-b-0 last:pb-0 ${
              isDark ? "border-white/5" : "border-slate-100"
            }`}
          >
            <dt
              className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${
                isDark ? "text-white/40" : "text-slate-400"
              }`}
            >
              {label}
            </dt>
            <dd
              className={`text-sm font-medium leading-snug ${
                isDark ? "text-white/90" : "text-slate-800"
              }`}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BusinessInfo({ isDark }: Props) {
  const trustBadges = [
    { icon: <BadgeCheckIcon />, label: "Verified U.S. LLC", color: isDark ? "text-blue-400 bg-blue-500/10" : "text-blue-600 bg-blue-50" },
    { icon: <LockIcon />, label: "256-bit SSL Security", color: isDark ? "text-green-400 bg-green-500/10" : "text-green-600 bg-green-50" },
    { icon: <ShieldIcon />, label: "Stripe & Wise Ready", color: isDark ? "text-purple-400 bg-purple-500/10" : "text-purple-600 bg-purple-50" },
    { icon: <ClockIcon />, label: "24h Support Response", color: isDark ? "text-orange-400 bg-orange-500/10" : "text-orange-600 bg-orange-50" },
    { icon: <GlobeIcon />, label: "Globally Accessible", color: isDark ? "text-indigo-400 bg-indigo-500/10" : "text-indigo-600 bg-indigo-50" },
    { icon: <BadgeCheckIcon />, label: "GDPR Compliant", color: isDark ? "text-teal-400 bg-teal-500/10" : "text-teal-600 bg-teal-50" },
  ];

  return (
    <section
      id="business-info"
      className={`relative py-24 ${
        isDark
          ? "bg-[linear-gradient(180deg,transparent_0%,rgba(15,23,42,0.8)_30%,rgba(2,6,23,0.95)_100%)]"
          : "bg-slate-50"
      }`}
    >
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-0">
        <div
          className={`absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full blur-[120px] ${
            isDark ? "bg-blue-900/10" : "bg-blue-100/60"
          }`}
        />
        <div
          className={`absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full blur-[100px] ${
            isDark ? "bg-purple-900/10" : "bg-purple-100/40"
          }`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Section header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div
            className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide ${
              isDark
                ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                : "border-blue-200 bg-blue-50 text-blue-600"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isDark ? "bg-blue-400" : "bg-blue-500"
              } animate-pulse`}
            />
            Verified Business Profile
          </div>

          <h2
            className={`text-4xl sm:text-5xl font-semibold tracking-tight leading-tight ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Business Information
          </h2>

          <p
            className={`mt-4 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto ${
              isDark ? "text-white/60" : "text-slate-500"
            }`}
          >
            Shata Global LLC operates as a digital services and business technology company
            providing website development, automation systems, AI solutions, branding, website
            templates, and business setup support for startups and small businesses worldwide.
          </p>
        </div>

        {/* Company description block */}
        <div
          className={`mb-8 rounded-2xl border px-8 py-6 ${
            isDark
              ? "border-white/10 bg-gradient-to-r from-blue-950/30 via-slate-900/40 to-purple-950/30"
              : "border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className={`flex-shrink-0 rounded-xl p-3 ${isDark ? "bg-blue-500/15" : "bg-blue-100"}`}>
              <BuildingIcon />
            </div>
            <p
              className={`text-sm sm:text-base leading-relaxed ${
                isDark ? "text-white/75" : "text-slate-600"
              }`}
            >
              <span className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                Shata Global LLC (operating as Shata Solutions)
              </span>{" "}
              is a U.S.-registered digital services company offering an online business platform,
              SaaS and automation solutions, a website templates marketplace, and business formation
              support. We serve founders and businesses across the United States, UAE, Egypt, and
              globally. All services are delivered fully online through a secure cloud-based platform.
            </p>
          </div>
        </div>

        {/* Row 1: Legal Identity + Services */}
        <div className="grid lg:grid-cols-2 gap-5 mb-5">
          <InfoCard
            isDark={isDark}
            icon={<BuildingIcon />}
            iconBg={isDark ? "bg-blue-500/15" : "bg-blue-50"}
            iconColor={isDark ? "text-blue-400" : "text-blue-600"}
            title="Legal Identity"
            fields={IDENTITY_FIELDS}
          />
          <InfoCard
            isDark={isDark}
            icon={<GlobeIcon />}
            iconBg={isDark ? "bg-purple-500/15" : "bg-purple-50"}
            iconColor={isDark ? "text-purple-400" : "text-purple-600"}
            title="Services Offered"
            fields={SERVICES_FIELDS}
          />
        </div>

        {/* Row 2: Contact + Address + Compliance */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          <InfoCard
            isDark={isDark}
            icon={<EnvelopeIcon />}
            iconBg={isDark ? "bg-green-500/15" : "bg-green-50"}
            iconColor={isDark ? "text-green-400" : "text-green-600"}
            title="Contact & Support"
            fields={CONTACT_FIELDS}
          />
          <InfoCard
            isDark={isDark}
            icon={<MapPinIcon />}
            iconBg={isDark ? "bg-orange-500/15" : "bg-orange-50"}
            iconColor={isDark ? "text-orange-400" : "text-orange-600"}
            title="Mailing Address"
            fields={ADDRESS_FIELDS}
          />
          <InfoCard
            isDark={isDark}
            icon={<ShieldIcon />}
            iconBg={isDark ? "bg-indigo-500/15" : "bg-indigo-50"}
            iconColor={isDark ? "text-indigo-400" : "text-indigo-600"}
            title="Compliance & Security"
            fields={COMPLIANCE_FIELDS}
          />
        </div>

        {/* Trust badges strip */}
        <div
          className={`rounded-2xl border px-6 py-5 ${
            isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"
          }`}
        >
          <p
            className={`text-center text-[11px] font-semibold uppercase tracking-[0.2em] mb-5 ${
              isDark ? "text-white/40" : "text-slate-400"
            }`}
          >
            Trust Indicators
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {trustBadges.map(({ icon, label, color }) => (
              <div
                key={label}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold ${color} ${
                  isDark ? "border-white/10" : "border-transparent"
                }`}
              >
                <span className="h-4 w-4 flex-shrink-0">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
