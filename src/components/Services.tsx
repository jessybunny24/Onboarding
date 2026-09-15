"use client";

import React, { useState } from "react";
import { Check, ShieldCheck, Sparkles } from "lucide-react";

export default function Services() {
  const [selectedPlan, setSelectedPlan] = useState<string>("senior");

  const editions = [
    {
      id: "intern",
      name: "Probationary Intern",
      badge: "DAY 1 ORIENTATION",
      price: "₱200",
      description:
        "Standard dispatch clearance for your first week. Learn the floor plan, fix the hardware, and don't ask about previous interns.",
      highlighted: false,
      buttonText: "Wishlist Standard Edition",
      buttonStyle:
        "btn-secondary w-full py-3.5 px-6 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold text-sm hover:border-slate-500 hover:text-white hover:bg-slate-800",
      features: [
        "7-Day Probationary Campaign (Floors 1-3)",
        "40+ Hardware Tickets (Printers, VGA, BIOS)",
        "Level 1 Environmental & Level 2 Technical Anomalies",
        "Standard Multimeter, Toner Key & Flashlight",
        "Official Digital Intern ID Card",
      ],
    },
    {
      id: "senior",
      name: "Senior Anomaly Dispatch",
      badge: "RECOMMENDED • SUPERVISOR APPROVED",
      price: "₱400",
      description:
        "Full building clearance. Handle high-risk reality breaches across 13 floors and uncover the 2011 vanished intern archive.",
      highlighted: true,
      buttonText: "Pre-Order Senior Edition",
      buttonStyle:
        "btn-primary w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 border border-blue-400/40",
      features: [
        "Everything in Probationary Intern tier",
        "Full Facility Clearance: Floors 1-13 & Sub-Basement",
        "Level 3 Human Mimics & Level 4 Reality Collapses",
        "Unredacted Audio Logs of Vanished Interns (2011)",
        "CRT Monitor & 90s Office Retro Filter Pack",
        "Full Dark Ambient Synth Soundtrack (FLAC/MP3)",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise Containment",
      badge: "COLLECTOR'S PROTOCOL",
      price: "₱600",
      description:
        "For technicians who refuse to look away. Includes endless night shift mode, classified dev commentary, and incident dossier.",
      highlighted: false,
      buttonText: "Access Enterprise Tier",
      buttonStyle:
        "btn-accent w-full py-3.5 px-6 rounded-2xl bg-red-950/60 border border-red-700/60 hover:border-red-500 text-red-200 hover:text-white hover:bg-red-900/60 font-semibold text-sm shadow-lg shadow-red-950/30",
      features: [
        "Everything in Senior Anomaly Dispatch",
        "Endless 'Graveyard Shift' Rogue-lite Anomaly Mode",
        "Classified Incident Dossier & Room 103 Blueprints (PDF)",
        "Interactive Supervisor Terminal Soundboard DLC",
        "Developer Commentary: The Making of the Anomalies",
        "Your Name in the Game's 'Previous Intern' Database",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="py-24 md:py-36 relative bg-[#090c14] border-t border-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Title with High Negative Space */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-blue-400 text-xs font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Service Clearance & Editions (PHP / ₱)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Select Your Clearance Tier
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Every edition grants you entry into TICKET #404. Choose how deep
            into the corporate anomaly archive you dare to log in.
          </p>
        </div>

        {/* Custom Cards with Highlight Buttons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {editions.map((edition) => {
            const isSenior = edition.highlighted;
            const isSelected = selectedPlan === edition.id;

            return (
              <div
                key={edition.id}
                onClick={() => setSelectedPlan(edition.id)}
                className={`relative rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  isSenior
                    ? "bg-gradient-to-b from-[#0f182e] to-[#0a1020] border-2 border-blue-500/80 shadow-2xl shadow-blue-950/50 -translate-y-2 ring-1 ring-blue-400/30"
                    : isSelected
                    ? "bg-[#0f1526] border-2 border-blue-400/80 shadow-xl shadow-blue-950/40"
                    : "bg-[#0b0e18] border border-slate-800 hover:border-slate-700 hover:shadow-xl hover:shadow-black/60"
                }`}
              >
                {/* Highlight Badge for Featured Card */}
                {isSenior && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md shadow-blue-900/50">
                      <Sparkles className="w-3 h-3" />
                      {edition.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Top Category Badge for non-featured */}
                  {!isSenior && (
                    <span className="inline-block text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase mb-3">
                      {edition.badge}
                    </span>
                  )}

                  {/* Title & Price */}
                  <div className={`space-y-2 ${isSenior ? "mt-2" : ""}`}>
                    <h3 className="text-2xl font-bold text-white">
                      {edition.name}
                    </h3>
                    <div className="flex items-baseline gap-2 pt-2">
                      <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        {edition.price}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        PHP / one-time license
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 mt-4 leading-relaxed">
                    {edition.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-3.5">
                    <span className="text-xs font-mono font-semibold uppercase text-slate-300 tracking-wider block">
                      Clearance Perks Included:
                    </span>
                    {edition.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isSenior
                              ? "bg-blue-950 text-blue-400 border border-blue-500/40"
                              : "bg-slate-800 text-slate-300 border border-slate-700"
                          }`}
                        >
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-300">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlight Button with Custom Hover Animation */}
                <div className="mt-10 pt-4">
                  <button
                    type="button"
                    className={edition.buttonStyle}
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(
                        `You selected "${edition.name}". Wishlist recorded in intern queue!`
                      );
                    }}
                  >
                    {edition.buttonText}
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-3 font-mono">
                    DRM-Free & Steam Key included on release
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
