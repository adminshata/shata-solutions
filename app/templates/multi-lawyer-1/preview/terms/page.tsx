import Link from "next/link";
import { FIRM, BASE } from "@/lib/multiLawyer1/data";

export default function TermsPage() {
  return (
    <>
      <section className="relative pt-40 pb-16 bg-gradient-to-b from-[#0a1628] to-[#050d1f]">
        <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
          <p className="text-[#c9a84c] text-xs font-semibold tracking-[0.25em] uppercase mb-4">Legal</p>
          <h1 className="ml-serif text-4xl lg:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-white/50 text-sm">Last Updated: January 1, 2026</p>
        </div>
      </section>

      <section className="py-16 bg-[#050d1f]">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          {/* Demo Notice */}
          <div className="mb-10 p-5 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-sm">
            <p className="text-white/70 text-sm leading-relaxed">
              <strong className="text-[#c9a84c]">Demo Template Notice:</strong> This is a demonstration website template. The terms below are provided as sample legal content for the template and do not represent the actual terms of any real law firm.
            </p>
          </div>

          <div className="space-y-10">
            {[
              {
                title: "1. Acceptance of Terms",
                content: `By accessing or using the website of ${FIRM.name} ("Firm," "we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this website. We reserve the right to modify these terms at any time, and your continued use of the website constitutes acceptance of any changes.`,
              },
              {
                title: "2. No Attorney-Client Relationship",
                content: `The information provided on this website is for general informational purposes only. Accessing this website, reading its content, or contacting us through this website does not create an attorney-client relationship between you and the Firm. An attorney-client relationship is established only upon the execution of a written engagement agreement signed by both you and an authorized representative of the Firm. Please do not transmit confidential or sensitive legal information to us until a formal attorney-client relationship has been established.`,
              },
              {
                title: "3. Not Legal Advice",
                content: `Nothing on this website constitutes legal advice. The content is provided for informational purposes only and may not reflect the most current legal developments. Laws vary by jurisdiction and change frequently. You should not act or refrain from acting based on information on this website without first seeking qualified legal advice from a licensed attorney regarding your specific circumstances.`,
              },
              {
                title: "4. No Guarantee of Results",
                content: `Past results described on this website do not guarantee or predict future outcomes. Every legal matter is unique and depends on its specific facts and circumstances. The result in one case does not necessarily indicate a similar result can be obtained in another matter.`,
              },
              {
                title: "5. Intellectual Property",
                content: `All content on this website, including text, graphics, logos, and images, is the property of ${FIRM.name} or its content providers and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of any content without our prior written consent.`,
              },
              {
                title: "6. Limitation of Liability",
                content: `To the fullest extent permitted by applicable law, ${FIRM.name} shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of, or inability to use, this website or its content. This includes but is not limited to damages for errors, omissions, interruptions, or inaccuracies in the website content.`,
              },
              {
                title: "7. Third-Party Links",
                content: `This website may contain links to third-party websites. Such links are provided for convenience only and do not constitute an endorsement or approval of those sites. We have no control over the content or practices of third-party websites and accept no responsibility for any harm resulting from your use of them.`,
              },
              {
                title: "8. Governing Law",
                content: `These Terms of Service shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions. Any dispute arising from these terms or your use of this website shall be subject to the exclusive jurisdiction of the state and federal courts located in New York County, New York.`,
              },
              {
                title: "9. Contact Information",
                content: `If you have questions about these Terms of Service, please contact us:\n\n${FIRM.name}\n${FIRM.address}\nPhone: ${FIRM.phone}\nEmail: ${FIRM.email}`,
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
              href={`${BASE}/privacy`}
              className="text-[#c9a84c] text-sm font-semibold hover:text-[#e4b96a] transition-colors"
            >
              View Privacy Policy →
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
