import Link from "next/link";
import { FIRM, BASE } from "@/lib/multiLawyer1/data";

export default function PrivacyPage() {
  return (
    <>
      <section className="relative pt-40 pb-16 bg-gradient-to-b from-[#0a1628] to-[#050d1f]">
        <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
          <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-4">Legal</p>
          <h1 className="ml-serif text-4xl lg:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/50 text-sm">Last Updated: January 1, 2026</p>
        </div>
      </section>

      <section className="py-16 bg-[#050d1f]">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          {/* Demo Notice */}
          <div className="mb-10 p-5 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-sm">
            <p className="text-white/70 text-sm leading-relaxed">
              <strong className="text-[#c9a84c]">Demo Template Notice:</strong> This is a demonstration website template. The privacy policy below is provided as sample legal content for the template and does not represent the actual privacy practices of any real law firm.
            </p>
          </div>

          <div className="prose prose-invert max-w-none space-y-10">
            {[
              {
                title: "1. Introduction",
                content: `${FIRM.name} ("Firm," "we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website or contact us about legal services. Please read this policy carefully. If you disagree with the terms, please discontinue use of our website.`,
              },
              {
                title: "2. Information We Collect",
                content: `We may collect personal information that you voluntarily provide when you: fill out a contact form, request a consultation, call our office, or send us an email. This may include your name, email address, phone number, and a description of your legal matter. We may also collect non-personal information automatically when you visit our website, including browser type, IP address, pages visited, and time spent on pages.`,
              },
              {
                title: "3. How We Use Your Information",
                content: `We use the information you provide to respond to your inquiries and consultation requests, evaluate whether we are able to assist you with your legal matter, communicate with you about your matter if we enter an attorney-client relationship, improve our website and services, and comply with legal obligations. We do not sell, rent, or trade your personal information to third parties for marketing purposes.`,
              },
              {
                title: "4. Attorney-Client Privilege",
                content: `Information shared with our attorneys in the context of an established attorney-client relationship is protected by attorney-client privilege under applicable law. However, submitting a contact form or initial inquiry to our firm does not automatically create an attorney-client relationship. We encourage you not to share highly sensitive or confidential information through general contact forms until an attorney-client relationship has been formally established.`,
              },
              {
                title: "5. Disclosure of Information",
                content: `We may disclose your information: to comply with legal obligations or respond to lawful requests from public authorities; to protect and defend our rights or property; to prevent or investigate possible wrongdoing; to protect the personal safety of clients or the public; or with your consent. We do not share client information with third parties for commercial purposes.`,
              },
              {
                title: "6. Data Security",
                content: `We implement appropriate administrative, technical, and physical security measures to protect your personal information from unauthorized access, use, alteration, or disclosure. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.`,
              },
              {
                title: "7. Third-Party Links",
                content: `Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.`,
              },
              {
                title: "8. Your Rights",
                content: `Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete personal information we hold about you. To exercise any applicable rights, please contact us using the information below.`,
              },
              {
                title: "9. Changes to This Policy",
                content: `We may update this Privacy Policy from time to time. The updated version will be indicated by a revised "Last Updated" date at the top of this page. We encourage you to review this policy periodically.`,
              },
              {
                title: "10. Contact Us",
                content: `If you have questions about this Privacy Policy or our data practices, please contact us:\n\n${FIRM.name}\n${FIRM.address}\nPhone: ${FIRM.phone}\nEmail: ${FIRM.email}`,
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="ml-serif text-xl font-bold text-white mb-4 pb-2 border-b border-[#1a3060]">
                  {section.title}
                </h2>
                <p className="text-white/65 text-sm leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-[#1a3060] flex flex-col sm:flex-row gap-4">
            <Link
              href={`${BASE}/terms`}
              className="text-[#c9a84c] text-sm font-semibold hover:text-[#e4b96a] transition-colors"
            >
              View Terms of Service →
            </Link>
            <Link
              href={`${BASE}/contact`}
              className="text-white/55 text-sm hover:text-white transition-colors"
            >
              Contact Us with Questions →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
