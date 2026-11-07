import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Bike,
  Building2,
  CheckCircle2,
  HeartHandshake,
  Pause,
  Play,
  Quote,
  Sparkles,
  UtensilsCrossed,
  Volume2,
} from 'lucide-react';
import { COMMUNITY_STORIES } from '../data/foodBridgeData';
import { sound } from '../utils/soundEffects';

interface StoriesAndCtaSectionProps {
  onOpenDonateModal: () => void;
  onOpenPledgeModal?: () => void;
}

export const StoriesAndCtaSection: React.FC<StoriesAndCtaSectionProps> = ({
  onOpenDonateModal,
  onOpenPledgeModal,
}) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [isStoryPaused, setIsStoryPaused] = useState(false);
  const selectedStory = COMMUNITY_STORIES[selectedStoryIndex];
  const [activeCtaTab, setActiveCtaTab] = useState<'donate' | 'ngo' | 'volunteer'>('donate');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  useEffect(() => {
    if (
      isStoryPaused ||
      COMMUNITY_STORIES.length < 2 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;
    const interval = window.setInterval(() => {
      setSelectedStoryIndex((index) => (index + 1) % COMMUNITY_STORIES.length);
      setIsPlayingAudio(false);
    }, 6500);
    return () => window.clearInterval(interval);
  }, [isStoryPaused]);

  const moveStory = (direction: -1 | 1) => {
    sound.click();
    setSelectedStoryIndex((index) =>
      (index + direction + COMMUNITY_STORIES.length) % COMMUNITY_STORIES.length
    );
    setIsPlayingAudio(false);
  };

  const storyPosition = (index: number) => {
    const relativeIndex = (index - selectedStoryIndex + COMMUNITY_STORIES.length) % COMMUNITY_STORIES.length;
    if (relativeIndex === 0) return 'center';
    if (relativeIndex === 1) return 'right';
    if (relativeIndex === COMMUNITY_STORIES.length - 1) return 'left';
    return 'hidden';
  };

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
        className="relative py-20 lg:py-28 text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/[0.14]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono-tech uppercase tracking-wider mb-4 font-semibold">
                <Quote className="w-3.5 h-3.5 text-emerald-400" />
                <span>06 • COMMUNITY VOICES: HUMAN DIGNITY AT EVERY TABLE</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-white">
                Stories from the chefs, shelters, and riders{' '}
                <span className="italic font-normal text-emerald-400">bridging the gap.</span>
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
                    setSelectedStoryIndex(COMMUNITY_STORIES.findIndex((item) => item.id === story.id));
                    setIsPlayingAudio(false);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                    selectedStory.id === story.id
                      ? 'bg-black/60 text-white border-slate-900 shadow-sm'
                      : 'bg-white/[0.07] text-white/80 border-white/[0.14] hover:bg-white/[0.12]'
                  }`}
                >
                  {story.role}
                </button>
              ))}
            </div>
          </div>

          {/* Story carousel: the next voice moves in from the right, takes the
              foreground, and the current voice glides left into the exit. */}
          <div
            className="story-carousel-stage relative mx-auto mt-10 max-w-5xl"
            role="region"
            aria-label="Community story carousel"
            aria-roledescription="carousel"
            onMouseEnter={() => setIsStoryPaused(true)}
            onMouseLeave={() => setIsStoryPaused(false)}
            onFocus={() => setIsStoryPaused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setIsStoryPaused(false);
              }
            }}
          >
            {COMMUNITY_STORIES.map((story, index) => {
              const position = storyPosition(index);
              if (position === 'hidden') return null;

              return (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => {
                    if (position !== 'center') {
                      sound.click();
                      setSelectedStoryIndex(index);
                      setIsPlayingAudio(false);
                    }
                  }}
                  aria-label={`${position === 'center' ? 'Current story' : `Show ${story.role} story`}: ${story.name}`}
                  aria-current={position === 'center' ? 'true' : undefined}
                  tabIndex={position === 'center' ? 0 : 0}
                  className={`story-carousel-card story-carousel-card-${position} group overflow-hidden rounded-2xl border border-white/20 text-left shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300`}
                >
                  <img
                    src={story.imageUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#07110f]/95 via-[#07110f]/30 to-transparent" />
                  <span className="absolute inset-x-4 bottom-4 text-white">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-200">
                      {story.role} · {story.location}
                    </span>
                    <span className="mt-1 block truncate font-serif-display text-lg font-bold">
                      {story.name}
                    </span>
                  </span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => moveStory(-1)}
              aria-label="Previous community story"
              className="absolute left-2 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0b1514]/90 text-white shadow-lg transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => moveStory(1)}
              aria-label="Next community story"
              className="absolute right-2 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0b1514]/90 text-white shadow-lg transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="mx-auto mt-2 flex max-w-5xl justify-end">
            <button
              type="button"
              onClick={() => setIsStoryPaused((paused) => !paused)}
              aria-pressed={isStoryPaused}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white/65 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <Pause className="h-3.5 w-3.5" />
              {isStoryPaused ? 'Resume stories' : 'Pause stories'}
            </button>
          </div>

          {/* Active Story Spotlight Card with Real Persona Image */}
          <div key={selectedStory.id} className="story-spotlight-enter mt-8 glass-card p-8 sm:p-12 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 5 Cols: Persona Visual & Audio Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl overflow-hidden border border-white/[0.14] shadow-md relative group">
                <img
                  src={selectedStory.imageUrl}
                  alt={selectedStory.name}
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                <div className="absolute bottom-5 inset-x-5 text-white">
                  <div className="text-xs font-mono-tech text-emerald-300 font-semibold uppercase">
                    {selectedStory.role} • {selectedStory.location}
                  </div>
                  <h4 className="font-serif-display text-2xl font-bold text-white mt-1">
                    {selectedStory.name}
                  </h4>
                  <p className="text-xs text-white/75">{selectedStory.title}, {selectedStory.organization}</p>
                </div>
              </div>

              {/* Simulated Audio Note Player */}
              <div className="rounded-2xl bg-white/[0.05] border border-white/[0.14] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleAudioSim}
                    className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center cursor-pointer transition-all shadow-sm"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </button>
                  <div>
                    <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{selectedStory.name.split(' ')[0]}’s Audio Memo</span>
                    </div>
                    <div className="text-[10px] font-mono-tech text-white/60">
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
                      className={`w-1 rounded-full bg-emerald-600 ${
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
              <Quote className="w-10 h-10 text-emerald-400/30" />

              <blockquote className="font-serif-display text-xl sm:text-2xl text-white italic leading-relaxed">
                “{selectedStory.quote}”
              </blockquote>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                {selectedStory.storyDetail}
              </p>

              {/* Story Metrics Banner */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.14] space-y-1">
                  <div className="font-mono-tech text-xs text-white/60 uppercase font-semibold">
                    {selectedStory.metricLabel}
                  </div>
                  <div className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
                    {selectedStory.metricValue}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 space-y-1">
                  <div className="font-mono-tech text-xs text-emerald-300 uppercase font-semibold">
                    ECOLOGICAL DIVERT
                  </div>
                  <div className="font-serif-display text-2xl sm:text-3xl font-bold text-emerald-400">
                    {selectedStory.secondaryMetric}
                  </div>
                </div>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {selectedStory.tags.map((tg, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-white/[0.08] text-white/80 text-xs font-mono-tech border border-white/[0.14] font-medium"
                  >
                    #{tg}
                  </span>
                ))}
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-mono-tech text-xs border border-emerald-500/30 font-semibold">
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
        className="relative py-20 lg:py-28 text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 6 Columns */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 text-xs font-mono-tech uppercase tracking-wider font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>07 • TAKE ACTION TODAY • BE THE BRIDGE</span>
              </div>

              <h2 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-white">
                Every minute counts when{' '}
                <span className="italic font-normal text-emerald-400">fresh food</span> is on the line.
              </h2>

              <p className="text-base text-white/70 leading-relaxed max-w-xl">
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
                  <div key={idx} className="flex items-start gap-3 text-sm text-white/70">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
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
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-sm sm:text-base flex items-center gap-2.5 shadow-lg shadow-orange-500/25 cursor-pointer transition-all"
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
                    className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/[0.16] border border-white/[0.20] text-white/90 font-semibold text-sm sm:text-base flex items-center gap-2 cursor-pointer transition-all shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Pledge 1 Meal (₹35)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right 6 Columns: Interactive 1-Minute Action Console */}
            <div className="lg:col-span-6">
              <div className="glass-card p-6 sm:p-8 shadow-lg space-y-6">
                {/* 3 Role Selection Tabs */}
                <div className="flex rounded-2xl bg-white/[0.08] p-1.5 border border-white/[0.14]">
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
                            ? 'bg-black/60 text-white shadow-sm'
                            : 'text-white/70 hover:text-white'
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
                      <label className="text-xs font-mono-tech uppercase text-white/70 font-semibold block">
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
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.20] text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-[#12221e]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono-tech uppercase text-white/70 font-semibold block">
                        Location / Neighborhood
                      </label>
                      <input
                        type="text"
                        required
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.20] text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-[#12221e]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono-tech uppercase text-white/70 font-semibold block">
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
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.20] text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-[#12221e]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-sm transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
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
                  <div className="rounded-2xl bg-emerald-500/15 border border-emerald-500/40 p-5 space-y-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-mono-tech text-xs text-emerald-300 uppercase font-bold">
                        REGISTRATION CONFIRMED • {submittedReceipt.id}
                      </div>
                      <h4 className="font-serif-display text-xl font-bold text-white mt-1">
                        {submittedReceipt.name}
                      </h4>
                      <p className="text-xs text-white/70 mt-1">
                        {submittedReceipt.role} • {submittedReceipt.detail}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.07] border border-emerald-500/30 text-xs font-mono-tech text-white/80">
                      Dispatched to FoodBridge Central Dispatch Desk. SMS & WhatsApp confirmation sent.
                    </div>

                    <button
                      type="button"
                      onClick={() => setSubmittedReceipt(null)}
                      className="text-xs text-emerald-400 hover:underline cursor-pointer font-semibold"
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
