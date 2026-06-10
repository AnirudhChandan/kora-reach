import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-8">
      <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <Image
            src="/logo-full.png"
            alt="Kora Reach Support Services"
            width={160}
            height={53}
            className="h-12 w-auto mb-4 brightness-0 invert"
          />
          <p className="text-white/50 leading-relaxed font-sans text-sm">
            Dedicated NDIS disability support provider based in Victoria.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-sans font-semibold tracking-[0.15em] uppercase text-white/40 mb-6">
            Services
          </h4>
          <ul className="space-y-3 font-sans text-sm">
            {[
              { name: "Community Participation", href: "/services/community-participation" },
              { name: "Daily Living Support", href: "/services/daily-living" },
              { name: "Capacity Building", href: "/services/capacity-building" },
              { name: "Transport Support", href: "/services/transport-support" },
              { name: "Support Coordination", href: "/services/support-coordination" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-sans font-semibold tracking-[0.15em] uppercase text-white/40 mb-6">
            Resources
          </h4>
          <ul className="space-y-3 font-sans text-sm">
            {[
              { name: "About Us", href: "/about" },
              { name: "NDIS Information", href: "/ndis-info" },
              { name: "Privacy Policy", href: "/privacy" },
              { name: "Feedback & Complaints", href: "/feedback" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-sans font-semibold tracking-[0.15em] uppercase text-white/40 mb-6">
            Contact
          </h4>
          <ul className="space-y-4 font-sans text-sm">
            <li>
              <a
                href="tel:0439821300"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
              >
                <Phone size={16} className="shrink-0" />
                0439 821 300
              </a>
            </li>
            <li>
              <a
                href="mailto:info@korareach.com.au"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
              >
                <Mail size={16} className="shrink-0" />
                info@korareach.com.au
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/60">
              <MapPin size={16} className="shrink-0 mt-0.5" />
              Victoria, Australia
            </li>
          </ul>
        </div>
      </div>

      <div className="container-custom border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/30 text-sm font-sans">
          &copy; {new Date().getFullYear()} Kora Reach Support Services. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
