import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Privacy Policy | Kora Reach",
  description: "How Kora Reach collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-brand-lightGreen py-20">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl mb-4">Privacy Policy</h1>
          <p className="text-brand-dark/60 font-sans">
            Last updated: May 2026
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom max-w-3xl">
          <ScrollReveal>
            <div className="prose-custom space-y-10 font-sans text-brand-dark/80 leading-relaxed text-lg">
              <div>
                <h2 className="text-2xl mb-4">1. Information We Collect</h2>
                <p>
                  When you submit an enquiry through our website, we collect
                  personal information including your name, phone number, email
                  address, suburb, NDIS plan management type, and details about
                  the support you are seeking. We may also collect the
                  participant&apos;s name if someone else is submitting on their
                  behalf.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">2. How We Use Your Information</h2>
                <p>We use the information you provide to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>Respond to your enquiry and arrange an initial consultation</li>
                  <li>Match you with appropriate support workers</li>
                  <li>Communicate with you about your services</li>
                  <li>Comply with NDIS Quality and Safeguards requirements</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl mb-4">3. How We Protect Your Information</h2>
                <p>
                  We take reasonable steps to protect your personal information
                  from misuse, interference, loss, and unauthorised access. All
                  data submitted through our website is transmitted securely and
                  stored in accordance with Australian Privacy Principles.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">4. Sharing Your Information</h2>
                <p>
                  We will not sell, rent, or trade your personal information. We
                  may share information with your plan manager, support
                  coordinator, or the NDIA as required to deliver services under
                  your NDIS plan. We will always seek your consent before sharing
                  information with third parties.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">5. Your Rights</h2>
                <p>
                  You have the right to access, correct, or delete the personal
                  information we hold about you. To make a request, please
                  contact us at{" "}
                  <a
                    href="mailto:info@korareach.com.au"
                    className="text-brand-green underline"
                  >
                    info@korareach.com.au
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">6. Contact Us</h2>
                <p>
                  If you have questions about this privacy policy or how we
                  handle your information, please contact us at{" "}
                  <a
                    href="mailto:info@korareach.com.au"
                    className="text-brand-green underline"
                  >
                    info@korareach.com.au
                  </a>{" "}
                  or call 1300 XXX XXX.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
