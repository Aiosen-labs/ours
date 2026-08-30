"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useScroll,
} from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PacketConfig {
  id: string;
  pathId: string;
  color: string;
  duration: number;
  delay: number;
  direction: 1 | -1;
  trailLength: number;
  nodeIds: string[];
  nodeHitThresholds: number[];
}

interface RippleEvent {
  id: number;
  cx: number;
  cy: number;
  color: string;
  startTime: number;
}

interface PacketState {
  id: string;
  x: number;
  y: number;
  trail: Array<{ x: number; y: number }>;
  progress: number;
  lastHit: number[];
}

interface AmbientParticle {
  id: number;
  baseX: number;
  baseY: number;
  phase: number;
  speed: number;
  size: number;
  opacity: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PACKET_CONFIGS: PacketConfig[] = [
  {
    id: "p-gold-fwd",
    pathId: "path-left",
    color: "#C5A059",
    duration: 18000,
    delay: 1000,
    direction: 1,
    trailLength: 5,
    nodeIds: ["node-api", "node-auth", "node-db"],
    nodeHitThresholds: [0.21, 0.44, 0.67],
  },
  {
    id: "p-gold-ret",
    pathId: "path-left",
    color: "#C5A059",
    duration: 22000,
    delay: 9500,
    direction: -1,
    trailLength: 4,
    nodeIds: ["node-db", "node-auth", "node-api"],
    nodeHitThresholds: [0.33, 0.56, 0.79],
  },
  {
    id: "p-cyan-fwd",
    pathId: "path-right",
    color: "#06B6D4",
    duration: 19500,
    delay: 3000,
    direction: 1,
    trailLength: 5,
    nodeIds: ["node-lb", "node-worker", "node-cache"],
    nodeHitThresholds: [0.19, 0.42, 0.68],
  },
  {
    id: "p-cyan-ret",
    pathId: "path-right",
    color: "#06B6D4",
    duration: 16500,
    delay: 12000,
    direction: -1,
    trailLength: 4,
    nodeIds: ["node-cache", "node-worker", "node-lb"],
    nodeHitThresholds: [0.32, 0.58, 0.81],
  },
  {
    id: "p-amber",
    pathId: "path-bridge",
    color: "#D97706",
    duration: 37000,
    delay: 5000,
    direction: 1,
    trailLength: 3,
    nodeIds: ["node-hub"],
    nodeHitThresholds: [0.5],
  },
  {
    id: "p-white-l",
    pathId: "path-left-minor",
    color: "#ffffff",
    duration: 14800,
    delay: 2200,
    direction: 1,
    trailLength: 3,
    nodeIds: [],
    nodeHitThresholds: [],
  },
  {
    id: "p-white-r",
    pathId: "path-right-minor",
    color: "#ffffff",
    duration: 12300,
    delay: 7800,
    direction: 1,
    trailLength: 3,
    nodeIds: [],
    nodeHitThresholds: [],
  },
];

const NODE_COORDS: Record<string, { cx: number; cy: number }> = {
  "node-api":    { cx: 200,  cy: 300 },
  "node-auth":   { cx: 300,  cy: 450 },
  "node-db":     { cx: 300,  cy: 650 },
  "node-lb":     { cx: 1240, cy: 350 },
  "node-worker": { cx: 1140, cy: 500 },
  "node-cache":  { cx: 1140, cy: 700 },
  "node-hub":    { cx: 720,  cy: 575 },
};

const RIPPLE_DURATION = 700;

let globalId = 0;
const uid = () => ++globalId;

function generateAmbientParticles(count: number): AmbientParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    baseX: 100 + Math.random() * 1240,
    baseY: 50 + Math.random() * 800,
    phase: Math.random() * Math.PI * 2,
    speed: 0.15 + Math.random() * 0.25,
    size: 1 + Math.random() * 1.5,
    opacity: 0.04 + Math.random() * 0.1,
  }));
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef       = useRef<SVGSVGElement>(null);
  const rafRef       = useRef<number>(0);
  const startRef     = useRef<number>(0);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 10, mass: 2 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 10, mass: 2 });
  const bgX  = useTransform(smoothX, [-1, 1], [2, -2]);
  const bgY  = useTransform(smoothY, [-1, 1], [2, -2]);
  const midX = useTransform(smoothX, [-1, 1], [5, -5]);
  const midY = useTransform(smoothY, [-1, 1], [5, -5]);
  const fgX  = useTransform(smoothX, [-1, 1], [8, -8]);
  const fgY  = useTransform(smoothY, [-1, 1], [8, -8]);

  const { scrollY } = useScroll();
  const archScale   = useTransform(scrollY, [0, 800], [1, 0.98]);
  const archOpacity = useTransform(scrollY, [400, 800], [1, 0.2]);

  const packetsRef = useRef<Map<string, PacketState>>(new Map());

  const [ripples, setRipples] = useState<RippleEvent[]>([]);
  // Start empty — populated client-side in useEffect to avoid SSR/client Math.random() mismatch
  const [ambientParticles, setAmbientParticles] = useState<AmbientParticle[]>([]);

  const triggerNodeHit = useCallback((nodeId: string, color: string) => {
    const coord = NODE_COORDS[nodeId];
    if (!coord) return;
    const now = performance.now();
    setRipples(prev => [...prev, { id: uid(), cx: coord.cx, cy: coord.cy, color, startTime: now }]);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      mouseX.set(((e.clientX - left) / width - 0.5) * 2);
      mouseY.set(((e.clientY - top) / height - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  // Populate ambient particles client-side only (avoids SSR/client Math.random() hydration mismatch)
  useEffect(() => {
    if (prefersReducedMotion) return;
    const count = window.innerWidth < 768 ? 0 : 20;
    setAmbientParticles(generateAmbientParticles(count));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setInterval(() => {
      const now = performance.now();
      setRipples(prev => prev.filter(r => now - r.startTime < RIPPLE_DURATION + 100));
    }, 500);
    return () => clearInterval(timer);
  }, [ripples.length]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const svg = svgRef.current;
    if (!svg) return;

    const pathElements = new Map<string, SVGGeometryElement>();
    for (const pid of ["path-left", "path-right", "path-bridge", "path-left-minor", "path-right-minor"]) {
      const el = svg.getElementById(pid) as SVGGeometryElement | null;
      if (el) pathElements.set(pid, el);
    }

    for (const cfg of PACKET_CONFIGS) {
      if (!packetsRef.current.has(cfg.id)) {
        packetsRef.current.set(cfg.id, {
          id: cfg.id, x: 0, y: 0, trail: [], progress: -1,
          lastHit: cfg.nodeHitThresholds.map(() => -1),
        });
      }
    }

    function getOrCreatePacketEls(cfg: PacketConfig) {
      if (svg!.getElementById(`pkt-head-${cfg.id}`)) return;
      const ns = "http://www.w3.org/2000/svg";
      const g = document.createElementNS(ns, "g");
      g.setAttribute("id", `pkt-group-${cfg.id}`);
      g.setAttribute("class", "packet-group");
      for (let t = 0; t < cfg.trailLength; t++) {
        const trail = document.createElementNS(ns, "circle");
        trail.setAttribute("id", `pkt-trail-${cfg.id}-${t}`);
        trail.setAttribute("r", String(Math.max(0.5, 1.5 - t * 0.25)));
        trail.setAttribute("fill", cfg.color);
        trail.setAttribute("opacity", "0");
        g.appendChild(trail);
      }
      const head = document.createElementNS(ns, "polygon");
      head.setAttribute("id", `pkt-head-${cfg.id}`);
      head.setAttribute("fill", cfg.color);
      head.setAttribute("opacity", "0");
      head.setAttribute("style", `filter: drop-shadow(0 0 3px ${cfg.color})`);
      g.appendChild(head);
      svg!.appendChild(g);
    }

    function updatePacketEls(cfg: PacketConfig, state: PacketState) {
      const head = svg!.getElementById(`pkt-head-${cfg.id}`) as SVGPolygonElement | null;
      if (!head) return;
      if (state.progress < 0) { head.setAttribute("opacity", "0"); return; }
      const { x, y } = state;
      const s = 4;
      head.setAttribute("points", `${x},${y - s} ${x + s},${y} ${x},${y + s} ${x - s},${y}`);
      head.setAttribute("opacity", "0.95");
      for (let t = 0; t < cfg.trailLength; t++) {
        const trailEl = svg!.getElementById(`pkt-trail-${cfg.id}-${t}`) as SVGCircleElement | null;
        if (!trailEl) continue;
        const tp = state.trail[t];
        if (!tp) { trailEl.setAttribute("opacity", "0"); continue; }
        trailEl.setAttribute("cx", String(tp.x));
        trailEl.setAttribute("cy", String(tp.y));
        trailEl.setAttribute("opacity", String(((cfg.trailLength - t) / cfg.trailLength) * 0.45));
      }
    }

    startRef.current = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startRef.current;

      for (const cfg of PACKET_CONFIGS) {
        const pathEl = pathElements.get(cfg.pathId);
        if (!pathEl) continue;
        const state = packetsRef.current.get(cfg.id)!;
        getOrCreatePacketEls(cfg);

        if (elapsed < cfg.delay) {
          state.progress = -1;
          updatePacketEls(cfg, state);
          continue;
        }

        const active = elapsed - cfg.delay;
        const jitter = (cfg.id.charCodeAt(2) % 7) * 80;
        const rawProgress = ((active + jitter) % cfg.duration) / cfg.duration;
        const progress = cfg.direction === 1 ? rawProgress : 1 - rawProgress;
        state.progress = progress;

        const totalLen = pathEl.getTotalLength();
        const pt = pathEl.getPointAtLength(progress * totalLen);
        state.trail.unshift({ x: state.x, y: state.y });
        if (state.trail.length > cfg.trailLength) state.trail.length = cfg.trailLength;
        state.x = pt.x;
        state.y = pt.y;

        for (let ni = 0; ni < cfg.nodeHitThresholds.length; ni++) {
          const threshold = cfg.nodeHitThresholds[ni];
          const bucket = Math.floor(rawProgress * 1000);
          const crossed = Math.abs(rawProgress - threshold) < 0.009;
          if (crossed && state.lastHit[ni] !== bucket) {
            state.lastHit[ni] = bucket;
            triggerNodeHit(cfg.nodeIds[ni], cfg.color);
          }
        }

        updatePacketEls(cfg, state);
      }

      // Ambient particle drift
      const t = elapsed / 1000;
      for (const ap of ambientParticles) {
        const el = svg!.getElementById(`amb-${ap.id}`) as SVGCircleElement | null;
        if (!el) continue;
        const ox = Math.sin(t * ap.speed + ap.phase) * 12;
        const oy = Math.cos(t * ap.speed * 0.7 + ap.phase) * 8;
        el.setAttribute("cx", String(ap.baseX + ox));
        el.setAttribute("cy", String(ap.baseY + oy));
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [prefersReducedMotion, triggerNodeHit, ambientParticles]);

  return (
    <motion.div
      style={{ opacity: archOpacity, scale: archScale }}
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-[#0A0F1C] flex items-center justify-center"
    >
      <style>{`
        .build-path { stroke-dasharray: 100; stroke-dashoffset: 100; animation: drawIn 2s cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes drawIn { to { stroke-dashoffset: 0; } }
        .build-node { opacity: 0; transform-box: fill-box; transform-origin: center; animation: nodeAppear 1s ease-out forwards; }
        @keyframes nodeAppear {
          0%   { opacity: 0; transform: scale(0); }
          60%  { opacity: 0.4; transform: scale(1.2); }
          100% { opacity: 0.25; transform: scale(1); }
        }
        .grid-bg { opacity: 0; animation: gridFade 2s ease-out forwards; }
        @keyframes gridFade { to { opacity: 1; } }
        .ambient-glow { opacity: 0; transform: scale(0.8); animation: glowBloom 3s ease-out forwards 0.5s; }
        @keyframes glowBloom { to { opacity: 0.4; transform: scale(1); } }

        .hub-node { transform-box: fill-box; transform-origin: center; animation: hubBreathe 5s ease-in-out infinite; }
        @keyframes hubBreathe {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%       { opacity: 0.75; transform: scale(1.35); }
        }
        .hub-glow-ring { animation: hubRingPulse 5s ease-in-out infinite; }
        @keyframes hubRingPulse {
          0%, 100% { opacity: 0.04; r: 22; }
          50%       { opacity: 0.14; r: 34; }
        }

        .node-label { opacity: 0; font-size: 7px; letter-spacing: 0.12em; text-transform: uppercase; animation: labelCycle 20s infinite; }
        @keyframes labelCycle { 0%,20%,100%{opacity:0;}5%,15%{opacity:0.7;} }

        .path-active-gold  { animation: pathGold  20s infinite 4s; }
        @keyframes pathGold  { 0%,30%,100%{stroke-opacity:.08;}15%{stroke-opacity:.22;stroke:#C5A059;} }
        .path-active-cyan  { animation: pathCyan  20s infinite 12s; }
        @keyframes pathCyan  { 0%,30%,100%{stroke-opacity:.08;}15%{stroke-opacity:.22;stroke:#06B6D4;} }
        .path-active-amber { animation: pathAmber 37s infinite 5s; }
        @keyframes pathAmber { 0%,20%,100%{stroke-opacity:.08;}8%{stroke-opacity:.28;stroke:#D97706;} }

        .light-scan {
          position:absolute;inset:0;
          background:linear-gradient(135deg,transparent 40%,rgba(255,255,255,0.015) 50%,transparent 60%);
          background-size:200% 200%;animation:scanSweep 25s ease-in-out infinite;
          pointer-events:none;mix-blend-mode:screen;
        }
        @keyframes scanSweep { 0%,85%{background-position:-50% -50%;opacity:0;}90%{opacity:1;}95%,100%{background-position:150% 150%;opacity:0;} }

        .system-pulse {
          position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
          width:600px;height:300px;
          background:radial-gradient(circle,rgba(197,160,89,0.06) 0%,transparent 70%);
          border-radius:50%;pointer-events:none;opacity:0;
          animation:heartbeat 15s ease-in-out infinite;
        }
        @keyframes heartbeat { 0%,80%,100%{opacity:0;transform:translate(-50%,-50%) scale(0.9);}90%{opacity:1;transform:translate(-50%,-50%) scale(1.1);} }

        @media (prefers-reduced-motion: reduce) {
          .packet-group,.system-pulse,.light-scan { display:none !important; }
          .build-path { stroke-dashoffset: 0; animation: none; }
          .build-node { opacity: 0.25; animation: none; transform: scale(1); }
          .hub-node,.hub-glow-ring { animation: none; opacity: 0.3; }
        }
        @media (max-width: 768px) { .desktop-only { display: none; } }
      `}</style>

      {/* Grid */}
      <div className="absolute inset-0 z-0 grid-bg bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_10%,transparent_80%)]" />
      <div className="system-pulse z-0" />
      <div className="light-scan z-20" />
      <div className="ambient-glow absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[#06B6D4]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="ambient-glow absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#C5A059]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* BACKGROUND LAYER */}
      <motion.div style={prefersReducedMotion ? {} : { x: bgX, y: bgY }} className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-40">
        <svg className="w-full h-full text-white" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
          <g stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.05">
            <path d="M -100 100 L 350 100 C 400 100, 400 150, 400 200 L 400 300"        className="build-path desktop-only" style={{ animationDelay: '0.1s' }} />
            <path d="M 1200 800 L 1200 650 C 1200 600, 1250 600, 1300 600 L 1500 600"  className="build-path desktop-only" style={{ animationDelay: '0.3s' }} />
            <path d="M 500 -100 L 500 100 C 500 150, 550 150, 600 150 L 700 150"       className="build-path desktop-only" style={{ animationDelay: '0.5s' }} />
          </g>
          {/* Ambient background particles */}
          {!prefersReducedMotion && ambientParticles.map(ap => (
            <circle key={ap.id} id={`amb-${ap.id}`} cx={ap.baseX} cy={ap.baseY} r={ap.size} fill="#ffffff" opacity={ap.opacity} />
          ))}
        </svg>
      </motion.div>

      {/* MIDDLE LAYER */}
      <motion.div style={prefersReducedMotion ? {} : { x: midX, y: midY }} className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <svg className="w-full h-full text-white" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
          <g stroke="currentColor" strokeWidth="1">
            <path d="M 0 300 L 200 300 C 260 300, 300 360, 300 450 L 300 650 C 300 730, 230 800, 150 800 L 0 800"              pathLength="100" className="build-path path-active-gold"  style={{ animationDelay: '0.2s' }} />
            <path d="M 200 300 L 200 150 C 200 100, 150 50, 100 50"                                                            pathLength="100" className="build-path desktop-only"      style={{ animationDelay: '0.5s' }} />
            <path d="M 300 650 C 360 650, 400 690, 400 750 L 400 800"                                                         pathLength="100" className="build-path desktop-only"      style={{ animationDelay: '0.8s' }} />
            <path d="M 300 650 C 600 650, 800 500, 1140 500"                                                                  pathLength="100" className="build-path path-active-amber" style={{ animationDelay: '0.4s' }} />
            <path d="M 1440 350 L 1240 350 C 1180 350, 1140 410, 1140 500 L 1140 700 C 1140 780, 1210 850, 1290 850 L 1440 850" pathLength="100" className="build-path path-active-cyan" style={{ animationDelay: '0.3s' }} />
            <path d="M 1140 700 L 1080 700 C 1040 700, 1040 740, 1040 800 L 1040 850"                                         pathLength="100" className="build-path"               style={{ animationDelay: '0.9s' }} />
            <path d="M 1240 350 L 1240 200 C 1240 150, 1290 100, 1340 100"                                                    pathLength="100" className="build-path desktop-only"      style={{ animationDelay: '0.6s' }} />
          </g>

          {/* Static nodes */}
          <g fill="currentColor">
            <circle cx="200"  cy="150" r="2.5" className="build-node desktop-only" style={{ animationDelay: '1.2s' }} />
            <circle cx="150"  cy="800" r="3"   className="build-node"              style={{ animationDelay: '1.5s' }} />
            <circle cx="1240" cy="200" r="2"   className="build-node desktop-only" style={{ animationDelay: '1.3s' }} />
            <circle cx="1040" cy="700" r="3"   className="build-node"              style={{ animationDelay: '1.7s' }} />
            <circle cx="400"  cy="650" r="2"   className="build-node desktop-only" style={{ animationDelay: '1.6s' }} />
            <circle cx="1290" cy="850" r="4"   className="build-node"              style={{ animationDelay: '1.4s' }} />
          </g>

          {/* Causal sync nodes */}
          <g fill="currentColor">
            <circle id="node-api"    cx="200"  cy="300" r="3"   className="build-node" style={{ animationDelay: '0.8s' }} />
            <circle id="node-auth"   cx="300"  cy="450" r="2.5" className="build-node" style={{ animationDelay: '1.0s' }} />
            <circle id="node-db"     cx="300"  cy="650" r="4"   className="build-node" style={{ animationDelay: '1.2s' }} />
            <circle id="node-lb"     cx="1240" cy="350" r="4"   className="build-node" style={{ animationDelay: '0.9s' }} />
            <circle id="node-worker" cx="1140" cy="500" r="2.5" className="build-node" style={{ animationDelay: '1.1s' }} />
            <circle id="node-cache"  cx="1140" cy="700" r="3"   className="build-node" style={{ animationDelay: '1.3s' }} />
          </g>

          {/* Central hub */}
          <circle cx="720" cy="575" r="22" fill="#C5A059" className="hub-glow-ring desktop-only" />
          <circle cx="720" cy="575" r="5"  fill="#C5A059" id="node-hub" className="build-node hub-node desktop-only" style={{ animationDelay: '1.5s' }} />

          {/* Labels */}
          <g fontFamily="monospace">
            <text x="215" y="295"  className="node-label" fill="#C5A059" style={{ animationDelay: '2s' }}>API GATEWAY</text>
            <text x="315" y="445"  className="node-label" fill="#C5A059" style={{ animationDelay: '6s' }}>AUTH LAYER</text>
            <text x="315" y="665"  className="node-label" fill="#C5A059" style={{ animationDelay: '10s' }}>DATABASE</text>
            <text x="1255" y="345" className="node-label" fill="#06B6D4" style={{ animationDelay: '4s' }}>LOAD BALANCER</text>
            <text x="1050" y="495" className="node-label" fill="#06B6D4" style={{ animationDelay: '8s' }}>WORKER NODE</text>
            <text x="1050" y="715" className="node-label" fill="#06B6D4" style={{ animationDelay: '12s' }}>CACHE</text>
            <text x="735"  y="570" className="node-label desktop-only" fill="#D97706" style={{ animationDelay: '14s' }}>MESSAGE BROKER</text>
          </g>

          {/* Ripple rings */}
          {ripples.map(r => <RippleRing key={r.id} {...r} />)}
        </svg>
      </motion.div>

      {/* FOREGROUND LAYER — JS packets injected here */}
      <motion.div style={prefersReducedMotion ? {} : { x: fgX, y: fgY }} className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <svg id="fg-svg" ref={svgRef} className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
          {/* Ghost paths for getPointAtLength */}
          <path id="path-left"        d="M 0 300 L 200 300 C 260 300, 300 360, 300 450 L 300 650 C 300 730, 230 800, 150 800 L 0 800"              stroke="none" fill="none" />
          <path id="path-right"       d="M 1440 350 L 1240 350 C 1180 350, 1140 410, 1140 500 L 1140 700 C 1140 780, 1210 850, 1290 850 L 1440 850" stroke="none" fill="none" />
          <path id="path-bridge"      d="M 300 650 C 600 650, 800 500, 1140 500"                                                                      stroke="none" fill="none" />
          <path id="path-left-minor"  d="M 200 300 L 200 150 C 200 100, 150 50, 100 50"                                                               stroke="none" fill="none" />
          <path id="path-right-minor" d="M 1140 700 L 1080 700 C 1040 700, 1040 740, 1040 800 L 1040 850"                                             stroke="none" fill="none" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function RippleRing({ cx, cy, color, startTime }: RippleEvent) {
  const elapsed  = performance.now() - startTime;
  const progress = Math.min(elapsed / RIPPLE_DURATION, 1);
  const r        = 4 + progress * 22;
  const opacity  = (1 - progress) * 0.8;
  return <circle cx={cx} cy={cy} r={r} stroke={color} strokeWidth={1.5} fill="none" opacity={opacity} />;
}
