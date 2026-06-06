"use client";
import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Zap, Search, Globe, ShieldCheck } from 'lucide-react';
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
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for smooth ease-out
      },
    },
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 mesh-gradient">
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
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div className="glass px-5 py-2 rounded-full flex items-center gap-2 text-sm font-semibold text-[#0F6E56] border-[#0F6E56]/10 shadow-sm">
              <Zap size={14} className="text-[#1D9E75]" />
              <span>Trusted by 5,000+ top-tier investors</span>
            </div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="mb-8 max-w-4xl mx-auto">
            <span className="block text-[#04342C] text-5xl md:text-8xl font-black tracking-tight leading-[1.05] mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              Find your next
            </span>
            <span className="text-gradient text-5xl md:text-8xl font-black tracking-tight leading-[1.05]" style={{ fontFamily: "'Syne', sans-serif" }}>
              Founder. Fast.
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-[#3a6b57] max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            Founivo is the world&apos;s most trusted verified founder directory. Get direct access to the visionaries building the future.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link href="/find-founder" className="w-full sm:w-auto">
              <Button className="w-full sm:px-10 py-4 bg-[#0F6E56] text-white text-lg rounded-2xl shadow-xl shadow-[#0F6E56]/20 btn-shine transition-transform hover:scale-105 active:scale-95">
                Find a Founder <Search size={18} className="ml-2" />
              </Button>
            </Link>
            <Link href="/become-founder" className="w-full sm:w-auto">
              <Button className="w-full sm:px-10 py-4 glass text-[#0F6E56] text-lg rounded-2xl border-2 border-[#0F6E56]/10 hover:bg-[#0F6E56]/5 transition-all">
                Join as a Founder
              </Button>
            </Link>
          </motion.div>

          {/* Stats Section with Glassmorphism */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
            {[
              { label: "Verified Founders", value: "500+", icon: <ShieldCheck size={18} /> },
              { label: "Growth Capital", value: "$2.4B+", icon: <Globe size={18} /> },
              { label: "Global Reach", value: "45+", icon: <Globe size={18} /> },
              { label: "Active Investors", value: "1,200+", icon: <Zap size={18} /> }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className="glass p-6 rounded-3xl border-[#0F6E56]/5 text-center transition-all hover:shadow-lg hover:shadow-[#0F6E56]/5"
              >
                <div className="flex justify-center text-[#0F6E56] mb-3 opacity-60">
                  {stat.icon}
                </div>
                <div className="text-3xl font-black text-[#04342C] mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>{stat.value}</div>
                <div className="text-xs uppercase tracking-widest font-bold text-[#3a6b57]/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </PageWrapper>

      {/* Bottom Curve/Transition */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#f8faf9] to-transparent" />
    </section>
  );
};

export default Hero;