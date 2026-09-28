"use client";

import React from "react";
import { TicketItem } from "./TicketsTable";
import {
  getIncidentMeta,
  formatRelativeTime,
  formatFullTimestamp,
} from "@/lib/admin-utils";
import {
  Inbox,
  Clock,
  CheckCircle2,
  ShieldAlert,
  Eye,
  MapPin,
  ChevronRight,
  FileText,
} from "lucide-react";

interface TicketsKanbanProps {
  tickets: TicketItem[];
  onInspect: (ticket: TicketItem) => void;
  onUpdateStatus: (id: string, newStatus: string) => Promise<void>;
}

export default function TicketsKanban({
  tickets,
  onInspect,
  onUpdateStatus,
}: TicketsKanbanProps) {
  const columns = [
    {
      id: "RECEIVED",
      title: "Pending / Received",
      icon: Inbox,
      headerClass: "border-amber-500/40 text-amber-400 bg-amber-950/20",
      accentBg: "border-amber-800/30",
    },
    {
      id: "IN_PROGRESS",
      title: "In Progress",
      icon: Clock,
      headerClass: "border-blue-500/40 text-blue-400 bg-blue-950/20",
      accentBg: "border-blue-800/30",
    },
    {
      id: "RESOLVED",
      title: "Resolved / Contained",
      icon: CheckCircle2,
      headerClass: "border-emerald-500/40 text-emerald-400 bg-emerald-950/20",
      accentBg: "border-emerald-800/30",
    },
    {
      id: "QUARANTINED",
      title: "Quarantined Breach",
      icon: ShieldAlert,
      headerClass: "border-rose-500/40 text-rose-400 bg-rose-950/20",
      accentBg: "border-rose-800/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {columns.map((col) => {
        const colTickets = tickets.filter((t) => t.status === col.id);
        const Icon = col.icon;

        return (
          <div
            key={col.id}
            className="bg-[#0b101d] border border-slate-800 rounded-2xl flex flex-col h-[750px] overflow-hidden shadow-xl"
          >
            {/* Column Header */}
            <div
              className={`p-3.5 border-b flex items-center justify-between font-mono text-xs font-bold ${col.headerClass}`}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span>{col.title}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-mono text-xs">
                {colTickets.length}
              </span>
            </div>

            {/* Column Body with Scrollable Cards */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3">
              {colTickets.length === 0 ? (
                <div className="h-40 flex flex-col items-center justify-center text-slate-500 text-xs font-mono text-center p-4 border border-dashed border-slate-800 rounded-xl">
                  <span>No tickets in this stage</span>
                </div>
              ) : (
                colTickets.map((ticket) => {
                  const meta = getIncidentMeta(ticket.incidentType);

                  return (
                    <div
                      key={ticket.id}
                      onClick={() => onInspect(ticket)}
                      className="bg-[#070a13] border border-slate-800 hover:border-slate-700 p-3.5 rounded-xl shadow-md space-y-2.5 cursor-pointer transition-all hover:translate-y-[-1px] group"
                    >
                      {/* Top Row: Ticket Number & Relative Time */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                          {ticket.ticketNumber}
                        </span>
                        <span
                          className="text-[10px] font-mono text-slate-500"
                          title={formatFullTimestamp(ticket.createdAt)}
                        >
                          {formatRelativeTime(ticket.createdAt)}
                        </span>
                      </div>

                      {/* Incident Badge */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase ${meta.badgeClass}`}
                        >
                          {meta.badge}
                        </span>
                        <span className="text-xs text-slate-300 font-medium truncate">
                          {meta.label}
                        </span>
                      </div>

                      {/* Message preview */}
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {ticket.message}
                      </p>

                      {/* Submitter & Location */}
                      <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-1 text-[11px] text-slate-400">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium truncate">
                            {ticket.name}
                          </span>
                          {ticket.adminNotes && (
                            <span
                              className="text-blue-400 flex items-center gap-1 text-[10px] font-mono"
                              title="Admin notes attached"
                            >
                              <FileText className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        {ticket.location && (
                          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                            <MapPin className="w-2.5 h-2.5 text-cyan-500" />
                            <span className="truncate">{ticket.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Card Action Footer */}
                      <div className="pt-2 flex items-center justify-between gap-1 text-[10px] font-mono">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onInspect(ticket);
                          }}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-2.5 h-2.5" />
                          <span>Dossier</span>
                        </button>

                        {/* Quick state advances */}
                        <div className="flex items-center gap-1">
                          {ticket.status !== "IN_PROGRESS" && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onUpdateStatus(ticket.id, "IN_PROGRESS");
                              }}
                              className="px-1.5 py-0.5 rounded bg-blue-950 hover:bg-blue-900 border border-blue-800/60 text-blue-300 text-[10px] cursor-pointer"
                              title="Dispatch / Investigate"
                            >
                              Dispatch
                            </button>
                          )}
                          {ticket.status !== "RESOLVED" && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onUpdateStatus(ticket.id, "RESOLVED");
                              }}
                              className="px-1.5 py-0.5 rounded bg-emerald-950 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-300 text-[10px] cursor-pointer"
                              title="Mark resolved"
                            >
                              Resolve
                            </button>
                          )}
                          {ticket.status !== "QUARANTINED" && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onUpdateStatus(ticket.id, "QUARANTINED");
                              }}
                              className="px-1.5 py-0.5 rounded bg-rose-950 hover:bg-rose-900 border border-rose-800/60 text-rose-300 text-[10px] cursor-pointer"
                              title="Quarantine breach"
                            >
                              Quarantine
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
