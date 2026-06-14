'use client';

import React from 'react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { BookOpen, FileText, Video, ExternalLink, Lightbulb } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ResourcesPage() {
  const categories = [
    {
      title: "Guides & Playbooks",
      icon: BookOpen,
      items: [
        "How to prepare for a seed round in 2026",
        "The ultimate guide to founder-led sales",
        "Structuring co-founder agreements",
        "Building a remote-first engineering team"
      ]
    },
    {
      title: "Templates & Tools",
      icon: FileText,
      items: [
        "Investor CRM Template (Notion)",
        "Standard Pitch Deck Structure (PDF)",
        "Financial Projection Model (Excel)",
        "Founder Outreach Email Templates"
      ]
    },
    {
      title: "Video Series",
      icon: Video,
      items: [
        "Founders Weekly: Episodic deep dives",
        "Masterclass: Scaling from 0 to 1",
        "Product Hunt launch strategy",
        "Navigating the Series A landscape"
      ]
    }
  ];

  return (
    <div className="bg-[#f9fbfa] min-h-screen pb-20">
      <section className="pt-20 pb-16 bg-white border-b border-gray-100">
        <PageWrapper className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-syne text-[#04342C] mb-6">Resource Center</h1>
          <p className="text-lg text-[#3a6b57] max-w-2xl mx-auto">
            Everything you need to accelerate your startup journey, from templates to deep-dive guides.
          </p>
        </PageWrapper>
      </section>

      <PageWrapper className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-[#E1F5EE] flex items-center justify-center text-[#0F6E56] mb-6">
                <cat.icon size={24} />
              </div>
              <h2 className="text-2xl font-bold font-syne text-[#04342C] mb-6">{cat.title}</h2>
              <ul className="space-y-4">
                {cat.items.map((item, j) => (
                  <li key={j}>
                    <Link href="#" className="flex items-start gap-3 group">
                      <div className="mt-1 flex-shrink-0 text-gray-300 group-hover:text-[#0F6E56]">
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      </div>
                      <span className="text-[#3a6b57] text-sm group-hover:text-[#0F6E56] transition-colors leading-snug">
                        {item}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Button variant="ghost" className="mt-10 w-full justify-between group">
                Explore All <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white border border-[#0F6E56]/10 rounded-2xl p-10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-[#0F6E56] flex-shrink-0">
            <Lightbulb size={40} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold font-syne text-[#04342C] mb-2">Can&apos;t find what you&apos;re looking for?</h2>
            <p className="text-[#3a6b57]">Our team is constantly building new tools and guides. Suggest a resource you&apos;d like to see.</p>
          </div>
          <Button variant="outline" className="whitespace-nowrap">Suggest a Resource</Button>
        </div>
      </PageWrapper>
    </div>
  );
}