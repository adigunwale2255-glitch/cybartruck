import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Sliders, 
  Shield, 
  Zap, 
  Gauge, 
  Volume2, 
  Sparkles,
  ChevronDown,
  Layers,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cyberAudio } from '../lib/cyberAudio';

interface HeroProps {
  onExplore: () => void;
  onCustomize: () => void;
  onOpenCommunity: () => void;
  onOpenModels: () => void;
  onOpenOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onExplore, 
  onCustomize, 
  onOpenCommunity, 
  onOpenModels,
  onOpenOrder 
}) => {
  // Launch Control Simulator State
  const [isLaunching, setIsLaunching] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [gForce, setGForce] = useState(0.0);
  const [launchComplete, setLaunchComplete] = useState(false);
  const [launchTimer, setLaunchTimer] = useState('0.00');
  const animationFrameRef = useRef<number | null>(null);

  // Mouse Parallax for cyber grid
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 15;
    const y = (clientY / window.innerHeight - 0.5) * 15;
    setMousePos({ x, y });
  };

  // Launch Control Simulation Trigger
  const triggerLaunch = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    setLaunchComplete(false);
    setSpeed(0);
    setGForce(1.4);

    cyberAudio.playLaunchSound(2.6);

    const startTime = performance.now();
    const duration = 2600; // 2.6 seconds

    const animateLaunch = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentSpeed = Math.round(progress * progress * 60);
      const currentTimer = (progress * 2.6).toFixed(2);
      
      setSpeed(currentSpeed);
      setLaunchTimer(currentTimer);
      setGForce(Number((1.4 - progress * 0.4).toFixed(2)));

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateLaunch);
      } else {
        setSpeed(60);
        setLaunchTimer('2.60');
        setGForce(0.0);
        setIsLaunching(false);
        setLaunchComplete(true);

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#ffffff', '#d1d5db', '#9ca3af', '#6b7280']
        });
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateLaunch);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-zinc-900 select-none text-zinc-100"
    >
      
      {/* Background Cyber Grid & Metallic Horizon Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/60 via-zinc-950 to-black" />
        
        {/* Titanium Silver Horizon Laser Line */}
        <div className="absolute top-[36%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-400/80 to-transparent shadow-[0_0_20px_rgba(209,213,219,0.7)]" />
        
        {/* Exoskeleton Geometry Grid with Mouse Parallax */}
        <div 
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] transition-transform duration-200 ease-out" 
        />

        {/* Ambient Titanium Glow at Top */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-zinc-400/10 blur-[150px] pointer-events-none" />
      </div>

      {/* Main Website Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-10 w-full">
        
        {/* Top Status Pill */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-zinc-900/90 border border-zinc-700/80 rounded-sm clip-badge shadow-sm">
            <span className="w-2 h-2 rounded-full bg-zinc-300 animate-ping" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-zinc-200 uppercase">
              CYBERFORGE OFFICIAL PLATFORM • 2026 VEHICLE FLEET
            </span>
          </div>

          <button
            onClick={() => cyberAudio.playHorn()}
            className="text-[10px] font-mono text-zinc-400 hover:text-white border border-zinc-800 bg-zinc-950/80 px-2.5 py-1.5 rounded flex items-center gap-1.5 transition-colors"
            title="Sound Cybertruck Horn"
          >
            <Volume2 className="w-3 h-3 text-zinc-400" />
            <span>Horn Test</span>
          </button>
        </div>

        {/* Cinematic Automotive Headline */}
        <div className="max-w-4xl space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase font-sans leading-[0.95]">
            BUILT FOR THE <br />
            <span className="text-metallic drop-shadow-[0_4px_30px_rgba(255,255,255,0.2)]">
              UNEXPECTED.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl font-sans leading-relaxed">
            Ultra-hard 30X cold-rolled stainless steel exoskeleton. Shatter-resistant armor glass. 
            0-60 mph in 2.6 seconds with tri-motor Cyberbeast powertrain. Configure, inspect, and reserve your vehicle today.
          </p>
        </div>

        {/* Website Action CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-4 pb-8">
          <button
            onClick={() => {
              cyberAudio.playClick(1000);
              onCustomize();
            }}
            className="flex items-center gap-2.5 px-7 py-3.5 bg-zinc-200 hover:bg-white text-zinc-950 font-black text-xs font-mono uppercase tracking-wider rounded-sm transition-all duration-200 shadow-lg hover:shadow-zinc-300/30 group"
          >
            <Sliders className="w-4 h-4" />
            <span>Launch 3D Configurator</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              cyberAudio.playClick(900);
              onOpenModels();
            }}
            className="flex items-center gap-2 px-6 py-3.5 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white font-mono text-xs uppercase tracking-wider rounded-sm transition-colors"
          >
            <span>Explore Models & Pricing</span>
          </button>

          <button
            onClick={() => {
              cyberAudio.playClick(900);
              onExplore();
            }}
            className="flex items-center gap-2 px-6 py-3.5 bg-zinc-950/60 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 font-mono text-xs uppercase tracking-wider rounded-sm transition-colors"
          >
            <span>Exoskeleton Specs</span>
          </button>
        </div>

        {/* Centerpiece Showcase Stage with Live 0-60 Launch HUD */}
        <div className="relative mt-4 bg-zinc-900/40 border border-zinc-800 rounded-sm p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Vehicle Emblem Stage */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[220px]">
              <div className="relative w-full max-w-md aspect-[16/9] flex items-center justify-center">
                <img
                  src="/cyberforge-logo.jpg"
                  alt="CyberForge Custom Emblem"
                  className="max-h-48 w-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] rounded border border-zinc-700/60"
                />
                
                {/* Steer-by-wire and Active Air Badge */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between text-[10px] font-mono text-zinc-400 bg-zinc-950/80 px-3 py-1.5 border border-zinc-800 rounded">
                  <span>STEER-BY-WIRE & 4-WHEEL STEERING</span>
                  <span className="text-zinc-200 font-bold">17.4" GROUND CLEARANCE</span>
                </div>
              </div>
            </div>

            {/* Right: 0-60 Launch Control Telemetry Station */}
            <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800/90 p-5 rounded-sm space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-zinc-300" />
                  <span className="text-xs font-mono font-bold tracking-wider text-zinc-200 uppercase">
                    LAUNCH TELEMETRY
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                  CYBERBEAST
                </span>
              </div>

              {/* Speedometer Gauges */}
              <div className="grid grid-cols-3 gap-3 text-center py-2">
                <div className="bg-zinc-900/70 p-3 rounded border border-zinc-800/80">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase">Velocity</div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight mt-1">
                    {speed}
                  </div>
                  <div className="text-[9px] font-mono text-zinc-400">MPH</div>
                </div>

                <div className="bg-zinc-900/70 p-3 rounded border border-zinc-800/80">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase">0-60 Timer</div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-zinc-200 tracking-tight mt-1">
                    {launchTimer}s
                  </div>
                  <div className="text-[9px] font-mono text-zinc-400">BENCHMARK</div>
                </div>

                <div className="bg-zinc-900/70 p-3 rounded border border-zinc-800/80">
                  <div className="text-[10px] font-mono text-zinc-400 uppercase">Peak Gs</div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-zinc-300 tracking-tight mt-1">
                    {gForce}
                  </div>
                  <div className="text-[9px] font-mono text-zinc-400">FORCE</div>
                </div>
              </div>

              {/* Launch Action Button */}
              <button
                onClick={triggerLaunch}
                disabled={isLaunching}
                className={`w-full py-3 px-4 font-mono text-xs uppercase tracking-widest font-black rounded-sm transition-all flex items-center justify-center gap-2 ${
                  isLaunching
                    ? 'bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-not-allowed'
                    : launchComplete
                    ? 'bg-zinc-700 hover:bg-zinc-600 text-white border border-zinc-500 shadow-md'
                    : 'bg-zinc-200 hover:bg-white text-zinc-950 shadow-md hover:shadow-zinc-300/30'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>
                  {isLaunching
                    ? `ACCELERATING: ${speed} MPH...`
                    : launchComplete
                    ? 'RE-LAUNCH 0-60 SIMULATOR'
                    : 'TEST 0-60 LAUNCH'}
                </span>
              </button>

              {launchComplete && (
                <div className="text-center text-[11px] font-mono text-zinc-300 bg-zinc-900/80 py-1.5 px-2 rounded border border-zinc-700">
                  ⚡ 0 to 60 MPH locked in 2.60s • Tri-Motor AWD Verified
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* High-Speed Website Specs Ribbon */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-zinc-800 pt-6">
          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
              2.6s
            </div>
            <div className="text-xs font-mono text-zinc-400 uppercase">
              0-60 MPH (Cyberbeast)
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
              340 mi
            </div>
            <div className="text-xs font-mono text-zinc-400 uppercase">
              EPA Estimated Range
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
              11,000 lbs
            </div>
            <div className="text-xs font-mono text-zinc-400 uppercase">
              Towing Capacity
            </div>
          </div>

          <div className="space-y-0.5">
            <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
              30X Alloy
            </div>
            <div className="text-xs font-mono text-zinc-400 uppercase">
              Cold-Rolled Steel Exoskeleton
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
