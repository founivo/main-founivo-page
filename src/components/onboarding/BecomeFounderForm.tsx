'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { ArrowRight, CheckCircle2, User, Globe, Briefcase, Award, DollarSign, Loader2, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { createClient } from '@/utils/supabase/client';
import { getFounderDashboardUrl } from '@/lib/config';

export default function BecomeFounderForm() {
  const { user, profile, loading: userLoading } = useUser();
  const supabase = createClient();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    category: '',
    bio: '',
    linkedin: '',
    twitter: '',
    website: '',
  });

  const hasInitialized = React.useRef(false);

  useEffect(() => {
    if (profile?.full_name && !hasInitialized.current) {
      setFormData(prev => ({ ...prev, name: profile.full_name || '' }));
      hasInitialized.current = true;
    }
  }, [profile]);

  const handleRedirect = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const baseUrl = getFounderDashboardUrl();
    if (session) {
      window.location.href = `${baseUrl}?access_token=${session.access_token}&refresh_token=${session.refresh_token}`;
    } else {
      window.location.href = baseUrl;
    }
  };

  useEffect(() => {
    if (step === 5) {
      const timer = setTimeout(() => {
        handleRedirect();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.name,
          role: 'founder',
          onboarding_completed: true,
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // 2. Insert founder profile
      const { error: founderError } = await supabase
        .from('founder_profiles')
        .upsert({
          id: user.id,
          role: formData.role,
          company: formData.company,
          category: formData.category,
          bio: formData.bio,
          linkedin: formData.linkedin,
          twitter: formData.twitter,
          website: formData.website,
          status: 'pending',
        });

      if (founderError) throw founderError;

      setStep(5); // Success step
    } catch (err: unknown) {
      console.error('Error saving founder data:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-[#0F6E56]" />
      </div>
    );
  }

  if (!user && !userLoading) {
    return (
      <div className="bg-white rounded-3xl p-12 shadow-xl shadow-[#04342C]/5 border border-gray-100 text-center animate-fade-up max-w-lg mx-auto">
        <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-8 text-[#0F6E56]">
          <User size={40} />
        </div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-3xl text-[#04342C] mb-4">
          Please log in to continue
        </h2>
        <p className="text-[#3a6b57] mb-8 max-w-sm mx-auto leading-relaxed">
          You need to be logged in to complete your onboarding and apply to join our elite directory.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sign-in" className="flex-1">
            <Button variant="primary" className="w-full py-4 text-base rounded-xl font-bold">
              Log In
            </Button>
          </Link>
          <Link href="/sign-up" className="flex-1">
            <Button variant="outline" className="w-full py-4 text-base rounded-xl font-bold">
              Join Founivo
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-up max-w-2xl mx-auto px-4">
      {/* Progress Tracker */}
      {step < 5 && (
        <div className="mb-10">
          <div className="flex justify-between items-center relative px-2">
            <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-100 -translate-y-1/2 z-0 rounded-full" />
            <div 
              className="absolute top-1/2 left-0 h-[3px] bg-[#0F6E56] -translate-y-1/2 z-0 transition-all duration-500 rounded-full" 
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-syne font-extrabold text-base transition-all duration-300 border-2 ${
                  step === s 
                    ? 'bg-[#0F6E56] border-[#0F6E56] text-white shadow-lg shadow-[#0F6E56]/20 ring-4 ring-[#0F6E56]/15 scale-110' 
                    : step > s 
                      ? 'bg-[#E1F5EE] border-[#0F6E56]/20 text-[#0F6E56]' 
                      : 'bg-white border-gray-200 text-gray-400'
                }`}
              >
                {step > s ? <Check size={20} strokeWidth={3} /> : s}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs font-bold font-syne tracking-wider text-[#3a6b57] uppercase">
            <span>Basic Info</span>
            <span className="text-center pl-3">Professional</span>
            <span className="text-center pl-5">Socials</span>
            <span>Benefits</span>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-[#04342C]/5 border border-gray-100/80">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-up">
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-xs font-bold mb-3 uppercase tracking-wider">
                Step 1 of 4
              </span>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-2xl text-[#04342C] flex items-center gap-2">
                <User size={24} className="text-[#0F6E56]" /> Tell Us Your Name
              </h2>
              <p className="text-sm text-[#3a6b57] mt-1">Let&apos;s verify your profile name for the public directory.</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#04342C] mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] focus:ring-4 focus:ring-[#0F6E56]/10 outline-none transition-all text-[#04342C] font-semibold placeholder-gray-400 bg-gray-50/30"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-[#04342C] mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed font-medium"
                  value={user?.email || ''}
                  disabled
                />
                <p className="mt-2 text-xs text-gray-400 italic">Email cannot be changed during onboarding.</p>
              </div>

              <Button 
                onClick={nextStep} 
                disabled={!formData.name} 
                className="w-full py-4.5 mt-4 bg-[#0F6E56] text-white hover:bg-[#085041] font-syne font-bold rounded-2xl shadow-lg shadow-[#0F6E56]/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Continue <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-up">
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-xs font-bold mb-3 uppercase tracking-wider">
                Step 2 of 4
              </span>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-2xl text-[#04342C] flex items-center gap-2">
                <Briefcase size={24} className="text-[#0F6E56]" /> Professional Details
              </h2>
              <p className="text-sm text-[#3a6b57] mt-1">Let investors and founders know your current status and expertise.</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#04342C] mb-2">Current Role</label>
                <input 
                  type="text" 
                  placeholder="e.g. CEO & Co-founder, CTO"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] focus:ring-4 focus:ring-[#0F6E56]/10 outline-none transition-all text-[#04342C] font-semibold placeholder-gray-400 bg-gray-50/30"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#04342C] mb-2">Company Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Acme Corp, Founivo"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] focus:ring-4 focus:ring-[#0F6E56]/10 outline-none transition-all text-[#04342C] font-semibold placeholder-gray-400 bg-gray-50/30"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#04342C] mb-2">Industry Category</label>
                <div className="relative">
                  <select 
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] focus:ring-4 focus:ring-[#0F6E56]/10 outline-none transition-all text-[#04342C] font-semibold bg-white cursor-pointer appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="">Select Category</option>
                    <option value="AI">Artificial Intelligence (AI)</option>
                    <option value="SaaS">Software as a Service (SaaS)</option>
                    <option value="Fintech">Fintech</option>
                    <option value="Healthtech">Healthtech</option>
                    <option value="Web3">Web3 / Crypto</option>
                    <option value="E-commerce">E-commerce</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#0F6E56]">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={prevStep} 
                  className="flex-1 py-4.5 border-2 border-gray-100 text-[#3a6b57] font-syne font-bold rounded-2xl hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Back
                </Button>
                <Button 
                  onClick={nextStep} 
                  disabled={!formData.role || !formData.company || !formData.category} 
                  className="flex-[2] py-4.5 bg-[#0F6E56] text-white hover:bg-[#085041] font-syne font-bold rounded-2xl shadow-lg shadow-[#0F6E56]/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Continue <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-up">
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-xs font-bold mb-3 uppercase tracking-wider">
                Step 3 of 4
              </span>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-2xl text-[#04342C] flex items-center gap-2">
                <Globe size={24} className="text-[#0F6E56]" /> Socials & Bio
              </h2>
              <p className="text-sm text-[#3a6b57] mt-1">Provide social links and a short bio so users can trust your profile.</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#04342C] mb-2">Short Bio</label>
                <textarea 
                  placeholder="Introduce yourself, your startup journey, and what value you provide to connections..."
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] focus:ring-4 focus:ring-[#0F6E56]/10 outline-none transition-all text-[#04342C] font-semibold placeholder-gray-400 bg-gray-50/30 min-h-[120px] resize-none"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#04342C] mb-2.5">LinkedIn Profile URL</label>
                <input 
                  type="text" 
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] focus:ring-4 focus:ring-[#0F6E56]/10 outline-none transition-all text-[#04342C] font-semibold placeholder-gray-400 bg-gray-50/30"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#04342C] mb-2.5">Twitter / X URL</label>
                  <input 
                    type="text" 
                    placeholder="https://x.com/username"
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] focus:ring-4 focus:ring-[#0F6E56]/10 outline-none transition-all text-[#04342C] font-semibold placeholder-gray-400 bg-gray-50/30"
                    value={formData.twitter}
                    onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#04342C] mb-2.5">Website URL</label>
                  <input 
                    type="text" 
                    placeholder="https://yourcompany.com"
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] focus:ring-4 focus:ring-[#0F6E56]/10 outline-none transition-all text-[#04342C] font-semibold placeholder-gray-400 bg-gray-50/30"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={prevStep} 
                  className="flex-1 py-4.5 border-2 border-gray-100 text-[#3a6b57] font-syne font-bold rounded-2xl hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Back
                </Button>
                <Button 
                  onClick={nextStep} 
                  disabled={!formData.bio} 
                  className="flex-[2] py-4.5 bg-[#0F6E56] text-white hover:bg-[#085041] font-syne font-bold rounded-2xl shadow-lg shadow-[#0F6E56]/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Continue <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-up">
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-xs font-bold mb-3 uppercase tracking-wider">
                Step 4 of 4
              </span>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-2xl text-[#04342C] flex items-center gap-2">
                <DollarSign size={24} className="text-[#0F6E56]" /> Monetization & Benefits
              </h2>
              <p className="text-sm text-[#3a6b57] mt-1">Review guidelines and verify details to complete your application.</p>
            </div>

            <div className="space-y-6">
              <div className="bg-[#E1F5EE] p-6 rounded-2xl border border-[#9FE1CB]/50">
                <h3 className="font-bold text-[#0F6E56] mb-2 flex items-center gap-2 font-syne text-lg">
                  <Award size={20} /> Monetize Your Network
                </h3>
                <p className="text-[#0F6E56] text-sm leading-relaxed font-medium">
                  As a verified founder on Founivo, you will earn a <strong className="font-extrabold text-[#04342C]">10% commission ($20)</strong> for every $200 connection request you accept and fulfill. We ensure you only receive serious, high-intent messages.
                </p>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl border-2 border-gray-100 hover:border-[#0F6E56]/20 transition-all">
                <div className="flex items-center h-5 mt-1">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded border-gray-300 text-[#0F6E56] focus:ring-[#0F6E56] accent-[#0F6E56] cursor-pointer" 
                    id="terms" 
                    required 
                  />
                </div>
                <label htmlFor="terms" className="text-sm font-semibold text-[#3a6b57] leading-relaxed cursor-pointer select-none">
                  I agree to respond to connection requests within 48 hours and maintain high professional conduct.
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={prevStep} 
                  className="flex-1 py-4.5 border-2 border-gray-100 text-[#3a6b57] font-syne font-bold rounded-2xl hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting} 
                  className="flex-[2] py-4.5 bg-[#0F6E56] text-white hover:bg-[#085041] font-syne font-bold rounded-2xl shadow-lg shadow-[#0F6E56]/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Saving Application...</span>
                  ) : (
                    <span className="flex items-center gap-2">Apply to Directory <Sparkles size={18} /></span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="animate-fade-up text-center py-8">
            <div className="w-24 h-24 bg-[#E1F5EE] text-[#0F6E56] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner ring-8 ring-[#E1F5EE]/50 animate-bounce">
              <CheckCircle2 size={48} />
            </div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-3xl text-[#04342C] mb-4">
              Application Received!
            </h2>
            <p className="text-[#3a6b57] mb-8 max-w-sm mx-auto leading-relaxed">
              We&apos;ll review your founder profile and get back to you within 24 hours. Get ready to join our elite directory.
            </p>
            <div className="max-w-xs mx-auto mb-8 bg-[#F9FBFA] border border-gray-100 rounded-2xl p-4 flex items-center justify-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-[#0F6E56]" />
              <span className="text-sm font-semibold text-[#0F6E56] animate-pulse">Syncing & redirecting...</span>
            </div>
            <button 
              onClick={handleRedirect}
              className="inline-flex items-center justify-center gap-2 px-10 py-4.5 rounded-2xl bg-[#0F6E56] text-white font-syne font-bold hover:bg-[#085041] hover:scale-[1.02] shadow-lg shadow-[#0F6E56]/15 transition-all cursor-pointer"
            >
              Go to Dashboard <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}