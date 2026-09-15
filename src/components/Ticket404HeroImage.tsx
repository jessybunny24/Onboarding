"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Volume2, VolumeX, Sparkles, Radio, Eye } from "lucide-react";
import type { Ticket404HeroImageProps } from "@/types";

export default function Ticket404HeroImage({
  onGlitchTriggered,
}: Ticket404HeroImageProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState("03:14:00 AM");
  const [anomalyCount, setAnomalyCount] = useState(1);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Security camera live clock simulation
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Web Audio API Glitch Synthesizer (Zero external file dependencies)
  const playGlitchSound = useCallback(() => {
    if (!audioEnabled) return;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // 1. Static Noise Burst (CRT static simulation)
      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime(1400, now);
      bandpass.Q.setValueAtTime(2.5, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.3, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      whiteNoise.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.2);

      // 2. High-speed digital frequency zap / bitcrush glitch
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.setValueAtTime(640, now + 0.04);
      osc.frequency.setValueAtTime(220, now + 0.08);
      osc.frequency.setValueAtTime(920, now + 0.12);
      osc.frequency.setValueAtTime(60, now + 0.18);

      oscGain.gain.setValueAtTime(0.22, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // Audio context might be restricted before interaction
    }
  }, [audioEnabled]);

  const triggerGlitch = useCallback(() => {
    setIsGlitching(true);
    setAnomalyCount((prev) => prev + 1);
    playGlitchSound();
    if (onGlitchTriggered) {
      onGlitchTriggered();
    }

    setTimeout(() => {
      setIsGlitching(false);
    }, 600);
  }, [playGlitchSound, onGlitchTriggered]);

  return (
    <div className="w-full max-w-5xl mx-auto my-10">
      {/* Container Frame */}
      <div
        onClick={triggerGlitch}
        className={`relative group rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer shadow-2xl ${
          isGlitching
            ? "border-red-500 ring-2 ring-red-500/50 shadow-red-950/60 scale-[1.008]"
            : "border-slate-800 bg-[#07090f] hover:border-blue-500/60 shadow-black/80"
        }`}
      >
        {/* Background Image: Nighttime Rainy Office */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] overflow-hidden">
          <Image
            src="/anomaly-puzzle-hero.jpg"
            alt="Intern workstation with glowing monitor, puzzle clues, and dark mystery anomalies"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            className={`object-cover object-center transition-all duration-700 ${
              isGlitching
                ? "scale-105 filter contrast-125 hue-rotate-15 brightness-90 animate-glitch"
                : "scale-100 group-hover:scale-[1.02] filter contrast-105"
            }`}
          />

          {/* Vignette and Dark Tint Overlays for Atmospheric Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-black/40 to-[#07090e]/70" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/80" />

          {/* CRT Scanline Overlay */}
          <div className="absolute inset-0 crt-overlay opacity-75 pointer-events-none" />

          {/* CCTV Surveillance HUD Header */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between pointer-events-auto z-20">
            {/* Left Tag: Security Cam Feed */}
            <div className="flex items-center gap-3 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/70 font-mono text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block" />
              <span className="text-red-400 font-bold tracking-wider">● REC</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-200">CAM-04 [INTERN WORKSTATION // PUZZLE GRID]</span>
            </div>

            {/* Right Tag: Real-time clock & Audio control */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/70 font-mono text-[11px] text-slate-300">
                <Radio className="w-3.5 h-3.5 text-blue-400" />
                <span>{currentTime}</span>
              </div>

              {/* Sound Toggle Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setAudioEnabled(!audioEnabled);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border transition-all ${
                  audioEnabled
                    ? "bg-blue-950/80 border-blue-500/60 text-blue-300 shadow-sm"
                    : "bg-black/70 border-slate-700 text-slate-400 hover:text-white"
                }`}
                title="Toggle glitch audio sound effect"
              >
                {audioEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                    <span className="hidden sm:inline">Audio FX: ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                    <span className="hidden sm:inline">Muted</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Center Stage: Prominent "TICKET#404" Title with Glitch Effect */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20 pointer-events-none">
            {/* Classified Tag */}
            <div className="mb-2 sm:mb-4">
              <span
                className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase border backdrop-blur-md ${
                  isGlitching
                    ? "bg-red-950/80 border-red-500 text-red-300 animate-pulse"
                    : "bg-blue-950/70 border-blue-500/60 text-blue-300"
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>INTERNAL INCIDENT ARCHIVE // PUZZLE SECTOR 4B</span>
              </span>
            </div>

            {/* The Glitching TICKET#404 Title */}
            <div className="relative select-none">
              <h2
                data-text="TICKET#404"
                className={`glitch-title font-mono font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter uppercase transition-all duration-200 ${
                  isGlitching ? "glitch-active text-red-100" : "text-white"
                }`}
              >
                TICKET#404
              </h2>
            </div>

            {/* Atmospheric Sub-headline */}
            <p className="text-xs sm:text-base font-mono text-slate-300 mt-3 sm:mt-4 max-w-lg leading-relaxed bg-black/60 px-4 py-1.5 rounded-xl border border-slate-800/80 backdrop-blur-md">
              &quot;Piece together the clues. Solve the glitching errors.
              Uncover where the bosses vanished.&quot;
            </p>

            {/* Micro Interaction Prompt */}
            <div className="mt-4 sm:mt-6 pointer-events-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  triggerGlitch();
                }}
                className={`btn-primary px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center gap-2 border transition-all ${
                  isGlitching
                    ? "bg-red-600 border-red-400 text-white shadow-lg shadow-red-950/60 animate-bounce"
                    : "bg-blue-600/90 hover:bg-blue-500 border-blue-400/50 text-white shadow-lg shadow-blue-950/50"
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>
                  {isGlitching
                    ? "ANOMALY FREQUENCY PULSE FIRED!"
                    : "Click to Glitch Feed & Play Sound"}
                </span>
              </button>
            </div>
          </div>

          {/* CCTV Surveillance HUD Footer */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 flex flex-col sm:flex-row items-center justify-between gap-2 pointer-events-none z-20 font-mono text-[11px] text-slate-400">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800">
              <span className="text-emerald-400 font-bold">LIVE FEED:</span>
              <span>1080p @ 30FPS // BITRATE: 4.2 MB/S</span>
            </div>

            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-800">
              <span className="text-amber-400">STATUS:</span>
              <span className="text-slate-300">
                {isGlitching ? "DISTORTION IN CUBICLE 4" : `ANOMALIES RECORDED: ${anomalyCount}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Caption beneath the image */}
      <div className="mt-3 flex items-center justify-between px-2 text-xs font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span>Surveillance Sector 04: Rainy night shift onboarding workstation</span>
        </span>
        <span className="hidden sm:inline text-slate-400">
          Tip: Tap anywhere on the monitor to trigger sound effects & glitch
        </span>
      </div>
    </div>
  );
}
