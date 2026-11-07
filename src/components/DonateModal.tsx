import React, { useEffect, useState } from 'react';
import {
  Camera,
  CheckCircle2,
  MapPin,
  QrCode,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface DonateModalProps {
  isOpen: boolean;
  initialWeightKg?: number;
  onClose: () => void;
  onSuccessDispatch: (mealsAdded: number) => void;
  onViewCertificate?: (donorName: string, weightKg: number) => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({
  isOpen,
  initialWeightKg = 45,
  onClose,
  onSuccessDispatch,
  onViewCertificate,
}) => {
  const [donorCategory, setDonorCategory] = useState<string>('Hotel / Restaurant');
  const [donorName, setDonorName] = useState<string>('Grand Horizon Convention Hotel');
  const [foodDescription, setFoodDescription] = useState<string>(
    'Saffron Pilaf, Dal Makhani & Paneer Gravy Trays'
  );
  const [weightKg, setWeightKg] = useState<number>(initialWeightKg);
  const [thermalState, setThermalState] = useState<string>('Hot Holding (64°C)');
  const [pickupAddress, setPickupAddress] = useState<string>(
    '100 Feet Road, Indiranagar, Bengaluru'
  );
  const [isScanningAi, setIsScanningAi] = useState<boolean>(false);
  const [dispatchedTicket, setDispatchedTicket] = useState<{
    ticketId: string;
    meals: number;
    co2Kg: number;
    ngo: string;
    eta: number;
  } | null>(null);

  useEffect(() => {
    setWeightKg(initialWeightKg);
  }, [initialWeightKg]);

  if (!isOpen) return null;

  const triggerAiVisionDemo = () => {
    sound.click();
    setIsScanningAi(true);
    setTimeout(() => {
      sound.success();
      setWeightKg(58);
      setFoodDescription('AI Detected: 3 Gastronorm Trays Biryani, Paneer Gravy & 60 Rotis');
      setThermalState('Hot Holding (65.2°C Verified)');
      setIsScanningAi(false);
    }, 900);
  };

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.success();
    const meals = Math.round(weightKg * 4);
    const co2Kg = Math.round(weightKg * 2.5);
    setDispatchedTicket({
      ticketId: `FB-QR-${Math.floor(10000 + Math.random() * 90000)}`,
      meals,
      co2Kg,
      ngo: 'Annapurna Seva Community Kitchen (2.1 km away)',
      eta: 14,
    });
    onSuccessDispatch(meals);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white text-white border border-white/[0.14] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Top Modal Header */}
        <div className="bg-white/[0.05] text-white px-6 sm:px-8 py-5 flex items-center justify-between border-b border-white/[0.14]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-900/200 animate-pulse" />
            <span className="font-mono-tech text-xs uppercase tracking-wider text-emerald-400 font-bold">
              FOODBRIDGE LIVE DISPATCH TERMINAL
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.click();
              setDispatchedTicket(null);
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/[0.12] hover:bg-slate-300 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {!dispatchedTicket ? (
            <form onSubmit={handleDispatchSubmit} className="space-y-5">
              {/* AI Auto-Fill helper bar */}
              <div className="rounded-2xl bg-emerald-900/20 border border-emerald-500/30 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs text-emerald-900 font-medium">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Have surplus kitchen trays ready? Try instant camera scan:</span>
                </div>
                <button
                  type="button"
                  onClick={triggerAiVisionDemo}
                  disabled={isScanningAi}
                  className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm shrink-0"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{isScanningAi ? 'Scanning AI...' : 'Scan Catering Trays'}</span>
                </button>
              </div>

              {/* Donor Category & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono-tech uppercase text-white/70 font-semibold block">
                    Donor Category
                  </label>
                  <select
                    value={donorCategory}
                    onChange={(e) => setDonorCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/[0.20] text-sm bg-white/[0.05] text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  >
                    <option value="Hotel / Restaurant">Hotel / Restaurant Banquet</option>
                    <option value="Bakery / Cafe">Bakery / Artisan Cafe</option>
                    <option value="Wedding Banquet">Wedding & Event Catering</option>
                    <option value="Corporate Cafeteria">Corporate TechPark Cafeteria</option>
                    <option value="Household Society">Apartment / Residential Society</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono-tech uppercase text-white/70 font-semibold block">
                    Organization / Host Name
                  </label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/[0.20] text-sm bg-white/[0.05] text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Food Description */}
              <div className="space-y-1">
                <label className="text-xs font-mono-tech uppercase text-white/70 font-semibold block">
                  Surplus Food Description & Trays
                </label>
                <input
                  type="text"
                  required
                  value={foodDescription}
                  onChange={(e) => setFoodDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/[0.20] text-sm bg-white/[0.05] text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              {/* Weight Slider & Temperature Chain */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-tech">
                    <span className="text-white/70 uppercase font-semibold">ESTIMATED WEIGHT</span>
                    <span className="text-emerald-400 font-bold text-sm px-2 py-0.5 rounded bg-emerald-900/20 border border-emerald-500/30">
                      {weightKg} KG
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    step="1"
                    value={weightKg}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setWeightKg(val);
                      sound.sliderTick(val);
                    }}
                    className="w-full h-2.5 bg-white/[0.12] rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="text-[11px] font-mono-tech text-white/60">
                    ≈ {weightKg * 4} dignified meal portions
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono-tech uppercase text-white/70 font-semibold block">
                    Thermal State Chain
                  </label>
                  <select
                    value={thermalState}
                    onChange={(e) => setThermalState(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-white/[0.20] text-sm bg-white/[0.05] text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  >
                    <option value="Hot Holding (64°C)">Hot Holding (60°C–70°C Safe)</option>
                    <option value="Chilled (4°C)">Chilled Storage (2°C–5°C)</option>
                    <option value="Ambient Dry (22°C)">Ambient Dry / Baked Goods (22°C)</option>
                  </select>
                </div>
              </div>

              {/* Pickup Address */}
              <div className="space-y-1">
                <label className="text-xs font-mono-tech uppercase text-white/70 font-semibold block">
                  Pickup Loading Bay Address
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-orange-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.20] text-sm bg-white/[0.05] text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Safety & Legal Note */}
              <div className="flex items-center gap-2 text-xs text-white/70 bg-white/[0.05] p-3 rounded-xl border border-white/[0.14]">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Protected under the Indian Food Safety and Standards (Recovery & Distribution of Surplus Food) Regulations, 2019.
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold text-sm transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>Dispatch Instant Volunteer Pickup ({weightKg * 4} Meals)</span>
              </button>
            </form>
          ) : (
            /* Dispatched Confirmation Ticket */
            <div className="text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-900/30 text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono-tech uppercase text-emerald-400 font-bold tracking-wider block">
                  PICKUP DISPATCHED • EN ROUTE
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-1">
                  Surplus Batch Successfully Matched!
                </h3>
                <p className="text-xs sm:text-sm text-white/70 mt-1">
                  A Hunger Hero EV rider has been routed to your loading bay. Please keep containers sealed.
                </p>
              </div>

              {/* Ticket Card */}
              <div className="rounded-2xl bg-black/60 text-white p-6 border border-slate-800 text-left space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="font-mono-tech text-xs text-emerald-400 font-semibold">
                    DISPATCH PASS: {dispatchedTicket.ticketId}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 font-mono-tech text-[10px] font-bold border border-emerald-700/50">
                    ETA {dispatchedTicket.eta} MINS
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono-tech">
                  <div>
                    <span className="text-[10px] text-white/50 block">DONOR</span>
                    <span className="text-white font-bold">{donorName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50 block">MATCHED SHELTER</span>
                    <span className="text-amber-300 font-bold">{dispatchedTicket.ngo}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50 block">MEALS EQUIVALENT</span>
                    <span className="text-emerald-400 font-bold text-base">
                      {dispatchedTicket.meals} Hot Meals
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50 block">METHANE CO₂e SAVED</span>
                    <span className="text-orange-400 font-bold text-base">
                      -{dispatchedTicket.co2Kg} kg CO₂e
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-white/50">
                  <div className="flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-emerald-400" />
                    <span>Contactless Driver QR Ready</span>
                  </div>
                  <span className="text-emerald-400 font-mono-tech">Temp Log: {thermalState}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                {onViewCertificate && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.click();
                      onViewCertificate(donorName, weightKg);
                      onClose();
                    }}
                    className="w-full sm:flex-1 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm cursor-pointer transition-all shadow-md shadow-emerald-600/20"
                  >
                    View Official ESG Certificate
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    sound.click();
                    setDispatchedTicket(null);
                    onClose();
                  }}
                  className="w-full sm:flex-1 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.12] text-white/90 font-semibold text-xs sm:text-sm cursor-pointer transition-all"
                >
                  Close & Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
