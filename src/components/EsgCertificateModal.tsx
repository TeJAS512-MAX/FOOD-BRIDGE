import React, { useEffect, useState } from 'react';
import {
  Award,
  CheckCircle2,
  Download,
  FileCheck2,
  Leaf,
  MapPin,
  Printer,
  QrCode,
  ShieldCheck,
  Sparkles,
  Thermometer,
  X,
} from 'lucide-react';
import { COMMUNITY_STORIES } from '../data/foodBridgeData';
import { sound } from '../utils/soundEffects';

interface EsgCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  donorName?: string;
  weightKg?: number;
}

export const EsgCertificateModal: React.FC<EsgCertificateModalProps> = ({
  isOpen,
  onClose,
  donorName = 'Grand Horizon Convention Hotel',
  weightKg = 48,
}) => {
  const [selectedProfileIdx, setSelectedProfileIdx] = useState<number>(0);
  const [downloadedNotice, setDownloadedNotice] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    setDownloadedNotice(false);
    const matchIdx = COMMUNITY_STORIES.findIndex(
      (s) =>
        donorName.toLowerCase().includes(s.name.split(' ')[1]?.toLowerCase() || '') ||
        donorName.toLowerCase().includes(s.organization.split(' ')[0].toLowerCase())
    );
    setSelectedProfileIdx(matchIdx >= 0 ? matchIdx : 0);
  }, [isOpen, donorName]);

  if (!isOpen) return null;

  const activeStory = COMMUNITY_STORIES[selectedProfileIdx] || COMMUNITY_STORIES[0];
  const effectiveWeight =
    selectedProfileIdx === 0 && weightKg ? weightKg : activeStory.certificateWeightKg;
  const effectiveRecipient =
    selectedProfileIdx === 0 && donorName
      ? `${activeStory.name} • ${donorName}`
      : `${activeStory.name} • ${activeStory.organization}`;

  const certificateId = activeStory.verifiedBatchId || 'FB-ESG-2026-9941';
  const mealsCount = Math.round(effectiveWeight * 4);
  const co2Saved = Math.round(effectiveWeight * 2.5);
  const waterSaved = Math.round(effectiveWeight * 820);
  const treesEquivalent = Math.max(1, Math.round(co2Saved / 21));
  const issueDate = '17 April 2026 • 21:42 IST';
  const ledgerHash = `0x9F4B...${certificateId.slice(-4)}E8A2`;

  const handlePrint = () => {
    sound.click();
    window.print();
  };

  const handleDownload = () => {
    sound.success();
    setDownloadedNotice(true);
    setTimeout(() => setDownloadedNotice(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#091312] text-white border border-white/20 rounded-3xl shadow-[0_40px_120px_-15px_rgba(0,0,0,0.85)] overflow-hidden max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="bg-white/[0.05] text-white px-5 sm:px-7 py-4 flex items-center justify-between border-b border-white/[0.14]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono-tech text-xs uppercase tracking-wider text-emerald-300 font-bold block">
                OFFICIAL ZERO-WASTE ESG &amp; SECTION 80G IMPACT CERTIFICATE
              </span>
              <span className="text-[11px] text-white/60 font-mono-tech">
                ISO-14064 Carbon Accounting • FSSAI Hygiene Audited • Good Samaritan Protected
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.click();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/[0.10] hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white cursor-pointer transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Recipient Avatar & Profile Switcher Bar */}
        <div className="px-5 sm:px-7 py-3 bg-black/40 border-b border-white/10 flex items-center gap-2 overflow-x-auto">
          <span className="text-[11px] font-mono-tech uppercase text-white/50 shrink-0 mr-1">
            Recipient Profile:
          </span>
          {COMMUNITY_STORIES.map((story, idx) => {
            const isSel = selectedProfileIdx === idx;
            return (
              <button
                key={story.id}
                type="button"
                onClick={() => {
                  sound.click();
                  setSelectedProfileIdx(idx);
                }}
                className={`shrink-0 flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                  isSel
                    ? 'bg-emerald-500/25 text-emerald-200 border-emerald-400/50 shadow-sm'
                    : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                <img
                  src={story.avatarUrl}
                  alt={story.name}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-white/30"
                />
                <span>{story.name}</span>
                <span className="text-[10px] font-mono-tech opacity-70">({story.role.split(' ')[0]})</span>
              </button>
            );
          })}
        </div>

        {/* Certificate Printable Canvas */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5">
          <div className="rounded-3xl border-4 border-double border-emerald-900/25 bg-gradient-to-b from-[#FFFDF7] via-white to-[#F7FBF8] p-5 sm:p-7 text-slate-900 space-y-5 shadow-xl relative overflow-hidden">
            {/* Watermark seal */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <ShieldCheck className="w-80 h-80 text-emerald-900" />
            </div>

            {/* Top Bar: Accreditation & Ledger ID */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-emerald-900/15 text-[11px] font-mono-tech">
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>FOODBRIDGE CIVIC ZERO-WASTE REGISTRY • INDIA</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
                  ID: {certificateId}
                </span>
                <span className="text-slate-500 hidden sm:inline">{issueDate}</span>
              </div>
            </div>

            {/* Title & Recipient Avatar Card */}
            <div className="relative z-10 text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-[10px] font-mono-tech uppercase tracking-widest font-bold">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>UN SDG GOAL 2 &amp; GOAL 12.3 VERIFIED CREDENTIAL</span>
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Certificate of Verified Social &amp; Climate Impact
              </h2>
            </div>

            {/* Featured Recipient Avatar + Verified Identity Dossier */}
            <div className="relative z-10 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-4 sm:p-5 shadow-md border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-left">
                <div className="relative shrink-0">
                  <img
                    src={activeStory.avatarUrl}
                    alt={activeStory.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-lg"
                  />
                  <span
                    className={`absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-xl bg-gradient-to-br ${activeStory.avatarGradient} text-white font-serif-display text-xs font-bold flex items-center justify-center ring-2 ring-slate-900 shadow`}
                  >
                    {activeStory.initials}
                  </span>
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono-tech text-[10px] font-bold uppercase">
                      {activeStory.role}
                    </span>
                    <span className="text-xs text-white/70 flex items-center gap-1 font-mono-tech">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      {activeStory.location}
                    </span>
                  </div>
                  <h3 className="font-serif-display text-lg sm:text-xl font-bold text-white leading-snug">
                    {effectiveRecipient}
                  </h3>
                  <p className="text-xs text-emerald-200/90 font-medium">
                    {activeStory.title} • {activeStory.csrRegistrationId}
                  </p>
                  <p className="text-[11px] font-mono-tech text-white/60">
                    License: {activeStory.fssaiLicense}
                  </p>
                </div>
              </div>

              {/* Gold Verified Badge */}
              <div className="shrink-0 flex sm:flex-col items-center gap-2 sm:gap-1 bg-white/10 border border-amber-400/40 rounded-xl px-3.5 py-2 text-center">
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                <div className="text-[10px] font-mono-tech uppercase font-bold text-amber-300">
                  GOLD TIER PARTNER
                </div>
                <div className="text-[10px] font-mono-tech text-white/70">
                  99.6% Hygiene Score
                </div>
              </div>
            </div>

            <p className="relative z-10 text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto text-center leading-relaxed">
              This certifies that <strong className="text-slate-950">{effectiveWeight} kg</strong> of
              wholesome surplus sustenance from{' '}
              <strong className="text-emerald-900 underline decoration-emerald-500 decoration-2">
                {effectiveRecipient}
              </strong>{' '}
              was thermally audited, transported via zero-emission cold/hot-chain fleet, and served with dignity under the FSSAI Save Food Share Food &amp; Indian Good Samaritan Protection Guidelines.
            </p>

            {/* 4-Column Impact Metrics Grid */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 border-y border-emerald-900/15 text-center">
              <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80">
                <div className="font-mono-tech text-xl sm:text-2xl font-bold text-emerald-700">
                  {mealsCount.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-600 uppercase font-mono-tech font-bold">
                  Dignified Meals
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-orange-50/80 border border-orange-200/80">
                <div className="font-mono-tech text-xl sm:text-2xl font-bold text-orange-700">
                  {co2Saved.toLocaleString()} kg
                </div>
                <div className="text-[10px] text-slate-600 uppercase font-mono-tech font-bold">
                  CO₂e Prevented
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-50/80 border border-cyan-200/80">
                <div className="font-mono-tech text-xl sm:text-2xl font-bold text-cyan-700">
                  {waterSaved.toLocaleString()} L
                </div>
                <div className="text-[10px] text-slate-600 uppercase font-mono-tech font-bold">
                  Water Preserved
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-teal-50/80 border border-teal-200/80">
                <div className="font-mono-tech text-xl sm:text-2xl font-bold text-teal-800">
                  {treesEquivalent} Trees
                </div>
                <div className="text-[10px] text-slate-600 uppercase font-mono-tech font-bold">
                  Carbon Equivalent
                </div>
              </div>
            </div>

            {/* Chain-of-Custody & Telemetry Audit Strip */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left text-[11px] font-mono-tech bg-slate-100/90 border border-slate-200 rounded-2xl p-3">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-orange-600 shrink-0" />
                <div>
                  <div className="text-[9px] uppercase text-slate-500 font-bold">THERMAL CUSTODY</div>
                  <div className="font-bold text-slate-800">65.4°C Pickup → 63.8°C Dock</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-[9px] uppercase text-slate-500 font-bold">RECEIVING SHELTER</div>
                  <div className="font-bold text-slate-800">Annapurna Seva (80G Verified)</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-teal-600 shrink-0" />
                <div>
                  <div className="text-[9px] uppercase text-slate-500 font-bold">IMMUTABLE LEDGER HASH</div>
                  <div className="font-bold text-slate-800">{ledgerHash}</div>
                </div>
              </div>
            </div>

            {/* Signatories with Avatars & QR Verification Seal */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-left text-xs font-mono-tech text-slate-700">
              {/* Signatory 1 */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <img
                  src="https://images.unsplash.com/photo-1737574821698-862e77f044c1?auto=format&fit=crop&w=240&q=80"
                  alt="Dr. Vikramaditya Rao"
                  className="w-11 h-11 rounded-full object-cover border-2 border-emerald-700 shadow-xs shrink-0"
                />
                <div>
                  <div className="font-serif-display italic text-base text-slate-900 font-bold leading-none">
                    Dr. Vikramaditya Rao
                  </div>
                  <div className="text-[10px] text-slate-600 mt-0.5">
                    Chief Climate &amp; FSSAI Auditor
                  </div>
                  <div className="text-[9px] text-emerald-700 font-bold">
                    Reg #ISO-14064-IND-882
                  </div>
                </div>
              </div>

              {/* Center QR Verification Stamp */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950 text-white border border-emerald-700 shadow-sm">
                <QrCode className="w-7 h-7 text-emerald-400 shrink-0" />
                <div className="text-[9px] leading-tight">
                  <div className="font-bold text-emerald-300">SCAN TO VERIFY</div>
                  <div className="text-white/75">{certificateId}</div>
                </div>
              </div>

              {/* Signatory 2 */}
              <div className="flex items-center gap-3 w-full sm:w-auto sm:justify-end sm:text-right">
                <div className="order-2 sm:order-1">
                  <div className="font-serif-display italic text-base text-slate-900 font-bold leading-none">
                    Meera Krishnan
                  </div>
                  <div className="text-[10px] text-slate-600 mt-0.5">
                    Chairperson, NGO Relief Council
                  </div>
                  <div className="text-[9px] text-emerald-700 font-bold">
                    80G Audit Seal #NGO-1094
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80"
                  alt="Meera Krishnan"
                  className="order-1 sm:order-2 w-11 h-11 rounded-full object-cover border-2 border-emerald-700 shadow-xs shrink-0"
                />
              </div>
            </div>
          </div>

          {downloadedNotice && (
            <div className="rounded-2xl bg-emerald-500/20 border border-emerald-400/40 px-4 py-2.5 text-xs font-mono-tech text-emerald-200 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>
                  Official ESG &amp; 80G Certificate <strong>#{certificateId}</strong> prepared for{' '}
                  <strong>{activeStory.name}</strong>.
                </span>
              </span>
              <span className="text-emerald-300 font-bold">VERIFIED ✓</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="w-full sm:flex-1 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Official PDF &amp; 80G Tax Receipt</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.12] text-white/90 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all border border-white/[0.20]"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
