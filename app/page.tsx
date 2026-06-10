import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TrustStrip from "@/components/TrustStrip";
import MagneticButton from "@/components/MagneticButton";
import TextReveal from "@/components/TextReveal";
import Testimonials from "@/components/Testimonials";
import ScrollReveal from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";
import EligibilityCheck from "@/components/EligibilityCheck";
import StatsCounter from "@/components/StatsCounter";
import JourneyTimeline from "@/components/JourneyTimeline";
import ParticleNetwork from "@/components/ParticleNetwork";
import ServiceQuiz from "@/components/ServiceQuiz";
import DayInTheLife from "@/components/DayInTheLife";

export default function Home() {
  return (
    <>
      <section className="pt-20 pb-24 md:pt-32 md:pb-40 relative gradient-mesh">
        <div className="container-custom grid md:grid-cols-12 gap-8 md:gap-0 items-center relative z-10">
          <div className="md:col-span-5 z-20 md:-mr-12 order-2 md:order-1">
            <ScrollReveal direction="left" delay={200}>
              <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-elevated-lg border border-white/80">
                <TextReveal
                  text="Compassionate Support for Your Journey."
                  as="h1"
                  className="mb-6"
                  delay={300}
                  firstWordClassName="text-[0.8em]"
                />
                <p className="text-xl text-brand-dark/80 mb-8 font-sans leading-relaxed">
                  Empowering NDIS participants across Victoria to live
                  independently and participate fully in their community.
                </p>
                <MagneticButton>
                  <Link
                    href="/contact"
                    className="btn-primary flex items-center w-fit gap-2 group"
                  >
                    Enquire Today{" "}
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform duration-500 ease-[var(--ease-spring)]"
                    />
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>

          <div className="md:col-span-7 z-10 order-1 md:order-2">
            <ScrollReveal direction="right" delay={400}>
              <div className="bg-brand-lightGreen h-[400px] md:h-[650px] mask-organic-1 overflow-hidden relative">
                <ParticleNetwork />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 via-transparent to-brand-accent/10 pointer-events-none z-10" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <TrustStrip />

      <StatsCounter />

      <section className="py-24 relative bg-white">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="mb-6">Your Journey With Us</h2>
              <p className="text-xl text-brand-dark/70 font-sans leading-relaxed">
                We remove the friction from NDIS support. Here is exactly what
                happens when you reach out to our team.
              </p>
            </div>
          </ScrollReveal>

          <JourneyTimeline />
        </div>
      </section>

      <DayInTheLife />

      <WaveDivider from="#ffffff" to="var(--color-brand-warmNeutral)" />

      <ScrollReveal>
        <EligibilityCheck />
      </ScrollReveal>

      <ServiceQuiz />

      <Testimonials />

      <WaveDivider
        from="var(--color-brand-warmNeutral)"
        to="var(--color-brand-green)"
      />

      <section className="py-32 bg-brand-green text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <ScrollReveal>
          <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
            <div className="max-w-xl">
              <h2 className="text-white mb-4">Ready to get started?</h2>
              <p className="text-white/80 font-sans text-xl leading-relaxed">
                We are currently accepting new participants across Victoria.
              </p>
            </div>
            <MagneticButton>
              <Link
                href="/contact"
                className="bg-white text-brand-green px-10 py-5 rounded-full font-sans font-bold hover:bg-brand-warmNeutral hover:-translate-y-1 shadow-[0_15px_30px_rgb(0,0,0,0.15)] transition-all duration-500 ease-[var(--ease-spring)] shrink-0"
              >
                Contact Kora Reach
              </Link>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
