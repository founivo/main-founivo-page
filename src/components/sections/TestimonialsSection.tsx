"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Button from '../ui/Button';

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Managing Partner",
    company: "Nexus Ventures",
    content: "Founivo has completely transformed our deal flow process. We&apos;ve connected with three incredible AI founders in the last month alone.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  },
  {
    name: "Sarah Jenkins",
    role: "CEO & Founder",
    company: "CloudScale",
    content: "As a founder, I was skeptical about joining another directory. But Founivo is different. The connection requests are high-quality.",
    rating: 5,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    name: "Michael Chen",
    role: "Head of Talent",
    company: "Global Tech Group",
    content: "The best tool for finding high-caliber technical founders. We use it daily for our executive search. Highly recommended.",
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

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-[#f8faf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Syne',sans-serif", color: "#04342C" }}
          >
            Trusted by the Best
          </motion.h2>
          <p className="text-lg" style={{ color: "#3a6b57" }}>
            Don&apos;t just take our word for it. Here&apos;s what our community says.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[32px] border border-[#0F6E56]/5 relative hover:shadow-xl transition-all"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <Quote size={32} className="text-[#0F6E56]/5 absolute top-8 right-8" />
              <p className="text-base text-[#3a6b57] mb-8 leading-relaxed italic font-medium">
                &quot;{t.content}&quot;
              </p>
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full bg-[#E1F5EE]" />
                <div>
                  <h4 className="font-bold text-[#04342C] text-sm">{t.name}</h4>
                  <p className="text-[10px] text-[#0F6E56] font-bold uppercase tracking-wider">{t.role} @ {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
            <Link href="/testimonials">
                <Button className="px-10 py-4 bg-[#0F6E56] text-white rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#0F6E56]/20">
                    More Reviews <ArrowRight size={18} className="ml-2" />
                </Button>
            </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;