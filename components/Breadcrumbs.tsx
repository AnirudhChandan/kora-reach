import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  items: Crumb[];
};

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="container-custom pt-6 pb-2 font-sans text-sm"
    >
      <ol className="flex items-center gap-1.5 flex-wrap text-brand-dark/50">
        <li>
          <Link
            href="/"
            className="hover:text-brand-green transition-colors"
          >
            Home
          </Link>
        </li>
        {items.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight size={14} className="text-brand-dark/30" />
            {crumb.href && i < items.length - 1 ? (
              <Link
                href={crumb.href}
                className="hover:text-brand-green transition-colors"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-brand-dark/80 font-medium">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
