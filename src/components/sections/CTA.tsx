"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import { PageWrapper } from '../shared/PageWrapper';
import Button from '../ui/Button';

const CTA = () => {
  return (
    <section className="py-28 bg-[#f8faf9] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#0F6E56] opacity-[0.03] blur-[150px]" />
      </div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0F6E56]/10 to-transparent" />

      <PageWrapper className="max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[3rem] px-8 py-20 md:py-28 bg-[#04342C] overflow-hidden text-center"
        >
          {/* Premium Decorative Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-[-30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#0F6E56] opacity-30 blur-[120px]" />
            <div className="absolute bottom-[-30%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#1D9E75] opacity-20 blur-[100px]" />
            <div className="absolute inset-0 dot-pattern opacity-[0.06]" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-8 backdrop-blur-sm"
            >
              <Sparkles size={12} className="text-emerald-300" />
              <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wider">
                Join 5,000+ verified founders
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6 font-syne text-white leading-tight"
            >
              Ready to find your <br />
              <span className="text-emerald-300">next founder?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-emerald-100/80"
            >
              Join thousands of startup professionals who are building the future with Founivo. Start your 7-day free trial today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/find-founder" className="w-full sm:w-auto group">
                <Button variant="white" className="w-full sm:px-12 py-4 text-lg shadow-xl hover:shadow-2xl">
                  Find a Founder <Search size={18} className="group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
              <Link href="/become-founder" className="w-full sm:w-auto group">
                <Button variant="outline" className="w-full sm:px-12 py-4 text-lg border-white/20 text-white hover:bg-white/10 hover:border-white/40">
                  Join as Founder <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex items-center justify-center gap-8 text-emerald-200/60 text-sm"
            >
              <span>No credit card required</span>
              <span className="w-1 h-1 rounded-full bg-emerald-200/30" />
              <span>7-day free trial</span>
              <span className="w-1 h-1 rounded-full bg-emerald-200/30" />
              <span>Cancel anytime</span>
            </motion.div>
          </div>
        </motion.div>
      </PageWrapper>
    </section>
  );
};

export default CTA;
