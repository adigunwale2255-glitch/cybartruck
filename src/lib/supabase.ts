import { createClient } from '@supabase/supabase-js';
import { UserProfile, ChatMessage, BuildSpec } from '../types';

// Read Supabase environment variables safely
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project') &&
  !supabaseAnonKey.includes('your-anon-public-key')
);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ============================================================
// DEMO / DEFAULT COMMUNITY SEED DATA
// ============================================================
export const SEED_PROFILES: UserProfile[] = [
  {
    id: 'user-apex',
    username: 'Apex_TriMotor',
    displayName: 'Commander Apex',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    bio: 'Cyberbeast serial #0042. 0-60 in 2.6s. Off-roading in Moab.',
    truckModel: 'Cyberbeast Tri-Motor',
    isOnline: true,
  },
  {
    id: 'user-valkyrie',
    username: 'Valkyrie_Forge',
    displayName: 'Valkyrie ⚡',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    bio: 'Satin Crimson wrap with Solar Bed Wing. 800V overland explorer.',
    truckModel: 'Cyberbeast Tri-Motor',
    isOnline: true,
  },
  {
    id: 'user-stealth',
    username: 'StealthTitan',
    displayName: 'Marcus Vance',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    bio: 'Matte Black exoskeleton + CyberTent enthusiast. Powershare pioneer.',
    truckModel: 'All-Wheel Drive Dual Motor',
    isOnline: false,
    lastSeen: '12m ago',
  },
  {
    id: 'user-sarah',
    username: 'Sarah_Architect',
    displayName: 'Sarah Chen',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    bio: 'Futuristic industrial designer. CyberForge design lead.',
    truckModel: 'Cyberbeast Tri-Motor',
    isOnline: true,
  },
  {
    id: 'user-karl',
    username: 'CyberEngineer_Karl',
    displayName: 'Karl Mueller',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    bio: 'Gigafactory Texas delivery day veteran. Armor glass torture test survivor.',
    truckModel: 'Cyberbeast Tri-Motor',
    isOnline: false,
    lastSeen: '1h ago',
  }
];

export const CURRENT_DEFAULT_USER: UserProfile = {
  id: 'current-user-1',
  username: 'CyberPilot',
  displayName: 'You (CyberPilot)',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  bio: 'Configuring custom Cyberbeast on CyberForge.',
  truckModel: 'Cyberbeast Tri-Motor',
  isOnline: true,
};

export const INITIAL_PUBLIC_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-seed-1',
    senderId: 'user-apex',
    senderName: 'Commander Apex',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    content: 'Welcome to the CyberForge Global Command! Just finished a 1,200-mile cross-country trip pulling 9,500 lbs. The torque is unbelievable. 🔥',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: 'read'
  },
  {
    id: 'msg-seed-2',
    senderId: 'user-valkyrie',
    senderName: 'Valkyrie ⚡',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content: 'Did anyone try out the new Satin Crimson wrap in the customizer yet? The contrast against the stainless steel chamfers is aggressive.',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: 'read'
  },
  {
    id: 'msg-seed-3',
    senderId: 'user-sarah',
    senderName: 'Sarah Chen',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    content: 'Here is the build I saved this morning with the roof lightbar and 22" turbine alloys:',
    buildData: {
      finishId: 'crimson',
      finishName: 'Satin Crimson Red',
      finishHex: '#b91c1c',
      finishCategory: 'Satin Wrap',
      wheelsId: 'turbine-22',
      wheelsName: '22" Cyber Turbine Alloys',
      wheelsPrice: 3500,
      powertrainId: 'cyberbeast',
      powertrainName: 'Cyberbeast Tri-Motor AWD',
      powertrainPrice: 99990,
      interiorId: 'crimson-ambient',
      interiorName: 'Red Cyberline Ambient',
      accessories: ['lightbar', 'tonneau', 'tent'],
      totalPrice: 111490,
      timestamp: new Date().toISOString()
    },
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: 'read'
  },
  {
    id: 'msg-seed-4',
    senderId: 'user-apex',
    senderName: 'Commander Apex',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    replyTo: {
      id: 'msg-seed-3',
      senderName: 'Sarah Chen',
      content: 'Here is the build I saved this morning with the roof lightbar and 22" turbine alloys'
    },
    content: 'That CyberTent setup is lethal. Ready for the Martian dunes. 🚀',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    status: 'read'
  }
];

// BroadcastChannel for instant real-time sync across multiple browser tabs!
export const chatBroadcast = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('cyberforge_chat_channel')
  : null;
