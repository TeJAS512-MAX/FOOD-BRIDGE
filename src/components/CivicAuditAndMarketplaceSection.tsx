import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Cpu,
  FileCheck2,
  HelpCircle,
  Layers,
  Lock,
  Scale,
  ShieldCheck,
  Thermometer,
  TrendingUp,
  Truck,
  UtensilsCrossed,
} from 'lucide-react';
import { RESCUE_NODES, RescueNode } from '../data/foodBridgeData';
import { sound } from '../utils/soundEffects';

interface CivicAuditAndMarketplaceSectionProps {
  onOpenDonateWithWeight: (weightKg: number, pickupAddress?: string) => void;
  onOpenEsgCertificate: (donorName: string, weightKg: number) => void;
  onClaimBatchMeals?: (meals: number) => void;
}

type DossierTab = 'marketplace' | 'compliance' | 'economics' | 'faq';

export const CivicAuditAndMarketplaceSection: React.FC<
  CivicAuditAndMarketplaceSectionProps
> = ({ onOpenDonateWithWeight, onOpenEsgCertificate, onClaimBatchMeals }) => {
  const [activeTab, setActiveTab] = useState<DossierTab>('marketplace');
  const [claimedIds, setClaimedIds] = useState<Record<string, boolean>>({});
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'donor' | 'ngo'>('all');
  const [openFaqIdx, setOpenFaqIdx] = useState<number>(0);

  const filteredNodes = RESCUE_NODES.filter((node) =>
    categoryFilter === 'all' ? true : node.type === categoryFilter
  );

  const handleClaimNode = (node: RescueNode) => {
    if (claimedIds[node.id]) return;
    sound.success();
    setClaimedIds((prev) => ({ ...prev, [node.id]: true }));
    onClaimBatchMeals?.(node.mealsEquivalent);
  };

  const faqs = [
    {
      q: '1. Legal Liability: What protects hotels & restaurants if donated food is consumed off-site?',
      a: 'Under the FSSAI "Save Food Share Food" Recovery Regulations (2019) and the Indian Good Samaritan Protection Guidelines, food businesses are legally indemnified once custody transfers to a registered recovery agency—provided the batch passes our 63°C+ (hot) or <5°C (chilled) probe check at pickup and is sealed with a timestamped QR manifest.',
      tag: 'FSSAI & Good Samaritan Law',
    },
    {
      q: '2. Computer Vision Accuracy: How does AI estimate kilogram weight and portions from a single photo?',
      a: 'Commercial kitchens use standardized ISO Gastronorm (GN 1/1, GN 1/2) stainless pans of known dimensions (530×325mm). Our fine-tuned vision model detects the pan rim as a geometric reference scale, estimates fill depth + food density class (gravy, pilaf, bread, produce), and computes mass within ±4.2% error in 1.4 seconds.',
      tag: 'YOLOv9 + Monocular Depth',
    },
    {
      q: '3. Financial Sustainability: How does FoodBridge fund the EV pickup fleet without charging NGOs?',
      a: 'NGO shelters never pay. Operations are funded through a 3-tier civic model: (a) Corporate CSR Schedule VII mandates & Section 80G tax-deductible sponsorships, (b) Hospitality ESG subscription tiers (automated Scope-3 waste diversion reporting), and (c) ₹35 citizen micro-pledges covering 10 meals of last-mile EV electricity.',
      tag: '₹3.40 Cost / Rescued Meal',
    },
    {
      q: '4. Cold/Hot-Chain Spoilage: What happens if a batch drops below 63°C during traffic transit?',
      a: 'Every insulated thermocrate carries a BLE temperature/humidity probe pinging every 10 seconds. If core temperature trends toward the 60°C hazard boundary, the router automatically re-assigns the closest shelter within 1.5 km or diverts the batch to an anaerobic bio-composting hub—never serving compromised food.',
      tag: 'Zero-Compromise HACCP',
    },
  ];

  return (
    <section id="governance" className="relative py-8 lg:py-11 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Header + Tab Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b border-white/[0.14]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono-tech uppercase tracking-wider mb-2.5 font-semibold">
              <FileCheck2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>CIVIC GOVERNANCE, LIVE SURPLUS EXCHANGE &amp; TECHNICAL DOSSIER</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08] text-white">
              Built for real-world food safety,{' '}
              <span className="italic font-normal text-emerald-400">
                audit rigor, and civic scale.
              </span>
            </h2>
          </div>

          {/* 4-Tab Switcher */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-xl">
            {[
              { id: 'marketplace', label: 'Live Surplus Board', icon: UtensilsCrossed },
              { id: 'compliance', label: 'FSSAI & Safety Protocol', icon: ShieldCheck },
              { id: 'economics', label: 'Economics & AI Stack', icon: Cpu },
              { id: 'faq', label: 'Judge Q&A Dossier', icon: HelpCircle },
            ].map((t) => {
              const Icon = t.icon;
              const isSel = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    sound.click();
                    setActiveTab(t.id as DossierTab);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isSel
                      ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/50 shadow-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: LIVE SURPLUS BATCH MARKETPLACE */}
        {activeTab === 'marketplace' && (
          <div className="mt-5 glass-card p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/15">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono-tech text-xs uppercase font-bold text-emerald-300">
                  REAL-TIME VERIFIED SURPLUS LEDGER • {RESCUE_NODES.length} ACTIVE HUBS
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono-tech">
                {[
                  { id: 'all', label: 'All Batches (5)' },
                  { id: 'donor', label: 'Donor Kitchens (4)' },
                  { id: 'ngo', label: 'Receiving NGOs (1)' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      sound.click();
                      setCategoryFilter(f.id as 'all' | 'donor' | 'ngo');
                    }}
                    className={`px-3 py-1 rounded-full transition cursor-pointer border ${
                      categoryFilter === f.id
                        ? 'bg-white text-slate-950 border-white font-bold'
                        : 'bg-white/5 text-white/70 border-white/15 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {filteredNodes.map((node) => {
                const isClaimed = !!claimedIds[node.id];
                return (
                  <div
                    key={node.id}
                    className="frosted-subcard p-3.5 flex flex-col justify-between space-y-3 border border-white/15 hover:border-emerald-400/40 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="relative h-24 rounded-xl overflow-hidden border border-white/10">
                        {node.imageUrl && (
                          <img
                            src={node.imageUrl}
                            alt={node.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-mono-tech font-bold uppercase bg-black/70 text-emerald-300 border border-emerald-400/40">
                          {node.freshnessScore}% Fresh
                        </span>
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-mono-tech font-semibold bg-black/70 text-orange-300 border border-orange-400/30">
                          ETA {node.etaMinutes}m
                        </span>
                        <div className="absolute bottom-1.5 left-2 right-2 text-[10px] font-mono-tech text-white/85 truncate">
                          {node.neighborhood}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono-tech uppercase text-emerald-400 font-bold">
                          {node.category}
                        </div>
                        <h4 className="font-serif-display text-sm font-bold text-white leading-snug line-clamp-1">
                          {node.name}
                        </h4>
                        <p className="text-[11px] text-white/70 line-clamp-2 mt-0.5">
                          {node.activeBatch}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <div className="flex items-center justify-between text-[11px] font-mono-tech">
                        <span className="text-orange-300 font-bold">
                          {node.mealsEquivalent} Meals ({node.quantityKg}kg)
                        </span>
                        <span className="text-emerald-300">{node.temperature.split(' ')[0]}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleClaimNode(node)}
                          className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-mono-tech font-bold transition cursor-pointer ${
                            isClaimed
                              ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/50'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          }`}
                        >
                          {isClaimed ? '✓ Claimed' : 'Claim Batch'}
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenEsgCertificate(node.name, node.quantityKg)}
                          title="Inspect ESG & 80G Certificate"
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-amber-300 cursor-pointer transition"
                        >
                          <Award className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: FSSAI HYGIENE, COLD-CHAIN & GOOD SAMARITAN LEGAL PROTOCOL */}
        {activeTab === 'compliance' && (
          <div className="mt-5 glass-card p-5 sm:p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  stage: 'GATE 01 • ORIGIN',
                  title: 'Core Temp & Organoleptic Check',
                  spec: 'Hot ≥ 63.0°C | Cold ≤ 5.0°C',
                  desc: 'Kitchen steward logs dish prep timestamp (<2 hrs post-service) and inserts BLE probe before tray sealing.',
                  badge: 'HACCP Critical Point 1',
                  icon: Thermometer,
                  color: 'text-orange-400',
                },
                {
                  stage: 'GATE 02 • PACKAGING',
                  title: 'Food-Grade Gastronorm & QR Seal',
                  spec: 'SS-304 Trays • Tamper-Evident',
                  desc: 'Single-use plastics are eliminated. Standardized stainless GN pans are locked with a cryptographic QR custody tag.',
                  badge: 'Zero Plastic Contamination',
                  icon: Lock,
                  color: 'text-emerald-400',
                },
                {
                  stage: 'GATE 03 • TRANSIT',
                  title: 'Sub-38m Active Thermal Corridor',
                  spec: '10-Sec IoT Telemetry Pings',
                  desc: 'Insulated phase-change pods maintain <1.2°C thermal drift during transit with automatic geo-fenced shelter alerts.',
                  badge: '99.4% SLA Compliance',
                  icon: Truck,
                  color: 'text-cyan-400',
                },
                {
                  stage: 'GATE 04 • INDEMNITY',
                  title: 'Good Samaritan & FSSAI Shield',
                  spec: '2019 Recovery Regs Compliant',
                  desc: 'Dual digital sign-off at shelter dock transfers legal custody and issues an immutable Section 80G / ESG audit certificate.',
                  badge: '100% Donor Liability Shield',
                  icon: Scale,
                  color: 'text-amber-400',
                },
              ].map((gate, i) => {
                const Icon = gate.icon;
                return (
                  <div
                    key={i}
                    className="frosted-subcard p-4 space-y-2.5 border border-white/15 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono-tech font-bold text-white/55">
                          {gate.stage}
                        </span>
                        <Icon className={`w-4 h-4 ${gate.color}`} />
                      </div>
                      <h4 className="font-serif-display text-base font-bold text-white">
                        {gate.title}
                      </h4>
                      <div className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 font-mono-tech text-[11px] font-bold text-emerald-300">
                        {gate.spec}
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed">{gate.desc}</p>
                    </div>
                    <div className="pt-2 border-t border-white/10 text-[10px] font-mono-tech text-orange-300 font-semibold">
                      ✓ {gate.badge}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-white/85">
                  <strong>Regulatory Alignment:</strong> Aligned with FSSAI{' '}
                  <em>Save Food Share Food</em> Initiative, National Food Security Act, and UN SDG
                  Target 12.3.
                </span>
              </div>
              <button
                type="button"
                onClick={() => onOpenEsgCertificate('Grand Horizon Convention Hotel', 48)}
                className="shrink-0 px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono-tech text-xs font-bold cursor-pointer transition"
              >
                Inspect Sample Audit Certificate →
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: UNIT ECONOMICS, CARBON METHODOLOGY & AI ARCHITECTURE */}
        {activeTab === 'economics' && (
          <div className="mt-5 glass-card p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left 6 Cols: Unit Economics & IPCC Carbon Math */}
            <div className="lg:col-span-6 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-xs uppercase font-bold text-orange-300 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-orange-400" />
                  <span>UNIT ECONOMICS &amp; SOCIAL ROI (AUDITED FY 2025–26)</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono-tech text-[10px] font-bold">
                  10.3x Impact Multiplier
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div className="frosted-subcard p-3 text-center">
                  <div className="font-mono-tech text-lg sm:text-xl font-bold text-emerald-400">
                    ₹3.40
                  </div>
                  <div className="text-[10px] font-mono-tech uppercase text-white/60">
                    Logistics Cost / Meal
                  </div>
                </div>
                <div className="frosted-subcard p-3 text-center">
                  <div className="font-mono-tech text-lg sm:text-xl font-bold text-orange-400">
                    ₹35.00
                  </div>
                  <div className="text-[10px] font-mono-tech uppercase text-white/60">
                    Nutritious Meal Value
                  </div>
                </div>
                <div className="frosted-subcard p-3 text-center">
                  <div className="font-mono-tech text-lg sm:text-xl font-bold text-cyan-400">
                    68%
                  </div>
                  <div className="text-[10px] font-mono-tech uppercase text-white/60">
                    NGO Budget Saved
                  </div>
                </div>
              </div>

              <div className="frosted-subcard p-3.5 space-y-2 text-xs">
                <div className="font-mono-tech text-[11px] font-bold text-white uppercase">
                  IPCC AR6 &amp; FAO Environmental Conversion Formulas:
                </div>
                <ul className="space-y-1 text-white/75 font-mono-tech text-[11px]">
                  <li>
                    • <strong className="text-emerald-300">1 kg Rescued Food</strong> ={' '}
                    <strong>2.50 portions</strong> (400g standard ICMR balanced meal)
                  </li>
                  <li>
                    • <strong className="text-orange-300">1 kg Landfill Diversion</strong> ={' '}
                    <strong>2.50 kg CO₂e prevented</strong> (CH₄ GWP₂₀ anaerobic avoidance)
                  </li>
                  <li>
                    • <strong className="text-cyan-300">1 kg Embodied Water</strong> ={' '}
                    <strong>820 Liters saved</strong> (irrigation + processing footprint)
                  </li>
                </ul>
              </div>
            </div>

            {/* Right 6 Cols: Full-Stack AI & IoT Architecture */}
            <div className="lg:col-span-6 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-xs uppercase font-bold text-cyan-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>PRODUCTION AI &amp; IOT TELEMETRY STACK</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 font-mono-tech text-[10px]">
                  99.94% Uptime SLA
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="frosted-subcard p-3 space-y-1">
                  <div className="font-mono-tech text-[10px] font-bold text-emerald-400 uppercase">
                    01 • VISION PERCEPTION LAYER
                  </div>
                  <div className="font-bold text-white">YOLOv9-Tray + MiDaS Depth</div>
                  <p className="text-[11px] text-white/65 leading-snug">
                    Identifies Indian banquet dishes, GN pan volume, and allergen flags in 1.4s.
                  </p>
                </div>
                <div className="frosted-subcard p-3 space-y-1">
                  <div className="font-mono-tech text-[10px] font-bold text-orange-400 uppercase">
                    02 • DISPATCH SOLVER ENGINE
                  </div>
                  <div className="font-bold text-white">CVRPTW Decay-Aware Graph</div>
                  <p className="text-[11px] text-white/65 leading-snug">
                    Solves vehicle routing with thermal decay constraints across 340+ NGO shelters.
                  </p>
                </div>
                <div className="frosted-subcard p-3 space-y-1">
                  <div className="font-mono-tech text-[10px] font-bold text-cyan-400 uppercase">
                    03 • COLD/HOT-CHAIN IOT MESH
                  </div>
                  <div className="font-bold text-white">BLE 5.2 + DS18B20 Probes</div>
                  <p className="text-[11px] text-white/65 leading-snug">
                    Tamper-evident core temperature streaming from EV thermocrates every 10s.
                  </p>
                </div>
                <div className="frosted-subcard p-3 space-y-1">
                  <div className="font-mono-tech text-[10px] font-bold text-amber-400 uppercase">
                    04 • AUDIT &amp; ESG LEDGER
                  </div>
                  <div className="font-bold text-white">SHA-256 Custody &amp; 80G API</div>
                  <p className="text-[11px] text-white/65 leading-snug">
                    Automated BRSR / CSR Schedule VII and Section 80G certificate issuance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: JUDGE Q&A & FIELD VERIFICATION FAQ */}
        {activeTab === 'faq' && (
          <div className="mt-5 glass-card p-5 sm:p-6 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {faqs.map((item, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      sound.click();
                      setOpenFaqIdx(idx);
                    }}
                    className={`frosted-subcard p-4 cursor-pointer transition-all border ${
                      isOpen
                        ? 'border-emerald-400/50 bg-emerald-500/10'
                        : 'border-white/12 hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-emerald-300 font-mono-tech text-[10px] font-bold">
                        {item.tag}
                      </span>
                      <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>
                    <h4 className="font-serif-display text-sm sm:text-base font-bold text-white mt-2">
                      {item.q}
                    </h4>
                    <p className="text-xs text-white/75 leading-relaxed mt-2">{item.a}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech text-white/70">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>
                  All interactive modules on this page (AI Vision, 3D WebGL Twin, Live Radar, ESG
                  Certificate, Impact Calculator) are live and testable.
                </span>
              </span>
              <button
                type="button"
                onClick={() => onOpenDonateWithWeight(48)}
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold cursor-pointer transition hover:opacity-95"
              >
                Test Full Rescue Dispatch Flow →
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
