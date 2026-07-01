"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME, APP_LOGO } from "@/data/constants";
import { Twitter as TwitterIcon, Linkedin as LinkedinIcon, Github as GithubIcon, Mail as MailIcon, MapPin as MapPinIcon } from "lucide-react";

const Footer = () => {
  const pathname = usePathname();
  const LogoIcon = APP_LOGO;

  if (pathname === "/onboarding") return null;

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Find Founder", href: "/find-founder" },
        { name: "Become Founder", href: "/become-founder" },
        { name: "How it Works", href: "/how-it-works" },
        { name: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Resource Center", href: "/resources" },
        { name: "Founivo Blog", href: "/blog" },
        { name: "Success Stories", href: "/success-stories" },
        { name: "Investors", href: "/investors" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  const socialLinks = [
    { icon: TwitterIcon, href: "#" },
    { icon: LinkedinIcon, href: "#" },
    { icon: GithubIcon, href: "#" },
  ];

  return (
    <footer className="border-t border-gray-100 bg-white pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group">
              <div className="w-10 h-10 rounded-lg bg-[#0F6E56] flex items-center justify-center shadow-sm">
                <LogoIcon size={20} color="#fff" />
              </div>
              <span className="font-syne font-extrabold text-2xl text-[#04342C] tracking-tight">
                {APP_NAME}
              </span>
            </Link>
            <p className="mb-8 max-w-sm leading-relaxed text-[#3a6b57] text-[15px]">
              The professional founder directory trusted by thousands of visionaries, investors, and startup leaders worldwide.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-100 text-[#0F6E56] hover:bg-[#0F6E56] hover:text-white transition-all"
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-syne font-bold text-[#04342C] text-lg mb-6 uppercase tracking-wider text-[14px]">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[#3a6b57] text-sm hover:text-[#0F6E56] transition-colors"
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
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[13px] text-gray-400">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2 text-[#3a6b57] text-[13px]">
                <MailIcon size={14} />
                <span>hello@founivo.com</span>
             </div>
             <div className="flex items-center gap-2 text-[#3a6b57] text-[13px]">
                <MapPinIcon size={14} />
                <span>San Francisco, CA</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;