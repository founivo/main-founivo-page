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
    <section id="directory" className="py-24 bg-white border-t border-gray-50">
      <PageWrapper>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-2 font-syne text-[#04342C]"
            >
              Founder Directory
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm font-medium text-[#3a6b57]"
            >
              {filteredFounders.length} founders found matching your criteria
            </motion.p>
          </div>
          {plan === "none" && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 px-4 py-2 rounded-lg text-sm font-semibold bg-[#E1F5EE] text-[#0F6E56] border border-[#b6ead7]"
            >
              <Lock size={14} /> 
              <span>Select a plan to unlock full details</span>
            </motion.div>
          )}
        </div>

        {/* Plan selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { key: "none", label: "Free Viewer" }, 
            { key: "starter", label: "Starter ($200/mo)" }, 
            { key: "pro", label: "Professional ($500/mo)" }, 
            { key: "annual", label: "Enterprise (Annual)" }
          ].map(({ key, label }) => (
            <button 
              key={key} 
              onClick={() => setPlan(key as typeof plan)} 
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all border ${
                plan === key 
                  ? 'bg-[#0F6E56] text-white border-[#0F6E56]' 
                  : 'bg-white text-[#3a6b57] border-gray-200 hover:bg-gray-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATS.map((c, i) => (
            <button 
              key={c} 
              onClick={() => setCat(c)} 
              className={`px-4 py-1.5 rounded-md text-[11px] font-bold transition-all border uppercase tracking-wider ${
                cat === c 
                  ? 'bg-[#0F6E56] text-white border-[#0F6E56]' 
                  : 'bg-[#E1F5EE] text-[#085041] border-transparent hover:border-[#0F6E56]/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-12">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#85b5a0]" />
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search by name, company, or industry..." 
            className="w-full pl-12 pr-6 py-4 rounded-xl border border-gray-200 focus:border-[#0F6E56] focus:ring-0 outline-none font-medium text-sm text-[#04342C] transition-colors"
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
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