// src/components/ui/FounderCard.tsx
import React from 'react';
import Link from 'next/link';
import { CheckCircle, Lock, MapPin, Mail, Phone } from 'lucide-react';
import { CAT_COLORS, CAT_TEXT } from '@/data/constants';
import { Founder } from '@/data/founders';
import { getInitials, maskEmail } from '@/lib/utils';
import Image from 'next/image'; // Assuming you might add founder images later if available

interface FounderCardProps {
  founder: Founder;
  canSeeEmail: boolean;
  canSeeSocial: boolean;
  canSeePhone: boolean;
}

const FounderCard: React.FC<FounderCardProps> = ({ founder, canSeeEmail, canSeeSocial, canSeePhone }) => {
  return (
    <div className="card-hover" style={{ borderRadius: 16, border: "1px solid #d0ede4", background: "#fff", overflow: "hidden" }}>
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
          {/* You can add an actual image here if you have them, otherwise use initials */}
          {/* Example with Image:
          {founder.imageUrl ? (
            <Image src={founder.imageUrl} alt={founder.name} width={46} height={46} className="rounded-xl object-cover flex-shrink-0" />
          ) : ( */}
            <div style={{ width: 46, height: 46, borderRadius: 12, background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "#0F6E56", fontFamily: "'Syne',sans-serif", flexShrink: 0 }}>
              {getInitials(founder.name)}
            </div>
          {/* )} */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: "#04342C", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{founder.name}</span>
              {founder.verified && <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#0F6E56", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><CheckCircle size={10} color="#fff" /></div>}
            </div>
            <div style={{ fontSize: 12, color: "#3a6b57", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{founder.role} · {founder.company}</div>
            <span style={{ display: "inline-block", fontSize: 11, padding: "2px 8px", borderRadius: 999, marginTop: 6, background: CAT_COLORS[founder.cat] || "#E1F5EE", color: CAT_TEXT[founder.cat] || "#085041" }}>{founder.cat}</span>
          </div>
        </div>
        <p style={{ fontSize: 12, color: "#3a6b57", lineHeight: 1.6, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{founder.bio}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <MapPin size={12} color="#85b5a0" />
          <span style={{ fontSize: 12, color: "#3a6b57" }}>{founder.location}</span>
        </div>
        <div style={{ borderTop: "1px solid #e8f5ef", paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Mail size={13} color={canSeeEmail ? "#0F6E56" : "#85b5a0"} />
            {canSeeEmail
              ? <span style={{ fontSize: 12, fontWeight: 500, color: "#04342C" }}>{founder.email}</span>
              : <span style={{ fontSize: 12, color: "#85b5a0" }}>{maskEmail(founder.email)} <Lock size={10} /></span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Phone size={13} color={canSeePhone ? "#0F6E56" : "#85b5a0"} />
            {canSeePhone
              ? <span style={{ fontSize: 12, fontWeight: 500, color: "#04342C" }}>{founder.phone}</span>
              : <span style={{ fontSize: 12, color: "#85b5a0" }}>Pro plan only <Lock size={10} /></span>}
          </div>
          {canSeeSocial ? (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", paddingTop: 4 }}>
              {founder.linkedin && <Link href={`https://linkedin.com/in/${founder.linkedin}`} target="_blank" rel="noreferrer" style={{ padding: 6, borderRadius: 8, background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center" }}><Image src="/icons/linkedin.svg" alt="LinkedIn" width={12} height={12} /></Link>} {/* Use actual icons */}
              {founder.instagram && <Link href={`https://instagram.com/${founder.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" style={{ padding: 6, borderRadius: 8, background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center" }}><Image src="/icons/instagram.svg" alt="Instagram" width={12} height={12} /></Link>}
              {founder.twitter && <Link href={`https://twitter.com/${founder.twitter.replace('@', '')}`} target="_blank" rel="noreferrer" style={{ padding: 6, borderRadius: 8, background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center" }}><Image src="/icons/twitter.svg" alt="Twitter" width={12} height={12} /></Link>}
              {founder.github && <Link href={`https://github.com/${founder.github}`} target="_blank" rel="noreferrer" style={{ padding: 6, borderRadius: 8, background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center" }}><Image src="/icons/github.svg" alt="GitHub" width={12} height={12} /></Link>}
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 6, paddingTop: 4 }}>
              <Lock size={12} color="#85b5a0" />
              <span style={{ fontSize: 12, color: "#85b5a0" }}>Socials locked — <Link href="/pricing" style={{ color: "#0F6E56" }}>upgrade</Link></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FounderCard; 