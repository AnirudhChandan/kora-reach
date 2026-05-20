import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";

export default function AboutPage() {
  return (
    <>
      <section className="py-24 md:py-32 gradient-mesh">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h1 className="mb-8">About Kora Reach</h1>
              <p className="text-2xl text-brand-dark/80 font-sans leading-relaxed">
                We are a dedicated NDIS provider in Melbourne, built on the belief
                that disability support should be personal, reliable, and entirely
                focused on your goals.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-24 relative">
        <div className="container-custom grid md:grid-cols-12 gap-8 items-center">
          <ScrollReveal direction="left" className="md:col-span-7">
            <div className="h-[500px] md:h-[700px] bg-brand-lightGreen mask-organic-2 flex items-center justify-center relative overflow-hidden z-10">
              <div className="absolute inset-0 bg-brand-accent/5 mix-blend-multiply z-10 pointer-events-none"></div>
              <span className="italic text-brand-green/40 font-serif z-20">
                [Space for team/approach image]
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={200} className="md:col-span-5 z-20 md:-ml-20">
            <div className="bg-white/90 backdrop-blur-xl p-10 md:p-14 rounded-[2.5rem] shadow-elevated-lg border border-brand-lightGreen">
              <h2 className="mb-6">Our Mission & Approach</h2>
              <p className="mb-6 text-brand-dark/80 font-sans text-lg leading-relaxed">
                Navigating the NDIS can be overwhelming. Our mission at Kora
                Reach is to simplify the process and provide support that
                actually makes a difference in your day-to-day life.
              </p>
              <p className="mb-8 text-brand-dark/80 font-sans text-lg leading-relaxed">
                We don't believe in a one-size-fits-all approach. Whether you
                need help getting out into the community, building new skills,
                or managing daily tasks at home, we match you with support
                workers who respect your space, your culture, and your choices.
              </p>

              <div className="bg-brand-warmNeutral p-6 md:p-8 border-l-4 border-brand-accent rounded-r-2xl">
                <h3 className="text-xl mb-2 text-brand-dark">
                  Who We Work With
                </h3>
                <p className="text-brand-dark/70 font-sans">
                  We support NDIS participants across the Melbourne metropolitan
                  area who are self-managed or plan-managed.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <WaveDivider from="var(--color-brand-warmNeutral)" to="#ffffff" />

      <section className="py-24 bg-white">
        <div className="container-custom">
          <ScrollReveal>
            <h2 className="mb-16 text-center">Our Core Values</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Respect",
                desc: "We honor your choices, your background, and your right to control your own life.",
              },
              {
                title: "Reliability",
                desc: "When we say we will be there, we will be there. Consistent support you can count on.",
              },
              {
                title: "Growth",
                desc: "We focus on capacity building, helping you develop the skills to live as independently as possible.",
              },
            ].map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 120}>
                <div className="bg-white p-10 rounded-[2rem] gradient-border card-hover card-glow h-full">
                  <CheckCircle2
                    className="text-brand-green mb-6"
                    size={36}
                    strokeWidth={1.5}
                  />
                  <h3 className="mb-4">{value.title}</h3>
                  <p className="text-brand-dark/70 font-sans text-lg leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from="#ffffff" to="var(--color-brand-warmNeutral)" />

      <section className="py-32 text-center bg-brand-warmNeutral">
        <div className="container-custom">
          <ScrollReveal>
            <h2 className="mb-6">Looking for support in Melbourne?</h2>
            <p className="text-xl text-brand-dark/70 mb-10 max-w-2xl mx-auto font-sans leading-relaxed">
              Reach out to our intake team today to discuss your NDIS plan and how
              we can assist you.
            </p>
            <Link href="/contact" className="btn-primary">
              Make an Enquiry
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
