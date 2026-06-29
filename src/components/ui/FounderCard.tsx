// src/components/ui/FounderCard.tsx
import React from 'react';
import Link from 'next/link';
import { CheckCircle, Lock, MapPin, Mail, Phone } from 'lucide-react';
import { CAT_COLORS, CAT_TEXT } from '@/data/constants';
import { Founder } from '@/data/founders';
import { getInitials, maskEmail } from '@/lib/utils';
import Image from 'next/image';

interface FounderCardProps {
  founder: Founder;
  canSeeEmail: boolean;
  canSeeSocial: boolean;
  canSeePhone: boolean;
}

const FounderCard: React.FC<FounderCardProps> = ({ founder, canSeeEmail, canSeeSocial, canSeePhone }) => {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-[#0F6E56]/15 hover:shadow-xl hover:shadow-[#0F6E56]/5 transition-all duration-500">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-[#E1F5EE] flex items-center justify-center font-bold text-base text-[#0F6E56] font-syne flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            {getInitials(founder.name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-syne font-bold text-base text-[#04342C] truncate">{founder.name}</span>
              {founder.verified && (
                <div className="w-5 h-5 rounded-full bg-[#0F6E56] flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={12} color="#fff" />
                </div>
              )}
            </div>
            <div className="text-xs text-[#3a6b57] mt-0.5 truncate">{founder.role} · {founder.company}</div>
            <span 
              className="inline-block text-[10px] px-2.5 py-1 rounded-full mt-2.5 font-bold"
              style={{ 
                backgroundColor: CAT_COLORS[founder.cat] || "#E1F5EE", 
                color: CAT_TEXT[founder.cat] || "#085041" 
              }}
            >
              {founder.cat}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-[#3a6b57] leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
          {founder.bio}
        </p>

        <div className="flex items-center gap-1.5 mb-4 text-[#3a6b57]">
          <MapPin size={13} className="text-[#85b5a0]" />
          <span className="text-xs">{founder.location}</span>
        </div>

        <div className="border-t border-gray-50 pt-4 flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <Mail size={14} className={canSeeEmail ? "text-[#0F6E56]" : "text-[#85b5a0]"} />
            {canSeeEmail ? (
              <span className="text-xs font-semibold text-[#04342C]">{founder.email}</span>
            ) : (
              <span className="text-xs text-[#85b5a0] flex items-center gap-1">
                {maskEmail(founder.email)} <Lock size={10} />
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2.5">
            <Phone size={14} className={canSeePhone ? "text-[#0F6E56]" : "text-[#85b5a0]"} />
            {canSeePhone ? (
              <span className="text-xs font-semibold text-[#04342C]">{founder.phone}</span>
            ) : (
              <span className="text-xs text-[#85b5a0] flex items-center gap-1">
                Pro plan only <Lock size={10} />
              </span>
            )}
          </div>

          {canSeeSocial ? (
            <div className="flex gap-2 flex-wrap pt-1">
              {founder.linkedin && (
                <Link 
                  href={`https://linkedin.com/in/${founder.linkedin}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-1.5 rounded-lg bg-[#E1F5EE] hover:bg-[#b6ead7] transition-colors"
                >
                  <Image src="/icons/linkedin.svg" alt="LinkedIn" width={12} height={12} />
                </Link>
              )}
              {founder.instagram && (
                <Link 
                  href={`https://instagram.com/${founder.instagram.replace('@', '')}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-1.5 rounded-lg bg-[#E1F5EE] hover:bg-[#b6ead7] transition-colors"
                >
                  <Image src="/icons/instagram.svg" alt="Instagram" width={12} height={12} />
                </Link>
              )}
              {founder.twitter && (
                <Link 
                  href={`https://twitter.com/${founder.twitter.replace('@', '')}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-1.5 rounded-lg bg-[#E1F5EE] hover:bg-[#b6ead7] transition-colors"
                >
                  <Image src="/icons/twitter.svg" alt="Twitter" width={12} height={12} />
                </Link>
              )}
              {founder.github && (
                <Link 
                  href={`https://github.com/${founder.github}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-1.5 rounded-lg bg-[#E1F5EE] hover:bg-[#b6ead7] transition-colors"
                >
                  <Image src="/icons/github.svg" alt="GitHub" width={12} height={12} />
                </Link>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 pt-1 text-[#85b5a0]">
              <Lock size={12} />
              <span className="text-xs">
                Socials locked — <Link href="/pricing" className="text-[#0F6E56] hover:underline font-semibold">upgrade</Link>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FounderCard; 