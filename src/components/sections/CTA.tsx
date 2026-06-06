"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { PageWrapper } from '../shared/PageWrapper';
import Button from '../ui/Button';

const CTA = () => {
  return (
    <section className="py-24">
      <PageWrapper className="max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[40px] px-8 py-16 md:py-20 bg-[#0F6E56] relative overflow-hidden text-center shadow-2xl shadow-[#0F6E56]/20"
        >
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[80px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[80px]" />
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mb-6 relative z-10 leading-tight"
            style={{ fontFamily: "'Syne',sans-serif", color: "#fff" }}
          >
            Ready to connect with <br /> the right founders?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl mb-12 relative z-10 max-w-2xl mx-auto"
            style={{ color: "#9FE1CB" }}
          >
            Join 5,000+ investors, recruiters, and entrepreneurs who build their dream teams with Founivo.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10"
          >
            <Link href="/find-founder" className="w-full sm:w-auto">
              <Button className="w-full px-10 py-4 bg-white text-[#0F6E56] text-lg font-bold rounded-2xl transition-transform hover:scale-105 active:scale-95 shadow-lg">
                Find a Founder <Search size={18} className="ml-2" />
              </Button>
            </Link>
            <Link href="/become-founder" className="w-full sm:w-auto">
              <Button className="w-full px-10 py-4 bg-transparent text-white border-2 border-white/30 text-lg font-bold rounded-2xl transition-all hover:bg-white/10">
                Join as a Founder
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </PageWrapper>
    </section>
  );
};

export default CTA;