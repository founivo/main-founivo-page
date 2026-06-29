"use client";
import { motion } from "framer-motion";

const logos = [
  "Nexus Ventures",
  "CloudScale",
  "Global Tech",
  "Solo Capital",
  "Innovate HR",
  "Finly",
];

const LogoCloud = () => {
  return (
    <section className="py-14 bg-white border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[11px] font-bold uppercase tracking-[0.25em] text-[#85b5a0] mb-8"
        >
          Trusted by startups & investors worldwide
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group"
            >
              <span className="text-lg md:text-xl font-bold text-[#85b5a0] hover:text-[#0F6E56] transition-colors font-syne tracking-tight">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;
