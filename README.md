# 🍲 FoodBridge — Bridge the Gap Between Surplus & Sustenance

> **AI Prompt Battle powered by OSCode**  
> *Imagine. Design. Impact.*  
> A high-impact, realistic UI/UX digital experience built to solve food waste and urban hunger in under 38 minutes.

[![Built for OSCode AI Prompt Battle](https://img.shields.io/badge/Challenge-AI%20Prompt%20Battle%20OSCode-10B981?style=for-the-badge)](https://credits-portal-mmdm.onrender.com/claim/innovortex-4-oscode)
[![Deployment Ready](https://img.shields.io/badge/Deploy-Render%20%7C%20Vercel-F97316?style=for-the-badge)](#-deployment-guide-render--vercel)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](#)

---

## 🎯 The Social Problem

Every day across metro cities:
- **68.7 Million Tonnes** of food are wasted annually in India alone.
- Hotels, wedding banquets, tech-park cafeterias, and bakeries discard pristine, untouched catering at 11:30 PM due to logistics barriers.
- Just 3 km away, **over 800 million people** experience daily food insecurity.
- Hot food has a critical **45-minute safe holding window** under FSSAI food hygiene regulations before bacterial proliferation begins.

**FoodBridge** transforms this crisis from an abstract statistic into a real-time, tactile civic logistics experience — matching surplus food with verified community shelters and dispatching thermal-insulated EV couriers in **under 38 minutes**.

---

## ✨ Key Design Highlights & Realistic Features

### 1. 🎨 Dynamic 3-Way Color Theme Switcher
Evaluators and visitors can instantly toggle palettes in the top navbar:
- **🌿 Emerald Bio-Vitality (Default)**: Crisp modern arctic canvas (`#F8FAFC`), pure white elevated cards, vibrant bio-emerald (`#059669` / `#10B981`), and radiant solar coral (`#F97316`) representing fresh hot meals.
- **🌙 Midnight Cyber-Command**: High-contrast OLED dark mode (`#070B14`) with glowing bioluminescent neon gridlines and cyber telemetry.
- **🌾 Warm Harvest Earth**: Organic sandstone (`#FAF7F2`), terracotta clay (`#E05A2B`), and warm harvest amber.

### 2. 🏙️ Real-Time Three.js 3D WebGL Hero Visualizer
- **3D Urban Rescue Grid**: Orbit and inspect interactive 3D city towers, central NGO sanctuary, and glowing parabolic meal delivery arcs with moving delivery pods.
- **3D Global Biosphere**: Planetary rescue node distribution across coordinates.
- **3D Exploded Smart Thermal Crate**: Visual breakdown of IoT phase-change temperature pods.

### 3. ⚖️ Interactive Before-and-After Scrubber ("Waste to Sustenance")
- Draggable comparison slider contrasting **11:45 PM Landfill Dumpster** (rotting surplus emitting 112 kg methane CO₂e) against **12:15 AM Community Banquet** (180 hot meals served to children and elders at Annapurna Seva Shelter).

### 4. 🛰️ Live GPS Telemetry Radar & Dispatch Simulator
- Real-time simulated route tracker (`FB-DISPATCH-9942`) from Grand Horizon Hotel to Annapurna Seva Kitchen:
  - Live fluctuating thermal sensor reading (`65.4°C` ± `0.2°C` hot-holding safe).
  - Live countdown clock (`08:44` remaining).
  - EV battery telemetry (`84%`), speed indicator (`26 km/h`), and satellite lock status.

### 5. 📸 AI Vision Food Tray Scanner with Real Catering Presets
- Interactive kitchen terminal scanner with authentic food photography:
  - **Royal Banquet Feast** (Biryani, dal makhani, paneer gravy trays).
  - **Artisan Bakery Harvest** (Country wholewheat sourdough boules, brioche).
  - **Organic Produce Surplus** (Fresh orchard fruit & vegetables).
- AI volumetric mass estimation, calorie count, allergen tagging, and 1-click dispatch.

### 6. 🏆 Downloadable ESG & Tax 80G Impact Certificate
- Generates official zero-waste certificates with cryptographic ID, verified shelter stamps, and 1-click PDF/Print options for corporate donors.

### 7. 💖 1-Click "Pledge 1 Meal" Micro-Action with Confetti Pass
- Allows individual citizens to pledge 1 to 25 meals (₹35 each), generating a personalized **Digital FoodBridge Civic Hero Pass** shareable on LinkedIn.

### 8. 🔊 Web Audio API Micro-Interactions (Zero External MP3s)
- Native Web Audio synthesizer provides soft tactile clicks, radar pings, and celebratory fanfare when toggled on.

### 9. 🔔 Real-Time Floating Activity Toast Feed
- Discreet live feed in the bottom-left corner displaying citywide rescues in real time with 1-click radar tracking.

---

## 🧭 Page Section Architecture (Challenge Rubric Aligned)

| Section | Content & Purpose |
| :--- | :--- |
| **01. Top Telemetry Bar** | Live scrolling ticker of rescues, milestones, and FSSAI audits |
| **02. Hero Section** | Bold headline, UN SDG 2 & 12.3 badges, dual CTAs, live counters, and Three.js 3D WebGL scene |
| **03. The Problem** | "The Paradox of Plenty", Before/After slider, 3 hard truth reality cards, interactive metro redirection simulator |
| **04. Our Solution** | 3 connected layers: Food Donors, AI Dispatch Core, Verified NGO Sanctuaries |
| **05. How It Works** | 3-step rapid dispatch pipeline: Log in 60s, Smart Match, Door-to-Plate in 38m |
| **06. Key Features** | Bento grid with AI Tray Scanner, NGO Capacity Sync, Green EV Fleet, and 24/7 Smart Community Fridges |
| **07. Impact Ledger** | Audited metrics, dynamic surplus calculator (meals, CO₂e, water, trees), and official ESG Certificate modal |
| **08. Community Stories** | High-fidelity personas (Executive Chef, NGO Founder, EV Volunteer, Wedding Couple) with audio memos |
| **09. Call to Action** | Interactive 1-minute Action Studio with custom role onboarding (Donor / NGO / Volunteer) |
| **10. Footer** | Comprehensive sitemap, 24/7 surplus emergency desk, and AI Prompt Battle design architecture modal |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18+ (Node 20+ recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd foodbridge-uiux-design-challenge

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to explore the website.

### Production Build

```bash
# Build production bundle with singlefile inlining
npm run build

# Preview build locally
npm run preview
```

The production output is generated in `dist/index.html`.

---

## 🌐 Deployment Guide (Render / Vercel)

### Option A: Deploy on Render (Claim $50 Credits)
1. Claim your exclusive **$50 Render credits** at the [OSCode Render Credits Portal](https://credits-portal-mmdm.onrender.com/claim/innovortex-4-oscode).
2. Go to your [Render Dashboard](https://dashboard.render.com/) and click **New + → Static Site**.
3. Connect your GitHub repository.
4. Configure build settings:
   - **Name**: `foodbridge-stop-food-waste`
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Click **Create Static Site**. Your live URL will be ready in under 2 minutes!

### Option B: Deploy on Vercel
1. Install Vercel CLI or import repository directly on [Vercel](https://vercel.com).
2. Framework preset: **Vite**.
3. Root directory: `./`.
4. Click **Deploy**.

---

## 🛠️ Tech Stack & Creative AI Tools Used

- **Framework**: React 19 + TypeScript + Vite 7
- **Styling**: Tailwind CSS v4 + Custom Modern CSS Design Tokens
- **3D Graphics**: Three.js WebGL (Custom 3D Urban Grid, Biosphere, and Exploded Thermal Pod)
- **Icons**: Lucide React
- **Audio**: Web Audio API (Client-side native synthesizer)
- **AI Prompt Engineering**: Structured prompt battle design thinking, realistic data simulation, and spatial UI layout.

---

## 📢 Submission & Showcase Checklist

- [x] One-page responsive homepage covering all 9 challenge sections
- [x] Realistic high-fidelity content, real food imagery & community stories
- [x] Interactive Three.js 3D scene & Before-and-After reality slider
- [x] Live GPS route tracker, AI food scanner, and impact calculator
- [x] Dynamic 3-way color theme switcher (Emerald, Midnight, Harvest)
- [x] Deployed and functional on Render / Vercel

*Built with ❤️ for the AI Prompt Battle powered by OSCode.*

