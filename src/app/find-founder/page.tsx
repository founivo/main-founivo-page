// src/app/find-founder/page.tsx
'use client';

import React, { useState } from 'react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import Button from '@/components/ui/Button';
import { ArrowRight, Zap, Users, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';
import FindFounderForm from '@/components/onboarding/FindFounderForm';




export default function FindFounderLanding() {
  const [showForm, setShowForm] = useState(false);

  if (showForm) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-[#F9FBFA]">
        <PageWrapper className="max-w-2xl mx-auto">
          <div className="mb-12 text-center">
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-4xl text-[#04342C] mb-4">
              Find the perfect founder
            </h1>
            <p className="text-[#3a6b57]">Tell us what you&apos;re looking for so we can help you find the right connection.</p>
          </div>
          <FindFounderForm />
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
              <Zap size={14} /> Direct access to world-class founders
            </div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-5xl md:text-6xl text-[#04342C] mb-6 leading-tight">
              Connecting you with the <br /><span className="text-[#0F6E56]">Visionaries</span>
            </h1>
            <p className="text-xl text-[#3a6b57] mb-10 max-w-2xl mx-auto">
              Stop cold emailing and start connecting. Founivo provides verified contact details of 500+ successful founders across every industry.
            </p>
            <Button onClick={() => setShowForm(true)} className="px-10 py-4 bg-[#0F6E56] text-white text-lg rounded-xl shadow-lg shadow-[#0F6E56]/20">
              Start Finding Founders <ArrowRight className="ml-2" />
            </Button>
          </div>

          {/* Advantages Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20 animate-fade-up delay-100">
            {[
              {
                icon: <ShieldCheck className="text-[#0F6E56]" size={24} />,
                title: "100% Verified",
                desc: "Every founder in our directory is manually verified for authenticity."
              },
              {
                icon: <Mail className="text-[#0F6E56]" size={24} />,
                title: "Direct Access",
                desc: "Get direct emails, LinkedIn profiles, and even phone numbers."
              },
              {
                icon: <Users className="text-[#0F6E56]" size={24} />,
                title: "Smart Matching",
                desc: "Filter by industry, location, and role to find your ideal match."
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

          {/* Why Choose Section */}
          <div className="bg-[#04342C] rounded-3xl p-10 md:p-16 text-white relative overflow-hidden animate-fade-up delay-200">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-3xl md:text-4xl mb-6">
                  Why industry leaders trust Founivo
                </h2>
                <ul className="space-y-4">
                  {[
                    "Save 20+ hours of research per week",
                    "Skip the gatekeepers and reach decision-makers",
                    "Highest data accuracy in the market",
                    "Updated daily with new verified founders"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={20} className="text-[#9FE1CB]" />
                      <span className="text-[#9FE1CB]/90">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 text-center bg-[#0F6E56] p-8 rounded-2xl border border-[#1D9E75]/30">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-[#9FE1CB] mb-6">Verified Founders</div>
                <Button onClick={() => setShowForm(true)} className="w-full bg-white text-[#0F6E56] hover:bg-gray-100">
                  Get Started Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}
