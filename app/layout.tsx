import type { Metadata } from "next";
import "./globals.css";
import LayoutClient from "@/components/LayoutClient";
import Providers from "./providers";

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
          </div>
        </Providers>
      </body>
    </html>
  );
}
