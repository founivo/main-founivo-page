'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { ArrowRight, CheckCircle2, User, Search, Target, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function FindFounderForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industry: '',
    location: '',
    purpose: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4); // Success step
  };

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
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0F6E56]/20 focus:border-[#0F6E56]"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <Button onClick={nextStep} className="w-full py-4 mt-4 bg-[#0F6E56] text-white">
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
                  <Button onClick={handleSubmit} disabled={!formData.purpose} className="flex-[2] py-4 bg-[#0F6E56] text-white">
                    Find Founders <Search size={18} />
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
              <p className="text-[#3a6b57] mb-8 max-w-sm mx-auto">
                Based on your profile, we&apos;ve curated a list of founders that match your interests.
              </p>
              <Link href="/#directory">
                <Button className="px-8 py-4 bg-[#0F6E56] text-white">
                  Go to Directory <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          )}
        </div>
    </div>
  );
}