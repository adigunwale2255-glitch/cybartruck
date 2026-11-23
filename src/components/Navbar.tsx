import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, Sliders, Volume2, VolumeX, Truck, ShieldCheck, ChevronRight } from 'lucide-react';
import { UserProfile } from '../types';
import { cyberAudio } from '../lib/cyberAudio';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserProfile;
  unreadCount: number;
  ordersCount: number;
  onOpenUserModal: () => void;
  onOpenOrdersModal: () => void;
  onOpenOrderCheckout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  unreadCount,
  ordersCount,
  onOpenUserModal,
  onOpenOrdersModal,
  onOpenOrderCheckout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(cyberAudio.isMuted);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = cyberAudio.toggleMute();
    setIsMuted(muted);
  };

  const navItems = [
    { id: 'home', label: 'Overview' },
    { id: 'models', label: 'Models & Specs' },
    { id: 'customize', label: '3D Configurator' },
    { id: 'features', label: 'Engineering' },
    { id: 'gallery', label: 'Gallery' },
    { 
      id: 'community', 
      label: 'Community', 
      badge: unreadCount > 0 ? unreadCount : undefined 
    },
    { id: 'contact', label: 'Test Drive / Contact' },
  ];

  const handleNavClick = (id: string) => {
    cyberAudio.playClick(1000);
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/90 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-zinc-950/95 via-zinc-950/70 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Official Brand Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="relative h-11 w-11 rounded-sm overflow-hidden border border-zinc-700 bg-zinc-900 group-hover:border-zinc-400 transition-colors shadow-lg shadow-black/50">
              <img 
                src="/cyberforge-logo.jpg" 
                alt="CyberForge Brand Logo" 
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-wider text-white font-mono uppercase">
                  CYBER<span className="text-zinc-400">FORGE</span>
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-300 animate-ping inline-block" />
              </div>
              <p className="text-[10px] tracking-widest text-zinc-400 font-mono uppercase hidden sm:block">
                OFFICIAL CYBERTRUCK VEHICLE FLEET
              </p>
            </div>
          </button>

          {/* Website Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5 font-mono">
                    {item.label}
                    {item.badge && (
                      <span className="bg-zinc-200 text-zinc-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-zinc-200 shadow-titanium-glow-sm" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Website Actions */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded border transition-all ${
                !isMuted 
                  ? 'border-zinc-600 bg-zinc-800 text-zinc-200 hover:text-white shadow-titanium-glow-sm' 
                  : 'border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-zinc-300'
              }`}
              title={isMuted ? 'Unmute Audio SFX' : 'Mute Audio SFX'}
            >
              {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* My Orders / Fleet Garage */}
            <button
              onClick={() => {
                cyberAudio.playClick(1100);
                onOpenOrdersModal();
              }}
              className="flex items-center gap-2 px-3 py-2 rounded border border-zinc-700 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors text-xs font-mono"
              title="View Fleet Reservations"
            >
              <Truck className="w-3.5 h-3.5 text-zinc-400" />
              <span>Fleet</span>
              {ordersCount > 0 && (
                <span className="bg-zinc-700 text-zinc-200 font-bold px-1.5 py-0.5 rounded text-[10px] font-mono border border-zinc-600">
                  {ordersCount}
                </span>
              )}
            </button>

            {/* PRIMARY WEBSITE CTA: RESERVE NOW */}
            <button
              onClick={() => {
                cyberAudio.playClick(1200);
                onOpenOrderCheckout();
              }}
              className="px-4 py-2 bg-zinc-200 hover:bg-white text-zinc-950 font-black text-xs font-mono uppercase tracking-wider rounded-sm transition-all duration-200 shadow-md hover:shadow-zinc-300/30 flex items-center gap-1.5"
            >
              <span>Reserve $250</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* User Persona Button */}
            <button
              onClick={() => {
                cyberAudio.playClick(900);
                onOpenUserModal();
              }}
              className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded border border-zinc-800 bg-zinc-900/60 hover:border-zinc-600 transition-colors"
              title="Manage Pilot Profile"
            >
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.displayName}
                className="w-6 h-6 rounded-full object-cover border border-zinc-700"
              />
              <span className="text-[11px] font-mono text-zinc-300 max-w-[80px] truncate hidden xl:inline-block">
                {currentUser.displayName}
              </span>
            </button>

          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                cyberAudio.playClick(1100);
                onOpenOrderCheckout();
              }}
              className="px-2.5 py-1.5 bg-zinc-200 text-zinc-950 font-black text-[11px] font-mono uppercase tracking-wider rounded-sm"
            >
              Reserve
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded font-mono text-xs uppercase tracking-wider ${
                  isActive
                    ? 'bg-zinc-800 text-white font-bold'
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="bg-zinc-300 text-zinc-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenOrdersModal();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-mono text-zinc-300 flex items-center gap-2 py-2"
            >
              <Truck className="w-4 h-4 text-zinc-400" />
              <span>Fleet Reservations ({ordersCount})</span>
            </button>

            <button
              onClick={() => {
                onOpenUserModal();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-mono text-zinc-300 flex items-center gap-2 py-2"
            >
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.displayName}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span>Profile</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
