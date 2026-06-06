// src/components/sections/PricingSection.tsx
import React from 'react';
import { PageWrapper } from '../shared/PageWrapper';
import PlanCard from '../ui/PlanCard';
import { PLANS } from '@/data/constants';

interface PricingSectionProps {
  title?: string;
  subtitle?: string;
  showAllPlans?: boolean; // To control how many plans are shown on the homepage vs. pricing page
}

const PricingSection: React.FC<PricingSectionProps> = ({
  title = "Simple, transparent pricing",
  subtitle = "One paying user covers your entire monthly cost. Start today.",
  showAllPlans = true,
}) => {
  const plansToShow = showAllPlans ? PLANS : PLANS.filter(p => p.name === "Starter" || p.name === "Pro"); // Example: only show 2 on home

  return (
    <section id="pricing" style={{ padding: "80px 16px", background: "#fff" }}>
      <PageWrapper>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(26px,4vw,38px)", color: "#04342C", marginBottom: 12 }}>{title}</h2>
          <p style={{ color: "#3a6b57", fontSize: 15 }}>{subtitle}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
          {plansToShow.map(p => (
            <PlanCard key={p.name} plan={p} />
          ))}
        </div>
      </PageWrapper>
    </section>
  );
};

export default PricingSection;