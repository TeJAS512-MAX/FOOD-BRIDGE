import React, { useEffect, useState } from 'react';
import {
  BatteryCharging,
  CheckCircle2,
  Clock,
  MapPin,
  Navigation2,
  Radio,
  ShieldCheck,
  Thermometer,
  X,
} from 'lucide-react';
import { LIVE_TELEMETRY, LiveDispatchTelemetry } from '../data/foodBridgeData';
import { sound } from '../utils/soundEffects';

interface LiveRouteTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveRouteTrackerModal: React.FC<LiveRouteTrackerModalProps> = ({ isOpen, onClose }) => {
  const [telemetry] = useState<LiveDispatchTelemetry>(LIVE_TELEMETRY);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(524);
  const [currentTemp, setCurrentTemp] = useState<number>(65.4);
  const [progressPct, setProgressPct] = useState<number>(62);

  // Live fluctuating telemetry simulation to make it feel 100% realistic
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(12, prev - 1));
      // Subtle sensor fluctuation
      setCurrentTemp((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
      setProgressPct((prev) => Math.min(96, +(prev + 0.1).toFixed(1)));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-3xl frosted-modal text-white border border-white/20 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-white/[0.05] px-6 sm:px-8 py-5 border-b border-white/[0.14] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600" />
            </span>
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-wider text-emerald-400 block font-bold">
                FOODBRIDGE AI LIVE TELEMETRY RADAR
              </span>
              <span className="text-[11px] text-white/60">
                ACTIVE DISPATCH: {telemetry.dispatchId} • 100% ENCRYPTED GPS
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.click();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/[0.12] hover:bg-slate-300 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* High-Tech Map Viewport */}
          <div className="relative h-64 sm:h-72 rounded-2xl bg-black/60 border border-slate-800 overflow-hidden flex items-center justify-center">
            {/* Grid background lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />

            {/* Radar sweep animation */}
            <div className="absolute w-96 h-96 rounded-full border border-emerald-500/20 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border border-emerald-500/30" />
              <div className="w-32 h-32 rounded-full border border-emerald-500/40" />
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(16,185,129,0.35)_360deg)] animate-radar-sweep pointer-events-none" />
            </div>

            {/* Donor Node */}
            <div className="absolute left-8 sm:left-14 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
              <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-lg border border-orange-400">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono-tech mt-1.5 text-orange-300 font-bold text-center max-w-[110px]">
                Grand Horizon
              </span>
              <span className="text-[9px] text-white/50 font-mono-tech">PICKUP: 21:14</span>
            </div>

            {/* Dynamic Connecting Route Line with Glowing Moving Vehicle */}
            <div className="absolute left-24 sm:left-32 right-24 sm:right-32 top-1/2 -translate-y-1/2 h-1.5 bg-slate-800 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 rounded-full relative transition-all duration-1000"
                style={{ width: `${progressPct}%` }}
              >
                {/* Vehicle Pulse Icon */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-[0_0_15px_#10B981] ring-4 ring-emerald-500/30">
                  <Navigation2 className="w-4 h-4 fill-current rotate-90" />
                </div>
              </div>
            </div>

            {/* Destination NGO Node */}
            <div className="absolute right-8 sm:right-14 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg border border-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono-tech mt-1.5 text-emerald-300 font-bold text-center max-w-[110px]">
                Annapurna Seva
              </span>
              <span className="text-[9px] text-white/50 font-mono-tech">DESTINATION</span>
            </div>

            {/* Floating Live Telemetry HUD */}
            <div className="absolute top-3 left-3 bg-black/90 backdrop-blur-md border border-slate-700 rounded-xl px-3 py-1.5 text-[11px] font-mono-tech flex items-center gap-2 text-emerald-400 font-semibold">
              <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span>LIVE MESH: SATELLITE LOCK 14/14</span>
            </div>

            <div className="absolute bottom-3 right-3 bg-black/90 backdrop-blur-md border border-slate-700 rounded-xl px-3 py-1.5 text-[11px] font-mono-tech text-white/60">
              <span>SPEED: 26 km/h • ECO EV</span>
            </div>
          </div>

          {/* 4 Sensor Telemetry Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="rounded-2xl bg-white/[0.05] border border-white/[0.14] p-4 space-y-1">
              <div className="text-[11px] font-mono-tech text-white/60 uppercase flex items-center gap-1.5 font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                ETA Remaining
              </div>
              <div className="text-xl sm:text-2xl font-mono-tech font-bold text-amber-600">
                {formattedTime}
              </div>
              <div className="text-[10px] text-white/60">Sub-38m Guarantee</div>
            </div>

            <div className="rounded-2xl bg-white/[0.05] border border-white/[0.14] p-4 space-y-1">
              <div className="text-[11px] font-mono-tech text-white/60 uppercase flex items-center gap-1.5 font-semibold">
                <Thermometer className="w-3.5 h-3.5 text-emerald-400" />
                Thermal Sensor
              </div>
              <div className="text-xl sm:text-2xl font-mono-tech font-bold text-emerald-400">
                {currentTemp}°C
              </div>
              <div className="text-[10px] text-emerald-400 font-medium">Hot Holding (63°C+ Safe)</div>
            </div>

            <div className="rounded-2xl bg-white/[0.05] border border-white/[0.14] p-4 space-y-1">
              <div className="text-[11px] font-mono-tech text-white/60 uppercase flex items-center gap-1.5 font-semibold">
                <BatteryCharging className="w-3.5 h-3.5 text-cyan-400" />
                EV Battery
              </div>
              <div className="text-xl sm:text-2xl font-mono-tech font-bold text-cyan-400">
                {telemetry.batteryPct}%
              </div>
              <div className="text-[10px] text-white/60">Zero-Emission Trip</div>
            </div>

            <div className="rounded-2xl bg-white/[0.05] border border-white/[0.14] p-4 space-y-1">
              <div className="text-[11px] font-mono-tech text-white/60 uppercase flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Food Safety
              </div>
              <div className="text-xl sm:text-2xl font-mono-tech font-bold text-white">
                FSSAI Pass
              </div>
              <div className="text-[10px] text-white/60">Tamper-Evident Seal</div>
            </div>
          </div>

          {/* Trip Details & Rider Card */}
          <div className="rounded-2xl bg-white/[0.05] border border-white/[0.14] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-emerald-900/30 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold font-mono-tech">
                VS
              </div>
              <div>
                <h4 className="text-white font-bold text-sm sm:text-base">
                  {telemetry.riderName}
                </h4>
                <p className="text-xs text-white/60">
                  {telemetry.riderVehicle} • 1,120+ Safe Dispatches
                </p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Payload: {telemetry.mealsCount} Hot Banquet Meals ({telemetry.batchType})</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.success();
                alert(`Direct Dispatch Radio Link Connected to ${telemetry.riderName}. Voice channel ready.`);
              }}
              className="px-5 py-2.5 rounded-full bg-black/60 hover:bg-slate-800 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>Contact Dispatcher</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
