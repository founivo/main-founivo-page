"use client";
import { motion } from "framer-motion";

const stats = [
  { label: "Verified Founders", value: "5,000+" },
  { label: "Successful Matches", value: "12k+" },
  { label: "Investment Raised", value: "$450M+" },
  { label: "Active Investors", value: "850+" },
];

const Stats = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{ color: "#0F6E56", fontFamily: "'Syne', sans-serif" }}
              >
                {stat.value}
              </h3>
              <p 
                className="text-sm md:text-base font-medium"
                style={{ color: "#64748b" }}
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