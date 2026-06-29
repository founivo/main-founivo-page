"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp, Users, MapPin, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PageWrapper } from '../shared/PageWrapper';
import Button from '../ui/Button';

const features = [
  { icon: Shield, title: "Verified profiles", desc: "Every founder is manually verified. No fake profiles, no dead emails. Quality you can trust." },
  { icon: Zap, title: "Instant access", desc: "Search, filter, and get contact details in seconds. Skip the wait and connect immediately." },
  { icon: TrendingUp, title: "Always fresh", desc: "New founders added every week. Your directory stays current with the latest innovators." },
  { icon: Users, title: "12 categories", desc: "AI, Tech, Health, Finance, ClimateTech and more. Find exactly the expertise you need." },
  { icon: MapPin, title: "Global reach", desc: "Founders from 40+ countries worldwide. Go local or cast a wide net." },
  { icon: Star, title: "Real data", desc: "Emails, phone numbers and socials sourced and verified by our dedicated team." },
];

const Features = () => {
  return (
    <section className="py-28 bg-[#f8faf9] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#0F6E56] opacity-[0.03] blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#1D9E75] opacity-[0.03] blur-[100px]" />
      </div>

      <PageWrapper>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#0F6E56] font-bold tracking-widest uppercase text-sm mb-4 block"
            >
              Why Founivo
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold font-syne text-[#04342C]"
            >
              Everything you need to <br />
              <span className="text-[#0F6E56]">find the right founder</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg max-w-md text-[#3a6b57]"
          >
            Built for professionals who need to move fast and make high-impact connections.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white rounded-2xl border border-[#0F6E56]/8 p-8 hover:border-[#0F6E56]/20 hover:shadow-xl hover:shadow-[#0F6E56]/5 transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[#E1F5EE] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <feature.icon size={24} className="text-[#0F6E56]" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 font-syne text-[#04342C] group-hover:text-[#0F6E56] transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#3a6b57]">
                {feature.desc}
              </p>

              {/* Hover Accent Line */}
              <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-[#0F6E56] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link href="/features">
            <Button variant="outline" className="px-8 py-3 bg-white border-[#b6ead7] hover:border-[#0F6E56]">
              Explore all features <ArrowRight size={16} />
            </Button>
          </Link>
        </motion.div>
      </PageWrapper>
    </section>
  );
};

export default Features;
