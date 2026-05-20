import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Feedback & Complaints | Kora Reach",
  description:
    "How to provide feedback or make a complaint about Kora Reach services.",
};

export default function FeedbackPage() {
  return (
    <>
      <section className="bg-brand-lightGreen py-20">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl mb-4">Feedback &amp; Complaints</h1>
          <p className="text-xl text-brand-dark/80 max-w-2xl font-sans">
            Your feedback helps us improve. We take all concerns seriously and
            are committed to resolving issues fairly and promptly.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom max-w-3xl">
          <ScrollReveal>
            <div className="space-y-12 font-sans text-brand-dark/80 leading-relaxed text-lg">
              <div>
                <h2 className="text-2xl mb-4">We Welcome Your Feedback</h2>
                <p>
                  At Kora Reach, we believe that feedback — both positive and
                  constructive — is essential to providing high-quality support.
                  Whether you are a participant, family member, or support
                  coordinator, we want to hear from you.
                </p>
              </div>

              <div>
                <h2 className="text-2xl mb-4">How to Provide Feedback</h2>
                <div className="grid gap-4 mt-6">
                  <a
                    href="tel:1300000000"
                    className="flex items-center gap-4 p-6 rounded-2xl border border-brand-lightGreen hover:bg-brand-lightGreen/30 transition-colors card-glow"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-lightGreen flex items-center justify-center shrink-0">
                      <Phone size={20} className="text-brand-green" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-dark">
                        Call Us
                      </p>
                      <p className="text-brand-dark/50 text-sm">
                        1300 XXX XXX — Mon to Fri, 9am - 5pm
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:feedback@korareach.com.au"
                    className="flex items-center gap-4 p-6 rounded-2xl border border-brand-lightGreen hover:bg-brand-lightGreen/30 transition-colors card-glow"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-lightGreen flex items-center justify-center shrink-0">
                      <Mail size={20} className="text-brand-green" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-dark">
                        Email Us
                      </p>
                      <p className="text-brand-dark/50 text-sm">
                        feedback@korareach.com.au
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div>
                <h2 className="text-2xl mb-4">Our Complaints Process</h2>
                <ol className="list-decimal pl-6 space-y-3 mt-3">
                  <li>
                    <strong>Lodge your complaint</strong> — Contact us by phone
                    or email. You can also ask a friend, family member, or
                    advocate to lodge it on your behalf.
                  </li>
                  <li>
                    <strong>Acknowledgement</strong> — We will acknowledge your
                    complaint within 2 business days and assign a staff member
                    to review it.
                  </li>
                  <li>
                    <strong>Investigation</strong> — We will investigate the
                    issue and may contact you for further details.
                  </li>
                  <li>
                    <strong>Resolution</strong> — We aim to resolve all
                    complaints within 21 business days. We will inform you of
                    the outcome and any changes we are making.
                  </li>
                </ol>
              </div>

              <div className="bg-brand-warmNeutral p-8 rounded-2xl border border-brand-lightGreen">
                <h2 className="text-2xl mb-4">
                  Not Satisfied With Our Response?
                </h2>
                <p className="mb-4">
                  If you are not satisfied with how we have handled your
                  complaint, you can contact the NDIS Quality and Safeguards
                  Commission:
                </p>
                <ul className="space-y-2">
                  <li>
                    <strong>Phone:</strong> 1800 035 544 (free call)
                  </li>
                  <li>
                    <strong>Website:</strong>{" "}
                    <span className="text-brand-green">
                      ndiscommission.gov.au
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
