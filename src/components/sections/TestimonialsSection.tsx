"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Managing Partner",
    company: "Nexus Ventures",
    content: "Founivo has completely transformed our deal flow process. We&apos;ve connected with three incredible AI founders in the last month alone.",
    rating: 5,
    initials: "AR",
  },
  {
    name: "Sarah Jenkins",
    role: "CEO & Founder",
    company: "CloudScale",
    content: "As a founder, I was skeptical about joining another directory. But Founivo is different. The connection requests are high-quality and targeted.",
    rating: 5,
    initials: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Head of Talent",
    company: "Global Tech Group",
    content: "The best tool for finding high-caliber technical founders. We use it daily for our executive search. Highly recommended.",
    rating: 5,
    initials: "MC",
  },
  {
    name: "Elena Rodriguez",
    role: "Angel Investor",
    company: "Solo Capital",
    content: "Knowing that every founder is manually verified saves me hours of due diligence. A must-have for any active angel investor.",
    rating: 5,
    initials: "ER",
  },
  {
    name: "David Smith",
    role: "Co-founder",
    company: "Finly",
    content: "The monetization feature filters out noise and ensures the people reaching out are serious. Quality over quantity, every time.",
    rating: 5,
    initials: "DS",
  },
  {
    name: "Priya Sharma",
    role: "Recruitment Lead",
    company: "Innovate HR",
    content: "Founivo&apos;s global reach is incredible. We found founders from emerging markets we would never have discovered through LinkedIn.",
    rating: 5,
    initials: "PS",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full bg-[#E1F5EE] opacity-40 blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] rounded-full bg-[#E1F5EE] opacity-30 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#0F6E56] font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-syne text-[#04342C]"
          >
            Trusted by the best
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#3a6b57] mt-4 max-w-xl mx-auto"
          >
            Don&apos;t just take our word for it. Here&apos;s what our community says.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative bg-[#f8faf9] rounded-[2rem] p-8 border border-[#0F6E56]/5 hover:border-[#0F6E56]/15 hover:bg-white hover:shadow-xl hover:shadow-[#0F6E56]/5 transition-all duration-500"
            >
              {/* Quote Icon */}
              <Quote size={28} className="text-[#0F6E56]/10 absolute top-8 right-8" />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#1D9E75] text-[#1D9E75]" />
                ))}
              </div>

              {/* Content */}
              <p className="text-[15px] text-[#3a6b57] mb-8 leading-relaxed italic">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E1F5EE] flex items-center justify-center font-bold text-sm text-[#0F6E56] font-syne">
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-bold text-[#04342C] text-sm">{t.name}</h4>
                  <p className="text-[11px] text-[#0F6E56] font-bold uppercase tracking-wider">
                    {t.role} @ {t.company}
                  </p>
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-[#0F6E56] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#E1F5EE] border border-[#b6ead7]">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-[#1D9E75] text-[#1D9E75]" />
              ))}
            </div>
            <span className="text-sm font-bold text-[#0F6E56]">
              Rated 5/5 by our community
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
