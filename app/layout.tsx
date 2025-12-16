import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider, VoiceIndicatorProvider, HealthCheckProvider } from "@/providers";
import { DisplayListener } from "@/components/DisplayListener";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sunny's Dashboard",
  description: "Personal dashboard for 55-inch portrait display",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HealthCheckProvider>
          <AuthProvider>
            <VoiceIndicatorProvider>
              <Suspense fallback={null}>
                <DisplayListener />
              </Suspense>
              {children}
            </VoiceIndicatorProvider>
          </AuthProvider>
        </HealthCheckProvider>
      </body>
    </html>
  );
}
