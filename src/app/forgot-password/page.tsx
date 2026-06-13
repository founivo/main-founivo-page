import React from 'react';
import Link from 'next/link';
import { PageWrapper } from '@/components/shared/PageWrapper';
import Button from '@/components/ui/Button';

export const metadata = {
  title: "Forgot Password - Founivo",
  description: "Reset your Founivo account password.",
};

export default async function ForgotPasswordPage(props: { searchParams: Promise<{ error?: string, message?: string }> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-16">
      <PageWrapper className="max-w-md w-full">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#d0ede4] text-center">
          <h1 className="font-['Syne'] font-extrabold text-3xl text-[#04342C] mb-4">
            Reset Password
          </h1>
          <p className="text-sm text-[#3a6b57] mb-8">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>

          {searchParams.error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg mb-6 text-sm text-left">
              {searchParams.error}
            </div>
          )}

          {searchParams.message && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-2 rounded-lg mb-6 text-sm text-left">
              {searchParams.message}
            </div>
          )}

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
            <Button type="submit" className="w-full px-4 py-3 bg-[#0F6E56] text-white hover:bg-[#0C5A4A]">
              Send Reset Link
            </Button>
          </form>

          <p className="mt-8 text-sm text-[#3a6b57]">
            Remember your password?{' '}
            <Link href="/sign-in" className="font-medium text-[#0F6E56] hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </PageWrapper>
    </div>
  );
}
