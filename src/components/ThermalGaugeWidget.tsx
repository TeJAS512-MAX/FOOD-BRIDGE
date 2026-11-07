import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Thermometer,
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface VanTelemetry {
  vanId: string;
  route: string;
  temp: number;
  status: 'safe' | 'warning' | 'critical';
  meals: number;
  etaMins: number;
}

export const ThermalGaugeWidget: React.FC = () => {
  const [selectedVanIndex, setSelectedVanIndex] = useState<number>(0);
  const [liveJitter, setLiveJitter] = useState<number>(0);

  const vans: VanTelemetry[] = [
    {
      vanId: 'FB-EV-04',
      route: 'Grand Horizon → Annapurna Seva',
      temp: 66.2,
      status: 'safe',
      meals: 168,
      etaMins: 9,
    },
    {
      vanId: 'FB-EV-19',
      route: 'Marriott Banquet → Bal Ashram',
      temp: 64.8,
      status: 'safe',
      meals: 312,
      etaMins: 14,
    },
    {
      vanId: 'FB-EV-08',
      route: 'TechPark Cafe → Karuna Shelter',
      temp: 63.6,
      status: 'safe',
      meals: 95,
      etaMins: 6,
    },
    {
      vanId: 'FB-EV-22',
      route: 'Artisan Bakery → St. Jude Child Center',
      temp: 22.4, // Bakery ambient
      status: 'safe',
      meals: 120,
      etaMins: 11,
    },
  ];

  const activeVan = vans[selectedVanIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveJitter((Math.random() - 0.5) * 0.4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const currentTemp = +(activeVan.temp + liveJitter).toFixed(1);
  const isHotHolding = activeVan.temp > 50;
  const isCompliant = isHotHolding ? currentTemp >= 63.0 : currentTemp <= 25.0;

  // Circular gauge calculations (0 to 100°C)
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  // Sweep arc from 0 to 240 degrees
  const anglePercentage = Math.min(100, Math.max(0, currentTemp)) / 100;
  const strokeDashoffset = circumference - anglePercentage * (circumference * 0.75);

  return (
    <div className="frosted-card p-6 sm:p-7 space-y-5">
      {/* Widget Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/15">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif-display text-lg font-bold text-white">
              IoT Cold/Hot-Chain Monitor
            </h4>
            <p className="text-[11px] font-mono-tech text-white/60">
              Live FSSAI Food Hygiene Temperature Telemetry
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-tech font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE SENSORS
        </span>
      </div>

      {/* Van Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {vans.map((v, i) => (
          <button
            key={v.vanId}
            type="button"
            onClick={() => {
              sound.click();
              setSelectedVanIndex(i);
            }}
            className={`p-2 rounded-xl text-left font-mono-tech text-xs transition-all cursor-pointer ${
              selectedVanIndex === i
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold">{v.vanId}</span>
              <span className="text-[10px] text-white/50">{v.etaMins}m</span>
            </div>
            <div className="text-[10px] text-white/50 truncate mt-0.5">{v.route.split('→')[1]}</div>
          </button>
        ))}
      </div>

      {/* Main Dial & Telemetry Row */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pt-1">
        {/* SVG Circular Dial (5 cols) */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center relative">
          <svg className="w-40 h-40 transform -rotate-135" viewBox="0 0 160 160">
            {/* Background Track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="12"
              strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            />
            {/* Safe Zone Highlight (63°C - 75°C) */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="rgba(16,185,129,0.30)"
              strokeWidth="12"
              strokeDasharray="40 300"
              strokeDashoffset="-140"
            />
            {/* Active Temperature Arc */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={isCompliant ? '#10B981' : '#F97316'}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-700 ease-out"
              filter="drop-shadow(0 0 6px rgba(16,185,129,0.5))"
            />
          </svg>

          {/* Central Temperature Value */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-3xl font-bold font-serif-display text-white tracking-tight">
              {currentTemp}°C
            </span>
            <span className="text-[10px] font-mono-tech uppercase font-bold text-emerald-400 mt-0.5">
              {isCompliant ? 'HYGIENE SAFE ✓' : 'TEMP WARNING'}
            </span>
          </div>
        </div>

        {/* Telemetry Breakdown (7 cols) */}
        <div className="sm:col-span-7 space-y-3">
          <div className="frosted-subcard p-3 space-y-1">
            <div className="flex items-center justify-between text-xs font-mono-tech">
              <span className="text-white/60">Active Route:</span>
              <span className="text-white font-semibold">{activeVan.route}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono-tech">
              <span className="text-white/60">Load Size:</span>
              <span className="text-orange-400 font-bold">{activeVan.meals} Dignified Meals</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono-tech">
              <span className="text-white/60">FSSAI Regulation:</span>
              <span className="text-emerald-400 font-semibold">
                {isHotHolding ? '> 63.0°C Hot Holding' : '< 25.0°C Bakery Safe'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Digital IoT tamper-proof seal active • Automatic NGO auto-acceptance logged</span>
          </div>
        </div>
      </div>
    </div>
  );
};
