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
    <div
      className={`relative p-8 rounded-[2rem] border-2 transition-all duration-500 h-full flex flex-col ${
        p.highlight
          ? "border-[#0F6E56] bg-white shadow-2xl shadow-[#0F6E56]/10 scale-[1.02] md:scale-105"
          : "border-gray-100 bg-white hover:border-[#0F6E56]/20 hover:shadow-xl hover:shadow-[#0F6E56]/5"
      }`}
    >
      {/* Badge */}
      {p.highlight && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0F6E56] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-1.5 rounded-full whitespace-nowrap shadow-lg">
          Most Popular
        </div>
      )}
      {!p.highlight && p.name === "Annual" && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E1F5EE] text-[#085041] border border-[#b6ead7] text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-1.5 rounded-full whitespace-nowrap">
          Best Value
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-bold text-[#0F6E56] uppercase tracking-[0.15em] mb-2">{p.name}</div>
        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="font-syne font-black text-5xl text-[#04342C]">{p.price}</span>
          <span className="text-sm text-[#3a6b57] font-medium">{p.period}</span>
        </div>
        <div className="text-sm text-[#3a6b57] leading-relaxed">{p.desc}</div>
      </div>

      {/* Features */}
      <ul className="space-y-3.5 mb-8 flex-1">
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

      {/* CTA */}
      <Link href="/sign-up" className="w-full">
        <Button
          variant={p.highlight ? "primary" : "outline"}
          className={`w-full py-3.5 text-sm font-bold ${
            p.highlight
              ? "shadow-lg shadow-[#0F6E56]/25"
              : "bg-white border-gray-200 hover:border-[#0F6E56]/30"
          }`}
        >
          {p.cta}
        </Button>
      </Link>

      {p.trial && (
        <p className="text-center text-xs text-[#85b5a0] mt-4 font-medium">
          7-day free trial included
        </p>
      )}
    </div>
  );
};

export default PlanCard;
