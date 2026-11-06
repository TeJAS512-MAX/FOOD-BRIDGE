import React, { useEffect, useState } from 'react';
import { CheckCircle2, ChevronRight, Navigation, Sparkles, Truck, X } from 'lucide-react';
import { LIVE_ACTIVITY_STREAM } from '../data/foodBridgeData';
import { sound } from '../utils/soundEffects';

interface ActivityToastFeedProps {
  onOpenTracker: () => void;
}

export const ActivityToastFeed: React.FC<ActivityToastFeedProps> = ({ onOpenTracker }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LIVE_ACTIVITY_STREAM.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [isPaused]);

  if (!isVisible) return null;

  const current = LIVE_ACTIVITY_STREAM[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="fixed bottom-5 left-5 z-40 max-w-sm rounded-2xl bg-[#FFFFFF]/95 backdrop-blur-xl border border-[rgba(26,18,8,0.1)] shadow-xl p-3.5 transition-all hover:scale-102 flex items-center gap-3 text-[#2A1E10]"
    >
      {/* Icon / Indicator */}
      <div className="w-9 h-9 rounded-xl bg-[#2A8A56]/15 text-[#206B42] flex items-center justify-center shrink-0">
        <Truck className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2A8A56] animate-ping shrink-0" />
          <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#1A5C38] font-semibold truncate">
            {current.donor} → {current.ngo}
          </span>
          <span className="text-[10px] text-[#9E8E7A] shrink-0">• {current.time}</span>
        </div>
        <p className="text-xs font-medium text-[#1A1208] truncate mt-0.5">
          {current.qty}
        </p>
        <button
          type="button"
          onClick={() => {
            sound.radar();
            onOpenTracker();
          }}
          className="text-[11px] text-[#206B42] font-semibold hover:text-[#1A5C38] flex items-center gap-1 mt-1 cursor-pointer"
        >
          <span>Track Live Telemetry</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => setIsVisible(false)}
        aria-label="Dismiss toast"
        className="w-6 h-6 rounded-full hover:bg-[#F2EBE1] text-[#9E8E7A] hover:text-[#4A3B2A] flex items-center justify-center shrink-0 cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

