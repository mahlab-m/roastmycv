import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RoastMyCV — Brutal AI CV Feedback",
  description: "Get your CV brutally roasted by AI. Honest feedback, specific rewrites, and scores for every section. Free to start.",
  openGraph: {
    title: "RoastMyCV — Brutal AI CV Feedback",
    description: "Get your CV brutally roasted by AI. Honest feedback that actually gets you hired.",
    url: "https://roastmycv-ashen.vercel.app",
    siteName: "RoastMyCV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoastMyCV — Brutal AI CV Feedback",
    description: "Get your CV brutally roasted by AI. Honest feedback that actually gets you hired.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        {/* Nav */}
        <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg tracking-tight">
              Roast<span className="text-red-500">MyCV</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm text-white/50 hover:text-white transition-colors hidden sm:block">
                How it works
              </Link>
              <Link
                href="/upload"
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Roast My CV
              </Link>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
