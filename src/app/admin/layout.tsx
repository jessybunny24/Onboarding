import type { Metadata } from "next";
import Link from "next/link";
import { Terminal, Shield, ArrowLeft, ExternalLink, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Terminal // Facility Dispatch Database | TICKET #404",
  description: "Secure Command & Operations Console for TICKET #404 Support Tickets.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Security Banner */}
      <div className="bg-[#05070d] border-b border-slate-800/80 px-4 py-2 text-xs font-mono text-slate-400 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-cyan-400 font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>SECURE CLEARANCE LEVEL 4</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">
            FACILITY ANOMALY RESPONSE PROTOCOL v2.4
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-mono">DB CONNECTED</span>
          </div>
          <span className="text-slate-600">|</span>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors duration-150 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Return to Public Portal</span>
          </Link>
        </div>
      </div>

      {/* Main Admin Navigation */}
      <header className="bg-[#0a0e1a]/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-950 to-blue-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-950/40 group-hover:border-cyan-400 transition-colors">
                <Terminal className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-lg text-white tracking-tight">
                    TICKET <span className="text-cyan-400">#404</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-bold uppercase tracking-wider">
                    ADMIN CONSOLE
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Incident Support & Database Dispatch
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Nav & External links */}
          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Ticket Form</span>
            </Link>
            <div className="px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-900/60 text-xs font-mono text-cyan-300 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="hidden md:inline">SYSTEM DISPATCH ONLINE</span>
              <span className="md:hidden">ACTIVE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-slate-900 bg-[#05070c] py-6 px-6 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            TICKET #404 Operations Division &copy; 2026 // Facility Incident Response
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              PostgreSQL Telemetry Nominal
            </span>
            <span className="text-slate-600">|</span>
            <Link href="/" className="hover:text-slate-400 underline">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
