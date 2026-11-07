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
    <div className="glass-card text-white p-4 sm:p-6 relative shadow-lg">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.14]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-mono-tech uppercase tracking-wider mb-2 font-semibold">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>INTERACTIVE REALITY SCRUBBER</span>
          </div>
          <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-white">
            The 45-Minute Window: <span className="text-emerald-400">Landfill vs. Dignified Banquet</span>
          </h3>
        </div>
        <div className="text-xs text-white/70 max-w-xs sm:text-right font-medium">
          Drag slider horizontally to reveal the moral and ecological difference of a single kitchen decision.
        </div>
      </div>

      {/* Before / After Interactive Visual Container */}
      <div className="relative mt-4 h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/[0.20] select-none shadow-md">
        {/* Right (After / FoodBridge Reality) Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-emerald-950/25 to-slate-950/40" />
        </div>

        {/* Left (Before / Food Waste Tragedy) Full-Width Clipped Image Layer (Never Squishes) */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            WebkitClipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1400&q=80')`,
              filter: 'grayscale(85%) contrast(115%) brightness(0.62)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-rose-950/30 to-slate-950/50" />
        </div>

        {/* Vertical Divider Line with Scrub Handle */}
        <div
          className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_16px_rgba(255,255,255,0.8)] pointer-events-none z-10"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#071013]/90 text-white flex items-center justify-center shadow-2xl ring-2 ring-white">
            <ArrowLeftRight className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Unclipped Top & Bottom HUD Overlay Layer (Never Cut or Squished by Slider) */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-3.5 sm:p-4">
          {/* Top Pills Row */}
          <div className="flex items-center justify-between gap-2">
            <div
              className="bg-rose-600/95 backdrop-blur-md text-white rounded-full px-3 sm:px-3.5 py-1 text-[10px] sm:text-xs font-mono-tech font-bold flex items-center gap-1.5 shadow-lg transition-opacity duration-200"
              style={{ opacity: sliderPos < 14 ? 0.35 : 1 }}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-100 shrink-0" />
              <span>11:45 PM • LANDFILL DUMPSTER</span>
            </div>

            <div
              className="bg-emerald-600/95 backdrop-blur-md text-white rounded-full px-3 sm:px-3.5 py-1 text-[10px] sm:text-xs font-mono-tech font-bold flex items-center gap-1.5 shadow-lg transition-opacity duration-200"
              style={{ opacity: sliderPos > 86 ? 0.35 : 1 }}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-100 shrink-0" />
              <span>12:15 AM • DIGNIFIED NOURISHMENT</span>
            </div>
          </div>

          {/* Bottom Comparison Cards Row */}
          <div className="flex items-end justify-between gap-3">
            <div
              className="bg-[#090D14]/88 backdrop-blur-xl border border-rose-500/45 rounded-2xl p-3 sm:p-3.5 max-w-[235px] sm:max-w-[255px] shadow-2xl text-left text-white transition-all duration-200"
              style={{ opacity: sliderPos < 16 ? 0.3 : 1 }}
            >
              <div className="text-rose-400 font-mono-tech text-base sm:text-lg font-bold">
                45 kg Wasted
              </div>
              <p className="text-[11px] sm:text-xs text-white/80 mt-0.5 leading-snug">
                Untouched gourmet catering discarded in skips behind the banquet hall.
              </p>
              <div className="mt-1.5 text-[10px] sm:text-[11px] font-mono-tech text-rose-400 font-semibold flex items-center gap-1">
                <Flame className="w-3 h-3 shrink-0" />
                <span>+112.5 kg Methane CO₂e Emitted</span>
              </div>
            </div>

            <div
              className="bg-[#071412]/88 backdrop-blur-xl border border-emerald-500/45 rounded-2xl p-3 sm:p-3.5 max-w-[235px] sm:max-w-[255px] shadow-2xl text-right text-white transition-all duration-200"
              style={{ opacity: sliderPos > 84 ? 0.3 : 1 }}
            >
              <div className="text-emerald-400 font-mono-tech text-base sm:text-lg font-bold">
                180 Warm Meals
              </div>
              <p className="text-[11px] sm:text-xs text-white/80 mt-0.5 leading-snug">
                Served fresh to children &amp; elders at Annapurna Shelter in under 38 minutes.
              </p>
              <div className="mt-1.5 text-[10px] sm:text-[11px] font-mono-tech text-emerald-400 font-semibold flex items-center justify-end gap-1">
                <Sparkles className="w-3 h-3 shrink-0" />
                <span>Zero Methane • 100% Dignity</span>
              </div>
            </div>
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
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
        <div className="rounded-2xl bg-white/[0.05] border border-white/[0.14] p-3">
          <div className="text-xs font-mono-tech text-white/60 uppercase font-semibold">THE PARADOX</div>
          <div className="text-base font-bold text-white mt-0.5">1.3 Billion Tonnes</div>
          <p className="text-xs text-white/70 mt-0.5">Of food wasted globally every year while 800M people go to sleep hungry.</p>
        </div>

        <div className="rounded-2xl bg-emerald-500/15 border border-emerald-500/30 p-3">
          <div className="text-xs font-mono-tech text-emerald-300 uppercase font-semibold">THE FOODBRIDGE SOLUTION</div>
          <div className="text-base font-bold text-emerald-400 mt-0.5">38-Min Real-Time Match</div>
          <p className="text-xs text-emerald-400 mt-0.5">AI dispatch pairs hot food with verified shelters within 5 km before cooling.</p>
        </div>

        <div className="rounded-2xl bg-orange-500/15 border border-orange-500/30 p-3">
          <div className="text-xs font-mono-tech text-orange-300 uppercase font-semibold">CLIMATE IMPACT</div>
          <div className="text-base font-bold text-orange-400 mt-0.5">2.5 kg CO₂e Saved</div>
          <p className="text-xs text-orange-400 mt-0.5">Every 1 kg of food rescued prevents 2.5 kg of greenhouse emissions from rotting landfills.</p>
        </div>
      </div>
    </div>
  );
};
