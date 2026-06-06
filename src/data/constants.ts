// src/data/constants.ts

import { Sparkles } from "lucide-react";

export const APP_NAME = "Founivo";
export const APP_LOGO = Sparkles; // Using Lucide icon directly

export const CATS = [
  "All",
  "AI",
  "Tech",
  "Business",
  "Health",
  "Finance",
  "EdTech",
  "ClimateTech",
  "Gaming",
  "Media",
  "Social Impact",
  "E-commerce",
  "Deep Tech",
];

export const PLANS = [
  {
    name: "Starter",
    price: "$200",
    period: "/month",
    desc: "Perfect to start connecting",
    features: [
      "Founder name & category",
      "Email address",
      "All social media accounts",
      "All founder categories",
      "Search & filter founders",
    ],
    locked: ["Phone number"],
    cta: "Get Starter",
    highlight: false,
    trial: true,
  },
  {
    name: "Pro",
    price: "$500",
    period: "/month",
    desc: "Full access to every founder",
    features: [
      "Everything in Starter",
      "Email address",
      "All social media accounts",
      "Phone number unlocked",
      "Priority new founders",
    ],
    locked: [],
    cta: "Get Pro",
    highlight: true,
    trial: false,
  },
  {
    name: "Annual",
    price: "$3,000",
    period: "/year",
    desc: "Best value — save $3,000",
    features: [
      "Everything in Pro",
      "Email + socials + phone",
      "Priority new founders",
      "All future categories",
      "Dedicated support",
    ],
    locked: [],
    cta: "Get Annual",
    highlight: false,
    trial: false,
  },
];

export const CAT_COLORS: Record<string, string> = {
  AI: "#E1F5EE",
  Tech: "#E6F1FB",
  Business: "#FAEEDA",
  Health: "#E1F5EE",
  Finance: "#FAECE7",
  EdTech: "#FAEEDA",
  ClimateTech: "#EAF3DE",
  Gaming: "#EEEDFE",
  Media: "#FAECE7",
  "Social Impact": "#E1F5EE",
  "E-commerce": "#FBEAF0",
  "Deep Tech": "#E6F1FB",
};
export const CAT_TEXT: Record<string, string> = {
  AI: "#085041",
  Tech: "#0C447C",
  Business: "#633806",
  Health: "#085041",
  Finance: "#712B13",
  EdTech: "#854F0B",
  ClimateTech: "#27500A",
  Gaming: "#3C3489",
  Media: "#993C1D",
  "Social Impact": "#085041",
  "E-commerce": "#72243E",
  "Deep Tech": "#185FA5",
};