import React, { useState } from 'react';
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Clock,
  Cpu,
  Flame,
  HeartHandshake,
  Scale,
  ShieldCheck,
  Sparkles,
  Truck,
  UtensilsCrossed,
} from 'lucide-react';
import { WasteToFeastVisualizer } from './WasteToFeastVisualizer';
import { sound } from '../utils/soundEffects';

interface ProblemSolutionSectionProps {
  onOpenDonateModal: () => void;
  onOpenLiveTracker?: () => void;
}

export const ProblemSolutionSection: React.FC<ProblemSolutionSectionProps> = ({
  onOpenDonateModal,
  onOpenLiveTracker,
}) => {
  // Interactive slider for The Problem: What % of city hospitality surplus gets bridged?
  const [redirectionRate, setRedirectionRate] = useState<number>(65);
  const [activeBridgeLayer, setActiveBridgeLayer] = useState<'donors' | 'engine' | 'ngos'>('engine');

  // Dynamic metrics derived from redirectionRate (out of a typical metro city's 120 tonnes daily hospitality surplus)
  const dailySurplusTonnes = 120;
  const rescuedTonnes = Math.round((dailySurplusTonnes * redirectionRate) / 100);
  const dailyMealsCreated = rescuedTonnes * 2500; // 400g per meal = 2,500 meals/tonne
  const dailyCo2PreventedTonnes = Math.round(rescuedTonnes * 2.5);

  const bridgeLayers = {
    donors: {
      badge: 'TIER 01 • SURPLUS ORIGINS',
      title: 'Restaurants, Hotels, Banquets & Households',
      subtitle: 'Turn kitchen teardown from an expensive disposal chore into verified social & ESG impact.',
      color: '#EA580C',
      stats: [
        { label: 'Onboarding Speed', value: '< 2 Mins' },
        { label: 'Legal Shield', value: '100% Protected' },
        { label: 'Tax 80G Receipt', value: 'Instant Automated' },
      ],
      features: [
        'One-tap AI camera scan estimates weight, portions, and safe thermal window from a single tray photo.',
        'Supports commercial hotels, wedding caterers, tech-park cafeterias, bakeries, and residential society drives.',
        'Indian Good Samaritan legal shield & FSSAI hygiene self-check automatically embedded in every dispatch.',
      ],
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    },
    engine: {
      badge: 'TIER 02 • THE FOODBRIDGE AI CORE',
      title: 'Geospatial Matching & Sub-38m Cold/Hot-Chain Dispatch',
      subtitle: 'Algorithmic routing pairs hot food before temperature drops below 63°C safe threshold.',
      color: '#059669',
      stats: [
        { label: 'Avg Match Time', value: '14 Seconds' },
        { label: 'Pickup Velocity', value: '38 Minutes' },
        { label: 'Thermal Compliance', value: '99.4% Verified' },
      ],
      features: [
        'Matches food type, dietary tags, and portion count against real-time shelter headcount & refrigeration capacity within 5 km.',
        'Dispatches nearest Hunger Hero volunteer rider or partner EV thermal van with turn-by-turn batching.',
        'Live IoT temperature & freshness countdown prevents spoilage during transit with tamper-evident seals.',
      ],
      image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80',
    },
    ngos: {
      badge: 'TIER 03 • COMMUNITY SANCTUARIES',
      title: 'Verified NGOs, Shelters & 24/7 Community Fridges',
      subtitle: 'Predictable, nutritious, dignified meals delivered straight to communities in need.',
      color: '#0284C7',
      stats: [
        { label: 'Verified NGO Hubs', value: '340+ Hubs' },
        { label: 'Cost to Shelters', value: '₹0 / Always Free' },
        { label: 'Nutritional Variety', value: 'Balanced Macros' },
      ],
      features: [
        'NGO coordinators receive live incoming manifests with portion counts, allergen tags, and exact arrival ETAs.',
        'Digital QR handoff confirms safe delivery and triggers instant impact certificates for the donor.',
        'Surplus micro-batches (< 10 meals) route to 24/7 supervised Neighborhood Community Fridges.',
      ],
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    },
  };

  const activeLayerData = bridgeLayers[activeBridgeLayer];

  return (
    <>
      {/* =====================================================================
          SECTION 2: THE PROBLEM ("THE PARADOX OF PLENTY")
      ===================================================================== */}
      <section
        id="problem"
        className="relative py-8 lg:py-11 text-white overflow-hidden"
      >
        {/* Soft Ambient Radiance */}
        <div className="pointer-events-none absolute top-12 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-8 right-10 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b border-white/[0.14]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-mono-tech uppercase tracking-wider mb-2.5 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>THE CHALLENGE</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08] text-white">
                Food waste isn’t a scarcity problem.{' '}
                <span className="italic font-normal text-orange-400">
                  It’s a broken distribution problem.
                </span>
              </h2>
            </div>
            <p className="text-sm text-white/70 max-w-md leading-relaxed">
              Every evening, while wedding banquets and commercial kitchens throw away pristine,
              delicious feasts, thousands of children and families go to sleep on empty stomachs just 3 kilometers away.
            </p>
          </div>

          {/* Interactive Before & After Visual Scrubber */}
          <div className="mt-6">
            <WasteToFeastVisualizer />
          </div>

          {/* 3 Hard Truth Reality Cards */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-5 space-y-2.5 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between">
                <div className="font-serif-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  68.7 M
                </div>
                <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center">
                  <Flame className="w-5 h-5" />
                </div>
              </div>
              <div className="font-mono-tech text-xs uppercase tracking-wider text-rose-400 font-semibold">
                Tonnes Wasted in India Yearly
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Enough food to feed the entire hungry population of several nations, ending up in
                anaerobic city landfills emitting potent methane gas.
              </p>
            </div>

            <div className="glass-card p-5 space-y-2.5 shadow-sm hover:shadow-md hover:border-orange-500/40 transition-all">
              <div className="flex items-center justify-between">
                <div className="font-serif-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  45 Mins
                </div>
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="font-mono-tech text-xs uppercase tracking-wider text-orange-400 font-semibold">
                The Critical Thermal Window
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Hot prepared banquet food must be collected and dispatched within 45 minutes to maintain
                FSSAI food hygiene compliance before bacteria multiply.
              </p>
            </div>

            <div className="glass-card p-5 space-y-2.5 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between">
                <div className="font-serif-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  800 M+
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
              </div>
              <div className="font-mono-tech text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                People Face Food Insecurity
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                A problem of civic logistics. When food surplus is mapped to real-time NGO demand,
                hunger can be solved city by city, neighborhood by neighborhood.
              </p>
            </div>
          </div>

          {/* Interactive Simulation Console */}
          <div className="mt-5 glass-card p-5 sm:p-7 shadow-lg relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-2.5">
                <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-emerald-400 font-bold">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>METRO SURPLUS REDIRECTION SIMULATOR</span>
                </div>
                <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-white">
                  What happens when a city stops discarding hospitality surplus?
                </h3>
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs font-mono-tech">
                    <span className="text-white/70 font-semibold">REDIRECTION TARGET</span>
                    <span className="text-emerald-400 font-bold text-sm px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                      {redirectionRate}% DIVERTED
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="95"
                    step="5"
                    value={redirectionRate}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setRedirectionRate(val);
                      sound.sliderTick(val);
                    }}
                    className="w-full h-2 bg-white/[0.12] rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    aria-label="Redirection percentage slider"
                  />
                </div>
              </div>

              {/* Dynamic Results Grid */}
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-2xl bg-emerald-500/15 border border-emerald-500/30 p-3.5 space-y-0.5">
                  <div className="text-[10px] font-mono-tech text-emerald-300 uppercase font-semibold">Meals / Day</div>
                  <div className="text-lg sm:text-xl font-mono-tech font-bold text-emerald-400">
                    {dailyMealsCreated.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-400/80">Hot servings</div>
                </div>

                <div className="rounded-2xl bg-white/[0.05] border border-white/[0.14] p-3.5 space-y-0.5">
                  <div className="text-[10px] font-mono-tech text-white/70 uppercase font-semibold">Food Rescued</div>
                  <div className="text-lg sm:text-xl font-mono-tech font-bold text-white">
                    {rescuedTonnes} Tonnes
                  </div>
                  <div className="text-[10px] text-white/60">Of 120T daily</div>
                </div>

                <div className="rounded-2xl bg-orange-500/15 border border-orange-500/30 p-3.5 space-y-0.5">
                  <div className="text-[10px] font-mono-tech text-orange-300 uppercase font-semibold">CO₂e Saved</div>
                  <div className="text-lg sm:text-xl font-mono-tech font-bold text-orange-400">
                    {dailyCo2PreventedTonnes} Tonnes
                  </div>
                  <div className="text-[10px] text-orange-400/80">Methane avoided</div>
                </div>

                <div className="rounded-2xl bg-cyan-500/15 border border-cyan-500/30 p-3.5 space-y-0.5">
                  <div className="text-[10px] font-mono-tech text-cyan-300 uppercase font-semibold">Shelters Fed</div>
                  <div className="text-lg sm:text-xl font-mono-tech font-bold text-cyan-400">
                    {Math.round(dailyMealsCreated / 250)} Hubs
                  </div>
                  <div className="text-[10px] text-cyan-400/80">250 plates each</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: OUR SOLUTION ("THE FOODBRIDGE GRID")
      ===================================================================== */}
      <section
        id="solution"
        className="relative py-8 lg:py-11 text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b border-white/[0.14]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono-tech uppercase tracking-wider mb-2.5 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>OUR SOLUTION</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08] text-white">
                Bridging surplus to sustenance in{' '}
                <span className="italic font-normal text-emerald-400">3 simple connected layers.</span>
              </h2>
            </div>
            <p className="text-sm text-white/70 max-w-md leading-relaxed">
              FoodBridge coordinates every step — from the hotel kitchen tray to thermal van delivery and shelter plate — in under 38 minutes with complete transparency.
            </p>
          </div>

          {/* 3 Interactive Solution Layer Tabs */}
          <div className="mt-5 flex flex-wrap gap-2.5">
            {[
              { id: 'donors', label: '1. Food Donors & Origin', icon: Building2 },
              { id: 'engine', label: '2. The AI Dispatch Core', icon: Cpu },
              { id: 'ngos', label: '3. Verified NGOs & Fridges', icon: HeartHandshake },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeBridgeLayer === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    sound.click();
                    setActiveBridgeLayer(tab.id as 'donors' | 'engine' | 'ngos');
                  }}
                  className={`flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-emerald-500/25 text-white border-emerald-400 shadow-md'
                      : 'bg-white/[0.07] text-white/80 border-white/[0.14] hover:bg-white/[0.12] hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-white/60'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Solution Layer Active Card */}
          <div className="mt-5 glass-card p-5 sm:p-7 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left 7 Columns */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.14] text-white/80 font-mono-tech text-xs uppercase font-semibold">
                {activeLayerData.badge}
              </div>

              <h3 className="font-serif-display text-2xl sm:text-4xl font-bold text-white leading-tight">
                {activeLayerData.title}
              </h3>

              <p className="text-base text-white/70 leading-relaxed">
                {activeLayerData.subtitle}
              </p>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {activeLayerData.stats.map((st, i) => (
                  <div key={i} className="rounded-2xl bg-white/[0.05] border border-white/[0.14]/90 p-3.5 space-y-1">
                    <div className="font-mono-tech text-base sm:text-lg font-bold text-white">
                      {st.value}
                    </div>
                    <div className="text-[10px] sm:text-xs font-mono-tech text-white/60 uppercase font-medium">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3 pt-2">
                {activeLayerData.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    sound.click();
                    onOpenDonateModal();
                  }}
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-orange-500/20 cursor-pointer transition-all"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Donate Surplus Food</span>
                </button>

                {onOpenLiveTracker && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.radar();
                      onOpenLiveTracker();
                    }}
                    className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/[0.16] text-white/90 border border-white/[0.20] font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm cursor-pointer transition-all"
                  >
                    <Truck className="w-4 h-4 text-emerald-400" />
                    <span>View Live Dispatch Radar</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right 5 Columns: Realistic Photo Preview Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-white/[0.14] shadow-md relative group">
                <img
                  src={activeLayerData.image}
                  alt={activeLayerData.title}
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                <div className="absolute bottom-5 inset-x-5 text-white">
                  <div className="text-xs font-mono-tech uppercase text-emerald-300 font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>FSSAI & GOOD SAMARITAN VERIFIED</span>
                  </div>
                  <div className="text-base font-semibold mt-1">
                    Audited Daily Across Metro Neighborhoods
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
