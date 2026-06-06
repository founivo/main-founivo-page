'use client';

import React from 'react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Managing Partner",
      company: "Nexus Ventures",
      content: "Founivo has completely transformed our deal flow process. We&apos;ve connected with three incredible AI founders in the last month alone. The data accuracy is unmatched.",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    },
    {
      name: "Sarah Jenkins",
      role: "CEO & Founder",
      company: "CloudScale",
      content: "As a founder, I was skeptical about joining another directory. But Founivo is different. The connection requests are high-quality, and I&apos;ve actually earned while networking.",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
      name: "Michael Chen",
      role: "Head of Talent",
      company: "Global Tech Group",
      content: "The best tool for finding high-caliber technical founders. We use it daily for our executive search. Highly recommended for any serious recruiter.",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    },
    {
        name: "Elena Rodriguez",
        role: "Angel Investor",
        company: "Solo",
        content: "I love the manual verification. Knowing that every founder I see is legitimate saves me hours of due diligence. A must-have for any active angel.",
        rating: 5,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
    },
    {
        name: "David Smith",
        role: "Co-founder",
        company: "Finly",
        content: "The monetization feature is a game-changer. It filters out the noise and ensures that the people reaching out are serious about connecting.",
        rating: 5,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
    },
    {
        name: "Priya Sharma",
        role: "Recruitment Lead",
        company: "Innovate HR",
        content: "Founivo&apos;s global reach is incredible. We found founders from emerging markets that we would have never discovered through LinkedIn.",
        rating: 5,
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F9FBFA] mesh-gradient">
      <PageWrapper>
        <div className="text-center mb-20 animate-fade-up">
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-5xl md:text-7xl text-[#04342C] mb-6">
            Trusted by the <br /><span className="text-gradient">Best in Tech</span>
          </h1>
          <p className="text-xl text-[#3a6b57] max-w-2xl mx-auto">
            See why thousands of investors, recruiters, and founders choose Founivo to build their professional network.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 animate-fade-up delay-200">
          {testimonials.map((t, i) => (
            <div key={i} className="glass p-8 rounded-[32px] border-[#0F6E56]/5 card-hover relative">
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Quote size={40} className="text-[#0F6E56]/10 absolute top-8 right-8" />
              <p className="text-lg text-[#3a6b57] mb-8 leading-relaxed italic font-medium">
                &quot;{t.content}&quot;
              </p>
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full bg-[#E1F5EE] border-2 border-white shadow-sm" />
                <div>
                  <h4 className="font-bold text-[#04342C]">{t.name}</h4>
                  <p className="text-xs text-[#0F6E56] font-semibold uppercase tracking-wider">{t.role} @ {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Stats */}
        <div className="mt-32 grid md:grid-cols-4 gap-8 animate-fade-up delay-400">
            {[
                { value: "98%", label: "Satisfaction Rate" },
                { value: "50k+", label: "Connections Made" },
                { value: "120+", label: "Top Tier VCs" },
                { value: "24/7", label: "Verification" }
            ].map((s, i) => (
                <div key={i} className="text-center glass p-8 rounded-3xl border-[#0F6E56]/5">
                    <div className="text-4xl font-black text-[#0F6E56] mb-2">{s.value}</div>
                    <div className="text-sm font-bold text-[#3a6b57] uppercase tracking-widest">{s.label}</div>
                </div>
            ))}
        </div>
      </PageWrapper>
    </div>
  );
}
