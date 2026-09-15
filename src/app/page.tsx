"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [isAnomalyActive, setIsAnomalyActive] = useState(false);

  const toggleAnomaly = () => {
    setIsAnomalyActive((prev) => !prev);
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        isAnomalyActive ? "bg-[#09060a]" : "bg-[#07090e]"
      }`}
    >
      {/* Top emergency warning banner when anomaly mode is triggered */}
      {isAnomalyActive && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white text-[11px] font-mono font-bold tracking-widest text-center py-1 uppercase px-4 shadow-lg shadow-red-950 flex items-center justify-center gap-2 animate-pulse">
          <span>[!] FACILITY PROTOCOL BREACH: ANOMALOUS DEVICE DETECTED ON SUBNET 192.168.1.27 [!]</span>
          <button
            onClick={() => setIsAnomalyActive(false)}
            className="underline ml-2 hover:text-red-200 cursor-pointer"
          >
            [DISMISS]
          </button>
        </div>
      )}

      {/* Main Header */}
      <Header
        isAnomalyActive={isAnomalyActive}
        onToggleAnomaly={toggleAnomaly}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          isAnomalyActive={isAnomalyActive}
          onToggleAnomaly={toggleAnomaly}
        />

        {/* Features: 3 Blocks with Icons & Descriptions */}
        <Features />

        {/* Services: Custom Cards with Highlight Buttons */}
        <Services />

        {/* Contact: Non-functional Form */}
        <Contact />
      </main>

      {/* Footer: Navigation, Social Icons & Copyright */}
      <Footer />
    </div>
  );
}
