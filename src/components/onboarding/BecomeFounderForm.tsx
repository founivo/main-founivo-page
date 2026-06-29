'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { ArrowRight, CheckCircle2, User, Globe, Briefcase, Award, DollarSign, Loader2 } from 'lucide-react';
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
        <Loader2 className="w-8 h-8 animate-spin text-[#0F6E56]" />
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
        {/* Progress Bar */}
        <div className="flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
          <div 
            className="absolute top-1/2 left-0 h-0.5 bg-[#0F6E56] -translate-y-1/2 z-0 transition-all duration-300" 
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          />
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                step >= s ? 'bg-[#0F6E56] border-[#0F6E56] text-white' : 'bg-white border-gray-200 text-gray-400'
              }`}
            >
              {step > s ? <CheckCircle2 size={20} /> : s}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-up">
              <h2 className="text-xl font-bold text-[#04342C] mb-6 flex items-center gap-2">
                <User size={20} className="text-[#0F6E56]" /> Basic Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#3a6b57] mb-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0F6E56]/20 focus:border-[#0F6E56]"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3a6b57] mb-1">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                    value={user?.email || ''}
                    disabled
                  />
                  <p className="mt-1 text-xs text-gray-400 italic">Email cannot be changed during onboarding</p>
                </div>
                <Button onClick={nextStep} disabled={!formData.name} className="w-full py-4 mt-4 bg-[#0F6E56] text-white">
                  Continue <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-up">
              <h2 className="text-xl font-bold text-[#04342C] mb-6 flex items-center gap-2">
                <Briefcase size={20} className="text-[#0F6E56]" /> Professional Experience
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#3a6b57] mb-1">Current Role</label>
                  <input 
                    type="text" 
                    placeholder="CEO & Co-founder"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0F6E56]/20 focus:border-[#0F6E56]"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3a6b57] mb-1">Company Name</label>
                  <input 
                    type="text" 
                    placeholder="Acme Corp"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0F6E56]/20 focus:border-[#0F6E56]"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3a6b57] mb-1">Category</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0F6E56]/20 focus:border-[#0F6E56] bg-white"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="">Select Category</option>
                    <option value="AI">Artificial Intelligence</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Fintech">Fintech</option>
                    <option value="Healthtech">Healthtech</option>
                    <option value="Web3">Web3 / Crypto</option>
                    <option value="E-commerce">E-commerce</option>
                  </select>
                </div>
                <div className="flex gap-4 mt-8">
                  <Button onClick={prevStep} className="flex-1 py-4 bg-gray-100 text-gray-600 hover:bg-gray-200">
                    Back
                  </Button>
                  <Button onClick={nextStep} disabled={!formData.role || !formData.company || !formData.category} className="flex-[2] py-4 bg-[#0F6E56] text-white">
                    Next Step <ArrowRight size={18} />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-up">
              <h2 className="text-xl font-bold text-[#04342C] mb-6 flex items-center gap-2">
                <Globe size={20} className="text-[#0F6E56]" /> Profile & Socials
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#3a6b57] mb-1">Short Bio</label>
                  <textarea 
                    placeholder="Tell us about your journey..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0F6E56]/20 focus:border-[#0F6E56] min-h-[120px]"
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#3a6b57] mb-1">LinkedIn URL</label>
                    <input 
                      type="text" 
                      placeholder="linkedin.com/in/..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0F6E56]/20 focus:border-[#0F6E56]"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#3a6b57] mb-1">Twitter URL</label>
                    <input 
                      type="text" 
                      placeholder="twitter.com/..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0F6E56]/20 focus:border-[#0F6E56]"
                      value={formData.twitter}
                      onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  <Button onClick={prevStep} className="flex-1 py-4 bg-gray-100 text-gray-600 hover:bg-gray-200">
                    Back
                  </Button>
                  <Button onClick={nextStep} disabled={!formData.bio} className="flex-[2] py-4 bg-[#0F6E56] text-white">
                    Next Step <ArrowRight size={18} />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-up">
              <h2 className="text-xl font-bold text-[#04342C] mb-6 flex items-center gap-2">
                <DollarSign size={20} className="text-[#0F6E56]" /> Monetization & Benefits
              </h2>
              <div className="bg-[#E1F5EE] p-6 rounded-2xl mb-8 border border-[#9FE1CB]">
                <h3 className="font-bold text-[#0F6E56] mb-2 flex items-center gap-2">
                  <Award size={18} /> Earn while you network
                </h3>
                <p className="text-[#0F6E56] text-sm leading-relaxed">
                  As a verified founder on Founivo, you&apos;ll earn a <strong>10% commission ($20)</strong> for every $200 connection request you fulfill. Simply talk to the user who paid to connect with you.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-[#0F6E56]/30 transition-colors">
                  <input type="checkbox" className="mt-1 accent-[#0F6E56]" id="terms" required />
                  <label htmlFor="terms" className="text-sm text-[#3a6b57] leading-relaxed">
                    I agree to respond to connection requests within 48 hours and maintain professional conduct.
                  </label>
                </div>
                <div className="flex gap-4 mt-8">
                  <Button onClick={prevStep} className="flex-1 py-4 bg-gray-100 text-gray-600 hover:bg-gray-200">
                    Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isSubmitting} 
                    className="flex-[2] py-4 bg-[#0F6E56] text-white"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</span>
                    ) : (
                      <span className="flex items-center gap-2">Apply Now <ArrowRight size={18} /></span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="animate-fade-up text-center py-8">
              <div className="w-20 h-20 bg-[#E1F5EE] text-[#0F6E56] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-bold text-[#04342C] mb-4">Application Received!</h2>
              <p className="text-[#3a6b57] mb-4 max-w-sm mx-auto">
                We&apos;ll review your founder profile and get back to you within 24 hours. Get ready to join our elite directory.
              </p>
              <p className="text-sm text-gray-500 mb-8 animate-pulse">
                Redirecting you to your Founder Dashboard...
              </p>
              <button 
                onClick={handleRedirect}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0F6E56] text-white font-bold hover:bg-[#0c5945] transition-all"
              >
                Go to Dashboard <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
    </div>
  );
}