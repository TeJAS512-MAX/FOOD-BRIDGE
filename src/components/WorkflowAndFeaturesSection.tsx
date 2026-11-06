import React, { useState } from 'react';
import {
  Bike,
  Building,
  Camera,
  CheckCircle2,
  Clock,
  Cpu,
  Heart,
  Navigation,
  QrCode,
  ShieldCheck,
  Sparkles,
  Thermometer,
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
      color: '#F97316',
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
      color: '#10B981',
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
      color: '#059669',
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
        className="relative py-24 lg:py-32 bg-[#172B1E] text-[#F2EBE1] bg-grain-dark overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[rgba(74,173,116,0.2)]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A8A56]/15 border border-emerald-500/30 text-[#4AAD74] text-xs font-mono-tech uppercase tracking-widest mb-4">
                <Clock className="w-3.5 h-3.5" />
                <span>03 • HOW IT WORKS: ZERO TO DELIVERED IN 38 MINUTES</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.06] text-white">
                How FoodBridge transforms kitchen surplus into{' '}
                <span className="italic font-normal text-[#4AAD74]">community meals.</span>
              </h2>
            </div>
            <p className="text-base text-[#9E8E7A] max-w-md leading-relaxed">
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
                      ? 'bg-[#1E3828]/90 border-emerald-500 shadow-2xl scale-102 ring-2 ring-emerald-500/20'
                      : 'bg-[#172B1E]/60 border-[rgba(74,173,116,0.2)] hover:border-[rgba(74,173,116,0.18)] hover:bg-[#1E3828]/40'
                  }`}
                >
                  <div className="flex items-center justify-between pb-6 border-b border-[rgba(74,173,116,0.2)]">
                    <span className="font-mono-tech text-3xl font-bold text-white">
                      {st.stepNumber}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#0F1E14] text-[#4AAD74] font-mono-tech text-xs uppercase font-semibold border border-[rgba(74,173,116,0.2)]">
                      {st.duration}
                    </span>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="text-xs font-mono-tech uppercase text-[#F28240] font-semibold">
                      {st.badge}
                    </div>
                    <h3 className="font-serif-display text-2xl font-bold text-white">
                      {st.title}
                    </h3>
                    <p className="text-sm text-[#9E8E7A] leading-relaxed">
                      {st.summary}
                    </p>
                  </div>

                  {/* Checklist */}
                  <div className="mt-6 pt-6 border-t border-[rgba(74,173,116,0.2)]/80 space-y-2">
                    {st.previewChecklist.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#C4B9AC]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4AAD74] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step Detail Spotlight Console */}
          <div className="mt-12 rounded-[36px] bg-[#0F1E14] border border-[rgba(74,173,116,0.2)] p-6 sm:p-10 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(74,173,116,0.2)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#2A8A56]/15 text-[#4AAD74] flex items-center justify-center font-bold">
                  {steps[activeStep].stepNumber}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">
                    {steps[activeStep].previewTitle}
                  </h4>
                  <p className="text-xs text-[#9E8E7A]">
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
                className="px-5 py-2.5 rounded-full bg-[#1A5C38] hover:bg-[#2A8A56] text-white font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Launch This Step Now</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Metrics Triad for Active Step */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {steps[activeStep].previewMetrics.map((met, i) => (
                <div key={i} className="rounded-2xl bg-[#172B1E] border border-[rgba(74,173,116,0.2)] p-4 space-y-1">
                  <div className="text-xs font-mono-tech text-[#9E8E7A] uppercase">{met.label}</div>
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
        className="relative py-24 lg:py-32 bg-[#FAF6F1] text-[#1A1208] bg-grain overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[rgba(26,18,8,0.1)]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8661F]/10 border border-orange-500/20 text-[#A83415] text-xs font-mono-tech uppercase tracking-widest mb-4 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>04 • KEY CAPABILITIES: ENGINEERED FOR SPEED & DIGNITY</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.06] text-[#1A1208]">
                Four pillars powering the{' '}
                <span className="italic font-normal text-[#206B42]">Zero-Waste Mesh.</span>
              </h2>
            </div>
            <p className="text-base text-[#4A3B2A] max-w-md leading-relaxed">
              From camera-based AI portion recognition to cold-chain EV fleet coordination and community-driven neighborhood fridges.
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Feature 1 (7 Cols): Interactive AI Food Tray Scanner with Real Food Photo */}
            <div className="lg:col-span-7 rounded-[36px] bg-[#FFFFFF] border border-[rgba(26,18,8,0.1)] p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF0E6] text-orange-800 font-mono-tech text-xs uppercase font-semibold">
                    <Camera className="w-3.5 h-3.5 text-[#D4521A]" />
                    <span>FEATURE 01 • AI VISION FOOD SCANNER</span>
                  </div>
                  <span className="text-xs font-mono-tech text-[#1A5C38] font-semibold">
                    {selectedPreset.safetyConfidence}% AUDIT CONFIDENCE
                  </span>
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1A1208]">
                  Snap a photo. AI estimates weight, portions & safe shelf-life in seconds.
                </h3>
                <p className="text-sm text-[#4A3B2A] leading-relaxed">
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
                        ? 'bg-[#172B1E] text-white border-slate-900 shadow-md scale-102'
                        : 'bg-[#F2EBE1] text-[#4A3B2A] border-[rgba(26,18,8,0.1)] hover:bg-slate-200'
                    }`}
                  >
                    {pr.title.split(' ')[0]} {pr.title.split(' ')[1]}
                  </button>
                ))}
              </div>

              {/* Realistic Scanner Viewport with Real Image & Bounding Boxes */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-[rgba(26,18,8,0.1)] shadow-inner group">
                <img
                  src={selectedPreset.imageUrl}
                  alt={selectedPreset.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E14]/80 via-[#0F1E14]/25 to-transparent" />

                {/* AI HUD Bounding Box Overlay */}
                <div className="absolute inset-6 border-2 border-dashed border-emerald-400/80 rounded-xl pointer-events-none flex flex-col justify-between p-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#1A5C38] text-white text-[10px] font-mono-tech font-bold px-2 py-0.5 rounded-md">
                      AI DETECTED • {selectedPreset.tempChain}
                    </span>
                    <span className="bg-[#172B1E]/80 backdrop-blur-md text-[#7DC99A] text-[10px] font-mono-tech px-2 py-0.5 rounded-md">
                      VOLUMETRIC: {selectedPreset.weightKg} KG
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-white text-xs font-mono-tech">
                    <span className="bg-[#172B1E]/80 backdrop-blur-md px-2 py-1 rounded-md">
                      {selectedPreset.source}
                    </span>
                    <span className="bg-[#D4521A] text-white font-bold px-2.5 py-1 rounded-md">
                      {selectedPreset.estimatedMeals} MEALS
                    </span>
                  </div>
                </div>
              </div>

              {/* Detected Items breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                {selectedPreset.itemsDetected.map((it, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#FAF6F1] border border-[rgba(26,18,8,0.1)]/80 space-y-0.5">
                    <div className="font-semibold text-[#1A1208] truncate">{it.name}</div>
                    <div className="font-mono-tech text-[#7A6855] text-[11px]">{it.weight} • {it.allergen}</div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.click();
                  onOpenDonateModal();
                }}
                className="w-full py-3.5 rounded-full bg-[#172B1E] hover:bg-[#1E3828] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
              >
                <span>Dispatch This {selectedPreset.weightKg} kg Preset</span>
                <Navigation className="w-4 h-4 text-[#4AAD74]" />
              </button>
            </div>

            {/* Feature 2 (5 Cols): NGO Partnerships & Direct Capacity Sync */}
            <div className="lg:col-span-5 rounded-[36px] bg-[#FFFFFF] border border-[rgba(26,18,8,0.1)] p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7EC] text-emerald-800 font-mono-tech text-xs uppercase font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#206B42]" />
                  <span>FEATURE 02 • VERIFIED NGO PARTNERSHIPS</span>
                </div>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1A1208]">
                  Pre-verified shelters with real-time dining capacity sync.
                </h3>
                <p className="text-sm text-[#4A3B2A] leading-relaxed">
                  Every partner NGO undergoes physical kitchen hygiene audits and 80G tax registration verification.
                </p>
              </div>

              {/* NGO Card Preview */}
              <div className="rounded-2xl bg-gradient-to-br from-emerald-900 to-[#0F1E14] text-white p-5 space-y-3 shadow-lg">
                <div className="flex items-center justify-between border-b border-[rgba(26,92,56,0.25)]/60 pb-3">
                  <div>
                    <div className="text-xs font-mono-tech text-[#4AAD74] uppercase font-semibold">
                      VERIFIED RECIPIENT
                    </div>
                    <div className="font-serif-display text-lg font-bold text-white">
                      Annapurna Seva Kitchen
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#2A8A56]/20 border border-emerald-400/40 flex items-center justify-center text-[#7DC99A] font-bold">
                    AS
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono-tech text-[#C4B9AC]">
                  <div>
                    <span className="text-[10px] text-[#9E8E7A] block">CURRENT DINER DEMAND</span>
                    <span className="text-white font-bold">200 Meals / Night</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#9E8E7A] block">COLD REFRIGERATION</span>
                    <span className="text-[#4AAD74] font-bold">120 kg Capacity OK</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#4A3B2A]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#206B42] shrink-0" />
                  <span>100% Free delivery to all shelter partners</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#206B42] shrink-0" />
                  <span>Digital QR manifest verified at delivery</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.click();
                  onOpenVolunteerModal();
                }}
                className="w-full py-3.5 rounded-full bg-[#1A5C38] hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer shadow-md"
              >
                Register Your NGO Sanctuary
              </button>
            </div>

            {/* Feature 3 (5 Cols): Sub-38m Pickup & EV Fleet Coordination */}
            <div className="lg:col-span-5 rounded-[36px] bg-[#FFFFFF] border border-[rgba(26,18,8,0.1)] p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 font-mono-tech text-xs uppercase font-semibold">
                  <Bike className="w-3.5 h-3.5 text-sky-600" />
                  <span>FEATURE 03 • GREEN EV FLEET & PICKUP</span>
                </div>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1A1208]">
                  Zero-emission EV vans and cyclists with dual thermal crates.
                </h3>
                <p className="text-sm text-[#4A3B2A] leading-relaxed">
                  Our dispatch algorithm batches nearby pickups into optimized urban corridors,
                  keeping hot food above 63°C and salads crisp below 5°C.
                </p>
              </div>

              {/* Fleet status card */}
              <div className="rounded-2xl bg-[#FAF6F1] border border-[rgba(26,18,8,0.1)] p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono-tech">
                  <span className="text-[#7A6855] uppercase">ACTIVE GREEN FLEET</span>
                  <span className="text-[#206B42] font-bold">14 RIDERS EN ROUTE</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-[#FFFFFF] border border-[rgba(26,18,8,0.1)]">
                    <div className="font-mono-tech font-bold text-[#1A1208]">38m</div>
                    <div className="text-[10px] text-[#7A6855]">Avg Speed</div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FFFFFF] border border-[rgba(26,18,8,0.1)]">
                    <div className="font-mono-tech font-bold text-[#206B42]">0.0g</div>
                    <div className="text-[10px] text-[#7A6855]">Fleet CO₂</div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FFFFFF] border border-[rgba(26,18,8,0.1)]">
                    <div className="font-mono-tech font-bold text-[#D4521A]">99.4%</div>
                    <div className="text-[10px] text-[#7A6855]">Thermal Pass</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#4A3B2A] font-medium">
                  {pledgedHeroCount.toLocaleString()} Civic Heroes Pledged
                </span>
                <button
                  type="button"
                  onClick={handleHeroPledge}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    hasPledgedQuick
                      ? 'bg-[#E6F7EC] text-[#1A5C38]'
                      : 'bg-[#172B1E] text-white hover:bg-[#1E3828]'
                  }`}
                >
                  {hasPledgedQuick ? '✓ Pledged Hero!' : '+ Pledge as Volunteer'}
                </button>
              </div>
            </div>

            {/* Feature 4 (7 Cols): Community Participation & 24/7 Smart Fridges */}
            <div className="lg:col-span-7 rounded-[36px] bg-[#FFFFFF] border border-[rgba(26,18,8,0.1)] p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F7EC] text-emerald-800 font-mono-tech text-xs uppercase font-semibold">
                    <Users className="w-3.5 h-3.5 text-[#206B42]" />
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
                            ? 'bg-[#172B1E] text-white font-bold'
                            : 'bg-[#F2EBE1] text-[#4A3B2A] hover:bg-slate-200'
                        }`}
                      >
                        {z}
                      </button>
                    ))}
                  </div>
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1A1208]">
                  24/7 Smart Neighborhood Community Fridges for household surplus.
                </h3>
                <p className="text-sm text-[#4A3B2A] leading-relaxed">
                  Apartments and households can donate surplus packaged meals to community fridges monitored by local volunteer ward captains.
                </p>
              </div>

              {/* Dynamic Zone Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#FAF6F1] border border-[rgba(26,18,8,0.1)] text-center">
                  <div className="font-mono-tech text-xl font-bold text-[#206B42]">
                    {zoneData[selectedZone].activeFridges}
                  </div>
                  <div className="text-[10px] font-mono-tech text-[#7A6855] uppercase mt-0.5">
                    Smart Fridges
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF6F1] border border-[rgba(26,18,8,0.1)] text-center">
                  <div className="font-mono-tech text-xl font-bold text-[#1A1208]">
                    {zoneData[selectedZone].dailyMeals}
                  </div>
                  <div className="text-[10px] font-mono-tech text-[#7A6855] uppercase mt-0.5">
                    Meals / Day
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF6F1] border border-[rgba(26,18,8,0.1)] text-center">
                  <div className="font-mono-tech text-xl font-bold text-[#D4521A]">
                    {zoneData[selectedZone].verifiedShelters}
                  </div>
                  <div className="text-[10px] font-mono-tech text-[#7A6855] uppercase mt-0.5">
                    Nearby Shelters
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF6F1] border border-[rgba(26,18,8,0.1)] text-center">
                  <div className="font-mono-tech text-xl font-bold text-sky-600">
                    {zoneData[selectedZone].openVolunteers}
                  </div>
                  <div className="text-[10px] font-mono-tech text-[#7A6855] uppercase mt-0.5">
                    Ward Captains
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-xs text-[#4A3B2A]">
                  Want to sponsor or adopt a Community Fridge in {selectedZone}?
                </span>
                {onOpenPledgeModal && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.click();
                      onOpenPledgeModal();
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#172B1E] hover:bg-[#1E3828] text-white text-xs font-semibold transition-all cursor-pointer shadow-sm"
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
