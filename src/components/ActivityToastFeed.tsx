import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Radio, X } from 'lucide-react';
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
    }, 6000);
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
        aria-label="Show live rescue pill"
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-[#081214]/95 px-3.5 py-2 text-xs font-mono-tech font-bold text-emerald-300 shadow-2xl backdrop-blur-2xl cursor-pointer transition hover:scale-105"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span>Live Dispatches</span>
      </button>
    );
  }

  const current = LIVE_ACTIVITY_STREAM[currentIndex % LIVE_ACTIVITY_STREAM.length];

  return (
    <aside
      aria-label="Live food rescue activity"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 max-w-[calc(100vw-2rem)]"
    >
      {/* Dynamic Island / Live Activity Capsule */}
      <div
        key={current.id}
        className="live-toast-enter group relative flex items-center gap-3 rounded-full border border-white/20 bg-[#071013]/95 p-2 pr-3 text-white shadow-[0_20px_50px_rgba(0,0,0,0.75),0_0_24px_rgba(16,185,129,0.20)] backdrop-blur-2xl transition-all duration-300 hover:border-emerald-400/50"
      >
        {/* Specular shimmer pass */}
        <div
          aria-hidden="true"
          className="live-toast-shimmer pointer-events-none absolute inset-y-0 left-0 w-20 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        {/* Left: Circular Food Photo Thumbnail with Live Sonar Ring */}
        <button
          type="button"
          onClick={() => {
            sound.radar();
            onOpenTracker();
          }}
          className="relative h-12 w-12 shrink-0 rounded-full p-0.5 bg-gradient-to-tr from-emerald-400 via-teal-300 to-orange-400 cursor-pointer"
        >
          <img
            src={current.image}
            alt={current.qty}
            className="h-full w-full rounded-full object-cover"
          />
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#071013]">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping absolute" />
            <span className="h-2 w-2 rounded-full bg-emerald-400 relative" />
          </span>
        </button>

        {/* Center: Clean 2-Line Live Dispatch Telemetry */}
        <button
          type="button"
          onClick={() => {
            sound.radar();
            onOpenTracker();
          }}
          className="min-w-0 flex-1 text-left cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2 py-0.5 font-mono-tech text-[10px] font-bold text-emerald-300">
              +{current.meals} Meals
            </span>
            <span className="truncate text-xs font-bold text-white max-w-[165px] sm:max-w-[195px]">
              {current.donor} → {current.ngo}
            </span>
          </div>

          <div className="mt-0.5 flex items-center gap-2 text-[11px] font-mono-tech text-white/75">
            <span className="truncate max-w-[130px] text-white/90 font-medium">{current.qty}</span>
            <span className="text-white/35">•</span>
            <span className="text-orange-300 font-bold">{current.temp}</span>
            <span className="text-white/35">•</span>
            <span className="text-emerald-300 font-bold">ETA {current.eta}</span>
          </div>
        </button>

        {/* Right: Open Live Radar Circle Button + Dismiss */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => {
              sound.radar();
              onOpenTracker();
            }}
            title="Open Live GPS Radar"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 hover:bg-emerald-500/35 border border-emerald-400/40 text-emerald-300 transition cursor-pointer"
          >
            <Radio className="h-3.5 w-3.5 animate-pulse hidden sm:block" />
            <ArrowUpRight className="h-4 w-4 sm:hidden" />
          </button>

          <button
            type="button"
            onClick={() => setIsVisible(false)}
            aria-label="Minimize live rescue pill"
            className="flex h-7 w-7 items-center justify-center rounded-full text-white/45 hover:bg-white/10 hover:text-white transition cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
