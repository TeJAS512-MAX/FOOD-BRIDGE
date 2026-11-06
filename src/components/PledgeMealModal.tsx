import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Heart,
  QrCode,
  Share2,
  Sparkles,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface PledgeMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPledgeSuccess: (meals: number) => void;
}

export const PledgeMealModal: React.FC<PledgeMealModalProps> = ({
  isOpen,
  onClose,
  onPledgeSuccess,
}) => {
  const [pledgeCount, setPledgeCount] = useState<number>(5);
  const [supporterName, setSupporterName] = useState<string>('');
  const [supporterCity, setSupporterCity] = useState<string>('Bengaluru');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [generatedPassId, setGeneratedPassId] = useState<string>('');

  if (!isOpen) return null;

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.success();
    const pass = `FB-HERO-${Math.floor(10000 + Math.random() * 90000)}`;
    setGeneratedPassId(pass);
    setIsCompleted(true);
    onPledgeSuccess(pledgeCount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-lg frosted-card text-white border border-white/10 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white px-6 sm:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-orange-300 fill-current" />
            <span className="font-mono-tech text-xs uppercase tracking-widest text-emerald-200">
              CIVIC ACTION • PLEDGE NOURISHMENT
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.click();
              setIsCompleted(false);
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 flex items-center justify-center text-white cursor-pointer transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {!isCompleted ? (
            <form onSubmit={handlePledgeSubmit} className="space-y-5">
              <div className="text-center space-y-2">
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
                  Every Single Meal <span className="text-[#206B42]">Restores Hope.</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                  You don’t have to run a commercial hotel to end hunger. Pledge meals or sponsor an EV thermal rescue ride to your nearest neighborhood shelter today.
                </p>
              </div>

              {/* Number of meals selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono-tech uppercase text-[#7A6855] font-semibold block">
                  Select Meals to Bridge
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 5, 10, 25].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => {
                        sound.click();
                        setPledgeCount(count);
                      }}
                      className={`py-3 rounded-2xl border text-sm font-bold transition-all cursor-pointer ${
                        pledgeCount === count
                          ? 'bg-[#1A5C38] text-white border-emerald-600 shadow-md ring-2 ring-emerald-500/20 scale-102'
                          : 'frosted-subcard text-white text-slate-300 border-white/10 hover:frosted-subcard text-white'
                      }`}
                    >
                      {count} {count === 1 ? 'Meal' : 'Meals'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono-tech uppercase text-[#7A6855] font-semibold block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={supporterName}
                    onChange={(e) => setSupporterName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono-tech uppercase text-[#7A6855] font-semibold block">
                    Your City / Ward
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Indiranagar, Bengaluru"
                    value={supporterCity}
                    onChange={(e) => setSupporterCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Impact Preview Card */}
              <div className="rounded-2xl bg-[#F3FCF6]/80 border border-[rgba(26,92,56,0.2)]/60 p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between font-mono-tech text-emerald-800 font-semibold">
                  <span>PLEDGED IMPACT SUMMARY</span>
                  <span>{pledgeCount * 400}g FOOD EQUIV</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div>• {pledgeCount} hot dinners guaranteed</div>
                  <div>• {(pledgeCount * 0.625).toFixed(1)} kg Methane CO₂e saved</div>
                  <div>• Directed to: Annapurna Seva Hub</div>
                  <div>• Sub-38 min thermal transit</div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#1A5C38] hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Confirm {pledgeCount} Meal Pledge Now</span>
              </button>
            </form>
          ) : (
            /* Completed / Hero Pass Generated */
            <div className="text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#E6F7EC] text-[#206B42] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-serif-display text-2xl font-bold text-white">
                  You Just Bridged {pledgeCount} Dignified Meals!
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Thank you, <strong className="text-white">{supporterName || 'Hero'}</strong>. Your pledge has been registered onto the FoodBridge civic dispatch ledger.
                </p>
              </div>

              {/* Verified Digital Supporter Pass Card */}
              <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-[#0F1E14] text-white p-5 border border-white/10 text-left space-y-3 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#2A8A56]/15 blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#DDB259]" />
                    <span className="font-mono-tech text-xs tracking-wider text-[#4AAD74] font-semibold">
                      FOODBRIDGE CIVIC HERO PASS
                    </span>
                  </div>
                  <span className="font-mono-tech text-[10px] text-[#9E8E7A]">{generatedPassId}</span>
                </div>

                <div className="space-y-1">
                  <div className="text-base font-bold text-white">{supporterName || 'Civic Supporter'}</div>
                  <div className="text-xs text-[#9E8E7A]">{supporterCity} • Verified Supporter</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono-tech border-t border-white/10 pt-3 text-[#C4B9AC]">
                  <div>
                    <span className="text-[10px] text-[#7A6855] block">MEALS BRIDGED</span>
                    <span className="text-[#4AAD74] font-bold">{pledgeCount} Hot Dinners</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7A6855] block">DESTINATION SHELTER</span>
                    <span className="text-[#DDB259] font-bold">Annapurna Seva Hub</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    sound.click();
                    alert('Digital Hero Pass copied to clipboard! You can share it on LinkedIn or Twitter/X with #FoodBridge #OSCode');
                  }}
                  className="flex-1 py-3 rounded-full bg-[#172B1E] hover:bg-[#1E3828] text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Hero Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.click();
                    setIsCompleted(false);
                    onClose();
                  }}
                  className="flex-1 py-3 rounded-full bg-[#1A5C38] hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer transition-all"
                >
                  Close & View Impact
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

