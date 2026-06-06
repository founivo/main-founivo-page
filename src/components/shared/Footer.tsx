// src/components/shared/Footer.tsx
import Link from "next/link";
import { APP_NAME, APP_LOGO } from "@/data/constants";
import { Twitter, Linkedin, Github, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const LogoIcon = APP_LOGO;

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Find Founder", href: "/find-founder" },
        { name: "Become Founder", href: "/become-founder" },
        { name: "Investors", href: "/investors" },
        { name: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "Success Stories", href: "/success-stories" },
        { name: "About Us", href: "/about" },
        { name: "Features", href: "/features" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "FAQ", href: "/faq" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Github, href: "#" },
  ];

  return (
    <footer className="border-t bg-white pt-20 pb-10 px-4" style={{ borderColor: "rgba(15, 110, 86, 0.08)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group">
              <div
                className="group-hover:rotate-12 transition-transform duration-300"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "#0F6E56",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(15, 110, 86, 0.2)"
                }}
              >
                <LogoIcon size={20} color="#fff" />
              </div>
              <span
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: 24,
                  color: "#04342C",
                  letterSpacing: "-0.8px",
                }}
              >
                {APP_NAME}
              </span>
            </Link>
            <p className="mb-8 max-w-sm leading-relaxed" style={{ color: "#3a6b57", fontSize: 15 }}>
              The verified founder directory trusted by investors, recruiters, and entrepreneurs. Build your dream team today.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-[#0F6E56]/10 hover:bg-[#0F6E56] hover:text-white transition-all group"
                  style={{ color: "#0F6E56" }}
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 
                className="font-bold mb-6" 
                style={{ color: "#04342C", fontFamily: "'Syne', sans-serif", fontSize: 18 }}
              >
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-[#0F6E56]"
                      style={{ color: "#3a6b57", fontSize: 14, textDecoration: "none" }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6" style={{ borderColor: "rgba(15, 110, 86, 0.05)" }}>
          <p style={{ fontSize: 13, color: "#85b5a0" }}>
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2" style={{ color: "#3a6b57", fontSize: 13 }}>
                <Mail size={14} />
                <span>hello@founivo.com</span>
             </div>
             <div className="flex items-center gap-2" style={{ color: "#3a6b57", fontSize: 13 }}>
                <MapPin size={14} />
                <span>San Francisco, CA</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;