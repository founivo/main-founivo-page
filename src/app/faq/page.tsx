'use client';

import React, { useState } from 'react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: "How does Founivo verify founders?",
      a: "Our team manually reviews every application. We verify identities via LinkedIn, check company registrations, and often conduct brief video calls to ensure only legitimate, active founders are listed."
    },
    {
      q: "Is there a fee to connect with a founder?",
      a: "Yes, connection requests cost $200. This fee ensures that only serious inquiries reach the founders and compensates them for their time and expertise."
    },
    {
      q: "How much do founders earn?",
      a: "Founders earn a 10% commission ($20) for every connection request they fulfill. This is paid out monthly to their linked bank account."
    },
    {
      q: "What if a founder doesn't respond?",
      a: "If a founder doesn't respond to your request within 7 days, you will receive a full refund of your connection fee automatically."
    },
    {
      q: "Can I list my own startup?",
      a: "Absolutely. If you are a founder, click 'Become a Founder' to start your application. Once verified, your profile will be live in our directory."
    },
    {
      q: "How is my data protected?",
      a: "We use enterprise-grade encryption (AES-256) and never share your contact details until a connection request is accepted. Your privacy is our top priority."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#F9FBFA] mesh-gradient">
      <PageWrapper>
        <div className="text-center mb-20 animate-fade-up">
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-5xl md:text-7xl text-[#04342C] mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-xl text-[#3a6b57] max-w-2xl mx-auto">
            Everything you need to know about the Founivo ecosystem.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4 animate-fade-up delay-200">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-3xl border-[#0F6E56]/5 overflow-hidden transition-all">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-[#0F6E56]/5 transition-colors"
              >
                <span className="text-lg font-bold text-[#04342C]">{faq.q}</span>
                {openIndex === i ? <ChevronUp size={20} className="text-[#0F6E56]" /> : <ChevronDown size={20} className="text-[#0F6E56]" />}
              </button>
              
              {openIndex === i && (
                <div className="px-8 pb-8 animate-fade-up">
                  <div className="pt-2 text-[#3a6b57] leading-relaxed font-medium">
                    {faq.a}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-32 glass rounded-[40px] p-12 text-center border-[#0F6E56]/5 animate-fade-up delay-400 max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-[#E1F5EE] rounded-2xl flex items-center justify-center text-[#0F6E56] mx-auto mb-6">
                <MessageSquare size={32} />
            </div>
            <h2 className="text-3xl font-black text-[#04342C] mb-4">Still have questions?</h2>
            <p className="text-[#3a6b57] mb-8">Our support team is always ready to help you with anything you need.</p>
            <button className="px-10 py-4 bg-[#0F6E56] text-white font-bold rounded-2xl shadow-xl shadow-[#0F6E56]/20 btn-shine">
                Contact Support
            </button>
        </div>
      </PageWrapper>
    </div>
  );
}
