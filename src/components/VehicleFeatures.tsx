import React, { useState } from 'react';
import { 
  Shield, 
  Zap, 
  BatteryCharging, 
  Layers, 
  Truck, 
  Cpu, 
  RotateCcw,
  Target,
  Home,
  Wrench,
  Tent,
  Tv,
  Check,
  Award
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
    { id: 'home', name: 'Emergency Home Backup (Full House)', watts: 9600, icon: Home, desc: 'Powers lighting, refrigerators, medical equipment, and HVAC.' },
    { id: 'tools', name: 'Jobsite High-Voltage Tools', watts: 2400, icon: Wrench, desc: '240V bed outlets running continuous welders & table saws.' },
    { id: 'tent', name: 'BaseCamp Expedition HVAC & Induction', watts: 1200, icon: Tent, desc: 'Heats or cools camper tent and powers induction cooktop.' },
    { id: 'av', name: 'Field Studio & Starlink Uplink', watts: 650, icon: Tv, desc: 'Studio audio monitors, cinema cameras, and satellite internet.' },
  ];

  const totalWatts = activeAppliances.reduce((acc, curr) => {
    const item = appliances.find(a => a.id === curr);
    return acc + (item ? item.watts : 0);
  }, 0);

  const estimatedHours = totalWatts > 0 ? (123000 / totalWatts).toFixed(1) : '∞';
  const estimatedDays = totalWatts > 0 ? (123000 / totalWatts / 24).toFixed(1) : '∞';

  const toggleAppliance = (id: string) => {
    cyberAudio.playClick(1000);
    setActiveAppliances(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

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
      description: 'Built with an exterior structural shell engineered for ultimate durability and occupant protection. Starting with a nearly impenetrable exoskeleton, every surface is crafted from Ultra-Hard 30X Cold-Rolled stainless steel, resisting corrosion, rock strikes, and projectile penetrations.',
      specs: ['Cold-Rolled 30X Alloy', 'Monocoque Torsional Rigidity', 'Bullet Resistant to 9mm & .45 ACP'],
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'armorglass',
      title: 'Shatter-Resistant Acoustic Armor Glass',
      icon: Layers,
      headline: 'ACOUSTIC SHIELD & IMPACT DAMPENING',
      description: 'Ultra-strong glass and polymer-layered composite can absorb and redirect severe impact force for damage tolerance, while dampening high-speed exterior wind turbulence to provide a library-quiet interior cabin.',
      specs: ['Class 4 Hail Resistance', 'Acoustic Laminated Glass', 'Polymer Shock Layer'],
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'performance',
      title: 'Tri-Motor Cyberbeast Powertrain',
      icon: Zap,
      headline: '0-60 MPH IN 2.6 SECONDS',
      description: 'With three high-performance permanent magnet electric motors, the Cyberbeast accelerates faster than dedicated track sports cars while retaining instant wheel torque vectoring across rocks, ice, and sand dunes.',
      specs: ['845 Horsepower', '10,296 lb-ft Wheel Torque', 'Top Speed: 130 mph'],
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'electric',
      title: '800V High-Voltage Architecture',
      icon: BatteryCharging,
      headline: 'UP TO 136 MILES IN 15 MINUTES',
      description: 'The first production vehicle to feature an 800-volt electrical powertrain with bidirectional Powershare technology. Charges ultra-fast at high-power DC Superchargers and powers external jobsites or your entire home.',
      specs: ['800V Bus Architecture', 'Up to 250kW Supercharging', 'Bidirectional Powershare'],
      image: 'https://images.unsplash.com/photo-1558441719-8b489c63f732?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'utility',
      title: '11,000 lbs Towing & 2,500 lbs Payload',
      icon: Truck,
      headline: 'HAUL VIRTUALLY ANYTHING',
      description: 'With 11,000 pounds of towing capacity and an ultra-tough composite vault bed that requires no aftermarket bedliner, the Cybertruck is engineered to get serious industrial work done without hesitation.',
      specs: ['11,000 lbs Towing Capacity', '2,500 lbs Composite Bed Payload', 'Integrated L-Track Tie Downs'],
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'steering',
      title: 'Steer-by-Wire & 4-Wheel Steering',
      icon: Cpu,
      headline: 'SPORTS CAR TURNING RADIUS',
      description: 'No mechanical steering column. Steer-by-wire dynamically adjusts steering ratio based on vehicle velocity. At low speeds, turn the wheels lock-to-lock with less than one full turn, offering tighter turning than most sedans.',
      specs: ['Dynamic Variable Ratio', '10° Rear Wheel Steering', 'Electronic Fail-Safe Redundancy'],
      image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="py-24 bg-zinc-950 border-t border-zinc-800 text-zinc-100 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 border border-zinc-700 rounded-sm clip-badge">
            <span className="w-2 h-2 rounded-full bg-zinc-300 animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-zinc-300 uppercase">
              EXOSKELETON & ENGINEERING SUITE
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white font-sans">
            ENGINEERED TO <span className="text-metallic">OUTPERFORM</span>
          </h2>

          <p className="text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
            From the cold-rolled stainless steel monocoque to bidirectional mobile microgrids, 
            explore the aerospace-grade technology defining the Cybertruck platform.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div 
                key={feat.id}
                className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden bg-zinc-950">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4 p-2 bg-zinc-900/90 border border-zinc-700 rounded-sm text-zinc-200">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                      {feat.headline}
                    </span>
                    <h3 className="text-xl font-black text-white font-mono uppercase tracking-wide">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      {feat.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 space-y-1.5">
                    {feat.specs.map((sp, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] font-mono text-zinc-300">
                        <Check className="w-3 h-3 text-zinc-400" />
                        <span>{sp}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* INTERACTIVE LAB: TWO STATIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* STATION 1: ARMOR GLASS TORTURE TEST */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-zinc-300" />
                <h3 className="text-lg font-black font-mono text-white tracking-wide uppercase">
                  ARMOR GLASS TORTURE SIMULATOR
                </h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-1 rounded">
                LAB TEST
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Test the acoustic laminated polymer core against repeated high-velocity kinetic impacts. 
              The polymer shock layer redirects impact force across the pane without interior cabin penetration.
            </p>

            {/* Test Glass Window Pane */}
            <div className="relative aspect-[16/9] w-full bg-zinc-950 border border-zinc-800 rounded flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
              
              {/* Glass Frame */}
              <div className="relative w-4/5 h-4/5 border-2 border-zinc-600 rounded bg-gradient-to-br from-zinc-800/40 via-zinc-900/60 to-zinc-950/80 flex items-center justify-center">
                
                {/* Cracking Pattern if struck */}
                {crackedState && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80" viewBox="0 0 100 100">
                    <line x1="50" y1="50" x2="30" y2="25" stroke="#ffffff" strokeWidth="0.8" />
                    <line x1="50" y1="50" x2="75" y2="30" stroke="#ffffff" strokeWidth="0.8" />
                    <line x1="50" y1="50" x2="65" y2="75" stroke="#ffffff" strokeWidth="0.8" />
                    <line x1="50" y1="50" x2="25" y2="65" stroke="#ffffff" strokeWidth="0.8" />
                    <circle cx="50" cy="50" r="10" stroke="#ffffff" strokeWidth="0.6" fill="none" opacity="0.6" />
                    <circle cx="50" cy="50" r="18" stroke="#cbd5e1" strokeWidth="0.4" fill="none" opacity="0.4" />
                  </svg>
                )}

                {/* Flying Steel Ball Animation */}
                {isStriking && (
                  <div className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-500 shadow-xl shadow-zinc-400/50 animate-ping" />
                )}

                <div className="text-center z-10 space-y-1">
                  <div className="text-xs font-mono font-bold uppercase text-zinc-300">
                    {crackedState ? 'COMPOSITE DEFLECTED IMPACT' : 'TESLA ARMOR GLASS PANE'}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500">
                    Kinetic Impacts Absorbed: <span className="text-white font-bold">{impactCount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={triggerImpact}
                disabled={isStriking}
                className="flex-1 py-3 bg-zinc-200 hover:bg-white text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Target className="w-4 h-4" />
                <span>Launch Steel Ball ({impactCount})</span>
              </button>

              <button
                onClick={resetGlass}
                className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 rounded-sm font-mono text-xs transition-colors"
                title="Reset Pane"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* STATION 2: POWERSHARE V2L CALCULATOR */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-zinc-300" />
                <h3 className="text-lg font-black font-mono text-white tracking-wide uppercase">
                  POWERSHARE™ 9.6 kW V2L CALCULATOR
                </h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-1 rounded">
                123 kWh BATTERY
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Bidirectional Powershare turns your Cybertruck into an off-grid power station capable of supplying up to 9.6 kW continuously to your home or worksite.
            </p>

            {/* Appliance Selector Toggles */}
            <div className="space-y-2">
              {appliances.map((app) => {
                const Icon = app.icon;
                const isChecked = activeAppliances.includes(app.id);
                return (
                  <button
                    key={app.id}
                    onClick={() => toggleAppliance(app.id)}
                    className={`w-full p-3 rounded text-left border flex items-center justify-between transition-all ${
                      isChecked
                        ? 'border-zinc-400 bg-zinc-800 text-white'
                        : 'border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded ${isChecked ? 'bg-zinc-200 text-zinc-950' : 'bg-zinc-900 text-zinc-500'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold block">{app.name}</span>
                        <span className="text-[10px] text-zinc-500 font-sans">{app.desc}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold ml-2">
                      {app.watts} W
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Calculation Output Card */}
            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-sm grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">Total Load</span>
                <span className="text-lg font-black font-mono text-white">{totalWatts.toLocaleString()} W</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">Runtime</span>
                <span className="text-lg font-black font-mono text-zinc-200">{estimatedHours} hrs</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">Home Backup</span>
                <span className="text-lg font-black font-mono text-zinc-300">{estimatedDays} days</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
