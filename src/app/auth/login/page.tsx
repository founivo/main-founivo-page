// src/app/auth/login/page.tsx
import React from 'react';
import Link from 'next/link';
import { PageWrapper } from '@/components/shared/PageWrapper';
import Button from '@/components/ui/Button';

export const metadata = {
  title: "Login - Founivo",
  description: "Log in to your Founivo account to access the verified founder directory.",
};

const LoginPage = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-16"> {/* Adjust min-height based on Navbar/Footer height */}
      <PageWrapper className="max-w-md w-full">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#d0ede4] text-center">
          <h1 className="font-['Syne'] font-extrabold text-3xl text-[#04342C] mb-4">
            Welcome Back
          </h1>
          <p className="text-sm text-[#3a6b57] mb-8">
            Log in to continue connecting with founders.
          </p>

          <form className="space-y-6">
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
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 border border-[#d0ede4] rounded-lg focus:ring-2 focus:ring-[#0F6E56] focus:border-transparent outline-none text-[#04342C] text-sm"
                placeholder="Password"
              />
            </div>
            <div className="text-right">
              <Link href="/auth/forgot-password" className="text-sm font-medium text-[#0F6E56] hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full px-4 py-3 bg-[#0F6E56] text-white hover:bg-[#0C5A4A]">
              Log In
            </Button>
          </form>

          <p className="mt-8 text-sm text-[#3a6b57]">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="font-medium text-[#0F6E56] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </PageWrapper>
    </div>
  );
};

export default LoginPage;