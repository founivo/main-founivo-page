'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { ArrowRight, CheckCircle2, User, Search, Target, Briefcase, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { createClient } from '@/utils/supabase/client';
import { getUserDashboardUrl } from '@/lib/config';

export default function FindFounderForm() {
  const { user, profile, loading: userLoading } = useUser();
  const supabase = createClient();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    location: '',
    purpose: '',
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
    const baseUrl = getUserDashboardUrl();
    if (session) {
      window.location.href = `${baseUrl}?access_token=${session.access_token}&refresh_token=${session.refresh_token}`;
    } else {
      window.location.href = baseUrl;
    }
  };

  useEffect(() => {
    if (step === 4) {
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
          role: 'user',
          onboarding_completed: true,
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // 2. Insert preferences
      const { error: prefError } = await supabase
        .from('user_preferences')
        .upsert({
          id: user.id,
          industry: formData.industry,
          location: formData.location,
          purpose: formData.purpose,
        });

      if (prefError) throw prefError;

      setStep(4); // Success step
    } catch (err: unknown) {
      console.error('Error saving onboarding data:', err);
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

  if (!user && !userLoading) {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center animate-fade-up">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
          <User size={40} />
        </div>
        <h2 className="text-2xl font-bold text-[#04342C] mb-4">Please log in to continue</h2>
        <p className="text-[#3a6b57] mb-8 max-w-sm mx-auto">
          You need to be logged in to complete your onboarding and access the founder directory.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sign-in">
            <Button variant="primary" className="w-full sm:w-auto px-8 py-4">
              Log In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="outline" className="w-full sm:w-auto px-8 py-4">
              Join Founivo
            </Button>
          </Link>
        </div>
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
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
          {[1, 2, 3].map((s) => (
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
                    placeholder="John Doe"
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
                <Briefcase size={20} className="text-[#0F6E56]" /> What are you looking for?
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#3a6b57] mb-1">Preferred Industry</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0F6E56]/20 focus:border-[#0F6E56] bg-white"
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  >
                    <option value="">Any Industry</option>
                    <option value="AI">Artificial Intelligence</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Fintech">Fintech</option>
                    <option value="Healthtech">Healthtech</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3a6b57] mb-1">Location Preference</label>
                  <input 
                    type="text" 
                    placeholder="e.g. San Francisco, Remote"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0F6E56]/20 focus:border-[#0F6E56]"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
                <div className="flex gap-4 mt-8">
                  <Button onClick={prevStep} className="flex-1 py-4 bg-gray-100 text-gray-600 hover:bg-gray-200">
                    Back
                  </Button>
                  <Button onClick={nextStep} className="flex-[2] py-4 bg-[#0F6E56] text-white">
                    Next Step <ArrowRight size={18} />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-up">
              <h2 className="text-xl font-bold text-[#04342C] mb-6 flex items-center gap-2">
                <Target size={20} className="text-[#0F6E56]" /> Primary Goal
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-3">
                  {['Investment Opportunity', 'Partnership/Co-founder', 'Hiring talent', 'Market Research', 'Networking'].map((goal) => (
                    <button
                      key={goal}
                      onClick={() => setFormData({...formData, purpose: goal})}
                      className={`text-left px-6 py-4 rounded-xl border-2 transition-all ${
                        formData.purpose === goal ? 'border-[#0F6E56] bg-[#0F6E56]/5' : 'border-gray-100 hover:border-gray-200'
                      }`}
                    >
                      <span className={`font-semibold ${formData.purpose === goal ? 'text-[#0F6E56]' : 'text-[#04342C]'}`}>{goal}</span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-4 mt-8">
                  <Button onClick={prevStep} className="flex-1 py-4 bg-gray-100 text-gray-600 hover:bg-gray-200">
                    Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!formData.purpose || isSubmitting} 
                    className="flex-[2] py-4 bg-[#0F6E56] text-white"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Saving...</span>
                    ) : (
                      <span className="flex items-center gap-2">Find Founders <Search size={18} /></span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-fade-up text-center py-8">
              <div className="w-20 h-20 bg-[#E1F5EE] text-[#0F6E56] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-bold text-[#04342C] mb-4">You&apos;re all set!</h2>
              <p className="text-[#3a6b57] mb-4 max-w-sm mx-auto">
                Based on your profile, we&apos;ve curated a list of founders that match your interests.
              </p>
              <p className="text-sm text-gray-500 mb-8 animate-pulse">
                Redirecting you to your User Dashboard...
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