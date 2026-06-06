// src/components/shared/Navbar.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { APP_NAME, APP_LOGO } from "@/data/constants";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const LogoIcon = APP_LOGO;

  return (
    <nav
      className="glass sticky top-0 z-50 border-b"
      style={{ borderColor: "rgba(15, 110, 86, 0.08)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="group-hover:scale-110 transition-transform duration-300"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "#0F6E56",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(15, 110, 86, 0.2)"
            }}
          >
            <LogoIcon size={18} color="#fff" />
          </div>
          <span
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: 22,
              color: "#04342C",
              letterSpacing: "-0.8px",
            }}
          >
            {APP_NAME}
          </span>
        </Link>
        <div className="hidden lg:flex items-center gap-6">
          {[
            { name: "Find Founder", href: "/find-founder" },
            { name: "Become Founder", href: "/become-founder" },
            { name: "Reviews", href: "/testimonials" },
            { name: "Stories", href: "/success-stories" },
            { name: "Investors", href: "/investors" },
            { name: "Pricing", href: "/pricing" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-[#0F6E56] transition-colors"
              style={{
                color: "#085041",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/auth/login">
            <button
              className="hover:bg-[#0F6E56]/5 transition-colors"
              style={{
                color: "#0F6E56",
                border: "2px solid rgba(15, 110, 86, 0.1)",
                borderRadius: 14,
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: 600,
                background: "transparent",
                cursor: "pointer",
              }}
            >
              Log in
            </button>
          </Link>
          <Link href="/auth/signup">
            <button
              className="btn-shine"
              style={{
                background: "#0F6E56",
                color: "#fff",
                border: "none",
                borderRadius: 14,
                padding: "12px 22px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(15, 110, 86, 0.2)"
              }}
            >
              Join Founivo
            </button>
          </Link>
        </div>
        <button
          className="lg:hidden p-2 glass rounded-xl"
          onClick={() => setMobileMenu(!mobileMenu)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {mobileMenu ? (
            <X size={24} color="#0F6E56" />
          ) : (
            <Menu size={24} color="#0F6E56" />
          )}
        </button>
      </div>
      {mobileMenu && (
        <div
          className="lg:hidden animate-fade-up glass border-t border-[#0F6E56]/5"
          style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 16 }}
        >
          {[
            { name: "Find Founder", href: "/find-founder" },
            { name: "Become Founder", href: "/become-founder" },
            { name: "Reviews", href: "/testimonials" },
            { name: "Stories", href: "/success-stories" },
            { name: "Investors", href: "/investors" },
            { name: "Pricing", href: "/pricing" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              style={{
                color: "#085041",
                fontSize: 16,
                fontWeight: 600,
                textDecoration: "none",
                padding: "8px 0",
              }}
              onClick={() => setMobileMenu(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-4 border-t border-[#0F6E56]/5">
            <Link href="/auth/signup" className="w-full">
                <button
                className="w-full"
                style={{
                    background: "#0F6E56",
                    color: "#fff",
                    border: "none",
                    borderRadius: 14,
                    padding: "14px",
                    fontSize: 16,
                    fontWeight: 600,
                }}
                onClick={() => setMobileMenu(false)}
                >
                Join Founivo
                </button>
            </Link>
            <Link href="/auth/login" className="w-full">
                <button
                className="w-full"
                style={{
                    color: "#0F6E56",
                    border: "2px solid rgba(15, 110, 86, 0.1)",
                    borderRadius: 14,
                    padding: "14px",
                    fontSize: 16,
                    fontWeight: 600,
                    background: "transparent",
                }}
                onClick={() => setMobileMenu(false)}
                >
                Log in
                </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;