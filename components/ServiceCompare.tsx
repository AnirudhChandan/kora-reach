import { CheckCircle2, Minus } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

type Feature = {
  name: string;
  community: boolean;
  daily: boolean;
  capacity: boolean;
  transport: boolean;
};

const features: Feature[] = [
  { name: "Social outings & events", community: true, daily: false, capacity: false, transport: false },
  { name: "Personal care support", community: false, daily: true, capacity: false, transport: false },
  { name: "Household tasks", community: false, daily: true, capacity: true, transport: false },
  { name: "Meal preparation", community: false, daily: true, capacity: true, transport: false },
  { name: "Skill development", community: false, daily: false, capacity: true, transport: false },
  { name: "Travel to appointments", community: true, daily: false, capacity: false, transport: true },
  { name: "Grocery shopping", community: true, daily: true, capacity: true, transport: true },
  { name: "Public transport training", community: false, daily: false, capacity: true, transport: true },
  { name: "Weekend & evening support", community: true, daily: true, capacity: true, transport: true },
  { name: "1-on-1 dedicated worker", community: true, daily: true, capacity: true, transport: true },
];

const columns = [
  { key: "community" as const, label: "Community", short: "Comm." },
  { key: "daily" as const, label: "Daily Living", short: "Daily" },
  { key: "capacity" as const, label: "Capacity", short: "Cap." },
  { key: "transport" as const, label: "Transport", short: "Trans." },
];

function Cell({ included }: { included: boolean }) {
  return included ? (
    <CheckCircle2 size={18} className="text-brand-green mx-auto" />
  ) : (
    <Minus size={18} className="text-brand-dark/15 mx-auto" />
  );
}

export default function ServiceCompare() {
  return (
    <section className="py-24 bg-brand-warmNeutral">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Compare Our Services</h2>
            <p className="text-lg text-brand-dark/60 font-sans max-w-2xl mx-auto">
              See at a glance which types of support are included in each
              service category.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="overflow-x-auto rounded-2xl border border-brand-lightGreen bg-white shadow-elevated">
            <table className="w-full font-sans text-sm">
              <thead>
                <tr className="border-b border-brand-lightGreen bg-brand-lightGreen/30">
                  <th className="text-left p-4 md:p-5 font-semibold text-brand-dark/70 min-w-[180px]">
                    Support Type
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="p-4 md:p-5 text-center font-semibold text-brand-green"
                    >
                      <span className="hidden md:inline">{col.label}</span>
                      <span className="md:hidden">{col.short}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, i) => (
                  <tr
                    key={feature.name}
                    className={`border-b border-brand-lightGreen/50 ${i % 2 === 0 ? "" : "bg-brand-warmNeutral/30"}`}
                  >
                    <td className="p-4 md:p-5 text-brand-dark/80 font-medium">
                      {feature.name}
                    </td>
                    {columns.map((col) => (
                      <td key={col.key} className="p-4 md:p-5 text-center">
                        <Cell included={feature[col.key]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
