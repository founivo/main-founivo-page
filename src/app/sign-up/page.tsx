import { signup, signInWithGoogle, signInWithLinkedIn } from '../auth/actions'
import Link from 'next/link'
import { PageWrapper } from '@/components/shared/PageWrapper'
import Button from '@/components/ui/Button'

export default async function SignupPage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams;

  return (
    <div className="min-h-screen bg-[#f8faf9] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-inter">
      <PageWrapper className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-[#04342C] font-syne tracking-tight">
            Create account
          </h2>
          <p className="mt-2 text-[#3a6b57]">
            Join the Founivo community today
          </p>
        </div>

        <div className="bg-white py-8 px-4 border border-[#d0ede4] sm:rounded-2xl sm:px-10">
          <form action={signup} className="space-y-5">
            {searchParams.error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm font-medium border border-red-100">
                {searchParams.error}
              </div>
            )}
            <div>
              <label htmlFor="full_name" className="block text-sm font-bold text-[#04342C]">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-[#d0ede4] rounded-xl shadow-sm placeholder-[#85b5a0] focus:outline-none focus:ring-[#0F6E56] focus:border-[#0F6E56] sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-[#04342C]">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-[#d0ede4] rounded-xl shadow-sm placeholder-[#85b5a0] focus:outline-none focus:ring-[#0F6E56] focus:border-[#0F6E56] sm:text-sm"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-[#04342C]">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-4 py-3 border border-[#d0ede4] rounded-xl shadow-sm placeholder-[#85b5a0] focus:outline-none focus:ring-[#0F6E56] focus:border-[#0F6E56] sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button type="submit" className="w-full py-4 text-base">
              Get Started
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
