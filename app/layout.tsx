import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RoastMyCV — Brutal AI-powered CV feedback",
  description: "Honest feedback that actually helps you get hired",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <nav className="border-b border-white/10 px-6 py-4">
          <Link
            href="/"
            className="text-xl font-bold text-white hover:text-red-500 transition-colors"
          >
            RoastMyCV
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
