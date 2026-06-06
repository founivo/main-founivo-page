// src/app/auth/signup/page.tsx
import React from 'react';
import Link from 'next/link';
import { PageWrapper } from '@/components/shared/PageWrapper';
import Button from '@/components/ui/Button';

export const metadata = {
  title: "Sign Up - Founivo",
  description: "Create your Founivo account to get access to the verified founder directory.",
};

const SignupPage = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-16">
      <PageWrapper className="max-w-md w-full">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#d0ede4] text-center">
          <h1 className="font-['Syne'] font-extrabold text-3xl text-[#04342C] mb-4">
            Get Started with Founivo
          </h1>
          <p className="text-sm text-[#3a6b57] mb-8">
            Create your account and start connecting with verified founders.
          </p>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="w-full px-4 py-3 border border-[#d0ede4] rounded-lg focus:ring-2 focus:ring-[#0F6E56] focus:border-transparent outline-none text-[#04342C] text-sm"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-[#d0ede4] rounded-lg focus:ring-2 focus:ring-[#0F6E56] focus:border-transparent outline-none text-[#04342C] text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 border border-[#d0ede4] rounded-lg focus:ring-2 focus:ring-[#0F6E56] focus:border-transparent outline-none text-[#04342C] text-sm"
                placeholder="Password"
              />
            </div>
            <p className="text-xs text-[#3a6b57] text-left">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-[#0F6E56] hover:underline">Terms of Service</Link> and{' '}
              <Link href="/privacy" className="text-[#0F6E56] hover:underline">Privacy Policy</Link>.
            </p>
            <Button type="submit" className="w-full px-4 py-3 bg-[#0F6E56] text-white hover:bg-[#0C5A4A]">
              Create Account
            </Button>
          </form>

          <p className="mt-8 text-sm text-[#3a6b57]">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-[#0F6E56] hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </PageWrapper>
    </div>
  );
};

export default SignupPage;