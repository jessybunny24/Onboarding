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
  title: "TICKET #404 | IT Support Anomaly Horror Game",
  description:
    "You’re an IT intern on your first week when all the bosses suddenly disappear. Now, it’s up to the interns to handle their tickets and fix the strange anomalies around the office. But the more you fix, the more you uncover about where the bosses went… and why they disappeared.",
  keywords: [
    "TICKET #404",
    "Ticket 404",
    "IT Support Horror Game",
    "Anomaly Game",
    "Technical Support Simulator",
    "Observation Duty style",
    "Psychological Horror",
  ],
  authors: [{ name: "TICKET #404 Studio" }],
  icons: {
    icon: "/ticket-404-logo.jpg",
    apple: "/ticket-404-logo.jpg",
  },
  openGraph: {
    title: "TICKET #404 - IT Support Anomaly Game",
    description:
      "You’re an IT intern on your first week when all the bosses suddenly disappear. Now, it’s up to the interns to handle their tickets and fix the strange anomalies around the office. But the more you fix, the more you uncover about where the bosses went… and why they disappeared.",
    type: "website",
    images: [
      {
        url: "/ticket-404-logo.jpg",
        width: 1024,
        height: 1024,
        alt: "TICKET #404 Official Game Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#07090e] text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
