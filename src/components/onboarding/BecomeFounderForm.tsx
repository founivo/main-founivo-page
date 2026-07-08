'use client';

import React, { useState, useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';
import { 
  ArrowRight, CheckCircle2, User, Globe, Briefcase, Award, 
  DollarSign, Loader2, Check, Sparkles, Camera, Plus, Trash2, Clock, Star, Building
} from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { createClient } from '@/utils/supabase/client';
import { getFounderDashboardUrl } from '@/lib/config';

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80";
const DEFAULT_LOGO = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=256&q=80";

export default function BecomeFounderForm() {
  const { user, profile, loading: userLoading } = useUser();
  const supabase = createClient();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hidden File input references
  const personalFileRef = useRef<HTMLInputElement>(null);
  const startupFileRef = useRef<HTMLInputElement>(null);

  // Form Fields State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [personalPhoto, setPersonalPhoto] = useState(DEFAULT_AVATAR);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkillText, setNewSkillText] = useState('');

  // Consultation Rates
  const [fees30m, setFees30m] = useState('30');
  const [fees1h, setFees1h] = useState('60');
  const [feesCustomMin, setFeesCustomMin] = useState('20');
  const [feesCustomVal, setFeesCustomVal] = useState('25');

  // Startup Fields
  const [startupName, setStartupName] = useState('');
  const [startupStage, setStartupStage] = useState('Seed');
  const [category, setCategory] = useState('');
  const [startupLocation, setStartupLocation] = useState('');
  const [startupTeamSize, setStartupTeamSize] = '1-5';
  const [startupTeamSizeVal, setStartupTeamSizeVal] = useState('1-5');
  const [startupFunding, setStartupFunding] = useState('');
  const [startupBio, setStartupBio] = useState('');
  const [startupLogo, setStartupLogo] = useState(DEFAULT_LOGO);

  // Social Links
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [website, setWebsite] = useState('');

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (profile?.full_name && !hasInitialized.current) {
      setName(profile.full_name || '');
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'personal' | 'startup') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image is too large. Please select an image under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        const MAX_WIDTH = 180;
        const MAX_HEIGHT = 180;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        if (type === "personal") {
          setPersonalPhoto(dataUrl);
        } else {
          setStartupLogo(dataUrl);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const addSkill = () => {
    if (newSkillText.trim() && !skills.includes(newSkillText.trim())) {
      setSkills([...skills, newSkillText.trim()]);
      setNewSkillText('');
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Update general profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          role: 'founder',
          onboarding_completed: true,
          full_name: name
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // 2. Package metadata
      const updatedMetadata = {
        personal_photo: personalPhoto,
        startup_logo: startupLogo,
        fees_30m: fees30m,
        fees_1h: fees1h,
        fees_custom_min: feesCustomMin,
        fees_custom_val: feesCustomVal,
        skills,
        startup_name: startupName,
        startup_role: role,
        startup_stage: startupStage,
        startup_category: category,
        startup_location: startupLocation,
        startup_team_size: startupTeamSizeVal,
        startup_funding: startupFunding,
        startup_bio: startupBio,
        startup_linkedin: linkedin,
        startup_twitter: twitter,
        startup_website: website
      };

      // 3. Serialize metadata to bio column
      const marker = "\n\n---METADATA---\n";
      const serializedBio = bio + marker + JSON.stringify(updatedMetadata);

      // 4. Create/Upsert founder_profiles entry
      const { error: founderError } = await supabase
        .from('founder_profiles')
        .upsert({
          id: user.id,
          full_name: name,
          role: role,
          company: startupName,
          category: category,
          bio: serializedBio,
          linkedin: linkedin,
          twitter: twitter,
          website: website,
          status: 'pending'
        });

      if (founderError) throw founderError;

      setStep(5); // Success redirect step
    } catch (err: any) {
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
      
      {/* Hidden File Upload Triggers */}
      <input type="file" ref={personalFileRef} style={{ display: 'none' }} accept="image/*" onChange={(e) => handleImageChange(e, 'personal')} />
      <input type="file" ref={startupFileRef} style={{ display: 'none' }} accept="image/*" onChange={(e) => handleImageChange(e, 'startup')} />

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
          <div className="flex justify-between mt-3 text-[11px] font-extrabold font-syne tracking-wider text-[#3a6b57] uppercase">
            <span>Identity</span>
            <span className="text-center pl-3">Startup Info</span>
            <span className="text-center pl-5">Rates & Socials</span>
            <span>Verify</span>
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

        {/* STEP 1: FOUNDER IDENTITY */}
        {step === 1 && (
          <div className="animate-fade-up">
            <div className="mb-8 text-center flex flex-col items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-xs font-bold mb-4 uppercase tracking-wider">
                Step 1 of 4: Founder Identity
              </span>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-2xl text-[#04342C]">
                Tell Us About Yourself
              </h2>
              <p className="text-sm text-[#3a6b57] mt-1">Let&apos;s build your dynamic founder personal profile.</p>
            </div>
            
            <div className="space-y-6">
              
              {/* Circular Avatar Upload */}
              <div className="flex flex-col items-center gap-3 mb-4">
                <div 
                  onClick={() => personalFileRef.current?.click()}
                  className="relative w-24 h-24 rounded-full border-4 border-white shadow-md bg-gray-50 flex items-center justify-center cursor-pointer group overflow-hidden"
                >
                  <img src={personalPhoto} alt="Personal Photo" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Camera size={18} />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => personalFileRef.current?.click()}
                    className="text-xs font-bold text-[#0F6E56] hover:underline"
                  >
                    Upload Avatar
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setPersonalPhoto(DEFAULT_AVATAR)}
                    className="text-xs font-bold text-gray-400 hover:underline"
                  >
                    Skip / Default
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#04342C] mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] focus:ring-4 focus:ring-[#0F6E56]/10 outline-none transition-all text-[#04342C] font-semibold bg-gray-50/30"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#04342C] mb-2">Founder Role</label>
                <input 
                  type="text" 
                  placeholder="e.g. CEO & Co-founder, CTO"
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] focus:ring-4 focus:ring-[#0F6E56]/10 outline-none transition-all text-[#04342C] font-semibold bg-gray-50/30"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#04342C] mb-2">Personal Bio</label>
                <textarea 
                  placeholder="Provide details about your expertise, background, achievements, and what value you provide to connections..."
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] focus:ring-4 focus:ring-[#0F6E56]/10 outline-none transition-all text-[#04342C] font-semibold bg-gray-50/30 min-h-[100px] resize-none"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <Button 
                onClick={nextStep} 
                disabled={!name || !role || !bio} 
                className="w-full py-4.5 mt-4 bg-[#0F6E56] text-white hover:bg-[#085041] font-syne font-bold rounded-2xl shadow-lg shadow-[#0F6E56]/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Continue to Startup Info <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: STARTUP DETAILS */}
        {step === 2 && (
          <div className="animate-fade-up">
            <div className="mb-8 text-center flex flex-col items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-xs font-bold mb-4 uppercase tracking-wider">
                Step 2 of 4: Startup snapshot
              </span>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-2xl text-[#04342C] flex items-center gap-2">
                <Building size={22} className="text-[#0F6E56]" /> Tell Us About Your Startup
              </h2>
              <p className="text-sm text-[#3a6b57] mt-1">Let connections review your startup stage, headquarters and metrics.</p>
            </div>

            <div className="space-y-6">
              
              {/* Circular Company Logo Upload */}
              <div className="flex flex-col items-center gap-3 mb-4">
                <div 
                  onClick={() => startupFileRef.current?.click()}
                  className="relative w-20 h-20 rounded-2xl border-2 border-gray-100 bg-gray-50 flex items-center justify-center cursor-pointer group overflow-hidden"
                >
                  <img src={startupLogo} alt="Startup Logo" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Camera size={16} />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => startupFileRef.current?.click()}
                    className="text-xs font-bold text-[#0F6E56] hover:underline"
                  >
                    Upload Logo
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setStartupLogo(DEFAULT_LOGO)}
                    className="text-xs font-bold text-gray-400 hover:underline"
                  >
                    Skip / Default
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#04342C] mb-2">Startup / Company Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. NovaTech AI"
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] outline-none text-[#04342C] font-semibold bg-gray-50/30"
                    value={startupName}
                    onChange={(e) => setStartupName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#04342C] mb-2">Industry Category</label>
                  <select 
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] outline-none text-[#04342C] font-semibold bg-white cursor-pointer"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="AI / ML">Artificial Intelligence (AI / ML)</option>
                    <option value="SaaS">Software as a Service (SaaS)</option>
                    <option value="Fintech">Fintech</option>
                    <option value="Healthtech">Healthtech</option>
                    <option value="Web3 / DeFi">Web3 / DeFi</option>
                    <option value="E-commerce">E-commerce</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#04342C] mb-2">Funding Stage</label>
                  <select 
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] outline-none text-[#04342C] font-semibold bg-white cursor-pointer"
                    value={startupStage}
                    onChange={(e) => setStartupStage(e.target.value)}
                  >
                    <option value="Pre-seed">Pre-seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A">Series A</option>
                    <option value="Series B">Series B</option>
                    <option value="Bootstrapped">Bootstrapped</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#04342C] mb-2">Headquarters Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. San Francisco, CA"
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] outline-none text-[#04342C] font-semibold bg-gray-50/30"
                    value={startupLocation}
                    onChange={(e) => setStartupLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#04342C] mb-2">Team Size</label>
                  <select 
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] outline-none text-[#04342C] font-semibold bg-white cursor-pointer"
                    value={startupTeamSizeVal}
                    onChange={(e) => setStartupTeamSizeVal(e.target.value)}
                  >
                    <option value="1-5">1-5 Employees</option>
                    <option value="5-10">5-10 Employees</option>
                    <option value="11-50">11-50 Employees</option>
                    <option value="50+">50+ Employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#04342C] mb-2">Total Funding Raised</label>
                  <input 
                    type="text" 
                    placeholder="e.g. $500K, $2M, Bootstrapped"
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] outline-none text-[#04342C] font-semibold bg-gray-50/30"
                    value={startupFunding}
                    onChange={(e) => setStartupFunding(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#04342C] mb-2">Startup Bio & Vision</label>
                <textarea 
                  placeholder="Summarize your company vision, product value proposition, and customer base..."
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] focus:ring-4 focus:ring-[#0F6E56]/10 outline-none transition-all text-[#04342C] font-semibold bg-gray-50/30 min-h-[100px] resize-none"
                  value={startupBio}
                  onChange={(e) => setStartupBio(e.target.value)}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={prevStep} 
                  className="flex-1 py-4 border-2 border-gray-100 text-[#3a6b57] font-syne font-bold rounded-2xl hover:bg-gray-50 cursor-pointer"
                >
                  Back
                </Button>
                <Button 
                  onClick={nextStep} 
                  disabled={!startupName || !category || !startupLocation || !startupBio}
                  className="flex-[2] py-4 bg-[#0F6E56] text-white hover:bg-[#085041] font-syne font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Continue to Rates & Socials <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: CONSULTATION RATES, SOCIALS & SKILLS */}
        {step === 3 && (
          <div className="animate-fade-up">
            <div className="mb-8 text-center flex flex-col items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-xs font-bold mb-4 uppercase tracking-wider">
                Step 3 of 4: Profile Details
              </span>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-2xl text-[#04342C] flex items-center gap-2">
                <Clock size={22} className="text-[#0F6E56]" /> Rates, Socials & Expertise
              </h2>
              <p className="text-sm text-[#3a6b57] mt-1">Provide social connections and setup your video call hourly consultation fees.</p>
            </div>

            <div className="space-y-6">
              
              {/* Consultation Rates inputs */}
              <div className="p-5 border-2 border-gray-100 rounded-3xl bg-gray-50/20">
                <h3 className="text-sm font-bold text-[#04342C] mb-4 flex items-center gap-2">
                  <DollarSign size={16} className="text-[#0F6E56]" /> Consultation Fees ($)
                </h3>
                
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 mb-1">30 Mins ($)</label>
                    <input 
                      type="number"
                      className="w-full px-3 py-2 border-2 border-gray-100 focus:border-[#0F6E56] rounded-xl text-sm font-semibold"
                      value={fees30m}
                      onChange={e => setFees30m(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 mb-1">1 Hour ($)</label>
                    <input 
                      type="number"
                      className="w-full px-3 py-2 border-2 border-gray-100 focus:border-[#0F6E56] rounded-xl text-sm font-semibold"
                      value={fees1h}
                      onChange={e => setFees1h(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 mb-1">Min</label>
                      <input 
                        type="number"
                        className="w-full px-2 py-2 border-2 border-gray-100 focus:border-[#0F6E56] rounded-xl text-sm font-semibold text-center"
                        value={feesCustomMin}
                        onChange={e => setFeesCustomMin(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 mb-1">Fee ($)</label>
                      <input 
                        type="number"
                        className="w-full px-2 py-2 border-2 border-gray-100 focus:border-[#0F6E56] rounded-xl text-sm font-semibold"
                        value={feesCustomVal}
                        onChange={e => setFeesCustomVal(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Tag input */}
              <div className="p-5 border-2 border-gray-100 rounded-3xl">
                <label className="block text-sm font-bold text-[#04342C] mb-2 flex items-center gap-1.5">
                  <Star size={15} className="text-[#0F6E56]" /> Expertise & Skills tags
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {skills.map((skill, index) => (
                    <span key={index} className="inline-flex items-center gap-1 bg-[#E1F5EE] border border-[#0F6E56]/15 text-[#0F6E56] px-3 py-1 rounded-full text-xs font-bold">
                      {skill}
                      <button type="button" onClick={() => removeSkill(index)} className="text-xs hover:text-red-500 font-extrabold">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 max-w-sm">
                  <input 
                    type="text" 
                    placeholder="e.g. SaaS, Product Pitching" 
                    className="flex-1 px-3 py-2 border-2 border-gray-100 focus:border-[#0F6E56] rounded-xl text-sm font-medium"
                    value={newSkillText}
                    onChange={e => setNewSkillText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <button type="button" onClick={addSkill} className="px-4 bg-[#E1F5EE] text-[#0F6E56] rounded-xl font-bold text-xs hover:bg-[#cbeee2] flex items-center gap-1">
                    <Plus size={12} /> Add
                  </button>
                </div>
              </div>

              {/* Social Links inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-[#04342C] mb-2 flex items-center gap-1.5"><Globe size={15} className="text-[#0F6E56]" /> LinkedIn profile url</label>
                  <input 
                    type="text" 
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] outline-none text-[#04342C] font-semibold bg-gray-50/30"
                    value={linkedin}
                    onChange={e => setLinkedin(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[#04342C] mb-2">Twitter / X username</label>
                    <input 
                      type="text" 
                      placeholder="e.g. @handle"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] outline-none text-[#04342C] font-semibold bg-gray-50/30"
                      value={twitter}
                      onChange={e => setTwitter(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#04342C] mb-2">Company Website / Portfolio</label>
                    <input 
                      type="text" 
                      placeholder="website.com"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-[#0F6E56] outline-none text-[#04342C] font-semibold bg-gray-50/30"
                      value={website}
                      onChange={e => setWebsite(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={prevStep} 
                  className="flex-1 py-4 border-2 border-gray-100 text-[#3a6b57] font-syne font-bold rounded-2xl hover:bg-gray-50 cursor-pointer"
                >
                  Back
                </Button>
                <Button 
                  onClick={nextStep} 
                  disabled={skills.length === 0 || !linkedin} 
                  className="flex-[2] py-4 bg-[#0F6E56] text-white hover:bg-[#085041] font-syne font-bold rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Continue to Guidelines <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: GUIDELINES & TERMS */}
        {step === 4 && (
          <div className="animate-fade-up">
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E1F5EE] text-[#0F6E56] text-xs font-bold mb-3 uppercase tracking-wider">
                Step 4 of 4: Agreement
              </span>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-2xl text-[#04342C] flex items-center gap-2">
                <Award size={24} className="text-[#0F6E56]" /> Monetization Guidelines
              </h2>
              <p className="text-sm text-[#3a6b57] mt-1">Review guidelines and verify details to complete your application.</p>
            </div>

            <div className="space-y-6">
              <div className="bg-[#E1F5EE] p-6 rounded-2xl border border-[#9FE1CB]/50">
                <h3 className="font-bold text-[#0F6E56] mb-2 flex items-center gap-2 font-syne text-lg">
                  <Award size={20} /> Verified Networking
                </h3>
                <p className="text-[#0F6E56] text-sm leading-relaxed font-medium">
                  As a verified founder on Founivo, users will book paid consultations based on the rates you set. We ensure only high-intent, serious calls reach your calendar. Founivo processes secure payments and routes payouts directly.
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
                  I agree to respond to consultation requests within 48 hours and maintain high professional conduct.
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
                    <span className="flex items-center gap-2">Apply to Directory & Complete <Sparkles size={18} /></span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: SUCCESS REDIRECT */}
        {step === 5 && (
          <div className="animate-fade-up text-center py-8">
            <div className="w-24 h-24 bg-[#E1F5EE] text-[#0F6E56] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner ring-8 ring-[#E1F5EE]/50 animate-bounce">
              <CheckCircle2 size={48} />
            </div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }} className="text-3xl text-[#04342C] mb-4">
              Profile Setup Completed!
            </h2>
            <p className="text-[#3a6b57] mb-8 max-w-sm mx-auto leading-relaxed">
              Your founder dashboard is ready. All your personal, company profile details and video rates are now active.
            </p>
            <div className="max-w-xs mx-auto mb-8 bg-[#F9FBFA] border border-gray-100 rounded-2xl p-4 flex items-center justify-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-[#0F6E56]" />
              <span className="text-sm font-semibold text-[#0F6E56] animate-pulse">Routing to founder dashboard...</span>
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