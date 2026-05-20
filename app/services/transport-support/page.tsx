import { Link } from "next-view-transitions";
import { Car, CheckCircle2, ArrowRight } from "lucide-react";
import TextToSpeech from "@/components/TextToSpeech";
import ShareButton from "@/components/ShareButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";

export default function TransportSupport() {
  return (
    <div id="service-reader">
      <section className="bg-brand-lightGreen py-20 gradient-mesh">
        <Breadcrumbs
          items={[
            { label: "Services", href: "/services" },
            { label: "Transport Support" },
          ]}
        />
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <Car className="text-brand-green" size={48} strokeWidth={1.5} />
              <h1 className="text-4xl md:text-5xl m-0">Transport Support</h1>
            </div>
            <div className="flex items-center gap-3">
              <ShareButton />
              <TextToSpeech targetId="service-reader" />
            </div>
          </div>
          <p className="text-xl text-brand-dark/80 max-w-2xl font-sans">
            Safe, reliable transportation to get you where you need to go across
            Melbourne, ensuring you never miss an appointment or event.
          </p>
        </div>
      </section>

      <WaveDivider from="var(--color-brand-lightGreen)" to="#ffffff" />

      <section className="py-20 bg-white">
        <div className="container-custom grid md:grid-cols-2 gap-16">
          <ScrollReveal direction="left">
            <div>
              <h2 className="text-3xl mb-6">What is Transport Support?</h2>
              <p className="mb-6 text-brand-dark/80 font-sans leading-relaxed">
                Mobility should not be a barrier to living your life. Our
                transport support provides you with a dedicated support worker and
                vehicle to help you travel safely to medical appointments,
                community activities, or your place of work and study.
              </p>
              <div className="bg-brand-warmNeutral p-6 rounded-2xl border border-brand-lightGreen mb-8 card-glow">
                <h3 className="text-xl mb-4">Who is this for?</h3>
                <p className="text-brand-dark/80 font-sans">
                  For participants who cannot use public transport without
                  substantial difficulty due to their disability and need
                  point-to-point travel assistance.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={150}>
            <div>
              <h3 className="text-2xl mb-6">Examples of Support</h3>
              <ul className="space-y-4 font-sans">
                {[
                  "Travel to and from doctor or therapy appointments",
                  "Transport for grocery shopping and essential errands",
                  "Getting to work, school, or university",
                  "Rides to social events, clubs, or family gatherings",
                  "Support while using accessible public transport",
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
            <h2 className="text-3xl mb-6">Need a ride?</h2>
            <Link
              href="/contact"
              className="btn-primary flex items-center gap-2 mx-auto w-fit"
            >
              Enquire About Transport <ArrowRight size={20} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
