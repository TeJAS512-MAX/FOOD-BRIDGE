import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Cpu,
  Flame,
  HeartHandshake,
  Scale,
  ShieldCheck,
  Sparkles,
  ThermometerSnowflake,
  Truck,
  Users,
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
  const wastedTonnes = dailySurplusTonnes - rescuedTonnes;
  const dailyMealsCreated = rescuedTonnes * 2500; // 400g per meal = 2,500 meals/tonne
  const dailyCo2PreventedTonnes = Math.round(rescuedTonnes * 2.5);

  const bridgeLayers = {
    donors: {
      badge: 'TIER 01 • SURPLUS ORIGINS',
      title: 'Restaurants, Hotels, Banquets & Households',
      subtitle: 'Turn kitchen teardown from a disposal cost into verified social & ESG impact.',
      color: '#F97316',
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
      subtitle: 'Algorithmic routing pairs hot food before temperature drops below 63°C.',
      color: '#10B981',
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
      color: '#059669',
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
        className="relative py-24 lg:py-32 bg-[#0F1E14] text-[#F2EBE1] bg-grain-dark overflow-hidden"
      >
        {/* Ambient Decorative Glows */}
        <div className="pointer-events-none absolute top-12 left-1/4 w-96 h-96 rounded-full bg-[#2A8A56]/12 blur-3xl" />
        <div className="pointer-events-none absolute bottom-8 right-10 w-96 h-96 rounded-full bg-[#E8661F]/10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[rgba(74,173,116,0.2)]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-mono-tech uppercase tracking-widest mb-4">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>01 • THE PROBLEM: THE SCANDAL OF FOOD INSECURITY</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.06] text-white">
                Food waste isn’t a scarcity problem.{' '}
                <span className="italic font-normal text-[#F28240]">
                  It’s a broken distribution problem.
                </span>
              </h2>
            </div>
            <p className="text-base text-[#9E8E7A] max-w-md leading-relaxed">
              Every evening, while wedding banquets and commercial kitchens throw away pristine,
              delicious feasts, thousands of children and families go to sleep on empty stomachs just 3 kilometers away.
            </p>
          </div>

          {/* Interactive Before & After Visual Scrubber */}
          <div className="mt-12">
            <WasteToFeastVisualizer />
          </div>

          {/* 3 Hard Truth Reality Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl bg-[#172B1E]/80 border border-[rgba(74,173,116,0.2)] p-6 sm:p-8 space-y-4 shadow-xl hover:border-[rgba(74,173,116,0.18)] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-red-500/15 text-red-400 flex items-center justify-center">
                <Flame className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="font-serif-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  68.7 M
                </div>
                <div className="font-mono-tech text-xs uppercase tracking-wider text-red-400">
                  Tonnes Wasted in India Yearly
                </div>
              </div>
              <p className="text-sm text-[#9E8E7A] leading-relaxed">
                Enough food to feed the entire hungry population of several nations, ending up in
                anaerobic city landfills emitting potent methane gas.
              </p>
              <div className="pt-3 border-t border-[rgba(74,173,116,0.2)] text-xs font-mono-tech text-[#7A6855]">
                UNEP Food Waste Index 2024 Audit
              </div>
            </div>

            <div className="rounded-3xl bg-[#172B1E]/80 border border-[rgba(74,173,116,0.2)] p-6 sm:p-8 space-y-4 shadow-xl hover:border-[rgba(74,173,116,0.18)] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#E8661F]/15 text-[#F28240] flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="font-serif-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  45 Mins
                </div>
                <div className="font-mono-tech text-xs uppercase tracking-wider text-[#F28240]">
                  The Critical Thermal Window
                </div>
              </div>
              <p className="text-sm text-[#9E8E7A] leading-relaxed">
                Hot prepared banquet food must be collected and dispatched within 45 minutes to maintain
                FSSAI food hygiene compliance before bacteria multiply.
              </p>
              <div className="pt-3 border-t border-[rgba(74,173,116,0.2)] text-xs font-mono-tech text-[#7A6855]">
                FSSAI Safe Food Hygiene Protocol
              </div>
            </div>

            <div className="rounded-3xl bg-[#172B1E]/80 border border-[rgba(74,173,116,0.2)] p-6 sm:p-8 space-y-4 shadow-xl hover:border-[rgba(74,173,116,0.18)] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#2A8A56]/15 text-[#4AAD74] flex items-center justify-center">
                <Scale className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="font-serif-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  800 M+
                </div>
                <div className="font-mono-tech text-xs uppercase tracking-wider text-[#4AAD74]">
                  People Face Food Insecurity
                </div>
              </div>
              <p className="text-sm text-[#9E8E7A] leading-relaxed">
                A problem of civic logistics. When food surplus is mapped to real-time NGO demand,
                hunger can be solved city by city, neighborhood by neighborhood.
              </p>
              <div className="pt-3 border-t border-[rgba(74,173,116,0.2)] text-xs font-mono-tech text-[#7A6855]">
                UN SDG Goal 2 (Zero Hunger) Indicator
              </div>
            </div>
          </div>

          {/* Interactive Simulation Console: "What if your city bridged 65% of its surplus?" */}
          <div className="mt-12 rounded-3xl bg-[#172B1E] border border-[rgba(74,173,116,0.2)] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#4AAD74] font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>INTERACTIVE METRO SIMULATOR: SURPLUS REDIRECTION LEVER</span>
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
                What happens when a city stops discarding hospitality surplus?
              </h3>
              <p className="text-sm text-[#9E8E7A]">
                Use the slider to simulate diverting Bengaluru/Mumbai metro’s daily 120 tonnes of hospitality surplus:
              </p>
            </div>

            {/* Slider Control */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-[#9E8E7A]">SURPLUS REDIRECTION TARGET</span>
                <span className="text-[#4AAD74] font-bold text-base">{redirectionRate}% DIVERTED</span>
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
                className="w-full harvest-slider"
                aria-label="Redirection percentage slider"
              />
              <div className="flex justify-between text-[11px] font-mono-tech text-[#7A6855]">
                <span>10% (Status Quo)</span>
                <span>50% (Civic Goal)</span>
                <span>95% (Zero Waste Horizon)</span>
              </div>
            </div>

            {/* Dynamic Results Grid */}
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-[#0F1E14]/70 border border-[rgba(74,173,116,0.2)] p-4 space-y-1">
                <div className="text-xs font-mono-tech text-[#9E8E7A] uppercase">Daily Meals Bridged</div>
                <div className="text-xl sm:text-2xl font-mono-tech font-bold text-[#4AAD74]">
                  {dailyMealsCreated.toLocaleString()}
                </div>
                <div className="text-[11px] text-[#9E8E7A]">Hot nutritious servings</div>
              </div>

              <div className="rounded-2xl bg-[#0F1E14]/70 border border-[rgba(74,173,116,0.2)] p-4 space-y-1">
                <div className="text-xs font-mono-tech text-[#9E8E7A] uppercase">Food Rescued / Day</div>
                <div className="text-xl sm:text-2xl font-mono-tech font-bold text-white">
                  {rescuedTonnes} Tonnes
                </div>
                <div className="text-[11px] text-[#9E8E7A]">Out of 120T metro surplus</div>
              </div>

              <div className="rounded-2xl bg-[#0F1E14]/70 border border-[rgba(74,173,116,0.2)] p-4 space-y-1">
                <div className="text-xs font-mono-tech text-[#9E8E7A] uppercase">CO₂e Methane Saved</div>
                <div className="text-xl sm:text-2xl font-mono-tech font-bold text-[#F28240]">
                  {dailyCo2PreventedTonnes} Tonnes
                </div>
                <div className="text-[11px] text-[#9E8E7A]">Diverted from city landfills</div>
              </div>

              <div className="rounded-2xl bg-[#0F1E14]/70 border border-[rgba(74,173,116,0.2)] p-4 space-y-1">
                <div className="text-xs font-mono-tech text-[#9E8E7A] uppercase">Shelters Fed Daily</div>
                <div className="text-xl sm:text-2xl font-mono-tech font-bold text-[#DDB259]">
                  {Math.round(dailyMealsCreated / 250)} Shelters
                </div>
                <div className="text-[11px] text-[#9E8E7A]">At 250 plates capacity each</div>
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
        className="relative py-24 lg:py-32 bg-[#FAF6F1] text-[#1A1208] bg-grain overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[rgba(26,18,8,0.1)]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A5C38]/10 border border-emerald-600/20 text-[#1A5C38] text-xs font-mono-tech uppercase tracking-widest mb-4 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>02 • OUR SOLUTION: REAL-TIME CIVIC LOGISTICS MESH</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.06] text-[#1A1208]">
                Bridging surplus to sustenance in{' '}
                <span className="italic font-normal text-[#206B42]">3 simple connected layers.</span>
              </h2>
            </div>
            <p className="text-base text-[#4A3B2A] max-w-md leading-relaxed">
              FoodBridge coordinates every step — from the hotel kitchen tray to thermal van delivery and shelter plate — in under 38 minutes with complete transparency.
            </p>
          </div>

          {/* 3 Interactive Solution Layer Tabs */}
          <div className="mt-12 flex flex-wrap gap-3">
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
                      ? 'bg-[#172B1E] text-white border-slate-900 shadow-lg scale-102 ring-2 ring-emerald-500/20'
                      : 'bg-[#FFFFFF] text-[#4A3B2A] border-[rgba(26,18,8,0.1)] hover:bg-[#F2EBE1] hover:text-[#1A1208]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#4AAD74]' : 'text-[#7A6855]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Solution Layer Active Card */}
          <div className="mt-8 rounded-[36px] bg-[#FFFFFF] border border-[rgba(26,18,8,0.1)]/90 p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 Columns */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2EBE1] text-[#4A3B2A] font-mono-tech text-xs uppercase font-semibold">
                {activeLayerData.badge}
              </div>

              <h3 className="font-serif-display text-2xl sm:text-4xl font-bold text-[#1A1208] leading-tight">
                {activeLayerData.title}
              </h3>

              <p className="text-base text-[#4A3B2A] leading-relaxed">
                {activeLayerData.subtitle}
              </p>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {activeLayerData.stats.map((st, i) => (
                  <div key={i} className="rounded-2xl bg-[#FAF6F1] border border-[rgba(26,18,8,0.1)]/70 p-3.5 space-y-1">
                    <div className="font-mono-tech text-base sm:text-lg font-bold text-[#1A1208]">
                      {st.value}
                    </div>
                    <div className="text-[10px] sm:text-xs font-mono-tech text-[#7A6855] uppercase">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3 pt-2">
                {activeLayerData.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-[#4A3B2A]">
                    <div className="w-5 h-5 rounded-full bg-[#E6F7EC] text-[#206B42] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>{feat}</span>
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
                  className="px-6 py-3.5 rounded-full bg-[#D4521A] hover:bg-[#A83415] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[rgba(212,82,26,0.25)] cursor-pointer transition-all"
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
                    className="px-6 py-3.5 rounded-full bg-[#172B1E] hover:bg-[#1E3828] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer transition-all"
                  >
                    <Truck className="w-4 h-4 text-[#4AAD74]" />
                    <span>View Live Dispatch Radar</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right 5 Columns: Realistic Photo Preview Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-[rgba(26,18,8,0.1)] shadow-lg relative group">
                <img
                  src={activeLayerData.image}
                  alt={activeLayerData.title}
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E14]/80 via-[#0F1E14]/20 to-transparent" />
                <div className="absolute bottom-5 inset-x-5 text-white">
                  <div className="text-xs font-mono-tech uppercase text-[#7DC99A] font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
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
