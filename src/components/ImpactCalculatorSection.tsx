import React, { useState } from 'react';
import {
  Award,
  BarChart3,
  Box,
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

  // Number of 3D crates to render in the visual stack (1 to 12)
  const crateCount = Math.min(12, Math.max(1, Math.ceil(surplusKg / 42)));

  return (
    <section
      id="impact"
      className="relative py-24 lg:py-32 text-[#F2EBE1] relative overflow-hidden"
    >
      {/* Decorative Glows */}
      <div className="pointer-events-none absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 w-96 h-96 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30/12 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40/15 border border-emerald-500/30 text-[#00F5A0] text-xs font-mono-tech uppercase tracking-widest mb-4">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>05 • VERIFIED IMPACT & CARBON LEDGER</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.06] text-white">
              Every rescued kilogram heals both{' '}
              <span className="italic font-normal text-[#00F5A0]">
                communities and the climate.
              </span>
            </h2>
          </div>
          <p className="text-base text-slate-300 max-w-md leading-relaxed">
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
              accent: 'text-[#00F5A0]',
              border: 'border-emerald-500/30',
            },
            {
              label: 'SURPLUS FOOD RESCUED',
              value: '45,200 kg',
              sub: 'Zero landfill diversion',
              accent: 'text-[#FF6B4A]',
              border: 'border-orange-500/30',
            },
            {
              label: 'METHANE CO₂e PREVENTED',
              value: '86.4 Tonnes',
              sub: '≈ 4,114 Mature Trees',
              accent: 'text-[#00F2FE]',
              border: 'border-amber-500/30',
            },
            {
              label: 'AVG RESCUE VELOCITY',
              value: '38 Mins',
              sub: '99.4% Thermal Safe',
              accent: 'text-white',
              border: 'border-[rgba(74,173,116,0.18)]',
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`rounded-3xl frosted-card border ${stat.border} p-6 space-y-2 shadow-xl hover:scale-102 transition-transform`}
            >
              <div className="text-xs font-mono-tech text-slate-300 uppercase tracking-wider">
                {stat.label}
              </div>
              <div className={`font-serif-display text-3xl sm:text-4xl font-bold ${stat.accent}`}>
                {stat.value}
              </div>
              <div className="text-xs text-slate-300 flex items-center gap-1.5 pt-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#00F5A0]" />
                <span>{stat.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Interactive Impact Calculator Studio */}
        <div className="mt-12 rounded-[36px] frosted-card border border-white/10 p-6 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left 6 Columns: Interactive Controls */}
          <div className="lg:col-span-6 space-y-7">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#00F5A0] font-semibold">
                <Calculator className="w-4 h-4" />
                <span>INTERACTIVE ESG IMPACT CALCULATOR</span>
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
                Calculate Your Organization’s Rescue Potential
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                See the real-time social meals, water conservation, and carbon offset generated from your surplus.
              </p>
            </div>

            {/* Slider: Surplus Kg per occasion */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-slate-300 uppercase">TYPICAL SURPLUS BATCH MASS</span>
                <span className="text-[#00F5A0] font-bold text-base">{surplusKg} KG / BATCH</span>
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
                className="w-full harvest-slider"
                aria-label="Surplus batch kg slider"
              />
              <div className="flex justify-between text-[11px] font-mono-tech text-slate-400">
                <span>10 kg (Cafe)</span>
                <span>65 kg (Banquet)</span>
                <span>300 kg (Convention Mega Feast)</span>
              </div>
            </div>

            {/* Frequency Selector */}
            <div className="space-y-2">
              <div className="text-xs font-mono-tech uppercase text-slate-300 font-semibold">
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
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                        : 'bg-[#1E3828]/80 text-slate-300 border-[rgba(74,173,116,0.18)] hover:bg-[#1E3828]'
                    }`}
                  >
                    {fr.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Food Category Selector */}
            <div className="space-y-2">
              <div className="text-xs font-mono-tech uppercase text-slate-300 font-semibold">
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
                        ? 'btn-frosted-primary text-white border-orange-500 shadow-md ring-2 ring-orange-500/20'
                        : 'bg-[#1E3828]/80 text-slate-300 border-[rgba(74,173,116,0.18)] hover:bg-[#1E3828]'
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
            <div className="rounded-3xl frosted-subcard border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="text-xs font-mono-tech text-[#00F5A0] uppercase font-semibold">
                    ESTIMATED LIFETIME IMPACT
                  </div>
                  <div className="font-serif-display text-2xl font-bold text-white mt-0.5">
                    {totalKg.toLocaleString()} kg Total Rescued
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full frosted-card border border-white/10 text-xs font-mono-tech text-slate-300">
                  {frequency.toUpperCase()} CADENCE
                </div>
              </div>

              {/* 4 Computed Result Cards */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="rounded-2xl frosted-card border border-white/10 p-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono-tech text-[#00F5A0] uppercase">
                    <Utensils className="w-3.5 h-3.5" />
                    Hot Meals Fed
                  </div>
                  <div className="text-2xl font-mono-tech font-bold text-white">
                    {mealsFed.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400">400g nutritious servings</div>
                </div>

                <div className="rounded-2xl frosted-card border border-white/10 p-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono-tech text-[#FF6B4A] uppercase">
                    <Flame className="w-3.5 h-3.5" />
                    CO₂e Methane Saved
                  </div>
                  <div className="text-2xl font-mono-tech font-bold text-[#FF6B4A]">
                    {co2SavedKg.toLocaleString()} kg
                  </div>
                  <div className="text-[10px] text-slate-400">Landfill diversion</div>
                </div>

                <div className="rounded-2xl frosted-card border border-white/10 p-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono-tech text-sky-400 uppercase">
                    <Droplets className="w-3.5 h-3.5" />
                    Water Saved
                  </div>
                  <div className="text-2xl font-mono-tech font-bold text-sky-400">
                    {waterSavedLiters.toLocaleString()} L
                  </div>
                  <div className="text-[10px] text-slate-400">Agricultural footprint</div>
                </div>

                <div className="rounded-2xl frosted-card border border-white/10 p-4 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono-tech text-[#00F5A0] uppercase">
                    <Leaf className="w-3.5 h-3.5" />
                    Trees Equivalent
                  </div>
                  <div className="text-2xl font-mono-tech font-bold text-[#00F5A0]">
                    {treesEquivalent} Trees
                  </div>
                  <div className="text-[10px] text-slate-400">Annual carbon sequestration</div>
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
                  className="flex-1 py-3.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>Lock In This {surplusKg} kg Batch</span>
                </button>

                {onOpenEsgCertificate && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.click();
                      onOpenEsgCertificate(surplusKg);
                    }}
                    className="py-3.5 px-5 rounded-full bg-[#1E3828] hover:bg-[#2A4A36] text-slate-300 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-[rgba(74,173,116,0.18)]"
                  >
                    <Award className="w-4 h-4 text-[#00F2FE]" />
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
