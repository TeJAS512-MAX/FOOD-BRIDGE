import React, { useState } from 'react';
import {
  Bike,
  Camera,
  CheckCircle2,
  Clock,
  Navigation,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { AI_SCAN_PRESETS, AIScanPreset } from '../data/foodBridgeData';
import { sound } from '../utils/soundEffects';

interface WorkflowAndFeaturesSectionProps {
  onOpenDonateModal: () => void;
  onOpenVolunteerModal: () => void;
  onOpenPledgeModal?: () => void;
}

export const WorkflowAndFeaturesSection: React.FC<WorkflowAndFeaturesSectionProps> = ({
  onOpenDonateModal,
  onOpenVolunteerModal,
  onOpenPledgeModal,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedPreset, setSelectedPreset] = useState<AIScanPreset>(AI_SCAN_PRESETS[0]);
  const [selectedZone, setSelectedZone] = useState<'Indiranagar' | 'Koramangala' | 'Jayanagar'>(
    'Indiranagar'
  );
  const [pledgedHeroCount, setPledgedHeroCount] = useState<number>(1284);
  const [hasPledgedQuick, setHasPledgedQuick] = useState<boolean>(false);

  const steps = [
    {
      stepNumber: '01',
      title: 'Log Surplus in 60 Seconds',
      duration: '00:45s avg',
      summary:
        'Snap a photo of surplus trays or enter weight & food type. Our AI Vision automatically tags portions, allergens, and safe shelf-life.',
      badge: 'DONOR ACTION',
      color: '#EA580C',
      previewTitle: 'AI Surplus Scanner • Kitchen Terminal',
      previewMetrics: [
        { label: 'Detected Batch', value: '42 kg Hot Buffet' },
        { label: 'Est. Portions', value: '168 Full Meals' },
        { label: 'Thermal Window', value: '3h 45m Safe' },
      ],
      previewChecklist: [
        'Temperature verified at 65°C (Hot Holding Safe)',
        'Hygienically sealed in food-grade Gastronorm containers',
        'Good Samaritan liability waiver auto-attached',
      ],
    },
    {
      stepNumber: '02',
      title: 'Smart NGO & Fleet Match',
      duration: '14s AI match',
      summary:
        'Our geospatial engine pairs your batch with the closest verified NGO shelter needing that exact meal count and dispatches a thermal runner.',
      badge: 'AI BRIDGE DISPATCH',
      color: '#059669',
      previewTitle: 'Geospatial Mesh • 3.2 km Radius Scan',
      previewMetrics: [
        { label: 'Matched NGO', value: 'Annapurna Seva' },
        { label: 'Distance', value: '2.1 km (8 mins)' },
        { label: 'Assigned Fleet', value: 'EV Van #FB-19' },
      ],
      previewChecklist: [
        'Shelter dinner capacity verified: 200 hungry guests waiting',
        'Dietary match confirmed: 100% Vegetarian / Nut-Free',
        'Hunger Hero Captain Rohan D. dispatched with thermal crate',
      ],
    },
    {
      stepNumber: '03',
      title: 'Rapid Pickup & Verified Impact',
      duration: '38m door-to-plate',
      summary:
        'Contactless QR handoff at your loading bay. Track the batch live until hot meals are served, and receive an instant ESG & Carbon certificate.',
      badge: 'VERIFIED SUSTENANCE',
      color: '#0284C7',
      previewTitle: 'Chain-of-Custody & ESG Impact Ledger',
      previewMetrics: [
        { label: 'Meals Served', value: '168 Verified' },
        { label: 'CO₂e Prevented', value: '105.0 kg CO₂e' },
        { label: 'Water Saved', value: '134,400 Liters' },
      ],
      previewChecklist: [
        'QR Code scanned by NGO Supervisor Meera K. at 21:18 hrs',
        'Arrival temperature logged at 62.8°C (Pass)',
        'Downloadable CSR / Tax Certificate #FB-2026-8841 issued',
      ],
    },
  ];

  const zoneData = {
    Indiranagar: {
      activeFridges: 4,
      dailyMeals: 480,
      verifiedShelters: 12,
      openVolunteers: 28,
    },
    Koramangala: {
      activeFridges: 6,
      dailyMeals: 720,
      verifiedShelters: 18,
      openVolunteers: 36,
    },
    Jayanagar: {
      activeFridges: 3,
      dailyMeals: 390,
      verifiedShelters: 9,
      openVolunteers: 21,
    },
  };

  const handleHeroPledge = () => {
    if (!hasPledgedQuick) {
      sound.success();
      setPledgedHeroCount((prev) => prev + 1);
      setHasPledgedQuick(true);
    }
  };

  return (
    <>
      {/* =====================================================================
          SECTION 4: HOW IT WORKS (3 SIMPLE STEPS)
      ===================================================================== */}
      <section
        id="how-it-works"
        className="relative py-20 lg:py-28 text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/[0.14]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono-tech uppercase tracking-wider mb-4 font-semibold">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>03 • HOW IT WORKS: ZERO TO DELIVERED IN 38 MINUTES</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-white">
                How FoodBridge transforms kitchen surplus into{' '}
                <span className="italic font-normal text-emerald-400">community meals.</span>
              </h2>
            </div>
            <p className="text-base text-white/70 max-w-md leading-relaxed">
              Designed for busy head chefs, banquet managers, and volunteer drivers.
              Zero paperwork, instant AI validation, and complete real-time tracking.
            </p>
          </div>

          {/* 3 Step Interactive Workflow Cards */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {steps.map((st, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={st.stepNumber}
                  onClick={() => {
                    sound.click();
                    setActiveStep(idx);
                  }}
                  className={`rounded-3xl p-6 sm:p-8 cursor-pointer transition-all border ${
                    isActive
                      ? 'bg-emerald-500/150/20 backdrop-blur-xl border-emerald-400 shadow-lg scale-102 ring-2 ring-emerald-500/20'
                      : 'bg-white/[0.07] backdrop-blur-xl border-white/[0.14]/90 hover:border-emerald-500/40 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between pb-6 border-b border-white/[0.14]">
                    <span className="font-mono-tech text-3xl font-bold text-white">
                      {st.stepNumber}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white text-emerald-400 font-mono-tech text-xs uppercase font-bold border border-emerald-500/30 shadow-sm">
                      {st.duration}
                    </span>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="text-xs font-mono-tech uppercase text-orange-400 font-bold">
                      {st.badge}
                    </div>
                    <h3 className="font-serif-display text-2xl font-bold text-white">
                      {st.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {st.summary}
                    </p>
                  </div>

                  {/* Checklist */}
                  <div className="mt-6 pt-6 border-t border-white/[0.14] space-y-2">
                    {st.previewChecklist.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-white/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step Detail Spotlight Console */}
          <div className="mt-10 glass-card p-6 sm:p-10 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.14]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold font-mono-tech text-base">
                  {steps[activeStep].stepNumber}
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">
                    {steps[activeStep].previewTitle}
                  </h4>
                  <p className="text-xs text-white/60">
                    Step {activeStep + 1} of 3 in the FoodBridge Real-Time Pipeline
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.click();
                  onOpenDonateModal();
                }}
                className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-600/20"
              >
                <span>Launch This Step Now</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Metrics Triad for Active Step */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {steps[activeStep].previewMetrics.map((met, i) => (
                <div key={i} className="rounded-2xl bg-white/[0.05] border border-white/[0.14] p-4 space-y-1">
                  <div className="text-xs font-mono-tech text-white/60 uppercase font-semibold">{met.label}</div>
                  <div className="text-xl font-mono-tech font-bold text-white">{met.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: KEY FEATURES (BENTO GRID WITH REAL FOOD & AI SCANNER)
      ===================================================================== */}
      <section
        id="features"
        className="relative py-20 lg:py-28 text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/[0.14]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 text-xs font-mono-tech uppercase tracking-wider mb-4 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>04 • KEY CAPABILITIES: ENGINEERED FOR SPEED & DIGNITY</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-white">
                Four pillars powering the{' '}
                <span className="italic font-normal text-emerald-400">Zero-Waste Mesh.</span>
              </h2>
            </div>
            <p className="text-base text-white/70 max-w-md leading-relaxed">
              From camera-based AI portion recognition to cold-chain EV fleet coordination and community-driven neighborhood fridges.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Feature 1 (7 Cols): Interactive AI Food Tray Scanner with Real Food Photo */}
            <div className="lg:col-span-7 glass-card p-6 sm:p-8 shadow-lg flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 font-mono-tech text-xs uppercase font-semibold">
                    <Camera className="w-3.5 h-3.5 text-orange-400" />
                    <span>FEATURE 01 • AI VISION FOOD SCANNER</span>
                  </div>
                  <span className="text-xs font-mono-tech text-emerald-400 font-bold bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    {selectedPreset.safetyConfidence}% AUDIT CONFIDENCE
                  </span>
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
                  Snap a photo. AI estimates weight, portions & safe shelf-life in seconds.
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Trained on 40,000+ catering tray images, our vision model recognizes dish types,
                  estimates mass via volumetric depth, and tags allergens.
                </p>
              </div>

              {/* Preset Selector Buttons */}
              <div className="flex flex-wrap gap-2">
                {AI_SCAN_PRESETS.map((pr) => (
                  <button
                    key={pr.id}
                    type="button"
                    onClick={() => {
                      sound.click();
                      setSelectedPreset(pr);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                      selectedPreset.id === pr.id
                        ? 'bg-black/60 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-white/80 border-white/[0.14] hover:bg-white/[0.08]'
                    }`}
                  >
                    {pr.title.split(' ')[0]} {pr.title.split(' ')[1]}
                  </button>
                ))}
              </div>

              {/* Realistic Scanner Viewport with Real Image & Bounding Boxes */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/[0.14] shadow-inner group">
                <img
                  src={selectedPreset.imageUrl}
                  alt={selectedPreset.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                {/* AI HUD Bounding Box Overlay */}
                <div className="absolute inset-6 border-2 border-dashed border-emerald-400 rounded-xl pointer-events-none flex flex-col justify-between p-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-black/60/90 text-emerald-400 text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded-md border border-emerald-500/30">
                      AI DETECTED • {selectedPreset.tempChain}
                    </span>
                    <span className="bg-black/60/90 text-white text-[10px] font-mono-tech px-2 py-0.5 rounded-md border border-slate-700">
                      VOLUMETRIC: {selectedPreset.weightKg} KG
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-white text-xs font-mono-tech">
                    <span className="bg-black/60/90 px-2 py-1 rounded-md border border-slate-700">
                      {selectedPreset.source}
                    </span>
                    <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold px-2.5 py-1 rounded-md shadow">
                      {selectedPreset.estimatedMeals} MEALS
                    </span>
                  </div>
                </div>
              </div>

              {/* Detected Items breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                {selectedPreset.itemsDetected.map((it, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.05] border border-white/[0.14] space-y-0.5">
                    <div className="font-semibold text-white truncate">{it.name}</div>
                    <div className="font-mono-tech text-white/60 text-[11px]">{it.weight} • {it.allergen}</div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.click();
                  onOpenDonateModal();
                }}
                className="w-full py-3.5 rounded-full bg-black/60 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
              >
                <span>Dispatch This {selectedPreset.weightKg} kg Preset</span>
                <Navigation className="w-4 h-4 text-emerald-400" />
              </button>
            </div>

            {/* Feature 2 (5 Cols): NGO Partnerships & Direct Capacity Sync */}
            <div className="lg:col-span-5 glass-card p-6 sm:p-8 shadow-lg flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono-tech text-xs uppercase font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>FEATURE 02 • VERIFIED NGO PARTNERSHIPS</span>
                </div>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
                  Pre-verified shelters with real-time dining capacity sync.
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Every partner NGO undergoes physical kitchen hygiene audits and 80G tax registration verification.
                </p>
              </div>

              {/* NGO Card Preview */}
              <div className="rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-5 space-y-3 shadow-md">
                <div className="flex items-center justify-between border-b border-emerald-700/60 pb-3">
                  <div>
                    <div className="text-xs font-mono-tech text-emerald-300 uppercase font-semibold">
                      VERIFIED RECIPIENT
                    </div>
                    <div className="font-serif-display text-lg font-bold text-white">
                      Annapurna Seva Kitchen
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-700 border border-emerald-500/50 flex items-center justify-center text-emerald-200 font-bold">
                    AS
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono-tech text-white/30">
                  <div>
                    <span className="text-[10px] text-emerald-200/80 block">CURRENT DINER DEMAND</span>
                    <span className="text-white font-bold">200 Meals / Night</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-200/80 block">COLD REFRIGERATION</span>
                    <span className="text-emerald-300 font-bold">120 kg Capacity OK</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-white/70 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Free delivery to all shelter partners</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Digital QR manifest verified at delivery</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.click();
                  onOpenVolunteerModal();
                }}
                className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-md shadow-emerald-600/20"
              >
                Register Your NGO Sanctuary
              </button>
            </div>

            {/* Feature 3 (5 Cols): Sub-38m Pickup & EV Fleet Coordination */}
            <div className="lg:col-span-5 glass-card p-6 sm:p-8 shadow-lg flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono-tech text-xs uppercase font-semibold">
                  <Bike className="w-3.5 h-3.5 text-cyan-400" />
                  <span>FEATURE 03 • GREEN EV FLEET & PICKUP</span>
                </div>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
                  Zero-emission EV vans and cyclists with dual thermal crates.
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Our dispatch algorithm batches nearby pickups into optimized urban corridors,
                  keeping hot food above 63°C and salads crisp below 5°C.
                </p>
              </div>

              {/* Fleet status card */}
              <div className="rounded-2xl bg-white/[0.05] border border-white/[0.14] p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono-tech">
                  <span className="text-white/60 uppercase font-semibold">ACTIVE GREEN FLEET</span>
                  <span className="text-emerald-400 font-bold">14 RIDERS EN ROUTE</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-white/[0.07] border border-white/[0.14]">
                    <div className="font-mono-tech font-bold text-white">38m</div>
                    <div className="text-[10px] text-white/60">Avg Speed</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.07] border border-white/[0.14]">
                    <div className="font-mono-tech font-bold text-emerald-400">0.0g</div>
                    <div className="text-[10px] text-white/60">Fleet CO₂</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.07] border border-white/[0.14]">
                    <div className="font-mono-tech font-bold text-orange-400">99.4%</div>
                    <div className="text-[10px] text-white/60">Thermal Pass</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-white/70 font-semibold">
                  {pledgedHeroCount.toLocaleString()} Civic Heroes Pledged
                </span>
                <button
                  type="button"
                  onClick={handleHeroPledge}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    hasPledgedQuick
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-black/60 text-white hover:bg-slate-800'
                  }`}
                >
                  {hasPledgedQuick ? '✓ Pledged Hero!' : '+ Pledge as Volunteer'}
                </button>
              </div>
            </div>

            {/* Feature 4 (7 Cols): Community Participation & 24/7 Smart Fridges */}
            <div className="lg:col-span-7 glass-card p-6 sm:p-8 shadow-lg flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono-tech text-xs uppercase font-semibold">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span>FEATURE 04 • COMMUNITY PARTICIPATION & FRIDGES</span>
                  </div>
                  {/* Zone switcher */}
                  <div className="flex gap-1">
                    {(['Indiranagar', 'Koramangala', 'Jayanagar'] as const).map((z) => (
                      <button
                        key={z}
                        type="button"
                        onClick={() => {
                          sound.click();
                          setSelectedZone(z);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono-tech transition-all cursor-pointer ${
                          selectedZone === z
                            ? 'bg-black/60 text-white font-bold'
                            : 'bg-white/[0.08] text-white/80 hover:bg-white/[0.12]'
                        }`}
                      >
                        {z}
                      </button>
                    ))}
                  </div>
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
                  24/7 Smart Neighborhood Community Fridges for household surplus.
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Apartments and households can donate surplus packaged meals to community fridges monitored by local volunteer ward captains.
                </p>
              </div>

              {/* Dynamic Zone Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/[0.14] text-center">
                  <div className="font-mono-tech text-xl font-bold text-emerald-400">
                    {zoneData[selectedZone].activeFridges}
                  </div>
                  <div className="text-[10px] font-mono-tech text-white/60 uppercase mt-0.5">
                    Smart Fridges
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/[0.14] text-center">
                  <div className="font-mono-tech text-xl font-bold text-white">
                    {zoneData[selectedZone].dailyMeals}
                  </div>
                  <div className="text-[10px] font-mono-tech text-white/60 uppercase mt-0.5">
                    Meals / Day
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/[0.14] text-center">
                  <div className="font-mono-tech text-xl font-bold text-orange-400">
                    {zoneData[selectedZone].verifiedShelters}
                  </div>
                  <div className="text-[10px] font-mono-tech text-white/60 uppercase mt-0.5">
                    Nearby Shelters
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/[0.14] text-center">
                  <div className="font-mono-tech text-xl font-bold text-cyan-400">
                    {zoneData[selectedZone].openVolunteers}
                  </div>
                  <div className="text-[10px] font-mono-tech text-white/60 uppercase mt-0.5">
                    Ward Captains
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-xs text-white/70 font-medium">
                  Want to sponsor or adopt a Community Fridge in {selectedZone}?
                </span>
                {onOpenPledgeModal && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.click();
                      onOpenPledgeModal();
                    }}
                    className="px-5 py-2.5 rounded-full bg-white hover:bg-white/[0.05] border border-white/[0.20] text-white/90 text-xs font-semibold transition-all cursor-pointer shadow-sm"
                  >
                    Adopt a Fridge Ward
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
