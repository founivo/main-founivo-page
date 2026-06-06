"use client";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/shared/PageWrapper";
import { Quote, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

const stories = [
  {
    title: "How Lumina AI found their Lead Engineer via Founivo",
    founder: "David Chen",
    company: "Lumina AI",
    tags: ["AI", "Seed Stage", "San Francisco"],
    content: "We were struggling to find a technical co-founder who understood the nuances of generative models. Within 48 hours of joining Founivo, we were talking to Alex, who is now our CTO.",
    impact: "Raised $2M within 3 months of matching."
  },
  {
    title: "Sourcing the perfect partnership in ClimateTech",
    founder: "Emma Watson",
    company: "TerraForm",
    tags: ["ClimateTech", "Partnership", "London"],
    content: "Founivo isn't just about hiring; it's about ecosystem building. We found our primary manufacturing partner through the directory, saving us months of cold outreach.",
    impact: "Reduced operational costs by 30%."
  },
  {
    title: "From stealth to Series A in 6 months",
    founder: "Marcus Thorne",
    company: "VaultPay",
    tags: ["Fintech", "Series A", "Remote"],
    content: "The quality of investors on Founivo is unparalleled. Every connection request we received was from a firm that actually fit our thesis. No time was wasted.",
    impact: "Connected with 15+ Tier 1 VC firms."
  }
];

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <PageWrapper>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 animate-fade-up">
            <h1 
              className="text-5xl md:text-7xl font-bold text-[#04342C] mb-8 leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Real matches. <br />Real <span className="text-[#0F6E56]">Impact.</span>
            </h1>
            <p className="text-xl text-[#3a6b57] font-medium">
              Discover how founders and investors are building the future together through Founivo.
            </p>
          </div>

          <div className="space-y-12">
            {stories.map((story, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-[#f8faf9] rounded-[40px] p-8 md:p-12 border border-[#0F6E56]/5 overflow-hidden hover:border-[#0F6E56]/20 transition-all"
              >
                <div className="flex flex-wrap gap-2 mb-8">
                  {story.tags.map(tag => (
                    <span key={tag} className="px-4 py-1.5 rounded-full bg-white text-[#0F6E56] text-xs font-bold border border-[#0F6E56]/5">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-[#04342C] mb-6 leading-tight group-hover:text-[#0F6E56] transition-colors" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {story.title}
                </h3>
                
                <div className="relative mb-8">
                  <Quote size={40} className="text-[#0F6E56] opacity-10 absolute -top-4 -left-4" />
                  <p className="text-lg text-[#3a6b57] leading-relaxed relative z-10 italic">
                    &quot;{story.content}&quot;
                  </p>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-[#0F6E56]/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#0F6E56]" />
                    <div>
                      <h4 className="font-bold text-[#04342C]">{story.founder}</h4>
                      <p className="text-sm text-[#3a6b57]">Founder of {story.company}</p>
                    </div>
                  </div>
                  <div className="bg-[#E1F5EE] px-6 py-3 rounded-2xl">
                    <p className="text-[#0F6E56] text-sm font-bold">
                      Impact: {story.impact}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold text-[#04342C] mb-8" style={{ fontFamily: "'Syne', sans-serif" }}>
              Ready to write your own success story?
            </h2>
            <Link href="/auth/signup">
              <Button className="px-10 py-4 bg-[#0F6E56] text-white text-lg rounded-2xl shadow-xl shadow-[#0F6E56]/20">
                Join Founivo Today <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}