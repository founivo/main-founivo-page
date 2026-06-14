// src/components/sections/PricingSection.tsx
import React from 'react';
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
  subtitle = "Choose the plan that fits your business needs. One connection covers your cost.",
  showAllPlans = true,
}) => {
  const plansToShow = showAllPlans ? PLANS : PLANS.slice(0, 3);

  return (
    <section id="pricing" className="py-24 bg-[#f9fbfa] border-t border-gray-100">
      <PageWrapper>
        <div className="text-center mb-16">
          <h2 className="font-syne font-bold text-3xl md:text-4xl text-[#04342C] mb-4">{title}</h2>
          <p className="text-[#3a6b57] text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plansToShow.map(p => (
            <PlanCard key={p.name} plan={p} />
          ))}
        </div>
      </PageWrapper>
    </section>
  );
};

export default PricingSection;