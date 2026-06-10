import { Link } from "next-view-transitions";
import { Compass, CheckCircle2, ArrowRight } from "lucide-react";
import TextToSpeech from "@/components/TextToSpeech";
import ShareButton from "@/components/ShareButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";

export default function SupportCoordination() {
  return (
    <div id="service-reader">
      <section className="bg-brand-lightGreen py-20 gradient-mesh">
        <Breadcrumbs
          items={[
            { label: "Services", href: "/services" },
            { label: "Support Coordination" },
          ]}
        />
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <Compass className="text-brand-green" size={48} strokeWidth={1.5} />
              <h1 className="text-4xl md:text-5xl m-0">Support Coordination</h1>
            </div>
            <div className="flex items-center gap-3">
              <ShareButton />
              <TextToSpeech targetId="service-reader" />
            </div>
          </div>
          <p className="text-xl text-brand-dark/80 max-w-2xl font-sans">
            Make the most of your NDIS plan. We help you understand your funding,
            connect with the right providers, and bring your supports together so
            everything works as it should.
          </p>
        </div>
      </section>

      <WaveDivider from="var(--color-brand-lightGreen)" to="#ffffff" />

      <section className="py-20 bg-white">
        <div className="container-custom grid md:grid-cols-2 gap-16">
          <ScrollReveal direction="left">
            <div>
              <h2 className="text-3xl mb-6">What is Support Coordination?</h2>
              <p className="mb-6 text-brand-dark/80 font-sans leading-relaxed">
                An NDIS plan can be complex. Support Coordination is about
                helping you put it into action — understanding what your funding
                covers, finding services that fit your goals, and making sure all
                the pieces work together. We do the legwork so you can focus on
                living your life.
              </p>
              <div className="bg-brand-warmNeutral p-6 rounded-2xl border border-brand-lightGreen mb-8 card-glow">
                <h3 className="text-xl mb-4">Who is this for?</h3>
                <p className="text-brand-dark/80 font-sans">
                  Ideal for participants who want help navigating the NDIS,
                  coordinating multiple providers, or building the confidence to
                  manage their own supports over time.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={150}>
            <div>
              <h3 className="text-2xl mb-6">Examples of Support</h3>
              <ul className="space-y-4 font-sans">
                {[
                  "Understanding your NDIS plan and budget",
                  "Finding and connecting with the right providers",
                  "Setting up service agreements and bookings",
                  "Coordinating multiple supports so they work together",
                  "Preparing for your plan review or reassessment",
                  "Building your skills to self-manage over time",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2
                      className="text-brand-green shrink-0 mt-1"
                      size={20}
                    />
                    <span className="text-brand-dark/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <WaveDivider from="#ffffff" to="var(--color-brand-warmNeutral)" />

      <section className="py-16 bg-brand-warmNeutral text-center">
        <div className="container-custom">
          <ScrollReveal>
            <h2 className="text-3xl mb-6">Ready to make sense of your plan?</h2>
            <Link
              href="/contact"
              className="btn-primary flex items-center gap-2 mx-auto w-fit"
            >
              Enquire About Support Coordination <ArrowRight size={20} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
