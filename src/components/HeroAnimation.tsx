"use client";
import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion, useScroll } from "framer-motion";

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Extremely subtle mouse interaction for atmosphere
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 10, mass: 2 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 10, mass: 2 });

  // Minimal layer translations
  const bgX = useTransform(smoothX, [-1, 1], [2, -2]);
  const bgY = useTransform(smoothY, [-1, 1], [2, -2]);
  const midX = useTransform(smoothX, [-1, 1], [5, -5]);
  const midY = useTransform(smoothY, [-1, 1], [5, -5]);
  const fgX = useTransform(smoothX, [-1, 1], [8, -8]);
  const fgY = useTransform(smoothY, [-1, 1], [8, -8]);

  // Scroll Interaction (Architecture fades and moves backward)
  const { scrollY } = useScroll();
  const archScale = useTransform(scrollY, [0, 800], [1, 0.98]);
  const archOpacity = useTransform(scrollY, [400, 800], [1, 0.2]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      mouseX.set(x * 2);
      mouseY.set(y * 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  return (
    <motion.div style={{ opacity: archOpacity, scale: archScale }} ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden bg-[#0A0F1C] flex items-center justify-center">
      
      {/* Complex System Styles */}
      <style>{`
        /* 1. Build Sequence (Draw in once) */
        .build-path {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: drawIn 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes drawIn {
          to { stroke-dashoffset: 0; }
        }
        .build-node {
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
          animation: nodeAppear 1s ease-out forwards;
        }
        @keyframes nodeAppear {
          0% { opacity: 0; transform: scale(0); }
          60% { opacity: 0.4; transform: scale(1.2); }
          100% { opacity: 0.25; transform: scale(1); }
        }

        /* 1b. Ambient Sequence */
        .grid-bg { opacity: 0; animation: gridFade 2s ease-out forwards; }
        @keyframes gridFade { to { opacity: 1; } }
        
        .ambient-glow { opacity: 0; transform: scale(0.8); animation: glowBloom 3s ease-out forwards 0.5s; }
        @keyframes glowBloom { to { opacity: 0.4; transform: scale(1); } }

        /* 2. Signals (Foreground Layer) */
        .signal {
          stroke-dasharray: 3 100;
          stroke-dashoffset: 100;
          opacity: 0;
        }
        /* Gold signal traveling left path (duration 6s, 20s loop, starts at 4s) */
        .signal-gold { animation: signalFlow 20s linear infinite 4s; }
        /* Cyan signal traveling right path (duration 6s, 20s loop, starts at 12s) */
        .signal-cyan { animation: signalFlow 20s linear infinite 12s; }
        /* Amber signal traveling center path (duration ~4.5s, 37s loop, starts at 5s) */
        .signal-amber { animation: signalFlowAmber 37s linear infinite 5s; }
        
        /* White minor signals */
        .signal-white-1 { animation: signalFlowMinor 15s linear infinite 2s; }
        .signal-white-2 { animation: signalFlowMinor 25s linear infinite 10s; }

        @keyframes signalFlow {
          0% { stroke-dashoffset: 100; opacity: 0; }
          2% { opacity: 1; }
          28% { opacity: 1; } /* 30% of 20s is 6s */
          30% { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes signalFlowAmber {
          0% { stroke-dashoffset: 100; opacity: 0; }
          2% { opacity: 1; }
          14% { opacity: 1; } /* 12% of 37s is ~4.5s */
          16% { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes signalFlowMinor {
          0% { stroke-dashoffset: 100; opacity: 0; }
          2% { opacity: 0.6; }
          18% { opacity: 0.6; }
          20% { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }

        /* 3. Cause and Effect Nodes (Sync with Signals) */
        /* Gold signal hits nodes at roughly 21%, 40%, 61%, 84% of its 6s journey.
           In a 20s loop, 6s is 30%.
           Hits happen at 6.3%, 12%, 18.3%, 25.2% of the 20s animation. */
        
        .sync-node {
          transform-box: fill-box;
          transform-origin: center;
        }
        
        /* Node 1 hit at 6.3% */
        .sync-gold-1 { animation: sg1 20s infinite 4s; }
        @keyframes sg1 {
          0%, 5%, 8%, 100% { opacity: 0.25; transform: scale(1); fill: currentColor; }
          6.3% { opacity: 1; transform: scale(1.4); fill: #C5A059; filter: drop-shadow(0 0 8px rgba(197,160,89,0.8)); }
        }
        /* Node 2 hit at 12% */
        .sync-gold-2 { animation: sg2 20s infinite 4s; }
        @keyframes sg2 {
          0%, 10%, 14%, 100% { opacity: 0.25; transform: scale(1); fill: currentColor; }
          12% { opacity: 1; transform: scale(1.4); fill: #C5A059; filter: drop-shadow(0 0 8px rgba(197,160,89,0.8)); }
        }
        /* Node 3 hit at 18.3% */
        .sync-gold-3 { animation: sg3 20s infinite 4s; }
        @keyframes sg3 {
          0%, 16%, 20%, 100% { opacity: 0.25; transform: scale(1); fill: currentColor; }
          18.3% { opacity: 1; transform: scale(1.4); fill: #C5A059; filter: drop-shadow(0 0 8px rgba(197,160,89,0.8)); }
        }

        /* Cyan signal hits right nodes similarly. Right path starts from bottom to top or top to bottom.
           Hits at ~ 20%, 38%, 59%, 78%.
           In 20s loop (30% active), hits at 6%, 11.4%, 17.7%, 23.4% */
        
        .sync-cyan-1 { animation: sc1 20s infinite 12s; }
        @keyframes sc1 {
          0%, 4%, 8%, 100% { opacity: 0.25; transform: scale(1); fill: currentColor; }
          6% { opacity: 1; transform: scale(1.4); fill: #06B6D4; filter: drop-shadow(0 0 8px rgba(6,182,212,0.8)); }
        }
        .sync-cyan-2 { animation: sc2 20s infinite 12s; }
        @keyframes sc2 {
          0%, 9%, 13%, 100% { opacity: 0.25; transform: scale(1); fill: currentColor; }
          11.4% { opacity: 1; transform: scale(1.4); fill: #06B6D4; filter: drop-shadow(0 0 8px rgba(6,182,212,0.8)); }
        }
        .sync-cyan-3 { animation: sc3 20s infinite 12s; }
        @keyframes sc3 {
          0%, 15%, 20%, 100% { opacity: 0.25; transform: scale(1); fill: currentColor; }
          17.7% { opacity: 1; transform: scale(1.4); fill: #06B6D4; filter: drop-shadow(0 0 8px rgba(6,182,212,0.8)); }
        }

        /* Amber Node (Hit at ~50% of its travel -> 6% of 37s) */
        .sync-amber-1 { animation: sa1 37s infinite 5s; }
        @keyframes sa1 {
          0%, 4%, 8%, 100% { opacity: 0.25; transform: scale(1); fill: currentColor; }
          6% { opacity: 1; transform: scale(1.4); fill: #D97706; filter: drop-shadow(0 0 8px rgba(217,119,6,0.8)); }
        }

        /* 4. Path Activation Highlight */
        /* The path slightly glows as the signal passes through it */
        .path-active-gold { animation: pathGold 20s infinite 4s; }
        @keyframes pathGold {
          0%, 30%, 100% { stroke-opacity: 0.1; }
          15% { stroke-opacity: 0.3; stroke: #C5A059; }
        }
        .path-active-cyan { animation: pathCyan 20s infinite 12s; }
        @keyframes pathCyan {
          0%, 30%, 100% { stroke-opacity: 0.1; }
          15% { stroke-opacity: 0.3; stroke: #06B6D4; }
        }
        .path-active-amber { animation: pathAmber 37s infinite 5s; }
        @keyframes pathAmber {
          0%, 20%, 100% { stroke-opacity: 0.1; }
          8% { stroke-opacity: 0.4; stroke: #D97706; }
        }

        /* 4b. Node Labels */
        .label-gold, .label-cyan, .label-amber {
          opacity: 0;
          animation: labelCycle 20s infinite;
        }
        .label-gold { fill: #C5A059; filter: drop-shadow(0 0 4px rgba(197,160,89,0.5)); }
        .label-cyan { fill: #06B6D4; filter: drop-shadow(0 0 4px rgba(6,182,212,0.5)); }
        .label-amber { fill: #D97706; filter: drop-shadow(0 0 4px rgba(217,119,6,0.5)); }

        @keyframes labelCycle {
          0%, 20%, 100% { opacity: 0; }
          5%, 15% { opacity: 0.8; }
        }

        /* 5. System Pulse (Central Heartbeat) */
        .system-pulse {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 300px;
          background: radial-gradient(circle, rgba(197,160,89,0.06) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          animation: heartbeat 15s ease-in-out infinite;
        }
        @keyframes heartbeat {
          0%, 80%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
          90% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }

        /* 6. Light Scan (Diagonal Sweep) */
        .light-scan {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.015) 50%, transparent 60%);
          background-size: 200% 200%;
          animation: scanSweep 25s ease-in-out infinite;
          pointer-events: none;
          mix-blend-mode: screen;
        }
        @keyframes scanSweep {
          0%, 85% { background-position: -50% -50%; opacity: 0; }
          90% { opacity: 1; }
          95% { background-position: 150% 150%; opacity: 0; }
          100% { background-position: 150% 150%; opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .signal, .system-pulse, .light-scan { animation: none !important; display: none; }
          .build-path { stroke-dashoffset: 0; animation: none; }
          .build-node { opacity: 0.25; animation: none; transform: scale(1); }
          .sync-node, .path-active-gold, .path-active-cyan { animation: none !important; }
        }
        
        @media (max-width: 768px) {
          .desktop-only { display: none; }
        }
      `}</style>

      {/* Grid Pattern (Lowest layer) */}
      <div className="absolute inset-0 z-0 grid-bg bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_10%,transparent_80%)]"></div>

      {/* System Pulse and Light Scan */}
      <div className="system-pulse z-0"></div>
      <div className="light-scan z-20"></div>
      
      {/* Atmosphere Glow */}
      <div className="ambient-glow absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[#06B6D4]/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="ambient-glow absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C5A059]/5 rounded-full blur-[160px] pointer-events-none"></div>

      {/* BACKGROUND LAYER (Faint, slow, disconnected paths) */}
      <motion.div style={prefersReducedMotion ? {} : { x: bgX, y: bgY }} className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-40">
        <svg className="w-full h-full text-white" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
          <g stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.05">
            <path d="M -100 100 L 350 100 C 400 100, 400 150, 400 200 L 400 300" className="build-path desktop-only" style={{ animationDelay: '0.1s' }} />
            <path d="M 1200 800 L 1200 650 C 1200 600, 1250 600, 1300 600 L 1500 600" className="build-path desktop-only" style={{ animationDelay: '0.3s' }} />
            <path d="M 500 -100 L 500 100 C 500 150, 550 150, 600 150 L 700 150" className="build-path desktop-only" style={{ animationDelay: '0.5s' }} />
          </g>
        </svg>
      </motion.div>

      {/* MIDDLE LAYER (Primary Architecture) */}
      <motion.div style={prefersReducedMotion ? {} : { x: midX, y: midY }} className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <svg className="w-full h-full text-white" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
          {/* Paths */}
          <g stroke="currentColor" strokeWidth="1" strokeOpacity="0.1">
            {/* Left Active Path */}
            <path d="M 0 300 L 200 300 C 260 300, 300 360, 300 450 L 300 650 C 300 730, 230 800, 150 800 L 0 800" pathLength="100" className="build-path path-active-gold" style={{ animationDelay: '0.2s' }} />
            {/* Left Minor Paths */}
            <path d="M 200 300 L 200 150 C 200 100, 150 50, 100 50" pathLength="100" className="build-path desktop-only" style={{ animationDelay: '0.5s' }} />
            <path d="M 300 650 C 360 650, 400 690, 400 750 L 400 800" pathLength="100" className="build-path desktop-only" style={{ animationDelay: '0.8s' }} />

            {/* Center Amber Bridge */}
            <path d="M 300 650 C 600 650, 800 500, 1140 500" pathLength="100" className="build-path path-active-amber" style={{ animationDelay: '0.4s' }} />

            {/* Right Active Path */}
            <path d="M 1440 350 L 1240 350 C 1180 350, 1140 410, 1140 500 L 1140 700 C 1140 780, 1210 850, 1290 850 L 1440 850" pathLength="100" className="build-path path-active-cyan" style={{ animationDelay: '0.3s' }} />
            {/* Right Minor Paths */}
            <path d="M 1240 350 L 1240 200 C 1240 150, 1290 100, 1340 100" pathLength="100" className="build-path desktop-only" style={{ animationDelay: '0.6s' }} />
            <path d="M 1140 700 L 1080 700 C 1040 700, 1040 740, 1040 800 L 1040 850" pathLength="100" className="build-path" style={{ animationDelay: '0.9s' }} />
          </g>

          {/* Anchor Nodes (Static) */}
          <g fill="currentColor">
            <circle cx="200" cy="150" r="2.5" className="build-node desktop-only" style={{ animationDelay: '1.2s' }} />
            <circle cx="150" cy="800" r="3" className="build-node" style={{ animationDelay: '1.5s' }} />
            <circle cx="1240" cy="200" r="2" className="build-node desktop-only" style={{ animationDelay: '1.3s' }} />
            <circle cx="1040" cy="700" r="3" className="build-node" style={{ animationDelay: '1.7s' }} />
            <circle cx="400" cy="650" r="2" className="build-node desktop-only" style={{ animationDelay: '1.6s' }} />
            <circle cx="1290" cy="850" r="4" className="build-node" style={{ animationDelay: '1.4s' }} />
          </g>

          {/* Causal Sync Nodes (Activate with Signals) */}
          <g fill="currentColor" className="sync-node">
            {/* Gold Left Path Nodes */}
            <circle cx="200" cy="300" r="3" className="build-node sync-gold-1" style={{ animationDelay: '0.8s' }} />
            <circle cx="300" cy="450" r="2.5" className="build-node sync-gold-2" style={{ animationDelay: '1.0s' }} />
            <circle cx="300" cy="650" r="4" className="build-node sync-gold-3" style={{ animationDelay: '1.2s' }} />
            
            {/* Amber Bridge Node */}
            <circle cx="720" cy="575" r="3" className="build-node sync-amber-1" style={{ animationDelay: '1.1s' }} />

            {/* Cyan Right Path Nodes */}
            <circle cx="1240" cy="350" r="4" className="build-node sync-cyan-1" style={{ animationDelay: '0.9s' }} />
            <circle cx="1140" cy="500" r="2.5" className="build-node sync-cyan-2" style={{ animationDelay: '1.1s' }} />
            <circle cx="1140" cy="700" r="3" className="build-node sync-cyan-3" style={{ animationDelay: '1.3s' }} />
          </g>

          {/* Node Labels */}
          <g className="font-label-sm text-[8px] uppercase tracking-widest fill-current">
            <text x="215" y="295" className="label-gold" style={{ animationDelay: '2s' }}>API GATEWAY</text>
            <text x="315" y="445" className="label-gold" style={{ animationDelay: '6s' }}>AUTH LAYER</text>
            <text x="315" y="665" className="label-gold" style={{ animationDelay: '10s' }}>DATABASE</text>

            <text x="1255" y="345" className="label-cyan" style={{ animationDelay: '4s' }}>LOAD BALANCER</text>
            <text x="1045" y="495" className="label-cyan" style={{ animationDelay: '8s' }}>WORKER NODE</text>
            <text x="1045" y="715" className="label-cyan" style={{ animationDelay: '12s' }}>CACHE</text>
            
            <text x="735" y="570" className="label-amber" style={{ animationDelay: '14s' }}>MESSAGE BROKER</text>
          </g>
        </svg>
      </motion.div>

      {/* FOREGROUND LAYER (Signals) */}
      <motion.div style={prefersReducedMotion ? {} : { x: fgX, y: fgY }} className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
          
          {/* Main Gold Signal (Left) */}
          <path d="M 0 300 L 200 300 C 260 300, 300 360, 300 450 L 300 650 C 300 730, 230 800, 150 800 L 0 800" pathLength="100" stroke="#C5A059" strokeWidth="1.5" className="signal signal-gold" style={{ filter: 'drop-shadow(0 0 4px #C5A059)' }} />
          
          {/* Main Cyan Signal (Right) */}
          <path d="M 1440 350 L 1240 350 C 1180 350, 1140 410, 1140 500 L 1140 700 C 1140 780, 1210 850, 1290 850 L 1440 850" pathLength="100" stroke="#06B6D4" strokeWidth="1.5" className="signal signal-cyan" style={{ filter: 'drop-shadow(0 0 4px #06B6D4)' }} />
          
          {/* Amber Bridge Signal (Center) */}
          <path d="M 300 650 C 600 650, 800 500, 1140 500" pathLength="100" stroke="#D97706" strokeWidth="1.5" className="signal signal-amber" style={{ filter: 'drop-shadow(0 0 4px #D97706)' }} />

          {/* Minor White Signals */}
          <path d="M 200 300 L 200 150 C 200 100, 150 50, 100 50" pathLength="100" stroke="#ffffff" strokeWidth="1" className="signal signal-white-1 desktop-only" />
          <path d="M 1140 700 L 1080 700 C 1040 700, 1040 740, 1040 800 L 1040 850" pathLength="100" stroke="#ffffff" strokeWidth="1" className="signal signal-white-2" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
