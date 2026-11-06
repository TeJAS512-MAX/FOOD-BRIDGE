import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  Bike,
  Building2,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  Mic,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Volume2,
} from 'lucide-react';
import { COMMUNITY_STORIES, CommunityStory } from '../data/foodBridgeData';
import { sound } from '../utils/soundEffects';

interface StoriesAndCtaSectionProps {
  onOpenDonateModal: () => void;
  onOpenPledgeModal?: () => void;
}

export const StoriesAndCtaSection: React.FC<StoriesAndCtaSectionProps> = ({
  onOpenDonateModal,
  onOpenPledgeModal,
}) => {
  const [selectedStory, setSelectedStory] = useState<CommunityStory>(COMMUNITY_STORIES[0]);
  const [activeCtaTab, setActiveCtaTab] = useState<'donate' | 'ngo' | 'volunteer'>('donate');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Interactive quick-submission state inside CTA Studio
  const [orgName, setOrgName] = useState<string>('');
  const [locationInput, setLocationInput] = useState<string>('Indiranagar, Bengaluru');
  const [quantityOrCapacity, setQuantityOrCapacity] = useState<string>('35 kg Hot Buffet Meals');
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    id: string;
    role: string;
    name: string;
    detail: string;
  } | null>(null);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.success();
    const cleanName =
      orgName.trim() ||
      (activeCtaTab === 'donate'
        ? 'Sunrise Bistro & Banquets'
        : activeCtaTab === 'ngo'
        ? 'Karuna Community Shelter'
        : 'Aarav Sharma (EV Volunteer)');

    setSubmittedReceipt({
      id: `FB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      role:
        activeCtaTab === 'donate'
          ? 'SURPLUS FOOD DISPATCH'
          : activeCtaTab === 'ngo'
          ? 'NGO SHELTER ONBOARDING'
          : 'HUNGER HERO FLEET PASS',
      name: cleanName,
      detail: `${quantityOrCapacity} • ${locationInput}`,
    });
  };

  const toggleAudioSim = () => {
    sound.click();
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <>
      {/* =====================================================================
          SECTION 7: COMMUNITY STORIES ("VOICES FROM THE BRIDGE")
      ===================================================================== */}
      <section
        id="stories"
        className="relative py-24 lg:py-32 text-[#F2EBE1] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-white/10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F7EC] border border-[rgba(26,92,56,0.2)] text-emerald-800 text-xs font-mono-tech uppercase tracking-widest mb-4 font-semibold">
                <Quote className="w-3.5 h-3.5 text-[#206B42]" />
                <span>06 • COMMUNITY VOICES: HUMAN DIGNITY AT EVERY TABLE</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.06] text-white">
                Stories from the chefs, shelters, and riders{' '}
                <span className="italic font-normal text-[#206B42]">bridging the gap.</span>
              </h2>
            </div>

            {/* Role Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {COMMUNITY_STORIES.map((story) => (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => {
                    sound.click();
                    setSelectedStory(story);
                    setIsPlayingAudio(false);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                    selectedStory.id === story.id
                      ? 'frosted-card text-white border-slate-900 shadow-md scale-102 ring-2 ring-emerald-500/20'
                      : 'frosted-card text-slate-300 border-white/10 hover:frosted-subcard hover:text-white'
                  }`}
                >
                  {story.role}
                </button>
              ))}
            </div>
          </div>

          {/* Active Story Spotlight Card with Real Persona Image */}
          <div className="mt-12 rounded-[36px] frosted-card border border-white/10/90 p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 5 Cols: Persona Visual & Audio Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl overflow-hidden border border-white/10 shadow-lg relative group">
                <img
                  src={selectedStory.imageUrl}
                  alt={selectedStory.name}
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E14]/80 via-[#0F1E14]/20 to-transparent" />

                <div className="absolute bottom-5 inset-x-5 text-white">
                  <div className="text-xs font-mono-tech text-[#7DC99A] font-semibold">
                    {selectedStory.role.toUpperCase()} • {selectedStory.location}
                  </div>
                  <h4 className="font-serif-display text-2xl font-bold text-white mt-1">
                    {selectedStory.name}
                  </h4>
                  <p className="text-xs text-[#C4B9AC]">{selectedStory.title}, {selectedStory.organization}</p>
                </div>
              </div>

              {/* Simulated Audio Note Player */}
              <div className="rounded-2xl bg-[#FAF6F1] border border-white/10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleAudioSim}
                    className="w-10 h-10 rounded-full frosted-card hover:bg-[#1A5C38] text-white flex items-center justify-center cursor-pointer transition-all shadow-md"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </button>
                  <div>
                    <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-[#206B42]" />
                      <span>{selectedStory.name.split(' ')[0]}’s Audio Memo</span>
                    </div>
                    <div className="text-[10px] font-mono-tech text-[#7A6855]">
                      {isPlayingAudio ? 'Playing 0:18 / ' : 'Recorded Audio Note • '}
                      {selectedStory.audioDuration || '0:45'}
                    </div>
                  </div>
                </div>

                {/* Animated sound wave bars */}
                <div className="flex items-center gap-1">
                  {[12, 24, 16, 28, 14, 20].map((h, i) => (
                    <span
                      key={i}
                      className={`w-1 rounded-full bg-[#2A8A56] ${
                        isPlayingAudio ? 'animate-pulse' : 'opacity-40'
                      }`}
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Narrative & Impact Metrics */}
            <div className="lg:col-span-7 space-y-6">
              <Quote className="w-10 h-10 text-[#206B42]/40" />

              <blockquote className="font-serif-display text-xl sm:text-2xl text-white italic leading-relaxed">
                “{selectedStory.quote}”
              </blockquote>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {selectedStory.storyDetail}
              </p>

              {/* Story Metrics Banner */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF6F1] border border-white/10 space-y-1">
                  <div className="font-mono-tech text-xs text-[#7A6855] uppercase">
                    {selectedStory.metricLabel}
                  </div>
                  <div className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
                    {selectedStory.metricValue}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF6F1] border border-white/10 space-y-1">
                  <div className="font-mono-tech text-xs text-[#7A6855] uppercase">
                    ECOLOGICAL DIVERT
                  </div>
                  <div className="font-serif-display text-2xl sm:text-3xl font-bold text-[#206B42]">
                    {selectedStory.secondaryMetric}
                  </div>
                </div>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {selectedStory.tags.map((tg, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full frosted-subcard text-xs font-mono-tech text-slate-300"
                  >
                    #{tg}
                  </span>
                ))}
                <span className="px-3 py-1 rounded-full bg-[#F3FCF6] text-[#1A5C38] font-mono-tech text-xs border border-[rgba(26,92,56,0.2)]">
                  ID: {selectedStory.verifiedBatchId}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: CALL TO ACTION STUDIO ("JOIN THE BRIDGE")
      ===================================================================== */}
      <section
        id="cta"
        className="relative py-24 lg:py-32 text-[#F2EBE1] relative overflow-hidden"
      >
        {/* Glows */}
        <div className="pointer-events-none absolute top-10 left-10 w-96 h-96 rounded-full bg-[#2A8A56]/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#E8661F]/15 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 6 Columns */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8661F]/15 border border-orange-500/30 text-[#F28240] text-xs font-mono-tech uppercase tracking-widest font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>07 • TAKE ACTION TODAY • BE THE BRIDGE</span>
              </div>

              <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.06] text-white">
                Every minute counts when{' '}
                <span className="italic font-normal text-[#4AAD74]">fresh food</span> is on the line.
              </h2>

              <p className="text-base text-[#9E8E7A] leading-relaxed max-w-xl">
                Whether you run a 5-star hotel banquet, direct a community shelter, or ride an electric scooter in your free time — there is a role for you on the FoodBridge grid.
              </p>

              {/* Three Value Pillars */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    title: '100% Good Samaritan Shield',
                    desc: 'Legally protected food donation under Indian law with automatic FSSAI compliance verification.',
                  },
                  {
                    title: 'Instant 80G Tax Exemption Receipts',
                    desc: 'Automated CSR and tax exemption receipts generated directly to your accounting dashboard.',
                  },
                  {
                    title: 'Sub-38 Minute Doorstep Dispatch',
                    desc: 'Thermal crates keep dinner piping hot from your kitchen door to shelter plates.',
                  },
                ].map((pil, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-[#C4B9AC]">
                    <div className="w-5 h-5 rounded-full bg-[#2A8A56]/20 text-[#4AAD74] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-white">{pil.title}:</strong> {pil.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    sound.click();
                    onOpenDonateModal();
                  }}
                  className="px-8 py-4 rounded-full bg-[#D4521A] hover:bg-[#A83415] text-white font-semibold text-sm sm:text-base flex items-center gap-2.5 shadow-xl shadow-orange-600/30 cursor-pointer transition-all"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Donate Food Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onOpenPledgeModal && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.click();
                      onOpenPledgeModal();
                    }}
                    className="px-6 py-4 rounded-full bg-[#1A5C38] hover:bg-[#2A8A56] text-white font-semibold text-sm sm:text-base flex items-center gap-2 cursor-pointer transition-all shadow-lg"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    <span>Pledge 1 Meal (₹35)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right 6 Columns: Interactive 1-Minute Action Console */}
            <div className="lg:col-span-6">
              <div className="rounded-[36px] frosted-card border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">
                {/* 3 Role Selection Tabs */}
                <div className="flex rounded-2xl frosted-subcard p-1.5 border border-white/10">
                  {[
                    { id: 'donate', label: 'Food Donor', icon: Building2 },
                    { id: 'ngo', label: 'NGO Shelter', icon: HeartHandshake },
                    { id: 'volunteer', label: 'Volunteer Rider', icon: Bike },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeCtaTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          sound.click();
                          setActiveCtaTab(tab.id as 'donate' | 'ngo' | 'volunteer');
                          setSubmittedReceipt(null);
                        }}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#1A5C38] text-white shadow-md'
                            : 'text-[#9E8E7A] hover:text-white'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {!submittedReceipt ? (
                  <form onSubmit={handleQuickSubmit} className="space-y-4 text-sm">
                    <div className="space-y-1">
                      <label className="text-xs font-mono-tech uppercase text-[#9E8E7A] font-semibold block">
                        {activeCtaTab === 'donate'
                          ? 'Restaurant / Hotel / Host Name'
                          : activeCtaTab === 'ngo'
                          ? 'NGO / Shelter Registered Name'
                          : 'Your Full Name (Hunger Hero)'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={
                          activeCtaTab === 'donate'
                            ? 'e.g. Grand Horizon Hotel & Banquets'
                            : activeCtaTab === 'ngo'
                            ? 'e.g. Annapurna Seva Foundation'
                            : 'e.g. Vikram Sharma'
                        }
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl frosted-subcard border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono-tech uppercase text-[#9E8E7A] font-semibold block">
                        Location / Neighborhood
                      </label>
                      <input
                        type="text"
                        required
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl frosted-subcard border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono-tech uppercase text-[#9E8E7A] font-semibold block">
                        {activeCtaTab === 'donate'
                          ? 'Estimated Surplus Food Quantity'
                          : activeCtaTab === 'ngo'
                          ? 'Nightly Shelter Meal Capacity'
                          : 'Vehicle Type & Available Hours'}
                      </label>
                      <input
                        type="text"
                        required
                        value={quantityOrCapacity}
                        onChange={(e) => setQuantityOrCapacity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl frosted-subcard border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-[#1A5C38] hover:bg-[#2A8A56] text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>
                        {activeCtaTab === 'donate'
                          ? 'Generate Instant Dispatch Pass'
                          : activeCtaTab === 'ngo'
                          ? 'Onboard Shelter for Nightly Surplus'
                          : 'Join Hunger Heroes EV Squad'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <div className="rounded-2xl frosted-subcard border border-emerald-500/40 p-5 space-y-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#2A8A56]/20 text-[#4AAD74] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-mono-tech text-xs text-[#4AAD74] uppercase font-semibold">
                        REGISTRATION CONFIRMED • {submittedReceipt.id}
                      </div>
                      <h4 className="font-serif-display text-xl font-bold text-white mt-1">
                        {submittedReceipt.name}
                      </h4>
                      <p className="text-xs text-[#9E8E7A] mt-1">
                        {submittedReceipt.role} • {submittedReceipt.detail}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl frosted-card border border-white/10 text-xs font-mono-tech text-[#C4B9AC]">
                      Dispatched to FoodBridge Central Dispatch Desk. SMS & WhatsApp confirmation sent.
                    </div>

                    <button
                      type="button"
                      onClick={() => setSubmittedReceipt(null)}
                      className="text-xs text-[#4AAD74] hover:underline cursor-pointer"
                    >
                      Submit Another Registration
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
