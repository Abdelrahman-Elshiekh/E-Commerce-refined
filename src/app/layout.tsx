import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navber from "./_components/Navber/Navber";
import Footer from "./_components/Footer/Footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "E-Commerce website built with Next.js, Tailwind CSS, and TypeScript. Explore a wide range of products and enjoy a seamless shopping experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <Navber />
          <div className="bg-zinc-950  dark:bg-zinc-800">{children}</div>
          <Footer />
          <Toaster position="top-center" richColors theme="dark" />
        </body>
      </html>
    </>
  );
}
