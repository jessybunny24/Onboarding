"use client";

import React from "react";

interface IllustrationProps {
  className?: string;
  isHovered?: boolean;
}

/**
 * Phase 1: Routine Maintenance
 * Gloomy retro-cartoon IT gear: chunky CRT monitor with glowing terminal prompt,
 * tangled RJ45 ethernet cable, IT technician screwdriver, and sticky note.
 */
export function RoutineIllustration({ className = "w-20 h-20" }: IllustrationProps) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(37,99,235,0.25)] transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <radialGradient id="routine-bg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#0f172a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#090d16" stopOpacity="0.95" />
          </radialGradient>
          <linearGradient id="crt-casing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="crt-screen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="60%" stopColor="#022c22" />
            <stop offset="100%" stopColor="#011612" />
          </linearGradient>
          <filter id="screen-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Circular Atmospheric Badge Background */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="url(#routine-bg-glow)"
          stroke="#1e293b"
          strokeWidth="2"
        />
        <circle
          cx="60"
          cy="60"
          r="49"
          stroke="#3b82f6"
          strokeWidth="1"
          strokeDasharray="3 4"
          strokeOpacity="0.4"
        />

        {/* Tangled Looping Ethernet Cable (Behind Monitor) */}
        <path
          d="M 28 82 C 16 70, 18 42, 34 38 C 46 34, 52 48, 48 60 C 44 72, 70 85, 96 78 C 104 76, 108 85, 102 92 C 96 98, 80 94, 82 86"
          stroke="#0284c7"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M 28 82 C 16 70, 18 42, 34 38 C 46 34, 52 48, 48 60 C 44 72, 70 85, 96 78 C 104 76, 108 85, 102 92 C 96 98, 80 94, 82 86"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.8"
        />

        {/* RJ45 Connector Plug */}
        <g transform="translate(80, 80) rotate(-15)">
          <rect
            x="0"
            y="0"
            width="12"
            height="10"
            rx="2"
            fill="#38bdf8"
            stroke="#0c4a6e"
            strokeWidth="1.5"
          />
          <rect x="2" y="-3" width="8" height="4" rx="1" fill="#7dd3fc" />
          <line x1="3" y1="8" x2="3" y2="10" stroke="#fbbf24" strokeWidth="1.5" />
          <line x1="6" y1="8" x2="6" y2="10" stroke="#fbbf24" strokeWidth="1.5" />
          <line x1="9" y1="8" x2="9" y2="10" stroke="#fbbf24" strokeWidth="1.5" />
        </g>

        {/* Monitor Base Stand */}
        <path
          d="M 45 84 L 75 84 L 70 76 L 50 76 Z"
          fill="#0f172a"
          stroke="#090d16"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <ellipse cx="60" cy="84" rx="20" ry="3" fill="#090d16" opacity="0.6" />

        {/* Clunky Retro CRT Monitor Casing */}
        <rect
          x="32"
          y="28"
          width="56"
          height="48"
          rx="7"
          fill="url(#crt-casing)"
          stroke="#090d16"
          strokeWidth="2.5"
        />
        {/* Subtle Highlight on Casing Top */}
        <path
          d="M 36 31 L 84 31"
          stroke="#64748b"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Bezel Ventilation Slits */}
        <line x1="42" y1="33" x2="52" y2="33" stroke="#090d16" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="56" y1="33" x2="66" y2="33" stroke="#090d16" strokeWidth="1.5" strokeLinecap="round" />

        {/* Glowing CRT Screen Glass */}
        <rect
          x="38"
          y="36"
          width="44"
          height="32"
          rx="4"
          fill="url(#crt-screen)"
          stroke="#064e3b"
          strokeWidth="1.5"
        />

        {/* Scanlines on screen */}
        <line x1="39" y1="40" x2="81" y2="40" stroke="#000" strokeWidth="0.8" opacity="0.4" />
        <line x1="39" y1="44" x2="81" y2="44" stroke="#000" strokeWidth="0.8" opacity="0.4" />
        <line x1="39" y1="48" x2="81" y2="48" stroke="#000" strokeWidth="0.8" opacity="0.4" />
        <line x1="39" y1="52" x2="81" y2="52" stroke="#000" strokeWidth="0.8" opacity="0.4" />
        <line x1="39" y1="56" x2="81" y2="56" stroke="#000" strokeWidth="0.8" opacity="0.4" />
        <line x1="39" y1="60" x2="81" y2="60" stroke="#000" strokeWidth="0.8" opacity="0.4" />

        {/* Phosphor Terminal Prompt Lines */}
        <g filter="url(#screen-glow)">
          <text
            x="42"
            y="45"
            fill="#34d399"
            fontSize="5.5"
            fontFamily="monospace"
            fontWeight="bold"
          >
            &gt; SPOOL_OK
          </text>
          <text
            x="42"
            y="53"
            fill="#10b981"
            fontSize="5.5"
            fontFamily="monospace"
            fontWeight="bold"
          >
            &gt; PING 0.0
          </text>
          {/* Blinking green prompt cursor */}
          <rect
            x="42"
            y="57"
            width="4"
            height="5"
            fill="#4ade80"
            className="animate-pulse"
          />
        </g>

        {/* Monitor Power LED */}
        <circle cx="76" cy="71" r="1.5" fill="#22c55e" />
        <circle cx="76" cy="71" r="3" fill="#22c55e" opacity="0.3" className="animate-ping" />

        {/* Sticky Note stuck to Monitor */}
        <g transform="translate(68, 22) rotate(12)">
          <rect
            x="0"
            y="0"
            width="14"
            height="14"
            fill="#fef08a"
            stroke="#ca8a04"
            strokeWidth="1"
            rx="1"
          />
          <line x1="3" y1="4" x2="11" y2="4" stroke="#a16207" strokeWidth="1" />
          <line x1="3" y1="7" x2="9" y2="7" stroke="#a16207" strokeWidth="1" />
          <line x1="3" y1="10" x2="10" y2="10" stroke="#ef4444" strokeWidth="1" />
        </g>

        {/* IT Screwdriver leaning diagonally */}
        <g transform="translate(20, 48) rotate(-35)">
          {/* Shaft */}
          <rect
            x="14"
            y="-2"
            width="28"
            height="3"
            rx="1"
            fill="#cbd5e1"
            stroke="#090d16"
            strokeWidth="1.2"
          />
          {/* Magnetic flathead tip */}
          <path d="M 42 -2 L 46 -1.5 L 46 -0.5 L 42 1 Z" fill="#64748b" stroke="#090d16" strokeWidth="1" />
          {/* Screwdriver Handle (Yellow & Black ribbed) */}
          <rect
            x="0"
            y="-4"
            width="16"
            height="7"
            rx="2.5"
            fill="#eab308"
            stroke="#090d16"
            strokeWidth="1.5"
          />
          <line x1="4" y1="-4" x2="4" y2="3" stroke="#0f172a" strokeWidth="2" />
          <line x1="9" y1="-4" x2="9" y2="3" stroke="#0f172a" strokeWidth="2" />
        </g>

        {/* Floating dust motes / subtle sparkle */}
        <circle cx="30" cy="30" r="1" fill="#38bdf8" opacity="0.7" />
        <circle cx="92" cy="40" r="1.5" fill="#38bdf8" opacity="0.5" />
        <circle cx="85" cy="95" r="1" fill="#4ade80" opacity="0.6" />
      </svg>
    </div>
  );
}

/**
 * Phase 2: The Inconsistency / Creeping Anomalies
 * Gloomy cartoon security CCTV camera with a piercing glowing red eye lens,
 * glitch distortion slices, and the shadowy fifth chair lurking with red eyes.
 */
export function AnomalyIllustration({ className = "w-20 h-20" }: IllustrationProps) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(239,68,68,0.3)] transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <radialGradient id="anomaly-bg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0.5" />
            <stop offset="65%" stopColor="#1e0c15" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#08040a" stopOpacity="0.98" />
          </radialGradient>
          <radialGradient id="eye-lens-glow" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#fecaca" />
            <stop offset="35%" stopColor="#ef4444" />
            <stop offset="75%" stopColor="#991b1b" />
            <stop offset="100%" stopColor="#450a0a" />
          </radialGradient>
          <linearGradient id="camera-metal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="60%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <filter id="anomaly-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Circular Atmospheric Badge Background */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="url(#anomaly-bg-glow)"
          stroke="#3f121d"
          strokeWidth="2"
        />
        <circle
          cx="60"
          cy="60"
          r="49"
          stroke="#ef4444"
          strokeWidth="1"
          strokeDasharray="3 4"
          strokeOpacity="0.4"
        />

        {/* Background Silhouette: The Impossible "Fifth Chair" of Room 201 */}
        <g opacity="0.35" transform="translate(14, 18)">
          {/* Chair Backrest */}
          <rect x="12" y="10" width="22" height="28" rx="6" fill="#0f172a" stroke="#ef4444" strokeWidth="1" />
          {/* Chair Seat */}
          <ellipse cx="23" cy="42" rx="15" ry="6" fill="#0f172a" stroke="#000" strokeWidth="1.5" />
          {/* Cylinder pole */}
          <line x1="23" y1="46" x2="23" y2="62" stroke="#0f172a" strokeWidth="3" />
          {/* Five-star wheel legs */}
          <path d="M 12 66 L 23 62 L 34 66 M 15 60 L 23 62 L 31 60" stroke="#0f172a" strokeWidth="2.5" />
          {/* Sinister Red Glowing Eyes peering from the Chair */}
          <circle cx="18" cy="22" r="2" fill="#ef4444" />
          <circle cx="28" cy="22" r="2" fill="#ef4444" />
        </g>

        {/* Wall Mount Bracket */}
        <path
          d="M 94 24 L 80 34 L 80 44 L 94 40 Z"
          fill="#1e293b"
          stroke="#090d16"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Swivel Pivot Ball */}
        <circle cx="76" cy="44" r="8" fill="#334155" stroke="#090d16" strokeWidth="2" />

        {/* CCTV Security Camera Housing (Angled down towards center) */}
        <g transform="translate(76, 44) rotate(-135)">
          {/* Camera Barrel Body */}
          <rect
            x="-18"
            y="-14"
            width="36"
            height="28"
            rx="5"
            fill="url(#camera-metal)"
            stroke="#090d16"
            strokeWidth="2.5"
          />
          {/* Sunshield Visor Hood */}
          <path
            d="M -22 -16 L 22 -16 L 18 -12 L -18 -12 Z"
            fill="#475569"
            stroke="#090d16"
            strokeWidth="1.5"
          />
          {/* Cable bundle coming from camera rear */}
          <path
            d="M -18 0 C -26 6, -30 -4, -38 0"
            stroke="#000"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M -18 0 C -26 6, -30 -4, -38 0"
            stroke="#ef4444"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />

          {/* Lens Bezel */}
          <circle cx="14" cy="0" r="11" fill="#0f172a" stroke="#090d16" strokeWidth="2" />
          {/* Glitch Ocular Lens (Sinister Red Eye) */}
          <circle cx="14" cy="0" r="9" fill="url(#eye-lens-glow)" filter="url(#anomaly-glow)" />
          {/* Pupil Iris reflection */}
          <circle cx="16" cy="-2" r="3" fill="#ffffff" opacity="0.9" />
          <circle cx="11" cy="3" r="1.5" fill="#fca5a5" opacity="0.6" />
        </g>

        {/* Blinking Surveillance Recording Indicator */}
        <g transform="translate(24, 28)">
          <circle cx="6" cy="6" r="3" fill="#ef4444" className="animate-pulse" />
          <circle cx="6" cy="6" r="6" fill="#ef4444" opacity="0.3" className="animate-ping" />
          <text
            x="14"
            y="9"
            fill="#f87171"
            fontSize="7"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="1"
          >
            REC ●
          </text>
        </g>

        {/* Digital Scanline Glitch Bars (Chromatic Aberration Slices) */}
        <g opacity="0.85">
          <rect x="22" y="58" width="46" height="3" fill="#22d3ee" opacity="0.8" />
          <rect x="26" y="59" width="48" height="2" fill="#ef4444" opacity="0.9" />
          <rect x="52" y="74" width="34" height="2.5" fill="#f87171" opacity="0.7" />
          <rect x="50" y="75" width="38" height="1.5" fill="#06b6d4" opacity="0.7" />
        </g>

        {/* Hazard Warning Symbol Badge in lower corner */}
        <g transform="translate(38, 80)">
          <polygon
            points="14,2 26,23 2,23"
            fill="#7f1d1d"
            stroke="#ef4444"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <text
            x="14"
            y="20"
            textAnchor="middle"
            fill="#fef08a"
            fontSize="10"
            fontWeight="900"
            fontFamily="sans-serif"
          >
            !
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Phase 3: The Paradox
 * Gloomy mystery cartoon incident folder stamped 'TICKET #404' & 'FIX YOU'
 * tearing into a purple/cyan spatial reality glitch with a melting 3:14 AM clock.
 */
export function ParadoxIllustration({ className = "w-20 h-20" }: IllustrationProps) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(147,51,234,0.3)] transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <radialGradient id="paradox-bg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#431407" stopOpacity="0.2" />
            <stop offset="30%" stopColor="#2e1065" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#0f172a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#030712" stopOpacity="0.98" />
          </radialGradient>
          <linearGradient id="folder-manila" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
          <linearGradient id="void-rift" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="rift-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Circular Atmospheric Badge Background */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="url(#paradox-bg-glow)"
          stroke="#312e81"
          strokeWidth="2"
        />
        <circle
          cx="60"
          cy="60"
          r="49"
          stroke="#818cf8"
          strokeWidth="1"
          strokeDasharray="3 4"
          strokeOpacity="0.4"
        />

        {/* Spatial Vortex Spiral Rings in Background */}
        <path
          d="M 60 25 A 35 35 0 0 1 95 60 A 28 28 0 0 1 67 88 A 20 20 0 0 1 47 68 A 12 12 0 0 1 60 56"
          stroke="#6366f1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.3"
          fill="none"
        />

        {/* The Manila Incident Dossier / Ticket Folder */}
        <g transform="translate(12, 10) rotate(-6)">
          {/* Back Folder Flap */}
          <path
            d="M 20 24 L 38 24 L 44 28 L 74 28 C 76 28, 78 30, 78 32 L 78 72 C 78 74, 76 76, 74 76 L 20 76 C 18 76, 16 74, 16 72 L 16 28 C 16 26, 18 24, 20 24 Z"
            fill="#ca8a04"
            stroke="#090d16"
            strokeWidth="2"
          />

          {/* Paper Sheets Peeking Out */}
          <rect
            x="20"
            y="26"
            width="54"
            height="46"
            rx="2"
            fill="#f8fafc"
            stroke="#090d16"
            strokeWidth="1.5"
          />
          {/* Redacted Black Tape Lines on Paper */}
          <line x1="26" y1="34" x2="66" y2="34" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="26" y1="40" x2="52" y2="40" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="26" y1="46" x2="60" y2="46" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

          {/* Front Manila Folder Flap */}
          <path
            d="M 16 32 L 76 32 L 76 76 C 76 78, 74 80, 72 80 L 20 80 C 18 80, 16 78, 16 76 Z"
            fill="url(#folder-manila)"
            stroke="#090d16"
            strokeWidth="2.5"
          />

          {/* Folder Tab Label */}
          <rect x="20" y="24" width="22" height="6" fill="#fef08a" stroke="#090d16" strokeWidth="1" rx="1" />
          <text x="22" y="28.5" fill="#713f12" fontSize="4.5" fontFamily="monospace" fontWeight="bold">
            #404_LOG
          </text>

          {/* Stamped Red Incident Seal: "FIX YOU" */}
          <g transform="translate(30, 48) rotate(-14)">
            <rect
              x="-2"
              y="-2"
              width="36"
              height="16"
              fill="none"
              stroke="#dc2626"
              strokeWidth="2"
              strokeDasharray="4 2"
              rx="2"
            />
            <text
              x="16"
              y="9"
              textAnchor="middle"
              fill="#ef4444"
              fontSize="7.5"
              fontFamily="monospace"
              fontWeight="900"
              letterSpacing="0.5"
            >
              FIX YOU
            </text>
          </g>
        </g>

        {/* Spatial Reality Tear / Distortion Void (Crossing right side) */}
        <path
          d="M 72 38 L 84 46 L 78 58 L 92 68 L 82 82 L 96 90"
          stroke="url(#void-rift)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#rift-glow)"
          fill="none"
        />

        {/* Floating Distorted Pixel Shards */}
        <polygon points="86,34 90,32 88,38" fill="#38bdf8" />
        <polygon points="98,54 104,56 100,62" fill="#c084fc" />
        <polygon points="76,86 82,90 74,92" fill="#38bdf8" />

        {/* Surreal Melting Cartoon Office Clock (Dripping at 03:14 AM) */}
        <g transform="translate(62, 54)">
          {/* Melting Clock Body */}
          <path
            d="M 10 6 C 24 4, 34 16, 32 28 C 30 40, 20 44, 16 52 C 12 44, 4 36, 6 22 C 8 12, 4 8, 10 6 Z"
            fill="#f1f5f9"
            stroke="#090d16"
            strokeWidth="2"
          />
          {/* Inner Clock Face */}
          <path
            d="M 12 10 C 22 8, 29 18, 28 26 C 26 36, 18 38, 15 44 C 12 38, 8 30, 9 20 C 10 14, 8 11, 12 10 Z"
            fill="#e2e8f0"
            stroke="#94a3b8"
            strokeWidth="0.8"
          />

          {/* Distorted Hour / Minute Hands at 3:14 */}
          <circle cx="18" cy="24" r="2" fill="#0f172a" />
          <line x1="18" y1="24" x2="26" y2="22" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="24" x2="15" y2="34" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />

          {/* Warped Numerals */}
          <text x="17" y="15" fill="#475569" fontSize="4" fontWeight="bold" fontFamily="sans-serif">12</text>
          <text x="25" y="27" fill="#475569" fontSize="4" fontWeight="bold" fontFamily="sans-serif">3</text>
          <text x="13" y="42" fill="#475569" fontSize="4" fontWeight="bold" fontFamily="sans-serif">6</text>
        </g>
      </svg>
    </div>
  );
}
