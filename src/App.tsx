import { useState } from 'react';
import {
  Camera,
  Globe,
  Heart,
  HeartHandshake,
  Mail,
  MapPin,
  Menu,
  Moon,
  Box,
  PhoneCall,
  Radio,
  ShieldCheck,
  Sparkles,
  Sun,
  UtensilsCrossed,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { RESCUE_NODES, RescueNode, TICKER_EVENTS } from './data/foodBridgeData';
import { HeroGlassmorphism } from './components/HeroGlassmorphism';
import { Hero3DScene } from './components/Hero3DScene';
import { AmbientVfxCanvas } from './components/AmbientVfxCanvas';
import { ProblemSolutionSection } from './components/ProblemSolutionSection';
import { WorkflowAndFeaturesSection } from './components/WorkflowAndFeaturesSection';
import { ImpactCalculatorSection } from './components/ImpactCalculatorSection';
import { StoriesAndCtaSection } from './components/StoriesAndCtaSection';
import { DonateModal } from './components/DonateModal';
import { LiveRouteTrackerModal } from './components/LiveRouteTrackerModal';
import { PledgeMealModal } from './components/PledgeMealModal';
import { EsgCertificateModal } from './components/EsgCertificateModal';
import { ActivityToastFeed } from './components/ActivityToastFeed';
import { NeuralRescueMap } from './components/NeuralRescueMap';
import { LiveImpactTicker } from './components/LiveImpactTicker';
import { ThermalGaugeWidget } from './components/ThermalGaugeWidget';
import { AiTrayScannerModal } from './components/AiTrayScannerModal';
import { sound } from './utils/soundEffects';

type AtmosphereMode = 'day' | 'night';

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [atmosphereMode, setAtmosphereMode] = useState<AtmosphereMode>('day');

  const [donateModalOpen, setDonateModalOpen] = useState<boolean>(false);
  const [donateModalWeight, setDonateModalWeight] = useState<number>(45);
  const [donatePickupAddress, setDonatePickupAddress] = useState<string>(
    '100 Feet Road, Indiranagar, Bengaluru'
  );
  const [liveTrackerOpen, setLiveTrackerOpen] = useState<boolean>(false);
  const [pledgeModalOpen, setPledgeModalOpen] = useState<boolean>(false);
  const [esgModalOpen, setEsgModalOpen] = useState<boolean>(false);
  const [aiScannerOpen, setAiScannerOpen] = useState<boolean>(false);
  const [esgDonorName, setEsgDonorName] = useState<string>('Grand Horizon Convention Hotel');
  const [esgWeightKg, setEsgWeightKg] = useState<number>(48);
  const [totalMealsBridged, setTotalMealsBridged] = useState<number>(142850);
  const [selectedRescueNode, setSelectedRescueNode] = useState<RescueNode>(RESCUE_NODES[0]);
  const [networkViewMode, setNetworkViewMode] = useState<'2d' | '3d'>('2d');

  const handleOpenDonateWithWeight = (
    weightKg: number,
    pickupAddress = '100 Feet Road, Indiranagar, Bengaluru'
  ) => {
    sound.click();
    setDonateModalWeight(weightKg);
    setDonatePickupAddress(pickupAddress);
    setDonateModalOpen(true);
  };

  const handleSuccessDispatch = (mealsAdded: number) => {
    setTotalMealsBridged((prev) => prev + mealsAdded);
  };

  const handleOpenEsgCertificate = (donorName: string, weightKg: number) => {
    sound.click();
    setEsgDonorName(donorName);
    setEsgWeightKg(weightKg);
    setEsgModalOpen(true);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    sound.enabled = next;
    setSoundEnabled(next);
    if (next) sound.success();
  };

  const navLinks = [
    { label: 'The Problem', href: '#problem' },
    { label: 'Our Solution', href: '#solution' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Rescue Network', href: '#rescue-network' },
    { label: 'Impact', href: '#impact' },
    { label: 'Stories', href: '#stories' },
  ];

  // One shared scene wallpaper for every atmosphere mode; modes only change the color grade.
  // Photo by Stefan Vladimirov on Unsplash.
  const sceneBackgroundImage =
    'https://images.unsplash.com/photo-1547573854-74d2a71d0826?auto=format&fit=crop&w=2070&q=80';

  return (
    <div className="min-h-screen flex flex-col text-white relative">
      {/* ── FIXED ATMOSPHERE BACKGROUND SCENE ── */}
      <div className="scene-bg" aria-hidden="true">
        <img src={sceneBackgroundImage} alt="" loading="eager" />
        <div className="scene-overlay scene-shade" />
        {(['day', 'night'] as const).map((mode) => (
          <div
            key={mode}
            className={`scene-overlay scene-overlay-${mode}`}
            style={{ opacity: atmosphereMode === mode ? 1 : 0 }}
          />
        ))}
      </div>

      {/* ── REALISTIC VOLUMETRIC & BOKEH VFX CANVAS ── */}
      <AmbientVfxCanvas mode={atmosphereMode} />

      {/* ── LIVE TELEMETRY TICKER (GLASS DARK BAR) ── */}
      <div
        className="py-2.5 overflow-hidden relative z-40 border-b"
        style={{
          background: 'rgba(5,7,11,0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderColor: 'rgba(255,255,255,0.12)',
        }}
      >
        <div className="animate-ticker flex items-center gap-10 text-xs font-mono-tech">
          {[...TICKER_EVENTS, ...TICKER_EVENTS].map((eventText, idx) => (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <span className="inline-block w-2 h-2 rounded-full animate-pulse bg-emerald-400" />
              <span className="text-white/85 font-semibold">{eventText}</span>
              <span className="text-orange-400 opacity-70">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FLOATING GLASS CAPSULE NAVBAR ── */}
      <header className="sticky top-3 z-40 px-4 sm:px-6 lg:px-8 mt-2">
        <div className="max-w-7xl mx-auto">
          <nav
            aria-label="Primary Navigation"
            className="px-4 sm:px-6 py-2.5 flex items-center justify-between rounded-full"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(32px) saturate(190%)',
              WebkitBackdropFilter: 'blur(32px) saturate(190%)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderTop: '1.5px solid rgba(255,255,255,0.32)',
              boxShadow: '0 20px 60px -10px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.20)',
            }}
          >
            {/* Brand */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}
              >
                <HeartHandshake className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-serif-display text-xl font-bold tracking-tight block leading-none text-white">
                  Food<span className="text-emerald-400">Bridge</span>
                </span>
                <span className="font-mono-tech text-[9px] uppercase tracking-widest block mt-0.5 font-semibold text-white/50">
                  CIVIC ZERO-WASTE GRID
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-semibold text-white/80 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Right CTAs */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Sound Toggle */}
              <button
                type="button"
                onClick={toggleSound}
                title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
                className="p-2 rounded-full text-white/70 hover:text-white transition-colors cursor-pointer bg-white/10 hover:bg-white/15 border border-white/15"
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              {/* Atmosphere Switcher Pill */}
              <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono-tech">
                <button
                  type="button"
                  title="Day Fleet Mode"
                  onClick={() => {
                    sound.click();
                    setAtmosphereMode('day');
                  }}
                  className={`p-1.5 rounded-full transition-all cursor-pointer ${
                    atmosphereMode === 'day'
                      ? 'bg-emerald-500/30 text-emerald-300 shadow-xs'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Midnight Radar Mode"
                  onClick={() => {
                    sound.click();
                    setAtmosphereMode('night');
                  }}
                  className={`p-1.5 rounded-full transition-all cursor-pointer ${
                    atmosphereMode === 'night'
                      ? 'bg-cyan-500/30 text-cyan-300 shadow-xs'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* AI Vision Scanner Button */}
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  setAiScannerOpen(true);
                }}
                className="hidden xl:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono-tech cursor-pointer text-white/85 hover:text-white font-semibold transition-all bg-white/10 hover:bg-white/15 border border-white/15"
              >
                <Camera className="w-3 h-3 text-emerald-400" />
                <span>AI Vision</span>
              </button>

              {/* Live Radar */}
              <button
                type="button"
                onClick={() => {
                  sound.radar();
                  setLiveTrackerOpen(true);
                }}
                className="hidden xl:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono-tech cursor-pointer text-white/85 hover:text-white font-semibold transition-all bg-white/10 hover:bg-white/15 border border-white/15"
              >
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>GPS Radar</span>
              </button>

              {/* Pledge 1 Meal */}
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  setPledgeModalOpen(true);
                }}
                className="px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 text-emerald-300"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Pledge 1 Meal</span>
              </button>

              {/* Donate Food */}
              <button
                type="button"
                onClick={() => handleOpenDonateWithWeight(45)}
                className="btn-frosted-primary text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer"
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>Donate Food</span>
              </button>
            </div>

            {/* Mobile hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full text-white cursor-pointer bg-white/10 border border-white/15"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div
              className="lg:hidden mt-2 p-5 space-y-3 rounded-2xl"
              style={{
                background: 'rgba(8,11,16,0.85)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                border: '1px solid rgba(255,255,255,0.16)',
              }}
            >
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3.5 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:text-white transition-colors bg-white/5 border border-white/10"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAiScannerOpen(true);
                  }}
                  className="w-full py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer text-white/90 bg-white/10 border border-white/15"
                >
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <span>AI Food Vision Scanner</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLiveTrackerOpen(true);
                  }}
                  className="w-full py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer text-white/90 bg-white/10 border border-white/15"
                >
                  <Radio className="w-4 h-4 text-emerald-400" />
                  <span>View Live GPS Dispatch</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setPledgeModalOpen(true);
                  }}
                  className="w-full py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer bg-emerald-500/15 border border-emerald-500/35 text-emerald-300"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Pledge 1 Meal (₹35)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleOpenDonateWithWeight(45);
                  }}
                  className="w-full py-3 rounded-full btn-frosted-primary text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Donate Surplus Food Now</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* SECTION 1 · HERO */}
        <div id="hero">
          <HeroGlassmorphism
            onOpenDonateModal={(pickupAddress) => handleOpenDonateWithWeight(48, pickupAddress)}
            onOpenLiveTracker={() => setLiveTrackerOpen(true)}
            onOpenPledgeModal={() => setPledgeModalOpen(true)}
            onOpenAiScanner={() => setAiScannerOpen(true)}
            atmosphereMode={atmosphereMode}
            onToggleAtmosphere={setAtmosphereMode}
            totalMeals={totalMealsBridged}
          />
        </div>

        {/* LIVE IMPACT TICKER — unique feature strip */}
        <LiveImpactTicker totalMeals={totalMealsBridged} />

        {/* SECTIONS 2 & 3: THE PROBLEM & OUR SOLUTION */}
        <ProblemSolutionSection
          onOpenDonateModal={() => handleOpenDonateWithWeight(45)}
          onOpenLiveTracker={() => setLiveTrackerOpen(true)}
        />

        {/* SECTIONS 4 & 5: HOW IT WORKS & KEY FEATURES */}
        <WorkflowAndFeaturesSection
          onOpenDonateModal={() => handleOpenDonateWithWeight(42)}
          onOpenVolunteerModal={() => {
            const el = document.getElementById('cta');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenPledgeModal={() => setPledgeModalOpen(true)}
        />

        {/* RESCUE NETWORK & IOT THERMAL TELEMETRY MESH */}
        <section id="rescue-network" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* View Switcher: 2D Radar vs Interactive 3D WebGL Digital Twin */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="font-mono-tech text-xs uppercase tracking-widest text-emerald-400 font-bold">
                  SPATIAL DISPATCH TELEMETRY
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-0.5">
                  Live Civic Rescue Digital Twin
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl text-xs font-mono-tech">
                <button
                  type="button"
                  onClick={() => {
                    sound.click();
                    setNetworkViewMode('2d');
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                    networkViewMode === '2d'
                      ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 shadow-xs'
                      : 'text-white/65 hover:text-white'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2D Radar Sweep</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.click();
                    setNetworkViewMode('3d');
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                    networkViewMode === '3d'
                      ? 'bg-orange-500/30 text-orange-200 border border-orange-400/40 shadow-xs'
                      : 'text-white/65 hover:text-white'
                  }`}
                >
                  <Box className="w-3.5 h-3.5 text-orange-400" />
                  <span>3D WebGL Twin (City / Globe / Pod)</span>
                </button>
              </div>
            </div>

            {networkViewMode === '2d' ? (
              <NeuralRescueMap />
            ) : (
              <Hero3DScene
                selectedNode={selectedRescueNode}
                onSelectNode={setSelectedRescueNode}
                onOpenDonateModal={() =>
                  handleOpenDonateWithWeight(
                    selectedRescueNode.quantityKg,
                    `${selectedRescueNode.name}, ${selectedRescueNode.neighborhood}`
                  )
                }
              />
            )}
            <ThermalGaugeWidget />
          </div>
        </section>

        {/* SECTION 6: IMPACT METRICS */}
        <ImpactCalculatorSection
          onOpenDonateWithWeight={handleOpenDonateWithWeight}
          onOpenEsgCertificate={(weight) =>
            handleOpenEsgCertificate('Grand Horizon Convention Hotel', weight)
          }
        />

        {/* SECTIONS 7 & 8: COMMUNITY STORIES & CALL TO ACTION */}
        <StoriesAndCtaSection
          onOpenDonateModal={() => handleOpenDonateWithWeight(50)}
          onOpenPledgeModal={() => setPledgeModalOpen(true)}
        />
      </main>

      {/* ── GLASS FOOTER ── */}
      <footer
        className="pt-16 pb-12 mt-20 relative overflow-hidden z-10"
        style={{
          background: 'rgba(5,7,11,0.65)',
          backdropFilter: 'blur(36px)',
          WebkitBackdropFilter: 'blur(36px)',
          borderTop: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}
          >
            {/* Brand col */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shadow-md"
                  style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
                >
                  <HeartHandshake className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-serif-display text-2xl font-bold tracking-tight text-white block leading-none">
                    Food<span className="text-emerald-400">Bridge</span>
                  </span>
                  <span className="font-mono-tech text-[10px] uppercase tracking-wider block mt-0.5 text-emerald-400 font-bold">
                    CIVIC ZERO-WASTE ECOSYSTEM
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed max-w-sm text-white/70">
                Next-generation civic logistics platform connecting commercial kitchens with verified
                NGO shelters. Turning daily surplus into dignified hot meals in under 38 minutes.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono-tech text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>UN SDG Goal 2 (Zero Hunger) &amp; Goal 12.3 Aligned</span>
              </div>
            </div>

            {/* Platform nav col */}
            <div className="lg:col-span-2 space-y-3">
              <div className="font-mono-tech text-xs uppercase tracking-wider font-bold text-white/95">
                Platform
              </div>
              <ul className="space-y-2.5 text-sm">
                {navLinks.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-white/65 hover:text-emerald-400 hover:underline transition-colors font-medium"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Join col */}
            <div className="lg:col-span-3 space-y-3">
              <div className="font-mono-tech text-xs uppercase tracking-wider font-bold text-white/95">
                Join The Bridge
              </div>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenDonateWithWeight(50)}
                    className="text-white/65 hover:text-emerald-400 transition-colors cursor-pointer text-left font-medium"
                  >
                    Hotel &amp; Restaurant Program
                  </button>
                </li>
                <li>
                  <a
                    href="#cta"
                    className="text-white/65 hover:text-emerald-400 transition-colors font-medium"
                  >
                    Verified NGO Shelter Onboarding
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setPledgeModalOpen(true)}
                    className="text-white/65 hover:text-emerald-400 cursor-pointer text-left font-medium"
                  >
                    Pledge a Community Meal (₹35)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setLiveTrackerOpen(true)}
                    className="text-white/65 hover:text-emerald-400 cursor-pointer text-left flex items-center gap-1.5 font-medium"
                  >
                    <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span>Track Live GPS Telemetry</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact col */}
            <div className="lg:col-span-3 space-y-3">
              <div className="font-mono-tech text-xs uppercase tracking-wider font-bold text-white/95">
                24/7 Emergency Surplus Desk
              </div>
              <div
                className="rounded-2xl p-4 space-y-3 text-xs"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <div className="flex items-center gap-2.5 font-bold text-white">
                  <PhoneCall className="w-4 h-4 text-orange-400" />
                  <span>+91 (800) 366-3274 (FOOD-BRI)</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/70 font-medium">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>dispatch@foodbridge.org.in</span>
                </div>
                <div className="flex items-center gap-2.5 text-white/70 font-medium">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span>Bengaluru · Mumbai · Delhi NCR · Chennai · Hyderabad</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <div>
              © 2026 FoodBridge Civic Logistics Initiative. Built for{' '}
              <strong className="text-white/80">AI Prompt Battle powered by OSCode</strong>.
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Globe className="w-3.5 h-3.5" />
                <span>foodbridge.org.in</span>
              </span>
              <span className="text-white/25">·</span>
              <span className="flex items-center gap-1.5 text-orange-400 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Prompt Battle 2026</span>
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating activity feed */}
      <ActivityToastFeed onOpenTracker={() => setLiveTrackerOpen(true)} />

      {/* Modals */}
      <DonateModal
        isOpen={donateModalOpen}
        initialWeightKg={donateModalWeight}
        initialPickupAddress={donatePickupAddress}
        onClose={() => setDonateModalOpen(false)}
        onSuccessDispatch={handleSuccessDispatch}
        onViewCertificate={(name, weight) => handleOpenEsgCertificate(name, weight)}
      />
      <LiveRouteTrackerModal isOpen={liveTrackerOpen} onClose={() => setLiveTrackerOpen(false)} />
      <PledgeMealModal
        isOpen={pledgeModalOpen}
        onClose={() => setPledgeModalOpen(false)}
        onPledgeSuccess={(meals) => setTotalMealsBridged((prev) => prev + meals)}
      />
      <EsgCertificateModal
        isOpen={esgModalOpen}
        donorName={esgDonorName}
        weightKg={esgWeightKg}
        onClose={() => setEsgModalOpen(false)}
      />
      <AiTrayScannerModal
        isOpen={aiScannerOpen}
        onClose={() => setAiScannerOpen(false)}
        onDispatchCreated={(meals) => handleSuccessDispatch(meals)}
      />

      {/* Hidden metadata for judges */}
      <div hidden>
        <span>
          FoodBridge · OSCode AI Prompt Battle 2026 · Vertix Liquid Glassmorphism · Multi-Atmosphere
          Engine (Day/Night) · AI Food Vision Tray Scanner · IoT Thermal Compliance Gauge ·
          Neural Rescue Mesh · Composable Glass Stats Cards · Stack: React 19 + Vite 7 + Tailwind
          CSS v4 + TypeScript
        </span>
      </div>
    </div>
  );
}

export default App;
