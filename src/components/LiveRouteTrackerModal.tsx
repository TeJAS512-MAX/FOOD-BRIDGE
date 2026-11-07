import React, { useEffect, useState } from 'react';
import {
  BatteryCharging,
  CheckCircle2,
  Clock,
  MapPin,
  PhoneCall,
  Radio,
  ShieldCheck,
  Thermometer,
  Truck,
  X,
} from 'lucide-react';
import { RESCUE_NODES } from '../data/foodBridgeData';
import { sound } from '../utils/soundEffects';

interface LiveRouteTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveRouteTrackerModal: React.FC<LiveRouteTrackerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const activeNodes = RESCUE_NODES.slice(0, 4);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(495);
  const [tempJitter, setTempJitter] = useState<number>(0);
  const [progressPct, setProgressPct] = useState<number>(68);
  const [pingedRider, setPingedRider] = useState<boolean>(false);

  const currentBatch = activeNodes[selectedIdx] || activeNodes[0];
  const baseTemp = parseFloat(currentBatch.temperature) || 65.4;
  const liveTemp = +(baseTemp + tempJitter).toFixed(1);

  useEffect(() => {
    if (!isOpen) return;
    setSecondsRemaining(currentBatch.etaMinutes * 42);
    setProgressPct(62 + selectedIdx * 7);
    setPingedRider(false);
  }, [isOpen, selectedIdx, currentBatch.etaMinutes]);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(15, prev - 1));
      setTempJitter(+(Math.random() * 0.4 - 0.2).toFixed(1));
      setProgressPct((prev) => (prev >= 96 ? 58 : +(prev + 0.35).toFixed(1)));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Quadratic Bezier point at t = progressPct / 100
  const t = progressPct / 100;
  const p0 = { x: 90, y: 155 };
  const p1 = { x: 320, y: 38 };
  const p2 = { x: 550, y: 145 };
  const vanX = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
  const vanY = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;

  const stages = [
    { label: 'Kitchen Sealed', time: '21:08', done: true },
    { label: `Probe ${liveTemp}°C`, time: '21:11', done: true },
    { label: 'EV En Route', time: `ETA ${formattedTime}`, active: true },
    { label: 'Shelter Handoff', time: currentBatch.partnerName.split(' ')[0], done: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-3xl frosted-modal text-white border border-white/20 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-white/[0.05] px-5 sm:px-7 py-4 border-b border-white/[0.14] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
            </span>
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-wider text-emerald-300 block font-bold">
                LIVE GPS &amp; THERMAL CORRIDOR TELEMETRY
              </span>
              <span className="text-[11px] text-white/70 font-mono-tech">
                {currentBatch.name} → {currentBatch.partnerName}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.click();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Active Route Switcher Pills */}
        <div className="px-5 sm:px-7 py-2.5 bg-black/40 border-b border-white/10 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] font-mono-tech uppercase text-white/55 shrink-0">
            Active Van:
          </span>
          {activeNodes.map((node, idx) => (
            <button
              key={node.id}
              type="button"
              onClick={() => {
                sound.click();
                setSelectedIdx(idx);
              }}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-tech transition cursor-pointer border ${
                selectedIdx === idx
                  ? 'bg-emerald-500/25 text-emerald-200 border-emerald-400/50 font-bold'
                  : 'bg-white/5 text-white/70 border-white/10 hover:text-white'
              }`}
            >
              <Truck className="w-3 h-3 text-emerald-400" />
              <span>{node.name.split(' ')[0]}</span>
              <span className="text-[10px] text-orange-300">{node.mealsEquivalent}m</span>
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {/* Top Row: Curved SVG Radar Map (7 cols) + Live Payload Card (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            {/* Curved SVG Telemetry Map */}
            <div className="lg:col-span-7 relative rounded-2xl bg-[#050B0E] border border-white/15 overflow-hidden p-3 flex flex-col justify-between min-h-[210px]">
              <div className="flex items-center justify-between text-[10px] font-mono-tech z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-emerald-300 font-bold">
                  <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                  <span>GPS CORRIDOR LOCKED • {progressPct.toFixed(0)}%</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-orange-500/15 border border-orange-400/30 text-orange-300 font-bold">
                  ETA {formattedTime}
                </span>
              </div>

              <svg viewBox="0 0 640 200" className="w-full h-40 my-auto">
                {/* Subtle street grid */}
                {[80, 160, 240, 320, 400, 480, 560].map((gx) => (
                  <line
                    key={gx}
                    x1={gx}
                    y1={0}
                    x2={gx}
                    y2={200}
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth={1}
                  />
                ))}
                {[50, 100, 150].map((gy) => (
                  <line
                    key={gy}
                    x1={0}
                    y1={gy}
                    x2={640}
                    y2={gy}
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth={1}
                  />
                ))}

                {/* Curved Route Glow & Dashed Track */}
                <path
                  d={`M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}`}
                  fill="none"
                  stroke="rgba(16,185,129,0.18)"
                  strokeWidth={10}
                  strokeLinecap="round"
                />
                <path
                  d={`M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}`}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  strokeDasharray="7 5"
                  className="rescue-route-active"
                />

                {/* Origin Donor Pin */}
                <g transform={`translate(${p0.x}, ${p0.y})`}>
                  <circle r={18} fill="rgba(249,115,22,0.18)" />
                  <circle r={8} fill="#F97316" stroke="#FFF" strokeWidth={2} />
                  <text
                    y={26}
                    textAnchor="middle"
                    fill="#FDBA74"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {currentBatch.name.split(' ')[0]} {currentBatch.name.split(' ')[1]}
                  </text>
                </g>

                {/* Destination Shelter Pin */}
                <g transform={`translate(${p2.x}, ${p2.y})`}>
                  <circle r={18} fill="rgba(16,185,129,0.22)" />
                  <circle r={8} fill="#10B981" stroke="#FFF" strokeWidth={2} />
                  <text
                    y={26}
                    textAnchor="middle"
                    fill="#6EE7B7"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {currentBatch.partnerName.split(' ')[0]} {currentBatch.partnerName.split(' ')[1]}
                  </text>
                </g>

                {/* Moving EV Pod Beacon */}
                <g transform={`translate(${vanX}, ${vanY})`}>
                  <circle r={16} fill="rgba(52,211,153,0.25)" />
                  <circle r={8} fill="#FFFFFF" stroke="#10B981" strokeWidth={3} />
                  <rect
                    x={-42}
                    y={-30}
                    width={84}
                    height={18}
                    rx={6}
                    fill="rgba(6,14,18,0.92)"
                    stroke="rgba(52,211,153,0.5)"
                  />
                  <text
                    x={0}
                    y={-18}
                    textAnchor="middle"
                    fill="#6EE7B7"
                    fontSize="9.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    EV • {liveTemp}°C
                  </text>
                </g>
              </svg>

              {/* 4-Step Chain of Custody Timeline Bar */}
              <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-white/10">
                {stages.map((st, i) => (
                  <div
                    key={i}
                    className={`rounded-lg px-2 py-1 text-center font-mono-tech ${
                      st.active
                        ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-200'
                        : st.done
                        ? 'bg-white/5 text-white/80'
                        : 'bg-white/[0.02] text-white/45'
                    }`}
                  >
                    <div className="text-[9px] font-bold truncate">{st.label}</div>
                    <div className="text-[8px] opacity-75 truncate">{st.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Batch Photo & Sensor Cards */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
              <div className="relative h-28 rounded-2xl overflow-hidden border border-white/15">
                {currentBatch.imageUrl && (
                  <img
                    src={currentBatch.imageUrl}
                    alt={currentBatch.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3">
                  <span className="text-[10px] font-mono-tech uppercase text-orange-300 font-bold">
                    {currentBatch.quantityKg} kg • {currentBatch.mealsEquivalent} Meals
                  </span>
                  <div className="text-xs font-bold text-white line-clamp-1">
                    {currentBatch.activeBatch}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="frosted-subcard p-3 space-y-0.5">
                  <div className="text-[10px] font-mono-tech text-white/65 flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-emerald-400" />
                    <span>CORE TEMP</span>
                  </div>
                  <div className="text-lg font-mono-tech font-bold text-emerald-300">
                    {liveTemp}°C
                  </div>
                  <div className="text-[9px] text-white/60">FSSAI Safe ✓</div>
                </div>
                <div className="frosted-subcard p-3 space-y-0.5">
                  <div className="text-[10px] font-mono-tech text-white/65 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-orange-400" />
                    <span>ARRIVAL ETA</span>
                  </div>
                  <div className="text-lg font-mono-tech font-bold text-orange-300">
                    {formattedTime}
                  </div>
                  <div className="text-[9px] text-white/60">{currentBatch.neighborhood}</div>
                </div>
                <div className="frosted-subcard p-3 space-y-0.5">
                  <div className="text-[10px] font-mono-tech text-white/65 flex items-center gap-1">
                    <BatteryCharging className="w-3 h-3 text-cyan-400" />
                    <span>EV CHARGE</span>
                  </div>
                  <div className="text-lg font-mono-tech font-bold text-cyan-300">86%</div>
                  <div className="text-[9px] text-white/60">Zero-Emission</div>
                </div>
                <div className="frosted-subcard p-3 space-y-0.5">
                  <div className="text-[10px] font-mono-tech text-white/65 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>QR SEAL</span>
                  </div>
                  <div className="text-lg font-mono-tech font-bold text-white">Locked</div>
                  <div className="text-[9px] text-white/60">-{currentBatch.co2SavedKg}kg CO₂</div>
                </div>
              </div>
            </div>
          </div>

          {/* Rider & Shelter Handoff Bar */}
          <div className="rounded-2xl bg-white/[0.05] border border-white/[0.14] p-3.5 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1589386417686-0d34b5903d23?auto=format&fit=crop&w=200&q=80"
                alt="Rescue Captain"
                className="w-11 h-11 rounded-xl object-cover border border-emerald-400/50"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-bold text-sm">
                    Captain Vikram Singh (EV Fleet #FB-04)
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono-tech text-[9px] font-bold">
                    VERIFIED CAPTAIN
                  </span>
                </div>
                <p className="text-xs text-white/70 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3 h-3 text-orange-400" />
                  <span>
                    Delivering {currentBatch.mealsEquivalent} meals to {currentBatch.partnerName}
                  </span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.success();
                setPingedRider(true);
              }}
              className={`px-4 py-2.5 rounded-full font-mono-tech font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                pingedRider
                  ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/50'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
              }`}
            >
              {pingedRider ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Rider Confirmed ETA ({formattedTime})</span>
                </>
              ) : (
                <>
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Ping Rider Desk</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
