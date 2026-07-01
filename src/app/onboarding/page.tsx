'use client';

import React, { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PageWrapper } from '@/components/shared/PageWrapper';
import FindFounderForm from '@/components/onboarding/FindFounderForm';
import BecomeFounderForm from '@/components/onboarding/BecomeFounderForm';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import { createClient } from '@/utils/supabase/client';
import { getUserDashboardUrl, getFounderDashboardUrl } from '@/lib/config';
import { APP_LOGO } from '@/data/constants';

function OnboardingContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const { user, profile, loading } = useUser();
  const LogoIcon = APP_LOGO;

  useEffect(() => {
    const handleOnboardedRedirect = async () => {
      if (!loading && user && profile?.onboarding_completed) {
        try {
          const supabase = createClient();
          const { data: { session } } = await supabase.auth.getSession();
          if (role === 'founder' && profile.role === 'founder') {
            const baseUrl = getFounderDashboardUrl();
            if (session) {
              window.location.href = `${baseUrl}?access_token=${session.access_token}&refresh_token=${session.refresh_token}`;
              return;
            }
            window.location.href = baseUrl;
          } else if (role === 'user' && profile.role === 'user') {
            const baseUrl = getUserDashboardUrl();
            if (session) {
              window.location.href = `${baseUrl}?access_token=${session.access_token}&refresh_token=${session.refresh_token}`;
              return;
            }
            window.location.href = baseUrl;
          }
        } catch (error) {
          console.error('Error fetching session for redirect:', error);
          if (role === 'founder' && profile.role === 'founder') {
            window.location.href = getFounderDashboardUrl();
          } else if (role === 'user' && profile.role === 'user') {
            window.location.href = getUserDashboardUrl();
          }
        }
      }
    };
    handleOnboardedRedirect();
  }, [loading, user, profile, role]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-[#0F6E56]" />
      </div>
    );
  }

  if (user && profile?.onboarding_completed && role === profile.role) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-[#0F6E56]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F9FBFA]">
      {/* Simplified Header */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 md:px-12 z-50">
        <Link href="/choose-role" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#0F6E56] flex items-center justify-center shadow-sm">
            <LogoIcon size={18} color="#fff" />
          </div>
          <span className="font-syne font-extrabold text-xl text-[#04342C] tracking-tight">
            Founivo
          </span>
        </Link>
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center gap-2 text-sm font-semibold text-[#0F6E56] hover:bg-[#E1F5EE] px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </header>

      <PageWrapper className="max-w-2xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-4xl text-[#04342C] mb-4">
            {role === 'founder' ? 'Founder Onboarding' : 'Welcome to Founivo'}
          </h1>
          <p className="text-[#3a6b57]">
            {role === 'founder' 
              ? 'Complete your profile to join our elite directory.' 
              : 'Tell us what you\'re looking for so we can curate your experience.'}
          </p>
        </div>
        
        {role === 'founder' ? <BecomeFounderForm /> : <FindFounderForm />}
      </PageWrapper>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-[#0F6E56]" />
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}
