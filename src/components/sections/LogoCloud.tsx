"use client";
import { motion } from "framer-motion";

const logos = [
  "Andreessen Horowitz", "Sequoia Capital", "Y Combinator", "Accel", "Benchmark", "Greylock"
];

const LogoCloud = () => {
  return (
    <div className="py-12 bg-white border-b border-[#0F6E56]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#85b5a0] mb-8">
          Trusted by members from world-class firms
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
          {logos.map((logo, i) => (
            <motion.span
              key={logo}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-lg md:text-xl font-black text-[#04342C]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {logo}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoCloud;