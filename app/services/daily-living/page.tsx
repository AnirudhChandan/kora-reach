import { Link } from "next-view-transitions";
import { Home, CheckCircle2, ArrowRight } from "lucide-react";
import TextToSpeech from "@/components/TextToSpeech";
import ShareButton from "@/components/ShareButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import ScrollReveal from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";

export default function DailyLiving() {
  return (
    <div id="service-reader">
      <section className="bg-brand-lightGreen py-20 gradient-mesh">
        <Breadcrumbs
          items={[
            { label: "Services", href: "/services" },
            { label: "Daily Living Support" },
          ]}
        />
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <Home className="text-brand-green" size={48} strokeWidth={1.5} />
              <h1 className="text-4xl md:text-5xl m-0">Daily Living Support</h1>
            </div>
            <div className="flex items-center gap-3">
              <ShareButton />
              <TextToSpeech targetId="service-reader" />
            </div>
          </div>
          <p className="text-xl text-brand-dark/80 max-w-2xl font-sans">
            Reliable, respectful assistance with personal care and household
            tasks so you can live comfortably and safely in your own home.
          </p>
        </div>
      </section>

      <WaveDivider from="var(--color-brand-lightGreen)" to="#ffffff" />

      <section className="py-20 bg-white">
        <div className="container-custom grid md:grid-cols-2 gap-16">
          <ScrollReveal direction="left">
            <div>
              <h2 className="text-3xl mb-6">What is Daily Living Support?</h2>
              <p className="mb-6 text-brand-dark/80 font-sans leading-relaxed">
                We know that your home is your sanctuary. Our daily living support
                is designed to assist you with your routine while respecting your
                privacy and personal space. We work with you to handle the
                day-to-day tasks, allowing you to focus on your larger goals.
              </p>
              <div className="bg-brand-warmNeutral p-6 rounded-2xl border border-brand-lightGreen mb-8 card-glow">
                <h3 className="text-xl mb-4">Who is this for?</h3>
                <p className="text-brand-dark/80 font-sans">
                  Designed for participants who need physical assistance or
                  prompting to manage their morning routines, hygiene, meals, or
                  household upkeep.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={150}>
            <div>
              <h3 className="text-2xl mb-6">Examples of Support</h3>
              <ul className="space-y-4 font-sans">
                {[
                  "Personal care (showering, dressing, and grooming)",
                  "Meal planning, preparation, and cooking",
                  "Light domestic chores (laundry, dishwashing, tidying)",
                  "Assistance with morning and evening routines",
                  "Support with managing medications",
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
            <h2 className="text-3xl mb-6">Need help at home?</h2>
            <Link
              href="/contact"
              className="btn-primary flex items-center gap-2 mx-auto w-fit"
            >
              Enquire About This Service <ArrowRight size={20} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
