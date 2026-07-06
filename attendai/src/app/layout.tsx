import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AttendAI — Smart Attendance Intelligence Platform",
    template: "%s | AttendAI",
  },
  description:
    "AttendAI is a cloud-native AI-powered attendance and workforce intelligence platform for schools, colleges, and enterprises. Automate attendance tracking, generate reports, and gain deep analytics.",
  keywords: [
    "attendance management",
    "AI attendance",
    "student attendance",
    "workforce management",
    "EdTech",
    "HRTech",
    "SaaS",
  ],
  authors: [{ name: "AttendAI Team" }],
  creator: "AttendAI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://attendai.app",
    title: "AttendAI — Smart Attendance Intelligence Platform",
    description:
      "Cloud-native AI-powered attendance and workforce intelligence platform.",
    siteName: "AttendAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "AttendAI — Smart Attendance Intelligence Platform",
    description: "Cloud-native AI-powered attendance and workforce intelligence platform.",
    creator: "@attendai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
