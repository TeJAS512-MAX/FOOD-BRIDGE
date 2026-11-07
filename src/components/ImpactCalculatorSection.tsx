import React, { useState } from 'react';
import {
  Award,
  BarChart3,
  Calculator,
  Droplets,
  Flame,
  Leaf,
  Sparkles,
  TrendingUp,
  Utensils,
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface ImpactCalculatorSectionProps {
  onOpenDonateWithWeight: (weightKg: number) => void;
  onOpenEsgCertificate?: (weightKg: number) => void;
}

export const ImpactCalculatorSection: React.FC<ImpactCalculatorSectionProps> = ({
  onOpenDonateWithWeight,
  onOpenEsgCertificate,
}) => {
  const [surplusKg, setSurplusKg] = useState<number>(65);
  const [frequency, setFrequency] = useState<'once' | 'weekly' | 'daily'>('weekly');
  const [foodCategory, setFoodCategory] = useState<'banquet' | 'bakery' | 'produce'>('banquet');

  const multiplier = frequency === 'once' ? 1 : frequency === 'weekly' ? 52 : 365;
  const categoryCo2Factor =
    foodCategory === 'banquet' ? 2.5 : foodCategory === 'bakery' ? 1.9 : 1.6;

  const totalKg = surplusKg * multiplier;
  const mealsFed = Math.round(totalKg * 4);
  const co2SavedKg = Math.round(totalKg * categoryCo2Factor);
  const waterSavedLiters = Math.round(totalKg * 820);
  const treesEquivalent = Math.max(1, Math.round(co2SavedKg / 21));

  return (
    <section
      id="impact"
      className="relative py-20 lg:py-28 text-white overflow-hidden"
    >
      {/* Decorative Glows */}
      <div className="pointer-events-none absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/[0.14]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono-tech uppercase tracking-wider mb-4 font-semibold">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
              <span>05 • VERIFIED IMPACT & CARBON LEDGER</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-white">
              Every rescued kilogram heals both{' '}
              <span className="italic font-normal text-emerald-400">
                communities and the climate.
              </span>
            </h2>
          </div>
          <p className="text-base text-white/70 max-w-md leading-relaxed">
            Audited quarterly with partner NGOs and environmental certifiers. Every meal bridged is
            timestamped, weighed, and verified via QR chain-of-custody.
          </p>
        </div>

        {/* 4 Headline Impact Counters */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              label: 'VERIFIED MEALS BRIDGED',
              value: '142,850+',
              sub: '+18.4% vs last month',
              accent: 'text-emerald-400',
              bg: 'bg-emerald-500/15 backdrop-blur-xl',
              border: 'border-emerald-500/30',
            },
            {
              label: 'SURPLUS FOOD RESCUED',
              value: '45,200 kg',
              sub: 'Zero landfill diversion',
              accent: 'text-orange-400',
              bg: 'bg-orange-500/15 backdrop-blur-xl',
              border: 'border-orange-500/30',
            },
            {
              label: 'METHANE CO₂e PREVENTED',
              value: '86.4 Tonnes',
              sub: '≈ 4,114 Mature Trees',
              accent: 'text-cyan-400',
              bg: 'bg-cyan-500/15 backdrop-blur-xl',
              border: 'border-cyan-500/30',
            },
            {
              label: 'AVG RESCUE VELOCITY',
              value: '38 Mins',
              sub: '99.4% Thermal Safe',
              accent: 'text-white',
              bg: 'bg-white/[0.05]',
              border: 'border-white/[0.14]',
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`rounded-3xl ${stat.bg} border ${stat.border} p-6 space-y-2 shadow-sm hover:shadow-md hover:scale-102 transition-all`}
            >
              <div className="text-xs font-mono-tech text-white/70 uppercase tracking-wider font-semibold">
                {stat.label}
              </div>
              <div className={`font-serif-display text-3xl sm:text-4xl font-bold ${stat.accent}`}>
                {stat.value}
              </div>
              <div className="text-xs text-white/70 flex items-center gap-1.5 pt-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>{stat.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Interactive Impact Calculator Studio */}
        <div className="mt-12 glass-card p-6 sm:p-12 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left 6 Columns: Interactive Controls */}
          <div className="lg:col-span-6 space-y-7">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-emerald-400 font-bold">
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>INTERACTIVE ESG IMPACT CALCULATOR</span>
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
                Calculate Your Organization’s Rescue Potential
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                See the real-time social meals, water conservation, and carbon offset generated from your surplus.
              </p>
            </div>

            {/* Slider: Surplus Kg per occasion */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-white/70 font-semibold uppercase">TYPICAL SURPLUS BATCH MASS</span>
                <span className="text-emerald-400 font-bold text-base px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                  {surplusKg} KG / BATCH
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                value={surplusKg}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSurplusKg(val);
                  sound.sliderTick(val);
                }}
                className="w-full h-2.5 bg-white/[0.12] rounded-lg appearance-none cursor-pointer accent-emerald-600"
                aria-label="Surplus batch kg slider"
              />
              <div className="flex justify-between text-[11px] font-mono-tech text-white/60">
                <span>10 kg (Cafe)</span>
                <span>65 kg (Banquet)</span>
                <span>300 kg (Mega Convention)</span>
              </div>
            </div>

            {/* Frequency Selector */}
            <div className="space-y-2">
              <div className="text-xs font-mono-tech uppercase text-white/70 font-semibold">
                Rescue Frequency
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'once', label: 'Single Event' },
                  { id: 'weekly', label: 'Weekly Partner' },
                  { id: 'daily', label: 'Daily Zero-Waste' },
                ].map((fr) => (
                  <button
                    key={fr.id}
                    type="button"
                    onClick={() => {
                      sound.click();
                      setFrequency(fr.id as 'once' | 'weekly' | 'daily');
                    }}
                    className={`py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      frequency === fr.id
                        ? 'bg-black/60 text-white border-slate-900 shadow-sm'
                        : 'bg-white/[0.05] text-white/80 border-white/[0.14] hover:bg-white/[0.08]'
                    }`}
                  >
                    {fr.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Food Category Selector */}
            <div className="space-y-2">
              <div className="text-xs font-mono-tech uppercase text-white/70 font-semibold">
                Food Category
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'banquet', label: '🍲 Hot Banquet' },
                  { id: 'bakery', label: '🥖 Bakery / Bread' },
                  { id: 'produce', label: '🥬 Fresh Produce' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      sound.click();
                      setFoodCategory(cat.id as 'banquet' | 'bakery' | 'produce');
                    }}
                    className={`py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      foodCategory === cat.id
                        ? 'bg-orange-500/150 text-white border-orange-500 shadow-sm'
                        : 'bg-white/[0.05] text-white/80 border-white/[0.14] hover:bg-white/[0.08]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right 6 Columns: Realistic Computed Impact Ledger */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl bg-white/[0.05] border border-white/[0.14]/90 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-white/[0.14] pb-4">
                <div>
                  <div className="text-xs font-mono-tech text-emerald-400 uppercase font-bold">
                    ESTIMATED LIFETIME IMPACT
                  </div>
                  <div className="font-serif-display text-2xl font-bold text-white mt-0.5">
                    {totalKg.toLocaleString()} kg Total Rescued
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/[0.07] border border-white/[0.14] text-xs font-mono-tech text-white/70 font-semibold">
                  {frequency.toUpperCase()} CADENCE
                </div>
              </div>

              {/* 4 Computed Result Cards */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="rounded-2xl bg-white/[0.07] border border-white/[0.14] p-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono-tech text-emerald-400 uppercase font-semibold">
                    <Utensils className="w-3.5 h-3.5" />
                    Hot Meals Fed
                  </div>
                  <div className="text-2xl font-mono-tech font-bold text-white">
                    {mealsFed.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-white/60">400g nutritious servings</div>
                </div>

                <div className="rounded-2xl bg-white/[0.07] border border-white/[0.14] p-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono-tech text-orange-400 uppercase font-semibold">
                    <Flame className="w-3.5 h-3.5" />
                    CO₂e Methane Saved
                  </div>
                  <div className="text-2xl font-mono-tech font-bold text-orange-400">
                    {co2SavedKg.toLocaleString()} kg
                  </div>
                  <div className="text-[10px] text-white/60">Landfill diversion</div>
                </div>

                <div className="rounded-2xl bg-white/[0.07] border border-white/[0.14] p-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono-tech text-cyan-400 uppercase font-semibold">
                    <Droplets className="w-3.5 h-3.5" />
                    Water Saved
                  </div>
                  <div className="text-2xl font-mono-tech font-bold text-cyan-400">
                    {waterSavedLiters.toLocaleString()} L
                  </div>
                  <div className="text-[10px] text-white/60">Agricultural footprint</div>
                </div>

                <div className="rounded-2xl bg-white/[0.07] border border-white/[0.14] p-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono-tech text-emerald-400 uppercase font-semibold">
                    <Leaf className="w-3.5 h-3.5" />
                    Trees Equivalent
                  </div>
                  <div className="text-2xl font-mono-tech font-bold text-emerald-400">
                    {treesEquivalent} Trees
                  </div>
                  <div className="text-[10px] text-white/60">Annual carbon sequestration</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    sound.click();
                    onOpenDonateWithWeight(surplusKg);
                  }}
                  className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-orange-500/20 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Lock In This {surplusKg} kg Batch</span>
                </button>

                {onOpenEsgCertificate && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.click();
                      onOpenEsgCertificate(surplusKg);
                    }}
                    className="py-3.5 px-5 rounded-full bg-white/10 hover:bg-white/[0.16] text-white/90 border border-white/[0.20] font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>View ESG Certificate</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
