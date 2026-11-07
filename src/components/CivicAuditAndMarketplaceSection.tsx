import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Lock,
  MapPin,
  PlusCircle,
  Scale,
  ShieldCheck,
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

export const CivicAuditAndMarketplaceSection: React.FC<
  CivicAuditAndMarketplaceSectionProps
> = ({ onOpenDonateWithWeight, onOpenEsgCertificate, onClaimBatchMeals }) => {
  const [claimedIds, setClaimedIds] = useState<Record<string, boolean>>({});
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'donor' | 'ngo'>('all');

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
            <button
              type="button"
              onClick={() => onOpenDonateWithWeight(45)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold cursor-pointer shadow-sm hover:opacity-95 transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post Surplus Batch</span>
            </button>
          </div>
        </div>

        {/* Live Surplus Batch Cards */}
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
