import React, { useState } from 'react';
import { Users, Search, MessageSquare, Shield, Sliders, ExternalLink } from 'lucide-react';
import { UserProfile, BuildSpec } from '../types';
import { SEED_PROFILES } from '../lib/supabase';
import { cyberAudio } from '../lib/cyberAudio';

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
  const [search, setSearch] = useState('');
  const [filterModel, setFilterModel] = useState<string>('all');

  const profiles: UserProfile[] = SEED_PROFILES;

  const filtered = profiles.filter((p) => {
    const matchQuery = 
      p.displayName.toLowerCase().includes(search.toLowerCase()) ||
      p.username.toLowerCase().includes(search.toLowerCase()) ||
      p.truckModel.toLowerCase().includes(search.toLowerCase());
    
    const matchFilter = filterModel === 'all' || p.truckModel.toLowerCase().includes(filterModel.toLowerCase());
    return matchQuery && matchFilter;
  });

  return (
    <div className="pt-28 pb-20 bg-zinc-950 min-h-screen text-zinc-100 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5 font-bold">
              <Users className="w-3.5 h-3.5 text-zinc-300" />
              CYBERFORGE PILOT REGISTRY & FLEET OWNERS
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans">
              PILOT <span className="text-metallic">DIRECTORY</span>
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search pilot by name or model..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 w-64"
              />
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pilot) => {
            const isMe = pilot.id === currentUser.id;
            return (
              <div
                key={pilot.id}
                className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 rounded-sm p-6 flex flex-col justify-between space-y-4 transition-all duration-200 group hover:shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={pilot.avatarUrl}
                        alt={pilot.displayName}
                        className="w-12 h-12 rounded-full object-cover border border-zinc-700"
                      />
                      {pilot.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-zinc-200 border-2 border-zinc-950" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold font-mono text-white">
                          {pilot.displayName}
                        </h3>
                        {isMe && (
                          <span className="text-[9px] font-mono bg-zinc-800 text-zinc-300 px-1.5 py-0.2 rounded border border-zinc-700">
                            YOU
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-zinc-400">
                        @{pilot.username}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-sans text-zinc-400 leading-relaxed">
                    {pilot.bio}
                  </p>

                  <div className="p-2.5 bg-zinc-950 rounded border border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-[10px] text-zinc-500 uppercase">Assigned Model:</span>
                    <span className="font-bold text-zinc-200">{pilot.truckModel}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-2">
                  <button
                    onClick={() => {
                      cyberAudio.playClick(1100);
                      onStartDirectMessage(pilot.id);
                    }}
                    className="flex-1 py-2 px-3 bg-zinc-200 hover:bg-white text-zinc-950 rounded font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
