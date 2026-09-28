"use client";

import React from "react";
import { Inbox, Clock, CheckCircle2, ShieldAlert, Layers } from "lucide-react";

interface StatsOverviewProps {
  stats: {
    total: number;
    received: number;
    inProgress: number;
    resolved: number;
    quarantined: number;
  };
  activeStatus: string;
  onSelectStatus: (status: string) => void;
}

export default function StatsOverview({
  stats,
  activeStatus,
  onSelectStatus,
}: StatsOverviewProps) {
  const cards = [
    {
      id: "ALL",
      label: "Total Tickets",
      count: stats.total,
      subtext: "All logged incidents",
      icon: Layers,
      color: "cyan",
      cardBg: "bg-cyan-950/20 hover:bg-cyan-950/30 border-cyan-800/40 text-cyan-400",
      activeBg: "ring-2 ring-cyan-500 bg-cyan-950/40 border-cyan-500",
      indicatorColor: "bg-cyan-400",
    },
    {
      id: "RECEIVED",
      label: "Pending / Received",
      count: stats.received,
      subtext: "Awaiting triage",
      icon: Inbox,
      color: "amber",
      cardBg: "bg-amber-950/20 hover:bg-amber-950/30 border-amber-800/40 text-amber-400",
      activeBg: "ring-2 ring-amber-500 bg-amber-950/40 border-amber-500",
      indicatorColor: "bg-amber-400",
    },
    {
      id: "IN_PROGRESS",
      label: "Under Investigation",
      count: stats.inProgress,
      subtext: "Technician dispatched",
      icon: Clock,
      color: "blue",
      cardBg: "bg-blue-950/20 hover:bg-blue-950/30 border-blue-800/40 text-blue-400",
      activeBg: "ring-2 ring-blue-500 bg-blue-950/40 border-blue-500",
      indicatorColor: "bg-blue-400",
    },
    {
      id: "RESOLVED",
      label: "Resolved / Contained",
      count: stats.resolved,
      subtext: "Closed incidents",
      icon: CheckCircle2,
      color: "emerald",
      cardBg: "bg-emerald-950/20 hover:bg-emerald-950/30 border-emerald-800/40 text-emerald-400",
      activeBg: "ring-2 ring-emerald-500 bg-emerald-950/40 border-emerald-500",
      indicatorColor: "bg-emerald-400",
    },
    {
      id: "QUARANTINED",
      label: "Quarantined Breach",
      count: stats.quarantined,
      subtext: "Bio/temporal hazard",
      icon: ShieldAlert,
      color: "rose",
      cardBg: "bg-rose-950/20 hover:bg-rose-950/30 border-rose-800/40 text-rose-400",
      activeBg: "ring-2 ring-rose-500 bg-rose-950/40 border-rose-500",
      indicatorColor: "bg-rose-400 animate-pulse",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = activeStatus === card.id;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectStatus(card.id)}
            className={`cursor-pointer text-left p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden group shadow-lg shadow-black/20 ${
              card.cardBg
            } ${isActive ? card.activeBg : ""}`}
            title={`Filter by ${card.label}`}
          >
            {/* Ambient top light */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 transition-opacity ${
                isActive ? "opacity-100" : "opacity-30 group-hover:opacity-70"
              } ${card.indicatorColor}`}
            />

            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-medium text-slate-400 group-hover:text-slate-300">
                {card.label}
              </span>
              <Icon className="w-4 h-4 opacity-80 group-hover:scale-110 transition-transform" />
            </div>

            <div className="flex items-baseline justify-between gap-2">
              <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
                {card.count}
              </span>
              <span className="text-[10px] font-mono text-slate-500 truncate">
                {card.subtext}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
