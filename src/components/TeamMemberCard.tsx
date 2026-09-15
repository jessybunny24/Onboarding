"use client";

import React from "react";
import type { TeamMemberCardProps } from "@/types";

export default function TeamMemberCard({
  id = "#00",
  name,
  role,
  imageSrc,
  quote,
  department = "IT Infrastructure & Support",
  perception = "90% (Standard Diagnostics)",
  status = "Active On Shift",
  accentColor = "cyan",
  isAnomalyActive = false,
  className = "",
  onSelect,
}: TeamMemberCardProps) {
  const isAmber = accentColor === "amber";

  return (
    <div
      onClick={onSelect}
      className={`group relative rounded-3xl p-6 sm:p-7 bg-[#0c101d] border transition-all duration-300 flex flex-col sm:flex-row gap-6 items-center sm:items-start ${
        isAnomalyActive
          ? "border-red-500/70 shadow-2xl shadow-red-950/50 bg-[#160810]"
          : isAmber
          ? "border-slate-800 hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-950/40"
          : "border-slate-800 hover:border-cyan-500/60 hover:shadow-2xl hover:shadow-cyan-950/40"
      } ${onSelect ? "cursor-pointer" : ""} ${className}`}
    >
      {/* Photo / Portrait with Badge */}
      <div
        className={`relative w-36 h-48 sm:w-44 sm:h-56 rounded-2xl overflow-hidden bg-slate-950 shrink-0 border-2 transition-all duration-300 group-hover:scale-[1.02] shadow-xl ${
          isAnomalyActive
            ? "border-red-500 shadow-red-950/50"
            : isAmber
            ? "border-amber-500/40 group-hover:border-amber-400 shadow-amber-950/30"
            : "border-cyan-500/40 group-hover:border-cyan-400 shadow-cyan-950/30"
        }`}
      >
        <img
          src={imageSrc}
          alt={`Intern ${id} ${name} - ${role}`}
          className={`w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 ${
            isAnomalyActive ? "filter contrast-125 saturate-150" : ""
          }`}
        />
        <div
          className={`absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-sm border text-[10px] font-mono font-bold ${
            isAnomalyActive
              ? "border-red-500/60 text-red-300"
              : isAmber
              ? "border-amber-500/40 text-amber-300"
              : "border-cyan-500/40 text-cyan-300"
          }`}
        >
          ID: {id}
        </div>
      </div>

      {/* Details / Dossier Info */}
      <div className="flex-1 space-y-3 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span
            className={`text-xs font-mono font-bold uppercase tracking-wide ${
              isAnomalyActive
                ? "text-red-400"
                : isAmber
                ? "text-amber-400"
                : "text-cyan-400"
            }`}
          >
            {name}
          </span>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
              isAnomalyActive
                ? "bg-red-950 border-red-800/60 text-red-300"
                : isAmber
                ? "bg-amber-950 border-amber-800/50 text-amber-300"
                : "bg-cyan-950 border-cyan-800/50 text-cyan-300"
            }`}
          >
            {role}
          </span>
        </div>

        <p
          className={`text-xs font-mono italic p-3 rounded-xl border ${
            isAnomalyActive
              ? "bg-red-950/50 border-red-900/60 text-red-200"
              : "bg-slate-900/80 border-slate-800 text-slate-300"
          }`}
        >
          &quot;{quote}&quot;
        </p>

        <div className="space-y-1.5 text-xs text-slate-400">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-1 font-mono text-[11px]">
            <span className="text-slate-500">Department</span>
            <span className="text-slate-300">{department}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-1 font-mono text-[11px]">
            <span className="text-slate-500">Perception</span>
            <span
              className={`font-bold ${
                isAnomalyActive
                  ? "text-red-400 animate-pulse"
                  : isAmber
                  ? "text-amber-400"
                  : "text-emerald-400"
              }`}
            >
              {perception}
            </span>
          </div>
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span className="text-slate-500">Status</span>
            <span
              className={`font-bold flex items-center gap-1.5 ${
                isAnomalyActive
                  ? "text-red-400"
                  : isAmber
                  ? "text-amber-400"
                  : "text-cyan-400"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full inline-block ${
                  isAnomalyActive
                    ? "bg-red-500 animate-ping"
                    : isAmber
                    ? "bg-amber-400 animate-ping"
                    : "bg-cyan-400 animate-ping"
                }`}
              />
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
