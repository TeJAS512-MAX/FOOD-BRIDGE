import React, { useState } from 'react';
import {
  Award,
  Building2,
  CalendarClock,
  CheckCircle2,
  Clock,
  Lock,
  MapPin,
  PlusCircle,
  Scale,
  ShieldCheck,
  Sparkles,
  Thermometer,
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

type ExchangeMode = 'batches' | 'shelters' | 'predictor';

export const CivicAuditAndMarketplaceSection: React.FC<
  CivicAuditAndMarketplaceSectionProps
> = ({ onOpenDonateWithWeight, onOpenEsgCertificate, onClaimBatchMeals }) => {
  const [exchangeMode, setExchangeMode] = useState<ExchangeMode>('batches');
  const [claimedIds, setClaimedIds] = useState<Record<string, boolean>>({});
  const [fulfilledShelters, setFulfilledShelters] = useState<Record<string, boolean>>({});
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'donor' | 'ngo'>('all');

  // Wedding & Banquet Surplus Predictor State
  const [guestCount, setGuestCount] = useState<number>(450);
  const [eventType, setEventType] = useState<'wedding' | 'conference' | 'festival'>('wedding');
  const [venueCity, setVenueCity] = useState<string>('Indiranagar, Bengaluru');
  const [standbyBooked, setStandbyBooked] = useState<boolean>(false);

  const surplusPerGuestKg =
    eventType === 'wedding' ? 0.14 : eventType === 'festival' ? 0.12 : 0.09;
  const predictedKg = Math.round(guestCount * surplusPerGuestKg);
  const predictedMeals = predictedKg * 4;
  const predictedCo2Kg = Math.round(predictedKg * 2.5);

  const shelterNeeds = [
    {
      id: 'sh-1',
      name: 'Annapurna Seva Community Kitchen',
      area: 'Ulsoor, Bengaluru',
      totalCapacity: 250,
      filledPlates: 170,
      cutoffTime: '21:30 IST',
      dietary: '100% Vegetarian · Low-Spice Senior Friendly',
      coldStorage: '80 kg Chilled Room Available',
    },
    {
      id: 'sh-2',
      name: 'Sunrise Children’s Home & Night Shelter',
      area: 'Koramangala 4th Block',
      totalCapacity: 180,
      filledPlates: 115,
      cutoffTime: '21:00 IST',
      dietary: 'Nut-Free · Rice, Dal & Bakery Loaves',
      coldStorage: '45 kg Refrigerator Ready',
    },
    {
      id: 'sh-3',
      name: 'Karuna Daily-Wage Family Sanctuary',
      area: 'Jayanagar South',
      totalCapacity: 320,
      filledPlates: 210,
      cutoffTime: '22:15 IST',
      dietary: 'High-Protein Grains & Hot Curries',
      coldStorage: '120 kg Walk-In Cooler Ready',
    },
  ];

  const filteredNodes = RESCUE_NODES.filter((node) =>
    categoryFilter === 'all' ? true : node.type === categoryFilter
  );

  const handleClaimNode = (node: RescueNode) => {
    if (claimedIds[node.id]) return;
    sound.success();
    setClaimedIds((prev) => ({ ...prev, [node.id]: true }));
    onClaimBatchMeals?.(node.mealsEquivalent);
  };

  return (
    <section id="governance" className="relative py-8 lg:py-11 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-white/[0.14]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono-tech uppercase tracking-wider mb-2.5 font-semibold">
              <UtensilsCrossed className="w-3.5 h-3.5 text-emerald-400" />
              <span>LIVE KITCHEN SURPLUS EXCHANGE</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08] text-white">
              Available meal batches ready for{' '}
              <span className="italic font-normal text-emerald-400">
                immediate shelter pickup.
              </span>
            </h2>
          </div>

          {/* 3-Mode Exchange Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-xl">
            {[
              { id: 'batches', label: 'Live Surplus Batches', icon: UtensilsCrossed },
              { id: 'shelters', label: 'Shelter Dinner Deficit', icon: Building2 },
              { id: 'predictor', label: 'Event Surplus Predictor', icon: CalendarClock },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSel = exchangeMode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    sound.click();
                    setExchangeMode(tab.id as ExchangeMode);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                    isSel
                      ? 'bg-emerald-500/25 text-white border-emerald-400 shadow-xs'
                      : 'text-white/75 border-transparent hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MODE 1: LIVE SURPLUS BATCH CARDS */}
        {exchangeMode === 'batches' && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: 'All Active Batches' },
                  { id: 'donor', label: 'Donor Kitchens' },
                  { id: 'ngo', label: 'Receiving Shelters' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      sound.click();
                      setCategoryFilter(f.id as 'all' | 'donor' | 'ngo');
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer border ${
                      categoryFilter === f.id
                        ? 'bg-emerald-500/25 text-white border-emerald-400 shadow-xs'
                        : 'bg-white/5 text-white/75 border-white/15 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onOpenDonateWithWeight(45)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold cursor-pointer shadow-sm hover:opacity-95 transition"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Post Surplus Batch</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {filteredNodes.map((node) => {
                const isClaimed = !!claimedIds[node.id];
                return (
                  <div
                    key={node.id}
                    className="glass-card p-4 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2.5">
                      <div className="relative h-28 rounded-xl overflow-hidden border border-white/15">
                        {node.imageUrl && (
                          <img
                            src={node.imageUrl}
                            alt={node.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-mono-tech font-bold uppercase bg-black/75 text-emerald-300 border border-emerald-400/40">
                          {node.freshnessScore}% Fresh
                        </span>
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-mono-tech font-semibold bg-black/75 text-orange-300 border border-orange-400/30">
                          ETA {node.etaMinutes}m
                        </span>
                        <div className="absolute bottom-1.5 left-2 right-2 flex items-center gap-1 text-[10px] font-mono-tech text-white/90 truncate">
                          <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{node.neighborhood}</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono-tech uppercase text-emerald-400 font-bold">
                          {node.category}
                        </div>
                        <h4 className="font-serif-display text-base font-bold text-white leading-snug line-clamp-1 mt-0.5">
                          {node.name}
                        </h4>
                        <p className="text-xs text-white/75 line-clamp-2 mt-1 leading-relaxed">
                          {node.activeBatch}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-2.5 border-t border-white/15">
                      <div className="flex items-center justify-between text-xs font-mono-tech">
                        <span className="text-orange-300 font-bold">
                          {node.mealsEquivalent} Meals ({node.quantityKg} kg)
                        </span>
                        <span className="text-emerald-300 font-semibold">
                          {node.temperature.split(' ')[0]}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleClaimNode(node)}
                          className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-mono-tech font-bold transition cursor-pointer ${
                            isClaimed
                              ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/50'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
                          }`}
                        >
                          {isClaimed ? '✓ Reserved' : 'Reserve Batch'}
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenEsgCertificate(node.name, node.quantityKg)}
                          title="View Official 80G & ESG Certificate"
                          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-amber-300 cursor-pointer transition"
                        >
                          <Award className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* MODE 2: TWO-SIDED SHELTER DINNER DEFICIT BOARD ("WHO NEEDS MEALS TONIGHT") */}
        {exchangeMode === 'shelters' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {shelterNeeds.map((sh) => {
              const isFilled = !!fulfilledShelters[sh.id];
              const currentFilled = isFilled ? sh.totalCapacity : sh.filledPlates;
              const deficit = Math.max(0, sh.totalCapacity - currentFilled);
              const pct = Math.round((currentFilled / sh.totalCapacity) * 100);
              return (
                <div
                  key={sh.id}
                  className="glass-card p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech font-bold uppercase bg-orange-500/20 text-orange-300 border border-orange-400/40">
                        {isFilled ? '100% Dinner Met ✓' : `${deficit} Plates Needed`}
                      </span>
                      <span className="text-xs font-mono-tech text-white/75 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-400" />
                        <span>By {sh.cutoffTime}</span>
                      </span>
                    </div>
                    <div>
                      <h4 className="font-serif-display text-lg font-bold text-white">
                        {sh.name}
                      </h4>
                      <p className="text-xs text-white/70 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{sh.area}</span>
                      </p>
                    </div>
                    {/* Capacity Progress Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-xs font-mono-tech">
                        <span className="text-white/80">Tonight’s Dinner Fill</span>
                        <span className="text-emerald-300 font-bold">
                          {currentFilled} / {sh.totalCapacity} Plates ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            background: 'linear-gradient(90deg, #10B981, #F97316)',
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-1 text-xs text-white/80 pt-1">
                      <div>
                        <strong className="text-emerald-300">Dietary:</strong> {sh.dietary}
                      </div>
                      <div>
                        <strong className="text-cyan-300">Cold Chain:</strong> {sh.coldStorage}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!isFilled) {
                        sound.success();
                        setFulfilledShelters((prev) => ({ ...prev, [sh.id]: true }));
                        onClaimBatchMeals?.(deficit);
                      } else {
                        onOpenDonateWithWeight(Math.round(deficit / 4) || 25, sh.area);
                      }
                    }}
                    className={`w-full py-2.5 rounded-xl text-xs font-mono-tech font-bold transition cursor-pointer ${
                      isFilled
                        ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/50'
                        : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm hover:opacity-95'
                    }`}
                  >
                    {isFilled
                      ? '✓ All Plates Fulfilled Tonight'
                      : `Supply Remaining ${deficit} Meals (${Math.ceil(deficit / 4)} kg) →`}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* MODE 3: AI WEDDING & BANQUET SURPLUS PRE-BOOKING PREDICTOR */}
        {exchangeMode === 'predictor' && (
          <div className="glass-card p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase text-orange-300 font-bold">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>ZERO-WASTE WEDDING &amp; BANQUET STANDBY RESERVATION</span>
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-white">
                Pre-book a Standby Thermal EV Van before your event begins.
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'wedding', label: 'Wedding Banquet' },
                  { id: 'conference', label: 'Corporate Gala' },
                  { id: 'festival', label: 'Festival Feast' },
                ].map((ev) => (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => {
                      sound.click();
                      setEventType(ev.id as 'wedding' | 'conference' | 'festival');
                      setStandbyBooked(false);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                      eventType === ev.id
                        ? 'bg-emerald-500/25 text-white border-emerald-400'
                        : 'bg-white/5 text-white/75 border-white/15 hover:text-white'
                    }`}
                  >
                    {ev.label}
                  </button>
                ))}
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono-tech">
                  <span className="text-white/80">EXPECTED GUEST HEADCOUNT</span>
                  <span className="text-emerald-300 font-bold">{guestCount} Guests</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={1500}
                  step={50}
                  value={guestCount}
                  onChange={(e) => {
                    setGuestCount(Number(e.target.value));
                    setStandbyBooked(false);
                    sound.sliderTick(Number(e.target.value));
                  }}
                  className="w-full h-2 bg-white/15 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
              <input
                type="text"
                value={venueCity}
                onChange={(e) => setVenueCity(e.target.value)}
                placeholder="Enter Banquet Hall or Venue Address..."
                className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm"
              />
            </div>

            <div className="lg:col-span-6 frosted-subcard p-5 space-y-4 border border-white/15">
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <div>
                  <div className="text-[10px] font-mono-tech uppercase text-emerald-300 font-bold">
                    PREDICTED UNSERVED SURPLUS
                  </div>
                  <div className="font-serif-display text-2xl font-bold text-white">
                    ~{predictedKg} kg ({predictedMeals} Hot Meals)
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono-tech text-xs font-bold">
                  -{predictedCo2Kg} kg CO₂e
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono-tech">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-white/60">STANDBY FLEET SLOT</div>
                  <div className="text-white font-bold mt-0.5">23:15 IST Teardown</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-white/60">MATCHED SHELTER</div>
                  <div className="text-emerald-300 font-bold mt-0.5">Annapurna Seva (2.1km)</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    sound.success();
                    setStandbyBooked(true);
                    onOpenDonateWithWeight(predictedKg, venueCity);
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs cursor-pointer transition hover:opacity-95"
                >
                  {standbyBooked
                    ? '✓ Standby EV Pod Reserved'
                    : `Reserve Standby EV Van (${predictedKg} kg)`}
                </button>
                <button
                  type="button"
                  onClick={() => onOpenEsgCertificate(venueCity, predictedKg)}
                  className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-emerald-300 cursor-pointer transition"
                >
                  Guest Certificate
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4-Pillar Food Safety & Legal Protection Guarantee Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[
            {
              title: 'FSSAI Core Temp Checked',
              spec: 'Hot ≥ 63°C · Cold ≤ 5°C',
              desc: 'Every batch is probe-verified before leaving the kitchen loading bay.',
              icon: Thermometer,
              color: 'text-orange-400',
            },
            {
              title: 'Tamper-Proof QR Custody',
              spec: 'SS-304 Gastronorm Pods',
              desc: 'Sealed food-grade stainless containers with digital timestamp sign-off.',
              icon: Lock,
              color: 'text-emerald-400',
            },
            {
              title: 'Sub-38m Thermal Fleet',
              spec: 'Live GPS + IoT Telemetry',
              desc: 'Dedicated EV vans and riders routed to the nearest verified shelter.',
              icon: Truck,
              color: 'text-cyan-400',
            },
            {
              title: 'Good Samaritan Protected',
              spec: 'Zero Donor Liability + 80G',
              desc: 'Full legal indemnity for donors with instant CSR & 80G tax receipts.',
              icon: Scale,
              color: 'text-amber-400',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="frosted-subcard p-4 border border-white/15 flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                  <Icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-serif-display text-sm font-bold text-white truncate">
                      {item.title}
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  </div>
                  <div className="font-mono-tech text-[10px] font-bold text-emerald-300">
                    {item.spec}
                  </div>
                  <p className="text-[11px] text-white/70 leading-snug">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-white/90">
              All food recovery dispatches comply with <strong>FSSAI Save Food Share Food</strong>{' '}
              hygiene regulations and issue instant <strong>Section 80G &amp; ESG</strong> audit
              certificates.
            </span>
          </div>
          <button
            type="button"
            onClick={() => onOpenEsgCertificate('Grand Horizon Convention Hotel', 48)}
            className="shrink-0 px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono-tech text-xs font-bold cursor-pointer transition"
          >
            View Official Certificate →
          </button>
        </div>
      </div>
    </section>
  );
};
