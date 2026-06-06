import { PageWrapper } from "@/components/shared/PageWrapper";

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: "'Syne', sans-serif", color: "#04342C" }}>Privacy Policy</h1>
        <div className="prose prose-slate max-w-none" style={{ color: "#3a6b57" }}>
          <p className="mb-4">Last updated: June 4, 2026</p>
          <p className="mb-4">At Founivo, we take your privacy seriously. This policy describes how we collect, use, and handle your personal information when you use our services.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: "#04342C" }}>1. Information We Collect</h2>
          <p className="mb-4">We collect information you provide directly to us when you create an account, fill out your founder profile, or communicate with us.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: "#04342C" }}>2. How We Use Information</h2>
          <p className="mb-4">We use the information we collect to provide, maintain, and improve our services, and to connect founders with investors and partners.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: "#04342C" }}>3. Sharing of Information</h2>
          <p className="mb-4">We share your profile information with other verified users of the platform according to your account settings.</p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: "#04342C" }}>4. Your Choices</h2>
          <p className="mb-4">You can update your profile information and account settings at any time by logging into your account.</p>
        </div>
      </div>
    </PageWrapper>
  );
}