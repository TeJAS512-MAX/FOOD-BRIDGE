import React, { useEffect, useState, useRef } from 'react';
import { Utensils, Leaf, Zap, TrendingUp } from 'lucide-react';

interface Props {
  totalMeals: number;
}



export const LiveImpactTicker: React.FC<Props> = ({ totalMeals }) => {
  const [meals, setMeals] = useState(totalMeals);
  const [co2, setCo2] = useState(86.4);
  const [rescues, setRescues] = useState(7);
  const [volunteers, setVolunteers] = useState(142);
  const [flash, setFlash] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMeals(totalMeals);
  }, [totalMeals]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const mealsAdd = Math.floor(Math.random() * 3) + 1;
      setMeals(m => m + mealsAdd);
      setCo2(c => parseFloat((c + mealsAdd * 0.00052).toFixed(2)));
      if (Math.random() > 0.65) setRescues(r => r + (Math.random() > 0.5 ? 1 : -1 < 1 ? 0 : -1));
      if (Math.random() > 0.80) setVolunteers(v => v + 1);
      setFlash(true);
      setTimeout(() => setFlash(false), 500);
    }, 5000 + Math.random() * 3000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const stats = [
    {
      icon: <Utensils className="w-5 h-5" />,
      label: 'Meals Rescued Today',
      value: meals,
      suffix: '',
      color: '#34D399',
      glowColor: 'rgba(52,211,153,0.25)',
      display: meals.toLocaleString('en-IN'),
    },
    {
      icon: <Leaf className="w-5 h-5" />,
      label: 'CO₂ Averted (tonnes)',
      value: co2,
      suffix: 'T',
      color: '#6EE7B7',
      glowColor: 'rgba(110,231,183,0.20)',
      display: co2.toFixed(1) + 'T',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: 'Active Dispatches',
      value: rescues,
      suffix: '',
      color: '#FB923C',
      glowColor: 'rgba(251,146,60,0.25)',
      display: rescues.toString(),
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: 'Volunteers Online',
      value: volunteers,
      suffix: '',
      color: '#C4B5FD',
      glowColor: 'rgba(196,181,253,0.20)',
      display: volunteers.toString(),
    },
  ];

  return (
    <div className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
      <div
        className="max-w-7xl mx-auto rounded-2xl px-6 py-4"
        style={{
          background: 'rgba(0,0,0,0.38)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderTop: '1.5px solid rgba(255,255,255,0.18)',
        }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Live badge */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-xs font-mono-tech text-white/60 uppercase tracking-widest font-bold">
              Live Impact
            </span>
          </div>

          <div className="w-px h-6 bg-white/15 hidden sm:block" />

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 flex-1">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg" style={{ color: stat.color, background: stat.glowColor }}>
                  {stat.icon}
                </div>
                <div>
                  <div
                    className="text-lg font-bold font-mono-tech leading-none transition-all"
                    style={{
                      color: stat.color,
                      textShadow: flash ? `0 0 12px ${stat.color}` : 'none',
                    }}
                  >
                    {stat.display}
                  </div>
                  <div className="text-[10px] text-white/50 uppercase tracking-wide font-mono-tech">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right tag */}
          <div className="hidden xl:flex items-center gap-1.5 text-[10px] font-mono-tech text-white/40 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Refreshes every ~5s
          </div>
        </div>
      </div>
    </div>
  );
};
