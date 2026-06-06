"use client";
import React, { useState } from 'react';
import { Search, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper } from '../shared/PageWrapper';
import FounderCard from '../ui/FounderCard';
import { FOUNDERS } from '@/data/founders';
import { CATS } from '@/data/constants';

const Directory = () => {
  const [plan, setPlan] = useState<"none" | "starter" | "pro" | "annual">("none");
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");

  const canSeeEmail = plan !== "none";
  const canSeeSocial = plan !== "none";
  const canSeePhone = plan === "pro" || plan === "annual";

  const filteredFounders = FOUNDERS.filter(f => {
    if (cat !== "All" && f.cat !== cat) return false;
    if (search && !f.name.toLowerCase().includes(search.toLowerCase()) && !f.company.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <section id="directory" className="py-24 bg-white">
      <PageWrapper>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ fontFamily: "'Syne',sans-serif", color: "#04342C" }}
            >
              Founder directory
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm font-medium"
              style={{ color: "#3a6b57" }}
            >
              {filteredFounders.length} founders found
            </motion.p>
          </div>
          {plan === "none" && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-sm font-semibold"
              style={{ background: "#E1F5EE", color: "#0F6E56" }}
            >
              <Lock size={14} /> 
              <span>Select a plan to unlock details</span>
            </motion.div>
          )}
        </div>

        {/* Plan selector */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[{ key: "none", label: "Free — browse" }, { key: "starter", label: "$200/mo — email + socials" }, { key: "pro", label: "$500/mo — + phone" }, { key: "annual", label: "$3k/yr — all unlocked" }].map(({ key, label }) => (
            <button 
              key={key} 
              onClick={() => setPlan(key as typeof plan)} 
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${plan === key ? 'shadow-lg shadow-[#0F6E56]/20' : ''}`}
              style={{ 
                cursor: "pointer", 
                background: plan === key ? "#0F6E56" : "#fff", 
                color: plan === key ? "#fff" : "#0F6E56", 
                border: `2px solid ${plan === key ? "#0F6E56" : "rgba(15, 110, 86, 0.1)"}` 
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {CATS.map((c, i) => (
            <motion.button 
              key={c} 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setCat(c)} 
              className="px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{ 
                cursor: "pointer", 
                background: cat === c ? "#0F6E56" : "#E1F5EE", 
                color: cat === c ? "#fff" : "#085041", 
                border: "none" 
              }}
            >
              {c}
            </motion.button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-12">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#85b5a0" }} />
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search by name or company..." 
            className="w-full pl-12 pr-6 py-4 rounded-2xl border transition-all focus:border-[#0F6E56] focus:ring-4 focus:ring-[#0F6E56]/5 outline-none font-medium"
            style={{ 
              borderColor: "rgba(15, 110, 86, 0.1)", 
              background: "#fff", 
              fontSize: 15, 
              color: "#04342C" 
            }} 
          />
        </div>

        {/* Founder Cards */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredFounders.map(f => (
              <motion.div
                key={f.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <FounderCard
                  founder={f}
                  canSeeEmail={canSeeEmail}
                  canSeeSocial={canSeeSocial}
                  canSeePhone={canSeePhone}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </PageWrapper>
    </section>
  );
};

export default Directory;