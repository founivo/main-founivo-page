import Hero from "@/components/sections/Hero";
import LogoCloud from "@/components/sections/LogoCloud";
import Stats from "@/components/sections/Stats";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import Directory from "@/components/sections/Directory";
import PricingSection from "@/components/sections/PricingSection";
import Newsletter from "@/components/sections/Newsletter";
import CTA from "@/components/sections/CTA";

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
