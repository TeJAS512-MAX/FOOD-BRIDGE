export interface RescueNode {
  id: string;
  name: string;
  type: 'donor' | 'ngo' | 'hub';
  category: string;
  neighborhood: string;
  position3D: [number, number, number]; // x, y, z in 3D city scene
  activeBatch: string;
  quantityKg: number;
  mealsEquivalent: number;
  temperature: string;
  etaMinutes: number;
  status: 'Dispatched' | 'Ready for Pickup' | 'Verified & Served' | 'Matching NGO';
  partnerName: string;
  co2SavedKg: number;
  freshnessScore: number;
  imageUrl?: string;
}

export interface CommunityStory {
  id: string;
  role: 'Donor Partner' | 'NGO Partner' | 'Volunteer Captain' | 'Event Host';
  name: string;
  title: string;
  organization: string;
  location: string;
  quote: string;
  storyDetail: string;
  metricLabel: string;
  metricValue: string;
  secondaryMetric: string;
  avatarGradient: string;
  initials: string;
  verifiedBatchId: string;
  tags: string[];
  imageUrl: string;
  videoUrl?: string;
  audioDuration?: string;
}

export interface AIScanPreset {
  id: string;
  title: string;
  source: string;
  weightKg: number;
  estimatedMeals: number;
  shelfLifeHours: number;
  tempChain: 'Hot Holding (63°C+)' | 'Chilled (2°C–5°C)' | 'Ambient Dry (22°C)';
  safetyConfidence: number;
  matchedNgo: string;
  distanceKm: number;
  co2PreventedKg: number;
  itemsDetected: { name: string; weight: string; calories: string; allergen: string }[];
  imageUrl: string;
  videoUrl?: string;
}

export interface LiveDispatchTelemetry {
  dispatchId: string;
  donorName: string;
  ngoName: string;
  riderName: string;
  riderVehicle: string;
  temperatureReading: number;
  batteryPct: number;
  distanceKm: number;
  etaRemainingSeconds: number;
  mealsCount: number;
  batchType: string;
  pickupTime: string;
}

export const RESCUE_NODES: RescueNode[] = [
  {
    id: 'node-01',
    name: 'Grand Horizon Convention Hotel',
    type: 'donor',
    category: '5-Star Hospitality & Banquet',
    neighborhood: 'Indiranagar Central',
    position3D: [-3.4, 0.9, -1.8],
    activeBatch: 'Royal Banquet Saffron Pilaf, Dal Makhani & Paneer Gravy',
    quantityKg: 48,
    mealsEquivalent: 192,
    temperature: '65.4°C Thermal Box',
    etaMinutes: 14,
    status: 'Dispatched',
    partnerName: 'Annapurna Seva Community Kitchen',
    co2SavedKg: 120,
    freshnessScore: 99,
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'node-02',
    name: 'Hearth & Grain Artisan Bakery',
    type: 'donor',
    category: 'Craft Bakery & Cafe',
    neighborhood: 'Koramangala 4th Block',
    position3D: [2.9, 0.65, -2.2],
    activeBatch: 'Country Sourdough Boules, Multigrain Baguettes & Brioche',
    quantityKg: 22,
    mealsEquivalent: 88,
    temperature: '24.1°C Sealed Pod',
    etaMinutes: 9,
    status: 'Ready for Pickup',
    partnerName: 'Sunrise Children’s Shelter',
    co2SavedKg: 55,
    freshnessScore: 98,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'node-03',
    name: 'Verdant TechPark Campus Dining',
    type: 'donor',
    category: 'Corporate Cafeteria',
    neighborhood: 'Bellandur Eco-Corridor',
    position3D: [-2.5, 0.85, 2.5],
    activeBatch: 'Steamed Organic Millet Bowls, Lentil Stew & Farm Greens',
    quantityKg: 64,
    mealsEquivalent: 256,
    temperature: '63.8°C Insulated Pod',
    etaMinutes: 19,
    status: 'Dispatched',
    partnerName: 'Hope Haven Night Shelter',
    co2SavedKg: 160,
    freshnessScore: 97,
    imageUrl: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'node-04',
    name: 'Lotus Pavilion Wedding Mandap',
    type: 'donor',
    category: 'Events & Celebrations',
    neighborhood: 'Jayanagar South',
    position3D: [3.2, 0.75, 2.1],
    activeBatch: 'Festive Thali Feast, Butter Rotis & Gulab Jamun',
    quantityKg: 85,
    mealsEquivalent: 340,
    temperature: '66.2°C Active Hot-Chain',
    etaMinutes: 11,
    status: 'Dispatched',
    partnerName: 'Seva Metro Relief Hub',
    co2SavedKg: 212.5,
    freshnessScore: 99,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'node-05',
    name: 'Annapurna Seva Community Kitchen',
    type: 'ngo',
    category: 'Verified Hunger Relief NGO',
    neighborhood: 'Ulsoor Community Center',
    position3D: [0.2, 1.1, -0.3],
    activeBatch: 'Receiving 3 Active Routes • 536 Meals Incoming',
    quantityKg: 134,
    mealsEquivalent: 536,
    temperature: 'FSSAI Gold Audited',
    etaMinutes: 12,
    status: 'Verified & Served',
    partnerName: 'Central AI Dispatch Bridge',
    co2SavedKg: 335,
    freshnessScore: 100,
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
  },
];

export const AI_SCAN_PRESETS: AIScanPreset[] = [
  {
    id: 'banquet-surplus',
    title: 'Post-Conference Hot Buffet Trays',
    source: 'Grand Horizon Hotel • Main Banquet Kitchen',
    weightKg: 42,
    estimatedMeals: 168,
    shelfLifeHours: 4.5,
    tempChain: 'Hot Holding (63°C+)',
    safetyConfidence: 99.4,
    matchedNgo: 'Annapurna Seva Foundation (2.1 km away)',
    distanceKm: 2.1,
    co2PreventedKg: 105,
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-food-in-a-restaurant-kitchen-42442-large.mp4',
    itemsDetected: [
      { name: 'Aromatic Basmati Pilaf (2 Gastronorm Trays)', weight: '18.5 kg', calories: '24,100 kcal', allergen: 'Gluten-Free' },
      { name: 'Slow-Simmered Yellow Dal Tadka', weight: '12.0 kg', calories: '14,400 kcal', allergen: 'Dairy (Ghee)' },
      { name: 'Roasted Seasonal Vegetable Medley', weight: '11.5 kg', calories: '9,200 kcal', allergen: 'Vegan / Nut-Free' },
    ],
  },
  {
    id: 'bakery-harvest',
    title: 'Evening Bakery Day-End Harvest',
    source: 'Hearth & Grain Artisan Bakery',
    weightKg: 19,
    estimatedMeals: 76,
    shelfLifeHours: 18,
    tempChain: 'Ambient Dry (22°C)',
    safetyConfidence: 98.9,
    matchedNgo: 'Sunrise Youth & Night Shelter (1.4 km away)',
    distanceKm: 1.4,
    co2PreventedKg: 47.5,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fresh-bread-loaves-in-a-bakery-42466-large.mp4',
    itemsDetected: [
      { name: 'Country Wholewheat Sourdough Boules (24 pcs)', weight: '10.8 kg', calories: '25,900 kcal', allergen: 'Wheat / Gluten' },
      { name: 'Spinach & Corn Baked Savories', weight: '5.2 kg', calories: '11,400 kcal', allergen: 'Wheat, Dairy' },
      { name: 'Oat & Jaggery Energy Muffins', weight: '3.0 kg', calories: '8,100 kcal', allergen: 'Gluten-Free Oats' },
    ],
  },
  {
    id: 'farm-produce',
    title: 'Supermarket Grade-A Fresh Produce Surplus',
    source: 'GreenLeaf Organic Market Hub',
    weightKg: 65,
    estimatedMeals: 260,
    shelfLifeHours: 36,
    tempChain: 'Chilled (2°C–5°C)',
    safetyConfidence: 99.7,
    matchedNgo: 'Nourish Community Co-op Kitchen (3.2 km away)',
    distanceKm: 3.2,
    co2PreventedKg: 162.5,
    imageUrl: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fresh-vegetables-on-a-wooden-table-42458-large.mp4',
    itemsDetected: [
      { name: 'Crisp Vine Tomatoes & Bell Peppers', weight: '28.0 kg', calories: '6,200 kcal', allergen: 'None (Raw Produce)' },
      { name: 'Baby Spinach & Fenugreek Bundles', weight: '15.0 kg', calories: '3,800 kcal', allergen: 'None (Raw Produce)' },
      { name: 'Orchard Bananas & Seasonal Papayas', weight: '22.0 kg', calories: '18,900 kcal', allergen: 'None (Fresh Fruit)' },
    ],
  },
];

export const COMMUNITY_STORIES: CommunityStory[] = [
  {
    id: 'story-chef',
    role: 'Donor Partner',
    name: 'Chef Arvind Mehta',
    title: 'Executive Culinary Director',
    organization: 'Grand Horizon Hospitality Group',
    location: 'Bengaluru',
    quote:
      'Throwing away untouched banquet food used to break my kitchen team’s heart every single night. With FoodBridge, logging surplus takes 45 seconds, and a thermal van arrives before we finish kitchen teardown.',
    storyDetail:
      'Over 14 months, Grand Horizon’s 3 properties have redirected 18,400 kg of gourmet surplus into 73,600 hot dinners while earning verified ESG zero-waste certification.',
    metricLabel: 'Meals Donated',
    metricValue: '73,600+',
    secondaryMetric: '46.0 Tonnes CO₂e Prevented',
    avatarGradient: 'from-emerald-600 to-teal-700',
    initials: 'AM',
    verifiedBatchId: 'FB-CERT-2026-8841',
    tags: ['Zero-Waste Kitchen', '45-Min Pickup', 'FSSAI Shield'],
    imageUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-food-in-a-restaurant-kitchen-42442-large.mp4',
    audioDuration: '0:42',
  },
  {
    id: 'story-ngo',
    role: 'NGO Partner',
    name: 'Meera Krishnan',
    title: 'Founder & Operations Lead',
    organization: 'Annapurna Seva Foundation',
    location: 'Chennai & Bengaluru',
    quote:
      'Before FoodBridge, we spent 4 hours on WhatsApp calling restaurants and guessing quantities. Now we get live nutritional manifests, exact thermal logs, and predictable ETA alerts.',
    storyDetail:
      'Annapurna Seva now feeds 1,400 daily-wage families and senior citizens every evening with restaurant-grade nutrition, cutting their procurement overhead by 68%.',
    metricLabel: 'Daily People Fed',
    metricValue: '1,400 / day',
    secondaryMetric: '99.8% On-Time Thermal Delivery',
    avatarGradient: 'from-emerald-700 to-emerald-900',
    initials: 'MK',
    verifiedBatchId: 'FB-NGO-2026-1094',
    tags: ['Verified Shelter', 'Live Capacity Sync', 'Cold-Chain'],
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-people-eating-together-at-a-table-42450-large.mp4',
    audioDuration: '0:38',
  },
  {
    id: 'story-volunteer',
    role: 'Volunteer Captain',
    name: 'Rohan Deshmukh',
    title: 'Lead Night-Shift Rescue Rider',
    organization: 'FoodBridge Hunger Heroes Guild',
    location: 'Pune & Mumbai',
    quote:
      'My 90-minute evening ride after work turns surplus wedding feasts into smiles at railway shelter homes. The app’s 3D route batching makes every kilometer count.',
    storyDetail:
      'Rohan leads a neighborhood squad of 42 student and professional cyclists & EV riders who have completed 1,120 zero-emission rescue runs.',
    metricLabel: 'Rescue Runs Completed',
    metricValue: '1,120 Runs',
    secondaryMetric: '100% EV & Pedal Fleet',
    avatarGradient: 'from-orange-500 to-amber-600',
    initials: 'RD',
    verifiedBatchId: 'FB-HERO-2026-4412',
    tags: ['Green EV Fleet', 'Community Hero', 'Night Patrol'],
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4',
    audioDuration: '0:55',
  },
  {
    id: 'story-wedding',
    role: 'Event Host',
    name: 'Kavya & Siddharth Nair',
    title: 'Zero-Waste Wedding Pledgers',
    organization: 'Lotus Pavilion Reception',
    location: 'Hyderabad',
    quote:
      'We booked a FoodBridge Standby Pod right alongside our wedding caterer. Knowing 380 guests’ worth of surplus feast blessed an orphanage that very night was our best wedding gift.',
    storyDetail:
      'Every guest received a digital impact receipt showing the exact meals shared and carbon footprint neutralized in honor of the couple.',
    metricLabel: 'Single-Event Impact',
    metricValue: '380 Meals',
    secondaryMetric: '238 kg CO₂e Neutralized',
    avatarGradient: 'from-rose-500 to-orange-500',
    initials: 'KS',
    verifiedBatchId: 'FB-EVENT-2026-9201',
    tags: ['Green Weddings', 'Instant Pledge', 'Live Guest Certificate'],
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waiter-serving-food-at-a-banquet-42446-large.mp4',
    audioDuration: '0:34',
  },
];

export const LIVE_TELEMETRY: LiveDispatchTelemetry = {
  dispatchId: 'FB-DISPATCH-9942',
  donorName: 'Grand Horizon Convention Hotel',
  ngoName: 'Annapurna Seva Community Kitchen',
  riderName: 'Vikram Singh (Hunger Hero #41)',
  riderVehicle: 'Ather 450X EV with Dual Thermocrate Pod',
  temperatureReading: 65.4,
  batteryPct: 84,
  distanceKm: 2.1,
  etaRemainingSeconds: 524, // ~8 mins 44 sec
  mealsCount: 192,
  batchType: 'Hot Gastronorm Banquet Feasts',
  pickupTime: '21:14 IST',
};

export const TICKER_EVENTS = [
  'LIVE DISPATCH: 48 kg Royal Banquet Meals picked up from Grand Horizon Hotel → En route to Annapurna Seva (ETA 8m)',
  'VERIFIED IMPACT: Hearth & Grain Bakery rescued 22 kg Sourdough & Rolls → 88 Meals served at Sunrise Shelter',
  'CARBON MILESTONE: FoodBridge Metro Grid just crossed 86.4 Tonnes of Methane CO₂e prevented this quarter',
  'NEW PARTNER: Verdant TechPark Cafeteria #4 joined the Daily Zero-Waste Pledge (Est. 1,200 meals/week)',
  'VOLUNTEER ALERT: 14 Hunger Hero EV Riders active in Indiranagar, Koramangala & Jayanagar zones',
  'LIVE AUDIT: FSSAI hygiene certificate verified for 32 active food transports with 99.4% cold/hot-chain compliance',
];

export const LIVE_ACTIVITY_STREAM = [
  {
    id: 'act-1',
    type: 'pickup',
    donor: 'ITC Gardenia',
    ngo: 'Koramangala Shelter',
    qty: '38 kg Biryani & Curries',
    time: '2 mins ago',
    badge: 'Hot Holding',
  },
  {
    id: 'act-2',
    type: 'delivery',
    donor: 'Sourdough & Co',
    ngo: 'Sneha Care Orphanage',
    qty: '65 fresh loaves',
    time: '5 mins ago',
    badge: 'Delivered',
  },
  {
    id: 'act-3',
    type: 'pledge',
    donor: 'Taj West End Reception',
    ngo: 'Metro Relief Kitchen',
    qty: '110 kg Wedding Feast',
    time: '8 mins ago',
    badge: 'Dispatched',
  },
  {
    id: 'act-4',
    type: 'volunteer',
    donor: 'Hunger Hero Rahul',
    ngo: 'Jayanagar Zone',
    qty: 'Completed 5th rescue run',
    time: '12 mins ago',
    badge: 'Hero Milestone',
  },
];
