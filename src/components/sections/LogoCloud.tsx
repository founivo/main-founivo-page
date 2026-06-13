"use client";
import { motion } from "framer-motion";
import { Search, UserPlus, MessageCircle, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search & Filter",
    description: "Browse through thousands of verified founders by industry, location, or expertise. Our advanced filters help you find exactly who you need.",
    color: "#E1F5EE"
  },
  {
    icon: UserPlus,
    title: "Request Connection",
    description: "Connect with the founders that align with your vision. Direct messaging and automated intros make the process seamless.",
    color: "#FFF4E1"
  },
  {
    icon: MessageCircle,
    title: "Direct Access",
    description: "Get direct access to emails, phone numbers, and social profiles. No more gatekeeping or endless outreach on LinkedIn.",
    color: "#E1E8FF"
  },
  {
    icon: TrendingUp,
    title: "Grow Together",
    description: "Build meaningful partnerships and scale your startup with the right co-founder or strategic partner by your side.",
    color: "#F5E1FF"
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#0F6E56] font-bold tracking-widest uppercase text-sm mb-4 block"
            >
              The Process
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold"
              style={{ color: "#04342C", fontFamily: "'Syne', sans-serif" }}
            >
              How Founivo Works
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg max-w-md"
            style={{ color: "#3a6b57" }}
          >
            A streamlined workflow designed to help you find your next big opportunity in record time.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-[2.5rem] bg-[#f8faf9] border border-[#0F6E56]/5 hover:bg-white hover:shadow-2xl hover:shadow-[#0F6E56]/10 transition-all duration-500 overflow-hidden"
            >
              {/* Step Number */}
              <div className="absolute top-6 right-8 text-6xl font-black text-[#0F6E56]/5 group-hover:text-[#0F6E56]/10 transition-colors" style={{ fontFamily: "'Syne', sans-serif" }}>
                0{index + 1}
              </div>

              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 group-hover:rotate-6 transition-transform duration-500"
                style={{ background: step.color }}
              >
                <step.icon size={32} color="#0F6E56" />
              </div>
              
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ color: "#04342C", fontFamily: "'Syne', sans-serif" }}
              >
                {step.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "#3a6b57" }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;