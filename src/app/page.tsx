// src/app/page.tsx
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Directory from "@/components/sections/Directory";
import PricingSection from "@/components/sections/PricingSection";
import CTA from "@/components/sections/CTA";
import Stats from "@/components/sections/Stats";
import HowItWorks from "@/components/sections/HowItWorks";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import LogoCloud from "@/components/sections/LogoCloud";
import Newsletter from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <LogoCloud />
      <Stats />
      <HowItWorks />
      <Features />
      <TestimonialsSection />
      <Directory />
      <PricingSection title="Choose the right plan for you" subtitle="Start connecting with verified founders today." showAllPlans={false} />
      <Newsletter />
      <CTA />
    </div>
  );
}