import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { Suspense } from "react";
import "./globals.css";

const geistSans = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Manrope({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Widodo — Backend Developer",
  description: "Personal portfolio & blog",
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
