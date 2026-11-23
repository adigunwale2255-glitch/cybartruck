import React, { useState } from 'react';
import { User, Check, X, Shield, RefreshCw } from 'lucide-react';
import { UserProfile } from '../types';
import { SEED_PROFILES } from '../lib/supabase';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-lg p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-red-500" />
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
              CyberForge Identity Core
            </h3>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Switch Persona Row */}
        <div className="space-y-2">
          <label className="text-[11px] font-mono text-neutral-400 block uppercase tracking-wider">
            Switch Pilot Persona (Test Real-Time Chat between Users):
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SEED_PROFILES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  onSwitchUser(p);
                  onClose();
                }}
                className={`p-2 rounded text-left border flex items-center gap-2 transition-colors ${
                  currentUser.id === p.id
                    ? 'border-red-600 bg-red-950/20'
                    : 'border-neutral-800 bg-neutral-900 hover:border-neutral-700'
                }`}
              >
                <img src={p.avatarUrl} alt={p.displayName} className="w-6 h-6 rounded-full" />
                <span className="text-[11px] font-mono text-white truncate">{p.displayName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Edit Current Profile Form */}
        <form onSubmit={handleSave} className="space-y-3 text-xs font-mono border-t border-neutral-800 pt-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-neutral-400 block mb-1">Display Name</label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1">Callsign / Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          <div>
            <label className="text-neutral-400 block mb-1">Assigned Cybertruck Model</label>
            <select
              value={truckModel}
              onChange={(e) => setTruckModel(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
            >
              <option>Cyberbeast Tri-Motor</option>
              <option>All-Wheel Drive Dual Motor</option>
              <option>Rear-Wheel Drive Single Motor</option>
              <option>CyberTent Overland Explorer</option>
            </select>
          </div>

          <div>
            <label className="text-neutral-400 block mb-1">Bio / Transmission Status</label>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider rounded transition-all shadow-red-glow-sm"
            >
              Save Profile
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-xs font-bold uppercase tracking-wider rounded"
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
