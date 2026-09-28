"use client";

import React, { useState, useEffect } from "react";
import { TicketItem } from "./TicketsTable";
import {
  X,
  Copy,
  Check,
  MapPin,
  Mail,
  User,
  Clock,
  ShieldAlert,
  Save,
  Trash2,
  Terminal,
  AlertTriangle,
  Send,
} from "lucide-react";
import {
  getIncidentMeta,
  getStatusMeta,
  formatFullTimestamp,
} from "@/lib/admin-utils";

interface TicketDetailModalProps {
  ticket: TicketItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: string) => Promise<void>;
  onSaveNotes: (id: string, notes: string) => Promise<void>;
  onDeleteTicket: (id: string, ticketNumber: string) => void;
}

export default function TicketDetailModal({
  ticket,
  isOpen,
  onClose,
  onUpdateStatus,
  onSaveNotes,
  onDeleteTicket,
}: TicketDetailModalProps) {
  const [adminNotes, setAdminNotes] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSavedSuccess, setNotesSavedSuccess] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (ticket) {
      setAdminNotes(ticket.adminNotes || "");
      setNotesSavedSuccess(false);
      setShowDeleteConfirm(false);
    }
  }, [ticket]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !ticket) return null;

  const incidentMeta = getIncidentMeta(ticket.incidentType);
  const statusMeta = getStatusMeta(ticket.status);

  const handleCopy = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleNotesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingNotes(true);
    setNotesSavedSuccess(false);
    try {
      await onSaveNotes(ticket.id, adminNotes);
      setNotesSavedSuccess(true);
      setTimeout(() => setNotesSavedSuccess(false), 3000);
    } finally {
      setIsSavingNotes(false);
    }
  };

  const statuses = [
    { id: "RECEIVED", label: "Pending / Received", color: "hover:border-amber-500 hover:text-amber-400" },
    { id: "IN_PROGRESS", label: "In Progress", color: "hover:border-blue-500 hover:text-blue-400" },
    { id: "RESOLVED", label: "Resolved", color: "hover:border-emerald-500 hover:text-emerald-400" },
    { id: "QUARANTINED", label: "Quarantined", color: "hover:border-rose-500 hover:text-rose-400" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#0a0f1d] border border-slate-700/80 rounded-3xl max-w-3xl w-full shadow-2xl shadow-black/80 overflow-hidden relative my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-[#060810] border-b border-slate-800 p-5 sm:p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/80 text-cyan-400 flex items-center justify-center font-mono font-bold text-sm">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono text-lg font-black text-white">
                  INCIDENT DOSSIER: {ticket.ticketNumber}
                </h3>
                <button
                  type="button"
                  onClick={() => handleCopy(ticket.ticketNumber, "ticketNum")}
                  className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
                  title="Copy ticket number"
                >
                  {copiedSection === "ticketNum" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Logged {formatFullTimestamp(ticket.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Incident Threat Advisory Banner */}
          <div
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              incidentMeta.badge === "CRITICAL"
                ? "bg-red-950/30 border-red-800/60 text-red-200"
                : incidentMeta.badge === "HIGH"
                ? "bg-purple-950/30 border-purple-800/60 text-purple-200"
                : "bg-blue-950/30 border-blue-800/60 text-blue-200"
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider border ${incidentMeta.badgeClass}`}
                >
                  THREAT: {incidentMeta.badge}
                </span>
                <span className="font-mono text-sm font-bold text-white">
                  {incidentMeta.label}
                </span>
              </div>
              <p className="text-xs opacity-80">{incidentMeta.description}</p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                Threat Classification
              </span>
              <span className="text-xs font-mono font-bold text-white">
                {incidentMeta.threatLevel}
              </span>
            </div>
          </div>

          {/* Submitter Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#070a13] border border-slate-800/80 p-4 rounded-2xl">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                <User className="w-3 h-3 text-cyan-400" /> Submitter Name
              </span>
              <p className="font-semibold text-white text-sm">{ticket.name}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                <Mail className="w-3 h-3 text-cyan-400" /> Email Address
              </span>
              <div className="flex items-center gap-1.5">
                <a
                  href={`mailto:${ticket.email}`}
                  className="font-mono text-cyan-400 hover:underline text-xs truncate"
                >
                  {ticket.email}
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(ticket.email, "email")}
                  className="text-slate-500 hover:text-slate-300 p-0.5"
                  title="Copy email"
                >
                  {copiedSection === "email" ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" /> Station / Location
              </span>
              <p className="font-mono text-slate-200 text-xs truncate">
                {ticket.location || "Unspecified Station"}
              </p>
            </div>
          </div>

          {/* Raw Incident Message Card */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-slate-400 uppercase font-semibold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Report Statement / Message:</span>
              </label>
              <button
                type="button"
                onClick={() => handleCopy(ticket.message, "message")}
                className="text-xs font-mono text-slate-400 hover:text-cyan-400 flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedSection === "message" ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-4 rounded-xl bg-[#060810] border border-slate-800 text-slate-200 font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap select-text">
              {ticket.message}
            </div>
          </div>

          {/* Status Workflow Selector */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono text-slate-400 uppercase font-semibold block">
              Incident Status Workflow:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {statuses.map((s) => {
                const isSelected = ticket.status === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onUpdateStatus(ticket.id, s.id)}
                    className={`py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-cyan-950 text-cyan-300 border-cyan-500 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-500"
                        : `bg-[#070a13] text-slate-400 border-slate-800 ${s.color}`
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Internal Admin Notes */}
          <form onSubmit={handleNotesSubmit} className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-slate-400 uppercase font-semibold block">
                Internal Facility / Admin Notes:
              </label>
              {notesSavedSuccess && (
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 animate-pulse">
                  <Check className="w-3 h-3" />
                  <span>Notes saved successfully!</span>
                </span>
              )}
            </div>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={3}
              placeholder="Record diagnostic findings, dispatched technician IDs, or containment observations..."
              className="w-full p-3.5 rounded-xl bg-[#060810] border border-slate-800 text-slate-200 text-xs font-mono placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all leading-relaxed"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSavingNotes}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-black font-mono font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 shadow-md shadow-cyan-950"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSavingNotes ? "Saving..." : "Save Notes"}</span>
              </button>
            </div>
          </form>

          {/* Audit Metadata & Danger Zone */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <div>
              <span>Record ID: {ticket.id}</span>
              <span className="mx-2">•</span>
              <span>Updated: {formatFullTimestamp(ticket.updatedAt)}</span>
            </div>

            <div>
              {!showDeleteConfirm ? (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-rose-500 hover:text-rose-400 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Purge Record</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-rose-950/40 border border-rose-800/80 p-1.5 rounded-lg">
                  <span className="text-rose-300 text-[11px]">Confirm purge?</span>
                  <button
                    type="button"
                    onClick={() => {
                      onDeleteTicket(ticket.id, ticket.ticketNumber);
                      onClose();
                    }}
                    className="px-2 py-0.5 bg-rose-600 hover:bg-rose-500 text-white rounded text-[11px] font-bold cursor-pointer"
                  >
                    Yes, Purge
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
