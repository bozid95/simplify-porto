import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { Suspense } from "react";
import "./globals.css";
import "highlight.js/styles/github-dark.css";

const geistSans = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Manrope({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://widodo.my.id";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Widodo — Backend Developer",
    template: "%s — Widodo",
  },
  description:
    "Personal portfolio and engineering notes of Widodo, a Backend Developer specializing in scalable backend systems, APIs, NestJS, Go, and PostgreSQL.",
  keywords: [
    "Widodo",
    "Backend Developer",
    "Software Engineer",
    "NestJS",
    "Go",
    "PostgreSQL",
    "Docker",
    "Web Developer Indonesia",
    "Portfolio Widodo",
  ],
  authors: [{ name: "Widodo", url: BASE_URL }],
  creator: "Widodo",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Widodo Portfolio & Notes",
    title: "Widodo — Backend Developer",
    description:
      "Personal portfolio and engineering notes of Widodo, Backend Developer.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Widodo — Backend Developer",
    description:
      "Personal portfolio and engineering notes of Widodo, Backend Developer.",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400..700&display=swap"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
          <Toaster />
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
