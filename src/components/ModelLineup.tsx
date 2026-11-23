import React from 'react';
import { Zap, Shield, Gauge, ArrowRight, Check, Sliders } from 'lucide-react';
import { cyberAudio } from '../lib/cyberAudio';

interface ModelLineupProps {
  onSelectModelToCustomize: (modelId: string) => void;
  onOpenOrder: (modelId: string) => void;
}

export const ModelLineup: React.FC<ModelLineupProps> = ({
  onSelectModelToCustomize,
  onOpenOrder,
}) => {
  const models = [
    {
      id: 'cyberbeast',
      badge: 'FLAGSHIP TRI-MOTOR',
      name: 'Cyberbeast',
      tagline: 'Supercar acceleration. Relentless off-road dominance.',
      price: '$99,990',
      deposit: '$250 Deposit',
      stats: [
        { label: '0-60 MPH', value: '2.6s', sub: 'with rollout subtracted' },
        { label: 'EST. RANGE', value: '320 mi', sub: 'expandable to 440+ mi' },
        { label: 'HORSEPOWER', value: '845 HP', sub: 'tri-motor permanent magnet' },
        { label: 'TOWING', value: '11,000 lbs', sub: 'class-leading capacity' },
      ],
      features: [
        'Tri-Motor All-Wheel Drive with rear torque vectoring',
        'Beast Mode Launch Control with active track cooling',
        'Laser-etched Cyberbeast badge & dark satin trim',
        'Electronic Locking Front & Rear Differentials',
        'Full Self-Driving (Supervised) capability ready'
      ],
      isPopular: true,
    },
    {
      id: 'all-wheel-drive',
      badge: 'DUAL MOTOR AWD',
      name: 'All-Wheel Drive',
      tagline: 'Maximum range and rugged multi-terrain versatility.',
      price: '$79,990',
      deposit: '$250 Deposit',
      stats: [
        { label: '0-60 MPH', value: '4.1s', sub: 'instant torque response' },
        { label: 'EST. RANGE', value: '340 mi', sub: 'highest standalone range' },
        { label: 'HORSEPOWER', value: '600 HP', sub: 'dual motor electric AWD' },
        { label: 'TOWING', value: '11,000 lbs', sub: 'heavy-duty tow hitch' },
      ],
      features: [
        'Dual-Motor All-Wheel Drive architecture',
        'Standard 4-corner adaptive air suspension (17.4" max)',
        '30X Cold-Rolled Stainless Steel exoskeleton',
        '9.6 kW Powershare bidirectional bed outlets',
        'Ultra-quiet acoustic insulated glass cabin'
      ],
      isPopular: false,
    },
    {
      id: 'rear-wheel-drive',
      badge: 'SINGLE MOTOR RWD',
      name: 'Rear-Wheel Drive',
      tagline: 'Pure electric pickup utility engineered for the everyday.',
      price: '$60,990',
      deposit: '$250 Deposit',
      stats: [
        { label: '0-60 MPH', value: '6.5s', sub: 'responsive daily power' },
        { label: 'EST. RANGE', value: '250 mi', sub: 'efficient commuting' },
        { label: 'HORSEPOWER', value: '315 HP', sub: 'rear electric motor' },
        { label: 'TOWING', value: '7,500 lbs', sub: 'capable hauling power' },
      ],
      features: [
        'Efficient rear-wheel single-motor drive',
        '6x4 foot ultra-hard composite vault bed with drain',
        '18.5" front touchscreen + 9.4" rear entertainment screen',
        'Tesla Armor Glass impact resistance',
        'Over-the-air continuous software updates'
      ],
      isPopular: false,
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-black via-zinc-950 to-zinc-900 border-t border-zinc-800 text-zinc-100 select-none overflow-hidden">
      
      {/* Subtle Gray Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#9ca3af_1px,transparent_1px),linear-gradient(to_bottom,#9ca3af_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-800/90 border border-zinc-700 rounded-sm clip-badge shadow-sm">
            <span className="w-2 h-2 rounded-full bg-zinc-300 animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-zinc-200 uppercase">
              OFFICIAL FLEET SPECIFICATIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white font-sans">
            SELECT YOUR <span className="text-metallic">POWERTRAIN</span>
          </h2>
          
          <p className="text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
            Every Cybertruck is engineered with an ultra-hard 30X cold-rolled stainless steel exoskeleton, 
            adaptive air suspension, and steer-by-wire technology. Choose the capability that matches your mission.
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {models.map((model) => (
            <div
              key={model.id}
              className={`relative flex flex-col justify-between rounded-sm border p-8 transition-all duration-300 group ${
                model.isPopular
                  ? 'bg-zinc-900/90 border-zinc-500 shadow-2xl shadow-zinc-950/60 ring-1 ring-zinc-400/40'
                  : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80'
              }`}
            >
              {/* Popular Flag */}
              {model.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-zinc-200 text-zinc-950 text-[10px] font-mono font-black tracking-widest uppercase px-3 py-1 rounded-sm shadow-md">
                  MOST PREFERRED SPECIFICATION
                </div>
              )}

              {/* Model Info */}
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase font-bold">
                    {model.badge}
                  </span>
                  <h3 className="text-3xl font-black text-white font-mono tracking-wider mt-1 uppercase">
                    {model.name}
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans mt-2">
                    {model.tagline}
                  </p>
                </div>

                {/* Price */}
                <div className="py-4 border-y border-zinc-800/80 flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-black text-white font-mono tracking-tight">
                      {model.price}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono ml-2">MSRP</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-zinc-300 bg-zinc-800 px-2 py-1 rounded border border-zinc-700">
                      {model.deposit}
                    </span>
                  </div>
                </div>

                {/* Key Telemetry Stats */}
                <div className="grid grid-cols-2 gap-3 py-2">
                  {model.stats.map((s, idx) => (
                    <div key={idx} className="bg-zinc-950/60 border border-zinc-800/80 p-3 rounded-sm">
                      <div className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">
                        {s.label}
                      </div>
                      <div className="text-xl font-black font-mono text-zinc-100 tracking-tight mt-0.5">
                        {s.value}
                      </div>
                      <div className="text-[9px] text-zinc-500 font-sans truncate mt-0.5">
                        {s.sub}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features List */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300">
                    Standard Equipment:
                  </div>
                  <ul className="space-y-2">
                    {model.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                        <Check className="w-3.5 h-3.5 text-zinc-300 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-8 mt-8 border-t border-zinc-800/80">
                <button
                  onClick={() => {
                    cyberAudio.playClick(1000);
                    onSelectModelToCustomize(model.id);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-zinc-200 hover:bg-white text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider rounded-sm transition-all duration-200 shadow-md group-hover:shadow-lg"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Configure In 3D Studio</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    cyberAudio.playClick(900);
                    onOpenOrder(model.id);
                  }}
                  className="w-full py-2.5 px-4 bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider rounded-sm transition-colors text-center"
                >
                  Reserve For $250
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Global Architecture Highlight Bar */}
        <div className="mt-16 bg-zinc-900/60 border border-zinc-800 rounded-sm p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-black font-mono text-white tracking-wide uppercase">
              NEED FLEET ALLOCATION OR COMMERCIAL BULK RESERVATIONS?
            </h4>
            <p className="text-xs text-zinc-400 max-w-2xl font-sans">
              CyberForge Commercial Fleet Services supports corporate reservations, municipal emergency vehicles, and custom expedition fleet builds with prioritized Gigafactory delivery queue.
            </p>
          </div>

          <button
            onClick={() => {
              cyberAudio.playClick(1100);
              onOpenOrder('cyberbeast');
            }}
            className="shrink-0 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-zinc-100 font-mono text-xs uppercase tracking-wider font-bold rounded-sm transition-colors"
          >
            Inquire Fleet Orders
          </button>
        </div>

      </div>
    </section>
  );
};
