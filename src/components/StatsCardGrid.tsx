import React from 'react';
import {
  ArrowUpRight,
  UtensilsCrossed,
  Clock,
  Thermometer,
  Building2,
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType?: 'positive' | 'speed' | 'safety';
  icon: React.ComponentType<{ className?: string; size?: number }>;
  gradient: string;
  sublabel: string;
  onClick?: () => void;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon: Icon,
  gradient,
  sublabel,
  onClick,
}) => {
  return (
    <div
      onClick={() => {
        sound.click();
        onClick?.();
      }}
      className="glass-card p-6 rounded-2xl group cursor-pointer hover:-translate-y-1.5 transition-all duration-300"
    >
      {/* Top ambient color reflection */}
      <div
        className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-40"
        style={{ background: gradient }}
      />

      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-1.5">
          <p className="text-xs sm:text-sm font-medium text-white/65 uppercase tracking-wider font-mono-tech">
            {title}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif-display tracking-tight group-hover:text-emerald-300 transition-colors">
            {value}
          </h2>
          <div className="flex items-center gap-1.5 pt-1">
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-mono-tech font-bold px-2 py-0.5 rounded-full ${
                changeType === 'positive'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : changeType === 'speed'
                  ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
                  : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
              }`}
            >
              <ArrowUpRight size={13} className="shrink-0" />
              <span>{change}%</span>
            </span>
            <span className="text-[11px] text-white/50 font-mono-tech">{sublabel}</span>
          </div>
        </div>

        {/* Glass Icon Bubble */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/20 shadow-md transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.06) 100%)`,
          }}
        >
          <Icon className="w-5 h-5 text-white group-hover:text-emerald-300 transition-colors" />
        </div>
      </div>
    </div>
  );
};

interface StatsCardGridProps {
  onOpenLiveTracker?: () => void;
  onOpenDonateModal?: () => void;
  onOpenPledgeModal?: () => void;
}

export const StatsCardGrid: React.FC<StatsCardGridProps> = ({
  onOpenLiveTracker,
  onOpenDonateModal,
  onOpenPledgeModal,
}) => {
  const cards = [
    {
      title: 'Meals Rescued Today',
      value: '142,850+',
      change: '28.4',
      changeType: 'positive' as const,
      icon: UtensilsCrossed,
      gradient: '#10B981',
      sublabel: 'vs yesterday',
      onClick: onOpenDonateModal,
    },
    {
      title: 'Dispatch Speed',
      value: '38 Mins',
      change: '14.2',
      changeType: 'speed' as const,
      icon: Clock,
      gradient: '#F97316',
      sublabel: 'faster pickup',
      onClick: onOpenLiveTracker,
    },
    {
      title: 'Food-Safe Core Temp',
      value: '65.4°C',
      change: '99.4',
      changeType: 'safety' as const,
      icon: Thermometer,
      gradient: '#06B6D4',
      sublabel: 'FSSAI compliant',
      onClick: onOpenLiveTracker,
    },
    {
      title: 'Verified NGO Shelters',
      value: '340+ Hubs',
      change: '18.0',
      changeType: 'positive' as const,
      icon: Building2,
      gradient: '#A855F7',
      sublabel: 'active receiving',
      onClick: onOpenPledgeModal,
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card, idx) => (
          <StatsCard key={idx} {...card} />
        ))}
      </div>
    </div>
  );
};
