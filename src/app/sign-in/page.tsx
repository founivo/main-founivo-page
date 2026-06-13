import React from 'react';
import Link from 'next/link';
import { login, signInWithGoogle, signInWithLinkedIn } from '@/app/auth/actions';
import { PageWrapper } from '@/components/shared/PageWrapper';
import Button from '@/components/ui/Button';

export const metadata = {
  title: "Login - Founivo",
  description: "Log in to your Founivo account to access the verified founder directory.",
};

export default async function LoginPage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-16">
      <PageWrapper className="max-w-md w-full">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-[#d0ede4] text-center">
          <h1 className="font-['Syne'] font-extrabold text-3xl text-[#04342C] mb-4">
            Welcome Back
          </h1>
          <p className="text-sm text-[#3a6b57] mb-8">
            Log in to continue connecting with founders.
          </p>

          {searchParams.error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg mb-6 text-sm text-left">
              {searchParams.error}
            </div>
          )}

          <form action={login} className="space-y-6">
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
              <Link href="/forgot-password" className="text-sm font-medium text-[#0F6E56] hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full px-4 py-3 bg-[#0F6E56] text-white hover:bg-[#0C5A4A]">
              Log In
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
            <form action={signInWithGoogle} className="w-full">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-[#d0ede4] rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C40.483,35.58,44,30.208,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
                <span className="text-sm font-medium text-[#04342C]">Google</span>
              </button>
            </form>
            <form action={signInWithLinkedIn} className="w-full">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-[#d0ede4] rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
                  <path fill="#0078d4" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"/>
                  <path d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12 c1.521,0,2.458,1.08,2.486,2.499C17,15.888,16.036,17,14.485,17z" fill="#fff"/>
                  <path d="M21,19h5v2.303C26.946,20.022,28.273,19,30.251,19C33.454,19,36,21.481,36,25.839V36h-5V26 c0-2.161-0.928-3.331-2.49-3.331c-1.2,0-1.845,0.806-2.152,1.583C26.241,24.556,26,25.302,26,26.062V36h-5V19z" fill="#fff"/>
                </svg>
                <span className="text-sm font-medium text-[#04342C]">LinkedIn</span>
              </button>
            </form>
          </div>

          <p className="mt-8 text-sm text-[#3a6b57]">
            Don&apos;t have an account?{' '}
            <Link href="/sign-up" className="font-medium text-[#0F6E56] hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </PageWrapper>
    </div>
  );
}
