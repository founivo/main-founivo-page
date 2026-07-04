'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/shared/PageWrapper';
import Button from '@/components/ui/Button';
import { ArrowRight, DollarSign, Award, Rocket, Globe, ShieldCheck, Check, Sparkles } from 'lucide-react';
import BecomeFounderForm from '@/components/onboarding/BecomeFounderForm';
import { useUser } from '@/hooks/useUser';
import { createClient } from '@/utils/supabase/client';
import { getFounderDashboardUrl } from '@/lib/config';

// Framer motion variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 100, damping: 20 } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function BecomeFounderLanding() {
  const [showForm, setShowForm] = useState(false);
  const { user, profile, loading } = useUser();

  const handleCtaClick = async () => {
    if (loading) return;
    if (!user) {
      window.location.href = '/sign-in';
      return;
    }
    if (profile?.founder_onboarding_completed) {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        const baseUrl = getFounderDashboardUrl();
        if (session) {
          window.location.href = `${baseUrl}?access_token=${session.access_token}&refresh_token=${session.refresh_token}`;
          return;
        }
      } catch (error) {
        console.error('Error fetching session for redirect:', error);
      }
      window.location.href = getFounderDashboardUrl();
    } else {
      setShowForm(true);
    }
  };

  if (showForm) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-[#E1F5EE]/20 via-[#F9FBFA] to-[#F9FBFA] relative overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#E1F5EE] opacity-35 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-[#1D9E75]/10 opacity-20 blur-[100px] pointer-events-none" />
        
        <PageWrapper className="max-w-2xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-4xl md:text-5xl text-[#04342C] mb-4">
              Join as a Founder
            </h1>
            <p className="text-[#3a6b57] text-lg max-w-md mx-auto">Get featured on Founivo, connect with peers, and earn while sharing your expertise.</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50"
          >
            <BecomeFounderForm />
          </motion.div>
        </PageWrapper>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#F9FBFA] relative overflow-hidden noise-bg">
      {/* Dynamic blurred glow spots */}
      <div className="absolute top-[5%] left-[10%] w-[300px] h-[300px] rounded-full bg-[#E1F5EE]/60 opacity-60 blur-[100px] pointer-events-none" />
      <div className="absolute top-[25%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#1D9E75]/10 opacity-30 blur-[150px] pointer-events-none" />
      
      <PageWrapper className="relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Hero Section */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-24 max-w-3xl mx-auto"
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-sm font-semibold mb-8 border border-[#0F6E56]/10 shadow-sm"
            >
              <Award size={14} className="text-[#1D9E75] animate-pulse" /> 
              <span>Join the top 1% of Global Founders</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} 
              className="text-5xl md:text-7xl text-[#04342C] mb-8 leading-[1.1] tracking-tight"
            >
              Share your Journey. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F6E56] to-[#1D9E75] relative inline-block">
                Earn Rewards.
                <span className="absolute bottom-1.5 left-0 w-full h-[8px] bg-[#9FE1CB]/50 -z-10 rounded-full" />
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-[#3a6b57] mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Founivo is more than a directory. It&apos;s a platform where your expertise is valued. Connect with serious investors and earn for every meaningful connection.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex justify-center">
              <Button 
                onClick={handleCtaClick} 
                disabled={loading} 
                className="group relative overflow-hidden px-10 py-5 bg-[#0F6E56] text-white text-lg rounded-2xl shadow-xl shadow-[#0F6E56]/20 transition-all duration-300 hover:shadow-2xl hover:shadow-[#0F6E56]/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed font-bold"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? 'Loading...' : 'Apply to Join as Founder'} 
                  {!loading && <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#0F6E56] to-[#1D9E75] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Advantages Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 mb-28"
          >
            {[
              {
                icon: DollarSign,
                title: "Monetize Connections",
                desc: "Earn a 10% commission ($20) for every $200 connection request you fulfill.",
                badge: "Direct Payouts"
              },
              {
                icon: Globe,
                title: "Global Visibility",
                desc: "Get featured in front of thousands of investors and top-tier recruiters.",
                badge: "High Exposure"
              },
              {
                icon: Rocket,
                title: "Network with Peers",
                desc: "Join an exclusive community of 500+ verified founders from 40+ countries.",
                badge: "Elite Circle"
              }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-100/80 shadow-md hover:shadow-xl hover:border-[#0F6E56]/20 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#E1F5EE]/40 rounded-full blur-2xl group-hover:bg-[#E1F5EE]/70 transition-colors duration-300 -mr-6 -mt-6" />
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-[#E1F5EE] rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0F6E56] transition-all duration-300">
                      <Icon className="text-[#0F6E56] group-hover:text-white transition-colors duration-300" size={24} />
                    </div>
                    <span className="text-[11px] font-bold text-[#0F6E56] bg-[#E1F5EE] px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#04342C] mb-3 group-hover:text-[#0F6E56] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[#3a6b57] leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Features Section (CTA Box) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-gradient-to-br from-[#04342C] to-[#011411] rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-[#04342C]/20"
          >
            {/* Background elements */}
            <div className="absolute top-[-30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#0F6E56] opacity-25 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-30%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#1D9E75] opacity-15 blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 dot-pattern opacity-[0.04] pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              
              <div className="flex-1">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 mb-6 backdrop-blur-sm"
                >
                  <Sparkles size={12} className="text-[#9FE1CB]" />
                  <span className="text-[11px] font-bold text-[#9FE1CB] uppercase tracking-wider">Premium Access</span>
                </motion.div>
                
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-3xl md:text-5xl mb-8 leading-tight text-white">
                  The perks of being a <br />
                  <span className="text-[#9FE1CB]">Founivo Founder</span>
                </h2>
                
                <ul className="space-y-4">
                  {[
                    "Verified 'Founding Member' badge on profile",
                    "Dedicated personal dashboard with deep connection analytics",
                    "Smart filtering of low-quality, spam connection requests",
                    "Priority matching & access to exclusive founder communities"
                  ].map((text, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * i }}
                      className="flex items-start gap-3.5"
                    >
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#9FE1CB]/20 flex items-center justify-center border border-[#9FE1CB]/30">
                        <Check size={12} className="text-[#9FE1CB] font-bold" />
                      </div>
                      <span className="text-white/80 text-base md:text-lg">{text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
                className="w-full lg:w-[400px] text-center bg-[#0F6E56]/40 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden group shadow-xl"
              >
                <div className="absolute inset-0 bg-[#0F6E56]/10 -z-10" />
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#9FE1CB]/10 rounded-full blur-xl group-hover:bg-[#9FE1CB]/20 transition-all duration-300" />
                
                <div className="text-xs text-[#9FE1CB] mb-2 font-bold tracking-widest uppercase">FOUNDER COMMISSION</div>
                <div className="text-6xl font-black mb-8 text-white tracking-tight flex items-baseline justify-center">
                  $20
                  <span className="text-lg text-[#9FE1CB] font-normal lowercase ml-1">/connection</span>
                </div>
                
                <Button 
                  onClick={handleCtaClick} 
                  disabled={loading} 
                  variant="white"
                  className="w-full py-4 relative overflow-hidden bg-white text-[#0F6E56] font-bold text-base hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg"
                >
                  {loading ? 'Loading...' : 'Join the elite directory'}
                </Button>
                
                <div className="mt-4 text-xs text-white/50">
                  Join hundreds of founders already earning
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </PageWrapper>
    </div>
  );
}

