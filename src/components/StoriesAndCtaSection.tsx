import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Bike,
  Building2,
  CheckCircle2,
  HeartHandshake,
  Home,
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
  onOpenEsgCertificate?: (donorName: string, weightKg: number) => void;
}

type CtaTab = 'donate' | 'household' | 'ngo' | 'volunteer';

const CTA_QUANTITY_DEFAULTS: Record<CtaTab, string> = {
  donate: '35 kg surplus buffet meals',
  household: '5 kg sealed groceries or fresh meals',
  ngo: '120 meals needed each evening',
  volunteer: 'E-bike · 2 evenings per week',
};

export const StoriesAndCtaSection: React.FC<StoriesAndCtaSectionProps> = ({
  onOpenDonateModal,
  onOpenPledgeModal,
  onOpenEsgCertificate,
}) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [isStoryPaused, setIsStoryPaused] = useState(false);
  const selectedStory = COMMUNITY_STORIES[selectedStoryIndex];
  const [activeCtaTab, setActiveCtaTab] = useState<CtaTab>('donate');
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
  const [quantityOrCapacity, setQuantityOrCapacity] = useState<string>(CTA_QUANTITY_DEFAULTS.donate);
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
        : activeCtaTab === 'household'
        ? 'A neighborhood household'
        : activeCtaTab === 'ngo'
        ? 'Karuna Community Shelter'
        : 'Aarav Sharma (EV Volunteer)');

    setSubmittedReceipt({
      id: `FB-PREVIEW-${Math.floor(1000 + Math.random() * 9000)}`,
      role:
        activeCtaTab === 'donate'
          ? 'FOOD BUSINESS REQUEST PREVIEW'
          : activeCtaTab === 'household'
          ? 'HOUSEHOLD FOOD SHARE PREVIEW'
          : activeCtaTab === 'ngo'
          ? 'SHELTER PARTNERSHIP PREVIEW'
          : 'VOLUNTEER INTEREST PREVIEW',
      name: cleanName,
      detail: `${quantityOrCapacity} • ${locationInput}`,
    });
  };

  const toggleAudioSim = () => {
    sound.click();
    setIsPlayingAudio(!isPlayingAudio);
  };

  const selectCtaTab = (tab: CtaTab) => {
    sound.click();
    setActiveCtaTab(tab);
    setOrgName('');
    setQuantityOrCapacity(CTA_QUANTITY_DEFAULTS[tab]);
    setSubmittedReceipt(null);
  };

  return (
    <>
      {/* =====================================================================
          SECTION 7: COMMUNITY STORIES ("VOICES FROM THE BRIDGE")
      ===================================================================== */}
      <section
        id="stories"
        className="relative py-8 lg:py-11 text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b border-white/[0.14]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono-tech uppercase tracking-wider mb-2.5 font-semibold">
                <Quote className="w-3.5 h-3.5 text-emerald-400" />
                <span>06 • ILLUSTRATIVE COMMUNITY STORIES</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08] text-white">
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
            className="story-carousel-stage relative mx-auto mt-5 max-w-6xl"
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
            {/* Ambient volumetric stage backlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-80 w-[34rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full opacity-55 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(16,185,129,0.28) 0%, rgba(249,115,22,0.16) 52%, transparent 75%)',
              }}
            />

            {COMMUNITY_STORIES.map((story, index) => {
              const position = storyPosition(index);
              if (position === 'hidden') return null;
              const isActive = position === 'center';

              return (
                <article
                  key={story.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${COMMUNITY_STORIES.length}: ${story.name}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`story-carousel-card story-carousel-card-${position} overflow-hidden rounded-[26px] border border-white/20 text-left shadow-[0_32px_90px_-18px_rgba(0,0,0,0.82)]`}
                  style={{
                    borderTopColor: isActive ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.2)',
                  }}
                >
                  {isActive ? (
                    <div
                      className="story-carousel-feature story-spotlight-enter relative flex h-full flex-col overflow-hidden"
                      style={{
                        background:
                          'linear-gradient(165deg, rgba(13, 25, 23, 0.92) 0%, rgba(7, 13, 16, 0.96) 100%)',
                        backdropFilter: 'blur(36px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(36px) saturate(180%)',
                      }}
                    >
                      {/* Top liquid meniscus highlight */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[3px]"
                        style={{
                          background:
                            'linear-gradient(90deg, transparent 0%, rgba(52,211,153,0.85) 28%, rgba(251,146,60,0.9) 55%, rgba(56,189,248,0.75) 82%, transparent 100%)',
                        }}
                      />

                      {/* Cinematic Photo Banner */}
                      <div className="story-carousel-photo relative h-36 shrink-0 overflow-hidden sm:h-40">
                        {story.videoUrl ? (
                          <video
                            key={story.id}
                            src={story.videoUrl}
                            poster={story.imageUrl}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="h-full w-full object-cover object-center transition-transform duration-700 scale-[1.02]"
                          />
                        ) : (
                          <img
                            src={story.imageUrl}
                            alt={story.name}
                            className="h-full w-full object-cover object-center transition-transform duration-700 scale-[1.02]"
                          />
                        )}
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              'linear-gradient(180deg, rgba(5,10,12,0.45) 0%, rgba(7,15,14,0.25) 42%, rgba(8,16,15,0.96) 100%)',
                          }}
                        />

                        {/* Top HUD row: Role Pill & Verified Batch Seal */}
                        <div className="absolute inset-x-4 top-3 z-10 flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/35 bg-black/55 px-2.5 py-1 font-mono-tech text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-300 backdrop-blur-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                            <Sparkles className="h-3 w-3 text-emerald-400" />
                            <span>LIVE REEL · {story.role} · {story.location}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onOpenEsgCertificate?.(story.organization, story.certificateWeightKg)
                            }
                            className="inline-flex items-center gap-1 rounded-full border border-emerald-400/40 bg-black/65 hover:bg-emerald-900/70 px-2.5 py-1 font-mono-tech text-[10px] font-semibold text-emerald-200 backdrop-blur-md cursor-pointer transition"
                          >
                            <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                            <span>
                              Story {index + 1}/{COMMUNITY_STORIES.length} · {story.verifiedBatchId}
                            </span>
                          </button>
                        </div>

                        {/* Bottom Identity Lockup */}
                        <div className="absolute inset-x-4 bottom-2.5 z-10 flex items-end justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="relative shrink-0">
                              <img
                                src={story.avatarUrl}
                                alt={story.name}
                                className="h-12 w-12 rounded-2xl object-cover shadow-lg ring-2 ring-emerald-400/70"
                              />
                              <span
                                className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-lg bg-gradient-to-br ${story.avatarGradient} font-serif-display text-[10px] font-bold text-white ring-1 ring-white/40`}
                              >
                                {story.initials}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <h3 className="truncate font-serif-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                                {story.name}
                              </h3>
                              <p className="truncate text-xs font-medium text-white/80">
                                {story.title} · <span className="text-emerald-300">{story.organization}</span>
                              </p>
                              <p className="truncate font-mono-tech text-[10px] text-white/60">
                                {story.fssaiLicense} · {story.csrRegistrationId}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Editorial Story Body */}
                      <div className="story-carousel-copy flex min-h-0 flex-1 flex-col justify-between gap-2.5 p-4 sm:px-5 sm:py-4">
                        {/* Quote + Field Note */}
                        <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-3.5">
                          <Quote
                            aria-hidden="true"
                            className="pointer-events-none absolute right-3 top-2.5 h-7 w-7 text-emerald-400/15"
                          />
                          <blockquote className="border-l-2 border-emerald-400 pl-3 font-serif-display text-sm italic leading-snug text-white/95 sm:text-[15px]">
                            “{story.quote}”
                          </blockquote>
                          <p className="mt-1.5 pl-3 text-[11px] leading-relaxed text-white/70 sm:text-xs">
                            {story.storyDetail}
                          </p>
                        </div>

                        {/* Dual Telemetry Impact Metrics */}
                        <div className="grid w-full grid-cols-2 items-stretch gap-2.5">
                          <div
                            className="relative flex min-w-0 flex-col justify-center overflow-hidden rounded-xl border border-orange-400/25 px-3.5 py-2"
                            style={{
                              background:
                                'linear-gradient(135deg, rgba(249,115,22,0.14) 0%, rgba(255,255,255,0.04) 100%)',
                            }}
                          >
                            <div className="font-mono-tech text-[10px] font-bold uppercase tracking-wider text-orange-200/80">
                              {story.metricLabel}
                            </div>
                            <div className="mt-0.5 truncate font-serif-display text-lg font-bold text-white sm:text-xl">
                              {story.metricValue}
                            </div>
                          </div>
                          <div
                            className="relative flex min-w-0 flex-col justify-center overflow-hidden rounded-xl border border-emerald-400/25 px-3.5 py-2"
                            style={{
                              background:
                                'linear-gradient(135deg, rgba(16,185,129,0.16) 0%, rgba(255,255,255,0.04) 100%)',
                            }}
                          >
                            <div className="font-mono-tech text-[10px] font-bold uppercase tracking-wider text-emerald-200/80">
                              Verified Audit Impact
                            </div>
                            <div className="mt-0.5 truncate font-serif-display text-xs font-bold text-emerald-300 sm:text-sm">
                              {story.secondaryMetric}
                            </div>
                          </div>
                        </div>

                        {/* Tags + Interactive Voice Field Memo Bar */}
                        <div className="flex flex-col gap-2">
                          <div className="flex w-full flex-wrap items-center gap-1.5">
                            {story.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-0.5 font-mono-tech text-[10px] font-semibold text-white/80"
                              >
                                {tag}
                              </span>
                            ))}
                            <button
                              type="button"
                              onClick={() =>
                                onOpenEsgCertificate?.(story.organization, story.certificateWeightKg)
                              }
                              className="rounded-full border border-emerald-400/35 bg-emerald-500/15 hover:bg-emerald-500/25 px-2.5 py-0.5 font-mono-tech text-[10px] font-semibold text-emerald-300 cursor-pointer transition"
                            >
                              Certificate · {story.verifiedBatchId} ↗
                            </button>
                          </div>

                          <div
                            className="flex w-full shrink-0 items-center gap-3 rounded-xl border border-white/15 px-3 py-2"
                            style={{
                              background: isPlayingAudio
                                ? 'linear-gradient(90deg, rgba(16,185,129,0.18) 0%, rgba(6,182,212,0.10) 100%)'
                                : 'rgba(255,255,255,0.05)',
                            }}
                          >
                            <button
                              type="button"
                              onClick={toggleAudioSim}
                              aria-label={`${isPlayingAudio ? 'Pause' : 'Play'} ${story.name} audio memo`}
                              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-white shadow-md transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                              style={{
                                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                              }}
                            >
                              {isPlayingAudio ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="ml-0.5 h-4 w-4 fill-current" />
                              )}
                            </button>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                                <Volume2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                                <span className="truncate">
                                  {story.name.split(' ')[0]}’s Field Voice Log
                                </span>
                              </div>
                              <div className="font-mono-tech text-[10px] text-white/60">
                                {isPlayingAudio ? 'LIVE WAVEFORM ACTIVE' : 'TAP TO LISTEN'} ·{' '}
                                {story.audioDuration || '0:45'}
                              </div>
                            </div>
                            <div className="flex h-7 items-center gap-1 pr-1" aria-hidden="true">
                              {[10, 22, 14, 26, 18, 24, 12, 20, 15].map((height, barIndex) => (
                                <span
                                  key={barIndex}
                                  className={`w-1 rounded-full transition-all duration-300 ${
                                    isPlayingAudio
                                      ? 'animate-pulse bg-emerald-400'
                                      : 'bg-white/30'
                                  }`}
                                  style={{
                                    height: `${height}px`,
                                    animationDelay: `${barIndex * 90}ms`,
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        sound.click();
                        setSelectedStoryIndex(index);
                        setIsPlayingAudio(false);
                      }}
                      aria-label={`Show ${story.role} story: ${story.name}`}
                      className="group absolute inset-0 cursor-pointer overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-300"
                    >
                      <img
                        src={story.imageUrl}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span
                        className="absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(5,10,12,0.45) 0%, rgba(7,15,14,0.62) 42%, rgba(6,12,12,0.97) 100%)',
                        }}
                      />
                      <span className="absolute inset-x-4 top-4 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 font-mono-tech text-[10px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md">
                          {story.role} · {story.location}
                        </span>
                        <span className="rounded-full border border-white/15 bg-black/60 px-2.5 py-1 font-mono-tech text-[10px] font-semibold text-white/80 backdrop-blur-md">
                          {story.verifiedBatchId}
                        </span>
                      </span>
                      <span className="absolute inset-x-5 bottom-4 space-y-2.5 text-white">
                        <span className="flex items-center gap-2.5">
                          <span className="relative shrink-0">
                            <img
                              src={story.avatarUrl}
                              alt={story.name}
                              className="h-10 w-10 rounded-xl object-cover shadow-md ring-1 ring-emerald-400/60"
                            />
                            <span
                              className={`absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-md bg-gradient-to-br ${story.avatarGradient} font-serif-display text-[9px] font-bold text-white`}
                            >
                              {story.initials}
                            </span>
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate font-serif-display text-lg font-bold leading-tight text-white">
                              {story.name}
                            </span>
                            <span className="block truncate text-xs text-white/70">
                              {story.title} · {story.organization}
                            </span>
                          </span>
                        </span>
                        <span className="block line-clamp-2 border-l-2 border-emerald-400/60 pl-2.5 font-serif-display text-xs italic leading-relaxed text-white/85">
                          “{story.quote}”
                        </span>
                        <span className="flex flex-wrap gap-1">
                          {story.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 font-mono-tech text-[9px] text-white/75"
                            >
                              {tag}
                            </span>
                          ))}
                        </span>
                        <span className="flex items-center justify-between rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 font-mono-tech text-[11px] backdrop-blur-md">
                          <span className="font-bold text-orange-300">
                            {story.metricLabel}: {story.metricValue}
                          </span>
                          <span className="text-emerald-300 group-hover:translate-x-0.5 transition-transform">
                            {story.secondaryMetric} →
                          </span>
                        </span>
                      </span>
                    </button>
                  )}
                </article>
              );
            })}

            <button
              type="button"
              onClick={() => moveStory(-1)}
              aria-label="Previous community story"
              className="absolute left-2 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/65 text-white shadow-xl backdrop-blur-xl transition hover:scale-105 hover:border-emerald-400/60 hover:bg-emerald-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:left-5"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => moveStory(1)}
              aria-label="Next community story"
              className="absolute right-2 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/65 text-white shadow-xl backdrop-blur-xl transition hover:scale-105 hover:border-emerald-400/60 hover:bg-emerald-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:right-5"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="mx-auto mt-2 flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-white/60" aria-live="polite">
              Illustrative story {selectedStoryIndex + 1} of {COMMUNITY_STORIES.length} · {selectedStory.role}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5" aria-label="Choose a community story">
                {COMMUNITY_STORIES.map((story, index) => (
                  <button
                    key={story.id}
                    type="button"
                    onClick={() => {
                      sound.click();
                      setSelectedStoryIndex(index);
                      setIsPlayingAudio(false);
                    }}
                    aria-label={`Show story ${index + 1}: ${story.name}`}
                    aria-current={selectedStoryIndex === index ? 'true' : undefined}
                    className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 ${
                      selectedStoryIndex === index ? 'w-7 bg-emerald-300' : 'w-2.5 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setIsStoryPaused((paused) => !paused)}
                aria-pressed={isStoryPaused}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white/65 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                {isStoryPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                {isStoryPaused ? 'Resume' : 'Pause'}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =====================================================================
          SECTION 8: CALL TO ACTION STUDIO ("JOIN THE BRIDGE")
      ===================================================================== */}
      <section
        id="cta"
        className="relative py-8 lg:py-11 text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
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
                Whether you manage a restaurant, share food from home, run a community shelter, or volunteer for local pickups, there is a practical way to help.
              </p>

              {/* Three Value Pillars */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    title: 'A food-safe handoff',
                    desc: 'Record preparation time, storage condition, and pickup details before a meal batch is shared.',
                  },
                  {
                    title: 'Clear partner coordination',
                    desc: 'Keep the donor, shelter, quantity, and pickup details together in one request.',
                  },
                  {
                    title: 'Local pickup planning',
                    desc: 'Coordinate timing with participating shelters and volunteers based on availability.',
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
                {/* Choose a participation path */}
                <div className="flex rounded-2xl bg-white/[0.08] p-1.5 border border-white/[0.14]">
                  {[
                    { id: 'donate', label: 'Food business', icon: Building2 },
                    { id: 'household', label: 'Household', icon: Home },
                    { id: 'ngo', label: 'NGO shelter', icon: HeartHandshake },
                    { id: 'volunteer', label: 'Volunteer', icon: Bike },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeCtaTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => selectCtaTab(tab.id as CtaTab)}
                        aria-pressed={isActive}
                        className={`min-w-0 flex-1 py-2.5 rounded-xl text-[10px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isActive
                            ? 'bg-black/60 text-white shadow-sm'
                            : 'text-white/70 hover:text-white'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span className="truncate">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {!submittedReceipt ? (
                  <form onSubmit={handleQuickSubmit} className="space-y-4 text-sm">
                    <div className="space-y-1">
                      <label className="text-xs font-mono-tech uppercase text-white/70 font-semibold block">
                        {activeCtaTab === 'donate'
                          ? 'Restaurant / Hotel / Event Name'
                          : activeCtaTab === 'household'
                          ? 'Your Name'
                          : activeCtaTab === 'ngo'
                          ? 'NGO / Shelter Registered Name'
                          : 'Your Name'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={
                          activeCtaTab === 'donate'
                            ? 'e.g. Grand Horizon Hotel & Banquets'
                            : activeCtaTab === 'household'
                            ? 'e.g. Priya Sharma'
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
                          : activeCtaTab === 'household'
                          ? 'Food You Can Share'
                          : activeCtaTab === 'ngo'
                          ? 'Meals Needed Each Evening'
                          : 'Vehicle & Available Hours'}
                      </label>
                      <input
                        type="text"
                        required
                        value={quantityOrCapacity}
                        onChange={(e) => setQuantityOrCapacity(e.target.value)}
                        placeholder={CTA_QUANTITY_DEFAULTS[activeCtaTab]}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.20] text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-[#12221e]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-sm transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>
                        {activeCtaTab === 'donate'
                          ? 'Preview food donation request'
                          : activeCtaTab === 'household'
                          ? 'Preview household food share'
                          : activeCtaTab === 'ngo'
                          ? 'Preview shelter partnership'
                          : 'Preview volunteer interest'}
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
                        PREVIEW READY • {submittedReceipt.id}
                      </div>
                      <h4 className="font-serif-display text-xl font-bold text-white mt-1">
                        {submittedReceipt.name}
                      </h4>
                      <p className="text-xs text-white/70 mt-1">
                        {submittedReceipt.role} • {submittedReceipt.detail}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/[0.07] border border-emerald-500/30 text-xs text-white/80">
                      This demo preview is on this page only. It does not schedule a pickup or contact anyone.
                    </div>

                    <button
                      type="button"
                      onClick={() => setSubmittedReceipt(null)}
                      className="text-xs text-emerald-400 hover:underline cursor-pointer font-semibold"
                    >
                      Start another preview
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
