"use client";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { ShieldCheck, Zap, BarChart3, Filter, MessageSquare } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import LogoCloud from "@/components/sections/LogoCloud";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Identity",
    description: "Every founder goes through a 3-step verification process to ensure authenticity and active operations."
  },
  {
    icon: BarChart3,
    title: "Data Enrichment",
    description: "Get more than just contact info. See valuation ranges, funding history, and team growth metrics."
  },
  {
    icon: Zap,
    title: "Early Access",
    description: "Connect with stealth-mode founders before they hit the mainstream market."
  },
  {
    icon: Filter,
    title: "Advanced Filtering",
    description: "Filter by location, industry, monthly revenue, and specific technical expertise."
  }
];

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-[#f8faf9] pt-24 pb-20">
      <PageWrapper>
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-sm font-semibold mb-8">
            <Zap size={14} /> The #1 Platform for Venture Deal Flow
          </div>
          <h1 
            className="text-5xl md:text-7xl font-bold text-[#04342C] mb-8 leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Supercharge your <br /><span className="text-[#0F6E56]">Deal Flow</span>
          </h1>
          <p className="text-xl text-[#3a6b57] max-w-3xl mx-auto mb-12 font-medium">
            Founivo provides direct access to a curated network of 5,000+ verified founders. Skip the discovery phase and start meaningful conversations today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link href="/auth/signup">
                <Button className="px-10 py-4 bg-[#0F6E56] text-white text-lg rounded-2xl shadow-xl shadow-[#0F6E56]/20">
                    Get Investor Access
                </Button>
             </Link>
             <Link href="/contact">
                <Button className="px-10 py-4 bg-white text-[#0F6E56] border-2 border-[#0F6E56]/10 text-lg rounded-2xl hover:bg-[#0F6E56]/5">
                    Schedule a Demo
                </Button>
             </Link>
          </div>
        </div>

        <LogoCloud />

        {/* Feature Grid */}
        <div className="py-24 grid md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[32px] border border-[#0F6E56]/5 hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 bg-[#E1F5EE] rounded-2xl flex items-center justify-center mb-8">
                <feature.icon size={28} color="#0F6E56" />
              </div>
              <h3 className="text-2xl font-bold text-[#04342C] mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                {feature.title}
              </h3>
              <p className="text-[#3a6b57] leading-relaxed text-lg">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Quote */}
        <div className="bg-[#04342C] rounded-[40px] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0F6E56] rounded-full blur-[100px] opacity-20" />
          <div className="relative z-10">
            <MessageSquare size={48} className="text-[#9FE1CB] mb-12 opacity-50" />
            <p className="text-3xl md:text-4xl font-bold mb-12 leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              &quot;Founivo has cut our sourcing time by 60%. The quality of founders we meet here is consistently higher than any other platform we&apos;ve used.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#0F6E56]" />
              <div>
                <h4 className="font-bold text-xl text-white">Sarah Jenkins</h4>
                <p className="text-[#9FE1CB]">Partner at Nexus Ventures</p>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}