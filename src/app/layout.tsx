import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Our Timeline",
  description: "A timeline of our journey together",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen`}
      >
        <main className="max-w-[95%] sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto p-3 sm:p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
