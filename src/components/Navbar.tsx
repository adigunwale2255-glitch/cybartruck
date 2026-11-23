import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, Sliders, Volume2, VolumeX, Truck } from 'lucide-react';
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
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  unreadCount,
  ordersCount,
  onOpenUserModal,
  onOpenOrdersModal,
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
    { id: 'home', label: 'Home' },
    { id: 'customize', label: 'Customize' },
    { id: 'features', label: 'Features' },
    { id: 'gallery', label: 'Gallery' },
    { 
      id: 'community', 
      label: 'Community', 
      badge: unreadCount > 0 ? unreadCount : undefined 
    },
    { id: 'contact', label: 'Contact' },
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
          ? 'bg-black/95 backdrop-blur-md border-b border-neutral-800/90 py-2.5 shadow-2xl'
          : 'bg-gradient-to-b from-black/95 via-black/60 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with User Image */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="relative h-11 w-11 rounded-sm overflow-hidden border border-neutral-700 bg-black group-hover:border-red-600 transition-colors shadow-lg shadow-red-950/20">
              <img 
                src="/cyberforge-logo.jpg" 
                alt="CyberForge Logo" 
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-wider text-white font-mono uppercase">
                  CYBER<span className="text-red-600">FORGE</span>
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-ping inline-block" />
              </div>
              <p className="text-[10px] tracking-widest text-neutral-400 font-mono uppercase hidden sm:block">
                EXPLORE • CUSTOMIZE • DRIVE
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 text-sm font-semibold tracking-wider uppercase transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2 font-mono text-xs">
                    {item.label}
                    {item.badge && (
                      <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full animate-pulse shadow-red-glow-sm">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-red-600 shadow-red-glow" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            
            {/* Audio Synth Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded border transition-all ${
                !isMuted 
                  ? 'border-red-900/80 bg-red-950/30 text-red-400 hover:text-red-300 shadow-red-glow-sm' 
                  : 'border-neutral-800 bg-neutral-900 text-neutral-500 hover:text-neutral-300'
              }`}
              title={isMuted ? 'Unmute CyberForge Audio SFX' : 'Mute Cyber Audio SFX'}
            >
              {!isMuted ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* My Orders / Fleet Garage Button */}
            <button
              onClick={() => {
                cyberAudio.playClick(1100);
                onOpenOrdersModal();
              }}
              className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
              title="View your vehicle reservations"
            >
              <Truck className="w-3.5 h-3.5 text-red-500" />
              <span>Orders</span>
              {ordersCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {ordersCount}
                </span>
              )}
            </button>

            {/* Customizer CTA */}
            <button
              onClick={() => handleNavClick('customize')}
              className="relative px-4 py-2 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-mono text-xs font-bold uppercase tracking-widest clip-chamfer transition-all duration-200 shadow-red-glow-sm hover:shadow-red-glow flex items-center gap-2"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Order Rig</span>
            </button>

            {/* User Profile Pill */}
            <button
              onClick={() => {
                cyberAudio.playClick(900);
                onOpenUserModal();
              }}
              className="flex items-center gap-2 px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 hover:border-red-600/70 rounded transition-all group"
              title="Current Profile / Switch User"
            >
              <div className="relative">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.displayName}
                  className="w-7 h-7 rounded-full object-cover border border-neutral-700 group-hover:border-red-600"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-black" />
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-[11px] font-bold text-white font-mono leading-tight">
                  {currentUser.displayName}
                </div>
                <div className="text-[9px] text-neutral-400 font-mono leading-tight">
                  {currentUser.truckModel.split(' ')[0]}
                </div>
              </div>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                cyberAudio.playClick(1000);
                onOpenOrdersModal();
              }}
              className="relative p-2 text-neutral-400 hover:text-white"
            >
              <Truck className="w-5 h-5 text-red-500" />
              {ordersCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full" />
              )}
            </button>

            <button
              onClick={toggleSound}
              className="p-2 text-neutral-400 hover:text-white"
            >
              {!isMuted ? <Volume2 className="w-4 h-4 text-red-500" /> : <VolumeX className="w-4 h-4 text-neutral-600" />}
            </button>

            <button
              onClick={() => handleNavClick('community')}
              className="relative p-2 text-neutral-300 hover:text-white"
            >
              <MessageSquare className="w-5 h-5 text-red-500" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full animate-ping shadow-red-glow" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white border border-neutral-800 rounded bg-neutral-900"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-red-500" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-neutral-800 px-4 pt-3 pb-6 mt-3 space-y-2 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80 mb-2">
            <div className="flex items-center gap-2">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.displayName}
                className="w-8 h-8 rounded-full border border-red-600"
              />
              <div>
                <p className="text-xs font-bold text-white font-mono">{currentUser.displayName}</p>
                <p className="text-[10px] text-neutral-400 font-mono">@{currentUser.username}</p>
              </div>
            </div>
            <button
              onClick={onOpenUserModal}
              className="text-[11px] font-mono text-red-400 hover:text-red-300 border border-red-900/60 px-2 py-1 rounded"
            >
              Switch User
            </button>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-mono tracking-wider uppercase transition-colors rounded ${
                activeTab === item.id
                  ? 'bg-neutral-900 text-white border-l-2 border-red-600'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-950'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenOrdersModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-neutral-900 text-neutral-300 font-mono text-xs font-bold uppercase tracking-wider rounded border border-neutral-800 flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4 text-red-500" />
              <span>My Reservations ({ordersCount})</span>
            </button>

            <button
              onClick={() => handleNavClick('customize')}
              className="w-full py-3 bg-red-600 text-white font-mono text-xs font-bold uppercase tracking-widest clip-chamfer shadow-red-glow-sm flex items-center justify-center gap-2"
            >
              <Sliders className="w-4 h-4" />
              <span>Order Cybertruck</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
