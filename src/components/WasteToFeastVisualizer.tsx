import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeftRight,
  CheckCircle2,
  Clock,
  Flame,
  Heart,
  Scale,
  Sparkles,
  Utensils,
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const WasteToFeastVisualizer: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderPos(val);
    sound.sliderTick(val);
  };

  return (
    <div className="frosted-card text-[#F2EBE1] p-6 sm:p-8 relative">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8661F]/20 border border-orange-500/30 text-[#F28240] text-xs font-mono-tech uppercase tracking-wider mb-2">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>INTERACTIVE REALITY SCRUBBER</span>
          </div>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-white">
            The 45-Minute Window: <span className="text-[#4AAD74]">Landfill vs. Banquet</span>
          </h3>
        </div>
        <div className="text-xs text-[#9E8E7A] max-w-xs sm:text-right">
          Drag slider horizontally to reveal the moral and ecological difference of a single kitchen decision.
        </div>
      </div>

      {/* Before / After Interactive Visual Container */}
      <div className="relative mt-6 h-80 sm:h-96 rounded-2xl overflow-hidden border border-[rgba(74,173,116,0.18)]/80 select-none shadow-inner">
        {/* Right (After / FoodBridge Reality) Background Image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80')`
        }}>
          {/* Subtle warm emerald vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E14] via-[#0F1E14]/40 to-transparent" />
          
          {/* Label Badge Top Right */}
          <div className="absolute top-4 right-4 bg-[#1A5C38]/90 backdrop-blur-md border border-emerald-400/40 text-white rounded-full px-4 py-1.5 text-xs font-mono-tech font-bold flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>12:15 AM • DIGIFIED NOURISHMENT</span>
          </div>

          {/* Impact Stats Overlay Bottom Right */}
          <div className="absolute bottom-5 right-5 text-right bg-[#0F1E14]/85 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-4 max-w-[260px] shadow-xl">
            <div className="text-[#4AAD74] font-mono-tech text-xl font-bold">
              180 Warm Meals
            </div>
            <p className="text-xs text-[#C4B9AC] mt-0.5 leading-snug">
              Served fresh to children & elders at Annapurna Shelter in under 38 minutes.
            </p>
            <div className="mt-2 text-[11px] font-mono-tech text-[#7DC99A] flex items-center justify-end gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Zero Methane • 100% Dignity</span>
            </div>
          </div>
        </div>

        {/* Left (Before / Food Waste Tragedy) Clipped Layer */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="relative w-full h-full">
            {/* The Before Image */}
            <div
              className="absolute inset-0 bg-cover bg-center w-[1200px]"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=1200&q=80')`,
                filter: 'grayscale(60%) contrast(115%) brightness(0.85)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E14] via-[#0F1E14]/40 to-transparent" />
            </div>

            {/* Label Badge Top Left */}
            <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-md border border-red-400/40 text-white rounded-full px-4 py-1.5 text-xs font-mono-tech font-bold flex items-center gap-2 shadow-lg">
              <AlertTriangle className="w-4 h-4 text-red-200" />
              <span>11:45 PM • LANDFILL DUMPSTER</span>
            </div>

            {/* Stats Overlay Bottom Left */}
            <div className="absolute bottom-5 left-5 bg-[#0F1E14]/90 backdrop-blur-md border border-red-500/30 rounded-2xl p-4 max-w-[260px] shadow-xl text-left">
              <div className="text-red-400 font-mono-tech text-xl font-bold">
                45 kg Wasted
              </div>
              <p className="text-xs text-[#C4B9AC] mt-0.5 leading-snug">
                Untouched gourmet catering discarded in garbage skips behind the banquet hall.
              </p>
              <div className="mt-2 text-[11px] font-mono-tech text-red-300 flex items-center gap-1">
                <Flame className="w-3 h-3" />
                <span>+112.5 kg Methane CO₂e Emitted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Divider Line with Scrub Handle */}
        <div
          className="absolute inset-y-0 w-1 bg-[#FFFFFF] shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none z-20"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FFFFFF] text-[#1A1208] flex items-center justify-center shadow-2xl ring-4 ring-emerald-500/50">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>

        {/* Full-width transparent range input overlay */}
        <input
          type="range"
          min="5"
          max="95"
          value={sliderPos}
          onChange={handleSliderChange}
          aria-label="Drag before and after food waste comparison"
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
        />
      </div>

      {/* Bottom Comparison Summary Row */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
        <div className="rounded-2xl bg-[#1E3828]/50 border border-[rgba(74,173,116,0.18)]/60 p-4">
          <div className="text-xs font-mono-tech text-[#9E8E7A] uppercase">THE PARADOX</div>
          <div className="text-lg font-bold text-white mt-1">1.3 Billion Tonnes</div>
          <p className="text-xs text-[#9E8E7A] mt-0.5">Of food wasted globally every year while 800M people go to sleep hungry.</p>
        </div>

        <div className="rounded-2xl bg-[#1E3828]/50 border border-[rgba(74,173,116,0.18)]/60 p-4">
          <div className="text-xs font-mono-tech text-[#4AAD74] uppercase">THE FOODBRIDGE SOLUTION</div>
          <div className="text-lg font-bold text-[#4AAD74] mt-1">38-Min Real-Time Match</div>
          <p className="text-xs text-[#9E8E7A] mt-0.5">AI dispatch pairs hot food with verified shelters within 5 km before cooling.</p>
        </div>

        <div className="rounded-2xl bg-[#1E3828]/50 border border-[rgba(74,173,116,0.18)]/60 p-4">
          <div className="text-xs font-mono-tech text-[#F28240] uppercase">CLIMATE IMPACT</div>
          <div className="text-lg font-bold text-[#F28240] mt-1">2.5 kg CO₂e Saved</div>
          <p className="text-xs text-[#9E8E7A] mt-0.5">Every 1 kg of food rescued prevents 2.5 kg of greenhouse emissions from rotting landfills.</p>
        </div>
      </div>
    </div>
  );
};

