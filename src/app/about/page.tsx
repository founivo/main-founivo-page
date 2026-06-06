// src/app/about/page.tsx
import React from 'react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import CTA from '@/components/sections/CTA';
import Image from 'next/image';

export const metadata = {
  title: "About Us - Founivo",
  description: "Learn about Founivo's mission to connect investors, recruiters, and founders with verified contact information.",
};

const AboutPage = () => {
  return (
    <div className="py-20">
      <PageWrapper>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(36px,6vw,60px)", color: "#04342C", lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 20 }}>
            Our Mission: Connecting Innovators.
          </h1>
          <p className="text-lg text-[#3a6b57] max-w-2xl mx-auto">
            At Founivo, we believe in the power of direct connections. We&apos;re building the future of professional networking for the startup ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="font-['Syne'] font-extrabold text-3xl text-[#04342C]">
              The Problem We Solve
            </h2>
            <p className="text-lg text-[#3a6b57] leading-relaxed">
              &quot;So basically, if you&apos;re an investor looking for startups, a recruiter hunting for talent, or a founder wanting to connect with other founders — finding their contact info is a nightmare. You have to search LinkedIn, Google, Instagram one by one and still end up with nothing.&quot;
            </p>
            <p className="text-lg text-[#3a6b57] leading-relaxed">
              &quot;This fragmented and time-consuming process often leads to missed opportunities and wasted effort. We experienced this frustration firsthand, and we knew there had to be a better way.&quot;
            </p>
          </div>
          <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-xl border border-[#d0ede4]">
            {/* Placeholder image for the problem */}
            <Image
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="People networking"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-2xl object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center flex-row-reverse mb-20"> {/* flex-row-reverse for image on right */}
          <div className="space-y-6">
            <h2 className="font-['Syne'] font-extrabold text-3xl text-[#04342C]">
              Founivo: The Solution
            </h2>
            <p className="text-lg text-[#3a6b57] leading-relaxed">
              &quot;Founivo solves that. We have a verified directory of founders across AI, Tech, Health, Finance and more. You search, you find, you contact — instantly.&quot;
            </p>
            <p className="text-lg text-[#3a6b57] leading-relaxed">
              &quot;We&apos;ve built a robust platform that ensures high accuracy and provides direct access to emails, phone numbers, and social media profiles. Our mission is to democratize access to key decision-makers in the startup world, making connections effortless and efficient. Starting at $200 a month.&quot;
            </p>
          </div>
          <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-xl border border-[#d0ede4]">
            {/* Placeholder image for the solution */}
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Team collaborating"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-2xl object-cover"
            />
          </div>
        </div>

        <div className="text-center pt-16">
          <h2 className="font-['Syne'] font-extrabold text-3xl text-[#04342C] mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-[#d0ede4] rounded-xl bg-white shadow-sm">
              <h3 className="font-['Syne'] font-semibold text-xl text-[#04342C] mb-3">Transparency</h3>
              <p className="text-sm text-[#3a6b57]">Clear pricing, honest data sourcing, and open communication are at our core.</p>
            </div>
            <div className="p-6 border border-[#d0ede4] rounded-xl bg-white shadow-sm">
              <h3 className="font-['Syne'] font-semibold text-xl text-[#04342C] mb-3">Accuracy</h3>
              <p className="text-sm text-[#3a6b57]">We verify every piece of information to ensure you get reliable contact details.</p>
            </div>
            <div className="p-6 border border-[#d0ede4] rounded-xl bg-white shadow-sm">
              <h3 className="font-['Syne'] font-semibold text-xl text-[#04342C] mb-3">Efficiency</h3>
              <p className="text-sm text-[#3a6b57]">Save time and instantly connect with the right founders for your next opportunity.</p>
            </div>
          </div>
        </div>
      </PageWrapper>
      <CTA />
    </div>
  );
};

export default AboutPage;