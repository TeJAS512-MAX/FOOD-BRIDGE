import React, { useState } from 'react';
import {
  HeartHandshake,
  MapPin,
  Radio,
  ShieldCheck,
  UtensilsCrossed,
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

  const handleQuickRescue = (e: React.FormEvent) => {
    e.preventDefault();
    sound.click();
    onOpenDonateModal();
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 overflow-hidden">
      {/* ==============================================================
          LAYER 1: LUMINOUS LIGHT ARCHITECTURAL STUDIO BACKGROUND
          (Crisp natural light, warm architectural wood & modern ceramics)
      ============================================================== */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F1F5F9] via-[#F8FAFC] to-[#EEF2F6]">
        {/* Soft natural sunlight beams */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(5, 150, 105, 0.08) 0%, transparent 60%),
                              radial-gradient(ellipse at 85% 20%, rgba(234, 88, 12, 0.07) 0%, transparent 50%),
                              linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 100%)`,
          }}
        />

        {/* Studio architectural shelving lines */}
        <div className="absolute top-0 left-0 right-0 h-44 border-b border-white/[0.14]/60 opacity-60" />
        <div className="absolute bottom-24 left-0 right-0 h-20 border-t border-b border-white/[0.14]/50 opacity-40" />

        {/* Soft warm ambient glows */}
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl bg-emerald-100/60 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl bg-orange-100/60 pointer-events-none" />
      </div>

      {/* ==============================================================
          LAYER 2: 3D POLISHED PLATINUM SCULPTURAL LETTERS ("FOODBRIDGE")
          (Resting behind the glass sheet with crisp reflection)
      ============================================================== */}
      <div className="absolute inset-x-0 bottom-6 sm:bottom-10 lg:bottom-14 flex items-baseline justify-center select-none pointer-events-none z-0 px-2 overflow-hidden">
        <div className="flex items-baseline gap-1 sm:gap-2.5 md:gap-4 lg:gap-6 opacity-30 sm:opacity-40 transition-transform duration-700">
          {['F', 'O', 'O', 'D'].map((char, i) => (
            <span
              key={`f-${i}`}
              className="letter-3d-metallic text-5xl sm:text-7xl md:text-9xl lg:text-[144px] leading-none"
            >
              {char}
            </span>
          ))}
          {/* Decorative sphere / dot */}
          <span className="letter-3d-sphere mx-0.5 sm:mx-1.5 self-center mb-4 sm:mb-8" />
          {['B', 'R', 'I', 'D', 'G', 'E'].map((char, i) => (
            <span
              key={`b-${i}`}
              className="letter-3d-metallic text-5xl sm:text-7xl md:text-9xl lg:text-[144px] leading-none"
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* ==============================================================
          LAYER 3: THE CRYSTALLINE FROSTED GLASS SHEET
          (Floating glass panel with 100% visible, high-contrast text)
      ============================================================== */}
      <div className="relative z-10 w-full max-w-6xl mx-auto my-auto">
        <div className="liquid-glass-sheet p-6 sm:p-10 lg:p-12 text-white shadow-2xl">
          {/* Top Row: Brand & Quick Tags */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/[0.14]/80">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
                }}
              >
                <HeartHandshake className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-serif-display text-2xl font-bold tracking-tight text-white">
                  Food<span className="text-[#059669]">Bridge</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech uppercase font-bold tracking-widest bg-emerald-50 text-emerald-800 border border-emerald-200">
                  CIVIC ZERO-WASTE
                </span>
              </div>
            </div>

            {/* Live Telemetry Pill */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenLiveTracker}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono-tech cursor-pointer transition-all bg-white/[0.07] border border-white/[0.14] text-white/80 hover:border-emerald-500 hover:text-emerald-700 shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-white/90">24 Vans Active</span>
                <span className="opacity-40">·</span>
                <span className="text-emerald-700 font-bold">Avg 38m</span>
              </button>
            </div>
          </div>

          {/* Main Content Grid: Headline & Action on Left, Inset Navigation Card on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-8 lg:py-10 items-center">
            {/* Left Column (7 cols): Editorial Headline & Integrated Pill Input */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight leading-[1.08] text-white">
                One good meal rescued,{' '}
                <span className="text-grad-orange font-normal italic">every second.</span>
              </h1>

              <p className="text-base sm:text-lg leading-relaxed max-w-xl text-white/80 font-normal">
                Every evening, commercial kitchens produce wholesome surplus while millions struggle
                for regular food. FoodBridge coordinates hotel banquets, restaurants, and caterers
                directly to verified shelters with temperature-monitored fleet routing in{' '}
                <strong className="text-emerald-700 font-semibold">under 38 minutes</strong>.
              </p>

              {/* Integrated Search & Rescue Pill Input */}
              <form onSubmit={handleQuickRescue} className="pt-2">
                <div className="relative max-w-xl flex items-center rounded-full p-1.5 shadow-md bg-white/[0.07] border border-white/[0.20] focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                  <div className="pl-4 pr-2 flex items-center pointer-events-none text-emerald-600">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={donorInput}
                    onChange={(e) => setDonorInput(e.target.value)}
                    placeholder="Enter hotel, restaurant or city address..."
                    className="w-full bg-transparent text-sm sm:text-base text-white/90 placeholder-slate-400 focus:outline-none pr-3"
                  />
                  <button
                    type="submit"
                    className="shrink-0 btn-frosted-primary text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <UtensilsCrossed className="w-4 h-4" />
                    <span>Rescue Food</span>
                  </button>
                </div>
              </form>

              {/* Microcopy & Fast Action Links */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech text-white/70 pt-1">
                <div className="flex items-center gap-1.5 text-white/80">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>38 min avg pickup-to-plate</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5 text-white/80">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>100% FSSAI food-safe audited</span>
                </div>
                <span>•</span>
                <button
                  type="button"
                  onClick={onOpenPledgeModal}
                  className="text-emerald-700 hover:text-emerald-800 hover:underline font-semibold cursor-pointer"
                >
                  Pledge 1 Meal (₹35) →
                </button>
              </div>
            </div>

            {/* Right Column (5 cols): Inset Navigation Card */}
            <div className="lg:col-span-5">
              <div className="glass-inset-card p-6 sm:p-7 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.14]">
                  <span className="font-mono-tech text-xs uppercase font-bold tracking-wider text-emerald-800">
                    Network Directory
                  </span>
                  <span className="text-[11px] font-mono-tech text-white/60 font-medium">Verified &amp; Active</span>
                </div>

                <div className="grid grid-cols-2 gap-6 text-sm">
                  {/* Column 1: Donors */}
                  <div className="space-y-3">
                    <div className="font-bold text-xs uppercase tracking-wider text-white/60">
                      Food Donors
                    </div>
                    <ul className="space-y-2 text-xs text-white/80 font-medium">
                      <li>
                        <button
                          type="button"
                          onClick={onOpenDonateModal}
                          className="hover:text-emerald-700 transition-colors text-left"
                        >
                          Hotel Banquets
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={onOpenDonateModal}
                          className="hover:text-emerald-700 transition-colors text-left"
                        >
                          Restaurants &amp; Cafes
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={onOpenDonateModal}
                          className="hover:text-emerald-700 transition-colors text-left"
                        >
                          Weddings &amp; Events
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={onOpenDonateModal}
                          className="hover:text-emerald-700 transition-colors text-left"
                        >
                          Society Potlucks
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Column 2: NGO Shelters */}
                  <div className="space-y-3">
                    <div className="font-bold text-xs uppercase tracking-wider text-white/60">
                      Shelters
                    </div>
                    <ul className="space-y-2 text-xs text-white/80 font-medium">
                      <li>
                        <a href="#solution" className="hover:text-emerald-700 transition-colors">
                          Asha Orphanage
                        </a>
                      </li>
                      <li>
                        <a href="#solution" className="hover:text-emerald-700 transition-colors">
                          Annapoorna Kitchen
                        </a>
                      </li>
                      <li>
                        <a href="#solution" className="hover:text-emerald-700 transition-colors">
                          Mission City Shelter
                        </a>
                      </li>
                      <li>
                        <a href="#cta" className="hover:text-emerald-700 transition-colors">
                          Register NGO Shelter
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3: Platform Tech */}
                  <div className="space-y-3">
                    <div className="font-bold text-xs uppercase tracking-wider text-white/60">
                      Logistics
                    </div>
                    <ul className="space-y-2 text-xs text-white/80 font-medium">
                      <li>
                        <button
                          type="button"
                          onClick={onOpenLiveTracker}
                          className="hover:text-emerald-700 transition-colors text-left flex items-center gap-1"
                        >
                          <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                          <span>GPS Van Radar</span>
                        </button>
                      </li>
                      <li>
                        <a href="#features" className="hover:text-emerald-700 transition-colors">
                          AI Tray Scanner
                        </a>
                      </li>
                      <li>
                        <a href="#how-it-works" className="hover:text-emerald-700 transition-colors">
                          Cold Chain Sensors
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Column 4: Impact & Legal */}
                  <div className="space-y-3">
                    <div className="font-bold text-xs uppercase tracking-wider text-white/60">
                      Verification
                    </div>
                    <ul className="space-y-2 text-xs text-white/80 font-medium">
                      <li>
                        <a href="#impact" className="hover:text-emerald-700 transition-colors">
                          Tax 80G Certificate
                        </a>
                      </li>
                      <li>
                        <a href="#impact" className="hover:text-emerald-700 transition-colors">
                          ESG Impact Ledger
                        </a>
                      </li>
                      <li>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          FSSAI Aligned
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: System Status on Left, Socials on Right */}
          <div className="pt-6 border-t border-white/[0.14]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
            <div className="flex items-center gap-3">
              <span className="font-medium text-white/80">© 2026 FoodBridge</span>
              <span className="opacity-40">•</span>
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold font-mono-tech">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All 24 vans dispatching live</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Social Pills */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.14] text-white/70 shadow-xs">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-5 h-5 flex items-center justify-center rounded-full hover:text-white transition-colors font-bold text-[11px]"
                  aria-label="X"
                >
                  𝕏
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-5 h-5 flex items-center justify-center rounded-full hover:text-white transition-colors font-bold text-[10px]"
                  aria-label="LinkedIn"
                >
                  in
                </a>
                <a
                  href="https://github.com/TeJAS512-MAX/FOOD-BRIDGE"
                  target="_blank"
                  rel="noreferrer"
                  className="w-5 h-5 flex items-center justify-center rounded-full hover:text-white transition-colors text-[11px]"
                  aria-label="GitHub Repository"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="#hero"
                  className="w-5 h-5 flex items-center justify-center rounded-full hover:text-white transition-colors text-[10px]"
                  aria-label="FoodBridge Global"
                >
                  <Globe className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
