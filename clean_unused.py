import os
import re

os.chdir(r'c:\Users\bhumika\Downloads\foodbridge-uiux-design-challenge')

def clean_file(path, replacements):
    if not os.path.exists(path):
        return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    orig = content
    for old, new in replacements:
        content = content.replace(old, new)
    if content != orig:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Cleaned {path}")
    else:
        print(f"No match in {path}")

# 1. ActivityToastFeed.tsx
clean_file('src/components/ActivityToastFeed.tsx', [
    ("import { CheckCircle2, Clock, Heart, Navigation, Radio, Sparkles, TrendingUp, X } from 'lucide-react';",
     "import { Clock, Heart, Radio, TrendingUp, X } from 'lucide-react';")
])

# 2. AiTrayScannerModal.tsx
clean_file('src/components/AiTrayScannerModal.tsx', [
    ("""import {
  Camera,
  CheckCircle2,
  Cpu,
  Flame,
  Layers,
  RefreshCw,
  Scan,
  ShieldCheck,
  Sparkles,
  Thermometer,
  Upload,
  Utensils,
  X,
} from 'lucide-react';""",
     """import {
  CheckCircle2,
  Scan,
  ShieldCheck,
  X,
} from 'lucide-react';"""),
    ("""interface DetectedItem {
  name: string;
  category: string;
  weightKg: number;
  portions: number;
  temp: number;
  confidence: number;
  box: { top: number; left: number; width: number; height: number };
}""", "")
])

# 3. DonateModal.tsx
clean_file('src/components/DonateModal.tsx', [
    ("""  Clock,
  DollarSign,""", """  DollarSign,"""),
    ("""  Flame,
  Heart,""", """  Heart,"""),
    ("""  Utensils,
  UtensilsCrossed,""", """  UtensilsCrossed,""")
])

# 4. EsgCertificateModal.tsx
clean_file('src/components/EsgCertificateModal.tsx', [
    ("""  CheckCircle2,
  Download,""", """  Download,"""),
    ("""  FileText,
  HeartHandshake,""", """  HeartHandshake,"""),
    ("""  QrCode,
  Share2,""", """  Share2,"""),
    ("""  ShieldCheck,
  Sparkles,""", """  ShieldCheck,""")
])

# 5. Hero3DScene.tsx
clean_file('src/components/Hero3DScene.tsx', [
    ("""  Radio,
  Zap,""", """  Zap,""")
])

# 6. HeroGlassmorphism.tsx
clean_file('src/components/HeroGlassmorphism.tsx', [
    ("""  Clock,
  Globe,
  Camera,""", """  Clock,
  Camera,"""),
    ("""  Sparkles,
  ArrowRight,
} from 'lucide-react';""", """} from 'lucide-react';""")
])

# 7. ImpactCalculatorSection.tsx
clean_file('src/components/ImpactCalculatorSection.tsx', [
    ("""  BarChart3,
  Box,
  Calculator,""", """  BarChart3,
  Calculator,""")
])

# 8. LiveImpactTicker.tsx
clean_file('src/components/LiveImpactTicker.tsx', [
    ("""interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
  color: string;
  glowColor: string;
  increment: () => number;
}""", "")
])

# 9. LiveRouteTrackerModal.tsx
clean_file('src/components/LiveRouteTrackerModal.tsx', [
    ("""  CheckCircle2,
  Compass,
  MapPin,""", """  CheckCircle2,
  MapPin,"""),
    ("""  Thermometer,
  Truck,
  Users,""", """  Thermometer,
  Users,"""),
    ("""  Wifi,
  Zap,
} from 'lucide-react';""", """  Wifi,
} from 'lucide-react';"""),
    ("""  const [telemetry, setTelemetry] = useState({""", """  const [telemetry] = useState({""")
])

# 10. NeuralRescueMap.tsx
clean_file('src/components/NeuralRescueMap.tsx', [
    ("""import { Activity, Zap, AlertCircle } from 'lucide-react';""", ""),
    ("""function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }""", "")
])

# 11. PledgeMealModal.tsx
clean_file('src/components/PledgeMealModal.tsx', [
    ("""  Heart,
  QrCode,
  ShieldCheck,""", """  Heart,
  ShieldCheck,"""),
    ("""  Sparkles,
  UtensilsCrossed,
  X,""", """  Sparkles,
  X,""")
])

# 12. ProblemSolutionSection.tsx
clean_file('src/components/ProblemSolutionSection.tsx', [
    ("""  AlertTriangle,
  ArrowRight,
  Building2,""", """  AlertTriangle,
  Building2,"""),
    ("""  Sparkles,
  ThermometerSnowflake,
  Truck,
  Users,
  UtensilsCrossed,""", """  Sparkles,
  Truck,
  UtensilsCrossed,""")
])

# 13. StatsCardGrid.tsx
clean_file('src/components/StatsCardGrid.tsx', [
    ("""  ArrowUpRight,
  TrendingUp,
  UtensilsCrossed,""", """  ArrowUpRight,
  UtensilsCrossed,"""),
    ("""  Thermometer,
  ShieldCheck,
  Building2,
  Leaf,""", """  Thermometer,
  Building2,""")
])

# 14. StoriesAndCtaSection.tsx
clean_file('src/components/StoriesAndCtaSection.tsx', [
    ("""  ArrowRight,
  Award,
  Bike,""", """  ArrowRight,
  Bike,"""),
    ("""  HeartHandshake,
  MapPin,
  Mic,
  Play,""", """  HeartHandshake,
  Play,"""),
    ("""  Quote,
  ShieldCheck,
  Sparkles,""", """  Quote,
  Sparkles,""")
])

# 15. ThermalGaugeWidget.tsx
clean_file('src/components/ThermalGaugeWidget.tsx', [
    ("""import {
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Flame,
  Radio,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Thermometer,
  Zap,
} from 'lucide-react';""",
     """import {
  ShieldCheck,
  Thermometer,
} from 'lucide-react';""")
])

# 16. WasteToFeastVisualizer.tsx
clean_file('src/components/WasteToFeastVisualizer.tsx', [
    ("""  AlertTriangle,
  ArrowLeftRight,
  CheckCircle2,
  Clock,
  Flame,
  Heart,
  Scale,
  Sparkles,
  Utensils,
} from 'lucide-react';""",
     """  AlertTriangle,
  ArrowLeftRight,
  CheckCircle2,
  Flame,
  Sparkles,
} from 'lucide-react';""")
])

# 17. WorkflowAndFeaturesSection.tsx
clean_file('src/components/WorkflowAndFeaturesSection.tsx', [
    ("""  Bike,
  Building,
  Camera,
  CheckCircle2,
  Clock,
  Cpu,
  Heart,
  Navigation,
  QrCode,
  ShieldCheck,
  Sparkles,
  Thermometer,
  Users,
} from 'lucide-react';""",
     """  Bike,
  Camera,
  CheckCircle2,
  Clock,
  Navigation,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';""")
])

print("Finished cleanup script.")
