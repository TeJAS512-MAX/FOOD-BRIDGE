import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeftRight,
  CheckCircle2,
  Flame,
  Sparkles,
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
    <div className="glass-card text-white p-6 sm:p-8 relative shadow-lg">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.14]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-mono-tech uppercase tracking-wider mb-2 font-semibold">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>INTERACTIVE REALITY SCRUBBER</span>
          </div>
          <h3 className="section-heading font-serif-display text-2xl sm:text-3xl font-extrabold text-white">
            The 45-Minute Window:{' '}
            <span className="heading-highlight-emerald">Landfill vs. Dignified Banquet</span>
          </h3>
        </div>
        <div className="text-xs text-white/70 max-w-xs sm:text-right font-medium">
          Drag slider horizontally to reveal the moral and ecological difference of a single kitchen decision.
        </div>
      </div>

      {/* Before / After Interactive Visual Container */}
      <div className="relative mt-6 h-80 sm:h-96 rounded-2xl overflow-hidden border border-white/[0.20] select-none shadow-md">
        {/* Right (After / FoodBridge Reality) Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80')`,
          }}
        >
          {/* Subtle warm emerald vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />

          {/* Label Badge Top Right */}
          <div className="absolute top-4 right-4 bg-emerald-600 text-white rounded-full px-4 py-1.5 text-xs font-mono-tech font-bold flex items-center gap-2 shadow-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
            <span>12:15 AM • DIGNIFIED NOURISHMENT</span>
          </div>

          {/* Impact Stats Overlay Bottom Right */}
          <div className="absolute bottom-5 right-5 text-right bg-white/[0.08] backdrop-blur-md border border-emerald-500/40 rounded-2xl p-4 max-w-[270px] shadow-xl text-white">
            <div className="text-emerald-400 font-mono-tech text-xl font-bold">
              180 Warm Meals
            </div>
            <p className="text-xs text-white/70 mt-0.5 leading-snug">
              Served fresh to children & elders at Annapurna Shelter in under 38 minutes.
            </p>
            <div className="mt-2 text-[11px] font-mono-tech text-emerald-400 font-semibold flex items-center justify-end gap-1">
              <Sparkles className="w-3.5 h-3.5" />
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
                filter: 'grayscale(60%) contrast(115%) brightness(0.85)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent" />
            </div>

            {/* Label Badge Top Left */}
            <div className="absolute top-4 left-4 bg-rose-600 text-white rounded-full px-4 py-1.5 text-xs font-mono-tech font-bold flex items-center gap-2 shadow-md">
              <AlertTriangle className="w-4 h-4 text-rose-200" />
              <span>11:45 PM • LANDFILL DUMPSTER</span>
            </div>

            {/* Stats Overlay Bottom Left */}
            <div className="absolute bottom-5 left-5 bg-white/[0.08] backdrop-blur-md border border-rose-500/40 rounded-2xl p-4 max-w-[270px] shadow-xl text-left text-white">
              <div className="text-rose-400 font-mono-tech text-xl font-bold">
                45 kg Wasted
              </div>
              <p className="text-xs text-white/70 mt-0.5 leading-snug">
                Untouched gourmet catering discarded in garbage skips behind the banquet hall.
              </p>
              <div className="mt-2 text-[11px] font-mono-tech text-rose-400 font-semibold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                <span>+112.5 kg Methane CO₂e Emitted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Divider Line with Scrub Handle */}
        <div
          className="absolute inset-y-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.3)] pointer-events-none z-20"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center shadow-2xl ring-4 ring-white">
            <ArrowLeftRight className="w-4 h-4 text-emerald-400" />
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
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        <div className="rounded-2xl bg-white/[0.05] border border-white/[0.14] p-4">
          <div className="text-xs font-mono-tech text-white/60 uppercase font-semibold">THE PARADOX</div>
          <div className="text-lg font-bold text-white mt-1">1.3 Billion Tonnes</div>
          <p className="text-xs text-white/70 mt-0.5">Of food wasted globally every year while 800M people go to sleep hungry.</p>
        </div>

        <div className="rounded-2xl bg-emerald-500/15 border border-emerald-500/30 p-4">
          <div className="text-xs font-mono-tech text-emerald-300 uppercase font-semibold">THE FOODBRIDGE SOLUTION</div>
          <div className="text-lg font-bold text-emerald-400 mt-1">38-Min Real-Time Match</div>
          <p className="text-xs text-emerald-400 mt-0.5">AI dispatch pairs hot food with verified shelters within 5 km before cooling.</p>
        </div>

        <div className="rounded-2xl bg-orange-500/15 border border-orange-500/30 p-4">
          <div className="text-xs font-mono-tech text-orange-300 uppercase font-semibold">CLIMATE IMPACT</div>
          <div className="text-lg font-bold text-orange-400 mt-1">2.5 kg CO₂e Saved</div>
          <p className="text-xs text-orange-400 mt-0.5">Every 1 kg of food rescued prevents 2.5 kg of greenhouse emissions from rotting landfills.</p>
        </div>
      </div>
    </div>
  );
};
