import React from 'react';
import { Shield, MessageSquare, Sliders, ArrowUp, Zap, Truck, Check } from 'lucide-react';
import { cyberAudio } from '../lib/cyberAudio';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    cyberAudio.playClick(1000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-zinc-800 text-zinc-200 pt-16 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-zinc-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded overflow-hidden border border-zinc-600 bg-zinc-900">
                <img
                  src="/cyberforge-logo.jpg"
                  alt="CyberForge Brand Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <span className="font-black text-xl tracking-wider text-white font-mono uppercase">
                  CYBER<span className="text-zinc-400">FORGE</span>
                </span>
                <p className="text-[10px] tracking-widest text-zinc-400 font-mono uppercase">
                  OFFICIAL CYBERTRUCK VEHICLE FLEET
                </p>
              </div>
            </div>

            <p className="text-xs font-sans text-zinc-400 max-w-sm leading-relaxed">
              The premier automotive portal for Cybertruck owners, fleet reservations, 3D interactive vehicle customization, and global community communications.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-zinc-200 animate-pulse" />
              <span>FLEET NETWORK STATUS: 100% OPERATIONAL</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs font-mono">
            <h4 className="text-white font-bold uppercase tracking-wider">
              Website Navigation
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('models')} className="hover:text-white transition-colors">
                  Models & Specs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('customize')} className="hover:text-white transition-colors">
                  3D Configurator Studio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('features')} className="hover:text-white transition-colors">
                  Exoskeleton Engineering
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors">
                  Vehicle Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Fleet */}
          <div className="space-y-3 text-xs font-mono">
            <h4 className="text-white font-bold uppercase tracking-wider">
              Fleet & Community
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button onClick={() => onNavigate('community')} className="hover:text-white transition-colors">
                  Global HQ Chat
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('directory')} className="hover:text-white transition-colors">
                  Owner Pilot Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Book Test Drive
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Commercial Fleet Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Vehicle Specifications */}
          <div className="space-y-3 text-xs font-mono">
            <h4 className="text-white font-bold uppercase tracking-wider">
              Vehicle Lineup
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>Cyberbeast (Tri-Motor 845 HP)</li>
              <li>All-Wheel Drive (Dual Motor 600 HP)</li>
              <li>Rear-Wheel Drive (Single Motor 315 HP)</li>
              <li>Powershare 9.6 kW V2L Generator</li>
              <li>30X Cold-Rolled Stainless Exoskeleton</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
          <div>
            © 2026 CYBERFORGE VEHICLE FLEET. ALL RIGHTS RESERVED. INSPIRED BY TESLA CYBERTRUCK.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors uppercase tracking-wider"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
