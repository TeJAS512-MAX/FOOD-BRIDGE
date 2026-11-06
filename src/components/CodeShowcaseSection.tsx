import React, { useState } from 'react';
import {
  ArrowUpRight,
  UtensilsCrossed,
  Users,
  Sparkles,
  ShieldCheck,
  Truck,
  Heart,
  Layers,
  Copy,
  Check,
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface LiveMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  subtext: string;
  iconName: string;
  gradient: string;
}

const METRICS: LiveMetric[] = [
  {
    id: 'meals',
    title: 'Hot Meals Rescued & Served',
    value: '142,850',
    change: '+32.4',
    subtext: 'Across 340+ shelters this month',
    iconName: 'UtensilsCrossed',
    gradient: 'from-emerald-600 to-teal-500',
  },
  {
    id: 'co2',
    title: 'Methane CO₂e Prevented',
    value: '86.4 Tons',
    change: '+18.7',
    subtext: 'Landfill emission diverted',
    iconName: 'ShieldCheck',
    gradient: 'from-orange-600 to-amber-500',
  },
  {
    id: 'speed',
    title: 'Avg Pickup-to-Plate Speed',
    value: '38.2 Mins',
    change: '-14.1',
    subtext: 'Thermal van AI route optimization',
    iconName: 'Truck',
    gradient: 'from-blue-600 to-indigo-500',
  },
];

export const CodeShowcaseSection: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<LiveMetric>(METRICS[0]);
  const [copied, setCopied] = useState(false);

  const rawCode = `import { motion } from 'framer-motion';
import { UtensilsCrossed, Users, Truck, ArrowUpRight } from 'lucide-react';

const StatsCard = ({ title, value, change, icon: Icon, gradient }) => {
  return (
    <motion.div whileHover={{ y: -5 }} className="glass-card p-6 rounded-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/60">{title}</p>
          <h2 className="text-2xl font-bold text-white">{value}</h2>
          <p className="flex items-center gap-1 text-sm text-emerald-400">
            <ArrowUpRight size={16} /> {change}%
          </p>
        </div>
        <div className={\`w-12 h-12 rounded-xl bg-gradient-to-br \${gradient} flex items-center justify-center\`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};`;

  const handleCopy = () => {
    sound.click();
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#0a120c] text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono-tech uppercase font-bold tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Architecture & UI Component Engine</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Built with Glassmorphic Precision.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Clean, composable React architecture powering live civic telemetry, real-time dispatch, and zero-waste impact intelligence.
          </p>
        </div>

        {/* 2-Column Showcase: Left = macOS Code Window (Reference Image), Right = Live Rendered Component */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column (7 cols): The macOS Code Window (Direct Match to User's Uploaded Image) */}
          <div className="lg:col-span-7">
            <div className="code-window overflow-hidden">
              {/* Window Header */}
              <div className="px-4 py-3 bg-[#161b22] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
                  <span className="ml-3 text-xs font-mono-tech text-slate-400">StatsCard.jsx</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono-tech bg-white/5 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer border border-white/10"
                    title="Copy code"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono-tech font-bold uppercase tracking-wider bg-white/10 text-slate-300 border border-white/10">
                    jsx
                  </span>
                </div>
              </div>

              {/* Code Editor Body */}
              <div className="p-4 sm:p-6 text-xs sm:text-sm font-mono-tech overflow-x-auto leading-relaxed bg-[#0d1117]">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr>
                      <td className="text-slate-600 pr-4 select-none text-right w-6">1</td>
                      <td>
                        <span className="text-[#ff7b72]">import</span>{' '}
                        <span className="text-white">{'{'}</span>{' '}
                        <span className="text-[#79c0ff]">motion</span>{' '}
                        <span className="text-white">{'}'}</span>{' '}
                        <span className="text-[#ff7b72]">from</span>{' '}
                        <span className="text-[#a5d6ff]">'framer-motion'</span>;
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-600 pr-4 select-none text-right">2</td>
                      <td>
                        <span className="text-[#ff7b72]">import</span>{' '}
                        <span className="text-white">{'{'}</span>{' '}
                        <span className="text-[#79c0ff]">UtensilsCrossed</span>,{' '}
                        <span className="text-[#79c0ff]">Users</span>,{' '}
                        <span className="text-[#79c0ff]">Truck</span>,{' '}
                        <span className="text-[#79c0ff]">ArrowUpRight</span>{' '}
                        <span className="text-white">{'}'}</span>{' '}
                        <span className="text-[#ff7b72]">from</span>{' '}
                        <span className="text-[#a5d6ff]">'lucide-react'</span>;
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-600 pr-4 select-none text-right">3</td>
                      <td className="text-transparent">.</td>
                    </tr>
                    <tr>
                      <td className="text-slate-600 pr-4 select-none text-right">4</td>
                      <td>
                        <span className="text-[#ff7b72]">const</span>{' '}
                        <span className="text-[#d2a8ff]">StatsCard</span>{' '}
                        <span className="text-[#ff7b72]">=</span>{' '}
                        <span className="text-white">{'({ title, value, change, icon: Icon, gradient })'}</span>{' '}
                        <span className="text-[#ff7b72]">=&gt;</span>{' '}
                        <span className="text-white">{'{'}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-600 pr-4 select-none text-right">5</td>
                      <td>
                        {'  '}
                        <span className="text-[#ff7b72]">return</span>{' '}
                        <span className="text-white">(</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-600 pr-4 select-none text-right">6</td>
                      <td>
                        {'    '}
                        <span className="text-[#7ee787]">&lt;motion.div</span>{' '}
                        <span className="text-[#79c0ff]">whileHover</span>
                        <span className="text-white">=</span>
                        <span className="text-[#a5d6ff]">{'{{ y: -5 }}'}</span>{' '}
                        <span className="text-[#79c0ff]">className</span>
                        <span className="text-white">=</span>
                        <span className="text-[#a5d6ff]">"glass-card p-6 rounded-2xl"</span>
                        <span className="text-[#7ee787]">&gt;</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-600 pr-4 select-none text-right">7</td>
                      <td>
                        {'      '}
                        <span className="text-[#7ee787]">&lt;div</span>{' '}
                        <span className="text-[#79c0ff]">className</span>
                        <span className="text-white">=</span>
                        <span className="text-[#a5d6ff]">"flex items-center justify-between"</span>
                        <span className="text-[#7ee787]">&gt;</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-600 pr-4 select-none text-right">8</td>
                      <td>
                        {'        '}
                        <span className="text-[#7ee787]">&lt;div&gt;</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-600 pr-4 select-none text-right">9</td>
                      <td>
                        {'          '}
                        <span className="text-[#7ee787]">&lt;p</span>{' '}
                        <span className="text-[#79c0ff]">className</span>
                        <span className="text-white">=</span>
                        <span className="text-[#a5d6ff]">"text-sm text-white/60"</span>
                        <span className="text-[#7ee787]">&gt;</span>
                        <span className="text-white">{'{title}'}</span>
                        <span className="text-[#7ee787]">&lt;/p&gt;</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-600 pr-4 select-none text-right">10</td>
                      <td>
                        {'          '}
                        <span className="text-[#7ee787]">&lt;h2</span>{' '}
                        <span className="text-[#79c0ff]">className</span>
                        <span className="text-white">=</span>
                        <span className="text-[#a5d6ff]">"text-2xl font-bold text-white"</span>
                        <span className="text-[#7ee787]">&gt;</span>
                        <span className="text-white">{'{value}'}</span>
                        <span className="text-[#7ee787]">&lt;/h2&gt;</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-600 pr-4 select-none text-right">11</td>
                      <td>
                        {'          '}
                        <span className="text-[#7ee787]">&lt;p</span>{' '}
                        <span className="text-[#79c0ff]">className</span>
                        <span className="text-white">=</span>
                        <span className="text-[#a5d6ff]">"flex items-center gap-1 text-sm text-emerald-400"</span>
                        <span className="text-[#7ee787]">&gt;</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-600 pr-4 select-none text-right">12</td>
                      <td>
                        {'            '}
                        <span className="text-[#7ee787]">&lt;ArrowUpRight</span>{' '}
                        <span className="text-[#79c0ff]">size</span>
                        <span className="text-white">=</span>
                        <span className="text-[#a5d6ff]">{'{{ 16 }}'}</span>{' '}
                        <span className="text-[#7ee787]">/&gt;</span>{' '}
                        <span className="text-white">{'{change}%'}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-600 pr-4 select-none text-right">13</td>
                      <td>
                        {'          '}
                        <span className="text-[#7ee787]">&lt;/p&gt;</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-slate-600 pr-4 select-none text-right">14</td>
                      <td>
                        {'        '}
                        <span className="text-[#7ee787]">&lt;/div&gt;</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Live Rendered Interactive Stats Card */}
          <div className="lg:col-span-5 space-y-5">
            <div className="text-xs font-mono-tech text-emerald-400 uppercase tracking-widest font-bold">
              ● Live Component Preview
            </div>

            {/* Metric Selector Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-white/5 border border-white/10">
              {METRICS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    sound.sliderTick();
                    setSelectedMetric(m);
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-mono-tech transition-all cursor-pointer ${
                    selectedMetric.id === m.id
                      ? 'bg-emerald-600 text-white font-bold shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {m.id === 'meals' ? 'Meals' : m.id === 'co2' ? 'CO₂e' : 'Speed'}
                </button>
              ))}
            </div>

            {/* The Actual Rendered Glass Card matching the code */}
            <div
              className="p-7 sm:p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer relative overflow-hidden group"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
              }}
            >
              {/* Glass shine animation overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-white/70">{selectedMetric.title}</p>
                  <h3 className="font-serif-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                    {selectedMetric.value}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-400 font-mono-tech">
                      <ArrowUpRight className="w-4 h-4" />
                      {selectedMetric.change}%
                    </span>
                    <span className="text-xs text-slate-400 font-mono-tech">vs last month</span>
                  </div>
                </div>

                {/* Gradient Icon Badge */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedMetric.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}
                >
                  {selectedMetric.id === 'meals' ? (
                    <UtensilsCrossed className="w-7 h-7 text-white" />
                  ) : selectedMetric.id === 'co2' ? (
                    <ShieldCheck className="w-7 h-7 text-white" />
                  ) : (
                    <Truck className="w-7 h-7 text-white" />
                  )}
                </div>
              </div>

              {/* Subtext info bar */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>{selectedMetric.subtext}</span>
                <span className="text-emerald-400 font-mono-tech font-semibold">Live Telemetry ✓</span>
              </div>
            </div>

            {/* Micro feature pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tech text-slate-400">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                Framer Motion Ready
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                Zero Layout Shift
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400">
                100% Responsive
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
