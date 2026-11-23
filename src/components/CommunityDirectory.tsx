import React, { useState } from 'react';
import { Users, MessageSquare, Shield, Zap, Sparkles, MapPin, Search } from 'lucide-react';
import { UserProfile, BuildSpec } from '../types';
import { SEED_PROFILES } from '../lib/supabase';

interface CommunityDirectoryProps {
  currentUser: UserProfile;
  onStartDirectMessage: (userId: string) => void;
  onInspectBuild?: (build: BuildSpec) => void;
}

export const CommunityDirectory: React.FC<CommunityDirectoryProps> = ({
  currentUser,
  onStartDirectMessage,
  onInspectBuild,
}) => {
  const [filter, setFilter] = useState<'all' | 'online' | 'cyberbeast'>('all');
  const [search, setSearch] = useState('');

  const members: (UserProfile & { location?: string; buildsCount?: number })[] = [
    ...SEED_PROFILES.map((p, idx) => ({
      ...p,
      location: idx % 2 === 0 ? 'Austin, Texas' : 'Moab, Utah',
      buildsCount: idx + 2
    })),
    {
      id: 'user-marcus-nv',
      username: 'DesertViper',
      displayName: 'Viper Overland',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      bio: 'Mojave Desert off-road trail builder. Solar wing bed setup.',
      truckModel: 'All-Wheel Drive Dual Motor',
      isOnline: true,
      location: 'Las Vegas, NV',
      buildsCount: 4
    },
    {
      id: 'user-elena',
      username: 'Elena_Cyber',
      displayName: 'Elena Rostova',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      bio: 'Winter testing in Alaska. -30°F cold-weather range benchmarking.',
      truckModel: 'Cyberbeast Tri-Motor',
      isOnline: false,
      lastSeen: '3h ago',
      location: 'Anchorage, AK',
      buildsCount: 3
    }
  ];

  const filteredMembers = members.filter(m => {
    if (filter === 'online' && !m.isOnline) return false;
    if (filter === 'cyberbeast' && !m.truckModel.includes('Cyberbeast')) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        m.displayName.toLowerCase().includes(q) ||
        m.username.toLowerCase().includes(q) ||
        m.truckModel.toLowerCase().includes(q) ||
        (m.location && m.location.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest mb-1.5">
              <Users className="w-3.5 h-3.5" />
              CYBERFORGE COMMUNITY DIRECTORY
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans">
              GLOBAL <span className="text-metallic">COMMUNITY</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-2 max-w-xl">
              Connect with fellow Cybertruck pilots, discover custom configurations, and transmit direct messages across the network.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search pilots..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded pl-9 pr-3 py-1.5 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 w-full sm:w-48"
              />
            </div>

            <div className="flex items-center gap-1 bg-neutral-950 border border-neutral-800 p-1 rounded">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                  filter === 'all' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('online')}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                  filter === 'online' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Online
              </button>
              <button
                onClick={() => setFilter('cyberbeast')}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                  filter === 'cyberbeast' ? 'bg-red-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Cyberbeast
              </button>
            </div>
          </div>
        </div>

        {/* Member Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-neutral-950 border border-neutral-800 hover:border-red-600/70 rounded-lg p-5 transition-all duration-300 clip-chamfer group flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={member.avatarUrl}
                        alt={member.displayName}
                        className="w-12 h-12 rounded-full object-cover border border-neutral-700 group-hover:border-red-600"
                      />
                      {member.isOnline ? (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-black" />
                      ) : (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-neutral-600 border-2 border-black" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-mono font-bold text-white group-hover:text-red-400 transition-colors">
                        {member.displayName}
                      </h3>
                      <p className="text-[11px] font-mono text-neutral-400">
                        @{member.username}
                      </p>
                    </div>
                  </div>

                  {member.isOnline ? (
                    <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-900 px-2 py-0.5 rounded">
                      ACTIVE
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded">
                      {member.lastSeen || 'OFFLINE'}
                    </span>
                  )}
                </div>

                {/* Bio */}
                <p className="text-xs font-sans text-neutral-300 mb-4 line-clamp-2 leading-relaxed">
                  {member.bio}
                </p>

                {/* Badges */}
                <div className="space-y-1.5 border-t border-neutral-900 pt-3 text-[11px] font-mono">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-red-500" />
                      Model:
                    </span>
                    <span className="font-bold text-white">{member.truckModel}</span>
                  </div>
                  {member.location && (
                    <div className="flex items-center justify-between text-neutral-400">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                        Base:
                      </span>
                      <span className="text-neutral-300">{member.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-neutral-800/80">
                <button
                  onClick={() => onStartDirectMessage(member.id)}
                  className="w-full py-2.5 bg-neutral-900 hover:bg-red-600 text-white font-mono text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-red-glow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send Direct Message</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
