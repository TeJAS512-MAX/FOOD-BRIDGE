import React, { useState } from 'react';
import {
  ArrowRight,
  HeartHandshake,
  MapPin,
  Radio,
  Share2,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  Sun,
  Moon,
  Clock,
  Globe,
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface HeroGlassmorphismProps {
  onOpenDonateModal: () => void;
  onOpenLiveTracker: () => void;
  onOpenPledgeModal: () => void;
}

export const HeroGlassmorphism: React.FC<HeroGlassmorphismProps> = ({
  onOpenDonateModal,
  onOpenLiveTracker,
  onOpenPledgeModal,
}) => {
  const [donorInput, setDonorInput] = useState('');
  const [isEvening, setIsEvening] = useState(false);
  const [activeTab, setActiveTab] = useState<'hotel' | 'restaurant' | 'event'>('hotel');

  const toggleEvening = () => {
    sound.click();
    setIsEvening(!isEvening);
  };

  const handleQuickRescue = (e: React.FormEvent) => {
    e.preventDefault();
    sound.click();
    onOpenDonateModal();
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 overflow-hidden">
      {/* ==============================================================
          LAYER 1: PHOTOREALISTIC WARM ARCHITECTURAL INTERIOR BACKGROUND
          (Warm oak shelving, modern ceramics, soft studio lighting)
      ============================================================== */}
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          isEvening
            ? 'bg-gradient-to-b from-[#0a140d] via-[#0f2115] to-[#070d09]'
            : 'bg-gradient-to-b from-[#ebe3d5] via-[#dfd3c0] to-[#cbbaa2]'
        }`}
      >
        {/* Architectural interior room illusion */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-multiply"
          style={{
            backgroundImage: `radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.7) 0%, transparent 60%),
                              linear-gradient(180deg, rgba(140,115,85,0.2) 0%, rgba(50,35,20,0.4) 100%)`,
          }}
        />

        {/* Studio warm shelf elements */}
        <div className="absolute top-0 left-0 right-0 h-40 border-b border-white/20 opacity-30" />
        <div className="absolute bottom-20 left-0 right-0 h-16 border-t border-b border-black/10 opacity-40" />

        {/* Ambient lighting glows */}
        <div
          className={`absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
            isEvening ? 'bg-emerald-600/15' : 'bg-amber-100/50'
          }`}
        />
        <div
          className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
            isEvening ? 'bg-orange-600/10' : 'bg-orange-200/40'
          }`}
        />
      </div>

      {/* ==============================================================
          LAYER 2: 3D METALLIC SCULPTURAL LETTERS ("FOODBRIDGE")
          (Resting behind the glass sheet, refracting with depth)
      ============================================================== */}
      <div className="absolute inset-x-0 bottom-4 sm:bottom-8 lg:bottom-12 flex items-baseline justify-center select-none pointer-events-none z-0 px-2 overflow-hidden">
        <div className="flex items-baseline gap-1 sm:gap-2.5 md:gap-4 lg:gap-6 opacity-85 transition-transform duration-700 transform hover:scale-[1.01]">
          {['F', 'O', 'O', 'D'].map((char, i) => (
            <span
              key={`f-${i}`}
              className="letter-3d-metallic text-5xl sm:text-7xl md:text-9xl lg:text-[148px] leading-none"
            >
              {char}
            </span>
          ))}
          {/* Decorative sphere / dot */}
          <span className="letter-3d-sphere mx-0.5 sm:mx-1.5 self-center mb-4 sm:mb-8" />
          {['B', 'R', 'I', 'D', 'G', 'E'].map((char, i) => (
            <span
              key={`b-${i}`}
              className="letter-3d-metallic text-5xl sm:text-7xl md:text-9xl lg:text-[148px] leading-none"
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* ==============================================================
          LAYER 3: THE LIQUID FROSTED GLASS SHEET (VERTIX STYLE)
          (Massive floating glass panel with curved liquid rim & insets)
      ============================================================== */}
      <div className="relative z-10 w-full max-w-6xl mx-auto my-auto">
        <div
          className={`liquid-glass-sheet p-6 sm:p-10 lg:p-12 transition-all duration-500 ${
            isEvening ? 'dark-mode text-white' : 'text-slate-900'
          }`}
        >
          {/* Top Row: Brand & Quick Tags */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-black/5 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #1A5C38 0%, #2A8A56 100%)',
                }}
              >
                <HeartHandshake className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-serif-display text-2xl font-bold tracking-tight">
                  Food<span className="text-[#2A8A56] dark:text-[#4AAD74]">Bridge</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech uppercase font-bold tracking-widest bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25">
                  CIVIC ZERO-WASTE
                </span>
              </div>
            </div>

            {/* Live Telemetry Pill */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenLiveTracker}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono-tech cursor-pointer transition-all hover:opacity-90 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold">24 Vans Active</span>
                <span className="opacity-50">·</span>
                <span className="text-emerald-700 dark:text-emerald-300 font-bold">ETA 38m</span>
              </button>
            </div>
          </div>

          {/* Main Content Grid: Headline & Action on Left, Inset Navigation Card on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-8 lg:py-10 items-center">
            {/* Left Column (7 cols): Editorial Headline & Integrated Pill Input */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-[58px] font-semibold tracking-tight leading-[1.08]">
                One good meal rescued,{' '}
                <span className="italic font-normal text-[#D4521A]">every second.</span>
              </h1>

              <p className="text-base sm:text-lg leading-relaxed max-w-xl opacity-80">
                Every evening, commercial kitchens produce surplus while millions sleep hungry.
                FoodBridge connects hotel banquets, restaurants, and events directly to verified
                NGO shelters with AI cold-chain logistics.
              </p>

              {/* Integrated Search & Rescue Pill Input */}
              <form onSubmit={handleQuickRescue} className="pt-2">
                <div className="relative max-w-xl flex items-center rounded-full p-1.5 shadow-xl transition-all focus-within:ring-2 focus-within:ring-emerald-500/40 bg-black/85 text-white backdrop-blur-xl border border-white/20">
                  <div className="pl-4 pr-2 flex items-center pointer-events-none text-emerald-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={donorInput}
                    onChange={(e) => setDonorInput(e.target.value)}
                    placeholder="Enter hotel, restaurant or city address..."
                    className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none pr-3"
                  />
                  <button
                    type="submit"
                    className="shrink-0 px-6 py-3 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 text-white cursor-pointer transition-all hover:opacity-95 shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #D4521A 0%, #A83415 100%)',
                    }}
                  >
                    <UtensilsCrossed className="w-4 h-4" />
                    <span>Rescue Food</span>
                  </button>
                </div>
              </form>

              {/* Microcopy & Fast Action Links */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech opacity-75 pt-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>38 min avg pickup-to-plate</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>100% FSSAI food-safe audited</span>
                </div>
                <span>•</span>
                <button
                  type="button"
                  onClick={onOpenPledgeModal}
                  className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
                >
                  Pledge 1 Meal (₹35) →
                </button>
              </div>
            </div>

            {/* Right Column (5 cols): Frosted Inset Navigation Card (Vertix Menu Style) */}
            <div className="lg:col-span-5">
              <div className="glass-inset-card p-6 sm:p-7 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
                  <span className="font-mono-tech text-xs uppercase font-bold tracking-wider text-emerald-800 dark:text-emerald-400">
                    Network Directory
                  </span>
                  <span className="text-[11px] font-mono-tech opacity-60">Verified & Active</span>
                </div>

                <div className="grid grid-cols-2 gap-6 text-sm">
                  {/* Column 1: Donors */}
                  <div className="space-y-3">
                    <div className="font-semibold text-xs uppercase tracking-wider opacity-60">
                      Food Donors
                    </div>
                    <ul className="space-y-2 text-xs opacity-85">
                      <li>
                        <button
                          type="button"
                          onClick={onOpenDonateModal}
                          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left"
                        >
                          Hotel Banquets
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={onOpenDonateModal}
                          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left"
                        >
                          Restaurants & Cafes
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={onOpenDonateModal}
                          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left"
                        >
                          Weddings & Events
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={onOpenDonateModal}
                          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left"
                        >
                          Society Potlucks
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Column 2: NGO Shelters */}
                  <div className="space-y-3">
                    <div className="font-semibold text-xs uppercase tracking-wider opacity-60">
                      Shelters
                    </div>
                    <ul className="space-y-2 text-xs opacity-85">
                      <li>
                        <a href="#solution" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                          Asha Orphanage
                        </a>
                      </li>
                      <li>
                        <a href="#solution" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                          Annapoorna Kitchen
                        </a>
                      </li>
                      <li>
                        <a href="#solution" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                          Mission City Shelter
                        </a>
                      </li>
                      <li>
                        <a href="#cta" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                          Register NGO Shelter
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3: Platform Tech */}
                  <div className="space-y-3">
                    <div className="font-semibold text-xs uppercase tracking-wider opacity-60">
                      Logistics
                    </div>
                    <ul className="space-y-2 text-xs opacity-85">
                      <li>
                        <button
                          type="button"
                          onClick={onOpenLiveTracker}
                          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left flex items-center gap-1"
                        >
                          <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
                          <span>GPS Van Radar</span>
                        </button>
                      </li>
                      <li>
                        <a href="#features" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                          AI Tray Scanner
                        </a>
                      </li>
                      <li>
                        <a href="#how-it-works" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                          Cold Chain Sensors
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Column 4: Impact & Legal */}
                  <div className="space-y-3">
                    <div className="font-semibold text-xs uppercase tracking-wider opacity-60">
                      Verification
                    </div>
                    <ul className="space-y-2 text-xs opacity-85">
                      <li>
                        <a href="#impact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                          Tax 80G Certificate
                        </a>
                      </li>
                      <li>
                        <a href="#impact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                          ESG Impact Ledger
                        </a>
                      </li>
                      <li>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600/10 text-emerald-700 dark:text-emerald-300">
                          FSSAI Aligned
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: System Status on Left, Socials + Evening Toggle on Right */}
          <div className="pt-6 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="opacity-75">© 2026 FoodBridge</span>
              <span className="opacity-40">•</span>
              <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold font-mono-tech">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All systems dispatching live</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Social Pills */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-5 h-5 flex items-center justify-center rounded-full hover:opacity-100 opacity-60 transition-opacity font-bold text-[11px]"
                  aria-label="X"
                >
                  𝕏
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-5 h-5 flex items-center justify-center rounded-full hover:opacity-100 opacity-60 transition-opacity font-bold text-[10px]"
                  aria-label="LinkedIn"
                >
                  in
                </a>
                <a
                  href="https://github.com/TeJAS512-MAX/exersise-8"
                  target="_blank"
                  rel="noreferrer"
                  className="w-5 h-5 flex items-center justify-center rounded-full hover:opacity-100 opacity-60 transition-opacity text-[11px]"
                  aria-label="GitHub Repository"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-5 h-5 flex items-center justify-center rounded-full hover:opacity-100 opacity-60 transition-opacity font-bold text-[10px]"
                  aria-label="YouTube"
                >
                  ▶
                </a>
                <a
                  href="#hero"
                  className="w-5 h-5 flex items-center justify-center rounded-full hover:opacity-100 opacity-60 transition-opacity text-[10px]"
                  aria-label="FoodBridge Global"
                >
                  <Globe className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Day / Evening Toggle Switch (Vertix Signature) */}
              <button
                type="button"
                onClick={toggleEvening}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 cursor-pointer font-mono-tech text-xs transition-all hover:scale-105"
                title="Toggle Daytime / Evening Ambient Lighting"
              >
                <span>{isEvening ? 'Evening' : 'Daylight'}</span>
                <div
                  className={`w-7 h-4 rounded-full p-0.5 flex items-center transition-colors ${
                    isEvening ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-white shadow-sm" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
