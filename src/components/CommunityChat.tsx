import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Search, 
  Smile, 
  CheckCheck, 
  Slash, 
  X, 
  Image as ImageIcon, 
  Sliders, 
  ArrowLeft,
  Bell,
  BellOff,
  Flame,
  Globe,
  ShieldAlert,
  CornerUpLeft,
  Trash2,
  Play,
  Pause,
  Mic
} from 'lucide-react';
import { UserProfile, ChatMessage, BuildSpec } from '../types';
import { 
  SEED_PROFILES, 
  INITIAL_PUBLIC_MESSAGES, 
  chatBroadcast, 
  isSupabaseConfigured 
} from '../lib/supabase';
import { cyberAudio } from '../lib/cyberAudio';

interface CommunityChatProps {
  currentUser: UserProfile;
  onSwitchUser: (user: UserProfile) => void;
  pendingShareBuild?: BuildSpec | null;
  onClearPendingShareBuild?: () => void;
  onInspectBuild?: (build: BuildSpec) => void;
}

export const CommunityChat: React.FC<CommunityChatProps> = ({
  currentUser,
  onSwitchUser,
  pendingShareBuild,
  onClearPendingShareBuild,
  onInspectBuild,
}) => {
  // Active Conversation: 'public' or recipientId
  const [activeConversationId, setActiveConversationId] = useState<string>('public');
  
  // Messages State
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('cyberforge_messages');
    return saved ? JSON.parse(saved) : INITIAL_PUBLIC_MESSAGES;
  });

  // Message Reactions state (messageId -> emoji string)
  const [reactions, setReactions] = useState<Record<string, string[]>>({});

  // Voice Note Player Simulation State (playing message id)
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  // Users Directory State
  const [profiles] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('cyberforge_profiles');
    return saved ? JSON.parse(saved) : SEED_PROFILES;
  });

  // Message Input & Reply
  const [inputText, setInputText] = useState('');
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  
  // Mobile Navigation: show conversation list vs chat pane
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  // Block & Report Modals
  const [blockedUsers, setBlockedUsers] = useState<string[]>([]);
  const [reportModalMessage, setReportModalMessage] = useState<ChatMessage | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  // Audio Notifications
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Typing indicators
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const typingTimeoutRef = useRef<any>(null);

  // Auto-scroll anchor
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Emojis
  const quickEmojis = ['⚡', '🔥', '🚀', '🦾', '🛡️', '🏎️', '👍', '💯', '❤️', '😎', '🔋', '👀'];

  // Handle pending share build from Customizer
  useEffect(() => {
    if (pendingShareBuild) {
      setActiveConversationId('public');
      setMobileChatOpen(true);
      
      const newMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        senderId: currentUser.id,
        senderName: currentUser.displayName,
        senderAvatar: currentUser.avatarUrl,
        content: `Check out my custom Cybertruck build: ${pendingShareBuild.powertrainName} in ${pendingShareBuild.finishName}! 🔥`,
        buildData: pendingShareBuild,
        createdAt: new Date().toISOString(),
        status: 'delivered'
      };

      cyberAudio.playMessageSent();

      setMessages(prev => {
        const next = [...prev, newMsg];
        localStorage.setItem('cyberforge_messages', JSON.stringify(next));
        return next;
      });

      if (chatBroadcast) {
        chatBroadcast.postMessage({ type: 'NEW_MESSAGE', message: newMsg });
      }

      if (onClearPendingShareBuild) {
        onClearPendingShareBuild();
      }
    }
  }, [pendingShareBuild]);

  // Persist messages & broadcast to other browser tabs in real-time
  useEffect(() => {
    const channel = chatBroadcast;
    if (!channel) return;

    const handleBroadcast = (event: MessageEvent) => {
      const data = event.data;
      if (!data) return;

      if (data.type === 'NEW_MESSAGE') {
        cyberAudio.playMessageSent();
        setMessages(prev => {
          if (prev.some(m => m.id === data.message.id)) return prev;
          const next = [...prev, data.message];
          localStorage.setItem('cyberforge_messages', JSON.stringify(next));
          return next;
        });
      } else if (data.type === 'DELETE_MESSAGE') {
        setMessages(prev => {
          const next = prev.filter(m => m.id !== data.messageId);
          localStorage.setItem('cyberforge_messages', JSON.stringify(next));
          return next;
        });
      } else if (data.type === 'TYPING') {
        if (data.senderId !== currentUser.id) {
          setTypingUsers(prev => [...new Set([...prev, data.senderName])]);
          setTimeout(() => {
            setTypingUsers(prev => prev.filter(name => name !== data.senderName));
          }, 3000);
        }
      }
    };

    channel.addEventListener('message', handleBroadcast);
    return () => channel.removeEventListener('message', handleBroadcast);
  }, [currentUser]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeConversationId]);

  // Send Message Handler
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && !attachedImage) return;

    cyberAudio.playMessageSent();

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      senderId: currentUser.id,
      senderName: currentUser.displayName,
      senderAvatar: currentUser.avatarUrl,
      recipientId: activeConversationId === 'public' ? undefined : activeConversationId,
      content: inputText.trim(),
      imageUrl: attachedImage || undefined,
      replyTo: replyingTo ? {
        id: replyingTo.id,
        senderName: replyingTo.senderName,
        content: replyingTo.content.substring(0, 60) + (replyingTo.content.length > 60 ? '...' : '')
      } : undefined,
      createdAt: new Date().toISOString(),
      status: 'sent'
    };

    // Update state & localStorage
    setMessages(prev => {
      const updated = [...prev, newMsg];
      localStorage.setItem('cyberforge_messages', JSON.stringify(updated));
      return updated;
    });

    // Broadcast in real-time across tabs
    if (chatBroadcast) {
      chatBroadcast.postMessage({ type: 'NEW_MESSAGE', message: newMsg });
    }

    // Reset input states
    setInputText('');
    setReplyingTo(null);
    setAttachedImage(null);
    setShowEmojiPicker(false);

    // Simulate auto-response if sending a 1-to-1 message to a demo bot after 2 seconds
    if (activeConversationId !== 'public') {
      const recipient = profiles.find(p => p.id === activeConversationId);
      if (recipient && !blockedUsers.includes(recipient.id)) {
        setTimeout(() => {
          cyberAudio.playMessageSent();
          const autoReplies = [
            `Transmission acknowledged, ${currentUser.displayName}! Testing the Cyberbeast torque in Moab this weekend. 🔥`,
            `Checked your build specs! That custom wrap finish looks menacing against the cold-rolled stainless steel.`,
            `Powering my entire campsite off the 240V bed outlets right now. Truly off-grid! ⚡`,
            `Ready for the next CyberForge Supercharger convoy. Let's roll!`
          ];
          const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];

          const botMsg: ChatMessage = {
            id: `msg-${Date.now()}-reply`,
            senderId: recipient.id,
            senderName: recipient.displayName,
            senderAvatar: recipient.avatarUrl,
            recipientId: currentUser.id,
            content: randomReply,
            createdAt: new Date().toISOString(),
            status: 'read'
          };

          setMessages(prev => {
            const next = [...prev, botMsg];
            localStorage.setItem('cyberforge_messages', JSON.stringify(next));
            return next;
          });

          if (chatBroadcast) {
            chatBroadcast.postMessage({ type: 'NEW_MESSAGE', message: botMsg });
          }
        }, 1800);
      }
    }
  };

  // Quick Emoji Reaction on Message
  const addReaction = (msgId: string, emoji: string) => {
    cyberAudio.playClick(1200);
    setReactions(prev => {
      const current = prev[msgId] || [];
      if (current.includes(emoji)) {
        return { ...prev, [msgId]: current.filter(e => e !== emoji) };
      } else {
        return { ...prev, [msgId]: [...current, emoji] };
      }
    });
  };

  // Toggle Voice Note Simulator
  const toggleVoiceNote = (id: string) => {
    if (playingVoiceId === id) {
      setPlayingVoiceId(null);
    } else {
      cyberAudio.playClick(1000);
      setPlayingVoiceId(id);
      setTimeout(() => {
        setPlayingVoiceId(null);
      }, 5000);
    }
  };

  // Send simulated voice transmission
  const sendVoiceNote = () => {
    cyberAudio.playClick(900);
    const newMsg: ChatMessage = {
      id: `voice-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.displayName,
      senderAvatar: currentUser.avatarUrl,
      recipientId: activeConversationId === 'public' ? undefined : activeConversationId,
      content: '🎙️ Audio Transmission [0:18]',
      createdAt: new Date().toISOString(),
      status: 'delivered'
    };

    setMessages(prev => {
      const next = [...prev, newMsg];
      localStorage.setItem('cyberforge_messages', JSON.stringify(next));
      return next;
    });

    cyberAudio.playMessageSent();
    if (chatBroadcast) {
      chatBroadcast.postMessage({ type: 'NEW_MESSAGE', message: newMsg });
    }
  };

  // Delete message
  const handleDeleteMessage = (messageId: string) => {
    cyberAudio.playClick(600);
    setMessages(prev => {
      const updated = prev.filter(m => m.id !== messageId);
      localStorage.setItem('cyberforge_messages', JSON.stringify(updated));
      return updated;
    });

    if (chatBroadcast) {
      chatBroadcast.postMessage({ type: 'DELETE_MESSAGE', messageId });
    }
  };

  // Block user
  const handleBlockUser = (userId: string) => {
    cyberAudio.playClick(500);
    setBlockedUsers(prev => [...prev, userId]);
    setActiveConversationId('public');
  };

  // Report message
  const handleReportMessage = () => {
    if (!reportModalMessage) return;
    cyberAudio.playClick(900);
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setReportModalMessage(null);
      setReportReason('');
    }, 2000);
  };

  // Filter messages for active conversation
  const currentMessages = messages.filter(m => {
    if (blockedUsers.includes(m.senderId)) return false;
    
    if (activeConversationId === 'public') {
      return !m.recipientId;
    } else {
      return (
        (m.senderId === currentUser.id && m.recipientId === activeConversationId) ||
        (m.senderId === activeConversationId && m.recipientId === currentUser.id)
      );
    }
  });

  const getUnreadCount = (userId: string) => {
    return messages.filter(
      m => m.senderId === userId && m.recipientId === currentUser.id && !m.isRead
    ).length;
  };

  const filteredProfiles = profiles.filter(p => 
    p.id !== currentUser.id &&
    (p.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
     p.truckModel.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeContact = activeConversationId === 'public' 
    ? null 
    : profiles.find(p => p.id === activeConversationId);

  return (
    <div className="relative pt-20 pb-16 bg-black min-h-screen text-white flex flex-col select-none">
      
      {/* Top Banner / Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-4">
        <div className="flex items-center justify-between py-2 border-b border-neutral-800 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-neutral-400 uppercase tracking-wider">
              CYBERFORGE ENCRYPTED REAL-TIME FREQUENCY
            </span>
            {isSupabaseConfigured ? (
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded text-[10px]">
                Supabase Connected
              </span>
            ) : (
              <span className="bg-neutral-900 text-neutral-400 border border-neutral-800 px-2 py-0.5 rounded text-[10px]" title="Realtime local network sync active">
                Zero-Latency Broadcast Network Active
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                cyberAudio.playClick(1000);
                setNotificationsEnabled(!notificationsEnabled);
              }}
              className="text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
              title="Toggle notifications"
            >
              {notificationsEnabled ? (
                <Bell className="w-3.5 h-3.5 text-red-500" />
              ) : (
                <BellOff className="w-3.5 h-3.5 text-neutral-600" />
              )}
              <span className="hidden sm:inline">
                {notificationsEnabled ? 'Alerts ON' : 'Muted'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main WhatsApp-style Chat Shell Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col">
        <div className="flex-1 bg-neutral-950 border border-neutral-800/90 rounded-lg overflow-hidden flex shadow-2xl min-h-[680px] max-h-[820px]">
          
          {/* ======================================================== */}
          {/* LEFT SIDEBAR: CONVERSATION LIST (WhatsApp Style)          */}
          {/* ======================================================== */}
          <div className={`w-full md:w-80 lg:w-96 border-r border-neutral-800/80 bg-neutral-950 flex flex-col ${
            mobileChatOpen ? 'hidden md:flex' : 'flex'
          }`}>
            
            {/* Sidebar Header */}
            <div className="p-3.5 bg-neutral-900/60 border-b border-neutral-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.displayName}
                    className="w-10 h-10 rounded-full object-cover border border-red-600/60 shadow-red-glow-sm"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black" />
                </div>
                <div>
                  <h3 className="text-xs font-mono font-bold text-white leading-tight">
                    {currentUser.displayName}
                  </h3>
                  <p className="text-[10px] font-mono text-neutral-400">
                    @{currentUser.username}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-red-500 bg-red-950/40 border border-red-900/60 px-2 py-0.5 rounded uppercase">
                  ONLINE
                </span>
              </div>
            </div>

            {/* Search Filter Bar */}
            <div className="p-3 border-b border-neutral-800/80">
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search members or rooms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded pl-9 pr-3 py-1.5 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors"
                />
              </div>
            </div>

            {/* Conversation List Scroll Area */}
            <div className="flex-1 overflow-y-auto divide-y divide-neutral-900">
              
              {/* 1. PUBLIC COMMUNITY CHAT ROOM ITEM */}
              <button
                onClick={() => {
                  cyberAudio.playClick(1100);
                  setActiveConversationId('public');
                  setMobileChatOpen(true);
                }}
                className={`w-full p-3.5 flex items-center gap-3 text-left transition-all ${
                  activeConversationId === 'public'
                    ? 'bg-neutral-900 border-l-4 border-red-600'
                    : 'hover:bg-neutral-900/40'
                }`}
              >
                <div className="relative w-11 h-11 rounded-sm bg-gradient-to-br from-red-600 to-black p-0.5 flex-shrink-0">
                  <div className="w-full h-full bg-neutral-950 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-ping" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="text-xs font-mono font-bold text-white truncate flex items-center gap-1.5">
                      CyberForge Global HQ
                      <span className="text-[9px] bg-red-950 text-red-400 px-1 py-0.2 rounded border border-red-800">
                        PUBLIC
                      </span>
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">Live</span>
                  </div>
                  <p className="text-[11px] font-mono text-neutral-400 truncate">
                    Global Cybertruck owners & builders channel
                  </p>
                </div>
              </button>

              {/* SECTION DIVIDER */}
              <div className="px-3.5 py-1.5 bg-neutral-900/30 text-[10px] font-mono text-neutral-500 uppercase tracking-wider flex justify-between">
                <span>Direct Communications</span>
                <span>{filteredProfiles.length} Members</span>
              </div>

              {/* 2. DIRECT CONTACTS LIST */}
              {filteredProfiles.map((profile) => {
                const isActive = activeConversationId === profile.id;
                const unread = getUnreadCount(profile.id);

                return (
                  <button
                    key={profile.id}
                    onClick={() => {
                      cyberAudio.playClick(1050);
                      setActiveConversationId(profile.id);
                      setMobileChatOpen(true);
                    }}
                    className={`w-full p-3.5 flex items-center gap-3 text-left transition-all ${
                      isActive
                        ? 'bg-neutral-900 border-l-4 border-red-600'
                        : 'hover:bg-neutral-900/40'
                    }`}
                  >
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <img
                        src={profile.avatarUrl}
                        alt={profile.displayName}
                        className="w-full h-full rounded-full object-cover border border-neutral-700"
                      />
                      {profile.isOnline ? (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black" />
                      ) : (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-neutral-600 border border-black" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="text-xs font-mono font-bold text-white truncate">
                          {profile.displayName}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500">
                          {profile.isOnline ? 'Online' : profile.lastSeen || 'Offline'}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-neutral-400 truncate">
                        {profile.truckModel}
                      </p>
                    </div>

                    {unread > 0 && (
                      <span className="w-5 h-5 bg-red-600 text-white rounded-full text-[10px] font-mono font-bold flex items-center justify-center flex-shrink-0 shadow-red-glow-sm">
                        {unread}
                      </span>
                    )}
                  </button>
                );
              })}

            </div>

            {/* Quick Switch Persona Pill at bottom */}
            <div className="p-3 bg-neutral-900/40 border-t border-neutral-800 text-[11px] font-mono flex items-center justify-between">
              <span className="text-neutral-500">Test as another user:</span>
              <select
                value={currentUser.id}
                onChange={(e) => {
                  cyberAudio.playClick(1200);
                  const target = profiles.find(p => p.id === e.target.value);
                  if (target) onSwitchUser(target);
                }}
                className="bg-black border border-neutral-800 text-neutral-300 text-xs rounded px-2 py-1 font-mono focus:outline-none focus:border-red-600"
              >
                {profiles.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.displayName} (@{p.username})
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT MAIN CHAT WINDOW                                   */}
          {/* ======================================================== */}
          <div className={`flex-1 flex flex-col bg-neutral-950 ${
            mobileChatOpen ? 'flex' : 'hidden md:flex'
          }`}>
            
            {/* Main Chat Header */}
            <div className="p-3.5 bg-neutral-900/80 border-b border-neutral-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileChatOpen(false)}
                  className="md:hidden p-1.5 text-neutral-400 hover:text-white"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                {activeConversationId === 'public' ? (
                  <div className="relative w-9 h-9 rounded bg-red-950 border border-red-800 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-red-500" />
                  </div>
                ) : (
                  <div className="relative w-9 h-9">
                    <img
                      src={activeContact?.avatarUrl}
                      alt={activeContact?.displayName}
                      className="w-full h-full rounded-full object-cover border border-neutral-700"
                    />
                    {activeContact?.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-black" />
                    )}
                  </div>
                )}

                <div>
                  <h2 className="text-xs sm:text-sm font-mono font-bold text-white flex items-center gap-2">
                    {activeConversationId === 'public' ? 'CyberForge Global HQ' : activeContact?.displayName}
                    {activeConversationId === 'public' && (
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-900 px-1.5 py-0.2 rounded">
                        1,420 Active Nodes
                      </span>
                    )}
                  </h2>
                  <p className="text-[10px] font-mono text-neutral-400">
                    {activeConversationId === 'public' 
                      ? 'Decentralized public Cybertruck channel' 
                      : activeContact?.isOnline ? 'Online • Ready for Direct Transmission' : `Last seen ${activeContact?.lastSeen || 'recently'}`}
                  </p>
                </div>
              </div>

              {/* Chat Actions */}
              <div className="flex items-center gap-2">
                {activeContact && (
                  <button
                    onClick={() => handleBlockUser(activeContact.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-500 text-xs font-mono flex items-center gap-1 border border-neutral-800 rounded bg-neutral-900/50"
                    title="Block User"
                  >
                    <Slash className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Block</span>
                  </button>
                )}
              </div>
            </div>

            {/* Message Feed Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-950 via-neutral-950 to-black">
              
              <div className="flex justify-center my-2">
                <div className="bg-neutral-900/60 border border-neutral-800/80 px-3 py-1 rounded text-[10px] font-mono text-neutral-400 text-center max-w-md">
                  🔒 CyberForge End-to-End Frequency Active. Communications verified by Exoskeleton Core.
                </div>
              </div>

              {/* Messages Mapping */}
              {currentMessages.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
                    <Send className="w-5 h-5 text-red-500" />
                  </div>
                  <p className="text-xs font-mono text-neutral-400">
                    No transmissions on this frequency yet.
                  </p>
                  <p className="text-[11px] font-mono text-neutral-600">
                    Send a message or share your custom Cybertruck build!
                  </p>
                </div>
              ) : (
                currentMessages.map((msg) => {
                  const isMine = msg.senderId === currentUser.id;
                  const isVoice = msg.content.includes('Audio Transmission');
                  const isPlaying = playingVoiceId === msg.id;
                  const msgReactions = reactions[msg.id] || [];

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} group relative`}
                    >
                      {/* Sender Info */}
                      {!isMine && activeConversationId === 'public' && (
                        <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-neutral-400 ml-1">
                          <img
                            src={msg.senderAvatar}
                            alt={msg.senderName}
                            className="w-4 h-4 rounded-full"
                          />
                          <span className="font-bold text-neutral-300">{msg.senderName}</span>
                        </div>
                      )}

                      {/* Speech Bubble */}
                      <div
                        className={`relative max-w-[85%] sm:max-w-[70%] p-3 rounded-lg border text-xs font-sans shadow-lg transition-all ${
                          isMine
                            ? 'bg-neutral-900 border-red-900/60 text-white rounded-tr-none'
                            : 'bg-neutral-900/90 border-neutral-800 text-neutral-200 rounded-tl-none'
                        }`}
                      >
                        {/* Reply Preview */}
                        {msg.replyTo && (
                          <div className="mb-2 p-2 bg-black/50 border-l-2 border-red-600 rounded text-[10px] font-mono text-neutral-400">
                            <span className="font-bold text-red-400 block">{msg.replyTo.senderName}</span>
                            <span className="truncate block">{msg.replyTo.content}</span>
                          </div>
                        )}

                        {/* Shared Custom Cybertruck Build Card */}
                        {msg.buildData && (
                          <div className="mb-2.5 p-3 bg-black/90 border border-red-900/80 rounded clip-chamfer space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-mono text-red-500 border-b border-neutral-800 pb-1">
                              <span className="font-bold uppercase tracking-wider flex items-center gap-1">
                                <Flame className="w-3 h-3 text-red-500" />
                                Custom Cybertruck Spec
                              </span>
                              <span className="text-white font-bold">
                                ${msg.buildData.totalPrice.toLocaleString()}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-300">
                              <div>
                                <span className="text-neutral-500 block">Powertrain</span>
                                <span className="font-bold text-white">{msg.buildData.powertrainName.split(' ')[0]}</span>
                              </div>
                              <div>
                                <span className="text-neutral-500 block">Wrap</span>
                                <span className="font-bold" style={{ color: msg.buildData.finishHex }}>
                                  {msg.buildData.finishName}
                                </span>
                              </div>
                            </div>

                            {onInspectBuild && (
                              <button
                                onClick={() => {
                                  cyberAudio.playClick(1300);
                                  onInspectBuild(msg.buildData!);
                                }}
                                className="w-full mt-2 py-1.5 bg-red-600/90 hover:bg-red-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors shadow-red-glow-sm"
                              >
                                <Sliders className="w-3 h-3" />
                                <span>Inspect in Customizer</span>
                              </button>
                            )}
                          </div>
                        )}

                        {/* Attached Image */}
                        {msg.imageUrl && (
                          <div className="mb-2 rounded overflow-hidden border border-neutral-800 max-h-60">
                            <img
                              src={msg.imageUrl}
                              alt="Transmission attachment"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        )}

                        {/* Voice Note Waveform Simulator */}
                        {isVoice ? (
                          <div className="flex items-center gap-3 py-1">
                            <button
                              onClick={() => toggleVoiceNote(msg.id)}
                              className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-red-glow-sm"
                            >
                              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                            </button>
                            
                            {/* Animated Audio Equalizer Bars */}
                            <div className="flex items-center gap-1 flex-1 h-6">
                              {[12, 18, 8, 22, 16, 24, 10, 18, 14, 20, 8, 16, 22, 14].map((h, bIdx) => (
                                <div 
                                  key={bIdx}
                                  className={`w-1 rounded-full transition-all ${
                                    isPlaying ? 'bg-red-500 animate-pulse' : 'bg-neutral-600'
                                  }`}
                                  style={{ height: `${isPlaying ? (h * 1.2) : h}px` }}
                                />
                              ))}
                            </div>
                            <span className="text-[10px] font-mono text-neutral-400">0:18</span>
                          </div>
                        ) : (
                          <p className="leading-relaxed whitespace-pre-wrap break-words">
                            {msg.content}
                          </p>
                        )}

                        {/* Reactions Badges */}
                        {msgReactions.length > 0 && (
                          <div className="flex items-center gap-1 mt-1.5">
                            {msgReactions.map((emoji, eIdx) => (
                              <span 
                                key={eIdx}
                                onClick={() => addReaction(msg.id, emoji)}
                                className="bg-black/60 border border-neutral-700 text-xs px-1.5 py-0.5 rounded cursor-pointer hover:border-red-500"
                              >
                                {emoji}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Bottom Timestamp & Delivery Ticks */}
                        <div className="flex items-center justify-end gap-1.5 mt-1 text-[9px] font-mono text-neutral-500">
                          <span>
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          {isMine && (
                            <CheckCheck className="w-3.5 h-3.5 text-red-500" />
                          )}
                        </div>

                        {/* Hover Quick Actions Bar with Reaction Emojis */}
                        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-black/90 px-2 py-0.5 rounded border border-neutral-800 shadow-xl">
                          <button
                            onClick={() => addReaction(msg.id, '⚡')}
                            className="hover:scale-125 transition-transform text-xs"
                            title="React with Lightning"
                          >
                            ⚡
                          </button>
                          <button
                            onClick={() => addReaction(msg.id, '🔥')}
                            className="hover:scale-125 transition-transform text-xs"
                            title="React with Fire"
                          >
                            🔥
                          </button>
                          <button
                            onClick={() => addReaction(msg.id, '🦾')}
                            className="hover:scale-125 transition-transform text-xs"
                            title="React with Cyber Arm"
                          >
                            🦾
                          </button>

                          <div className="w-[1px] h-3 bg-neutral-700 mx-0.5" />

                          <button
                            onClick={() => setReplyingTo(msg)}
                            className="text-neutral-400 hover:text-white"
                            title="Reply"
                          >
                            <CornerUpLeft className="w-3 h-3" />
                          </button>
                          
                          {isMine ? (
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="text-neutral-400 hover:text-red-500"
                              title="Delete message"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          ) : (
                            <button
                              onClick={() => setReportModalMessage(msg)}
                              className="text-neutral-400 hover:text-red-500"
                              title="Report message"
                            >
                              <ShieldAlert className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                      </div>
                    </div>
                  );
                })
              )}

              {/* Typing indicator */}
              {typingUsers.length > 0 && (
                <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400 italic">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />
                  <span>{typingUsers.join(', ')} is transmitting...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Replying-to Preview Bar */}
            {replyingTo && (
              <div className="px-4 py-2 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-300">
                <div className="flex items-center gap-2 truncate">
                  <CornerUpLeft className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="truncate">
                    Replying to <span className="font-bold text-white">{replyingTo.senderName}</span>: {replyingTo.content}
                  </span>
                </div>
                <button
                  onClick={() => setReplyingTo(null)}
                  className="text-neutral-400 hover:text-white ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Attached Image Preview Bar */}
            {attachedImage && (
              <div className="px-4 py-2 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={attachedImage}
                    alt="Pending attachment"
                    className="w-12 h-12 object-cover rounded border border-red-600"
                  />
                  <span className="text-xs font-mono text-neutral-300">Image Attached</span>
                </div>
                <button
                  onClick={() => setAttachedImage(null)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Emoji Quick Picker Row */}
            {showEmojiPicker && (
              <div className="p-2.5 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2 flex-wrap">
                {quickEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => {
                      cyberAudio.playClick(1100);
                      setInputText(prev => prev + emoji);
                    }}
                    className="text-base p-1.5 hover:bg-neutral-800 rounded transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {/* Bottom Message Input Bar */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-neutral-900/90 border-t border-neutral-800 flex items-center gap-2"
            >
              <button
                type="button"
                onClick={() => {
                  cyberAudio.playClick(1000);
                  setShowEmojiPicker(!showEmojiPicker);
                }}
                className={`p-2 rounded text-neutral-400 hover:text-white transition-colors ${
                  showEmojiPicker ? 'text-red-500 bg-neutral-800' : ''
                }`}
                title="Insert emoji"
              >
                <Smile className="w-5 h-5" />
              </button>

              <label 
                className="p-2 rounded text-neutral-400 hover:text-white cursor-pointer transition-colors"
                title="Attach photo"
              >
                <ImageIcon className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      cyberAudio.playClick(1200);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setAttachedImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>

              {/* Simulated Voice Note Button */}
              <button
                type="button"
                onClick={sendVoiceNote}
                className="p-2 rounded text-neutral-400 hover:text-red-400 transition-colors"
                title="Send Voice Transmission (0:18)"
              >
                <Mic className="w-5 h-5" />
              </button>

              {/* Main Text Input */}
              <input
                type="text"
                placeholder={`Transmitting on ${activeConversationId === 'public' ? 'Global HQ' : activeContact?.displayName}...`}
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  if (chatBroadcast && !typingTimeoutRef.current) {
                    chatBroadcast.postMessage({
                      type: 'TYPING',
                      senderId: currentUser.id,
                      senderName: currentUser.displayName
                    });
                    typingTimeoutRef.current = setTimeout(() => {
                      typingTimeoutRef.current = null;
                    }, 2000);
                  }
                }}
                className="flex-1 bg-black border border-neutral-800 rounded px-4 py-2.5 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputText.trim() && !attachedImage}
                className="p-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:hover:bg-red-600 text-white rounded clip-chamfer transition-all shadow-red-glow-sm"
                title="Send Transmission"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>
      </div>

      {/* REPORT MESSAGE MODAL */}
      {reportModalMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <h3 className="text-sm font-mono font-bold text-red-500 uppercase flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                Report Transmission
              </h3>
              <button
                onClick={() => setReportModalMessage(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {!reportSuccess ? (
              <div className="space-y-4 text-xs font-mono">
                <p className="text-neutral-400">
                  Reporting message from <span className="text-white font-bold">{reportModalMessage.senderName}</span>:
                </p>
                <div className="p-2 bg-neutral-900 border border-neutral-800 rounded text-neutral-300 italic">
                  "{reportModalMessage.content}"
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Reason for violation:</label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full bg-black border border-neutral-800 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
                  >
                    <option value="">Select violation...</option>
                    <option value="spam">Commercial Spam / Bot</option>
                    <option value="harassment">Harassment or Inappropriate Language</option>
                    <option value="misinformation">Fraudulent Vehicle Claims</option>
                    <option value="other">Other Violation</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleReportMessage}
                    disabled={!reportReason}
                    className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-bold uppercase tracking-wider rounded"
                  >
                    Submit Report
                  </button>
                  <button
                    onClick={() => setReportModalMessage(null)}
                    className="flex-1 py-2.5 bg-neutral-900 text-neutral-400 font-bold uppercase tracking-wider rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-2 text-xs font-mono">
                <div className="text-emerald-400 font-bold">✓ Report Transmitted to CyberForge Moderation</div>
                <p className="text-neutral-400">Thank you for keeping the frequencies secure.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
