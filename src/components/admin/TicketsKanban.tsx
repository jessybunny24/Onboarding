"use client";

import React, { useState, useRef, useCallback } from "react";
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
  FileText,
  GripVertical,
} from "lucide-react";

interface TicketsKanbanProps {
  tickets: TicketItem[];
  onInspect: (ticket: TicketItem) => void;
  onUpdateStatus: (id: string, newStatus: string) => Promise<void>;
}

const columns = [
  {
    id: "RECEIVED",
    title: "Pending / Received",
    icon: Inbox,
    headerClass: "border-amber-500/40 text-amber-400 bg-amber-950/20",
    dropBg: "bg-amber-950/20 border-amber-500/50",
    emptyBg: "border-amber-800/30",
    glow: "shadow-amber-950/40",
  },
  {
    id: "IN_PROGRESS",
    title: "In Progress",
    icon: Clock,
    headerClass: "border-blue-500/40 text-blue-400 bg-blue-950/20",
    dropBg: "bg-blue-950/20 border-blue-500/50",
    emptyBg: "border-blue-800/30",
    glow: "shadow-blue-950/40",
  },
  {
    id: "RESOLVED",
    title: "Resolved / Contained",
    icon: CheckCircle2,
    headerClass: "border-emerald-500/40 text-emerald-400 bg-emerald-950/20",
    dropBg: "bg-emerald-950/20 border-emerald-500/50",
    emptyBg: "border-emerald-800/30",
    glow: "shadow-emerald-950/40",
  },
  {
    id: "QUARANTINED",
    title: "Quarantined Breach",
    icon: ShieldAlert,
    headerClass: "border-rose-500/40 text-rose-400 bg-rose-950/20",
    dropBg: "bg-rose-950/20 border-rose-500/50",
    emptyBg: "border-rose-800/30",
    glow: "shadow-rose-950/40",
  },
];

export default function TicketsKanban({
  tickets,
  onInspect,
  onUpdateStatus,
}: TicketsKanbanProps) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overColumnId, setOverColumnId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const dragTicketRef = useRef<TicketItem | null>(null);

  const handleDragStart = useCallback(
    (e: React.DragEvent, ticket: TicketItem) => {
      dragTicketRef.current = ticket;
      setDraggingId(ticket.id);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", ticket.id);
    },
    []
  );

  const handleDragEnd = useCallback(() => {
    setDraggingId(null);
    setOverColumnId(null);
    dragTicketRef.current = null;
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, columnId: string) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setOverColumnId(columnId);
    },
    []
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    // Only clear if we leave the column container itself
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setOverColumnId(null);
    }
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent, targetColumnId: string) => {
      e.preventDefault();
      setOverColumnId(null);

      const ticket = dragTicketRef.current;
      if (!ticket || ticket.status === targetColumnId) return;

      setUpdatingId(ticket.id);
      setDraggingId(null);
      dragTicketRef.current = null;

      try {
        await onUpdateStatus(ticket.id, targetColumnId);
      } finally {
        setUpdatingId(null);
      }
    },
    [onUpdateStatus]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {columns.map((col) => {
        const colTickets = tickets.filter((t) => t.status === col.id);
        const Icon = col.icon;
        const isOver = overColumnId === col.id;

        return (
          <div
            key={col.id}
            className={`flex flex-col h-[750px] rounded-2xl overflow-hidden shadow-xl border transition-all duration-150 ${
              isOver
                ? `${col.dropBg} shadow-lg ${col.glow}`
                : "bg-[#0b101d] border-slate-800"
            }`}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, col.id)}
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

            {/* Drop zone hint when dragging over */}
            {isOver && draggingId && (
              <div className="mx-3 mt-3 h-14 rounded-xl border-2 border-dashed border-current opacity-50 flex items-center justify-center text-xs font-mono animate-pulse">
                Drop to move here
              </div>
            )}

            {/* Column Body – Scrollable Cards */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3">
              {colTickets.length === 0 && !isOver && (
                <div
                  className={`h-40 flex flex-col items-center justify-center text-slate-500 text-xs font-mono text-center p-4 border border-dashed rounded-xl ${col.emptyBg}`}
                >
                  <GripVertical className="w-5 h-5 mb-2 opacity-40" />
                  <span>Drag tickets here</span>
                </div>
              )}

              {colTickets.map((ticket) => {
                const meta = getIncidentMeta(ticket.incidentType);
                const isDragging = draggingId === ticket.id;
                const isUpdating = updatingId === ticket.id;

                return (
                  <div
                    key={ticket.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, ticket)}
                    onDragEnd={handleDragEnd}
                    onClick={() => !isDragging && onInspect(ticket)}
                    className={`bg-[#070a13] border p-3.5 rounded-xl shadow-md space-y-2.5 transition-all duration-150 group select-none ${
                      isDragging
                        ? "opacity-40 scale-95 border-cyan-500/60 cursor-grabbing"
                        : isUpdating
                        ? "opacity-60 cursor-wait border-slate-700"
                        : "border-slate-800 hover:border-slate-700 hover:translate-y-[-1px] cursor-grab active:cursor-grabbing"
                    }`}
                    title="Drag to change status"
                  >
                    {/* Drag Handle + Ticket Number Row */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <GripVertical className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 shrink-0 transition-colors" />
                        <span className="font-mono text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                          {ticket.ticketNumber}
                        </span>
                      </div>
                      <span
                        className="text-[10px] font-mono text-slate-500 shrink-0"
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

                    {/* Card Footer Actions */}
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

                      {/* Quick status advances */}
                      <div className="flex items-center gap-1">
                        {ticket.status !== "IN_PROGRESS" && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateStatus(ticket.id, "IN_PROGRESS");
                            }}
                            className="px-1.5 py-0.5 rounded bg-blue-950 hover:bg-blue-900 border border-blue-800/60 text-blue-300 cursor-pointer"
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
                            className="px-1.5 py-0.5 rounded bg-emerald-950 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-300 cursor-pointer"
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
                            className="px-1.5 py-0.5 rounded bg-rose-950 hover:bg-rose-900 border border-rose-800/60 text-rose-300 cursor-pointer"
                            title="Quarantine breach"
                          >
                            Quarantine
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
