import Link from "next/link";
import { Home, Phone, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="py-32 md:py-48 gradient-mesh">
      <div className="container-custom max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-brand-lightGreen flex items-center justify-center mx-auto mb-8">
          <span className="font-serif font-bold text-brand-green text-3xl">
            ?
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl mb-6">
          This page seems to have moved.
        </h1>
        <p className="text-xl text-brand-dark/70 font-sans leading-relaxed mb-12">
          No worries — let&apos;s get you back on track. You can head home or get in
          touch with us directly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-primary flex items-center gap-2 group"
          >
            <Home size={18} />
            Back to Home
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <a
            href="tel:1300000000"
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-brand-lightGreen font-sans font-medium text-brand-dark hover:bg-brand-lightGreen transition-all"
          >
            <Phone size={18} />
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}
