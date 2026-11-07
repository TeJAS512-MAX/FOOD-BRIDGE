import React, { useEffect, useState } from 'react';
import { ChevronRight, Flame, MapPin, Radio, ShieldCheck, Truck, X } from 'lucide-react';
import { LIVE_ACTIVITY_STREAM } from '../data/foodBridgeData';
import { sound } from '../utils/soundEffects';

interface ActivityToastFeedProps {
  onOpenTracker: () => void;
}

export const ActivityToastFeed: React.FC<ActivityToastFeedProps> = ({ onOpenTracker }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || LIVE_ACTIVITY_STREAM.length < 2) return;
    const interval = window.setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % LIVE_ACTIVITY_STREAM.length);
    }, 6500);
    return () => window.clearInterval(interval);
  }, [isPaused]);

  if (LIVE_ACTIVITY_STREAM.length === 0) return null;

  if (!isVisible) {
    return (
      <button
        type="button"
        onClick={() => {
          sound.click();
          setIsVisible(true);
        }}
        aria-label="Show live rescue updates"
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-[#0b1514]/95 px-3.5 py-2 text-xs font-mono-tech font-bold text-emerald-300 shadow-2xl backdrop-blur-2xl cursor-pointer transition hover:scale-105 hover:border-emerald-300"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>
        <Truck className="h-3.5 w-3.5 text-emerald-300" />
        <span>Live Rescue Feed</span>
      </button>
    );
  }

  const current = LIVE_ACTIVITY_STREAM[currentIndex % LIVE_ACTIVITY_STREAM.length];

  return (
    <aside
      aria-label="Live food rescue activity"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false);
      }}
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 w-[min(23.5rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-emerald-400/30 bg-[#081214]/95 text-white shadow-[0_22px_65px_rgba(0,0,0,0.72),0_0_28px_rgba(16,185,129,0.18)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-300/60"
    >
      {/* Animated Top Cycle Progress Bar */}
      <div className="h-1 w-full bg-white/10 overflow-hidden">
        <div
          key={`${current.id}-${isPaused ? 'paused' : 'run'}`}
          className={`h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-orange-400 ${
            isPaused ? 'w-full' : 'live-toast-timer'
          }`}
        />
      </div>

      <div key={current.id} className="live-toast-enter relative flex items-start gap-3 p-4">
        {/* Specular Light Sweep Across Card on Every New Update */}
        <div
          aria-hidden="true"
          className="live-toast-shimmer pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-white/12 to-transparent"
        />

        {/* Animated Radar Icon Pod */}
        <div className="relative mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-300/30 bg-gradient-to-br from-emerald-500/25 to-teal-500/10 text-emerald-200 shadow-inner">
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-xl border border-emerald-400/40 animate-ping opacity-25"
          />
          <Truck className="h-5 w-5 text-emerald-300 animate-bounce" aria-hidden="true" />
          <span className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-[#081214] bg-emerald-400" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[10px] font-mono-tech font-bold uppercase tracking-[0.14em] text-emerald-300">
              <Radio className="h-3 w-3 shrink-0 animate-pulse text-emerald-400" aria-hidden="true" />
              <span>Live Rescue Update</span>
            </div>
            <span className="rounded-full border border-orange-400/35 bg-orange-500/15 px-2 py-0.5 font-mono-tech text-[9px] font-bold uppercase text-orange-300">
              {current.badge}
            </span>
          </div>

          <div className="flex min-w-0 items-center gap-1.5 text-xs font-semibold text-white/90">
            <span className="truncate">{current.donor}</span>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-emerald-300" aria-hidden="true" />
            <span className="truncate text-emerald-200">{current.ngo}</span>
            <span className="ml-auto shrink-0 text-[11px] font-medium text-white/60">{current.time}</span>
          </div>

          <p className="mt-1.5 text-sm font-semibold leading-snug text-white">{current.qty}</p>

          {/* Animated Mini GPS Telemetry Track */}
          <div className="mt-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-2">
            <div className="relative flex items-center justify-between text-[9px] font-mono-tech text-white/70">
              <span className="inline-flex items-center gap-1 text-orange-300 font-semibold">
                <MapPin className="h-2.5 w-2.5" />
                Origin
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-300 font-semibold">
                <Flame className="h-2.5 w-2.5 text-orange-400" />
                65.2°C Safe
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-300 font-semibold">
                <ShieldCheck className="h-2.5 w-2.5" />
                Shelter
              </span>
            </div>
            <div className="relative mt-1.5 h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: '78%',
                  background: 'linear-gradient(90deg, #F97316 0%, #10B981 100%)',
                }}
              />
              <span
                aria-hidden="true"
                className="live-van-runner absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_8px_#10B981]"
              />
            </div>
          </div>

          {/* Action + Step Dots Row */}
          <div className="mt-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                sound.radar();
                onOpenTracker();
              }}
              className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-emerald-300/30 bg-emerald-400/15 px-3 py-1.5 text-xs font-bold text-emerald-100 cursor-pointer transition hover:border-emerald-200/60 hover:bg-emerald-400/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <span>Track live delivery</span>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-1" aria-label="Switch live rescue event">
              {LIVE_ACTIVITY_STREAM.map((ev, idx) => (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => {
                    sound.click();
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Show update ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex % LIVE_ACTIVITY_STREAM.length
                      ? 'w-4 bg-emerald-400'
                      : 'w-1.5 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="Minimize live activity"
          className="-mr-1 -mt-1 flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
};
