"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Users, Handshake, TrendingUp, Building2 } from "lucide-react";

const Counter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9,]/g, "");
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 25,
    stiffness: 80,
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
  { label: "Verified Founders", value: "5,000+", icon: Users },
  { label: "Successful Matches", value: "12,000+", icon: Handshake },
  { label: "Capital Raised", value: "$2.4B+", icon: TrendingUp },
  { label: "Active Investors", value: "850+", icon: Building2 },
];

const Stats = () => {
  return (
    <section className="py-28 bg-[#f8faf9] relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-[#0F6E56] opacity-[0.03] blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-[#1D9E75] opacity-[0.03] blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-syne text-[#04342C]">
            Founivo by the numbers
          </h2>
          <p className="text-lg text-[#3a6b57] max-w-xl mx-auto">
            Our community is growing fast — here&apos;s the impact so far.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative bg-white rounded-2xl border border-[#0F6E56]/8 p-6 md:p-8 text-center hover:border-[#0F6E56]/20 hover:shadow-xl hover:shadow-[#0F6E56]/5 transition-all duration-500">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#E1F5EE] flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Icon size={22} className="text-[#0F6E56]" />
                  </div>

                  {/* Value */}
                  <h3
                    className="text-3xl md:text-5xl font-black mb-2 font-syne"
                    style={{ color: "#0F6E56" }}
                  >
                    {stat.value.startsWith("$") && "$"}
                    <Counter value={stat.value.replace("$", "")} />
                  </h3>

                  {/* Label */}
                  <p className="text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-[#3a6b57]">
                    {stat.label}
                  </p>
                </div>

                {/* Connector line between cards */}
                {index < stats.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[2px] bg-[#0F6E56]/10" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
