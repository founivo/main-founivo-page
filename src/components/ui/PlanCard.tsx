// src/components/ui/PlanCard.tsx
import React from 'react';
import Link from 'next/link';
import { CheckCircle, Lock } from 'lucide-react';
import { PLANS } from '@/data/constants'; // Assuming you import PLANS here if not passed directly

interface PlanCardProps {
  plan: typeof PLANS[0]; // Type of a single plan object
}

const PlanCard: React.FC<PlanCardProps> = ({ plan: p }) => {
  return (
    <div key={p.name} className="card-hover" style={{ borderRadius: 20, border: p.highlight ? "2px solid #0F6E56" : "1px solid #d0ede4", padding: 28, position: "relative", background: p.highlight ? "#f0faf6" : "#fff" }}>
      {p.highlight && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", padding: "4px 16px", borderRadius: 999, fontSize: 12, fontWeight: 600, color: "#fff", background: "#0F6E56", whiteSpace: "nowrap" }}>Most popular</div>}
      {!p.highlight && p.name === "Annual" && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", padding: "4px 16px", borderRadius: 999, fontSize: 12, fontWeight: 600, color: "#085041", background: "#E1F5EE", border: "1px solid #9FE1CB", whiteSpace: "nowrap" }}>Best value</div>}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#0F6E56", marginBottom: 4 }}>{p.name}</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4 }}>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 38, color: "#04342C" }}>{p.price}</span>
          <span style={{ fontSize: 13, color: "#3a6b57", marginBottom: 6 }}>{p.period}</span>
        </div>
        <div style={{ fontSize: 12, color: "#3a6b57", marginTop: 4 }}>{p.desc}</div>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 10 }}>
        {p.features.map(f => (
          <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#04342C" }}>
            <CheckCircle size={15} color="#0F6E56" style={{ marginTop: 1, flexShrink: 0 }} />{f}
          </li>
        ))}
        {p.locked.map(f => (
          <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#85b5a0" }}>
            <Lock size={15} style={{ marginTop: 1, flexShrink: 0 }} />{f}
          </li>
        ))}
      </ul>
      <Link href="/auth/signup" className="w-full">
        <button style={{ width: "100%", padding: "12px 0", borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: "pointer", background: p.highlight ? "#0F6E56" : "transparent", color: p.highlight ? "#fff" : "#0F6E56", border: "1.5px solid #0F6E56" }}>
          {p.cta}
        </button>
      </Link>
      {p.trial && <p style={{ textAlign: "center", fontSize: 12, color: "#85b5a0", marginTop: 10 }}>7-day free trial included</p>}
    </div>
  );
};

export default PlanCard;