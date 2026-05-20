import { Link } from "next-view-transitions";
import TextToSpeech from "@/components/TextToSpeech";
import ScrollReveal from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";
import Accordion from "@/components/Accordion";

const faqItems = [
  {
    question: "Can I change my NDIS provider at any time?",
    answer:
      "Yes. You have the right to change providers whenever you choose. There are no lock-in contracts with Kora Reach. If you decide to move on, we will help make the transition as smooth as possible.",
  },
  {
    question: "What happens if my NDIS plan is under review?",
    answer:
      "You can still receive support while your plan is being reviewed. Your current plan remains active until a new one is approved. We can help you navigate the review process and prepare for your planning meeting.",
  },
  {
    question: "Do I need a referral to use Kora Reach?",
    answer:
      "No referral is needed. You can contact us directly, or your support coordinator, family member, or plan manager can reach out on your behalf. We just need your NDIS plan details to get started.",
  },
  {
    question: "What areas of Melbourne do you cover?",
    answer:
      "We currently provide services across the Melbourne metropolitan area, including inner city, eastern, northern, and western suburbs. Contact us to confirm coverage in your specific area.",
  },
  {
    question: "Can I meet my support worker before starting?",
    answer:
      "Absolutely. We always arrange a free, no-obligation meet and greet before any services begin. We want you to feel comfortable and confident with the person supporting you.",
  },
  {
    question: "What if I am not happy with my support worker?",
    answer:
      "Your comfort is our priority. If for any reason your support worker is not the right fit, let us know and we will arrange an alternative. There is no penalty or awkwardness — this is your support and your choice.",
  },
  {
    question: "How quickly can services start after I enquire?",
    answer:
      "In most cases, we can begin services within 1-2 weeks of your initial enquiry. We will contact you within 24 hours of receiving your form, and from there we arrange the meet and greet and service agreement as quickly as possible.",
  },
  {
    question: "Do you provide support on weekends and evenings?",
    answer:
      "Yes. We understand that support needs do not follow a 9-to-5 schedule. We offer flexible scheduling including evenings, weekends, and public holidays depending on your plan and needs.",
  },
];

export default function NdisInfo() {
  return (
    <div id="ndis-content-reader">
      <section className="bg-brand-lightGreen py-20 gradient-mesh">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
            <h1 className="text-4xl md:text-5xl m-0">Understanding the NDIS</h1>
            <TextToSpeech targetId="ndis-content-reader" />
          </div>
          <p className="text-xl text-brand-dark/80 max-w-2xl font-sans">
            We break down the National Disability Insurance Scheme into plain
            English, so you know exactly how your funding works.
          </p>

          <nav className="mt-8 flex flex-wrap gap-3 font-sans text-sm">
            {["What is the NDIS?", "How Funding Works", "Common Questions"].map(
              (label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase().replace(/\s+/g, "-").replace("?", "")}`}
                  className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-brand-green/10 text-brand-dark/70 hover:bg-white hover:text-brand-green transition-all"
                >
                  {label}
                </a>
              ),
            )}
          </nav>
        </div>
      </section>

      <WaveDivider from="var(--color-brand-lightGreen)" to="#ffffff" />

      <section className="py-20 bg-white" id="what-is-the-ndis">
        <div className="container-custom max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl mb-6">What is the NDIS?</h2>
            <p className="mb-12 text-brand-dark/80 font-sans leading-relaxed text-lg">
              The NDIS provides funding directly to individuals with a disability.
              This funding gives you choice and control over the support you
              receive. Instead of a one-size-fits-all system, your NDIS plan is
              tailored to your goals.
            </p>
          </ScrollReveal>

          <h2 className="text-3xl mb-8" id="how-funding-works">
            How Funding Works
          </h2>
          <div className="grid gap-8 mb-16">
            {[
              {
                title: "1. Self-Managed",
                desc: "You receive the funding directly. You are responsible for finding providers and paying invoices. This gives you the most flexibility.",
              },
              {
                title: "2. Plan-Managed",
                desc: "You use a Plan Manager to handle the financial side. You choose your providers, but your Plan Manager pays the bills.",
              },
              {
                title: "3. NDIA-Managed",
                desc: "The NDIA holds your funds and pays providers directly. You can only use officially registered NDIS providers.",
              },
            ].map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 100}>
                <div className="bg-brand-warmNeutral p-8 rounded-2xl border border-brand-lightGreen card-glow">
                  <h3 className="text-2xl mb-3 text-brand-green">
                    {item.title}
                  </h3>
                  <p className="text-brand-dark/80 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider from="#ffffff" to="var(--color-brand-warmNeutral)" />

      <section
        className="py-20 bg-brand-warmNeutral"
        id="common-questions"
      >
        <div className="container-custom max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl mb-4">Common Questions</h2>
            <p className="text-brand-dark/60 font-sans mb-10 text-lg">
              Answers to the things participants and families ask us most often.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <Accordion items={faqItems} />
          </ScrollReveal>
        </div>
      </section>

      <WaveDivider
        from="var(--color-brand-warmNeutral)"
        to="var(--color-brand-green)"
      />

      <section className="py-16 bg-brand-green text-white text-center">
        <div className="container-custom">
          <ScrollReveal>
            <h2 className="text-3xl text-white mb-6">Have more questions?</h2>
            <Link
              href="/contact"
              className="bg-white text-brand-green px-8 py-4 rounded-full font-bold hover:bg-brand-warmNeutral transition-all inline-block shadow-lg hover:-translate-y-1"
            >
              Contact Our Intake Team
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
