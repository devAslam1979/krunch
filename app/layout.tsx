import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krunch",
  description: "Krunch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[500px] mx-auto `}
      >
        <div>
          <Navbar />
          <main className="h-[calc(100vh-48px)] bg-[#fefaed] overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-200">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
