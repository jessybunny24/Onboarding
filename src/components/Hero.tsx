"use client";

import React from "react";
import { ArrowRight, Terminal as TerminalIcon } from "lucide-react";
import InteractiveTerminal from "./InteractiveTerminal";
import Ticket404HeroImage from "./Ticket404HeroImage";
import type { HeroProps } from "@/types";

export default function Hero({
  isAnomalyActive,
  onToggleAnomaly,
}: HeroProps) {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern"
    >
      {/* Glow Orbs in Background */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-colors duration-700 ${
          isAnomalyActive
            ? "bg-red-600/15"
            : "bg-blue-600/15"
        }`}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Headline & CTA Container */}
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Fix the IT Tickets. <br />
            <span
              className={`bg-clip-text text-transparent transition-all duration-500 ${
                isAnomalyActive
                  ? "bg-gradient-to-r from-red-400 via-rose-400 to-amber-300"
                  : "bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300"
              }`}
            >
              Report the Anomalies.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            You&apos;re an IT intern on your first week when all the bosses
            suddenly disappear. Now, it&apos;s up to the interns to handle their tickets
            and fix the strange anomalies around the office. But the more you fix,
            the more you uncover about where the bosses went&hellip; and why they disappeared.
          </p>

          {/* Call To Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#pricing"
              className={`btn-primary px-8 py-4 rounded-2xl font-bold text-base text-white flex items-center gap-3 transition-all ${
                isAnomalyActive
                  ? "bg-red-600 hover:bg-red-500 shadow-xl shadow-red-600/30"
                  : "bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30"
              }`}
            >
              <span>Clock In (Wishlist on Steam)</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <a
              href="#features"
              className="btn-secondary px-7 py-4 rounded-2xl font-semibold text-base text-slate-200 border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 hover:text-white transition-all flex items-center gap-2"
            >
              <TerminalIcon className="w-4 h-4 text-blue-400" />
              <span>Explore Gameplay</span>
            </a>
          </div>
        </div>

        {/* Featured Surveillance Feed: TICKET#404 Office Scene with Glitching Title and Sound */}
        <div className="mt-12 md:mt-16">
          <Ticket404HeroImage onGlitchTriggered={onToggleAnomaly} />
        </div>

        {/* Hero Interactive Terminal / Workstation */}
        <div className="mt-8 md:mt-12">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-800">
              Interactive Diagnostic Terminal // Test Your Intern Instincts
            </span>
          </div>
          <InteractiveTerminal isGlobalAnomaly={isAnomalyActive} />
        </div>
      </div>
    </section>
  );
}
