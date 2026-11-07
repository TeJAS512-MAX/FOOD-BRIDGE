import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  CheckCircle2,
  Scan,
  ShieldCheck,
  Upload,
  X,
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface AiTrayScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDispatchCreated: (meals: number) => void;
}



export const AiTrayScannerModal: React.FC<AiTrayScannerModalProps> = ({
  isOpen,
  onClose,
  onDispatchCreated,
}) => {
  const [scanning, setScanning] = useState<boolean>(true);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [analyzed, setAnalyzed] = useState<boolean>(false);
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);
  const [customPhotoName, setCustomPhotoName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const presets = [
    {
      title: 'Grand Hotel Banquet Buffet',
      source: 'Grand Horizon Convention Hotel • Hall B',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
      videoUrl:
        'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-food-in-a-restaurant-kitchen-42442-large.mp4',
      items: [
        {
          name: 'Shahi Paneer Gravy',
          category: 'Main Course • Dairy / Gravy',
          weightKg: 18.5,
          portions: 74,
          temp: 66.4,
          confidence: 99.4,
          box: { top: 22, left: 14, width: 34, height: 38 },
        },
        {
          name: 'Fragrant Jeera Pilaf',
          category: 'Carbs • Steamed Rice',
          weightKg: 16.0,
          portions: 64,
          temp: 67.1,
          confidence: 98.7,
          box: { top: 24, left: 52, width: 36, height: 36 },
        },
        {
          name: 'Dal Makhani Slow-Cooked',
          category: 'Protein • Lentil Curry',
          weightKg: 12.5,
          portions: 50,
          temp: 65.8,
          confidence: 99.1,
          box: { top: 58, left: 24, width: 44, height: 34 },
        },
      ],
    },
    {
      title: 'Artisan Bakery Morning Surplus',
      source: 'The Daily Loaf Bakery • Koramangala',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
      videoUrl:
        'https://assets.mixkit.co/videos/preview/mixkit-fresh-bread-loaves-in-a-bakery-42466-large.mp4',
      items: [
        {
          name: 'Sourdough Country Loaves',
          category: 'Baked Bread • Whole Grain',
          weightKg: 14.0,
          portions: 56,
          temp: 24.0,
          confidence: 99.6,
          box: { top: 20, left: 16, width: 32, height: 42 },
        },
        {
          name: 'Butter Croissants & Pastries',
          category: 'Viennoiserie • Sweet/Savory',
          weightKg: 8.5,
          portions: 42,
          temp: 23.5,
          confidence: 97.9,
          box: { top: 28, left: 52, width: 38, height: 38 },
        },
      ],
    },
  ];

  const customPreset = {
    title: customPhotoName || 'Custom Kitchen Tray Upload',
    source: 'Live Camera / Uploaded Kitchen Tray • Instant Audit',
    image: customPhotoUrl || presets[0].image,
    videoUrl: '',
    items: [
      {
        name: 'Detected Primary Entree Tray',
        category: 'Cooked Batch • GN 1/1 Pan',
        weightKg: 16.5,
        portions: 66,
        temp: 65.2,
        confidence: 99.2,
        box: { top: 18, left: 14, width: 38, height: 44 },
      },
      {
        name: 'Accompaniment & Grain Portions',
        category: 'Steamed / Sealed Container',
        weightKg: 14.0,
        portions: 56,
        temp: 64.8,
        confidence: 98.8,
        box: { top: 26, left: 55, width: 33, height: 42 },
      },
    ],
  };

  const currentPreset = customPhotoUrl ? customPreset : presets[selectedPresetIndex];
  const totalWeight = currentPreset.items.reduce((acc, it) => acc + it.weightKg, 0);
  const totalPortions = currentPreset.items.reduce((acc, it) => acc + it.portions, 0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        sound.click();
        setCustomPhotoName(file.name.replace(/\.[^/.]+$/, ''));
        setCustomPhotoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!isOpen) {
      setScanning(true);
      setScanProgress(0);
      setAnalyzed(false);
      return;
    }

    setScanning(true);
    setScanProgress(0);
    setAnalyzed(false);
    sound.radar();

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          setAnalyzed(true);
          sound.success();
          return 100;
        }
        return prev + 12;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [isOpen, selectedPresetIndex, customPhotoUrl]);

  if (!isOpen) return null;

  const handleConfirmDispatch = () => {
    sound.success();
    onDispatchCreated(totalPortions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeinup">
      <div className="frosted-modal w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl p-6 sm:p-8 space-y-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Scan className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-display text-2xl font-bold text-white">
                  AI Food Vision Scanner
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-tech font-bold uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  v2.4 Neural Mesh
                </span>
              </div>
              <p className="text-xs text-white/60">
                Automated portion estimation, allergen classification, and safe thermal window validation
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-white/60 hover:text-white bg-white/5 hover:bg-white/15 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Selector + Real Photo Upload */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-mono-tech text-white/50 shrink-0">Camera Feed:</span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                sound.click();
                setCustomPhotoUrl(null);
                setSelectedPresetIndex(idx);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-mono-tech transition-all cursor-pointer ${
                !customPhotoUrl && selectedPresetIndex === idx
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
              }`}
            >
              {preset.title}
            </button>
          ))}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono-tech font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm hover:opacity-95 cursor-pointer transition"
          >
            <Upload className="w-3.5 h-3.5" />
            <Camera className="w-3.5 h-3.5" />
            <span>{customPhotoUrl ? 'Scan Another Photo' : 'Upload / Snap Your Food Photo'}</span>
          </button>
        </div>

        {/* Scanner Viewport */}
        <div className="relative rounded-2xl overflow-hidden border border-white/20 aspect-video sm:aspect-[21/9] bg-black/60 shadow-2xl">
          {customPhotoUrl ? (
            <img
              src={customPhotoUrl}
              alt={currentPreset.title}
              className="w-full h-full object-cover filter brightness-[0.82] contrast-[1.08]"
            />
          ) : (
            <video
              key={currentPreset.videoUrl}
              src={currentPreset.videoUrl}
              poster={currentPreset.image}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.1]"
            />
          )}

          {/* Scanning Laser Beam */}
          {scanning && (
            <div
              className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10B981] pointer-events-none transition-all duration-150"
              style={{ top: `${scanProgress}%` }}
            />
          )}

          {/* Grid Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />

          {/* Detected Bounding Boxes */}
          {analyzed &&
            currentPreset.items.map((item, idx) => (
              <div
                key={idx}
                className="absolute border-2 border-emerald-400/80 rounded-xl bg-emerald-500/10 backdrop-blur-xs transition-all duration-500 animate-fadeinup"
                style={{
                  top: `${item.box.top}%`,
                  left: `${item.box.left}%`,
                  width: `${item.box.width}%`,
                  height: `${item.box.height}%`,
                }}
              >
                {/* Tag pill */}
                <div className="absolute -top-3 left-2 bg-black/85 backdrop-blur-md border border-emerald-400/50 rounded-md px-2 py-0.5 text-[10px] font-mono-tech text-emerald-300 shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    {item.name} ({item.confidence}%)
                  </span>
                </div>

                {/* Subtag pill */}
                <div className="absolute -bottom-3 right-2 bg-black/85 backdrop-blur-md border border-white/20 rounded-md px-2 py-0.5 text-[9px] font-mono-tech text-white/80 shadow-md">
                  {item.weightKg} kg • {item.portions} meals
                </div>
              </div>
            ))}

          {/* Top Status HUD */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono-tech">
            <div className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white/80 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${scanning ? 'bg-orange-400 animate-ping' : 'bg-emerald-400'}`} />
              <span>{scanning ? `LIVE VIDEO SCAN: ${scanProgress}%` : 'LIVE VIDEO FEED • AI LOCKED'}</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-emerald-300 font-bold">
              {currentPreset.source}
            </div>
          </div>
        </div>

        {/* Telemetry Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="frosted-subcard p-3.5 space-y-1">
            <span className="text-[10px] font-mono-tech uppercase text-white/50 tracking-wider">Estimated Weight</span>
            <div className="text-2xl font-bold font-serif-display text-white">{totalWeight.toFixed(1)} kg</div>
            <span className="text-[10px] font-mono-tech text-emerald-400">±0.4 kg AI precision</span>
          </div>
          <div className="frosted-subcard p-3.5 space-y-1">
            <span className="text-[10px] font-mono-tech uppercase text-white/50 tracking-wider">Total Servings</span>
            <div className="text-2xl font-bold font-serif-display text-emerald-300">{totalPortions} Meals</div>
            <span className="text-[10px] font-mono-tech text-white/60">400g standard portion</span>
          </div>
          <div className="frosted-subcard p-3.5 space-y-1">
            <span className="text-[10px] font-mono-tech uppercase text-white/50 tracking-wider">Thermal Status</span>
            <div className="text-2xl font-bold font-serif-display text-orange-400">
              {currentPreset.items[0]?.temp || 65}°C
            </div>
            <span className="text-[10px] font-mono-tech text-emerald-400">FSSAI Hot Holding Safe ✓</span>
          </div>
          <div className="frosted-subcard p-3.5 space-y-1">
            <span className="text-[10px] font-mono-tech uppercase text-white/50 tracking-wider">Safe Transit Window</span>
            <div className="text-2xl font-bold font-serif-display text-cyan-300">3h 45m</div>
            <span className="text-[10px] font-mono-tech text-white/60">EV dispatch eta 12m</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-white/60 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Good Samaritan protection & FSSAI hygiene certificate will be auto-generated</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDispatch}
              disabled={scanning}
              className="btn-frosted-primary text-xs sm:text-sm font-bold flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Dispatch {totalPortions} Meals</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
