'use client';

import React from 'react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import Link from 'next/link';

const posts = [
  {
    title: "How to reach out to founders without sounding like a recruiter",
    excerpt: "Learn the art of the 'soft intro' and why personalized messages outperform templates by 400%.",
    date: "June 12, 2026",
    author: "Sarah Chen",
    readTime: "6 min read",
    category: "Networking",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "The rise of the 'Solo-Founder' in 2026",
    excerpt: "How AI tools are enabling a new generation of founders to build $1M+ ARR businesses alone.",
    date: "June 08, 2026",
    author: "Marc Andreessen",
    readTime: "8 min read",
    category: "Trends",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Why we verify every profile on Founivo manually",
    excerpt: "A deep dive into our verification process and why data quality is the most important metric in networking.",
    date: "June 03, 2026",
    author: "Bilal Raza",
    readTime: "4 min read",
    category: "Platform",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Top 10 Fintech founders to watch this quarter",
    excerpt: "We've analyzed our directory to find the most active and disruptive founders in the financial technology space.",
    date: "May 28, 2026",
    author: "Jessica Alba",
    readTime: "5 min read",
    category: "Featured",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "How to pitch your partnership idea effectively",
    excerpt: "Founders are busy. Here is the exact structure for a partnership pitch that gets a response in 24 hours.",
    date: "May 22, 2026",
    author: "Naval Ravikant",
    readTime: "10 min read",
    category: "Guide",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "The future of remote startup culture",
    excerpt: "Why the next generation of decacorns will be built by founders who have never met their co-founders in person.",
    date: "May 15, 2026",
    author: "Vitalik Buterin",
    readTime: "12 min read",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
  }
];

export default function BlogPage() {
  return (
    <div className="bg-[#f9fbfa] min-h-screen pb-20">
      <section className="pt-20 pb-16 bg-white border-b border-gray-100">
        <PageWrapper className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-syne text-[#04342C] mb-6">Founivo Blog</h1>
          <p className="text-lg text-[#3a6b57] max-w-2xl mx-auto">
            Insights, guides, and trends from the heart of the startup ecosystem.
          </p>
        </PageWrapper>
      </section>

      <PageWrapper className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, i) => (
            <article key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-[#0F6E56]/30 transition-all flex flex-col group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#0F6E56] text-xs font-bold rounded-full shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {post.readTime}
                  </div>
                </div>
                
                <h2 className="text-xl font-bold font-syne text-[#04342C] mb-4 group-hover:text-[#0F6E56] transition-colors leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-[#3a6b57] text-sm leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-[#0F6E56]">
                      {post.author.charAt(0)}
                    </div>
                    <span className="text-xs font-medium text-[#04342C]">{post.author}</span>
                  </div>
                  <Link href={`/blog/${i}`} className="text-[#0F6E56] text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    Read Article <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </PageWrapper>
    </div>
  );
}