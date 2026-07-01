'use client';

import React from 'react';
import Link from 'next/link';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { Search, UserPlus, ArrowRight, Loader2 } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import { createClient } from '@/utils/supabase/client';
import { getUserDashboardUrl, getFounderDashboardUrl } from '@/lib/config';

export default function ChooseRolePage() {
  const { user, profile, loading } = useUser();

  const userDashboardUrl = getUserDashboardUrl();
  const founderDashboardUrl = getFounderDashboardUrl();

  const isUserOnboarded = !loading && user && profile?.onboarding_completed && profile.role === 'user';
  const isFounderOnboarded = !loading && user && profile?.onboarding_completed && profile.role === 'founder';

  const handleRoleClick = async (e: React.MouseEvent<HTMLAnchorElement>, href: string, isOnboarded: boolean) => {
    if (isOnboarded) {
      e.preventDefault();
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          window.location.href = `${href}?access_token=${session.access_token}&refresh_token=${session.refresh_token}`;
          return;
        }
      } catch (error) {
        console.error('Error fetching session for redirect:', error);
      }
      window.location.href = href;
    }
  };

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
      href: isUserOnboarded ? userDashboardUrl : "/onboarding?role=user",
      isOnboarded: isUserOnboarded,
      buttonText: isUserOnboarded ? "Go to Dashboard" : "Get Started",
      color: "bg-[#E1F5EE]"
    },
    {
      title: "Make Profile",
      description: "Join our exclusive network of founders. Share your story, attract investors, and connect with fellow entrepreneurs.",
      icon: <UserPlus className="w-12 h-12 text-[#0F6E56]" />,
      href: isFounderOnboarded ? founderDashboardUrl : "/onboarding?role=founder",
      isOnboarded: isFounderOnboarded,
      buttonText: isFounderOnboarded ? "Go to Dashboard" : "Create Profile",
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
              onClick={(e) => handleRoleClick(e, role.href, !!role.isOnboarded)}
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
