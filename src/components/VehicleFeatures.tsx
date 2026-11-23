import React, { useState } from 'react';
import { 
  Shield, 
  Zap, 
  BatteryCharging, 
  Layers, 
  Truck, 
  Cpu, 
  Box, 
  Compass, 
  Check,
  Target,
  RotateCcw,
  Power,
  Tv,
  Home,
  Wrench,
  Tent
} from 'lucide-react';
import { cyberAudio } from '../lib/cyberAudio';

export const VehicleFeatures: React.FC = () => {
  // Interactive Armor Glass Torture Test State
  const [impactCount, setImpactCount] = useState<number>(0);
  const [isStriking, setIsStriking] = useState<boolean>(false);
  const [crackedState, setCrackedState] = useState<boolean>(false);

  // Powershare Wattage Simulator State
  const [activeAppliances, setActiveAppliances] = useState<string[]>(['home', 'tools']);

  const appliances = [
    { id: 'home', name: 'Emergency Home Backup (Full House)', watts: 9600, icon: Home, desc: 'Powers lighting, refrigerators, medical gear, and HVAC.' },
    { id: 'tools', name: 'Jobsite High-Voltage Tools', watts: 2400, icon: Wrench, desc: '240V bed outlets running continuous welders & table saws.' },
    { id: 'tent', name: 'BaseCamp Expedition HVAC & Induction', watts: 1200, icon: Tent, desc: 'Heats or cools camper tent and powers induction cooktop.' },
    { id: 'av', name: 'Field Studio & Starlink Uplink', watts: 650, icon: Tv, desc: 'Studio audio monitors, cinema cameras, and satellite internet.' },
  ];

  const totalWatts = activeAppliances.reduce((acc, curr) => {
    const item = appliances.find(a => a.id === curr);
    return acc + (item ? item.watts : 0);
  }, 0);

  // Calculate battery runtime on 123 kWh pack (hours = 123,000 Wh / totalWatts)
  const estimatedHours = totalWatts > 0 ? (123000 / totalWatts).toFixed(1) : '∞';
  const estimatedDays = totalWatts > 0 ? (123000 / totalWatts / 24).toFixed(1) : '∞';

  const toggleAppliance = (id: string) => {
    cyberAudio.playClick(1000);
    setActiveAppliances(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Trigger Steel Ball Launch on Armor Glass
  const triggerImpact = () => {
    if (isStriking) return;
    setIsStriking(true);
    cyberAudio.playClick(600);

    setTimeout(() => {
      cyberAudio.playImpact();
      setImpactCount(prev => prev + 1);
      setCrackedState(true);
      setIsStriking(false);
    }, 450);
  };

  const resetGlass = () => {
    cyberAudio.playClick(800);
    setImpactCount(0);
    setCrackedState(false);
  };

  const features = [
    {
      id: 'exoskeleton',
      title: 'Ultra-Hard 30X Stainless Steel Exoskeleton',
      icon: Shield,
      headline: 'NO PAINT. NO CHIPS. NO DENTS.',
      description: 'Built with an exterior shell made for ultimate durability and passenger protection. Starting with a nearly impenetrable exoskeleton, every component is designed for superior strength and endurance, from Ultra-Hard 30X Cold-Rolled stainless-steel structural skin to Tesla armor glass.',
      specs: ['Cold-Rolled 30X Alloy', 'Monocoque Torsional Rigidity', 'Bullet Resistant to 9mm & .45 ACP'],
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'armorglass',
      title: 'Shatter-Resistant Armor Glass',
      icon: Layers,
      headline: 'ACOUSTIC SHIELD & IMPACT RESISTANCE',
      description: 'Ultra-strong glass and polymer-layered composite can absorb and redirect impact force for improved performance and damage tolerance, while dampening high-speed exterior wind noise to provide a library-quiet cabin.',
      specs: ['Class 4 Hail Resistance', 'Acoustic Laminated Glass', 'Polymer Shock Layer'],
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'performance',
      title: 'Tri-Motor Cyberbeast Performance',
      icon: Zap,
      headline: '0-60 MPH IN 2.6 SECONDS',
      description: 'With three high-performance permanent magnet electric motors, the Cyberbeast accelerates faster than most dedicated track sports cars while retaining full off-road climbing torque and instant torque vectoring to each wheel.',
      specs: ['845 Horsepower', '10,296 lb-ft Wheel Torque', 'Top Speed: 130 mph'],
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'electric',
      title: '800V High-Voltage Architecture',
      icon: BatteryCharging,
      headline: 'UP TO 136 MILES IN 15 MINUTES',
      description: 'The first vehicle to feature an 800-volt electrical powertrain with bidirectional Powershare technology. Charges ultra-fast at V4 Superchargers and powers external jobsites or your entire house during power outages.',
      specs: ['800V Bus Architecture', 'Up to 250kW Supercharging', 'Bidirectional Powershare'],
      image: 'https://images.unsplash.com/photo-1558441719-8b489c63f732?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'utility',
      title: '11,000 lbs Towing & 2,500 lbs Payload',
      icon: Truck,
      headline: 'HAUL VIRTUALLY ANYTHING',
      description: 'With 11,000 pounds of towing capacity—the equivalent of an average African elephant—and an ultra-tough composite bed that requires no bedliner, the Cybertruck is engineered to get serious work done without hesitation.',
      specs: ['11,000 lbs Towing Capacity', '2,500 lbs Composite Bed Payload', 'Integrated L-Track Tie Downs'],
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'technology',
      title: 'Steer-by-Wire & 4-Wheel Steering',
      icon: Cpu,
      headline: 'TURNS TIGHTER THAN A MODEL S',
      description: 'Fully electronic steer-by-wire eliminates physical steering columns, adjusting steering ratio dynamically between parking lot maneuvers and high-speed highway cruising. 4-wheel steering allows extreme agility in tight urban environments.',
      specs: ['Dynamic Steering Ratio', 'Rear-Wheel Angle up to 10°', '360° Surround Vision Cameras'],
      image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'storage',
      title: 'Lockable Vault Cargo Bed',
      icon: Box,
      headline: '68 CUBIC FEET OF SECURE STORAGE',
      description: 'A 6-foot by 4-foot composite bed with motorized power tonneau cover locks securely to protect your tools, camping equipment, and sports gear. Hidden under-bed gear lockers provide weatherproof storage with drain plugs.',
      specs: ['120V & 240V In-Bed Outlets', 'Motorized Power Tonneau', 'Hidden Sub-Trunk Storage'],
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'offroad',
      title: 'Adaptive Air Suspension & 16" Clearance',
      icon: Compass,
      headline: 'CONQUER ANY RUGGED TERRAIN',
      description: 'Electronically controlled air suspension offers 12 inches of travel and up to 16 inches of ground clearance in Extract Mode, gliding smoothly over rocky trails, dunes, and river crossings.',
      specs: ['Up to 16" Ground Clearance', '35° Approach Angle', '28° Departure Angle'],
      image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/40 border border-red-900/60 px-3 py-1 rounded">
            <Cpu className="w-3.5 h-3.5" />
            ENGINEERING SPECIFICATIONS & INNOVATION
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white font-sans">
            ADVANCED <span className="text-metallic">EXOSKELETON</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-sans leading-relaxed">
            Every millimeter of the Cybertruck is engineered from the ground up to redefine what an automotive platform can withstand.
          </p>
        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE LAB 1: ARMOR GLASS TORTURE TEST SIMULATOR    */}
        {/* ======================================================== */}
        <div className="mb-20 bg-neutral-950 border border-neutral-800 rounded-lg p-6 sm:p-8 clip-chamfer shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/5 blur-[120px] pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Description */}
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono text-red-500 uppercase tracking-widest">
                <Target className="w-3.5 h-3.5" />
                INTERACTIVE TORTURE TEST SIMULATION
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-sans uppercase text-white">
                Tesla Armor Glass Stress Test
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                Test the ballistic and blunt force impact threshold of the laminated acoustic armor glass. 
                Click to catapult a high-velocity solid steel ball directly at the driver window and inspect the structural absorption.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={triggerImpact}
                  disabled={isStriking}
                  className="px-6 py-3 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-mono text-xs font-bold uppercase tracking-widest clip-chamfer transition-all shadow-red-glow flex items-center gap-2"
                >
                  <Target className="w-4 h-4" />
                  <span>{isStriking ? 'Launching Ball...' : 'Launch Steel Ball Impact'}</span>
                </button>

                {crackedState && (
                  <button
                    onClick={resetGlass}
                    className="px-4 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white font-mono text-xs font-bold uppercase tracking-wider rounded border border-neutral-800 flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Window</span>
                  </button>
                )}
              </div>

              <div className="pt-2 text-xs font-mono text-neutral-400 flex items-center gap-6">
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase">STRIKES LOGGED</span>
                  <span className="text-lg font-bold text-white">{impactCount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase">STATUS</span>
                  <span className={`text-xs font-bold ${crackedState ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {crackedState ? 'MICRO-FRACTURE (SHIELD INTACT)' : 'PRISTINE / FULL SHIELD'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500 block uppercase">BALLISTIC RATING</span>
                  <span className="text-xs font-bold text-red-500">CLASS 4 ASTM</span>
                </div>
              </div>
            </div>

            {/* Interactive Glass Window Target Viewport */}
            <div className="relative w-full max-w-sm aspect-[4/3] bg-neutral-900 border-2 border-neutral-700 rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
              
              {/* Glass surface tint */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-black/95" />
              
              {/* Acoustic glass reflections */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_50%,rgba(255,255,255,0.02)_100%)] pointer-events-none" />

              {/* Crosshair target overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="w-32 h-32 rounded-full border border-dashed border-red-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-red-600" />
                </div>
              </div>

              {/* Flying Steel Ball Animation */}
              {isStriking && (
                <div className="absolute z-30 w-12 h-12 rounded-full bg-gradient-to-br from-slate-200 via-slate-400 to-slate-800 shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-ping" />
              )}

              {/* Spiderweb Micro-Fracture SVG when cracked */}
              {crackedState && (
                <svg viewBox="0 0 200 200" className="absolute z-20 w-44 h-44 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
                  <circle cx="100" cy="100" r="16" fill="#ffffff" opacity="0.4" />
                  <line x1="100" y1="100" x2="30" y2="40" stroke="#ffffff" strokeWidth="2" opacity="0.85" />
                  <line x1="100" y1="100" x2="170" y2="35" stroke="#ffffff" strokeWidth="2" opacity="0.85" />
                  <line x1="100" y1="100" x2="160" y2="165" stroke="#ffffff" strokeWidth="2.5" opacity="0.9" />
                  <line x1="100" y1="100" x2="45" y2="170" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
                  <line x1="100" y1="100" x2="190" y2="105" stroke="#ffffff" strokeWidth="1.5" opacity="0.75" />
                  <line x1="100" y1="100" x2="10" y2="110" stroke="#ffffff" strokeWidth="1.5" opacity="0.7" />
                  <circle cx="100" cy="100" r="45" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />
                </svg>
              )}

              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-neutral-400 bg-black/60 px-2 py-0.5 rounded">
                POLYMER LAYER ABSORPTION CORE
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE LAB 2: POWERSHARE BI-DIRECTIONAL CALCULATOR   */}
        {/* ======================================================== */}
        <div className="mb-20 bg-neutral-950 border border-neutral-800 rounded-lg p-6 sm:p-8 clip-chamfer shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-800 pb-5 mb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest mb-1.5">
                <Power className="w-3.5 h-3.5" />
                POWERSHARE BIDIRECTIONAL ENERGY GRID
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-sans uppercase text-white">
                Off-Grid Runtime Calculator
              </h2>
            </div>

            <div className="text-right font-mono">
              <span className="text-[10px] text-neutral-500 uppercase block">123 kWh PACK LOAD</span>
              <span className="text-xl font-black text-red-500">{totalWatts.toLocaleString()} W / 11,500 W Max</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Appliance toggles */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {appliances.map((app) => {
                const Icon = app.icon;
                const isChecked = activeAppliances.includes(app.id);
                return (
                  <button
                    key={app.id}
                    onClick={() => toggleAppliance(app.id)}
                    className={`p-3.5 rounded border text-left transition-all flex flex-col justify-between ${
                      isChecked
                        ? 'border-red-600 bg-red-950/20 shadow-red-glow-sm'
                        : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-1.5 rounded ${isChecked ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono font-bold text-neutral-300">
                        {app.watts.toLocaleString()} W
                      </span>
                    </div>

                    <h4 className="text-xs font-mono font-bold text-white mb-0.5">
                      {app.name}
                    </h4>
                    <p className="text-[10px] font-mono text-neutral-400 leading-tight">
                      {app.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Live Telemetry Display */}
            <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded p-6 font-mono space-y-4">
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest block border-b border-neutral-800 pb-2">
                ESTIMATED AUTONOMOUS RUNTIME
              </span>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">CONTINUOUS RUN</span>
                  <div className="text-3xl font-black text-white font-mono">
                    {estimatedHours} <span className="text-xs font-normal text-red-500">HRS</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-neutral-500 uppercase block">DAYS OFF-GRID</span>
                  <div className="text-3xl font-black text-white font-mono">
                    {estimatedDays} <span className="text-xs font-normal text-red-500">DAYS</span>
                  </div>
                </div>
              </div>

              {/* Output Meter */}
              <div className="space-y-1 pt-2">
                <div className="flex justify-between text-[11px] text-neutral-400">
                  <span>Inverter Output Utilization</span>
                  <span>{((totalWatts / 11500) * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-black h-2 rounded-full overflow-hidden border border-neutral-800">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 transition-all duration-300"
                    style={{ width: `${Math.min((totalWatts / 11500) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <p className="text-[10px] text-neutral-400 leading-tight">
                *Powershare bidirectional charging delivers up to 11.5 kW of continuous power via integrated 120V & 240V bed outlets.
              </p>
            </div>
          </div>
        </div>

        {/* 8 Feature Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => cyberAudio.playClick(950)}
                className="bg-neutral-950 border border-neutral-800 hover:border-red-600/70 rounded-lg overflow-hidden group transition-all duration-300 clip-chamfer shadow-xl flex flex-col justify-between cursor-pointer"
              >
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded bg-neutral-900 border border-neutral-700 flex items-center justify-center text-red-500 group-hover:border-red-600 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500">
                      0{idx + 1} // SPECS
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-sans text-white group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-red-500 tracking-wider mt-1 uppercase">
                      {item.headline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-neutral-900 space-y-1.5">
                    {item.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-red-500" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-44 w-full overflow-hidden bg-neutral-900 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Trim Comparison Matrix */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6 sm:p-8 clip-chamfer">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-mono text-red-500 uppercase tracking-widest">
              POWERTRAIN MATRIX
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-sans uppercase text-white">
              Compare Powertrain Trims
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 uppercase tracking-wider">
                  <th className="pb-4 font-semibold">Specification</th>
                  <th className="pb-4 font-semibold text-neutral-300">Rear-Wheel Drive</th>
                  <th className="pb-4 font-semibold text-neutral-300">All-Wheel Drive</th>
                  <th className="pb-4 font-semibold text-red-500">Cyberbeast (Tri-Motor)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                <tr>
                  <td className="py-3 text-neutral-400 font-bold">0-60 MPH Acceleration</td>
                  <td className="py-3">6.5 sec</td>
                  <td className="py-3">4.1 sec</td>
                  <td className="py-3 font-bold text-red-400">2.6 sec</td>
                </tr>
                <tr>
                  <td className="py-3 text-neutral-400 font-bold">Estimated Range</td>
                  <td className="py-3">250 miles</td>
                  <td className="py-3">340 miles (470+ w/ ext)</td>
                  <td className="py-3 font-bold text-red-400">320 miles (440+ w/ ext)</td>
                </tr>
                <tr>
                  <td className="py-3 text-neutral-400 font-bold">Total Horsepower</td>
                  <td className="py-3">315 HP</td>
                  <td className="py-3">600 HP</td>
                  <td className="py-3 font-bold text-red-400">845 HP</td>
                </tr>
                <tr>
                  <td className="py-3 text-neutral-400 font-bold">Towing Capacity</td>
                  <td className="py-3">7,500 lbs</td>
                  <td className="py-3">11,000 lbs</td>
                  <td className="py-3 font-bold text-red-400">11,000 lbs</td>
                </tr>
                <tr>
                  <td className="py-3 text-neutral-400 font-bold">Motors Configuration</td>
                  <td className="py-3">Single Permanent Magnet</td>
                  <td className="py-3">Dual Permanent Magnet</td>
                  <td className="py-3 font-bold text-red-400">Tri-Motor (1 Front, 2 Rear)</td>
                </tr>
                <tr>
                  <td className="py-3 text-neutral-400 font-bold">Starting Price</td>
                  <td className="py-3">$60,990</td>
                  <td className="py-3">$79,990</td>
                  <td className="py-3 font-bold text-white text-sm">$99,990</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
