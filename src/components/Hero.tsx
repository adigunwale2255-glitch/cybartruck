import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Sliders, 
  Shield, 
  Zap, 
  Gauge, 
  Flame, 
  MessageSquare, 
  ChevronDown, 
  Volume2, 
  Play, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cyberAudio } from '../lib/cyberAudio';

interface HeroProps {
  onExplore: () => void;
  onCustomize: () => void;
  onOpenCommunity: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onCustomize, onOpenCommunity }) => {
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
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
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
      
      // Exponential curve for sports EV torque curve
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
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#ef4444', '#ffffff', '#cbd5e1']
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
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-black select-none"
    >
      
      {/* Background Cyber Grid & Laser Lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black" />
        
        {/* Subtle Cyber Red Horizon Laser Line */}
        <div className="absolute top-[38%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/70 to-transparent shadow-[0_0_20px_rgba(239,68,68,0.9)]" />
        
        {/* Angular Exoskeleton Watermark Grid with Mouse Parallax */}
        <div 
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] transition-transform duration-200 ease-out" 
        />

        {/* Ambient Red Glow at Top */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/10 blur-[140px] pointer-events-none" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-12 w-full">
        
        {/* Top Status Pill */}
        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-neutral-900/90 border border-neutral-800 rounded-sm clip-badge">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span className="text-[11px] font-mono font-bold tracking-widest text-neutral-300 uppercase">
              CYBERFORGE PLATFORM • SERIES 2026 ACTIVE
            </span>
          </div>

          <button
            onClick={() => cyberAudio.playHorn()}
            className="text-[10px] font-mono text-neutral-400 hover:text-red-400 border border-neutral-800/80 bg-neutral-950/80 px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors"
            title="Sound Cybertruck Horn"
          >
            <Volume2 className="w-3 h-3 text-red-500" />
            <span>Horn Test</span>
          </button>
        </div>

        {/* Cinematic Headline */}
        <div className="max-w-4xl space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase font-sans leading-[0.95]">
            BUILT FOR THE <br />
            <span className="text-metallic drop-shadow-[0_4px_25px_rgba(255,255,255,0.15)]">
              UNEXPECTED.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-400 font-light max-w-2xl leading-relaxed">
            Ultra-hard 30X cold-rolled stainless steel exoskeleton. Shatter-resistant armor glass. 
            0-60 mph in 2.6 seconds with tri-motor Cyberbeast performance. 
            Customize your rig and connect with the global Cybertruck community.
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                cyberAudio.playClick(1400);
                onCustomize();
              }}
              className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-mono text-sm font-bold uppercase tracking-widest clip-chamfer transition-all duration-200 shadow-red-glow flex items-center gap-3 group"
            >
              <Sliders className="w-4 h-4 text-white group-hover:rotate-45 transition-transform" />
              <span>Launch 3D Customizer</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                cyberAudio.playClick(900);
                onExplore();
              }}
              className="px-8 py-4 bg-neutral-950 hover:bg-neutral-900 text-neutral-200 hover:text-white font-mono text-sm font-bold uppercase tracking-widest border border-neutral-800 hover:border-neutral-600 clip-chamfer transition-all duration-200 flex items-center gap-2"
            >
              <span>Explore Features</span>
            </button>

            <button
              onClick={() => {
                cyberAudio.playClick(1100);
                onOpenCommunity();
              }}
              className="px-6 py-4 bg-neutral-900/60 hover:bg-neutral-900 text-red-500 hover:text-red-400 font-mono text-xs font-bold uppercase tracking-wider border border-red-950 hover:border-red-800 clip-chamfer transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Community Chat</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Presentation + Interactive Launch Simulator Overlay */}
        <div className="relative mt-8 lg:mt-6 w-full flex justify-center">
          
          <div className="relative max-w-4xl w-full">
            <div className={`relative rounded-lg overflow-hidden border border-neutral-800/80 bg-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.9)] group transition-transform duration-200 ${
              isLaunching ? 'scale-[1.01] translate-x-[1px]' : ''
            }`}>
              <img
                src="/cyberforge-logo.jpg"
                alt="CyberForge Cybertruck Showcase"
                className={`w-full h-auto object-cover max-h-[520px] transition-all duration-700 ${
                  isLaunching ? 'brightness-110 contrast-125' : 'group-hover:scale-[1.01]'
                }`}
              />
              
              {/* Subtle Red Edge Accent */}
              <div className="absolute inset-0 border border-red-600/20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />

              {/* INTERACTIVE 0-60 LAUNCH CONTROL HUD DOCK */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-black/85 backdrop-blur-md border border-neutral-800 rounded p-3 font-mono text-xs shadow-2xl flex flex-col gap-2 min-w-[200px]">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
                  <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-red-500" />
                    LAUNCH TELEMETRY
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    {isLaunching ? 'ENGAGED' : 'STANDBY'}
                  </span>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[9px] text-neutral-500 block uppercase">VELOCITY</span>
                    <div className="text-2xl font-black text-white font-mono leading-none">
                      {speed} <span className="text-[10px] font-normal text-red-500">MPH</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] text-neutral-500 block uppercase">0-60 CLOCK</span>
                    <div className="text-sm font-bold text-red-400 font-mono">
                      {launchTimer}s
                    </div>
                  </div>
                </div>

                {/* Torque Progress Bar */}
                <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden border border-neutral-800">
                  <div 
                    className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-75 shadow-red-glow-sm"
                    style={{ width: `${(speed / 60) * 100}%` }}
                  />
                </div>

                {/* Launch Button */}
                <button
                  onClick={triggerLaunch}
                  disabled={isLaunching}
                  className="w-full mt-1 py-1.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-[10px] uppercase tracking-wider rounded clip-chamfer flex items-center justify-center gap-1.5 shadow-red-glow-sm transition-all"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isLaunching ? 'Launching...' : 'Test 0-60 Launch'}</span>
                </button>

                {launchComplete && (
                  <div className="text-[10px] text-emerald-400 text-center font-bold animate-pulse">
                    ✓ 0-60 ACHIEVED IN 2.6 SECONDS
                  </div>
                )}
              </div>

              {/* Live Status Overlay in Bottom Left */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-3 bg-black/80 backdrop-blur-md px-4 py-2 border border-neutral-800 rounded">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                    CYBERBEAST EXOSKELETON
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    30X COLD-ROLLED STEEL • BULLET TOUGH
                  </span>
                </div>
              </div>

              {/* Quick Action Overlay */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 hidden sm:block">
                <button
                  onClick={() => {
                    cyberAudio.playClick(1200);
                    onCustomize();
                  }}
                  className="px-4 py-2 bg-red-600/90 hover:bg-red-600 text-white font-mono text-xs font-bold uppercase tracking-wider clip-chamfer transition-all shadow-red-glow-sm"
                >
                  Configure This Build
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Telemetry HUD Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 border-t border-neutral-800/80 pt-6">
          
          <div 
            onClick={() => cyberAudio.playClick(1000)}
            className="bg-neutral-950/80 border border-neutral-800/60 p-4 clip-chamfer group hover:border-red-600/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[10px] font-mono tracking-widest uppercase">ACCELERATION</span>
              <Gauge className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
              2.6 <span className="text-xs font-normal text-red-500">SEC</span>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono mt-0.5">0-60 MPH (Cyberbeast)</p>
          </div>

          <div 
            onClick={() => cyberAudio.playClick(1100)}
            className="bg-neutral-950/80 border border-neutral-800/60 p-4 clip-chamfer group hover:border-red-600/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[10px] font-mono tracking-widest uppercase">TOWING CAPACITY</span>
              <Shield className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
              11,000 <span className="text-xs font-normal text-red-500">LBS</span>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono mt-0.5">Class 4 towing rating</p>
          </div>

          <div 
            onClick={() => cyberAudio.playClick(1200)}
            className="bg-neutral-950/80 border border-neutral-800/60 p-4 clip-chamfer group hover:border-red-600/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[10px] font-mono tracking-widest uppercase">EST. MAX RANGE</span>
              <Zap className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
              340+ <span className="text-xs font-normal text-red-500">MI</span>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono mt-0.5">470+ mi w/ Range Extender</p>
          </div>

          <div 
            onClick={() => cyberAudio.playClick(1300)}
            className="bg-neutral-950/80 border border-neutral-800/60 p-4 clip-chamfer group hover:border-red-600/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between text-neutral-500 mb-1">
              <span className="text-[10px] font-mono tracking-widest uppercase">HORSEPOWER</span>
              <Flame className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
              845 <span className="text-xs font-normal text-red-500">HP</span>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono mt-0.5">Tri-Motor torque vectoring</p>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-6">
          <button 
            onClick={() => {
              cyberAudio.playClick(800);
              onExplore();
            }}
            className="flex items-center gap-1.5 text-neutral-500 hover:text-red-500 text-[10px] font-mono uppercase tracking-widest transition-colors"
          >
            <span>SCROLL TO DISCOVER</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>

      </div>

    </section>
  );
};
