"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertOctagon, Terminal } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomTicket = `#404-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketNumber(randomTicket);
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-36 relative bg-[#07090e] border-t border-slate-900 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header with high density of negative space */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-400 text-xs font-mono uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>Incident Dispatch & Press Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Submit A Support Ticket
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Have a question, feedback, or need press & publisher materials?
            Submit your report to the IT Help Desk.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="bg-[#0c101c] border border-slate-800/90 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-black/60 relative">
          {submitted ? (
            <div className="py-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-950/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                  Incident Received // {ticketNumber}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Ticket Successfully Logged
                </h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formData.name || "Technician"}</span>.
                  Your inquiry has been assigned to IT Support. A response will be sent to{" "}
                  <span className="text-blue-400 font-mono">{formData.email || "your inbox"}</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400 max-w-md mx-auto">
                <p className="text-amber-300 font-semibold mb-1">
                  SUPERVISOR ADVISORY NOTICE:
                </p>
                <p>
                  &quot;Do not leave your current workstation until the technician arrives.
                  If the technician asks about a fifth chair, do not answer.&quot;
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", location: "", message: "" });
                }}
                className="btn-secondary px-6 py-2.5 rounded-xl border border-slate-700 text-xs font-medium text-slate-300 hover:text-white"
              >
                File Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-300"
                  >
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Intern or Publisher Name"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#07090e] border border-slate-800 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-300"
                  >
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="technician@company.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#07090e] border border-slate-800 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Department / Location (Thematic addition) */}
              <div className="space-y-2">
                <label
                  htmlFor="contact-location"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-300"
                >
                  Department / Office Location (Optional)
                </label>
                <input
                  id="contact-location"
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="e.g. Accounting (Room 201), Server Room, Steam Press"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#07090e] border border-slate-800 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-300"
                >
                  Message / Incident Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Describe your inquiry, bug report, or strange hardware behavior..."
                  className="w-full px-4 py-3.5 rounded-xl bg-[#07090e] border border-slate-800 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Notice & Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <AlertOctagon className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Submissions are archived in the unresolved logbook.</span>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Ticket</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
