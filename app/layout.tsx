import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutClient from "@/components/LayoutClient";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskFlow",
  description:
    "Transform your productivity with our intuitive task management platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen">
            <div className="fixed inset-0 bg-gradient-to-br from-green-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 -z-10" />

            <LayoutClient />

            <main>{children}</main>

            <footer className="border-t border-gray-200 dark:border-gray-800">
              <div className="container mx-auto px-6 py-12">
                <div className="text-center text-gray-600 dark:text-gray-400">
                  <p>&copy; 2025 TaskFlow. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
