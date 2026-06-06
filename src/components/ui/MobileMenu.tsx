import Link from "next/link";

import type { ReactNode } from "react";

type MobileMenuProps = {
  open: boolean;
  links: { label: string; href: string }[];
  actions?: ReactNode;
  onNavigate: () => void;
};

export function MobileMenu({ open, links, actions, onNavigate }: MobileMenuProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="border-t border-[#d0ede4] bg-white px-4 py-4 md:hidden">
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <Link key={link.href} className="py-1 text-sm font-medium text-[var(--brand-700)]" href={link.href} onClick={onNavigate}>
            {link.label}
          </Link>
        ))}
        {actions ? <div className="pt-2">{actions}</div> : null}
      </div>
    </div>
  );
}