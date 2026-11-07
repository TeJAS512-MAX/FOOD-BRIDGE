import React, { useEffect, useRef, useState } from 'react';


interface RescueRoute {
  id: string;
  donorX: number; donorY: number;
  ngoX: number; ngoY: number;
  donorLabel: string; ngoLabel: string;
  meals: number; eta: number; temp: number;
}

const ROUTES: RescueRoute[] = [
  { id: 'r1', donorX: 110, donorY: 90,  ngoX: 440, ngoY: 60,  donorLabel: 'Grand Horizon Hotel', ngoLabel: 'Annapurna Seva', meals: 168, eta: 12, temp: 65.2 },
  { id: 'r2', donorX: 620, donorY: 160, ngoX: 280, ngoY: 220, donorLabel: 'The Royal Feast', ngoLabel: 'Karuna Shelter', meals: 95,  eta: 24, temp: 63.8 },
  { id: 'r3', donorX: 180, donorY: 260, ngoX: 560, ngoY: 220, donorLabel: 'TechPark Cafe', ngoLabel: 'Asha Orphanage', meals: 240, eta: 8,  temp: 66.1 },
  { id: 'r4', donorX: 480, donorY: 300, ngoX: 140, ngoY: 320, donorLabel: 'Marriott Banquet', ngoLabel: 'Bal Ashram', meals: 312, eta: 18, temp: 64.5 },
];

const W = 740, H = 380;



export const NeuralRescueMap: React.FC = () => {
  const [progresses, setProgresses] = useState<number[]>(ROUTES.map((_, i) => i * 0.22));
  const [radarAngle, setRadarAngle] = useState<number>(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);

  useEffect(() => {
    const animate = (ts: number) => {
      if (!lastRef.current) lastRef.current = ts;
      const dt = (ts - lastRef.current) / 1000;
      lastRef.current = ts;
      setProgresses(prev => prev.map((p, i) => (p + dt * (0.08 + i * 0.015)) % 1));
      setRadarAngle(prev => (prev + dt * 38) % 360);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // city dot grid
  const dots: { cx: number; cy: number }[] = [];
  for (let gx = 0; gx <= 18; gx++) for (let gy = 0; gy <= 9; gy++) {
    dots.push({ cx: (gx / 18) * W, cy: (gy / 9) * H });
  }

  return (
    <div className="frosted-card p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-tech font-bold"
              style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.35)', color: '#FCA5A5' }}>
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse inline-block" />
              LIVE RESCUE MESH
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-serif-display font-bold text-white">
            Neural Rescue Network
          </h2>
          <p className="text-white/60 text-sm mt-1">Real-time food rescue dispatch routing · updated every 8s</p>
        </div>
        <div className="flex gap-4">
          {[
            { label: 'Active Routes', val: ROUTES.length.toString(), color: '#34D399' },
            { label: 'Meals En Route', val: ROUTES.reduce((a,r)=>a+r.meals,0).toLocaleString(), color: '#FB923C' },
            { label: 'Avg ETA', val: `${Math.round(ROUTES.reduce((a,r)=>a+r.eta,0)/ROUTES.length)}m`, color: '#A78BFA' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-bold font-mono-tech" style={{ color: stat.color }}>{stat.val}</div>
              <div className="text-[10px] text-white/50 font-mono-tech uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Map */}
      <div className="rounded-2xl overflow-hidden relative" style={{ background: 'rgba(0,0,0,0.30)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 'clamp(220px, 42vw, 380px)' }}>
          {/* Concentric Radar Rings & Rotating Sweep Beam */}
          <g transform={`translate(${W / 2}, ${H / 2})`} pointerEvents="none">
            <circle r={85} fill="none" stroke="rgba(16,185,129,0.08)" strokeDasharray="3 5" />
            <circle r={165} fill="none" stroke="rgba(16,185,129,0.07)" strokeDasharray="4 6" />
            <circle r={255} fill="none" stroke="rgba(16,185,129,0.05)" />
            <g transform={`rotate(${radarAngle})`}>
              <path
                d="M 0 0 L 290 -32 A 292 292 0 0 1 290 32 Z"
                fill="url(#radarSweepGrad)"
              />
              <line x1={0} y1={0} x2={290} y2={0} stroke="rgba(52,211,153,0.32)" strokeWidth={1} />
            </g>
          </g>

          {/* City grid dots */}
          {dots.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r={1.4} fill="rgba(255,255,255,0.08)" />
          ))}

          {/* Route paths */}
          {ROUTES.map((route) => {
            const mx = (route.donorX + route.ngoX) / 2;
            const my = Math.min(route.donorY, route.ngoY) - 55;
            const pathD = `M ${route.donorX} ${route.donorY} Q ${mx} ${my} ${route.ngoX} ${route.ngoY}`;
            const isHov = hovered === route.id;
            return (
              <g key={route.id}>
                {/* Glow track */}
                <path d={pathD} fill="none" stroke={isHov ? 'rgba(16,185,129,0.25)' : 'rgba(16,185,129,0.10)'} strokeWidth="8" />
                {/* Animated dash */}
                <path
                  d={pathD} fill="none"
                  stroke="rgba(16,185,129,0.75)" strokeWidth="2"
                  className="rescue-route-active"
                />
                {/* Orange inner glow on hover */}
                {isHov && <path d={pathD} fill="none" stroke="rgba(234,88,12,0.45)" strokeWidth="1.5" />}
              </g>
            );
          })}

          {/* Moving food particles with tapered thermal comet trails */}
          {ROUTES.map((route, i) => {
            const t = progresses[i];
            const mx = (route.donorX + route.ngoX) / 2;
            const my = Math.min(route.donorY, route.ngoY) - 55;
            const pointAt = (u: number) => ({
              x: (1 - u) * (1 - u) * route.donorX + 2 * (1 - u) * u * mx + u * u * route.ngoX,
              y: (1 - u) * (1 - u) * route.donorY + 2 * (1 - u) * u * my + u * u * route.ngoY,
            });
            const head = pointAt(t);
            const trailSteps = [0.018, 0.036, 0.056, 0.078, 0.102];
            return (
              <g key={`particle-${route.id}`}>
                {trailSteps.map((step, sIdx) => {
                  const tu = (t - step + 1) % 1;
                  if (tu > t) return null;
                  const tp = pointAt(tu);
                  const fade = 1 - (sIdx + 1) / (trailSteps.length + 1);
                  return (
                    <circle
                      key={sIdx}
                      cx={tp.x}
                      cy={tp.y}
                      r={5.2 * fade}
                      fill={`rgba(249, 115, 22, ${0.48 * fade})`}
                    />
                  );
                })}
                <circle cx={head.x} cy={head.y} r={10} fill="rgba(249,115,22,0.22)" />
                <circle cx={head.x} cy={head.y} r={6} fill="rgba(234,88,12,0.95)" filter="url(#orangeGlow)" />
                <circle cx={head.x} cy={head.y} r={3} fill="#FFF7ED" />
              </g>
            );
          })}

          {/* Node labels + circles with expanding sonar pulse rings */}
          {ROUTES.map((route, idx) => {
            const t = progresses[idx];
            const donorPulse = (t * 2) % 1;
            const ngoPulse = ((t + 0.5) * 2) % 1;
            return (
              <g key={`nodes-${route.id}`}>
                {/* Donor sonar ring */}
                <circle
                  cx={route.donorX}
                  cy={route.donorY}
                  r={9 + donorPulse * 16}
                  fill="none"
                  stroke={`rgba(249, 115, 22, ${(1 - donorPulse) * 0.55})`}
                  strokeWidth={1.3}
                  pointerEvents="none"
                />
                {/* Donor node */}
                <circle
                  cx={route.donorX}
                  cy={route.donorY}
                  r={9}
                  fill="rgba(249, 115, 22, 0.85)"
                  stroke="rgba(254, 215, 170, 0.75)"
                  strokeWidth={1.5}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHovered(route.id)}
                  onMouseLeave={() => setHovered(null)}
                />
                <circle cx={route.donorX} cy={route.donorY} r={4} fill="white" fillOpacity={0.95} pointerEvents="none" />
                <text
                  x={route.donorX}
                  y={route.donorY - 15}
                  textAnchor="middle"
                  fill="rgba(253,186,116,0.95)"
                  fontSize="8.5"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                >
                  {route.donorLabel}
                </text>

                {/* NGO sonar ring */}
                <circle
                  cx={route.ngoX}
                  cy={route.ngoY}
                  r={9 + ngoPulse * 16}
                  fill="none"
                  stroke={`rgba(16, 185, 129, ${(1 - ngoPulse) * 0.55})`}
                  strokeWidth={1.3}
                  pointerEvents="none"
                />
                {/* NGO node */}
                <circle
                  cx={route.ngoX}
                  cy={route.ngoY}
                  r={9}
                  fill="rgba(16, 185, 129, 0.85)"
                  stroke="rgba(167, 243, 208, 0.75)"
                  strokeWidth={1.5}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHovered(route.id)}
                  onMouseLeave={() => setHovered(null)}
                />
                <circle cx={route.ngoX} cy={route.ngoY} r={4} fill="white" fillOpacity={0.95} pointerEvents="none" />
                <text
                  x={route.ngoX}
                  y={route.ngoY + 22}
                  textAnchor="middle"
                  fill="rgba(110,231,183,0.95)"
                  fontSize="8.5"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                >
                  {route.ngoLabel}
                </text>
              </g>
            );
          })}

          {/* Hover tooltip */}
          {hovered && (() => {
            const r = ROUTES.find(x => x.id === hovered)!;
            const tx = Math.min((r.donorX + r.ngoX) / 2, W - 90);
            const ty = Math.max(Math.min(r.donorY, r.ngoY) - 80, 10);
            return (
              <g>
                <rect x={tx - 60} y={ty} width={130} height={56} rx={8} fill="rgba(5,8,12,0.88)" stroke="rgba(255,255,255,0.18)" strokeWidth={1} />
                <text x={tx + 5} y={ty + 15} textAnchor="middle" fill="#FFF" fontSize="9" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                  {r.meals} meals
                </text>
                <text x={tx + 5} y={ty + 28} textAnchor="middle" fill="rgba(110,231,183,0.9)" fontSize="8.5" fontFamily="JetBrains Mono, monospace">
                  ETA: {r.eta} min · {r.temp}°C
                </text>
                <text x={tx + 5} y={ty + 42} textAnchor="middle" fill="rgba(253,186,116,0.9)" fontSize="8" fontFamily="JetBrains Mono, monospace">
                  FSSAI compliant ✓
                </text>
              </g>
            );
          })()}

          {/* Defs */}
          <defs>
            <filter id="orangeGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="radarSweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(16,185,129,0.22)" />
              <stop offset="65%" stopColor="rgba(6,182,212,0.08)" />
              <stop offset="100%" stopColor="rgba(16,185,129,0)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Legend overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-4 text-[10px] font-mono-tech">
          <span className="flex items-center gap-1.5" style={{ color: 'rgba(253,186,116,0.9)' }}>
            <span className="w-2.5 h-2.5 rounded-full bg-orange-400 inline-block" />Donor
          </span>
          <span className="flex items-center gap-1.5" style={{ color: 'rgba(110,231,183,0.9)' }}>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />NGO Shelter
          </span>
          <span className="flex items-center gap-1.5" style={{ color: 'rgba(234,88,12,0.9)' }}>
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />Live Dispatch
          </span>
        </div>
      </div>

      {/* Route cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {ROUTES.map((route, i) => {
          const tempOk = route.temp >= 63;
          return (
            <div key={route.id} className="frosted-subcard p-3 space-y-1.5"
              style={{ borderColor: hovered === route.id ? 'rgba(16,185,129,0.4)' : undefined }}
              onMouseEnter={() => setHovered(route.id)} onMouseLeave={() => setHovered(null)}>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono-tech text-white/50 uppercase">Route {i+1}</span>
                <span className={`text-[9px] font-mono-tech font-bold ${tempOk ? 'text-emerald-400' : 'text-orange-400'}`}>
                  {route.temp}°C
                </span>
              </div>
              <div className="text-xs font-semibold text-white/90 leading-tight">{route.donorLabel}</div>
              <div className="text-[10px] text-emerald-400">→ {route.ngoLabel}</div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-400">{route.meals} meals</span>
                <span className="text-[9px] text-white/50">{route.eta}m</span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.10)' }}>
                <div className="h-1 rounded-full transition-all" style={{
                  width: `${progresses[i] * 100}%`,
                  background: 'linear-gradient(90deg, #059669, #F97316)',
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
