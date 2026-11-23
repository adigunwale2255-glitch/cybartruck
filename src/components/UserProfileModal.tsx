import React, { useState } from 'react';
import { User, Check, X, Shield, RefreshCw } from 'lucide-react';
import { UserProfile } from '../types';
import { SEED_PROFILES } from '../lib/supabase';
import { cyberAudio } from '../lib/cyberAudio';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onSwitchUser: (profile: UserProfile) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSaveProfile,
  onSwitchUser,
}) => {
  if (!isOpen) return null;

  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [username, setUsername] = useState(currentUser.username);
  const [bio, setBio] = useState(currentUser.bio);
  const [truckModel, setTruckModel] = useState(currentUser.truckModel);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cyberAudio.playClick(1100);
    onSaveProfile({
      ...currentUser,
      displayName,
      username,
      bio,
      truckModel,
      avatarUrl
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-lg p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-zinc-300" />
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
              CyberForge Identity Core
            </h3>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Switch Persona Row */}
        <div className="space-y-2">
          <label className="text-[11px] font-mono text-zinc-400 block uppercase tracking-wider">
            Switch Pilot Persona:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SEED_PROFILES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  cyberAudio.playClick(1000);
                  onSwitchUser(p);
                  onClose();
                }}
                className={`p-2 rounded text-left border flex items-center gap-2 transition-colors ${
                  currentUser.id === p.id
                    ? 'border-zinc-400 bg-zinc-800 text-white'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <img src={p.avatarUrl} alt={p.displayName} className="w-6 h-6 rounded-full" />
                <span className="text-[11px] font-mono truncate">{p.displayName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Edit Current Profile Form */}
        <form onSubmit={handleSave} className="space-y-3 text-xs font-mono border-t border-zinc-800 pt-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-400 block mb-1">Display Name</label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="text-zinc-400 block mb-1">Callsign / Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div>
            <label className="text-zinc-400 block mb-1">Assigned Cybertruck Model</label>
            <select
              value={truckModel}
              onChange={(e) => setTruckModel(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-zinc-500 cursor-pointer"
            >
              <option>Cyberbeast Tri-Motor</option>
              <option>All-Wheel Drive Dual Motor</option>
              <option>Rear-Wheel Drive Single Motor</option>
              <option>CyberTent Overland Explorer</option>
            </select>
          </div>

          <div>
            <label className="text-zinc-400 block mb-1">Bio / Transmission Status</label>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-white focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-zinc-200 hover:bg-white text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider rounded transition-all shadow-sm"
            >
              Save Profile
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-xs font-bold uppercase tracking-wider rounded border border-zinc-800"
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
