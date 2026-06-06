"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp, Users, MapPin, Star } from 'lucide-react';
import { PageWrapper } from '../shared/PageWrapper';

const features = [
  { icon: Shield, title: "Verified profiles", desc: "Every founder is manually verified. No fake profiles, no dead emails." },
  { icon: Zap, title: "Instant access", desc: "Search, filter, and get contact details in seconds — no waiting." },
  { icon: TrendingUp, title: "Always fresh", desc: "New founders added every week. Your directory never gets stale." },
  { icon: Users, title: "12 categories", desc: "AI, Tech, Health, Finance, ClimateTech and many more niches covered." },
  { icon: MapPin, title: "Global reach", desc: "Founders from 40+ countries — find local or international contacts." },
  { icon: Star, title: "Real data", desc: "Emails, phone numbers and socials sourced and verified by our team." },
];

const Features = () => {
  return (
    <section className="py-24 bg-white">
      <PageWrapper>
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "'Syne',sans-serif", color: "#04342C" }}
          >
            Why people choose Founivo
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#3a6b57" }}
          >
            Built for people who need to move fast and make real connections.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl border transition-all hover:shadow-xl hover:shadow-[#0F6E56]/5 group"
              style={{ 
                borderColor: "rgba(15, 110, 86, 0.08)", 
                background: "#f8faf9" 
              }}
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                style={{ background: "#E1F5EE" }}
              >
                <feature.icon size={22} color="#0F6E56" />
              </div>
              <h3 
                className="text-lg font-bold mb-3"
                style={{ fontFamily: "'Syne',sans-serif", color: "#04342C" }}
              >
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#3a6b57" }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </PageWrapper>
    </section>
  );
};

export default Features;