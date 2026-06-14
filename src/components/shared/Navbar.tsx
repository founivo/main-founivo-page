"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, LogOut, User, ChevronDown, UserPlus, Search } from "lucide-react";
import { APP_NAME, APP_LOGO } from "@/data/constants";
import { useUser } from "@/hooks/useUser";
import { signout } from "@/app/auth/actions";
import Button from "../ui/Button";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { user, profile, loading } = useUser();
  const LogoIcon = APP_LOGO;

  const navLinks = [
    { name: "Find Founder", href: "/find-founder" },
    { name: "Become Founder", href: "/become-founder" },
    { name: "How it Works", href: "/how-it-works" },
    { name: "Directory", href: "/#directory" },
    { name: "Pricing", href: "/pricing" },
  ];

  const getInitials = (name: string | null) => {
    if (!name) return <User size={20} />;
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#0F6E56] flex items-center justify-center shadow-sm">
            <LogoIcon size={18} color="#fff" />
          </div>
          <span className="font-syne font-extrabold text-xl text-[#04342C] tracking-tight">
            {APP_NAME}
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold text-[#3a6b57] hover:text-[#0F6E56] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Action Area (Auth / Profile) */}
        <div className="flex items-center gap-2 sm:gap-4">
          {!loading && (
            <>
              {user ? (
                <div 
                  className="relative"
                  onMouseEnter={() => setShowProfileDropdown(true)}
                  onMouseLeave={() => setShowProfileDropdown(false)}
                >
                  <button className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-colors border border-gray-100">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0F6E56] flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                      {profile?.full_name ? getInitials(profile.full_name) : <User size={18} />}
                    </div>
                    <ChevronDown size={14} className={`hidden sm:block text-gray-400 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown (Desktop) */}
                  {showProfileDropdown && (
                    <div className="hidden lg:block absolute right-0 mt-0 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-fade-in">
                      <div className="px-4 py-2 border-b border-gray-50 mb-1">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Account</p>
                        <p className="text-sm font-bold text-[#04342C] truncate">{profile?.full_name || user.email}</p>
                      </div>
                      
                      <Link 
                        href="/onboarding?role=user" 
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#3a6b57] hover:bg-gray-50 hover:text-[#0F6E56] transition-colors"
                      >
                        <Search size={16} />
                        Find Founder
                      </Link>
                      
                      <Link 
                        href="/onboarding?role=founder" 
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#3a6b57] hover:bg-gray-50 hover:text-[#0F6E56] transition-colors"
                      >
                        <UserPlus size={16} />
                        Make Profile
                      </Link>

                      <div className="h-px bg-gray-50 my-1"></div>
                      
                      <button
                        onClick={() => signout()}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-4">
                  <Link href="/sign-in">
                    <Button variant="ghost">Log in</Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button variant="primary">Join Founivo</Button>
                  </Link>
                </div>
              )}
            </>
          )}

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-[#0F6E56] hover:bg-gray-50 rounded-lg transition-colors"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden bg-white border-t border-gray-50 p-6 flex flex-col gap-6 animate-fade-up">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base font-bold text-[#085041]"
              onClick={() => setMobileMenu(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-6 border-t border-gray-50">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-1 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#0F6E56] flex items-center justify-center text-white font-bold">
                    {profile?.full_name ? getInitials(profile.full_name) : <User size={24} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#04342C]">{profile?.full_name || user.email}</p>
                    <p className="text-xs text-[#3a6b57] capitalize">{profile?.role || 'User'}</p>
                  </div>
                </div>
                <Link href="/onboarding?role=user" className="w-full">
                  <Button variant="outline" className="w-full py-3 text-base justify-start gap-3" onClick={() => setMobileMenu(false)}>
                    <Search size={18} />
                    Find Founder
                  </Button>
                </Link>
                <Link href="/onboarding?role=founder" className="w-full">
                  <Button variant="outline" className="w-full py-3 text-base justify-start gap-3" onClick={() => setMobileMenu(false)}>
                    <UserPlus size={18} />
                    Make Profile
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full py-3 text-base text-red-500 justify-start gap-3" onClick={() => { signout(); setMobileMenu(false); }}>
                  <LogOut size={18} />
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link href="/sign-up" className="w-full">
                  <Button variant="primary" className="w-full py-4 text-base" onClick={() => setMobileMenu(false)}>
                    Join Founivo
                  </Button>
                </Link>
                <Link href="/sign-in" className="w-full">
                  <Button variant="outline" className="w-full py-4 text-base" onClick={() => setMobileMenu(false)}>
                    Log in
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;