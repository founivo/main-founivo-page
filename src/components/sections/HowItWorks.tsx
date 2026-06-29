"use client";
import { motion } from "framer-motion";
import { Search, UserPlus, MessageCircle, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search & Filter",
    description: "Browse thousands of verified founders by industry, location, or expertise using smart filters.",
    color: "#E1F5EE",
    number: "01",
  },
  {
    icon: UserPlus,
    title: "Request Connection",
    description: "Connect with founders that align with your vision through direct messaging or automated intros.",
    color: "#E1F5EE",
    number: "02",
  },
  {
    icon: MessageCircle,
    title: "Direct Access",
    description: "Get emails, phone numbers, and social profiles instantly — no more LinkedIn gatekeeping.",
    color: "#E1F5EE",
    number: "03",
  },
  {
    icon: TrendingUp,
    title: "Grow Together",
    description: "Build meaningful partnerships and scale your startup with the right co-founder or investor.",
    color: "#E1F5EE",
    number: "04",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0F6E56]/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[#0F6E56] font-bold tracking-widest uppercase text-sm mb-4 block"
            >
              How It Works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold font-syne text-[#04342C]"
            >
              From search to <br />
              <span className="text-[#0F6E56]">connection in minutes</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg max-w-md text-[#3a6b57]"
          >
            A streamlined workflow designed to help you find your next big opportunity in record time.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative p-8 rounded-[2rem] bg-white border border-[#0F6E56]/8 hover:border-[#0F6E56]/20 shadow-sm hover:shadow-2xl hover:shadow-[#0F6E56]/10 transition-all duration-500 h-full">
                {/* Step Number */}
                <div className="absolute top-6 right-8 text-7xl font-black text-[#0F6E56]/[0.04] group-hover:text-[#0F6E56]/10 transition-colors font-syne select-none">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-[#E1F5EE] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <step.icon size={30} className="text-[#0F6E56]" />
                </div>

                {/* Arrow Connector */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-10 -right-4 text-[#0F6E56]/20 group-hover:text-[#0F6E56]/40 transition-colors">
                    <ArrowRight size={24} />
                  </div>
                )}

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 font-syne text-[#04342C]">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-[#3a6b57]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
