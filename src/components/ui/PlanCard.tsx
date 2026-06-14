// src/components/ui/PlanCard.tsx
import React from 'react';
import Link from 'next/link';
import { CheckCircle, Lock } from 'lucide-react';
import { PLANS } from '@/data/constants';
import Button from './Button';

interface PlanCardProps {
  plan: typeof PLANS[0];
}

const PlanCard: React.FC<PlanCardProps> = ({ plan: p }) => {
  return (
    <div key={p.name} className={`relative p-8 rounded-xl border transition-all ${p.highlight ? "border-[#0F6E56] bg-emerald-50/30" : "border-gray-200 bg-white"}`}>
      {p.highlight && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0F6E56] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
          Most Popular
        </div>
      )}
      {!p.highlight && p.name === "Annual" && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E1F5EE] text-[#085041] border border-[#9FE1CB] text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
          Best Value
        </div>
      )}
      
      <div className="mb-8">
        <div className="text-xs font-bold text-[#0F6E56] uppercase tracking-wider mb-2">{p.name}</div>
        <div className="flex items-baseline gap-1">
          <span className="font-syne font-bold text-4xl text-[#04342C]">{p.price}</span>
          <span className="text-sm text-[#3a6b57] font-medium">{p.period}</span>
        </div>
        <div className="text-sm text-[#3a6b57] mt-3 leading-relaxed">{p.desc}</div>
      </div>

      <ul className="space-y-4 mb-8">
        {p.features.map(f => (
          <li key={f} className="flex items-start gap-3 text-sm text-[#04342C] font-medium">
            <CheckCircle size={16} className="text-[#0F6E56] mt-0.5 flex-shrink-0" />
            <span>{f}</span>
          </li>
        ))}
        {p.locked.map(f => (
          <li key={f} className="flex items-start gap-3 text-sm text-gray-400 font-medium">
            <Lock size={16} className="mt-0.5 flex-shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link href="/sign-up" className="w-full">
        <Button 
          variant={p.highlight ? "primary" : "outline"} 
          className="w-full py-3 bg-white"
        >
          {p.cta}
        </Button>
      </Link>
      
      {p.trial && (
        <p className="text-center text-xs text-[#85b5a0] mt-4 font-medium italic">
          7-day free trial included
        </p>
      )}
    </div>
  );
};

export default PlanCard;