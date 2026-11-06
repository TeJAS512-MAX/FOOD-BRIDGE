import React, { useEffect, useState } from 'react';
import {
  BatteryCharging,
  CheckCircle2,
  Clock,
  Compass,
  MapPin,
  Navigation2,
  Radio,
  ShieldCheck,
  Thermometer,
  Truck,
  X,
  Zap,
} from 'lucide-react';
import { LIVE_TELEMETRY, LiveDispatchTelemetry } from '../data/foodBridgeData';
import { sound } from '../utils/soundEffects';

interface LiveRouteTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveRouteTrackerModal: React.FC<LiveRouteTrackerModalProps> = ({ isOpen, onClose }) => {
  const [telemetry, setTelemetry] = useState<LiveDispatchTelemetry>(LIVE_TELEMETRY);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-[32px] bg-[#172B1E] text-[#F2EBE1] border border-[rgba(74,173,116,0.18)]/60 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-[#0F1E14] px-6 sm:px-8 py-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4AAD74] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2A8A56]" />
            </span>
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-widest text-[#4AAD74] block font-semibold">
                FOODBRIDGE AI LIVE TELEMETRY RADAR
              </span>
              <span className="text-[11px] text-[#9E8E7A]">
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
            className="w-8 h-8 rounded-full bg-[#1E3828] hover:bg-[#2A4A36] flex items-center justify-center text-[#C4B9AC] hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Simulated Radar Map Viewport */}
          <div className="relative h-64 sm:h-72 rounded-2xl bg-[#0F1E14] border border-white/10 overflow-hidden flex items-center justify-center">
            {/* Grid background lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-35" />

            {/* Radar sweep animation */}
            <div className="absolute w-96 h-96 rounded-full border border-emerald-500/20 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border border-emerald-500/30" />
              <div className="w-32 h-32 rounded-full border border-emerald-500/40" />
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(16,185,129,0.35)_360deg)] animate-radar-sweep pointer-events-none" />
            </div>

            {/* Donor Node */}
            <div className="absolute left-8 sm:left-14 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
              <div className="w-10 h-10 rounded-2xl bg-[#D4521A]/90 text-white flex items-center justify-center shadow-lg border border-orange-400/50">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono-tech mt-1.5 text-orange-300 font-semibold text-center max-w-[110px]">
                Grand Horizon
              </span>
              <span className="text-[9px] text-[#9E8E7A]">PICKUP: 21:14</span>
            </div>

            {/* Dynamic Connecting Route Line with Glowing Moving Vehicle */}
            <div className="absolute left-24 sm:left-32 right-24 sm:right-32 top-1/2 -translate-y-1/2 h-1 bg-[#1E3828] rounded-full">
              <div
                className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500 rounded-full relative transition-all duration-1000"
                style={{ width: `${progressPct}%` }}
              >
                {/* Vehicle Pulse Icon */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-full bg-[#2A8A56] text-white flex items-center justify-center shadow-[0_0_20px_#10B981] ring-4 ring-emerald-500/30">
                  <Navigation2 className="w-4 h-4 fill-current rotate-90" />
                </div>
              </div>
            </div>

            {/* Destination NGO Node */}
            <div className="absolute right-8 sm:right-14 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
              <div className="w-10 h-10 rounded-2xl bg-[#1A5C38]/90 text-white flex items-center justify-center shadow-lg border border-emerald-400/50">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono-tech mt-1.5 text-[#7DC99A] font-semibold text-center max-w-[110px]">
                Annapurna Seva
              </span>
              <span className="text-[9px] text-[#9E8E7A]">DESTINATION</span>
            </div>

            {/* Floating Live Telemetry HUD */}
            <div className="absolute top-3 left-3 bg-[#172B1E]/90 backdrop-blur-md border border-[rgba(74,173,116,0.18)]/80 rounded-xl px-3 py-1.5 text-[11px] font-mono-tech flex items-center gap-2 text-[#4AAD74]">
              <Radio className="w-3.5 h-3.5 animate-pulse text-[#4AAD74]" />
              <span>LIVE MESH: SATELLITE LOCK 14/14</span>
            </div>

            <div className="absolute bottom-3 right-3 bg-[#172B1E]/90 backdrop-blur-md border border-[rgba(74,173,116,0.18)]/80 rounded-xl px-3 py-1.5 text-[11px] font-mono-tech text-[#C4B9AC]">
              <span>SPEED: 26 km/h • ECO EV</span>
            </div>
          </div>

          {/* 4 Sensor Telemetry Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="rounded-2xl bg-[#1E3828]/60 border border-[rgba(74,173,116,0.18)]/60 p-4 space-y-1">
              <div className="text-[11px] font-mono-tech text-[#9E8E7A] uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#DDB259]" />
                ETA Remaining
              </div>
              <div className="text-xl sm:text-2xl font-mono-tech font-bold text-[#DDB259]">
                {formattedTime}
              </div>
              <div className="text-[10px] text-[#9E8E7A]">Sub-38m Guarantee</div>
            </div>

            <div className="rounded-2xl bg-[#1E3828]/60 border border-[rgba(74,173,116,0.18)]/60 p-4 space-y-1">
              <div className="text-[11px] font-mono-tech text-[#9E8E7A] uppercase flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5 text-[#4AAD74]" />
                Thermal Sensor
              </div>
              <div className="text-xl sm:text-2xl font-mono-tech font-bold text-[#4AAD74]">
                {currentTemp}°C
              </div>
              <div className="text-[10px] text-[#7DC99A]/80">Hot Holding (63°C+ Safe)</div>
            </div>

            <div className="rounded-2xl bg-[#1E3828]/60 border border-[rgba(74,173,116,0.18)]/60 p-4 space-y-1">
              <div className="text-[11px] font-mono-tech text-[#9E8E7A] uppercase flex items-center gap-1.5">
                <BatteryCharging className="w-3.5 h-3.5 text-sky-400" />
                EV Battery
              </div>
              <div className="text-xl sm:text-2xl font-mono-tech font-bold text-sky-400">
                {telemetry.batteryPct}%
              </div>
              <div className="text-[10px] text-[#9E8E7A]">Zero-Emission Trip</div>
            </div>

            <div className="rounded-2xl bg-[#1E3828]/60 border border-[rgba(74,173,116,0.18)]/60 p-4 space-y-1">
              <div className="text-[11px] font-mono-tech text-[#9E8E7A] uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4AAD74]" />
                Food Safety
              </div>
              <div className="text-xl sm:text-2xl font-mono-tech font-bold text-white">
                FSSAI Pass
              </div>
              <div className="text-[10px] text-[#9E8E7A]">Tamper-Evident Seal</div>
            </div>
          </div>

          {/* Trip Details & Rider Card */}
          <div className="rounded-2xl bg-[#1E3828]/40 border border-[rgba(74,173,116,0.18)]/50 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#2A8A56]/20 border border-emerald-500/30 flex items-center justify-center text-[#4AAD74] font-bold">
                VS
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm sm:text-base">
                  {telemetry.riderName}
                </h4>
                <p className="text-xs text-[#9E8E7A]">
                  {telemetry.riderVehicle} • 1,120+ Safe Dispatches
                </p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-[#4AAD74]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4AAD74]" />
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
              className="px-4 py-2.5 rounded-full bg-[#1A5C38] hover:bg-[#2A8A56] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Contact Dispatcher</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

