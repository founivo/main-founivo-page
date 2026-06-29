"use client";
import React, { useState } from 'react';
import { Search, Lock, SlidersHorizontal } from 'lucide-react';
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
    <section id="directory" className="py-28 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#E1F5EE] opacity-30 blur-[150px]" />
      </div>

      <PageWrapper>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#0F6E56] font-bold tracking-widest uppercase text-sm mb-4 block"
            >
              Directory
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold font-syne text-[#04342C]"
            >
              Browse founders
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <span className="text-sm font-medium text-[#3a6b57]">
              {filteredFounders.length} founders found
            </span>
            {plan === "none" && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E1F5EE] border border-[#b6ead7]">
                <Lock size={12} className="text-[#0F6E56]" />
                <span className="text-[11px] font-bold text-[#0F6E56] uppercase tracking-wider">Locked</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Plan Selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {[
            { key: "none", label: "Free View" },
            { key: "starter", label: "Starter" },
            { key: "pro", label: "Pro" },
            { key: "annual", label: "Annual" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setPlan(key as typeof plan)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                plan === key
                  ? 'bg-[#0F6E56] text-white border-[#0F6E56] shadow-md shadow-[#0F6E56]/20'
                  : 'bg-white text-[#3a6b57] border-gray-200 hover:border-[#0F6E56]/30 hover:bg-[#f8faf9]'
              }`}
            >
              {label}
              {key === "pro" && (
                <span className="ml-1.5 text-[9px] opacity-80">Popular</span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Filters Row: Categories + Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-col lg:flex-row gap-4 mb-12"
        >
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 flex-1">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-lg text-[11px] font-bold transition-all border uppercase tracking-wider ${
                  cat === c
                    ? 'bg-[#0F6E56] text-white border-[#0F6E56] shadow-sm'
                    : 'bg-[#f8faf9] text-[#085041] border-transparent hover:bg-[#E1F5EE] hover:border-[#b6ead7]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-72">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#85b5a0]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search founders..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#0F6E56] focus:ring-2 focus:ring-[#0F6E56]/10 outline-none text-sm text-[#04342C] transition-all bg-[#f8faf9]"
            />
          </div>
        </motion.div>

        {/* Founder Cards Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredFounders.map(f => (
              <motion.div
                key={f.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
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

        {filteredFounders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-[#85b5a0] font-semibold">No founders match your search criteria.</p>
            <button onClick={() => { setCat("All"); setSearch(""); }} className="mt-4 text-[#0F6E56] font-bold text-sm hover:underline">
              Reset filters
            </button>
          </motion.div>
        )}
      </PageWrapper>
    </section>
  );
};

export default Directory;
