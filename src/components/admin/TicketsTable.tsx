"use client";

import React, { useState } from "react";
import {
  Copy,
  Check,
  Eye,
  Trash2,
  MapPin,
  Mail,
  FileText,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import {
  getIncidentMeta,
  getStatusMeta,
  formatRelativeTime,
  formatFullTimestamp,
} from "@/lib/admin-utils";

export interface TicketItem {
  id: string;
  ticketNumber: string;
  name: string;
  email: string;
  location: string | null;
  incidentType: string;
  message: string;
  status: string;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface TicketsTableProps {
  tickets: TicketItem[];
  isLoading: boolean;
  onInspect: (ticket: TicketItem) => void;
  onUpdateStatus: (id: string, newStatus: string) => Promise<void>;
  onDeleteTicket: (id: string, ticketNumber: string) => void;
  onResetFilters: () => void;
  onSeedData: () => void;
}

export default function TicketsTable({
  tickets,
  isLoading,
  onInspect,
  onUpdateStatus,
  onDeleteTicket,
  onResetFilters,
  onSeedData,
}: TicketsTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleCopyTicketNumber = (e: React.MouseEvent, num: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(num);
    setCopiedId(num);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    ticketId: string
  ) => {
    e.stopPropagation();
    const newStatus = e.target.value;
    setUpdatingId(ticketId);
    try {
      await onUpdateStatus(ticketId, newStatus);
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#0b101d] border border-slate-800 rounded-2xl p-8 shadow-xl">
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-16 rounded-xl bg-slate-900/60 border border-slate-800 animate-pulse flex items-center justify-between px-6"
            >
              <div className="w-28 h-6 bg-slate-800 rounded-lg" />
              <div className="w-40 h-6 bg-slate-800 rounded-lg" />
              <div className="w-48 h-6 bg-slate-800 rounded-lg" />
              <div className="w-24 h-6 bg-slate-800 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="bg-[#0b101d] border border-slate-800 rounded-2xl p-12 text-center shadow-xl">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold font-mono text-white mb-2">
          No Incident Tickets Found
        </h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
          No records match the selected search terms, status, or date range. You can reset filters or generate sample anomaly incidents to populate the facility database.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onResetFilters}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-mono text-white flex items-center gap-2 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
          <button
            type="button"
            onClick={onSeedData}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-xl text-xs font-mono text-black font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-lg shadow-cyan-950"
          >
            <span>Seed Sample Tickets</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0b101d] border border-slate-800/90 rounded-2xl shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800/80 bg-[#070a13] text-[11px] font-mono uppercase text-slate-400 tracking-wider">
              <th className="py-3.5 px-4 font-semibold">Ticket #</th>
              <th className="py-3.5 px-4 font-semibold">Logged</th>
              <th className="py-3.5 px-4 font-semibold">Incident Type & Threat</th>
              <th className="py-3.5 px-4 font-semibold">Submitter & Location</th>
              <th className="py-3.5 px-4 font-semibold">Description</th>
              <th className="py-3.5 px-4 font-semibold">Status</th>
              <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs">
            {tickets.map((ticket) => {
              const incidentMeta = getIncidentMeta(ticket.incidentType);
              const statusMeta = getStatusMeta(ticket.status);
              const isCopied = copiedId === ticket.ticketNumber;
              const isUpdating = updatingId === ticket.id;

              return (
                <tr
                  key={ticket.id}
                  onClick={() => onInspect(ticket)}
                  className="hover:bg-slate-900/50 transition-colors cursor-pointer group"
                >
                  {/* Ticket Number */}
                  <td className="py-4 px-4 font-mono font-bold whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#05070d] border border-slate-800 text-cyan-400 group-hover:border-cyan-700/60 transition-colors">
                      <span>{ticket.ticketNumber}</span>
                      <button
                        type="button"
                        onClick={(e) => handleCopyTicketNumber(e, ticket.ticketNumber)}
                        className="text-slate-500 hover:text-cyan-300 p-0.5 rounded cursor-pointer"
                        title="Copy ticket number"
                      >
                        {isCopied ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Date & Time */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div
                      className="flex flex-col"
                      title={formatFullTimestamp(ticket.createdAt)}
                    >
                      <span className="font-mono text-slate-200">
                        {formatRelativeTime(ticket.createdAt)}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </td>

                  {/* Incident Type & Threat Badge */}
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${incidentMeta.badgeClass}`}
                        >
                          {incidentMeta.badge}
                        </span>
                        <span className="font-medium text-slate-200">
                          {incidentMeta.label}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {incidentMeta.threatLevel}
                      </p>
                    </div>
                  </td>

                  {/* Submitter & Location */}
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="font-medium text-white flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 text-[10px] font-mono font-bold flex items-center justify-center border border-slate-700">
                          {ticket.name.charAt(0).toUpperCase()}
                        </span>
                        <span>{ticket.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                        <span className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                          <Mail className="w-3 h-3 text-slate-500" />
                          <a
                            href={`mailto:${ticket.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="hover:underline font-mono"
                          >
                            {ticket.email}
                          </a>
                        </span>
                      </div>
                      {ticket.location && (
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                          <MapPin className="w-3 h-3 text-cyan-500 shrink-0" />
                          <span className="truncate max-w-[200px]">
                            {ticket.location}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Message Preview */}
                  <td className="py-4 px-4 max-w-xs">
                    <div className="space-y-1">
                      <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed">
                        {ticket.message}
                      </p>
                      {ticket.adminNotes && (
                        <div className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40 text-blue-300">
                          <FileText className="w-2.5 h-2.5" />
                          <span>Notes attached</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div
                      className="relative inline-block"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={ticket.status}
                        disabled={isUpdating}
                        onChange={(e) => handleStatusChange(e, ticket.id)}
                        className={`text-xs font-mono font-semibold px-2.5 py-1.5 rounded-lg border appearance-none pr-6 cursor-pointer focus:outline-none transition-colors ${
                          statusMeta.bgClass
                        } ${statusMeta.borderClass} ${statusMeta.textClass} ${
                          isUpdating ? "opacity-50" : ""
                        }`}
                      >
                        <option value="RECEIVED" className="bg-[#070a13] text-amber-400">
                          RECEIVED
                        </option>
                        <option value="IN_PROGRESS" className="bg-[#070a13] text-blue-400">
                          IN_PROGRESS
                        </option>
                        <option value="RESOLVED" className="bg-[#070a13] text-emerald-400">
                          RESOLVED
                        </option>
                        <option value="QUARANTINED" className="bg-[#070a13] text-rose-400">
                          QUARANTINED
                        </option>
                      </select>
                      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-[9px]">
                        ▼
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onInspect(ticket);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-800/70 text-cyan-300 flex items-center gap-1 font-mono text-xs transition-colors cursor-pointer"
                        title="View full ticket dossier"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteTicket(ticket.id, ticket.ticketNumber);
                        }}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/50 border border-slate-800 hover:border-rose-800/60 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Purge ticket from database"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
