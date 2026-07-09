"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
// intentionally render full-bleed hero (no PageWrapper)

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white py-8 md:py-12">
      <div className="w-full relative z-10 px-4 md:px-8">
          {/* Full-width visual hero with background video + overlay containing the original headline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-4xl">
              <video
                src="/front.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[560px] md:h-[680px] lg:h-[760px] object-cover rounded-4xl block mx-auto"
              />

              {/* left-to-right dark gradient for readability (no blur) */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent pointer-events-none rounded-4xl" />

              {/* Overlay content on the left */}
              <div className="absolute inset-0 flex items-center pointer-events-auto">
                <div className="pl-6 md:pl-12 lg:pl-20 w-full max-w-2xl">
                  <h1 className="text-white text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.02] mb-2 whitespace-nowrap">
                    Find the founder
                  </h1>
                  <div className="text-white text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.02] mt-1">behind the startup</div>

                  <p className="text-white/90 max-w-xl text-lg md:text-xl mb-6">
                    Hire experts who use AI to amplify their talent, turning complex work into high impact business outcomes.
                  </p>

                  <div className="flex items-center gap-4 mb-4">
                    <button className="px-5 py-2 rounded-full bg-transparent border border-white/30 text-white font-medium">I want to find a founder</button>
                    <button className="px-5 py-2 rounded-full bg-white/10 text-white font-medium">I want to become a founder</button>
                  </div>

                  <div className="flex items-center gap-3 bg-white rounded-full px-5 py-2 shadow-sm max-w-2xl">
                    <input
                      placeholder="Describe what you need to hire for..."
                      className="flex-1 bg-transparent placeholder:text-slate-300 text-white text-sm outline-none"
                    />
                    <button className="flex items-center gap-2 bg-black text-white rounded-full px-4 py-1.5 text-sm border border-white/20">
                      <Search size={16} />
                      <span>Search</span>
                    </button>
                  </div>

                  {/* Category pills below search */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    {['AI startup','New startup','Healthcare','Angel investor'].map((c) => (
                      <span key={c} className="text-sm bg-white/10 text-white px-3 py-1 rounded-full border border-white/20">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
    </section>
  );
};

export default Hero;
