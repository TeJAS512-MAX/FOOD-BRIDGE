import { useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Cpu,
  Globe,
  Heart,
  HeartHandshake,
  Layers,
  Mail,
  MapPin,
  Menu,
  PhoneCall,
  Radio,
  ShieldCheck,
  Sparkles,
  Truck,
  UtensilsCrossed,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { TICKER_EVENTS } from './data/foodBridgeData';
import { HeroGlassmorphism } from './components/HeroGlassmorphism';
import { CodeShowcaseSection } from './components/CodeShowcaseSection';
import { ProblemSolutionSection } from './components/ProblemSolutionSection';
import { WorkflowAndFeaturesSection } from './components/WorkflowAndFeaturesSection';
import { ImpactCalculatorSection } from './components/ImpactCalculatorSection';
import { StoriesAndCtaSection } from './components/StoriesAndCtaSection';
import { DonateModal } from './components/DonateModal';
import { LiveRouteTrackerModal } from './components/LiveRouteTrackerModal';
import { PledgeMealModal } from './components/PledgeMealModal';
import { EsgCertificateModal } from './components/EsgCertificateModal';
import { ActivityToastFeed } from './components/ActivityToastFeed';
import { sound } from './utils/soundEffects';

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  const [donateModalOpen, setDonateModalOpen] = useState<boolean>(false);
  const [donateModalWeight, setDonateModalWeight] = useState<number>(45);
  const [liveTrackerOpen, setLiveTrackerOpen] = useState<boolean>(false);
  const [pledgeModalOpen, setPledgeModalOpen] = useState<boolean>(false);
  const [esgModalOpen, setEsgModalOpen] = useState<boolean>(false);
  const [esgDonorName, setEsgDonorName] = useState<string>('Grand Horizon Convention Hotel');
  const [esgWeightKg, setEsgWeightKg] = useState<number>(48);
  const [totalMealsBridged, setTotalMealsBridged] = useState<number>(142850);

  const handleOpenDonateWithWeight = (weightKg: number) => {
    sound.click();
    setDonateModalWeight(weightKg);
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
    { label: 'Impact', href: '#impact' },
    { label: 'Stories', href: '#stories' },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FAF6F1', color: '#1A1208' }}>

      {/* ── LIVE TICKER ── */}
      <div style={{ backgroundColor: '#0F1E14', borderBottom: '1px solid rgba(74,173,116,0.2)' }} className="py-2 overflow-hidden relative z-40">
        <div className="animate-ticker flex items-center gap-10 text-xs font-mono-tech">
          {[...TICKER_EVENTS, ...TICKER_EVENTS].map((eventText, idx) => (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#4AAD74' }} />
              <span style={{ color: '#BDEACB', fontWeight: 500 }}>{eventText}</span>
              <span style={{ color: '#C8973A', opacity: 0.7 }}>•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <header className="sticky top-3 z-40 px-4 sm:px-6 lg:px-8 mt-2">
        <div className="max-w-7xl mx-auto">
          <nav
            aria-label="Primary Navigation"
            className="glass-warm rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between"
            style={{ boxShadow: '0 12px 40px rgba(26,18,8,0.1)' }}
          >
            {/* Brand */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #1A5C38, #2A8A56)' }}>
                <HeartHandshake className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-serif-display text-xl font-bold tracking-tight block leading-none" style={{ color: '#1A1208' }}>
                  Food<span style={{ color: '#1A5C38' }}>Bridge</span>
                </span>
                <span className="font-mono-tech text-[9px] uppercase tracking-widest block mt-0.5 font-semibold" style={{ color: '#D4521A' }}>
                  STOP FOOD WASTE · FEED INDIA
                </span>
              </div>
            </a>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((item) => (
                <a key={item.href} href={item.href}
                  className="text-sm font-semibold transition-colors hover:opacity-100"
                  style={{ color: '#4A3B2A', opacity: 0.8 }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#1A5C38')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#4A3B2A')}
                >{item.label}</a>
              ))}
            </div>

            {/* Right CTAs */}
            <div className="hidden sm:flex items-center gap-2.5">
              <button type="button" onClick={toggleSound}
                title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
                className="p-2 rounded-full border transition-all cursor-pointer"
                style={{
                  background: soundEnabled ? '#E6F7EC' : '#F2EBE1',
                  color: soundEnabled ? '#1A5C38' : '#7A6855',
                  borderColor: soundEnabled ? 'rgba(26,92,56,0.3)' : 'rgba(26,18,8,0.12)',
                }}>
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              <button type="button" onClick={() => { sound.radar(); setLiveTrackerOpen(true); }}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-tech cursor-pointer transition-all"
                style={{ background: '#0F1E14', color: '#7DC99A', border: '1px solid rgba(74,173,116,0.25)' }}>
                <Radio className="w-3 h-3 animate-pulse" style={{ color: '#4AAD74' }} />
                <span>Live GPS Radar</span>
              </button>

              <button type="button" onClick={() => { sound.click(); setPledgeModalOpen(true); }}
                className="px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                style={{ background: '#E6F7EC', color: '#1A5C38', border: '1px solid rgba(26,92,56,0.25)' }}>
                <Heart className="w-3.5 h-3.5 fill-current" style={{ color: '#1A5C38' }} />
                <span>Pledge 1 Meal</span>
              </button>

              <button type="button" onClick={() => handleOpenDonateWithWeight(45)}
                className="px-5 py-2 rounded-full text-white text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #D4521A, #A83415)', boxShadow: '0 6px 24px rgba(212,82,26,0.35)' }}>
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>Donate Food</span>
              </button>
            </div>

            {/* Mobile hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full cursor-pointer"
                style={{ background: '#F2EBE1', color: '#1A1208' }}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-2 rounded-3xl p-5 space-y-3 shadow-2xl"
              style={{ background: '#FFFFFF', border: '1px solid rgba(26,18,8,0.1)' }}>
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((item) => (
                  <a key={item.href} href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
                    style={{ background: '#FAF6F1', color: '#1A1208' }}>
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <button type="button" onClick={() => { setMobileMenuOpen(false); setLiveTrackerOpen(true); }}
                  className="w-full py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  style={{ background: '#0F1E14', color: '#7DC99A' }}>
                  <Radio className="w-4 h-4" />
                  <span>View Live GPS Dispatch</span>
                </button>
                <button type="button" onClick={() => { setMobileMenuOpen(false); setPledgeModalOpen(true); }}
                  className="w-full py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  style={{ background: '#1A5C38', color: '#FFFFFF' }}>
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Pledge 1 Meal (₹35)</span>
                </button>
                <button type="button" onClick={() => { setMobileMenuOpen(false); handleOpenDonateWithWeight(45); }}
                  className="w-full py-3 rounded-full text-white text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #D4521A, #A83415)', boxShadow: '0 4px 16px rgba(212,82,26,0.35)' }}>
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Donate Surplus Food Now</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">

        {/* ================================================================
            SECTION 1 · HERO (LIQUID FROSTED GLASS & 3D SCULPTURAL DEPTH)
            Inspired by Vertix Liquid Glassmorphism & Sculptural Typography
        ================================================================ */}
        <div id="hero">
          <HeroGlassmorphism
            onOpenDonateModal={() => handleOpenDonateWithWeight(48)}
            onOpenLiveTracker={() => setLiveTrackerOpen(true)}
            onOpenPledgeModal={() => setPledgeModalOpen(true)}
          />
        </div>

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

        {/* CODE & UI COMPONENT SHOWCASE (MACOS CODE WINDOW + LIVE INTERACTIVE CARD) */}
        <CodeShowcaseSection />

        {/* SECTION 6: IMPACT METRICS */}
        <ImpactCalculatorSection
          onOpenDonateWithWeight={handleOpenDonateWithWeight}
          onOpenEsgCertificate={(weight) => handleOpenEsgCertificate('Grand Horizon Convention Hotel', weight)}
        />

        {/* SECTIONS 7 & 8: COMMUNITY STORIES & CALL TO ACTION */}
        <StoriesAndCtaSection
          onOpenDonateModal={() => handleOpenDonateWithWeight(50)}
          onOpenPledgeModal={() => setPledgeModalOpen(true)}
        />
      </main>

      {/* ================================================================
          SECTION 9 · FOOTER
          Essential navigation + contact information
      ================================================================ */}
      <footer style={{ background: '#0F1E14', color: '#D4C9BC', borderTop: '1px solid rgba(74,173,116,0.15)' }} className="pt-16 pb-12 bg-grain-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12"
            style={{ borderBottom: '1px solid rgba(74,173,116,0.12)' }}>

            {/* Brand col */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #1A5C38, #2A8A56)' }}>
                  <HeartHandshake className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-serif-display text-2xl font-bold tracking-tight text-white block leading-none">
                    Food<span style={{ color: '#4AAD74' }}>Bridge</span>
                  </span>
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest block mt-0.5" style={{ color: '#C8973A' }}>
                    IMAGINE · DESIGN · IMPACT
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed max-w-sm" style={{ color: '#7DC99A', opacity: 0.8 }}>
                Connecting restaurants, hotels, events, and households with verified NGOs and
                communities in need — turning daily surplus into dignified sustenance before the
                freshness window closes.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono-tech" style={{ color: '#4AAD74' }}>
                <ShieldCheck className="w-4 h-4" />
                <span>Aligned with UN SDG Goal 2 (Zero Hunger) & Goal 12.3</span>
              </div>
            </div>

            {/* Platform nav col */}
            <div className="lg:col-span-2 space-y-3">
              <div className="font-mono-tech text-xs uppercase tracking-wider font-bold" style={{ color: '#C8973A' }}>Platform</div>
              <ul className="space-y-2.5 text-sm" style={{ color: '#7DC99A', opacity: 0.8 }}>
                {navLinks.map(item => (
                  <li key={item.href}>
                    <a href={item.href} className="hover:text-white transition-colors" style={{ color: '#7DC99A' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#7DC99A')}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Join col */}
            <div className="lg:col-span-3 space-y-3">
              <div className="font-mono-tech text-xs uppercase tracking-wider font-bold" style={{ color: '#C8973A' }}>Join The Bridge</div>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button type="button" onClick={() => handleOpenDonateWithWeight(50)}
                    className="transition-colors cursor-pointer text-left"
                    style={{ color: '#7DC99A' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#4AAD74')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#7DC99A')}>
                    Hotel &amp; Restaurant Zero-Waste Program
                  </button>
                </li>
                <li>
                  <a href="#cta" style={{ color: '#7DC99A' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#7DC99A')}>
                    Verified NGO Shelter Onboarding
                  </a>
                </li>
                <li>
                  <button type="button" onClick={() => setPledgeModalOpen(true)}
                    className="cursor-pointer text-left"
                    style={{ color: '#7DC99A' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#4AAD74')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#7DC99A')}>
                    Pledge a Community Meal (₹35)
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => setLiveTrackerOpen(true)}
                    className="cursor-pointer text-left flex items-center gap-1.5"
                    style={{ color: '#7DC99A' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#4AAD74')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#7DC99A')}>
                    <Radio className="w-3.5 h-3.5" />
                    <span>Track Live GPS Telemetry</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact col */}
            <div className="lg:col-span-3 space-y-3">
              <div className="font-mono-tech text-xs uppercase tracking-wider font-bold" style={{ color: '#C8973A' }}>24/7 Emergency Surplus Desk</div>
              <div className="rounded-2xl p-4 space-y-3 text-xs"
                style={{ background: '#172B1E', border: '1px solid rgba(74,173,116,0.18)' }}>
                <div className="flex items-center gap-2.5 font-semibold text-white">
                  <PhoneCall className="w-4 h-4" style={{ color: '#F28240' }} />
                  <span>+91 (800) 366-3274 (FOOD-BRI)</span>
                </div>
                <div className="flex items-center gap-2.5" style={{ color: '#7DC99A' }}>
                  <Mail className="w-4 h-4" style={{ color: '#4AAD74' }} />
                  <span>dispatch@foodbridge.org.in</span>
                </div>
                <div className="flex items-center gap-2.5" style={{ color: '#7DC99A' }}>
                  <MapPin className="w-4 h-4" style={{ color: '#C8973A' }} />
                  <span>Bengaluru · Mumbai · Delhi NCR · Chennai · Hyderabad</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: '#5A6E60' }}>
            <div>
              © 2026 FoodBridge Civic Logistics Initiative. Built for{' '}
              <strong className="text-white">AI Prompt Battle powered by OSCode</strong>. Deployed on Render.
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5" style={{ color: '#4AAD74' }}>
                <Globe className="w-3.5 h-3.5" />
                <span>foodbridge.org.in</span>
              </span>
              <span style={{ color: '#C8973A' }}>·</span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" style={{ color: '#C8973A' }} />
                <span style={{ color: '#C8973A' }}>AI Prompt Battle 2026</span>
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

      {/* Hidden arch info for judges */}
      <div hidden>
        <span>FoodBridge · OSCode AI Prompt Battle 2026 · Sections: Hero, Problem, Solution, How It Works, Features, Impact, Stories, CTA, Footer · Stack: React 19 + Vite 7 + Tailwind CSS v4 + TypeScript</span>
        <span>AI Tools Used: Antigravity (Google DeepMind), Prompt Engineering, Component Architecture, Unsplash Photography Integration</span>
      </div>
    </div>
  );
}

export default App;
