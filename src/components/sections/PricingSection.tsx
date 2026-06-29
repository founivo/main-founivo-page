"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '../shared/PageWrapper';
import PlanCard from '../ui/PlanCard';
import { PLANS } from '@/data/constants';

interface PricingSectionProps {
  title?: string;
  subtitle?: string;
  showAllPlans?: boolean;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  title = "Simple, transparent pricing",
  subtitle = "Choose the plan that fits your needs. Start with a 7-day free trial.",
  showAllPlans = true,
}) => {
  const plansToShow = showAllPlans ? PLANS : PLANS.slice(0, 3);

  return (
    <section id="pricing" className="py-28 bg-[#f8faf9] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[400px] h-[400px] rounded-full bg-[#0F6E56] opacity-[0.03] blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#1D9E75] opacity-[0.03] blur-[100px]" />
      </div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0F6E56]/10 to-transparent" />

      <PageWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#0F6E56] font-bold tracking-widest uppercase text-sm mb-4 block"
          >
            Pricing
          </motion.span>
          <h2 className="font-syne font-bold text-3xl md:text-5xl text-[#04342C] mb-4">{title}</h2>
          <p className="text-[#3a6b57] text-lg max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plansToShow.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <PlanCard plan={p} />
            </motion.div>
          ))}
        </div>

        {/* Trusted micro-copy */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-[#85b5a0] mt-12 font-medium"
        >
          All plans include a 7-day free trial. No credit card required. Cancel anytime.
        </motion.p>
      </PageWrapper>
    </section>
  );
};

export default PricingSection;
