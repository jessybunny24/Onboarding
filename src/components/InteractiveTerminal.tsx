"use client";

import React, { useState, useCallback } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Terminal,
  Sparkles,
  Layers,
  Heart,
  ShieldAlert,
  Wrench,
  RotateCcw,
  Volume2,
  VolumeX,
  Zap,
  Cpu,
  FileSpreadsheet,
} from "lucide-react";
import type {
  MiniGameDef,
  Ticket,
  InteractiveTerminalProps,
  TerminalActionLog,
} from "@/types";

const TICKETS: Ticket[] = [
  {
    id: "#0241",
    room: "Accounting (Room 201)",
    category: "Printer",
    title: "LaserJet Spooler Failure & Jam",
    miniGame: {
      type: "printer",
      title: "Tray #2 Roller Jam Clearing",
      instructions: "Click [PULL JAMMED SHEET] 3 times to clear the roller.",
    },
    normalState: {
      description:
        "Replace toner cartridge and verify paper tray #2 is seated correctly. Clear standard 80gsm paper stoppage.",
      diagnostic: "HP LaserJet 4200: SPOOLER_IDLE. 1 job queued. Roller sensor: STALLED.",
      metrics: [
        { label: "Spooler Status", value: "READY" },
        { label: "Paper Tray", value: "98% Capacity" },
        { label: "Queued By", value: "Sarah (Payroll)" },
      ],
    },
    anomalyState: {
      description:
        "It printed a document you never sent. Every page is a live photograph of you standing at this exact terminal. Tomorrow's date is watermarked on the header.",
      diagnostic:
        "WARNING: Spooler says 'PRINTING: 1/1' but has output 78 continuous pages. Header text: 'DON'T FIX THIS PRINTER'.",
      glitchWarning: "ANOMALY LEVEL 2: Physical feedback loop detected in Room 201.",
      metrics: [
        { label: "Spooler Status", value: "LOOPING (78/1)" },
        { label: "Paper Tray", value: "OUTPUTS BLOOD/INK" },
        { label: "Queued By", value: "EMPLOYEE DOES NOT EXIST" },
      ],
    },
  },
  {
    id: "#0112",
    room: "Server Room / LAN Rack",
    category: "Network",
    title: "Subnet Patch Cable Disconnect",
    miniGame: {
      type: "cables",
      title: "Patch RJ45 Ethernet Channels",
      instructions: "Connect all 3 color-coded network patch cords to their ports.",
    },
    normalState: {
      description:
        "Trace loose Cat6 patch cables and seat RJ45 connectors into Switch Port 01, 02, and 03.",
      diagnostic: "Gateway: 192.168.1.1 [OK] | DNS: 1.1.1.1 [OK] | Ports: 3 Unlinked.",
      metrics: [
        { label: "Gateway", value: "192.168.1.1" },
        { label: "Active Host", value: "IT-INTERN-01" },
        { label: "Packet Loss", value: "0.0%" },
      ],
    },
    anomalyState: {
      description:
        "Network diagnostic shows unknown device 192.168.1.27 named IT-INTERN-02. While looking at it, IT-INTERN-03 appears. Cursor moves across your screen autonomously.",
      diagnostic:
        "CRITICAL: Host IT-INTERN-02 has remote desktop handle on your mouse cursor. Webcams active across empty floors.",
      glitchWarning: "ANOMALY LEVEL 2: Duplicate intern entities pinging localhost.",
      metrics: [
        { label: "Unknown Host", value: "IT-INTERN-02 (ONLINE)" },
        { label: "MAC Address", value: "YOUR HARDWARE ID" },
        { label: "Webcam Light", value: "ACTIVE [UNAUTHORIZED]" },
      ],
    },
  },
  {
    id: "#0084",
    room: "Conference Hall B",
    category: "Hardware",
    title: "Projector VGA Signal Calibration",
    miniGame: {
      type: "dial",
      title: "Multimeter Signal Frequency Tune",
      instructions: "Slide dial to 60.0 Hz to sync the projector signal.",
    },
    normalState: {
      description:
        "Check projector VGA connection and calibrate frequency to 60.0 Hz for morning executive briefing.",
      diagnostic: "Hardware Inventory: 4 Desks, 4 Chairs, 1 Projector registered. Frequency: 42.1 Hz.",
      metrics: [
        { label: "Desks", value: "4 Verified" },
        { label: "Chairs", value: "4 Verified" },
        { label: "Projector Signal", value: "OUT OF SYNC" },
      ],
    },
    anomalyState: {
      description:
        "You count the chairs: 4 desks, 5 chairs. There was never a fifth chair. If you look away and look back, the fifth chair is slightly pulled out and warm.",
      diagnostic:
        "CCTV MONITOR: Feed shows the room you are currently in, but the person on screen is 4 seconds ahead of your movements.",
      glitchWarning: "ANOMALY LEVEL 1: Unregistered environmental mass occupying space.",
      metrics: [
        { label: "Chair Count", value: "5 [EXCESS +1]" },
        { label: "Occupancy", value: "SHADOW DETECTED" },
        { label: "CCTV Lag", value: "+4.2s (FUTURE FEED)" },
      ],
    },
  },
  {
    id: "#0068",
    room: "Room 103 (Non-existent)",
    category: "Reality",
    title: "Ticket #068: Fix You",
    miniGame: {
      type: "command",
      title: "Emergency BIOS Terminal Override",
      instructions: "Execute the override terminal command to reboot safety protocols.",
    },
    normalState: {
      description:
        "System log maintenance routine: Run standard intern orientation BIOS health check.",
      diagnostic: "ARCHIVE STATUS: Standard onboarding diagnostic check ready for execution.",
      metrics: [
        { label: "Assigned To", value: "Intern #01" },
        { label: "Priority", value: "Routine" },
        { label: "Resolution", value: "Pending Check" },
      ],
    },
    anomalyState: {
      description:
        "Ticket reads: 'Fix You. Location: Room 103. Assigned to: IT Department.' The floor plan shows no Room 103. The Complete button pulses with audio static.",
      diagnostic:
        "RECORD CORRUPT: Created 12/04/2011 by [REDACTED BOSS]. This ticket was logged from the computer you are touching right now.",
      glitchWarning: "ANOMALY LEVEL 4: Spatiotemporal breach. Hallway length extending.",
      metrics: [
        { label: "Subject", value: "YOU" },
        { label: "Assigned By", value: "SUPERVISOR (MISSING)" },
        { label: "Action", value: "DO NOT REPAIR" },
      ],
    },
  },
];

export default function InteractiveTerminal({
  isGlobalAnomaly = false,
}: InteractiveTerminalProps) {
  const [activeTicketIndex, setActiveTicketIndex] = useState(0);
  const [anomalyMode, setAnomalyMode] = useState(false);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [solvedStreak, setSolvedStreak] = useState(0);
  const [lastAction, setLastAction] = useState<TerminalActionLog | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Minigame active state
  const [activeMiniGame, setActiveMiniGame] = useState<MiniGameDef | null>(null);
  const [printerPulls, setPrinterPulls] = useState(0);
  const [cablesConnected, setCablesConnected] = useState<number[]>([]);
  const [sliderValue, setSliderValue] = useState(40);
  const [commandInput, setCommandInput] = useState("");

  const effectiveAnomaly = isGlobalAnomaly || anomalyMode;
  const currentTicket = TICKETS[activeTicketIndex];
  const stateData = effectiveAnomaly
    ? currentTicket.anomalyState
    : currentTicket.normalState;

  // Synthesized Sound Effects
  const playSfx = useCallback(
    (type: "repair" | "success" | "damage" | "glitch" | "click") => {
      if (!audioEnabled || typeof window === "undefined") return;
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();

        if (type === "damage") {
          // Harsh low-frequency buzz + glitch
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(110, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.35);
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.35);
        } else if (type === "success") {
          // Cheerful chime
          const now = ctx.currentTime;
          [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, now + i * 0.08);
            gain.gain.setValueAtTime(0.15, now + i * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + i * 0.08);
            osc.stop(now + i * 0.08 + 0.2);
          });
        } else if (type === "glitch") {
          // High alert static blip
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          osc.frequency.setValueAtTime(440, ctx.currentTime + 0.08);
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.2);
        } else {
          // Standard UI click
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(440, ctx.currentTime);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.05);
        }
      } catch {
        // Fallback for audio policy
      }
    },
    [audioEnabled]
  );

  const resetMiniGame = () => {
    setActiveMiniGame(null);
    setPrinterPulls(0);
    setCablesConnected([]);
    setSliderValue(40);
    setCommandInput("");
  };

  // Handle Player Reporting / Marking Anomaly
  const handleReportAnomaly = () => {
    if (playerHealth <= 0) return;

    if (effectiveAnomaly) {
      // Correct diagnosis! Sanity/Health is protected!
      playSfx("success");
      setSolvedStreak((prev) => prev + 1);
      setLastAction({
        type: "success",
        text: "✓ ANOMALY IDENTIFIED & QUARANTINED! Sanity Protected. (Damage Blocked: 0 DMG | +1 Incident Resolved)",
      });
    } else {
      // False alarm on normal equipment! Player takes sanity penalty
      playSfx("damage");
      setPlayerHealth((prev) => Math.max(0, prev - 15));
      setSolvedStreak(0);
      setLastAction({
        type: "damage",
        text: "⚠ FALSE ALARM! You reported harmless office equipment as an anomaly. Supervisor strike issued (-15% Sanity).",
      });
    }
  };

  // Handle Normal Task Trigger (Starts Minigame or Validates Anomaly Trap)
  const handleStartNormalTask = () => {
    if (playerHealth <= 0) return;

    if (effectiveAnomaly) {
      // Critical Mistake! Tried to repair an active reality distortion!
      playSfx("damage");
      setPlayerHealth((prev) => Math.max(0, prev - 25));
      setSolvedStreak(0);
      setLastAction({
        type: "damage",
        text: "☠ SANITY BREACH: You attempted to physically repair an anomaly! Reality slipped and shocked your intern entity (-25% Sanity).",
      });
    } else {
      // Launch the appropriate minigame for this normal ticket
      playSfx("click");
      setActiveMiniGame(currentTicket.miniGame);
    }
  };

  // Minigame Completion handler
  const completeMiniGame = () => {
    playSfx("success");
    setActiveMiniGame(null);
    setSolvedStreak((prev) => prev + 1);
    setLastAction({
      type: "success",
      text: `✓ TASK COMPLETED: ${currentTicket.miniGame.title} resolved successfully! Ticket closed.`,
    });
  };

  // Restart / Respawn
  const handleRespawn = () => {
    playSfx("success");
    setPlayerHealth(100);
    setSolvedStreak(0);
    setLastAction(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto select-none">
      {/* Terminal Bezel */}
      <div
        className={`relative rounded-3xl border transition-all duration-500 overflow-hidden shadow-2xl ${
          playerHealth <= 0
            ? "border-red-600 bg-[#120408] ring-2 ring-red-600/60 shadow-red-950/80"
            : effectiveAnomaly
            ? "border-red-600/70 bg-[#090b12] shadow-red-950/40 ring-1 ring-red-500/30"
            : "border-slate-800 bg-[#0a0d17] shadow-blue-950/30 ring-1 ring-blue-500/20"
        }`}
      >
        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 crt-overlay pointer-events-none z-20 opacity-60" />

        {/* Workstation Top Bar with Live Health / Sanity HUD */}
        <div className="relative z-10 px-5 py-3 border-b border-slate-800 bg-[#0c101d] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">TERMINAL-STATION-01 //</span>
              <span className="text-slate-200">ANOMALY_OS v4.2</span>
            </span>
          </div>

          {/* Intern Sanity / Health Bar & Anomaly Simulator */}
          <div className="flex items-center gap-4">
            {/* Sanity Meter */}
            <div className="flex items-center gap-2 bg-slate-950/90 border border-slate-800 px-3 py-1 rounded-xl">
              <Heart
                className={`w-3.5 h-3.5 ${
                  playerHealth > 50
                    ? "text-emerald-400 fill-emerald-400/30"
                    : playerHealth > 25
                    ? "text-amber-400 fill-amber-400/30 animate-pulse"
                    : "text-red-500 fill-red-500 animate-bounce"
                }`}
              />
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                  <span className="text-slate-400">SANITY:</span>
                  <span
                    className={`font-bold ${
                      playerHealth > 50
                        ? "text-emerald-400"
                        : playerHealth > 25
                        ? "text-amber-400"
                        : "text-red-400"
                    }`}
                  >
                    {playerHealth}%
                  </span>
                </div>
                <div className="w-20 sm:w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-0.5">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      playerHealth > 50
                        ? "bg-emerald-400"
                        : playerHealth > 25
                        ? "bg-amber-400"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${playerHealth}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Streak Counter */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Streak: {solvedStreak}</span>
            </div>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              title="Toggle Audio"
            >
              {audioEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-blue-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
              )}
            </button>

            {/* Toggle Anomaly Simulation */}
            <button
              type="button"
              onClick={() => {
                setAnomalyMode(!anomalyMode);
                setLastAction(null);
                resetMiniGame();
                playSfx("glitch");
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                effectiveAnomaly
                  ? "bg-red-950 text-red-300 border border-red-700/80 shadow-sm shadow-red-900/40 animate-pulse"
                  : "bg-blue-950/80 text-blue-300 border border-blue-700/80 hover:border-blue-500"
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>
                {effectiveAnomaly ? "Mode: ANOMALY" : "Mode: NORMAL"}
              </span>
            </button>
          </div>
        </div>

        {/* Ticket Selector Tabs */}
        <div className="relative z-10 px-5 pt-3 pb-2 bg-[#090d18] border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Layers className="w-3 h-3" /> Tickets:
          </span>
          {TICKETS.map((ticket, index) => {
            const isSelected = index === activeTicketIndex;
            return (
              <button
                key={ticket.id}
                onClick={() => {
                  setActiveTicketIndex(index);
                  setLastAction(null);
                  resetMiniGame();
                  playSfx("click");
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 shrink-0 border ${
                  isSelected
                    ? effectiveAnomaly
                      ? "bg-red-950/70 border-red-500 text-red-200 shadow-sm shadow-red-900/30"
                      : "bg-blue-950/70 border-blue-500 text-blue-200 shadow-sm shadow-blue-900/30"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                }`}
              >
                <span>{ticket.id}</span>
                <span className="text-[10px] text-slate-400">({ticket.category})</span>
              </button>
            );
          })}
        </div>

        {/* Game Over Screen when Health hits 0 */}
        {playerHealth <= 0 ? (
          <div className="relative z-20 p-8 sm:p-12 text-center font-mono space-y-6 bg-red-950/40 backdrop-blur-md">
            <div className="w-16 h-16 rounded-full bg-red-900/80 border-2 border-red-500 text-red-200 flex items-center justify-center mx-auto shadow-2xl shadow-red-950 animate-pulse">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-red-100 uppercase tracking-tight">
                SANITY DEPLETED // INTERN SYSTEM COMPROMISED
              </h3>
              <p className="text-sm text-red-300 max-w-lg mx-auto">
                You failed to mark the anomalies or mishandled corrupted hardware.
                The missing bosses&apos; presence overtook your terminal workstation.
              </p>
            </div>
            <button
              type="button"
              onClick={handleRespawn}
              className="btn-primary px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-xl shadow-red-950 inline-flex items-center gap-2 transition-transform hover:scale-105"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Clock In Again (Restore 100% Sanity)</span>
            </button>
          </div>
        ) : (
          /* Terminal Body Screen */
          <div className="relative z-10 p-6 sm:p-8 font-mono">
            {/* Header of the Active Ticket */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {currentTicket.id}
                  </span>
                  <span className="text-xs text-slate-400">📍 {currentTicket.room}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                      effectiveAnomaly
                        ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    {effectiveAnomaly ? "DISTORTION IN QUEUE" : "STANDARD IT TICKET"}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-2 font-sans">
                  {currentTicket.title}
                </h2>
              </div>

              <div className="text-right sm:self-start">
                <span className="text-[11px] text-slate-400 block">Assigned Tech</span>
                <span className="text-xs font-bold text-blue-400 font-mono">
                  {effectiveAnomaly ? "IT-INTERN-01 & [???]" : "YOU (IT-INTERN-01)"}
                </span>
              </div>
            </div>

            {/* Interactive Minigame Overlay (When player begins normal task) */}
            {activeMiniGame ? (
              <div className="my-6 p-6 rounded-2xl bg-gradient-to-b from-[#0e1628] to-[#0a0f1d] border-2 border-blue-500/80 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                  <div className="flex items-center gap-2 text-blue-300 font-bold text-sm">
                    <Wrench className="w-4 h-4 text-blue-400" />
                    <span>MINIGAME: {activeMiniGame.title}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveMiniGame(null)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    [Cancel Task]
                  </button>
                </div>

                <p className="text-xs text-slate-300 font-sans">
                  {activeMiniGame.instructions}
                </p>

                {/* Minigame 1: Printer Jam Paper Pulling */}
                {activeMiniGame.type === "printer" && (
                  <div className="p-5 rounded-xl bg-black/60 border border-slate-800 text-center space-y-4">
                    <div className="flex justify-center items-center gap-3">
                      {[1, 2, 3].map((sheet) => (
                        <div
                          key={sheet}
                          className={`w-14 h-18 rounded border-2 transition-all flex items-center justify-center font-bold text-xs ${
                            printerPulls >= sheet
                              ? "bg-emerald-950/60 border-emerald-500 text-emerald-400 scale-95 opacity-50"
                              : "bg-slate-800 border-amber-400 text-amber-300 animate-pulse"
                          }`}
                        >
                          <FileSpreadsheet className="w-5 h-5 mb-1" />
                          <span className="text-[10px] block">
                            {printerPulls >= sheet ? "CLEARED" : `JAM #${sheet}`}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newCount = printerPulls + 1;
                        setPrinterPulls(newCount);
                        playSfx("repair");
                        if (newCount >= 3) {
                          setTimeout(completeMiniGame, 300);
                        }
                      }}
                      className="btn-primary px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-blue-900/40"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      <span>
                        {printerPulls >= 2
                          ? "Pull Final Sheet (3/3)"
                          : `Pull Jammed Sheet (${printerPulls}/3)`}
                      </span>
                    </button>
                  </div>
                )}

                {/* Minigame 2: Network Patch Cables */}
                {activeMiniGame.type === "cables" && (
                  <div className="p-5 rounded-xl bg-black/60 border border-slate-800 space-y-4 text-center">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 1, label: "Port 01 (Blue)", color: "border-blue-500 text-blue-400" },
                        { id: 2, label: "Port 02 (Green)", color: "border-emerald-500 text-emerald-400" },
                        { id: 3, label: "Port 03 (Amber)", color: "border-amber-500 text-amber-400" },
                      ].map((cable) => {
                        const isConnected = cablesConnected.includes(cable.id);
                        return (
                          <button
                            key={cable.id}
                            type="button"
                            onClick={() => {
                              if (!isConnected) {
                                const updated = [...cablesConnected, cable.id];
                                setCablesConnected(updated);
                                playSfx("repair");
                                if (updated.length === 3) {
                                  setTimeout(completeMiniGame, 300);
                                }
                              }
                            }}
                            className={`p-3 rounded-xl border-2 transition-all font-mono text-xs flex flex-col items-center gap-1.5 ${
                              isConnected
                                ? "bg-emerald-950/80 border-emerald-400 text-emerald-300"
                                : `bg-slate-900/90 ${cable.color} hover:scale-105`
                            }`}
                          >
                            <Cpu className="w-4 h-4" />
                            <span>{isConnected ? "✓ CONNECTED" : `[PATCH ${cable.label}]`}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Minigame 3: Multimeter Dial Slider */}
                {activeMiniGame.type === "dial" && (
                  <div className="p-5 rounded-xl bg-black/60 border border-slate-800 space-y-4 text-center">
                    <div className="text-sm font-mono text-slate-300">
                      Target Frequency: <strong className="text-emerald-400">60.0 Hz</strong> | Current:{" "}
                      <span className={sliderValue === 60 ? "text-emerald-400 font-bold" : "text-amber-400"}>
                        {sliderValue}.0 Hz
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      value={sliderValue}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setSliderValue(val);
                        playSfx("click");
                        if (val === 60) {
                          setTimeout(completeMiniGame, 300);
                        }
                      }}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                    <p className="text-[11px] text-slate-400 font-sans">
                      {sliderValue === 60
                        ? "✓ Signal locked at 60.0 Hz! Ready to complete."
                        : "Drag the slider until the frequency matches 60.0 Hz."}
                    </p>
                  </div>
                )}

                {/* Minigame 4: Terminal Reboot Command */}
                {activeMiniGame.type === "command" && (
                  <div className="p-5 rounded-xl bg-black/60 border border-slate-800 space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type: REBOOT -SAFE"
                        value={commandInput}
                        onChange={(e) => setCommandInput(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (commandInput.trim().toUpperCase() === "REBOOT -SAFE") {
                            completeMiniGame();
                          } else {
                            playSfx("damage");
                            setLastAction({
                              type: "warning",
                              text: "Syntax error. Command must be: REBOOT -SAFE",
                            });
                          }
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg"
                      >
                        Execute
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCommandInput("REBOOT -SAFE")}
                        className="text-[10px] text-blue-400 underline hover:text-blue-300"
                      >
                        [Auto-fill: REBOOT -SAFE]
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Ticket Diagnostic & Incident Details */
              <div className="py-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs uppercase text-slate-400 tracking-wider">
                    Observation / Diagnostic
                  </span>
                  <p
                    className={`text-sm sm:text-base leading-relaxed p-4 rounded-xl border transition-colors ${
                      effectiveAnomaly
                        ? "bg-red-950/30 border-red-900/60 text-red-200 animate-glitch"
                        : "bg-slate-900/50 border-slate-800 text-slate-200"
                    }`}
                  >
                    {stateData.description}
                  </p>
                </div>

                {/* Diagnostic Console Box */}
                <div className="p-3.5 rounded-lg bg-black/60 border border-slate-800/80 font-mono text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-slate-800">
                    <span>SYSTEM DIAGNOSTIC CONSOLE</span>
                    <span>STATUS: {effectiveAnomaly ? "CORRUPTED" : "ONLINE"}</span>
                  </div>
                  <p
                    className={
                      effectiveAnomaly
                        ? "text-red-400 font-medium"
                        : "text-emerald-400 font-medium"
                    }
                  >
                    &gt; {stateData.diagnostic}
                  </p>
                  {effectiveAnomaly && (
                    <p className="text-amber-400 font-bold tracking-wide">
                      &gt; [!] {currentTicket.anomalyState.glitchWarning}
                    </p>
                  )}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {stateData.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border ${
                        effectiveAnomaly
                          ? "bg-red-950/20 border-red-900/40 text-red-300"
                          : "bg-slate-900/40 border-slate-800 text-slate-300"
                      }`}
                    >
                      <span className="text-[10px] text-slate-400 block uppercase">
                        {metric.label}
                      </span>
                      <span className="text-xs font-bold font-mono tracking-tight">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Player Decision Action Bar */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 flex flex-col gap-0.5">
                <span className="font-semibold text-slate-300">
                  Intern Operational Rule:
                </span>
                <span className="text-[11px] text-slate-400">
                  Normal = Perform repair minigame. Anomaly = Mark &amp; quarantine to protect Sanity HP.
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Normal Task Minigame Trigger */}
                <button
                  type="button"
                  onClick={handleStartNormalTask}
                  className="flex-1 sm:flex-initial btn-secondary px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/90 hover:bg-slate-700 text-xs font-bold text-slate-100 flex items-center justify-center gap-2 transition-all hover:scale-102"
                >
                  <Wrench className="w-4 h-4 text-emerald-400" />
                  <span>Perform Repair Task</span>
                </button>

                {/* Report Anomaly Trigger */}
                <button
                  type="button"
                  onClick={handleReportAnomaly}
                  className="flex-1 sm:flex-initial btn-accent px-5 py-2.5 rounded-xl border border-red-600 bg-red-600 hover:bg-red-500 text-xs font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-red-950/50 transition-all hover:scale-102"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Mark Anomaly</span>
                </button>
              </div>
            </div>

            {/* Action Feedback Notification Bar */}
            {lastAction && (
              <div
                className={`mt-4 p-3.5 rounded-xl border text-xs font-mono animate-in fade-in duration-200 flex items-start gap-2 ${
                  lastAction.type === "damage"
                    ? "bg-red-950/80 border-red-500 text-red-200 shadow-md shadow-red-950/50"
                    : lastAction.type === "success"
                    ? "bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/40"
                    : "bg-amber-950/80 border-amber-500 text-amber-200"
                }`}
              >
                {lastAction.type === "damage" ? (
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <span>{lastAction.text}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
