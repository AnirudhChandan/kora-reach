import Image from "next/image";

const trustBadges = [
  {
    name: "NDIS Quality & Safeguards Commission",
    src: "/badges/ndis-quality.svg",
  },
  { name: "Fully Insured", src: "/badges/insured.svg" },
  { name: "Worker Screening Checked", src: "/badges/worker-screened.svg" },
];

export default function TrustStrip() {
  return (
    <section className="py-10 border-b border-brand-lightGreen/60">
      <div className="container-custom">
        <p className="text-center text-xs font-sans font-semibold tracking-[0.2em] uppercase text-brand-dark/40 mb-8">
          Trusted &amp; Verified
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {trustBadges.map((badge) => (
            <div
              key={badge.name}
              className="flex items-center gap-3 opacity-50 hover:opacity-80 transition-opacity duration-500"
            >
              <Image
                src={badge.src}
                alt={badge.name}
                width={36}
                height={36}
                className="grayscale"
              />
              <span className="text-sm font-sans font-medium text-brand-dark/60 hidden sm:inline">
                {badge.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
