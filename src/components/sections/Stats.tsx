"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

const Counter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9,]/g, "");
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, numericValue, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest).toLocaleString());
    });
  }, [springValue]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
};

const stats = [
  { label: "Verified Founders", value: "5,000+" },
  { label: "Successful Matches", value: "12,000+" },
  { label: "Capital Raised", value: "$2.4B+" },
  { label: "Active Investors", value: "850+" },
];

const Stats = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#0F6E56] blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#0F6E56] blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="text-center p-10 rounded-[2.5rem] bg-[#f8faf9] border border-[#0F6E56]/10 hover:border-[#0F6E56]/30 hover:bg-white hover:shadow-2xl hover:shadow-[#0F6E56]/5 transition-all duration-500 group"
            >
              <h3 
                className="text-4xl md:text-6xl font-black mb-4 flex items-center justify-center gap-1 group-hover:scale-110 transition-transform duration-500"
                style={{ color: "#0F6E56", fontFamily: "'Syne', sans-serif" }}
              >
                {stat.value.startsWith("$") && "$"}
                <Counter value={stat.value.replace("$", "")} />
              </h3>
              <p 
                className="text-sm md:text-base font-bold uppercase tracking-[0.2em]"
                style={{ color: "#3a6b57" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;