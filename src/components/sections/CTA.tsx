"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { PageWrapper } from '../shared/PageWrapper';
import Button from '../ui/Button';

const CTA = () => {
  return (
    <section className="py-24 bg-white">
      <PageWrapper className="max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl px-8 py-16 md:py-20 bg-[#0F6E56] relative overflow-hidden text-center"
        >
          {/* Subtle Texture */}
          <div className="absolute inset-0 opacity-5 dot-pattern pointer-events-none" />

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6 relative z-10 leading-tight font-syne text-white"
          >
            Connect with the right <br /> founders today
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl mb-12 relative z-10 max-w-2xl mx-auto text-emerald-100"
          >
            Join thousands of startup professionals who are building the future with Founivo.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10"
          >
            <Link href="/find-founder" className="w-full sm:w-auto">
              <Button variant="white" className="w-full sm:px-12 py-4 text-lg">
                Find a Founder <Search size={18} />
              </Button>
            </Link>
            <Link href="/become-founder" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:px-12 py-4 text-lg border-emerald-400 text-white hover:bg-emerald-700">
                Join as Founder
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </PageWrapper>
    </section>
  );
};

export default CTA;