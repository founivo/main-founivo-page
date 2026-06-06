'use client';

import React from 'react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { ShieldCheck, Zap, Mail, Globe, Search, Rocket, Lock, ZapOff } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      title: "Verified Intelligence",
      desc: "Every founder profile is manually verified by our team. No bots, no fake profiles, just real visionaries.",
      icon: <ShieldCheck size={32} />,
      color: "bg-blue-500"
    },
    {
      title: "Direct Connect",
      desc: "Skip the gatekeepers. Get direct access to professional emails and LinkedIn profiles.",
      icon: <Mail size={32} />,
      color: "bg-[#0F6E56]"
    },
    {
      title: "Global Network",
      desc: "Access founders from 40+ countries across AI, SaaS, Fintech, and Healthtech.",
      icon: <Globe size={32} />,
      color: "bg-purple-500"
    },
    {
      title: "Real-time Search",
      desc: "Our high-speed search allows you to filter by category, location, and funding stage.",
      icon: <Search size={32} />,
      color: "bg-orange-500"
    },
    {
      title: "Expert Monetization",
      desc: "Founders can monetize their network and earn for fulfilling connection requests.",
      icon: <Zap size={32} />,
      color: "bg-yellow-500"
    },
    {
      title: "Private & Secure",
      desc: "Your data is protected. We use enterprise-grade encryption for all communications.",
      icon: <Lock size={32} />,
      color: "bg-red-500"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F9FBFA] mesh-gradient">
      <PageWrapper>
        <div className="text-center mb-20 animate-fade-up">
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-5xl md:text-7xl text-[#04342C] mb-6">
            Powerful <span className="text-gradient">Features</span>
          </h1>
          <p className="text-xl text-[#3a6b57] max-w-2xl mx-auto">
            Everything you need to discover, connect, and grow with the world&apos;s most innovative founders.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 animate-fade-up delay-200">
          {features.map((f, i) => (
            <div key={i} className="glass p-10 rounded-[32px] border-[#0F6E56]/5 card-hover relative overflow-hidden group">
              <div className={`w-16 h-16 ${f.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-black/5`}>
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#04342C] mb-4">{f.title}</h3>
              <p className="text-[#3a6b57] leading-relaxed font-medium">
                {f.desc}
              </p>
              
              {/* Subtle background glow */}
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${f.color} opacity-[0.03] rounded-full blur-3xl group-hover:opacity-[0.08] transition-opacity`} />
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="mt-32 glass rounded-[40px] p-12 md:p-20 border-[#0F6E56]/5 animate-fade-up delay-400">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-[#04342C] mb-4">The Founivo Advantage</h2>
                <p className="text-[#3a6b57]">How we compare to traditional networking methods.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h4 className="text-xl font-bold text-[#0F6E56] flex items-center gap-2">
                        <Rocket className="text-[#0F6E56]" /> With Founivo
                    </h4>
                    <ul className="space-y-4">
                        {[
                            "Verified data with 99.9% accuracy",
                            "Direct access to founder contact info",
                            "Response rate of over 65%",
                            "Curated, high-quality network"
                        ].map((t, i) => (
                            <li key={i} className="flex items-center gap-3 text-[#3a6b57] font-medium">
                                <ShieldCheck size={20} className="text-[#0F6E56]" /> {t}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="space-y-6">
                    <h4 className="text-xl font-bold text-gray-400 flex items-center gap-2">
                        <ZapOff className="text-gray-400" /> Traditional Methods
                    </h4>
                    <ul className="space-y-4">
                        {[
                            "Outdated LinkedIn data and fake profiles",
                            "Gatekeepers and generic info@ emails",
                            "Response rate below 2%",
                            "Cluttered, unverified marketplace"
                        ].map((t, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-400 font-medium">
                                <Lock size={20} className="text-gray-300" /> {t}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </PageWrapper>
    </div>
  );
}
