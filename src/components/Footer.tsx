import React from 'react';
import { Shield, MessageSquare, Sliders, ArrowUp, Zap } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-neutral-800 text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-neutral-900">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded overflow-hidden border border-red-600/60 bg-black">
                <img
                  src="/cyberforge-logo.jpg"
                  alt="CyberForge Brand Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <span className="font-black text-xl tracking-wider text-white font-mono uppercase">
                  CYBER<span className="text-red-600">FORGE</span>
                </span>
                <p className="text-[10px] tracking-widest text-neutral-400 font-mono uppercase">
                  EXPLORE • CUSTOMIZE • DRIVE
                </p>
              </div>
            </div>

            <p className="text-xs font-sans text-neutral-400 max-w-sm leading-relaxed">
              The premier interactive platform for Cybertruck enthusiasts, custom vehicle builders, and real-time social community communications.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-950 border border-neutral-800 rounded text-[10px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>NETWORK STATUS: 100% OPERATIONAL</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs font-mono">
            <h4 className="text-white font-bold uppercase tracking-wider text-neutral-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-red-500 transition-colors">
                  Platform Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('customize')} className="hover:text-red-500 transition-colors">
                  Interactive Configurator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('features')} className="hover:text-red-500 transition-colors">
                  Exoskeleton Engineering
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-red-500 transition-colors">
                  Photo Archive
                </button>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-3 text-xs font-mono">
            <h4 className="text-white font-bold uppercase tracking-wider text-neutral-300">
              Community
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onNavigate('community')} className="hover:text-red-500 transition-colors">
                  Global HQ Chat
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('directory')} className="hover:text-red-500 transition-colors">
                  Pilot Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-red-500 transition-colors">
                  Support & Dispatch
                </button>
              </li>
            </ul>
          </div>

          {/* Specifications */}
          <div className="space-y-3 text-xs font-mono">
            <h4 className="text-white font-bold uppercase tracking-wider text-neutral-300">
              Vehicle Powertrain
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>Cyberbeast (Tri-Motor 845 HP)</li>
              <li>All-Wheel Drive (Dual Motor 600 HP)</li>
              <li>800V Architecture & Powershare</li>
              <li>Ultra-Hard 30X Stainless Steel</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>
            © 2026 CYBERFORGE PLATFORM. ALL RIGHTS RESERVED. INSPIRED BY TESLA CYBERTRUCK.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-red-500 transition-colors uppercase tracking-wider"
          >
            <span>Back to Summit</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
