'use client';

import React, { useState } from 'react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import Button from '@/components/ui/Button';
import { ArrowRight, DollarSign, Award, Rocket, Globe, ShieldCheck } from 'lucide-react';
import BecomeFounderForm from '@/components/onboarding/BecomeFounderForm';
import { useUser } from '@/hooks/useUser';
import { createClient } from '@/utils/supabase/client';
import { getFounderDashboardUrl } from '@/lib/config';

export default function BecomeFounderLanding() {
  const [showForm, setShowForm] = useState(false);
  const { user, profile, loading } = useUser();

  const handleCtaClick = async () => {
    if (loading) return;
    if (!user) {
      window.location.href = '/sign-in';
      return;
    }
    if (profile?.founder_onboarding_completed) {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        const baseUrl = getFounderDashboardUrl();
        if (session) {
          window.location.href = `${baseUrl}?access_token=${session.access_token}&refresh_token=${session.refresh_token}`;
          return;
        }
      } catch (error) {
        console.error('Error fetching session for redirect:', error);
      }
      window.location.href = getFounderDashboardUrl();
    } else {
      setShowForm(true);
    }
  };

  if (showForm) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-[#F9FBFA]">
        <PageWrapper className="max-w-2xl mx-auto">
          <div className="mb-12 text-center">
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-4xl text-[#04342C] mb-4">
              Join as a Founder
            </h1>
            <p className="text-[#3a6b57]">Get featured on Founivo, connect with peers, and earn while sharing your expertise.</p>
          </div>
          <BecomeFounderForm />
        </PageWrapper>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#F9FBFA]">
      <PageWrapper>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-sm font-semibold mb-6">
              <Award size={14} /> Join the top 1% of Global Founders
            </div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-5xl md:text-6xl text-[#04342C] mb-6 leading-tight">
              Share your Journey. <br /><span className="text-[#0F6E56]">Earn Rewards.</span>
            </h1>
            <p className="text-xl text-[#3a6b57] mb-10 max-w-2xl mx-auto">
              Founivo is more than a directory. It&apos;s a platform where your expertise is valued. Connect with serious investors and earn for every meaningful connection.
            </p>
            <Button onClick={handleCtaClick} disabled={loading} className="px-10 py-4 bg-[#0F6E56] text-white text-lg rounded-xl shadow-lg shadow-[#0F6E56]/20 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Loading...' : 'Apply to Join'} {!loading && <ArrowRight className="ml-2" />}
            </Button>
          </div>

          {/* Advantages Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20 animate-fade-up delay-100">
            {[
              {
                icon: <DollarSign className="text-[#0F6E56]" size={24} />,
                title: "Monetize Connections",
                desc: "Earn a 10% commission ($20) for every $200 connection request you fulfill."
              },
              {
                icon: <Globe className="text-[#0F6E56]" size={24} />,
                title: "Global Visibility",
                desc: "Get featured in front of thousands of investors and top-tier recruiters."
              },
              {
                icon: <Rocket className="text-[#0F6E56]" size={24} />,
                title: "Network with Peers",
                desc: "Join an exclusive community of 500+ verified founders from 40+ countries."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#E1F5EE] rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#04342C] mb-3">{item.title}</h3>
                <p className="text-[#3a6b57] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="bg-[#0F6E56] rounded-3xl p-10 md:p-16 text-white relative overflow-hidden animate-fade-up delay-200">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-3xl md:text-4xl mb-6">
                  The perks of being a <br />Founivo Founder
                </h2>
                <ul className="space-y-4">
                  {[
                    "Verified 'Founding Member' badge",
                    "Dedicated profile with deep analytics",
                    "Direct filtering of low-quality requests",
                    "Priority support and community access"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <ShieldCheck size={20} className="text-[#9FE1CB]" />
                      <span className="text-[#9FE1CB]/90">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 text-center bg-[#04342C] p-8 rounded-2xl border border-[#1D9E75]/30">
                <div className="text-lg text-[#9FE1CB] mb-2 font-semibold">FOUNDER COMMISSION</div>
                <div className="text-5xl font-bold mb-6 text-white">$20<span className="text-xl text-[#9FE1CB] font-normal">/conn</span></div>
                <Button onClick={handleCtaClick} disabled={loading} className="w-full bg-white text-[#0F6E56] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'Loading...' : 'Join the elite directory'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}
