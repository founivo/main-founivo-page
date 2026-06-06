import { PageWrapper } from "@/components/shared/PageWrapper";

export default function TermsPage() {
  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: "'Syne', sans-serif", color: "#04342C" }}>Terms of Service</h1>
        <div className="prose prose-slate max-w-none" style={{ color: "#3a6b57" }}>
          <p className="mb-4">Last updated: June 4, 2026</p>
          <p className="mb-4">By using Founivo, you agree to these terms. Please read them carefully.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: "#04342C" }}>1. Acceptance of Terms</h2>
          <p className="mb-4">By accessing or using our platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: "#04342C" }}>2. Use of License</h2>
          <p className="mb-4">Permission is granted to temporarily access the materials on Founivo for personal, non-commercial transitory viewing only.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: "#04342C" }}>3. Disclaimer</h2>
          <p className="mb-4">The materials on Founivo are provided on an &apos;as is&apos; basis. Founivo makes no warranties, expressed or implied, and hereby disclaims all other warranties.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: "#04342C" }}>4. Limitations</h2>
          <p className="mb-4">In no event shall Founivo or its suppliers be liable for any damages arising out of the use or inability to use the materials on Founivo.</p>
        </div>
      </div>
    </PageWrapper>
  );
}