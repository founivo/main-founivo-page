"use client";
import { motion } from "framer-motion";
import { Search, UserPlus, MessageCircle, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search & Filter",
    description: "Browse through thousands of verified founders by industry, location, or expertise.",
  },
  {
    icon: UserPlus,
    title: "Request Connection",
    description: "Connect with the founders that align with your vision and goals.",
  },
  {
    icon: MessageCircle,
    title: "Direct Access",
    description: "Get direct access to emails, phone numbers, and social profiles of founders.",
  },
  {
    icon: TrendingUp,
    title: "Grow Together",
    description: "Build meaningful partnerships and scale your startup with the right co-founder.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24" style={{ background: "#f8faf9" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "#04342C", fontFamily: "'Syne', sans-serif" }}
          >
            How Founivo Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg"
            style={{ color: "#3a6b57" }}
          >
            Finding your perfect founder match is simpler than ever.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-3xl bg-white border border-[#0F6E56]/5 hover:border-[#0F6E56]/20 transition-all group"
              style={{ boxShadow: "0 10px 30px rgba(15, 110, 86, 0.03)" }}
            >
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                style={{ background: "#0F6E56" }}
              >
                <step.icon size={28} color="#fff" />
              </div>
              <h3 
                className="text-xl font-bold mb-3"
                style={{ color: "#04342C", fontFamily: "'Syne', sans-serif" }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#3a6b57" }}>
                {step.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-[#0F6E56]/10 transform -translate-y-1/2" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;