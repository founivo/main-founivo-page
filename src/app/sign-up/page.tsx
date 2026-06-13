import React from 'react';
import Link from 'next/link';
import { signup, signInWithGoogle, signInWithLinkedIn } from '@/app/auth/actions';
import { PageWrapper } from '@/components/shared/PageWrapper';
import Button from '@/components/ui/Button';

export const metadata = {
  title: "Sign Up - Founivo",
  description: "Create your Founivo account to get access to the verified founder directory.",
};

export default async function SignupPage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams;
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

          {searchParams.error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg mb-6 text-sm text-left">
              {searchParams.error}
            </div>
          )}

          <form action={signup} className="space-y-6">
            <div>
              <label htmlFor="full_name" className="sr-only">Full Name</label>
              <input
                id="full_name"
                name="full_name"
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
            
            <div className="text-left">
              <label className="block text-sm font-medium text-[#04342C] mb-2">I am a:</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="role" value="user" defaultChecked className="text-[#0F6E56] focus:ring-[#0F6E56]" />
                  <span className="text-sm text-[#3a6b57]">Investor/User</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="role" value="founder" className="text-[#0F6E56] focus:ring-[#0F6E56]" />
                  <span className="text-sm text-[#3a6b57]">Founder</span>
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full px-4 py-3 bg-[#0F6E56] text-white hover:bg-[#0C5A4A]">
              Create Account
            </Button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#d0ede4]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[#3a6b57]">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <form action={signInWithGoogle}>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 border border-[#d0ede4] rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-[#04342C]">Google</span>
              </button>
            </form>
            <form action={signInWithLinkedIn}>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 border border-[#d0ede4] rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-[#04342C]">LinkedIn</span>
              </button>
            </form>
          </div>

          <p className="mt-8 text-sm text-[#3a6b57]">
            Already have an account?{' '}
            <Link href="/sign-in" className="font-medium text-[#0F6E56] hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </PageWrapper>
    </div>
  );
}
