'use client';

import React from 'react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { CheckCircle2, Search, Zap, UserPlus, CreditCard, MessageSquare } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Create your account",
      desc: "Sign up as a standard user or apply to join as a verified founder. Our verification process ensures a high-quality network.",
      icon: UserPlus,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Search the directory",
      desc: "Use advanced filters to find founders by industry, location, category, or role. Our database is updated weekly with fresh talent.",
      icon: Search,
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      title: "Review profiles",
      desc: "Get deep insights into each founder's journey, company, and social presence. Basic details are available to all members.",
      icon: CheckCircle2,
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Choose a plan",
      desc: "Unlock premium contact details including verified emails and phone numbers by choosing a plan that fits your needs.",
      icon: CreditCard,
      color: "bg-amber-50 text-amber-600"
    },
    {
      title: "Make connections",
      desc: "Reach out directly via email or social media. Skip the gatekeepers and start building meaningful business relationships.",
      icon: MessageSquare,
      color: "bg-rose-50 text-rose-600"
    }
  ];

  return (
    <div className="bg-[#f9fbfa] min-h-screen pb-20">
      <section className="pt-20 pb-16 bg-white border-b border-gray-100">
        <PageWrapper className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-syne text-[#04342C] mb-6">How Founivo Works</h1>
          <p className="text-lg text-[#3a6b57] max-w-2xl mx-auto">
            A simple, transparent process to help you connect with the world's most promising startup founders.
          </p>
        </PageWrapper>
      </section>

      <PageWrapper className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8 items-start">
                <div className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-xl ${step.color} border border-current opacity-80`}>
                  <step.icon size={28} />
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step {i + 1}</span>
                    <h2 className="text-2xl font-bold font-syne text-[#04342C]">{step.title}</h2>
                  </div>
                  <p className="text-[#3a6b57] text-lg leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 p-12 bg-[#0F6E56] rounded-2xl text-center text-white">
            <h2 className="text-3xl font-bold font-syne mb-6">Ready to start connecting?</h2>
            <p className="text-emerald-100 mb-10 text-lg max-w-xl mx-auto">
              Join thousands of investors, partners, and recruiters who use Founivo every day to find their next big opportunity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button variant="white" className="w-full sm:w-auto px-10 py-4 text-lg">Get Started Now</Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" className="w-full sm:w-auto px-10 py-4 text-lg border-emerald-400 text-white hover:bg-emerald-700">View Pricing</Button>
              </Link>
            </div>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}