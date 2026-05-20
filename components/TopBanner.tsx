import { Phone } from "lucide-react";

export default function TopBanner() {
  return (
    <div className="bg-brand-dark text-white text-sm py-2 px-4">
      <div className="container-custom flex justify-center md:justify-between items-center">
        <div className="hidden md:flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-lightGreen"></span>
          </span>
          <span className="text-white/80 font-medium tracking-wide text-xs uppercase">
            Taking New Referrals for 2026
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="tel:1300000000"
            className="flex items-center gap-2 hover:text-brand-lightGreen transition-colors hitbox-expand"
          >
            <Phone size={14} />{" "}
            <span className="font-semibold">1300 XXX XXX</span>
          </a>
        </div>
      </div>
    </div>
  );
}
