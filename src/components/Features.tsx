"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import {
  RoutineIllustration,
  AnomalyIllustration,
  ParadoxIllustration,
} from "./PhaseIllustrations";
import type { FeaturePhaseItem } from "@/types";
import TeamMemberCard from "./TeamMemberCard";
import { mockInterns } from "@/mocks";

export default function Features() {
  const features: FeaturePhaseItem[] = [
    {
      id: "routine-maintenance",
      Illustration: RoutineIllustration,
      accentColor: "blue",
      tag: "PHASE 1: THE ROUTINE",
      title: "Routine Technical Requests",
      summary: "At first, it feels like an authentic corporate IT support simulator.",
      description:
        "Respond to realistic workplace maintenance tickets across multi-floor corporate offices. Clear printer jams, troubleshoot Wi-Fi drops, replace faulty keyboards, calibrate projectors, and trace loose network cables.",
      points: [
        "15+ authentic IT tools (multimeters, toner drums, cable testers)",
        "Realistic locations: Accounting, Conference 201, Server Hubs",
        "Inspect power, USB, paper trays, and system BIOS settings",
      ],
      previewDetails: "Ticket #0241: Accounting Office — Printer Jam (Routine)",
    },
    {
      id: "creeping-anomalies",
      Illustration: AnomalyIllustration,
      accentColor: "red",
      tag: "PHASE 2: THE INCONSISTENCY",
      title: "Subtle Multi-Tier Anomalies",
      summary: "Anomalies don't start supernatural—they begin as tiny, unnerving discrepancies.",
      description:
        "Notice what doesn't belong before it's too late. An uncatalogued fifth chair in Room 201 that slowly becomes occupied. A printer spitting photographs of you standing at your desk. CCTV feeds showing you 4 seconds in the future.",
      points: [
        "Level 1 Environmental: Displaced furniture, clock shifts, phantom doors",
        "Level 2 Technical: Unknown device IT-INTERN-02, self-moving cursors",
        "Level 3 Human: Employees who return as different people",
      ],
      previewDetails: "Network Alert: Host 192.168.1.27 [IT-INTERN-02] Active",
    },
    {
      id: "ticket-paradox",
      Illustration: ParadoxIllustration,
      accentColor: "purple",
      tag: "PHASE 3: THE PARADOX",
      title: "The Unresolved Ticket Paradox",
      summary: "The help desk ticketing system itself becomes part of the horror.",
      description:
        "Every day your supervisor warns you: 'Do not repair anything not on the ticket.' Then Ticket #068 appears: 'Fix You.' You discover tickets from 2011 logged by vanished interns from the exact computer you are using right now.",
      points: [
        "Branching decisions: Mark Normal, Report Anomaly, or Ignore",
        "Archived redacted tickets dating back to 12/04/2011",
        "Level 4 Reality collapses: Shifting floorplans and disappearing exits",
      ],
      previewDetails: "Ticket #068: 'Fix You' — Status: UNRESOLVED",
    },
  ];

  return (
    <section
      id="features"
      className="py-24 md:py-32 relative bg-[#07090e] border-t border-slate-900"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with generous negative space */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-400 text-xs font-mono tracking-wider uppercase">
            <span>Core Game Mechanics</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How An IT Intern Survives The Week
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            When a ticket is normal, complete hands-on IT repair mini-games to close the request.
            When an anomaly appears, inspect the clues and mark it immediately to protect your intern
            sanity and health from reality distortion damage.
          </p>
        </div>

        {/* 3 Blocks with Icons and Descriptions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Illustration = feature.Illustration;
            const isRed = feature.accentColor === "red";
            const isPurple = feature.accentColor === "purple";

            return (
              <div
                key={feature.id}
                className={`group relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between border ${
                  isRed
                    ? "bg-[#0c0f1a] border-slate-800/80 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-950/30"
                    : isPurple
                    ? "bg-[#0c0f1a] border-slate-800/80 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-950/30"
                    : "bg-[#0c0f1a] border-slate-800/80 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-950/30"
                }`}
              >
                {/* Subtle top indicator bar */}
                <div
                  className={`absolute top-0 left-8 right-8 h-1 rounded-t-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                    isRed
                      ? "bg-red-500 shadow-[0_2px_10px_rgba(239,68,68,0.5)]"
                      : isPurple
                      ? "bg-indigo-500 shadow-[0_2px_10px_rgba(99,102,241,0.5)]"
                      : "bg-blue-500 shadow-[0_2px_10px_rgba(59,130,246,0.5)]"
                  }`}
                />

                <div className="space-y-6">
                  {/* Custom Cartoon Illustration & Phase Tag */}
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center p-1.5 border transition-all duration-300 group-hover:scale-105 ${
                        isRed
                          ? "bg-[#160810] border-red-500/30 group-hover:border-red-500/60 shadow-lg shadow-red-950/40"
                          : isPurple
                          ? "bg-[#110d22] border-indigo-500/30 group-hover:border-indigo-500/60 shadow-lg shadow-indigo-950/40"
                          : "bg-[#081324] border-blue-500/30 group-hover:border-blue-500/60 shadow-lg shadow-blue-950/40"
                      }`}
                    >
                      <Illustration className="w-full h-full" />
                    </div>
                    <span
                      className={`text-[10px] sm:text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full border ${
                        isRed
                          ? "bg-red-950/60 border-red-500/40 text-red-300"
                          : isPurple
                          ? "bg-indigo-950/60 border-indigo-500/40 text-indigo-300"
                          : "bg-blue-950/60 border-blue-500/40 text-blue-300"
                      }`}
                    >
                      {feature.tag}
                    </span>
                  </div>

                  {/* Title & Summaries */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white group-hover:text-slate-100">
                      {feature.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-300">
                      {feature.summary}
                    </p>
                  </div>

                  {/* Body description */}
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2.5 pt-2 border-t border-slate-800/80">
                    {feature.points.map((pt, i) => (
                      <li
                        key={i}
                        className="text-xs text-slate-300 flex items-start gap-2"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                            isRed
                              ? "bg-red-400"
                              : isPurple
                              ? "bg-indigo-400"
                              : "bg-blue-400"
                          }`}
                        />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Ticket Code Pill */}
                <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="truncate pr-2">{feature.previewDetails}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-1 shrink-0" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Playable Intern Personnel Dossiers */}
        <div className="mt-20 pt-16 border-t border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Shift Personnel // Cohort Roster</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Survive With Your Fellow Interns
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              You aren&apos;t the only one left behind in the office. Collaborate, compare ticket logs, and monitor anomaly symptoms with your shift partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {mockInterns.map((intern) => (
              <TeamMemberCard key={intern.id} {...intern} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
