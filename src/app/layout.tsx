// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google"; // Import fonts
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { createClient } from "@/utils/supabase/server";

// Configure fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-syne" });

export const metadata: Metadata = {
  title: "Founivo - Find the right founder. Fast.",
  description: "Founivo is the verified founder directory trusted by investors, recruiters, and entrepreneurs. Get direct access to emails, socials, and phone numbers.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-sans" style={{ background: "#f8faf9" }}>
        <Navbar key={user?.id || 'guest'} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}