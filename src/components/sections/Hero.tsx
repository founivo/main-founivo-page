"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { PageWrapper } from '../shared/PageWrapper';
import Button from '../ui/Button';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-28 md:pt-32 md:pb-36 bg-[#f5faf8] border-b border-[#0F6E56]/5">
      {/* Premium Gradient Mesh Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#0F6E56] opacity-[0.08] blur-[120px]" />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#1D9E75] opacity-[0.06] blur-[100px]" />
        <div className="absolute bottom-[-15%] left-[20%] w-[400px] h-[400px] rounded-full bg-[#0F6E56] opacity-[0.05] blur-[80px]" />
        <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full bg-[#1D9E75] opacity-[0.04] blur-[60px]" />
      </div>

      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 dot-pattern opacity-[0.04] pointer-events-none" />

      <PageWrapper className="relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#b6ead7] shadow-sm shadow-[#0F6E56]/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1D9E75] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F6E56]" />
              </span>
              <span className="text-[11px] font-bold text-[#0F6E56] uppercase tracking-wider">
                5,000+ Verified Founders
              </span>
              <Sparkles size={12} className="text-[#1D9E75]" />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <h1 className="text-[#04342C] text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-6 font-syne">
              Find the founder
              <br />
              <span className="relative">
                <span className="text-[#0F6E56]">behind the startup</span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-[#E1F5EE] -z-10 rounded-full opacity-60" />
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-[#3a6b57] max-w-2xl mx-auto text-center mb-10 leading-relaxed"
          >
            Skip the gatekeepers. Get direct access to verified founder emails, 
            phone numbers, and social profiles — and connect with the visionaries 
            building the future.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/find-founder" className="w-full sm:w-auto group">
              <Button variant="primary" className="w-full sm:px-10 py-4 text-lg shadow-lg shadow-[#0F6E56]/25 hover:shadow-xl hover:shadow-[#0F6E56]/30 transition-shadow">
                Start Searching <Search size={20} className="group-hover:scale-110 transition-transform" />
              </Button>
            </Link>
            <Link href="/become-founder" className="w-full sm:w-auto group">
              <Button variant="outline" className="w-full sm:px-10 py-4 text-lg bg-white/80 backdrop-blur-sm border-[#b6ead7] hover:border-[#0F6E56] hover:bg-white">
                Join as Founder <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Preview Card / Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-2xl border border-[#b6ead7]/40 shadow-xl shadow-[#0F6E56]/5 p-5 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white bg-[#E1F5EE] flex items-center justify-center text-[10px] font-bold text-[#0F6E56]"
                        style={{ zIndex: 4 - i }}
                      >
                        {["SA", "JO", "PN", "ML"][i]}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-[#04342C]">
                    <span className="text-[#0F6E56]">12,000+</span> successful connections
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-[#1D9E75] text-[#1D9E75]" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "Verified Founders", value: "5,000+" },
                  { label: "Active Investors", value: "850+" },
                  { label: "Capital Raised", value: "$2.4B+" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="text-center py-3 px-4 rounded-xl bg-[#f8faf9] border border-[#E1F5EE]"
                  >
                    <div className="text-lg font-black text-[#0F6E56] font-syne">{stat.value}</div>
                    <div className="text-[11px] font-semibold text-[#3a6b57] uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </PageWrapper>
    </section>
  );
};

export default Hero;
