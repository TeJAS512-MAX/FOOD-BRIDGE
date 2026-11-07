import React, { useEffect, useState } from 'react';
import { ChevronRight, Radio, Truck, X } from 'lucide-react';
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
    }, 9000);
    return () => window.clearInterval(interval);
  }, [isPaused]);

  if (!isVisible || LIVE_ACTIVITY_STREAM.length === 0) return null;

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
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/15 bg-[#0b1514]/95 text-white shadow-[0_18px_55px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:border-emerald-300/35"
    >
      <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-300 to-orange-300" />
      <div className="flex items-start gap-3 p-4">
        <div className="relative mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-400/10 text-emerald-200">
          <Truck className="h-[18px] w-[18px]" aria-hidden="true" />
          <span className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-[#0b1514] bg-emerald-300" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-200">
            <Radio className="h-3 w-3 shrink-0" aria-hidden="true" />
            <span>Live rescue update</span>
          </div>
          <div className="flex min-w-0 items-center gap-1.5 text-xs font-semibold text-white/90">
            <span className="truncate">{current.donor}</span>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-emerald-300" aria-hidden="true" />
            <span className="truncate">{current.ngo}</span>
            <span className="ml-auto shrink-0 text-[11px] font-medium text-white/60">{current.time}</span>
          </div>
          <p className="mt-1.5 text-sm font-semibold leading-snug text-white">{current.qty}</p>
          <button
            type="button"
            onClick={() => {
              sound.radar();
              onOpenTracker();
            }}
            className="mt-3 inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-emerald-300/25 bg-emerald-300/10 px-3 text-xs font-bold text-emerald-100 transition hover:border-emerald-200/50 hover:bg-emerald-300/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            Track live delivery <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss live activity"
          className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
};
