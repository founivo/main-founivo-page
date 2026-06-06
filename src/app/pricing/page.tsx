// src/app/pricing/page.tsx
import React from 'react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import PricingSection from '@/components/sections/PricingSection';

export const metadata = {
  title: "Pricing - Founivo",
  description: "Simple, transparent pricing for Founivo's verified founder directory. Choose the plan that fits your needs.",
};

const PricingPage = () => {
  return (
    <div className="py-20">
      <PageWrapper className="text-center mb-16">
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(36px,6vw,60px)", color: "#04342C", lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 20 }}>
          Find your perfect plan.
        </h1>
        <p className="text-lg text-[#3a6b57] max-w-2xl mx-auto">
          Whether you&apos;re an investor, recruiter, or fellow founder, Founivo has a plan tailored for your needs to connect with the right people.
        </p>
      </PageWrapper>
      <PricingSection
        title="Simple, transparent pricing"
        subtitle="One paying user covers your entire monthly cost. Start today with a free trial."
        showAllPlans={true}
      />
      {/* You can add a FAQ section here */}
      <PageWrapper className="py-20">
        <h2 className="text-center font-['Syne'] font-extrabold text-3xl text-[#04342C] mb-12">
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              question: "What does 'verified' mean?",
              answer: "Every founder profile on Founivo is manually reviewed and verified by our team. We cross-reference public data, LinkedIn profiles, and company registries to ensure accuracy and legitimacy. No fake profiles, no outdated information."
            },
            {
              question: "How often are new founders added?",
              answer: "We actively scout and add new, promising founders to our directory every week. Our goal is to keep the database fresh and relevant, ensuring you always have access to emerging talent and startups."
            },
            {
              question: "What if I need more than the Pro plan offers?",
              answer: "For enterprise-level needs, custom integrations, or higher usage limits, please contact our sales team. We're happy to discuss tailored solutions to meet your specific requirements."
            },
            {
              question: "Is there a free trial available?",
              answer: "Yes, our Starter plan comes with a 7-day free trial. This allows you to explore the directory and experience Founivo's features before committing to a subscription."
            },
          ].map((faq, index) => (
            <div key={index} className="p-6 border border-[#d0ede4] rounded-xl bg-white shadow-sm">
              <h3 className="font-['Syne'] font-semibold text-lg text-[#04342C] mb-3">{faq.question}</h3>
              <p className="text-sm text-[#3a6b57] leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </PageWrapper>
    </div>
  );
};

export default PricingPage;