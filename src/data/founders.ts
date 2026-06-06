// src/data/founders.ts

interface Founder {
  id: number;
  name: string;
  role: string;
  company: string;
  cat: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  instagram: string;
  twitter: string;
  github: string;
  verified: boolean;
  bio: string;
}

export const FOUNDERS: Founder[] = [
  { id:1, name:"Sara Ahmed", role:"CEO & Co-founder", company:"NovaTech AI", cat:"AI", location:"Dubai, UAE", email:"sara@novatech.io", phone:"+1 (415) 555-0101", linkedin:"saraahmed", instagram:"@sara.builds", twitter:"@saraahmed", github:"saraahmed", verified:true, bio:"Building the future of AI infrastructure for enterprise." },
  { id:2, name:"James Obi", role:"CTO", company:"Loopify", cat:"Tech", location:"Lagos, Nigeria", email:"james@loopify.co", phone:"+1 (310) 555-0202", linkedin:"jamesobi", instagram:"", twitter:"@jamesobi", github:"jamesobi", verified:true, bio:"Full-stack founder shipping developer tools at scale." },
  { id:3, name:"Priya Nair", role:"Founder", company:"EduBridge", cat:"EdTech", location:"London, UK", email:"priya@edubridge.io", phone:"+44 7700 900123", linkedin:"priyanair", instagram:"@priya.edu", twitter:"", github:"", verified:true, bio:"Bridging education gaps with adaptive learning tech." },
  { id:4, name:"Marcus Lee", role:"CEO", company:"GreenLoop", cat:"ClimateTech", location:"San Francisco, USA", email:"marcus@greenloop.earth", phone:"+1 (628) 555-0303", linkedin:"marcuslee", instagram:"@marcuslee", twitter:"@marcusgreen", github:"", verified:false, bio:"Climate tech founder on a mission to close the loop." },
  { id:5, name:"Aisha Bello", role:"Co-founder", company:"TradeUp", cat:"Finance", location:"Lagos, Nigeria", email:"aisha@tradeup.co", phone:"+234 801 555 0404", linkedin:"aishabello", instagram:"@aisha.bello", twitter:"@aishabello", github:"", verified:true, bio:"Democratising access to financial markets in Africa." },
  { id:6, name:"Carlos Reyes", role:"Founder & CEO", company:"CartNova", cat:"E-commerce", location:"Mexico City, Mexico", email:"carlos@cartnova.com", phone:"+52 55 5555 0505", linkedin:"carlosreyes", instagram:"@carlosreyes", twitter:"", github:"carlosreyes", verified:true, bio:"E-commerce infrastructure for the next billion sellers." },
  { id:7, name:"Lena Müller", role:"CEO", company:"BioGenX", cat:"Health", location:"Berlin, Germany", email:"lena@biogenx.de", phone:"+49 30 555 0606", linkedin:"lenamuller", instagram:"", twitter:"@lenamuller", github:"", verified:false, bio:"Bringing precision medicine to everyday healthcare." },
  { id:8, name:"David Kim", role:"Co-founder", company:"PixelForge", cat:"Gaming", location:"Seoul, South Korea", email:"david@pixelforge.io", phone:"+82 2 555 0707", linkedin:"davidkim", instagram:"@david.games", twitter:"@davidkim", github:"davidkim", verified:true, bio:"Crafting immersive gaming experiences with 50M+ players." },
  { id:9, name:"Fatima Hassan", role:"Founder", company:"ImpactNow", cat:"Social Impact", location:"Dubai, UAE", email:"fatima@impactnow.org", phone:"+971 50 555 0808", linkedin:"fatimahassan", instagram:"@fatimahassan", twitter:"@fatima_impact", github:"", verified:true, bio:"Using tech to solve the world's most pressing problems." },
  { id:10, name:"Raj Patel", role:"CTO & Co-founder", company:"QuantumBit", cat:"Deep Tech", location:"Bangalore, India", email:"raj@quantumbit.io", phone:"+91 98765 43210", linkedin:"rajpatel", instagram:"", twitter:"@rajpatel", github:"rajpatel", verified:true, bio:"Quantum computing for the post-silicon era." },
  { id:11, name:"Sophia Chen", role:"CEO", company:"ContentWave", cat:"Media", location:"Los Angeles, USA", email:"sophia@contentwave.co", phone:"+1 (213) 555-0909", linkedin:"sophiachen", instagram:"@sophia.creates", twitter:"@sophiachen", github:"", verified:false, bio:"Reinventing how creators monetise their audiences." },
  { id:12, name:"Omar Farouq", role:"Founder", company:"SmartBiz", cat:"Business", location:"Karachi, Pakistan", email:"omar@smartbiz.ae", phone:"+971 55 555 1010", linkedin:"omarfarouq", instagram:"@omar.biz", twitter:"@omarfarouq", github:"", verified:true, bio:"Building SME software for emerging markets." },
];

export type { Founder };