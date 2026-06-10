import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";
import ServiceCompare from "@/components/ServiceCompare";
import AnimatedServiceIcon from "@/components/AnimatedServiceIcon";
import TiltCard from "@/components/TiltCard";

type ServiceIconType =
  | "community"
  | "daily"
  | "capacity"
  | "transport"
  | "coordination";

const services: { id: string; title: string; iconType: ServiceIconType; desc: string; href: string }[] = [
  {
    id: "community-participation",
    title: "Community Participation",
    iconType: "community",
    desc: "Support to engage in social, recreational, and civic activities in your local community across Victoria.",
    href: "/services/community-participation",
  },
  {
    id: "daily-living",
    title: "Daily Living Support",
    iconType: "daily",
    desc: "Assistance with personal care, household tasks, and routine building in the comfort of your own home.",
    href: "/services/daily-living",
  },
  {
    id: "capacity-building",
    title: "Capacity Building",
    iconType: "capacity",
    desc: "Skill development tailored to your goals, helping you achieve greater independence over time.",
    href: "/services/capacity-building",
  },
  {
    id: "transport-support",
    title: "Transport Support",
    iconType: "transport",
    desc: "Safe and reliable transport to appointments, work, study, or community events.",
    href: "/services/transport-support",
  },
  {
    id: "support-coordination",
    title: "Support Coordination",
    iconType: "coordination",
    desc: "Help understanding your NDIS plan, connecting with the right providers, and coordinating your supports with confidence.",
    href: "/services/support-coordination",
  },
];

export default function ServicesOverview() {
  return (
    <>
      <section className="bg-brand-lightGreen py-24 gradient-mesh">
        <div className="container-custom">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl mb-6">Our Services</h1>
            <p className="text-xl text-brand-dark/80 max-w-2xl font-sans leading-relaxed">
              We provide tailored, flexible NDIS support across Victoria. Explore
              our core services below to see how we can assist you in reaching
              your goals.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <WaveDivider from="var(--color-brand-lightGreen)" to="#ffffff" />

      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 100}>
                <TiltCard className="rounded-3xl relative overflow-hidden h-full">
                  <Link
                    href={service.href}
                    className="group p-10 rounded-3xl bg-brand-warmNeutral border border-brand-lightGreen/50 flex flex-col h-full card-glow relative"
                  >
                    <div className="mb-6 text-brand-green">
                      <AnimatedServiceIcon type={service.iconType} size={64} />
                    </div>
                    <h2 className="text-3xl mb-4 group-hover:text-brand-green transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-brand-dark/70 font-sans text-lg leading-relaxed mb-8 flex-grow pr-8">
                      {service.desc}
                    </p>
                    <div className="font-sans font-medium text-brand-green flex items-center gap-2">
                      Learn more
                      <ArrowRight
                        size={18}
                        className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      />
                    </div>
                  </Link>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from="#ffffff" to="var(--color-brand-warmNeutral)" />

      <ServiceCompare />

      <section className="py-24 bg-brand-warmNeutral text-center">
        <div className="container-custom">
          <ScrollReveal>
            <h2 className="text-4xl mb-6">Not sure which support you need?</h2>
            <p className="text-lg text-brand-dark/70 font-sans mb-10 max-w-2xl mx-auto leading-relaxed">
              Your NDIS plan can be complex. Let our team review your funding and
              help match you with the right services.
            </p>
            <Link
              href="/contact"
              className="btn-primary shadow-lg hover:-translate-y-1 transition-all"
            >
              Discuss Your Plan
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
