'use client';

import React from 'react';
import Link from 'next/link';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { Search, UserPlus, ArrowRight, Loader2 } from 'lucide-react';
import { useUser } from '@/hooks/useUser';

export default function ChooseRolePage() {
  const { user, profile, loading } = useUser();

  React.useEffect(() => {
    if (!loading && user && profile?.onboarding_completed) {
      if (profile.role === 'founder') {
        window.location.href = process.env.NEXT_PUBLIC_FOUNDER_DASHBOARD_URL || 'http://localhost:3001';
      } else {
        window.location.href = process.env.NEXT_PUBLIC_USER_DASHBOARD_URL || 'http://localhost:3002';
      }
    }
  }, [loading, user, profile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9FBFA]">
        <Loader2 className="w-10 h-10 animate-spin text-[#0F6E56]" />
      </div>
    );
  }

  const roles = [
    {
      title: "Find a Founder",
      description: "Search our elite directory of verified founders, connect with potential partners, or find investment opportunities.",
      icon: <Search className="w-12 h-12 text-[#0F6E56]" />,
      href: "/onboarding?role=user",
      buttonText: "Get Started",
      color: "bg-[#E1F5EE]"
    },
    {
      title: "Make Profile",
      description: "Join our exclusive network of founders. Share your story, attract investors, and connect with fellow entrepreneurs.",
      icon: <UserPlus className="w-12 h-12 text-[#0F6E56]" />,
      href: "/onboarding?role=founder",
      buttonText: "Create Profile",
      color: "bg-[#F0FDF4]"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#F9FBFA]">
      <PageWrapper className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-4xl md:text-5xl text-[#04342C] mb-6">
            How would you like to use <span className="text-[#0F6E56]">Founivo?</span>
          </h1>
          <p className="text-xl text-[#3a6b57] max-w-2xl mx-auto">
            Choose the path that best suits your goals today. You can always change this later in your profile.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {roles.map((role, i) => (
            <Link 
              key={i} 
              href={role.href}
              className="group bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#0F6E56]/30 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className={`w-24 h-24 ${role.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                {role.icon}
              </div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-2xl text-[#04342C] mb-4">
                {role.title}
              </h2>
              <p className="text-[#3a6b57] mb-8 leading-relaxed">
                {role.description}
              </p>
              <div className="mt-auto inline-flex items-center gap-2 font-bold text-[#0F6E56] group-hover:gap-3 transition-all">
                {role.buttonText} <ArrowRight size={20} />
              </div>
            </Link>
          ))}
        </div>
      </PageWrapper>
    </div>
  );
}
