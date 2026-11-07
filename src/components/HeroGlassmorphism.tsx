import React, { useRef, useState } from 'react';
import {
  HeartHandshake,
  MapPin,
  Radio,
  ShieldCheck,
  UtensilsCrossed,
  Clock,
  Camera,
  Sun,
  Moon,
} from 'lucide-react';
import { StatsCardGrid } from './StatsCardGrid';
import { sound } from '../utils/soundEffects';

interface HeroGlassmorphismProps {
  onOpenDonateModal: (pickupAddress?: string) => void;
  onOpenLiveTracker: () => void;
  onOpenPledgeModal: () => void;
  onOpenAiScanner?: () => void;
  atmosphereMode?: 'day' | 'night';
  onToggleAtmosphere?: (mode: 'day' | 'night') => void;
  totalMeals?: number;
}

export const HeroGlassmorphism: React.FC<HeroGlassmorphismProps> = ({
  onOpenDonateModal,
  onOpenLiveTracker,
  onOpenPledgeModal,
  onOpenAiScanner,
  atmosphereMode = 'day',
  onToggleAtmosphere,
  totalMeals,
}) => {
  const [donorInput, setDonorInput] = useState('');
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const [glare, setGlare] = useState({ x: 50, y: 20, opacity: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, px: 0, py: 0 });

  const handleQuickRescue = (e: React.FormEvent) => {
    e.preventDefault();
    sound.click();
    onOpenDonateModal(donorInput.trim() || undefined);
  };

  const handleSheetPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = sheetRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    const nx = (relX - 0.5) * 2; // -1 .. 1
    const ny = (relY - 0.5) * 2;
    setGlare({ x: relX * 100, y: relY * 100, opacity: 1 });
    setTilt({
      rx: -ny * 2.2,
      ry: nx * 2.6,
      px: -nx * 14,
      py: -ny * 8,
    });
  };

  const handleSheetPointerLeave = () => {
    setGlare((prev) => ({ ...prev, opacity: 0 }));
    setTilt({ rx: 0, ry: 0, px: 0, py: 0 });
  };

  return (
    <section className="relative flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-5 sm:py-7 overflow-hidden">
      {/* ==============================================================
          LAYER 1: THE LIQUID FROSTED GLASS CONSOLE
          100% transparent glassmorphism floating over the warm scene photo
      ============================================================== */}
      <div className="relative z-10 w-full max-w-6xl mx-auto my-auto space-y-4">
        <div
          ref={sheetRef}
          onPointerMove={handleSheetPointerMove}
          onPointerLeave={handleSheetPointerLeave}
          className="liquid-glass-sheet p-5 sm:p-7 lg:p-8 text-white shadow-2xl transition-transform duration-300 ease-out"
          style={{
            transform: `perspective(1400px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          }}
        >
          {/* Cursor-Tracked Optical Specular Caustic Glint */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-[36px]"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(540px circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.13) 0%, rgba(16,185,129,0.06) 35%, transparent 70%)`,
            }}
          />

          {/* Top Row: Brand & Quick Telemetry Tags */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/15">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                }}
              >
                <HeartHandshake className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-serif-display text-2xl font-bold tracking-tight text-white">
                  Food<span className="text-emerald-400">Bridge</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech uppercase font-bold tracking-widest bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  CIVIC ZERO-WASTE GRID
                </span>
              </div>
            </div>

            {/* Quick Action Badges */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {onOpenAiScanner && (
                <button
                  type="button"
                  onClick={() => {
                    sound.click();
                    onOpenAiScanner();
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono-tech cursor-pointer bg-white/10 hover:bg-white/15 border border-white/20 text-white transition-all shadow-xs"
                >
                  <Camera className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AI Tray Vision</span>
                </button>
              )}

              <button
                type="button"
                onClick={onOpenLiveTracker}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono-tech cursor-pointer transition-all bg-white/10 hover:bg-white/15 border border-white/20 text-white shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-white">24 Vans Active</span>
                <span className="opacity-40">·</span>
                <span className="text-emerald-400 font-bold">Avg 38m</span>
              </button>
            </div>
          </div>

          {/* Main Content Grid: Headline on Left, Inset Directory on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 py-5 lg:py-6 items-center">
            {/* Left Column (7 cols): Editorial Headline & Integrated Pill Input */}
            <div className="lg:col-span-7 space-y-4">
              <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-[50px] font-bold tracking-tight leading-[1.08] text-white">
                One good meal rescued,{' '}
                <span className="text-grad-orange font-normal italic">every second.</span>
              </h1>

              <p className="text-sm sm:text-base leading-relaxed max-w-xl text-white/80 font-normal">
                Every evening, commercial kitchens produce wholesome surplus while millions struggle
                for regular food. FoodBridge coordinates hotel banquets, restaurants, and caterers
                directly to verified shelters with temperature-monitored fleet routing in{' '}
                <strong className="text-emerald-400 font-semibold">under 38 minutes</strong>.
              </p>

              {/* Integrated Search & Rescue Pill Input */}
              <form onSubmit={handleQuickRescue} className="pt-2">
                <div className="relative max-w-xl flex items-center rounded-full p-1.5 shadow-lg bg-white/10 backdrop-blur-xl border border-white/25 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-500/30 transition-all">
                  <div className="pl-4 pr-2 flex items-center pointer-events-none text-emerald-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={donorInput}
                    onChange={(e) => setDonorInput(e.target.value)}
                    placeholder="Enter hotel, restaurant or city address..."
                    className="w-full bg-transparent text-sm sm:text-base text-white placeholder-white/45 focus:outline-none pr-3 border-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 btn-frosted-primary text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <UtensilsCrossed className="w-4 h-4" />
                    <span>Rescue Food</span>
                  </button>
                </div>
              </form>

              {/* Fast Action Links */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech text-white/70 pt-1">
                <div className="flex items-center gap-1.5 text-white/90">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>38 min avg pickup-to-plate</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5 text-white/90">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                  <span>100% FSSAI food-safe audited</span>
                </div>
                <span>•</span>
                <button
                  type="button"
                  onClick={onOpenPledgeModal}
                  className="text-emerald-400 hover:text-emerald-300 hover:underline font-semibold cursor-pointer"
                >
                  Pledge 1 Meal (₹35) →
                </button>
              </div>
            </div>

            {/* Right Column (5 cols): Inset Navigation Card */}
            <div className="lg:col-span-5">
              <div className="glass-inset-card p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/15">
                  <span className="font-mono-tech text-xs uppercase font-bold tracking-wider text-emerald-400">
                    Network Directory
                  </span>
                  <span className="text-[11px] font-mono-tech text-white/60 font-medium">
                    Verified &amp; Active
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-6 text-sm">
                  {/* Column 1: Donors */}
                  <div className="space-y-3">
                    <div className="font-bold text-xs uppercase tracking-wider text-white/50 font-mono-tech">
                      Food Donors
                    </div>
                    <ul className="space-y-2 text-xs text-white/80 font-medium">
                      <li>
                        <button
                          type="button"
                          onClick={() => onOpenDonateModal('Grand Horizon Banquet Hall, Indiranagar')}
                          className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                        >
                          Hotel Banquets
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => onOpenDonateModal('100 Feet Road, Indiranagar, Bengaluru')}
                          className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                        >
                          Restaurants &amp; Cafes
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => onOpenDonateModal('Lotus Pavilion Convention Center, Jayanagar')}
                          className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                        >
                          Weddings &amp; Events
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => onOpenDonateModal('Palm Meadows RWA Community Hall, Whitefield')}
                          className="hover:text-emerald-400 transition-colors text-left cursor-pointer"
                        >
                          Society Drives
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Column 2: NGO Shelters */}
                  <div className="space-y-3">
                    <div className="font-bold text-xs uppercase tracking-wider text-white/50 font-mono-tech">
                      Shelters
                    </div>
                    <ul className="space-y-2 text-xs text-white/80 font-medium">
                      <li>
                        <a href="#solution" className="hover:text-emerald-400 transition-colors">
                          Asha Orphanage
                        </a>
                      </li>
                      <li>
                        <a href="#solution" className="hover:text-emerald-400 transition-colors">
                          Annapurna Seva
                        </a>
                      </li>
                      <li>
                        <a href="#solution" className="hover:text-emerald-400 transition-colors">
                          Karuna Shelter
                        </a>
                      </li>
                      <li>
                        <a href="#cta" className="hover:text-emerald-400 transition-colors">
                          Register Shelter
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3: Logistics */}
                  <div className="space-y-3">
                    <div className="font-bold text-xs uppercase tracking-wider text-white/50 font-mono-tech">
                      Logistics
                    </div>
                    <ul className="space-y-2 text-xs text-white/80 font-medium">
                      <li>
                        <button
                          type="button"
                          onClick={onOpenLiveTracker}
                          className="hover:text-emerald-400 transition-colors text-left flex items-center gap-1 cursor-pointer"
                        >
                          <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                          <span>GPS Van Radar</span>
                        </button>
                      </li>
                      <li>
                        <a href="#rescue-network" className="hover:text-emerald-400 transition-colors">
                          Neural Mesh Map
                        </a>
                      </li>
                      <li>
                        <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">
                          IoT Cold Sensors
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Column 4: Verification */}
                  <div className="space-y-3">
                    <div className="font-bold text-xs uppercase tracking-wider text-white/50 font-mono-tech">
                      Verification
                    </div>
                    <ul className="space-y-2 text-xs text-white/80 font-medium">
                      <li>
                        <a href="#impact" className="hover:text-emerald-400 transition-colors">
                          Tax 80G Receipts
                        </a>
                      </li>
                      <li>
                        <a href="#impact" className="hover:text-emerald-400 transition-colors">
                          ESG Ledger
                        </a>
                      </li>
                      <li>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          FSSAI Aligned ✓
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: System Status on Left, Socials & Atmosphere Toggle on Right (Exact Vertix Layout) */}
          <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/70">
            <div className="flex items-center gap-3">
              <span className="font-medium text-white/90">© 2026 FoodBridge</span>
              <span className="opacity-40">•</span>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold font-mono-tech">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All 24 vans dispatching live</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Social Pills */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 shadow-xs">
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
              </div>

              {/* Atmosphere Switcher Pill (Day / Night) */}
              {onToggleAtmosphere && (
                <div className="flex items-center gap-1 p-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono-tech">
                  <button
                    type="button"
                    onClick={() => {
                      sound.click();
                      onToggleAtmosphere('day');
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                      atmosphereMode === 'day'
                        ? 'bg-emerald-500/30 text-emerald-300 font-bold shadow-xs'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Sun className="w-3 h-3" />
                    <span className="hidden sm:inline">Day</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sound.click();
                      onToggleAtmosphere('night');
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                      atmosphereMode === 'night'
                        ? 'bg-cyan-500/30 text-cyan-300 font-bold shadow-xs'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Moon className="w-3 h-3" />
                    <span className="hidden sm:inline">Night</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ==============================================================
            LAYER 2: 3D POLISHED GOLD-CHROME SCULPTURAL WORDMARK ("FOOD · BRIDGE")
            Dedicated display band between the Hero Console and the Stats Cards
            so it never collides with or obscures the 4 KPI cards below
        ============================================================== */}
        <div className="relative flex items-baseline justify-center select-none pointer-events-none py-1 sm:py-2 overflow-hidden">
          <div
            className="flex items-baseline gap-1.5 sm:gap-3 md:gap-4 lg:gap-6 opacity-90 transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(${tilt.px}px, ${tilt.py}px, 0)`,
            }}
          >
            {['F', 'O', 'O', 'D'].map((char, i) => (
              <span
                key={`f-${i}`}
                className="letter-3d-metallic text-4xl sm:text-6xl md:text-7xl lg:text-[96px] leading-none"
              >
                {char}
              </span>
            ))}

            {/* Glowing Emerald Biomolecular / Civic Sphere */}
            <span className="letter-3d-sphere mx-1 sm:mx-2 self-center mb-2 sm:mb-4" />

            {['B', 'R', 'I', 'D', 'G', 'E'].map((char, i) => (
              <span
                key={`b-${i}`}
                className="letter-3d-metallic text-4xl sm:text-6xl md:text-7xl lg:text-[96px] leading-none"
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* ==============================================================
            LAYER 3: THE COMPOSE STATSCARD GLASS ROW
            Direct implementation of the user's reference StatsCard component
        ============================================================== */}
        <div className="relative z-20">
          <StatsCardGrid
            onOpenDonateModal={() => onOpenDonateModal()}
            onOpenLiveTracker={onOpenLiveTracker}
            onOpenPledgeModal={onOpenPledgeModal}
            totalMeals={totalMeals}
          />
        </div>
      </div>
    </section>
  );
};
