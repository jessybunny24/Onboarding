"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Radio, ArrowUpRight } from "lucide-react";
import type { HeaderProps } from "@/types";

export default function Header({
  isAnomalyActive = false,
  onToggleAnomaly,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#07090e]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
          aria-label="TICKET #404 Home"
        >
          <div
            className={`w-10 h-10 rounded-xl overflow-hidden transition-all duration-300 border relative ${
              isAnomalyActive
                ? "border-red-500/80 shadow-md shadow-red-900/50 ring-1 ring-red-500/40"
                : "border-blue-500/50 group-hover:border-cyan-400 group-hover:shadow-lg group-hover:shadow-cyan-950/50"
            }`}
          >
            <img
              src="/ticket-404-logo.jpg"
              alt="TICKET #404 Logo"
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
            />
            <span
              className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${
                isAnomalyActive ? "bg-red-400 animate-ping" : "bg-cyan-400/90 shadow-[0_0_6px_rgba(34,211,238,0.8)]"
              }`}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-black tracking-tight text-lg text-white flex items-center gap-2">
              <span className="group-hover:tracking-normal transition-all">
                TICKET <span className={isAnomalyActive ? "text-red-400 animate-pulse" : "text-blue-400"}>#404</span>
              </span>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-mono font-bold tracking-wider border ${
                  isAnomalyActive
                    ? "bg-red-900/60 text-red-300 border-red-700/80 animate-pulse"
                    : "bg-blue-950/60 text-blue-300 border-blue-800/60"
                }`}
              >
                {isAnomalyActive ? "ERR // 404" : "OFFICIAL"}
              </span>
            </span>
            <span className="text-[11px] font-mono text-slate-400 tracking-tight flex items-center gap-1.5">
              <span>Incident Response & Anomaly Protocol</span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-slate-300 hover:text-white transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA & Interactive Beacon */}
        <div className="hidden md:flex items-center gap-4">
          {/* Anomaly Mode Toggle Button */}
          {onToggleAnomaly && (
            <button
              onClick={onToggleAnomaly}
              type="button"
              className={`flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border transition-all duration-200 ${
                isAnomalyActive
                  ? "bg-red-500/20 text-red-300 border-red-500/60 shadow-sm shadow-red-500/20"
                  : "bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-slate-200"
              }`}
              title="Click to toggle simulated office anomaly"
            >
              <Radio
                className={`w-3.5 h-3.5 ${
                  isAnomalyActive ? "text-red-400 animate-ping" : "text-emerald-400"
                }`}
              />
              <span>{isAnomalyActive ? "Anomaly Mode: ON" : "Status: Nominal"}</span>
            </button>
          )}

          {/* Primary CTA Button */}
          <a
            href="#pricing"
            className={`btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white ${
              isAnomalyActive
                ? "bg-red-600 hover:bg-red-500 shadow-red-600/30"
                : "bg-blue-600 hover:bg-blue-500 shadow-blue-600/30"
            }`}
          >
            <span>Clock In</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          {onToggleAnomaly && (
            <button
              onClick={onToggleAnomaly}
              type="button"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs"
              aria-label="Toggle Anomaly"
            >
              <Radio
                className={`w-4 h-4 ${
                  isAnomalyActive ? "text-red-400 animate-pulse" : "text-emerald-400"
                }`}
              />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0e17]/95 border-b border-slate-800 px-6 py-6 backdrop-blur-xl shadow-2xl">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-200 hover:text-blue-400 transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full text-center py-3 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-500"
              >
                Clock In — Join Intern Queue
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
