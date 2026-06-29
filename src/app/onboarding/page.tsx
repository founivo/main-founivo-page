'use client';

import React, { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageWrapper } from '@/components/shared/PageWrapper';
import FindFounderForm from '@/components/onboarding/FindFounderForm';
import BecomeFounderForm from '@/components/onboarding/BecomeFounderForm';
import { Loader2 } from 'lucide-react';
import { useUser } from '@/hooks/useUser';

function OnboardingContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const { user, profile, loading } = useUser();

  useEffect(() => {
    if (!loading && user && profile?.onboarding_completed) {
      if (role === 'founder' && profile.role === 'founder') {
        window.location.href = process.env.NEXT_PUBLIC_FOUNDER_DASHBOARD_URL || 'http://localhost:3001';
      } else if (role === 'user' && profile.role === 'user') {
        window.location.href = process.env.NEXT_PUBLIC_USER_DASHBOARD_URL || 'http://localhost:3002';
      }
    }
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
    <div className="min-h-screen pt-24 pb-20 bg-[#F9FBFA]">
      <PageWrapper className="max-w-2xl mx-auto">
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
