"use client";
import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Zap, Search, Globe, ShieldCheck, ArrowRight } from 'lucide-react';
import { PageWrapper } from '../shared/PageWrapper';
import Button from '../ui/Button';

const Hero = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-40 mesh-gradient">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-0 w-72 h-72 bg-[#0F6E56] rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 right-0 w-96 h-96 bg-[#1D9E75] rounded-full blur-[120px]" 
        />
      </div>

      <PageWrapper className="relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-10">
            <div className="glass px-6 py-2.5 rounded-full flex items-center gap-3 text-sm font-bold text-[#0F6E56] border-[#0F6E56]/15 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#1D9E75] animate-pulse" />
              <span>Direct access to 5,000+ verified founders</span>
            </div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="mb-8 max-w-5xl mx-auto">
            <span className="block text-[#04342C] text-6xl md:text-9xl font-black tracking-tight leading-[1] mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              Find your next
            </span>
            <span className="text-gradient text-6xl md:text-9xl font-black tracking-tight leading-[1]" style={{ fontFamily: "'Syne', sans-serif" }}>
              Founder. Fast.
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-[#3a6b57] max-w-3xl mx-auto mb-14 leading-relaxed font-medium">
            Founivo is the world&apos;s most trusted directory for founders. Skip the gatekeepers and connect directly with the visionaries building the future.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/find-founder" className="w-full sm:w-auto">
              <Button className="w-full sm:px-12 py-5 bg-[#0F6E56] text-white text-xl font-bold rounded-2xl shadow-2xl shadow-[#0F6E56]/30 btn-shine transition-all hover:scale-105 hover:-translate-y-1 active:scale-95">
                Start Searching <Search size={22} className="ml-3" />
              </Button>
            </Link>
            <Link href="/become-founder" className="w-full sm:w-auto">
              <Button className="w-full sm:px-12 py-5 glass text-[#0F6E56] text-xl font-bold rounded-2xl border-2 border-[#0F6E56]/20 hover:bg-[#0F6E56]/10 transition-all hover:shadow-lg">
                Join as Founder <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </PageWrapper>

      {/* Bottom Curve/Transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};

export default Hero;