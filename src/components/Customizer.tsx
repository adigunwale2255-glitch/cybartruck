import React, { useState } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  Check, 
  Share2, 
  Zap, 
  Shield, 
  DollarSign, 
  Sparkles, 
  Send, 
  Info, 
  ArrowUpDown, 
  Play 
} from 'lucide-react';
import { BuildSpec, OrderRecord } from '../types';
import { cyberAudio } from '../lib/cyberAudio';
import { OrderModal } from './OrderModal';

interface CustomizerProps {
  onShareToChat: (build: BuildSpec) => void;
  onOrderPlaced?: (order: OrderRecord) => void;
}

interface FinishOption {
  id: string;
  name: string;
  price: number;
  hex: string;
  category: string;
  desc: string;
}

interface WheelOption {
  id: string;
  name: string;
  price: number;
  type: string;
  desc: string;
}

interface PowertrainOption {
  id: string;
  name: string;
  price: number;
  accel: string;
  range: string;
  hp: string;
  towing: string;
}

interface AccessoryOption {
  id: string;
  name: string;
  price: number;
  category: string;
  desc: string;
}

export const Customizer: React.FC<CustomizerProps> = ({ onShareToChat, onOrderPlaced }) => {
  // Perspectives
  const [viewAngle, setViewAngle] = useState<'front' | 'side' | 'rear' | 'iso'>('front');

  // Customization State
  const [selectedFinish, setSelectedFinish] = useState<string>('crimson');
  const [selectedWheels, setSelectedWheels] = useState<string>('turbine-22');
  const [selectedPowertrain, setSelectedPowertrain] = useState<string>('cyberbeast');
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>(['lightbar', 'tonneau']);
  const [selectedInterior, setSelectedInterior] = useState<string>('crimson-ambient');
  
  // Interactive Controls
  const [lightsActive, setLightsActive] = useState<boolean>(true);
  const [highBeamActive, setHighBeamActive] = useState<boolean>(true);
  const [underglowActive, setUnderglowActive] = useState<boolean>(true);
  const [hazardActive, setHazardActive] = useState<boolean>(false);
  const [suspensionHeight, setSuspensionHeight] = useState<number>(14);
  const [tonneauOpen, setTonneauOpen] = useState<boolean>(false);

  // Virtual Test Drive
  const [isTestDriving, setIsTestDriving] = useState<boolean>(false);
  const [testDriveSpeed, setTestDriveSpeed] = useState<number>(0);

  // Order Checkout Modal
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Mouse Parallax for Exoskeleton Studio Lighting
  const [specularPos, setSpecularPos] = useState({ x: 50, y: 50 });

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpecularPos({ x, y });
  };

  // Finishes
  const finishes: FinishOption[] = [
    { id: 'crimson', name: 'Satin Crimson Red', price: 4200, hex: '#b91c1c', category: 'Signature Wrap', desc: 'Deep satin metallic red with high-contrast edge reflections.' },
    { id: 'stainless', name: 'Raw 30X Stainless Steel', price: 0, hex: '#d4d4d8', category: 'Factory Raw', desc: 'Ultra-hard cold-rolled stainless steel, unpainted and scratch-resistant.' },
    { id: 'stealth-black', name: 'Stealth Matte Black', price: 3500, hex: '#18181b', category: 'Satin Wrap', desc: 'Self-healing urethane wrap absorbing 98% of ambient glare.' },
    { id: 'alpine-white', name: 'Alpine Matte White', price: 3500, hex: '#f4f4f5', category: 'Satin Wrap', desc: 'Clean arctic satin finish emphasizing the sharp geometric silhouette.' },
    { id: 'gunmetal', name: 'Tactical Gunmetal', price: 3800, hex: '#475569', category: 'Armor Wrap', desc: 'Heavy industrial metallic sheen inspired by aerospace armor.' },
    { id: 'desert-camo', name: 'Mojave Desert Camo', price: 5200, hex: '#78716c', category: 'Overland Wrap', desc: 'Special multi-tonal geometric pattern for extreme off-road terrain.' },
  ];

  // Wheels
  const wheels: WheelOption[] = [
    { id: 'aero-20', name: '20" Cyber Aero Covers', price: 0, type: 'Aerodynamic', desc: 'Maximizes highway range by smoothing wheel-well air turbulence.' },
    { id: 'turbine-22', name: '22" Cyber Turbine Forged', price: 4200, type: 'Performance', desc: 'Lightweight forged aluminum alloys with directional aero spokes.' },
    { id: 'offroad-20', name: '20" Off-Road Beadlock + 35"', price: 3500, type: 'Overland', desc: 'Goodyear Wrangler all-terrain rubber engineered for rock crawling.' },
    { id: 'red-accent', name: '22" Crimson Edge Forged', price: 4800, type: 'Custom Spec', desc: 'High-contrast red laser-etched lip with matte carbon aero disc.' },
  ];

  // Powertrains
  const powertrains: PowertrainOption[] = [
    { id: 'cyberbeast', name: 'Cyberbeast Tri-Motor AWD', price: 99990, accel: '2.6s', range: '320 mi', hp: '845 HP', towing: '11,000 lbs' },
    { id: 'all-wheel', name: 'All-Wheel Drive Dual Motor', price: 79990, accel: '4.1s', range: '340 mi', hp: '600 HP', towing: '11,000 lbs' },
    { id: 'rear-wheel', name: 'Rear-Wheel Drive Single Motor', price: 60990, accel: '6.5s', range: '250 mi', hp: '315 HP', towing: '7,500 lbs' },
  ];

  // Accessories
  const accessoriesList: AccessoryOption[] = [
    { id: 'lightbar', name: '500-Meter Cyber Lightbar', price: 1500, category: 'Lighting', desc: 'Roof-integrated 500-lumen LED matrix that pierces dark trails.' },
    { id: 'tonneau', name: 'Power Vault Tonneau Cover', price: 2000, category: 'Utility', desc: 'Motorized load-bearing stainless bed cover strong enough to stand on.' },
    { id: 'tent', name: 'BaseCamp CyberTent Suite', price: 3200, category: 'Camping', desc: 'Aerodynamic geodesic tent with awning and ultra-plush mattress.' },
    { id: 'bullbar', name: 'Heavy-Duty Steel Bullbar & Winch', price: 2400, category: 'Protection', desc: 'Chassis-mounted frontal steel armor rated for severe impacts.' },
    { id: 'solar', name: 'Solar Vault Bed Wing', price: 2800, category: 'Energy', desc: 'Adds up to 15 miles of off-grid solar recharge per day.' },
  ];

  const activeFinish = finishes.find(f => f.id === selectedFinish) || finishes[0];
  const activeWheels = wheels.find(w => w.id === selectedWheels) || wheels[0];
  const activePowertrain = powertrains.find(p => p.id === selectedPowertrain) || powertrains[0];
  
  const accessoriesTotal = selectedAccessories.reduce((acc, curr) => {
    const item = accessoriesList.find(a => a.id === curr);
    return acc + (item ? item.price : 0);
  }, 0);

  const totalPrice = activePowertrain.price + activeFinish.price + activeWheels.price + accessoriesTotal;
  const estimatedMonthly = Math.round((totalPrice * 0.9) / 60);

  const toggleAccessory = (id: string) => {
    cyberAudio.playClick(1100);
    setSelectedAccessories(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    cyberAudio.playClick(800);
    setSelectedFinish('stainless');
    setSelectedWheels('aero-20');
    setSelectedPowertrain('all-wheel');
    setSelectedAccessories(['tonneau']);
    setSelectedInterior('crimson-ambient');
    setSuspensionHeight(14);
    setTonneauOpen(false);
    setLightsActive(true);
    setUnderglowActive(true);
  };

  const triggerTestDrive = () => {
    if (isTestDriving) return;
    setIsTestDriving(true);
    cyberAudio.playLaunchSound(2.4);

    let s = 0;
    const interval = setInterval(() => {
      s += 4;
      if (s >= 60) {
        setTestDriveSpeed(60);
        clearInterval(interval);
        setTimeout(() => {
          setIsTestDriving(false);
          setTestDriveSpeed(0);
        }, 1200);
      } else {
        setTestDriveSpeed(s);
      }
    }, 150);
  };

  const currentBuildSpec: BuildSpec = {
    finishId: activeFinish.id,
    finishName: activeFinish.name,
    finishHex: activeFinish.hex,
    finishCategory: activeFinish.category,
    wheelsId: activeWheels.id,
    wheelsName: activeWheels.name,
    wheelsPrice: activeWheels.price,
    powertrainId: activePowertrain.id,
    powertrainName: activePowertrain.name,
    powertrainPrice: activePowertrain.price,
    interiorId: selectedInterior,
    interiorName: selectedInterior === 'crimson-ambient' ? 'Red Cyberline Ambient' : 'White Stealth Exoskeleton',
    accessories: selectedAccessories,
    totalPrice: totalPrice,
    timestamp: new Date().toISOString()
  };

  const suspensionYOffset = (14 - suspensionHeight) * 3;

  return (
    <div className="relative pt-24 pb-20 bg-black min-h-screen text-white select-none">
      
      {/* Top Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest mb-1.5">
              <Sliders className="w-3.5 h-3.5" />
              CYBERFORGE INTERACTIVE RIG CONFIGURATOR
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans">
              SPECIFY YOUR <span className="text-metallic">CYBERTRUCK</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="px-3.5 py-2 text-xs font-mono text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 bg-neutral-950 rounded flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={() => {
                cyberAudio.playClick(1300);
                onShareToChat(currentBuildSpec);
              }}
              className="px-4 py-2 text-xs font-mono text-red-400 hover:text-white border border-red-900 hover:border-red-600 bg-red-950/30 hover:bg-red-900/50 rounded flex items-center gap-2 transition-all shadow-red-glow-sm"
              title="Post this configuration to the CyberForge Community Chat"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share to Community Chat</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: VISUALIZER CANVAS */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            
            <div 
              onMouseMove={handleStageMouseMove}
              className={`relative aspect-[16/10] w-full bg-neutral-950 border border-neutral-800/80 rounded-lg overflow-hidden flex flex-col justify-between p-6 shadow-2xl transition-all duration-300 ${
                isTestDriving ? 'ring-2 ring-red-600 shadow-red-glow' : ''
              }`}
            >
              <div 
                className="absolute inset-0 pointer-events-none opacity-40 transition-opacity"
                style={{
                  background: `radial-gradient(circle 350px at ${specularPos.x}% ${specularPos.y}%, rgba(255,255,255,0.08), transparent 80%)`
                }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/60 via-black to-black pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    { id: 'front', label: '3/4 Dynamic Angle' },
                    { id: 'side', label: 'Side Profile' },
                    { id: 'rear', label: 'Vault & Tail' },
                    { id: 'iso', label: 'Overland Expedition' },
                  ].map((angle) => (
                    <button
                      key={angle.id}
                      onClick={() => {
                        cyberAudio.playLaser();
                        setViewAngle(angle.id as any);
                      }}
                      className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded transition-all ${
                        viewAngle === angle.id
                          ? 'bg-red-600 text-white shadow-red-glow-sm'
                          : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      {angle.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={triggerTestDrive}
                  disabled={isTestDriving}
                  className="px-3 py-1.5 bg-red-950/50 hover:bg-red-900/70 text-red-400 hover:text-white border border-red-800 rounded text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-red-glow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isTestDriving ? `Launching: ${testDriveSpeed} MPH` : 'Virtual Launch'}</span>
                </button>
              </div>

              {/* DYNAMIC VEHICLE RENDERER */}
              <div className="relative z-10 flex-1 flex items-center justify-center my-2">
                <div className={`w-full max-w-2xl transition-all duration-300 transform ${
                  isTestDriving ? 'translate-x-[2px] scale-[1.01]' : 'hover:scale-[1.01]'
                }`}>
                  <svg 
                    viewBox="0 0 900 480" 
                    className="w-full h-auto drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]"
                  >
                    <defs>
                      <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="80%">
                        <stop offset="0%" stopColor={activeFinish.hex} stopOpacity="1" />
                        <stop offset="30%" stopColor="#ffffff" stopOpacity={activeFinish.id === 'stainless' ? '0.45' : '0.2'} />
                        <stop offset="70%" stopColor={activeFinish.hex} stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#000000" stopOpacity="0.75" />
                      </linearGradient>

                      <linearGradient id="armorGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
                        <stop offset="40%" stopColor="#334155" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
                      </linearGradient>

                      <linearGradient id="wheelTread" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#18181b" />
                        <stop offset="50%" stopColor="#27272a" />
                        <stop offset="100%" stopColor="#09090b" />
                      </linearGradient>

                      <filter id="laserGlow" x="-25%" y="-25%" width="150%" height="150%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>

                      <filter id="underglowFilter" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="12" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                        </feMerge>
                      </filter>
                    </defs>

                    <ellipse cx="450" cy="425" rx="380" ry="25" fill="#000000" opacity="0.85" />

                    {underglowActive && (
                      <ellipse 
                        cx="450" 
                        cy="420" 
                        rx="360" 
                        ry="20" 
                        fill="#ef4444" 
                        filter="url(#underglowFilter)" 
                        opacity={hazardActive ? 0.3 : 0.8}
                        className={hazardActive ? 'animate-pulse' : ''}
                      />
                    )}

                    {viewAngle === 'front' && (
                      <g className="transition-transform duration-300" style={{ transform: `translateY(${suspensionYOffset}px)` }}>
                        <polygon points="120,330 180,240 450,140 760,280 720,350 200,370" fill="url(#bodyGradient)" />
                        <polygon points="450,140 760,280 820,330 780,360 480,250" fill="url(#bodyGradient)" opacity="0.9" />
                        <polygon points="760,280 840,325 810,380 740,370" fill="#18181b" stroke="#333" strokeWidth="2" />

                        <polygon points="450,140 330,190 490,255 640,230" fill="url(#armorGlass)" stroke="#27272a" strokeWidth="1.5" />
                        <polygon points="330,190 220,235 340,290 490,255" fill="url(#armorGlass)" opacity="0.85" />

                        <line x1="450" y1="140" x2="330" y2="190" stroke="#ffffff" strokeWidth="3" opacity="0.6" />
                        <line x1="450" y1="140" x2="760" y2="280" stroke="#ffffff" strokeWidth="2.5" opacity="0.5" />

                        {lightsActive && (
                          <g className={hazardActive ? 'animate-pulse' : ''}>
                            <line 
                              x1="745" y1="285" x2="838" y2="328" 
                              stroke="#ef4444" 
                              strokeWidth={highBeamActive ? "7" : "4"} 
                              strokeLinecap="round" 
                              filter="url(#laserGlow)" 
                            />
                            <line 
                              x1="745" y1="285" x2="838" y2="328" 
                              stroke="#ffffff" 
                              strokeWidth={highBeamActive ? "3" : "1.5"} 
                              strokeLinecap="round" 
                            />
                          </g>
                        )}

                        {selectedAccessories.includes('lightbar') && (
                          <g filter={lightsActive ? "url(#laserGlow)" : undefined}>
                            <polygon points="440,135 460,135 480,145 425,145" fill="#18181b" stroke="#ef4444" strokeWidth="1" />
                            {lightsActive && (
                              <>
                                <line x1="430" y1="140" x2="470" y2="140" stroke="#ffffff" strokeWidth="4" />
                                <line x1="410" y1="140" x2="490" y2="140" stroke="#ef4444" strokeWidth="3" />
                              </>
                            )}
                          </g>
                        )}

                        {selectedAccessories.includes('bullbar') && (
                          <g stroke="#dc2626" strokeWidth="4" strokeLinecap="round">
                            <line x1="820" y1="315" x2="855" y2="350" />
                            <line x1="855" y1="350" x2="840" y2="395" />
                            <line x1="800" y1="375" x2="855" y2="350" />
                          </g>
                        )}

                        <circle cx="730" cy="370" r="55" fill="url(#wheelTread)" stroke="#3f3f46" strokeWidth="4" />
                        <circle cx="730" cy="370" r="38" fill="#18181b" stroke={selectedWheels === 'red-accent' ? '#ef4444' : '#52525b'} strokeWidth="3" />
                        <circle cx="730" cy="370" r="16" fill="#09090b" />
                        <path 
                          d="M730,340 L730,400 M700,370 L760,370" 
                          stroke={selectedWheels === 'red-accent' ? '#ef4444' : '#71717a'} 
                          strokeWidth="4" 
                          className={isTestDriving ? 'animate-spin origin-[730px_370px]' : ''}
                        />

                        <circle cx="270" cy="365" r="58" fill="url(#wheelTread)" stroke="#3f3f46" strokeWidth="4" />
                        <circle cx="270" cy="365" r="40" fill="#18181b" stroke={selectedWheels === 'red-accent' ? '#ef4444' : '#52525b'} strokeWidth="3" />
                        <circle cx="270" cy="365" r="16" fill="#09090b" />
                        <path 
                          d="M270,335 L270,395 M240,365 L300,365" 
                          stroke={selectedWheels === 'red-accent' ? '#ef4444' : '#71717a'} 
                          strokeWidth="4" 
                          className={isTestDriving ? 'animate-spin origin-[270px_365px]' : ''}
                        />

                        <polygon points="330,375 670,380 670,390 330,385" fill="#18181b" />
                        <line x1="330" y1="388" x2="670" y2="393" stroke="#ef4444" strokeWidth="2.5" opacity="0.8" />
                      </g>
                    )}

                    {viewAngle === 'side' && (
                      <g className="transition-transform duration-300" style={{ transform: `translateY(${suspensionYOffset}px)` }}>
                        <polygon 
                          points="80,330 140,240 430,120 780,240 820,330 770,360 670,360 620,310 500,310 450,360 300,360 250,310 130,310 80,350" 
                          fill="url(#bodyGradient)" 
                          stroke="#3f3f46" 
                          strokeWidth="2"
                        />
                        <polygon points="260,225 430,135 620,230 420,230" fill="url(#armorGlass)" stroke="#27272a" strokeWidth="2" />
                        <polygon points="200,235 255,228 350,235 200,245" fill="url(#armorGlass)" opacity="0.8" />

                        {!tonneauOpen ? (
                          <line x1="140" y1="240" x2="430" y2="120" stroke="#18181b" strokeWidth="7" strokeDasharray="6,4" />
                        ) : (
                          <g>
                            <line x1="140" y1="240" x2="220" y2="205" stroke="#18181b" strokeWidth="8" />
                            <text x="260" y="210" fill="#ef4444" fontSize="11" fontFamily="monospace">BED OPEN [POWERSHARE ON]</text>
                          </g>
                        )}

                        {selectedAccessories.includes('tent') && (
                          <polygon points="150,235 340,160 410,130 180,235" fill="#3f3f46" stroke="#ef4444" strokeWidth="2" opacity="0.9" />
                        )}

                        {selectedAccessories.includes('lightbar') && (
                          <rect x="420" y="112" width="20" height="8" rx="2" fill="#ef4444" filter={lightsActive ? "url(#laserGlow)" : undefined} />
                        )}

                        <circle cx="190" cy="330" r="56" fill="url(#wheelTread)" stroke="#3f3f46" strokeWidth="5" />
                        <circle cx="190" cy="330" r="38" fill="#18181b" stroke={selectedWheels === 'red-accent' ? '#ef4444' : '#52525b'} strokeWidth="3" />
                        <circle cx="190" cy="330" r="14" fill="#09090b" />

                        <circle cx="560" cy="330" r="56" fill="url(#wheelTread)" stroke="#3f3f46" strokeWidth="5" />
                        <circle cx="560" cy="330" r="38" fill="#18181b" stroke={selectedWheels === 'red-accent' ? '#ef4444' : '#52525b'} strokeWidth="3" />
                        <circle cx="560" cy="330" r="14" fill="#09090b" />

                        {lightsActive && (
                          <circle cx="780" cy="242" r="5" fill="#ffffff" filter="url(#laserGlow)" />
                        )}
                        <circle cx="82" cy="332" r="4" fill="#ef4444" filter="url(#laserGlow)" />
                      </g>
                    )}

                    {viewAngle === 'rear' && (
                      <g className="transition-transform duration-300" style={{ transform: `translateY(${suspensionYOffset}px)` }}>
                        <polygon points="250,380 200,260 300,160 600,160 700,260 650,380" fill="url(#bodyGradient)" stroke="#3f3f46" strokeWidth="2" />
                        <polygon points="300,160 600,160 580,240 320,240" fill="url(#armorGlass)" />

                        <line 
                          x1="205" y1="262" x2="695" y2="262" 
                          stroke="#ef4444" 
                          strokeWidth="8" 
                          strokeLinecap="square" 
                          filter="url(#laserGlow)" 
                          className={hazardActive ? 'animate-pulse' : ''}
                        />
                        <line x1="205" y1="262" x2="695" y2="262" stroke="#ffffff" strokeWidth="2" />

                        <text 
                          x="450" y="330" 
                          textAnchor="middle" 
                          fontFamily="monospace" 
                          fontWeight="bold" 
                          fontSize="22" 
                          letterSpacing="6" 
                          fill="#ffffff" 
                          opacity="0.8"
                        >
                          CYBER<tspan fill="#ef4444">FORGE</tspan>
                        </text>

                        <rect x="150" y="310" width="60" height="90" rx="10" fill="url(#wheelTread)" stroke="#333" />
                        <rect x="690" y="310" width="60" height="90" rx="10" fill="url(#wheelTread)" stroke="#333" />
                      </g>
                    )}

                    {viewAngle === 'iso' && (
                      <g className="transition-transform duration-300" style={{ transform: `translateY(${suspensionYOffset}px)` }}>
                        <polygon points="200,320 280,180 550,110 820,220 680,370 200,370" fill="url(#bodyGradient)" stroke="#52525b" strokeWidth="2" />
                        <polygon points="280,180 550,110 720,200 480,240" fill="url(#armorGlass)" />
                        
                        <polygon points="210,310 380,140 540,115 320,310" fill="#27272a" stroke="#ef4444" strokeWidth="2" />
                        <text x="300" y="240" fill="#ffffff" fontSize="12" fontFamily="monospace">BASECAMP OVERLAND</text>

                        <circle cx="300" cy="370" r="50" fill="url(#wheelTread)" />
                        <circle cx="680" cy="370" r="50" fill="url(#wheelTread)" />
                        {lightsActive && (
                          <line x1="720" y1="205" x2="815" y2="225" stroke="#ef4444" strokeWidth="6" filter="url(#laserGlow)" />
                        )}
                      </g>
                    )}
                  </svg>
                </div>
              </div>

              {/* Bottom Interactive HUD Controls */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-800/80 pt-3 text-xs font-mono">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-neutral-500 uppercase mr-1">Controls:</span>
                  
                  <button
                    onClick={() => {
                      cyberAudio.playClick(1300);
                      setLightsActive(!lightsActive);
                    }}
                    className={`px-2 py-1 rounded text-[11px] font-mono border transition-all ${
                      lightsActive ? 'bg-red-950/40 border-red-600 text-red-400' : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                    }`}
                  >
                    Lights {lightsActive ? 'ON' : 'OFF'}
                  </button>

                  <button
                    onClick={() => {
                      cyberAudio.playClick(1400);
                      setUnderglowActive(!underglowActive);
                    }}
                    className={`px-2 py-1 rounded text-[11px] font-mono border transition-all ${
                      underglowActive ? 'bg-red-950/40 border-red-600 text-red-400' : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                    }`}
                  >
                    Neon Underglow
                  </button>

                  <button
                    onClick={() => {
                      cyberAudio.playClick(900);
                      setTonneauOpen(!tonneauOpen);
                    }}
                    className={`px-2 py-1 rounded text-[11px] font-mono border transition-all ${
                      tonneauOpen ? 'bg-neutral-800 border-neutral-600 text-white' : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    Vault {tonneauOpen ? 'OPEN' : 'CLOSED'}
                  </button>

                  <button
                    onClick={() => {
                      cyberAudio.playClick(800);
                      setHazardActive(!hazardActive);
                    }}
                    className={`px-2 py-1 rounded text-[11px] font-mono border transition-all ${
                      hazardActive ? 'bg-red-600 text-white animate-pulse' : 'bg-neutral-900 border-neutral-800 text-neutral-500'
                    }`}
                  >
                    Hazards
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-3.5 h-3.5 text-red-500" />
                  <span className="text-[10px] text-neutral-400 uppercase">Clearance:</span>
                  <input
                    type="range"
                    min="8"
                    max="16"
                    step="2"
                    value={suspensionHeight}
                    onChange={(e) => {
                      cyberAudio.playClick(700 + Number(e.target.value) * 50);
                      setSuspensionHeight(Number(e.target.value));
                    }}
                    className="w-20 accent-red-600 cursor-pointer"
                  />
                  <span className="text-white font-bold text-xs">{suspensionHeight}"</span>
                </div>
              </div>

            </div>

            {/* Quick Feature Pill Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div 
                onClick={() => cyberAudio.playClick(1000)}
                className="bg-neutral-950 border border-neutral-800 p-3 rounded cursor-pointer hover:border-red-600/50 transition-colors"
              >
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">0-60 MPH</span>
                <span className="text-lg font-bold font-mono text-white">{activePowertrain.accel}</span>
              </div>
              <div 
                onClick={() => cyberAudio.playClick(1100)}
                className="bg-neutral-950 border border-neutral-800 p-3 rounded cursor-pointer hover:border-red-600/50 transition-colors"
              >
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">Est. Range</span>
                <span className="text-lg font-bold font-mono text-white">{activePowertrain.range}</span>
              </div>
              <div 
                onClick={() => cyberAudio.playClick(1200)}
                className="bg-neutral-950 border border-neutral-800 p-3 rounded cursor-pointer hover:border-red-600/50 transition-colors"
              >
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">Horsepower</span>
                <span className="text-lg font-bold font-mono text-white">{activePowertrain.hp}</span>
              </div>
              <div 
                onClick={() => cyberAudio.playClick(1300)}
                className="bg-neutral-950 border border-neutral-800 p-3 rounded cursor-pointer hover:border-red-600/50 transition-colors"
              >
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">Towing</span>
                <span className="text-lg font-bold font-mono text-white">{activePowertrain.towing}</span>
              </div>
            </div>

          </div>

          {/* RIGHT: CONTROL PANEL */}
          <div className="lg:col-span-5 xl:col-span-4 bg-neutral-950 border border-neutral-800 rounded-lg p-6 space-y-6">
            
            {/* 1. Powertrain */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-red-500" />
                <span>1. Powertrain & Motors</span>
              </label>

              <div className="space-y-2">
                {powertrains.map((p) => {
                  const isSelected = selectedPowertrain === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        cyberAudio.playClick(1200);
                        setSelectedPowertrain(p.id);
                      }}
                      className={`w-full p-3 rounded text-left border transition-all ${
                        isSelected
                          ? 'border-red-600 bg-red-950/20 shadow-red-glow-sm'
                          : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-mono font-bold text-white">{p.name}</span>
                        <span className="text-xs font-mono font-bold text-neutral-300">
                          ${p.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-400">
                        <span>{p.accel} 0-60</span>
                        <span>•</span>
                        <span>{p.range}</span>
                        <span>•</span>
                        <span className="text-red-400">{p.hp}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Color Finish */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-red-500" />
                  <span>2. Color / Protective Wrap</span>
                </label>
                <span className="text-[11px] font-mono text-neutral-400">
                  {activeFinish.price === 0 ? 'Included' : `+$${activeFinish.price.toLocaleString()}`}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {finishes.map((f) => {
                  const isSelected = selectedFinish === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => {
                        cyberAudio.playClick(1000);
                        setSelectedFinish(f.id);
                      }}
                      className={`p-2.5 rounded border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-red-600 bg-neutral-900 shadow-red-glow-sm scale-[1.02]'
                          : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                      }`}
                    >
                      <div 
                        className="w-full h-7 rounded-sm mb-2 border border-neutral-700 shadow-inner" 
                        style={{ backgroundColor: f.hex }} 
                      />
                      <span className="text-[11px] font-mono font-bold text-white leading-tight truncate">
                        {f.name.split(' ')[0]}
                      </span>
                      <span className="text-[9px] font-mono text-neutral-400">
                        {f.price === 0 ? '$0' : `+$${f.price}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Wheels */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-red-500" />
                <span>3. Wheels & Tires</span>
              </label>

              <div className="space-y-2">
                {wheels.map((w) => {
                  const isSelected = selectedWheels === w.id;
                  return (
                    <button
                      key={w.id}
                      onClick={() => {
                        cyberAudio.playClick(1150);
                        setSelectedWheels(w.id);
                      }}
                      className={`w-full p-2.5 rounded text-left border flex items-center justify-between transition-all ${
                        isSelected
                          ? 'border-red-600 bg-red-950/20'
                          : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-mono font-bold text-white block">{w.name}</span>
                        <span className="text-[10px] font-mono text-neutral-400">{w.desc}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-neutral-300 ml-3">
                        {w.price === 0 ? 'Included' : `+$${w.price.toLocaleString()}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Accessories */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-red-500" />
                <span>4. CyberForge Accessories</span>
              </label>

              <div className="space-y-2">
                {accessoriesList.map((item) => {
                  const isChecked = selectedAccessories.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleAccessory(item.id)}
                      className={`w-full p-2.5 rounded text-left border flex items-center justify-between transition-all ${
                        isChecked
                          ? 'border-red-600 bg-red-950/20'
                          : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-sm flex items-center justify-center border ${
                          isChecked ? 'bg-red-600 border-red-500' : 'border-neutral-700 bg-neutral-900'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div>
                          <span className="text-xs font-mono font-semibold text-white block">{item.name}</span>
                          <span className="text-[10px] font-mono text-neutral-400">{item.category}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-neutral-300">
                        +${item.price.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pricing Summary Card & Checkout Trigger */}
            <div className="border-t border-neutral-800 pt-5 space-y-4">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Base MSRP:</span>
                  <span>${activePowertrain.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Wrap & Wheels:</span>
                  <span>+${(activeFinish.price + activeWheels.price).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Accessories:</span>
                  <span>+${accessoriesTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-800">
                  <span>Total Vehicle Price:</span>
                  <span className="text-red-500 font-mono">${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] text-neutral-500">
                  <span>Due Today (Refundable):</span>
                  <span className="text-white font-bold">$250.00</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    cyberAudio.playClick(1400);
                    setShowOrderModal(true);
                  }}
                  className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-widest clip-chamfer transition-all shadow-red-glow flex items-center justify-center gap-2"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Lock Configuration & Place Order</span>
                </button>

                <button
                  onClick={() => {
                    cyberAudio.playClick(1300);
                    onShareToChat(currentBuildSpec);
                  }}
                  className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-mono text-xs font-semibold uppercase tracking-wider border border-neutral-800 rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-red-500" />
                  <span>Share Build to Community Chat</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Official Checkout & Reservation Order Modal */}
      <OrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        buildSpec={currentBuildSpec}
        onOrderPlaced={(newOrder) => {
          if (onOrderPlaced) onOrderPlaced(newOrder);
        }}
        onShareToChat={onShareToChat}
      />

    </div>
  );
};
