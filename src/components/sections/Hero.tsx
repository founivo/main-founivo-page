"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { PageWrapper } from '../shared/PageWrapper';
import Button from '../ui/Button';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 md:pt-40 md:pb-48 bg-[#f9fbfa] border-b border-gray-100">
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

      {/* Subtle Dot Pattern */}
      <div className="absolute inset-0 dot-pattern pointer-events-none" />
      
      <PageWrapper className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E1F5EE] border border-[#b6ead7] text-[#0F6E56] text-xs font-bold mb-8 uppercase tracking-wider"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#1D9E75]" />
            Direct access to 5,000+ verified founders
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#04342C] text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-8 font-syne"
          >
            Find your next <br />
            <span className="text-[#0F6E56]">Founder. Fast.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-[#3a6b57] max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Founivo is the professional directory for the startup ecosystem. Skip the gatekeepers and connect directly with verified visionaries building the future.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/find-founder" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:px-10 py-4 text-lg">
                Start Searching <Search size={20} />
              </Button>
            </Link>
            <Link href="/become-founder" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:px-10 py-4 text-lg bg-white">
                Join as Founder <ArrowRight size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </PageWrapper>
    </section>
  );
};

export default Hero;
